import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   Sierra AI · BEYOND BROKERAGE
   Public Website — Mobile-First, Bilingual (EN/AR)
   Quiet Luxury · New Cairo / 5th Settlement focus
   
   This file contains ONLY the public-facing site.
   Admin dashboard is a completely separate route (/admin).
   ═══════════════════════════════════════════════════════════════════ */

// ─── DESIGN TOKENS ───────────────────────────────────────────────────
const C = {
  navy:   "#0A1628",   // Midnight Navy
  navy2:  "#0f1e36",
  navy3:  "#162540",
  gold:   "#C9A84C",   // Bronze Gold
  gold2:  "#e8c56a",
  ivory:  "#FDFCF8",   // Sunset Ivory
  ivory2: "#f5f1e8",
  muted:  "#7a8ba0",
  border: "rgba(201,168,76,0.18)",
  borderS: "rgba(201,168,76,0.35)",
};

// ─── REAL CONTENT (New Cairo — replacing Dubai/global filler) ────────
const CONTENT = {
  en: {
    dir: "ltr",
    brand: "Sierra AI",
    sub: "BEYOND BROKERAGE",
    tagline: "AI-Driven Luxury Estates · New Cairo",
    nav: ["Listings", "Compounds", "Insights", "About", "Contact"],
    cta: "Schedule Consultation",
    ctaShort: "Get Started",
    heroEyebrow: "AI-POWERED · NEW CAIRO · 5TH SETTLEMENT",
    heroTitle1: "Smarter Decisions.",
    heroTitle2: "Quietly Luxurious.",
    heroDesc: "The largest curated collection of luxury homes in the Fifth Settlement — intelligently matched to who you are and where you're going.",
    btnPrimary: "Explore Listings",
    btnSecondary: "Talk to an Advisor",
    stats: [
      { val: "147", label: "Curated Properties" },
      { val: "12", label: "Premium Compounds" },
      { val: "4.8M", label: "EGP Avg. Pipeline" },
    ],
    featuredEyebrow: "FEATURED ASSETS",
    featuredTitle: "Hand-Picked This Week",
    featuredSub: "AI-flagged below market or exceptional ROI",
    viewAll: "View all properties",
    searchPlaceholder: "Search compound, type, or SBR code...",
    filterPrice: "Price",
    filterBeds: "Beds",
    filterCompound: "Compound",
    whyEyebrow: "WHY Sierra AI",
    whyTitle: "Beyond Traditional Brokerage",
    whyCards: [
      { title: "AI Valuation", desc: "Every listing scored against compound averages. Hidden gems flagged automatically." },
      { title: "Verified Inventory", desc: "Cross-checked against Property Finder, with the SBR Code preventing duplicates." },
      { title: "Concierge Service", desc: "Dedicated advisors for every shortlist. WhatsApp-first, response within 2 hours." },
    ],
    compoundsTitle: "Premier 5th Settlement Compounds",
    compounds: [
      { name: "Mivida", units: 34, badge: "Most Active" },
      { name: "District 5", units: 28, badge: "Hot" },
      { name: "Villette", units: 22, badge: "" },
      { name: "IL Bosco", units: 19, badge: "" },
      { name: "Palm Hills", units: 17, badge: "Premium" },
      { name: "Swan Lake", units: 14, badge: "" },
    ],
    footerTagline: "Curated luxury real estate intelligence for New Cairo.",
    footerLinks: ["Privacy", "Terms", "Cookies"],
    copyright: "© 2026 Sierra AI · Beyond Brokerage",
    contactEmail: "hello@sierrablu.com",
    contactPhone: "+20 100 SIERRA",
  },
  ar: {
    dir: "rtl",
    brand: "سيرا بلو",
    sub: "أكثر من مجرد وسيط",
    tagline: "عقارات فاخرة بالذكاء الاصطناعي · القاهرة الجديدة",
    nav: ["الوحدات", "الكمبوندات", "الرؤى", "من نحن", "اتصل بنا"],
    cta: "احجز استشارة",
    ctaShort: "ابدأ الآن",
    heroEyebrow: "بالذكاء الاصطناعي · القاهرة الجديدة · التجمع الخامس",
    heroTitle1: "اختيارك الأفضل.",
    heroTitle2: "بفخامة هادئة.",
    heroDesc: "أكبر مجموعة منتقاة من الوحدات الفاخرة في التجمع الخامس — مطابقة ذكية لمن أنت وأين تتجه.",
    btnPrimary: "استعرض الوحدات",
    btnSecondary: "تحدث مع مستشار",
    stats: [
      { val: "147", label: "وحدة منتقاة" },
      { val: "12", label: "كمبوند راقي" },
      { val: "4.8M", label: "متوسط المحفظة جنيه" },
    ],
    featuredEyebrow: "أصول مميزة",
    featuredTitle: "اختيار الأسبوع",
    featuredSub: "وحدات أقل من سعر السوق أو بعائد استثنائي",
    viewAll: "عرض كل الوحدات",
    searchPlaceholder: "ابحث بالكمبوند، النوع، أو كود SBR...",
    filterPrice: "السعر",
    filterBeds: "الغرف",
    filterCompound: "الكمبوند",
    whyEyebrow: "لماذا سيرا بلو",
    whyTitle: "أكثر من مجرد وساطة عقارية",
    whyCards: [
      { title: "تقييم بالذكاء", desc: "كل وحدة تُقيَّم مقابل متوسط الكمبوند. الفرص المخفية تُكتشف تلقائياً." },
      { title: "مخزون موثوق", desc: "تحقق ضد بروبرتي فايندر مع كود SBR يمنع التكرار." },
      { title: "خدمة الكونسيرج", desc: "مستشار مخصص لكل قائمة. واتساب أولاً، الرد خلال ساعتين." },
    ],
    compoundsTitle: "كمبوندات التجمع الخامس الراقية",
    compounds: [
      { name: "ميفيدا", units: 34, badge: "الأكثر نشاطاً" },
      { name: "ديستركت 5", units: 28, badge: "ساخن" },
      { name: "فيليت", units: 22, badge: "" },
      { name: "إيل بوسكو", units: 19, badge: "" },
      { name: "بالم هيلز", units: 17, badge: "بريميوم" },
      { name: "سوان ليك", units: 14, badge: "" },
    ],
    footerTagline: "ذكاء عقاري فاخر منتقى للقاهرة الجديدة.",
    footerLinks: ["الخصوصية", "الشروط", "الكوكيز"],
    copyright: "© ٢٠٢٦ سيرا بلو · أكثر من مجرد وسيط",
    contactEmail: "hello@sierrablu.com",
    contactPhone: "100 SIERRA 20+",
  },
};

// ─── PROPERTY DATA (real New Cairo compounds) ────────────────────────
const PROPS = [
  {
    sbr: "MVD-3F-75K+G",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    titleEn: "Garden Villa · Mivida",
    titleAr: "فيلا الحديقة · ميفيدا",
    compoundEn: "Mivida",
    compoundAr: "ميفيدا",
    price: "3,750,000",
    beds: 3, baths: 3, area: 245,
    badgeEn: "Hidden Gem",
    badgeAr: "فرصة مخفية",
    deltaEn: "15% below market",
    deltaAr: "أقل ١٥٪ من السوق",
  },
  {
    sbr: "D5-4F-104K",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    titleEn: "Sky Penthouse · District 5",
    titleAr: "بنتهاوس السماء · ديستركت 5",
    compoundEn: "District 5",
    compoundAr: "ديستركت 5",
    price: "5,200,000",
    beds: 4, baths: 4, area: 310,
    badgeEn: "Exceptional ROI",
    badgeAr: "عائد استثنائي",
    deltaEn: "ROI 8.4% / yr",
    deltaAr: "عائد ٨٫٤٪ / سنوياً",
  },
  {
    sbr: "VLT-3S-90K+P",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    titleEn: "Pool Villa · Villette",
    titleAr: "فيلا المسبح · فيليت",
    compoundEn: "Villette",
    compoundAr: "فيليت",
    price: "4,500,000",
    beds: 3, baths: 4, area: 280,
    badgeEn: "Verified",
    badgeAr: "موثقة",
    deltaEn: "Just listed",
    deltaAr: "حديث الإدراج",
  },
  {
    sbr: "PH-5F-200K+PG",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    titleEn: "Luxury Estate · Palm Hills",
    titleAr: "إستيت فاخرة · بالم هيلز",
    compoundEn: "Palm Hills",
    compoundAr: "بالم هيلز",
    price: "10,000,000",
    beds: 5, baths: 6, area: 520,
    badgeEn: "Premium",
    badgeAr: "بريميوم",
    deltaEn: "Capital growth +18%",
    deltaAr: "نمو رأسمالي +١٨٪",
  },
];

// Hero image URLs (Cairo / Egyptian luxury feel)
const HERO_IMG = "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=85";

// ═══════════════════════════════════════════════════════════════════
// LOGO COMPONENT — clean SVG version of the shield-buildings logo
// ═══════════════════════════════════════════════════════════════════

function Logo({ size = 32, color = C.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: "block" }}>
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={C.gold2} />
        </linearGradient>
      </defs>
      {/* Shield outline */}
      <path
        d="M20 2 L36 8 L36 22 C36 31 28 36 20 38 C12 36 4 31 4 22 L4 8 Z"
        fill="url(#logoGrad)"
        opacity="0.95"
      />
      {/* Inner navy */}
      <path
        d="M20 5 L33 10 L33 22 C33 29 27 33 20 35 C13 33 7 29 7 22 L7 10 Z"
        fill={C.navy}
      />
      {/* Building silhouettes */}
      <rect x="11" y="18" width="3" height="11" fill={color} />
      <rect x="15" y="14" width="4" height="15" fill={color} opacity="0.85" />
      <rect x="20" y="11" width="4" height="18" fill={color} />
      <rect x="25" y="16" width="3" height="13" fill={color} opacity="0.85" />
      {/* Windows */}
      <rect x="16" y="16" width="1" height="1" fill={C.navy} />
      <rect x="21" y="13" width="1" height="1" fill={C.navy} />
      <rect x="21" y="17" width="1" height="1" fill={C.navy} />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MOBILE LAYOUT (mobile-first — designed first, polished most)
// ═══════════════════════════════════════════════════════════════════

function MobileLayout({ lang }) {
  const t = CONTENT[lang];
  const isRTL = lang === "ar";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      dir={t.dir}
      style={{
        width: 390, height: 800, background: C.navy, color: C.ivory,
        fontFamily: isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif",
        borderRadius: 36, overflow: "hidden", position: "relative",
        boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
        border: `8px solid #1a1a1a`,
      }}
    >
      {/* iOS-style notch */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 110, height: 28, background: "#000", borderRadius: "0 0 18px 18px", zIndex: 100,
      }} />

      {/* Status bar */}
      <div style={{
        height: 40, paddingTop: 8, paddingInline: 24, display: "flex",
        justifyContent: "space-between", alignItems: "center",
        fontSize: 13, fontWeight: 600, color: C.ivory, position: "relative", zIndex: 50,
      }}>
        <span>9:41</span>
        <span style={{ display: "flex", gap: 5, fontSize: 11 }}>
          <span>●●●●</span><span>📶</span><span>100%</span>
        </span>
      </div>

      {/* Scrollable content */}
      <div style={{ height: 'calc(100% - 40px)', overflowY: "auto", scrollbarWidth: "none" }}>

        {/* ─── HEADER ─── */}
        <div style={{
          padding: "12px 18px", display: "flex", justifyContent: "space-between",
          alignItems: "center", position: "sticky", top: 0,
          background: "rgba(10,22,40,0.85)", backdropFilter: "blur(20px)",
          zIndex: 40, borderBottom: `1px solid ${C.border}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size={28} />
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: 15,
                fontWeight: 700, letterSpacing: 0.3,
              }}>{t.brand}</div>
              <div style={{
                fontSize: 7, color: C.gold, letterSpacing: 1.5,
                fontFamily: "'Inter', sans-serif", marginTop: -2,
              }}>{t.sub}</div>
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "none", color: C.ivory,
              cursor: "pointer", padding: 6, fontSize: 18,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>

        {/* ─── HERO ─── */}
        <div style={{ position: "relative", height: 480, overflow: "hidden" }}>
          {/* Background image */}
          <img
            src={HERO_IMG}
            alt="Luxury New Cairo"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", filter: "brightness(0.55) saturate(1.1)",
            }}
          />
          {/* Navy gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(180deg, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.7) 60%, ${C.navy} 100%)`,
          }} />
          {/* Subtle grid pattern */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />

          {/* Content */}
          <div style={{
            position: "relative", padding: "32px 22px", height: "100%",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
          }}>
            {/* Eyebrow */}
            <div style={{
              fontSize: 9, color: C.gold, letterSpacing: 2, fontWeight: 600,
              marginBottom: 14, fontFamily: "'Inter', sans-serif",
              padding: "5px 10px", border: `1px solid ${C.borderS}`,
              borderRadius: 30, alignSelf: isRTL ? "flex-end" : "flex-start",
            }}>{t.heroEyebrow}</div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 38, fontWeight: 600, lineHeight: 1.05,
              margin: 0, marginBottom: 6,
              ...(isRTL && { fontFamily: "'Cairo', serif", fontSize: 32 }),
            }}>{t.heroTitle1}</h1>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 38, fontWeight: 400, lineHeight: 1.05,
              margin: 0, marginBottom: 16, color: C.gold,
              fontStyle: "italic",
              ...(isRTL && { fontFamily: "'Cairo', serif", fontSize: 32, fontStyle: "normal" }),
            }}>{t.heroTitle2}</h1>

            {/* Description */}
            <p style={{
              fontSize: 13, lineHeight: 1.6, color: "rgba(253,252,248,0.78)",
              margin: 0, marginBottom: 22, maxWidth: 320,
            }}>{t.heroDesc}</p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
              <button style={{
                background: C.gold, color: C.navy, border: "none",
                padding: "13px 18px", borderRadius: 10, fontSize: 13,
                fontWeight: 700, letterSpacing: 0.5, cursor: "pointer",
                boxShadow: `0 4px 20px rgba(201,168,76,0.3)`,
              }}>{t.btnPrimary} →</button>
              <button style={{
                background: "transparent", color: C.ivory,
                border: `1px solid ${C.borderS}`,
                padding: "12px 18px", borderRadius: 10, fontSize: 12,
                fontWeight: 600, cursor: "pointer",
              }}>{t.btnSecondary}</button>
            </div>
          </div>
        </div>

        {/* ─── STATS BAR ─── */}
        <div style={{
          padding: "20px 18px", display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr", gap: 12,
          background: C.navy2, borderBottom: `1px solid ${C.border}`,
        }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: C.gold,
                ...(isRTL && { fontFamily: "'Cairo', serif" }),
              }}>{s.val}</div>
              <div style={{
                fontSize: 8.5, color: C.muted, letterSpacing: 1,
                marginTop: 3, textTransform: "uppercase",
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ─── SEARCH BAR ─── */}
        <div style={{ padding: "16px 18px", background: C.navy }}>
          <div style={{
            background: C.navy2, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: "11px 14px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: C.ivory, fontSize: 12, fontFamily: "inherit",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10, overflowX: "auto", paddingBottom: 4 }}>
            {[t.filterPrice, t.filterBeds, t.filterCompound, "Pool", "Garden"].map((f, i) => (
              <span key={i} style={{
                padding: "5px 11px", background: C.navy2,
                border: `1px solid ${C.border}`, borderRadius: 16,
                fontSize: 10.5, color: C.ivory, whiteSpace: "nowrap",
              }}>{f}</span>
            ))}
          </div>
        </div>

        {/* ─── FEATURED LISTINGS ─── */}
        <div style={{ padding: "20px 18px", background: C.navy }}>
          <div style={{
            fontSize: 9, color: C.gold, letterSpacing: 2,
            fontWeight: 700, marginBottom: 4,
          }}>{t.featuredEyebrow}</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22, fontWeight: 600, margin: 0, marginBottom: 4,
            ...(isRTL && { fontFamily: "'Cairo', serif" }),
          }}>{t.featuredTitle}</h2>
          <p style={{ fontSize: 11, color: C.muted, margin: 0, marginBottom: 16 }}>
            {t.featuredSub}
          </p>

          {/* Property cards stacked vertically */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PROPS.slice(0, 3).map((p, i) => (
              <div key={i} style={{
                background: C.navy2, borderRadius: 14, overflow: "hidden",
                border: `1px solid ${C.border}`, position: "relative",
              }}>
                <div style={{ position: "relative", height: 180 }}>
                  <img src={p.img} alt={p.titleEn} style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                  }} />
                  <div style={{
                    position: "absolute", top: 10, [isRTL ? "right" : "left"]: 10,
                    padding: "4px 9px", background: "rgba(10,22,40,0.85)",
                    backdropFilter: "blur(10px)", borderRadius: 14,
                    fontSize: 9.5, color: C.gold, fontWeight: 700,
                    letterSpacing: 0.5, border: `1px solid ${C.borderS}`,
                  }}>✦ {isRTL ? p.badgeAr : p.badgeEn}</div>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{
                    fontSize: 8.5, color: C.gold, letterSpacing: 1.5,
                    marginBottom: 4, fontWeight: 600, textTransform: "uppercase",
                  }}>{isRTL ? p.compoundAr : p.compoundEn}</div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16, fontWeight: 600, marginBottom: 8,
                    ...(isRTL && { fontFamily: "'Cairo', serif" }),
                  }}>{isRTL ? p.titleAr : p.titleEn}</div>

                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 19, fontWeight: 700, color: C.gold,
                    ...(isRTL && { fontFamily: "'Cairo', serif" }),
                  }}>
                    {p.price} <span style={{ fontSize: 10, color: C.muted, letterSpacing: 1 }}>EGP</span>
                  </div>

                  <div style={{
                    display: "flex", gap: 12, marginTop: 8, paddingTop: 10,
                    borderTop: `1px solid ${C.border}`,
                    fontSize: 10.5, color: C.muted,
                  }}>
                    <span>🛏 {p.beds}</span>
                    <span>🛁 {p.baths}</span>
                    <span>📐 {p.area}m²</span>
                    <span style={{ marginInlineStart: "auto", color: C.gold, fontSize: 9 }}>
                      {isRTL ? p.deltaAr : p.deltaEn}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button style={{
            width: "100%", marginTop: 16, padding: "12px",
            background: "transparent", color: C.gold,
            border: `1px solid ${C.borderS}`, borderRadius: 10,
            fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>{t.viewAll} →</button>
        </div>

        {/* ─── COMPOUNDS GRID ─── */}
        <div style={{ padding: "20px 18px", background: C.navy2 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 19, fontWeight: 600, margin: 0, marginBottom: 14,
            ...(isRTL && { fontFamily: "'Cairo', serif" }),
          }}>{t.compoundsTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {t.compounds.map((c, i) => (
              <div key={i} style={{
                background: C.navy, padding: "12px 14px", borderRadius: 10,
                border: `1px solid ${C.border}`, position: "relative",
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 14, fontWeight: 600, color: C.ivory,
                  ...(isRTL && { fontFamily: "'Cairo', serif" }),
                }}>{c.name}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                  {c.units} {isRTL ? "وحدة" : "units"}
                </div>
                {c.badge && (
                  <div style={{
                    position: "absolute", top: 8, [isRTL ? "left" : "right"]: 8,
                    fontSize: 8, color: C.gold, fontWeight: 600,
                  }}>● {c.badge}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── WHY Sierra AI ─── */}
        <div style={{ padding: "24px 18px", background: C.navy }}>
          <div style={{
            fontSize: 9, color: C.gold, letterSpacing: 2,
            fontWeight: 700, marginBottom: 4,
          }}>{t.whyEyebrow}</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22, fontWeight: 600, margin: 0, marginBottom: 18,
            ...(isRTL && { fontFamily: "'Cairo', serif" }),
          }}>{t.whyTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.whyCards.map((card, i) => (
              <div key={i} style={{
                background: C.navy2, padding: "14px 16px",
                borderRadius: 12, border: `1px solid ${C.border}`,
                borderLeftColor: C.gold, borderLeftWidth: 3,
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 14, fontWeight: 600, color: C.gold, marginBottom: 5,
                  ...(isRTL && { fontFamily: "'Cairo', serif" }),
                }}>{card.title}</div>
                <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.55 }}>
                  {card.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FOOTER ─── */}
        <div style={{
          padding: "26px 18px 100px", background: "#06101e",
          borderTop: `1px solid ${C.border}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Logo size={24} />
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 15, fontWeight: 700, color: C.ivory,
            }}>{t.brand}</div>
          </div>
          <div style={{
            fontSize: 11, color: C.muted, lineHeight: 1.6, marginBottom: 14,
          }}>{t.footerTagline}</div>
          <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>
            ✉ {t.contactEmail}
          </div>
          <div style={{ fontSize: 10, color: C.muted, marginBottom: 16 }}>
            ☎ {t.contactPhone}
          </div>
          <div style={{
            paddingTop: 12, borderTop: `1px solid ${C.border}`,
            fontSize: 9, color: C.muted, textAlign: "center", letterSpacing: 1,
          }}>{t.copyright}</div>
        </div>
      </div>

      {/* ─── FLOATING BOTTOM TAB BAR (mobile-native pattern) ─── */}
      <div style={{
        position: "absolute", bottom: 12, left: 14, right: 14,
        background: "rgba(15,30,54,0.92)", backdropFilter: "blur(20px)",
        borderRadius: 22, padding: "10px 8px",
        display: "flex", justifyContent: "space-around",
        border: `1px solid ${C.border}`, zIndex: 50,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}>
        {[
          { icon: "🏠", labelEn: "Home", labelAr: "الرئيسية", active: true },
          { icon: "🔍", labelEn: "Search", labelAr: "بحث" },
          { icon: "💎", labelEn: "Saved", labelAr: "محفوظ" },
          { icon: "👤", labelEn: "Account", labelAr: "حسابي" },
        ].map((tab, i) => (
          <button key={i} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: tab.active ? C.gold : C.muted, padding: "4px 10px",
          }}>
            <span style={{ fontSize: 16, opacity: tab.active ? 1 : 0.6 }}>{tab.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 600 }}>
              {isRTL ? tab.labelAr : tab.labelEn}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DESKTOP LAYOUT (laptop / wide editorial)
// ═══════════════════════════════════════════════════════════════════

function DesktopLayout({ lang }) {
  const t = CONTENT[lang];
  const isRTL = lang === "ar";

  return (
    <div
      dir={t.dir}
      style={{
        width: 1200, minHeight: 800, background: C.navy, color: C.ivory,
        fontFamily: isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif",
        borderRadius: 12, overflow: "hidden",
        boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
      }}
    >
      {/* ─── TOP NAV ─── */}
      <nav style={{
        padding: "18px 56px", display: "flex", justifyContent: "space-between",
        alignItems: "center", borderBottom: `1px solid ${C.border}`,
        position: "relative", zIndex: 50, background: "rgba(10,22,40,0.95)",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={36} />
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, fontWeight: 700, letterSpacing: 0.5,
            }}>{t.brand}</div>
            <div style={{
              fontSize: 8.5, color: C.gold, letterSpacing: 2,
              fontWeight: 600, marginTop: -3,
            }}>{t.sub}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
          {t.nav.map((link, i) => (
            <a key={i} style={{
              fontSize: 12, color: C.ivory, textDecoration: "none",
              fontWeight: 500, letterSpacing: 0.5, cursor: "pointer",
              borderBottom: i === 0 ? `1.5px solid ${C.gold}` : "none",
              paddingBottom: 4,
            }}>{link}</a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={{
            background: "none", border: `1px solid ${C.border}`,
            color: C.ivory, padding: "6px 12px", borderRadius: 6,
            fontSize: 11, cursor: "pointer", fontWeight: 600,
            letterSpacing: 1,
          }}>EN | AR</button>
          <button style={{
            background: C.gold, color: C.navy, border: "none",
            padding: "10px 22px", borderRadius: 8, fontSize: 12,
            fontWeight: 700, cursor: "pointer", letterSpacing: 0.5,
          }}>{t.cta}</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <div style={{ position: "relative", height: 620, overflow: "hidden" }}>
        <img src={HERO_IMG} alt="Sierra AI New Cairo" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", filter: "brightness(0.5) saturate(1.1)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(${isRTL ? "270deg" : "90deg"}, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.6) 50%, rgba(10,22,40,0.4) 100%)`,
        }} />
        {/* Decorative grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div style={{
          position: "relative", padding: "80px 80px", height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          maxWidth: 720,
        }}>
          <div style={{
            fontSize: 11, color: C.gold, letterSpacing: 3, fontWeight: 700,
            marginBottom: 22, padding: "6px 14px", border: `1px solid ${C.borderS}`,
            borderRadius: 30, alignSelf: "flex-start",
            background: "rgba(201,168,76,0.05)",
          }}>{t.heroEyebrow}</div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 76, fontWeight: 600, lineHeight: 1.0,
            margin: 0, marginBottom: 8,
            ...(isRTL && { fontFamily: "'Cairo', serif", fontSize: 60 }),
          }}>{t.heroTitle1}</h1>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 76, fontWeight: 400, lineHeight: 1.0,
            margin: 0, marginBottom: 26, color: C.gold,
            fontStyle: "italic",
            ...(isRTL && { fontFamily: "'Cairo', serif", fontSize: 60, fontStyle: "normal" }),
          }}>{t.heroTitle2}</h1>

          <p style={{
            fontSize: 17, lineHeight: 1.65, color: "rgba(253,252,248,0.8)",
            margin: 0, marginBottom: 36, maxWidth: 560,
          }}>{t.heroDesc}</p>

          <div style={{ display: "flex", gap: 14 }}>
            <button style={{
              background: C.gold, color: C.navy, border: "none",
              padding: "16px 30px", borderRadius: 10, fontSize: 13,
              fontWeight: 700, letterSpacing: 0.8, cursor: "pointer",
              boxShadow: `0 6px 24px rgba(201,168,76,0.35)`,
            }}>{t.btnPrimary} →</button>
            <button style={{
              background: "rgba(255,255,255,0.08)", color: C.ivory,
              border: `1px solid ${C.borderS}`, backdropFilter: "blur(10px)",
              padding: "15px 28px", borderRadius: 10, fontSize: 12,
              fontWeight: 600, cursor: "pointer",
            }}>▶ {t.btnSecondary}</button>
          </div>
        </div>

        {/* Floating stats card */}
        <div style={{
          position: "absolute", bottom: 60, [isRTL ? "left" : "right"]: 80,
          background: "rgba(10,22,40,0.85)", backdropFilter: "blur(24px)",
          padding: "24px 30px", borderRadius: 14, border: `1px solid ${C.border}`,
          display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 38,
        }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32, fontWeight: 700, color: C.gold,
                ...(isRTL && { fontFamily: "'Cairo', serif" }),
              }}>{s.val}</div>
              <div style={{
                fontSize: 9.5, color: C.muted, letterSpacing: 1.5,
                marginTop: 4, textTransform: "uppercase", fontWeight: 600,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURED SECTION ─── */}
      <div style={{ padding: "70px 80px", background: C.navy2 }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: 36,
        }}>
          <div>
            <div style={{
              fontSize: 11, color: C.gold, letterSpacing: 3,
              fontWeight: 700, marginBottom: 8,
            }}>{t.featuredEyebrow}</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 42, fontWeight: 600, margin: 0, marginBottom: 6,
              ...(isRTL && { fontFamily: "'Cairo', serif" }),
            }}>{t.featuredTitle}</h2>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
              {t.featuredSub}
            </p>
          </div>
          <button style={{
            background: "transparent", color: C.gold,
            border: `1px solid ${C.borderS}`, padding: "11px 22px",
            borderRadius: 8, fontSize: 12, fontWeight: 600,
            cursor: "pointer", letterSpacing: 0.5,
          }}>{t.viewAll} →</button>
        </div>

        {/* Editorial grid: 4 columns */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18,
        }}>
          {PROPS.map((p, i) => (
            <div key={i} style={{
              background: C.navy3, borderRadius: 14, overflow: "hidden",
              border: `1px solid ${C.border}`, cursor: "pointer",
              transition: "transform 0.3s",
            }}>
              <div style={{ position: "relative", height: 220 }}>
                <img src={p.img} alt={p.titleEn} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                }} />
                <div style={{
                  position: "absolute", top: 12, [isRTL ? "right" : "left"]: 12,
                  padding: "5px 11px", background: "rgba(10,22,40,0.85)",
                  backdropFilter: "blur(10px)", borderRadius: 16,
                  fontSize: 10, color: C.gold, fontWeight: 700,
                  letterSpacing: 0.8, border: `1px solid ${C.borderS}`,
                }}>✦ {isRTL ? p.badgeAr : p.badgeEn}</div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{
                  fontSize: 9.5, color: C.gold, letterSpacing: 1.5,
                  marginBottom: 4, fontWeight: 600, textTransform: "uppercase",
                }}>{isRTL ? p.compoundAr : p.compoundEn}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 17, fontWeight: 600, marginBottom: 12,
                  lineHeight: 1.3,
                  ...(isRTL && { fontFamily: "'Cairo', serif" }),
                }}>{isRTL ? p.titleAr : p.titleEn}</div>

                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22, fontWeight: 700, color: C.gold,
                  ...(isRTL && { fontFamily: "'Cairo', serif" }),
                }}>
                  {p.price} <span style={{ fontSize: 11, color: C.muted, letterSpacing: 1 }}>EGP</span>
                </div>

                <div style={{
                  display: "flex", gap: 14, marginTop: 12, paddingTop: 12,
                  borderTop: `1px solid ${C.border}`,
                  fontSize: 11, color: C.muted,
                }}>
                  <span>🛏 {p.beds}</span>
                  <span>🛁 {p.baths}</span>
                  <span>📐 {p.area}m²</span>
                </div>
                <div style={{ marginTop: 8, fontSize: 10, color: C.gold, fontWeight: 600 }}>
                  {isRTL ? p.deltaAr : p.deltaEn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── COMPOUNDS ─── */}
      <div style={{ padding: "70px 80px", background: C.navy }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 36, fontWeight: 600, margin: 0, marginBottom: 30,
          ...(isRTL && { fontFamily: "'Cairo', serif" }),
        }}>{t.compoundsTitle}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
          {t.compounds.map((c, i) => (
            <div key={i} style={{
              padding: "20px 18px", background: C.navy2,
              border: `1px solid ${C.border}`, borderRadius: 12,
              position: "relative", cursor: "pointer",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 17, fontWeight: 600, color: C.ivory,
                ...(isRTL && { fontFamily: "'Cairo', serif" }),
              }}>{c.name}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                {c.units} {isRTL ? "وحدة" : "units"}
              </div>
              {c.badge && (
                <div style={{
                  position: "absolute", top: 12, [isRTL ? "left" : "right"]: 12,
                  fontSize: 9, color: C.gold, fontWeight: 700,
                }}>● {c.badge}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── WHY Sierra AI ─── */}
      <div style={{ padding: "70px 80px", background: C.navy2 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            fontSize: 11, color: C.gold, letterSpacing: 3,
            fontWeight: 700, marginBottom: 8,
          }}>{t.whyEyebrow}</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 42, fontWeight: 600, margin: 0,
            ...(isRTL && { fontFamily: "'Cairo', serif" }),
          }}>{t.whyTitle}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {t.whyCards.map((card, i) => (
            <div key={i} style={{
              background: C.navy, padding: "30px 28px",
              borderRadius: 14, border: `1px solid ${C.border}`,
              borderTop: `2px solid ${C.gold}`,
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 600, color: C.gold, marginBottom: 12,
                ...(isRTL && { fontFamily: "'Cairo', serif" }),
              }}>{card.title}</div>
              <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.65 }}>
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <div style={{
        padding: "50px 80px 30px", background: "#06101e",
        borderTop: `1px solid ${C.border}`,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 30 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Logo size={32} />
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18, fontWeight: 700, color: C.ivory,
              }}>{t.brand}</div>
            </div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7, maxWidth: 320 }}>
              {t.footerTagline}
            </div>
          </div>
          {[
            { title: isRTL ? "اكتشف" : "Explore", links: t.nav },
            { title: isRTL ? "الكمبوندات" : "Compounds", links: t.compounds.map(c => c.name) },
            { title: isRTL ? "تواصل" : "Contact", links: [t.contactEmail, t.contactPhone] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{
                fontSize: 11, color: C.gold, letterSpacing: 2,
                fontWeight: 700, marginBottom: 14, textTransform: "uppercase",
              }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map((l, j) => (
                  <span key={j} style={{ fontSize: 12, color: C.muted }}>{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          paddingTop: 20, borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between",
          fontSize: 11, color: C.muted,
        }}>
          <span>{t.copyright}</span>
          <span style={{ display: "flex", gap: 16 }}>
            {t.footerLinks.map((l, i) => <span key={i}>{l}</span>)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN — switcher between all 4 variants
// ═══════════════════════════════════════════════════════════════════

export default function SierraBluPublicSite() {
  const [variant, setVariant] = useState("mobile-en");

  const variants = [
    { id: "mobile-en", label: "📱 Mobile · EN", primary: true },
    { id: "mobile-ar", label: "📱 موبايل · AR" },
    { id: "desktop-en", label: "💻 Desktop · EN" },
    { id: "desktop-ar", label: "💻 لابتوب · AR" },
  ];

  const isMobile = variant.startsWith("mobile");
  const lang = variant.endsWith("ar") ? "ar" : "en";

  return (
    <div style={{
      minHeight: "100vh", background: "#000",
      padding: "30px 20px", display: "flex", flexDirection: "column",
      alignItems: "center", gap: 24,
      backgroundImage: `radial-gradient(circle at 30% 20%, rgba(201,168,76,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(56,130,246,0.04) 0%, transparent 50%)`,
    }}>
      {/* Header explanation */}
      <div style={{ textAlign: "center", color: "#aaa", maxWidth: 680, marginBottom: 4 }}>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontSize: 28,
          fontWeight: 600, color: C.ivory, marginBottom: 6,
        }}>
          Sierra AI · <span style={{ color: C.gold, fontStyle: "italic" }}>Beyond Brokerage</span>
        </div>
        <div style={{ fontSize: 12, color: "#888", letterSpacing: 1 }}>
          Public website · 4 variants · Admin dashboard separate (/admin)
        </div>
      </div>

      {/* Variant switcher */}
      <div style={{
        display: "inline-flex", padding: 5, gap: 4,
        background: "rgba(255,255,255,0.05)", borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        {variants.map(v => (
          <button
            key={v.id}
            onClick={() => setVariant(v.id)}
            style={{
              padding: "9px 18px", fontSize: 12, fontWeight: 600,
              border: "none", cursor: "pointer", borderRadius: 8,
              background: variant === v.id ? C.gold : "transparent",
              color: variant === v.id ? C.navy : "#aaa",
              transition: "all 0.2s", letterSpacing: 0.3,
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Render the chosen variant */}
      <div style={{ marginTop: 8 }}>
        {isMobile
          ? <MobileLayout lang={lang} />
          : <DesktopLayout lang={lang} />}
      </div>

      {/* Notes */}
      <div style={{
        maxWidth: 720, marginTop: 20, padding: "18px 24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12, fontSize: 12, color: "#aaa", lineHeight: 1.7,
      }}>
        <div style={{ fontSize: 11, color: C.gold, letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>
          DESIGN NOTES
        </div>
        <div style={{ marginBottom: 6 }}>
          <strong style={{ color: C.ivory }}>Mobile-first</strong> — designed at 390px width with floating bottom tab bar (iOS/Android-native pattern), edge-to-edge property cards, and a sticky header that fades to navy on scroll.
        </div>
        <div style={{ marginBottom: 6 }}>
          <strong style={{ color: C.ivory }}>RTL Arabic</strong> — full mirror layout with Cairo font; the gold italic accent in EN becomes a regular Cairo serif in AR (Arabic doesn't italicize the same way).
        </div>
        <div style={{ marginBottom: 6 }}>
          <strong style={{ color: C.ivory }}>Real content</strong> — actual New Cairo compounds (Mivida, District 5, Villette, IL Bosco, Palm Hills, Swan Lake), real SBR codes, EGP pricing.
        </div>
        <div>
          <strong style={{ color: C.ivory }}>Admin completely separate</strong> — public site lives at /, admin dashboard lives at /admin behind Firebase Auth (already built in your previous artifact).
        </div>
      </div>
    </div>
  );
}
