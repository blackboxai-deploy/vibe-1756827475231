interface RealGame {
  id: string;
  name: string;
  provider: string;
  category: string;
  type: string;
  rtp: number;
  minBetEUR: number;
  maxBetEUR: number;
  isLive: boolean;
  hasDemo: boolean;
  thumbnail: string;
  description: string;
  gameUrl: string;
  demoUrl?: string;
  popularity: number;
  volatility: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const REAL_GAMES_DATABASE: RealGame[] = [
  // Pragmatic Play Slots
  {
    id: 'sweet-bonanza',
    name: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    category: 'Slots',
    type: 'VIDEO_SLOT',
    rtp: 96.51,
    minBetEUR: 0.20,
    maxBetEUR: 100.00,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://placehold.co/400x300?text=Sweet+Bonanza+slot+with+colorful+candies+and+fruits',
    description: 'Sweet tumbling action with multipliers up to 21,100x your bet!',
    gameUrl: '/api/games/pragmatic/sweet-bonanza',
    demoUrl: '/api/games/pragmatic/sweet-bonanza?demo=true',
    popularity: 95,
    volatility: 'HIGH'
  },
  {
    id: 'gates-of-olympus',
    name: 'Gates of Olympus',
    provider: 'Pragmatic Play',
    category: 'Slots',
    type: 'VIDEO_SLOT',
    rtp: 96.50,
    minBetEUR: 0.20,
    maxBetEUR: 125.00,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0facd9c9-aea9-4dc9-8c82-3b2179080e40.png',
    description: 'Zeus rules the reels in this mythological adventure with massive multipliers!',
    gameUrl: '/api/games/pragmatic/gates-of-olympus',
    demoUrl: '/api/games/pragmatic/gates-of-olympus?demo=true',
    popularity: 92,
    volatility: 'HIGH'
  },
  {
    id: 'sugar-rush',
    name: 'Sugar Rush',
    provider: 'Pragmatic Play',
    category: 'Slots',
    type: 'VIDEO_SLOT',
    rtp: 96.50,
    minBetEUR: 0.20,
    maxBetEUR: 100.00,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://placehold.co/400x300?text=Sugar+Rush+candy+themed+slot+with+sweet+treats',
    description: 'Sweet wins await in this candy-filled adventure with tumbling reels!',
    gameUrl: '/api/games/pragmatic/sugar-rush',
    demoUrl: '/api/games/pragmatic/sugar-rush?demo=true',
    popularity: 88,
    volatility: 'HIGH'
  },
  {
    id: 'big-bass-bonanza',
    name: 'Big Bass Bonanza',
    provider: 'Pragmatic Play',
    category: 'Slots',
    type: 'VIDEO_SLOT',
    rtp: 96.71,
    minBetEUR: 0.10,
    maxBetEUR: 250.00,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5bc812f3-65e3-4074-88ea-8c76157ce87b.png',
    description: 'Go fishing for big wins with the angler and his prized bass!',
    gameUrl: '/api/games/pragmatic/big-bass-bonanza',
    demoUrl: '/api/games/pragmatic/big-bass-bonanza?demo=true',
    popularity: 90,
    volatility: 'HIGH'
  },

  // Evolution Gaming Live Casino
  {
    id: 'live-blackjack-classic',
    name: 'Live Blackjack Classic',
    provider: 'Evolution Gaming',
    category: 'Live Casino',
    type: 'LIVE_BLACKJACK',
    rtp: 99.28,
    minBetEUR: 1.00,
    maxBetEUR: 5000.00,
    isLive: true,
    hasDemo: false,
    thumbnail: 'https://placehold.co/400x300?text=Live+Blackjack+table+with+professional+dealer',
    description: 'Classic blackjack with professional live dealers and multiple betting options.',
    gameUrl: '/api/games/evolution/live-blackjack-classic',
    popularity: 85,
    volatility: 'MEDIUM'
  },
  {
    id: 'live-roulette-european',
    name: 'Live European Roulette',
    provider: 'Evolution Gaming',
    category: 'Live Casino',
    type: 'LIVE_ROULETTE',
    rtp: 97.30,
    minBetEUR: 0.50,
    maxBetEUR: 5000.00,
    isLive: true,
    hasDemo: false,
    thumbnail: 'https://placehold.co/400x300?text=Live+European+Roulette+wheel+with+elegant+casino+setting',
    description: 'European roulette with single zero and professional live dealers.',
    gameUrl: '/api/games/evolution/live-roulette-european',
    popularity: 89,
    volatility: 'MEDIUM'
  },
  {
    id: 'crazy-time',
    name: 'Crazy Time',
    provider: 'Evolution Gaming',
    category: 'Live Casino',
    type: 'LIVE_GAME_SHOW',
    rtp: 96.08,
    minBetEUR: 0.10,
    maxBetEUR: 2500.00,
    isLive: true,
    hasDemo: false,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4ba53224-595e-49de-b6e6-116c2cfd7f7d.png',
    description: 'The ultimate live game show with bonus rounds and massive multipliers!',
    gameUrl: '/api/games/evolution/crazy-time',
    popularity: 98,
    volatility: 'HIGH'
  },

  // NetEnt Slots
  {
    id: 'starburst',
    name: 'Starburst',
    provider: 'NetEnt',
    category: 'Slots',
    type: 'VIDEO_SLOT',
    rtp: 96.09,
    minBetEUR: 0.10,
    maxBetEUR: 100.00,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://placehold.co/400x300?text=Starburst+gem+themed+slot+with+colorful+jewels',
    description: 'The iconic gem-themed slot with expanding wilds and re-spins!',
    gameUrl: '/api/games/netent/starburst',
    demoUrl: '/api/games/netent/starburst?demo=true',
    popularity: 94,
    volatility: 'LOW'
  },
  {
    id: 'gonzo-quest',
    name: "Gonzo's Quest",
    provider: 'NetEnt',
    category: 'Slots',
    type: 'VIDEO_SLOT',
    rtp: 95.97,
    minBetEUR: 0.20,
    maxBetEUR: 50.00,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/16211b16-7847-4df0-9859-f83afd15bb3d.png',
    description: 'Join Gonzo on his quest for El Dorado with avalanche features!',
    gameUrl: '/api/games/netent/gonzo-quest',
    demoUrl: '/api/games/netent/gonzo-quest?demo=true',
    popularity: 91,
    volatility: 'MEDIUM'
  },
  {
    id: 'dead-or-alive-2',
    name: 'Dead or Alive 2',
    provider: 'NetEnt',
    category: 'Slots',
    type: 'VIDEO_SLOT',
    rtp: 96.82,
    minBetEUR: 0.09,
    maxBetEUR: 18.00,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/41f5c90b-3b6a-4079-a94f-aa3f30d88ce6.png',
    description: 'Wild West adventure with sticky wilds and massive win potential!',
    gameUrl: '/api/games/netent/dead-or-alive-2',
    demoUrl: '/api/games/netent/dead-or-alive-2?demo=true',
    popularity: 87,
    volatility: 'HIGH'
  },

  // Play'n GO Slots
  {
    id: 'book-of-dead',
    name: 'Book of Dead',
    provider: "Play'n GO",
    category: 'Slots',
    type: 'VIDEO_SLOT',
    rtp: 96.21,
    minBetEUR: 0.01,
    maxBetEUR: 100.00,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8e065b9a-ad60-41c8-8a88-033a53c9ae7a.png',
    description: 'Ancient Egyptian adventure with expanding symbols and free spins!',
    gameUrl: '/api/games/playngo/book-of-dead',
    demoUrl: '/api/games/playngo/book-of-dead?demo=true',
    popularity: 93,
    volatility: 'HIGH'
  },
  {
    id: 'reactoonz',
    name: 'Reactoonz',
    provider: "Play'n GO",
    category: 'Slots',
    type: 'VIDEO_SLOT',
    rtp: 96.51,
    minBetEUR: 0.20,
    maxBetEUR: 100.00,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7ce46912-9911-4abd-af0d-d7463252d374.png',
    description: 'Alien cluster pays slot with quantum features and cascading wins!',
    gameUrl: '/api/games/playngo/reactoonz',
    demoUrl: '/api/games/playngo/reactoonz?demo=true',
    popularity: 86,
    volatility: 'HIGH'
  }
];

export const getGamesByProvider = (provider: string): RealGame[] => {
  return REAL_GAMES_DATABASE.filter(game => game.provider === provider);
};

export const getGamesByCategory = (category: string): RealGame[] => {
  if (category === 'All Games') {
    return REAL_GAMES_DATABASE;
  }
  return REAL_GAMES_DATABASE.filter(game => game.category === category);
};

export const getPopularGames = (limit: number = 6): RealGame[] => {
  return REAL_GAMES_DATABASE
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getLiveGames = (): RealGame[] => {
  return REAL_GAMES_DATABASE.filter(game => game.isLive);
};

export const getGameById = (id: string): RealGame | undefined => {
  return REAL_GAMES_DATABASE.find(game => game.id === id);
};

export const GAME_PROVIDERS = [
  {
    id: 'pragmatic-play',
    name: 'Pragmatic Play',
    logo: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4531989f-5263-40d8-90ac-1a4fbc59da42.png',
    gameCount: REAL_GAMES_DATABASE.filter(g => g.provider === 'Pragmatic Play').length
  },
  {
    id: 'evolution-gaming',
    name: 'Evolution Gaming',
    logo: 'https://placehold.co/200x100?text=Evolution+Gaming',
    gameCount: REAL_GAMES_DATABASE.filter(g => g.provider === 'Evolution Gaming').length
  },
  {
    id: 'netent',
    name: 'NetEnt',
    logo: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/321b5c78-339a-46e7-b4bf-0c0bffa71d9d.png',
    gameCount: REAL_GAMES_DATABASE.filter(g => g.provider === 'NetEnt').length
  },
  {
    id: 'playngo',
    name: "Play'n GO",
    logo: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a3118aec-8728-4fc1-92a2-6e1128215cf1.png',
    gameCount: REAL_GAMES_DATABASE.filter(g => g.provider === "Play'n GO").length
  }
];

export const GAME_CATEGORIES = [
  'All Games',
  'Slots',
  'Live Casino',
  'Table Games',
  'Jackpots',
  'New Games'
];