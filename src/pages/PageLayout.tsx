import React from 'react';
import { useSEO } from '../hooks/useSEO';

export function PageLayout({ title, description, children, canonicalUrl, ogType = 'website', jsonLd }: { title: string, description?: string, children: React.ReactNode, canonicalUrl?: string, ogType?: 'website' | 'article', jsonLd?: Record<string, any> }) {
  useSEO({
    title,
    description: description || 'X-Pherium OS - We Build Digital Workforces that Automate Your Business',
    canonicalUrl,
    ogType,
    jsonLd
  });

  return (
    <div className="w-full bg-[#050507] text-white pt-[120px] pb-24 relative overflow-hidden flex-1">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#f5c242]/10 via-white/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10 min-h-[60vh]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#e8c07d] via-[#f5c242] to-[#e8a84c] bg-clip-text text-transparent mb-12">
          {title}
        </h1>
        <div className="text-zinc-300 space-y-6 leading-relaxed text-lg max-w-[800px]">
          {children}
        </div>
      </div>
    </div>
  );
}
