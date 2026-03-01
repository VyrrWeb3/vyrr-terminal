"use client";

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Shield, Zap, BarChart3 } from 'lucide-react';
import TechBackground from './TechBackground';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <TechBackground />
      
      <div className="max-w-6xl w-full z-10 space-y-24 py-20">
        {/* Hero Section */}
        <header className="text-center space-y-10">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-4 backdrop-blur-md">
            <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse neon-glow-pink" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300">Vyrr Protocol v2.0</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] uppercase italic text-glow">
              The <span className="yield-text">Yield</span> <br /> Grid.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Connect your wallet. We grind the XP. You keep the loot. <br className="hidden md:block" />
              High-performance Solana yields, automated by Vyrr.
            </p>
          </div>
          
          <div className="pt-8 flex flex-col items-center gap-6">
            <div className="scale-125">
              <WalletMultiButton />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Secure Devnet Uplink</p>
          </div>
        </header>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-10 rounded-3xl group hover:translate-y-[-8px] transition-all duration-500">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-8 neon-glow-pink group-hover:scale-110 transition-transform">
              <BarChart3 className="text-white" size={28} />
            </div>
            <h3 className="font-black text-2xl text-white mb-4 uppercase italic tracking-tight">Zero Entry</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              Deploy capital without upfront costs. We believe in accessibility for every netrunner on the grid.
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl group hover:translate-y-[-8px] transition-all duration-500">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-8 neon-glow-cyan group-hover:scale-110 transition-transform">
              <Zap className="text-white" size={28} />
            </div>
            <h3 className="font-black text-2xl text-white mb-4 uppercase italic tracking-tight">Performance</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              A flat 10% performance fee on generated yield. Our incentives are perfectly aligned with your growth.
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl group hover:translate-y-[-8px] transition-all duration-500">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-8 shadow-indigo-500/40 shadow-xl group-hover:scale-110 transition-transform">
              <Shield className="text-white" size={28} />
            </div>
            <h3 className="font-black text-2xl text-white mb-4 uppercase italic tracking-tight">Security</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              Retain 100% of your principal. Vyrr only optimizes the yield layer while maintaining total asset safety.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;