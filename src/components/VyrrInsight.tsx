"use client";

import React from 'react';
import { Terminal, Cpu, ShieldCheck, Activity } from 'lucide-react';
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
      return "Vyrr Terminal Standby. Please establish a secure wallet connection to begin yield optimization.";
    }
    
    if (isDataLoading) {
      return "Synchronizing with Solana mainnet... Intercepting real-time yield vectors.";
    }
    
    const address = publicKey?.toBase58();
    const truncated = address ? `${address.slice(0, 6)}...${address.slice(-6)}` : "Authorized User";
    
    return `Secure connection established. Welcome, ${truncated}. Vyrr Terminal is online and monitoring high-efficiency vaults.`;
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl mb-8 overflow-hidden relative group border-l-4 border-l-cyan-500">
      <CardContent className="p-6 flex items-start gap-5">
        <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
          {connected ? <Terminal className="text-cyan-400" size={24} /> : <Cpu className="text-zinc-500" size={24} />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500/70">System Status</span>
            <div className={`h-1.5 w-1.5 rounded-full ${connected ? 'bg-cyan-500 animate-pulse' : 'bg-zinc-700'}`} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              {connected ? "Vyrr AI v2.0 [ENCRYPTED]" : "Vyrr AI v2.0 [LOCKED]"}
            </span>
          </div>
          <p className="text-lg font-medium text-zinc-200 leading-relaxed font-mono">
            {getVyrrMessage()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VyrrInsight;