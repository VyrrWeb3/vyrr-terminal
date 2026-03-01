"use client";

import React, { useState } from 'react';
import SoloJazzBackground from './SoloJazzBackground';
import CRTEffect from './CRTEffect';
import VyrrInsight from './VyrrInsight';
import DashboardCard from './DashboardCard';
import VaultLoading from './VaultLoading';
import { Wallet, TrendingUp, ShieldCheck, Activity, Coins } from 'lucide-react';
import { MadeWithDyad } from "./made-with-dyad";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useVaultData } from '@/hooks/useVaultData';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { showError, showSuccess } from '@/utils/toast';

const Dashboard = () => {
  const { vaults, isLoading } = useVaultData();
  const { connected, publicKey, signMessage } = useWallet();
  const [vyrrResponse, setVyrrResponse] = useState<string | null>(null);

  const handleDeposit = async (vaultName: string, apy: string) => {
    if (!publicKey || !signMessage) {
      showError("Whoa! Connect your wallet first, dude!");
      return;
    }

    try {
      const messageText = `Vyrr System Authorization: I am confirming a test deposit into the ${vaultName} vault at ${apy} APY.`;
      const encodedMessage = new TextEncoder().encode(messageText);
      
      await signMessage(encodedMessage);
      
      setVyrrResponse(`COWABUNGA! Signature confirmed. Vyrr is now routing your loot to the ${vaultName} vault!`);
      showSuccess("Deposit Authorized!");
      
      setTimeout(() => setVyrrResponse(null), 5000);
    } catch (error) {
      console.error("Signing failed:", error);
      setVyrrResponse("Bummer! Transaction canceled. Let me know when you are ready to drop a coin.");
      showError("Transaction Canceled");
      
      setTimeout(() => setVyrrResponse(null), 5000);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <SoloJazzBackground isActive={connected} />
      <CRTEffect />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-block bg-black text-white px-4 py-1 mb-4 transform -skew-x-12 border-r-8 border-accent">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase">Solana Yield Aggregator</h2>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-black drop-shadow-[4px_4px_0px_#0ea5e9]">
              VYRR<span className="text-primary">.</span>DASH
            </h1>
            <p className="text-lg font-bold text-muted-foreground mt-2 italic">
              High-Speed Yield. No Lag.
            </p>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <div className="wallet-button-container">
              <WalletMultiButton />
            </div>
          </div>
        </header>

        <VyrrInsight isDataLoading={isLoading} customMessage={vyrrResponse} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard 
            title="Total Value" 
            value="$4.2M" 
            description="Hella liquidity, dude!" 
            icon={<Wallet size={20} />}
            color="primary"
          />
          <DashboardCard 
            title="Daily Yield" 
            value="+12.4%" 
            description="To the moon and back!" 
            icon={<TrendingUp size={20} />}
            color="secondary"
          />
          <DashboardCard 
            title="Vault Safety" 
            value="A+" 
            description="Safe as a floppy disk." 
            icon={<ShieldCheck size={20} />}
            color="accent"
          />
          <DashboardCard 
            title="Network Load" 
            value="Low" 
            description="Smooth like a dial-up tone." 
            icon={<Activity size={20} />}
            color="primary"
          />
        </div>

        <div className="bg-white/50 backdrop-blur-md border-4 border-black p-8 rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
          <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Active Vaults</h3>
          
          {isLoading ? (
            <VaultLoading />
          ) : (
            <div className="space-y-4">
              {vaults.map((vault) => (
                <div key={vault.id} className="flex flex-col md:flex-row items-center justify-between p-6 border-2 border-black bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group gap-4">
                  <div className="flex flex-col text-center md:text-left">
                    <span className="font-black text-xl uppercase">{vault.name}</span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Risk Level: {vault.risk}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto">
                    <div className="text-center md:text-right">
                      <span className="block font-black text-primary text-2xl">{vault.apy} APY</span>
                      <span className="text-[10px] font-bold uppercase text-accent">{vault.status}</span>
                    </div>
                    
                    <Button 
                      onClick={() => handleDeposit(vault.name, vault.apy)}
                      disabled={!connected}
                      className={`w-full md:w-auto font-black uppercase tracking-tighter border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ${
                        connected 
                        ? 'bg-accent hover:bg-accent/90 text-black' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Coins className="mr-2 h-4 w-4" />
                      {connected ? 'Insert Coin (Deposit)' : 'Connect to Play'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-20 pb-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Dashboard;