import { useEffect } from 'react';

// Lightweight SEO hook — mutates <head> tags directly. Works perfectly for SPA.
// Usage: <SEO title="..." description="..." path="/about" image="..." type="website" jsonLd={{...}} />

const BASE_URL = 'https://best-designs-1.emergent.host';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = 'Bahari Global Holdings';

function setMeta(attr, key, content) {
  if (!content) return null;
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return el;
}
function setLink(rel, href) {
  if (!href) return null;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  return el;
}

export const SEO = ({
  title,
  description,
  path = '',
  image,
  type = 'website',
  keywords,
  jsonLd,
  noindex = false,
}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Navigating Trade, Connecting Markets`;
    const desc = description || 'International maritime & logistics group: vessel chartering, brokerage, port agency, husbandry, freight forwarding and global trade solutions.';
    const url = `${BASE_URL}${path || ''}`;
    const img = image || DEFAULT_IMAGE;

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_NAME);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', img);

    // Canonical
    setLink('canonical', url);

    // JSON-LD: remove previous page-level script then add fresh one
    const PAGE_LD_ID = 'page-ld';
    const prev = document.getElementById(PAGE_LD_ID);
    if (prev) prev.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = PAGE_LD_ID;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, type, keywords, jsonLd, noindex]);

  return null;
};
