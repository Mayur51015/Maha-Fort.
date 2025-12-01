import React, { useState } from 'react';
import { Mountain, ArrowRight, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic - just redirect to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-stone-100 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-fort-600 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="mx-auto bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-4 border border-white/20 shadow-inner">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">Welcome Back</h2>
            <p className="text-fort-100 text-sm mt-2">Sign in to plan your next adventure</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5 group-focus-within:text-fort-500 transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-fort-500/20 focus:border-fort-500 outline-none transition-all"
                placeholder="trekker@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5 group-focus-within:text-fort-500 transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-fort-500/20 focus:border-fort-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
            Sign In <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-stone-500 text-sm">
            Don't have an account? <Link to="/" className="text-fort-600 font-bold hover:underline">Join for free</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;