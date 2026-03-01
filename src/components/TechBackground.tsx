"use client";

import React from 'react';

const TechBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 digital-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/50 to-zinc-950" />
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 animate-pulse" />
    </div>
  );
};

export default TechBackground;