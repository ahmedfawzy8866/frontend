'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  Building2, MapPin, DollarSign, Search, MessageSquare, 
  Layers, Users, Sliders, TrendingUp, Compass, Maximize, 
  Sparkles, CheckCircle2, ChevronRight, UserCheck, ShieldAlert,
  ArrowRight, Globe, Moon, Sun, ArrowUpRight
} from 'lucide-react';
import BrandLogo from '@/components/UI/BrandLogo';
import { InventoryService, Property } from '@/lib/services/InventoryService';

// Stylized Image Bridge component
function Image({ src, alt, fill, className, priority }: { src: string; alt: string; fill?: boolean; className?: string; priority?: boolean }) {
  return <img src={src} alt={alt} className={`${className} ${fill ? 'absolute inset-0 w-full h-full' : ''}`} loading={priority ? 'eager' : 'lazy'} />;
}

// ══════════════════════════════════════════════════════════
//  SPRING 3D HOVER CARD COMPONENT
// ══════════════════════════════════════════════════════════
function Interactive3DCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: 'translateZ(15px)' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════
//  SMART REAL ESTATE FILTER COMPONENT (VERCEL MONOCHROME)
// ══════════════════════════════════════════════════════════
function SmartRealEstateFilter({ isAr }: { isAr: boolean }) {
  const [purpose, setPurpose] = useState<'buy' | 'rent'>('buy');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  const handleSearch = () => {
    const searchData = {
      purpose,
      location,
      type,
      maxPrice: price
    };
    const queryParams = new URLSearchParams(searchData).toString();
    window.location.href = '/listings?' + queryParams;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-neutral-950/90 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden z-20">
      
      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/5 pb-4 mb-6">
        <button
          onClick={() => setPurpose('buy')}
          className={`px-6 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all relative cursor-pointer ${
            purpose === 'buy' ? 'text-black font-extrabold font-mono' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span className="relative z-10">{isAr ? 'شراء' : 'Buy'}</span>
          {purpose === 'buy' && (
            <motion.div
              layoutId="filterPurposePill"
              className="absolute inset-0 bg-white rounded-lg z-0"
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            />
          )}
        </button>
        <button
          onClick={() => setPurpose('rent')}
          className={`px-6 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all relative cursor-pointer ${
            purpose === 'rent' ? 'text-black font-extrabold font-mono' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span className="relative z-10">{isAr ? 'إيجار' : 'Rent'}</span>
          {purpose === 'rent' && (
            <motion.div
              layoutId="filterPurposePill"
              className="absolute inset-0 bg-white rounded-lg z-0"
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            />
          )}
        </button>
      </div>

      {/* Grid fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Location Dropdown */}
        <div className="flex flex-col text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">
            {isAr ? 'الموقع' : 'Location'}
          </label>
          <div className="relative">
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer appearance-none pr-8 pl-4"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a1a1a1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundPosition: isAr ? 'left 12px center' : 'right 12px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <option value="" className="bg-neutral-950">{isAr ? 'كل المدن' : 'All Cities'}</option>
              <option value="cairo" className="bg-neutral-950">{isAr ? 'القاهرة' : 'Cairo'}</option>
              <option value="giza" className="bg-neutral-950">{isAr ? 'الجيزة' : 'Giza'}</option>
              <option value="alex" className="bg-neutral-950">{isAr ? 'الإسكندرية' : 'Alexandria'}</option>
              <option value="sahel" className="bg-neutral-950">{isAr ? 'الساحل الشمالي' : 'North Coast'}</option>
            </select>
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="flex flex-col text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">
            {isAr ? 'نوع العقار' : 'Property Type'}
          </label>
          <div className="relative">
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer appearance-none pr-8 pl-4"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a1a1a1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundPosition: isAr ? 'left 12px center' : 'right 12px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <option value="" className="bg-neutral-950">{isAr ? 'كل الأنواع' : 'All Types'}</option>
              <option value="apartment" className="bg-neutral-950">{isAr ? 'شقة' : 'Apartment'}</option>
              <option value="villa" className="bg-neutral-950">{isAr ? 'فيلا' : 'Villa'}</option>
              <option value="chalet" className="bg-neutral-950">{isAr ? 'شاليه' : 'Chalet'}</option>
              <option value="office" className="bg-neutral-950">{isAr ? 'مكتب إداري' : 'Office'}</option>
            </select>
          </div>
        </div>

        {/* Price Range Dropdown */}
        <div className="flex flex-col text-left">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 block">
            {isAr ? 'السعر الأقصى' : 'Max Price'}
          </label>
          <div className="relative">
            <select
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-red-500 transition-colors cursor-pointer appearance-none pr-8 pl-4"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23a1a1a1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundPosition: isAr ? 'left 12px center' : 'right 12px center',
                backgroundSize: '16px',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <option value="" className="bg-neutral-950">{isAr ? 'أي سعر' : 'Any Price'}</option>
              <option value="1000000" className="bg-neutral-950">{isAr ? 'حتى 1,000,000 ج.م' : 'Up to 1,000,000 EGP'}</option>
              <option value="3000000" className="bg-neutral-950">{isAr ? 'حتى 3,000,000 ج.م' : 'Up to 3,000,000 EGP'}</option>
              <option value="5000000" className="bg-neutral-950">{isAr ? 'حتى 5,000,000 ج.م' : 'Up to 5,000,000 EGP'}</option>
              <option value="10000000" className="bg-neutral-950">{isAr ? 'حتى 10,000,000 ج.م' : 'Up to 10,000,000 EGP'}</option>
            </select>
          </div>
        </div>

        {/* Search submit button */}
        <div className="flex flex-col">
          <button
            onClick={handleSearch}
            className="w-full bg-white text-black hover:bg-neutral-200 py-3.5 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span>{isAr ? 'ابحث الآن' : 'Search Now'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  MAIN LANDING PAGE MODULE
// ══════════════════════════════════════════════════════════
export default function SierraJuneLastFrontend() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [filter, setFilter] = useState<'ALL' | 'RENT' | 'RESALE'>('ALL');
  const [inventory, setInventory] = useState<any[]>([]);
  const [selectedMapProp, setSelectedMapProp] = useState<any>(null);
  const [currency, setCurrency] = useState<'EGP' | 'USD'>('EGP');
  const [leadForm, setLeadForm] = useState({ name: '', phone: '' });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const isAr = lang === 'ar';
  const exchangeRate = 50;

  // Peachworlds Stereoscopic Mouse Trackers
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 15 });

  const rotateX = useTransform(springY, [-400, 400], [6, -6]);
  const rotateY = useTransform(springX, [-400, 400], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  // LOAD REAL PROPERTY FINDER INTEGRATED LISTINGS FROM FIRESTORE
  useEffect(() => {
    // Fetch live portfolio data from Firebase doc collection
    InventoryService.getFeaturedListings(6).then(listings => {
      const fallbackCoords = [
        { lat: 30.0131, lng: 31.5122 },
        { lat: 30.0254, lng: 31.3122 },
        { lat: 30.0089, lng: 31.4988 },
        { lat: 30.0180, lng: 31.4800 },
        { lat: 30.0300, lng: 31.5200 },
        { lat: 30.0220, lng: 31.5000 }
      ];

      const mapped = listings.map((p, idx) => ({
        id: p.id || `SBR-UNIT-${idx}`,
        titleEn: p.title || 'Premium Vetted Unit',
        titleAr: p.titleAr || p.title || 'وحدة عقارية مميزة',
        compound: p.compound || 'New Cairo',
        price: `EGP ${p.price.toLocaleString()}`,
        rawPrice: p.price,
        purpose: p.status?.toLowerCase().includes('rent') ? 'RENT' : 'RESALE',
        beds: p.bedrooms || 3,
        baths: p.bathrooms || 3,
        bua: p.area ? String(p.area) : '240',
        img: p.propertyType === 'villa' ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        aiScore: (9.0 + (idx % 10) * 0.1).toFixed(1),
        lat: p.coordinates?.lat || fallbackCoords[idx % fallbackCoords.length].lat,
        lng: p.coordinates?.lng || fallbackCoords[idx % fallbackCoords.length].lng
      }));

      // Fallback to defaults if Firestore is empty
      if (mapped.length === 0) {
        const defaults = REAL_ESTATE_INVENTORY.map((p, idx) => ({
          ...p,
          rawPrice: parseInt(p.price.replace(/[^0-9]/g, '')) || 12000000
        }));
        setInventory(defaults);
        setSelectedMapProp(defaults[0]);
      } else {
        setInventory(mapped);
        setSelectedMapProp(mapped[0]);
      }
    }).catch(() => {
      // Fallback to static inventory
      const defaults = REAL_ESTATE_INVENTORY.map((p, idx) => ({
        ...p,
        rawPrice: parseInt(p.price.replace(/[^0-9]/g, '')) || 12000000
      }));
      setInventory(defaults);
      setSelectedMapProp(defaults[0]);
    });
  }, []);

  const convertPriceString = (priceStr: string, rawVal?: number) => {
    const num = rawVal || parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    if (currency === 'EGP') {
      return `EGP ${num.toLocaleString()}`;
    }
    const converted = Math.round(num / exchangeRate);
    const suffix = priceStr.toLowerCase().includes('mo') ? ' / mo' : '';
    return `USD ${converted.toLocaleString()}${suffix}`;
  };

  const filteredProperties = inventory.filter(p => filter === 'ALL' || p.purpose === filter);

  return (
    <div 
      className="min-h-screen bg-black text-white antialiased selection:bg-red-500 selection:text-white relative overflow-x-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
      style={{
        fontFamily: isAr 
          ? '"Cairo", "Tajawal", system-ui, sans-serif' 
          : '"Outfit", "Inter", system-ui, sans-serif'
      }}
    >
      {/* 🌟 GOOGLE FONTS INJECTOR 🌟 */}
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ══ STYLIZED VERCEL GRID BACKGROUND ══ */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-25 z-0" />
      
      {/* Red Outline Shield Ambient Radial Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[60vw] h-[40vw] bg-red-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 1. FIXED LUXURY GLASS CONTROL DECK NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-6 py-5 md:px-12 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-all">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <BrandLogo size="md" />
        </Link>

        {/* AirCenter Global Infrastructure Status Panel */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-neutral-950/70 border border-white/5 rounded-full shadow-sm">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-neutral-500">
            Node-Sync v12.4 · Local Storage Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency switcher pill */}
          <div className="flex items-center border border-white/10 rounded-full p-0.5 bg-neutral-900/80">
            {['EGP', 'USD'].map(cur => (
              <button
                key={cur}
                onClick={() => setCurrency(cur as any)}
                className={`text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase transition-all duration-300 relative cursor-pointer ${
                  currency === cur ? 'text-black font-extrabold font-mono' : 'text-neutral-400'
                }`}
              >
                <span className="relative z-10">{cur}</span>
                {currency === cur && (
                  <motion.div 
                    layoutId="heroCurrencyPill" 
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
            className="px-4 py-1.5 bg-neutral-900 border border-white/10 hover:border-red-500 rounded-full text-xs font-bold transition-all uppercase text-neutral-300 hover:text-white cursor-pointer"
          >
            {isAr ? 'ENGLISH' : 'العربية'}
          </button>
          
          <Link href="/admin" className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-semibold tracking-wider uppercase transition-all rounded-full shadow-sm font-mono border border-white/10">
            {isAr ? 'لوحة التحكم' : 'Console'}
          </Link>
        </div>
      </nav>

      {/* 2. TREF LAYOUT HERO WITH PEACHWORLDS MOUSE PERSPECTIVE ENGINE */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        className="relative min-h-[95dvh] w-full flex flex-col items-center justify-center pt-36 pb-12 px-6 md:px-12 max-w-[1500px] mx-auto overflow-hidden z-10"
      >
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-16">
          
          {/* Left Text Grid Section */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-950 border border-white/10 rounded-full w-max mb-6 shadow-sm">
              <span className="text-xs">⚡</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-red-400 font-mono">Intelligence OS v13</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.05] text-white font-display mb-8">
              {isAr ? (
                <>منصة الـ <span className="text-red-500 font-black italic">SaaS الأولى</span> بالقاهرة الجديدة للإيجار وإعادة البيع.</>
              ) : (
                <>New Cairo’s dedicated <span className="text-red-500 font-black italic">SaaS platform</span> for Rent and Resale.</>
              )}
            </h1>
            
            <p className="text-lg text-neutral-400 font-light max-w-xl mb-10 leading-relaxed font-sans">
              {isAr ? 'عقارات استثنائية، مطابقة بدقة متناهية. نوجّه المستثمرين نحو ممرات النمو الأعلى عائدًا عبر أدوات تقييم معتمدة.' : 'Exceptional properties, precisely matched. We guide discerning investors toward high-performing asset corridors using empirical metrics.'}
            </p>
          </div>

          {/* Right Floating Perspective Container (Peachworlds Mechanism) */}
          <div className="w-full lg:w-[45%] h-[450px] lg:h-[600px] perspective-[1500px]">
            <motion.div 
              style={{ rotateX, rotateY }}
              className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-neutral-950 transition-all duration-300 ease-out hover:border-red-500/30"
            >
              <Image 
                src="https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=1200" 
                alt="Sierra June Absolute Asset Rendering View" 
                fill 
                className="object-cover scale-102 select-none pointer-events-none opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                priority
              />
              {/* Vercel Overlay style */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-neutral-500 block mb-0.5">SaaS System Focus</span>
                  <span className="font-serif text-base font-bold text-white">Golden Square Node</span>
                </div>
                <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-md">98.4% Match</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Integrated HTML Smart Real Estate Filter Container React Conversion */}
        <div className="w-full relative z-30">
          <SmartRealEstateFilter isAr={isAr} />
        </div>
      </section>

      {/* 3. HUBTOWN MAP CONSOLE: PRICE-PINNING PLOTTING FRAMEWORK */}
      <section id="map-search" className="w-full h-[85dvh] min-h-[580px] border-t border-white/10 bg-black flex flex-col lg:flex-row relative overflow-hidden z-20">
        
        {/* Map Information Sidebar */}
        <aside className="w-full lg:w-[380px] h-[35dvh] lg:h-full bg-neutral-950 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col z-20 shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-neutral-950">
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-red-500">{isAr ? 'مستكشف النطاق الجغرافي' : 'Spatial Index Explorer'}</span>
            <h2 className="font-display text-xl font-bold text-white mt-1">{isAr ? 'خريطة التوزيع الجغرافي' : 'SaaS Coordinate Tracking'}</h2>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 no-scrollbar">
            {inventory.map((prop) => (
              <div 
                key={prop.id}
                onClick={() => setSelectedMapProp(prop)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                  selectedMapProp?.id === prop.id ? 'border-red-500 bg-red-500/5 ring-1 ring-red-500' : 'border-white/5 bg-neutral-900/40 hover:border-white/10'
                }`}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/10">
                  <Image src={prop.img} alt={prop.compound} fill className="object-cover grayscale" />
                </div>
                <div className="flex flex-col justify-between py-0.5 text-left">
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono">{convertPriceString(prop.price, prop.rawPrice)}</h4>
                    <p className="text-xs text-neutral-400 font-medium">{prop.compound}</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase text-red-400">{prop.purpose}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Vector Mapping Coordinates Spatial Canvas Grid */}
        <div className="flex-1 h-full bg-black relative z-10 flex items-center justify-center border-l border-white/5">
          {/* Cyber grid system */}
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(white_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
          
          {/* Mathematical Property coordinate pin rendering arrays */}
          {inventory.map((prop) => {
            const plotX = 35 + ((prop.lng - 31.3) * 450);
            const plotY = 50 - ((prop.lat - 30.0) * 550);
            const isActive = selectedMapProp?.id === prop.id;

            return (
              <button
                key={prop.id}
                onClick={() => setSelectedMapProp(prop)}
                style={{ left: `${plotX}%`, top: `${plotY}%` }}
                className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 outline-none"
              >
                <div className={`px-4 py-2 rounded-full text-[11px] font-mono font-bold shadow-2xl flex items-center gap-1.5 transition-all duration-300 border ${
                  isActive ? 'bg-red-500 text-white border-red-500 scale-110 z-30 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-neutral-905 border-white/10 text-neutral-300 hover:bg-white hover:text-black hover:scale-105'
                }`}>
                  <span className={isActive ? 'text-white' : 'text-red-500'}>📍</span> {convertPriceString(prop.price, prop.rawPrice).split(' ')[0]} {convertPriceString(prop.price, prop.rawPrice).split(' ')[1] || ''}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. DYNAMIC SEGMENTED DATASTREAM INVENTORY PORTFOLIO GRID */}
      <section id="portfolio" className="py-28 px-6 md:px-12 max-w-[1400px] mx-auto relative z-20">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-red-500 uppercase tracking-[0.25em] text-xs font-bold px-4 py-1.5 bg-neutral-950 rounded-full border border-white/10 shadow-sm">
            {isAr ? 'قوائم الملاك الموثقة' : 'Verified Datastreams'}
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-tight font-black mt-6 mb-8">
            {isAr ? 'محفظة الأصول المتاحة' : 'Curated Asset Streams'}
          </h2>
          
          {/* Minimal Capsule Segment Toggle Selector Switch Pill */}
          <div className="flex p-1 bg-neutral-950 border border-white/10 rounded-xl w-full max-w-xs shadow-sm">
            {(['ALL', 'RENT', 'RESALE'] as const).map((modeKey) => (
              <button 
                key={modeKey}
                onClick={() => setFilter(modeKey)}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all relative cursor-pointer ${
                  filter === modeKey ? 'text-black font-extrabold font-mono' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{modeKey}</span>
                {filter === modeKey && (
                  <motion.div 
                    layoutId="filterToggleSwitch" 
                    className="absolute inset-0 bg-white rounded-lg z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Property cards mapping loop layer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredProperties.map((prop) => (
            <Interactive3DCard key={prop.id}>
              <article 
                className="group bg-neutral-950 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-sm hover:border-red-500/30 transition-all duration-500 cursor-pointer flex flex-col h-full"
              >
                <div className="relative w-full h-[340px] overflow-hidden bg-neutral-900 border-b border-white/5">
                  <Image src={prop.img} alt={prop.compound} fill className="object-cover grayscale opacity-80 transition-transform duration-700 ease-out group-hover:scale-102 group-hover:grayscale-0 group-hover:opacity-100" />
                  
                  {/* Brochure Request action link trigger */}
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="bg-black/90 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold text-white tracking-wider shadow-sm">
                      {prop.id}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(isAr ? 'جاري تحضير كتيب وحدة العقار للتحميل... ✨' : 'Preparing listing PDF brochure download... ✨');
                      }}
                      className="bg-red-500 hover:bg-red-600 border border-red-500/20 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold text-white tracking-wider shadow-sm transition-colors cursor-pointer"
                    >
                      {isAr ? 'تحميل الكتيب PDF' : 'Get Brochure PDF'}
                    </button>
                  </div>
                  
                  {/* Matching score top-right floating index */}
                  <span className="absolute top-5 right-5 bg-red-500/90 border border-red-500/30 px-3.5 py-1 rounded text-[10px] font-mono font-bold text-white tracking-widest shadow-sm">
                    {prop.aiScore} SBR MATCH
                  </span>
                </div>
                
                <div className="p-8 flex flex-col justify-between flex-1 text-left">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-display text-2xl lg:text-3xl font-black tracking-tight text-white">{convertPriceString(prop.price, prop.rawPrice)}</h3>
                      <span className="text-neutral-500 text-xs font-mono border border-white/5 px-2.5 py-1 rounded bg-neutral-900">{prop.compound}</span>
                    </div>
                    <h4 className="text-sm font-medium text-neutral-400 mb-6 line-clamp-1">{isAr ? prop.titleAr : prop.titleEn}</h4>
                    
                    <div className="flex items-center gap-2.5 mb-2 bg-neutral-900 border border-white/5 p-4 rounded-2xl">
                      <span className="text-base text-red-500 font-mono">🧠</span>
                      <p className="text-xs text-white font-bold tracking-wide">
                        AI Matrix Assessment: <span className="font-light text-neutral-400 font-mono">BUA: {prop.bua}m² | {prop.beds} Beds | {prop.baths} Baths</span>
                      </p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 py-4 bg-white text-black hover:bg-neutral-200 rounded-xl transition-all font-mono font-bold text-xs tracking-widest uppercase">
                    {isAr ? 'استعراض البيانات الرقمية للوحدة' : 'View Digital Asset'}
                  </button>
                </div>
              </article>
            </Interactive3DCard>
          ))}
        </div>
      </section>

      {/* DIRECT CONTACT ENQUIRY */}
      <section className="relative py-28 px-6 md:px-12 border-t border-white/5 bg-neutral-950/40 z-20 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-widest uppercase text-red-500 mb-4 block">Secure Connection</span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white mb-6">Initialize Strategy Request</h2>
          <p className="text-neutral-400 text-sm font-light max-w-md leading-relaxed mb-10">
            A certified Sierra AI real estate advisor will establish direct communication via WhatsApp within 2 hours.
          </p>

          <div className="w-full border border-white/10 rounded-2xl bg-black p-6 shadow-2xl text-left">
            {leadStatus === 'success' ? (
              <div className="text-center py-10">
                <span className="text-3xl mb-3 block">✓</span>
                <h4 className="text-lg font-bold text-white mb-1">Yield Strategy Requested</h4>
                <p className="text-xs text-neutral-400">Our advisor is parsing target compounds for your inquiry.</p>
              </div>
            ) : (
              <form 
                onSubmit={e => {
                  e.preventDefault();
                  setLeadStatus('loading');
                  setTimeout(() => setLeadStatus('success'), 1200);
                }}
                className="space-y-4"
              >
                <input 
                  type="text" 
                  required 
                  placeholder={isAr ? 'الاسم الكامل' : 'Full Name'} 
                  value={leadForm.name} 
                  onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors" 
                />
                <input 
                  type="tel" 
                  required 
                  placeholder="01XXXXXXXXX" 
                  value={leadForm.phone} 
                  onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors" 
                />
                <button 
                  type="submit"
                  className="w-full py-4 bg-white text-black hover:bg-neutral-200 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  {leadStatus === 'loading' ? 'PROCESSING...' : 'SECURE YIELD SESSION'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. BRAND FOOTER DECK LAYER */}
      <footer className="bg-[#040E1C] text-[#EFF8F7]/60 py-16 px-6 text-center border-t border-white/5 relative z-20">
        <h2 className="font-serif text-3xl text-white font-bold tracking-tight">Sierra AI</h2>
        <p className="text-xs tracking-[0.25em] uppercase text-red-500 mt-2 mb-6 font-mono font-bold">PropTech Intelligence OS · 2026</p>
      </footer>
    </div>
  );
}