"use client";

import React, { useState, useEffect, useMemo } from 'react';
import TechBackground from './TechBackground';
import VyrrInsight from './VyrrInsight';
import DashboardCard from './DashboardCard';
import VaultLoading from './VaultLoading';
import ExtendedGrid from './ExtendedGrid';
import PortfolioView from './PortfolioView';
import WaitlistModal from './WaitlistModal';
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  Coins, 
  Sparkles, 
  Cpu, 
  LayoutGrid, 
  Briefcase 
} from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showError, showSuccess } from '@/utils/toast';

interface PortfolioItem {
  poolId: string;
  project: string;
  amount: number;
  apy: number;
  timestamp: number;
}

const Dashboard = () => {
  const [vaults, setVaults] = useState<any[]>([]);
  const { connected, publicKey, signMessage } = useWallet();
  const [vyrrResponse, setVyrrResponse] = useState<string | null>(null);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [view, setView] = useState<'market' | 'portfolio'>('market');
  
  const [depositAmount, setDepositAmount] = useState<string>("1000");
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

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
        
        const sorted = filtered.sort((a: any, b: any) => b.apy - a.apy).slice(0, 10);
        setVaults(sorted);
      } catch (e) {
        console.error('Uplink failure:', e);
        setVyrrResponse("Connection disrupted. Check your network status.");
      }
    }
    fetchYields();
  }, []);

  useEffect(() => {
    if (vaults.length === 0) return;

    const total = parseFloat(depositAmount) || 0;
    const newAllocations: Record<string, number> = {};
    
    vaults.forEach((pool, index) => {
      if (index === 0) newAllocations[pool.pool] = Math.round(total * 0.6);
      else if (index === 1) newAllocations[pool.pool] = Math.round(total * 0.3);
      else if (index === 2) newAllocations[pool.pool] = Math.round(total * 0.1);
      else newAllocations[pool.pool] = 0;
    });

    setAllocations(newAllocations);
  }, [depositAmount, vaults]);

  const totalAllocated = useMemo(() => {
    return Object.values(allocations).reduce((acc, val) => acc + val, 0);
  }, [allocations]);

  const remainingBalance = useMemo(() => {
    return (parseFloat(depositAmount) || 0) - totalAllocated;
  }, [depositAmount, totalAllocated]);

  const handleManualAllocationChange = (poolId: string, value: string) => {
    const newVal = parseFloat(value) || 0;
    setAllocations(prev => ({
      ...prev,
      [poolId]: newVal
    }));
  };

  const handleDeposit = async (poolId: string, vaultName: string, apy: number, amount: number) => {
    if (!publicKey || !signMessage) {
      showError("Uplink required. Please connect your wallet.");
      return;
    }

    try {
      setVyrrResponse(`Executing authorization. Allocation of ${amount} USDC into ${vaultName} at ${apy.toFixed(2)}% APY.`);
      
      const messageText = `Vyrr System Authorization: I am confirming a test deposit of ${amount} into the ${vaultName} vault at ${apy.toFixed(2)}% APY.`;
      const encodedMessage = new TextEncoder().encode(messageText);
      
      await signMessage(encodedMessage);
      
      setPortfolio(prev => [
        ...prev.filter(i => i.poolId !== poolId),
        { poolId, project: vaultName, apy, amount, timestamp: Date.now() }
      ]);
      
      showSuccess(`Capital routed to ${vaultName}`);
      setVyrrResponse(null);
      setShowWaitlist(true);
    } catch (error) {
      console.error("Signing failed:", error);
      setVyrrResponse("Authorization failed. The transaction was aborted.");
      showError("Authorization Failed");
      setTimeout(() => setVyrrResponse(null), 6000);
    }
  };

  const handleMasterDeploy = async () => {
    if (!publicKey || !signMessage) return;

    try {
      setVyrrResponse(`Master Execution: Deploying ${depositAmount} USDC across grid with manual overrides.`);
      
      const messageText = `Vyrr Master Protocol: I authorize the deployment of ${depositAmount} USDC across the Solana Yield Grid as specified in current Terminal allocations.`;
      const encodedMessage = new TextEncoder().encode(messageText);
      
      await signMessage(encodedMessage);
      
      const newItems: PortfolioItem[] = [];
      Object.entries(allocations).forEach(([poolId, amount]) => {
        if (amount > 0) {
          const pool = vaults.find(v => v.pool === poolId);
          if (pool) {
            newItems.push({
              poolId,
              project: pool.project,
              apy: pool.apy,
              amount,
              timestamp: Date.now()
            });
          }
        }
      });
      
      setPortfolio(prev => [...prev, ...newItems]);
      showSuccess("Master deployment complete");
      setVyrrResponse(null);
      setShowWaitlist(true);
    } catch (error) {
      console.error("Master signing failed:", error);
      setVyrrResponse("Execution Aborted.");
      showError("Master Authorization Failed");
    }
  };

  const handleWithdrawAll = async () => {
    if (!publicKey || !signMessage) return;

    try {
      setVyrrResponse("Terminating all active yield vectors. Requesting signature...");
      
      const messageText = `Vyrr Protocol Exit: I authorize the withdrawal of all principal capital and accrued yield from the Vyrr Grid. Total value: $${portfolio.reduce((acc, i) => acc + i.amount, 0)}`;
      const encodedMessage = new TextEncoder().encode(messageText);
      
      await signMessage(encodedMessage);
      
      setPortfolio([]);
      showSuccess("All capital withdrawn successfully");
      setVyrrResponse("Grid connection closed. Assets returned to wallet.");
      setTimeout(() => setVyrrResponse(null), 5000);
    } catch (error) {
      console.error("Withdrawal failed:", error);
      showError("Withdrawal Aborted");
      setVyrrResponse("Withdrawal process interrupted.");
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
          
          <div className="flex items-center gap-6">
            <div className="bg-slate-900/50 p-1 rounded-xl border border-white/5 flex gap-1">
              <button 
                onClick={() => setView('market')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'market' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <LayoutGrid size={14} />
                Market
              </button>
              <button 
                onClick={() => setView('portfolio')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === 'portfolio' ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Briefcase size={14} />
                My Portfolio
              </button>
            </div>
            <div className="scale-110">
              <WalletMultiButton />
            </div>
          </div>
        </header>

        <VyrrInsight isDataLoading={vaults.length === 0} customMessage={vyrrResponse} />

        {view === 'market' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <DashboardCard title="Total Value Locked" value="$4.2M" description="Aggregated liquidity" icon={<Wallet size={20} />} />
              <DashboardCard title="Avg. Performance" value="+12.4%" description="Net annualized yield" icon={<TrendingUp size={20} />} />
              <DashboardCard title="Security Rating" value="AAA" description="Audited contracts" icon={<ShieldCheck size={20} />} />
              <DashboardCard title="Network Latency" value="14ms" description="Real-time sync" icon={<Activity size={20} />} />
            </div>

            <div className="glass-card p-8 rounded-3xl mb-12 border-l-4 border-l-cyan-500">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-2">
                    <Cpu className="text-cyan-400" size={18} />
                    <h3 className="text-lg font-black italic text-white uppercase tracking-widest">Master Console</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Deployment Amount (USDC)</label>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <Input 
                          type="number" 
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="bg-slate-950/50 border-white/10 text-xl font-black italic text-cyan-400 h-14 rounded-xl w-full md:w-48"
                        />
                        <div className="flex-1 flex flex-col gap-2">
                          <div className={`text-[10px] font-black uppercase tracking-widest ${remainingBalance === 0 ? 'text-green-400' : 'text-pink-500'}`}>
                            {remainingBalance === 0 
                              ? 'Capital Fully Allocated' 
                              : `Unallocated Capital: $${remainingBalance}`}
                          </div>
                          <div className="flex flex-col items-center">
                            <Button 
                              onClick={handleMasterDeploy}
                              disabled={!connected || remainingBalance !== 0}
                              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest px-8 h-14 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-20 disabled:grayscale transition-all w-full"
                            >
                              Auto-Route Capital
                            </Button>
                            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tight mt-1">
                              (Standard network gas fees apply)
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="font-mono text-[10px] text-cyan-400/70">
                        {`> SYSTEM RATIONALE: Capital heavily weighted toward Rank 1 APY. 3-point diversification applied to mitigate protocol-specific smart contract risk. User may override allocations below.`}
                      </p>
                    </div>
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
                                value={allocations[pool.pool] || 0}
                                onChange={(e) => handleManualAllocationChange(pool.pool, e.target.value)}
                                className="bg-slate-950/50 border-white/10 h-10 text-xs font-black text-white rounded-lg focus:border-pink-500 pr-8"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600">$</span>
                            </div>
                          </div>

                          <Button 
                            onClick={() => handleDeposit(pool.pool, pool.project, pool.apy, allocations[pool.pool] || 0)}
                            disabled={!connected || (allocations[pool.pool] || 0) <= 0}
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
                onDeploy={(name, apy, amount) => {
                  const pool = vaults.find(v => v.project === name);
                  if (pool) handleDeposit(pool.pool, name, apy, amount);
                }} 
                connected={connected} 
                formatTVL={formatTVL}
                allocations={allocations}
                onAllocationChange={handleManualAllocationChange}
              />
            </div>
          </>
        ) : (
          <PortfolioView 
            portfolio={portfolio} 
            onWithdraw={handleWithdrawAll} 
          />
        )}

        <div className="mt-24 text-slate-600 text-[10px] text-center max-w-3xl mx-auto pb-8 leading-relaxed font-medium uppercase tracking-widest">
          DISCLAIMER: Vyrr is currently in Testnet beta. No real funds are being deposited or routed. Cryptocurrency and DeFi yield farming involve substantial risk of loss. Vyrr Terminal is an interface, not a fund manager. By using this application, you acknowledge that you are fully responsible for your own capital and any resulting losses.
        </div>
      </div>
      
      <WaitlistModal 
        isOpen={showWaitlist} 
        onClose={() => setShowWaitlist(false)} 
      />
    </div>
  );
};

export default Dashboard;