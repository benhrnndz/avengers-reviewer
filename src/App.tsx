import React, { useEffect, useState } from 'react';
import { ArrowUp, RotateCcw } from 'lucide-react';
import { IntroCurtain } from './components/IntroCurtain';
import { Navbar } from './components/Navbar';
import { DoomsdayHero } from './components/DoomsdayHero';
import { PostCreditsVault } from './components/PostCreditsVault';
import { DoomsdayWatchlist } from './components/DoomsdayWatchlist';
import { CharacterAtlas } from './components/CharacterAtlas';
import { InfinitySagaSection } from './components/InfinitySagaSection';
import { MultiverseSagaSection } from './components/MultiverseSagaSection';
import { FoxLegacySection } from './components/FoxLegacySection';
import { ShareDoomsdayCTA } from './components/ShareDoomsdayCTA';
import { ProjectBriefingModal } from './components/ProjectBriefingModal';
import { GlossaryModal, GlobalSearchModal } from './components/GlossaryAndSearchModals';
import { DOOMSDAY_WATCHLIST } from './data';
import { ProjectEntry } from './types';

const STORAGE_KEY = 'mcu-codex-doomsday-watched-v1';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [watchedIds, setWatchedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [selectedProject, setSelectedProject] = useState<ProjectEntry | null>(null);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedIds));
    } catch {
      // ignore storage quota errors
    }
  }, [watchedIds]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        !showIntro &&
        e.key === '/' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showIntro]);

  const toggleWatched = (id: string) => {
    setWatchedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetWatched = () => setWatchedIds([]);

  const watchedInOfficialList = DOOMSDAY_WATCHLIST.filter((p) =>
    watchedIds.includes(p.id)
  ).length;

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100">
      <IntroCurtain visible={showIntro} onEnter={() => setShowIntro(false)} />

      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenGlossary={() => setGlossaryOpen(true)}
        watchedCount={watchedInOfficialList}
        totalWatchlist={DOOMSDAY_WATCHLIST.length}
      />

      <main>
        <DoomsdayHero
          onOpenGlossary={() => setGlossaryOpen(true)}
          onSelectProject={setSelectedProject}
          watchedCount={watchedInOfficialList}
          totalWatchlist={DOOMSDAY_WATCHLIST.length}
        />

        <PostCreditsVault />

        <DoomsdayWatchlist
          watchedIds={watchedIds}
          onToggleWatched={toggleWatched}
          onResetWatched={resetWatched}
          onSelectProject={setSelectedProject}
        />

        <CharacterAtlas />

        <InfinitySagaSection
          onSelectProject={setSelectedProject}
          watchedIds={watchedIds}
        />

        <MultiverseSagaSection
          onSelectProject={setSelectedProject}
          watchedIds={watchedIds}
        />

        <FoxLegacySection
          onSelectProject={setSelectedProject}
          watchedIds={watchedIds}
        />

        <ShareDoomsdayCTA />
      </main>

      <footer className="bg-[#09090B] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-500">
            <span className="text-zinc-200 font-medium">MCU Codex</span> · Fan-made guide spanning
            Earth-616, Earth-828, Earth-10005, Sony Spider-Man, Blade &amp; Netflix Defenders.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                setShowIntro(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono-tech text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Replay Intro
            </button>
            <a
              href="#doomsday"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono-tech text-zinc-300 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" /> Top
            </a>
          </div>
        </div>
      </footer>

      <ProjectBriefingModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isWatched={selectedProject ? watchedIds.includes(selectedProject.id) : false}
        onToggleWatched={toggleWatched}
      />
      <GlossaryModal open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <GlobalSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProject={setSelectedProject}
        onOpenGlossary={() => setGlossaryOpen(true)}
      />
    </div>
  );
}
