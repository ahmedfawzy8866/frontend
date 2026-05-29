import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgePercent,
  BarChart3,
  BedDouble,
  Bot,
  BrainCircuit,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Compass,
  Crown,
  Gauge,
  Home,
  Info,
  Landmark,
  LayoutDashboard,
  MapPinned,
  Menu,
  MessageCircle,
  Ruler,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:       "#0F172A", // Deep Slate Navy
  navyDeep:   "#020617", // True Night
  navyMid:    "#1E293B", // Steel Navy
  navyLight:  "#334155", 
  silver:     "#E2E8F0", // Bright Platinum
  silverLight:"#F8FAFC", // White Silver
  silverDim:  "#94A3B8", // Muted Slate Silver
  white:      "#FFFFFF",
  offWhite:   "#F1F5F9",
  muted:      "rgba(226,232,240,0.55)",
  mutedLow:   "rgba(226,232,240,0.32)",
};

// ─── Shared class strings ──────────────────────────────────────────────────────
const shell     = `min-h-screen overflow-x-hidden font-[Outfit] text-[${C.white}]`;
const container = "mx-auto max-w-[1540px] px-4 md:px-8 xl:px-12";

const glass = `
  backdrop-blur-[20px]
  bg-[rgba(15,23,42,0.72)]
  border border-[rgba(226,232,240,0.14)]
  shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(226,232,240,0.07)]
`.replace(/\n\s+/g, " ").trim();

const glassSilver = `
  backdrop-blur-[20px]
  bg-[rgba(15,23,42,0.78)]
  border border-[rgba(226,232,240,0.32)]
  shadow-[0_0_0_1px_rgba(226,232,240,0.14),0_0_36px_rgba(226,232,240,0.14),0_24px_80px_rgba(0,0,0,0.55)]
`.replace(/\n\s+/g, " ").trim();

const glassInner = `
  backdrop-blur-[12px]
  bg-[rgba(241,245,249,0.04)]
  border border-[rgba(241,245,249,0.08)]
`.replace(/\n\s+/g, " ").trim();

const silverBtn = `rounded-full bg-gradient-to-r from-[${C.silver}] to-[${C.silverLight}] text-[${C.navyDeep}] font-semibold shadow-[0_0_28px_rgba(226,232,240,0.35)] hover:opacity-90 transition`;
const ghostBtn  = `rounded-full border border-[rgba(226,232,240,0.28)] bg-[rgba(226,232,240,0.07)] text-[${C.silverLight}] hover:bg-[rgba(226,232,240,0.14)] transition`;

// ─── Nav items ─────────────────────────────────────────────────────────────────
const nav = [
  { id: "home",      label: "Home",      icon: Home },
  { id: "explore",   label: "Explore",   icon: Compass },
  { id: "property",  label: "Property",  icon: Building2 },
  { id: "about",     label: "About",     icon: Info },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const quickFilters = ["Luxury Villas", "High ROI", "Ready to Move", "Installments"];

const matchedProperties = [
  { title: "Skyline Villa Residence",    price: "EGP 42,500,000", meta: "5 Beds · 420 m² · Lake View",     match: 96 },
  { title: "Golden Square Penthouse",    price: "EGP 28,900,000", meta: "3 Beds · 280 m² · Corner Unit",   match: 93 },
  { title: "Blu Horizon Twin House",     price: "EGP 37,500,000", meta: "4 Beds · 360 m² · Prime",         match: 91 },
  { title: "Cairo Festival Apartment",   price: "EGP 18,200,000", meta: "2 Beds · 175 m² · Rental Ready",  match: 89 },
];

const exploreListings = [
  { title: "Luxury Villa in Mivida",      location: "New Cairo",        beds: 3, area: 450, price: "EGP 48,000,000", match: 95, tag: "Ready to Move"  },
  { title: "Eco Residences Villa",        location: "New Capital",      beds: 4, area: 380, price: "EGP 38,500,000", match: 92, tag: "High ROI"        },
  { title: "Golden Square Apartment",     location: "Golden Square",    beds: 3, area: 210, price: "EGP 22,750,000", match: 90, tag: "Investor Deal"   },
  { title: "Sky Condos Penthouse",        location: "Fifth Settlement", beds: 3, area: 165, price: "EGP 16,900,000", match: 88, tag: "Ready"           },
];

const journey = [
  { title: "Traditional Brokerage",   subtitle: "Legacy Process",    text: "Built on trusted relationships, local expertise, and premium neighborhood access.", icon: Users },
  { title: "AI Operations Manager",   subtitle: "Smart Automation",  text: "Lead scoring, property matching, and advisor workflows powered by intelligent systems.", icon: Bot },
  { title: "Unified Digital Stack",   subtitle: "Full Integration",  text: "Inventory, reporting, communication, and decision support merged into one premium platform.", icon: BrainCircuit },
];

const sidebarItems = [
  { label: "Inventory",      icon: Building2 },
  { label: "Leads Pipeline", icon: Users },
  { label: "Deals",          icon: CircleDollarSign },
  { label: "AI Reports",     icon: BarChart3 },
];

// ─── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]           = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={shell} style={{ background: C.navyDeep }}>
      <GlobalBackground />
      <TopBar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="relative z-10 pt-24 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32 }}
          >
            {page === "home"      && <HomePage setPage={setPage} />}
            {page === "explore"   && <ExplorePage />}
            {page === "property"  && <PropertyPage />}
            {page === "about"     && <AboutPage />}
            {page === "dashboard" && <DashboardPage />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// ─── Global Background ─────────────────────────────────────────────────────────
function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at top, ${C.navyMid} 0%, ${C.navyDeep} 55%)`
      }} />
      {/* Silver accent top-right */}
      <div className="absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full opacity-20"
        style={{ background: C.silver, filter: "blur(160px)" }} />
      {/* Subtle navy accent bottom-left */}
      <div className="absolute -bottom-16 -left-16 h-[360px] w-[360px] rounded-full opacity-25"
        style={{ background: C.navyLight, filter: "blur(120px)" }} />
      {/* Fine grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(226,232,240,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(226,232,240,0.8) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Diagonal shine */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(226,232,240,0.6) 0%, transparent 50%, rgba(226,232,240,0.3) 100%)",
        }}
      />
    </div>
  );
}

// ─── Top Bar ───────────────────────────────────────────────────────────────────
function TopBar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <div className="fixed inset-x-0 top-0 z-40 px-4 pt-3 md:px-8 xl:px-12">
      <div className={`${container} px-0`}>
        <div className={`flex items-center justify-between rounded-[28px] px-4 py-3 md:px-6 ${glass}`}>
          {/* Logo */}
          <button onClick={() => setPage("home")} className="flex items-center gap-3 transition hover:opacity-90">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: `linear-gradient(135deg, ${C.silver}, ${C.silverDim})`, boxShadow: `0 0 24px rgba(226,232,240,0.4)` }}>
              <ShieldCheck className="h-5 w-5" style={{ color: C.navyDeep }} />
            </div>
            <div>
              <div className="font-[Cinzel] text-[17px] tracking-[0.22em]" style={{ color: C.white }}>Sierra AI</div>
              <div className="text-[10px] uppercase tracking-[0.44em]" style={{ color: C.silver }}>Realty · Beyond Brokerage</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className="rounded-full px-4 py-2 text-sm transition-all duration-200"
                  style={{
                    background: active ? `rgba(226,232,240,0.12)` : "transparent",
                    color:      active ? C.silverLight : C.muted,
                    boxShadow:  active ? `0 0 18px rgba(226,232,240,0.18)` : "none",
                    border:     active ? `1px solid rgba(226,232,240,0.25)` : "1px solid transparent",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <button className={`px-4 py-2 text-sm ${ghostBtn}`}>EN | AR</button>
            <button className={`px-5 py-2 text-sm ${silverBtn}`}>
              Get VIP Voucher
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden rounded-full p-3 transition"
            style={{ background: "rgba(226,232,240,0.08)", border: `1px solid rgba(226,232,240,0.18)`, color: C.silverLight }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`mt-3 rounded-[24px] p-3 lg:hidden ${glass}`}
            >
              <div className="grid gap-2">
                {nav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setPage(item.id); setMobileOpen(false); }}
                    className="rounded-2xl px-4 py-3 text-left text-sm transition hover:bg-white/5"
                    style={{ color: C.muted }}
                  >
                    {item.label}
                  </button>
                ))}
                <button className={`mt-2 px-5 py-3 text-sm ${silverBtn}`}>Get VIP Voucher</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Section Title ─────────────────────────────────────────────────────────────
function SectionTitle({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`space-y-4 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <span className="inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em]"
        style={{ background: `rgba(226,232,240,0.10)`, border: `1px solid rgba(226,232,240,0.28)`, color: C.silverLight }}>
        {eyebrow}
      </span>
      <h2 className="font-[Cormorant_Garamond] text-4xl leading-none md:text-6xl" style={{ color: C.white }}>{title}</h2>
      <p className="text-base leading-7 md:text-lg" style={{ color: C.muted }}>{description}</p>
    </div>
  );
}

// ─── Hero Visual ───────────────────────────────────────────────────────────────
function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[34px]">
      <div className="absolute inset-0 z-10"
        style={{ background: `linear-gradient(90deg, rgba(6,14,26,0.94) 0%, rgba(6,14,26,0.55) 45%, rgba(6,14,26,0.18) 100%)` }} />
      <div className="absolute inset-0 z-10"
        style={{ background: `radial-gradient(circle at bottom left, rgba(10,22,40,0.55), transparent 40%), linear-gradient(180deg, rgba(15,30,53,0.18), rgba(6,14,26,0.45))` }} />
      <div className="absolute inset-0 bg-cover bg-center scale-[1.02]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80')" }} />
    </div>
  );
}

// ─── Property Thumbnail ────────────────────────────────────────────────────────
function PropertyThumb({ compact = false, image = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] ${compact ? "h-28" : "h-44"} bg-cover bg-center`}
      style={{
        backgroundImage: `url(${image})`,
        border: `1px solid rgba(226,232,240,0.12)`,
      }}
    >
      <div className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${C.navyDeep}, rgba(6,14,26,0.2) 50%, transparent)` }} />
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div className={`${container} space-y-10`}>
      {/* Hero */}
      <section className="relative min-h-[86vh] overflow-hidden rounded-[34px]"
        style={{ border: `1px solid rgba(226,232,240,0.15)` }}>
        <HeroVisual />
        <div className="relative z-20 flex min-h-[86vh] flex-col justify-between p-6 md:p-10 xl:p-14">
          {/* Top badges */}
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em]"
              style={{ background: `rgba(226,232,240,0.10)`, border: `1px solid rgba(226,232,240,0.25)`, color: C.silverLight }}>
              AI-Powered Real Estate Intelligence
            </span>
            <span className="hidden rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] md:inline-block"
              style={{ background: `rgba(10,22,40,0.55)`, border: `1px solid rgba(248,245,238,0.12)`, color: C.muted }}>
              New Cairo · Luxury Advisory
            </span>
          </div>

          {/* Hero copy */}
          <div className="max-w-3xl space-y-6 py-10 md:py-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="font-[Cinzel] text-4xl leading-[0.9] md:text-6xl xl:text-7xl"
            >
              <span style={{ color: C.white }}>Sierra AI Realty:</span>
              <span className="block" style={{ color: C.silver }}>Beyond Brokerage</span>
            </motion.h1>
            <p className="max-w-2xl text-xl font-light tracking-wide md:text-3xl" style={{ color: `rgba(248,245,238,0.82)` }}>
              Smart Decisions, AI-Driven
            </p>
            <p className="max-w-2xl text-base leading-7 md:text-lg" style={{ color: C.muted }}>
              A cinematic luxury platform for buyers and investors who want curated properties,
              sharper insights, and a modern advisory experience in New Cairo.
            </p>

            {/* Search bar */}
            <div className={`max-w-3xl rounded-[28px] p-3 ${glassSilver}`}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: C.silverLight }} />
                  <input
                    placeholder="What is your investment goal today?"
                    className="h-14 w-full rounded-full bg-transparent pl-12 text-base outline-none placeholder:opacity-40 focus:ring-0"
                    style={{ border: `1px solid rgba(226,232,240,0.18)`, color: C.white }}
                  />
                </div>
                <button className={`h-14 px-6 text-base ${silverBtn}`}>
                  Search with AI <ArrowRight className="ml-2 inline h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickFilters.map((f) => (
                  <button key={f} className="rounded-full px-4 py-2 text-sm transition hover:opacity-80"
                    style={{ border: `1px solid rgba(226,232,240,0.18)`, background: `rgba(226,232,240,0.06)`, color: C.offWhite }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Matched Properties card */}
          <div className={`rounded-[30px] p-4 md:p-5 ${glass}`}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-lg font-medium md:text-xl" style={{ color: C.white }}>AI-Matched Properties</div>
                <div className="text-sm" style={{ color: C.muted }}>Personalized for your investment profile</div>
              </div>
              <span className="rounded-full px-3 py-1 text-xs"
                style={{ background: `rgba(226,232,240,0.10)`, border: `1px solid rgba(226,232,240,0.22)`, color: C.silverLight }}>
                Live Match Engine
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {matchedProperties.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="group rounded-[24px] p-3 transition-all hover:-translate-y-1 cursor-pointer"
                  style={{ background: `rgba(248,245,238,0.04)`, border: `1px solid rgba(226,232,240,0.10)` }}
                  onMouseEnter={(e) => e.currentTarget.style.border = `1px solid rgba(226,232,240,0.28)`}
                  onMouseLeave={(e) => e.currentTarget.style.border = `1px solid rgba(226,232,240,0.10)`}
                >
                  <PropertyThumb compact />
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-medium" style={{ color: C.white }}>{item.title}</h3>
                        <p className="text-xs" style={{ color: C.muted }}>{item.meta}</p>
                      </div>
                      <span className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                        style={{ background: `rgba(226,232,240,0.12)`, border: `1px solid rgba(226,232,240,0.22)`, color: C.silverLight }}>
                        {item.match}%
                      </span>
                    </div>
                    <div className="text-sm font-medium" style={{ color: C.white }}>{item.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value cards */}
      <section className="grid gap-4 xl:grid-cols-3">
        <ValueCard icon={Sparkles} title="Win-Win Situations"
          description="We align investor intent, seller timing, and premium inventory to create better outcomes." />
        <ValueCard icon={Users} title="1600+ Brokers in New Cairo"
          description="An exclusive network giving Sierra AI unmatched off-market access and brokerage intelligence." featured />
        <ValueCard icon={Crown} title="50% VIP Discount"
          description="A dedicated luxury entry offer for non-Egyptians, paired with direct WhatsApp advisory." premium />
      </section>

      {/* CTA Banner */}
      <section className={`rounded-[32px] p-6 md:p-8 ${glassSilver} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
        <div className="space-y-3 max-w-2xl">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.28em]"
            style={{ background: `rgba(226,232,240,0.12)`, border: `1px solid rgba(226,232,240,0.30)`, color: C.silverLight }}>
            Priority Concierge
          </span>
          <h3 className="font-[Cormorant_Garamond] text-4xl leading-none md:text-5xl" style={{ color: C.white }}>
            Get Your Voucher &amp; Connect via WhatsApp
          </h3>
          <p className="leading-7" style={{ color: C.muted }}>
            Instant access to a Sierra AI advisor with AI-prepared property recommendations,
            pricing context, and the best fit for your budget and timeline.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button className={`flex items-center gap-2 px-6 py-3 text-base ${silverBtn}`}>
            <MessageCircle className="h-5 w-5" /> Connect Now
          </button>
          <button onClick={() => setPage("explore")} className={`px-6 py-3 text-base ${ghostBtn}`}>
            Explore Listings
          </button>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description, featured = false, premium = false }) {
  return (
    <div className={`rounded-[28px] p-6 md:p-7 ${glass}`}
      style={premium ? { border: `1px solid rgba(226,232,240,0.30)`, background: `rgba(226,232,240,0.05)` } : {}}>
      <div className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: `rgba(226,232,240,0.12)`, border: `1px solid rgba(226,232,240,0.20)` }}>
          <Icon className="h-5 w-5" style={{ color: C.silverLight }} />
        </div>
        <h3 className="font-[Cormorant_Garamond] text-3xl leading-none" style={{ color: premium ? C.silverLight : C.white }}>{title}</h3>
        <p className="leading-7" style={{ color: C.muted }}>{description}</p>
      </div>
    </div>
  );
}

// ─── EXPLORE PAGE ──────────────────────────────────────────────────────────────
function ExplorePage() {
  const [investorMode, setInvestorMode] = useState(true);
  const [highROI,      setHighROI]      = useState(true);
  const [ready,        setReady]        = useState(true);

  return (
    <div className={`${container} space-y-8`}>
      <SectionTitle
        eyebrow="Map-First Search"
        title="Explore Properties in New Cairo"
        description="Premium listings with AI match scoring and direct contact flows."
      />

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Map panel */}
        <div className={`rounded-[32px] p-4 md:p-5 ${glass}`}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <FilterToggle label="Investor Mode"  checked={investorMode} onChange={setInvestorMode} />
            <FilterToggle label="High ROI"       checked={highROI}      onChange={setHighROI} />
            <FilterToggle label="Ready to Move"  checked={ready}        onChange={setReady} />
            <span className="ml-auto rounded-full px-4 py-2 text-sm"
              style={{ border: `1px solid rgba(226,232,240,0.18)`, color: C.muted }}>
              157 Properties Found
            </span>
          </div>

          <div className="relative min-h-[620px] overflow-hidden rounded-[28px]"
            style={{ background: `linear-gradient(180deg, rgba(10,22,40,0.60), ${C.navyDeep})`, border: `1px solid rgba(226,232,240,0.10)` }}>
            <div className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, rgba(226,232,240,0.15) 1px, transparent 1px),
                                  linear-gradient(rgba(226,232,240,0.05) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(226,232,240,0.05) 1px, transparent 1px)`,
                backgroundSize: "120px 120px, 40px 40px, 40px 40px",
              }} />
            <MapRoads />
            {[
              { top: "18%", left: "20%", type: "silver", label: "Palm Hills"   },
              { top: "34%", left: "39%", type: "silver", label: "New Cairo"    },
              { top: "57%", left: "62%", type: "silver", label: "90 Street"    },
              { top: "65%", left: "30%", type: "navy",   label: "Future City"  },
              { top: "24%", left: "72%", type: "silver", label: "Mivida"       },
              { top: "48%", left: "77%", type: "navy",   label: "Golden Sq"    },
            ].map((m) => <MapMarker key={m.label} {...m} />)}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {[
                { label: "High ROI",  color: C.silver      },
                { label: "Ready",     color: C.silverLight  },
                { label: "Hot Deal",  color: C.silver      },
              ].map((item) => (
                <div key={item.label} className="rounded-full px-3 py-2 text-xs backdrop-blur-xl"
                  style={{ border: `1px solid rgba(226,232,240,0.15)`, background: `rgba(6,14,26,0.75)`, color: C.offWhite }}>
                  <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: item.color }} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Listings panel */}
        <div className={`rounded-[32px] p-4 md:p-5 ${glass}`}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xl font-medium" style={{ color: C.white }}>Curated Results</div>
              <div className="text-sm" style={{ color: C.muted }}>Sorted by AI Match</div>
            </div>
            <button className="rounded-full px-4 py-2 text-sm transition hover:opacity-80"
              style={{ border: `1px solid rgba(226,232,240,0.20)`, background: `rgba(226,232,240,0.08)`, color: C.silverLight }}>
              AI Sort
            </button>
          </div>
          <div className="space-y-4">
            {exploreListings.map((item, idx) => (
              <div key={item.title}
                className="rounded-[24px] p-3 transition cursor-pointer"
                style={{ background: `rgba(248,245,238,0.04)`, border: `1px solid rgba(226,232,240,0.10)` }}
                onMouseEnter={(e) => e.currentTarget.style.border = `1px solid rgba(226,232,240,0.28)`}
                onMouseLeave={(e) => e.currentTarget.style.border = `1px solid rgba(226,232,240,0.10)`}
              >
                <div className="grid gap-3 sm:grid-cols-[160px_1fr_auto]">
                  <PropertyThumb compact image={idx % 2 === 0
                    ? "https://images.unsplash.com/photo-1600607687644-c7f34b5a6d8b?auto=format&fit=crop&w=1200&q=80"
                    : "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"} />
                  <div className="space-y-2 py-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-medium" style={{ color: C.white }}>{item.title}</h3>
                      <span className="rounded-full px-3 py-1 text-xs"
                        style={{ background: `rgba(226,232,240,0.10)`, border: `1px solid rgba(226,232,240,0.22)`, color: C.silverLight }}>
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-sm" style={{ color: C.muted }}>{item.location}</div>
                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: C.offWhite }}>
                      <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" style={{ color: C.silver }} /> {item.beds} Beds</span>
                      <span className="flex items-center gap-1"><Ruler    className="h-4 w-4" style={{ color: C.silver }} /> {item.area} m²</span>
                      <span className="flex items-center gap-1"><Wallet   className="h-4 w-4" style={{ color: C.silver }} /> {item.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-semibold" style={{ color: C.silverLight }}>{item.match}%</div>
                      <div className="text-xs" style={{ color: C.silver }}>AI Match</div>
                    </div>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm ${silverBtn}`}>
                      <MessageCircle className="h-4 w-4" /> Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded-full px-4 py-2"
      style={{ border: `1px solid rgba(226,232,240,0.16)`, background: `rgba(226,232,240,0.05)` }}>
      <Switch checked={checked} onCheckedChange={onChange} />
      <span className="text-sm" style={{ color: C.offWhite }}>{label}</span>
    </div>
  );
}

function MapRoads() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1000 700" fill="none">
      <path d="M40 600C160 520 220 470 340 455C440 440 530 470 660 410C760 365 860 250 960 205"  stroke="rgba(226,232,240,0.25)" strokeWidth="4" />
      <path d="M80 180C220 210 310 250 430 310C520 355 620 360 800 340"                          stroke="rgba(226,232,240,0.18)" strokeWidth="3" />
      <path d="M180 70C230 160 270 250 230 360C190 470 120 540 70 650"                           stroke="rgba(226,232,240,0.14)" strokeWidth="3" />
      <path d="M640 60C610 140 560 240 575 355C590 480 700 590 820 660"                          stroke="rgba(226,232,240,0.16)" strokeWidth="3" />
      <path d="M290 120C385 145 505 185 580 245C675 320 705 405 770 520"                         stroke="rgba(226,232,240,0.10)" strokeWidth="2.5" />
      <path d="M350 610C470 570 530 520 610 520C690 520 770 555 920 610"                         stroke="rgba(226,232,240,0.20)" strokeWidth="3.5" />
    </svg>
  );
}

function MapMarker({ top, left, type, label }) {
  const color = type === "silver" ? C.silver : C.navyLight;
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
      <div className="flex flex-col items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-10 w-10 rounded-full"
          style={{ background: color, filter: "blur(14px)" }}
        />
        <div className="relative flex h-6 w-6 items-center justify-center rounded-full"
          style={{ background: color, border: `2px solid rgba(248,245,238,0.4)`, boxShadow: `0 0 20px ${color}` }}>
          <MapPinned className="h-3.5 w-3.5" style={{ color: C.navyDeep }} />
        </div>
        <div className="rounded-full px-3 py-1 text-xs backdrop-blur-xl"
          style={{ border: `1px solid rgba(226,232,240,0.15)`, background: `rgba(6,14,26,0.80)`, color: C.offWhite }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── PROPERTY PAGE ─────────────────────────────────────────────────────────────
function PropertyPage() {
  return (
    <div className={`${container} space-y-8 pb-28`}>
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: C.muted }}>
        <span>Back to Listings</span>
        <ChevronRight className="h-4 w-4" />
        <span>New Cairo</span>
        <ChevronRight className="h-4 w-4" />
        <span>Mivida</span>
        <ChevronRight className="h-4 w-4" />
        <span style={{ color: C.offWhite }}>Luxury Villa LV-450</span>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        {/* Media grid */}
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
            <div className="relative min-h-[480px] overflow-hidden rounded-[30px] bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1600607687644-c7f34b5a6d8b?auto=format&fit=crop&w=1400&q=80')",
                border: `1px solid rgba(226,232,240,0.14)`,
              }}>
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to top, rgba(6,14,26,0.70) 0%, transparent 50%)` }} />
              <div className="absolute bottom-4 left-4 rounded-full px-4 py-2 text-sm backdrop-blur-xl"
                style={{ border: `1px solid rgba(226,232,240,0.18)`, background: `rgba(6,14,26,0.72)`, color: C.offWhite }}>
                24 Photos
              </div>
            </div>
            <div className="grid gap-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="min-h-[108px] overflow-hidden rounded-[22px] bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80')",
                    border: `1px solid rgba(226,232,240,0.10)`,
                  }}>
                  <div className="h-full w-full"
                    style={{ background: `linear-gradient(to top, rgba(6,14,26,0.55), transparent)` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Financial boxes */}
          <div className={`grid gap-4 rounded-[28px] p-4 md:grid-cols-3 ${glass}`}>
            <FinancialBox icon={Wallet}       label="Price"        value="EGP 48,000,000" sub="Premium ready asset"  />
            <FinancialBox icon={Landmark}     label="Down Payment" value="20%"            sub="EGP 9,600,000"        />
            <FinancialBox icon={CalendarDays} label="Installments" value="6 Years"        sub="Low commitment plan"  />
          </div>
        </div>

        {/* Insights panel */}
        <div className={`rounded-[30px] p-5 md:p-6 ${glassSilver}`}>
          <div className="space-y-5">
            <div>
              <span className="inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.28em]"
                style={{ background: `rgba(226,232,240,0.12)`, border: `1px solid rgba(226,232,240,0.28)`, color: C.silverLight }}>
                AI-Powered Insights
              </span>
              <h2 className="mt-4 font-[Cormorant_Garamond] text-4xl leading-none" style={{ color: C.white }}>
                Why this property?
              </h2>
            </div>

            <div className="space-y-3 rounded-[22px] p-5" style={{ background: `rgba(248,245,238,0.04)`, border: `1px solid rgba(226,232,240,0.10)` }}>
              {[
                "Prime lake view & corner unit",
                "High rental demand in Mivida",
                "Next to AUC & 90 Street",
                "Architectural finish with luxury positioning",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3" style={{ color: C.offWhite }}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: C.silver }} />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InsightStat label="ROI Estimate"    value="12.5%" sub="Annual"         />
              <InsightStat label="Freshness Score" value="96/100" sub="Very low supply" />
            </div>

            {/* Market trend */}
            <div className="rounded-[22px] p-5" style={{ background: `rgba(226,232,240,0.07)`, border: `1px solid rgba(226,232,240,0.28)` }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em]" style={{ color: C.silver }}>Market Trend</div>
                  <div className="mt-2" style={{ color: C.offWhite }}>+8.3% in New Cairo this season</div>
                </div>
                <TrendingUp className="h-8 w-8" style={{ color: C.silver }} />
              </div>
            </div>

            {/* Area freshness */}
            <div className="rounded-[22px] p-5" style={{ background: `rgba(6,14,26,0.55)`, border: `1px solid rgba(226,232,240,0.10)` }}>
              <div className="mb-3 flex items-center justify-between text-sm" style={{ color: C.muted }}>
                <span>Area Freshness</span><span>Excellent</span>
              </div>
              <Progress value={96} className="h-2 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky bottom bar */}
      <div className={`fixed bottom-4 left-4 right-4 z-30 mx-auto max-w-[1320px] rounded-[26px] p-4 ${glass}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-medium" style={{ color: C.white }}>Luxury Villa in Mivida</div>
            <div className="mt-1 flex flex-wrap gap-4 text-sm" style={{ color: C.muted }}>
              <span>5 Beds</span><span>450 m²</span><span>Ready to Move</span>
              <span style={{ color: C.silver }}>95% AI Match</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="rounded-full px-5 py-3" style={{ border: `1px solid rgba(226,232,240,0.20)`, color: C.white }}>
              EGP 48,000,000
            </div>
            <button className={`flex items-center gap-2 px-6 py-3 ${silverBtn}`}>
              <MessageCircle className="h-4 w-4" /> Book Viewing via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancialBox({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-[22px] p-5" style={{ background: `rgba(248,245,238,0.04)`, border: `1px solid rgba(226,232,240,0.10)` }}>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
        style={{ background: `rgba(226,232,240,0.10)`, border: `1px solid rgba(226,232,240,0.18)` }}>
        <Icon className="h-5 w-5" style={{ color: C.silverLight }} />
      </div>
      <div className="text-sm" style={{ color: C.muted }}>{label}</div>
      <div className="mt-1 text-2xl font-semibold" style={{ color: C.white }}>{value}</div>
      <div className="mt-1 text-sm" style={{ color: C.muted }}>{sub}</div>
    </div>
  );
}

function InsightStat({ label, value, sub }) {
  return (
    <div className="rounded-[22px] p-5" style={{ background: `rgba(248,245,238,0.04)`, border: `1px solid rgba(226,232,240,0.10)` }}>
      <div className="text-sm" style={{ color: C.muted }}>{label}</div>
      <div className="mt-1 text-3xl font-semibold" style={{ color: C.silverLight }}>{value}</div>
      <div className="mt-1 text-sm" style={{ color: C.muted }}>{sub}</div>
    </div>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div className={`${container} space-y-8`}>
      <SectionTitle
        eyebrow="About Us & Services"
        title="The AI Operations Layer"
        description="Sierra AI Realty evolves brokerage into a high-trust, AI-enhanced operating system for luxury real estate decisions."
        align="center"
      />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className={`rounded-[32px] p-6 md:p-8 ${glass}`}>
          <div className="space-y-5">
            <span className="inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.28em]"
              style={{ background: `rgba(226,232,240,0.10)`, border: `1px solid rgba(226,232,240,0.28)`, color: C.silverLight }}>
              From Brokerage to PropTech
            </span>
            <h3 className="font-[Cormorant_Garamond] text-4xl leading-none md:text-5xl" style={{ color: C.white }}>
              Human expertise,<br />upgraded by intelligent systems.
            </h3>
            <p className="max-w-2xl leading-8" style={{ color: C.muted }}>
              We started with local relationships, premium inventory access, and market intuition. Now,
              Sierra AI adds AI-assisted matching, advisor tooling, pricing context, and a connected
              operational stack that makes every client interaction sharper and more valuable.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {journey.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="rounded-[24px] p-5"
                    style={{ background: `rgba(248,245,238,0.04)`, border: `1px solid rgba(226,232,240,0.10)` }}>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ background: `rgba(226,232,240,0.10)` }}>
                      <Icon className="h-5 w-5" style={{ color: C.silverLight }} />
                    </div>
                    <div className="text-sm uppercase tracking-[0.28em]" style={{ color: C.mutedLow }}>0{i + 1}</div>
                    <h4 className="mt-2 text-xl font-medium" style={{ color: C.white }}>{step.title}</h4>
                    <div className="mt-1 text-sm" style={{ color: C.silver }}>{step.subtitle}</div>
                    <p className="mt-3 text-sm leading-6" style={{ color: C.muted }}>{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`rounded-[32px] p-6 md:p-8 ${glassSilver}`}>
          <div className="space-y-5">
            <span className="inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.28em]"
              style={{ background: `rgba(226,232,240,0.12)`, border: `1px solid rgba(226,232,240,0.30)`, color: C.silverLight }}>
              Unified Digital Stack
            </span>
            <h3 className="font-[Cormorant_Garamond] text-4xl leading-none" style={{ color: C.white }}>
              Operational intelligence, end to end.
            </h3>
            <div className="space-y-4">
              {[
                { title: "AI Operations Manager",  text: "Routes leads, prioritizes opportunities, and guides advisor focus." },
                { title: "Inventory Intelligence",  text: "Tracks property freshness, fit score, pricing range, and activation status." },
                { title: "Conversion Layer",        text: "Connects WhatsApp, listing views, and sales actions into one premium workflow." },
                { title: "Executive Reporting",     text: "Gives leadership instant visibility into lead quality, movement, and performance." },
              ].map((item) => (
                <div key={item.title} className="rounded-[22px] p-5"
                  style={{ background: `rgba(248,245,238,0.04)`, border: `1px solid rgba(226,232,240,0.10)` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium" style={{ color: C.white }}>{item.title}</h4>
                      <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>{item.text}</p>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5" style={{ color: C.silver }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── DASHBOARD PAGE ────────────────────────────────────────────────────────────
function DashboardPage() {
  const [activeItem, setActiveItem] = useState(0);

  const kpis = useMemo(() => [
    { label: "Total Inventory",    value: "284",        sub: "Active properties",    icon: Building2 },
    { label: "New Leads",          value: "47",         sub: "+23% vs last month",   icon: Users },
    { label: "Monthly Revenue",    value: "EGP 24.8M",  sub: "Closed + pipeline",    icon: CircleDollarSign },
    { label: "Property Freshness", value: "23",         sub: "New this week",        icon: Activity },
  ], []);

  return (
    <div className={`${container} grid gap-6 xl:grid-cols-[280px_1fr]`}>
      {/* Sidebar */}
      <aside className={`rounded-[32px] p-5 ${glass} h-fit xl:sticky xl:top-28`}>
        <div className="mb-6">
          <div className="text-xs uppercase tracking-[0.32em]" style={{ color: C.mutedLow }}>Sierra AI Realty</div>
          <div className="mt-2 font-[Cormorant_Garamond] text-4xl leading-none" style={{ color: C.white }}>Admin Dashboard</div>
        </div>
        <div className="space-y-2">
          {sidebarItems.map((item, i) => {
            const Icon = item.icon;
            const active = i === activeItem;
            return (
              <button key={item.label} onClick={() => setActiveItem(i)}
                className="flex w-full items-center gap-3 rounded-[20px] px-4 py-4 text-left transition"
                style={{
                  background: active ? `rgba(226,232,240,0.10)` : "transparent",
                  color:      active ? C.silverLight : C.muted,
                  border:     active ? `1px solid rgba(226,232,240,0.22)` : "1px solid transparent",
                  boxShadow:  active ? `0 0 16px rgba(226,232,240,0.12)` : "none",
                }}>
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-6 rounded-[22px] p-5"
          style={{ background: `rgba(226,232,240,0.07)`, border: `1px solid rgba(226,232,240,0.28)` }}>
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5" style={{ color: C.silverLight }} />
            <div style={{ color: C.silverLight }}>System Online</div>
          </div>
          <p className="mt-3 text-sm leading-6" style={{ color: C.muted }}>
            AI reports, freshness monitoring, and lead intelligence are active across the current inventory.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <section className="space-y-6">
        {/* KPI cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className={`rounded-[28px] p-5 ${glass}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm" style={{ color: C.muted }}>{item.label}</div>
                    <div className="mt-2 text-3xl font-semibold" style={{ color: C.white }}>{item.value}</div>
                    <div className="mt-2 text-sm" style={{ color: C.silver }}>{item.sub}</div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `rgba(226,232,240,0.10)`, border: `1px solid rgba(226,232,240,0.18)` }}>
                    <Icon className="h-5 w-5" style={{ color: C.silverLight }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          {/* Sales chart */}
          <div className={`rounded-[32px] p-6 ${glass}`}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-xl font-medium" style={{ color: C.white }}>Sales Performance</div>
                <div className="text-sm" style={{ color: C.muted }}>This month</div>
              </div>
              <span className="rounded-full px-3 py-1 text-xs"
                style={{ background: `rgba(226,232,240,0.10)`, border: `1px solid rgba(226,232,240,0.22)`, color: C.silverLight }}>
                Live Analytics
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <MiniStat title="Property Views"  value="12.4K" delta="+18%" />
              <MiniStat title="Qualified Leads" value="348"   delta="+12%" />
              <MiniStat title="Advisory Calls"  value="92"    delta="+9%"  />
            </div>
            <div className="mt-6 rounded-[24px] p-5"
              style={{ background: `rgba(248,245,238,0.04)`, border: `1px solid rgba(226,232,240,0.08)` }}>
              <div className="mb-4 flex items-center justify-between text-sm" style={{ color: C.muted }}>
                <span>Revenue Momentum</span>
                <span>Luxury segment outpacing plan</span>
              </div>
              <svg className="h-52 w-full" viewBox="0 0 700 220" fill="none">
                <path d="M0 170C70 165 110 120 180 118C255 116 280 150 355 134C435 117 470 66 555 72C615 76 660 44 700 24"
                  stroke="rgba(248,245,238,0.12)" strokeWidth="3" />
                <path d="M0 185C70 178 110 145 180 138C255 130 280 165 355 148C435 130 470 92 555 98C615 102 660 65 700 38"
                  stroke={C.silver} strokeWidth="4" strokeLinecap="round" />
                {[180,355,555,700].map((x, i) => {
                  const y = [138,148,98,38][i];
                  return <circle key={i} cx={x} cy={y} r="6" fill={C.silver} />;
                })}
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            {/* Lead scoring */}
            <div className={`rounded-[32px] p-6 ${glassSilver}`}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-xl font-medium" style={{ color: C.white }}>AI Lead Scoring</div>
                  <div className="text-sm" style={{ color: C.muted }}>Priority by conversion probability</div>
                </div>
                <Gauge className="h-6 w-6" style={{ color: C.silverLight }} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <ScoreCard label="Hot"  value="128" tone="rose"  />
                <ScoreCard label="Warm" value="342" tone="amber" />
                <ScoreCard label="Cold" value="375" tone="slate" />
              </div>
            </div>

            {/* Freshness tracker */}
            <div className={`rounded-[32px] p-6 ${glass}`}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-xl font-medium" style={{ color: C.white }}>Property Freshness Tracker</div>
                  <div className="text-sm" style={{ color: C.muted }}>Updated within 24 hours</div>
                </div>
                <BadgePercent className="h-5 w-5" style={{ color: C.silver }} />
              </div>
              <div className="space-y-5">
                <FreshRow label="0 - 3 Days" value={85} color={C.silver} />
                <FreshRow label="4 - 7 Days" value={52} color={C.silverDim} />
                <FreshRow label="7+ Days"    value={18} color="rgba(226,232,240,0.35)" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniStat({ title, value, delta }) {
  return (
    <div className="rounded-[22px] p-5"
      style={{ background: `rgba(6,14,26,0.55)`, border: `1px solid rgba(226,232,240,0.10)` }}>
      <div className="text-sm" style={{ color: C.muted }}>{title}</div>
      <div className="mt-2 text-2xl font-semibold" style={{ color: C.white }}>{value}</div>
      <div className="mt-2 text-sm" style={{ color: C.silver }}>{delta}</div>
    </div>
  );
}

function ScoreCard({ label, value, tone }) {
  const tones = {
    rose:  { bg: "rgba(226,232,240,0.18)", border: "rgba(226,232,240,0.35)", text: C.silverLight }, 
    amber: { bg: "rgba(30,41,59,0.55)",     border: "rgba(148,163,184,0.22)", text: "#cbd5e1" },
    slate: { bg: "rgba(15,23,42,0.32)",     border: "rgba(30,41,59,0.18)",    text: C.navyLight },
  };
  const t = tones[tone];
  return (
    <div className="rounded-[22px] p-5"
      style={{ background: t.bg, border: `1px solid ${t.border}` }}>
      <div className="text-sm uppercase tracking-[0.22em]" style={{ color: t.text }}>{label}</div>
      <div className="mt-3 text-4xl font-semibold" style={{ color: C.white }}>{value}</div>
      <div className="mt-2 text-sm opacity-70" style={{ color: t.text }}>Lead pool</div>
    </div>
  );
}

function FreshRow({ label, value, color }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm" style={{ color: C.muted }}>
        <span>{label}</span><span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full" style={{ background: `rgba(248,245,238,0.08)` }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}
