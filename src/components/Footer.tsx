"use client";

import React from 'react';
import { Sparkles, Twitter, Github, MessageSquare, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-cyan-500/30 bg-[#0f172a] overflow-hidden">
      {/* Subtle Scanline Overlay for Footer */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-lg flex items-center justify-center neon-glow-pink">
                <Sparkles className="text-white" size={18} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white italic uppercase">
                Vyrr<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-sm font-medium text-slate-400 leading-relaxed">
              Automated yield routing for the next generation of capital. Optimized for performance, secured by architecture.
            </p>
          </div>

          {/* Column 2: Protocol */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Protocol</h4>
            <ul className="space-y-4">
              {['Yield Grid', 'Performance', 'Risk Disclosure', 'System Status'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-bold text-slate-500 hover:text-white transition-colors flex items-center gap-2 group">
                    {item}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Support</h4>
            <ul className="space-y-4">
              {['Documentation', 'Security Audits', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-bold text-slate-500 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Social Transmission</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="h-10 w-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="h-10 w-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Bar */}
        <div className="pt-8 border-t border-white/5 space-y-8">
          <p className="text-[10px] font-medium text-slate-600 leading-relaxed uppercase tracking-wider text-center lg:text-left">
            Vyrr is a non-custodial software interface. We do not control your funds, provide financial advice, or guarantee returns. Standard network gas fees apply. Use of this terminal signifies acceptance of our Terms of Service.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              © 2026 Vyrr Protocol. All Rights Reserved.
            </div>
            
            <div className="flex items-center gap-3 bg-slate-950/50 px-4 py-2 rounded-full border border-white/5">
              <div className="relative flex h-2 w-2">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></div>
                <div className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;