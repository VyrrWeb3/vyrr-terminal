"use client";

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Zap, Shield, Coins, ArrowRight } from 'lucide-react';
import SoloJazzBackground from './SoloJazzBackground';
import CRTEffect from './CRTEffect';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <SoloJazzBackground isActive={false} />
      <CRTEffect />
      
      <div className="max-w-4xl w-full z-10 space-y-12">
        {/* Hero Section */}
        <header className="text-center space-y-6">
          <div className="inline-block bg-black text-white px-6 py-2 transform -skew-x-12 border-r-8 border-accent mb-4">
            <h2 className="text-lg font-black tracking-[0.4em] uppercase">Vyrr Protocol</h2>
          </div>
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-black drop-shadow-[6px_6px_0px_#0ea5e9] leading-none">
            HIGH-SPEED<br />YIELD<span className="text-primary">.</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-black/80 italic max-w-2xl mx-auto">
            Connect your wallet. We grind the XP. You keep the loot. No lag, just pure Solana gains.
          </p>
          
          <div className="pt-8 flex justify-center">
            <div className="wallet-button-container scale-125 hover:scale-150 transition-transform duration-300">
              <WalletMultiButton />
            </div>
          </div>
        </header>

        {/* Pricing Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
            <div className="bg-primary/20 p-3 w-fit mb-4 border-2 border-black">
              <Coins className="text-primary" />
            </div>
            <h3 className="font-black text-xl uppercase mb-2">Cost to Deposit</h3>
            <p className="text-4xl font-black text-primary">$0</p>
            <p className="text-sm font-bold text-muted-foreground mt-2 italic">Totally free to start, dude!</p>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
            <div className="bg-secondary/20 p-3 w-fit mb-4 border-2 border-black">
              <Zap className="text-secondary" />
            </div>
            <h3 className="font-black text-xl uppercase mb-2">Vyrr's Cut</h3>
            <p className="text-4xl font-black text-secondary">10%</p>
            <p className="text-sm font-bold text-muted-foreground mt-2 italic">Only on the interest we generate.</p>
          </div>

          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-1 transition-transform">
            <div className="bg-accent/20 p-3 w-fit mb-4 border-2 border-black">
              <Shield className="text-accent" />
            </div>
            <h3 className="font-black text-xl uppercase mb-2">Your Cut</h3>
            <p className="text-4xl font-black text-accent">90%</p>
            <p className="text-sm font-bold text-muted-foreground mt-2 italic">+ 100% of your principal. Radical.</p>
          </div>
        </section>

        <div className="text-center">
          <p className="text-lg font-black uppercase tracking-widest bg-black text-white inline-block px-4 py-1">
            We only make money when you win.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;