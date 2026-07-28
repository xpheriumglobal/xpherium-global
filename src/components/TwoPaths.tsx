import { X, Check } from 'lucide-react';
import { motion } from 'motion/react';

export function TwoPaths() {
  return (
    <section className="w-full bg-[#0a0a0a] pt-0 pb-16 md:pt-0 md:pb-24 px-5 md:px-8 font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[900px] w-[1200px] -translate-x-1/2 rounded-full opacity-[0.18]" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(251,191,36,0.35) 0%, rgba(245,158,11,0.12) 25%, rgba(0,0,0,0) 70%)' }} />
        <div className="absolute left-1/2 top-[10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.08] blur-[1px]" style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(251,191,36,0.5) 0%, rgba(0,0,0,0) 60%)' }} />
      </div>
      
      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-[42px] sm:text-[54px] lg:text-[64px] font-bold tracking-tight text-white leading-[0.95]">
            Two Paths Lie Before You
          </h2>
          <div className="relative mt-6 h-[1px] w-[280px] sm:w-[420px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-[12px] w-[220px] -translate-x-1/2 -translate-y-1/2 bg-amber-300/20 blur-[10px]" />
          </div>
        </motion.div>

        {/* Connecting lines SVG (hidden on mobile) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mt-4 h-[88px] w-full max-w-[900px] sm:h-[112px] hidden lg:block"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 112" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 450 10 C 450 50, 280 60, 180 95" stroke="url(#gold1)" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
            <path d="M 450 10 C 450 50, 280 60, 180 95" stroke="url(#glow1)" strokeWidth="3" strokeLinecap="round" opacity="0.18" />
            <path d="M 450 10 C 450 50, 620 60, 720 95" stroke="url(#gold2)" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
            <path d="M 450 10 C 450 50, 620 60, 720 95" stroke="url(#glow2)" strokeWidth="3" strokeLinecap="round" opacity="0.18" />
            <circle cx="180" cy="95" r="2.5" fill="#fbbf24" opacity="0.9" />
            <circle cx="720" cy="95" r="2.5" fill="#fbbf24" opacity="0.9" />
            <defs>
              <linearGradient id="gold1" x1="450" y1="10" x2="180" y2="95" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fde68a" stopOpacity="0.9" />
                <stop offset="1" stopColor="#f59e0b" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="gold2" x1="450" y1="10" x2="720" y2="95" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fde68a" stopOpacity="0.9" />
                <stop offset="1" stopColor="#f59e0b" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="glow1" x1="450" y1="10" x2="180" y2="95" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="glow2" x1="450" y1="10" x2="720" y2="95" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute left-1/2 top-[8px] h-2 w-2 -translate-x-1/2 rounded-full bg-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
        </motion.div>

        {/* Two Columns Container */}
        <div className="relative mt-8 lg:mt-2 grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
          
          {/* VS Badge (Desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-[46%] z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
            <div className="relative flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="text-[13px] font-[700] tracking-[0.08em] text-white/90">VS</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent opacity-60" />
              <div className="absolute -inset-3 rounded-full bg-amber-400/10 blur-[12px]" />
            </div>
          </div>

          {/* VS Badge (Mobile) */}
          <div className="absolute left-1/2 top-[50%] z-20 flex -translate-x-1/2 -translate-y-1/2 lg:hidden">
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full border border-white/[0.08] bg-[#0c0c0e] shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
              <span className="text-[11px] font-[700] tracking-[0.08em]">VS</span>
            </div>
          </div>

          {/* Path 1: Manual Effort */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-[24px] border border-[rgba(239,68,68,0.15)] bg-[linear-gradient(180deg,rgba(20,12,12,0.72)_0%,rgba(12,10,10,0.76)_100%)] p-[1px] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_20px_60px_rgba(0,0,0,0.5),0_0_80px_rgba(239,68,68,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-[2px] hover:border-[rgba(239,68,68,0.22)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_28px_80px_rgba(0,0,0,0.6),0_0_90px_rgba(239,68,68,0.09)]"
          >
            <div className="relative rounded-[23px] bg-[radial-gradient(120%_120%_at_20%_0%,rgba(239,68,68,0.10)_0%,rgba(0,0,0,0)_45%),linear-gradient(180deg,rgba(24,16,16,0.9)_0%,rgba(10,10,10,0.92)_100%)] p-[32px] h-full">
              <div className="pointer-events-none absolute inset-0 rounded-[23px] bg-gradient-to-b from-white/[0.06] to-transparent opacity-60" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="relative inline-flex items-center gap-2.5 rounded-full border border-[#ef4444]/20 bg-[rgba(239,68,68,0.08)] px-[14px] py-[7px] backdrop-blur-sm shadow-[0_0_20px_rgba(239,68,68,0.12)_inset,0_0_18px_rgba(239,68,68,0.10)]">
                    <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                    <span className="text-[14px] font-[800] tracking-[0.20em] text-[#ef4444] sm:text-[15px]" style={{textShadow: "0 0 12px rgba(239,68,68,0.55), 0 0 24px rgba(239,68,68,0.25)"}}>YOUR WAY</span>
                  </div>
                </div>

                <h3 className="mt-8 text-[28px] font-[700] leading-[1.08] tracking-[-0.02em] text-white sm:text-[30px] lg:text-[32px]">
                  Built on manual effort.
                </h3>

                <div className="relative mt-8 divide-y divide-[rgba(255,255,255,0.06)] rounded-[14px] border border-white/[0.05] bg-black/25">
                  {[
                    "Spending hours on repetitive tasks that could be automated",
                    "Missing leads because you can't respond to inquiries 24/7",
                    "Struggling to scale operations without hiring more staff",
                    "Losing competitive edge to AI-powered competitors"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-4 px-5 py-[20px] sm:px-6">
                      <span className="mt-[2px] flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border border-[#ef4444]/30 bg-[#ef4444]/12 shadow-[0_0_14px_rgba(239,68,68,0.20)_inset]">
                        <X className="w-3.5 h-3.5 text-[#ef4444]" strokeWidth={2.5} />
                      </span>
                      <p className="text-[17px] font-[500] leading-[1.6] tracking-[-0.01em] text-[#e4e4e7] sm:text-[18px]">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Path 2: Autonomous Execution */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-[24px] border border-[rgba(251,191,36,0.25)] bg-[linear-gradient(180deg,rgba(251,191,36,0.18)_0%,rgba(20,18,10,0.7)_10%,rgba(12,11,10,0.8)_100%)] p-[1px] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_20px_60px_rgba(0,0,0,0.5),0_0_90px_rgba(251,191,36,0.12)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-[2px] hover:border-[rgba(251,191,36,0.34)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_28px_80px_rgba(0,0,0,0.6),0_0_110px_rgba(251,191,36,0.18)]"
          >
            <div className="relative h-full overflow-hidden rounded-[23px] bg-[radial-gradient(140%_90%_at_80%_0%,rgba(251,191,36,0.18)_0%,rgba(0,0,0,0)_55%),linear-gradient(180deg,rgba(30,26,16,0.92)_0%,rgba(14,12,10,0.96)_100%)] p-[32px]">
              <div className="pointer-events-none absolute -top-[40%] left-[20%] h-[60%] w-[80%] rounded-full bg-amber-300/10 blur-[40px]" />
              <div className="pointer-events-none absolute inset-0 rounded-[23px] bg-gradient-to-b from-white/[0.09] to-transparent opacity-70" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="group/badge relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-amber-300/25 bg-[linear-gradient(180deg,rgba(251,191,36,0.16)_0%,rgba(251,191,36,0.06)_100%)] px-[14px] py-[7px] backdrop-blur-sm shadow-[0_0_22px_rgba(251,191,36,0.18)_inset,0_0_20px_rgba(251,191,36,0.14)]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#facc15] shadow-[0_0_10px_rgba(250,204,21,0.95)]" />
                    <span className="text-[14px] font-[800] tracking-[0.20em] text-[#facc15] sm:text-[15px]" style={{textShadow: "0 0 14px rgba(250,204,21,0.65), 0 0 28px rgba(250,204,21,0.30)"}}>THE X-PHERIUM WAY</span>
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 [animation:shimmer_2.8s_infinite] translate-x-[-100%]" />
                  </div>
                </div>

                <h3 className="mt-8 text-[28px] font-[700] leading-[1.08] tracking-[-0.02em] text-white sm:text-[30px] lg:text-[32px]">
                  Built on autonomous execution.
                </h3>

                <div className="relative mt-8 divide-y divide-[rgba(255,255,255,0.06)] rounded-[14px] border border-amber-200/15 bg-black/30">
                  {[
                    "AI answers every call, every time",
                    "AI qualifies leads and books appointments",
                    "AI automates operations across your business",
                    "Scale without increasing payroll"
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-4 px-5 py-[20px] sm:px-6">
                      <span className="mt-[2px] flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border border-amber-300/35 bg-amber-300/18 shadow-[0_0_16px_rgba(251,191,36,0.24)_inset]">
                        <Check className="h-3.5 w-3.5 text-[#fbbf24]" strokeWidth={2.5} />
                      </span>
                      <p className="text-[17px] font-[500] leading-[1.6] tracking-[-0.01em] text-[#e4e4e7] sm:text-[18px]">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-8 flex flex-col items-center sm:mt-10 w-full"
        >
          <div className="group relative inline-flex items-center justify-center rounded-full p-[1px] bg-gradient-to-b from-amber-200/40 to-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
            <div className="relative rounded-full bg-[#0a0a0a] px-6 py-[10px] overflow-hidden">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent" />
              <span className="relative text-[10px] font-[600] tracking-[0.22em] text-amber-100/80 uppercase">Take Action</span>
            </div>
          </div>
          
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[48px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[18px]" />
          
          <h2 className="mt-6 bg-gradient-to-b from-white via-white to-[#8a8a8e] bg-clip-text text-center text-[48px] font-[600] leading-[0.9] tracking-[-0.03em] text-transparent sm:text-[64px] lg:text-[80px]">
            The Choice Is Yours
          </h2>
          
          <div className="relative mt-6 h-[1px] w-[240px] sm:w-[380px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-[18px] w-[260px] -translate-x-1/2 -translate-y-1/2 bg-amber-300/20 blur-[14px]" />
          </div>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-5">
            <button className="group relative inline-flex w-full items-center justify-center rounded-full border border-[rgba(239,68,68,0.24)] bg-[rgba(12,12,12,0.85)] px-8 py-[18px] text-[14px] font-[500] tracking-[-0.01em] text-white/90 backdrop-blur transition-all duration-300 hover:border-[rgba(239,68,68,0.38)] hover:bg-white/[0.06] hover:text-white sm:w-auto sm:min-w-[240px]">
              <span className="relative">Continue the Old Way &rarr;</span>
              <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_24px_rgba(239,68,68,0.18)] transition-opacity duration-300 group-hover:opacity-100" />
            </button>
            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadForm'))} className="group relative inline-flex w-full items-center justify-center rounded-full bg-gradient-to-b from-[#fde68a] via-[#facc15] to-[#f59e0b] px-8 py-[18px] text-[14px] font-[600] tracking-[-0.01em] text-black shadow-[0_0_0_1px_rgba(255,255,255,0.6)_inset,0_6px_20px_rgba(251,191,36,0.35),0_0_50px_rgba(251,191,36,0.25)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_8px_28px_rgba(251,191,36,0.45),0_0_70px_rgba(251,191,36,0.38)] hover:brightness-[1.06] active:scale-[0.98] sm:w-auto sm:min-w-[240px]">
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-white/20 to-transparent opacity-90" />
              <span className="relative flex items-center gap-1.5">
                Build My Workforce &rarr;
              </span>
            </button>
          </div>
        </motion.div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          60% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
