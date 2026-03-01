"use client";

import { useState, useEffect } from 'react';

export interface LiveVault {
  id: string;
  project: string;
  symbol: string;
  chain: string;
  apy: number;
  tvlUsd: number;
  level: number;
}

export const useLiveYields = () => {
  const [vaults, setVaults] = useState<LiveVault[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatTVL = (val: number) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${val.toLocaleString()}`;
  };

  useEffect(() => {
    const fetchYields = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('https://yields.llama.fi/pools');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const json = await response.json();
        
        // Filter: Solana, USDC, TVL > $1M
        const filtered = json.data
          .filter((pool: any) => 
            pool.chain === 'Solana' && 
            pool.symbol === 'USDC' && 
            pool.tvlUsd > 1000000
          )
          // Sort: Highest APY first
          .sort((a: any, b: any) => b.apy - a.apy)
          // Top 3
          .slice(0, 3);

        const mappedVaults: LiveVault[] = filtered.map((pool: any, index: number) => ({
          id: pool.pool,
          project: pool.project.charAt(0).toUpperCase() + pool.project.slice(1),
          symbol: pool.symbol,
          chain: pool.chain,
          apy: pool.apy,
          tvlUsd: pool.tvlUsd,
          level: index + 1
        }));

        setVaults(mappedVaults);
      } catch (err) {
        console.error("Failed to fetch yields:", err);
        setError("Connection disrupted. Retrying uplink to the yield grid.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchYields();
  }, []);

  return { vaults, isLoading, error, formatTVL };
};