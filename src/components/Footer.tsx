'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { SubNicheData } from '../types';
import { SUB_NICHES } from '../data/niches';
import Logo from './Logo';
import { PageTabType } from './LegalAndStaticPagesModal';

interface FooterProps {
  onSelectNiche: (niche: SubNicheData) => void;
  onOpenPage: (page: PageTabType) => void;
}

export default function Footer({ onSelectNiche }: FooterProps) {
  return (
    <footer id="site-footer" className="mt-16 border-t border-[#132817] bg-[#061208] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <Logo size="md" showTagline={true} variant="dark" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              Modeled on established venture capital and SaaS financial frameworks from David Skok (Matrix Partners), Bessemer Venture Partners (BVP), and OpenView. 100% computed client-side with zero remote data storage.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0d2212] border border-[#1b3d22] text-[11px] text-emerald-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero server-side persistence of financial inputs</span>
            </div>
          </div>

          {/* SaaS Niche Presets */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              SaaS Models
            </div>
            <ul className="space-y-1.5 text-[11px]">
              {SUB_NICHES.map((n) => (
                <li key={n.slug}>
                  <a
                    href={`/${n.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectNiche(n);
                    }}
                    className="text-slate-400 hover:text-white transition font-medium cursor-pointer text-left block"
                  >
                    {n.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Governance &amp; Legal
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-400 hover:text-white transition font-medium">
                  Financial Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition font-medium">
                  Contact Research Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Methodologies */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Methodologies
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a href="#semantic-math-glossary-section" className="text-slate-400 hover:text-white transition font-medium">
                  Unit Economics Math &amp; Formulas
                </a>
              </li>
              <li>
                <a href="#trajectory-chart-container" className="text-slate-400 hover:text-white transition font-medium">
                  Cohort Churn Decay Models
                </a>
              </li>
              <li>
                <a href="#author-eeat-trust-block" className="text-slate-400 hover:text-white transition font-medium">
                  Editorial Methodology &amp; Sources
                </a>
              </li>
              <li>
                <a href="#citation-section" className="text-slate-400 hover:text-white transition font-medium">
                  Academic &amp; Benchmark Citations
                </a>
              </li>
              <li className="pt-1 border-t border-[#132817]">
                <a
                  href="/project.zip"
                  download="bestsaasmetrics-project.zip"
                  className="text-emerald-400 hover:text-emerald-300 transition font-semibold inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Download Project ZIP</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} bestsaasmetrics.com. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Calculated Client-Side in Browser</span>
            </span>
            <span>·</span>
            <Link href="/privacy" className="hover:text-white transition">Cookie &amp; Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
