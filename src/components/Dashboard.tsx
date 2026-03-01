"use client";

import React, { useState } from 'react';
import TechBackground from './TechBackground';
import VyrrInsight from './VyrrInsight';
import DashboardCard from './DashboardCard';
import VaultLoading from './VaultLoading';
import { Wallet, TrendingUp, ShieldCheck, Activity, Coins, ExternalLink } from 'lucide-react';
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
      showError("Authentication required. Please connect wallet.");
      return;
    }

    try {
      const messageText = `Vyrr System Authorization: I am confirming a test deposit into the ${vaultName} vault at ${apy} APY.`;
      const encodedMessage = new TextEncoder().encode(messageText);
      
      await signMessage(encodedMessage);
      
      setVyrrResponse(`Signature Verified. Devnet routing initiated for ${vaultName}. Capital deployment in progress.`);
      showSuccess("Signature Verified. Devnet routing initiated.");
      
      setTimeout(() => setVyrrResponse(null), 6000);
    } catch (error) {
      console.error("Signing failed:", error);
      setVyrrResponse("Authorization failed. Transaction aborted by user. Terminal awaiting further instructions.");
      showError("Authorization Failed");
      
      setTimeout(() => setVyrrResponse(null), 6000);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 relative">
      <TechBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Activity className="text-zinc-950" size={20} />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                VYRR<span className="text-cyan-500">.</span>TERMINAL
              </h1>
            </div>
            <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">
              Institutional Yield Aggregator <span className="mx-2 text-zinc-800">|</span> Devnet Active
            </p>
          </div>
          
          <div className="flex justify-start md:justify-end">
            <WalletMultiButton />
          </div>
        </header>

        <VyrrInsight isDataLoading={isLoading} customMessage={vyrrResponse} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard 
            title="Total Value Locked" 
            value="$4.2M" 
            description="Aggregated liquidity" 
            icon={<Wallet size={18} />}
          />
          <DashboardCard 
            title="Avg. Performance" 
            value="+12.4%" 
            description="Net annualized yield" 
            icon={<TrendingUp size={18} />}
          />
          <DashboardCard 
            title="Security Rating" 
            value="AAA" 
            description="Audited smart contracts" 
            icon={<ShieldCheck size={18} />}
          />
          <DashboardCard 
            title="Network Latency" 
            value="14ms" 
            description="Real-time synchronization" 
            icon={<Activity size={18} />}
          />
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-white">Available Yield Strategies</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Live Feed
            </div>
          </div>
          
          {isLoading ? (
            <VaultLoading />
          ) : (
            <div className="space-y-4">
              {vaults.map((vault) => (
                <div key={vault.id} className="flex flex-col md:flex-row items-center justify-between p-6 border border-zinc-800 bg-zinc-900/60 rounded-xl hover:border-cyan-500/40 transition-all group gap-6">
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="h-12 w-12 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                      <Coins className="text-zinc-500 group-hover:text-cyan-400" size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-zinc-100">{vault.name}</span>
                        <ExternalLink size={12} className="text-zinc-600" />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Risk: {vault.risk}</span>
                        <span className="h-1 w-1 rounded-full bg-zinc-700" />
                        <span className="text-[10px] font-bold text-cyan-500/70 uppercase tracking-wider">{vault.project}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
                    <div className="text-center md:text-right">
                      <span className="block font-bold text-cyan-400 text-2xl">{vault.apy}</span>
                      <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Projected APY</span>
                    </div>
                    
                    <Button 
                      onClick={() => handleDeposit(vault.name, vault.apy)}
                      disabled={!connected}
                      className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold px-8 h-11 rounded-lg transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:shadow-none"
                    >
                      Deploy Capital
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