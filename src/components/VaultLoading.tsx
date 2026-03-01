"use client";

import React from 'react';

const VaultLoading = () => {
  return (
    <div className="p-16 glass-card rounded-3xl flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-4 border-pink-500/10 border-t-pink-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-cyan-500/10 animate-pulse" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white tracking-widest uppercase">
          Scanning Solana Liquidity Grid...
        </h3>
        <p className="text-sm font-medium text-slate-500">
          Intercepting real-time yield vectors from the ecosystem.
        </p>
      </div>
    </div>
  );
};

export default VaultLoading;