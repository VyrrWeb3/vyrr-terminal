"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';

interface DeployButtonProps {
  onComplete: () => void;
  disabled?: boolean;
}

type DeployStatus = 'idle' | 'signing' | 'routing' | 'success';

const DeployButton = ({ onComplete, disabled }: DeployButtonProps) => {
  const [status, setStatus] = useState<DeployStatus>('idle');

  const handleDeploy = () => {
    if (disabled || status !== 'idle') return;

    // Transition to Phase 2: Signing
    setStatus('signing');
    
    // Phase 2 -> Phase 3: Routing (after 1.5s)
    setTimeout(() => {
      setStatus('routing');
      
      // Phase 3 -> Phase 4: Success (after 2s)
      setTimeout(() => {
        setStatus('success');
        onComplete();
        
        // Reset to idle after 5s so it can be used again
        setTimeout(() => setStatus('idle'), 5000);
      }, 2000);
    }, 1500);
  };

  const getButtonStyles = () => {
    switch (status) {
      case 'idle':
        return "bg-slate-900 border-2 border-transparent relative before:absolute before:-inset-1 before:bg-gradient-to-r before:from-pink-500 before:to-cyan-500 before:rounded-xl before:-z-10 before:blur-sm hover:before:blur-md hover:bg-slate-800/80 transition-all duration-300";
      case 'signing':
        return "bg-slate-800 border-2 border-yellow-500/50 animate-pulse shadow-[0_0_15px_rgba(234,179,8,0.2)]";
      case 'routing':
        return "bg-slate-900 border-2 border-transparent relative before:absolute before:-inset-1 before:bg-gradient-to-r before:from-pink-500 before:to-cyan-500 before:rounded-xl before:-z-10 before:animate-pulse before:blur-md";
      case 'success':
        return "bg-green-600 border-2 border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.4)]";
      default:
        return "";
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'idle':
        return (
          <div className="flex items-center justify-center gap-3">
            <Zap size={18} className="text-pink-400" />
            <span className="text-white font-black italic tracking-[0.2em]">[ DEPLOY ALL CAPITAL ]</span>
          </div>
        );
      case 'signing':
        return (
          <div className="flex items-center justify-center gap-3">
            <ShieldAlert size={18} className="text-yellow-400" />
            <span className="text-yellow-400 font-black italic tracking-widest">AWAITING WALLET SIGNATURE...</span>
          </div>
        );
      case 'routing':
        return (
          <div className="flex items-center justify-center gap-3">
            <Loader2 size={18} className="text-cyan-400 animate-spin" />
            <span className="text-cyan-400 font-black italic tracking-widest">ROUTING TO VAULTS...</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 size={20} className="text-white" />
            <span className="text-white font-black italic tracking-widest">✓ CAPITAL DEPLOYED</span>
          </div>
        );
    }
  };

  return (
    <button
      onClick={handleDeploy}
      disabled={disabled || status !== 'idle'}
      className={`w-full mt-6 h-16 rounded-xl font-mono text-sm uppercase transition-all duration-300 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed ${getButtonStyles()}`}
    >
      {getButtonContent()}
    </button>
  );
};

export default DeployButton;