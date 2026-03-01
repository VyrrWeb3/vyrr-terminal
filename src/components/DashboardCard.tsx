"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardCard = ({ title, value, description, icon }: DashboardCardProps) => {
  return (
    <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-zinc-900/60 group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-cyan-500/70 transition-colors">
          {title}
        </CardTitle>
        <div className="text-zinc-500 group-hover:text-cyan-400 transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold text-zinc-100 mb-1">{value}</div>
        <p className="text-xs text-zinc-500">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;