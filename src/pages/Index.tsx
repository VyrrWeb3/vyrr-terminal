"use client";

import React from 'react';
import SoloJazzBackground from '@/components/SoloJazzBackground';
import CRTEffect from '@/components/CRTEffect';
import VyrrInsight from '@/components/VyrrInsight';
import DashboardCard from '@/components/DashboardCard';
import VaultLoading from '@/components/VaultLoading';
import { Wallet, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useVaultData } from '@/hooks/useVaultData';

const Index = () => {
  const { vaults, isLoading } = useVaultData();

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <SoloJazzBackground />
      <CRTEffect />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-block bg-black text-white px-4 py-1 mb-4 transform -skew-x-12 border-r-8 border-accent">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase">Solana Yield Aggregator</h2>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-black drop-shadow-[4px_4px_0px_#0ea5e9]">
              VYRR<span className="text-primary">.</span>DASH
            </h1>
            <p className="text-lg font-bold text-muted-foreground mt-2 italic">
              The most radical yield in the metaverse.
            </p>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <WalletMultiButton />
          </div>
        </header>

        <VyrrInsight isDataLoading={isLoading} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard 
            title="Total Value" 
            value="$4.2M" 
            description="Hella liquidity, dude!" 
            icon={<Wallet size={20} />}
            color="primary"
          />
          <DashboardCard 
            title="Daily Yield" 
            value="+12.4%" 
            description="To the moon and back!" 
            icon={<TrendingUp size={20} />}
            color="secondary"
          />
          <DashboardCard 
            title="Vault Safety" 
            value="A+" 
            description="Safe as a floppy disk." 
            icon={<ShieldCheck size={20} />}
            color="accent"
          />
          <DashboardCard 
            title="Network Load" 
            value="Low" 
            description="Smooth like a dial-up tone." 
            icon={<Activity size={20} />}
            color="primary"
          />
        </div>

        <div className="bg-white/50 backdrop-blur-md border-4 border-black p-8 rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
          <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Active Vaults</h3>
          
          {isLoading ? (
            <VaultLoading />
          ) : (
            <div className="space-y-4">
              {vaults.map((vault) => (
                <div key={vault.id} className="flex items-center justify-between p-4 border-2 border-black bg-white hover:bg-primary/5 transition-colors cursor-pointer group">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{vault.name}</span>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Risk: {vault.risk}</span>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="font-black text-primary text-xl">{vault.apy} APY</span>
                    <span className="hidden md:inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-widest group-hover:bg-accent transition-colors">
                      {vault.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-20 pb-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;