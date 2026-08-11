import { useSEO } from './hooks/useSEO';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MeetYourAiTeam } from './components/MeetYourAiTeam';
import { Footer } from './components/Footer';
import { LeadFormModal } from './components/LeadFormModal';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy loaded components for Home page
const WhatWeDo = lazy(() => import('./components/WhatWeDo').then(m => ({ default: m.WhatWeDo })));
const WhoWeAre = lazy(() => import('./components/WhoWeAre').then(m => ({ default: m.WhoWeAre })));
const WhatsNow = lazy(() => import('./components/WhatsNow').then(m => ({ default: m.WhatsNow })));
const TwoPaths = lazy(() => import('./components/TwoPaths').then(m => ({ default: m.TwoPaths })));
const Pricing = lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const OurImpact = lazy(() => import('./components/OurImpact').then(m => ({ default: m.OurImpact })));
const FourPillars = lazy(() => import('./components/FourPillars').then(m => ({ default: m.FourPillars })));

// Lazy loaded pages
const AboutUs = lazy(() => import('./pages/AboutUs'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Careers = lazy(() => import('./pages/Careers'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Blog = lazy(() => import('./pages/Blog'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Services = lazy(() => import('./pages/Services'));
const Industries = lazy(() => import('./pages/Industries'));
const BusinessFunctions = lazy(() => import('./pages/BusinessFunctions'));
const AiSolutions = lazy(() => import('./pages/AiSolutions'));
const AiAgents = lazy(() => import('./pages/AiAgents'));
const AutomationServices = lazy(() => import('./pages/AutomationServices'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Home() {
  useSEO({
    title: "Never Miss Another Customer Inquiry with AI | X-PHERIUM Global",
    description: "Every missed inquiry is lost revenue. X-PHERIUM builds AI voice agents, chatbots, and workflow automation that respond instantly, capture every lead, and help businesses scale without adding more staff.",
    canonicalUrl: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "X-PHERIUM",
      "url": "https://www.xpheriumglobal.com/"
    }
  });

  return (
    <>
      <Hero />
      <MeetYourAiTeam />
      <Suspense fallback={<div className="h-40 w-full" />}>
        <WhatWeDo />
        <WhoWeAre />
        <WhatsNow />
        <TwoPaths />
        <Pricing />
        <OurImpact />
        <FourPillars />
      </Suspense>
    </>
  );
}

// Fallback loader for Suspense
function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#050507]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-400/20 border-t-amber-400" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <main className="min-h-screen bg-[#050507] flex flex-col antialiased selection:bg-[#f5c242]/30 selection:text-white">
          <Header />
          <div className="flex-1 flex flex-col">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/business-functions" element={<BusinessFunctions />} />
                <Route path="/ai-solutions" element={<AiSolutions />} />
                <Route path="/ai-agents" element={<AiAgents />} />
                <Route path="/automation-services" element={<AutomationServices />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
          <LeadFormModal />
        </main>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
