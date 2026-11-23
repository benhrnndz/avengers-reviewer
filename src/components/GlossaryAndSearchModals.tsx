import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { ALL_PROJECTS, BEGINNER_GLOSSARY, CHARACTERS, COMIC_FACTS } from '../data';
import { GlossaryItem, ProjectEntry } from '../types';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface GlossaryModalProps {
  open: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ open, onClose }) => {
  const [cat, setCat] = useState<'All' | GlossaryItem['category']>('All');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const items = useMemo(() => {
    if (cat === 'All') return BEGINNER_GLOSSARY;
    return BEGINNER_GLOSSARY.filter((g) => g.category === cat);
  }, [cat]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/72 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#111114] border border-white/[0.12] text-zinc-100 shadow-2xl"
          >
            <div className="sticky top-0 z-10 bg-[#111114]/95 backdrop-blur-md px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-base text-white">
                  Beginner MCU Glossary
                </h3>
                <p className="text-xs text-zinc-400">
                  Every Marvel term explained in plain English.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-white/[0.08] text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Close Glossary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-1.5 mb-5">
                {(['All', 'Universe', 'Events', 'Multiverse', 'Artifacts', 'Factions'] as const).map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => setCat(c)}
                      className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                        cat === c
                          ? 'bg-zinc-100 text-zinc-950 border-zinc-100'
                          : 'bg-white/[0.03] text-zinc-400 border-white/[0.08] hover:text-zinc-200'
                      }`}
                    >
                      {c}
                    </button>
                  )
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {items.map((item) => (
                  <div
                    key={item.term}
                    className="rounded-xl bg-white/[0.02] border border-white/[0.07] p-4"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-display font-semibold text-sm text-white">{item.term}</h4>
                      <span className="font-mono-tech text-[10px] uppercase text-zinc-500">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{item.shortDef}</p>
                    <p className="mt-2 text-[11px] text-zinc-500">{item.example}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface GlobalSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectEntry) => void;
  onOpenGlossary: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  open,
  onClose,
  onSelectProject,
  onOpenGlossary,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        projects: ALL_PROJECTS.filter((p) => p.inDoomsdayWatchlist).slice(0, 6),
        characters: CHARACTERS.slice(0, 3),
        comics: COMIC_FACTS.slice(0, 2),
      };
    }

    return {
      projects: ALL_PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.beginnerSummary.toLowerCase().includes(q) ||
          p.keyCharacters.some((c) => c.toLowerCase().includes(q)) ||
          p.easterEggs.some(
            (e) => e.title.toLowerCase().includes(q) || e.detail.toLowerCase().includes(q)
          )
      ).slice(0, 8),
      characters: CHARACTERS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.alias.toLowerCase().includes(q) ||
          c.actor.toLowerCase().includes(q) ||
          c.faction.toLowerCase().includes(q)
      ).slice(0, 5),
      comics: COMIC_FACTS.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.whatHappensInComics.toLowerCase().includes(q) ||
          f.comicSource.toLowerCase().includes(q)
      ).slice(0, 4),
    };
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/72 backdrop-blur-sm flex items-start justify-center p-4 pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl bg-[#111114] border border-white/[0.12] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search films, VisionQuest, Blade, Doctor Doom, Infinity Stones, Easter eggs..."
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-white/[0.08] text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-3 space-y-4">
              {results.projects.length > 0 && (
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-zinc-500 px-2.5 mb-1.5">
                    {query ? 'Films & Series' : 'Countdown to Doomsday Highlights'}
                  </div>
                  <div className="space-y-0.5">
                    {results.projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectProject(p);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-white/[0.06] flex items-center gap-3 transition-colors cursor-pointer"
                      >
                        <img
                          src={p.poster}
                          alt={p.title}
                          className="w-8 h-12 rounded object-cover bg-zinc-900 shrink-0 ring-1 ring-white/10"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-white truncate">
                            {p.title}{' '}
                            <span className="text-xs font-normal text-zinc-500">({p.year})</span>
                          </div>
                          <div className="text-xs text-zinc-400 truncate">{p.tagline}</div>
                        </div>
                        <span className="font-mono-tech text-[10px] uppercase text-zinc-500 shrink-0">
                          {p.saga}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.characters.length > 0 && (
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-zinc-500 px-2.5 mb-1.5">
                    Characters
                  </div>
                  <div className="space-y-0.5">
                    {results.characters.map((c) => (
                      <a
                        key={c.id}
                        href="#characters"
                        onClick={onClose}
                        className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-white/[0.06] transition-colors"
                      >
                        <img
                          src={c.portrait}
                          alt={c.name}
                          className="w-8 h-10 rounded object-cover object-top bg-zinc-900 shrink-0 ring-1 ring-white/10"
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-white truncate">
                            {c.name}{' '}
                            <span className="text-xs font-normal text-zinc-400">({c.alias})</span>
                          </div>
                          <div className="text-xs text-zinc-500 truncate">
                            {c.actor} · {c.faction}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {results.comics.length > 0 && (
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-zinc-500 px-2.5 mb-1.5">
                    Comics Forecast
                  </div>
                  <div className="space-y-0.5">
                    {results.comics.map((f) => (
                      <a
                        key={f.id}
                        href="#comics-lore"
                        onClick={onClose}
                        className="block px-2.5 py-2 rounded-lg hover:bg-white/[0.06] transition-colors"
                      >
                        <div className="text-sm font-medium text-white">{f.title}</div>
                        <div className="text-xs text-zinc-500">{f.comicSource}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {results.projects.length === 0 &&
                results.characters.length === 0 &&
                results.comics.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-sm text-zinc-400 mb-3">
                      No direct matches for “{query}”.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenGlossary();
                      }}
                      className="px-3.5 py-1.5 rounded-md bg-white/[0.08] text-zinc-200 text-xs font-medium cursor-pointer"
                    >
                      Open Beginner Glossary
                    </button>
                  </div>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
