"use client";

import React, { useState } from 'react';
import TechBackground from './TechBackground';
import VyrrInsight from './VyrrInsight';
import DashboardCard from './DashboardCard';
import VaultLoading from './VaultLoading';
import { Wallet, TrendingUp, ShieldCheck, Activity, Coins, ExternalLink, Terminal } from 'lucide-react';
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
      showError("UPLINK_REQUIRED: Connect wallet to proceed.");
      return;
    }

    try {
      setVyrrResponse(`EXECUTING OVERRIDE. Sign the transaction to route your funds into the ${vaultName} vault.`);
      
      const messageText = `Vyrr System Authorization: I am confirming a test deposit into the ${vaultName} vault at ${apy} APY.`;
      const encodedMessage = new TextEncoder().encode(messageText);
      
      await signMessage(encodedMessage);
      
      setVyrrResponse(`SUCCESS: Signature verified. Devnet routing initiated for ${vaultName}. Capital deployment in progress.`);
      showSuccess("Signature Verified. Devnet routing initiated.");
      
      setTimeout(() => setVyrrResponse(null), 6000);
    } catch (error) {
      console.error("Signing failed:", error);
      setVyrrResponse("ERROR: Authorization failed. Transaction aborted by user. Terminal awaiting instructions.");
      showError("Authorization Failed");
      
      setTimeout(() => setVyrrResponse(null), 6000);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-12 relative">
      <TechBackground />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="font-mono">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-6 w-6 bg-cyan-500 flex items-center justify-center">
                <Terminal className="text-zinc-950" size={14} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
                Vyrr<span className="text-cyan-500">_</span>Terminal
              </h1>
            </div>
            <p className="text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase">
              Yield_Aggregator_v2.0 <span className="mx-2 text-zinc-800">|</span> Devnet_Active
            </p>
          </div>
          
          <div className="flex justify-start md:justify-end">
            <WalletMultiButton />
          </div>
        </header>

        <VyrrInsight isDataLoading={isLoading} customMessage={vyrrResponse} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <DashboardCard 
            title="Total_Value_Locked" 
            value="$4.2M" 
            description="Aggregated_Liquidity" 
            icon={<Wallet size={16} />}
          />
          <DashboardCard 
            title="Avg_Performance" 
            value="+12.4%" 
            description="Net_Annual_Yield" 
            icon={<TrendingUp size={16} />}
          />
          <DashboardCard 
            title="Security_Rating" 
            value="AAA" 
            description="Audited_Contracts" 
            icon={<ShieldCheck size={16} />}
          />
          <DashboardCard 
            title="Network_Latency" 
            value="14ms" 
            description="Real_Time_Sync" 
            icon={<Activity size={16} />}
          />
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-6 md:p-8 rounded-none backdrop-blur-md">
          <div className="flex items-center justify-between mb-8 font-mono">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Available_Yield_Strategies</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              <div className="h-1.5 w-1.5 bg-green-500 animate-pulse" />
              Live_Feed
            </div>
          </div>
          
          {isLoading ? (
            <VaultLoading />
          ) : (
            <div className="space-y-3">
              {vaults.map((vault) => (
                <div key={vault.id} className="flex flex-col md:flex-row items-center justify-between p-5 border border-zinc-800 bg-zinc-900/60 rounded-none hover:border-cyan-500/40 transition-all group gap-6 font-mono">
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="h-10 w-10 border border-zinc-800 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                      <Coins className="text-zinc-600 group-hover:text-cyan-400" size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-zinc-100 uppercase tracking-tight">{vault.name}</span>
                        <ExternalLink size={10} className="text-zinc-700" />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Risk: {vault.risk}</span>
                        <span className="text-[9px] font-bold text-cyan-500/60 uppercase tracking-widest">{vault.project}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
                    <div className="text-center md:text-right">
                      <span className="block font-bold text-cyan-400 text-xl">{vault.apy}</span>
                      <span className="text-[9px] font-bold uppercase text-zinc-600 tracking-widest">Projected_APY</span>
                    </div>
                    
                    <Button 
                      onClick={() => handleDeposit(vault.name, vault.apy)}
                      disabled={!connected}
                      className="w-full md:w-auto bg-transparent border border-cyan-500/50 hover:bg-cyan-500 hover:text-zinc-950 text-cyan-400 font-bold text-xs uppercase tracking-widest px-6 h-10 rounded-none transition-all glow-cyan-hover disabled:opacity-30 disabled:border-zinc-800 disabled:text-zinc-600 disabled:shadow-none"
                    >
                      Deploy_Capital
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