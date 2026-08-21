import React from 'react';
import { ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import { SubNicheData } from '../types';
import { SUB_NICHES } from '../data/niches';
import Logo from './Logo';
import { PageTabType } from './LegalAndStaticPagesModal';

interface FooterProps {
  onSelectNiche: (niche: SubNicheData) => void;
  onOpenPage: (page: PageTabType) => void;
}

export default function Footer({ onSelectNiche, onOpenPage }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-[#0B132B] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <Logo size="md" showTagline={true} variant="dark" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              Engineered in accordance with SEC GAAP revenue standards and modern venture capital capital-efficiency frameworks. 100% computed client-side with zero telemetry tracking.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero data persistence on remote servers</span>
            </div>
          </div>

          {/* Quick Sub-Niches */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              SaaS Models
            </div>
            <ul className="space-y-1 text-[11px]">
              {SUB_NICHES.slice(0, 4).map((n) => (
                <li key={n.slug}>
                  <button
                    type="button"
                    onClick={() => onSelectNiche(n)}
                    className="text-slate-400 hover:text-cyan-400 transition font-medium cursor-pointer text-left"
                  >
                    {n.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory Legal & Sitemap */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Legal & Sitemap
            </div>
            <ul className="space-y-1 text-[11px]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPage('terms')}
                  className="text-slate-400 hover:text-cyan-400 transition font-medium cursor-pointer text-left"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPage('privacy')}
                  className="text-slate-400 hover:text-cyan-400 transition font-medium cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPage('disclaimer')}
                  className="text-slate-400 hover:text-cyan-400 transition font-medium cursor-pointer text-left"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPage('sitemap')}
                  className="text-slate-400 hover:text-cyan-400 transition font-medium cursor-pointer text-left"
                >
                  Site Map
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPage('contact')}
                  className="text-slate-400 hover:text-cyan-400 transition font-medium cursor-pointer text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Card */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Support
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px]">Email</span>
                  <a
                    href="mailto:Contact@bestsaasmetrics.com"
                    className="text-slate-200 font-bold hover:text-cyan-400 transition break-all"
                  >
                    Contact@bestsaasmetrics.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px]">WhatsApp Support</span>
                  <a
                    href="https://wa.me/923336109888"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 font-bold hover:text-emerald-400 transition font-mono"
                  >
                    +92 333 6109888
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenPage('contact')}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold transition text-[11px] cursor-pointer"
              >
                <span>Open Contact Form</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Best SAAS Metrics. All Rights Reserved.
          </div>
          <div className="flex items-center gap-3 text-slate-400 flex-wrap">
            <button
              type="button"
              onClick={() => onOpenPage('terms')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Terms
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenPage('privacy')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenPage('disclaimer')}
              className="hover:text-cyan-400 transition cursor-pointer font-medium text-slate-300 hover:underline"
            >
              Disclaimer
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenPage('sitemap')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Site Map
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onOpenPage('contact')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
