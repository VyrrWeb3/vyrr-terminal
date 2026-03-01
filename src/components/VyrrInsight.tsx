"use client";

import React from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const VyrrInsight = () => {
  // Placeholder data for Solana yield
  const yieldData = 12.4;
  
  const get90sInsight = (val: number) => {
    if (val > 10) return `Cowabunga! This vault is juiced by ${val}% today! Totally radical gains!`;
    if (val > 5) return `As if! We're cruising at ${val}% yield. Talk to the hand, bears!`;
    return `Chill out, we're vibing at ${val}%. It's all good in the hood!`;
  };

  return (
    <Card className="bg-black text-white border-4 border-primary shadow-[8px_8px_0px_0px_rgba(14,165,233,0.5)] mb-8 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <Zap className="text-yellow-400 animate-pulse" size={32} />
      </div>
      <CardContent className="p-6 flex items-center gap-4">
        <div className="bg-primary p-3 rounded-full">
          <Sparkles className="text-white" />
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Vyrr Insight AI v1.0</h3>
          <p className="text-xl font-black italic tracking-tight">
            "{get90sInsight(yieldData)}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VyrrInsight;