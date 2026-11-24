import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CHARACTERS } from '../data';
import { CharacterProfile } from '../types';

type FactionFilter = 'All' | CharacterProfile['faction'];

const FACTIONS: FactionFilter[] = [
  'All',
  'Doom & Latveria',
  'Avengers & New Avengers',
  'Fantastic Four',
  'X-Men & Mutants',
  'Young Avengers / Champions',
  'Cosmic & Multiverse',
  'Wakanda & Global Powers',
];

export const CharacterAtlas: React.FC = () => {
  const [faction, setFaction] = useState<FactionFilter>('All');

  const visibleChars = useMemo(() => {
    if (faction === 'All') return CHARACTERS;
    return CHARACTERS.filter((c) => c.faction === faction);
  }, [faction]);

  const statusBadge = (status?: CharacterProfile['castStatus']) => {
    if (status === 'Rumored')
      return 'bg-amber-500/15 text-amber-300 border-amber-400/30';
    return 'bg-black/75 text-zinc-200 border-white/15';
  };

  return (
    <section
      id="characters"
      className="py-24 bg-[#09090B] text-zinc-100 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-zinc-500 mb-2">
              Complete Cast &amp; Factions Atlas · {CHARACTERS.length} Players
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em]">
              Who’s Who in Avengers: Doomsday
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              The complete confirmed ensemble across the Avengers, New Avengers, Fantastic Four,
              Fox X-Men, Wakanda, and Talokan — plus the{' '}
              <span className="text-emerald-400 font-medium">Young Avengers / Champions</span>.
            </p>
          </div>
          <div className="font-mono-tech text-xs text-zinc-500 tabular-nums">
            Showing <span className="text-zinc-200 font-semibold">{visibleChars.length}</span> of{' '}
            {CHARACTERS.length} characters
          </div>
        </div>

        {/* Shared-Element Faction Tabs */}
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.07] w-fit mb-8">
          {FACTIONS.map((f) => {
            const active = faction === f;
            return (
              <button
                key={f}
                onClick={() => setFaction(f)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                  active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="character-faction-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                    className="absolute inset-0 rounded-lg bg-white/[0.11] border border-white/[0.12]"
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            );
          })}
        </div>

        {/* Official Cast & Character Poster Dossier Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleChars.map((char) => (
            <article
              key={char.id}
              className="group rounded-xl bg-[#101014] border border-white/[0.08] hover:border-white/[0.18] overflow-hidden flex flex-col justify-between transition-colors duration-200"
            >
              <div>
                {/* Theatrical Cast / Trailer Still Header */}
                <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden border-b border-white/[0.07]">
                  <img
                    src={char.portrait}
                    alt={`${char.name} (${char.actor})`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-[#101014]/25 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm font-mono-tech text-[10px] uppercase tracking-wider text-zinc-200 border border-white/10 truncate">
                      {char.faction}
                    </span>
                    {char.castStatus && (
                      <span
                        className={`px-2 py-0.5 rounded backdrop-blur-sm font-mono-tech text-[9.5px] uppercase tracking-wider border shrink-0 ${statusBadge(
                          char.castStatus
                        )}`}
                      >
                        {char.castStatus}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white tracking-[-0.02em] leading-tight">
                      {char.name}
                    </h3>
                    <div className="text-xs text-zinc-300 mt-0.5">
                      <span className="text-emerald-300 font-medium">{char.alias}</span> ·{' '}
                      {char.actor}
                    </div>
                  </div>
                </div>

                {/* Editorial Bio & Status */}
                <div className="p-5">
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 mb-2.5">
                    {char.originUniverse}
                  </div>

                  <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                    {char.plainEnglishBio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/[0.07] space-y-2.5 text-xs">
                    <div>
                      <span className="font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                        Abilities
                      </span>
                      <p className="text-zinc-400 leading-relaxed">{char.powers}</p>
                    </div>
                    <div>
                      <span className="font-mono-tech text-[10px] uppercase tracking-wider text-emerald-400 block mb-0.5">
                        Status Before Doomsday
                      </span>
                      <p className="text-zinc-300 leading-relaxed">
                        {char.statusBeforeDoomsday}{' '}
                        <span className="text-white font-medium">{char.doomsdayRole}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {char.essentialAppearances.map((app) => (
                  <span
                    key={app}
                    className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
