'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function ShieldLogo({ size = 44 }: { size?: number }) {
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  return (
    <div
      style={{
        width: size,
        height: size * 1.15,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: size > 100 ? '8%' : 0,
        flexShrink: 0,
      }}
    >
      <Image
        src="/media__1776833126426.png"
        alt="Sierra Estates"
        width={size}
        height={size * 1.4}
        style={{
          objectFit: 'cover',
          objectPosition: 'center 8%',
          mixBlendMode: isDark ? 'screen' : 'multiply',
          filter: isDark ? 'brightness(1.3) contrast(1.2)' : 'contrast(1.1)',
        }}
        priority
      />
    </div>
  );
}
