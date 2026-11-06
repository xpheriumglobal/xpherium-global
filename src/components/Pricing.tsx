import { CheckCircle2, Monitor, TrendingUp, ArrowRight, X } from 'lucide-react';
import { motion } from 'motion/react';

const tier1Features = [
  'Premium website',
  'SEO-ready',
  'Mobile optimized',
  'AI Smart chatbot',
  'Lead forms',
  'Appointment booking',
  '24/7 AI voice receptionist',
  'Lead capture',
];

const tier2Features = [
  'WhatsApp automation',
  'Email & SMS automation',
  'AI Customer Support',
  'GMB Review',
  'WhatsApp Follow-up',
  'AI Social Media Manager',
  'AI Invoices',
  'AI Follow-up reminders',
  'AI Proposal generation',
];

const tier3Features = [
  { title: 'Need a sales department?', desc: 'We provide one.' },
  { title: 'Need a marketing department?', desc: 'We provide one.' },
  { title: 'Need AI operations?', desc: 'We provide one.' },
  { title: 'Need Social Media Manager?', desc: 'We provide one.' },
];

// ========== TRIAL TOGGLE ==========
// true = hide section (trial mode) -> stops fetching/rendering
// false = show section again
const HIDE_FOR_TRIAL = true;
// ==================================

export function Pricing() {
  // This completely stops it from fetching/rendering
  if (HIDE_FOR_TRIAL) {
    return null;
  }

  return (
    <section id="pricing" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-full bg-[#0a0a0a] pt-12 pb-24 md:pt-16 md:pb-32 px-4 md:px-8 font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#c89845]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col items-center text-center mb-10 md:mb-12"
        >
          {/* Pill Badge */}
          <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group relative inline-flex items-center justify-center rounded-full p-[1px] bg-gradient-to-b from-amber-200/40 to-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.15)] mb-6">
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative rounded-full bg-[#0a0a0a] px-6 py-[10px] overflow-hidden">
              <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent" />
              <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative text-[10px] font-[600] tracking-[0.22em] text-amber-100/80 uppercase">Choose Your System</span>
            </div>
          </div>

          <h2 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight mb-6 flex flex-wrap justify-center gap-x-3 md:gap-x-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fde68a] to-white">
            {"Built For Every Stage of Growth".split(" ").map((word, wordIndex, wordsArray) => {
              const previousLettersCount = wordsArray.slice(0, wordIndex).join("").length;
              const totalLetters = wordsArray.join("").length;
              return (
                <span key={wordIndex} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex">
                  {word.split("").map((letter, letterIndex) => {
                    const i = previousLettersCount + letterIndex;
                    const startAppear = (i / totalLetters) * (2 / 3);
                    const endAppear = Math.min(startAppear + (0.1 / 3), 0.99);
                    const startFadeOut = 2.5 / 3;
                    return (
                      <motion.span
                        key={letterIndex}
                        animate={i === 0 ? { opacity: [0, 1, 1, 0] } : { opacity: [0, 0, 1, 1, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          times: i === 0 ? [0, endAppear, startFadeOut, 1] : [0, startAppear, endAppear, startFadeOut, 1],
                          ease: "easeInOut"
                        }}
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </h2>
          <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-zinc-400 text-lg md:text-xl max-w-2xl font-light">
            Powerful systems. Purpose-built for your business. Scalable as you grow.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col h-full rounded-3xl border border-zinc-800/80 bg-[#0c0c0c] p-8 md:p-10 transition-all duration-300 hover:border-zinc-600 hover:shadow-2xl relative group overflow-hidden"
          >
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-white/5 blur-[50px] pointer-events-none" />
            
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-5 mb-8">
              <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-16 h-16 rounded-2xl border border-zinc-700/80 bg-zinc-900/50 flex items-center justify-center shrink-0 shadow-inner group-hover:border-zinc-500 transition-colors">
                <Monitor className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-8 h-8 text-[#c89845]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[#c89845] text-xs font-bold tracking-widest uppercase mb-1">Tier 1</div>
                <h3 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-2xl font-bold text-white">Smart Website</h3>
              </div>
            </div>

            <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-zinc-300 mb-8 pb-8 border-b border-zinc-800/80 text-[15px]">
              Get online. Get leads. Get growing.
            </p>

            <ul className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col gap-4 mb-10 flex-1">
              {tier1Features.map((feature, i) => (
                <li key={i} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-3">
                  <CheckCircle2 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-5 h-5 text-[#c89845] shrink-0" strokeWidth={1.5} />
                  <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-zinc-300 text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>

            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadForm'))} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-full mt-auto group/btn flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-transparent py-4 text-white font-medium transition-all hover:border-[#c89845] hover:bg-[#c89845]/5">
              Get My Smart Website
              <ArrowRight className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-4 h-4 text-zinc-400 group-hover/btn:text-[#c89845] transition-colors group-hover/btn:translate-x-1" />
            </button>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col h-full rounded-3xl border border-zinc-800/80 bg-[#0c0c0c] p-8 md:p-10 transition-all duration-300 hover:border-zinc-600 hover:shadow-2xl relative group overflow-hidden"
          >
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-white/5 blur-[50px] pointer-events-none" />
            
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-5 mb-8">
              <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-16 h-16 rounded-2xl border border-zinc-700/80 bg-zinc-900/50 flex items-center justify-center shrink-0 shadow-inner group-hover:border-zinc-500 transition-colors">
                <TrendingUp className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-8 h-8 text-[#c89845]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[#c89845] text-xs font-bold tracking-widest uppercase mb-1">Tier 2</div>
                <h3 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-2xl font-bold text-white">Growth OS</h3>
              </div>
            </div>

            <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-zinc-300 mb-8 pb-8 border-b border-zinc-800/80 text-[15px]">
              Automate. Engage. Convert.
            </p>

            <ul className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col gap-4 mb-10 flex-1">
              {tier2Features.map((feature, i) => (
                <li key={i} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-3">
                  <CheckCircle2 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-5 h-5 text-[#c89845] shrink-0" strokeWidth={1.5} />
                  <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-zinc-300 text-[15px]">{feature}</span>
                </li>
              ))}
            </ul>

            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadForm'))} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-full mt-auto group/btn flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-transparent py-4 text-white font-medium transition-all hover:border-[#c89845] hover:bg-[#c89845]/5">
              Launch My Growth OS
              <ArrowRight className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-4 h-4 text-zinc-400 group-hover/btn:text-[#c89845] transition-colors group-hover/btn:translate-x-1" />
            </button>
          </motion.div>

          {/* Card 3 (Premium) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col h-full rounded-3xl border border-[#c89845]/60 bg-[#0c0c0c] p-8 md:p-10 shadow-[0_0_40px_rgba(200,152,69,0.15)] relative group overflow-hidden md:col-span-2 lg:col-span-1"
          >
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(200,152,69,0.15),transparent_60%)] pointer-events-none" />
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute inset-0 bg-gradient-to-b from-[#c89845]/5 to-transparent pointer-events-none" />
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c89845] to-transparent opacity-50" />

            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-5 mb-8 relative z-10">
              <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-16 h-16 rounded-2xl border border-[#c89845]/40 bg-zinc-900/80 flex items-center justify-center shrink-0 shadow-[inset_0_0_15px_rgba(200,152,69,0.2)]">
                <X className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-8 h-8 text-[#c89845]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[#c89845] text-xs font-bold tracking-widest uppercase mb-1">Tier 3</div>
                <h3 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-2xl font-bold text-white drop-shadow-md">X-PHERIUM</h3>
              </div>
            </div>

            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-8 pb-8 border-b border-zinc-800/80 relative z-10">
              <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[#c89845] font-medium mb-3 text-[15px]">We automate. You dominate.</p>
              <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-zinc-400 text-sm leading-relaxed">We Hold Mastery to automate almost anything. Describe the business problem. We assembles the right combination of AI, software, specialists, and processes to solve it.</p>
            </div>

            <ul className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col gap-6 mb-10 flex-1 relative z-10">
              {tier3Features.map((feature, i) => (
                <li key={i} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-start gap-4">
                  <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-6 h-6 shrink-0 rounded-full bg-[#c89845]/10 flex items-center justify-center mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[#c89845]"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" /></svg>
                  </div>
                  <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col">
                    <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-zinc-200 text-[15px] font-medium leading-snug">{feature.title}</span>
                    <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-zinc-500 text-sm">{feature.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadForm'))} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-full mt-auto group/btn flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e8c07d] to-[#b88635] py-4 text-black font-bold transition-all shadow-[0_0_20px_rgba(200,152,69,0.3)] hover:shadow-[0_0_30px_rgba(200,152,69,0.5)] hover:brightness-110 active:scale-[0.98] relative z-10">
              Build My X-PHERIUM
              <ArrowRight className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-5 h-5 text-black/80 transition-transform group-hover/btn:translate-x-1" strokeWidth={2.5} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
