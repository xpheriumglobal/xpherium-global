import { PageLayout } from './PageLayout';
import { useSEO } from '../hooks/useSEO';

export default function AiAgents() {
  useSEO({
    title: "AI Voice Agents That Never Miss a Customer | X-PHERIUM Global",
    description: "Deploy AI voice agents that answer every call, qualify leads, book appointments, and provide 24/7 customer support without increasing payroll.",
    canonicalUrl: "/ai-agents",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Ai Agents | X-PHERIUM",
      "description": "Meet the AI agents powering the X-PHERIUM digital workforce.",
      "url": "https://xpheriumglobal.com/ai-agents"
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
