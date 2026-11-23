import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { ALL_PROJECTS } from '../data';
import { ProjectEntry } from '../types';

interface DoomsdayHeroProps {
  onOpenGlossary: () => void;
  onSelectProject: (project: ProjectEntry) => void;
  watchedCount: number;
  totalWatchlist: number;
}

const RELEASE_TARGET = new Date('2026-12-18T00:00:00-05:00').getTime();
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

function computeTimeLeft() {
  const diff = Math.max(0, RELEASE_TARGET - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CONVERGING_WORLDS = [
  {
    code: 'EARTH-616',
    title: 'Avengers & New Avengers',
    body: 'Sam Wilson’s Avengers, the Thunderbolts* (New Avengers + Sentry), Wakanda, Shang-Chi, Thor, VisionQuest’s awakened Wanda, and returning Steve Rogers.',
  },
  {
    code: 'EARTH-828',
    title: 'Fantastic Four & Latveria',
    body: 'Marvel’s First Family from a 1960s retro-futuristic Earth whose extradimensional rocket crossed into Earth-616 after Doctor Doom visited Franklin Richards.',
  },
  {
    code: 'EARTH-10005',
    title: '21st Century Fox X-Men',
    body: 'Professor X, Magneto, Cyclops, Beast, Nightcrawler, Mystique, and Gambit — bridged into MCU continuity via The Marvels and Deadpool & Wolverine.',
  },
  {
    code: 'END OF TIME',
    title: 'Loki & The Dying Multiverse',
    body: 'God-of-Stories Loki holds the living Yggdrasil tree of infinite timelines alive on his throne — the final cosmic anchor standing in Doom’s way.',
  },
];

export const DoomsdayHero: React.FC<DoomsdayHeroProps> = ({
  onOpenGlossary,
  onSelectProject,
  watchedCount,
  totalWatchlist,
}) => {
  const [timeLeft, setTimeLeft] = useState(computeTimeLeft);
  const doomsdayEntry = ALL_PROJECTS.find((p) => p.id === 'avengers-doomsday');

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="doomsday"
      className="relative pt-24 pb-20 bg-[#09090B] text-zinc-100 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-10"
        >
          <div className="flex items-center gap-2.5 text-xs font-mono-tech text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-zinc-200">THEATRICAL RELEASE: DECEMBER 18, 2026</span>
            <span className="hidden sm:inline text-zinc-600">·</span>
            <span className="hidden sm:inline">DIRECTED BY ANTHONY &amp; JOE RUSSO</span>
          </div>
          <span className="text-xs text-zinc-400">
            Built for complete newcomers — zero prior Marvel movies required
          </span>
        </motion.div>

        {/* Main Asymmetric Editorial Hero */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Typography + Countdown + Actions */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE_OUT }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-emerald-400 mb-3">
                The Complete Viewer’s Immersion Guide
              </p>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.35rem] font-bold tracking-[-0.035em] leading-[0.98]">
                <span className="bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Avengers:{' '}
                </span>
                <span className="bg-gradient-to-b from-[#6EE7B7] via-[#10B981] to-[#047857] bg-clip-text text-transparent drop-shadow-[0_2px_22px_rgba(16,185,129,0.22)]">
                  Doomsday
                </span>
              </h1>
              <p className="mt-5 text-base sm:text-[17px] text-zinc-400 leading-[1.65] max-w-xl">
                Understand 28 years of Marvel cinema and television — across every saga, legacy
                universe, and colliding timeline — without having to watch everything first.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#post-credits"
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#04110B] font-semibold text-sm transition-all duration-150 active:scale-[0.98]"
                >
                  Watch Official Trailers
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#watchlist"
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-zinc-100 font-medium text-sm transition-all duration-150 active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  16-Project Watchlist
                  <span className="font-mono-tech text-xs text-zinc-400 tabular-nums">
                    ({watchedCount}/{totalWatchlist})
                  </span>
                </a>
                <button
                  onClick={onOpenGlossary}
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.05] font-medium text-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-zinc-400" />
                  Beginner Glossary
                </button>
              </div>
            </div>

            {/* Precision Tabular Countdown */}
            <div className="mt-10 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                  Countdown to Incursion
                </span>
                <span className="font-mono-tech text-[11px] text-emerald-400">
                  DEC 18, 2026
                </span>
              </div>
              <div className="grid grid-cols-4 divide-x divide-white/[0.08] rounded-xl bg-white/[0.02] border border-white/[0.08]">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="py-4 px-2 text-center">
                    <div className="font-mono-tech text-2xl sm:text-3xl font-semibold text-white tabular-nums tracking-tight">
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div className="mt-1 font-mono-tech text-[10px] uppercase tracking-widest text-zinc-500">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 30-Second Story Arc for Beginners */}
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                {
                  step: '01',
                  title: 'Infinity Saga',
                  text: 'One linear timeline (2008–2019). Heroes unite against Thanos & the 6 Infinity Stones. Iron Man dies; Cap retires.',
                },
                {
                  step: '02',
                  title: 'Multiverse Saga',
                  text: 'Loki fractures reality into parallel Earths (2021–2026), introducing the Fantastic Four and canonizing Fox’s X-Men.',
                },
                {
                  step: '03',
                  title: 'Doomsday',
                  text: 'Universes collide (Incursions). Robert Downey Jr. returns as Victor von Doom — monarch of Latveria — leading into Secret Wars.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.07] p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono-tech text-[11px] text-emerald-400">{item.step}</span>
                    <span className="text-xs font-semibold text-zinc-100">{item.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Official Poster + Doctor Doom Dossier */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl bg-[#111114] border border-white/[0.09] p-5 shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
              <div className="grid grid-cols-12 gap-5 items-start">
                {/* Official Avengers: Doomsday Teaser Poster */}
                <button
                  onClick={() => doomsdayEntry && onSelectProject(doomsdayEntry)}
                  className="col-span-5 group relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 ring-1 ring-inset ring-white/15 cursor-pointer text-left"
                  title="Open Avengers: Doomsday Briefing"
                >
                  <img
                    src="/posters/avengers-doomsday.jpg"
                    alt="Avengers: Doomsday official poster"
                    className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </button>

                {/* Crisp Doctor Doom Briefing */}
                <div className="col-span-7 space-y-2.5">
                  <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-emerald-400">
                    Prime Antagonist
                  </div>
                  <h2 className="font-display text-xl font-bold text-white tracking-[-0.02em]">
                    Victor von Doom
                  </h2>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Played by <strong className="text-zinc-100">Robert Downey Jr.</strong> Marvel
                    confirmed he is <strong className="text-zinc-100">not</strong> a Tony Stark
                    variant — he is the authentic ruler of Latveria, fusing Reed-level science with
                    arcane sorcery.
                  </p>
                  <div className="pt-2 border-t border-white/[0.08] space-y-1.5 text-[11px] text-zinc-400">
                    <p>
                      <span className="text-zinc-200 font-medium">First Steps stinger:</span> Seen
                      kneeling before Reed &amp; Sue’s reality-warping son Franklin Richards.
                    </p>
                    <p>
                      <span className="text-zinc-200 font-medium">VisionQuest stinger:</span>{' '}
                      Unearthed Wanda Maximoff from the rubble of Mount Wundagore.
                    </p>
                  </div>
                </div>
              </div>

              {doomsdayEntry && (
                <button
                  onClick={() => onSelectProject(doomsdayEntry)}
                  className="mt-4 w-full h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-200 flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.99] cursor-pointer"
                >
                  Read Full Doomsday Dossier <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Four Converging Realities — Clean 4-Column Architectural Strip */}
        <div className="mt-14 pt-8 border-t border-white/[0.08]">
          <div className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-zinc-500 mb-5">
            Four Realities Converging on December 18
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONVERGING_WORLDS.map((w) => (
              <div
                key={w.code}
                className="rounded-xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.15] p-4 transition-colors duration-200"
              >
                <div className="font-mono-tech text-[10px] tracking-[0.16em] text-emerald-400 mb-1.5">
                  {w.code}
                </div>
                <h3 className="font-display font-semibold text-sm text-white mb-1.5">{w.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
