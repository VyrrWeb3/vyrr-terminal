"use client";

import React from 'react';

const CRTEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div className="absolute inset-0 crt-scanlines opacity-20" />
      <div className="absolute inset-0 crt-flicker bg-white/5 mix-blend-overlay" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
    </div>
  );
};

export default CRTEffect;