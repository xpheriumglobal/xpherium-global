import { useEffect, useState } from 'react';
import { useSEO } from '../hooks/useSEO';

import { Minus, Plus, ArrowUpRight } from 'lucide-react';

const faqData = [
  { q: `What does XPHERIUM Global do?`, a: `We design and deploy Digital Workforces — coordinated systems of AI Employees, AI Agents, and intelligent workflows that run your operations across sales, support, marketing, operations, and more.` },
  { q: `What is a Digital Workforce?`, a: `Not a single tool. A complete operational system. A team of specialized AI Employees and Agents working together to execute business processes with speed and consistency.` },
  { q: `How are you different from an automation agency?`, a: `Agencies connect tools. We redesign how your business operates. We architect scalable systems that integrate with your stack, eliminate friction, and compound in value over time.` },
  { q: `Who is this for?`, a: `Founders, CEOs, and operators at professional service firms, healthcare, home services, SaaS, agencies, and enterprises who need operations to scale without adding headcount.` },
  { q: `What's the difference between an AI Employee and an AI Agent?`, a: `An AI Employee performs a defined role — qualifying leads, supporting customers, managing schedules. An AI Agent is autonomous — it makes decisions, connects systems, and collaborates with other agents to achieve outcomes.` },
  { q: `Will this replace my team?`, a: `No. It removes the repetitive work so your team can focus on customers, growth, and decisions that require human judgment.` },
  { q: `Is every system custom?`, a: `Yes. No templates. Every Digital Workforce is architected around your processes, tools, and goals.` },
  { q: `How long does implementation take?`, a: `Most deployments go live in 2–6 weeks, depending on complexity and integrations.` },
  { q: `Do we need technical resources?`, a: `No. We handle architecture, integration, testing, and deployment. You focus on outcomes.` },
  { q: `Do you integrate with our existing software?`, a: `Yes. We build around your current stack to minimize disruption and maximize ROI.` },
  { q: `Can we start with one department?`, a: `That's how most clients start. Prove value in one workflow, then expand.` },
  { q: `Is our data secure?`, a: `Security is foundational. We implement secure integrations, role-based access controls, and encrypted communication across every deployment. NDA available on request.` },
  { q: `Who owns the system?`, a: `You own your data, workflows, and processes. Ownership of custom components is defined clearly in your agreement.` },
  { q: `How much does it cost?`, a: `Scope-dependent. After discovery, you'll receive a tailored proposal with clear pricing and an implementation roadmap.` },
  { q: `How do you measure success?`, a: `Not by number of automations. By business outcomes — hours recovered, response time reduced, costs lowered, revenue velocity increased.` },
  { q: `What happens after launch?`, a: `Launch is day one. We monitor, optimize, and expand your Digital Workforce as your business evolves.` },
];

export default function FAQ() {
  useSEO({
    title: "F A Q",
    description: "Frequently asked questions about X-Pherium OS and our services.",
    canonicalUrl: "/faq",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": []
    }
  });

  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
<div className="min-h-screen bg-[#020203] text-white selection:bg-amber-400/20 selection:text-amber-200 relative overflow-hidden"><style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600&display=swap');
        * { font-family: "Space Grotesk", system-ui, sans-serif; }
        h1,h2,.font-outfit { font-family: "Outfit", sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(251,191,36,0.2); border-radius: 999px; }
      `}</style><div className="pointer-events-none absolute inset-0"><div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full blur-[120px] opacity-[0.18]" style={{background: 'radial-gradient(60% 60% at 50% 30%, rgba(251, 191, 36, 0.45) 0%, rgba(251, 191, 36, 0.08) 35%, transparent 70%)'}} /><div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-[0.12]" style={{background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5), transparent 65%)'}} /><div className="absolute top-[45%] left-[-15%] w-[500px] h-[500px] rounded-full blur-[110px] opacity-[0.10]" style={{background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent 70%)'}} /><div className="absolute inset-0 opacity-[0.35]" style={{backgroundImage: 'radial-gradient(rgba(251, 191, 36, 0.9) 1px, transparent 1px), radial-gradient(rgba(251, 191, 36, 0.4) 1px, transparent 1px)', backgroundSize: '72px 72px, 128px 128px', backgroundPosition: '0px 0px, 36px 64px', maskImage: 'radial-gradient(80% 60% at 50% 0%, black 30%, transparent 100%)'}} /><div className="absolute inset-0 opacity-[0.045] mix-blend-soft-light" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.95\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'}} /><div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_0%,transparent_60%,rgba(0,0,0,0.9)_100%)]" /></div><section className="relative mx-auto max-w-[1280px] px-6 lg:px-8 pt-[120px] lg:pt-[140px] pb-[48px] lg:pb-[64px] text-center"><div className="mx-auto inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5" style={{borderColor: 'rgba(251, 191, 36, 0.25)', background: 'rgba(251, 191, 36, 0.08)'}}><span className="w-1.5 h-1.5 rounded-full bg-[#facc15] shadow-[0_0_8px_rgba(250,204,21,0.8)]" /><span className="text-[11px] tracking-[0.18em] font-semibold text-[#facc15] uppercase">{`FAQ`}</span></div><h1 className="font-outfit mt-8 mx-auto max-w-[760px] text-[44px] sm:text-[64px] lg:text-[80px] font-[700] leading-[0.92] tracking-[-0.03em] text-white">{`Questions`}<span className="block font-[300] italic tracking-[-0.04em] text-white/90">{`Worth Asking.`}</span></h1><p className="mx-auto mt-6 max-w-[560px] text-[17px] lg:text-[18px] leading-[1.6] text-[#a1a1aa] font-light">{`A Digital Workforce is a strategic decision. Here are the answers leaders ask before they build.`}</p><div className="relative mx-auto mt-14 h-px w-full max-w-[860px] overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" /><div className="absolute left-1/2 top-0 h-px w-[280px] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent blur-[0.5px]" /></div></section><section className="relative mx-auto max-w-[860px] px-6 lg:px-0 pb-10"><div className="flex flex-col gap-3">{faqData.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="group relative rounded-[14px] transition-all duration-300" style={isOpen ? {background: 'linear-gradient(rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.016)), rgb(10, 10, 10)', border: '1px solid rgba(251, 191, 36, 0.35)', boxShadow: 'rgba(251, 191, 36, 0.12) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.6) 0px 12px 40px, rgba(251, 191, 36, 0.1) 0px 0px 36px'} : {background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(251, 191, 36, 0.12)', boxShadow: 'rgba(255, 255, 255, 0.02) 0px 0px 0px 1px inset'}}>
            {isOpen && <div className="pointer-events-none absolute inset-0 rounded-[14px] opacity-60" style={{background: 'radial-gradient(600px 200px at 0% 0%, rgba(251, 191, 36, 0.08), transparent 60%)'}} />}
            <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : i)} className="relative flex w-full items-center justify-between gap-6 px-6 sm:px-[24px] py-[20px] sm:py-[22px] text-left">
              <div className="flex items-center gap-4 min-w-0">
                <span className="hidden sm:inline-flex font-outfit text-[11px] tracking-widest text-white/25 w-6">{String(i + 1).padStart(2, '0')}</span>
                <h3 className={`font-outfit text-[16px] sm:text-[17px] leading-[1.35] font-[500] tracking-[-0.01em] transition-colors ${isOpen ? 'text-white' : 'text-white/80'}`}>{item.q}</h3>
              </div>
              <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300" style={isOpen ? {borderColor: 'rgba(251, 191, 36, 0.55)', background: 'rgba(251, 191, 36, 0.14)', boxShadow: 'rgba(251, 191, 36, 0.25) 0px 0px 14px'} : {borderColor: 'rgba(255, 255, 255, 0.12)', background: 'rgba(255, 255, 255, 0.03)'}}>
                <span className="relative w-3.5 h-3.5">
                  {isOpen
                    ? <Minus className="h-3.5 w-3.5 text-[#facc15] transition-transform duration-300" />
                    : <Plus className="h-3.5 w-3.5 text-[#facc15]/90 transition-transform duration-300 group-hover:rotate-90" />}
                </span>
              </span>
            </button>
            <div className="grid transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" style={{gridTemplateRows: isOpen ? '1fr' : '0fr'}}>
              <div className="overflow-hidden">
                <div className="px-6 sm:px-[24px] pb-[22px] sm:pb-[24px] sm:pl-[56px]">
                  <div className={`origin-top transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                    <p className="text-[15px] sm:text-[15.5px] leading-[1.75] text-[#a1a1aa] font-light">{item.a}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}</div><div className="mt-8 flex items-center justify-center gap-3 text-[11px] tracking-widest text-white/25 uppercase"><span className="h-px w-10 bg-white/10" /><span>{`16 Questions • `}{openIndex === -1 ? '0 Open' : '1 Open'}</span><span className="h-px w-10 bg-white/10" /></div></section><section className="relative mt-[88px] lg:mt-[120px] border-t border-white/[0.06]" id="cta"><div className="absolute inset-0 pointer-events-none"><div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-[120px] opacity-[0.14]" style={{background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5), transparent 70%)'}} /></div><div className="relative mx-auto max-w-[860px] px-6 lg:px-0 py-[72px] lg:py-[96px] text-center"><h2 className="font-outfit text-[34px] sm:text-[42px] font-[700] tracking-[-0.02em] text-white leading-[0.95]">{`Still Have Questions?`}</h2><p className="mx-auto mt-4 max-w-[520px] text-[15.5px] leading-[1.6] text-[#a1a1aa] font-light">{`Every business operates differently. Let's discuss how a Digital Workforce maps to yours — no generic pitch, just architecture.`}</p><div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"><button className="group inline-flex h-[48px] items-center justify-center gap-2 rounded-full px-7 text-[14px] font-semibold tracking-wide text-black transition-all hover:brightness-110 hover:shadow-[0_0_32px_rgba(251,191,36,0.4)] active:scale-[0.98]" style={{background: 'linear-gradient(100deg, rgb(253, 224, 71) 0%, rgb(250, 204, 21) 30%, rgb(234, 179, 8) 100%)', boxShadow: 'rgba(255, 255, 255, 0.7) 0px 1px 0px inset, rgba(0, 0, 0, 0.4) 0px 8px 20px'}} onClick={() => window.dispatchEvent(new CustomEvent('openLeadForm'))}>{`Talk to an Architect`}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" /></button><button className="inline-flex h-[48px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-[14px] font-medium tracking-wide text-white backdrop-blur transition-all hover:bg-white/[0.08] hover:border-white/25 active:scale-[0.98]" onClick={() => window.dispatchEvent(new CustomEvent('openLeadForm'))}>{`Book Strategy Call`}</button></div><div className="mt-6 text-[10.5px] tracking-[0.18em] uppercase text-white/30">{`No obligation • Includes custom roadmap • NDA on request`}</div></div></section><footer className="border-t border-white/[0.05] py-8"><div className="mx-auto max-w-[1280px] px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-widest uppercase text-white/25"><span>{`©`}{`2026`}{`X-Pherium Global • Digital Workforce Architecture`}</span><span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-amber-400/60" />{`Built for Scale`}</span></div></footer></div>
    </>
  );
}
