import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { MULTIVERSE_RULES, MULTIVERSE_SAGA_PROJECTS } from '../data';
import { ProjectEntry } from '../types';

interface MultiverseSagaSectionProps {
  onSelectProject: (project: ProjectEntry) => void;
  watchedIds: string[];
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MULTIVERSE_PHASES: Record<
  4 | 5 | 6,
  { code: string; years: string; title: string; arc: string }
> = {
  4: {
    code: 'PHASE 04 / FRACTURE',
    years: '2021 – 2022',
    title: 'Grief, New Heroes & The Shattered Timeline',
    arc: 'After Endgame, 2012 Loki breaks the Sacred Timeline, Scarlet Witch tears into Earth-838, three Spider-Men collide, Shang-Chi activates a cosmic beacon, and Shuri takes up the Black Panther mantle.',
  },
  5: {
    code: 'PHASE 05 / CONVERGENCE',
    years: '2023 – 2025',
    title: 'Fox Integration, Adamantium & The New Avengers',
    arc: 'Monica Rambeau crosses into the X-Men universe, Deadpool & Wolverine canonizes Earth-10005, Brave New World unveils Adamantium, and Thunderbolts* becomes The New Avengers as the Fantastic Four’s ship enters Earth-616.',
  },
  6: {
    code: 'PHASE 06 / COLLAPSE',
    years: '2025 – 2027',
    title: 'First Steps, VisionQuest & Avengers: Doomsday',
    arc: 'The Fantastic Four debut on Earth-828, Doctor Doom approaches young Franklin Richards and unearths Wanda Maximoff in VisionQuest, Spider-Man swings solo in Brand New Day, and every universe collides on December 18, 2026.',
  },
};

export const MultiverseSagaSection: React.FC<MultiverseSagaSectionProps> = ({
  onSelectProject,
  watchedIds,
}) => {
  const [activePhase, setActivePhase] = useState<'all' | 4 | 5 | 6>(4);
  const [formatFilter, setFormatFilter] = useState<'all' | 'Film' | 'Series' | 'watchlist'>('all');
  const [activeRuleId, setActiveRuleId] = useState<string>(MULTIVERSE_RULES[0].id);

  const activeRule = useMemo(
    () => MULTIVERSE_RULES.find((r) => r.id === activeRuleId) ?? MULTIVERSE_RULES[0],
    [activeRuleId]
  );

  const filteredProjects = useMemo(() => {
    return MULTIVERSE_SAGA_PROJECTS.filter((p) => {
      if (activePhase !== 'all' && p.phase !== activePhase) return false;
      if (formatFilter === 'Film' && p.format !== 'Film') return false;
      if (formatFilter === 'Series' && p.format !== 'Series') return false;
      if (formatFilter === 'watchlist' && !p.inDoomsdayWatchlist) return false;
      return true;
    });
  }, [activePhase, formatFilter]);

  return (
    <section
      id="multiverse-saga"
      className="py-24 multiverse-hairline-grid text-zinc-100 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dramatic Architectural Contrast: Dark Technical Index Masthead */}
        <div className="pb-12 border-b border-white/[0.08]">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2.5 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-3">
                <span className="text-amber-400">BOOK II</span>
                <span className="text-zinc-600">/</span>
                <span>PHASES 4, 5 &amp; 6 · 2021–2027</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-white leading-[1.02]">
                The Multiverse Saga
              </h2>
              <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-[1.65]">
                Where the Infinity Saga was one warm, linear timeline, the Multiverse Saga splits
                into parallel Earths, Disney+ television arcs, returning legacy studios, and cosmic
                incursions — tracked here like a TVA archival ledger.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 font-mono-tech text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                  EARTH-616 · MCU
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                  EARTH-828 · F4
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                  EARTH-10005 · FOX
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
                  END OF TIME · LOKI
                </span>
              </div>
            </div>

            {/* Minimal Precision Vector Schematic — Zero AI Slop */}
            <div className="lg:col-span-6 rounded-2xl bg-[#0F0F13] border border-white/[0.08] p-5">
              <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 mb-3">
                <span>TIMELINE TOPOLOGY // SACRED → BRANCHED</span>
                <span className="text-emerald-400">CONVERGENCE: DEC 18</span>
              </div>
              <svg
                viewBox="0 0 540 132"
                className="w-full h-32 overflow-visible"
                role="img"
                aria-label="Schematic of the Sacred Timeline branching into Earth-828, Earth-616, and Earth-10005 before converging at Avengers Doomsday"
              >
                {/* Reference hairline */}
                <line
                  x1="8"
                  y1="66"
                  x2="520"
                  y2="66"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                {/* Sacred Timeline */}
                <path
                  d="M 10 66 L 155 66"
                  stroke="#D97706"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="155" cy="66" r="4" fill="#F59E0B" />

                {/* Upper Branch: Earth-828 */}
                <path
                  d="M 155 66 C 225 66, 245 22, 345 22 C 425 22, 465 56, 514 66"
                  stroke="#38BDF8"
                  strokeWidth="1.75"
                  fill="none"
                  strokeDasharray="5 4"
                />
                {/* Center Branch: Earth-616 */}
                <path
                  d="M 155 66 C 250 66, 355 54, 514 66"
                  stroke="#E4E4E7"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Lower Branch: Earth-10005 */}
                <path
                  d="M 155 66 C 225 66, 245 110, 345 110 C 425 110, 465 76, 514 66"
                  stroke="#A1A1AA"
                  strokeWidth="1.75"
                  fill="none"
                />

                {/* Doomsday Node */}
                <circle cx="514" cy="66" r="8" fill="#10B981" fillOpacity="0.18" />
                <circle cx="514" cy="66" r="3.5" fill="#10B981" />

                {/* Crisp Technical Labels */}
                <text x="10" y="52" fill="#A1A1AA" fontSize="9.5" fontFamily="monospace">
                  INFINITY SAGA (2008–19)
                </text>
                <text x="290" y="13" fill="#38BDF8" fontSize="9.5" fontFamily="monospace">
                  EARTH-828 · F4
                </text>
                <text x="290" y="54" fill="#F4F4F5" fontSize="9.5" fontFamily="monospace">
                  EARTH-616 · AVENGERS
                </text>
                <text x="278" y="126" fill="#A1A1AA" fontSize="9.5" fontFamily="monospace">
                  EARTH-10005 · FOX X-MEN
                </text>
                <text
                  x="456"
                  y="92"
                  fill="#34D399"
                  fontSize="9.5"
                  fontWeight="600"
                  fontFamily="monospace"
                >
                  DOOMSDAY
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Multiverse Mechanics 101 — Restrained Interactive Console */}
        <div className="py-14 border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                Core Concepts Explained
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-[-0.025em]">
                Multiverse Mechanics 101
              </h3>
            </div>
            <p className="text-sm text-zinc-400 max-w-md">
              New to Variants, the TVA, Incursions, or Anchor Beings? Select any rule for a
              zero-jargon breakdown.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
            {MULTIVERSE_RULES.map((rule) => {
              const active = rule.id === activeRule.id;
              return (
                <button
                  key={rule.id}
                  onClick={() => setActiveRuleId(rule.id)}
                  className={`relative rounded-xl p-4 text-left border transition-all duration-150 active:scale-[0.99] cursor-pointer ${
                    active
                      ? 'bg-[#15151A] border-white/[0.2] text-white'
                      : 'bg-[#0E0E12] border-white/[0.07] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.14]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-tech text-[10px] tracking-wider text-zinc-500">
                      {rule.code}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: active ? rule.accent : 'rgba(255,255,255,0.16)',
                      }}
                    />
                  </div>
                  <div className="font-display text-sm font-semibold">{rule.term}</div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeRule.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="rounded-xl bg-[#111115] border border-white/[0.08] p-6 grid lg:grid-cols-12 gap-6"
            >
              <div className="lg:col-span-7 space-y-3">
                <div className="font-mono-tech text-[11px] uppercase tracking-wider text-zinc-400">
                  {activeRule.tagline}
                </div>
                <p className="text-sm sm:text-[15px] text-zinc-200 leading-relaxed">
                  {activeRule.plainEnglish}
                </p>
                <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-xs sm:text-sm text-zinc-300">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
                    Everyday Analogy
                  </span>
                  {activeRule.realWorldAnalogy}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-4 lg:border-l lg:border-white/[0.08] lg:pl-6">
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-emerald-400 mb-1.5">
                    Doomsday Impact
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {activeRule.doomsdayImpact}
                  </p>
                </div>
                <div className="font-mono-tech text-[11px] text-zinc-500">
                  INTRODUCED: <span className="text-zinc-300">{activeRule.firstIntroduced}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phase 4 / 5 / 6 Controls & Official Poster Wall */}
        <div className="pt-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="inline-flex flex-wrap gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.07] w-fit">
              {([4, 5, 6, 'all'] as const).map((tab) => {
                const active = activePhase === tab;
                return (
                  <button
                    key={String(tab)}
                    onClick={() => setActivePhase(tab)}
                    className={`relative px-3.5 py-1.5 rounded-lg font-mono-tech text-xs font-medium transition-colors duration-150 cursor-pointer ${
                      active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="multiverse-phase-pill"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                        className="absolute inset-0 rounded-lg bg-white/[0.11] border border-white/[0.12]"
                      />
                    )}
                    <span className="relative z-10">
                      {tab === 'all' ? 'ALL (4–6)' : `PHASE ${tab}`}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: 'all', label: 'All Formats' },
                  { id: 'Film', label: 'Films' },
                  { id: 'Series', label: 'Disney+ Series' },
                  { id: 'watchlist', label: 'Watchlist Only' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormatFilter(f.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                    formatFilter === f.id
                      ? 'bg-zinc-100 text-zinc-950 border-zinc-100'
                      : 'bg-white/[0.03] text-zinc-400 border-white/[0.08] hover:text-zinc-200 hover:bg-white/[0.06]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {activePhase !== 'all' && (
            <div className="mb-8 p-5 rounded-xl bg-[#111115] border border-white/[0.08]">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[11px] text-zinc-400 mb-1">
                <span className="text-emerald-400">{MULTIVERSE_PHASES[activePhase].code}</span>
                <span>{MULTIVERSE_PHASES[activePhase].years}</span>
              </div>
              <h4 className="font-display text-xl font-bold text-white tracking-[-0.02em]">
                {MULTIVERSE_PHASES[activePhase].title}
              </h4>
              <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed max-w-4xl">
                {MULTIVERSE_PHASES[activePhase].arc}
              </p>
            </div>
          )}

          {/* Official Posters Grid — Multiverse Technical Styling */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {filteredProjects.map((item) => {
              const isWatched = watchedIds.includes(item.id);
              const isDoomsday = item.id === 'avengers-doomsday';
              return (
                <article
                  key={item.id}
                  onClick={() => onSelectProject(item)}
                  className="group cursor-pointer flex flex-col"
                >
                  <div
                    className={`relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 ring-1 ring-inset transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 ${
                      isDoomsday
                        ? 'ring-emerald-400/70 shadow-[0_14px_34px_rgba(16,185,129,0.2)]'
                        : 'ring-white/[0.1] group-hover:ring-white/[0.24]'
                    }`}
                  >
                    <img
                      src={item.poster}
                      alt={`${item.title} official poster`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-zinc-200 font-mono-tech text-[10px]">
                      P{item.phase} · {item.format === 'Series' ? 'TV' : 'FILM'}
                    </span>
                    {item.inDoomsdayWatchlist && (
                      <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500 text-[#04110B] font-mono-tech text-[10px] font-semibold">
                        {isWatched && <Check className="w-2.5 h-2.5 stroke-[3]" />}#
                        {item.watchlistOrder}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px] text-zinc-500">
                        <span className="truncate">{item.universeTag}</span>
                        <span className="tabular-nums shrink-0">{item.year}</span>
                      </div>
                      <h4 className="mt-1 font-display text-base font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {item.tagline}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/[0.07] flex items-center justify-between text-[11px] font-mono-tech text-zinc-500">
                      <span>{item.easterEggs.length} Easter Eggs</span>
                      <span className="inline-flex items-center gap-0.5 text-zinc-300 group-hover:text-emerald-300 transition-colors">
                        OPEN <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
