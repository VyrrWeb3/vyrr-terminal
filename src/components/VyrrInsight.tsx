"use client";

import React from 'react';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

interface VyrrInsightProps {
  isDataLoading?: boolean;
  customMessage?: string | null;
}

const VyrrInsight = ({ isDataLoading, customMessage }: VyrrInsightProps) => {
  const { publicKey, connected } = useWallet();
  
  const getVyrrMessage = () => {
    if (customMessage) return customMessage;
    
    if (!connected) {
      return "Vyrr is standing by. Connect your wallet to access the high-yield grid and start optimizing your capital.";
    }
    
    if (isDataLoading) {
      return "Scanning the Solana ecosystem... I'm intercepting the most profitable yield vectors for you right now.";
    }
    
    const address = publicKey?.toBase58();
    const truncated = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "Partner";
    
    return `Welcome back, ${truncated}. The grid is live and I've identified several high-performance vaults for your deployment.`;
  };

  return (
    <div className="relative mb-12 group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative glass-card rounded-2xl p-6 flex items-center gap-6">
        <div className="flex-shrink-0">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-500 to-cyan-500 p-[2px] neon-glow-pink">
            <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
              <Sparkles className="text-pink-400" size={24} />
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">Vyrr Intelligence</span>
            <div className="h-1 w-1 rounded-full bg-slate-700" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {connected ? "Active Uplink" : "System Standby"}
            </span>
          </div>
          <p className="text-lg font-medium text-slate-100 leading-snug">
            {getVyrrMessage()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VyrrInsight;