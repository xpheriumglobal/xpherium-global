import { useState } from 'react';
import { Link } from 'react-router-dom';

const socialLinks = [
  {
    name: "X",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.5L5.9 22H2.8l7.3-8.3L2.5 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.1 3.9H5.1L17.8 20Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect x="2" y="9" width="4" height="12" rx="0.5" />
        <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="2" width="20" height="20" rx="6" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    svg: (
      <svg width="15" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 12.1c0-1.4-.1-2.5-.3-3.5-.2-.9-.6-1.6-1.2-2.1-.6-.5-1.4-.8-2.4-1-1-.2-2.4-.3-4.1-.3H8.5c-1.7 0-3.1.1-4.1.3-1 .2-1.8.5-2.4 1-.6.5-1 .9-1.2 1.8-.2 1-.3 2.1-.3 3.5v.2c0 1.4.1 2.5.3 3.5.2.9.6 1.6 1.2 2.1.6.5 1.4.8 2.4 1 1 .2 2.4.3 4.1.3h7c1.7 0 3.1-.1 4.1-.3 1-.2 1.8-.5 2.4-1 .6-.5 1-1.2 1.2-2.1.2-1 .3-2.1.3-3.5v-.2ZM9.9 16.5v-8.9l7.3 4.5-7.3 4.4Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.3-4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.2-4.4-1.1-4.4-4.9 0-1.1.4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.5 1 2.6 0 3.8-2.3 4.7-4.4 4.9.4.4.7 1 .7 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
      </svg>
    ),
  },
];

const companyLinks = [
  { name: "About Us", path: "/about" },
  { name: "Careers", path: "/careers" },
  { name: "Contact Us", path: "/contact" },
  { name: "Blog", path: "/blog" }
];

const supportLinks = [
  { name: "FAQ", path: "/faq" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" }
];

const servicesData = [
  {
    title: "INDUSTRIES",
    path: "/industries",
    items: [
      "AI for Dental Clinics",
      "AI for Medical Clinics",
      "AI for Law Firms",
      "AI for Accounting Firms",
      "AI for Real Estate Agencies",
      "AI for Mortgage Brokers",
      "AI for Insurance Agencies",
      "AI for Hotels",
      "AI for Restaurants",
      "AI for Manufacturing",
      "AI for Logistics Companies",
      "AI for Property Management",
      "AI for Construction Companies",
      "AI for Home Service Businesses",
      "AI for HVAC Companies",
      "AI for Plumbing Companies",
      "AI for Electrical Contractors",
      "AI for Roofing Companies",
      "AI for Cleaning Companies",
      "AI for Fitness & Wellness Businesses",
    ],
  },
  {
    title: "Business Functions",
    path: "/business-functions",
    items: [
      "AI Customer Support",
      "AI Sales Automation",
      "AI Marketing Automation",
      "AI Finance Automation",
      "AI HR Automation",
      "AI Operations Automation",
      "AI Lead Management",
      "AI Appointment Scheduling",
      "AI Call Handling",
      "AI Email Management",
      "AI Document Processing",
      "AI Reporting & Analytics",
      "AI Inventory Management",
      "AI Procurement Automation",
      "AI Project Management",
      "AI Internal Knowledge Systems",
    ],
  },
  {
    title: "AI Solutions",
    path: "/ai-solutions",
    items: [
      "AI Receptionist",
      "AI Voice Agents",
      "AI Customer Service Agents",
      "AI Sales Agents",
      "AI Appointment Booking",
      "AI Lead Qualification",
      "AI CRM Automation",
      "AI Workflow Automation",
      "AI Email Automation",
      "AI WhatsApp Automation",
      "AI Live Chat Automation",
      "AI Knowledge Base",
      "AI Employee Assistants",
      "AI Business Operating Systems",
      "Custom AI Solutions",
      "Intelligent Workflow Automation",
    ],
  },
  {
    title: "AI Agents",
    path: "/ai-agents",
    items: [
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
      "AI Executive Assistant",
    ],
  },
  {
    title: "Automation Services",
    path: "/automation-services",
    items: [
      "Business Process Automation",
      "Workflow Optimization",
      "AI Process Automation",
      "CRM Integration",
      "ERP Integration",
      "API Integration",
      "Workflow Design",
      "AI Consulting",
      "AI Implementation",
      "Digital Transformation",
      "Operational Efficiency Consulting",
      "Business Systems Engineering",
      "Enterprise Automation",
      "Process Optimization",
      "Custom Workflow Development",
    ],
  },
];

export function Footer() {
  const [notification, setNotification] = useState<string | null>(null);

  const handleLinkClick = (text: string) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <footer className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative w-full overflow-hidden border-t border-white/[0.08] bg-[#050507] pb-10">
      <div
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #050507 0%, #0a0a0c 100%)',
        }}
      />
      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute left-0 right-0 top-0 h-[1px] z-20">
        <div
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 h-full w-full opacity-80"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0) 15%, rgba(212,175,55,0.5) 35%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.5) 65%, rgba(212,175,55,0) 85%, transparent 100%)',
            boxShadow: '0 0 12px rgba(212,175,55,0.4), 0 0 24px rgba(212,175,55,0.15)',
          }}
        />
      </div>

      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute -bottom-[300px] left-1/2 h-[500px] w-[90vw] max-w-[1200px] -translate-x-1/2 rounded-full opacity-[0.12]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.12) 25%, rgba(212,175,55,0.04) 45%, transparent 70%)',
            filter: 'blur(1px)',
          }}
        />
        <div
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute -bottom-[200px] right-[5%] h-[400px] w-[60vw] max-w-[500px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle at center, rgba(212,175,55,0.4) 0%, transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute -bottom-[150px] left-[2%] h-[300px] w-[70vw] max-w-[400px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative z-10 mx-auto max-w-[1280px] px-6 md:px-8 lg:px-10 pt-16 md:pt-20">
        <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_0.7fr_0.8fr] gap-10 lg:gap-12 xl:gap-16">
          <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col">
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-0">
              <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[22px] font-bold tracking-[-0.02em] text-white">
                X-PHERIUM<span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 font-light tracking-[0.02em]"> OS</span>
              </span>
              <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ml-[3px] -mt-3 h-[6px] w-[6px] rounded-full bg-[#f5c242] shadow-[0_0_10px_rgba(245,194,66,0.8)]" />
            </div>
            <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-4 font-medium max-w-[380px] text-[#9CA3AF] text-[14px] leading-[1.6]">
              Your next employee doesn't need a desk, a salary, or a lunch break. We design AI workforces that generate revenue, serve customers, and run operations 24 hours a day.
            </p>
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-7 flex flex-wrap gap-[9px]">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(`${link.name} • coming soon`);
                  }}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group relative flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/60 backdrop-blur-[12px] transition-all duration-300 hover:border-[#f5c242]/50 hover:bg-white/[0.07] hover:text-white hover:shadow-[0_0_0_1px_rgba(245,194,66,0.15),0_0_20px_rgba(245,194,66,0.15)]"
                >
                  <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-transform duration-300 group-hover:scale-110">
                    {link.svg}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[11.5px] font-[600] uppercase tracking-[1.5px] text-white">
              Company
            </h4>
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-[10px] h-[1px] w-[20px] bg-gradient-to-r from-[#f5c242] to-transparent" />
            <ul className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-6 space-y-[11px]">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group inline-flex items-center text-[14px] leading-5 text-[#9CA3AF] transition-colors duration-200 hover:text-white"
                  >
                    <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative">
                      {link.name}
                      <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute -bottom-[2px] left-0 h-[1px] w-0 bg-gradient-to-r from-[#f5c242] to-transparent transition-all duration-300 group-hover:w-full shadow-[0_0_6px_rgba(245,194,66,0.5)]" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[11.5px] font-[600] uppercase tracking-[1.5px] text-white">
              Support & Legal
            </h4>
            <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-[10px] h-[1px] w-[20px] bg-gradient-to-r from-[#f5c242] to-transparent" />
            <ul className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mt-6 space-y-[11px]">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group inline-flex items-center text-[14px] leading-5 text-[#9CA3AF] transition-colors duration-200 hover:text-white"
                  >
                    <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 relative">
                      {link.name}
                      <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 absolute -bottom-[2px] left-0 h-[1px] w-0 bg-gradient-to-r from-[#f5c242] to-transparent transition-all duration-300 group-hover:w-full shadow-[0_0_6px_rgba(245,194,66,0.5)]" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none mt-10 mb-10 w-full"
          style={{ marginTop: '40px', marginBottom: '40px' }}
          aria-hidden="true"
        >
          <div
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 h-[1px] w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(245,194,66,0.3), rgba(245,194,66,0.5), rgba(245,194,66,0.3), transparent)',
            }}
          />
        </div>

        <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-col">
          {servicesData.map((serviceGroup) => {
            const firstItems = serviceGroup.items.slice(0, 6);
            return (
              <div key={serviceGroup.title} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-7">
                <h4 className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 font-bold text-white text-[16px] mb-2.5 leading-[1.4] tracking-[-0.01em] uppercase">
                  {serviceGroup.title}
                </h4>
                <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex flex-wrap items-center text-[13px] text-zinc-500">
                  {firstItems.map((item) => (
                    <span key={item} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 inline-flex items-center">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(item);
                        }}
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors duration-200 hover:text-zinc-300"
                      >
                        {item}
                      </a>
                      <span className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mx-2 text-[#f5c242]/50 font-bold">•</span>
                    </span>
                  ))}
                  <Link
                    to={serviceGroup.path}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 inline-flex items-center gap-1 transition-all duration-200 hover:text-[#f5c242] text-[#f5c242]/80 font-medium"
                  >
                    View All <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none w-full"
          style={{ marginTop: '40px', marginBottom: '40px' }}
          aria-hidden="true"
        >
          <div
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 h-[1px] w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(245,194,66,0.3), rgba(245,194,66,0.5), rgba(245,194,66,0.3), transparent)',
            }}
          />
        </div>

        <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pt-2 pb-2">
          <p className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 text-[13px] leading-5 text-zinc-500">
            © 2026 X-PHERIUM Global. All rights reserved. Built for founders who move fast.
          </p>
        </div>
      </div>

      {notification && (
        <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[#f5c242]/30 bg-[#0a0a0c]/90 px-4 py-2 text-[11px] tracking-[0.8px] uppercase text-white/80 backdrop-blur-xl shadow-[0_0_30px_rgba(245,194,66,0.25)]">
          {notification}
        </div>
      )}
    </footer>
  );
}
