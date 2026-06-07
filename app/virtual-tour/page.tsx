'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/I18nContext';
import { useTheme } from 'next-themes';

// ══════════════════════════════════════════════════════════
//  DESIGN TOKENS (Visual Identity Guide)
// ══════════════════════════════════════════════════════════
const GOLD = '#C79F3F';       // Reddish Gold Accent

const THEMES = {
  dark: {
    bg: '#0D2035',
    bgAlt: '#0A1520',
    bg2: '#122A47',
    surface: 'rgba(255,255,255,0.055)',
    surfaceHover: 'rgba(233,193,118,0.10)',
    card: '#122A47',
    cardBorder: 'rgba(199,159,63,0.3)',
    border: 'rgba(233,193,118,0.18)',
    text: '#EFF8F7',
    textSub: 'rgba(239,248,247,0.78)',
    textMuted: 'rgba(239,248,247,0.50)',
    navBg: '#051224',
    panoBorder: '#C79F3F',
  },
  light: {
    bg: '#D5E8E6',
    bgAlt: '#C0D6D4',
    bg2: '#E2EDEC',
    surface: 'rgba(27,108,168,0.08)',
    surfaceHover: 'rgba(233,193,118,0.14)',
    card: '#E2EDEC',
    cardBorder: 'rgba(27,108,168,0.25)',
    border: 'rgba(27,108,168,0.20)',
    text: '#071422',
    textSub: 'rgba(7,20,34,0.78)',
    textMuted: 'rgba(7,20,34,0.56)',
    navBg: '#E2EDEC',
    panoBorder: 'rgba(27,108,168,0.4)',
  },
};

const TOURS = [
  {
    id: 'mivida',
    title: 'Mivida Exclusive Villa',
    titleAr: 'فيلا ميفيدا الحصرية',
    location: 'Mivida · Fifth Settlement',
    locationAr: 'ميفيدا · التجمع الخامس',
    price: 'EGP 24,500,000',
    code: 'MVD-3F-110K',
    rooms: [
      { name: 'Living Room', nameAr: 'غرفة المعيشة', img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=2400&q=80' },
      { name: 'Master Suite', nameAr: 'الجناح الرئيسي', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=80' },
      { name: 'Kitchen', nameAr: 'المطبخ', img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=2400&q=80' },
      { name: 'Terrace & Garden', nameAr: 'الشرفة والحديقة', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&q=80' }
    ]
  },
  {
    id: 'uptown',
    title: 'Uptown Cairo Penthouse',
    titleAr: 'بنتهاوس أبتاون كايرو',
    location: 'Uptown Cairo · Mokattam',
    locationAr: 'أبتاون كايرو · المقطم',
    price: 'EGP 18,200,000',
    code: 'UTC-P4-920K',
    rooms: [
      { name: 'Royal Salon', nameAr: 'الصالون الملكي', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2400&q=80' },
      { name: 'Panoramic Bedroom', nameAr: 'غرفة نوم بانورامية', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=2400&q=80' },
      { name: 'Modern Kitchen', nameAr: 'المطبخ الحديث', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=2400&q=80' },
      { name: 'City View Balcony', nameAr: 'شرفة مطلة على المدينة', img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=2400&q=80' }
    ]
  }
];

const LABELS = {
  en: {
    dir: 'ltr' as const,
    brand: 'SIERRA ESTATES',
    sub: 'REALTY',
    back: '← Back to home',
    eyebrow: 'AI Support · Immersive',
    title: 'Virtual 360° Tours',
    subtitle: 'SIERRA ESTATES REALTY',
    tagline: 'AI-Powered Luxury Estates',
    desc: 'Capture listing tours on your Samsung Galaxy S24 Ultra and let buyers walk through — drag to look around.',
    dragHint: 'Drag to look around',
    setupTitle: 'Capture setup',
    device: 'Samsung Galaxy S24 Ultra',
    step1T: '1. Open Camera → More → Panorama',
    step1D: 'For full 360°, install "Google Street View" or "Panorama 360" and choose Photo Sphere.',
    step2T: '2. Lock exposure & 50MP Pro mode',
    step2D: 'Tap-hold to lock AE/AF. Shoot in Pro for even lighting across the sweep.',
    step3T: '3. Pivot from one fixed point',
    step3D: 'Keep the phone at chest height and rotate your body slowly — overlap each frame ~30%.',
    step4T: '4. Upload the equirectangular JPG',
    step4D: 'Sierra stitches and publishes a draggable tour on the listing within minutes.',
    uploadZone: 'Drop your 360° panorama here or tap to upload from your S24 Ultra',
    mividaBtn: 'Mivida Estates',
    uptownBtn: 'Uptown Cairo',
    contact: 'Contact Advisor',
    explore: 'Explore Listings',
    arabicText: 'كاملة وبدون حدود',
  },
  ar: {
    dir: 'rtl' as const,
    brand: 'سييرا إستيتس',
    sub: 'للعقارات',
    back: 'العودة للرئيسية →',
    eyebrow: 'دعم ذكي · تجربة غامرة',
    title: 'جولات افتراضية ٣٦٠ درجة',
    subtitle: 'سييرا إستيتس للعقارات',
    tagline: 'عقارات فاخرة مدعومة بالذكاء الاصطناعي',
    desc: 'التقط جولات عقارية بهاتفك سامسونج جالاكسي S24 الترا ودع المشترين يتجولون — اسحب للنظر حولك.',
    dragHint: 'اسحب للنظر حولك واستكشف المكان',
    setupTitle: 'إعدادات التصوير',
    device: 'سامسونج جالاكسي S24 الترا',
    step1T: '١. افتح الكاميرا ← المزيد ← بانوراما',
    step1D: 'للحصول على ٣٦٠ درجة كاملة، قم بتنزيل "Google Street View" أو "Panorama 360" واختر وضع Photo Sphere.',
    step2T: '٢. قفل التعريض ووضع Pro بدقة ٥٠ ميجابكسل',
    step2D: 'اضغط مع الاستمرار لقفل التعريض والتركيز التلقائي. التقط في وضع Pro لإضاءة متوازنة.',
    step3T: '٣. الدوران حول نقطة واحدة ثابتة',
    step3D: 'حافظ على ارتفاع الهاتف عند الصدر وقم بتدوير جسمك ببطء — اجعل الإطارات تتداخل بنسبة ٣٠٪.',
    step4T: '٤. ارفع ملف JPG البانورامي',
    step4D: 'يقوم ذكاء سييرا بدمج الجولة ونشرها على صفحة العقار خلال دقائق.',
    uploadZone: 'اسحب صورة البانوراما ٣٦٠ درجة هنا أو اضغط لرفعها من هاتف S24 الترا',
    mividaBtn: 'ميفيدا إستيتس',
    uptownBtn: 'أبتاون كايرو',
    contact: 'تواصل مع مستشار',
    explore: 'استكشف القوائم',
    arabicText: 'كاملة وبدون حدود',
  }
};

export default function VirtualTourPage() {
  const { locale: lang, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [activeTourIndex, setActiveTourIndex] = useState(0);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const panoRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef({ x: 0, down: false, startX: 0, startPos: 0 });

  const activeTour = TOURS[activeTourIndex];
  const activeRoom = activeTour.rooms[activeRoomIndex];
  const L = LABELS[lang];

  const mode = (theme === 'light' ? 'light' : 'dark') as 'light' | 'dark';
  const th = THEMES[mode];

  useEffect(() => {
    setMounted(true);
    setLoaded(true);
    applyPan(0);
  }, [activeTourIndex, activeRoomIndex]);

  const maxPan = () => {
    if (stageRef.current && panoRef.current) {
      return stageRef.current.clientWidth - panoRef.current.clientWidth;
    }
    return 0;
  };

  const applyPan = (newX: number) => {
    const minX = maxPan();
    const boundX = Math.max(minX, Math.min(0, newX));
    dragInfo.current.x = boundX;
    if (panoRef.current) {
      panoRef.current.style.transform = `translateX(${boundX}px)`;
    }
  };

  // Auto-drift effect when not dragging
  useEffect(() => {
    const interval = setInterval(() => {
      if (!dragInfo.current.down) {
        const nextX = dragInfo.current.x - 0.5;
        const minX = maxPan();
        applyPan(nextX <= minX ? 0 : nextX);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const info = dragInfo.current;
    info.down = true;
    info.startX = e.clientX;
    info.startPos = info.x;
    setIsDragging(true);
    if (stageRef.current) {
      stageRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const info = dragInfo.current;
    if (!info.down) return;
    const deltaX = e.clientX - info.startX;
    applyPan(info.startPos + deltaX);
  };

  const handlePointerUp = () => {
    dragInfo.current.down = false;
    setIsDragging(false);
  };

  const handleResize = () => {
    applyPan(dragInfo.current.x);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return (
      <div style={{ background: '#0D2035', color: '#EFF8F7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif" }}>
        Loading Virtual Tour...
      </div>
    );
  }

  return (
    <div style={{ background: th.bg, color: th.text, minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Jost', sans-serif", transition: 'background .5s, color .5s' }} dir={L.dir}>
      
      {/* ══ TOPBAR ══ */}
      <header style={{ height: 72, borderBottom: `1px solid ${th.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', background: th.navBg, transition: 'background .5s, border .5s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Brand Shield Logo mimicking mobile header */}
          <Link href="/">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" style={{ filter: `drop-shadow(0 2px 6px rgba(199,159,63,0.3))` }}>
              <path d="M50 5 L85 20 V55 C85 75 50 95 50 95 C50 95 15 75 15 55 V20 L50 5 Z" fill={mode === 'dark' ? '#002D62' : '#C0D6D4'} stroke={GOLD} strokeWidth="3" />
              <path d="M30 45 L45 30 L55 40 L70 25" stroke={GOLD} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M30 60 L50 72 L70 60" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 700, letterSpacing: '.18em', color: GOLD, lineHeight: 1 }}>{L.brand}</div>
            <div style={{ fontSize: 9, letterSpacing: '.3em', color: th.textSub, marginTop: 2 }}>{L.sub}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button 
            onClick={() => setLocale(lang === 'en' ? 'ar' : 'en')} 
            style={{ background: th.surface, border: `1px solid ${th.border}`, color: GOLD, padding: '6px 14px', borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Jost', sans-serif" }}
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          
          <button 
            aria-label="Toggle theme" 
            onClick={() => setTheme(mode === 'dark' ? 'light' : 'dark')} 
            style={{ background: th.surface, border: `1px solid ${th.border}`, color: th.textSub, width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {mode === 'dark' ? '☀' : '🌙'}
          </button>

          <Link href="/" style={{ color: th.textSub, textDecoration: 'none', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
            {L.back}
          </Link>
        </div>
      </header>

      {/* ══ HERO SECTION ══ */}
      <section style={{ padding: '48px 24px 28px', textAlign: 'center', background: th.bgAlt, borderBottom: `1px solid ${th.border}`, transition: 'background .5s' }}>
        <span style={{ fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>{L.eyebrow}</span>
        
        {/* Core typography scale matches visual identity */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, color: th.text, letterSpacing: '-0.02em', margin: '12px 0 8px', lineHeight: 1.15 }}>
          {L.title}
        </h1>
        
        <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", color: GOLD, letterSpacing: '.12em', fontWeight: 400, marginBottom: 12 }}>
          {L.subtitle} · {lang === 'en' ? 'Beyond Brokerage' : 'أبعد من الوساطة'}
        </div>

        <p style={{ fontSize: 14, color: th.textSub, maxWidth: 650, margin: '0 auto 14px', lineHeight: 1.6, fontWeight: 300, fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
          {L.desc}
        </p>

        <div style={{ fontSize: 16, color: GOLD, fontWeight: 500, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
          {L.arabicText}
        </div>
      </section>

      {/* ══ MAIN LAYOUT ══ */}
      <main style={{ flex: 1, padding: '24px 24px 60px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        
        {/* Properties Selector Tabs */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
          {TOURS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => { setActiveTourIndex(idx); setActiveRoomIndex(0); }}
              style={{
                padding: '10px 22px',
                borderRadius: '8px',
                border: `1.5px solid ${activeTourIndex === idx ? GOLD : th.border}`,
                background: activeTourIndex === idx ? `linear-gradient(135deg, ${GOLD}, #a37c2a)` : 'transparent',
                color: activeTourIndex === idx ? (mode === 'dark' ? '#051224' : '#FFF') : th.textSub,
                fontFamily: "'Jost', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeTourIndex === idx ? `0 4px 16px rgba(199,159,63,0.25)` : 'none'
              }}
            >
              {lang === 'en' ? t.title : t.titleAr}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, alignItems: 'start' }} className="tour-grid-container">
          
          {/* LEFT: PANO STAGE & ROOM SELECTOR */}
          <div>
            <div 
              ref={stageRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              style={{ 
                position: 'relative', 
                height: 480, 
                borderRadius: 18, 
                overflow: 'hidden', 
                border: `2px solid ${th.panoBorder}`, 
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)', 
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none',
                background: '#051224'
              }}
            >
              <div 
                ref={panoRef}
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  height: '100%', 
                  width: '280%', 
                  backgroundImage: `url('${activeRoom.img}')`,
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
                  willChange: 'transform',
                  transition: isDragging ? 'none' : 'transform 0.1s linear'
                }}
              />
              
              {/* Tour Badges & Labels mimicking design layout */}
              <div style={{ position: 'absolute', top: 16, left: 16, background: GOLD, color: '#051224', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: 6, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                360° · {lang === 'en' ? activeRoom.name : activeRoom.nameAr}
              </div>
              
              <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(5, 18, 36, 0.85)', border: `1px solid ${GOLD}`, color: GOLD, fontSize: 10, fontWeight: 600, padding: '6px 12px', borderRadius: 6 }}>
                {activeTour.code}
              </div>

              <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(5, 18, 36, 0.85)', border: `1px solid rgba(199,159,63,0.4)`, backdropFilter: 'blur(8px)', color: '#F8F8F8', fontSize: 11, letterSpacing: '0.06em', padding: '10px 20px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2"><path d="M8 12h8M8 12l3-3M8 12l3 3M16 12l-3-3M16 12l-3 3"/></svg> 
                {L.dragHint}
              </div>
            </div>

            {/* Room Selector Buttons */}
            <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
              {activeTour.rooms.map((room, rIdx) => (
                <button
                  key={rIdx}
                  onClick={() => setActiveRoomIndex(rIdx)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 999,
                    border: `1px solid ${activeRoomIndex === rIdx ? GOLD : th.border}`,
                    background: activeRoomIndex === rIdx ? 'rgba(199,159,63,0.15)' : th.surface,
                    color: activeRoomIndex === rIdx ? GOLD : th.textSub,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Jost', sans-serif"
                  }}
                >
                  {lang === 'en' ? room.name : room.nameAr}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PROPERTY METADATA & DEVICE SETUP */}
          <div style={{ background: th.bg2, border: `1px solid ${th.cardBorder}`, borderRadius: 18, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', color: th.text, transition: 'background .5s, border .5s' }}>
            
            {/* Property Overview */}
            <div style={{ borderBottom: `1px solid ${th.border}`, paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: GOLD, fontWeight: 600, marginBottom: 6, fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                {lang === 'en' ? activeTour.location : activeTour.locationAr}
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, margin: '0 0 10px', color: th.text }}>
                {lang === 'en' ? activeTour.title : activeTour.titleAr}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: GOLD }}>{activeTour.price}</span>
                <span style={{ fontSize: 10, background: 'rgba(199,159,63,0.15)', border: `1px solid ${GOLD}`, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.05em' }}>
                  {activeTour.code}
                </span>
              </div>
            </div>

            {/* Device Info */}
            <h3 style={{ margin: '0 0 6px', fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500 }}>{L.setupTitle}</h3>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: GOLD, fontWeight: 600, marginBottom: 16 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg> 
              {L.device}
            </div>

            {/* Instruction Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: '1', title: L.step1T, desc: L.step1D },
                { n: '2', title: L.step2T, desc: L.step2D },
                { n: '3', title: L.step3T, desc: L.step3D },
                { n: '4', title: L.step4T, desc: L.step4D }
              ].map((step) => (
                <div key={step.n} style={{ display: 'flex', gap: 12, borderTop: step.n !== '1' ? `1px solid ${th.border}` : 'none', paddingTop: step.n !== '1' ? 12 : 0 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(199,159,63,0.15)', border: `1px solid ${GOLD}`, color: GOLD, fontWeight: 700, fontSize: 12, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    {step.n}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: GOLD, margin: '0 0 4px', fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>{step.title}</h4>
                    <p style={{ fontSize: 12, color: th.textSub, margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Zone */}
            <div style={{ marginTop: 20, border: `1.5px dashed ${GOLD}`, borderRadius: 12, padding: 20, textAlign: 'center', color: th.textSub, fontSize: 12, background: th.surface }}>
              <strong>{L.uploadZone.split('here')[0]}here</strong>{L.uploadZone.split('here')[1]}
            </div>

            {/* Action buttons mimicking uploaded design */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button style={{ flex: 1, padding: '10px 16px', border: `1.5px solid ${GOLD}`, borderRadius: 6, background: `linear-gradient(135deg, ${GOLD}, #a37c2a)`, color: '#051224', fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Jost', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                {L.contact}
              </button>
              <button style={{ flex: 1, padding: '10px 16px', border: `1.5px solid ${GOLD}`, borderRadius: 6, background: 'transparent', color: GOLD, fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "'Jost', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                {L.explore}
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Responsive adjustments CSS */}
      <style>{`
        .dragging {
          user-select: none;
        }
        @media (max-width: 900px) {
          .tour-grid-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
