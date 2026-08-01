import { PageLayout } from './PageLayout';
import { useSEO } from '../hooks/useSEO';

export default function Careers() {
  useSEO({
    title: "Careers",
    description: "Join the team at X-PHERIUM and build the digital workforce.",
    canonicalUrl: "/careers",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Careers | X-PHERIUM",
      "description": "Join the team at X-PHERIUM and build the digital workforce.",
      "url": "https://xpheriumglobal.com/careers"
    }
  });

  return (
    <PageLayout title="Careers" description="Join the team at X-PHERIUM.">
      <p>
        We are always looking for visionary engineers, AI researchers, and product designers to join our team. 
        If you are passionate about the future of automation and artificial intelligence, we want to hear from you.
      </p>
      <div className="mt-12 p-8 rounded-2xl border border-white/10 bg-white/5">
        <h3 className="text-2xl font-bold text-white mb-2">Open Positions</h3>
        <p className="text-zinc-400 mb-6">Currently, we are not actively hiring, but we are always accepting open applications.</p>
        <button className="bg-[#f5c242] text-black px-6 py-2.5 rounded-full font-semibold hover:bg-amber-400 transition-colors">
          Send Open Application
        </button>
      </div>
    </PageLayout>
  );
}
