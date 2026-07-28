import { PageLayout } from './PageLayout';
import { useSEO } from '../hooks/useSEO';

export default function Services() {
  useSEO({
    title: "Services",
    description: "Explore our enterprise SEO and AI search optimization services.",
    canonicalUrl: "/services",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Services | X-Pherium OS",
      "description": "Explore our enterprise SEO and AI search optimization services.",
      "url": "https://xpherium.global/services"
    }
  });

  return (
    <PageLayout title="Our Services" description="Explore the full range of AI solutions and services from X-Pherium OS.">
      <p>
        Discover our comprehensive suite of AI automation services designed to streamline your business operations and accelerate growth.
      </p>
      
      <h2 className="text-2xl font-semibold text-white mt-12 mb-6">AI Solutions</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          "AI Receptionist", "AI Voice Agents", "AI Customer Service Agents", 
          "AI Sales Agents", "AI Appointment Booking", "AI Lead Qualification", 
          "AI CRM Automation", "AI Workflow Automation", "AI Email Automation"
        ].map(service => (
          <div key={service} className="p-4 rounded-xl border border-white/10 bg-white/5 text-zinc-300">
            {service}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-white mt-16 mb-6">Industries We Serve</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          "Medical & Dental Clinics", "Law Firms", "Accounting Firms", 
          "Real Estate Agencies", "Insurance Agencies", "Hotels & Hospitality", 
          "Manufacturing", "Logistics Companies", "Property Management"
        ].map(industry => (
          <div key={industry} className="p-4 rounded-xl border border-white/10 bg-white/5 text-zinc-300">
            {industry}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
