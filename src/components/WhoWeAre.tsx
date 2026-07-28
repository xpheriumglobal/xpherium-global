import { Phone, List, Clock, Link2, Settings, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export function WhoWeAre() {
  return (
    <section className="w-full bg-[#0a0a0a] pt-16 pb-0 md:pt-20 md:pb-0 px-4 md:px-8 font-sans relative overflow-hidden">
      {/* Ambient left glow */}
      <div className="absolute top-1/2 -left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#c89845]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 lg:gap-16">
        
        {/* Left Column */}
        <div className="md:w-fit shrink-0 flex flex-col justify-center relative md:pr-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[5rem] md:text-[7rem] font-bold leading-[0.9] tracking-tight">
              <span className="text-white block">Who</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8c07d] to-[#b88635] block">We Are</span>
            </h2>
            <div className="mt-8 flex items-center">
              <div className="h-[2px] w-32 bg-gradient-to-r from-white via-[#c89845] to-transparent shadow-[0_0_15px_rgba(200,152,69,0.8)]" />
            </div>
          </motion.div>
        </div>

        {/* Center Divider (Desktop) */}
        <div className="hidden md:flex flex-col items-center justify-center relative w-10 shrink-0">
          <div className="w-[1px] absolute inset-y-0 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
          <div className="w-4 h-4 rounded-full border border-[#c89845] flex items-center justify-center bg-[#0a0a0a] z-10 shadow-[0_0_10px_rgba(200,152,69,0.5)]">
            <div className="w-1.5 h-1.5 bg-[#c89845] rounded-full" />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-[2.5rem] font-medium text-white leading-tight mb-8">
              The fastest way to grow isn't hiring more.<br />
              It's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8c07d] to-[#b88635]">removing friction.</span>
            </h3>

            {/* Friction Points List */}
            <div className="flex flex-wrap xl:flex-nowrap items-center gap-y-4 gap-x-3 lg:gap-x-4 mb-8">
              {[
                { icon: Phone, text: "Every missed call." },
                { icon: List, text: "Every manual task." },
                { icon: Clock, text: "Every delayed response." },
                { icon: Link2, text: "Every disconnected system." }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 lg:gap-3 whitespace-nowrap">
                  <div className="w-6 h-6 shrink-0 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/50">
                    <item.icon className="w-3 h-3 text-[#c89845]" />
                  </div>
                  <span className="text-sm text-zinc-300">{item.text}</span>
                  {i < 3 && <span className="hidden md:block text-zinc-800 ml-1.5 lg:ml-2">|</span>}
                </div>
              ))}
            </div>

            <p className="text-zinc-500 text-lg mb-12 max-w-none lg:whitespace-nowrap leading-relaxed">
              They quietly cost your business time, money, and opportunities — every single day.
            </p>

            {/* Value Cards */}
            <div className="flex flex-col gap-6">
              {/* Card 1 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="border border-zinc-800/60 bg-[#0f0f0f]/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start group transition-colors hover:border-[#c89845]/30"
              >
                <div className="w-16 h-16 shrink-0 rounded-full border border-zinc-800 group-hover:border-[#c89845]/50 bg-black flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,1)] transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#c89845]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <Settings className="w-7 h-7 text-[#c89845] relative z-10" />
                </div>
                <div>
                  <div className="text-[#c89845] text-xs font-bold tracking-[0.15em] uppercase mb-3">
                    We don't sell automation.
                  </div>
                  <p className="text-xl text-zinc-300 leading-relaxed font-light">
                    We help businesses <span className="text-[#e8c07d] font-medium">save time, cut costs, eliminate operational bottlenecks,</span> and scale without adding unnecessary complexity.
                  </p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="border border-zinc-800/60 bg-[#0f0f0f]/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start group transition-colors hover:border-[#c89845]/30"
              >
                <div className="w-16 h-16 shrink-0 rounded-full border border-zinc-800 group-hover:border-[#c89845]/50 bg-black flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,1)] transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#c89845]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <Rocket className="w-7 h-7 text-[#c89845] relative z-10" />
                </div>
                <div>
                  <div className="text-[#c89845] text-xs font-bold tracking-[0.15em] uppercase mb-3">
                    We don't automate tasks.
                  </div>
                  <p className="text-xl text-zinc-300 leading-relaxed font-light">
                    We engineer businesses that <span className="text-[#e8c07d] font-medium">run efficiently.</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
