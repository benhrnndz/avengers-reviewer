import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { FOX_PROJECTS, FOX_TIMELINE_EXPLAINER } from '../data';
import { ProjectEntry } from '../types';

interface FoxLegacySectionProps {
  onSelectProject: (project: ProjectEntry) => void;
  watchedIds: string[];
}

type FoxGroupFilter =
  | 'All'
  | 'Blade (Pre-MCU Legacy)'
  | 'X-Men Original'
  | 'X-Men Revised & Solo'
  | 'Deadpool'
  | 'Fantastic Four'
  | 'Daredevil & Elektra';

const FOX_FILTERS: FoxGroupFilter[] = [
  'All',
  'Blade (Pre-MCU Legacy)',
  'X-Men Original',
  'X-Men Revised & Solo',
  'Deadpool',
  'Fantastic Four',
  'Daredevil & Elektra',
];

export const FoxLegacySection: React.FC<FoxLegacySectionProps> = ({
  onSelectProject,
  watchedIds,
}) => {
  const [groupFilter, setGroupFilter] = useState<FoxGroupFilter>('All');

  const filteredFox = useMemo(() => {
    if (groupFilter === 'All') return FOX_PROJECTS;
    return FOX_PROJECTS.filter((p) => p.foxGroup === groupFilter);
  }, [groupFilter]);

  return (
    <section
      id="fox-legacy"
      className="py-24 bg-[#0D1015] text-slate-100 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Archival Header — Crisp Silver-Slate Editorial */}
        <div className="pb-12 border-b border-white/[0.08]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-3">
                Legacy Archive · 1998 – 2020 · Earth-10005 &amp; The Void
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-white leading-[1.03]">
                21st Century Fox &amp; Blade Legacy
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-400 leading-[1.65] max-w-2xl">
                Before Disney acquired 21st Century Fox in 2019, Fox spent two decades building its
                own Marvel cinema universe — preceded in 1998 by Wesley Snipes’s{' '}
                <span className="text-slate-200 font-medium">Blade</span> (New Line Cinema).{' '}
                <span className="text-slate-200 font-medium">Deadpool &amp; Wolverine</span>{' '}
                officially folded both Earth-10005 and Blade’s Void resistance into MCU continuity,
                bringing the original X-Men cast straight into{' '}
                <span className="text-emerald-400 font-medium">Avengers: Doomsday</span>.
              </p>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0 lg:pl-8 gap-6">
              <div>
                <div className="font-display text-3xl font-bold text-white tabular-nums">21</div>
                <div className="mt-1 font-mono-tech text-[10px] uppercase tracking-widest text-slate-500">
                  Legacy Films (1998–2020)
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-white tabular-nums">02</div>
                <div className="mt-1 font-mono-tech text-[10px] uppercase tracking-widest text-slate-500">
                  Doomsday Watchlist Ties
                </div>
              </div>
            </div>
          </div>

          {/* 3-Era Timeline Explainer */}
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {FOX_TIMELINE_EXPLAINER.map((item, idx) => (
              <div
                key={item.era}
                className="rounded-xl bg-white/[0.02] border border-white/[0.07] p-5"
              >
                <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                  <span>{item.universe}</span>
                  <span className="tabular-nums">0{idx + 1}</span>
                </div>
                <h3 className="font-display text-sm font-semibold text-white mb-1">{item.era}</h3>
                <p className="font-mono-tech text-[11px] text-slate-400 mb-2 leading-relaxed">
                  {item.films}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shared-Element Franchise Tabs */}
        <div className="pt-12">
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.07] w-fit mb-8">
            {FOX_FILTERS.map((group) => {
              const active = groupFilter === group;
              return (
                <button
                  key={group}
                  onClick={() => setGroupFilter(group)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                    active ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="fox-filter-pill"
                      transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                      className="absolute inset-0 rounded-lg bg-white/[0.11] border border-white/[0.12]"
                    />
                  )}
                  <span className="relative z-10">{group}</span>
                </button>
              );
            })}
          </div>

          {/* Official Legacy Poster Wall */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {filteredFox.map((project) => {
              const isWatched = watchedIds.includes(project.id);
              return (
                <article
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-900 ring-1 ring-inset ring-white/[0.1] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:ring-white/[0.24]">
                    <img
                      src={project.poster}
                      alt={`${project.title} official poster`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-slate-200 font-mono-tech text-[10px] tabular-nums">
                      {project.year}
                    </span>
                    {project.inDoomsdayWatchlist && (
                      <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500 text-[#04110B] font-mono-tech text-[10px] font-semibold">
                        {isWatched && <Check className="w-2.5 h-2.5 stroke-[3]" />}#
                        {project.watchlistOrder}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-500 truncate">
                        {project.foxGroup}
                      </div>
                      <h4 className="mt-1 font-display text-base font-semibold text-white group-hover:text-sky-300 transition-colors leading-snug">
                        {project.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/[0.07] flex items-center justify-between text-[11px] font-mono-tech text-slate-500">
                      <span>{project.easterEggs.length} Easter Eggs</span>
                      <span className="inline-flex items-center gap-0.5 text-slate-300 group-hover:text-white transition-colors">
                        VAULT FILE <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Fox TV Footnote */}
          <div className="mt-12 rounded-xl bg-white/[0.02] border border-white/[0.07] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-500 mr-2">
                TV Footnote
              </span>
              Fox Television also produced <strong className="text-slate-200">Legion</strong>{' '}
              (2017–2019, centered on Professor X’s son David Haller) and{' '}
              <strong className="text-slate-200">The Gifted</strong> (2017–2019, fugitive mutant
              underground).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
