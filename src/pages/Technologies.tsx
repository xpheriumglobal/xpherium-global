import { PageLayout } from './PageLayout';
import { useSEO } from '../hooks/useSEO';

export default function Technologies() {
  useSEO({
    title: "Technologies",
    description: "Learn about the cutting-edge technologies behind X-PHERIUM.",
    canonicalUrl: "/technologies",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Technologies | X-PHERIUM",
      "description": "Learn about the cutting-edge technologies behind X-PHERIUM.",
      "url": "https://xpheriumglobal.com/technologies"
    }
  });

  return (
    <PageLayout title="Technologies" description="Technologies powering our solutions.">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {[
          "n8n Automation",
          "Make Automation",
          "OpenAI Integration",
          "Claude AI Integration",
          "AI Voice Technology",
          "MCP Solutions",
          "API Development",
          "Webhook Automation",
          "Database Automation",
          "Custom AI Integrations"
        ].map(item => (
          <div key={item} className="p-4 rounded-xl border border-white/10 bg-white/5 text-zinc-300">
            {item}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
