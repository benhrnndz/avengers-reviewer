import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Clock, User } from 'lucide-react';
import { ProjectEntry } from '../types';

interface ProjectBriefingModalProps {
  project: ProjectEntry | null;
  onClose: () => void;
  isWatched: boolean;
  onToggleWatched: (id: string) => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const ProjectBriefingModal: React.FC<ProjectBriefingModalProps> = ({
  project,
  onClose,
  isWatched,
  onToggleWatched,
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const isInfinity = project?.saga === 'infinity';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/72 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border shadow-[0_32px_80px_rgba(0,0,0,0.6)] ${
              isInfinity
                ? 'bg-[#F7F5F0] text-[#141413] border-[#DDD6C8]'
                : 'bg-[#111114] text-zinc-100 border-white/[0.12]'
            }`}
          >
            {/* Top Bar */}
            <div
              className={`sticky top-0 z-10 px-6 py-3.5 border-b backdrop-blur-md flex items-center justify-between gap-4 ${
                isInfinity
                  ? 'bg-[#F7F5F0]/92 border-[#E3DDD1]'
                  : 'bg-[#111114]/92 border-white/[0.08]'
              }`}
            >
              <div className="flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-wider opacity-75">
                <span>
                  {isInfinity
                    ? `Infinity Saga · Phase ${project.phase}`
                    : project.saga === 'fox'
                    ? `Legacy · ${project.foxGroup}`
                    : `Multiverse Saga · Phase ${project.phase}`}
                </span>
                <span>·</span>
                <span>{project.universeTag}</span>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  isInfinity
                    ? 'hover:bg-black/[0.06] text-[#57524A]'
                    : 'hover:bg-white/[0.08] text-zinc-400 hover:text-white'
                }`}
                aria-label="Close briefing"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-7">
              {/* Poster + Title Header */}
              <div className="grid sm:grid-cols-12 gap-6 items-start">
                <div className="sm:col-span-4">
                  <div
                    className={`aspect-[2/3] w-40 sm:w-full rounded-xl overflow-hidden ring-1 ring-inset ${
                      isInfinity ? 'bg-[#E5DFD3] ring-black/10' : 'bg-zinc-900 ring-white/15'
                    }`}
                  >
                    <img
                      src={project.poster}
                      alt={`${project.title} official poster`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="sm:col-span-8 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      className={`font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-tight ${
                        isInfinity ? 'text-[#121211]' : 'text-white'
                      }`}
                    >
                      {project.title}{' '}
                      <span className="opacity-45 font-normal tabular-nums">({project.year})</span>
                    </h3>
                    <p
                      className={`mt-2 text-sm sm:text-base leading-relaxed ${
                        isInfinity
                          ? 'font-serif-editorial italic text-[#6B5A3C] text-lg'
                          : 'text-zinc-300'
                      }`}
                    >
                      {project.tagline}
                    </p>
                  </div>

                  <div
                    className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-xs ${
                      isInfinity ? 'text-[#5C564D]' : 'text-zinc-400'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 opacity-70" />
                      {project.runtime} ({project.releaseDate})
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 opacity-70" />
                      {project.directorOrCreator}
                    </span>
                  </div>

                  {project.inDoomsdayWatchlist && (
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        onClick={() => onToggleWatched(project.id)}
                        className={`inline-flex items-center gap-2 h-9 px-3.5 rounded-lg text-xs font-semibold border transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                          isWatched
                            ? 'bg-emerald-500 text-[#04110B] border-emerald-400'
                            : isInfinity
                            ? 'bg-[#141413] text-[#F7F5F0] border-[#141413]'
                            : 'bg-white/[0.06] text-white border-white/[0.14] hover:bg-white/[0.1]'
                        }`}
                      >
                        <Check className={`w-3.5 h-3.5 ${isWatched ? 'opacity-100' : 'opacity-40'}`} />
                        {isWatched
                          ? `Watched · Countdown #${project.watchlistOrder}`
                          : `Mark Watched · Countdown #${project.watchlistOrder}`}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Plain-English Plot Summary */}
              <div
                className={`rounded-xl p-5 border ${
                  isInfinity
                    ? 'bg-white border-[#E2DCD0]'
                    : 'bg-white/[0.03] border-white/[0.08]'
                }`}
              >
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] opacity-60 mb-2">
                  Complete Plot Explained (Zero Prior Context Needed)
                </div>
                <p
                  className={`text-sm sm:text-[15px] leading-[1.7] ${
                    isInfinity ? 'text-[#2B2823]' : 'text-zinc-200'
                  }`}
                >
                  {project.beginnerSummary}
                </p>
              </div>

              {/* Why It Matters + Doomsday Connection / Post-Credits */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  className={`rounded-xl p-4 border ${
                    isInfinity ? 'bg-[#EFECE4] border-[#E2DCD0]' : 'bg-white/[0.02] border-white/[0.07]'
                  }`}
                >
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider opacity-60 mb-1.5">
                    Why It Matters
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isInfinity ? 'text-[#33302A]' : 'text-zinc-300'}`}>
                    {project.whyItMatters}
                  </p>
                </div>

                {project.doomsdayConnection ? (
                  <div className="rounded-xl p-4 border bg-emerald-500/[0.08] border-emerald-500/30">
                    <div className="font-mono-tech text-[10px] uppercase tracking-wider text-emerald-500 mb-1.5">
                      Avengers: Doomsday Connection
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isInfinity ? 'text-[#0E3A28]' : 'text-emerald-100'
                      }`}
                    >
                      {project.doomsdayConnection}
                    </p>
                  </div>
                ) : (
                  <div
                    className={`rounded-xl p-4 border ${
                      isInfinity ? 'bg-[#EFECE4] border-[#E2DCD0]' : 'bg-white/[0.02] border-white/[0.07]'
                    }`}
                  >
                    <div className="font-mono-tech text-[10px] uppercase tracking-wider opacity-60 mb-1.5">
                      Post-Credits Scene Explained
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isInfinity ? 'text-[#33302A]' : 'text-zinc-300'}`}>
                      {project.postCredits}
                    </p>
                  </div>
                )}
              </div>

              {project.doomsdayConnection && (
                <div
                  className={`rounded-xl p-4 border ${
                    isInfinity ? 'bg-[#EFECE4] border-[#E2DCD0]' : 'bg-white/[0.02] border-white/[0.07]'
                  }`}
                >
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider opacity-60 mb-1.5">
                    Post-Credits Scene Explained
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isInfinity ? 'text-[#33302A]' : 'text-zinc-300'}`}>
                    {project.postCredits}
                  </p>
                </div>
              )}

              {/* Key Characters */}
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-wider opacity-60 mb-2">
                  Key Characters
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.keyCharacters.map((c) => (
                    <span
                      key={c}
                      className={`px-2.5 py-1 rounded-md text-xs border ${
                        isInfinity
                          ? 'bg-white border-[#DFD9CE] text-[#33302A]'
                          : 'bg-white/[0.04] border-white/[0.08] text-zinc-300'
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Easter Eggs */}
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-wider opacity-60 mb-2.5">
                  Easter Eggs &amp; Hidden Details
                </div>
                <div className="space-y-2.5">
                  {project.easterEggs.map((egg) => (
                    <div
                      key={egg.title}
                      className={`rounded-xl p-3.5 border ${
                        isInfinity
                          ? 'bg-white border-[#E2DCD0]'
                          : 'bg-white/[0.02] border-white/[0.07]'
                      }`}
                    >
                      <div
                        className={`text-xs font-semibold mb-0.5 ${
                          isInfinity ? 'text-[#8A6A2C]' : 'text-zinc-100'
                        }`}
                      >
                        {egg.title}
                      </div>
                      <p className={`text-xs leading-relaxed ${isInfinity ? 'text-[#4A463E]' : 'text-zinc-400'}`}>
                        {egg.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
