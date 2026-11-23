import { CharacterProfile, ComicFact, GlossaryItem } from '../types';

export const CHARACTERS: CharacterProfile[] = [
  {
    id: 'doctor-doom',
    name: 'Victor von Doom',
    alias: 'Doctor Doom',
    actor: 'Robert Downey Jr.',
    faction: 'Doom & Latveria',
    originUniverse: 'Earth-828 / Latveria',
    debut: 'The Fantastic Four: First Steps (2025 post-credits) -> Avengers: Doomsday (2026)',
    powers: 'Genius rivaling Reed Richards, master of dark & arcane sorcery, titanium mystic armor, political immunity as absolute monarch of Latveria.',
    plainEnglishBio:
      'Marvel’s single greatest supervillain. Unlike Thanos (who wanted to erase half of life), Doom genuinely believes ONLY his iron-fisted perfection can save the dying Multiverse. Marvel confirmed RDJ plays the real Victor von Doom — NOT an evil Iron Man variant — though sharing Tony Stark’s face will shatter the Avengers’ composure.',
    statusBeforeDoomsday: 'Last seen kneeling silently in front of Reed & Sue’s reality-warping young son Franklin Richards at the end of First Steps.',
    doomsdayRole: 'The central protagonist-antagonist force of Avengers: Doomsday — orchestrating his move as realities collide.',
    essentialAppearances: ['The Fantastic Four: First Steps', 'Avengers: Doomsday', 'Avengers: Secret Wars'],
    accent: '#10b981',
  },
  {
    id: 'steve-rogers',
    name: 'Steve Rogers',
    alias: 'The First Avenger',
    actor: 'Chris Evans',
    faction: 'Avengers & New Avengers',
    originUniverse: 'Earth-616 (1940s / Branched Past)',
    debut: 'Captain America: The First Avenger (2011)',
    powers: 'Peak human strength, speed, stamina, master tactician, unshakable moral compass, and worthiness to lift Thor’s hammer Mjolnir.',
    plainEnglishBio:
      'A skinny 1940s kid enhanced by Super Soldier Serum who led the Avengers through every Infinity Saga war before traveling back in time at the end of Endgame to grow old with Peggy Carter.',
    statusBeforeDoomsday: 'Passed his shield to Sam Wilson at the end of Endgame — yet Chris Evans is officially confirmed returning as Steve Rogers in Avengers: Doomsday!',
    doomsdayRole: 'His unexplained time-travel return to the past may be directly tied to the multiversal fractures — and seeing RDJ’s face behind Doctor Doom’s mask hits Steve hardest of all.',
    essentialAppearances: ['Captain America: The First Avenger', 'The Avengers', 'Civil War', 'Avengers: Endgame'],
    accent: '#3b82f6',
  },
  {
    id: 'sam-wilson',
    name: 'Sam Wilson',
    alias: 'Captain America',
    actor: 'Anthony Mackie',
    faction: 'Avengers & New Avengers',
    originUniverse: 'Earth-616',
    debut: 'Captain America: The Winter Soldier (2014)',
    powers: 'Wakandan Vibranium winged exo-suit, Captain America’s indestructible Vibranium shield, Redwing combat drones, elite Air Force Pararescue training — ZERO super-soldier serum.',
    plainEnglishBio:
      'Steve Rogers’s loyal partner who earned the shield through pure courage and empathy rather than super-serum. After stopping Red Hulk in Brave New World, Sam took on the monumental task of officially rebuilding the Avengers.',
    statusBeforeDoomsday: 'Leading the official Avengers initiative while clashing legally and tactically with Valentina’s "New Avengers" (Thunderbolts*).',
    doomsdayRole: 'Earth-616’s field commander trying to unify fractured hero teams before Incursions erase their planet.',
    essentialAppearances: ['The Winter Soldier', 'Avengers: Endgame', 'Brave New World'],
    accent: '#2563eb',
  },
  {
    id: 'loki-god',
    name: 'Loki Laufeyson',
    alias: 'God of Stories',
    actor: 'Tom Hiddleston',
    faction: 'Cosmic & Multiverse',
    originUniverse: '2012 Branched Timeline -> End of Time',
    debut: 'Thor (2011) -> Loki (2021–2023)',
    powers: 'Asgardian/Frost Giant durability, illusion sorcery, time-slipping, and currently channels cosmic energy to physically hold every timeline in the Multiverse alive.',
    plainEnglishBio:
      'Once the mischievous villain who invaded New York in 2012, an escaped time-variant Loki evolved through two seasons of the Loki series into the MCU’s most selfless guardian — sacrificing his freedom to sit alone on a cosmic throne weaving the dying timelines into a living emerald tree.',
    statusBeforeDoomsday: 'Sitting silently on his throne at the End of Time holding the Multiverse together.',
    doomsdayRole: 'The ultimate cosmic linchpin — if Doctor Doom seeks dominion over all realities (and to reunite Loki with Thor!), everything leads to Loki’s throne.',
    essentialAppearances: ['The Avengers', 'Thor: Ragnarok', 'Loki Seasons 1 & 2'],
    accent: '#10b981',
  },
  {
    id: 'reed-richards',
    name: 'Reed Richards',
    alias: 'Mister Fantastic',
    actor: 'Pedro Pascal',
    faction: 'Fantastic Four',
    originUniverse: 'Earth-828',
    debut: 'The Fantastic Four: First Steps (2025)',
    powers: 'The smartest man alive in physics & dimensional engineering, plus cosmic-ray elasticity allowing him to stretch his body into any shape.',
    plainEnglishBio:
      'Patriarch of Marvel’s First Family and leader of the Fantastic Four from retro-futuristic Earth-828. Driven by deep love for his wife Sue and their extraordinary son Franklin — and historically Victor von Doom’s bitterest intellectual rival.',
    statusBeforeDoomsday: 'Saved Earth-828 from Galactus — and his family’s extradimensional rocket just pierced Earth-616’s sky in Thunderbolts*!',
    doomsdayRole: 'The scientific mind who understands Incursions best and shares the deepest personal rivalry with Doctor Doom.',
    essentialAppearances: ['The Fantastic Four: First Steps', 'Thunderbolts* (post-credits)'],
    accent: '#38bdf8',
  },
  {
    id: 'sue-storm',
    name: 'Sue Storm',
    alias: 'Invisible Woman',
    actor: 'Vanessa Kirby',
    faction: 'Fantastic Four',
    originUniverse: 'Earth-828',
    debut: 'The Fantastic Four: First Steps (2025)',
    powers: 'Invisibility and near-impenetrable psionic force fields capable of shielding cities or containing cosmic blasts — arguably the most powerful member of the Fantastic Four.',
    plainEnglishBio:
      'Heart, strategist, and fierce protector of the Fantastic Four and her young son Franklin Richards. In the comics, Sue’s role opposite Doom and Reed during Secret Wars is emotionally earth-shattering.',
    statusBeforeDoomsday: 'Last seen discovering Doctor Doom silently kneeling before her son Franklin in the Baxter Building.',
    doomsdayRole: 'Fierce defender of Franklin and emotional anchor of the Fantastic Four as they cross into Earth-616.',
    essentialAppearances: ['The Fantastic Four: First Steps'],
    accent: '#0ea5e9',
  },
  {
    id: 'yelena-belova',
    name: 'Yelena Belova',
    alias: 'Black Widow / New Avengers Leader',
    actor: 'Florence Pugh',
    faction: 'Avengers & New Avengers',
    originUniverse: 'Earth-616',
    debut: 'Black Widow (2021)',
    powers: 'Master Red Room assassin, hand-to-hand tactician, Widow’s Bite electro-batons, razor-sharp wit, and fierce emotional empathy.',
    plainEnglishBio:
      'Natasha Romanoff’s adoptive sister who inherited the Black Widow mantle with biting humor and bruised vulnerability. After rescuing Sentry from his inner darkness, she stepped up as the heart of the Thunderbolts* / New Avengers.',
    statusBeforeDoomsday: 'Based inside the old Avengers Tower (now Watchtower) leading the New Avengers alongside Bucky, Red Guardian, Ghost, U.S. Agent, and Bob/Sentry.',
    doomsdayRole: 'First responder on Earth-616 when the Fantastic Four’s ship enters orbit — representing the scrappy underdog team.',
    essentialAppearances: ['Black Widow', 'Hawkeye', 'Thunderbolts*'],
    accent: '#eab308',
  },
  {
    id: 'thor',
    name: 'Thor Odinson',
    alias: 'God of Thunder',
    actor: 'Chris Hemsworth',
    faction: 'Cosmic & Multiverse',
    originUniverse: 'Earth-616 (Asgard)',
    debut: 'Thor (2011)',
    powers: 'Asgardian god of lightning, near-invulnerability, wields both enchanted axe Stormbreaker (which summons the Bifrost) and reforged hammer Mjolnir.',
    plainEnglishBio:
      'The lone original Avenger still actively adventuring across the cosmos. Having survived losing his parents, brother Loki, planet Asgard, and Jane Foster, Thor now travels space raising his adopted cosmic daughter, Love.',
    statusBeforeDoomsday: 'Roaming the cosmos with Love, completely unaware that a redeemed variant of his brother Loki is alive holding the entire Multiverse together!',
    doomsdayRole: 'Heavy-hitting cosmic vanguard — and his emotional reunion with God-of-Stories Loki is one of the most anticipated moments in Doomsday.',
    essentialAppearances: ['The Avengers', 'Thor: Ragnarok', 'Avengers: Infinity War', 'Avengers: Endgame'],
    accent: '#60a5fa',
  },
  {
    id: 'professor-x',
    name: 'Charles Xavier',
    alias: 'Professor X',
    actor: 'Patrick Stewart',
    faction: 'X-Men & Mutants',
    originUniverse: 'Earth-10005 (Fox X-Men)',
    debut: 'X-Men (2000)',
    powers: 'World’s most powerful telepath — reads minds, projects psychic illusions, freezes crowds, and locates every mutant globally via Cerebro.',
    plainEnglishBio:
      'Founder of Xavier’s School for Gifted Youngsters and tireless advocate for peaceful human-mutant coexistence. His philosophical chess match with Magneto defined two decades of Fox’s X-Men saga.',
    statusBeforeDoomsday: 'Referenced by Beast in The Marvels post-credits ("Charles wants an update") and officially confirmed returning in Avengers: Doomsday!',
    doomsdayRole: 'Moral leader of the Fox X-Men faction facing an impossible choice if Earth-10005 collides with Earth-616.',
    essentialAppearances: ['X-Men (2000)', 'X2: X-Men United', 'Days of Future Past', 'Logan'],
    accent: '#38bdf8',
  },
  {
    id: 'magneto',
    name: 'Erik Lehnsherr',
    alias: 'Magneto',
    actor: 'Ian McKellen',
    faction: 'X-Men & Mutants',
    originUniverse: 'Earth-10005 (Fox X-Men)',
    debut: 'X-Men (2000)',
    powers: 'Omega-level master of magnetism — bends bridges, lifts stadiums, flies via magnetic fields, and can shred metal armor (like Doctor Doom’s!) effortlessly.',
    plainEnglishBio:
      'Holocaust survivor and Charles Xavier’s lifelong friend-turned-ideological rival who believes mutants must protect themselves by any means necessary. One of cinema’s most compelling tragic antagonists.',
    statusBeforeDoomsday: 'Officially confirmed returning alongside Patrick Stewart, James Marsden (Cyclops), Alan Cumming (Nightcrawler), Kelsey Grammer (Beast), and Rebecca Romijn (Mystique)!',
    doomsdayRole: 'Wild-card mutant titan willing to cross moral lines to protect mutantkind when worlds collide.',
    essentialAppearances: ['X-Men (2000)', 'X2: X-Men United', 'First Class', 'Days of Future Past'],
    accent: '#a855f7',
  },
  {
    id: 'shuri',
    name: 'Shuri',
    alias: 'Black Panther',
    actor: 'Letitia Wright',
    faction: 'Wakanda & Global Powers',
    originUniverse: 'Earth-616 (Wakanda)',
    debut: 'Black Panther (2018)',
    powers: 'Super-genius Vibranium engineer, enhanced strength/agility from her synthetic Heart-Shaped Herb, kinetic-absorbing Panther habit and Vibranium gauntlets.',
    plainEnglishBio:
      'Former Princess and tech prodigy of Wakanda who overcame crushing grief after losing her brother T’Challa and mother Ramonda to take up the Black Panther mantle and defend her nation alongside King M’Baku.',
    statusBeforeDoomsday: 'Protector of Wakanda in an uneasy peace with Namor’s underwater kingdom of Talokan.',
    doomsdayRole: 'Confirmed Avengers: Doomsday powerhouse bringing Wakanda’s unmatched science and army — and intellectual parity alongside Reed Richards and Bruce Banner.',
    essentialAppearances: ['Black Panther', 'Avengers: Infinity War', 'Black Panther: Wakanda Forever'],
    accent: '#8b5cf6',
  },
  {
    id: 'shang-chi',
    name: 'Xu Shang-Chi',
    alias: 'Master of the Ten Rings',
    actor: 'Simu Liu',
    faction: 'Avengers & New Avengers',
    originUniverse: 'Earth-616',
    debut: 'Shang-Chi and the Legend of the Ten Rings (2021)',
    powers: 'Grandmaster of martial arts wielding the Ten Rings — indestructible ancient cosmic armbands that fire concussive blasts, form shields, and extend reach.',
    plainEnglishBio:
      'Raised as an assassin by his immortal father Wenwu, Shang-Chi walked away to live an ordinary life in San Francisco before mastering his mother’s mystical fighting style to defeat an ancient dimensional demon and inherit the Ten Rings.',
    statusBeforeDoomsday: 'Inducted into the Avengers’ inner circle by Wong, Bruce Banner, and Captain Marvel while investigating the Ten Rings’ mysterious cosmic signal.',
    doomsdayRole: 'Confirmed core hero in Avengers: Doomsday — and the mystery of who built the Ten Rings could tie directly to the Multiverse crisis.',
    essentialAppearances: ['Shang-Chi and the Legend of the Ten Rings'],
    accent: '#f59e0b',
  },
];

export const COMIC_FACTS: ComicFact[] = [
  {
    id: 'battleworld-god-emperor-doom',
    title: 'God Emperor Doom & Battleworld',
    comicSource: 'Secret Wars #1–9 (Jonathan Hickman, 2015)',
    year: '2015',
    likelihood: 'Virtually Confirmed',
    category: 'Secret Wars & Battleworld',
    whatHappensInComics:
      'When the final Incursion wipes out the entire Multiverse — including Earth-616 and the Ultimate Universe — Doctor Doom refuses to let everything die. Stealing omnipotent cosmic power from the Beyonders, Doom stitches shattered fragments of dead universes into a single patchwork planet called BATTLEWORLD and rules it as "God Emperor Doom," with Doctor Strange serving as his Sheriff and Sue Storm (whose memories were rewritten) as his Queen!',
    mcuCluesSoFar:
      'The Void in Loki and Deadpool & Wolverine already functions as a visual prototype of Battleworld — a wasteland stitched together from dead Fox and MCU realities.',
    howItCouldAdapt:
      'Avengers: Doomsday is heavily expected to end like Infinity War — with the Multiverse collapsing and Doctor Doom seizing power to forge Battleworld as the main setting of Avengers: Secret Wars (2027)!',
  },
  {
    id: 'doom-true-origin',
    title: 'Victor von Doom’s Tragic Origin: Science, Sorcery & Mephisto',
    comicSource: 'Books of Doom (2005) & Doctor Strange / Doctor Doom: Triumph and Torment (1989)',
    year: '1989 / 2005',
    likelihood: 'Strong Teases in MCU',
    category: 'Doctor Doom',
    whatHappensInComics:
      'Born to persecuted Romani healers in the Eastern European nation of Latveria, Victor’s mother Cynthia lost her soul to the demon Mephisto. Obsessed with rescuing her soul from Hell, Victor mastered BOTH physics (rivaling Reed Richards in college) AND dark sorcery. After an experiment exploded and scarred his face, he blamed Reed, forged his armor in Tibet, overthrew Latveria’s tyrant to become a beloved yet ruthless king, and once even teamed up with Doctor Strange to descend into Hell and free his mother’s soul.',
    mcuCluesSoFar:
      'Kevin Feige explicitly emphasized RDJ is playing the authentic Victor von Doom — brilliant scientist, sorcerer, and monarch of Latveria (whose empty UN seat appeared in Fantastic Four: First Steps!).',
    howItCouldAdapt:
      'Expect Doom’s MCU motivations to feel surprisingly noble and tragic — driven by grief, wounded pride, and the conviction that only he has the will to save reality.',
  },
  {
    id: 'franklin-richards-architect',
    title: 'Franklin Richards: The Child Who Rebuilds the Multiverse',
    comicSource: 'Fantastic Four & Secret Wars #9 (2015)',
    year: '2015',
    likelihood: 'Virtually Confirmed',
    category: 'Secret Wars & Battleworld',
    whatHappensInComics:
      'Reed Richards and Sue Storm’s son Franklin is an Omega-level reality warper so unimaginably powerful that he creates pocket universes under his bedsheets as a kid — and at the end of Secret Wars (2015), Franklin and Reed literally dream the entire Marvel Multiverse back into existence!',
    mcuCluesSoFar:
      'First Steps centered its entire climax around Galactus wanting baby Franklin’s cosmic power — AND the post-credits literally ended with Doctor Doom approaching young Franklin!',
    howItCouldAdapt:
      'Instead of using the obscure comic character Molecule Man as the power battery for Battleworld, Marvel appears poised to have Doctor Doom abduct or manipulate Franklin Richards’s cosmic power to reshape reality!',
  },
  {
    id: 'time-runs-out-moral-dilemma',
    title: 'Time Runs Out: Destroying Another Earth to Save Your Own',
    comicSource: 'New Avengers Vol. 3 (Jonathan Hickman, 2013–2015)',
    year: '2013–2015',
    likelihood: 'Virtually Confirmed',
    category: 'Secret Wars & Battleworld',
    whatHappensInComics:
      'When an Incursion hits, two parallel Earths appear in each other’s sky for eight hours. There is only one horrific escape hatch: if you blow up the OTHER Earth before they collide, both universes survive (minus one planet). The secret Illuminati build planet-killing bombs while Captain America refuses to cross that moral line — fracturing the Avengers into civil war right before the end of everything.',
    mcuCluesSoFar:
      'Incursions were formally introduced in Multiverse of Madness, and Avengers: Doomsday brings Earth-616 (Avengers), Earth-828 (F4), and Earth-10005 (X-Men) into direct collision.',
    howItCouldAdapt:
      'Imagine the heartbreak when heroes we love — the Avengers, Fantastic Four, and Fox X-Men — realize saving their own universe might mean fighting each other!',
  },
  {
    id: 'doom-vs-thanos-spine',
    title: 'God Emperor Doom’s Most Infamous Moment vs. Thanos',
    comicSource: 'Secret Wars #8 (2015)',
    year: '2015',
    likelihood: 'Strong Teases in MCU',
    category: 'Doctor Doom',
    whatHappensInComics:
      'On Battleworld, an arrogant Thanos confronts God Emperor Doom, mocking his claim to godhood ("That appears... untrue"). Without raising his voice, Doom reaches straight through Thanos’s chest and effortlessly rips out his entire skeleton — instantly establishing Doom as a threat on a completely different tier than Thanos.',
    mcuCluesSoFar:
      'Marvel Studios loves iconic "power-scaling" moments (like Thanos beating Hulk bare-handed in Infinity War’s opening 5 minutes).',
    howItCouldAdapt:
      'Whether against a multiversal Thanos variant, Kang’s council, or even Sentry, expect Doom to get a jaw-dropping entrance that proves he dwarfs every past MCU villain.',
  },
  {
    id: 'post-secret-wars-mutant-era',
    title: 'The Soft Reboot: One Unified Earth for Avengers, F4 & X-Men',
    comicSource: 'Secret Wars (2015) -> All-New, All-Different Marvel',
    year: '2015',
    likelihood: 'Virtually Confirmed',
    category: 'Mutants & X-Men',
    whatHappensInComics:
      'After Battleworld ends and the Multiverse is restored, characters who used to live in separate universes (like Miles Morales from the Ultimate Universe) wake up seamlessly folded into Earth-616 as if they had always been there.',
    mcuCluesSoFar:
      'Kevin Feige has openly teased that the "Mutant Era" follows the Multiverse Saga, and right now the Fantastic Four (Earth-828) and Fox X-Men (Earth-10005) live in different dimensions from the Avengers (Earth-616).',
    howItCouldAdapt:
      'Secret Wars (2027) is the cleanest storytelling mechanism to merge the Fantastic Four, a newly cast MCU X-Men generation, and the Avengers onto ONE unified Earth-616 — launching the Mutant Saga!',
  },
  {
    id: 'krakoa-and-avx',
    title: 'House of X / Krakoa & Avengers vs. X-Men',
    comicSource: 'Avengers vs. X-Men (2012) & House of X / Powers of X (2019)',
    year: '2012 / 2019',
    likelihood: 'Future Saga Setup',
    category: 'Mutants & X-Men',
    whatHappensInComics:
      'In modern X-Men comics, mutants stop hiding in a school and unite — heroes and former villains like Magneto and Apocalypse alike — to found a sovereign living island nation called Krakoa, complete with mutant resurrection and miracle medicines that shift global politics overnight.',
    mcuCluesSoFar:
      'X-Men ’97 reminded audiences how epic mutant geopolitics are, and Adamantium’s discovery on Celestial Island in Brave New World sets up international tensions over mutant-linked tech.',
    howItCouldAdapt:
      'To distinguish MCU X-Men from the 2000s Fox school movies, Marvel Studios could fast-track Krakoa or an Avengers vs. X-Men conflict in Phase 7–9.',
  },
  {
    id: 'doombots-and-true-cross',
    title: 'Doombots, Time Platforms & Secret Magic Armor',
    comicSource: 'Fantastic Four #5 (1962) & Classic Marvel Lore',
    year: '1962–Present',
    likelihood: 'Strong Teases in MCU',
    category: 'Doctor Doom',
    whatHappensInComics:
      'Whenever heroes think they’ve defeated or outsmarted Doctor Doom, it frequently turns out to be a "Doombot" — an lifelike robotic decoy programmed to think it IS the real Doom! Doom also invented the first functional Time Platform (before Kang!) and lined his armor with a splinter of wood from the True Cross to ward off vampires and demons.',
    mcuCluesSoFar:
      'The MCU’s fusion of Stark-level robotics (Ironheart, Ultron) and Kamar-Taj sorcery makes Doom’s science-plus-magic kit feel completely organic.',
    howItCouldAdapt:
      'Watch out for a shocking mid-movie twist in Avengers: Doomsday where a hero unmasking or defeating Doom discovers sparks flying from a Doombot!',
  },
  {
    id: 'young-avengers-champions',
    title: 'Young Avengers / Champions & The Children’s Crusade',
    comicSource: 'Young Avengers (2005) & Avengers: The Children’s Crusade (2010)',
    year: '2005 / 2010',
    likelihood: 'Strong Teases in MCU',
    category: 'Cosmic & Next Gen',
    whatHappensInComics:
      'In The Children’s Crusade, Wanda Maximoff’s reincarnated teenage sons Billy (Wiccan) and Tommy (Speed) lead the Young Avengers to Latveria — where an amnesiac Wanda is literally engaged to marry Doctor Doom!',
    mcuCluesSoFar:
      'Every piece is already on the MCU board: Kamala Khan recruited Kate Bishop (The Marvels), Billy Maximoff returned in Agatha All Along (searching for Tommy), plus Cassie Lang, Riri Williams, and America Chavez!',
    howItCouldAdapt:
      'If Wanda Maximoff survived Mount Wundagore with amnesia, adapting a slice of The Children’s Crusade could bring Scarlet Witch right into Doctor Doom’s orbit!',
  },
  {
    id: 'midnight-sons-supernatural',
    title: 'Midnight Sons & The Supernatural Corner',
    comicSource: 'Rise of the Midnight Sons (1992)',
    year: '1992',
    likelihood: 'Future Saga Setup',
    category: 'Cosmic & Next Gen',
    whatHappensInComics:
      'When demonic threats like Lilith, Chthon (author of the Darkhold), or Mephisto threaten Earth, Marvel’s horror-tinged anti-heroes — Blade, Ghost Rider, Moon Knight, Werewolf by Night, Elsa Bloodstone, Man-Thing, and Doctor Strange — form the Midnight Sons.',
    mcuCluesSoFar:
      'Moon Knight, Werewolf by Night, Man-Thing, Elsa Bloodstone, Agatha, Black Knight, and Mahershala Ali’s Blade voice cameo have all been seeded across Phase 4 & 5.',
    howItCouldAdapt:
      'Provides a dark, atmospheric supernatural ensemble alongside the Cosmic and Mutant corners once the Multiverse Saga wraps up.',
  },
];

export const BEGINNER_GLOSSARY: GlossaryItem[] = [
  {
    term: 'Earth-616 ("The Sacred Timeline")',
    category: 'Universe',
    shortDef: 'The official catalog number of the main Marvel Cinematic Universe where almost all Avengers movies take place.',
    example: 'Iron Man, Endgame, Shang-Chi, and Thunderbolts* all happen on Earth-616.',
  },
  {
    term: 'Earth-10005 (The Fox Universe)',
    category: 'Universe',
    shortDef: 'The parallel universe home to 20th Century Fox’s X-Men, Wolverine, and Deadpool films.',
    example: 'Deadpool & Wolverine canonized Earth-10005 inside the MCU Multiverse.',
  },
  {
    term: 'Earth-828 (Fantastic Four World)',
    category: 'Universe',
    shortDef: 'The gleaming, retro-futuristic 1960s-inspired alternate universe home to Marvel’s Fantastic Four (named for co-creator Jack Kirby’s August 28 birthday).',
    example: 'The Fantastic Four: First Steps takes place on Earth-828 before their ship arrives on Earth-616.',
  },
  {
    term: 'The Snap / The Blip',
    category: 'Events',
    shortDef: 'In 2018 (Infinity War), Thanos snapped away 50% of all life. Five years later in 2023 (Endgame), Hulk snapped everyone back at the exact age they vanished.',
    example: 'If your younger sister didn’t get dusted and you did, she is now 5 years older than you!',
  },
  {
    term: 'Incursion',
    category: 'Multiverse',
    shortDef: 'A cosmic catastrophe where the boundary between two universes collapses, causing them to slam together and destroy one or both realities.',
    example: 'Incursions are the ticking-clock apocalypse driving Avengers: Doomsday.',
  },
  {
    term: 'TVA (Time Variance Authority)',
    category: 'Factions',
    shortDef: 'A retro-office bureaucracy existing outside space and time that monitors the Multiverse (formerly pruning branches, now protecting them under Loki).',
    example: 'Introduced in Loki and featured heavily in Deadpool & Wolverine.',
  },
  {
    term: 'Variant',
    category: 'Multiverse',
    shortDef: 'An alternate-reality version of an existing person who made different life choices or looks completely different.',
    example: 'Tobey Maguire, Andrew Garfield, and Tom Holland are all Spider-Man variants.',
  },
  {
    term: 'Anchor Being',
    category: 'Multiverse',
    shortDef: 'A singular, vital soul whose existence stabilizes their universe. If they die, that reality slowly unravels over time.',
    example: 'Hugh Jackman’s Wolverine in Logan was the Anchor Being of Fox’s Earth-10005.',
  },
  {
    term: 'Vibranium vs. Adamantium',
    category: 'Artifacts',
    shortDef: 'Vibranium (from Wakanda) absorbs kinetic energy and powers Cap’s shield & Black Panther’s suit. Adamantium (mined from Celestial Island in Brave New World) is even harder and indestructible — famous for coating Wolverine’s claws!',
    example: 'Both super-metals now exist inside Earth-616.',
  },
  {
    term: 'Mutant (X-Gene)',
    category: 'Factions',
    shortDef: 'Unlike heroes who got powers from lab accidents (Spider-Man, Hulk) or tech (Iron Man), Mutants are BORN with a genetic mutation called the X-Gene that activates powers around puberty.',
    example: 'Wolverine, Professor X, Magneto, Namor, and Kamala Khan (Ms. Marvel) are mutants.',
  },
  {
    term: 'Latveria',
    category: 'Factions',
    shortDef: 'A fiercely isolated, high-tech yet medieval-looking Eastern European nation ruled with absolute authority by Victor von Doom.',
    example: 'Its empty seat appeared at the UN Future Foundation summit in First Steps.',
  },
  {
    term: 'Post-Credits Scene ("Stinger")',
    category: 'Events',
    shortDef: 'Short bonus scenes played halfway through or at the very end of the credits that tease future movies, villains, or comedic payoffs.',
    example: 'Never leave a Marvel theater until the lights come all the way up!',
  },
];
