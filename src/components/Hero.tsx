import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const words = ["Never Sleep,", "Never Complain,", "& Never Quit."];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = true;
    video.muted = true;
    
    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    };
    
    const onEnded = () => {
      video.currentTime = 0;
      playVideo();
    };
    
    const onVisibilityChange = () => {
      if (!document.hidden) playVideo();
    };
    
    const onFocus = () => {
      playVideo();
    };
    
    video.addEventListener("ended", onEnded);
    video.addEventListener("canplay", playVideo);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", onFocus);
    
    playVideo();
    
    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("canplay", playVideo);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    let timeoutId: number;
    const currentWord = words[wordIndex];
    
    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        timeoutId = window.setTimeout(() => setCharIndex((prev) => prev + 1), 60);
      } else {
        timeoutId = window.setTimeout(() => setIsDeleting(true), 900);
      }
    } else {
      if (charIndex > 0) {
        timeoutId = window.setTimeout(() => setCharIndex((prev) => prev - 1), 30);
      } else {
        timeoutId = window.setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 250);
      }
    }
    
    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, wordIndex]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  const displayedText = words[wordIndex].substring(0, charIndex);

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden antialiased selection:bg-amber-400/30 selection:text-amber-100 font-sans">
      
      <div className="absolute inset-0 overflow-hidden bg-transparent">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", opacity: 1, filter: "brightness(1.1) contrast(1.05) saturate(1.05)" }}
          className="pointer-events-none"
        >
          <source src="https://res.cloudinary.com/zzwokqrq/video/upload/Xpherium_global.mp4" type="video/mp4" />
          <source src="https://res.cloudinary.com/zzwokqrq/video/upload/Xpherium_global.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.6) 40%, rgba(10,10,10,0.2) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 78% 82% at 16% 52%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.14) 42%, transparent 70%)" }} />
        <div className="absolute left-[8%] top-[38%] h-[720px] w-[720px] -translate-y-1/2 rounded-full blur-[110px] pointer-events-none opacity-60" style={{ background: "radial-gradient(circle at center, rgba(251,191,36,0.14) 0%, rgba(251,191,36,0.06) 28%, rgba(251,191,36,0.02) 55%, transparent 75%)" }} />
        <div className="absolute left-[22%] top-[52%] h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-[80px] pointer-events-none opacity-50" style={{ background: "radial-gradient(circle at center, rgba(251,191,36,0.10) 0%, transparent 70%)" }} />
        {/* Gradient transition to the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.02] mix-blend-soft-light" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      <div className="relative z-10 mx-auto flex min-h-[90vh] w-full max-w-7xl flex-col px-4 sm:px-8 lg:px-12 pt-24 lg:pt-32 pb-12">
        
        <div className="flex flex-1 flex-col justify-center pt-8 sm:pt-12 lg:pt-0">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-amber-300/25 bg-[rgba(12,10,8,0.55)] px-4 py-[7px] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_0_24px_rgba(251,191,36,0.12),0_2px_16px_rgba(0,0,0,0.4)]">
            <span className="h-[4px] w-[4px] rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-amber-200/90 uppercase">X-PHERIUM</span>
            <span className="h-3 w-[1px] bg-amber-300/20" />
            <span className="text-[10px] font-medium tracking-[0.18em] text-amber-100/70 uppercase">DIGITAL WORKFORCE OS</span>
          </div>

          <div className="relative mt-7 sm:mt-9 max-w-[760px]">
            <h1 className="font-sans text-[42px] leading-[1.05] tracking-tight font-bold sm:text-[58px] lg:text-[74px] xl:text-[84px] bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent" style={{ textShadow: "0 4px 20px rgba(255,255,255,0.1), 0 2px 10px rgba(200,200,200,0.2)" }}>
              <span className="block">We Build Digital</span>
              <span className="block">Workforces that</span>
            </h1>
            <div className="relative mt-2 sm:mt-3 min-h-[56px] sm:min-h-[72px] lg:min-h-[88px]">
              <h2 className="font-display text-[42px] leading-[0.92] tracking-[-0.04em] font-[800] sm:text-[58px] lg:text-[74px] xl:text-[84px]" style={{ filter: "drop-shadow(0 2px 14px rgba(0,0,0,0.9)) drop-shadow(0 0 28px rgba(0,0,0,0.65))" }}>
                <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(251,191,36,0.45)]">
                  {displayedText}
                </span>
                <span className={`ml-[3px] inline-block h-[0.92em] w-[3px] translate-y-[6%] bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.9)] transition-opacity duration-100 ${cursorVisible ? "opacity-100" : "opacity-0"}`} aria-hidden={true} />
              </h2>
              <div className="pointer-events-none absolute -bottom-2 left-0 h-[1px] w-[78%] bg-gradient-to-r from-amber-400/40 via-amber-300/10 to-transparent blur-[0.5px]" />
            </div>
          </div>
          
          <div className="mt-12 sm:mt-16 max-w-[560px]">
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.7] tracking-wide text-gray-500">
              We deploy AI Soldiers that handle every task inside your business from lead generation to closing deals & from customer support to operations.
            </p>

            <div className="mt-9 sm:mt-11 flex flex-col gap-4">
              <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadForm'))} className="group relative inline-flex items-center gap-3 self-start rounded-full bg-gradient-to-b from-amber-200 to-amber-500 px-[7px] py-[7px] pr-[7px] shadow-[0_0_40px_rgba(251,191,36,0.35),inset_0_1px_0_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(251,191,36,0.5),inset_0_1px_0_0_rgba(255,255,255,0.8)] hover:brightness-[1.05] active:scale-[0.98]">
                <span className="pl-[20px] pr-1 text-[17px] font-[800] tracking-[-0.01em] text-black">
                  Build My Workforce
                </span>
                <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-black text-amber-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] transition-transform duration-300 group-hover:translate-x-[2px]">
                  <ArrowRight className="h-[18px] w-[18px] -rotate-[-2deg]" strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </div>

          <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-y-3 gap-x-0" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)" }}>
            {["100% AUTOMATED", "NO HIRING REQUIRED", "24/7 OPERATING", "INFINITELY SCALABLE"].map((item, index) => (
              <div key={item} className="flex items-center">
                <div className="flex items-center gap-2.5 pr-5 sm:pr-7">
                  <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-amber-400/10 ring-1 ring-amber-300/20">
                    <span className="h-[5px] w-[5px] rounded-full bg-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
                  </span>
                  <span className="whitespace-nowrap text-[10.5px] font-semibold tracking-[0.16em] text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                    {item}
                  </span>
                </div>
                {index < 3 && <span className="mr-5 sm:mr-7 h-3 w-[1px] bg-white/10 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
