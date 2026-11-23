import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, ExternalLink, Film, Tv } from 'lucide-react';
import { DOOMSDAY_POST_CREDITS, DOOMSDAY_TRAILERS } from '../data';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

type ReelTab = 'trailers' | 'stingers';

export const PostCreditsVault: React.FC = () => {
  const [tab, setTab] = useState<ReelTab>('trailers');
  const [trailerIdx, setTrailerIdx] = useState(0);
  const [stingerIdx, setStingerIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeTrailer = useMemo(
    () => DOOMSDAY_TRAILERS[trailerIdx] ?? DOOMSDAY_TRAILERS[0],
    [trailerIdx]
  );

  const activeScene = useMemo(
    () => DOOMSDAY_POST_CREDITS[stingerIdx] ?? DOOMSDAY_POST_CREDITS[0],
    [stingerIdx]
  );

  const switchTab = (next: ReelTab) => {
    setTab(next);
    setIsPlaying(false);
  };

  const currentLength = tab === 'trailers' ? DOOMSDAY_TRAILERS.length : DOOMSDAY_POST_CREDITS.length;
  const currentIndex = tab === 'trailers' ? trailerIdx : stingerIdx;

  const goPrev = () => {
    const next = (currentIndex - 1 + currentLength) % currentLength;
    if (tab === 'trailers') setTrailerIdx(next);
    else setStingerIdx(next);
    setIsPlaying(false);
  };

  const goNext = () => {
    const next = (currentIndex + 1) % currentLength;
    if (tab === 'trailers') setTrailerIdx(next);
    else setStingerIdx(next);
    setIsPlaying(false);
  };

  const currentVideoId = tab === 'trailers' ? activeTrailer.videoId : activeScene.videoId;
  const currentThumb = tab === 'trailers' ? activeTrailer.thumbnail : activeScene.thumbnail;
  const currentTitle = tab === 'trailers' ? activeTrailer.title : activeScene.sceneTitle;
  const currentOverline =
    tab === 'trailers'
      ? `${activeTrailer.label} · ${activeTrailer.channel}`
      : `${activeScene.projectTitle} · ${activeScene.sceneType}`;

  return (
    <section
      id="post-credits"
      className="py-24 bg-[#09090B] text-zinc-100 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-emerald-400 mb-2">
              Official Screening Room
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em]">
              Doomsday Trailers &amp; Post-Credits Footage
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Watch the official Marvel Studios <span className="text-zinc-200 font-medium">Avengers: Doomsday</span>{' '}
              trailers and teasers — or switch to all 11 chronological post-credits scenes leading
              straight into December 18.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Segmented Tab Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              {(
                [
                  { id: 'trailers', label: `Doomsday Trailers (${DOOMSDAY_TRAILERS.length})` },
                  { id: 'stingers', label: `Post-Credits (${DOOMSDAY_POST_CREDITS.length})` },
                ] as { id: ReelTab; label: string }[]
              ).map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => switchTab(item.id)}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                      active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="screening-room-tab"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                        className="absolute inset-0 rounded-lg bg-white/[0.11] border border-white/[0.12]"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Transport */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono-tech text-xs text-zinc-500 tabular-nums mr-1">
                {String(currentIndex + 1).padStart(2, '0')}/{String(currentLength).padStart(2, '0')}
              </span>
              <button
                onClick={goPrev}
                aria-label="Previous clip"
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] flex items-center justify-center text-zinc-200 transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next clip"
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] flex items-center justify-center text-zinc-200 transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main 16:9 Cinema Stage */}
        <div className="rounded-2xl bg-[#101014] border border-white/[0.09] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)] mb-8">
          <div className="grid lg:grid-cols-12">
            {/* Left: Video Player */}
            <div className="lg:col-span-7 bg-black relative">
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                {isPlaying ? (
                  <iframe
                    key={currentVideoId}
                    src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={currentTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative w-full h-full block text-left cursor-pointer"
                    aria-label={`Play ${currentTitle}`}
                  >
                    <img
                      src={currentThumb}
                      alt={currentTitle}
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 font-mono-tech text-[10px] uppercase tracking-wider text-zinc-200">
                        {tab === 'trailers'
                          ? `REEL 0${activeTrailer.order} · ${activeTrailer.label}`
                          : `STINGER ${String(activeScene.order).padStart(2, '0')} · ${activeScene.sceneType}`}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 font-mono-tech text-[10px] text-zinc-300 tabular-nums">
                        {tab === 'trailers' ? '2026' : activeScene.year}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/95 group-hover:bg-emerald-400 text-[#09090B] flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.65)] transition-all duration-200 group-hover:scale-105 group-active:scale-95">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div>
                        <div className="font-mono-tech text-[10px] uppercase tracking-wider text-emerald-400">
                          {currentOverline}
                        </div>
                        <div className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                          {currentTitle}
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[11px] font-medium text-white shrink-0">
                        Click to Play
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Right: Context Panel */}
            <AnimatePresence mode="wait">
              {tab === 'trailers' ? (
                <motion.div
                  key={activeTrailer.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="lg:col-span-5 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.08]"
                >
                  <div className="space-y-4">
                    <div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-emerald-400 mb-1.5">
                        {activeTrailer.label} · {activeTrailer.channel}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] leading-snug">
                        {activeTrailer.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {activeTrailer.description}
                    </p>

                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                        Key Moments Featured
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-200">
                        {activeTrailer.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                    {!isPlaying ? (
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-[#04110B] text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Play Trailer
                      </button>
                    ) : (
                      <span className="font-mono-tech text-[11px] text-emerald-400">
                        NOW PLAYING
                      </span>
                    )}
                    <a
                      href={`https://www.youtube.com/watch?v=${activeTrailer.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeScene.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="lg:col-span-5 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.08]"
                >
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5">
                        <span>{activeScene.universeTag}</span>
                        <span className="tabular-nums">{activeScene.year}</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-[-0.02em] leading-snug">
                        {activeScene.sceneTitle}
                      </h3>
                      <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-zinc-400">
                        {activeScene.projectTitle.includes('VisionQuest') ? (
                          <Tv className="w-3.5 h-3.5 text-zinc-500" />
                        ) : (
                          <Film className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                        {activeScene.projectTitle} ({activeScene.sceneType})
                      </div>
                    </div>

                    <div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                        What Happens on Screen
                      </div>
                      <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                        {activeScene.whatHappens}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/25">
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-emerald-400 mb-1">
                        Why It Leads to Avengers: Doomsday
                      </div>
                      <p className="text-xs text-emerald-100/95 leading-relaxed">
                        {activeScene.doomsdayConnection}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeScene.featuredCharacters.map((char) => (
                        <span
                          key={char}
                          className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.07]"
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                    {!isPlaying ? (
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-[#04110B] text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Play Footage
                      </button>
                    ) : (
                      <span className="font-mono-tech text-[11px] text-emerald-400">
                        NOW PLAYING
                      </span>
                    )}
                    <a
                      href={`https://www.youtube.com/watch?v=${activeScene.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Selector Strip for Active Tab */}
        {tab === 'trailers' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {DOOMSDAY_TRAILERS.map((t, idx) => {
              const active = idx === trailerIdx;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTrailerIdx(idx);
                    setIsPlaying(true);
                  }}
                  className={`group text-left rounded-xl overflow-hidden border transition-all duration-150 active:scale-[0.99] cursor-pointer ${
                    active
                      ? 'bg-[#15151B] border-emerald-500/70 ring-1 ring-emerald-500/30'
                      : 'bg-[#101014] border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={t.thumbnail}
                      alt={t.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <span
                      className={`absolute top-2 left-2 px-1.5 py-0.5 rounded font-mono-tech text-[9.5px] font-semibold uppercase ${
                        active ? 'bg-emerald-500 text-[#04110B]' : 'bg-black/80 text-zinc-200'
                      }`}
                    >
                      {t.label}
                    </span>
                    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/75 group-hover:bg-emerald-500 text-white group-hover:text-[#04110B] flex items-center justify-center backdrop-blur-sm transition-colors">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-mono-tech text-[10px] text-zinc-500 truncate">
                      {t.channel}
                    </div>
                    <div
                      className={`mt-1 font-display text-xs font-semibold leading-snug line-clamp-2 ${
                        active ? 'text-emerald-300' : 'text-zinc-100'
                      }`}
                    >
                      {t.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {DOOMSDAY_POST_CREDITS.map((scene, idx) => {
              const active = idx === stingerIdx;
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    setStingerIdx(idx);
                    setIsPlaying(true);
                  }}
                  className={`group text-left rounded-xl overflow-hidden border transition-all duration-150 active:scale-[0.99] cursor-pointer ${
                    active
                      ? 'bg-[#15151B] border-emerald-500/70 ring-1 ring-emerald-500/30'
                      : 'bg-[#101014] border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={scene.thumbnail}
                      alt={`${scene.projectTitle} post-credits`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <span
                      className={`absolute top-2 left-2 px-1.5 py-0.5 rounded font-mono-tech text-[10px] font-semibold tabular-nums ${
                        active ? 'bg-emerald-500 text-[#04110B]' : 'bg-black/80 text-zinc-200'
                      }`}
                    >
                      {String(scene.order).padStart(2, '0')}
                    </span>
                    <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/75 group-hover:bg-emerald-500 text-white group-hover:text-[#04110B] flex items-center justify-center backdrop-blur-sm transition-colors">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px] text-zinc-500">
                      <span className="truncate">{scene.projectTitle}</span>
                      <span className="tabular-nums shrink-0">{scene.year}</span>
                    </div>
                    <div
                      className={`mt-1 font-display text-xs sm:text-[13px] font-semibold leading-snug line-clamp-1 ${
                        active ? 'text-emerald-300' : 'text-zinc-100'
                      }`}
                    >
                      {scene.sceneTitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
