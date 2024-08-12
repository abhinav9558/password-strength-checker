import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import axios from 'axios';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const PasswordChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [crackTime, setCrackTime] = useState('');
  const [isLeaked, setIsLeaked] = useState(false);
  const [leakCount, setLeakCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setStrength(result.score);
      setCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);
      checkPasswordLeak(password);
    } else {
      setStrength(0);
      setCrackTime('');
      setIsLeaked(false);
      setLeakCount(0);
    }
  }, [password]);

  const checkPasswordLeak = async (pwd: string) => {
    try {
      const hashedPassword = await sha1(pwd);
      const prefix = hashedPassword.slice(0, 5);
      const suffix = hashedPassword.slice(5);

      const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
      const leakedHashes = response.data.split('\n');

      const leakedHash = leakedHashes.find(hash => hash.split(':')[0].toLowerCase() === suffix.toLowerCase());

      if (leakedHash) {
        setIsLeaked(true);
        setLeakCount(parseInt(leakedHash.split(':')[1], 10));
      } else {
        setIsLeaked(false);
        setLeakCount(0);
      }
    } catch (error) {
      console.error('Error checking password leak:', error);
    }
  };

  const sha1 = async (str: string) => {
    const buffer = new TextEncoder().encode(str);
    const digest = await crypto.subtle.digest('SHA-1', buffer);
    return Array.from(new Uint8Array(digest))
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  };

  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return 'N/A';
    }
  };

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-lime-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Password Strength Testing Tool
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Think you have a strong password? Find out below.
        </p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Password Strength:</span>
            <span className={`font-semibold text-${getStrengthColor(strength).replace('bg-', '')}`}>
              {getStrengthLabel(strength)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${getStrengthColor(strength)}`}
              style={{ width: `${(strength + 1) * 20}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-gray-700">Estimated time to crack:</span>
          <span className="font-semibold ml-2">{crackTime || 'N/A'}</span>
        </div>
        {isLeaked && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-md flex items-center">
            <AlertCircle className="text-red-500 mr-2" />
            <p className="text-red-700">
              Warning: This password has been found in {leakCount} data breach{leakCount > 1 ? 'es' : ''}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordChecker;