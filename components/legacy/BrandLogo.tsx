"use client";
import React, { useState, useEffect } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  themeOverride?: 'dark' | 'light';
  /** 'wordmark' = existing horizontal text logo (default) | 'emblem' = new gold shield mark */
  variant?: 'wordmark' | 'emblem';
}

/**
 * BRAND LOGO — Sierra AI Realty
 *
 * variant="wordmark" (default):
 *   Strategic Double-Panel Crop. Source image (/sierra-blu-logo.jpg) contains two
 *   logo variants side-by-side. Left 50% = dark variant, Right 50% = light variant.
 *   We clip via overflow-hidden and slide the image to reveal the correct half.
 *
 * variant="emblem":
 *   Gold shield crest (/sierra-blu-emblem.svg). Scales uniformly.
 *   Ideal for: favicons, chat widget headers, loading screens, app icons.
 */
export default function BrandLogo({
  size = 'md',
  themeOverride,
  variant = 'wordmark',
}: BrandLogoProps) {
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
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, [themeOverride]);

  // ── Wordmark sizes (horizontal banner) ──────────────────────────────────
  const wordmarkSizes = {
    sm: { width: 120, height: 48 },
    md: { width: 160, height: 64 },
    lg: { width: 300, height: 120 },
    xl: { width: 440, height: 176 },
  };

  // ── Emblem sizes (square shield) ────────────────────────────────────────
  const emblemSizes = {
    sm: { width: 40, height: 44 },
    md: { width: 56, height: 62 },
    lg: { width: 96, height: 106 },
    xl: { width: 160, height: 176 },
  };

  const isLight = currentTheme === 'light';

  // ── EMBLEM VARIANT ───────────────────────────────────────────────────────
  if (variant === 'emblem') {
    const { width, height } = emblemSizes[size];
    return (
      <img
        src="/logo.jpg"
        alt="Sierra AI Realty Shield"
        draggable={false}
        width={width}
        height={height}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          userSelect: 'none',
          borderRadius: '8px',
          border: '1.5px solid rgba(255, 59, 48, 0.4)',
          boxShadow: '0 0 10px rgba(255, 59, 48, 0.2)',
          transition: 'all 0.4s ease',
        }}
      />
    );
  }

  // ── WORDMARK VARIANT (default) ───────────────────────────────────────────
  // ── WORDMARK VARIANT (default) ───────────────────────────────────────────
  const emblemSize = size === 'sm' ? 28 : size === 'md' ? 38 : size === 'lg' ? 64 : 88;
  return (
    <div
      className="brand-logo-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <img
        src="/logo.jpg"
        alt="Sierra AI Realty Shield"
        draggable={false}
        style={{
          width: `${emblemSize}px`,
          height: `${emblemSize * 1.12}px`,
          borderRadius: '6px',
          border: '1px solid rgba(255, 59, 48, 0.4)',
          boxShadow: '0 0 8px rgba(255, 59, 48, 0.25)',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: size === 'sm' ? '14px' : size === 'md' ? '18px' : '28px',
            fontWeight: 'bold',
            letterSpacing: '0.12em',
            color: isLight ? '#0A1628' : '#EFF8F7',
          }}
        >
          Sierra AI
        </span>
        <span
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: size === 'sm' ? '7px' : size === 'md' ? '8px' : '11px',
            fontWeight: 700,
            letterSpacing: '0.35em',
            color: '#C9A84C',
          }}
        >
          REALTY
        </span>
      </div>
    </div>
  );
}
