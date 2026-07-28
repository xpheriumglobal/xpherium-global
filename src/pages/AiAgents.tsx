import { PageLayout } from './PageLayout';
import { useSEO } from '../hooks/useSEO';

export default function AiAgents() {
  useSEO({
    title: "Ai Agents",
    description: "Meet the AI agents powering the X-Pherium OS digital workforce.",
    canonicalUrl: "/ai-agents",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Ai Agents | X-Pherium OS",
      "description": "Meet the AI agents powering the X-Pherium OS digital workforce.",
      "url": "https://xpherium.global/ai-agents"
    }
  });

  return (
    <PageLayout title="AI Agents" description="Meet the digital workforce AI agents.">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {[
          "Customer Support AI Agent",
          "Sales AI Agent",
          "Appointment Booking AI Agent",
          "Lead Qualification AI Agent",
          "CRM AI Agent",
          "Finance AI Agent",
          "HR AI Agent",
          "Operations AI Agent",
          "Marketing AI Agent",
          "Recruitment AI Agent",
          "Reporting AI Agent",
          "Knowledge Management AI Agent",
          "Internal Helpdesk AI Agent",
          "Voice AI Receptionist",
          "AI Executive Assistant"
        ].map(item => (
          <div key={item} className="p-4 rounded-xl border border-white/10 bg-white/5 text-zinc-300">
            {item}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
