"use client";

import React from 'react';
import { Sparkles, Zap, Ghost } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';

const VyrrInsight = () => {
  const { publicKey, connected } = useWallet();
  const yieldData = 12.4;
  
  const getVyrrtyMessage = () => {
    if (!connected) {
      return "Yo! I'm Vyrrty. Connect your Game Boy... I mean, Phantom Wallet, so we can start grinding some XP.";
    }
    
    const address = publicKey?.toBase58();
    const truncated = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "User";
    
    return `System Check: SUCCESS! Welcome back, ${truncated}. Ready to harvest some yield?`;
  };

  return (
    <Card className="bg-black text-white border-4 border-primary shadow-[8px_8px_0px_0px_rgba(14,165,233,0.5)] mb-8 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <Zap className="text-yellow-400 animate-pulse" size={32} />
      </div>
      <CardContent className="p-6 flex items-center gap-4">
        <div className="bg-primary p-3 rounded-full">
          {connected ? <Sparkles className="text-white" /> : <Ghost className="text-white" />}
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Vyrrty AI v1.0 {connected ? "[ONLINE]" : "[OFFLINE]"}
          </h3>
          <p className="text-xl font-black italic tracking-tight">
            "{getVyrrtyMessage()}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VyrrInsight;