import { useEffect } from "react";

export const SITE_URL = "https://fincalc-red.vercel.app";
const SITE_NAME = "Ktools";

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(data) {
  let el = document.querySelector('script[data-managed="json-ld"]');
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-managed", "json-ld");
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useMeta({ title, description, path, noindex = false, jsonLd = null }) {
  const jsonLdKey = JSON.stringify(jsonLd);

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Financial Calculators`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setMetaTag("name", "description", description);
    setCanonical(url);

    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", url);

    setMetaTag("name", "twitter:card", "summary");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);

    let robotsEl = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsEl) {
        robotsEl = document.createElement("meta");
        robotsEl.setAttribute("name", "robots");
        document.head.appendChild(robotsEl);
      }
      robotsEl.setAttribute("content", "noindex, follow");
    } else if (robotsEl) {
      robotsEl.remove();
    }

    setJsonLd(jsonLd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, noindex, jsonLdKey]);
}
