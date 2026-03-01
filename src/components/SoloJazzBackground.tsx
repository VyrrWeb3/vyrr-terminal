"use client";

import React from 'react';

interface SoloJazzBackgroundProps {
  isActive?: boolean;
}

const SoloJazzBackground = ({ isActive }: SoloJazzBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f0fdfa]">
      <svg 
        className={`absolute inset-0 w-full h-full opacity-40 transition-transform duration-700 ease-out ${isActive ? 'translate-x-4 scale-105' : 'translate-x-0 scale-100'}`} 
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="brush-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
        
        {/* Teal Swash */}
        <path 
          d="M-100,200 Q150,100 400,300 T900,100 T1400,400" 
          fill="none" 
          stroke="#0ea5e9" 
          strokeWidth="80" 
          strokeLinecap="round"
          filter="url(#brush-texture)"
          className="opacity-60"
        />
        
        {/* Purple Zig Zag */}
        <path 
          d="M-50,600 L200,450 L450,650 L700,400 L1000,600 L1300,350" 
          fill="none" 
          stroke="#a855f7" 
          strokeWidth="40" 
          strokeLinecap="round"
          filter="url(#brush-texture)"
          className="opacity-50"
        />

        {/* Accent Swashes */}
        <path 
          d="M800,800 Q1000,700 1200,900" 
          fill="none" 
          stroke="#0ea5e9" 
          strokeWidth="60" 
          strokeLinecap="round"
          filter="url(#brush-texture)"
          className="opacity-40"
        />
      </svg>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
    </div>
  );
};

export default SoloJazzBackground;