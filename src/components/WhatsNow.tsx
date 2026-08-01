
import { motion } from 'motion/react';

export function WhatsNow() {
  return (
    <section className="w-full bg-[#0a0a0a] pt-20 md:pt-32 pb-0 px-4 md:px-8 font-sans flex flex-col items-center relative overflow-hidden">
      
      {/* Pill Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative group"
      >
        {/* Subtle orange/gold glow under the left side of the pill */}
        <div className="absolute -left-2 -bottom-2 w-32 h-12 bg-[#c89845]/30 blur-xl rounded-full pointer-events-none" />
        
        <div className="relative flex items-center rounded-full border border-zinc-800/80 bg-[#050505] py-1.5 pl-1.5 pr-8 shadow-lg">
          {/* Inner badge for "What's Now" */}
          <div className="bg-[#161616] rounded-full px-5 py-2 border border-zinc-800/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
            <span className="text-white font-medium text-sm tracking-wide">What's Now</span>
          </div>
          
          {/* Separator */}
          <div className="mx-5 w-[1px] h-5 bg-zinc-700/80" />
          
          {/* Text */}
          <span className="text-zinc-200 text-sm md:text-base font-light tracking-wide">
            Introducing <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8c07d] to-[#b88635]">X-PHERIUM Global</span> System
          </span>
        </div>
      </motion.div>

      {/* Image Placeholder / Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-7xl mx-auto mt-4 md:mt-6 aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1] rounded-3xl border border-zinc-800/60 bg-[#0c0c0c] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden group"
      >
        <img 
          src="https://res.cloudinary.com/zzwokqrq/image/upload/Xpherium_Globlal_nipkvl.webp" 
          alt="X-PHERIUM Global System" 
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 z-10"
          onError={(e) => {
            // Hide the broken image icon if the file isn't uploaded yet
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        
        {/* Fallback background if image is missing */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,152,69,0.05),transparent_60%)] pointer-events-none" />
      </motion.div>
    </section>
  );
}
