import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, any>;
}

export function useSEO({ title, description, canonicalUrl, ogImage, ogType = 'website', jsonLd }: SEOProps) {
  useEffect(() => {
    // Title
    document.title = `${title} | X-Pherium OS`;

    // Helper to update or create meta tags
    const setMetaTag = (attr: string, attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Description
    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    // Open Graph Title
    setMetaTag('property', 'og:title', `${title} | X-Pherium OS`);
    setMetaTag('name', 'twitter:title', `${title} | X-Pherium OS`);
    
    // Open Graph Type
    setMetaTag('property', 'og:type', ogType);
    
    // Open Graph Site Name
    setMetaTag('property', 'og:site_name', 'X-Pherium OS');
    
    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');

    // Canonical URL
    if (canonicalUrl) {
      const fullUrl = `https://xpherium.global${canonicalUrl}`;
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', fullUrl);
      
      setMetaTag('property', 'og:url', fullUrl);
    }

    // Open Graph Image
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // JSON-LD
    let script = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, canonicalUrl, ogImage, ogType, jsonLd]);
}
