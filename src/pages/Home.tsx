import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/common/Section';
import ButtonLink from '../components/common/ButtonLink';

const minimaxLink = 'https://platform.minimaxi.com/subscribe/token-plan?code=H74avrqWBT&source=link';

const iconPaths = {
  spark: 'm12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z',
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  upRight: 'M6 18 18 6M6 6h12v12',
  book: 'M12 5v15M3 4.5c3.3-.8 6.3-.3 9 1.5 2.7-1.8 5.7-2.3 9-1.5v14c-3.3-.8-6.3-.3-9 1.5-2.7-1.8-5.7-2.3-9-1.5v-14Z',
  chat: 'M20 11.5a8 8 0 0 1-8 8H5l-3 2v-10a9 9 0 0 1 18 0ZM7 10h8M7 14h5',
  search: 'M10 3 3 6.5 10 10l7-3.5L10 3ZM3 11l7 3.5M3 15.5 10 19M20 15a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-1 3 3 3',
  workflow: 'M2 9h6v6H2ZM16 2h6v6h-6ZM16 16h6v6h-6ZM8 12h3a2 2 0 0 0 2-2V7a2 2 0 0 1 2-2h1M8 12h3a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1',
  code: 'm7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18',
  devices: 'M2 3h15v12H2ZM6 20h7m-3.5-5v5M16 9h6v12h-6m2.5-3h1',
  shield: 'M12 2 3 6v6c0 5 5 8 9 10 4-2 9-5 9-10V6l-9-4Zm-4 10 3 3 5-6',
  terminal: 'M3 3h18v18H3Zm3 5 4 4-4 4m7 0h5',
  cube: 'm12 2 9 5v10l-9 5-9-5V7l9-5ZM3 7l9 5 9-5M12 12v10M7.5 4.5l9 5',
  check: 'm5 12 4 4L19 6',
  send: 'm22 2-7 20-4-9L2 9 22 2ZM11 13 22 2',
} as const;

type IconName = keyof typeof iconPaths;
const Icon = ({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden="true">
    <path d={iconPaths[name]} />
  </svg>
);
const Dot = () => <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-annie-cyan shadow-cyan-glow" />;

const capabilities: { title: string; description: string; tags: string[]; icon: IconName; to: string; accent: string }[] = [
  { title: '智能对话', description: '从 Prompt 到上下文记忆，\n探索更自然、更懂你的 AI 对话。', tags: ['LLM', 'Prompt Engineering'], icon: 'chat', to: '/blog', accent: 'text-annie-purple' },
  { title: '知识检索', description: '让散落的信息，成为可用的知识。\n记录 RAG、向量检索与知识库实践。', tags: ['RAG', 'Vector Database'], icon: 'search', to: '/docs', accent: 'text-annie-cyan' },
  { title: '自动化工作流', description: '把重复交给流程，把时间留给创造。\n探索智能体编排与任务自动化。', tags: ['AI Agents', 'Workflow'], icon: 'workflow', to: '/blog', accent: 'text-annie-lavender' },
  { title: '开发者接入', description: '从第一行调用，到可复用的能力。\n沉淀 API 设计与 SDK 集成经验。', tags: ['API', 'SDK Integration'], icon: 'code', to: '/docs', accent: 'text-annie-lavender' },
  { title: '多端协作', description: '灵感不受设备限制。\n探索跨平台的 AI 接入与协同体验。', tags: ['Multi-platform', 'Sync'], icon: 'devices', to: '/blog', accent: 'text-annie-purple' },
  { title: '可控与安全', description: '能力越强，边界越要清晰。\n记录权限控制、数据隐私与安全实践。', tags: ['Privacy', 'Guardrails'], icon: 'shield', to: '/docs', accent: 'text-annie-cyan' },
];

// Only dynamic cursor coordinates become inline CSS variables; no React rerender per move.
const moveSpotlight = (event: PointerEvent<HTMLAnchorElement>) => {
  if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
};
const resetSpotlight = (event: PointerEvent<HTMLAnchorElement>) => {
  event.currentTarget.style.removeProperty('--mx');
  event.currentTarget.style.removeProperty('--my');
};

const Workspace = () => (
  <div className="relative isolate mx-auto w-full max-w-xl py-5" role="img" aria-label="Annie Core 工作区视觉预览，以下数据为演示">
    <div aria-hidden="true" className="pointer-events-none absolute -inset-12 -z-20 bg-annie-grid bg-[size:42px_42px] [mask-image:radial-gradient(ellipse,black,transparent_70%)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-annie-purple/25 to-annie-cyan/10 blur-3xl" />
    <div aria-hidden="true" className="absolute -inset-x-3 -inset-y-6 -z-10 -rotate-[24deg] rounded-[50%] border border-annie-lavender/15">
      <span className="absolute left-[12%] top-[14%] h-2 w-2 rounded-full bg-annie-lavender shadow-glow motion-safe:animate-pulse" />
      <span className="absolute bottom-[17%] right-[10%] h-1 w-1 rounded-full bg-annie-cyan shadow-cyan-glow" />
    </div>
    <div aria-hidden="true" className="absolute -right-2 bottom-2 left-4 top-10 -z-10 rotate-3 rounded-3xl border border-annie-lavender/10 bg-annie-panel/50" />
    <div className="rounded-3xl bg-gradient-to-br from-annie-lavender/40 via-annie-purple/10 to-annie-cyan/30 p-px shadow-2xl">
      <div className="overflow-hidden rounded-[23px] bg-annie-panel/95 backdrop-blur-2xl">
        <div className="flex items-center gap-3 border-b border-annie-border px-5 py-4 font-mono text-[10px] text-annie-muted">
          <span className="flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-annie-purple/70" /><i className="h-1.5 w-1.5 rounded-full bg-annie-lavender/60" /><i className="h-1.5 w-1.5 rounded-full bg-annie-cyan/50" /></span>
          <span className="flex-1">annie <span className="mx-1 opacity-50">/</span> workspace</span>
          <span className="rounded border border-annie-border px-1.5 py-0.5">演示</span>
        </div>
        <div className="px-4 pb-6 sm:px-6">
          <div className="grid min-h-44 grid-cols-[44%_56%] items-center">
            <svg viewBox="0 0 200 200" fill="none" className="w-full overflow-visible text-annie-lavender" aria-hidden="true">
              <defs><linearGradient id="home-orb" x1="0" y1="0" x2="1" y2="1"><stop stopColor="currentColor" /><stop offset="1" stopColor="currentColor" className="text-annie-cyan" /></linearGradient></defs>
              <g className="origin-center motion-safe:animate-home-float">
                <circle cx="100" cy="100" r="54" fill="currentColor" fillOpacity=".04" stroke="url(#home-orb)" strokeOpacity=".25" />
                <circle cx="100" cy="100" r="66" stroke="currentColor" strokeOpacity=".1" />
                <g className="origin-center motion-safe:animate-home-orbit">
                  <ellipse cx="100" cy="100" rx="84" ry="31" transform="rotate(-32 100 100)" stroke="url(#home-orb)" strokeOpacity=".6" />
                  <ellipse cx="100" cy="100" rx="75" ry="37" transform="rotate(48 100 100)" stroke="url(#home-orb)" strokeOpacity=".3" />
                  <circle cx="29" cy="143" r="3" fill="currentColor" /><circle cx="166" cy="57" r="2" fill="currentColor" />
                </g>
                <path d="M100 61C104 82 116 96 140 100c-24 4-36 18-40 39-4-21-16-35-40-39 24-4 36-18 40-39Z" fill="currentColor" fillOpacity=".1" stroke="url(#home-orb)" strokeWidth="2" />
                <circle cx="100" cy="100" r="5" fill="currentColor" />
              </g>
            </svg>
            <div className="pl-2">
              <span className="inline-flex items-center gap-1.5 text-[9px] text-annie-cyan"><Dot />系统在线 · 随时就绪</span>
              <h2 className="my-2 text-2xl font-medium tracking-tight sm:text-3xl">Annie Core</h2>
              <p className="text-[10px] text-annie-muted sm:text-xs">你的 AI 大管家，随时就绪。</p>
              <p className="mt-3 font-mono text-[7px] tracking-wider text-annie-lavender/60 sm:text-[9px]">✧ PERSONAL AI COMPANION</p>
            </div>
          </div>
          <div className="mb-3 flex justify-between text-[10px] text-annie-muted"><span className="text-annie-text/80">工作区摘要</span><span>一切井然有序</span></div>
          <div className="grid grid-cols-3 divide-x divide-annie-border rounded-xl border border-annie-border bg-white/[0.02] py-4">
            {[['03', '进行中的对话'], ['128', '已整理的文档'], ['05', '活跃工作流']].map(([value, label]) => <div key={label} className="pl-3 sm:pl-5"><div className="text-3xl font-medium tracking-tight">{value}</div><p className="mt-2 text-[9px] text-annie-muted">{label}</p></div>)}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(['chat', 'search'] as const).map((icon, index) => <div key={icon} className="rounded-xl border border-annie-border bg-white/[0.02] p-3"><div className="flex items-center gap-2 text-xs"><span className={index ? 'text-annie-cyan' : 'text-annie-lavender'}><Icon name={icon} className="h-4 w-4" /></span>{index ? '知识索引' : '对话引擎'}</div><div className="mt-2 flex items-center justify-between pl-6 text-[9px] text-annie-muted"><span>{index ? '知识库已同步' : '上下文已就绪'}</span><Dot /></div></div>)}
          </div>
          <div className="mt-4 flex items-center justify-between text-[9px] text-annie-muted"><span className="flex items-center gap-1.5"><Icon name="shield" className="h-3 w-3 text-annie-cyan" />安全连接 · 工作流就绪</span><span className="font-mono text-annie-cyan">▂▄▆▊</span></div>
        </div>
      </div>
    </div>
    <div aria-hidden="true" className="absolute right-4 top-0 flex rotate-3 items-center gap-2 rounded-lg border border-annie-lavender/20 bg-annie-panel/90 px-3 py-2 text-[10px] shadow-lg backdrop-blur-xl"><Icon name="book" className="h-3 w-3 text-annie-lavender" />每一份灵感，都有回响</div>
    <div aria-hidden="true" className="absolute -bottom-2 left-1 flex items-center gap-3 rounded-xl border border-annie-cyan/20 bg-annie-panel/95 px-4 py-3 shadow-lg backdrop-blur-xl sm:-left-5"><span className="rounded-lg border border-annie-cyan/20 bg-annie-cyan/5 p-2 text-annie-cyan"><Icon name="check" className="h-4 w-4" /></span><div><p className="text-[10px]">又一个想法，成为了现实。</p><p className="mt-1 font-mono text-[8px] text-annie-muted">idea → build → learn → repeat</p></div></div>
  </div>
);

const scenarios = [
  { title: '开发笔记', kicker: '01 — BUILD & LEARN', description: '写下每一次实现，也记录每一次踩坑。\n让走过的路，成为下一次出发的地图。', cta: '翻开开发手记', to: '/blog' },
  { title: '工具探索', kicker: '02 — EXPLORE & DISCOVER', description: '亲手试过，才有值得分享的体验。\n发现让 AI 开发更顺手的工具与方法。', cta: '打开我的工具箱', to: '/docs' },
  { title: '技术分享', kicker: '03 — THINK & SHARE', description: '把实践梳理成思考，把经验分享出去。\n和同样热爱技术的人，一起向前。', cta: '一起交流与成长', to: '/blog' },
];

const ScenarioPreview = ({ index }: { index: number }) => (
  <div aria-hidden="true" className="relative flex h-44 items-center justify-center overflow-hidden border-b border-annie-border bg-annie-grid bg-[size:16px_16px]">
    <div className="absolute inset-0 bg-gradient-to-t from-annie-purple/10 to-transparent" />
    {index === 0 ? (
      <div className="relative mx-5 mt-9 w-full -rotate-2 rounded-t-xl border border-annie-lavender/20 bg-annie-panel px-4 pb-4 font-mono shadow-xl transition-transform duration-300 group-hover:rotate-0">
        <div className="mb-3 flex justify-between border-b border-annie-border py-3 text-[9px] text-annie-muted">hello_agent.py<Icon name="code" className="h-3 w-3 text-annie-lavender" /></div>
        <div className="whitespace-nowrap text-[9px] leading-5 text-annie-text/80 sm:text-[10px]"><div><span className="mr-3 text-annie-muted/50">01</span><span className="text-annie-lavender">from</span> annie <span className="text-annie-lavender">import</span> Agent</div><div className="text-annie-muted/50">02</div><div><span className="mr-3 text-annie-muted/50">03</span>agent = Agent(<span className="text-annie-cyan">"hello, world"</span>)</div><div><span className="mr-3 text-annie-muted/50">04</span><span className="text-annie-lavender">await</span> agent.<span className="text-annie-cyan">run</span>()</div><div className="text-annie-muted"><span className="mr-3 opacity-50">05</span># 从一个想法开始。</div></div>
      </div>
    ) : index === 1 ? (
      <div className="relative flex items-center gap-4">
        {(['terminal', 'spark', 'cube'] as const).map((icon, i) => <div key={icon} className={`flex h-20 w-16 flex-col items-center justify-center gap-3 rounded-2xl border bg-gradient-to-br from-annie-lavender/10 to-annie-panel shadow-xl transition-transform duration-300 ${i === 1 ? '-translate-y-2 border-annie-purple/50 text-annie-lavender group-hover:-translate-y-4' : i === 0 ? 'translate-y-2 -rotate-12 border-annie-border text-annie-lavender group-hover:translate-y-0' : 'translate-y-2 rotate-12 border-annie-border text-annie-cyan group-hover:translate-y-0'}`}><Icon name={icon} className="h-6 w-6" /><span className="font-mono text-[9px] tracking-wider text-annie-muted">{['CLI', 'MODEL', 'SDK'][i]}</span></div>)}
      </div>
    ) : (
      <div className="relative">
        <div className="absolute inset-0 translate-x-2 translate-y-3 -rotate-6 rounded-xl border border-annie-lavender/20 bg-annie-panel" />
        <div className="relative w-56 -rotate-6 rounded-xl border border-annie-lavender/25 bg-gradient-to-br from-annie-panel to-annie-bg p-4 transition-transform duration-300 group-hover:-rotate-2"><p className="font-mono text-[7px] tracking-widest text-annie-lavender">THOUGHTS, OPENLY SHARED.</p><p className="mt-2 text-xs">让经验，成为共同的起点。</p><div className="mt-3 h-1 w-11/12 rounded bg-annie-lavender/20" /><div className="mt-2 h-1 w-2/3 rounded bg-annie-lavender/20" /><p className="mt-3 text-[8px] text-annie-muted">✦ linany / 写给同样好奇的你</p></div>
        <span className="absolute -bottom-2 -right-2 rotate-6 rounded-xl border border-annie-cyan/30 bg-annie-panel p-2 text-annie-cyan"><Icon name="send" className="h-4 w-4" /></span>
      </div>
    )}
  </div>
);

const Home = () => (
  <div className="home-page overflow-x-clip text-annie-text">
    <Section className="relative !max-w-[1296px] !pb-0 !pt-16 md:!pt-24">
      <div className="grid items-center gap-14 lg:min-h-[490px] lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-annie-purple/25 bg-annie-purple/5 px-3 py-2 text-[9px] tracking-wider text-annie-lavender sm:text-[10px]"><Dot />LINANY'S AI LAB<span className="mx-1 h-2.5 w-px bg-annie-lavender/20" />保持好奇，持续构建</span>
          <h1 className="mt-7 text-[clamp(2.3rem,8.5vw,4.5rem)] font-bold leading-[1.2] tracking-[-0.045em] lg:text-[clamp(3rem,5.5vw,5rem)]"><span className="block text-[0.86em]">记录 AI 开发</span><span className="mt-3 block bg-gradient-to-r from-annie-lavender via-annie-lavender to-annie-cyan bg-clip-text pb-2 text-transparent">从这里开始。</span></h1>
          <p className="mt-6 text-sm leading-8 text-annie-muted sm:text-base">把灵感写成代码，把探索沉淀为笔记。<br />与 Annie 一起，记录 AI 开发的每一步。</p>
          <div className="mt-8">
            <div className="flex flex-wrap gap-3"><ButtonLink to="/blog"><span className="mr-4">阅读笔记</span><Icon name="arrow" className="h-4 w-4" /></ButtonLink><ButtonLink to="/docs" variant="secondary"><Icon name="book" className="mr-3 h-4 w-4" />查看文档</ButtonLink></div>
            <a href={minimaxLink} target="_blank" rel="noopener noreferrer" aria-label="MiniMax Code Plan 开发者推荐，在新标签页打开" className="mt-6 inline-flex flex-wrap items-center gap-2 text-[11px] text-annie-muted transition-colors hover:text-annie-lavender"><Icon name="spark" className="h-3.5 w-3.5 text-annie-lavender" /><span><strong className="font-medium text-annie-text/80">MiniMax</strong> Code Plan</span><span className="rounded border border-annie-purple/20 bg-annie-purple/5 px-1.5 py-0.5 text-[9px] text-annie-lavender">开发者推荐</span><Icon name="upRight" className="h-3 w-3" /></a>
          </div>
        </div>
        <Workspace />
      </div>
      <div className="mt-20 flex flex-col gap-6 border-y border-annie-border py-6 text-[11px] text-annie-muted lg:flex-row lg:items-center lg:justify-between"><span>围绕 AI，探索更多可能</span><div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:flex-wrap sm:gap-8 xl:gap-12">{(['LLM & AGENTS', 'RAG & KNOWLEDGE', 'AUTOMATION', 'BUILD IN PUBLIC']).map((topic, i) => <span key={topic} className="flex items-center gap-2 font-mono text-[10px] tracking-wide"><Icon name={(['spark', 'search', 'workflow', 'code'] as const)[i]} className="h-4 w-4" />{topic}</span>)}</div></div>
    </Section>

    <Section className="!max-w-[1296px] !pb-0">
      <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-mono text-[10px] tracking-[0.18em] text-annie-lavender/70">01 / CAPABILITIES · 探索方向</p><h2 className="mt-4 text-3xl font-semibold leading-snug tracking-tight lg:text-4xl">让每一次探索，<span className="text-annie-lavender">都有迹可循。</span></h2></div><p className="text-xs leading-6 text-annie-muted">从一次对话，到一个完整的智能体。<br />六个方向，持续积累。</p></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <Link key={capability.title} to={capability.to} onPointerMove={moveSpotlight} onPointerLeave={resetSpotlight} onPointerCancel={resetSpotlight} className={`home-capability group relative isolate flex min-h-[252px] flex-col overflow-hidden rounded-2xl border border-transparent p-7 transition duration-300 hover:shadow-glow focus-visible:shadow-glow motion-safe:hover:-translate-y-1.5 motion-safe:focus-visible:-translate-y-1.5 ${capability.accent}`}>
            <div className="mb-6 flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-current bg-white/5 transition-transform duration-300 motion-safe:group-hover:-rotate-6"><Icon name={capability.icon} /></span><span className="flex items-center gap-2 font-mono text-[10px] text-annie-muted">{String(index + 1).padStart(2, '0')}<Icon name="upRight" className="h-3 w-3 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" /></span></div>
            <h3 className="text-lg font-semibold text-annie-text">{capability.title}</h3><p className="mt-3 whitespace-pre-line text-xs leading-6 text-annie-muted">{capability.description}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">{capability.tags.map(tag => <span key={tag} className="rounded border border-annie-lavender/10 bg-annie-lavender/[0.02] px-2 py-1 font-mono text-[9px] text-annie-muted">{tag}</span>)}</div>
          </Link>
        ))}
      </div>
    </Section>

    <Section className="!max-w-[1296px] !pb-0">
      <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="font-mono text-[10px] tracking-[0.18em] text-annie-lavender/70">02 / FIELD NOTES · 实践与思考</p><h2 className="mt-4 text-3xl font-semibold leading-snug tracking-tight lg:text-4xl">不止于构想，<span className="text-annie-lavender">更在于动手。</span></h2></div><Link to="/blog" className="flex items-center gap-3 text-xs text-annie-muted transition-colors hover:text-annie-cyan">找到你的探索起点<Icon name="arrow" className="h-4 w-4" /></Link></div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{scenarios.map((scenario, index) => <Link key={scenario.title} to={scenario.to} className="group overflow-hidden rounded-2xl border border-annie-border bg-annie-panel/60 transition duration-300 hover:border-annie-lavender/30 hover:shadow-glow motion-safe:hover:-translate-y-1"><ScenarioPreview index={index} /><div className="p-6"><p className="font-mono text-[9px] tracking-widest text-annie-lavender/70">{scenario.kicker}</p><h3 className="mt-3 text-xl font-semibold">{scenario.title}</h3><p className="mt-3 whitespace-pre-line text-xs leading-6 text-annie-muted">{scenario.description}</p><div className="mt-6 flex items-center justify-between border-t border-annie-border pt-4 text-xs text-annie-lavender"><span>{scenario.cta}</span><Icon name="upRight" className="h-4 w-4" /></div></div></Link>)}</div>
    </Section>

    <Section className="!max-w-[1296px]">
      <div className="relative isolate flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl border border-annie-lavender/20 bg-gradient-to-r from-annie-purple/10 to-annie-cyan/[0.03] p-8 md:flex-row md:items-center md:p-10"><div aria-hidden="true" className="pointer-events-none absolute -left-12 -top-20 -z-10 h-48 w-48 rounded-full bg-annie-purple/15 blur-3xl" /><div className="flex items-center gap-5"><span className="hidden rounded-2xl border border-annie-lavender/20 bg-annie-purple/10 p-4 text-annie-lavender sm:block"><Icon name="spark" className="h-7 w-7" /></span><div><h2 className="text-2xl font-semibold tracking-tight">下一个好想法，从这里生长。</h2><p className="mt-3 text-sm leading-6 text-annie-muted">一个人的开发笔记，也是与你交换灵感的地方。</p></div></div><div className="shrink-0"><ButtonLink to="/blog" variant="secondary"><span className="mr-3">一起探索 AI 的可能</span><Icon name="arrow" className="h-4 w-4" /></ButtonLink></div></div>
    </Section>
  </div>
);

export default Home;
