"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// --- Luxury Card ---
export const LuxuryCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`bg-white/50 backdrop-blur-xl border border-[#C9A84C]/20 shadow-2xl p-8 rounded-lg hover:shadow-3xl transition-shadow duration-500 ${className}`}
  >
    {children}
  </motion.div>
);

// --- Premium Luxury Card (Glass Morphism) ---
export const PremiumCard = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
  <motion.div
    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
    onClick={onClick}
    className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 shadow-xl p-10 rounded-xl hover:border-[#C9A84C]/40 transition-all duration-300 cursor-pointer ${className}`}
  >
    {children}
  </motion.div>
);

// --- Gold Button ---
export const GoldButton = ({ label, onClick, className = "", disabled = false }: { label: string, onClick?: () => void, className?: string, disabled?: boolean }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.02, backgroundColor: '#B8973B' } : {}}
    whileTap={!disabled ? { scale: 0.98 } : {}}
    onClick={onClick}
    disabled={disabled}
    className={`bg-[#C9A84C] text-[#0A1628] font-semibold py-3 px-8 rounded-lg tracking-[0.15em] uppercase text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg ${className}`}
  >
    {label}
  </motion.button>
);

// --- Luxury Secondary Button ---
export const SecondaryButton = ({ label, onClick, className = "" }: { label: string, onClick?: () => void, className?: string }) => (
  <motion.button
    whileHover={{ scale: 1.02, borderColor: '#C9A84C', color: '#C9A84C' }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`border-2 border-[#0A1628]/30 text-[#0A1628] font-semibold py-3 px-8 rounded-lg tracking-[0.1em] uppercase text-sm transition-all duration-300 hover:bg-[#0A1628]/5 ${className}`}
  >
    {label}
  </motion.button>
);

// --- Editorial Heading ---
export const EditorialHeading = ({ children, level = 1, className = "" }: { children: React.ReactNode, level?: 1|2|3, className?: string }) => {
  const sizes: Record<1|2|3, string> = {
    1: 'text-6xl md:text-7xl',
    2: 'text-4xl md:text-5xl',
    3: 'text-3xl md:text-4xl'
  };
  const Tag = `h${level}` as React.ElementType;
  return (
    <Tag className={`font-playfair text-[#0A1628] ${sizes[level]} italic tracking-tight leading-tight ${className}`}>
      {children}
    </Tag>
  );
};

// --- Subtitle Text ---
export const SubtitleText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <p className={`font-inter text-lg text-[#0A1628]/70 leading-relaxed font-light ${className}`}>
    {children}
  </p>
);

// --- KPI Stat Box ---
export const StatBox = ({ value, label, className = "" }: { value: string | number, label: string, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`flex flex-col items-center p-6 bg-white/30 backdrop-blur-md border border-[#C9A84C]/20 rounded-lg ${className}`}
  >
    <div className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-2">{value}</div>
    <div className="text-sm uppercase tracking-widest text-[#0A1628]/60">{label}</div>
  </motion.div>
);

// --- Section Badge ---
export const SectionBadge = ({ text, className = "" }: { text: string, className?: string }) => (
  <div className={`inline-block px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full ${className}`}>
    <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A84C]">{text}</span>
  </div>
);
