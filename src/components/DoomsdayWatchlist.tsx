import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, RotateCcw, ArrowUpRight, Share2 } from 'lucide-react';
import { DOOMSDAY_WATCHLIST } from '../data';
import { ProjectEntry } from '../types';
import { generateDoomsdayStoryCard } from '../utils/storyCard';

const DEFAULT_STORY_NOTE =
  'We’re watching Avengers: Doomsday on Dec 18 — here’s the complete MCU catch-up guide so you don’t have to watch 60+ movies first';

interface DoomsdayWatchlistProps {
  watchedIds: string[];
  onToggleWatched: (id: string) => void;
  onResetWatched: () => void;
  onSelectProject: (project: ProjectEntry) => void;
}

type FilterMode = 'all' | 'todo' | 'watched' | 'fox' | 'infinity' | 'multiverse';

export const DoomsdayWatchlist: React.FC<DoomsdayWatchlistProps> = ({
  watchedIds,
  onToggleWatched,
  onResetWatched,
  onSelectProject,
}) => {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [shareStatus, setShareStatus] = useState<'idle' | 'busy' | 'done'>('idle');

  const stats = useMemo(() => {
    const watchedSet = new Set(watchedIds);
    const completed = DOOMSDAY_WATCHLIST.filter((p) => watchedSet.has(p.id));
    const remainingMinutes = DOOMSDAY_WATCHLIST.filter((p) => !watchedSet.has(p.id)).reduce(
      (sum, p) => sum + p.runtimeMinutes,
      0
    );
    const pct = Math.round((completed.length / DOOMSDAY_WATCHLIST.length) * 100);
    return {
      completedCount: completed.length,
      total: DOOMSDAY_WATCHLIST.length,
      pct,
      remainingHours: (remainingMinutes / 60).toFixed(1),
    };
  }, [watchedIds]);

  const handleQuickShareReadiness = async () => {
    if (shareStatus === 'busy') return;
    setShareStatus('busy');
    const url =
      typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';

    try {
      const blob = await generateDoomsdayStoryCard(DEFAULT_STORY_NOTE, url, {
        watchedCount: stats.completedCount,
        totalCount: stats.total,
      });
      const file = new File([blob], 'avengers-doomsday-story.png', { type: 'image/png' });

      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // ignore clipboard permission errors
      }

      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [file] }) &&
        /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
      ) {
        try {
          await navigator.share({
            files: [file],
            title: `My Doomsday Readiness: ${stats.pct}%`,
            text: `I'm ${stats.pct}% ready for Avengers: Doomsday (${stats.completedCount}/${stats.total} watched).`,
          });
          setShareStatus('done');
          window.setTimeout(() => setShareStatus('idle'), 2400);
          return;
        } catch {
          // Dismissed or unsupported -> fall back to PNG download
        }
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'avengers-doomsday-story.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);

      setShareStatus('done');
      window.setTimeout(() => setShareStatus('idle'), 2400);
    } catch {
      setShareStatus('idle');
    }
  };

  const filteredItems = useMemo(() => {
    const watchedSet = new Set(watchedIds);
    return DOOMSDAY_WATCHLIST.filter((item) => {
      if (filter === 'todo') return !watchedSet.has(item.id);
      if (filter === 'watched') return watchedSet.has(item.id);
      if (filter === 'fox') return item.saga === 'fox';
      if (filter === 'infinity') return item.saga === 'infinity';
      if (filter === 'multiverse') return item.saga === 'multiverse';
      return true;
    });
  }, [filter, watchedIds]);

  const tabs: { id: FilterMode; label: string }[] = [
    { id: 'all', label: `All ${stats.total}` },
    { id: 'todo', label: `Remaining (${stats.total - stats.completedCount})` },
    { id: 'watched', label: `Watched (${stats.completedCount})` },
    { id: 'fox', label: 'Fox X-Men' },
    { id: 'infinity', label: 'Infinity Saga' },
    { id: 'multiverse', label: 'Multiverse Saga' },
  ];

  return (
    <section
      id="watchlist"
      className="py-24 bg-[#0D0D10] text-zinc-100 border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Readiness Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-emerald-400 mb-2">
              Official Disney+ Curated List · Updated with VisionQuest
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-[-0.03em]">
              Countdown to Doomsday ({stats.total} Projects)
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              The 16 essential films and series spanning Fox’s X-Men, the Infinity Saga, and the
              Multiverse Saga — including{' '}
              <span className="text-zinc-200 font-medium">VisionQuest</span> following its Wundagore
              finale. Check off what you’ve seen, or click any poster for a 60-second catch-up.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-[356px] rounded-xl bg-[#0A1812] border border-emerald-500/35 p-4.5 shadow-[0_14px_36px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(52,211,153,0.18)]">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-emerald-300 font-medium">
                  Doomsday Readiness
                </span>
              </div>
              <span className="font-mono-tech text-2xl font-bold text-white tabular-nums tracking-tight">
                {stats.pct}%
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-black/55 ring-1 ring-inset ring-white/[0.08] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.45)]"
                initial={false}
                animate={{ width: `${stats.pct}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-zinc-300 tabular-nums">
              <span>
                <strong className="text-white font-semibold">{stats.completedCount}</strong> /{' '}
                {stats.total} watched
              </span>
              <span className="inline-flex items-center gap-1 font-mono-tech text-[11px] text-emerald-200/75">
                <Clock className="w-3 h-3 text-emerald-400/80" />
                {stats.remainingHours}h left
              </span>
            </div>

            <div className="mt-3.5 pt-3 border-t border-emerald-500/15 flex items-center justify-between gap-2">
              {stats.completedCount > 0 ? (
                <button
                  onClick={onResetWatched}
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              ) : (
                <span className="text-[11px] text-zinc-500">Check items to track</span>
              )}

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleQuickShareReadiness}
                  disabled={shareStatus === 'busy'}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/18 hover:bg-emerald-500/28 border border-emerald-400/35 text-[11px] font-medium text-emerald-200 hover:text-white transition-all active:scale-[0.97] disabled:opacity-60 cursor-pointer"
                >
                  {shareStatus === 'done' ? (
                    <Check className="w-3 h-3 text-emerald-300" />
                  ) : (
                    <Share2 className="w-3 h-3 text-emerald-300" />
                  )}
                  <span>
                    {shareStatus === 'busy'
                      ? 'Saving…'
                      : shareStatus === 'done'
                        ? 'Story Saved'
                        : 'Share Story'}
                  </span>
                </button>
                <a
                  href="#share-doomsday"
                  className="inline-flex items-center px-2 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-[11px] text-zinc-400 hover:text-zinc-100 transition-colors"
                  title="More share options"
                >
                  More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Emil-style Segmented Shared-Element Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.07] w-fit mb-8">
          {tabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer ${
                  active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="watchlist-filter-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                    className="absolute inset-0 rounded-lg bg-white/[0.1] border border-white/[0.1]"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 16-Item Official Poster Dossier Grid */}
        {filteredItems.length === 0 ? (
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-10 text-center text-sm text-zinc-400">
            No titles match this filter yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-3.5">
            {filteredItems.map((project) => {
              const isWatched = watchedIds.includes(project.id);
              return (
                <div
                  key={project.id}
                  className={`group rounded-xl border p-3.5 flex gap-4 transition-all duration-150 ${
                    isWatched
                      ? 'bg-emerald-500/[0.05] border-emerald-500/30'
                      : 'bg-[#121216] border-white/[0.08] hover:border-white/[0.18]'
                  }`}
                >
                  {/* Official 2:3 Poster Thumbnail */}
                  <button
                    onClick={() => onSelectProject(project)}
                    className="relative shrink-0 w-[76px] sm:w-[88px] aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 ring-1 ring-inset ring-white/10 cursor-pointer"
                  >
                    <img
                      src={project.poster}
                      alt={`${project.title} official poster`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm font-mono-tech text-[10px] font-semibold text-white tabular-nums">
                      {String(project.watchlistOrder).padStart(2, '0')}
                    </span>
                  </button>

                  {/* Metadata & Doomsday Tie-in */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-[11px] font-mono-tech text-zinc-500 mb-0.5">
                            <span>
                              {project.saga === 'fox'
                                ? 'FOX LEGACY'
                                : project.saga === 'infinity'
                                ? `INFINITY · P${project.phase}`
                                : `MULTIVERSE · P${project.phase}`}
                            </span>
                            <span>·</span>
                            <span className="tabular-nums">{project.year}</span>
                            {project.id === 'visionquest' && (
                              <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 text-[10px]">
                                NEW
                              </span>
                            )}
                          </div>
                          <h3
                            onClick={() => onSelectProject(project)}
                            className={`font-display text-base font-semibold leading-snug cursor-pointer transition-colors ${
                              isWatched
                                ? 'text-emerald-200'
                                : 'text-white group-hover:text-emerald-300'
                            }`}
                          >
                            {project.title}
                          </h3>
                        </div>

                        {/* Crisp Tactile Checkbox */}
                        <button
                          onClick={() => onToggleWatched(project.id)}
                          aria-label={
                            isWatched
                              ? `Mark ${project.title} unwatched`
                              : `Mark ${project.title} watched`
                          }
                          className={`shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer ${
                            isWatched
                              ? 'bg-emerald-500 border-emerald-400 text-[#04110B]'
                              : 'bg-white/[0.03] border-white/[0.18] hover:border-emerald-400/60 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                        </button>
                      </div>

                      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {project.doomsdayConnection || project.whyItMatters}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <span className="font-mono-tech text-[11px] text-zinc-500">
                        {project.runtime}
                      </span>
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1 font-medium text-zinc-200 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        60s Catch-Up
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
