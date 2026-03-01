"use client";

import React, { useState, useEffect } from 'react';
import TechBackground from './TechBackground';
import VyrrInsight from './VyrrInsight';
import DashboardCard from './DashboardCard';
import VaultLoading from './VaultLoading';
import ExtendedGrid from './ExtendedGrid';
import WaitlistModal from './WaitlistModal';
import { Wallet, TrendingUp, ShieldCheck, Activity, Coins, ExternalLink, Sparkles, Cpu } from 'lucide-react';
import { MadeWithDyad } from "./made-with-dyad";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showError } from '@/utils/toast';

const Dashboard = () => {
  const [vaults, setVaults] = useState<any[]>([]);
  const { connected, publicKey, signMessage } = useWallet();
  const [vyrrResponse, setVyrrResponse] = useState<string | null>(null);
  const [showWaitlist, setShowWaitlist] = useState(false);
  
  // Master Console States
  const [depositAmount, setDepositAmount] = useState<string>("1000");
  const [allocations, setAllocations] = useState<number[]>([0, 0, 0]);

  const formatTVL = (val: number) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${val.toLocaleString()}`;
  };

  // Auto-calculate split when total deposit changes
  useEffect(() => {
    const total = parseFloat(depositAmount) || 0;
    setAllocations([
      Math.round(total * 0.6),
      Math.round(total * 0.3),
      Math.round(total * 0.1)
    ]);
  }, [depositAmount]);

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
        
        const sorted = filtered.sort((a: any, b: any) => b.apy - a.apy).slice(0, 10);
        setVaults(sorted);
      } catch (e) {
        console.error('Uplink failure:', e);
        setVyrrResponse("Connection disrupted. Check your network status.");
      }
    }
    fetchYields();
  }, []);

  const handleManualAllocationChange = (index: number, value: string) => {
    const newVal = parseFloat(value) || 0;
    const newAllocations = [...allocations];
    newAllocations[index] = newVal;
    setAllocations(newAllocations);
  };

  const handleDeposit = async (vaultName: string, apy: number, amount?: number) => {
    if (!publicKey || !signMessage) {
      showError("Uplink required. Please connect your wallet.");
      return;
    }

    try {
      const displayAmount = amount || (parseFloat(depositAmount) / 3);
      setVyrrResponse(`Executing override. Authorization for ${displayAmount} USDC into ${vaultName} at ${apy.toFixed(2)}% APY.`);
      
      const messageText = `Vyrr System Authorization: I am confirming a test deposit of ${displayAmount} into the ${vaultName} vault at ${apy.toFixed(2)}% APY.`;
      const encodedMessage = new TextEncoder().encode(messageText);
      
      await signMessage(encodedMessage);
      
      setVyrrResponse(null);
      setShowWaitlist(true);
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

        {/* Master Console Section */}
        <div className="glass-card p-8 rounded-3xl mb-12 border-l-4 border-l-cyan-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <Cpu className="text-cyan-400" size={18} />
                <h3 className="text-lg font-black italic text-white uppercase tracking-widest">Master Console</h3>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Deployment Amount (USDC)</label>
                <div className="flex items-center gap-4">
                  <Input 
                    type="number" 
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="bg-slate-950/50 border-white/10 text-xl font-black italic text-cyan-400 h-14 rounded-xl w-full md:w-48"
                  />
                  <Button 
                    onClick={() => handleDeposit("Aggregated Grid", 12.4, parseFloat(depositAmount))}
                    disabled={!connected}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest px-8 h-14 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  >
                    Auto-Route Capital
                  </Button>
                </div>
                <p className="font-mono text-[10px] text-cyan-400/70 mt-2">
                  {`> SYSTEM RATIONALE: Capital heavily weighted toward Rank 1 APY. 3-point diversification applied to mitigate protocol-specific smart contract risk. User may override allocations below.`}
                </p>
              </div>
            </div>
          </div>
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
                  <div key={pool.pool} className="flex flex-col lg:flex-row items-center justify-between p-6 glass-card border-white/5 rounded-2xl hover:bg-white/10 transition-all group gap-8 border-t-2 border-t-pink-500/30 hover:border-t-pink-500">
                    <div className="flex items-center gap-6 w-full lg:w-auto">
                      <div className="h-14 w-14 bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-pink-500/10 transition-colors border border-white/5">
                        <Coins className="text-slate-500 group-hover:text-pink-400" size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl font-black text-white italic uppercase tracking-tight">
                            Rank {index + 1}: {pool.project}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{formatTVL(pool.tvlUsd)} TVL</span>
                          <div className="h-1 w-1 rounded-full bg-slate-700" />
                          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">{pool.apy.toFixed(2)}% APY</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
                      <div className="flex flex-col gap-1 w-full md:w-32">
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Live Allocation</span>
                        <div className="relative">
                          <Input 
                            type="number"
                            value={allocations[index]}
                            onChange={(e) => handleManualAllocationChange(index, e.target.value)}
                            className="bg-slate-950/50 border-white/10 h-10 text-xs font-black text-white rounded-lg focus:border-pink-500 pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600">$</span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleDeposit(pool.project, pool.apy, allocations[index])}
                        disabled={!connected}
                        className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-400 hover:to-cyan-300 text-white font-black text-xs uppercase tracking-widest px-8 h-12 rounded-xl transition-all shadow-lg shadow-pink-500/20 disabled:opacity-30"
                      >
                        Deploy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <ExtendedGrid 
            vaults={vaults.slice(3, 10)} 
            onDeploy={(name, apy) => handleDeposit(name, apy, 0)} 
            connected={connected} 
            formatTVL={formatTVL}
          />
        </div>

        <div className="mt-24 text-slate-600 text-[10px] text-center max-w-3xl mx-auto pb-8 leading-relaxed font-medium uppercase tracking-widest">
          DISCLAIMER: Vyrr is currently in Testnet beta. No real funds are being deposited or routed. Cryptocurrency and DeFi yield farming involve substantial risk of loss. Vyrr Terminal is an interface, not a fund manager. By using this application, you acknowledge that you are fully responsible for your own capital and any resulting losses.
        </div>
      </div>
      
      <WaitlistModal 
        isOpen={showWaitlist} 
        onClose={() => setShowWaitlist(false)} 
      />

      <footer className="mt-10 pb-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Dashboard;