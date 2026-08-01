import { useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';


export default function AboutUs() {
  useSEO({
    title: "Built to Eliminate Repetitive Work with AI | X-PHERIUM Global",
    description: "Discover how X-PHERIUM Global helps businesses eliminate repetitive work through AI automation, intelligent workflows, and digital workforces that increase productivity and reduce operational costs.",
    canonicalUrl: "/about",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About X-PHERIUM",
      "description": "Learn more about X-PHERIUM, our mission, vision, and the team behind the digital workforce automation.",
      "url": "https://xpheriumglobal.com/about"
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const textGradient = {
    background: "linear-gradient(100deg, #f5c242 0%, #e8a84c 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent"
  };

  return (
    <div className="w-full bg-[#050507] text-[#E5E7EB] selection:bg-[#f5c242]/30 selection:text-white overflow-x-hidden flex-1 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
        .about-page { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .about-page .font-syne { font-family: 'Syne', sans-serif; }
        .about-page p {
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
          -ms-hyphens: auto;
          word-spacing: normal;
          overflow-wrap: break-word;
        }
        .about-page h1, .about-page h2, .about-page h3 {
          text-align: left;
        }
        .about-page .justify-copy {
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        @keyframes floatGlow {
          0%,100% { transform: translate(-50%,0) scale(1); opacity: 0.9; }
          50% { transform: translate(-50%,-8px) scale(1.05); opacity: 1; }
        }
      `}</style>

      <div className="about-page relative flex w-full flex-col items-start justify-center overflow-hidden text-left pt-[80px]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#050507]"></div>
          <div className="absolute left-1/2 top-0 h-[680px] w-full max-w-[1200px] -translate-x-1/2 rounded-full blur-[1px]" style={{background: "radial-gradient(600px at 50% 0%, rgba(245,194,66,0.18) 0%, rgba(245,194,66,0.08) 32%, rgba(245,194,66,0.02) 55%, transparent 72%)", animation: "floatGlow 8s ease-in-out infinite"}}></div>
          <div className="absolute left-1/2 md:left-[68%] top-[8%] h-[520px] w-[90%] max-w-[520px] -translate-x-1/2 md:translate-x-[-50%] rounded-full blur-[24px]" style={{background: "radial-gradient(400px at 50% 30%, rgba(232,168,76,0.14) 0%, rgba(232,168,76,0.04) 40%, transparent 70%)"}}></div>
          <div className="absolute left-1/2 md:left-[18%] top-[12%] h-[420px] w-[80%] max-w-[420px] -translate-x-1/2 md:translate-x-[-50%] rounded-full blur-[32px]" style={{background: "radial-gradient(340px at 50% 50%, rgba(212,160,65,0.10) 0%, transparent 65%)"}}></div>
          <div className="absolute left-1/2 top-[-2%] h-[2px] w-full max-w-[1200px] origin-center blur-[0.5px]" style={{background: "linear-gradient(90deg, transparent 0%, rgba(245,194,66,0.18) 30%, rgba(245,194,66,0.32) 50%, rgba(245,194,66,0.12) 75%, transparent 100%)", transform: "translateX(-50%) rotate(-8deg)", opacity: 0.7}}></div>
          <div className="absolute left-1/2 top-[6%] h-[1px] w-[90%] max-w-[900px] origin-center" style={{background: "linear-gradient(90deg, transparent 0%, rgba(245,194,66,0.08) 25%, rgba(245,194,66,0.22) 55%, transparent 100%)", transform: "translateX(-50%) rotate(-4deg)", opacity: 0.9}}></div>
          <div className="absolute inset-0" style={{background: "linear-gradient(to bottom, rgba(5,5,7,0) 0%, rgba(5,5,7,0.1) 45%, rgba(5,5,7,0.75) 88%, #050507 100%)"}}></div>
          <div className="absolute inset-0 opacity-[0.035] mix-blend-soft-light" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`}}></div>
        </div>
        
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-start px-6 md:px-10" style={{minHeight: "52vh", paddingTop: "96px", paddingBottom: "72px"}}>
          <div className="mb-8 inline-flex items-center rounded-full px-[14px] py-[5px]" style={{background: "rgba(245,194,66,0.08)", border: "1px solid rgba(245,194,66,0.18)", fontSize: "11.5px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#f5c242", boxShadow: "0 0 20px rgba(245,194,66,0.12) inset"}}>
            About XPherium
          </div>
          <h1 className="w-full max-w-[1100px] text-left font-syne" style={{fontWeight: 800, fontSize: "clamp(38px, 5.4vw, 60px)", lineHeight: 1.06, letterSpacing: "-0.03em"}}>
            <span style={{color: "#FFFFFF"}}>Engineering Businesses</span>{" "}
            <span style={textGradient}>That Move Faster.</span>
          </h1>
          <p className="mt-7 w-full max-w-[900px] justify-copy" style={{fontSize: "17px", lineHeight: 1.75, fontWeight: 400, color: "#C7C9D1"}}>
            We architect the operating systems behind ambitious companies — where strategy, product, and execution move as one. Our systems stretch edge-to-edge, eliminating wasted space and aligning every operational layer into a single coherent execution engine designed for compounding speed and clarity.
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] justify-center px-6 md:px-10" style={{paddingBottom: "88px"}}>
        <div className="h-px w-full" style={{background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.06) 20%, rgba(245,194,66,0.55) 50%, rgba(255,255,255,0.06) 80%, rgba(0,0,0,0) 100%)"}}></div>
      </div>

      <main className="about-page relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <section style={{marginBottom: "96px", width: "100%"}}>
          <h2 className="mb-8 text-left font-syne" style={{fontWeight: 800, fontSize: "40px", lineHeight: 1.1, letterSpacing: "-0.03em"}}>
            <span style={{color: "#FFFFFF"}}>Who We</span>{" "}
            <span style={textGradient}>Are</span>
          </h2>
          <div className="w-full space-y-5" style={{fontSize: "17px", lineHeight: 1.8, fontWeight: 400}}>
            <p style={{color: "#E5E7EB"}}>
              XPherium is a business engineering studio for founders who are past the early scramble and ready to build a company that actually scales. We don't do generic playbooks or outsourced departments. We embed, we diagnose, and we rebuild how your business makes decisions, ships product, and captures value.
            </p>
            <p style={{color: "#9CA3AF"}}>
              Founded by operators who have scaled products to millions, raised and deployed capital, and fixed the broken middle where growth usually stalls. We've sat on both sides of the table — as builders inside high-velocity teams and as partners brought in when execution breaks down. That perspective is our edge.
            </p>
            <p style={{color: "#9CA3AF"}}>
              We work with a small number of companies at a time. No juniors on your account, no bloated retainers. Just senior architects focused on one outcome: making your business move faster, cleaner, and with far less drag.
            </p>
          </div>
        </section>

        <div className="mx-auto flex w-full justify-center" style={{marginBottom: "96px", width: "100%"}}>
          <div className="h-px w-full" style={{background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.06) 20%, rgba(245,194,66,0.5) 50%, rgba(255,255,255,0.06) 80%, rgba(0,0,0,0) 100%)"}}></div>
        </div>

        <section style={{marginBottom: "96px", width: "100%"}}>
          <h2 className="mb-8 text-left font-syne" style={{fontWeight: 800, fontSize: "40px", lineHeight: 1.1, letterSpacing: "-0.03em"}}>
            <span style={{color: "#FFFFFF"}}>Our</span>{" "}
            <span style={textGradient}>Philosophy</span>
          </h2>
          <div className="w-full space-y-5" style={{fontSize: "17px", lineHeight: 1.8, fontWeight: 400}}>
            <p style={{color: "#E5E7EB"}}>
              Most businesses don't fail from lack of effort. They fail from friction — unclear ownership, scattered tooling, strategy that lives in decks instead of systems. We believe speed is not about working harder; it's about removing what slows you down.
            </p>
            <p style={{color: "#9CA3AF"}}>
              Our philosophy is simple: engineer the business like you would engineer a product. Define the operating system. Design the interfaces between people, capital, and customers. Then automate, document, and measure everything that matters. Luxury is not excess — it's precision, quiet, and everything working exactly when it should.
            </p>
            <p style={{color: "#9CA3AF"}}>
              We don't chase trends. We build foundations that compound. A business that moves fast today is valuable; a business engineered to move faster every quarter is unstoppable.
            </p>
          </div>
        </section>

        <div className="mx-auto flex w-full justify-center" style={{marginBottom: "96px", width: "100%"}}>
          <div className="h-px w-full" style={{background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.06) 20%, rgba(245,194,66,0.5) 50%, rgba(255,255,255,0.06) 80%, rgba(0,0,0,0) 100%)"}}></div>
        </div>

        <section style={{marginBottom: "96px", width: "100%"}}>
          <h2 className="mb-8 text-left font-syne" style={{fontWeight: 800, fontSize: "40px", lineHeight: 1.1, letterSpacing: "-0.03em"}}>
            <span style={{color: "#FFFFFF"}}>Our</span>{" "}
            <span style={textGradient}>Mission</span>
          </h2>
          <div className="relative pl-6 md:pl-9" style={{borderLeft: "1.5px solid rgba(245,194,66,0.22)", width: "100%"}}>
            <div className="absolute left-[-1.5px] top-0 h-[64px] w-[1.5px]" style={{background: "linear-gradient(180deg, #f5c242 0%, rgba(245,194,66,0) 100%)"}}></div>
            <p className="justify-copy font-syne" style={{fontSize: "clamp(21px, 2.6vw, 26px)", lineHeight: 1.5, fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.015em"}}>
              To turn ambitious founders into sovereign operators — giving them the clarity, systems, and leverage to build enduring businesses without burning out.
            </p>
            <p className="mt-5 justify-copy" style={{fontSize: "16px", lineHeight: 1.75, color: "#9CA3AF", fontWeight: 400}}>
              We measure success not in deliverables, but in decisions made faster, teams unblocked, and revenue that no longer depends on heroics.
            </p>
          </div>
        </section>

        <div className="mx-auto flex w-full justify-center" style={{marginBottom: "96px", width: "100%"}}>
          <div className="h-px w-full" style={{background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.06) 20%, rgba(245,194,66,0.5) 50%, rgba(255,255,255,0.06) 80%, rgba(0,0,0,0) 100%)"}}></div>
        </div>

        <section style={{marginBottom: "96px", width: "100%"}}>
          <h2 className="mb-8 text-left font-syne" style={{fontWeight: 800, fontSize: "40px", lineHeight: 1.1, letterSpacing: "-0.03em"}}>
            <span style={{color: "#FFFFFF"}}>Our</span>{" "}
            <span style={textGradient}>Vision</span>
          </h2>
          <div className="w-full space-y-5" style={{fontSize: "17px", lineHeight: 1.8, color: "#E5E7EB", fontWeight: 400}}>
            <p style={{color: "#E5E7EB"}}>
              A world where the best ideas don't die inside messy organizations. Where founders aren't prisoners of the business they built. Where companies are designed to be calm, profitable, and fast — all at once.
            </p>
            <p style={{color: "#9CA3AF"}}>
              We envision XPherium as the quiet infrastructure behind the next generation of category leaders. Not an agency on your website footer, but the reason your business feels inevitable. The Business OS that lets you think bigger because the foundation is handled.
            </p>
            <p style={{color: "#9CA3AF"}}>
              Luxury, for us, is time returned, options created, and a company that moves with intention. That's the future we're engineering — one business at a time.
            </p>
          </div>
        </section>
      </main>

      <section className="relative z-10 mt-8 w-full border-t border-white/[0.06] bg-[#07070a]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-8 px-6 py-[56px] md:flex-row md:px-10 md:py-[72px]">
          <h3 className="w-full text-left font-syne" style={{fontSize: "28px", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em"}}>
            <span style={{color: "#FFFFFF"}}>Ready to engineer</span>{" "}
            <span style={textGradient}>your Business OS?</span>
          </h3>
          <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadForm'))} className="inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(245,194,66,0.5)] active:scale-[0.98]" style={{background: "linear-gradient(100deg, #f5c242 0%, #e8a84c 100%)", color: "#0a0a0a", fontSize: "14px", fontWeight: 600, letterSpacing: "0.01em", padding: "13px 28px", boxShadow: "0 0 26px rgba(245,194,66,0.32), 0 4px 14px rgba(0,0,0,0.45)"}}>
            Let's Build <span className="ml-[6px]">→</span>
          </button>
        </div>
      </section>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{background: "radial-gradient(60% 40% at 50% 0%, rgba(245,194,66,0.06) 0%, rgba(0,0,0,0) 70%), radial-gradient(40% 30% at 90% 20%, rgba(212,160,65,0.04) 0%, rgba(0,0,0,0) 60%)"}}></div>
    </div>
  );
}

