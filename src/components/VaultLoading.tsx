"use client";

import React, { useState, useEffect } from 'react';

const VaultLoading = () => {
  const [text, setText] = useState('Initializing secure handshake...');
  
  useEffect(() => {
    const texts = [
      'Accessing Solana RPC...',
      'Decrypting yield pools...',
      'Initializing secure handshake...',
      'Optimizing data streams...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setText(texts[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-12 border border-zinc-800 bg-zinc-900/20 rounded-xl flex flex-col items-center justify-center gap-6">
      <div className="font-mono text-sm text-cyan-500/80 flex items-center tracking-wider">
        {text}
        <span className="animate-pulse ml-1">_</span>
      </div>
      <div className="w-full max-w-xs bg-zinc-800 h-1 rounded-full overflow-hidden">
        <div className="bg-cyan-500 h-full animate-[progress_1.5s_ease-in-out_infinite]" style={{ width: '40%' }} />
      </div>
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default VaultLoading;