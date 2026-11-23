# 通过 GitHub Actions 发布 Annie 前端

`Frontend CI and image` 在 `main` 构建并推送前端 Docker 镜像，提交 SHA 用作标签。发布时使用构建摘要里的 `sha256:…`，ECS 通过现有 Docker Compose 项目更新 `frontend`。构建和发布分别运行，生产发布与回滚由 `Deploy frontend to ECS` 手动触发。

## 一次性配置

1. 在 ECS 的 `/root/annie-deploy` 安装 `annie-infra` 中的前端镜像 Compose 配置和 `deploy-frontend-image.sh`。用该仓库的 `scripts/cloud-assistant-frontend-release.sh` 安装 root 所有、仅 root 可修改的 `/usr/local/sbin/annie-frontend-release`。部署脚本、Compose 配置和上级目录也需由 root 控制。
2. 创建无 Docker 组权限、无 SSH 登录凭据的本地账号 `annie-release`。通过 `visudo` 给它授权运行一个固定入口。入口只接受单个 SHA-256 镜像摘要或 `rollback`，并由 root 身份执行下方限定的前端操作。

   ```sudoers
   annie-release ALL=(root) NOPASSWD: /usr/local/sbin/annie-frontend-release
   ```

3. 在 ECS 云助手创建并保存 Shell 命令，启用自定义参数 `release`，执行账号选 `annie-release`，执行目录选 `/`，超时设为 600 秒。命令读取参数行作为数据，发布脚本会再次检查它。

   ```bash
   #!/bin/bash
   set -euo pipefail
   release=$(/usr/bin/sed -e '1,/^# release value$/d' -- "$0")
   if [[ "$release" != rollback && ! "$release" =~ ^sha256:[a-f0-9]{64}$ ]]; then
     echo 'Invalid release value.' >&2
     exit 2
   fi
   exec /usr/bin/sudo -n -- /usr/local/sbin/annie-frontend-release "$release"
   exit 1
   # release value
   {{release}}
   ```

   [云助手保存命令](https://www.alibabacloud.com/help/en/ecs/user-guide/create-a-command) · [云助手参数](https://www.alibabacloud.com/help/en/ecs/user-guide/use-custom-parameters-in-cloud-assistant-commands)

4. 在 GitHub 仓库设置 `production` 环境，将部署分支限制为 `main`。再在阿里云 RAM 创建 OIDC 身份提供商，发行者为 `https://token.actions.githubusercontent.com`，Client ID 为 `sts.aliyuncs.com`。创建受信任的 RAM 角色，`oidc:iss`、`oidc:aud` 与前面的值一致，`oidc:sub` 精确匹配本仓库的生产环境。若仓库使用旧格式，值为 `repo:DeepUmbrella/annie-frontend:environment:production`。若启用了不可变主题，按 GitHub 文档加入所有者和仓库 ID。

   [GitHub 环境](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) · [GitHub OIDC 主题](https://docs.github.com/en/actions/reference/security/oidc) · [阿里云 OIDC 提供商](https://www.alibabacloud.com/help/en/ram/manage-an-oidc-idp) · [阿里云角色信任策略](https://www.alibabacloud.com/help/en/ram/user-guide/create-a-ram-role-for-a-trusted-idp)

5. 将角色的调用权限限制到这一条命令和这一台实例，并只允许以 `annie-release` 执行。权限策略中的占位符需换成实际值。

   ```json
   {
     "Version": "1",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": "ecs:InvokeCommand",
         "Resource": [
           "acs:ecs:REGION:ACCOUNT:command/COMMAND_ID",
           "acs:ecs:REGION:ACCOUNT:instance/INSTANCE_ID"
         ],
         "Condition": {"StringEquals": {"ecs:CommandRunAs": ["annie-release"]}}
       },
       {
         "Effect": "Allow",
         "Action": "ecs:DescribeInvocationResults",
         "Resource": [
           "acs:ecs:REGION:ACCOUNT:command/COMMAND_ID",
           "acs:ecs:REGION:ACCOUNT:instance/INSTANCE_ID"
         ]
       }
     ]
   }
   ```

   [执行命令权限](https://www.alibabacloud.com/help/en/ecs/developer-reference/api-ecs-2014-05-26-invokecommand) · [查询执行结果权限](https://www.alibabacloud.com/help/en/ecs/developer-reference/api-ecs-2014-05-26-describeinvocationresults)

6. 在 GitHub `production` 环境添加以下变量。

   | 变量 | 值 |
   | --- | --- |
   | `ALIYUN_ECS_REGION_ID` | ECS 所在地域 ID |
   | `ALIYUN_ECS_INSTANCE_ID` | 现有生产 ECS 实例 ID |
   | `ALIYUN_FRONTEND_COMMAND_ID` | 第 3 步保存的云助手命令 ID |
   | `ALIYUN_OIDC_PROVIDER_ARN` | 第 4 步的 OIDC 身份提供商 ARN |
   | `ALIYUN_FRONTEND_ROLE_ARN` | 第 4 步的 RAM 角色 ARN |

7. 首个构建完成后，从 ECS 核实指定 GHCR 摘要可拉取。若包为私有，由 ECS 上实际执行 Docker 的账号使用有包读取权限的 classic PAT 登入 `ghcr.io`，把令牌交给 `docker login --password-stdin`。

   [GHCR 认证与包权限](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

## 发布和回滚

- 发布时打开 **Actions → Deploy frontend to ECS → Run workflow**，选择 `main`，填入构建摘要中 `@` 后的 `sha256:…`。运行摘要保留摘要和云助手执行 ID，运行日志包含主机发布结果。
- 回滚时在同一入口输入 `rollback`，恢复 ECS 保存的上一个前端镜像。需要指定更早版本时，直接填入该版本的已知摘要。
- 若 GitHub 等待超时，使用运行摘要中的执行 ID 在云助手确认实际状态，再决定是否重试。取消 GitHub 运行后，也应检查已提交的云助手任务状态。
