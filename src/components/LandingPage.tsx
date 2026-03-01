"use client";

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Shield, Zap, Cpu, Lock } from 'lucide-react';
import TechBackground from './TechBackground';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <TechBackground />
      
      <div className="max-w-5xl w-full z-10 space-y-24">
        {/* Hero Section */}
        <header className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-none mb-4 font-mono">
            <div className="h-2 w-2 bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400">Vyrr_Protocol_v2.0</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Yield</span> Grid.
          </h1>
          
          <p className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto font-mono uppercase tracking-wide leading-relaxed">
            Connect your wallet. We grind the XP. You keep the loot. No lag, just pure Solana gains.
          </p>
          
          <div className="pt-6 flex justify-center">
            <div className="glow-cyan-hover transition-all duration-300">
              <WalletMultiButton />
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono">
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-none backdrop-blur-sm hover:border-cyan-500/30 transition-all group">
            <div className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
              <Cpu size={24} />
            </div>
            <h3 className="font-bold text-sm text-white mb-3 uppercase tracking-widest">Zero Entry Fee</h3>
            <p className="text-zinc-600 text-xs leading-relaxed uppercase">
              Deploy capital without upfront costs. Accessibility for all netrunners.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-none backdrop-blur-sm hover:border-pink-500/30 transition-all group">
            <div className="text-pink-500 mb-6 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-sm text-white mb-3 uppercase tracking-widest">Performance Based</h3>
            <p className="text-zinc-600 text-xs leading-relaxed uppercase">
              10% performance fee on generated yield. Incentives aligned with growth.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-none backdrop-blur-sm hover:border-cyan-500/30 transition-all group">
            <div className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="font-bold text-sm text-white mb-3 uppercase tracking-widest">Principal Security</h3>
            <p className="text-zinc-600 text-xs leading-relaxed uppercase">
              Retain 100% of principal. Vyrr only optimizes the yield layer.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;