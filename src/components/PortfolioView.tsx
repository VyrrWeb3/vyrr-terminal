"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Coins, TrendingUp, LogOut, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioItem {
  poolId: string;
  project: string;
  amount: number;
  apy: number;
  timestamp: number;
}

interface PortfolioViewProps {
  portfolio: PortfolioItem[];
  onWithdraw: () => void;
}

const PortfolioView = ({ portfolio, onWithdraw }: PortfolioViewProps) => {
  const [simulatedEarnings, setSimulatedEarnings] = useState(0);

  const totalTVL = useMemo(() => {
    return portfolio.reduce((acc, item) => acc + item.amount, 0);
  }, [portfolio]);

  useEffect(() => {
    if (portfolio.length === 0) return;

    const interval = setInterval(() => {
      setSimulatedEarnings(prev => {
        // Calculate incremental gain across all positions
        const increment = portfolio.reduce((acc, item) => {
          const perSecondYield = (item.amount * (item.apy / 100)) / (365 * 24 * 60 * 60);
          return acc + perSecondYield;
        }, 0);
        return prev + (increment / 10); // Update every 100ms
      }, 0.00000001);
    }, 100);

    return () => clearInterval(interval);
  }, [portfolio]);

  if (portfolio.length === 0) {
    return (
      <div className="glass-card p-20 rounded-3xl text-center space-y-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-slate-900 flex items-center justify-center border border-white/5">
          <Coins className="text-slate-700" size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black italic text-white uppercase tracking-widest">Grid Empty.</h3>
          <p className="text-slate-500 font-medium">No active capital detected on the Solana Yield Grid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TVL Hero */}
        <div className="lg:col-span-2 glass-card p-10 rounded-3xl border-l-4 border-l-cyan-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp size={120} className="text-cyan-400" />
          </div>
          <div className="space-y-6 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Total Value Locked (USDC)</span>
            <div className="text-7xl md:text-8xl font-black italic text-cyan-400 text-glow-cyan tracking-tighter">
              ${totalTVL.toLocaleString()}
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Protocol-wide optimization active</p>
            </div>
          </div>
        </div>

        {/* Real-time Earnings */}
        <div className="glass-card p-10 rounded-3xl border-l-4 border-l-pink-500 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Live Grid Earnings</span>
            <div className="text-4xl font-black italic text-pink-500 tracking-tight">
              +${simulatedEarnings.toFixed(8)}
            </div>
          </div>
          <div className="pt-6">
            <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed">
              Earnings are accrued per-block and automatically compounded into your principal.
            </p>
          </div>
        </div>
      </div>

      {/* Active Positions */}
      <div className="space-y-6">
        <h3 className="text-xl font-black italic text-white uppercase tracking-[0.2em] px-2">Active Vectors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.map((item) => (
            <div key={item.poolId} className="glass-card p-6 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-white italic uppercase">{item.project}</span>
                  <div className="h-1 w-1 bg-slate-700 rounded-full" />
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{item.apy.toFixed(2)}% APY</span>
                </div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-tighter">Deployed Principal: ${item.amount}</p>
              </div>
              <ArrowUpRight className="text-slate-700 group-hover:text-cyan-400 transition-colors" size={24} />
            </div>
          ))}
        </div>
      </div>

      {/* Exit Control */}
      <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
        <Button 
          onClick={onWithdraw}
          className="bg-red-500/10 border border-red-500/50 hover:bg-red-500 hover:text-white text-red-500 font-black text-xs uppercase tracking-[0.3em] h-16 px-12 rounded-2xl transition-all neon-glow-red group"
        >
          <LogOut className="mr-3 group-hover:-translate-x-1 transition-transform" size={18} />
          Withdraw All Capital
        </Button>
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">
          Initiating withdrawal will terminate all yield-bearing vectors immediately.
        </p>
      </div>
    </div>
  );
};

export default PortfolioView;