import { useState, useEffect, useRef } from "react";

/* ─── DESIGN TOKENS ─── */
const G = "#D4AF37";
const NAVY = "#001F3F";

const themes = {
  dark: {
    bg: "#000D1F", bg2: "#001429", surface: "rgba(255,255,255,0.04)",
    surfaceHover: "rgba(212,175,55,0.08)", card: "#0A1628",
    border: "rgba(212,175,55,0.18)", borderHover: "rgba(212,175,55,0.45)",
    text: "#FFFFFF", textSub: "rgba(255,255,255,0.55)", textMuted: "rgba(255,255,255,0.28)",
    navBg: "rgba(0,10,28,0.96)", hero: "#000D1F", sectionAlt: "#001020",
    inputBg: "rgba(255,255,255,0.07)", inputBorder: "rgba(212,175,55,0.22)",
    footerBg: "#000608",
  },
  light: {
    bg: "#F7F3EB", bg2: "#FFFFFF", surface: "rgba(0,31,63,0.04)",
    surfaceHover: "rgba(212,175,55,0.12)", card: "#FFFFFF",
    border: "rgba(0,31,63,0.12)", borderHover: "rgba(212,175,55,0.6)",
    text: "#001F3F", textSub: "rgba(0,31,63,0.6)", textMuted: "rgba(0,31,63,0.35)",
    navBg: "rgba(247,243,235,0.97)", hero: "#EDE8DC", sectionAlt: "#F0EBE0",
    inputBg: "rgba(0,31,63,0.05)", inputBorder: "rgba(0,31,63,0.15)",
    footerBg: "#001020",
  }
};

/* ─── TRANSLATIONS ─── */
const T = {
  en: {
    dir: "ltr",
    brand: "Sierra AI", sub: "REALTY",
    nav: ["SERVICES","LISTINGS","ABOUT","INSIGHTS","CONTACT"],
    cta: "GET STARTED",
    tagline: "AI‑POWERED LUXURY ESTATES",
    heroTitle: ["Sierra AI", "REALTY"],
    heroDesc: "Exceptional homes, intelligently matched. We connect discerning investors with the world's most curated luxury properties — from Dubai's skyline to Malibu's coast.",
    heroAr: "عقارات فاخرة مدعومة بالذكاء الاصطناعي",
    btnDiscover: "DISCOVER PORTFOLIO",
    btnView: "VIEW LISTINGS",
    stats: [["500+","Properties"],["$25B+","Portfolio Value"],["48","Global Markets"]],
    scroll: "SCROLL",
    secTag: "EXCLUSIVE LISTINGS",
    secTitle: "Luxury Properties",
    viewAll: "VIEW ALL →",
    searchPH: ["Location","Price Range","Property Type","AI Insights"],
    search: "SEARCH",
    diffTag: "WHY Sierra AI",
    diffTitle: "The Sierra AI Difference",
    diffCards: [
      { icon:"📊", title:"AI‑Driven Valuation", desc:"Deep market intelligence combined with machine learning for unmatched investment accuracy and property valuation." },
      { icon:"🌍", title:"Global Reach", desc:"Premium listings across 48 global markets with on-the-ground expertise and world-class client services." },
      { icon:"🔐", title:"Private Client Services", desc:"Dedicated managers and exclusive off-market access before properties ever reach the open market." },
    ],
    bannerTitle: "Exceptional Homes, Intelligent Matching",
    bannerSub: "منازل استثنائية، مطابقة ذكية",
    bannerBtn: "VIEW PROPERTIES",
    mapTag: "MARKET INTELLIGENCE",
    mapTitle: ["Intelligence", "Map"],
    mapDesc: "Real-time intelligence across Dubai's premium investment zones. Track growth corridors, rental yields, and exclusive off-market signals.",
    mapZones: [
      { area:"Palm Jumeirah", stat:"Growth +12%", icon:"🏝️", color:"#4ECDC4" },
      { area:"Downtown Dubai", stat:"High Demand", icon:"📍", color:G },
      { area:"Dubai Marina", stat:"Rental Yield 8%", icon:"⚓", color:"#7EA8B4" },
      { area:"Jumeirah Bay", stat:"Exclusive Off‑Market", icon:"💎", color:"#C084FC" },
    ],
    insightsBtn: "EXPLORE AI INSIGHTS →",
    footNav: "NAVIGATION", footNavLinks: ["Properties","AI Insights","About Us","Careers","Contact"],
    footMarkets: "MARKETS", footMarketLinks: ["Dubai, UAE","Abu Dhabi, UAE","Malibu, USA","Miami, USA","London, UK"],
    footContact: "CONTACT",
    footDesc: "Curated luxury estates for exceptional investors. AI-powered matching across 48 global markets.",
    copyright: "© 2025 Sierra AI Realty. All rights reserved.",
    legal: ["Privacy Policy","Terms of Service","Cookies"],
    beds:"Beds", baths:"Baths",
    tagHigh:"High Investment Potential", tagRapid:"Rapid Appreciation Area",
    tagSmart:"Smart Home — Off Market", tagExcl:"Exclusive Off Market",
    tagGrowth:"Growth Corridor", tagYield:"Rental Yield 8%",
  },
  ar: {
    dir: "rtl",
    brand: "سييرا بلو", sub: "للعقارات",
    nav: ["الخدمات","القوائم","من نحن","الرؤى","اتصل بنا"],
    cta: "ابدأ الآن",
    tagline: "عقارات فاخرة مدعومة بالذكاء الاصطناعي",
    heroTitle: ["سييرا بلو", "للعقارات"],
    heroDesc: "منازل استثنائية، مطابقة ذكية. نربط المستثمرين الراقيين بأفخر العقارات المنتقاة في العالم — من أفق دبي إلى شواطئ ماليبو.",
    heroAr: "Sierra AI Realty — AI-Powered Luxury Estates",
    btnDiscover: "اكتشف المحفظة",
    btnView: "عرض القوائم",
    stats: [["٥٠٠+","عقار"],["٢٥ مليار+","قيمة المحفظة"],["٤٨","سوق عالمي"]],
    scroll: "اسحب",
    secTag: "قوائم حصرية",
    secTitle: "عقارات فاخرة",
    viewAll: "← عرض الكل",
    searchPH: ["الموقع","نطاق السعر","نوع العقار","رؤى الذكاء الاصطناعي"],
    search: "بحث",
    diffTag: "لماذا سييرا بلو",
    diffTitle: "الفارق في سييرا بلو",
    diffCards: [
      { icon:"📊", title:"تقييم مدعوم بالذكاء الاصطناعي", desc:"ذكاء سوقي عميق مدمج مع التعلم الآلي لدقة استثمارية وتقييم عقاري لا مثيل له." },
      { icon:"🌍", title:"انتشار عالمي", desc:"قوائم متميزة في ٤٨ سوقاً عالمياً مع خبرة محلية وخدمات عملاء على أعلى مستوى." },
      { icon:"🔐", title:"خدمات العملاء الخاصة", desc:"مديرو علاقات متفانون وصول حصري لعقارات خارج السوق قبل أن تُطرح للعموم." },
    ],
    bannerTitle: "منازل استثنائية، مطابقة ذكية",
    bannerSub: "Exceptional Homes, Intelligent Matching",
    bannerBtn: "عرض العقارات",
    mapTag: "ذكاء السوق",
    mapTitle: ["خريطة", "الذكاء"],
    mapDesc: "ذكاء فوري عبر مناطق الاستثمار المتميزة في دبي. تتبع ممرات النمو وعوائد الإيجار وإشارات ما خارج السوق.",
    mapZones: [
      { area:"نخلة جميرا", stat:"نمو +١٢٪", icon:"🏝️", color:"#4ECDC4" },
      { area:"وسط مدينة دبي", stat:"طلب مرتفع", icon:"📍", color:G },
      { area:"مرسى دبي", stat:"عائد إيجاري ٨٪", icon:"⚓", color:"#7EA8B4" },
      { area:"جزيرة جميرا باي", stat:"حصري خارج السوق", icon:"💎", color:"#C084FC" },
    ],
    insightsBtn: "← استكشف رؤى الذكاء الاصطناعي",
    footNav: "روابط التنقل", footNavLinks: ["العقارات","رؤى الذكاء الاصطناعي","من نحن","الوظائف","اتصل بنا"],
    footMarkets: "الأسواق", footMarketLinks: ["دبي، الإمارات","أبوظبي، الإمارات","ماليبو، الولايات المتحدة","ميامي، الولايات المتحدة","لندن، المملكة المتحدة"],
    footContact: "تواصل معنا",
    footDesc: "عقارات فاخرة منتقاة للمستثمرين الاستثنائيين. مطابقة مدعومة بالذكاء الاصطناعي في ٤٨ سوقاً عالمياً.",
    copyright: "© ٢٠٢٥ سييرا بلو للعقارات. جميع الحقوق محفوظة.",
    legal: ["سياسة الخصوصية","شروط الخدمة","ملفات تعريف الارتباط"],
    beds:"غرف", baths:"حمامات",
    tagHigh:"إمكانية استثمار عالية", tagRapid:"منطقة تقدير سريع",
    tagSmart:"منزل ذكي — خارج السوق", tagExcl:"حصري خارج السوق",
    tagGrowth:"ممر نمو", tagYield:"عائد إيجاري ٨٪",
  }
};

/* ─── PROPERTIES DATA ─── */
const PROPS = (t) => [
  { id:1, title:"Oceanfront Estate", titleAr:"فيلا على الشاطئ", sub:"Malibu, CA", subAr:"ماليبو، كاليفورنيا", price:"$4,500,000", beds:5, baths:6, sqft:"5,200", tag:t.tagHigh, tagC:G, img:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80" },
  { id:2, title:"Downtown Penthouse", titleAr:"بنتهاوس وسط المدينة", sub:"Burj Khalifa District, Dubai", subAr:"حي برج خليفة، دبي", price:"$6,800,000", beds:4, baths:5, sqft:"4,800", tag:t.tagRapid, tagC:"#C0A060", img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80" },
  { id:3, title:"Palm Jumeirah Villa", titleAr:"فيلا نخلة جميرا", sub:"Palm Jumeirah, Dubai", subAr:"نخلة جميرا، دبي", price:"$5,200,000", beds:6, baths:7, sqft:"6,500", tag:t.tagSmart, tagC:"#7EA8B4", img:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80" },
  { id:4, title:"Emirates Hills Mansion", titleAr:"قصر تلال الإمارات", sub:"Emirates Hills, Dubai", subAr:"تلال الإمارات، دبي", price:"$9,100,000", beds:7, baths:8, sqft:"8,200", tag:t.tagExcl, tagC:G, img:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80" },
  { id:5, title:"Jumeirah Bay Island", titleAr:"جزيرة جميرا باي", sub:"Jumeirah, Dubai", subAr:"جميرا، دبي", price:"$7,300,000", beds:5, baths:6, sqft:"5,900", tag:t.tagGrowth, tagC:"#A0C878", img:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80" },
  { id:6, title:"Marina View Penthouse", titleAr:"بنتهاوس إطلالة المرسى", sub:"Dubai Marina", subAr:"مرسى دبي", price:"$3,800,000", beds:3, baths:4, sqft:"3,600", tag:t.tagYield, tagC:G, img:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&q=80" },
];

/* ─── LOGO COMPONENT — faithful to uploaded shield ─── */
function ShieldLogo({ size = 52 }) {
  const h = size * 1.15;
  return (
    <svg width={size} height={h} viewBox="0 0 120 138" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldBorder" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E070"/>
          <stop offset="40%" stopColor="#D4AF37"/>
          <stop offset="70%" stopColor="#A07820"/>
          <stop offset="100%" stopColor="#E8C94A"/>
        </linearGradient>
        <linearGradient id="navyFill" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#0A2545"/>
          <stop offset="60%" stopColor="#001535"/>
          <stop offset="100%" stopColor="#000A20"/>
        </linearGradient>
        <linearGradient id="buildingMain" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4AF37"/>
          <stop offset="100%" stopColor="#8B6914"/>
        </linearGradient>
        <linearGradient id="buildingSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)"/>
        </linearGradient>
        <linearGradient id="ribbon1" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4AF37"/>
          <stop offset="50%" stopColor="#F0D060"/>
          <stop offset="100%" stopColor="#B8941A"/>
        </linearGradient>
        <linearGradient id="ribbon2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#A07820"/>
          <stop offset="100%" stopColor="#D4AF37"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(212,175,55,0.15)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <clipPath id="shieldClip">
          <path d="M60 4L108 22V78Q108 118 60 134Q12 118 12 78V22Z"/>
        </clipPath>
      </defs>

      {/* Outer gold border shadow */}
      <path d="M60 2L112 21V79Q112 122 60 138Q8 122 8 79V21Z"
        fill="rgba(0,0,0,0.3)" transform="translate(2,2)"/>

      {/* Gold metallic border */}
      <path d="M60 2L112 21V79Q112 122 60 138Q8 122 8 79V21Z"
        fill="url(#goldBorder)"/>

      {/* Navy interior */}
      <path d="M60 8L106 25V78Q106 114 60 130Q14 114 14 78V25Z"
        fill="url(#navyFill)"/>

      {/* Glow overlay */}
      <path d="M60 8L106 25V78Q106 114 60 130Q14 114 14 78V25Z"
        fill="url(#glow)" clipPath="url(#shieldClip)"/>

      {/* Circuit lines (background texture) */}
      <g clipPath="url(#shieldClip)" opacity="0.25">
        <line x1="20" y1="95" x2="50" y2="95" stroke={G} strokeWidth="0.6"/>
        <line x1="50" y1="95" x2="50" y2="110" stroke={G} strokeWidth="0.6"/>
        <line x1="50" y1="110" x2="75" y2="110" stroke={G} strokeWidth="0.6"/>
        <line x1="75" y1="110" x2="75" y2="100" stroke={G} strokeWidth="0.6"/>
        <line x1="75" y1="100" x2="100" y2="100" stroke={G} strokeWidth="0.6"/>
        <circle cx="50" cy="95" r="2" fill={G}/>
        <circle cx="75" cy="110" r="2" fill={G}/>
        <line x1="30" y1="105" x2="45" y2="105" stroke={G} strokeWidth="0.6"/>
        <line x1="80" y1="90" x2="96" y2="90" stroke={G} strokeWidth="0.6"/>
      </g>

      {/* Buildings group */}
      <g clipPath="url(#shieldClip)">
        {/* Left building */}
        <rect x="28" y="40" width="14" height="42" fill="rgba(255,255,255,0.22)" rx="1"/>
        <rect x="31" y="44" width="4" height="5" fill={G} opacity="0.5" rx="0.5"/>
        <rect x="37" y="44" width="4" height="5" fill={G} opacity="0.4" rx="0.5"/>
        <rect x="31" y="52" width="4" height="5" fill={G} opacity="0.3" rx="0.5"/>
        <rect x="37" y="52" width="4" height="5" fill={G} opacity="0.3" rx="0.5"/>

        {/* Right building */}
        <rect x="78" y="44" width="14" height="38" fill="rgba(255,255,255,0.18)" rx="1"/>
        <rect x="81" y="48" width="4" height="5" fill={G} opacity="0.5" rx="0.5"/>
        <rect x="87" y="48" width="4" height="5" fill={G} opacity="0.4" rx="0.5"/>
        <rect x="81" y="56" width="4" height="5" fill={G} opacity="0.3" rx="0.5"/>

        {/* Center tall building (gold) */}
        <rect x="50" y="22" width="20" height="58" fill="url(#buildingMain)" rx="1"/>
        <rect x="50" y="22" width="10" height="58" fill="rgba(255,255,255,0.15)" rx="1"/>
        {/* Center building windows */}
        <rect x="53" y="27" width="5" height="6" fill={NAVY} opacity="0.8" rx="0.5"/>
        <rect x="62" y="27" width="5" height="6" fill={G} opacity="0.6" rx="0.5"/>
        <rect x="53" y="36" width="5" height="6" fill={NAVY} opacity="0.8" rx="0.5"/>
        <rect x="62" y="36" width="5" height="6" fill={G} opacity="0.6" rx="0.5"/>
        <rect x="53" y="45" width="5" height="6" fill={NAVY} opacity="0.8" rx="0.5"/>
        <rect x="62" y="45" width="5" height="6" fill={G} opacity="0.4" rx="0.5"/>

        {/* House/Roof */}
        <path d="M34 82L60 68L86 82" fill="none" stroke="url(#ribbon1)" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="52" y="82" width="16" height="12" fill={G} opacity="0.6" rx="1"/>
        <rect x="56" y="84" width="4" height="6" fill={NAVY} opacity="0.8" rx="0.5"/>
        <rect x="62" y="84" width="4" height="6" fill={G} opacity="0.5" rx="0.5"/>
      </g>

      {/* Gold ribbon / arrow sweep — bursts out of shield */}
      <path d="M14 100 Q35 84 58 72 Q80 58 108 46"
        stroke="url(#ribbon1)" strokeWidth="9" fill="none"
        strokeLinecap="round" opacity="0.88"/>
      <path d="M14 100 Q35 84 58 72 Q80 58 108 46"
        stroke="url(#ribbon2)" strokeWidth="5" fill="none"
        strokeLinecap="round" opacity="0.5"/>
      <path d="M14 100 Q35 84 58 72 Q80 58 108 46"
        stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"
        strokeLinecap="round"/>

      {/* Arrowhead */}
      <path d="M103 40L111 46L103 52" stroke="url(#ribbon1)" strokeWidth="4"
        fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M103 40L111 46L103 52" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Gold rim highlight on shield */}
      <path d="M60 2L112 21V79Q112 122 60 138Q8 122 8 79V21Z"
        fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
    </svg>
  );
}

/* ─── HOOKS ─── */
function useInView(thr = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: thr });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

/* ─── PROPERTY CARD ─── */
function Card({ p, inView, idx, t, th }) {
  const [hov, setHov] = useState(false);
  const isAr = t.dir === "rtl";
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(36px)", transition: `opacity .6s ease ${idx*.1}s,transform .6s ease ${idx*.1}s,box-shadow .3s`, borderRadius: 16, overflow: "hidden", background: th.card, boxShadow: hov ? "0 24px 56px rgba(0,31,63,0.18)" : "0 4px 24px rgba(0,31,63,0.08)" }}>
      <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
        <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.07)" : "scale(1)", transition: "transform .6s ease" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 50%,rgba(0,15,40,.6) 100%)" }}/>
        <span style={{ position: "absolute", top: 13, [isAr ? "right" : "left"]: 13, background: p.tagC, color: NAVY, fontSize: 9.5, fontWeight: 700, letterSpacing: ".07em", padding: "5px 12px", borderRadius: 50, fontFamily: "'Jost',sans-serif" }}>{p.tag}</span>
        <span style={{ position: "absolute", bottom: 13, [isAr ? "left" : "right"]: 13, color: G, fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700 }}>{p.price}</span>
      </div>
      <div style={{ padding: "18px 20px 22px" }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: th.text, marginBottom: 4, textAlign: isAr ? "right" : "left" }}>{isAr ? p.titleAr : p.title}</div>
        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 11.5, color: th.textSub, marginBottom: 14, textAlign: isAr ? "right" : "left" }}>📍 {isAr ? p.subAr : p.sub}</div>
        <div style={{ display: "flex", gap: 14, fontSize: 11, color: th.textSub, fontFamily: "'Jost',sans-serif", paddingTop: 12, borderTop: `1px solid ${G}30`, marginBottom: 14, justifyContent: isAr ? "flex-end" : "flex-start", direction: "ltr" }}>
          <span>🛏 {p.beds} {t.beds}</span><span>🚿 {p.baths} {t.baths}</span><span>📐 {p.sqft} sqft</span>
        </div>
        <button style={{ width: "100%", padding: "10px", background: hov ? G : "transparent", border: `1.5px solid ${G}`, color: hov ? NAVY : th.text, fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: ".12em", borderRadius: 8, cursor: "pointer", transition: "all .25s" }}>{t.btnView}</button>
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function SierraBlu() {
  const [mode, setMode] = useState("dark");
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const th = themes[mode];
  const t = T[lang];
  const isAr = lang === "ar";
  const props = PROPS(t);

  const [heroRef, heroV] = useInView(0.05);
  const [propRef, propV] = useInView(0.05);
  const [diffRef, diffV] = useInView(0.05);
  const [mapRef, mapV] = useInView(0.05);
  const [footRef, footV] = useInView(0.05);

  useEffect(() => {
    const t2 = setTimeout(() => setLoaded(true), 80);
    const s = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", s);
    return () => { clearTimeout(t2); window.removeEventListener("scroll", s); };
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Jost:wght@200;300;400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:${th.bg}}
    ::-webkit-scrollbar-thumb{background:${G};border-radius:3px}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes pulseRing{0%,100%{transform:scale(1);opacity:.45}50%{transform:scale(1.9);opacity:0}}
    @keyframes shimmerLine{0%,100%{opacity:.3}50%{opacity:1}}
    @keyframes slideIn{from{opacity:0;transform:translateX(${isAr ? "-" : ""}50px)}to{opacity:1;transform:translateX(0)}}
    @keyframes floatLogo{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    .navlink{font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:.14em;text-decoration:none;transition:color .2s;color:${mode==="dark" ? "rgba(255,255,255,.65)" : "rgba(0,31,63,.65)"}}
    .navlink:hover{color:${G}}
    .diff-card{background:${th.surface};border:1px solid ${th.border};border-radius:16px;padding:34px 28px;transition:all .3s;cursor:default}
    .diff-card:hover{background:${th.surfaceHover};border-color:${th.borderHover};transform:translateY(-5px);box-shadow:0 22px 50px rgba(0,0,0,.25)}
    .zone-row{display:flex;align-items:center;gap:14px;padding:13px 18px;border-radius:10px;background:${th.surface};border:1px solid ${th.border};cursor:pointer;transition:all .2s}
    .zone-row:hover{background:${th.surfaceHover};border-color:${th.borderHover}}
    [dir=rtl] .navlink{letter-spacing:0;font-family:'Noto Naskh Arabic','Jost',sans-serif;font-size:13px}
    [dir=rtl] h1,[dir=rtl] h2,[dir=rtl] h3{font-family:'Noto Naskh Arabic','Cormorant Garamond',serif}
    [dir=rtl] p,[dir=rtl] span,[dir=rtl] div,[dir=rtl] a,[dir=rtl] button{font-family:'Noto Naskh Arabic','Jost',sans-serif}
  `;

  const heroLight = mode === "light";

  /* ── Toggle pill ── */
  function Toggles() {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Lang toggle */}
        <button onClick={() => setLang(l => l === "en" ? "ar" : "en")}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: th.surface, border: `1px solid ${th.border}`, borderRadius: 50, cursor: "pointer", transition: "all .2s", color: th.text, fontFamily: "'Jost',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: ".1em" }}
          onMouseOver={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = th.border; e.currentTarget.style.color = th.text; }}>
          <span style={{ fontSize: 14 }}>{lang === "en" ? "🇦🇪" : "🇬🇧"}</span>
          {lang === "en" ? "AR" : "EN"}
        </button>
        {/* Theme toggle */}
        <button onClick={() => setMode(m => m === "dark" ? "light" : "dark")}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, background: th.surface, border: `1px solid ${th.border}`, borderRadius: "50%", cursor: "pointer", transition: "all .2s", fontSize: 16 }}
          onMouseOver={e => e.currentTarget.style.borderColor = G}
          onMouseOut={e => e.currentTarget.style.borderColor = th.border}>
          {mode === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    );
  }

  return (
    <div dir={t.dir} style={{ background: th.bg, minHeight: "100vh" }}>
      <style>{css}</style>

      {/* ══════ HEADER ══════ */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? th.navBg : "transparent", borderBottom: scrolled ? `1px solid ${th.border}` : "none", backdropFilter: scrolled ? "blur(14px)" : "none", transition: "all .4s ease" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 13, cursor: "pointer" }}>
            <ShieldLogo size={42}/>
            <div>
              <div style={{ fontFamily: isAr ? "'Noto Naskh Arabic',serif" : "'Cormorant Garamond',serif", fontSize: isAr ? 16 : 18, fontWeight: 600, color: th.text, letterSpacing: isAr ? ".05em" : ".18em", lineHeight: 1.1 }}>{t.brand}</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: ".42em", color: G }}>{t.sub}</div>
            </div>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 30 }}>
            {t.nav.map(l => <a key={l} href="#" className="navlink">{l}</a>)}
            <Toggles/>
            <button style={{ padding: "9px 20px", background: "transparent", border: `1.5px solid ${G}`, color: G, fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: isAr ? 0 : ".18em", borderRadius: 6, cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap" }}
              onMouseOver={e => { e.currentTarget.style.background = G; e.currentTarget.style.color = NAVY; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G; }}
            >{t.cta}</button>
          </nav>
        </div>
      </header>

      {/* ══════ HERO ══════ */}
      <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: th.hero }}>
        {/* Background photo */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=1800&q=85')", backgroundSize: "cover", backgroundPosition: "center 40%", transform: loaded ? "scale(1)" : "scale(1.05)", transition: "transform 2s ease", opacity: heroLight ? 0.18 : 0.6 }}/>
        {heroLight
          ? <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${th.bg} 0%, rgba(247,243,235,0.96) 60%, rgba(230,220,200,0.9) 100%)` }}/>
          : <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg,rgba(0,8,25,.96) 0%,rgba(0,18,45,.82) 45%,rgba(0,8,25,.35) 100%)` }}/>
        }
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at ${isAr ? "30%" : "70%"} 50%, rgba(212,175,55,0.07) 0%,transparent 65%)` }}/>
        <div style={{ position: "absolute", top: 0, [isAr ? "left" : "right"]: "36%", width: 1, height: "100%", background: `linear-gradient(180deg,transparent,${G}44,transparent)` }}/>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: "110px 48px 80px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: isAr ? "45% 55%" : "55% 45%", gap: 56, alignItems: "center" }}>

            {/* Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22, order: isAr ? 2 : 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexDirection: isAr ? "row-reverse" : "row", animation: loaded ? "fadeUp .6s ease .1s both" : "none" }}>
                <div style={{ width: 32, height: 1, background: G }}/>
                <span style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 10, letterSpacing: isAr ? ".02em" : ".3em", color: G, fontWeight: 500 }}>{t.tagline}</span>
              </div>
              <h1 style={{ fontFamily: isAr ? "'Noto Naskh Arabic',serif" : "'Cormorant Garamond',serif", fontSize: "clamp(46px,5vw,72px)", fontWeight: isAr ? 700 : 300, color: th.text, lineHeight: 1.08, textAlign: isAr ? "right" : "left", animation: loaded ? "fadeUp .7s ease .22s both" : "none" }}>
                {t.heroTitle[0]}<br/><span style={{ color: G, fontStyle: isAr ? "normal" : "italic" }}>{t.heroTitle[1]}</span>
              </h1>
              <p style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 13.5, color: th.textSub, lineHeight: 1.9, fontWeight: 300, maxWidth: 460, textAlign: isAr ? "right" : "left", animation: loaded ? "fadeUp .7s ease .34s both" : "none" }}>{t.heroDesc}</p>
              <p style={{ fontFamily: isAr ? "'Jost',sans-serif" : "'Noto Naskh Arabic',sans-serif", fontSize: 12, color: `${G}aa`, fontWeight: 300, textAlign: isAr ? "right" : "left", animation: loaded ? "fadeUp .7s ease .4s both" : "none" }}>{t.heroAr}</p>
              <div style={{ display: "flex", gap: 14, flexDirection: isAr ? "row-reverse" : "row", animation: loaded ? "fadeUp .7s ease .48s both" : "none" }}>
                <button style={{ padding: "13px 28px", background: G, color: NAVY, fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: isAr ? 0 : ".18em", border: "none", borderRadius: 6, cursor: "pointer", transition: "all .22s", boxShadow: `0 8px 28px ${G}40`, whiteSpace: "nowrap" }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 14px 36px ${G}55`; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 28px ${G}40`; }}
                >{t.btnDiscover}</button>
                <button style={{ padding: "13px 28px", background: "transparent", border: `1.5px solid ${th.border}`, color: th.textSub, fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: isAr ? 0 : ".18em", borderRadius: 6, cursor: "pointer", transition: "all .22s", whiteSpace: "nowrap" }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = th.border; e.currentTarget.style.color = th.textSub; }}
                >{t.btnView}</button>
              </div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, paddingTop: 26, borderTop: `1px solid ${G}20`, animation: loaded ? "fadeUp .7s ease .6s both" : "none" }}>
                {t.stats.map(([n, l]) => (
                  <div key={l} style={{ textAlign: isAr ? "right" : "left" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 36, fontWeight: 600, color: G, lineHeight: 1 }}>{n}</div>
                    <div style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 10, color: th.textMuted, marginTop: 4, letterSpacing: ".06em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo showcase + property card */}
            <div style={{ position: "relative", height: 520, order: isAr ? 1 : 2, animation: loaded ? "slideIn .9s ease .45s both" : "none" }}>
              {/* Big logo watermark */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: heroLight ? 0.06 : 0.04, pointerEvents: "none", animation: "floatLogo 6s ease-in-out infinite" }}>
                <ShieldLogo size={320}/>
              </div>

              {/* Stacked cards */}
              {[2,1,0].map(off => (
                <div key={off} style={{ position: "absolute", top: off*18, left: off*18, right: -(off*18), bottom: -(off*18), background: off===0 ? th.card : th.surface, borderRadius: 20, overflow: off===0 ? "hidden" : undefined, border: off > 0 ? `1px solid ${th.border}` : undefined, boxShadow: off===0 ? "0 40px 80px rgba(0,0,0,.4)" : undefined, zIndex: 3-off }}>
                  {off===0 && <>
                    <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=85" alt="Featured" style={{ width: "100%", height: "62%", objectFit: "cover" }}/>
                    <span style={{ position: "absolute", top: 16, [isAr ? "right" : "left"]: 16, background: G, color: NAVY, fontSize: 9, fontWeight: 700, letterSpacing: ".1em", padding: "5px 13px", borderRadius: 50, fontFamily: "'Jost',sans-serif" }}>{props[0].tag}</span>
                    <div style={{ padding: "20px 24px 22px" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 21, fontWeight: 600, color: th.text, textAlign: isAr ? "right" : "left" }}>{isAr ? props[0].titleAr : props[0].title}</div>
                      <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, color: th.textSub, marginTop: 4, textAlign: isAr ? "right" : "left" }}>📍 {isAr ? props[0].subAr : props[0].sub}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${th.border}`, flexDirection: isAr ? "row-reverse" : "row" }}>
                        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700, color: G }}>{props[0].price}</span>
                        <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 10, color: th.textSub }}>5 {t.beds} · 6 {t.baths}</span>
                      </div>
                    </div>
                  </>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: loaded ? "fadeIn 1s ease 1.6s both" : "none" }}>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: ".35em", color: th.textMuted }}>{t.scroll}</span>
          <div style={{ width: 1, height: 36, background: `linear-gradient(180deg,${G},transparent)`, animation: "shimmerLine 2s infinite" }}/>
        </div>
      </section>

      {/* ══════ LISTINGS ══════ */}
      <section ref={propRef} style={{ background: mode === "dark" ? "#001020" : "#F0EBE0", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexDirection: isAr ? "row-reverse" : "row", opacity: propV ? 1 : 0, transform: propV ? "translateY(0)" : "translateY(20px)", transition: "all .7s ease" }}>
            <div style={{ textAlign: isAr ? "right" : "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexDirection: isAr ? "row-reverse" : "row" }}>
                <div style={{ width: 36, height: 1, background: G }}/><span style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 10, letterSpacing: isAr ? ".02em" : ".3em", color: G, fontWeight: 500 }}>{t.secTag}</span>
              </div>
              <h2 style={{ fontFamily: isAr ? "'Noto Naskh Arabic',serif" : "'Cormorant Garamond',serif", fontSize: 50, fontWeight: isAr ? 700 : 400, color: th.text, lineHeight: 1.1 }}>{t.secTitle}</h2>
            </div>
            <a href="#" style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 10, letterSpacing: isAr ? 0 : ".15em", color: th.text, textDecoration: "none", borderBottom: `1px solid ${G}`, paddingBottom: 2, fontWeight: 600, whiteSpace: "nowrap" }}>{t.viewAll}</a>
          </div>

          {/* Search */}
          <div style={{ background: NAVY, borderRadius: 14, padding: "18px 22px", marginBottom: 38, display: "grid", gridTemplateColumns: "repeat(4,1fr) auto", gap: 12, direction: "ltr", opacity: propV ? 1 : 0, transition: "opacity .7s ease .15s" }}>
            {t.searchPH.map(ph => <select key={ph} style={{ padding: "10px 13px", background: "rgba(255,255,255,.07)", border: `1px solid rgba(212,175,55,.2)`, color: "rgba(255,255,255,.75)", fontFamily: "'Jost',sans-serif", fontSize: 11, borderRadius: 8, outline: "none", cursor: "pointer" }}><option>{ph}</option></select>)}
            <button style={{ padding: "10px 24px", background: G, border: "none", color: NAVY, fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: ".12em", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap" }}>{t.search}</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
            {props.map((p, i) => <Card key={p.id} p={p} idx={i} inView={propV} t={t} th={th}/>)}
          </div>
        </div>
      </section>

      {/* ══════ DIFFERENCE ══════ */}
      <section ref={diffRef} style={{ background: mode === "dark" ? NAVY : "#fff", padding: "100px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle,${G}06 0%,transparent 70%)`, pointerEvents: "none" }}/>

        {/* Giant logo watermark */}
        <div style={{ position: "absolute", [isAr ? "left" : "right"]: -60, top: "50%", transform: "translateY(-50%)", opacity: mode === "dark" ? 0.04 : 0.035, pointerEvents: "none" }}>
          <ShieldLogo size={480}/>
        </div>

        <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 70, opacity: diffV ? 1 : 0, transform: diffV ? "translateY(0)" : "translateY(24px)", transition: "all .7s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 36, height: 1, background: `${G}55` }}/><span style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 10, letterSpacing: isAr ? ".02em" : ".3em", color: G }}>{t.diffTag}</span><div style={{ width: 36, height: 1, background: `${G}55` }}/>
            </div>
            <h2 style={{ fontFamily: isAr ? "'Noto Naskh Arabic',serif" : "'Cormorant Garamond',serif", fontSize: 50, fontWeight: isAr ? 700 : 400, color: th.text }}>{t.diffTitle}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {t.diffCards.map((c, i) => (
              <div key={c.title} className="diff-card" style={{ opacity: diffV ? 1 : 0, transform: diffV ? "translateY(0)" : "translateY(32px)", transition: `all .7s ease ${i*.12}s`, textAlign: isAr ? "right" : "left" }}>
                <div style={{ fontSize: 30, marginBottom: 16 }}>{c.icon}</div>
                <div style={{ width: diffV ? 36 : 0, height: 2, background: G, marginBottom: 18, transition: "width .8s ease .5s", marginLeft: isAr ? "auto" : 0 }}/>
                <h3 style={{ fontFamily: isAr ? "'Noto Naskh Arabic',serif" : "'Cormorant Garamond',serif", fontSize: isAr ? 20 : 25, fontWeight: isAr ? 700 : 500, color: th.text, marginBottom: 12 }}>{c.title}</h3>
                <p style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 13, color: th.textSub, lineHeight: 1.85, fontWeight: 300 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Banner */}
          <div style={{ marginTop: 62, padding: "32px 42px", background: `linear-gradient(130deg,${G}12,${G}04)`, border: `1px solid ${G}25`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: isAr ? "row-reverse" : "row", opacity: diffV ? 1 : 0, transition: "opacity .7s ease .48s" }}>
            <div style={{ textAlign: isAr ? "right" : "left" }}>
              <h3 style={{ fontFamily: isAr ? "'Noto Naskh Arabic',serif" : "'Cormorant Garamond',serif", fontSize: isAr ? 22 : 30, fontWeight: isAr ? 700 : 400, color: th.text }}>{t.bannerTitle}</h3>
              <p style={{ fontFamily: isAr ? "'Jost',sans-serif" : "'Noto Naskh Arabic',sans-serif", fontSize: 12, color: `${G}90`, marginTop: 5 }}>{t.bannerSub}</p>
            </div>
            <button style={{ padding: "13px 34px", background: G, color: NAVY, fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: isAr ? 0 : ".18em", border: "none", borderRadius: 8, cursor: "pointer", whiteSpace: "nowrap", marginLeft: isAr ? 0 : 32, marginRight: isAr ? 32 : 0, transition: "all .22s", boxShadow: `0 8px 26px ${G}44` }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >{t.bannerBtn}</button>
          </div>
        </div>
      </section>

      {/* ══════ INTELLIGENCE MAP ══════ */}
      <section ref={mapRef} style={{ background: mode === "dark" ? "#000A18" : "#EDE8DC", padding: "100px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isAr ? "1fr 1fr" : "1fr 1fr", gap: 80, alignItems: "center", direction: "ltr" }}>

            {/* Info — swap order for RTL */}
            <div style={{ order: isAr ? 2 : 1, display: "flex", flexDirection: "column", gap: 24, opacity: mapV ? 1 : 0, transform: mapV ? "translateX(0)" : "translateX(-40px)", transition: "all .85s ease", direction: t.dir }}>
              <div style={{ textAlign: isAr ? "right" : "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexDirection: isAr ? "row-reverse" : "row" }}>
                  <div style={{ width: 36, height: 1, background: G }}/><span style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 10, letterSpacing: isAr ? ".02em" : ".3em", color: G }}>{t.mapTag}</span>
                </div>
                <h2 style={{ fontFamily: isAr ? "'Noto Naskh Arabic',serif" : "'Cormorant Garamond',serif", fontSize: 50, fontWeight: isAr ? 700 : 400, color: th.text, lineHeight: 1.12 }}>
                  {t.mapTitle[0]}<br/><span style={{ color: G, fontStyle: isAr ? "normal" : "italic" }}>{t.mapTitle[1]}</span>
                </h2>
              </div>
              <p style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 13.5, color: th.textSub, lineHeight: 1.9, fontWeight: 300, textAlign: isAr ? "right" : "left" }}>{t.mapDesc}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {t.mapZones.map((r, i) => (
                  <div key={r.area} className="zone-row" style={{ flexDirection: isAr ? "row-reverse" : "row", opacity: mapV ? 1 : 0, transition: `all .6s ease ${.1+i*.1}s` }}>
                    <span style={{ fontSize: 19 }}>{r.icon}</span>
                    <div style={{ flex: 1, fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 12.5, fontWeight: 600, color: th.text, textAlign: isAr ? "right" : "left" }}>{r.area}</div>
                    <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 10.5, fontWeight: 600, color: r.color, background: `${r.color}18`, padding: "4px 11px", borderRadius: 50, whiteSpace: "nowrap" }}>{r.stat}</span>
                  </div>
                ))}
              </div>

              <button style={{ padding: "13px 0", background: "transparent", border: `1.5px solid ${G}`, color: G, fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: isAr ? 0 : ".18em", borderRadius: 8, cursor: "pointer", transition: "all .22s" }}
                onMouseOver={e => e.currentTarget.style.background = `${G}14`}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >{t.insightsBtn}</button>
            </div>

            {/* Map SVG */}
            <div style={{ order: isAr ? 1 : 2, opacity: mapV ? 1 : 0, transform: mapV ? "translateX(0)" : "translateX(40px)", transition: "all .9s ease .2s" }}>
              <div style={{ position: "relative", background: mode === "dark" ? "rgba(0,5,16,.88)" : "rgba(0,20,50,.06)", border: `1px solid ${G}28`, borderRadius: 20, overflow: "hidden", boxShadow: `0 0 50px rgba(0,0,0,.5),inset 0 0 30px rgba(212,175,55,.03)`, aspectRatio: "1.05" }}>
                <svg viewBox="0 0 500 476" style={{ width: "100%", height: "100%" }}>
                  <defs>
                    <pattern id="mg" width="28" height="28" patternUnits="userSpaceOnUse">
                      <path d="M28 0L0 0 0 28" fill="none" stroke={G} strokeWidth=".3" opacity=".18"/>
                    </pattern>
                    <radialGradient id="mrg" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={G} stopOpacity=".07"/>
                      <stop offset="100%" stopColor={G} stopOpacity="0"/>
                    </radialGradient>
                    <filter id="mglow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  </defs>
                  <rect width="500" height="476" fill="url(#mg)"/>
                  <rect width="500" height="476" fill="url(#mrg)"/>
                  <path d="M25 185Q55 165 90 180Q125 195 135 185Q158 170 172 185L188 215Q168 238 148 232Q122 226 112 242Q96 262 80 257Q54 248 38 232Z" fill={`${G}0d`} stroke={`${G}40`} strokeWidth="1.5"/>
                  <text x="95" y="290" textAnchor="middle" fill={`${G}45`} fontSize="8" fontFamily="'Jost',sans-serif" letterSpacing="3">ARABIAN GULF</text>
                  {["M90 90L440 90","M190 40L190 430","M80 170L440 170","M290 40L290 430","M80 250L440 250","M70 160L420 360"].map((d,i)=><path key={i} d={d} stroke={`${G}18`} strokeWidth="1" fill="none"/>)}
                  <path d="M190 20L190 456" stroke={G} strokeWidth="2" opacity=".2" strokeDasharray="8,5"/>
                  <text x="196" y="430" fill={`${G}40`} fontSize="7.5" fontFamily="'Jost',sans-serif" transform="rotate(-90,196,430)" letterSpacing="1.5">SHEIKH ZAYED RD</text>
                  {[{ x:61,y:38,label:"Downtown Dubai",sub:"High Demand ↑12%",pulse:true },{ x:34,y:55,label:"Dubai Marina",sub:"Rental Yield 8%",pulse:false },{ x:26,y:42,label:"Palm Jumeirah",sub:"Growth +12%",pulse:true },{ x:47,y:68,label:"Jumeirah Bay",sub:"Off Market",pulse:false },{ x:72,y:58,label:"Emirates Hills",sub:"Ultra Luxury",pulse:true }].map((pin) => {
                    const cx=(pin.x/100)*500,cy=(pin.y/100)*476;
                    return (
                      <g key={pin.label}>
                        {pin.pulse && <><circle cx={cx} cy={cy} r="16" fill="none" stroke={G} strokeWidth="1" opacity=".3" style={{ animation:"pulseRing 2.2s infinite" }}/><circle cx={cx} cy={cy} r="24" fill="none" stroke={G} strokeWidth=".5" opacity=".15" style={{ animation:"pulseRing 2.2s infinite .5s" }}/></>}
                        <circle cx={cx} cy={cy} r="6" fill={G} filter="url(#mglow)"/>
                        <circle cx={cx} cy={cy} r="2.5" fill="#fff"/>
                        <rect x={cx-54} y={cy-50} width="108" height="36" rx="6" fill="rgba(0,5,18,.92)" stroke={`${G}55`} strokeWidth="1"/>
                        <text x={cx} y={cy-32} textAnchor="middle" fill="#fff" fontSize="9.5" fontFamily="'Jost',sans-serif" fontWeight="600" letterSpacing=".4">{pin.label}</text>
                        <text x={cx} y={cy-19} textAnchor="middle" fill={G} fontSize="8.5" fontFamily="'Jost',sans-serif">{pin.sub}</text>
                      </g>
                    );
                  })}
                  <text x="250" y="464" textAnchor="middle" fill={`${G}22`} fontSize="9" fontFamily="'Jost',sans-serif" letterSpacing="4">Sierra AI INTELLIGENCE</text>
                </svg>
                {[{t:12,l:12},{t:12,r:12},{b:12,l:12},{b:12,r:12}].map((pos,i)=>(
                  <div key={i} style={{ position:"absolute",width:20,height:20,top:pos.t,bottom:pos.b,left:pos.l,right:pos.r,borderTop:i<2?`2px solid ${G}55`:undefined,borderBottom:i>=2?`2px solid ${G}55`:undefined,borderLeft:i%2===0?`2px solid ${G}55`:undefined,borderRight:i%2!==0?`2px solid ${G}55`:undefined }}/>
                ))}
                <div style={{ position:"absolute",bottom:14,left:"50%",transform:"translateX(-50%)",display:"flex",gap:16,background:"rgba(0,4,14,.75)",padding:"7px 18px",borderRadius:50,border:`1px solid ${G}20` }}>
                  {[["Growth Zone","#4ECDC4"],["High Demand",G],["Off Market","#C084FC"]].map(([lb,cl])=>(
                    <div key={lb} style={{ display:"flex",alignItems:"center",gap:5 }}>
                      <div style={{ width:7,height:7,borderRadius:"50%",background:cl }}/>
                      <span style={{ fontFamily:"'Jost',sans-serif",fontSize:8.5,color:"rgba(255,255,255,.55)",letterSpacing:".06em" }}>{lb}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer ref={footRef} style={{ background: mode === "dark" ? "#000608" : NAVY, borderTop: `1px solid ${G}18`, padding: "72px 48px 36px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 52, opacity: footV ? 1 : 0, transition: "opacity .8s ease" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, textAlign: isAr ? "right" : "left" }}>
              {/* Logo prominent in footer */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexDirection: isAr ? "row-reverse" : "row" }}>
                <ShieldLogo size={54}/>
                <div>
                  <div style={{ fontFamily: isAr ? "'Noto Naskh Arabic',serif" : "'Cormorant Garamond',serif", fontSize: isAr ? 16 : 20, fontWeight: 600, color: "#fff", letterSpacing: isAr ? ".05em" : ".18em" }}>{t.brand}</div>
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: 8, letterSpacing: ".42em", color: G }}>{t.sub}</div>
                </div>
              </div>
              <p style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 12, color: "rgba(255,255,255,.38)", lineHeight: 1.9, fontWeight: 300, maxWidth: 280 }}>{t.footDesc}</p>
              <div style={{ display: "flex", gap: 10, flexDirection: isAr ? "row-reverse" : "row" }}>
                {["in","ig","fb","yt"].map(s=>(
                  <div key={s} style={{ width:33,height:33,background:`${G}12`,border:`1px solid ${G}28`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all .2s",fontFamily:"'Jost',sans-serif",fontSize:9.5,color:G,fontWeight:700 }}
                    onMouseOver={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color=NAVY}}
                    onMouseOut={e=>{e.currentTarget.style.background=`${G}12`;e.currentTarget.style.color=G}}
                  >{s}</div>
                ))}
              </div>
            </div>
            {[
              { title: t.footNav, items: t.footNavLinks },
              { title: t.footMarkets, items: t.footMarketLinks },
              { title: t.footContact, items: ["📍 JBR, Dubai Marina","Dubai, UAE","📞 +971 4 234 5678","✉️ info@sierrablurealty.com"] },
            ].map(col => (
              <div key={col.title} style={{ textAlign: isAr ? "right" : "left" }}>
                <div style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 9, letterSpacing: isAr ? 0 : ".28em", color: G, marginBottom: 18, fontWeight: 600 }}>{col.title}</div>
                {col.items.map(item=>(
                  <div key={item} style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 11.5, color: "rgba(255,255,255,.38)", marginBottom: 11, fontWeight: 300, cursor: "pointer", transition: "color .2s" }}
                    onMouseOver={e=>e.currentTarget.style.color=G}
                    onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,.38)"}
                  >{item}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.06)", flexDirection: isAr ? "row-reverse" : "row", opacity: footV ? 1 : 0, transition: "opacity .8s ease .3s" }}>
            <span style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 10.5, color: "rgba(255,255,255,.22)", fontWeight: 300 }}>{t.copyright}</span>
            <div style={{ display: "flex", gap: 22 }}>
              {t.legal.map(l=>(
                <a key={l} href="#" style={{ fontFamily: isAr ? "'Noto Naskh Arabic',sans-serif" : "'Jost',sans-serif", fontSize: 10.5, color: "rgba(255,255,255,.22)", textDecoration: "none", transition: "color .2s", fontWeight: 300 }}
                  onMouseOver={e=>e.currentTarget.style.color=G}
                  onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,.22)"}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
