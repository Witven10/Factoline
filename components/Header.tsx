import React, { useState } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  cartCount: number;
  notifCount: number;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, notifCount, cartCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Logo Area */}
        <div className="flex items-center gap-3 min-w-fit cursor-pointer group select-none" onClick={() => setSearchQuery('')}>
          <div className="relative flex items-center justify-center">
             <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-105 transition-transform duration-300">
                {/* Outer Line - Top Bar & Outer Stem */}
                <path d="M11 33V13C11 10.2386 13.2386 8 16 8H33" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Inner Line - Middle Bar & Inner Stem */}
                <path d="M22 33V23C22 20.2386 24.2386 18 27 18H33" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Terminal Dots */}
                <circle cx="11" cy="33" r="3.5" fill="#0F172A"/>
                <circle cx="22" cy="33" r="3.5" fill="#0F172A"/>
                <circle cx="33" cy="8" r="3.5" fill="#0F172A"/>
                <circle cx="33" cy="18" r="3.5" fill="#0F172A"/>
             </svg>
          </div>
          <span className="text-3xl font-bold tracking-tight text-slate-900 lowercase pb-1">
            factoline
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 transition-colors ${searchQuery ? 'text-brand-600' : 'text-slate-400'}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-10 py-3 border-2 border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-600 focus:ring-0 transition duration-150 ease-in-out sm:text-sm font-medium text-slate-900"
              placeholder="Recherche : Planches de chêne, avivés, poutres..."
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-6 min-w-fit">
            
            {/* Account */}
          <button className="flex items-center gap-2 text-slate-600 hover:text-brand-800 transition-colors p-2 rounded-md hover:bg-slate-50">
            <User className="w-6 h-6" />
            <div className="hidden lg:flex flex-col items-start leading-tight">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Compte Pro</span>
              <span className="text-sm font-medium">Menuiserie Dupont</span>
            </div>
          </button>

            {/* Cart */}
          <button className="flex items-center gap-2 text-slate-600 hover:text-brand-800 transition-colors p-2 rounded-md hover:bg-slate-50 relative">
            <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                { notifCount != 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{notifCount}</span>
                )}
            </div>
            <div className="hidden lg:flex flex-col items-start leading-tight">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Panier</span>
              <span className="text-sm font-medium">{cartCount} {' €'}</span>
            </div>
          </button>
          
          {/* Mobile Menu */}
          <button className="md:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};