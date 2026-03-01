"use client";

import { useState, useEffect } from 'react';

export interface Vault {
  id: string;
  name: string;
  apy: string;
  risk: 'Low' | 'Medium' | 'High';
  level: number;
  status: string;
  project: string;
}

export const useVaultData = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchYields = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://yields.llama.fi/pools');
        const json = await response.json();
        
        // Filter for Solana USDC pools
        const solanaUsdcPools = json.data
          .filter((pool: any) => pool.chain === 'Solana' && pool.symbol === 'USDC')
          .sort((a: any, b: any) => b.apy - a.apy)
          .slice(0, 3);

        const mappedVaults: Vault[] = solanaUsdcPools.map((pool: any, index: number) => ({
          id: pool.pool,
          name: `Level ${index + 1}: ${pool.project}`,
          apy: `${pool.apy.toFixed(2)}%`,
          risk: index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low',
          level: index + 1,
          status: index === 0 ? 'Juiced' : index === 1 ? 'Radical' : 'Chill',
          project: pool.project
        }));

        setVaults(mappedVaults);
      } catch (error) {
        console.error("Failed to fetch yields:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchYields();
  }, []);

  return { vaults, isLoading };
};