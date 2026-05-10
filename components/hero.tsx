'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export function Hero() {
  const [registeredTeams, setRegisteredTeams] = useState(0);
  const totalSlots = 25;
  const supabase = createClient();

  useEffect(() => {
    const fetchTeamCount = async () => {
      const { count, error } = await supabase
        .from('tournament_registrations')
        .select('*', { count: 'exact', head: true });
      
      if (!error && count !== null) {
        setRegisteredTeams(count);
      }
    };

    fetchTeamCount();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tournament_registrations',
        },
        () => {
          // Increment the count locally when a new row is inserted
          setRegisteredTeams((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleJoinDrop = () => {
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-black pt-20">
      {/* Top ticker */}
      <div className="absolute top-0 left-0 right-0 bg-black border-b border-red-600 py-3 overflow-hidden">
        <div className="text-red-600 text-sm font-mono whitespace-nowrap flex items-center gap-4 px-4">
          <span className="text-white font-bold">ULTIMATE SURVIVAL SERIES</span>
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          <span>BGMI • FREE FIRE INVITATIONAL</span>
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          <span>PRIZE POOL ₹40,000</span>
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          <span>TEAMS {registeredTeams} / {totalSlots}</span>
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          <span>15-18 TEAMS PER LOBBY</span>
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          <span>{registeredTeams >= totalSlots ? 'SLOTS LOCKED' : 'SLOTS OPEN'}</span>
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          <span>SANGAMNER - MH - IN</span>
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          <span>// LIVE_OPS - USS</span>
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          <span>BGMI...</span>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 opacity-0 animate-slide-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <span className="bg-red-600 text-white px-4 py-1 font-bold text-sm hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300">SEASON 04</span>
                <span className="text-red-600 font-mono text-sm">// BGMI • FREE FIRE</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none opacity-0 animate-slide-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                ULTIMATE<br /><span className="text-red-600 relative inline-block">SURVIVAL SERIES<span className="absolute bottom-0 left-0 w-full h-1 bg-red-600 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span></span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-white font-bold opacity-0 animate-slide-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>ESPORT <span className="text-gray-500">TOURNAMENT</span></p>

              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-md opacity-0 animate-slide-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                The official Ultimate Survival Series. Drop in, survive, dominate. 25 squads competing. Two battle royales. One massive prize pool.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleJoinDrop}
                className="relative bg-red-600 hover:bg-red-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 uppercase tracking-wide overflow-hidden group text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:scale-110">
                  <span className="hidden sm:inline">JOIN THE DROP</span>
                  <span className="sm:hidden">JOIN</span> <span className="text-lg">➜</span>
                </span>
                {/* Pulse effect background */}
                <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-30 animate-pulse"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500"></div>
                </div>
              </button>
              <button
                onClick={() => document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative border-2 border-gray-600 text-white hover:border-red-600 hover:text-red-600 font-bold px-8 py-4 uppercase tracking-wide transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">READ THE RULES</span>
                {/* Hover background animation */}
                <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10"></div>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-800 opacity-0 animate-slide-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <div className="hover:border-l-2 hover:border-red-600 hover:pl-3 sm:hover:pl-4 transition-all duration-300 cursor-pointer p-4 sm:p-0 border border-gray-800 sm:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-600 text-xl sm:text-2xl transform hover:scale-125 transition-transform duration-300">📦</span>
                  <span className="text-gray-500 text-xs uppercase">ENTRY FEE</span>
                </div>
                <p className="text-2xl sm:text-4xl font-black text-white">₹500</p>
                <p className="text-xs text-gray-600">// PER TEAM • REGISTER NOW</p>
              </div>
              <div className="hover:border-l-2 hover:border-red-600 hover:pl-3 sm:hover:pl-4 transition-all duration-300 cursor-pointer p-4 sm:p-0 border border-gray-800 sm:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-600 text-xl sm:text-2xl transform hover:scale-125 transition-transform duration-300">💰</span>
                  <span className="text-gray-500 text-xs uppercase">PRIZE POOL</span>
                </div>
                <p className="text-2xl sm:text-4xl font-black text-white">₹40,000</p>
                <p className="text-xs text-gray-600">// CASH • WINNER TAKES ALL</p>
              </div>
              <div className="hover:border-l-2 hover:border-red-600 hover:pl-3 sm:hover:pl-4 transition-all duration-300 cursor-pointer p-4 sm:p-0 border border-gray-800 sm:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-600 text-xl sm:text-2xl transform hover:scale-125 transition-transform duration-300">👥</span>
                  <span className="text-gray-500 text-xs uppercase">TEAMS REGISTERED</span>
                </div>
                <p className="text-2xl sm:text-4xl font-black text-white">{registeredTeams}/{totalSlots}</p>
                <p className="text-xs text-gray-600">// {registeredTeams >= totalSlots ? 'SLOTS 100% FILLED' : `SLOTS ${(registeredTeams/totalSlots*100).toFixed(0)}% FILLED`}</p>
              </div>
            </div>
          </div>

          {/* Right: Soldier Image */}
          <div className="relative h-full flex items-center justify-center group">
            <div className="relative w-full">
              {/* Background glow animation */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"></div>

              {/* Image Container with animations */}
              <div className="relative overflow-hidden">
                <img
                  src="/soldier.jpg"
                  alt="Gaming Soldier - Ultimate Survival Series"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Scan line overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/10 to-transparent animate-scan-line pointer-events-none"></div>

                {/* Status Badge with pulse animation */}
                <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 font-mono text-sm font-bold animate-pulse">
                  STATUS: DEPLOYED
                </div>

                {/* Corner brackets animation */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}
