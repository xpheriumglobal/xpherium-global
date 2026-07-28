import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Counter } from './Counter';

const impactData = [
  { value: "80%", label: "TIME SAVED", desc: "On repetitive tasks through automation", icon: "growth" },
  { value: "300%", label: "INCREASE IN LEADS", desc: "With 24/7 AI lead capture and qualification", icon: "users" },
  { value: "150%", label: "ROI INCREASE", desc: "Through streamlined operations and lower costs", icon: "dollar" },
  { value: "24/7", label: "BUSINESS COVERAGE", desc: "Never miss a call, lead or opportunity again", icon: "clock" }
];

function GrowthIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c89845" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18V14" />
      <path d="M9 18V8" />
      <path d="M14 18V11" />
      <path d="M19 18V3" />
      <path d="M19 3L15.5 6.5" />
      <path d="M19 3L22.5 6.5" opacity="0.9" />
      <path d="M4 18H20" strokeOpacity="0.25" strokeWidth="1" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c89845" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 18c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M14.8 17.2c0-2 1.6-3.6 3.6-3.6 1 0 1.9 0.4 2.6 1.1" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c89845" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" strokeOpacity="0.9" />
      <path d="M12 7.2V8.2M12 15.8V16.8M14.8 9.6c0-1.1-1.25-1.8-2.8-1.8s-2.8 0.7-2.8 1.8c0 1.1 1.25 1.8 2.8 1.8 1.55 0 2.8 0.7 2.8 1.8s-1.25 1.8-2.8 1.8-2.8-0.7-2.8-1.8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="26" height="22" viewBox="0 0 28 24" fill="none">
      <g stroke="#c89845" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8.5V12L14.8 13.6" />
      </g>
      <text x="21.5" y="7" fill="#c89845" fontSize="5.2" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.3">24</text>
      <text x="20.8" y="13.2" fill="#c89845" fontSize="5.2" fontWeight="800" fontFamily="sans-serif">7</text>
      <line x1="20.5" y1="9" x2="26" y2="9" stroke="#c89845" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

const icons: Record<string, ReactNode> = {
  growth: <GrowthIcon />,
  users: <UsersIcon />,
  dollar: <DollarIcon />,
  clock: <ClockIcon />
};

export function OurImpact() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-white selection:bg-[#c89845]/20 antialiased font-sans pb-16 sm:pb-20">
      {/* Top blend gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(200,152,69,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.03),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(255,255,255,0.04),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.03),transparent_45%)]" />
      
      <div className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 w-[90%] max-w-[1000px] h-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(200,152,69,0.11)_0%,rgba(200,152,69,0.04)_35%,transparent_72%)] blur-[1px]" />
      <div className="pointer-events-none absolute left-1/2 top-[62%] -translate-x-1/2 w-[85%] max-w-[760px] h-[340px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(200,152,69,0.08)_0%,transparent_70%)] blur-[22px]" />
      
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 pt-4 sm:pt-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-[rgba(12,10,8,0.55)] px-4 py-[7px] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_0_24px_rgba(251,191,36,0.12),0_2px_16px_rgba(0,0,0,0.4)]">
            <span className="h-[4px] w-[4px] rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-amber-200/90 uppercase">OUR IMPACT</span>
          </div>
        </div>

        <h2 className="mx-auto mt-8 max-w-[1000px] text-center text-[34px] sm:text-[48px] lg:text-[56px] font-bold leading-[0.95] tracking-[-0.03em] bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Measurable <span className="bg-gradient-to-r from-[#e8c07d] via-[#f5c242] to-white bg-clip-text text-transparent">Results</span> That Matter
        </h2>

        <p className="mx-auto mt-5 max-w-[560px] text-center text-[15px] sm:text-[16px] leading-[1.6] text-zinc-400">
          Real businesses. Real impact. Real growth with <span className="font-bold bg-gradient-to-r from-[#e8c07d] via-[#f5c242] to-[#e8a84c] bg-clip-text text-transparent">X-Pherium OS.</span>
        </p>

        <div className="relative mx-auto mt-7 flex h-[1px] w-[80px] justify-center overflow-visible">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#c89845] to-transparent opacity-90" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] w-[80px] bg-[#c89845] blur-[3px] opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[12px] w-[80px] bg-[#c89845]/20 blur-[8px]" />
        </div>

        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {impactData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={item.label}
              className="group relative flex min-h-[288px] flex-col items-center rounded-[16px] border border-white/[0.08] bg-zinc-900/40 px-6 pb-8 pt-8 backdrop-blur-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[6px] hover:border-[#c89845]/[0.28] hover:bg-zinc-800/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(200,152,69,0.12)_inset,0_0_28px_rgba(200,152,69,0.14)]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/[0.06] to-transparent opacity-60" />
              <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,152,69,0.08),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#1a1a1e] border border-[#c89845]/[0.22] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_0_22px_rgba(200,152,69,0.16),0_2px_10px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:border-[#c89845]/40 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_0_28px_rgba(200,152,69,0.28)]">
                {icons[item.icon]}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
              </div>
              
              <div className="relative z-10 mt-7 text-[46px] sm:text-[48px] font-bold leading-none tracking-[-0.03em] text-white">
                <Counter value={item.value} />
              </div>
              <div className="relative z-10 mt-4 h-[1.5px] w-[30px] bg-[#c89845] shadow-[0_0_8px_rgba(200,152,69,0.7)] rounded-full" />
              <div className="relative z-10 mt-4 text-center text-[12.5px] font-bold tracking-[0.14em] text-white">
                {item.label}
              </div>
              <p className="relative z-10 mt-3 max-w-[200px] text-center text-[13.5px] leading-[1.55] text-zinc-400">
                {item.desc}
              </p>
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-[1px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
