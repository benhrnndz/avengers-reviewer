export type SagaType = 'infinity' | 'multiverse' | 'fox';

export type MediaFormat = 'Film' | 'Series' | 'Special';

export type PhaseNumber = 1 | 2 | 3 | 4 | 5 | 6;

export interface EasterEgg {
  title: string;
  detail: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  year: number;
  releaseDate: string;
  saga: SagaType;
  phase?: PhaseNumber;
  foxGroup?: 'Blade (Pre-MCU Legacy)' | 'X-Men Original' | 'X-Men Revised & Solo' | 'Deadpool' | 'Fantastic Four' | 'Daredevil & Elektra';
  format: MediaFormat;
  poster?: string;
  runtime: string;
  runtimeMinutes: number;
  directorOrCreator: string;
  universeTag: string;
  tagline: string;
  beginnerSummary: string;
  whyItMatters: string;
  keyCharacters: string[];
  infinityStones?: string[];
  multiverseConcepts?: string[];
  easterEggs: EasterEgg[];
  postCredits: string;
  doomsdayConnection?: string;
  inDoomsdayWatchlist?: boolean;
  watchlistOrder?: number;
  accentColor: string;
}

export interface InfinityStone {
  id: string;
  name: string;
  color: string;
  hex: string;
  image: string;
  vessel: string;
  filmCut: string;
  power: string;
  beginnerAnalogy: string;
  firstSeen: string;
  journey: string[];
  finalFate: string;
}

export interface MultiverseRule {
  id: string;
  term: string;
  code: string;
  tagline: string;
  plainEnglish: string;
  realWorldAnalogy: string;
  firstIntroduced: string;
  doomsdayImpact: string;
  accent: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  alias: string;
  actor: string;
  portrait?: string;
  faction:
    | 'Doom & Latveria'
    | 'Avengers & New Avengers'
    | 'Fantastic Four'
    | 'X-Men & Mutants'
    | 'Young Avengers / Champions'
    | 'Cosmic & Multiverse'
    | 'Wakanda & Global Powers';
  castStatus?: 'Confirmed' | 'Confirmed Nov 23' | 'Potential / Rumored';
  originUniverse: string;
  debut: string;
  powers: string;
  plainEnglishBio: string;
  statusBeforeDoomsday: string;
  doomsdayRole: string;
  essentialAppearances: string[];
  accent: string;
}

export interface ComicFact {
  id: string;
  title: string;
  comicSource: string;
  year: string;
  likelihood: 'Virtually Confirmed' | 'Strong Teases in MCU' | 'Future Saga Setup';
  category: 'Doctor Doom' | 'Secret Wars & Battleworld' | 'Mutants & X-Men' | 'Cosmic & Next Gen';
  whatHappensInComics: string;
  mcuCluesSoFar: string;
  howItCouldAdapt: string;
  spoilerNote?: string;
}

export interface GlossaryItem {
  term: string;
  category: 'Universe' | 'Events' | 'Artifacts' | 'Factions' | 'Multiverse';
  shortDef: string;
  example: string;
}

export interface PostCreditsScene {
  id: string;
  order: number;
  projectTitle: string;
  year: number;
  sceneType: 'Mid-Credits' | 'Post-Credits' | 'Key Bridge Footage' | 'Encore Tag';
  sceneTitle: string;
  universeTag: string;
  videoId: string;
  thumbnail: string;
  whatHappens: string;
  doomsdayConnection: string;
  featuredCharacters: string[];
}
