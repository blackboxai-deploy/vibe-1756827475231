"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const success = await login(formData.email, formData.password);
      if (!success) {
        setErrors({ general: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@cryptocasino.com',
      password: 'demo123'
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-gray-400">
          Sign in to your account to continue playing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-700 rounded-md">
              {errors.general}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="your@email.com"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              placeholder="••••••••"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          {/* Demo Account Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            Try Demo Account
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              className="text-sm text-purple-400 hover:text-purple-300"
              onClick={() => alert('Password reset functionality coming soon!')}
            >
              Forgot your password?
            </button>
            
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>

        {/* Features */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Instant deposits</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Fast withdrawals</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Provably fair</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}