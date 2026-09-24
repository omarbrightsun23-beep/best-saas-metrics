import React from 'react';
import { CheckCircle2, Linkedin, Calendar, ShieldCheck, UserCheck, ExternalLink } from 'lucide-react';
import { AuthorProfile } from '../types';

interface AuthorTrustBlockProps {
  author: AuthorProfile;
}

export default function AuthorTrustBlock({ author }: AuthorTrustBlockProps) {
  const formattedPublishDate = new Date(author.datePublished).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedModifiedDate = new Date(author.dateModified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section id="author-eeat-trust-block" className="mt-12 bg-white border border-[#E0E7FF] rounded-2xl p-6 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
        {/* Author Bio Info */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-[#4F46E5] p-0.5 shrink-0 shadow-xs flex items-center justify-center text-white font-black text-lg">
            AM
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-black text-slate-900">{author.name}</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-900 bg-[#EEF2FF] border border-[#E0E7FF] px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-[#4F46E5]" />
                <span>Verified Author</span>
              </span>
            </div>
            <p className="text-xs font-bold text-[#4F46E5]">{author.title}</p>
            <p className="text-xs text-slate-500 font-medium">{author.credentials}</p>
          </div>
        </div>

        {/* Action & LinkedIn Link */}
        <div className="flex items-center gap-3">
          <a
            href={author.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EEF2FF] hover:bg-[#E0E7FF] text-indigo-950 border border-[#E0E7FF] text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Linkedin className="w-4 h-4 text-[#0a66c2]" />
            <span>Connect on LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Narrative Bio */}
      <div className="pt-4 text-xs text-slate-700 leading-relaxed space-y-2 font-normal">
        <p>{author.bio}</p>
      </div>

      {/* Reviewer & Timestamps Metadata Bar */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#4F46E5]" />
          <span>
            Financial Methodology <strong className="text-slate-900 font-bold">Reviewed by {author.reviewerName}</strong> ({author.reviewerTitle})
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Published: <time dateTime={author.datePublished} className="font-semibold text-slate-700">{formattedPublishDate}</time></span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>Last Reviewed: <time dateTime={author.dateModified} className="font-semibold text-slate-700">{formattedModifiedDate}</time></span>
          </div>
        </div>
      </div>
    </section>
  );
}
