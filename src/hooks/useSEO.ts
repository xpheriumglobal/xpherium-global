import { useLayoutEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  jsonLd?: Record<string, any>;
  noIndex?: boolean;
}

const SITE_NAME = "X-PHERIUM";
const BASE_URL = "https://www.xpheriumglobal.com";

export function useSEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = "website",
  jsonLd,
  noIndex = false,
}: SEOProps) {
  useLayoutEffect(() => {
    // Page Title
    document.title = `${title} | ${SITE_NAME}`;

    // Helper function for meta tags
    const setMetaTag = (
      attr: "name" | "property",
      attrValue: string,
      content: string
    ) => {
      let meta = document.querySelector(
        `meta[${attr}="${attrValue}"]`
      ) as HTMLMetaElement | null;

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, attrValue);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    // Description
    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    }

    // Titles
    setMetaTag("property", "og:title", `${title} | ${SITE_NAME}`);
    setMetaTag("name", "twitter:title", `${title} | ${SITE_NAME}`);

    // Site Info
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", SITE_NAME);

    // Twitter
    setMetaTag("name", "twitter:card", "summary_large_image");

    // Robots
    if (noIndex) {
      setMetaTag("name", "robots", "noindex, nofollow");
    } else {
      setMetaTag(
        "name",
        "robots",
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      );
    }

    // Canonical + OG URL
    if (canonicalUrl) {
      const normalizedPath =
        canonicalUrl === "/"
          ? "/"
          : canonicalUrl.replace(/\/+$/, "");

      const fullUrl = `${BASE_URL}${normalizedPath}`;

      let link = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement | null;

      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }

      link.href = fullUrl;

      setMetaTag("property", "og:url", fullUrl);
    } else {
      const existingCanonical = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement | null;

      if (existingCanonical) {
        existingCanonical.remove();
      }
    }

    // Image
    if (ogImage) {
      setMetaTag("property", "og:image", ogImage);
      setMetaTag("name", "twitter:image", ogImage);
    }

    // JSON-LD
    let script = document.querySelector(
      'script[type="application/ld+json"]'
    ) as HTMLScriptElement | null;

    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }

      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    jsonLd,
    noIndex,
  ]);
}