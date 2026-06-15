'use client';

/**
 * Sierra AI REALTY — PUBLIC LANDING PAGE V2 (VERCEL MONOCHROME EDITION)
 * ─────────────────────────────────────────────────────────────────
 * Route:  /landing   (customer-facing, no login required)
 * Portal: /          (advisor dashboard, login required)
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { collection, addDoc, getDocs, query, limit, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/models/schema";
import { useI18n } from "@/lib/I18nContext";
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  Building2, MapPin, DollarSign, Search, MessageSquare, 
  Layers, Users, Sliders, TrendingUp, Compass, Maximize, 
  Sparkles, CheckCircle2, ChevronRight, UserCheck, ShieldAlert,
  ArrowRight, Globe, Moon, Sun, ArrowUpRight
} from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';

// ─── Compound geospatial coordinates (simulated map data) ──────────
const COMPOUNDS = [
  { name: "Mivida",      ar: "ميفيدا",       top: "28%", left: "22%", units: 47, roi: "+12.4%" },
  { name: "District 5",  ar: "ديستريكت 5",    top: "42%", left: "56%", units: 33, roi: "+10.8%" },
  { name: "Villette",    ar: "فيليت",         top: "60%", left: "30%", units: 29, roi: "+11.5%" },
  { name: "IL Bosco",    ar: "آيل بوسكو",     top: "65%", left: "68%", units: 24, roi: "+9.2%" },
  { name: "Palm Hills",  ar: "بالم هيلز",     top: "76%", left: "42%", units: 18, roi: "+10.1%" },
];

const FALLBACK_LISTINGS = [
  { id: "fallback-1", title: "The Glass Pavilion",    compound: "Mivida",     bedrooms: 3, area: 245, price: 12500000, propertyType: "Villa", description: "Vetted premium villa offering exceptional spatial privacy and a clean aesthetic." },
  { id: "fallback-2", title: "The Meridian",          compound: "District 5", bedrooms: 4, area: 310, price: 18200000, propertyType: "Penthouse", description: "Stunning double-height luxury penthouse with panoramic New Cairo views." },
  { id: "fallback-3", title: "Golden Estate",         compound: "Palm Hills",  bedrooms: 5, area: 520, price: 24000000, propertyType: "Villa", description: "Signature family estate with premium architectural accents and garden landscapes." },
];

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
//  LANDING CONTENT
// ══════════════════════════════════════════════════════════
function LandingContent() {
  const { locale, setLocale, dir } = useI18n();
  const ar = locale === "ar";

  const [scrolled, setScrolled] = useState(false);
  const [listings, setListings] = useState<any[]>(FALLBACK_LISTINGS);
  const [currency, setCurrency] = useState<'EGP' | 'USD'>('EGP');
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [formState, setFormState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [formError, setFormError] = useState("");

  const exchangeRate = 50; // simulated conversion rate

  // Scroll listener
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Firebase listings loading
  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, COLLECTIONS.units), limit(3)));
        if (!snap.empty) {
          setListings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      } catch { /* use fallback */ }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (formData.name.trim().length < 2) { setFormError(ar ? "ادخل اسمك الكامل" : "Please enter your full name"); return; }
    if (!formData.phone.match(/^(\+20|0)?1[0-9]{9}$/)) { setFormError(ar ? "رقم هاتف مصري غير صالح" : "Please enter a valid Egyptian phone number"); return; }
    setFormState("loading");
    try {
      await addDoc(collection(db, "leads"), { ...formData, source: "landing_v2_vercel", locale, createdAt: serverTimestamp() });
      setFormState("done");
    } catch { 
      setFormState("error"); 
      setFormError(ar ? "حدث خطأ، حاول مرة أخرى" : "Something went wrong. Please try again."); 
    }
  };

  const formatPrice = (p: number) => {
    if (currency === 'USD') {
      return `$${Math.round(p / exchangeRate).toLocaleString()}`;
    }
    return `EGP ${p.toLocaleString()}`;
  };

  // Scroll Parallax Hooks for Hero Section
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-black text-white selection:bg-red-500 selection:text-white antialiased font-body min-h-screen overflow-x-hidden relative" dir={dir}>
      
      {/* ══ STYLIZED VERCEL GRID BACKGROUND ══ */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20 z-0" />
      
      {/* Ambient Red Glow in Background */}
      <div className="absolute top-[-10%] right-[10%] w-[60vw] h-[40vw] bg-red-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ── NAV ── */}
      <nav className={`fixed top-0 inset-x-0 z-[1000] border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md border-white/10 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/landing" className="hover:opacity-90 transition-opacity">
            <BrandLogo size="md" />
          </Link>

          {/* Links */}
          <div className="hidden lg:flex items-center gap-8 border border-white/5 bg-white/5 backdrop-blur-md rounded-full px-6 py-2">
            {[
              { en: "Properties", ar: "العقارات", href: "#listings" },
              { en: "Intelligence", ar: "الذكاء الجغرافي", href: "#intel" },
              { en: "Sierra AI", ar: "سييرا AI", href: "#sierra" },
              { en: "Contact", ar: "تواصل", href: "#contact" },
            ].map((l) => (
              <a key={l.en} href={l.href} className="text-xs tracking-widest uppercase font-semibold text-neutral-400 hover:text-white transition-colors duration-200">
                {ar ? l.ar : l.en}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Currency switcher pill */}
            <div className="flex items-center border border-white/10 rounded-full p-0.5 bg-neutral-900/80">
              {['EGP', 'USD'].map(cur => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur as any)}
                  className={`text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase transition-all duration-300 relative ${
                    currency === cur ? 'text-black font-extrabold' : 'text-neutral-400'
                  }`}
                >
                  <span className="relative z-10">{cur}</span>
                  {currency === cur && (
                    <motion.div 
                      layoutId="landingCurrencyPill" 
                      className="absolute inset-0 bg-white rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button className="px-3 py-1.5 border border-white/10 bg-neutral-900/50 hover:bg-neutral-800 rounded-full text-[10px] font-bold tracking-widest uppercase text-neutral-300 hover:text-white transition-all duration-200" onClick={() => setLocale(ar ? "en" : "ar")}>
              {ar ? "EN" : "AR"}
            </button>
            
            <Link href="/" className="hidden sm:inline-flex px-4 py-2 bg-white text-black hover:bg-neutral-200 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase transition-all duration-200 border border-white/10 shadow-sm">
              {ar ? "بوابة المستشارين" : "Advisor Portal"} →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden z-10">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-red-500/30 bg-red-500/5 rounded-full text-[10px] font-bold tracking-widest uppercase text-red-400 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            {ar ? "أكبر محفظة عقارية في القاهرة الجديدة" : "New Cairo's Premier AI Real Estate Platform"}
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8 font-display">
            {ar ? (
              <>
                <span className="text-neutral-500 block">قرارات أذكى.</span>
                <span className="text-white block mt-2">مدعومة بالذكاء الاصطناعي.</span>
              </>
            ) : (
              <>
                <span className="text-neutral-500 block">Smarter Decisions.</span>
                <span className="text-white block mt-2">AI-Driven.</span>
              </>
            )}
          </h1>

          {/* Paragraph */}
          <p className="text-base sm:text-xl font-light text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {ar
              ? "سييرا بلو — أبعد من مجرد وساطة. نجمع بين أفضل العقارات في التجمع الخامس مع ذكاء اصطناعي يجد لك ما يناسبك بدقة."
              : "Sierra AI Realty — curating the finest properties across New Cairo's top compounds, powered by AI that understands exactly what you're looking for."}
          </p>

          {/* Action buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all"
            >
              {ar ? "استكشف العقارات" : "Explore Properties"} →
            </button>
            <button 
              onClick={() => document.getElementById("sierra")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 border border-white/10 bg-neutral-950/80 text-white hover:bg-neutral-900 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all"
            >
              🤖 {ar ? "تحدث مع سييرا" : "Meet Sierra AI"}
            </button>
          </div>

          {/* Quick stats grid */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 border-t border-white/5 pt-12 mt-16 w-full max-w-2xl justify-center text-center">
            {[
              { n: "1.2K+", l: ar ? "وحدة متاحة" : "Live Assets" },
              { n: "98%",   l: ar ? "دقة المطابقة" : "Match Score" },
              { n: "5+",    l: ar ? "كمباوند" : "Compounds" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-4xl font-black font-display text-white">{s.n}</div>
                <div className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint line */}
        <div className="absolute bottom-8 left-50% translate-x-[-50%] flex flex-col items-center gap-2 pointer-events-none opacity-40">
          <div className="w-px h-10 bg-gradient-to-b from-red-500 to-transparent animate-pulse" />
          <span className="text-[8px] uppercase tracking-widest font-mono text-neutral-500">{ar ? "مرر" : "Scroll"}</span>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="relative py-8 border-y border-white/5 bg-neutral-950/40 z-10 text-center flex flex-wrap justify-between items-center px-8 max-w-7xl mx-auto gap-6">
        <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase">{ar ? "موثوق في" : "Featured in"}</span>
        <div className="flex gap-8 flex-wrap justify-center items-center">
          {["Emaar", "SODIC", "Mountain View", "Palm Hills", "ZED East"].map((b) => (
            <span key={b} className="text-xs font-mono font-bold text-neutral-400 hover:text-white cursor-default transition-colors">{b}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 bg-neutral-900/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[9px] font-bold text-neutral-300 tracking-wider">Property Finder · Live Sync</span>
        </div>
      </div>

      {/* ── LISTINGS Curated Cards ── */}
      <section id="listings" className="relative py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-3">{ar ? "مختارة بعناية" : "Curated Selection"}</span>
              <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">{ar ? "عقارات مميزة" : "Featured Assets"}</h2>
              <p className="text-neutral-400 font-light mt-3 max-w-xl">{ar ? "أفضل الوحدات في كمباوندات التجمع الخامس — متزامنة مع بروبرتي فايندر." : "Hand-picked from New Cairo's most coveted compounds — synced live with Property Finder."}</p>
            </div>
            <Link href="/" className="px-5 py-2.5 border border-white/10 hover:border-white/20 bg-neutral-950 text-white rounded-full font-mono text-[10px] font-bold tracking-wider uppercase transition-colors">
              {ar ? "كل العقارات" : "View All"} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((l, i) => (
              <Interactive3DCard key={l.id || i}>
                <div className="relative group border border-white/10 rounded-2xl overflow-hidden bg-neutral-950 flex flex-col h-full hover:border-red-500/40 transition-colors duration-300">
                  <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
                    <img
                      src={l.featuredImage || l.images?.[0] || (l.propertyType === 'villa' ? '/villa.png' : '/penthouse.png')}
                      alt={l.title}
                      className="w-full h-full object-cover grayscale opacity-85 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 text-[8px] font-bold tracking-widest text-red-400">
                      {l.dealStatus || (i === 0 ? "Signature" : "Hot Deal")}
                    </div>
                    {/* Live Sync active dot */}
                    <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold text-red-500 tracking-widest uppercase mb-1">{l.compound || "New Cairo"}</div>
                      <h4 className="text-xl font-bold tracking-tight text-white mb-2 leading-snug group-hover:text-red-400 transition-colors">{l.title || `Luxury Unit ${i + 1}`}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light mb-4">{l.description || 'Exclusive luxury offering synced directly from Property Finder listing stream.'}</p>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <div className="font-mono text-lg font-bold text-white mb-4">{formatPrice(l.price || 12000000)}</div>
                      <div className="flex gap-4 text-[10px] font-mono text-neutral-500 mb-4">
                        <span>🛏 {l.bedrooms || l.beds || 3} {ar ? "غرف" : "BR"}</span>
                        <span>📐 {l.area || l.sqm || 245} m²</span>
                      </div>
                      <div className="text-[10px] font-bold tracking-widest uppercase text-white group-hover:text-red-400 transition-colors flex items-center gap-1">
                        {ar ? "عرض التفاصيل" : "View Details"} <ArrowRight size={10} />
                      </div>
                    </div>
                  </div>
                </div>
              </Interactive3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTELLIGENCE MAP HUD ── */}
      <section id="intel" className="relative py-32 px-6 border-t border-white/5 bg-neutral-950/40 z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col mb-12">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-3">{ar ? "بيانات حية" : "Live Intelligence"}</span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">{ar ? "خريطة التجمع الخامس" : "New Cairo Coverage Map"}</h2>
          </div>

          <div className="relative h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl">
            {/* Stylised abstract vector map background */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Grid matrix overlay */}
              {[...Array(10)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 11 + 5} x2="100" y2={i * 11 + 5} stroke="white" strokeOpacity="0.05" strokeWidth="0.1"/>
              ))}
              {[...Array(12)].map((_, i) => (
                <line key={`v${i}`} x1={i * 9 + 3} y1="0" x2={i * 9 + 3} y2="100" stroke="white" strokeOpacity="0.05" strokeWidth="0.1"/>
              ))}
              {/* Abstract Roads */}
              <path d="M0 50 Q25 46 50 54 T100 48" stroke="white" strokeOpacity="0.15" strokeWidth="0.3" fill="none"/>
              <path d="M35 0 Q40 40 50 60 T60 100" stroke="white" strokeOpacity="0.12" strokeWidth="0.25" fill="none"/>
            </svg>

            {/* Live map floating label */}
            <div className="absolute top-6 left-6 z-[100] bg-black/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-xs font-mono font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              🇪🇬 {ar ? "التجمع الخامس — القاهرة الجديدة" : "New Cairo · 5th Settlement Matrix"}
            </div>

            {/* Compounds hotspots pin points */}
            {COMPOUNDS.map((c, i) => (
              <div key={c.name} className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10" style={{ top: c.top, left: c.left }}>
                <div className="relative group">
                  {/* Outer pulsating ring */}
                  <div className="absolute top-[-8px] left-[-8px] w-[26px] h-[26px] rounded-full border border-red-500/30 animate-ping opacity-75" />
                  {/* Central glowing dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                  
                  {/* Tooltip dynamic card on hover */}
                  <div className="absolute left-6 top-[-15px] scale-0 group-hover:scale-100 transition-transform origin-left bg-black/90 border border-white/10 rounded-xl p-3 shadow-2xl w-44 z-[500] pointer-events-none">
                    <div className="font-bold text-xs text-white">{ar ? c.ar : c.name}</div>
                    <div className="text-[9px] font-mono text-red-400 mt-1">{c.units} listings · {c.roi} Yield</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 right-6 z-[100] bg-black/90 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-mono text-neutral-400">
              5 Compounds · 151 Active Synced Listings
            </div>
          </div>
        </div>
      </section>

      {/* ── SIERRA AI Telegram Console preview ── */}
      <section id="sierra" className="relative py-32 px-6 z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl mb-6">🤖</div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-3">Egypt's Premier PropTech Bot</span>
              <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mb-8">Meet Sierra AI Advisor</h2>
              <p className="text-neutral-400 font-light leading-relaxed mb-8">
                Sierra is our dedicated real estate neural assistant deployed on Telegram. She processes unstructured WhatsApp/Telegram chats, cross-references historical transaction ledgers, and suggests highly optimized compound options.
              </p>
              <a href="https://t.me/SierraBluBot" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-transform active:scale-[0.98]">
                📲 {ar ? "ابدأ مع سييرا على تيليجرام" : "Start with Sierra on Telegram"}
              </a>
            </div>

            {/* Telegram simulated interface card */}
            <div className="border border-white/10 rounded-2xl bg-neutral-950 p-6 shadow-2xl">
              <div className="flex flex-col gap-4 font-mono text-xs text-left">
                <div>
                  <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Sierra AI Advisor 🤖</div>
                  <div className="bg-neutral-900 border border-white/5 rounded-xl p-4 text-white">
                    {ar ? "أهلاً! أنا سييرا 👋 مساعدتك الذكية في سييرا بلو. حضرتك بتدور على إيه؟" : "Hello! I'm Sierra 👋 Your AI real estate advisor at Sierra AI. How can I help you today?"}
                  </div>
                </div>
                
                <div className="bg-white text-black self-end rounded-xl p-4 font-semibold max-w-[85%]">
                  {ar ? "عايز فيلا في ميفيدا، ٣ غرف، حوالي ١٥ مليون" : "Looking for a 3BR villa in Mivida, around 15M EGP"}
                </div>

                <div>
                  <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Sierra AI Advisor 🤖</div>
                  <div className="bg-neutral-900 border border-white/5 rounded-xl p-4 text-white">
                    {ar ? "لقيتلك ٣ وحدات مناسبة في ميفيدا بمستوى مطابقة ٩٦٪. هبعتلك ملف العرض حالاً... ✨" : "Processing compound velocity vectors... I found 3 matching villas in Mivida with 96% match score. Generating selection proposal."}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA FORM ── */}
      <section id="contact" className="relative py-32 px-6 border-t border-white/5 bg-neutral-950/40 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-3">{ar ? "ابدأ رحلتك" : "Begin Your Journey"}</span>
              <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-[1.1]">{ar ? <>جد مكانك في <em className="text-red-500 not-italic">القاهرة الجديدة</em></> : <>Find Your Place in <em className="text-red-500 not-italic">New Cairo.</em></>}</h2>
              <p className="text-neutral-400 font-light mt-6 leading-relaxed">
                {ar ? "دع الذكاء الاصطناعي يطابقك مع منزلك المثالي. تواصل مع مستشارينا الآن." : "Let our AI match you with your perfect home. Our senior luxury advisors respond within 2 hours."}
              </p>
            </div>

            {/* Direct lead generation box */}
            <div className="border border-white/10 rounded-2xl bg-neutral-950 p-8 shadow-2xl">
              {formState === "done" ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-4">✓</div>
                  <div className="text-xl font-bold text-white mb-2">{ar ? "تم الاستلام!" : "Received!"}</div>
                  <p className="text-xs text-neutral-400">{ar ? "سنتواصل معك خلال ساعتين." : "An advisor will establish direct contact within 2 hours."}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-left font-display">
                    <h3 className="text-xl font-bold text-white mb-1">{ar ? "احجز جلسة مجانية" : "Book a Free Session"}</h3>
                    <p className="text-xs text-neutral-500">{ar ? "لا توجد التزامات — فقط نتائج." : "No commitment — just custom asset matching results."}</p>
                  </div>
                  
                  <input
                    type="text"
                    required
                    placeholder={ar ? "الاسم الكامل" : "Full Name"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                  
                  <input
                    type="tel"
                    required
                    placeholder={ar ? "رقم الهاتف" : "Phone (01XXXXXXXXX)"}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                  />

                  {formError && <div className="text-xs text-red-500 font-mono text-left">{formError}</div>}

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs tracking-wider uppercase py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98]"
                  >
                    {formState === "loading" ? (ar ? "جاري الإرسال..." : "Sending...") : (ar ? "احجز الآن" : "Secure My Session")}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-24 px-6 border-t border-white/10 bg-black z-10 text-neutral-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <BrandLogo size="lg" />
              <p className="text-xs text-neutral-500 leading-relaxed italic max-w-sm mt-6">
                {ar ? '"العقارات في مصر لم تعد مجرد موقع — إنها بيانات، رغبة، وتصميم."' : '"Real estate in New Cairo is no longer just location — it\'s data, desire, and design."'}
              </p>
            </div>

            {[
              { title: ar ? "استكشاف" : "Discovery", links: [{ en: "All Listings", ar: "كل العقارات" }, { en: "Intelligence", ar: "ذكاء السوق" }, { en: "New Cairo Map", ar: "خريطة التجمع" }] },
              { title: ar ? "تواصل" : "Contact", links: [{ en: "+20 100 123 4567", ar: "+20 100 123 4567" }, { en: "hello@sierrablurealty.com", ar: "hello@sierrablurealty.com" }, { en: "New Cairo, Egypt", ar: "التجمع الخامس، مصر" }] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-6">{col.title}</h4>
                <ul className="space-y-3 text-xs">
                  {col.links.map((l) => (
                    <li key={l.en} className="hover:text-white transition-colors cursor-pointer">{ar ? l.ar : l.en}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-6">
            <span className="text-[10px] font-mono text-neutral-600">© 2026 Sierra AI Realty · Digital Concierge V13.0</span>
            <div className="flex gap-8 text-[10px] uppercase font-bold text-neutral-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function LandingPage() {
  return <LandingContent />;
}
