import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Menu, Search, GitBranch, Layers, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { menus, pages } from "../data";
import { BASE, getInternalUrl, normalizeHashless, buildLookup, findPage } from "../lib/routing";

function MenuItem({ item, currentUrl, onNavigate, depth = 0 }) {
  const [open, setOpen] = useState(item.children?.some((child) => normalizeHashless(child.url) === normalizeHashless(currentUrl)) ?? false);
  const active = normalizeHashless(item.url) === normalizeHashless(currentUrl);
  const hasChildren = item.children?.length > 0;

  return (
    <div>
      <div
        className={`group flex items-center gap-1 rounded-xl px-2 py-1.5 text-sm transition ${active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {hasChildren ? (
          <button onClick={() => setOpen(!open)} className="shrink-0 rounded p-0.5 hover:bg-white/20" aria-label="toggle">
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-[18px]" />
        )}
        <button onClick={() => onNavigate(item.url)} className="min-w-0 flex-1 truncate text-left">
          {item.label}
        </button>
      </div>
      {hasChildren && open && (
        <div className="mt-0.5 space-y-0.5">
          {item.children.map((child) => (
            <MenuItem key={`${child.label}-${child.url}`} item={child} currentUrl={currentUrl} onNavigate={onNavigate} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function LeftNav({ menu, currentUrl, onNavigate }) {
  return (
    <aside className="h-full overflow-auto border-r border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
        <Menu size={18} />
        <div>
          <div className="text-sm font-semibold text-slate-900">{menu.label}</div>
          <div className="text-xs text-slate-500">local left rail</div>
        </div>
      </div>
      <div className="space-y-1">
        {menu.items.map((item) => (
          <MenuItem key={`${item.label}-${item.url}`} item={item} currentUrl={currentUrl} onNavigate={onNavigate} />
        ))}
      </div>
    </aside>
  );
}

function QuickPath({ onNavigate }) {
  const paths = [
    ["Product path", "/mke/latest", "Products → MKE → latest docs"],
    ["Version ladder", "/mke/versions", "MKE latest → Versions"],
    ["MKE 3 docs", "/mke/3.9.2", "Version ladder → 3.9.2"],
    ["Platform story", "/platforms/enterprise-kubernetes", "Platforms → Enterprise Kubernetes"],
    ["Migration story", "/solutions/container-platform-modernization/mke-3-to-mke-4", "Solutions → Container platform modernization"],
    ["Compatibility truth", "/compatibility/mke", "Compatibility → MKE"],
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {paths.map(([title, url, desc]) => (
        <button key={url} onClick={() => onNavigate(url)} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-slate-400 hover:shadow-md">
          <div className="mb-1 flex items-center gap-2 font-semibold text-slate-900"><ExternalLink size={16} />{title}</div>
          <div className="text-sm text-slate-500">{desc}</div>
          <div className="mt-2 font-mono text-xs text-slate-700">{url}</div>
        </button>
      ))}
    </div>
  );
}

function RouteInspector({ page, menu }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900"><GitBranch size={16} /> Route metadata</div>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Canonical URL</dt>
            <dd className="font-mono text-slate-900">{page.url}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Aliases</dt>
            <dd className="font-mono text-slate-900">{page.aliases?.length ? page.aliases.join(", ") : "none"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Assigned menu</dt>
            <dd className="font-mono text-slate-900">{page.menu}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Menu behavior</dt>
            <dd className="text-slate-700">{menu.description}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

function RelatedPages({ currentUrl, lookup, onNavigate }) {
  const current = normalizeHashless(currentUrl);
  const related = pages
    .filter((page) => page.url !== currentUrl)
    .filter((page) => {
      if (current.startsWith("/mke")) return page.url.startsWith("/mke") || page.url.includes("mke") || page.description.toLowerCase().includes("mke");
      if (current.startsWith("/platforms")) return page.url.startsWith("/platforms") || page.url.startsWith("/mke");
      if (current.startsWith("/compatibility")) return page.url.startsWith("/compatibility") || page.url.startsWith("/mke");
      return page.url.split("/")[1] === current.split("/")[1];
    })
    .slice(0, 6);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900"><Layers size={16} /> Related modeled pages</div>
        <div className="space-y-2">
          {related.length ? related.map((page) => (
            <button key={page.url} onClick={() => onNavigate(page.url)} className="block w-full rounded-xl border border-slate-100 p-3 text-left transition hover:bg-slate-50">
              <div className="font-medium text-slate-900">{page.h1}</div>
              <div className="font-mono text-xs text-slate-500">{page.url}</div>
            </button>
          )) : <div className="text-sm text-slate-500">No related modeled pages.</div>}
        </div>
      </CardContent>
    </Card>
  );
}

export default function V0Projections({ variantId }) {
  const lookup = useMemo(() => buildLookup(pages), []);
  const [currentUrl, setCurrentUrl] = useState(() => getInternalUrl());
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handlePop = () => setCurrentUrl(getInternalUrl());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const page = findPage(currentUrl, lookup);
  const menu = menus[page.menu] || menus.global;

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return pages.filter((page) =>
      page.url.toLowerCase().includes(q) ||
      page.h1.toLowerCase().includes(q) ||
      page.description.toLowerCase().includes(q) ||
      page.aliases?.some((alias) => alias.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [query]);

  const vParam = variantId ? `?v=${variantId}` : '';

  const navigate = (url) => {
    window.history.pushState(null, '', BASE + url + vParam);
    setCurrentUrl(url);
    setQuery("");
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-900">
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white"><FileText size={18} /></div>
          <div>
            <div className="text-lg font-bold">Mirantis Docs IA — V0 Projections</div>
            <div className="text-xs text-slate-500">Menus are projections over canonical pages, not the tree itself.</div>
          </div>
        </div>
        <div className="relative hidden w-[420px] md:block">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modeled pages, URLs, aliases..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-3 text-sm outline-none focus:border-slate-400"
          />
          {searchResults.length > 0 && (
            <div className="absolute right-0 top-11 z-20 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              {searchResults.map((result) => (
                <button key={result.url} onClick={() => navigate(result.url)} className="block w-full border-b border-slate-100 p-3 text-left last:border-b-0 hover:bg-slate-50">
                  <div className="font-medium">{result.h1}</div>
                  <div className="font-mono text-xs text-slate-500">{result.url}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="grid h-[calc(100vh-4rem)] grid-cols-[320px_1fr]">
        <LeftNav menu={menu} currentUrl={currentUrl} onNavigate={navigate} />
        <main className="overflow-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-700">{page.url}</span>
                {page.aliasHit && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">alias hit: {page.aliasHit}</span>}
                {page.placeholder && <span className="rounded-full bg-rose-100 px-3 py-1 text-xs text-rose-800">placeholder</span>}
              </div>
              <h1 className="mb-3 text-4xl font-bold tracking-tight">{page.h1}</h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">{page.description}</p>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 text-sm font-semibold text-slate-900">What this page demonstrates</div>
                <p className="text-sm leading-6 text-slate-600">
                  This page uses the <span className="font-mono text-slate-900">{page.menu}</span> menu projection. Click around the left rail to see how the navigation context changes when you move from product docs to version ladders, platform narratives, solution paths, compatibility truth, and release notes.
                </p>
              </div>
            </div>

            {currentUrl === "/" && <QuickPath onNavigate={navigate} />}

            <div className="grid gap-6 lg:grid-cols-2">
              <RouteInspector page={page} menu={menu} />
              <RelatedPages currentUrl={currentUrl} lookup={lookup} onNavigate={navigate} />
            </div>

            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-5">
                <div className="mb-3 text-sm font-semibold text-slate-900">Suggested implementation rule</div>
                <pre className="overflow-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">{`page.url = canonical route
page.aliases = routes that redirect or resolve to canonical route
page.menu = left-rail projection to show in this context
menus[page.menu].items = clickable nav for this context

Primary product links go to /product/latest.
Version museums live at /product/versions.
Platform and solution pages are cross-product narratives.
Compatibility pages are the authoritative source of version truth.`}</pre>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
