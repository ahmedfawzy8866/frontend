'use client';

/**
 * Sierra AI — CONCIERGE GALLERY (S8)
 * Mobile-first swipeable gallery showing top 3-5 curated properties.
 * 
 * Design: Luxury, editorial, mobile-optimized.
 * Vibe: Leila's personal touch (warm, exclusive, action-oriented).
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin, DollarSign } from 'lucide-react';
import type { ConciergeSelection, ConciergeUnit } from '@/lib/services/portfolio-engine';

interface ConciergeGalleryProps {
  portfolio: ConciergeSelection;
  onViewingRequested?: (unitId: string) => void;
  onShare?: (unit: ConciergeUnit) => void;
}

export default function ConciergeGallery({
  portfolio,
  onViewingRequested,
  onShare,
}: ConciergeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [showNote, setShowNote] = useState(true);

  const currentUnit = portfolio.units[currentIndex];
  const isLastUnit = currentIndex === portfolio.units.length - 1;

  const handleNext = () => {
    if (currentIndex < portfolio.units.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleLike = (unitId: string) => {
    const newLiked = new Set(liked);
    if (newLiked.has(unitId)) {
      newLiked.delete(unitId);
    } else {
      newLiked.add(unitId);
    }
    setLiked(newLiked);
  };

  const handleRequestViewing = () => {
    if (onViewingRequested) {
      onViewingRequested(currentUnit.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 flex flex-col">
      {/* Header with Leila's Note */}
      {showNote && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 border-b border-amber-700/30 p-4 md:p-6"
        >
          <div className="max-w-2xl mx-auto">
            <h1 className="text-white text-lg md:text-2xl font-playfair mb-2">
              Hello, {portfolio.leadName}
            </h1>
            <p className="text-amber-50/80 text-sm md:text-base leading-relaxed font-light">
              {portfolio.personalNote}
            </p>
            <button
              onClick={() => setShowNote(false)}
              className="text-amber-300 text-xs mt-3 hover:text-amber-200 transition"
            >
              ✕ Close
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Gallery Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-6 md:py-12">
        <div className="w-full max-w-md">
          {/* Progress Indicator */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-2">
              {portfolio.units.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-amber-400'
                      : 'w-2 bg-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-amber-300 text-xs font-mono">
              {currentIndex + 1} / {portfolio.units.length}
            </span>
          </div>

          {/* Image Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentUnit.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative w-full aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg overflow-hidden mb-6"
            >
              {currentUnit.imageUrl ? (
                <img
                  src={currentUnit.imageUrl}
                  alt={currentUnit.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-700">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏘️</div>
                    <p className="text-slate-400 text-sm">Property Image</p>
                  </div>
                </div>
              )}

              {/* Dark Overlay + Match Score Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 right-4 bg-amber-400 text-slate-900 px-4 py-2 rounded-full font-bold text-lg">
                {currentUnit.matchScore}% Match
              </div>
            </motion.div>

            {/* Unit Details */}
            <motion.div
              key={`details-${currentUnit.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Title & Price */}
              <div>
                <h2 className="text-white text-2xl md:text-3xl font-playfair mb-2">
                  {currentUnit.title}
                </h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-amber-300">
                    {(currentUnit.price / 1_000_000).toFixed(1)}M
                  </span>
                  <span className="text-slate-400 text-lg">EGP</span>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-700">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Annual Yield
                  </p>
                  <p className="text-amber-300 text-xl font-bold">
                    {currentUnit.estimatedYield.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                    Est. ROI (36mo)
                  </p>
                  <p className="text-amber-300 text-xl font-bold">
                    {currentUnit.estimatedROI.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <p className="text-slate-300 text-base leading-relaxed mb-3">
                  {currentUnit.description}
                </p>
                <p className="text-amber-200/70 text-sm italic">
                  💡 {currentUnit.reason}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => toggleLike(currentUnit.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition ${
                    liked.has(currentUnit.id)
                      ? 'bg-amber-400 text-slate-900'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <Heart
                    size={20}
                    fill={liked.has(currentUnit.id) ? 'currentColor' : 'none'}
                  />
                  Save
                </button>

                <button
                  onClick={() => onShare && onShare(currentUnit)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition"
                >
                  <Share2 size={20} />
                  Share
                </button>

                <button
                  onClick={handleRequestViewing}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-amber-400 text-slate-900 hover:bg-amber-300 transition font-semibold"
                >
                  View
                </button>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={isLastUnit}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900/50 border-t border-slate-700 px-4 md:px-8 py-4 text-center">
        <p className="text-slate-400 text-xs md:text-sm">
          ✨ Curated by Leila | Sierra AI Realty {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
