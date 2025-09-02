"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
}

interface CryptoOption {
  symbol: string;
  name: string;
  icon: string;
  rate: number; // Rate in EUR
  minWithdraw: number;
  withdrawalFee: number;
  network: string;
  processingTime: string;
}

const CRYPTO_OPTIONS: CryptoOption[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    rate: 42000,
    minWithdraw: 25,
    withdrawalFee: 5.00,
    network: 'Bitcoin',
    processingTime: '10-60 minutes'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    rate: 2500,
    minWithdraw: 25,
    withdrawalFee: 8.00,
    network: 'Ethereum',
    processingTime: '5-30 minutes'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '💵',
    rate: 0.92,
    minWithdraw: 25,
    withdrawalFee: 3.00,
    network: 'Ethereum',
    processingTime: '5-30 minutes'
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    icon: '💚',
    rate: 0.92,
    minWithdraw: 25,
    withdrawalFee: 2.50,
    network: 'Tron',
    processingTime: '1-10 minutes'
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    icon: '🟡',
    rate: 320,
    minWithdraw: 25,
    withdrawalFee: 1.00,
    network: 'BSC',
    processingTime: '1-10 minutes'
  }
];

export default function WithdrawModal({ open, onClose }: WithdrawModalProps) {
  const { user, updateBalance } = useAuth();
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption>(CRYPTO_OPTIONS[0]);
  const [eurAmount, setEurAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'details' | 'confirmation' | 'success'>('select');

  const eurAmountNum = parseFloat(eurAmount) || 0;
  const totalFee = selectedCrypto.withdrawalFee + (eurAmountNum * 0.015); // 1.5% platform fee
  const finalEurAmount = Math.max(0, eurAmountNum - totalFee);
  const cryptoAmount = finalEurAmount / selectedCrypto.rate;

  const canWithdraw = user && eurAmountNum >= selectedCrypto.minWithdraw && eurAmountNum <= user.balanceEUR;

  const handleCryptoSelect = (crypto: CryptoOption) => {
    setSelectedCrypto(crypto);
    setStep('details');
  };

  const handleDetailsSubmit = () => {
    if (!canWithdraw || !walletAddress) return;
    setStep('confirmation');
  };

  const processWithdrawal = async () => {
    if (!canWithdraw) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Deduct from balance
    updateBalance(eurAmountNum, 'SUBTRACT');
    
    setIsProcessing(false);
    setStep('success');
    
    // Auto close after success
    setTimeout(() => {
      onClose();
      resetForm();
    }, 4000);
  };

  const resetForm = () => {
    setStep('select');
    setEurAmount('');
    setWalletAddress('');
    setIsProcessing(false);
  };

  const formatCrypto = (amount: number, symbol: string) => {
    const decimals = ['USDC', 'USDT'].includes(symbol) ? 2 : 6;
    return `${amount.toFixed(decimals)} ${symbol}`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Withdraw to Crypto
          </DialogTitle>
        </DialogHeader>

        {/* User Balance Display */}
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-sm text-gray-400">Available Balance</div>
          <div className="text-2xl font-bold text-green-400">
            €{user?.balanceEUR.toFixed(2) || '0.00'}
          </div>
        </div>

        {/* Step 1: Select Cryptocurrency */}
        {step === 'select' && (
          <div className="space-y-4">
            <p className="text-gray-400 text-center">
              Choose cryptocurrency to receive
            </p>
            
            <div className="space-y-2">
              {CRYPTO_OPTIONS.map((crypto) => (
                <button
                  key={crypto.symbol}
                  onClick={() => handleCryptoSelect(crypto)}
                  className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{crypto.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-sm text-gray-400">{crypto.network}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Min: €{crypto.minWithdraw}</div>
                      <div className="text-sm text-gray-400">Fee: €{crypto.withdrawalFee}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Enter Details */}
        {step === 'details' && (
          <div className="space-y-4">
            <button
              onClick={() => setStep('select')}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              ← Change cryptocurrency
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl">{selectedCrypto.icon}</span>
                <span className="text-lg font-medium">{selectedCrypto.name}</span>
              </div>
              <Badge variant="secondary">{selectedCrypto.network}</Badge>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eurAmount">Amount in EUR</Label>
              <Input
                id="eurAmount"
                type="number"
                value={eurAmount}
                onChange={(e) => setEurAmount(e.target.value)}
                placeholder={`Min: €${selectedCrypto.minWithdraw}`}
                min={selectedCrypto.minWithdraw}
                max={user?.balanceEUR || 0}
                step="0.01"
                className="bg-gray-800 border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Wallet Address ({selectedCrypto.symbol})</Label>
              <Input
                id="address"
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder={`Enter your ${selectedCrypto.symbol} wallet address`}
                className="bg-gray-800 border-gray-600"
              />
            </div>

            {eurAmount && (
              <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Withdrawal amount:</span>
                  <span>€{eurAmountNum.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Platform fee (1.5%):</span>
                  <span className="text-red-400">-€{(eurAmountNum * 0.015).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Network fee:</span>
                  <span className="text-red-400">-€{selectedCrypto.withdrawalFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between font-medium">
                    <span>You will receive:</span>
                    <span className="text-green-400">{formatCrypto(cryptoAmount, selectedCrypto.symbol)}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 text-center">
                  Processing time: {selectedCrypto.processingTime}
                </div>
              </div>
            )}

            <Button
              onClick={handleDetailsSubmit}
              disabled={!canWithdraw || !walletAddress}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Review Withdrawal
            </Button>

            {eurAmountNum > (user?.balanceEUR || 0) && (
              <p className="text-red-400 text-sm text-center">
                Insufficient balance. Maximum: €{user?.balanceEUR.toFixed(2)}
              </p>
            )}
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmation' && (
          <div className="space-y-4">
            <button
              onClick={() => setStep('details')}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              ← Edit details
            </button>

            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Confirm Withdrawal</h3>
              <p className="text-gray-400 text-sm">
                Please verify all details before confirming
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Cryptocurrency:</span>
                <span className="flex items-center space-x-2">
                  <span>{selectedCrypto.icon}</span>
                  <span>{selectedCrypto.name}</span>
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Network:</span>
                <Badge variant="secondary">{selectedCrypto.network}</Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Wallet Address:</span>
                <code className="text-xs text-green-400 max-w-[150px] truncate">
                  {walletAddress}
                </code>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Amount to receive:</span>
                <span className="font-medium text-green-400">
                  {formatCrypto(cryptoAmount, selectedCrypto.symbol)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total fees:</span>
                <span className="text-red-400">€{totalFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
              <p className="text-yellow-400 text-xs">
                ⚠️ Withdrawals are irreversible. Please double-check the wallet address and network.
              </p>
            </div>

            <Button
              onClick={processWithdrawal}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
            >
              {isProcessing ? 'Processing...' : 'Confirm Withdrawal'}
            </Button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="space-y-4 text-center">
            <div className="text-6xl">✅</div>
            <h3 className="text-xl font-bold text-green-400">Withdrawal Submitted!</h3>
            <p className="text-gray-400">
              Your withdrawal is being processed. You will receive {formatCrypto(cryptoAmount, selectedCrypto.symbol)} in {selectedCrypto.processingTime}.
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Transaction ID (Demo)</div>
              <code className="text-xs text-green-400 break-all">
                WD{Date.now()}{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </code>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}