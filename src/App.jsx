import React, { useEffect, useState } from "react";
import { FileText, ArrowRight } from "lucide-react";
import { BASE, getVariant } from "./lib/routing";
import { variants, findVariant } from "./variants/registry";

function VariantIndex() {
  const navigate = (id) => {
    window.history.pushState(null, '', BASE + '/' + `?v=${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex h-16 items-center border-b border-slate-200 bg-white px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <FileText size={18} />
          </div>
          <div>
            <div className="text-lg font-bold">Mirantis Docs IA prototype</div>
            <div className="text-xs text-slate-500">Navigation variant explorer</div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-8 py-16">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">Navigation variants</h1>
        <p className="mb-10 text-lg text-slate-600">
          Each variant uses the same page and menu data but implements a different navigation model.
          Select one to explore it, then use your browser's back button to return here.
        </p>
        <div className="space-y-4">
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => navigate(v.id)}
              className="flex w-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-slate-400 hover:shadow-md"
            >
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-mono text-sm font-bold text-slate-700">
                {v.id}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 font-semibold text-slate-900">{v.name}</div>
                <div className="text-sm leading-6 text-slate-600">{v.description}</div>
              </div>
              <ArrowRight size={18} className="mt-1 shrink-0 text-slate-400" />
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [variantId, setVariantId] = useState(() => getVariant());

  useEffect(() => {
    const handlePop = () => setVariantId(getVariant());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  if (!variantId) return <VariantIndex />;

  const variant = findVariant(variantId);
  if (!variant) return <VariantIndex />;

  const Shell = variant.component;
  return <Shell variantId={variantId} />;
}
