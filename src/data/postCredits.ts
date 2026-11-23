import { DoomsdayTrailer, PostCreditsScene } from '../types';

export const DOOMSDAY_TRAILERS: DoomsdayTrailer[] = [
  {
    id: 'doomsday-official-trailer',
    order: 1,
    label: 'Official Trailer',
    title: 'Avengers: Doomsday — Official Theatrical Trailer',
    channel: 'Marvel Entertainment',
    videoId: 'irVNGjRFZGk',
    thumbnail: '/trailers/doomsday-trailer-1.jpg',
    description:
      'The flagship theatrical trailer revealing colliding realities, Robert Downey Jr.’s Victor von Doom, the Avengers, New Avengers, Fantastic Four, and the returning Fox X-Men.',
    highlights: ['Doctor Doom Reveal', 'Xavier & Magneto Chess Reunion', 'Earth-616 × Earth-828 × Earth-10005'],
  },
  {
    id: 'doomsday-special-look',
    order: 2,
    label: 'Special Look',
    title: 'Avengers: Doomsday — Special Look',
    channel: 'Marvel Entertainment',
    videoId: 'X1aFkAkFASk',
    thumbnail: '/trailers/doomsday-special-look.jpg',
    description:
      'Extended Marvel Studios Special Look previewing the scale, stakes, and intersecting realities leading straight into December 18.',
    highlights: ['Extended Official Look', 'Multiverse Stakes', 'In Theaters December 18'],
  },
  {
    id: 'doomsday-steve-rogers',
    order: 3,
    label: 'Character Teaser',
    title: 'Steve Rogers Will Return — Avengers: Doomsday',
    channel: 'Marvel Entertainment',
    videoId: 'UiMg566PREA',
    thumbnail: '/trailers/doomsday-steve-rogers.jpg',
    description:
      'Official Marvel Studios teaser confirming Chris Evans’s Steve Rogers will return for Avengers: Doomsday.',
    highlights: ['Steve Rogers Returns', 'Original Avengers Legacy', 'December 18, 2026'],
  },
  {
    id: 'doomsday-thor-odinson',
    order: 4,
    label: 'Character Teaser',
    title: 'Thor Odinson Will Return — Avengers: Doomsday',
    channel: 'Marvel Entertainment',
    videoId: '1clWprLC5Ak',
    thumbnail: '/trailers/doomsday-thor.jpg',
    description:
      'Official Marvel Studios teaser heralding Chris Hemsworth’s Thor Odinson returning to the front lines of the multiverse conflict.',
    highlights: ['Thor Odinson Returns', 'God of Thunder', 'December 18, 2026'],
  },
  {
    id: 'doomsday-xmen',
    order: 5,
    label: 'Faction Teaser',
    title: 'The X-Men Will Return — Avengers: Doomsday',
    channel: 'Marvel Entertainment',
    videoId: 'kH1XlwHQv9o',
    thumbnail: '/trailers/doomsday-xmen.jpg',
    description:
      'Official Marvel Studios teaser spotlighting the return of the classic X-Men cast as Earth-10005 converges with Earth-616.',
    highlights: ['Classic X-Men Return', 'Earth-10005 Convergence', 'Mutant Legacy'],
  },
  {
    id: 'doomsday-wakanda-f4',
    order: 6,
    label: 'Faction Teaser',
    title: 'Wakanda & The Fantastic Four — Avengers: Doomsday',
    channel: 'Marvel Entertainment',
    videoId: '399Ez7WHK5s',
    thumbnail: '/trailers/doomsday-trailer-4.jpg',
    description:
      'Official Marvel Studios teaser uniting Wakanda and Marvel’s First Family — Earth-828’s Fantastic Four — as their worlds collide.',
    highlights: ['Wakanda', 'The Fantastic Four', 'Worlds Collide'],
  },
  {
    id: 'doomsday-the-return',
    order: 7,
    label: 'Official Footage',
    title: 'Avengers: Doomsday — “The Return”',
    channel: 'Marvel Entertainment',
    videoId: 'Fg0jyss_YnU',
    thumbnail: '/trailers/doomsday-trailer-2.jpg',
    description:
      'Official Marvel Studios theatrical spot focusing on legacy heroes stepping back into the breach as the final Incursion clock winds down.',
    highlights: ['Returning Avengers Icons', 'Multiversal Collapse', 'Russo Brothers Direction'],
  },
  {
    id: 'doomsday-december-18',
    order: 8,
    label: 'Teaser Spot',
    title: 'Avengers: Doomsday — In Theaters December 18',
    channel: 'Marvel Entertainment',
    videoId: 'UfNu7pcR0e8',
    thumbnail: '/trailers/doomsday-trailer-3.jpg',
    description:
      'High-impact official teaser spotlighting converging hero factions bracing against Doctor Doom’s arrival on December 18, 2026.',
    highlights: ['Faction Convergence', 'Latveria & Doom', 'IMAX Event Scale'],
  },
  {
    id: 'doomsday-countdown-disneyplus',
    order: 9,
    label: 'Official Recap Promo',
    title: 'Countdown to Avengers: Doomsday — Every Moment on Disney+',
    channel: 'Marvel Entertainment',
    videoId: 'Kl7nG1nD0mk',
    thumbnail: '/trailers/doomsday-trailer-5.jpg',
    description:
      'Marvel’s official retrospective sizzle connecting the Infinity Saga, Multiverse Saga, Fox X-Men, and Fantastic Four straight into Doomsday.',
    highlights: ['Official Watchlist Promo', '26 Years of Marvel Cinema', 'Beginner Overview'],
  },
];

export const DOOMSDAY_POST_CREDITS: PostCreditsScene[] = [
  {
    id: 'shang-chi-beacon',
    order: 1,
    projectTitle: 'Shang-Chi and the Legend of the Ten Rings',
    year: 2021,
    sceneType: 'Mid-Credits',
    sceneTitle: 'The Ten Rings Cosmic Beacon',
    universeTag: 'EARTH-616 · KAMAR-TAJ',
    videoId: 'bpm6P4oQZbU',
    thumbnail: '/stingers/shang-chi-beacon.jpg',
    whatHappens:
      'Wong brings Shang-Chi and Katy into Kamar-Taj to meet holograms of Bruce Banner and Captain Marvel. Scanning the Ten Rings, they discover the weapons are neither Vibranium nor alien Chitauri tech — they are far older than a thousand years and are actively transmitting a signal deep into unknown space.',
    doomsdayConnection:
      'Officially inducts Shang-Chi into the Avengers’ inner circle and plants one of the Multiverse Saga’s oldest unresolved mysteries: what ancient cosmic power built the Ten Rings — and who heard their beacon?',
    featuredCharacters: ['Shang-Chi', 'Wong', 'Bruce Banner', 'Captain Marvel'],
  },
  {
    id: 'multiverse-of-madness-clea',
    order: 2,
    projectTitle: 'Doctor Strange in the Multiverse of Madness',
    year: 2022,
    sceneType: 'Mid-Credits',
    sceneTitle: 'Clea & The Incursion Rift',
    universeTag: 'EARTH-616 → DARK DIMENSION',
    videoId: '3kTYQgXBdD0',
    thumbnail: '/stingers/multiverse-of-madness-clea.jpg',
    whatHappens:
      'Walking down a New York street after sprouting a third eye from using the Darkhold, Doctor Strange is intercepted by sorceress Clea (Charlize Theron). She slashes open a jagged purple dimensional tear and tells him plainly: “You caused an incursion, and we’re going to fix it.”',
    doomsdayConnection:
      'Directly introduces Incursions — two parallel realities colliding until one or both are annihilated — which is the exact ticking-clock apocalypse driving Avengers: Doomsday.',
    featuredCharacters: ['Doctor Strange', 'Clea'],
  },
  {
    id: 'the-marvels-young-avengers',
    order: 3,
    projectTitle: 'The Marvels',
    year: 2023,
    sceneType: 'Key Bridge Footage',
    sceneTitle: 'Kamala Khan Recruits Kate Bishop',
    universeTag: 'EARTH-616 · NEW YORK',
    videoId: 'SyGXq2jK1OU',
    thumbnail: '/stingers/the-marvels-young-avengers.jpg',
    whatHappens:
      'Mirroring Nick Fury’s famous 2008 Iron Man cameo, Kamala Khan (Ms. Marvel) waits in the shadows of Kate Bishop’s apartment with a S.A.B.E.R. tablet: “You think you’re the only kid superhero in the world?” — explicitly name-dropping Ant-Man’s daughter Cassie Lang as their next recruit.',
    doomsdayConnection:
      'With Kathryn Newton (Cassie Lang) and Hailee Steinfeld (Kate Bishop, confirmed Nov 23, 2026) both on the Doomsday slate, this scene marks the official birth of the Young Avengers / Champions.',
    featuredCharacters: ['Kate Bishop', 'Kamala Khan / Ms. Marvel', 'Lucky the Pizza Dog'],
  },
  {
    id: 'the-marvels-beast',
    order: 4,
    projectTitle: 'The Marvels',
    year: 2023,
    sceneType: 'Post-Credits',
    sceneTitle: 'Monica Wakes Up in the X-Men Universe',
    universeTag: 'EARTH-10005 / X-MEN REALITY',
    videoId: 'JGT3JVaH_a0',
    thumbnail: '/stingers/the-marvels-beast.jpg',
    whatHappens:
      'After sacrificing herself to seal a multiversal tear from the opposite side, Monica Rambeau wakes inside a medical bay watched over by an alternate-universe version of her mother Maria (Binary) — until Kelsey Grammer’s Dr. Hank McCoy / Beast walks in behind metallic “X” doors and notes that “Charles wants an update.”',
    doomsdayConnection:
      'The single biggest live-action bridge between Earth-616 and the Fox X-Men universe, directly setting up Kelsey Grammer’s Beast, Patrick Stewart’s Professor X, and Ian McKellen’s Magneto for Avengers: Doomsday.',
    featuredCharacters: ['Monica Rambeau', 'Beast (Kelsey Grammer)', 'Maria Rambeau / Binary'],
  },
  {
    id: 'brave-new-world-leader',
    order: 5,
    projectTitle: 'Captain America: Brave New World',
    year: 2025,
    sceneType: 'Post-Credits',
    sceneTitle: 'The Leader’s Warning Inside The Raft',
    universeTag: 'EARTH-616 · THE RAFT',
    videoId: 'xuV2pUQd7VE',
    thumbnail: '/stingers/brave-new-world-leader.jpg',
    whatHappens:
      'Visiting imprisoned gamma-genius Samuel Sterns (The Leader) inside The Raft supermax prison, Sam Wilson listens as Sterns delivers a chilling probabilistic forecast: “It’s coming... I’ve seen it in the probabilities. We share the same world, don’t we? Wait until you see the others — from other worlds.”',
    doomsdayConnection:
      'First explicit in-universe warning on Earth-616 that heroes from rival parallel realities (Earth-828 & Earth-10005) are heading straight toward a collision with Sam Wilson’s newly reformed Avengers.',
    featuredCharacters: ['Sam Wilson / Captain America', 'Samuel Sterns / The Leader'],
  },
  {
    id: 'thunderbolts-f4-ship',
    order: 6,
    projectTitle: 'Thunderbolts*',
    year: 2025,
    sceneType: 'Post-Credits',
    sceneTitle: 'The Fantastic Four Enter Earth-616',
    universeTag: 'EARTH-616 · WATCHTOWER',
    videoId: 'MhSJQQmLGyA',
    thumbnail: '/stingers/thunderbolts-f4-ship.jpg',
    whatHappens:
      'Fourteen months after being rebranded “The New Avengers,” Yelena, Bucky, Red Guardian, Ghost, U.S. Agent, and Bob bicker in Watchtower over Sam Wilson suing them for the Avengers trademark — until deep-space sensors detect an extradimensional retro-futuristic rocket bearing a massive glowing “4” tearing through Earth-616’s upper atmosphere.',
    doomsdayConnection:
      'Directed directly by the Russo Brothers on the Avengers: Doomsday set! Literally serves as the opening inciting moment showing Marvel’s First Family fleeing Earth-828 into Earth-616.',
    featuredCharacters: ['Yelena Belova', 'Bucky Barnes', 'Red Guardian', 'John Walker', 'Ghost', 'Bob / Sentry'],
  },
  {
    id: 'first-steps-doom',
    order: 7,
    projectTitle: 'The Fantastic Four: First Steps',
    year: 2025,
    sceneType: 'Mid-Credits',
    sceneTitle: 'Doctor Doom Meets Franklin Richards',
    universeTag: 'EARTH-828 · BAXTER BUILDING',
    videoId: 'HZ3PlgafyMM',
    thumbnail: '/stingers/first-steps-doom.jpg',
    whatHappens:
      'Four years after defeating Galactus, Sue Storm steps away for a moment while reading to young Franklin Richards in the Baxter Building. Returning to the living room, she freezes: a hooded stranger draped in a dark emerald cloak kneels silently before her son, holding a gleaming silver metal mask in his hand.',
    doomsdayConnection:
      'The first official live-action appearance of Robert Downey Jr.’s Victor von Doom — establishing his immediate interest in Franklin Richards’s reality-warping cosmic power.',
    featuredCharacters: ['Doctor Doom', 'Sue Storm', 'Franklin Richards'],
  },
  {
    id: 'brand-new-day-space',
    order: 8,
    projectTitle: 'Spider-Man: Brand New Day',
    year: 2026,
    sceneType: 'Post-Credits',
    sceneTitle: 'Tracking Signal Beyond Earth',
    universeTag: 'EARTH-616 → DEEP SPACE',
    videoId: '10z5wTYndfg',
    thumbnail: '/stingers/brand-new-day-space.jpg',
    whatHappens:
      'Opening on Ned’s crowdsourced Spider-Man tracking map of New York, the camera pulls steadily upward past Manhattan, Earth’s atmosphere, and the Moon into deep cosmic space — before the interface glitches and locks onto a solitary pulsing Spider-Man signal out in the void.',
    doomsdayConnection:
      'Yanks Peter Parker’s grounded, street-level story straight into cosmic and multiversal stakes, hinting at dimensional anomalies pulling Spider-Man toward Doomsday and Secret Wars.',
    featuredCharacters: ['Spider-Man (Signal / Tease)'],
  },
  {
    id: 'endgame-encore-banner',
    order: 9,
    projectTitle: 'Avengers: Endgame Encore (2026 Re-Release)',
    year: 2026,
    sceneType: 'Encore Tag',
    sceneTitle: 'Doctor Doom Collects Bruce Banner / The Hulk',
    universeTag: 'EARTH-616 · GAMMA BUNKER',
    videoId: 'bpWiqw0MfRI',
    thumbnail: '/stingers/endgame-encore-banner.jpg',
    whatHappens:
      'Working alone inside an isolated underground bunker, a disheveled Bruce Banner records a video diary documenting gamma-suppression tests following his Hulk incident in Spider-Man: Brand New Day. Suddenly his systems glitch and Doctor Doom (Robert Downey Jr.) confronts him, stating he requires Banner’s services. Hulk briefly emerges to fight back — before the feed cuts to an empty bunker marked only by a glowing emerald rune.',
    doomsdayConnection:
      'Reveals that Doctor Doom isn’t waiting for the Avengers to find him — he is systematically hunting and collecting Earth-616’s most dangerous powerhouses (including Bruce Banner and Scarlet Witch) ahead of Avengers: Doomsday.',
    featuredCharacters: ['Bruce Banner / Hulk', 'Doctor Doom (RDJ)'],
  },
  {
    id: 'endgame-encore-doom',
    order: 10,
    projectTitle: 'Avengers: Endgame Encore (2026 Re-Release)',
    year: 2026,
    sceneType: 'Encore Tag',
    sceneTitle: 'Doom Forges His Mask & The TVA Ripples',
    universeTag: 'LATVERIA / TVA',
    videoId: 'IamE5VCCsZ8',
    thumbnail: '/stingers/endgame-encore-doom.jpg',
    whatHappens:
      'Attached exclusively to the 2026 theatrical Encore re-release of Avengers: Endgame, this epilogue bridges Tony Stark’s 2008 hammer-clanging farewell straight into Victor von Doom forging his own iron mask amidst fracturing TVA timeline monitors.',
    doomsdayConnection:
      'Connects the Time Heist anomalies of Endgame directly to the rise of Doctor Doom — echoing the metallic clanging that ended the Infinity Saga.',
    featuredCharacters: ['Doctor Doom', 'TVA Monitors'],
  },
  {
    id: 'visionquest-wanda-doom',
    order: 11,
    projectTitle: 'VisionQuest',
    year: 2026,
    sceneType: 'Post-Credits',
    sceneTitle: 'Doctor Doom Unearths Scarlet Witch at Wundagore',
    universeTag: 'EARTH-616 · MOUNT WUNDAGORE',
    videoId: '_sAgvAfisNM',
    thumbnail: '/stingers/visionquest-wanda-doom.jpg',
    whatHappens:
      'Omitted from early press screeners, VisionQuest’s finale jumps to the shattered stone ruins of Mount Wundagore where Wanda Maximoff seemingly died in Multiverse of Madness. A hooded Doctor Doom (Robert Downey Jr.) lifts the wreckage with emerald energy, unearthing the Scarlet Witch and commanding her to awaken.',
    doomsdayConnection:
      'The final direct domino before December 18 — officially adding VisionQuest as #16 on Disney+’s Countdown to Doomsday and pulling Chaos Magic (and Avengers: The Children’s Crusade!) directly into Doom’s plans.',
    featuredCharacters: ['Doctor Doom (RDJ)', 'Wanda Maximoff / Scarlet Witch'],
  },
];
