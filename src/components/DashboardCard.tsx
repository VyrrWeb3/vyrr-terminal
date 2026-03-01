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
    <Card className="glass-card border-none rounded-2xl overflow-hidden group transition-all duration-300 hover:translate-y-[-4px]">
      <div className="h-1 w-full bg-gradient-to-r from-pink-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-pink-400 transition-colors">
          {title}
        </CardTitle>
        <div className="text-slate-500 group-hover:text-cyan-400 transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black text-white mb-1 tracking-tight italic">
          {value}
        </div>
        <p className="text-xs font-medium text-slate-500">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;