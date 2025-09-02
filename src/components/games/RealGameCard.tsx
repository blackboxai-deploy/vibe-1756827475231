"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RealGame {
  id: string;
  name: string;
  provider: string;
  rtp: number;
  minBetEUR: number;
  maxBetEUR: number;
  isLive: boolean;
  hasDemo: boolean;
  thumbnail: string;
  description: string;
  popularity: number;
}

interface RealGameCardProps {
  game: RealGame;
  onPlay: (game: RealGame) => void;
  onDemo?: (game: RealGame) => void;
}

export default function RealGameCard({ game, onPlay, onDemo }: RealGameCardProps) {
  const formatEUR = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="group relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
      {/* Game Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={game.thumbnail}
          alt={game.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => onPlay(game)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform scale-110"
            >
              Play Real
            </Button>
            {game.hasDemo && onDemo && (
              <Button
                onClick={() => onDemo(game)}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Try Demo
              </Button>
            )}
          </div>
        </div>

        {/* Live Badge */}
        {game.isLive && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-red-600 text-white animate-pulse">
              🔴 LIVE
            </Badge>
          </div>
        )}

        {/* Provider Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/50 text-white text-xs">
            {game.provider}
          </Badge>
        </div>

        {/* Popularity Score */}
        <div className="absolute bottom-3 right-3">
          <Badge 
            variant="secondary" 
            className="bg-yellow-600/80 text-white text-xs"
          >
            ⭐ {game.popularity}
          </Badge>
        </div>
      </div>

      {/* Game Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white text-lg group-hover:text-purple-400 transition-colors line-clamp-1">
            {game.name}
          </h3>
          <div className="flex items-center space-x-1 text-yellow-400">
            <span className="text-xs">RTP</span>
            <span className="text-sm font-semibold">{game.rtp}%</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        {/* Game Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <span>Min:</span>
            <span className="text-green-400 font-medium">{formatEUR(game.minBetEUR)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Max:</span>
            <span className="text-purple-400 font-medium">{formatEUR(game.maxBetEUR)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={() => onPlay(game)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm"
          >
            Play Real
          </Button>
          {game.hasDemo && onDemo && (
            <Button
              onClick={() => onDemo(game)}
              variant="outline"
              className="px-3 text-sm"
            >
              Demo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}