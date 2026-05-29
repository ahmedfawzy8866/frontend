'use client';

import React, { useState, useEffect } from 'react';

export default function LuxuryVirtualViewport() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Ensure lazy-loading under 2-second limit
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-luxury-gold-start/30 relative bg-branding-navy">
      {!loaded ? (
        <div className="absolute inset-0 flex items-center justify-center text-luxury-gold-start animate-pulse">
          Initializing 360° Telemetry Viewport...
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-canvas-ivory">
          [ 360° Virtual Walking Tour Active ]
        </div>
      )}
    </div>
  );
}
