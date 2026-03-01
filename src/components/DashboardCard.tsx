"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
}

const DashboardCard = ({ title, value, description, icon, color = 'primary' }: DashboardCardProps) => {
  const colorClasses = {
    primary: "border-primary shadow-[4px_4px_0px_0px_rgba(14,165,233,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(14,165,233,0.5)]",
    secondary: "border-secondary shadow-[4px_4px_0px_0px_rgba(168,85,247,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(168,85,247,0.5)]",
    accent: "border-accent shadow-[4px_4px_0px_0px_rgba(244,114,182,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(244,114,182,0.5)]"
  };

  return (
    <Card className={cn(
      "transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1 border-4 bg-white/80 backdrop-blur-sm",
      colorClasses[color]
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-lg",
          color === 'primary' ? "bg-primary/10 text-primary" : 
          color === 'secondary' ? "bg-secondary/10 text-secondary" : "bg-accent/10 text-accent"
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black mb-1">{value}</div>
        <p className="text-xs font-medium text-muted-foreground italic">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;