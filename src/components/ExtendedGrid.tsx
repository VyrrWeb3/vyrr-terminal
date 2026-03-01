"use client";

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ExtendedGridProps {
  vaults: any[];
  onDeploy: (name: string, apy: number, amount: number) => void;
  connected: boolean;
  formatTVL: (val: number) => string;
  allocations: Record<string, number>;
  onAllocationChange: (poolId: string, value: string) => void;
}

const ExtendedGrid = ({ 
  vaults, 
  onDeploy, 
  connected, 
  formatTVL, 
  allocations, 
  onAllocationChange 
}: ExtendedGridProps) => {
  if (vaults.length === 0) return null;

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-[2px] w-12 bg-pink-500" />
        <h3 className="text-xl font-black italic text-white uppercase tracking-[0.2em] text-glow">
          The Extended Grid
        </h3>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-pink-500/50 to-transparent" />
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border-white/5 bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Rank</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Protocol</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">TVL</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">APY</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center w-32">Allocation</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {vaults.map((pool, index) => (
                <tr key={pool.pool} className="group hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-slate-500 group-hover:text-pink-500 transition-colors">
                      #{index + 4}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200 uppercase tracking-tight text-sm">
                        {pool.project}
                      </span>
                      <ExternalLink size={12} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-400">
                      {formatTVL(pool.tvlUsd)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-black text-cyan-400 italic text-sm">
                      {pool.apy.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative max-w-[100px] mx-auto">
                      <Input 
                        type="number"
                        value={allocations[pool.pool] || 0}
                        onChange={(e) => onAllocationChange(pool.pool, e.target.value)}
                        className="bg-slate-950/50 border-white/10 h-8 text-[10px] font-black text-white rounded-lg focus:border-pink-500 text-center pr-4"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600">$</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      onClick={() => onDeploy(pool.project, pool.apy, allocations[pool.pool] || 0)}
                      disabled={!connected || (allocations[pool.pool] || 0) <= 0}
                      size="sm"
                      className="bg-transparent border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 font-black text-[10px] uppercase tracking-widest px-4 h-8 rounded-lg transition-all disabled:opacity-20"
                    >
                      Deploy
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExtendedGrid;