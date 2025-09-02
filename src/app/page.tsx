"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import DepositModal from '@/components/payments/DepositModal';
import RealGameCard from '@/components/games/RealGameCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Real games data
const REAL_GAMES = [
  {
    id: 'sweet-bonanza',
    name: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    rtp: 96.51,
    minBetEUR: 0.20,
    maxBetEUR: 125,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    description: 'A vibrant 6×5, pays anywhere videoslot including candy and fruit symbols',
    popularity: 95
  },
  {
    id: 'live-blackjack',
    name: 'Live Blackjack',
    provider: 'Evolution Gaming',
    rtp: 99.29,
    minBetEUR: 1,
    maxBetEUR: 10000,
    isLive: true,
    hasDemo: false,
    thumbnail: 'https://images.unsplash.com/photo-1613989923662-0775ad80a885?w=400&h=300&fit=crop',
    description: 'Professional live dealers, multiple tables available 24/7',
    popularity: 87
  },
  {
    id: 'starburst',
    name: 'Starburst',
    provider: 'NetEnt',
    rtp: 96.09,
    minBetEUR: 0.10,
    maxBetEUR: 100,
    isLive: false,
    hasDemo: true,
    thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop',
    description: 'The iconic gem-themed slot with expanding wilds',
    popularity: 90
  },
  {
    id: 'crazy-time',
    name: 'Crazy Time',
    provider: 'Evolution Gaming',
    rtp: 96.08,
    minBetEUR: 0.10,
    maxBetEUR: 2500,
    isLive: true,
    hasDemo: false,
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    description: 'The ultimate live game show with multipliers and bonus rounds',
    popularity: 94
  }
];

export default function CasinoHomePage() {
  const { user, logout } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showDepositModal, setShowDepositModal] = useState(false);
  
  const isAuthenticated = !!user;

  const formatEUR = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handlePlayGame = (game: any) => {
    if (!isAuthenticated) {
      alert('Please sign in to play real money games!');
      return;
    }
    
    alert(`Opening ${game.name}! (Demo)`);
  };

  const handleDemoGame = (game: any) => {
    alert(`Opening ${game.name} demo version!`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              EuroCasino
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Real casino games • Crypto deposits • EUR balance • Instant withdrawals
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-green-600 text-white px-4 py-2">✅ Licensed Games</Badge>
              <Badge className="bg-blue-600 text-white px-4 py-2">🏦 EUR Balance</Badge>
              <Badge className="bg-purple-600 text-white px-4 py-2">₿ Crypto Deposits</Badge>
              <Badge className="bg-yellow-600 text-white px-4 py-2">⚡ Instant Payouts</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Auth Form */}
            <div>
              {authMode === 'login' ? (
                <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
              ) : (
                <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
              )}
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">🎮 Real Casino Games</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Live dealers from Evolution Gaming</li>
                  <li>• Premium slots from Pragmatic Play & NetEnt</li>
                  <li>• Progressive jackpots worth millions</li>
                  <li>• 500+ games from top providers</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">💰 Crypto & Fiat Hybrid</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Deposit: BTC, ETH, USDC, USDT, MATIC, BNB</li>
                  <li>• Balance: Always displayed in EUR (€)</li>
                  <li>• Withdraw: Convert EUR back to crypto</li>
                  <li>• Real-time exchange rates</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">🔒 Secure & Licensed</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Email/password authentication</li>
                  <li>• KYC verification for compliance</li>
                  <li>• Licensed game providers only</li>
                  <li>• Responsible gambling tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                EuroCasino
              </h1>
              <Badge variant="secondary" className="bg-green-600 text-white">
                Real Money
              </Badge>
            </div>

            <div className="flex items-center space-x-6">
              {/* Balance Display */}
              <div className="bg-gray-800 rounded-lg px-4 py-2">
                <div className="text-sm text-gray-400">Balance</div>
                <div className="text-xl font-bold text-white">
                  {formatEUR(user?.balanceEUR || 0)}
                </div>
              </div>

              {/* VIP Level */}
              <Badge 
                variant="secondary" 
                style={{ backgroundColor: user?.vipLevel.color + '20', color: user?.vipLevel.color }}
                className="border-0 px-3 py-1"
              >
                {user?.vipLevel.name}
              </Badge>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowDepositModal(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  💰 Deposit
                </Button>
                <Button variant="outline">
                  🏦 Withdraw
                </Button>
                <Button variant="ghost" onClick={logout} className="text-gray-400">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome back, {user?.firstName}! 👋
              </h2>
              <p className="text-gray-300">
                Ready to play some real casino games?
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {formatEUR(user?.totalWonEUR || 0)}
                </div>
                <div className="text-sm text-gray-400">Total Won</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {formatEUR(user?.totalWageredEUR || 0)}
                </div>
                <div className="text-sm text-gray-400">Total Wagered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: user?.vipLevel.color }}>
                  {(user?.vipLevel.cashbackRate || 0) * 100}%
                </div>
                <div className="text-sm text-gray-400">Cashback Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Games Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2">🎮</span>
              Real Casino Games
              <Badge variant="secondary" className="ml-2">
                {REAL_GAMES.length} games
              </Badge>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REAL_GAMES.map((game) => (
              <RealGameCard 
                key={game.id} 
                game={game} 
                onPlay={handlePlayGame}
                onDemo={game.hasDemo ? handleDemoGame : undefined}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Deposit Modal */}
      <DepositModal 
        isOpen={showDepositModal} 
        onClose={() => setShowDepositModal(false)} 
      />
    </div>
  );
}