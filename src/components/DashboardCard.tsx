"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardCard = ({ title, value, description, icon }: DashboardCardProps) => {
  return (
    <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 group rounded-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-cyan-400 transition-colors font-mono">
          {title}
        </CardTitle>
        <div className="text-zinc-600 group-hover:text-cyan-500 transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-zinc-100 mb-1 font-mono tracking-tight">{value}</div>
        <p className="text-[10px] text-zinc-600 uppercase font-mono">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;