import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { INFINITY_SAGA_PROJECTS, INFINITY_STONES } from '../data';
import { InfinityStone, ProjectEntry } from '../types';

interface InfinitySagaSectionProps {
  onSelectProject: (project: ProjectEntry) => void;
  watchedIds: string[];
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PHASE_META: Record<1 | 2 | 3, { numeral: string; years: string; title: string; arc: string }> = {
  1: {
    numeral: 'Phase I',
    years: '2008 – 2012',
    title: 'Assembling the Legends',
    arc: 'Six distinct heroes — Iron Man, Hulk, Thor, Captain America, Black Widow, and Hawkeye — collide in New York, revealing alien civilizations and the first two Infinity Stones.',
  },
  2: {
    numeral: 'Phase II',
    years: '2013 – 2015',
    title: 'Cracks in the Foundation',
    arc: 'S.H.I.E.L.D. collapses to Hydra, the Guardians open deep space, Ultron sparks global fear, Ant-Man discovers the Quantum Realm, and Thanos claims the Gauntlet.',
  },
  3: {
    numeral: 'Phase III',
    years: '2016 – 2019',
    title: 'The Titan’s Reckoning',
    arc: 'Civil War splits the Avengers as Spider-Man, Doctor Strange, Black Panther, and Captain Marvel debut — culminating in Infinity War’s Snap and Endgame’s Time Heist.',
  },
};

const CONTACT_SHEET_IDS = [
  'iron-man',
  'captain-america-first-avenger',
  'the-avengers',
  'captain-america-winter-soldier',
  'guardians-of-the-galaxy',
  'black-panther',
  'avengers-infinity-war',
  'avengers-endgame',
];

const InteractiveStoneStage: React.FC<{ stone: InfinityStone }> = ({ stone }) => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawY, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawX, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px * 18);
    rawY.set(-py * 18);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900 }}
      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#09090B] ring-1 ring-inset ring-black/20 flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
    >
      {/* Subtle physical light cast by the stone onto the dark chamber */}
      <motion.div
        animate={{ opacity: [0.22, 0.38, 0.22], scale: [0.95, 1.06, 0.95] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-44 h-44 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: stone.hex }}
      />

      {/* Precision counter-rotating hairline orbital rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute w-52 h-52 rounded-full border border-dashed pointer-events-none"
        style={{ borderColor: `${stone.hex}44` }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 19, repeat: Infinity, ease: 'linear' }}
        className="absolute w-40 h-40 rounded-full border pointer-events-none"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      />

      {/* Floating + Interactive 3D-tilting real MCU film stone */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center"
      >
        <motion.div
          animate={{
            y: [-6, 6, -6],
            rotateZ: [-2.5, 2.5, -2.5],
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_20px_48px_rgba(0,0,0,0.85)] bg-black"
        >
          <img
            src={stone.image}
            alt={`${stone.name} official MCU appearance`}
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono-tech text-[9.5px] uppercase tracking-wider text-zinc-400 pointer-events-none">
        <span>Move cursor to tilt</span>
        <span style={{ color: stone.hex }}>{stone.color}</span>
      </div>
    </div>
  );
};

export const InfinitySagaSection: React.FC<InfinitySagaSectionProps> = ({
  onSelectProject,
  watchedIds,
}) => {
  const [activePhase, setActivePhase] = useState<'all' | 1 | 2 | 3>(1);
  const [selectedStoneId, setSelectedStoneId] = useState<string>(INFINITY_STONES[0].id);

  const selectedStone = useMemo(
    () => INFINITY_STONES.find((s) => s.id === selectedStoneId) ?? INFINITY_STONES[0],
    [selectedStoneId]
  );

  const contactSheetFilms = useMemo(
    () =>
      CONTACT_SHEET_IDS.map((id) => INFINITY_SAGA_PROJECTS.find((p) => p.id === id)).filter(
        Boolean
      ) as ProjectEntry[],
    []
  );

  const visibleProjects = useMemo(() => {
    if (activePhase === 'all') return INFINITY_SAGA_PROJECTS;
    return INFINITY_SAGA_PROJECTS.filter((p) => p.phase === activePhase);
  }, [activePhase]);

  return (
    <section
      id="infinity-saga"
      className="py-24 bg-[#F7F5F0] text-[#141413] border-b border-[#DED9CE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Swiss Editorial / Criterion Monograph Masthead */}
        <div className="pb-12 border-b border-[#DFD9CE]">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#8A6A2C] mb-3">
                <span>Book I</span>
                <span className="text-[#C8C0B1]">/</span>
                <span>The Sacred Timeline · 2008–2019</span>
              </div>
              <h2 className="font-serif-editorial text-4xl sm:text-6xl font-medium tracking-[-0.025em] text-[#121211] leading-[1.02]">
                The Infinity Saga
              </h2>
              <p className="mt-4 text-base sm:text-[17px] text-[#524E46] leading-[1.65] max-w-2xl">
                Before the Multiverse broke open, Marvel’s opening decade told one continuous,
                grounded story across 23 theatrical films: how six strangers became a family,
                discovered the <strong className="font-semibold text-[#121211]">Six Infinity Stones</strong>,
                lost half of all life to Thanos, and risked everything to bring everyone home.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-3 border-t lg:border-t-0 lg:border-l border-[#DFD9CE] pt-6 lg:pt-0 lg:pl-8 gap-6">
              <div>
                <div className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#121211] tabular-nums">
                  23
                </div>
                <div className="mt-1 font-mono-tech text-[10px] uppercase tracking-widest text-[#706A5E]">
                  Theatrical Films
                </div>
              </div>
              <div>
                <div className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#121211] tabular-nums">
                  03
                </div>
                <div className="mt-1 font-mono-tech text-[10px] uppercase tracking-widest text-[#706A5E]">
                  Linear Phases
                </div>
              </div>
              <div>
                <div className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#121211] tabular-nums">
                  06
                </div>
                <div className="mt-1 font-mono-tech text-[10px] uppercase tracking-widest text-[#706A5E]">
                  Infinity Stones
                </div>
              </div>
            </div>
          </div>

          {/* Curated Official Poster Contact Sheet */}
          <div className="mt-10 grid grid-cols-4 sm:grid-cols-8 gap-2.5">
            {contactSheetFilms.map((film) => (
              <button
                key={film.id}
                onClick={() => onSelectProject(film)}
                className="group relative aspect-[2/3] rounded-md overflow-hidden bg-[#E7E2D7] ring-1 ring-inset ring-black/10 transition-transform duration-200 hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
                title={`${film.title} (${film.year})`}
              >
                <img
                  src={film.poster}
                  alt={`${film.title} official poster`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Real Film Infinity Stones — Animated Museum Specimen Cabinet */}
        <div className="py-14 border-b border-[#DFD9CE]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#8A6A2C] mb-1.5">
                Artifacts of the Saga · Kinetic Film Specimens
              </div>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#121211]">
                The Six Infinity Stones
              </h3>
            </div>
            <p className="text-sm text-[#57524A] max-w-md leading-relaxed">
              Every stone below is photographed directly from the MCU films, levitating in
              zero-gravity containment. Select any gem to inspect it in 3D and trace its journey.
            </p>
          </div>

          {/* 6 Continuously Levitating Real Film Gem Specimen Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {INFINITY_STONES.map((stone, idx) => {
              const active = stone.id === selectedStone.id;
              return (
                <button
                  key={stone.id}
                  onClick={() => setSelectedStoneId(stone.id)}
                  className={`group rounded-xl p-2.5 text-left border transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                    active
                      ? 'bg-[#141413] text-[#F7F5F0] border-[#141413] shadow-[0_10px_28px_rgba(20,20,19,0.16)]'
                      : 'bg-white text-[#141413] border-[#DFD9CE] hover:border-[#B5AD9E]'
                  }`}
                >
                  {/* Dark recessed chamber with gently levitating real film stone */}
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-[#080809] mb-2.5 ring-1 ring-inset ring-white/10 flex items-center justify-center">
                    <motion.div
                      animate={{ opacity: active ? [0.25, 0.45, 0.25] : [0.1, 0.2, 0.1] }}
                      transition={{
                        duration: 3.6 + idx * 0.35,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute w-16 h-16 rounded-full blur-xl pointer-events-none"
                      style={{ backgroundColor: stone.hex }}
                    />
                    <motion.img
                      src={stone.image}
                      alt={`${stone.name} as seen in the Marvel films`}
                      animate={{
                        y: [-3.5, 3.5, -3.5],
                        rotate: idx % 2 === 0 ? [-2, 2, -2] : [2, -2, 2],
                        scale: [1.03, 1.08, 1.03],
                      }}
                      transition={{
                        duration: 4.0 + idx * 0.45,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: idx * 0.3,
                      }}
                      className="relative z-10 w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-0.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: stone.hex }}
                      />
                      <span className="text-xs font-semibold tracking-tight">
                        {stone.name.replace(' Stone', '')}
                      </span>
                    </div>
                    <div
                      className={`mt-0.5 text-[11px] truncate ${
                        active ? 'text-zinc-400' : 'text-[#6D675C]'
                      }`}
                    >
                      {stone.color}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Specimen Inspection Sheet with Interactive 3D Floating Chamber */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStone.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="rounded-2xl bg-white border border-[#DFD9CE] p-6 sm:p-8 grid lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4">
                <InteractiveStoneStage stone={selectedStone} />
                <div className="mt-3 flex items-center justify-between text-xs text-[#6B6559]">
                  <span className="font-mono-tech uppercase tracking-wider text-[10px]">
                    MCU Film Appearance
                  </span>
                  <span className="font-medium text-[#141413]">{selectedStone.color}</span>
                </div>
                <p className="mt-1.5 text-xs text-[#59534A] leading-relaxed">
                  {selectedStone.filmCut}
                </p>
              </div>

              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#8A6A2C]">
                      Vessel: {selectedStone.vessel}
                    </div>
                    <h4 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#121211] mt-1">
                      {selectedStone.name}
                    </h4>
                  </div>
                  <p className="text-sm text-[#3B3832] leading-relaxed">{selectedStone.power}</p>
                  <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#E5E0D6]">
                    <div className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#7A7367] mb-1">
                      Plain-English Analogy
                    </div>
                    <p className="font-serif-editorial text-lg italic text-[#1E1C19] leading-snug">
                      “{selectedStone.beginnerAnalogy}”
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#7A7367] mb-2.5">
                      Film-by-Film Trail
                    </div>
                    <ol className="space-y-2 border-l border-[#E2DCD0] pl-3.5">
                      {selectedStone.journey.map((step, i) => (
                        <li key={i} className="text-xs text-[#3B3832] leading-relaxed">
                          <span className="font-mono-tech text-[10px] text-[#8A6A2C] mr-1.5">
                            0{i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#ECE7DD] text-xs text-[#57524A] leading-relaxed">
                    <strong className="text-[#141413]">Final Fate:</strong>{' '}
                    {selectedStone.finalFate}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phase I / II / III Selector & Official Poster Grid */}
        <div className="pt-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#121211]">
                Complete 23-Film Index
              </h3>
              <p className="text-sm text-[#57524A] mt-1">
                Select any theatrical poster to read its full beginner summary, Easter eggs, and
                post-credits scene.
              </p>
            </div>

            <div className="inline-flex flex-wrap gap-1 p-1 rounded-xl bg-[#EAE5DA] border border-[#DDD6C8] w-fit">
              {([1, 2, 3, 'all'] as const).map((tab) => {
                const active = activePhase === tab;
                return (
                  <button
                    key={String(tab)}
                    onClick={() => setActivePhase(tab)}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                      active ? 'text-[#F7F5F0]' : 'text-[#544F47] hover:text-[#141413]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="infinity-phase-pill"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                        className="absolute inset-0 rounded-lg bg-[#141413]"
                      />
                    )}
                    <span className="relative z-10">
                      {tab === 'all' ? 'All 23 Films' : PHASE_META[tab].numeral}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {activePhase !== 'all' && (
            <div className="mb-8 p-5 rounded-xl bg-white border border-[#DFD9CE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#8A6A2C]">
                  {PHASE_META[activePhase].numeral} · {PHASE_META[activePhase].years}
                </div>
                <h4 className="font-serif-editorial text-2xl font-medium text-[#121211] mt-0.5">
                  {PHASE_META[activePhase].title}
                </h4>
                <p className="text-sm text-[#524E46] mt-1 max-w-3xl leading-relaxed">
                  {PHASE_META[activePhase].arc}
                </p>
              </div>
            </div>
          )}

          {/* Crisp Official Poster Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {visibleProjects.map((film) => {
              const catalogNumber = INFINITY_SAGA_PROJECTS.findIndex((p) => p.id === film.id) + 1;
              const isWatched = watchedIds.includes(film.id);
              return (
                <article
                  key={film.id}
                  onClick={() => onSelectProject(film)}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#E6E0D4] ring-1 ring-inset ring-black/10 shadow-[0_8px_24px_rgba(20,20,19,0.08)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[0_16px_36px_rgba(20,20,19,0.16)]">
                    <img
                      src={film.poster}
                      alt={`${film.title} (${film.year}) official poster`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#141413]/85 backdrop-blur-sm text-[#F7F5F0] font-mono-tech text-[10px] font-medium tabular-nums">
                      #{String(catalogNumber).padStart(2, '0')}
                    </span>
                    {film.inDoomsdayWatchlist && (
                      <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-600/95 text-white font-mono-tech text-[10px] font-medium">
                        {isWatched && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        Watchlist
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tech text-[#7A7367]">
                        <span>
                          P{film.phase} · {film.year}
                        </span>
                        <span>{film.runtime}</span>
                      </div>
                      <h4 className="mt-1 font-serif-editorial text-lg font-medium text-[#141413] group-hover:text-[#8A6A2C] transition-colors leading-snug">
                        {film.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#59544B] leading-relaxed line-clamp-2">
                        {film.tagline}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#E6E0D5] flex items-center justify-between text-[11px] font-medium text-[#6C655A]">
                      <span>{film.easterEggs.length} Easter Eggs</span>
                      <span className="inline-flex items-center gap-0.5 text-[#141413] group-hover:text-[#8A6A2C] transition-colors">
                        Briefing <ArrowUpRight className="w-3 h-3" />
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
