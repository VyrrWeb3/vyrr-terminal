"use client";

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Shield, Zap, BarChart3, Lock } from 'lucide-react';
import TechBackground from './TechBackground';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <TechBackground />
      
      <div className="max-w-5xl w-full z-10 space-y-20">
        {/* Hero Section */}
        <header className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-400">Vyrr Protocol v2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Institutional Grade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Solana Yield.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            Automated yield optimization for the Solana ecosystem. Secure, transparent, and engineered for maximum capital efficiency.
          </p>
          
          <div className="pt-4 flex justify-center">
            <div className="glow-cyan rounded-lg">
              <WalletMultiButton />
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl backdrop-blur-sm hover:border-cyan-500/30 transition-colors group">
            <div className="bg-cyan-500/10 p-3 w-fit rounded-xl mb-6 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
              <BarChart3 className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-semibold text-lg text-white mb-3">Zero Entry Fee</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Deploy capital without upfront costs. We prioritize accessibility for all institutional participants.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl backdrop-blur-sm hover:border-cyan-500/30 transition-colors group">
            <div className="bg-cyan-500/10 p-3 w-fit rounded-xl mb-6 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
              <Zap className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-semibold text-lg text-white mb-3">Performance Based</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              A flat 10% performance fee on generated yield. Our incentives are perfectly aligned with your growth.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl backdrop-blur-sm hover:border-cyan-500/30 transition-colors group">
            <div className="bg-cyan-500/10 p-3 w-fit rounded-xl mb-6 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
              <Shield className="text-cyan-400" size={24} />
            </div>
            <h3 className="font-semibold text-lg text-white mb-3">Principal Security</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Retain 100% of your principal. Vyrr only optimizes the yield layer while maintaining asset safety.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;