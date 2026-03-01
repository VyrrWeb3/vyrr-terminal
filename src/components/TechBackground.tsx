"use client";

import React from 'react';

const TechBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 tech-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
    </div>
  );
};

export default TechBackground;