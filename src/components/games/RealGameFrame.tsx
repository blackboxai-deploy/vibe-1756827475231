"use client";

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

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

interface RealGameFrameProps {
  game: RealGame;
  open: boolean;
  onClose: () => void;
  demoMode?: boolean;
}

export default function RealGameFrame({ game, open, onClose, demoMode = false }: RealGameFrameProps) {
  const { user, updateBalance } = useAuth();
  const [gameLoaded, setGameLoaded] = useState(false);
  const [gameError, setGameError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const gameUrl = demoMode && game.demoUrl ? game.demoUrl : game.gameUrl;
  const canPlayReal = user && user.balanceEUR >= game.minBetEUR && !demoMode;

  useEffect(() => {
    if (open) {
      setGameLoaded(false);
      setGameError(false);
    }
  }, [open, gameUrl]);

  const handleIframeLoad = () => {
    setGameLoaded(true);
    setGameError(false);
  };

  const handleIframeError = () => {
    setGameError(true);
    setGameLoaded(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (iframeRef.current?.requestFullscreen) {
        iframeRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Mock game session for demo
  const simulateGamePlay = () => {
    if (!user || demoMode) return;

    // Simulate a random game result
    const betAmount = Math.min(game.minBetEUR * 5, user.balanceEUR * 0.1); // Bet 5x minimum or 10% of balance
    const winChance = 0.4; // 40% chance to win
    const isWin = Math.random() < winChance;
    
    if (isWin) {
      const multiplier = 1.5 + Math.random() * 3; // 1.5x to 4.5x multiplier
      const winAmount = betAmount * multiplier;
      updateBalance(winAmount - betAmount, 'ADD'); // Net win
    } else {
      updateBalance(betAmount, 'SUBTRACT'); // Lose bet
    }
  };

  const getVolatilityColor = (volatility: string) => {
    switch (volatility) {
      case 'LOW': return 'bg-green-600';
      case 'MEDIUM': return 'bg-yellow-600';
      case 'HIGH': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-6xl max-h-[90vh] w-full p-0">
        {/* Game Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-bold">{game.name}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>{game.provider}</span>
                <Badge variant="secondary" className="text-xs">
                  RTP {game.rtp}%
                </Badge>
                <Badge className={`text-xs ${getVolatilityColor(game.volatility)}`}>
                  {game.volatility}
                </Badge>
                {demoMode && (
                  <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                    DEMO MODE
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {canPlayReal && (
              <div className="text-right text-sm">
                <div className="text-gray-400">Balance</div>
                <div className="text-green-400 font-medium">€{user.balanceEUR.toFixed(2)}</div>
              </div>
            )}

            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              {isFullscreen ? '⬅' : '⬆'}
            </Button>

            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Game Content */}
        <div className="relative flex-1 bg-black">
          {!gameLoaded && !gameError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading {game.name}...</p>
              </div>
            </div>
          )}

          {gameError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎮</div>
                <h3 className="text-xl font-bold">Game Currently Unavailable</h3>
                <p className="text-gray-400 max-w-md">
                  This game is not available right now. In a real casino, this would load the actual game from {game.provider}.
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={simulateGamePlay}
                    disabled={!canPlayReal}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {demoMode ? 'Demo Play' : 'Simulate Game Play'}
                  </Button>
                  {!canPlayReal && !demoMode && (
                    <p className="text-red-400 text-sm">
                      Insufficient balance (Min: €{game.minBetEUR})
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Game Frame */}
          <iframe
            ref={iframeRef}
            src={gameUrl}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            className="w-full h-[600px] border-0"
            allow="fullscreen; autoplay; encrypted-media"
            sandbox="allow-same-origin allow-scripts allow-forms"
            style={{ display: gameError ? 'none' : 'block' }}
          />
        </div>

        {/* Game Info Footer */}
        {!isFullscreen && (
          <div className="p-4 border-t border-gray-700 bg-gray-800/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <div>
                  <span className="text-gray-400">Min Bet:</span>
                  <span className="ml-2 text-white">€{game.minBetEUR}</span>
                </div>
                <div>
                  <span className="text-gray-400">Max Bet:</span>
                  <span className="ml-2 text-white">€{game.maxBetEUR}</span>
                </div>
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="ml-2 text-white">{game.type.replace(/_/g, ' ')}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {game.hasDemo && !demoMode && (
                  <Button
                    onClick={() => window.open(`${window.location.origin}/demo/${game.id}`, '_blank')}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300"
                  >
                    Try Demo
                  </Button>
                )}
                
                {game.isLive && (
                  <Badge className="bg-red-600 animate-pulse">
                    🔴 LIVE
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}