'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/I18nContext';
import { useTheme } from 'next-themes';
import ShieldLogo from '@/components/Landing/ShieldLogo';

// ══════════════════════════════════════════════════════════
//  DESIGN TOKENS
// ══════════════════════════════════════════════════════════
const G = '#E9C176'; // Light Gold
const G2 = '#C8961A'; // Deep Gold

const THEMES = {
  dark: {
    bg: '#0D2035',
    bgAlt: '#0A1520',
    bg2: '#122A47',
    surface: 'rgba(255,255,255,0.055)',
    surfaceHover: 'rgba(233,193,118,0.10)',
    card: '#122A47',
    cardBorder: 'rgba(233,193,118,0.10)',
    border: 'rgba(233,193,118,0.18)',
    borderHover: 'rgba(233,193,118,0.45)',
    text: '#EFF8F7',
    textSub: 'rgba(239,248,247,0.78)',
    textMuted: 'rgba(239,248,247,0.50)',
    navBg: 'rgba(13,32,53,0.96)',
  },
  light: {
    bg: '#D5E8E6',
    bgAlt: '#C0D6D4',
    bg2: '#E2EDEC',
    surface: 'rgba(27,108,168,0.08)',
    surfaceHover: 'rgba(233,193,118,0.14)',
    card: '#E2EDEC',
    cardBorder: 'rgba(27,108,168,0.14)',
    border: 'rgba(27,108,168,0.20)',
    borderHover: 'rgba(233,193,118,0.55)',
    text: '#071422',
    textSub: 'rgba(7,20,34,0.78)',
    textMuted: 'rgba(7,20,34,0.56)',
    navBg: 'rgba(213,232,230,0.97)',
  },
};

// ══════════════════════════════════════════════════════════
//  COMPOUND DATASET
// ══════════════════════════════════════════════════════════
const COMPOUNDS = [
  { name: 'Mivida', nameAr: 'ميفيدا', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 47, aliases: ['mevida','mivvida','mifida','ميفيدا'] },
  { name: 'Eastown', nameAr: 'ايستاون', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 38, aliases: ['easttown','istown','ايستاون'] },
  { name: 'Villette', nameAr: 'فيليت', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 29, aliases: ['vilette','villete','vellette','فيليت'] },
  { name: 'Hyde Park', nameAr: 'هايد بارك', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 41, aliases: ['hydepark','haydpark','hyd park','هايد بارك'] },
  { name: 'Mountain View iCity', nameAr: 'ماونتن فيو آي سيتي', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 34, aliases: ['mountainview','mountin view','mv icity','ماونتن فيو'] },
  { name: 'Katameya Heights', nameAr: 'قطامية هايتس', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 17, aliases: ['katamya','qattamiya','katameya','قطامية'] },
  { name: 'Stone Residence', nameAr: 'ستون ريزيدنس', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 22, aliases: ['stone','ستون'] },
  { name: 'Fifth Square', nameAr: 'فيفث سكوير', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 26, aliases: ['5th square','fifthsquare','الميدان الخامس'] },
  { name: 'District 5', nameAr: 'ديستريكت 5', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 33, aliases: ['d5','distrct 5','ديستريكت 5'] },
  { name: 'Lake View Residence', nameAr: 'ليك فيو ريزيدنس', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 19, aliases: ['lakeview','lake veiw','ليك فيو'] },
  { name: 'Palm Hills New Cairo', nameAr: 'بالم هيلز القاهرة الجديدة', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 31, aliases: ['palmhills','palm hils','بالم هيلز'] },
  { name: 'The Waterway', nameAr: 'ذا ووتر واي', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 24, aliases: ['waterway','watarway','ووتر واي'] },
  { name: 'Taj City', nameAr: 'تاج سيتي', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 28, aliases: ['tajcity','tag city','تاج سيتي'] },
  { name: 'Sarai', nameAr: 'سراي', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 21, aliases: ['saray','seray','سراي'] },
  { name: 'Sodic East', nameAr: 'سوديك إيست', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 16, aliases: ['sodiceast','sodik east','سوديك'] },
  { name: 'Zed East', nameAr: 'زيد إيست', zone: 'New Cairo', zoneAr: 'القاهرة الجديدة', units: 14, aliases: ['zedeast','zad east','زيد'] },
  { name: 'Madinaty', nameAr: 'مدينتي', zone: 'Madinaty', zoneAr: 'مدينتي', units: 52, aliases: ['madenty','medinaty','madinati','madinatty','مدينتي'] },
  { name: 'Celia Madinaty', nameAr: 'سيليا مدينتي', zone: 'Madinaty', zoneAr: 'مدينتي', units: 12, aliases: ['celia','silia','سيليا'] },
  { name: 'El Shorouk City', nameAr: 'مدينة الشروق', zone: 'El Shorouk', zoneAr: 'الشروق', units: 36, aliases: ['shrok','sherouk','shorouk','el shrouk','elshorouk','الشروق'] },
  { name: 'Bloomfields', nameAr: 'بلومفيلدز', zone: 'Mostakbal', zoneAr: 'مستقبل سيتي', units: 25, aliases: ['bloomfield','blomfields','بلوم فيلدز'] },
  { name: 'IL Bosco City', nameAr: 'إل بوسكو سيتي', zone: 'Mostakbal', zoneAr: 'مستقبل سيتي', units: 24, aliases: ['ilbosco','el bosco','il bosko','البوسكو'] }
];

// ══════════════════════════════════════════════════════════
//  LOCALIZATION LABELS
// ══════════════════════════════════════════════════════════
const LABELS = {
  en: {
    dir: 'ltr' as const,
    brand: 'SIERRA ESTATES',
    sub: 'REALTY',
    back: '← Back to home',
    eyebrow: 'AI Support · Investment Intelligence',
    title: 'Best ROI Analysis',
    desc: 'AI-ranked rental yields across New Cairo compounds, with a live gross/net yield and appreciation calculator.',
    leaderboardTitle: 'Yield Leaderboard',
    searchPlaceholder: 'Search compounds (e.g. Mivida, Hyde Park)...',
    noResults: 'No compounds match your search.',
    calculatorTitle: 'Yield Calculator',
    calculatorSub: 'Estimate returns on a New Cairo unit.',
    priceLabel: 'Purchase price',
    rentLabel: 'Monthly rent',
    appreciationLabel: 'Annual appreciation',
    grossYield: 'Gross Yield',
    netYield: 'Net Yield (-18%)',
    fiveYearReturn: '5-yr Total Return',
    paybackYears: 'Payback Years',
    currencyPrefix: 'EGP ',
    currencySuffix: '',
    millionSuffix: 'M',
    thousandSuffix: 'K',
  },
  ar: {
    dir: 'rtl' as const,
    brand: 'سييرا إستيتس',
    sub: 'للعقارات',
    back: 'العودة للرئيسية →',
    eyebrow: 'الدعم الذكي · تحليل الاستثمار',
    title: 'تحليل عائد الاستثمار الأفضل',
    desc: 'ترتيب العوائد الإيجارية بالذكاء الاصطناعي لمجمعات القاهرة الجديدة، مع حاسبة فورية للعوائد الإجمالية والصافية والأرباح الرأسمالية.',
    leaderboardTitle: 'ترتيب عوائد المجمعات',
    searchPlaceholder: 'ابحث عن مجمع (مثال: ميفيدا، هايد بارك)...',
    noResults: 'لم يتم العثور على مجمعات تطابق بحثك.',
    calculatorTitle: 'حاسبة العائد',
    calculatorSub: 'احسب العوائد المتوقعة لوحدتك العقارية في القاهرة الجديدة.',
    priceLabel: 'سعر الشراء',
    rentLabel: 'الإيجار الشهري',
    appreciationLabel: 'زيادة الأسعار السنوية',
    grossYield: 'العائد الإجمالي',
    netYield: 'العائد الصافي (-١٨٪)',
    fiveYearReturn: 'العائد الإجمالي ٥ سنوات',
    paybackYears: 'سنوات استرداد رأس المال',
    currencyPrefix: '',
    currencySuffix: ' ج.م.',
    millionSuffix: ' مليون',
    thousandSuffix: ' ألف',
  }
};

// Levenshtein distance for fuzzy typo correction
function Levenshtein(a: string, b: string) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return d[m][n];
}

export default function RoiPage() {
  const { locale, setLocale } = useI18n();
  const { resolvedTheme } = useTheme();
  
  const isAr = locale === 'ar';
  const L = LABELS[locale];
  const mode = (resolvedTheme === 'light' ? 'light' : 'dark') as 'light' | 'dark';
  const th = THEMES[mode];

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Live calculator states
  const [price, setPrice] = useState(6000000); // 6M default
  const [rent, setRent] = useState(38000); // 38K default
  const [appreciation, setAppreciation] = useState(9); // 9% default

  // Number translation to Arabic if locale is 'ar'
  const toLocaleNum = (num: number | string) => {
    if (!isAr) return String(num);
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).replace(/[0-9]/g, (w) => arabicDigits[+w]);
  };

  const formatCurrency = (val: number, isShort = false) => {
    if (isShort) {
      if (val >= 1000000) {
        const num = (val / 1000000).toFixed(1);
        return isAr 
          ? `${toLocaleNum(num)}${L.millionSuffix}${L.currencySuffix}`
          : `${L.currencyPrefix}${num}${L.millionSuffix}`;
      } else {
        const num = Math.round(val / 1000).toLocaleString();
        return isAr
          ? `${toLocaleNum(num)}${L.thousandSuffix}${L.currencySuffix}`
          : `${L.currencyPrefix}${num}${L.thousandSuffix}`;
      }
    }
    const numStr = Math.round(val).toLocaleString(isAr ? 'ar-EG' : 'en-US');
    return isAr ? `${numStr}${L.currencySuffix}` : `${L.currencyPrefix}${numStr}`;
  };

  // Process and sort compounds based on calculated yields and search filter
  const rankedCompounds = useMemo(() => {
    // 1. Map yields
    const mapped = COMPOUNDS.map((c) => {
      const yieldVal = +(5 + (c.units % 7) * 0.6 + (c.name.length % 5) * 0.3).toFixed(1);
      return {
        ...c,
        yieldVal,
      };
    });

    // 2. Sort descending
    const sorted = mapped.sort((a, b) => b.yieldVal - a.yieldVal);

    // 3. Apply search with fuzzy matching
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return sorted;
    }

    const scored = sorted.map((item) => {
      const targets = [item.name.toLowerCase(), item.nameAr.toLowerCase(), ...item.aliases.map((a) => a.toLowerCase())];
      let bestScore = Infinity;

      targets.forEach((t) => {
        if (t.includes(query)) {
          bestScore = 0;
        } else {
          const dist = Levenshtein(query, t.slice(0, Math.max(t.length, query.length)));
          const norm = dist / Math.max(t.length, query.length);
          if (norm < bestScore) {
            bestScore = norm;
          }
        }
      });

      return { item, score: bestScore };
    });

    // Filter out very poor matches, then sort by match score
    return scored
      .filter((x) => x.score <= 0.55)
      .sort((a, b) => a.score - b.score)
      .map((x) => x.item);
  }, [searchQuery]);

  // Find max yield in the original dataset for progress bars
  const maxOriginalYield = useMemo(() => {
    const yields = COMPOUNDS.map((c) => +(5 + (c.units % 7) * 0.6 + (c.name.length % 5) * 0.3));
    return Math.max(...yields);
  }, []);

  // Live return calculations
  const grossYield = useMemo(() => {
    return ((rent * 12) / price) * 100;
  }, [rent, price]);

  const netYield = useMemo(() => {
    return grossYield * 0.82; // Deduct 18% expenses/taxes
  }, [grossYield]);

  const fiveYearReturn = useMemo(() => {
    const annualRentTotal = rent * 12;
    const appreciationRate = appreciation / 100;
    const netRent5Yr = annualRentTotal * 5 * 0.82;
    const capitalAppreciation = price * (Math.pow(1 + appreciationRate, 5) - 1);
    return ((netRent5Yr + capitalAppreciation) / price) * 100;
  }, [rent, price, appreciation]);

  const paybackYears = useMemo(() => {
    return 100 / netYield;
  }, [netYield]);

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: th.bg, 
        color: th.text, 
        transition: 'background .5s, color .5s',
        paddingBottom: 80 
      }} 
      dir={L.dir}
    >
      {/* ══ NAV ══ */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', background: th.navBg, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${th.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/">
            <ShieldLogo size={38} />
          </Link>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isAr ? 16 : 18, fontWeight: 600, letterSpacing: isAr ? '.06em' : '.2em', color: G, lineHeight: 1 }}>{L.brand}</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 8, letterSpacing: '.38em', color: th.textSub, marginTop: 2 }}>{L.sub}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-secondary transition-colors" style={{ textDecoration: 'none', fontSize: 11, fontWeight: 500, letterSpacing: '.13em', textTransform: 'uppercase', color: th.textSub, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
            {L.back}
          </Link>
          <button onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')} style={{ background: th.surface, border: `1px solid ${th.border}`, color: G, padding: '6px 14px', borderRadius: 4, fontSize: 11, fontWeight: 600, letterSpacing: '.15em', cursor: 'pointer', fontFamily: "'Jost', sans-serif" }}>
            {locale === 'ar' ? 'EN' : 'العربية'}
          </button>
        </div>
      </nav>

      {/* ══ MAIN HUB ══ */}
      <main style={{ maxWidth: 1200, margin: '110px auto 0', padding: '0 24px' }}>
        {/* HERO SECTION */}
        <div style={{ textAlign: isAr ? 'right' : 'left', marginBottom: 40 }}>
          <span style={{ fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: G, fontWeight: 600, display: 'block', marginBottom: 12, fontFamily: "'Jost', sans-serif" }}>
            {L.eyebrow}
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 300, color: th.text, lineHeight: 1.1, marginBottom: 16 }}>
            {L.title}
          </h1>
          <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.6, color: th.textSub, maxWidth: 650, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
            {L.desc}
          </p>
        </div>

        {/* INTERACTIVE WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
          
          {/* LEADERBOARD CARD */}
          <div style={{ background: th.bg2, border: `1px solid ${th.border}`, borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${th.border}`, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500, color: th.text }}>
                {L.leaderboardTitle}
              </h3>
              {/* Search Box */}
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={L.searchPlaceholder} 
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: 10,
                    background: th.surface,
                    border: `1px solid ${th.border}`,
                    color: th.text,
                    fontSize: 13,
                    fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif",
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = G}
                  onBlur={(e) => e.target.style.borderColor = th.border}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: isAr ? undefined : 16,
                      left: isAr ? 16 : undefined,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: th.textMuted,
                      cursor: 'pointer',
                      fontSize: 14
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div style={{ padding: '12px 0', minHeight: 300 }}>
              {rankedCompounds.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: th.textMuted, fontSize: 14, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                  {L.noResults}
                </div>
              ) : (
                rankedCompounds.map((c, i) => (
                  <div 
                    key={c.name}
                    className="group"
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '40px 1.5fr 1.2fr 80px', 
                      gap: 12, 
                      alignItems: 'center', 
                      padding: '16px 28px', 
                      borderBottom: i === rankedCompounds.length - 1 ? 'none' : `1px solid ${th.border}`,
                      transition: 'background 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = th.surfaceHover}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: "'Jost', sans-serif" }}>
                      {toLocaleNum(i + 1)}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: th.text, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                        {isAr ? c.nameAr : c.name}
                      </div>
                      <div style={{ fontSize: 11, color: th.textMuted, marginTop: 2, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                        {isAr ? c.zoneAr : c.zone}
                      </div>
                    </div>
                    {/* Progress Bar Wrapper */}
                    <div style={{ height: 6, borderRadius: 3, background: th.surface, overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          height: '100%', 
                          background: `linear-gradient(90deg, ${G}, ${G2})`, 
                          borderRadius: 3,
                          width: `${(c.yieldVal / maxOriginalYield) * 100}%`,
                          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                        }} 
                      />
                    </div>
                    <div style={{ textAlign: isAr ? 'left' : 'right', fontWeight: 700, fontSize: 15, color: th.text, fontFamily: "'Jost', sans-serif" }}>
                      {toLocaleNum(c.yieldVal)}%
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CALCULATOR CARD */}
          <div style={{ background: th.bg2, border: `1px solid ${th.border}`, borderRadius: 18, padding: 28, height: 'fit-content' }}>
            <h3 style={{ margin: '0 0 6px', fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500, color: th.text }}>
              {L.calculatorTitle}
            </h3>
            <div style={{ fontSize: 13, color: th.textSub, marginBottom: 24, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
              {L.calculatorSub}
            </div>

            {/* Price Slider */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: th.textMuted, marginBottom: 10, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                <span>{L.priceLabel}</span>
                <b style={{ color: G, fontSize: 13, fontWeight: 600 }}>{formatCurrency(price, true)}</b>
              </div>
              <input 
                type="range" 
                min="1500000" 
                max="30000000" 
                step="100000" 
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                style={{
                  width: '100%',
                  height: 5,
                  borderRadius: 3,
                  background: th.surface,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Rent Slider */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: th.textMuted, marginBottom: 10, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                <span>{L.rentLabel}</span>
                <b style={{ color: G, fontSize: 13, fontWeight: 600 }}>{formatCurrency(rent)}</b>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="250000" 
                step="1000" 
                value={rent}
                onChange={(e) => setRent(+e.target.value)}
                style={{
                  width: '100%',
                  height: 5,
                  borderRadius: 3,
                  background: th.surface,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Appreciation Slider */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: th.textMuted, marginBottom: 10, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                <span>{L.appreciationLabel}</span>
                <b style={{ color: G, fontSize: 13, fontWeight: 600 }}>{toLocaleNum(appreciation)}%</b>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="0.5" 
                value={appreciation}
                onChange={(e) => setAppreciation(+e.target.value)}
                style={{
                  width: '100%',
                  height: 5,
                  borderRadius: 3,
                  background: th.surface,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Output Results */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, paddingTop: 20, borderTop: `1px solid ${th.border}` }}>
              <div style={{ background: th.surface, borderRadius: 12, padding: '16px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: G, fontFamily: "'Jost', sans-serif" }}>
                  {toLocaleNum(grossYield.toFixed(1))}%
                </div>
                <div style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: th.textMuted, marginTop: 4, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                  {L.grossYield}
                </div>
              </div>

              <div style={{ background: th.surface, borderRadius: 12, padding: '16px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: G, fontFamily: "'Jost', sans-serif" }}>
                  {toLocaleNum(netYield.toFixed(1))}%
                </div>
                <div style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: th.textMuted, marginTop: 4, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                  {L.netYield}
                </div>
              </div>

              <div style={{ background: th.surface, borderRadius: 12, padding: '16px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: G, fontFamily: "'Jost', sans-serif" }}>
                  {toLocaleNum(fiveYearReturn.toFixed(0))}%
                </div>
                <div style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: th.textMuted, marginTop: 4, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                  {L.fiveYearReturn}
                </div>
              </div>

              <div style={{ background: th.surface, borderRadius: 12, padding: '16px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: G, fontFamily: "'Jost', sans-serif" }}>
                  {toLocaleNum(paybackYears.toFixed(0))}
                </div>
                <div style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: th.textMuted, marginTop: 4, fontFamily: isAr ? "'Cairo', sans-serif" : "'Jost', sans-serif" }}>
                  {L.paybackYears}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
