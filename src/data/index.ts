import { INFINITY_SAGA_PROJECTS as RAW_INFINITY, INFINITY_STONES } from './infinitySaga';
import { MULTIVERSE_SAGA_PROJECTS as RAW_MULTIVERSE, MULTIVERSE_RULES } from './multiverseSaga';
import { FOX_PROJECTS as RAW_FOX, FOX_TIMELINE_EXPLAINER } from './foxProjects';
import { CHARACTERS as RAW_CHARACTERS, COMIC_FACTS, BEGINNER_GLOSSARY } from './charactersAndLore';
import { DOOMSDAY_POST_CREDITS } from './postCredits';
import { CharacterProfile, ProjectEntry } from '../types';

const withPoster = (list: ProjectEntry[]): ProjectEntry[] =>
  list.map((item) => ({
    ...item,
    poster: item.poster ?? `/posters/${item.id}.jpg`,
  }));

export const CHARACTERS: CharacterProfile[] = RAW_CHARACTERS.map((char) => ({
  ...char,
  portrait: char.portrait ?? `/characters/${char.id}.jpg`,
}));

export const INFINITY_SAGA_PROJECTS: ProjectEntry[] = withPoster(RAW_INFINITY);
export const MULTIVERSE_SAGA_PROJECTS: ProjectEntry[] = withPoster(RAW_MULTIVERSE);
export const FOX_PROJECTS: ProjectEntry[] = withPoster(RAW_FOX);

export const ALL_PROJECTS: ProjectEntry[] = [
  ...FOX_PROJECTS,
  ...INFINITY_SAGA_PROJECTS,
  ...MULTIVERSE_SAGA_PROJECTS,
];

export const DOOMSDAY_WATCHLIST: ProjectEntry[] = ALL_PROJECTS.filter(
  (p) => p.inDoomsdayWatchlist && typeof p.watchlistOrder === 'number'
).sort((a, b) => (a.watchlistOrder ?? 99) - (b.watchlistOrder ?? 99));

export {
  INFINITY_STONES,
  MULTIVERSE_RULES,
  FOX_TIMELINE_EXPLAINER,
  COMIC_FACTS,
  BEGINNER_GLOSSARY,
  DOOMSDAY_POST_CREDITS,
};
