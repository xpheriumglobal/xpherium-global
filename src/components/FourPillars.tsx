import { motion } from 'motion/react';
import { Clock, Target, TrendingUp, Zap } from 'lucide-react';

const pillars = [
  {
    title: "Time",
    description: "Every minute saved creates capacity for growth.",
    icon: <Clock className="w-8 h-8 text-amber-300" strokeWidth={1.5} />,
  },
  {
    title: "Efficiency",
    description: "The simplest operation is often the most powerful.",
    icon: <Zap className="w-8 h-8 text-amber-300" strokeWidth={1.5} />,
  },
  {
    title: "Precision",
    description: "Every workflow should execute with consistency and purpose.",
    icon: <Target className="w-8 h-8 text-amber-300" strokeWidth={1.5} />,
  },
  {
    title: "Scalability",
    description: "Businesses should grow through systems, not increasing complexity.",
    icon: <TrendingUp className="w-8 h-8 text-amber-300" strokeWidth={1.5} />,
  }
];

export function FourPillars() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-white selection:bg-[#c89845]/20 antialiased font-sans pt-0 pb-20 sm:pb-28">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 w-[90%] max-w-[1000px] h-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(200,152,69,0.05)_0%,transparent_72%)] blur-[20px]" />
      
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-[7px]">
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#c89845] uppercase">OUR FOUNDATION</span>
          </div>
        </div>

        <div className="relative mx-auto mt-2 flex h-[1px] w-[80px] justify-center overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c89845] to-transparent shadow-[0_0_12px_rgba(200,152,69,0.9)]" />
          <div className="absolute -top-[1.5px] h-[4px] w-[4px] rounded-full bg-[#f8d36a] shadow-[0_0_8px_rgba(248,211,106,1)]" />
        </div>

        <h2 className="mx-auto mt-5 max-w-[1000px] text-center text-[34px] sm:text-[48px] lg:text-[52px] font-bold leading-[1.05] tracking-[-0.03em] bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          The Four Pillars of <span className="bg-gradient-to-r from-[#e8c07d] via-[#f5c242] to-[#e8a84c] bg-clip-text text-transparent">X- Pherium</span>
        </h2>

        <p className="mx-auto mt-3 max-w-[800px] text-center text-[15px] sm:text-[16px] leading-[1.6] text-zinc-400">
          These principles guide everything we build and every system we engineer.
        </p>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card dots connection (desktop only) */}
              {index < pillars.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-[#c89845]/30 z-0">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#f5c242] shadow-[0_0_8px_rgba(245,194,66,0.8)]" />
                </div>
              )}
              
              <div className="relative z-10 flex h-full flex-col items-center justify-start rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-colors duration-300 hover:bg-white/[0.04]">
                <div className="mb-8 relative flex items-center justify-center w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-[#c89845]/5 blur-xl group-hover:bg-[#c89845]/10 transition-colors" />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-[#c89845]/20 bg-gradient-to-b from-[#c89845]/10 to-transparent shadow-[inset_0_0_20px_rgba(200,152,69,0.1)]">
                     {pillar.icon}
                  </div>
                </div>
                
                <h3 className="mb-4 text-center text-[22px] font-bold tracking-[-0.02em] text-white">
                  {pillar.title}
                </h3>
                
                <p className="text-center text-[14px] leading-[1.6] text-zinc-400">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
