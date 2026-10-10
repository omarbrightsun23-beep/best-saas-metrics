'use client';

import { Layers } from 'lucide-react';
import { COHORT_DEEP_DIVES } from '../data/cohortDeepDives';
import { SUB_NICHES } from '../data/niches';

interface CohortDeepDiveProps {
  slug: string;
}

export default function CohortDeepDive({ slug }: CohortDeepDiveProps) {
  const dive = COHORT_DEEP_DIVES[slug];
  if (!dive) return null;

  const niche = SUB_NICHES.find((n) => n.slug === slug);
  const nicheName = niche ? niche.name : slug;

  return (
    <section
      id="cohort-deep-dive"
      className="mt-12 space-y-8 border-t border-slate-200 pt-10"
      aria-labelledby="cohort-deep-dive-title"
    >
      <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
        <div className="p-2 rounded-xl bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF] shadow-xs">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h2 id="cohort-deep-dive-title" className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Deep Dive: {nicheName} Unit Economics
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            A practitioner&apos;s guide to how this cohort makes — and loses — money.
          </p>
        </div>
      </div>

      {dive.sections.map((section, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs"
        >
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {section.heading}
          </h3>
          <div className="space-y-4 max-w-3xl">
            {section.paragraphs.map((paragraph, pIdx) => (
              <p
                key={pIdx}
                className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
