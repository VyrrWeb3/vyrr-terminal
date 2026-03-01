"use client";

import React, { useState, useEffect } from 'react';

const VaultLoading = () => {
  const [text, setText] = useState('Establishing dial-up connection...');
  
  useEffect(() => {
    const texts = [
      'Dialing up server...',
      'Handshaking...',
      'Establishing dial-up connection...',
      'Downloading yield data...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setText(texts[i]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 border-4 border-dashed border-black bg-white/30 flex flex-col items-center justify-center gap-4">
      <div className="font-mono text-lg font-bold flex items-center">
        {text}
        <span className="animate-pulse ml-1">_</span>
      </div>
      <div className="w-full max-w-xs bg-gray-200 h-4 border-2 border-black overflow-hidden">
        <div className="bg-primary h-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '30%' }} />
      </div>
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};

export default VaultLoading;