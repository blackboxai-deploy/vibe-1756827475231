"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import DepositModal from '@/components/payments/DepositModal';


export default function NewHeader() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showDeposit, setShowDeposit] = useState(false);


  const formatAddress = (email: string) => {
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    return `${parts[0].slice(0, 3)}***@${parts[1]}`;
  };

  const handleAuthClose = () => {
    setShowAuth(false);
  };

  const switchToRegister = () => {
    setAuthMode('register');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  return (
    <>
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">€</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  EuroCasino
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Casino</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Live Games</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Promotions</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">VIP</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
            </nav>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {/* Balance Display */}
                  <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2">
                    <span className="text-sm">💰</span>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">
                        €{user.balanceEUR.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400">Balance</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => setShowDeposit(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Deposit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alert('Withdrawal feature coming soon!')}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      disabled={user.balanceEUR < 25}
                    >
                      Withdraw
                    </Button>
                  </div>

                  {/* VIP Level */}
                  <Badge 
                    variant="secondary" 
                    style={{ 
                      backgroundColor: user.vipLevel.color + '20', 
                      color: user.vipLevel.color,
                      borderColor: user.vipLevel.color + '40'
                    }}
                    className="border"
                  >
                    {user.vipLevel.name}
                  </Badge>

                  {/* User Menu */}
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatAddress(user.email)}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={logout}
                      className="text-gray-400 hover:text-white"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuth(true);
                    }}
                    className="text-gray-300 hover:text-white"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthMode('register');
                      setShowAuth(true);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-800 bg-gray-900/30">
          <nav className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-around">
              <a href="#" className="text-gray-400 hover:text-white text-sm py-2">Casino</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm py-2">Live</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm py-2">Promos</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm py-2">VIP</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {authMode === 'login' ? (
            <LoginForm 
              onSwitchToRegister={switchToRegister}
            />
          ) : (
            <RegisterForm 
              onSwitchToLogin={switchToLogin}
            />
          )}
        </div>
      )}

      {/* Payment Modals */}
      <DepositModal 
        isOpen={showDeposit} 
        onClose={() => setShowDeposit(false)} 
      />
    </>
  );
}