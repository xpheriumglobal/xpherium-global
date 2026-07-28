import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { motion, useMotionValue, animate } from "motion/react";
import {
  Phone, Target, CalendarCheck, Briefcase, Headset,
  UserCog, Settings, Calculator, Users, Search,
  FileEdit, Share2, PenTool, Mic
} from "lucide-react";

const teamMembers = [
  { name: "Receptionist", icon: Phone },
  { name: "Lead Qualifier", icon: Target },
  { name: "Appointment Setter", icon: CalendarCheck },
  { name: "Sales Agent", icon: Briefcase },
  { name: "Customer Support", icon: Headset },
  { name: "Executive Assistant", icon: UserCog },
  { name: "Operations Manager", icon: Settings },
  { name: "Finance Assistant", icon: Calculator },
  { name: "HR Assistant", icon: Users },
  { name: "Recruiter", icon: Search },
  { name: "Content Manager", icon: FileEdit },
  { name: "Social Media Manager", icon: Share2 },
  { name: "Proposal Writer", icon: PenTool },
  { name: "Call Intelligence", icon: Mic },
];

export function MeetYourAiTeam() {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let controls: any;
    let finalPosition = -width;

    if (width === 0) return;

    const distanceLeft = finalPosition - xTranslation.get();
    // Speed multiplier: 80 pixels/sec normal, 25 pixels/sec when hovered
    const speed = isHovered ? 25 : 80;
    const duration = Math.abs(distanceLeft) / speed;

    controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
      ease: "linear",
      duration: duration,
      onComplete: () => {
        xTranslation.set(0);
        controls = animate(xTranslation, [0, finalPosition], {
          ease: "linear",
          duration: Math.abs(finalPosition) / speed,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        });
      },
    });

    return () => controls?.stop();
  }, [xTranslation, width, isHovered]);

  return (
    <section className="w-full bg-[#0a0a0a] py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-4 lg:gap-12 items-center">
        
        {/* Left Side: Label */}
        <div className="shrink-0 flex w-full lg:w-auto justify-start lg:justify-end items-center lg:h-[80px] z-20">
          <div className="font-mono text-base md:text-lg font-bold tracking-widest text-[#c89845] uppercase lg:text-right lg:pr-8 lg:border-r border-[#c89845]/30 mb-2 lg:mb-0 drop-shadow-[0_0_8px_rgba(200,152,69,0.4)]">
            Meet Your <br className="hidden lg:block" /> AI Team
          </div>
        </div>

        {/* Right Side: Marquee */}
        <div className="relative w-full overflow-hidden flex-1">
          {/* Gradients for soft fade */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center w-max"
            style={{ x: xTranslation }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {[1, 2].map((groupIndex) => (
              <div 
                key={groupIndex} 
                className="flex items-center gap-[80px] md:gap-[110px] pr-[80px] md:pr-[110px]"
                ref={groupIndex === 1 ? ref : null}
              >
                {teamMembers.map((member, i) => {
                  const Icon = member.icon;
                  return (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity duration-300 group cursor-default"
                    >
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#c89845]" strokeWidth={2} />
                      <span className="font-semibold whitespace-nowrap text-white text-base md:text-lg tracking-tight">
                        {member.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
