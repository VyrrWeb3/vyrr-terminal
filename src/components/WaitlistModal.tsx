"use client";

import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWallet } from '@solana/wallet-adapter-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const { publicKey } = useWallet();

  if (!isOpen) return null;

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const FORM_ID = '1FAIpQLSfeLxY1k66UnrxcSJ6fS3SwjcDYOCvFGO7KOAOzg2aTvoDyPg';
    const EMAIL_ENTRY = 'entry.1740249184';
    const WALLET_ENTRY = 'entry.1375079808';
    const walletAddress = publicKey ? publicKey.toString() : 'Not connected';

    // Construct the URL with our data using template literals for proper formatting
    const submitUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse?${EMAIL_ENTRY}=${encodeURIComponent(email)}&${WALLET_ENTRY}=${encodeURIComponent(walletAddress)}&submit=Submit`;

    // Create a hidden iframe to "visit" the URL in the background
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = submitUrl;
    document.body.appendChild(iframe);

    // Give it a second to "land" then show the success UI and cleanup
    setTimeout(() => {
      setJoined(true);
      document.body.removeChild(iframe);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative glass-card bg-slate-900 border border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.2)] rounded-3xl p-8 max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Decorative Grid Background for Modal */}
        <div className="absolute inset-0 arcade-grid opacity-10 pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        {!joined ? (
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-lg flex items-center justify-center neon-glow-pink">
                <Sparkles className="text-white" size={18} />
              </div>
              <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter text-glow">
                Uplink Secured.
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-slate-300 font-medium leading-relaxed">
                Testnet signature verified. Mainnet deployment is highly restricted to protect vault liquidity. 
              </p>
              <p className="text-slate-400 text-sm font-medium">
                Enter your transmission relay (email) to request Level 1 access.
              </p>
            </div>

            <form onSubmit={handleJoinWaitlist} className="space-y-4">
              <Input
                type="email"
                placeholder="NETRUNNER@PROTOCOL.VYRR"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-950 border border-cyan-500/30 text-white placeholder:text-slate-700 h-12 rounded-xl focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm font-bold uppercase tracking-widest"
              />
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-[0.2em] h-12 rounded-xl transition-all shadow-lg shadow-pink-500/20 group"
              >
                <span>Secure Access</span>
                <Send size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 text-center py-4 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto h-16 w-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="text-cyan-400" size={32} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-black italic text-cyan-400 uppercase tracking-tight">
                Transmission Received.
              </h3>
              <p className="text-slate-400 font-medium text-sm leading-relaxed px-4">
                You are on the grid. We will contact you when the Mainnet vaults open.
              </p>
            </div>

            <Button 
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black text-[10px] uppercase tracking-[0.3em] h-10 rounded-xl transition-all"
            >
              Close Terminal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;