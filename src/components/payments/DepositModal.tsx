"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuth } from '@/contexts/AuthContext';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORTED_CRYPTOS = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', rate: 42000, minDeposit: 0.001 },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', rate: 2500, minDeposit: 0.01 },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵', rate: 0.92, minDeposit: 10 },
  { symbol: 'USDT', name: 'Tether', icon: '💚', rate: 0.92, minDeposit: 10 },
  { symbol: 'MATIC', name: 'Polygon', icon: '🟣', rate: 0.85, minDeposit: 1 },
  { symbol: 'BNB', name: 'Binance Coin', icon: '🟡', rate: 320, minDeposit: 0.1 }
];

export default function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const { user, updateBalance } = useAuth();
  const [selectedCrypto, setSelectedCrypto] = useState(SUPPORTED_CRYPTOS[0]);
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [eurAmount, setEurAmount] = useState(0);
  const [depositAddress] = useState('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2');
  const [, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'confirm' | 'processing' | 'success'>('select');

  useEffect(() => {
    if (cryptoAmount) {
      const eur = parseFloat(cryptoAmount) * selectedCrypto.rate;
      setEurAmount(eur);
    } else {
      setEurAmount(0);
    }
  }, [cryptoAmount, selectedCrypto]);

  const handleDeposit = async () => {
    if (!cryptoAmount || parseFloat(cryptoAmount) < selectedCrypto.minDeposit) {
      alert(`Minimum deposit: ${selectedCrypto.minDeposit} ${selectedCrypto.symbol}`);
      return;
    }

    setStep('processing');
    setIsProcessing(true);

    // Simulate blockchain confirmation
    setTimeout(() => {
      updateBalance(eurAmount, 'ADD');
      setStep('success');
      setIsProcessing(false);
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setStep('select');
        setCryptoAmount('');
      }, 3000);
    }, 5000);
  };

  const formatEUR = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (step === 'processing') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <span className="mr-2">⏳</span>
              Processing Deposit
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-6 text-center">
            <div className="animate-spin text-4xl">🔄</div>
            <p className="text-gray-300">
              Waiting for blockchain confirmation...
            </p>
            <p className="text-sm text-gray-400">
              This usually takes 1-10 minutes depending on network congestion
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400">Transaction Details:</p>
              <p className="text-green-400">{cryptoAmount} {selectedCrypto.symbol}</p>
              <p className="text-purple-400">≈ {formatEUR(eurAmount)}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (step === 'success') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-400">
              <span className="mr-2">✅</span>
              Deposit Successful!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-6 text-center">
            <div className="text-6xl">🎉</div>
            <p className="text-lg">
              {formatEUR(eurAmount)} has been added to your account!
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400">New Balance:</p>
              <p className="text-2xl font-bold text-green-400">
                {formatEUR(user?.balanceEUR || 0)}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="mr-2">💰</span>
            Deposit Crypto
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Crypto Selection */}
          <div>
            <Label className="text-gray-300 mb-2 block">Select Cryptocurrency</Label>
            <div className="grid grid-cols-2 gap-2">
              {SUPPORTED_CRYPTOS.map((crypto) => (
                <Button
                  key={crypto.symbol}
                  variant={selectedCrypto.symbol === crypto.symbol ? "default" : "outline"}
                  onClick={() => setSelectedCrypto(crypto)}
                  className="flex items-center justify-center p-3 h-auto"
                >
                  <span className="mr-2">{crypto.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{crypto.symbol}</div>
                    <div className="text-xs opacity-70">{formatEUR(crypto.rate)}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <Label className="text-gray-300">Amount to Deposit</Label>
            <div className="mt-1 space-y-2">
              <Input
                type="number"
                placeholder={`Min: ${selectedCrypto.minDeposit} ${selectedCrypto.symbol}`}
                value={cryptoAmount}
                onChange={(e) => setCryptoAmount(e.target.value)}
                className="bg-gray-800 border-gray-600"
              />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Min: {selectedCrypto.minDeposit} {selectedCrypto.symbol}
                </span>
                {eurAmount > 0 && (
                  <span className="text-purple-400 font-medium">
                    ≈ {formatEUR(eurAmount)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Deposit Address */}
          <div className="bg-gray-800 rounded-lg p-4">
            <Label className="text-gray-300 text-sm">Deposit Address ({selectedCrypto.symbol})</Label>
            <div className="mt-2 p-2 bg-gray-700 rounded font-mono text-xs break-all">
              {depositAddress}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(depositAddress)}
              className="mt-2 text-purple-400 hover:text-purple-300"
            >
              📋 Copy Address
            </Button>
          </div>

          {/* Fees Info */}
          <div className="bg-blue-900/20 rounded-lg p-3">
            <h4 className="text-sm font-medium text-blue-400 mb-2">ℹ️ Important Information</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Deposits are usually credited within 10-30 minutes</li>
              <li>• Network fees are paid by you</li>
              <li>• Minimum confirmations: 3 blocks</li>
              <li>• Only send {selectedCrypto.symbol} to this address</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleDeposit}
              disabled={!cryptoAmount || parseFloat(cryptoAmount) < selectedCrypto.minDeposit}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Confirm Deposit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}