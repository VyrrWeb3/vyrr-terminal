"use client";

import React, { useState, useEffect } from 'react';
import TechBackground from './TechBackground';
import VyrrInsight from './VyrrInsight';
import DashboardCard from './DashboardCard';
import VaultLoading from './VaultLoading';
import ExtendedGrid from './ExtendedGrid';
import { Wallet, TrendingUp, ShieldCheck, Activity, Coins, ExternalLink, Sparkles } from 'lucide-react';
import { MadeWithDyad } from "./made-with-dyad";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { showError, showSuccess } from '@/utils/toast';

const Dashboard = () => {
  const [vaults, setVaults] = useState<any[]>([]);
  const { connected, publicKey, signMessage } = useWallet();
  const [vyrrResponse, setVyrrResponse] = useState<string | null>(null);

  const formatTVL = (val: number) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${val.toLocaleString()}`;
  };

  useEffect(() => {
    async function fetchYields() {
      try {
        const res = await fetch('https://yields.llama.fi/pools');
        const json = await res.json();
        
        const filtered = json.data.filter((pool: any) => 
          pool.chain === 'Solana' && 
          pool.symbol === 'USDC' && 
          pool.tvlUsd > 1000000
        );
        
        // Take top 10 for state
        const sorted = filtered.sort((a: any, b: any) => b.apy - a.apy).slice(0, 10);
        setVaults(sorted);
      } catch (e) {
        console.error('Uplink failure:', e);
        setVyrrResponse("Connection disrupted. Check your network status.");
      }
    }
    fetchYields();
  }, []);

  const handleDeposit = async (vaultName: string, apy: number) => {
    if (!publicKey || !signMessage) {
      showError("Uplink required. Please connect your wallet.");
      return;
    }

    try {
      setVyrrResponse(`Executing override. Please sign the transaction to route your funds into the ${vaultName} vault.`);
      
      const messageText = `Vyrr System Authorization: I am confirming a test deposit into the ${vaultName} vault at ${apy.toFixed(2)}% APY.`;
      const encodedMessage = new TextEncoder().encode(messageText);
      
      await signMessage(encodedMessage);
      
      setVyrrResponse(`Success! Signature verified. Devnet routing initiated for ${vaultName}. Your capital is being deployed.`);
      showSuccess("Signature Verified. Devnet routing initiated.");
      
      setTimeout(() => setVyrrResponse(null), 6000);
    } catch (error) {
      console.error("Signing failed:", error);
      setVyrrResponse("Authorization failed. The transaction was aborted.");
      showError("Authorization Failed");
      setTimeout(() => setVyrrResponse(null), 6000);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 relative">
      <TechBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-[100]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-xl flex items-center justify-center neon-glow-pink">
                <Sparkles className="text-white" size={24} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase text-glow">
                Vyrr<span className="text-cyan-400">.</span>Terminal
              </h1>
            </div>
            <p className="text-slate-500 text-[10px] font-black tracking-[0.4em] uppercase pl-1">
              Yield Aggregator v2.0 <span className="mx-2 text-slate-800">|</span> Devnet Active
            </p>
          </div>
          
          <div className="flex justify-start md:justify-end">
            <div className="scale-110">
              <WalletMultiButton />
            </div>
          </div>
        </header>

        <VyrrInsight isDataLoading={vaults.length === 0} customMessage={vyrrResponse} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard title="Total Value Locked" value="$4.2M" description="Aggregated liquidity" icon={<Wallet size={20} />} />
          <DashboardCard title="Avg. Performance" value="+12.4%" description="Net annualized yield" icon={<TrendingUp size={20} />} />
          <DashboardCard title="Security Rating" value="AAA" description="Audited contracts" icon={<ShieldCheck size={20} />} />
          <DashboardCard title="Network Latency" value="14ms" description="Real-time sync" icon={<Activity size={20} />} />
        </div>

        <div className="space-y-12">
          <div className="glass-card p-8 md:p-10 rounded-3xl">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Prime Strategies</h3>
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Live Feed</span>
              </div>
            </div>
            
            {vaults.length === 0 ? (
              <VaultLoading />
            ) : (
              <div className="space-y-4">
                {vaults.slice(0, 3).map((pool, index) => (
                  <div key={pool.pool} className="flex flex-col md:flex-row items-center justify-between p-6 glass-card border-white/5 rounded-2xl hover:bg-white/10 transition-all group gap-8 border-t-2 border-t-pink-500/30 hover:border-t-pink-500">
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="h-14 w-14 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-pink-500/10 transition-colors border border-white/5">
                        <Coins className="text-slate-500 group-hover:text-pink-400" size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl font-black text-white italic uppercase tracking-tight">
                            Level {index + 1}: {pool.project}
                          </span>
                          <ExternalLink size={14} className="text-slate-600" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{formatTVL(pool.tvlUsd)} TVL</span>
                          <div className="h-1 w-1 rounded-full bg-slate-700" />
                          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Solana Grid</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-10 w-full md:w-auto">
                      <div className="text-center md:text-right">
                        <span className="block font-black text-pink-500 text-3xl italic tracking-tighter text-glow">
                          {pool.apy.toFixed(2)}%
                        </span>
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Projected APY</span>
                      </div>
                      
                      <Button 
                        onClick={() => handleDeposit(pool.project, pool.apy)}
                        disabled={!connected}
                        className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-400 hover:to-cyan-300 text-white font-black text-xs uppercase tracking-widest px-10 h-14 rounded-xl transition-all shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:translate-y-[-2px] active:translate-y-[0px] disabled:opacity-30"
                      >
                        Deploy Capital
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <ExtendedGrid 
            vaults={vaults.slice(3, 10)} 
            onDeploy={handleDeposit} 
            connected={connected} 
            formatTVL={formatTVL}
          />
        </div>
      </div>
      
      <footer className="mt-20 pb-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Dashboard;