import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { COMIC_FACTS } from '../data';
import { ComicFact } from '../types';

type CategoryFilter = 'All' | ComicFact['category'];

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Doctor Doom',
  'Secret Wars & Battleworld',
  'Mutants & X-Men',
  'Cosmic & Next Gen',
];

export const ComicsLoreSection: React.FC = () => {
  const [category, setCategory] = useState<CategoryFilter>('All');

  const visibleFacts = useMemo(() => {
    if (category === 'All') return COMIC_FACTS;
    return COMIC_FACTS.filter((f) => f.category === category);
  }, [category]);

  const likelihoodDot = (l: ComicFact['likelihood']) => {
    if (l === 'Virtually Confirmed') return 'bg-emerald-400 text-emerald-300';
    if (l === 'Strong Teases in MCU') return 'bg-amber-400 text-amber-300';
    return 'bg-zinc-400 text-zinc-300';
  };

  return (
    <section
      id="comics-lore"
      className="py-24 bg-[#0D0D10] text-zinc-100 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
            From Ink to Screen · Source Material Forecast
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em]">
            Comic Lore Ready for Live-Action Adaptation
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
            Nearly every major MCU twist remixes classic Marvel Comics storylines. Here are 10
            pivotal comic arcs poised to surface in{' '}
            <span className="text-zinc-200 font-medium">Avengers: Doomsday</span>,{' '}
            <span className="text-zinc-200 font-medium">Secret Wars</span>, and the Mutant Saga.
          </p>
        </div>

        {/* Shared-Element Category Filter */}
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.07] w-fit mb-8">
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                  active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="comics-category-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                    className="absolute inset-0 rounded-lg bg-white/[0.11] border border-white/[0.12]"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Clean Editorial Index Cards */}
        <div className="grid lg:grid-cols-2 gap-4">
          {visibleFacts.map((fact, idx) => {
            const dotClass = likelihoodDot(fact.likelihood);
            return (
              <article
                key={fact.id}
                className="rounded-xl bg-[#121216] border border-white/[0.08] hover:border-white/[0.16] p-6 transition-colors duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono-tech text-[11px] text-zinc-500">
                      {String(idx + 1).padStart(2, '0')} · {fact.comicSource}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-zinc-300">
                      <span className={`w-1.5 h-1.5 rounded-full ${dotClass.split(' ')[0]}`} />
                      {fact.likelihood}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white tracking-[-0.02em] leading-snug mb-4">
                    {fact.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                        In the Comics
                      </div>
                      <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                        {fact.whatHappensInComics}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-white/[0.07]">
                      <div>
                        <div className="font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                          MCU Clues Planted
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {fact.mcuCluesSoFar}
                        </p>
                      </div>
                      <div>
                        <div className="font-mono-tech text-[10px] uppercase tracking-wider text-emerald-400 mb-1">
                          Live-Action Forecast
                        </div>
                        <p className="text-xs text-zinc-200 leading-relaxed">
                          {fact.howItCouldAdapt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500">
                  <span>{fact.category}</span>
                  <span>PUBLISHED {fact.year}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
