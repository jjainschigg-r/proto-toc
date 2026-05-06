export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function getInternalUrl() {
  const path = window.location.pathname;
  return (path.startsWith(BASE) ? path.slice(BASE.length) : path) || '/';
}

export function getVariant() {
  return new URLSearchParams(window.location.search).get('v') || null;
}

export function normalizeHashless(url) {
  return url.split("#")[0];
}

export function buildLookup(pages) {
  const lookup = new Map();
  pages.forEach((page) => {
    lookup.set(page.url, page);
    page.aliases?.forEach((alias) => lookup.set(alias, { ...page, aliasHit: alias }));
  });
  return lookup;
}

export function findPage(url, lookup) {
  const direct = lookup.get(url);
  if (direct) return direct;
  const withoutHash = lookup.get(normalizeHashless(url));
  if (withoutHash) return withoutHash;
  return {
    url,
    aliases: [],
    menu: "global",
    h1: "Placeholder page",
    description: "This URL is referenced in a menu but not yet modeled as a full page. Add it to the pages array when you want full metadata and local-menu behavior.",
    placeholder: true,
  };
}
