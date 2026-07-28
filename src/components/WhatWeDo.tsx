import { Search, Lightbulb, Zap, UserMinus, Crown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const services = [
  {
    icon: Search,
    title: 'We Analyze',
    description: 'Your business like a hacker',
  },
  {
    icon: Lightbulb,
    title: 'We Design',
    description: 'AI agents that think',
  },
  {
    icon: Zap,
    title: 'We Automate',
    description: 'Every repetitive or manual task',
  },
  {
    icon: UserMinus,
    title: 'We Remove',
    description: 'The need for employees',
  },
  {
    icon: Crown,
    title: 'You Scale',
    description: 'Without limits, without chaos',
  },
];

export function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Loop automation animation from one stage to another
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % services.length);
    }, 2500); // 2.5 seconds per stage
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-[#0a0a0a] py-16 md:py-20 px-4 md:px-8 font-sans overflow-hidden relative">
      {/* Radiant background effect (overall ambient glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#c89845]/15 via-white/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20 relative flex flex-col items-center">
          {/* Glowing orb behind title for radiant effect */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[80px] bg-gradient-to-r from-white/30 to-[#c89845]/30 blur-[40px] rounded-full pointer-events-none"
          />
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c89845] to-white text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase relative drop-shadow-lg"
            style={{ backgroundSize: '200% auto' }}
          >
            What We Do
          </motion.h2>
          <div className="mt-6 h-[1px] w-16 bg-gradient-to-r from-transparent via-[#c89845] to-transparent shadow-[0_0_10px_rgba(200,152,69,0.5)]" />
        </div>

        <div className="relative">
          {/* Connecting automation track line for desktop (underneath circles) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-[#c89845]/20 -z-10" />
          
          {/* Animated active progress line */}
          <div
            className="hidden lg:block absolute top-12 left-[10%] h-[2px] bg-gradient-to-r from-white via-[#c89845] to-white -z-10 transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(200,152,69,0.8)]"
            style={{ width: `${(activeIndex / (services.length - 1)) * 80}%` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = index === activeIndex;
              const isPast = index <= activeIndex;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group relative"
                >
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-all duration-700 relative bg-[#0a0a0a] z-10 ${
                      isActive
                        ? 'border-2 border-white scale-110 shadow-[0_0_40px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(200,152,69,0.5)]'
                        : isPast
                        ? 'border border-[#c89845] shadow-[0_0_15px_rgba(200,152,69,0.2)]'
                        : 'border border-[#c89845]/30 group-hover:border-[#c89845]/60'
                    }`}
                  >
                    {/* Inner radiant glow when active */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-[#c89845]/30 blur-md pointer-events-none"
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    <Icon
                      className={`w-10 h-10 transition-colors duration-700 ${
                        isActive 
                          ? 'text-white' 
                          : isPast 
                            ? 'text-[#c89845]' 
                            : 'text-[#c89845]/50'
                      }`}
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </div>

                  <h3
                    className={`text-lg font-bold uppercase tracking-[0.1em] mb-4 transition-all duration-700 ${
                      isActive 
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] scale-105' 
                        : 'text-white/80'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className={`text-xs font-medium uppercase tracking-[0.1em] max-w-[200px] leading-loose transition-colors duration-700 ${
                    isActive ? 'text-zinc-200' : 'text-zinc-500'
                  }`}>
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
