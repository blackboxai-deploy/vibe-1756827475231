"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  balanceEUR: number;
  isEmailVerified: boolean;
  kycStatus: 'NONE' | 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  vipLevel: {
    level: number;
    name: string;
    cashbackRate: number;
    color: string;
  };
  totalWageredEUR: number;
  totalWonEUR: number;
  createdAt: Date;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateBalance: (amount: number, type: 'ADD' | 'SUBTRACT') => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const VIP_LEVELS = [
  { level: 0, name: 'Bronze', cashbackRate: 0.1, color: '#CD7F32', minWager: 0 },
  { level: 1, name: 'Silver', cashbackRate: 0.3, color: '#C0C0C0', minWager: 1000 },
  { level: 2, name: 'Gold', cashbackRate: 0.5, color: '#FFD700', minWager: 10000 },
  { level: 3, name: 'Platinum', cashbackRate: 0.8, color: '#E5E4E2', minWager: 50000 },
  { level: 4, name: 'Diamond', cashbackRate: 1.2, color: '#B9F2FF', minWager: 250000 }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('casinoUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('casinoUser');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('casinoUser', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      const userData = savedUsers[email.toLowerCase()];
      
      if (userData && userData.password === password) {
        const loginUser: AuthUser = {
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          balanceEUR: userData.balanceEUR || 100,
          isEmailVerified: true,
          kycStatus: userData.kycStatus || 'NONE',
          vipLevel: VIP_LEVELS.find(level => 
            (userData.totalWageredEUR || 0) >= level.minWager
          ) || VIP_LEVELS[0],
          totalWageredEUR: userData.totalWageredEUR || 0,
          totalWonEUR: userData.totalWonEUR || 0,
          createdAt: new Date(userData.createdAt)
        };
        
        setUser(loginUser);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      
      if (savedUsers[data.email.toLowerCase()]) {
        setIsLoading(false);
        return false;
      }
      
      const newUser = {
        id: Math.random().toString(36),
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        balanceEUR: 100,
        kycStatus: 'NONE',
        totalWageredEUR: 0,
        totalWonEUR: 0,
        createdAt: new Date().toISOString()
      };
      
      savedUsers[data.email.toLowerCase()] = newUser;
      localStorage.setItem('registeredUsers', JSON.stringify(savedUsers));
      
      const authUser: AuthUser = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        balanceEUR: newUser.balanceEUR,
        isEmailVerified: true,
        kycStatus: 'NONE',
        vipLevel: VIP_LEVELS[0],
        totalWageredEUR: 0,
        totalWonEUR: 0,
        createdAt: new Date()
      };
      
      setUser(authUser);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('casinoUser');
  };

  const updateBalance = (amount: number, type: 'ADD' | 'SUBTRACT') => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return prev;
      
      const newBalance = type === 'ADD' 
        ? prev.balanceEUR + amount 
        : Math.max(0, prev.balanceEUR - amount);
      
      const newTotalWagered = type === 'SUBTRACT' 
        ? prev.totalWageredEUR + amount 
        : prev.totalWageredEUR;
        
      const newVipLevel = VIP_LEVELS.find(level => 
        newTotalWagered >= level.minWager
      ) || VIP_LEVELS[0];
      
      const updatedUser = {
        ...prev,
        balanceEUR: newBalance,
        totalWageredEUR: newTotalWagered,
        totalWonEUR: type === 'ADD' && amount > 0 ? prev.totalWonEUR + amount : prev.totalWonEUR,
        vipLevel: newVipLevel
      };
      
      const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
      if (savedUsers[prev.email.toLowerCase()]) {
        savedUsers[prev.email.toLowerCase()] = {
          ...savedUsers[prev.email.toLowerCase()],
          balanceEUR: newBalance,
          totalWageredEUR: newTotalWagered,
          totalWonEUR: updatedUser.totalWonEUR
        };
        localStorage.setItem('registeredUsers', JSON.stringify(savedUsers));
      }
      
      return updatedUser;
    });
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateBalance
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};