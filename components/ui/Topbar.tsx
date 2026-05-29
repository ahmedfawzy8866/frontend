"use client";
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useI18n } from '../../lib/I18nContext';
import { useTheme } from 'next-themes';
import BrandLogo from './BrandLogo';
import LanguageToggle from './LanguageToggle';
import { Search, Bell, Moon, Sun, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopbarProps {
  onHomeClick: () => void;
  onSignOut: () => void;
  userInitials?: string;
  displayName?: string;
  isGuest?: boolean;
}

export default function Topbar({
  onHomeClick,
  onSignOut,
  userInitials = 'AF',
  displayName = 'Ahmed Fawzy',
  isGuest = false,
}: TopbarProps) {
  const { setLocale, locale } = useI18n();
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSignOut = async () => {
    try {
      if (!isGuest) {
        await signOut(auth);
      }
      onSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="topbar w-full h-[80px] px-8 flex items-center justify-between border-b border-border sticky top-0 z-[60] backdrop-blur-3xl bg-background/80" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-12 flex-1">
        <button 
          onClick={onHomeClick} 
          className="hover:opacity-80 transition-opacity"
          aria-label="Return to Dashboard"
        >
          <BrandLogo size="sm" />
        </button>

        {/* ── Search Surface ── */}
        <div className="relative max-w-xl flex-1 group">
          <Search 
            size={16} 
            className="absolute start-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" 
          />
          <input
            type="text"
            placeholder={locale === 'ar' ? "استعلام عن الأصول أو الإشارات الاستخباراتية..." : "Query assets, signals, or portfolio intelligence..."}
            className="w-full bg-surface border border-border rounded-xl py-3 ps-12 pe-4 text-sm text-foreground/90 outline-none focus:border-primary/40 focus:bg-surface/50 transition-all duration-300 tracking-wide"
          />
          <div className="absolute end-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-20 group-focus-within:opacity-50 transition-opacity">
            <span className="text-[10px] font-bold border border-foreground/40 px-1.5 py-0.5 rounded text-foreground">⌘</span>
            <span className="text-[10px] font-bold border border-foreground/40 px-1.5 py-0.5 rounded text-foreground">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <LanguageToggle onLocaleChange={setLocale} />

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex items-center gap-1">
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'var(--surface)' }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleTheme}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground/40 hover:text-primary transition-colors"
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: 'var(--surface)' }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground/40 hover:text-primary transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary shadow-sm" />
          </motion.button>
        </div>

        {/* ── User Quick Info ── */}
        <motion.div 
          onClick={handleSignOut}
          whileHover={{ borderColor: 'var(--primary)', backgroundColor: 'var(--surface)' }}
          className="flex items-center gap-4 ps-4 pe-1 py-1 rounded-2xl border border-border bg-surface cursor-pointer group transition-all duration-300 ms-4"
        >
          <div className="flex flex-col text-right rtl:text-left">
            <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{displayName}</span>
            <span className="text-[9px] font-black text-primary/60 uppercase tracking-widest">{isGuest ? 'Guest' : 'Admin'}</span>
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-background font-black text-xs shadow-lg">
              {userInitials}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
