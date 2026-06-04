'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ══════════════════════════════════════════════════════════
//  DESIGN TOKENS (Visual Identity Guide)
// ══════════════════════════════════════════════════════════
const ROYAL_BLUE = '#002D62'; // Primary
const GOLD = '#C79F3F';       // Reddish Gold Accent
const GRAPHITE = '#3C3C3C';   // Secondary
const WHITE = '#F8F8F8';      // Base/Text
const NAVY_DARK = '#051224';  // Darker base to contrast blue

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
    back: '← Back to home',
    eyebrow: 'AI Support · Immersive',
    title: 'Virtual 360° Tours',
    subtitle: 'SIERRA BLUE REALTY',
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
    back: 'العودة للرئيسية →',
    eyebrow: 'دعم ذكي · تجربة غامرة',
    title: 'جولات افتراضية ٣٦٠ درجة',
    subtitle: 'سييرا بلو للعقارات',
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
  const [lang, setLang] = useState<'en' | 'ar'>('en');
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

  useEffect(() => {
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

  return (
    <div style={{ background: ROYAL_BLUE, color: WHITE, minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Jost', sans-serif" }} dir={L.dir}>
      
      {/* ══ TOPBAR ══ */}
      <header style={{ height: 72, borderBottom: `1px solid rgba(199,159,63,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', background: NAVY_DARK }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Brand Shield Logo mimicking mobile header */}
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" style={{ filter: `drop-shadow(0 2px 6px rgba(199,159,63,0.3))` }}>
            <path d="M50 5 L85 20 V55 C85 75 50 95 50 95 C50 95 15 75 15 55 V20 L50 5 Z" fill={ROYAL_BLUE} stroke={GOLD} strokeWidth="3" />
            <path d="M30 45 L45 30 L55 40 L70 25" stroke={GOLD} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 60 L50 72 L70 60" stroke={GOLD} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, letterSpacing: '.18em', color: GOLD, lineHeight: 1 }}>SIERRA BLUU</div>
            <div style={{ fontSize: 9, letterSpacing: '.3em', color: 'rgba(248,248,248,0.7)', marginTop: 2 }}>REALTY</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
            style={{ background: 'transparent', border: `1px solid rgba(199,159,63,0.4)`, color: GOLD, padding: '6px 14px', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Jost', sans-serif" }}
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          <Link href="/" style={{ color: 'rgba(248,248,248,0.85)', textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: '0.08em' }}>
            {L.back}
          </Link>
        </div>
      </header>

      {/* ══ HERO SECTION ══ */}
      <section style={{ padding: '64px 40px 32px', textAlign: 'center', background: `linear-gradient(180deg, ${NAVY_DARK} 0%, ${ROYAL_BLUE} 100%)` }}>
        <span style={{ fontSize: 11, letterSpacing: '.24em', textTransform: 'uppercase', color: GOLD, fontWeight: 600 }}>{L.eyebrow}</span>
        
        {/* Core typography scale matches visual identity */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, color: WHITE, letterSpacing: '-0.02em', margin: '14px 0 10px', lineHeight: 1.1 }}>
          {L.title}
        </h1>
        
        <div style={{ fontSize: 24, fontFamily: "'Cormorant Garamond', serif", color: GOLD, letterSpacing: '.12em', fontWeight: 400, marginBottom: 12 }}>
          {L.subtitle} · {lang === 'en' ? 'Beyond Brokerage' : 'أبعد من الوساطة'}
        </div>

        <p style={{ fontSize: 18, color: 'rgba(248,248,248,0.75)', maxWidth: 650, margin: '0 auto 16px', lineHeight: 1.6, fontWeight: 300 }}>
          {L.desc}
        </p>

        <div style={{ fontSize: 18, color: GOLD, fontWeight: 500, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
          {L.arabicText}
        </div>
      </section>

      {/* ══ MAIN LAYOUT ══ */}
      <main style={{ flex: 1, padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        
        {/* Properties Selector Tabs */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 36 }}>
          {TOURS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => { setActiveTourIndex(idx); setActiveRoomIndex(0); }}
              style={{
                padding: '12px 28px',
                borderRadius: '8px',
                border: `1.5px solid ${activeTourIndex === idx ? GOLD : 'rgba(199,159,63,0.3)'}`,
                background: activeTourIndex === idx ? `linear-gradient(135deg, ${GOLD}, #a37c2a)` : 'transparent',
                color: activeTourIndex === idx ? '#051224' : WHITE,
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
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

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32, alignItems: 'start' }} className="tour-grid-container">
          
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
                border: `2px solid ${GOLD}`, 
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)', 
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none'
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
              <div style={{ position: 'absolute', top: 16, left: 16, background: GOLD, color: '#051224', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: 6, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                360° · {lang === 'en' ? activeRoom.name : activeRoom.nameAr}
              </div>
              
              <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(5, 18, 36, 0.85)', border: `1px solid ${GOLD}`, color: GOLD, fontSize: 11, fontWeight: 600, padding: '6px 12px', borderRadius: 6 }}>
                {activeTour.code}
              </div>

              <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(5, 18, 36, 0.85)', border: `1px solid rgba(199,159,63,0.4)`, backdropFilter: 'blur(8px)', color: WHITE, fontSize: 12, letterSpacing: '0.06em', padding: '10px 20px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2"><path d="M8 12h8M8 12l3-3M8 12l3 3M16 12l-3-3M16 12l-3 3"/></svg> 
                {L.dragHint}
              </div>
            </div>

            {/* Room Selector Buttons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              {activeTour.rooms.map((room, rIdx) => (
                <button
                  key={rIdx}
                  onClick={() => setActiveRoomIndex(rIdx)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 999,
                    border: `1px solid ${activeRoomIndex === rIdx ? GOLD : 'rgba(199,159,63,0.25)'}`,
                    background: activeRoomIndex === rIdx ? 'rgba(199,159,63,0.15)' : 'rgba(5, 18, 36, 0.4)',
                    color: activeRoomIndex === rIdx ? GOLD : 'rgba(248,248,248,0.85)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {lang === 'en' ? room.name : room.nameAr}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PROPERTY METADATA & DEVICE SETUP */}
          <div style={{ background: GRAPHITE, border: `1px solid rgba(199,159,63,0.3)`, borderRadius: 18, padding: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', color: WHITE }}>
            
            {/* Property Overview */}
            <div style={{ borderBottom: `1px solid rgba(199,159,63,0.2)`, paddingBottom: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: GOLD, fontWeight: 600, marginBottom: 6 }}>
                {lang === 'en' ? activeTour.location : activeTour.locationAr}
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, margin: '0 0 10px', color: WHITE }}>
                {lang === 'en' ? activeTour.title : activeTour.titleAr}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: GOLD }}>{activeTour.price}</span>
                <span style={{ fontSize: 11, background: 'rgba(199,159,63,0.15)', border: `1px solid ${GOLD}`, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.05em' }}>
                  {activeTour.code}
                </span>
              </div>
            </div>

            {/* Device Info */}
            <h3 style={{ margin: '0 0 6px', fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500 }}>{L.setupTitle}</h3>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: GOLD, fontWeight: 600, marginBottom: 20 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg> 
              {L.device}
            </div>

            {/* Instruction Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { n: '1', title: L.step1T, desc: L.step1D },
                { n: '2', title: L.step2T, desc: L.step2D },
                { n: '3', title: L.step3T, desc: L.step3D },
                { n: '4', title: L.step4T, desc: L.step4D }
              ].map((step) => (
                <div key={step.n} style={{ display: 'flex', gap: 14, borderTop: step.n !== '1' ? `1px solid rgba(248,248,248,0.08)` : 'none', paddingTop: step.n !== '1' ? 14 : 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(199,159,63,0.15)', border: `1px solid ${GOLD}`, color: GOLD, fontWeight: 700, fontSize: 13, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    {step.n}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: GOLD, margin: '0 0 4px' }}>{step.title}</h4>
                    <p style={{ fontSize: 13, color: 'rgba(248,248,248,0.7)', margin: 0, lineHeight: 1.55 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Zone */}
            <div style={{ marginTop: 24, border: `1.5px dashed ${GOLD}`, borderRadius: 12, padding: 24, textAlign: 'center', color: 'rgba(248,248,248,0.7)', fontSize: 13, background: 'rgba(5, 18, 36, 0.25)' }}>
              <strong>{L.uploadZone.split('here')[0]}here</strong>{L.uploadZone.split('here')[1]}
            </div>

            {/* Action buttons mimicking uploaded design */}
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <button style={{ flex: 1, padding: '12px 18px', border: `1.5px solid ${GOLD}`, borderRadius: 6, background: `linear-gradient(135deg, ${GOLD}, #a37c2a)`, color: '#051224', fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                {L.contact}
              </button>
              <button style={{ flex: 1, padding: '12px 18px', border: `1.5px solid ${GOLD}`, borderRadius: 6, background: 'transparent', color: GOLD, fontFamily: "'Jost', sans-serif", fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s ease' }}>
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
