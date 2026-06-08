'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PropCardProps {
  id: string | number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  badge: string;
  badgeColor: string;
  img: string;
  dealDelay?: number;
  dealt?: boolean;
  isAr?: boolean;
}

const SPEC_FONT: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 11,
  fontWeight: 400,
  color: 'var(--on-surface-variant)',
};

const ICON: React.SVGAttributes<SVGSVGElement> = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'var(--on-surface-variant)',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Spec({ icon, children, end, isAr }: { icon: React.ReactNode; children: React.ReactNode; end?: boolean; isAr?: boolean }) {
  return (
    <div
      className="flex items-center gap-1"
      style={end ? { marginLeft: isAr ? 0 : 'auto', marginRight: isAr ? 'auto' : 0 } : undefined}
    >
      {icon}
      <span style={SPEC_FONT}>{children}</span>
    </div>
  );
}

export default function PropCard({ id, title, location, price, beds, baths, sqft, badge, badgeColor, img, dealDelay = 0, dealt = false, isAr = false }: PropCardProps) {
  const [hov, setHov] = useState(false);
  const align = isAr ? 'right' : 'left' as const;

  return (
    <Link
      href={`/listings/${id}`}
      className={`deal-card${dealt ? ' dealt' : ''} block`}
      style={{ animationDelay: `${dealDelay}s`, textDecoration: 'none' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          background: 'var(--surface-container-high)',
          border: `1px solid ${hov ? 'rgba(233,193,118,0.35)' : 'var(--outline-variant)'}`,
          boxShadow: hov
            ? '0 15px 36px rgba(0,0,0,0.3), 0 0 16px rgba(233,193,118,0.08)'
            : '0 4px 14px rgba(0,0,0,0.1)',
          transform: hov ? 'translateY(-3px)' : 'none',
        }}
      >
        {/* Image */}
        <div className="relative h-[140px] overflow-hidden" style={{ background: '#0A1E35' }}>
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hov ? 'scale(1.05)' : 'none' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)' }}
          />
          <span
            className="absolute top-2.5 text-white uppercase"
            style={{
              [isAr ? 'right' : 'left']: 10,
              background: badgeColor,
              fontFamily: "'Jost', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '.06em',
              padding: '4px 10px',
              borderRadius: 4,
            }}
          >
            {badge}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '12px 16px 14px' }}>
          {/* Compound */}
          <div style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: '#E9C176',
            marginBottom: 4,
            fontFamily: "'Jost', sans-serif",
            textAlign: align,
          }}>
            {location.split('·')[0]?.trim()}
          </div>

          {/* Title */}
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--on-surface)',
            lineHeight: 1.15,
            marginBottom: 8,
            textAlign: align,
            height: '2.3em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {title}
          </div>

          {/* Price */}
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 16,
            fontWeight: 500,
            color: '#E9C176',
            letterSpacing: '-.02em',
            marginBottom: 10,
            textAlign: align,
          }}>
            {price}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--outline-variant)', marginBottom: 10 }} />

          {/* Specs */}
          <div className="flex items-center" style={{ gap: 12, flexDirection: isAr ? 'row-reverse' : 'row' }}>
            <Spec icon={
              <svg {...ICON}>
                <path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7" />
                <path d="M21 10H3" />
                <path d="M7 7V4a1 1 0 011-1h3v4" />
                <path d="M17 7V4a1 1 0 00-1-1h-3v4" />
              </svg>
            }>
              {beds} {isAr ? 'غرف' : 'Beds'}
            </Spec>

            <Spec icon={
              <svg {...ICON}>
                <path d="M4 12h16a1 1 0 011 1v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a1 1 0 011-1z" />
                <path d="M6 12V5a2 2 0 012-2h8a2 2 0 012 2v7" />
              </svg>
            }>
              {baths} {isAr ? 'حمام' : 'Baths'}
            </Spec>

            <Spec end isAr={isAr} icon={
              <svg {...ICON}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 3v18" />
              </svg>
            }>
              {sqft}
            </Spec>
          </div>
        </div>
      </div>
    </Link>
  );
}
