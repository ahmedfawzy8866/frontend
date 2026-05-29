"use client";
import React, { useState, useEffect } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  themeOverride?: 'dark' | 'light';
}

/**
 * BRAND LOGO — Strategic Double-Panel Crop
 * The source image (/sierra-blu-logo.jpg) contains two logo variants:
 * - Left 50%: Dark variant (for dark backgrounds)
 * - Right 50%: Light variant (for light backgrounds)
 * 
 * We use an overflow-hidden container and an image that is 200% of the container width.
 */
export default function BrandLogo({ size = 'md', themeOverride }: BrandLogoProps) {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    if (themeOverride) {
      setCurrentTheme(themeOverride);
      return;
    }

    const updateTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      setCurrentTheme(theme);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [themeOverride]);

  const sizes = {
    sm: { width: 120, height: 48 },
    md: { width: 160, height: 64 },
    lg: { width: 300, height: 120 },
    xl: { width: 440, height: 176 },
  };

  const { width, height } = sizes[size];
  const isLight = currentTheme === 'light';

  return (
    <div 
      className="brand-logo-container"
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        overflow: 'hidden', 
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      <img
        src="/sierra-blu-logo.jpg"
        alt="Sierra AI Realty"
        draggable={false}
        style={{
          position: 'absolute',
          width: '200%', // Crucial: image takes double the container width
          height: '100%',
          maxWidth: 'none', // Ensure it doesn't get capped at 100%
          minWidth: '200%', // Force the double width
          left: isLight ? '-100%' : '0%', // Slide to hide/show halves
          top: '0',
          objectFit: 'fill', // Stretch to fill the 200% box
          transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}
