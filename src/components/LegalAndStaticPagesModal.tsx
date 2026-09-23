'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  FileText,
  Map,
  Mail,
  Check,
  Send,
  Clock,
  ArrowRight,
  AlertTriangle,
  Scale,
  MessageSquare,
} from 'lucide-react';
import { SubNicheData } from '../types';
import { SUB_NICHES } from '../data/niches';
import Logo from './Logo';

export type PageTabType = 'terms' | 'privacy' | 'disclaimer' | 'contact' | 'sitemap';

interface LegalAndStaticPagesModalProps {
  isOpen: boolean;
  activeTab: PageTabType;
  onClose: () => void;
  onSelectTab: (tab: PageTabType) => void;
  onSelectNiche?: (niche: SubNicheData) => void;
}

export default function LegalAndStaticPagesModal({
  isOpen,
  activeTab,
  onClose,
  onSelectTab,
  onSelectNiche,
}: LegalAndStaticPagesModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [contactSubject, setContactSubject] = useState('Inquiry regarding Best SAAS Metrics');
  const [contactMessage, setContactMessage] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmailInput, setContactEmailInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard?.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setContactMessage('');
      setContactName('');
      setContactEmailInput('');
    }, 4000);
  };

  return (
    <div
      id="legal-pages-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="legal-pages-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <Logo size="sm" showTagline={false} />
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {activeTab === 'terms' && 'Terms & Conditions'}
              {activeTab === 'privacy' && 'Privacy Policy'}
              {activeTab === 'disclaimer' && 'Legal & Financial Disclaimer'}
              {activeTab === 'contact' && 'Contact Us'}
              {activeTab === 'sitemap' && 'Website Sitemap'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 hover:border-slate-300 text-slate-500 flex items-center justify-center transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs active:scale-90"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-100 bg-white overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => onSelectTab('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 ${
              activeTab === 'terms'
                ? 'bg-[#15803d] text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-600 hover:bg-[#eef8ed] hover:text-emerald-950 hover:border-[#d2edd0] border border-transparent'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms &amp; Conditions</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 ${
              activeTab === 'privacy'
                ? 'bg-[#15803d] text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-600 hover:bg-[#eef8ed] hover:text-emerald-950 hover:border-[#d2edd0] border border-transparent'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('disclaimer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 ${
              activeTab === 'disclaimer'
                ? 'bg-[#15803d] text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-600 hover:bg-[#eef8ed] hover:text-emerald-950 hover:border-[#d2edd0] border border-transparent'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Disclaimer</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('contact')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 ${
              activeTab === 'contact'
                ? 'bg-[#15803d] text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-600 hover:bg-[#eef8ed] hover:text-emerald-950 hover:border-[#d2edd0] border border-transparent'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('sitemap')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 ${
              activeTab === 'sitemap'
                ? 'bg-[#15803d] text-white shadow-xs font-bold'
                : 'bg-slate-50 text-slate-600 hover:bg-[#eef8ed] hover:text-emerald-950 hover:border-[#d2edd0] border border-transparent'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Site Map</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
          {/* TAB 1: TERMS AND CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Terms and Conditions of Use
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Effective Date: January 1, 2026 · Last Updated: August 2026
                </p>
              </div>
              <div className="space-y-4">
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    1. Agreement to Terms
                  </h2>
                  <p>
                    Welcome to <strong>Best SAAS Metrics</strong> (the "Service", "we", "us", or "our"). By accessing or using our website, interactive financial calculators, unit economics models, and PDF report generation tools, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the Service.
                  </p>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    2. Nature of Financial &amp; Calculation Models
                  </h2>
                  <p>
                    All calculators, charts, CAC Payback Period projections, LTV:CAC ratios, and cashflow trajectory graphs provided on Best SAAS Metrics are designed strictly for educational, informational, and strategic forecasting purposes.
                  </p>
                  <p className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-600 text-xs">
                    <strong>Disclaimer:</strong> The results do not constitute certified accounting advice, financial auditing, tax counsel, or formal investment recommendations. While calculations incorporate standard SaaS financial operating practices (including gross-margin adjustments and amortized acquisition costs), actual corporate financial metrics depend on individual customer contracts, billing schedules, and operational variables.
                  </p>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    3. Intellectual Property &amp; Permitted Use
                  </h2>
                  <p>
                    The design, code algorithms, mathematical formulas, brand graphics, and editorial benchmark compilations are the proprietary property of Best SAAS Metrics. You are granted a non-exclusive, revocable license to utilize the calculator for personal, internal business, and board reporting scenarios, including exporting single-page PDF summary reports for executive reviews.
                  </p>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    4. Limitation of Liability
                  </h2>
                  <p>
                    In no event shall Best SAAS Metrics, its directors, employees, or contributors be held liable for any indirect, incidental, special, consequential, or punitive damages resulting from business decisions, fundraising evaluations, or budget allocations made using the outputs of this calculator.
                  </p>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    5. Modifications to the Service
                  </h2>
                  <p>
                    We reserve the right to modify, update, or discontinue features of the calculator or update benchmark datasets without prior notice as market conditions evolve.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Privacy Policy &amp; Data Transparency
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Effective Date: January 1, 2026 · 100% Client-Side Computing Architecture
                </p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-900">
                    Zero Server-Side Telemetry &amp; Zero Cloud Data Storage
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    All financial inputs (CAC, ARPA, Gross Margins, Churn, and Sales Cycles) are computed <strong>100% client-side inside your browser</strong>. Your company's confidential metrics are never transmitted to, stored on, or harvested by our backend servers.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    1. Information We Do Not Collect
                  </h2>
                  <p>
                    We do not require account registration, corporate logins, or credential submissions to use our calculator. We do not store financial datasets, customer lists, or proprietary unit economic ratios on any remote cloud database.
                  </p>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    2. Local Storage &amp; Browser Memory
                  </h2>
                  <p>
                    When you use the "Save Model" or "Compare Scenario" features, the data is saved exclusively to your device's browser <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">localStorage</code>. You have complete control to clear your browser cache and remove this data at any time.
                  </p>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    3. Cookies &amp; Analytics
                  </h2>
                  <p>
                    We do not use intrusive cross-site tracking cookies. We maintain strict compliance with global privacy standards, including GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act).
                  </p>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    4. Privacy Inquiries &amp; Data Rights
                  </h2>
                  <p>
                    If you have questions regarding our privacy practices or wish to submit an inquiry, please contact our data compliance officer at:
                  </p>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-blue-700">
                    Contact@bestsaasmetrics.com
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* TAB 3: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  <span>Legal &amp; Financial Disclaimer</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Important notice regarding calculation models, financial forecasting, and independent advisory.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <Scale className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-900">
                    Not Formal Financial, Certified Accounting, or Investment Advice
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    The calculations, charts, benchmark distributions, and output reports generated by <strong>Best SAAS Metrics</strong> are intended exclusively for general analytical, educational, and preliminary modeling purposes.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    1. No Professional or Fiduciary Relationship
                  </h2>
                  <p>
                    Use of this website, its calculators, or downloaded PDF reports does not establish an accountant-client, advisory, fiduciary, or legal relationship between you and Best SAAS Metrics. You should not act or refrain from acting on the basis of any content or calculation generated on this site without seeking direct advice from a licensed Certified Public Accountant (CPA), Chief Financial Officer (CFO), or qualified legal professional.
                  </p>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    2. Calculation Estimations &amp; Model Limitations
                  </h2>
                  <p>
                    While our computational formulas strictly align with standard SaaS financial mechanics (including Gross Margin-adjusted CAC Payback, ASC 606 amortized acquisition cost principles, and lifetime value calculations), actual corporate unit economics are subject to dynamic variables such as:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
                    <li>Non-linear revenue expansion and net revenue retention (NRR) variations</li>
                    <li>Deferred contract revenue recognition and unearned revenue liabilities</li>
                    <li>Variable multi-tiered sales commissions and onboarding labor costs</li>
                    <li>Tiered COGS hosting scale adjustments and payment gateway merchant fees</li>
                  </ul>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    3. Benchmark Data &amp; Third-Party References
                  </h2>
                  <p>
                    Sector benchmark ranges and quartile statistics (e.g. Enterprise B2B, PLG, Vertical SaaS, Fintech, and AI SaaS) are compiled from publicly available venture capital research papers, institutional reports, and historical market data. These benchmarks are reference indicators and do not guarantee future commercial performance, company valuation multiples, or fundraising outcomes.
                  </p>
                </section>
                <section className="space-y-2">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    4. Limitation of Liability &amp; Warranties
                  </h2>
                  <p>
                    All content and software tools are provided "as is" and "as available", without warranty of any kind, whether express or implied. Under no circumstances will Best SAAS Metrics, its contributors, or affiliates be liable for any commercial loss, profit loss, or business interruption arising out of the use or inability to use this platform.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Contact Best SAAS Metrics
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with our team for benchmark methodology questions, enterprise inquiries, or feedback.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      Primary Support
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase">Official Email</div>
                    <a
                      href="mailto:Contact@bestsaasmetrics.com"
                      className="text-sm sm:text-base font-black text-slate-900 hover:text-blue-600 transition break-all"
                    >
                      Contact@bestsaasmetrics.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="mailto:Contact@bestsaasmetrics.com"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy('Contact@bestsaasmetrics.com', 'email')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                      <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Instant WhatsApp
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase">WhatsApp Number</div>
                    <a
                      href="https://wa.me/923336109888"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-black text-slate-900 hover:text-emerald-600 transition font-mono"
                    >
                      +92 333 6109888
                    </a>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="https://wa.me/923336109888"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy('+923336109888', 'phone')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                      <span>{copiedPhone ? 'Copied' : 'Copy Number'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Message Form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Send an Inquiry Direct to Support</h3>
                    <p className="text-xs text-slate-500">We typically reply within 1 business day</p>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>24h Turnaround</span>
                  </div>
                </div>
                {isSubmitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-emerald-900">Message Draft Prepared!</div>
                    <p className="text-xs text-emerald-700">
                      Opening your email client to send your message directly to <strong>Contact@bestsaasmetrics.com</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="contact-name" className="text-xs font-bold text-slate-700">Your Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Sarah Connor"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="contact-email" className="text-xs font-bold text-slate-700">Your Email Address</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={contactEmailInput}
                          onChange={(e) => setContactEmailInput(e.target.value)}
                          placeholder="sarah@company.com"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="contact-subject" className="text-xs font-bold text-slate-700">Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="contact-message" className="text-xs font-bold text-slate-700">Message / Inquiry Details</label>
                      <textarea
                        id="contact-message"
                        rows={3}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell us about your SaaS model, benchmark questions, or suggestions..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-slate-400">
                        Direct connection to <strong className="text-slate-600 font-mono">Contact@bestsaasmetrics.com</strong>
                      </span>
                      <a
                        href={`mailto:Contact@bestsaasmetrics.com?subject=${encodeURIComponent(
                          contactSubject
                        )}&body=${encodeURIComponent(
                          `Name: ${contactName}
Email: ${contactEmailInput}

${contactMessage}`
                        )}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#15803d] hover:bg-[#166534] active:bg-[#14532d] text-white text-xs font-bold shadow-xs transition"
                      >
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>Send Message</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: SITE MAP */}
          {activeTab === 'sitemap' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Website Site Map
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Directory of calculators, sub-niche models, benchmarks, and legal resources.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1: Financial Engines & Niche Models */}
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>1. Sub-Niche Model Calculators</span>
                  </div>
                  <div className="space-y-2">
                    {SUB_NICHES.map((n) => (
                      <button
                        key={n.slug}
                        type="button"
                        onClick={() => {
                          if (onSelectNiche) onSelectNiche(n);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                            {n.name}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Typical CAC: ${n.benchmarks.cacRange[0].toLocaleString()} - ${n.benchmarks.cacRange[1].toLocaleString()} · Target Payback: {n.benchmarks.targetPaybackMedian} Mo
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column 2: Tools, Citations & Legal Pages */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span>2. Tools &amp; Interactive Visualizers</span>
                    </div>
                    <ul className="space-y-2 text-xs">
                      <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block font-bold">Interactive CAC Payback Calculator</strong>
                        <span className="text-slate-500 text-[11px]">Real-time math engine with slider parameters and gross margin-adjusted unit economics</span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block font-bold">36-Month Cashflow Trajectory Chart</strong>
                        <span className="text-slate-500 text-[11px]">Dynamic breakeven curve, gross margin realization, and cumulative cash flow</span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block font-bold">Executive PDF Summary Report</strong>
                        <span className="text-slate-500 text-[11px]">Export 1-page boardroom-ready unit economics report</span>
                      </li>
                      <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <strong className="text-slate-900 block font-bold">Side-by-Side Scenario Comparison</strong>
                        <span className="text-slate-500 text-[11px]">Compare current CAC &amp; churn against optimized targets</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      <span>3. Legal, Trust &amp; Contact Directory</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => onSelectTab('terms')}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition cursor-pointer"
                      >
                        Terms &amp; Conditions
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectTab('privacy')}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition cursor-pointer"
                      >
                        Privacy Policy
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectTab('disclaimer')}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition cursor-pointer"
                      >
                        Legal Disclaimer
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectTab('contact')}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition cursor-pointer"
                      >
                        Contact Support
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectTab('sitemap')}
                        className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-left font-bold text-blue-800 transition cursor-pointer col-span-2"
                      >
                        Active Site Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Official Support:</span>
            <a
              href="mailto:Contact@bestsaasmetrics.com"
              className="text-blue-600 font-bold hover:underline"
            >
              Contact@bestsaasmetrics.com
            </a>
            <span>·</span>
            <a
              href="https://wa.me/923336109888"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 font-bold hover:underline"
            >
              WhatsApp: +92 333 6109888
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
