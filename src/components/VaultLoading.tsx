"use client";

import React, { useState, useEffect } from 'react';

const VaultLoading = () => {
  const [text, setText] = useState('Synchronizing Grid');
  
  useEffect(() => {
    const texts = [
      'Accessing Solana Pools',
      'Optimizing Yield Vectors',
      'Securing Handshake',
      'Finalizing Uplink'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setText(texts[i]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-16 glass-card rounded-2xl flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-cyan-500/20 animate-pulse" />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-black italic text-white mb-2 uppercase tracking-tight">{text}</h3>
        <p className="text-sm font-medium text-slate-500">Please wait while Vyrr prepares your dashboard...</p>
      </div>
    </div>
  );
};

export default VaultLoading;