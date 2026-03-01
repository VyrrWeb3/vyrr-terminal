"use client";

import React, { useState, useEffect } from 'react';

const VaultLoading = () => {
  const [text, setText] = useState('INITIALIZING_UPLINK');
  
  useEffect(() => {
    const texts = [
      'ACCESSING_SOLANA_RPC',
      'DECRYPTING_POOLS',
      'BYPASSING_FIREWALLS',
      'OPTIMIZING_STREAMS'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setText(texts[i]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-12 border border-zinc-800 bg-zinc-900/40 rounded-none flex flex-col items-center justify-center gap-6 font-mono">
      <div className="text-xs text-cyan-500/80 flex items-center tracking-[0.3em]">
        <span className="mr-2">{">"}</span>
        {text}
        <span className="animate-pulse ml-1">_</span>
      </div>
      <div className="w-full max-w-xs bg-zinc-800 h-[2px] overflow-hidden">
        <div className="bg-cyan-500 h-full animate-[scan_2s_linear_infinite]" style={{ width: '30%' }} />
      </div>
      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
};

export default VaultLoading;