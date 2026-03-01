"use client";

import { useState, useEffect } from 'react';

export interface Vault {
  id: string;
  name: string;
  apy: string;
  risk: 'Low' | 'Medium' | 'High';
  level: number;
  status: string;
}

export const useVaultData = () => {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVaults([
        { id: '1', name: 'Level 1: Safe', apy: '5.2%', risk: 'Low', level: 1, status: 'Chill' },
        { id: '2', name: 'Level 2: Growth', apy: '8.4%', risk: 'Medium', level: 2, status: 'Radical' },
        { id: '3', name: 'Level 3: Radical', apy: '14.1%', risk: 'High', level: 3, status: 'Juiced' },
      ]);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return { vaults, isLoading };
};