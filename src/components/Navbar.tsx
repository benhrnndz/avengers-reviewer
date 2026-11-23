import React, { useEffect, useState } from 'react';
import { BookOpen, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenGlossary: () => void;
  watchedCount: number;
  totalWatchlist: number;
}

const NAV_LINKS = [
  { id: 'doomsday', label: 'Doomsday' },
  { id: 'post-credits', label: 'Trailers & Stingers' },
  { id: 'watchlist', label: 'Watchlist (16)' },
  { id: 'characters', label: 'Characters' },
  { id: 'infinity-saga', label: 'Infinity Saga' },
  { id: 'multiverse-saga', label: 'Multiverse Saga' },
  { id: 'fox-legacy', label: 'Non-MCU Vault' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenGlossary,
  watchedCount,
  totalWatchlist,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ${
        scrolled
          ? 'bg-[#09090B]/88 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-[#09090B]/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Wordmark — crisp, restrained, zero gimmicks */}
        <a
          href="#doomsday"
          className="flex items-center gap-2 shrink-0 group focus:outline-none"
        >
          <img
            src="/avengers-icon.png"
            alt="Avengers emblem"
            className="w-5 h-5 object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-display font-semibold text-sm tracking-[-0.02em] text-zinc-100">
            MCU Codex
          </span>
          <span className="hidden sm:inline text-zinc-600 text-xs">/</span>
          <span className="hidden sm:inline font-mono-tech text-[11px] text-zinc-400">
            Doomsday Edition
          </span>
        </a>

        {/* Primary nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="px-2.5 py-1.5 rounded-md text-[13px] font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Utility controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="inline-flex items-center gap-2 h-8 px-2.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-zinc-300 hover:text-white transition-all duration-150 active:scale-[0.98] cursor-pointer"
            aria-label="Search MCU Codex"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block px-1 py-0.5 text-[10px] font-mono-tech leading-none rounded bg-white/[0.07] text-zinc-400">
              /
            </kbd>
          </button>

          <button
            onClick={onOpenGlossary}
            className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-200 transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Glossary</span>
          </button>

          <a
            href="#watchlist"
            className="hidden xl:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 text-xs font-mono-tech text-emerald-300 tabular-nums transition-colors duration-150"
          >
            {watchedCount}/{totalWatchlist} Ready
          </a>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#09090B]/98 border-b border-white/[0.08] px-4 py-3">
          <div className="grid grid-cols-2 gap-1.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
