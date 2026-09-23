'use client';

import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download, FileCode, FolderArchive, Server, ShieldCheck } from 'lucide-react';

interface VercelConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VercelConfigModal({ isOpen, onClose }: VercelConfigModalProps) {
  const [copied, setCopied] = useState(false);
  const vercelConfigContent = `{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(vercelConfigContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownloadFile = () => {
    const blob = new Blob([vercelConfigContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vercel.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vercel-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#eef8ed] text-[#15803d] border border-[#d2edd0]">
                <FileCode className="w-4 h-4" />
              </span>
              <h2 id="vercel-modal-title" className="text-lg sm:text-xl font-black text-slate-900">
                Vercel SPA Routing Configuration (vercel.json)
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Fixes 404 errors on deep routes (e.g., <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">/enterprise-b2b-saas</code>) by rewriting all paths to <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">/index.html</code>.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Block Container */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#15803d]" />
              <span>Root Directory: <code className="text-xs font-mono text-[#15803d]">./vercel.json</code></span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition cursor-pointer active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#15803d]" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadFile}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#eef8ed] hover:bg-[#dcfce7] text-emerald-950 border border-[#d2edd0] font-semibold text-xs transition cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-[#15803d]" />
                <span>Download vercel.json</span>
              </button>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 shadow-inner overflow-x-auto">
            <pre className="text-emerald-400 leading-relaxed font-bold">
              {vercelConfigContent}
            </pre>
          </div>
        </div>

        {/* Instructions & Why it works */}
        <div className="space-y-3 bg-[#eef8ed]/50 border border-[#d2edd0] rounded-2xl p-4 text-xs text-slate-700">
          <div className="font-bold text-emerald-950 flex items-center gap-1.5">
            <Server className="w-4 h-4 text-[#15803d]" />
            <span>How This Resolves the Vercel 404 Issue:</span>
          </div>
          <p className="leading-relaxed">
            By default, Vercel looks for a static file matching the requested path on the filesystem. When a user or search engine navigates directly to an inner route (like <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#d2edd0]">/enterprise-b2b-saas</code>), Vercel cannot find that HTML file and returns a 404.
          </p>
          <p className="leading-relaxed">
            Adding <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#d2edd0]">vercel.json</code> to your root folder instructs Vercel to rewrite all incoming route requests to <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#d2edd0]">/index.html</code>, allowing your client-side React code to handle routing cleanly.
          </p>
        </div>

        {/* Download Project ZIP Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <FolderArchive className="w-4 h-4 text-[#15803d]" />
              <h4 className="text-xs font-bold text-slate-900">Complete Project Package (ZIP)</h4>
            </div>
            <p className="text-[11px] text-slate-500">
              Includes full source code, components, Vite config, and root <code className="font-mono text-slate-700">vercel.json</code>.
            </p>
          </div>
          <a
            href="/project.zip"
            download="bestsaasmetrics-project.zip"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#15803d] hover:bg-[#166534] active:bg-[#14532d] text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0 active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Download Project ZIP</span>
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" />
            <span>Ready for Vercel, Netlify, Cloudflare Pages &amp; Cloud Run</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
