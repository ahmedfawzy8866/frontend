import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// Sierra AI Realty — Beyond Brokerage
// Refined landing with curated listings + Property Finder CRM
// Brand: Navy #0A1628 · Gold #D4AF37 · Cream #F8F5EF
// ═══════════════════════════════════════════════════════════════

const C = {
  dark:    "#0A1628",
  navy:    "#0D2444",
  navyMid: "#1A3D6B",
  gold:    "#D4AF37",
  goldLt:  "#E8CC6A",
  goldPale:"rgba(212,175,55,0.12)",
  cream:   "#F8F5EF",
  body:    "rgba(255,255,255,0.85)",
  muted:   "rgba(255,255,255,0.55)",
  line:    "rgba(212,175,55,0.18)",
};

// Real luxury New Cairo listing data with curated imagery
const LISTINGS = [
  {
    id: "MVD-3F-75K+G",
    name: "Azure Heights Estate",
    compound: "Mivida",
    location: "5th Settlement, New Cairo",
    type: "Garden Villa",
    price: "EGP 12,500,000",
    monthly: null,
    beds: 3, baths: 3, area: 245,
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
    badge: "Hidden Gem",
    badgeColor: "gold",
    pfViews: 842,
    pfLeads: 12,
    score: 9.4,
    delta: "-15% vs market",
  },
  {
    id: "D5-4F-104K",
    name: "The Meridian Penthouse",
    compound: "District 5",
    location: "Maadi, Cairo",
    type: "Sky Penthouse",
    price: "EGP 18,200,000",
    monthly: null,
    beds: 4, baths: 4, area: 310,
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
    badge: "Exceptional ROI",
    badgeColor: "sky",
    pfViews: 1241,
    pfLeads: 19,
    score: 9.8,
    delta: "8.4% rental yield",
  },
  {
    id: "PH-5F-200K+PG",
    name: "Golden Villa Estate",
    compound: "Palm Hills",
    location: "New Cairo",
    type: "Luxury Estate",
    price: "EGP 24,000,000",
    monthly: null,
    beds: 5, baths: 5, area: 520,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
    badge: "Featured",
    badgeColor: "gold",
    pfViews: 2104,
    pfLeads: 31,
    score: 9.9,
    delta: "Top 1% in Palm Hills",
  },
];

const COMPOUNDS = [
  { name: "Mivida", units: 47, top: "26%", left: "22%" },
  { name: "District 5", units: 33, top: "38%", left: "58%" },
  { name: "Villette", units: 29, top: "55%", left: "32%" },
  { name: "IL Bosco", units: 24, top: "62%", left: "70%" },
  { name: "Palm Hills", units: 18, top: "74%", left: "44%" },
];

const SERVICES = [
  {
    title: "Curated Selection",
    desc: "Hand-picked premium properties verified by our intelligence team.",
    icon: "search",
  },
  {
    title: "Smart Investment",
    desc: "AI-driven market analysis to identify hidden value and ROI opportunities.",
    icon: "chart",
  },
  {
    title: "Trusted Guidance",
    desc: "Concierge-level service with the personal touch our clients expect.",
    icon: "handshake",
  },
];

const PRESS = ["Property Finder", "Bloomberg Mid-East", "Forbes ME", "Daily News Egypt"];

// Icon system
const Icon = ({ name, size = 22, color = C.gold }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "search") return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M11 7v8M7 11h8" opacity=".5"/></svg>;
  if (name === "chart")  return <svg {...props}><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/><circle cx="20" cy="9" r="1.2" fill={color}/></svg>;
  if (name === "handshake") return <svg {...props}><path d="M11 17 8 14l1-3 6-6 4 4-1 4-3 3-2-2"/><path d="m13 19 2 2 5-5-2-2"/></svg>;
  if (name === "bed")    return <svg {...props} strokeWidth="1.3"><path d="M2 9V18M22 18V13a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5"/><path d="M2 18h20"/><circle cx="9" cy="13" r="2"/></svg>;
  if (name === "bath")   return <svg {...props} strokeWidth="1.3"><path d="M9 5a2 2 0 0 1 4 0v3M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M5 19v2M19 19v2"/></svg>;
  if (name === "area")   return <svg {...props} strokeWidth="1.3"><path d="M3 3h7v7H3zM14 14h7v7h-7zM21 3h-7v7h7zM3 21h7v-7H3z"/></svg>;
  if (name === "pin")    return <svg {...props}><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
  if (name === "phone")  return <svg {...props}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.6.7 2 2 0 0 1 1.7 2Z"/></svg>;
  if (name === "arrow")  return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
  if (name === "shield") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2 4 5v7c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V5l-8-3Z" stroke={color} strokeWidth="1.3"/><path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
  if (name === "verified") return <svg {...props} strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>;
  if (name === "play")   return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M8 5v14l11-7-11-7Z"/></svg>;
  return null;
};

// Logo — recreated from the user's shield mark
const Logo = ({ small = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <svg width={small ? 38 : 44} height={small ? 38 : 44} viewBox="0 0 60 60">
      <defs>
        <linearGradient id="shieldG" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={C.gold}/>
          <stop offset="100%" stopColor={C.goldLt}/>
        </linearGradient>
      </defs>
      <path d="M30 4 L54 12 V32 Q54 48 30 56 Q6 48 6 32 V12 Z" fill={C.navy} stroke="url(#shieldG)" strokeWidth="2.2"/>
      <g opacity="0.55">
        <rect x="22" y="20" width="6" height="20" fill={C.gold}/>
        <rect x="29" y="14" width="7" height="26" fill={C.goldLt}/>
        <rect x="37" y="22" width="5" height="18" fill={C.gold}/>
      </g>
      <path d="M14 44 Q30 38 46 44" stroke="url(#shieldG)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M40 41 L46 44 L42 48" stroke={C.gold} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: small ? 17 : 19, fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>Sierra AI</span>
      <span style={{ fontSize: 8.5, letterSpacing: ".26em", color: C.gold, marginTop: 3, textTransform: "uppercase", fontWeight: 500 }}>Beyond Brokerage</span>
    </div>
  </div>
);

// PF live badge
const PFBadge = () => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(56,130,246,.12)", border: "1px solid rgba(56,130,246,.3)", borderRadius: 4, padding: "3px 9px", fontSize: 9.5, color: "#7ab1f5", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600 }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}/>
    PF Live · Synced
  </div>
);

export default function SierraBluLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("listings");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: C.dark, color: "#fff", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Cairo:wght@300;400;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes pulse  { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.4; transform:scale(1.4) } }
        @keyframes shimmer { 0% { background-position:-200% 0 } 100% { background-position:200% 0 } }
        @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
        .reveal { animation: fadeUp 1s cubic-bezier(.2,.7,.2,1) both }
        .pin-pulse { animation: pulse 2.4s ease-in-out infinite }
        .floating { animation: float 4s ease-in-out infinite }
        .gold-grad-text {
          background: linear-gradient(95deg, ${C.gold} 0%, ${C.goldLt} 50%, ${C.gold} 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 6s linear infinite;
        }
        .hover-lift { transition: transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s }
        .hover-lift:hover { transform: translateY(-6px) }
        .listing-card .img-wrap img { transition: transform 1.2s cubic-bezier(.2,.7,.2,1), filter .5s }
        .listing-card:hover .img-wrap img { transform: scale(1.06); filter: brightness(.85) }
        .listing-card .explore-btn { opacity: 0; transform: translateY(14px); transition: all .4s }
        .listing-card:hover .explore-btn { opacity: 1; transform: translateY(0) }
        .nav-link { position:relative; padding-bottom:3px }
        .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:${C.gold}; transition: width .3s }
        .nav-link:hover { color:${C.gold} !important }
        .nav-link:hover::after { width:100% }
        .gold-btn { background:${C.gold}; color:${C.navy}; transition: all .25s; border:1px solid ${C.gold} }
        .gold-btn:hover { background:transparent; color:${C.gold} }
        .ghost-btn { background:transparent; color:#fff; border:1px solid rgba(255,255,255,.3); transition: all .25s }
        .ghost-btn:hover { border-color:${C.gold}; color:${C.gold} }
        .grid-overlay {
          background-image:
            linear-gradient(rgba(212,175,55,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,.04) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .stitch-line {
          background: linear-gradient(90deg, transparent 0%, ${C.gold} 30%, ${C.gold} 70%, transparent 100%);
          height: 1px;
        }
        ::-webkit-scrollbar { width: 8px; height: 8px }
        ::-webkit-scrollbar-track { background: ${C.dark} }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,.25); border-radius: 4px }
      `}</style>

      {/* ═════════ NAV ═════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "14px 52px" : "22px 52px",
        background: scrolled ? "rgba(10,22,40,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all .4s",
      }}>
        <Logo small={scrolled}/>
        <ul style={{ display: "flex", alignItems: "center", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {["Home", "Listings", "Investment", "Insights", "About", "Contact"].map((l, i) => (
            <li key={l}><a className="nav-link" style={{ fontSize: 12.5, letterSpacing: ".08em", color: i === 0 ? C.gold : C.body, textDecoration: "none", textTransform: "uppercase" }}>{l}</a></li>
          ))}
          <li style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 12, borderLeft: `1px solid ${C.line}`, color: C.muted, fontSize: 11, letterSpacing: ".1em" }}>
            <span style={{ color: C.gold }}>EN</span> | <span>AR</span>
          </li>
          <li>
            <button style={{ padding: "10px 20px", borderRadius: 3, fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }} className="gold-btn">
              Schedule Consultation
            </button>
          </li>
        </ul>
      </nav>

      {/* ═════════ HERO ═════════ */}
      <section style={{ position: "relative", height: "100vh", minHeight: 720, overflow: "hidden", display: "flex", alignItems: "flex-end", padding: "0 52px 100px" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(to bottom, rgba(10,22,40,.35) 0%, rgba(10,22,40,.2) 35%, rgba(10,22,40,.85) 80%, ${C.dark} 100%), url('https://images.unsplash.com/photo-1580407196238-dac33f57c410?w=2000&q=90')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}/>
        <div className="grid-overlay" style={{ position: "absolute", inset: 0 }}/>

        <div style={{ position: "absolute", top: 110, right: 52, display: "flex", alignItems: "center", gap: 10, background: "rgba(10,22,40,.7)", backdropFilter: "blur(12px)", border: `1px solid ${C.line}`, borderRadius: 4, padding: "10px 16px", fontSize: 10.5, letterSpacing: ".1em", color: C.gold, textTransform: "uppercase" }} className="reveal">
          <span className="pin-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: C.gold }}/>
          AI-Verified · Property Finder Synced
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 820 }}>
          <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 11, letterSpacing: ".25em", color: C.gold, textTransform: "uppercase", marginBottom: 28 }}>
            <span style={{ width: 40, height: 1, background: C.gold }}/>
            AI-Powered Real Estate Intelligence
          </div>

          <h1 className="reveal" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 7vw, 86px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-.02em", marginBottom: 28, animationDelay: ".15s" }}>
            Smarter Decisions.<br/>
            The <span className="gold-grad-text" style={{ fontStyle: "italic" }}>Real</span> in Real Estate.
          </h1>

          <p className="reveal" style={{ fontSize: 18, lineHeight: 1.65, color: C.body, maxWidth: 580, marginBottom: 40, fontWeight: 300, animationDelay: ".3s" }}>
            Curated luxury properties in New Cairo's most coveted compounds — Mivida, District 5, Palm Hills — paired with intelligence that finds value others miss.
          </p>

          <div className="reveal" style={{ display: "flex", gap: 16, marginBottom: 80, animationDelay: ".45s" }}>
            <button onClick={() => document.getElementById("listings-sec")?.scrollIntoView({ behavior: "smooth" })} style={{ padding: "16px 30px", borderRadius: 3, fontSize: 12, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }} className="gold-btn">
              Explore Listings <Icon name="arrow" size={14} color={C.navy}/>
            </button>
            <button style={{ padding: "16px 30px", borderRadius: 3, fontSize: 12, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }} className="ghost-btn">
              <Icon name="play" size={11} color="#fff"/> Watch Film
            </button>
          </div>

          {/* Hero stats */}
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 56, paddingTop: 28, borderTop: `1px solid ${C.line}`, animationDelay: ".6s" }}>
            {[
              { num: "147", label: "Curated Properties" },
              { num: "5", label: "Premier Compounds" },
              { num: "84", label: "Active Inquiries" },
              { num: "4.8M", label: "Pipeline EGP" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: C.gold, fontWeight: 600 }}>{s.num}</div>
                <div style={{ fontSize: 10.5, letterSpacing: ".15em", color: C.muted, textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", fontSize: 9.5, letterSpacing: ".4em", color: C.muted, textTransform: "uppercase", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${C.gold}, transparent)` }}/>
        </div>
      </section>

      {/* ═════════ PRESS BAR ═════════ */}
      <section style={{ background: "rgba(13,36,68,.4)", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: "26px 52px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, letterSpacing: ".25em", color: C.muted, textTransform: "uppercase" }}>As Featured In</span>
          {PRESS.map(p => (
            <span key={p} style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "rgba(255,255,255,.55)", fontStyle: "italic", letterSpacing: ".5px" }}>{p}</span>
          ))}
          <PFBadge/>
        </div>
      </section>

      {/* ═════════ SERVICES ═════════ */}
      <section style={{ padding: "120px 52px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ fontSize: 11, letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: 20 }}>Our Approach</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.01em" }}>
            Crafted for the<br/>
            <em className="gold-grad-text">Discerning Client</em>
          </h2>
          <div className="stitch-line" style={{ width: 80, margin: "32px auto 0" }}/>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className="hover-lift" style={{ background: "rgba(13,36,68,.5)", border: `1px solid ${C.line}`, padding: "40px 32px", borderRadius: 4, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity: .5 }}/>
              <div style={{ width: 56, height: 56, border: `1px solid ${C.line}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, background: C.goldPale }}>
                <Icon name={s.icon} size={26} color={C.gold}/>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, marginBottom: 14 }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.body, fontWeight: 300 }}>{s.desc}</p>
              <div style={{ marginTop: 28, fontSize: 10, letterSpacing: ".25em", color: C.gold, textTransform: "uppercase" }}>0{i + 1} —</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════ FEATURED LISTINGS ═════════ */}
      <section id="listings-sec" style={{ padding: "100px 52px", background: "linear-gradient(180deg, transparent 0%, rgba(13,36,68,.3) 50%, transparent 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, gap: 32, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: 20 }}>Featured Listings</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 4.5vw, 50px)", fontWeight: 600, lineHeight: 1.1 }}>
                Verified <em className="gold-grad-text">Properties</em>
              </h2>
              <p style={{ fontSize: 15, color: C.body, marginTop: 14, fontWeight: 300, maxWidth: 480 }}>
                Hand-picked from 5,000+ listings across Property Finder, WhatsApp brokers, and exclusive owner direct.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <PFBadge/>
              <button className="ghost-btn" style={{ padding: "12px 22px", borderRadius: 3, fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                Browse All <Icon name="arrow" size={12} color="#fff"/>
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {LISTINGS.map((p, i) => (
              <article key={p.id} className="listing-card hover-lift" style={{ background: "rgba(13,36,68,.6)", border: `1px solid ${C.line}`, borderRadius: 4, overflow: "hidden", cursor: "pointer", animationDelay: `${i * 0.12}s` }}>
                <div className="img-wrap" style={{ position: "relative", height: 280, overflow: "hidden", background: C.navy }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                  <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ background: "rgba(10,22,40,.85)", backdropFilter: "blur(10px)", border: `1px solid ${C.gold}`, color: C.gold, padding: "5px 12px", borderRadius: 3, fontSize: 9.5, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600 }}>
                      ✦ {p.badge}
                    </span>
                    <span style={{ background: "rgba(56,130,246,.85)", color: "#fff", padding: "5px 9px", borderRadius: 3, fontSize: 9, fontWeight: 700, letterSpacing: ".05em" }}>PF</span>
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,22,40,.95) 0%, transparent 60%)" }}/>
                  <div className="explore-btn" style={{ position: "absolute", bottom: 18, left: 18, right: 18 }}>
                    <button style={{ width: "100%", padding: "12px 16px", background: C.gold, color: C.navy, border: "none", borderRadius: 3, fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      Explore Property <Icon name="arrow" size={12} color={C.navy}/>
                    </button>
                  </div>
                </div>
                <div style={{ padding: "22px 22px 24px" }}>
                  <div style={{ fontSize: 9.5, letterSpacing: ".22em", color: C.muted, textTransform: "uppercase", marginBottom: 6 }}>
                    {p.compound} · {p.location}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, marginBottom: 4, lineHeight: 1.2 }}>{p.name}</h3>
                  <div style={{ fontSize: 11.5, color: C.body, fontStyle: "italic", marginBottom: 14, opacity: .8 }}>{p.type}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: C.gold, fontWeight: 600, marginBottom: 16 }}>{p.price}</div>
                  <div style={{ display: "flex", gap: 18, marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${C.line}` }}>
                    {[["bed", `${p.beds} BR`], ["bath", `${p.baths} BA`], ["area", `${p.area} m²`]].map(([ic, l]) => (
                      <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: C.body }}>
                        <Icon name={ic} size={14} color={C.gold}/> {l}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10.5 }}>
                    <span style={{ color: "#22c55e", fontWeight: 600 }}>↗ {p.delta}</span>
                    <span style={{ color: C.muted, fontFamily: "monospace" }}>SBR · {p.id}</span>
                  </div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, color: C.muted }}>
                    <span>👁 {p.pfViews.toLocaleString()} PF views</span>
                    <span style={{ color: C.gold }}>★ {p.score}/10 AI Score</span>
                    <span>📨 {p.pfLeads} leads</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ NEW CAIRO MAP ═════════ */}
      <section style={{ padding: "100px 52px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: 20 }}>New Cairo Coverage</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 4.5vw, 50px)", fontWeight: 600, lineHeight: 1.1, marginBottom: 18 }}>
            Explore <em className="gold-grad-text">Our Market</em>
          </h2>
          <p style={{ fontSize: 14.5, color: C.body, fontWeight: 300, maxWidth: 580, margin: "0 auto" }}>
            We cover every premier compound across the 5th Settlement, with deep market intelligence for each.
          </p>
        </div>

        <div style={{ position: "relative", height: 440, borderRadius: 4, overflow: "hidden", background: C.navy, border: `1px solid ${C.line}` }}>
          {/* Map base — stylized abstract grid */}
          <div style={{
            position: "absolute", inset: 0,
            background: `
              radial-gradient(circle at 30% 40%, rgba(212,175,55,.06), transparent 40%),
              radial-gradient(circle at 70% 70%, rgba(56,130,246,.06), transparent 40%),
              ${C.navy}
            `,
          }}/>
          {/* Grid lines */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none" viewBox="0 0 100 100">
            {[...Array(8)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 14 + 5} x2="100" y2={i * 14 + 5 + (Math.sin(i) * 2)} stroke={C.gold} strokeOpacity=".1" strokeWidth=".15"/>)}
            {[...Array(10)].map((_, i) => <line key={`v${i}`} x1={i * 11 + 5} y1="0" x2={i * 11 + 5 + (Math.cos(i) * 2)} y2="100" stroke={C.gold} strokeOpacity=".1" strokeWidth=".15"/>)}
            {/* Roads */}
            <path d="M 0 50 Q 30 45, 50 55 T 100 50" stroke={C.gold} strokeOpacity=".25" strokeWidth=".3" fill="none"/>
            <path d="M 30 0 Q 35 40, 45 60 T 60 100" stroke={C.gold} strokeOpacity=".22" strokeWidth=".3" fill="none"/>
            <path d="M 0 30 Q 40 35, 70 25 T 100 35" stroke={C.gold} strokeOpacity=".18" strokeWidth=".25" fill="none"/>
          </svg>

          {/* Compound pins */}
          {COMPOUNDS.map((c, i) => (
            <div key={c.name} className="floating" style={{ position: "absolute", top: c.top, left: c.left, animationDelay: `${i * 0.4}s` }}>
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="pin-pulse" style={{ position: "absolute", top: -4, width: 32, height: 32, borderRadius: "50%", background: "rgba(212,175,55,.2)", border: `1px solid ${C.gold}` }}/>
                <Icon name="pin" size={28} color={C.gold}/>
                <div style={{ marginTop: 6, padding: "5px 11px", background: "rgba(10,22,40,.95)", border: `1px solid ${C.gold}`, borderRadius: 3, whiteSpace: "nowrap" }}>
                  <div style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 9, color: C.gold }}>{c.units} units</div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ position: "absolute", bottom: 20, right: 20, padding: "10px 14px", background: "rgba(10,22,40,.85)", backdropFilter: "blur(10px)", border: `1px solid ${C.line}`, borderRadius: 3, fontSize: 10.5, color: C.muted }}>
            5 Compounds · 151 Active Listings
          </div>
          <div style={{ position: "absolute", top: 20, left: 20, padding: "8px 14px", background: "rgba(10,22,40,.85)", backdropFilter: "blur(10px)", border: `1px solid ${C.line}`, borderRadius: 3, fontSize: 11, color: "#fff", fontWeight: 500, letterSpacing: ".1em" }}>
            🇪🇬 New Cairo · 5th Settlement
          </div>
        </div>
      </section>

      {/* ═════════ CRM / OPS DASHBOARD PREVIEW ═════════ */}
      <section style={{ padding: "100px 52px", background: `linear-gradient(180deg, ${C.dark} 0%, rgba(13,36,68,.5) 100%)` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: 20 }}>Beyond Brokerage</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 4.5vw, 50px)", fontWeight: 600, lineHeight: 1.1, marginBottom: 18 }}>
              We Engineer<br/><em className="gold-grad-text">Better Decisions</em>
            </h2>
            <p style={{ fontSize: 14.5, color: C.body, fontWeight: 300, maxWidth: 600, margin: "0 auto" }}>
              Every Property Finder lead, every WhatsApp inquiry, every market shift — synthesized into one intelligence layer for our advisors.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32, gap: 4, flexWrap: "wrap" }}>
            {[
              { k: "listings", l: "PF Listings Sync" },
              { k: "leads", l: "PF Lead Pipeline" },
              { k: "intelligence", l: "Market Intel" },
            ].map(t => (
              <button key={t.k} onClick={() => setActiveTab(t.k)} style={{
                padding: "11px 22px", border: `1px solid ${activeTab === t.k ? C.gold : C.line}`,
                background: activeTab === t.k ? C.goldPale : "transparent",
                color: activeTab === t.k ? C.gold : C.body,
                fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600,
                borderRadius: 3, cursor: "pointer", transition: "all .25s",
              }}>
                {t.l}
              </button>
            ))}
          </div>

          {/* Dashboard frame */}
          <div style={{ background: "rgba(10,22,40,.85)", border: `1px solid ${C.line}`, borderRadius: 4, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,.4)" }}>
            <div style={{ background: "rgba(13,36,68,.7)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${C.line}` }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }}/>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }}/>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }}/>
              </div>
              <span style={{ fontSize: 10.5, color: C.muted, marginLeft: 8, fontFamily: "monospace" }}>sierra-blu.app/operations · {activeTab}</span>
              <span style={{ marginLeft: "auto" }}><PFBadge/></span>
            </div>

            <div style={{ padding: 24, minHeight: 360 }}>
              {activeTab === "listings" && <ListingsTab/>}
              {activeTab === "leads" && <LeadsTab/>}
              {activeTab === "intelligence" && <IntelligenceTab/>}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button className="ghost-btn" style={{ padding: "13px 28px", borderRadius: 3, fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }}>
              Request Advisor Access <Icon name="arrow" size={12} color="#fff"/>
            </button>
          </div>
        </div>
      </section>

      {/* ═════════ CLIENT TESTIMONIAL ═════════ */}
      <section style={{ padding: "120px 52px", textAlign: "center", maxWidth: 1080, margin: "0 auto" }}>
        <Icon name="shield" size={48} color={C.gold}/>
        <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", fontStyle: "italic", lineHeight: 1.45, fontWeight: 400, marginTop: 32, marginBottom: 36, color: "#fff" }}>
          "They didn't just find me a villa in Mivida — they built me a strategy. The intelligence layer is what every advisor in Egypt should aspire to."
        </blockquote>
        <div className="stitch-line" style={{ width: 56, margin: "0 auto 24px" }}/>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 4 }}>Hossam El-Refaai</div>
        <div style={{ fontSize: 11, color: C.muted, letterSpacing: ".15em", textTransform: "uppercase" }}>Managing Partner · Cairo Capital Group</div>
      </section>

      {/* ═════════ CTA ═════════ */}
      <section style={{ padding: "100px 52px", textAlign: "center", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: "rgba(13,36,68,.4)" }}>
        <div style={{ fontSize: 11, letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: 20 }}>Make Your Move</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 4vw, 48px)", fontWeight: 600, lineHeight: 1.1, marginBottom: 22, maxWidth: 760, margin: "0 auto 22px" }}>
          Beyond Brokerage. <em className="gold-grad-text">Beyond Expectation.</em>
        </h2>
        <p style={{ fontSize: 15, color: C.body, fontWeight: 300, marginBottom: 38, maxWidth: 540, margin: "0 auto 38px" }}>
          Schedule a private consultation with one of our luxury advisors. We work by appointment only.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="gold-btn" style={{ padding: "16px 32px", borderRadius: 3, fontSize: 12, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 700, cursor: "pointer" }}>
            Schedule Consultation
          </button>
          <button className="ghost-btn" style={{ padding: "16px 32px", borderRadius: 3, fontSize: 12, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10 }}>
            <Icon name="phone" size={13} color="#fff"/> +20 100 123 4567
          </button>
        </div>
      </section>

      {/* ═════════ FOOTER ═════════ */}
      <footer style={{ padding: "60px 52px 32px", background: C.navy }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <Logo/>
            <p style={{ fontSize: 12.5, color: C.body, lineHeight: 1.7, marginTop: 22, fontWeight: 300, maxWidth: 320 }}>
              Egypt's first AI-powered real estate intelligence platform. Curating luxury properties across New Cairo with discipline and clarity.
            </p>
          </div>
          {[
            { h: "Discover", links: ["Listings", "Compounds", "Investment", "Insights"] },
            { h: "Company", links: ["About", "Approach", "Press", "Careers"] },
            { h: "Connect", links: ["+20 100 123 4567", "hello@sierrablu.com", "5th Settlement, Cairo", "EN | AR"] },
          ].map(c => (
            <div key={c.h}>
              <div style={{ fontSize: 10.5, letterSpacing: ".25em", color: C.gold, textTransform: "uppercase", marginBottom: 18 }}>{c.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {c.links.map(l => <li key={l} style={{ marginBottom: 10, fontSize: 12.5, color: C.body, fontWeight: 300, cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = C.gold} onMouseLeave={e => e.target.style.color = C.body}>{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 28, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, fontSize: 11, color: C.muted }}>
          <span>© 2026 Sierra AI Realty. All rights reserved.</span>
          <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <PFBadge/>
            <span>Privacy</span>
            <span>Terms</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

// ═════════ DASHBOARD TABS ═════════

function ListingsTab() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { v: "147", l: "Active on PF" },
          { v: "12", l: "Synced today" },
          { v: "0", l: "Sync errors" },
          { v: "5,341", l: "PF impressions / 30d" },
        ].map(s => (
          <div key={s.l} style={{ background: "rgba(13,36,68,.5)", border: `1px solid ${C.line}`, padding: "14px 16px", borderRadius: 3 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: C.gold, fontWeight: 600 }}>{s.v}</div>
            <div style={{ fontSize: 9.5, color: C.muted, letterSpacing: ".15em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(13,36,68,.4)", border: `1px solid ${C.line}`, borderRadius: 3 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr 0.8fr", padding: "10px 18px", fontSize: 9.5, letterSpacing: ".18em", color: C.muted, textTransform: "uppercase", fontWeight: 600, borderBottom: `1px solid ${C.line}` }}>
          <span>Property</span><span>SBR Code</span><span>PF Views</span><span>PF Leads</span><span>AI Score</span><span>Status</span>
        </div>
        {LISTINGS.map(p => (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr 0.8fr", padding: "14px 18px", fontSize: 12, color: C.body, borderBottom: `1px solid rgba(212,175,55,.08)`, alignItems: "center" }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{p.compound} · {p.beds}BR · {p.area}m²</div>
            </div>
            <span style={{ fontFamily: "monospace", fontSize: 10.5, color: C.gold }}>{p.id}</span>
            <span><strong style={{ color: "#fff" }}>{p.pfViews.toLocaleString()}</strong> <span style={{ color: "#22c55e", fontSize: 10, marginLeft: 4 }}>↑</span></span>
            <span><strong style={{ color: "#fff" }}>{p.pfLeads}</strong> <span style={{ color: C.muted, fontSize: 10, marginLeft: 4 }}>inquiries</span></span>
            <div>
              <div style={{ color: C.gold, fontWeight: 600, marginBottom: 3 }}>{p.score}/10</div>
              <div style={{ height: 3, background: "rgba(212,175,55,.15)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${p.score * 10}%`, height: "100%", background: C.gold }}/>
              </div>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9.5, color: "#22c55e", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%" }}/>Live
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadsTab() {
  const leads = [
    { name: "Ahmed Hassan",  init: "AH", interest: "3BR Villa · Mivida", budget: "12–14M EGP", score: 96, stage: "HOT", color: "#ef4444" },
    { name: "Sara Ramadan",  init: "SR", interest: "4BR Penthouse · D5", budget: "16–20M EGP", score: 91, stage: "HOT", color: "#ef4444" },
    { name: "Khaled Mostafa",init: "KM", interest: "5BR Estate · Palm Hills", budget: "22–28M EGP", score: 84, stage: "WARM", color: "#f59e0b" },
    { name: "Noura Fathy",   init: "NF", interest: "3BR Pool Villa · Villette", budget: "12–14M EGP", score: 79, stage: "WARM", color: "#f59e0b" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { v: "84", l: "PF Leads / 30d" },
          { v: "31", l: "Hot leads" },
          { v: "37%", l: "Conversion rate" },
          { v: "2.4h", l: "Avg response" },
        ].map(s => (
          <div key={s.l} style={{ background: "rgba(13,36,68,.5)", border: `1px solid ${C.line}`, padding: "14px 16px", borderRadius: 3 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: C.gold, fontWeight: 600 }}>{s.v}</div>
            <div style={{ fontSize: 9.5, color: C.muted, letterSpacing: ".15em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(13,36,68,.4)", border: `1px solid ${C.line}`, borderRadius: 3 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.4fr 1fr 1fr 0.8fr 0.8fr", padding: "10px 18px", fontSize: 9.5, letterSpacing: ".18em", color: C.muted, textTransform: "uppercase", fontWeight: 600, borderBottom: `1px solid ${C.line}` }}>
          <span>Lead</span><span>Property Interest</span><span>Budget</span><span>Neural Match</span><span>Stage</span><span>Source</span>
        </div>
        {leads.map(l => (
          <div key={l.name} style={{ display: "grid", gridTemplateColumns: "1.4fr 1.4fr 1fr 1fr 0.8fr 0.8fr", padding: "14px 18px", fontSize: 12, color: C.body, borderBottom: `1px solid rgba(212,175,55,.08)`, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.goldPale, border: `1px solid ${C.gold}`, color: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 11 }}>{l.init}</div>
              <span style={{ color: "#fff", fontWeight: 500 }}>{l.name}</span>
            </div>
            <span>{l.interest}</span>
            <span style={{ color: C.gold, fontWeight: 500 }}>{l.budget}</span>
            <div>
              <div style={{ color: l.score >= 90 ? "#22c55e" : C.gold, fontWeight: 600, marginBottom: 3 }}>{l.score}%</div>
              <div style={{ height: 3, background: "rgba(212,175,55,.15)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${l.score}%`, height: "100%", background: l.score >= 90 ? "#22c55e" : C.gold }}/>
              </div>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9.5, color: l.color, fontWeight: 700, letterSpacing: ".1em" }}>
              <span style={{ width: 6, height: 6, background: l.color, borderRadius: "50%" }}/>{l.stage}
            </span>
            <span style={{ background: "rgba(56,130,246,.18)", color: "#7ab1f5", padding: "3px 8px", borderRadius: 2, fontSize: 9, fontWeight: 700, textAlign: "center" }}>PF</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntelligenceTab() {
  const compounds = [
    { name: "Mivida",      ppm: 38500, yoy: 18.2, roi: 8.4, demand: 92 },
    { name: "District 5",  ppm: 42100, yoy: 22.4, roi: 9.1, demand: 96 },
    { name: "Villette",    ppm: 35200, yoy: 15.8, roi: 7.9, demand: 84 },
    { name: "Palm Hills",  ppm: 48700, yoy: 24.1, roi: 9.4, demand: 98 },
    { name: "IL Bosco",    ppm: 33800, yoy: 12.6, roi: 7.2, demand: 76 },
  ];
  const max = Math.max(...compounds.map(c => c.ppm));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { v: "39,660", l: "Avg EGP / m² (5SS)" },
          { v: "+18.6%", l: "YoY appreciation" },
          { v: "8.4%", l: "Avg rental yield" },
          { v: "92", l: "Demand index" },
        ].map(s => (
          <div key={s.l} style={{ background: "rgba(13,36,68,.5)", border: `1px solid ${C.line}`, padding: "14px 16px", borderRadius: 3 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: C.gold, fontWeight: 600 }}>{s.v}</div>
            <div style={{ fontSize: 9.5, color: C.muted, letterSpacing: ".15em", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 10.5, letterSpacing: ".22em", color: C.muted, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Compound Heatmap · Price / m² EGP</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {compounds.map(c => (
          <div key={c.name} style={{ display: "grid", gridTemplateColumns: "100px 1fr 80px 70px 70px", gap: 14, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{c.name}</span>
            <div style={{ position: "relative", height: 24, background: "rgba(13,36,68,.5)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ width: `${(c.ppm / max) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${C.gold}, ${C.goldLt})`, borderRadius: 2 }}/>
              <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: C.navy, fontWeight: 700 }}>{c.ppm.toLocaleString()}</span>
            </div>
            <span style={{ fontSize: 11, color: "#22c55e", textAlign: "right", fontWeight: 600 }}>↑ {c.yoy}%</span>
            <span style={{ fontSize: 11, color: C.gold, textAlign: "right" }}>{c.roi}% ROI</span>
            <span style={{ fontSize: 11, color: C.body, textAlign: "right" }}>D: {c.demand}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
