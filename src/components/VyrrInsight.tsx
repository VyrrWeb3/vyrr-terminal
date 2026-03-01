"use client";

import React from 'react';
import { Terminal, ShieldAlert, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
      return "SYSTEM: Vyrr terminal awaiting user uplink. Connect your wallet to access the grid.";
    }
    
    if (isDataLoading) {
      return "SCANNING: Intercepting Solana yield vectors. Synchronizing data streams...";
    }
    
    const address = publicKey?.toBase58();
    const truncated = address ? `${address.slice(0, 6)}...${address.slice(-6)}` : "NETRUNNER";
    
    return `UPLINK SECURED. Welcome, Netrunner [${truncated}]. Scanning the Solana grid for maximum yield...`;
  };

  return (
    <Card className="bg-zinc-900/80 border-zinc-800 backdrop-blur-md mb-8 overflow-hidden relative border-l-2 border-l-cyan-500 rounded-none">
      <CardContent className="p-4 flex items-start gap-4">
        <div className="bg-cyan-500/10 p-2 border border-cyan-500/20">
          {connected ? <Terminal className="text-cyan-400" size={20} /> : <ShieldAlert className="text-pink-500" size={20} />}
        </div>
        <div className="flex-1 font-mono">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500/60">Vyrr_OS v2.0.4</span>
            <span className="text-[10px] text-zinc-600">|</span>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${connected ? 'text-green-500' : 'text-pink-500'}`}>
              {connected ? "Online" : "Locked"}
            </span>
          </div>
          <p className="text-sm md:text-base text-zinc-200 leading-relaxed">
            <span className="text-cyan-500 mr-2 font-bold">{">_"}</span>
            {getVyrrMessage()}
            <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 animate-pulse align-middle" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VyrrInsight;