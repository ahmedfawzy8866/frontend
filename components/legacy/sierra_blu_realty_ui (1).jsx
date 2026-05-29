import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const shell =
  "min-h-screen overflow-x-hidden bg-[#050510] text-[#F8F8F8] font-[Outfit]";
const container = "mx-auto max-w-[1600px] px-4 md:px-8 xl:px-12";
const glass =
  "backdrop-blur-[24px] bg-white/[0.05] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.35)]";
const glassCyan =
  "backdrop-blur-[24px] bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.18)] shadow-[0_0_0_1px_rgba(0,229,255,0.12),0_0_24px_rgba(0,229,255,0.16),0_24px_80px_rgba(0,0,0,0.36)]";
const goldBorder = "border border-[rgba(199,159,63,0.28)]";

const nav = [
  { id: "home", label: "Home", icon: Home },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "property", label: "Property", icon: Building2 },
  { id: "about", label: "About", icon: Info },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const quickFilters = ["Luxury Villas", "High ROI", "Ready to Move", "Installments"];

const matchedProperties = [
  {
    title: "Skyline Villa Residence",
    price: "EGP 42,500,000",
    meta: "5 Beds • 420 m² • Lake View",
    match: 96,
  },
  {
    title: "Golden Square Penthouse",
    price: "EGP 28,900,000",
    meta: "3 Beds • 280 m² • Corner Unit",
    match: 93,
  },
  {
    title: "Blu Horizon Twin House",
    price: "EGP 37,500,000",
    meta: "4 Beds • 360 m² • Prime Location",
    match: 91,
  },
  {
    title: "Cairo Festival Apartment",
    price: "EGP 18,200,000",
    meta: "2 Beds • 175 m² • Rental Ready",
    match: 89,
  },
];

const exploreListings = [
  {
    title: "Luxury Villa in Mivida",
    location: "New Cairo",
    beds: 3,
    area: 450,
    price: "EGP 48,000,000",
    match: 95,
    tag: "Ready to Move",
  },
  {
    title: "Eco Residences Villa",
    location: "New Capital",
    beds: 4,
    area: 380,
    price: "EGP 38,500,000",
    match: 92,
    tag: "High ROI",
  },
  {
    title: "Golden Square Apartment",
    location: "Golden Square",
    beds: 3,
    area: 210,
    price: "EGP 22,750,000",
    match: 90,
    tag: "Investor Deal",
  },
  {
    title: "Sky Condos Penthouse",
    location: "Fifth Settlement",
    beds: 3,
    area: 165,
    price: "EGP 16,900,000",
    match: 88,
    tag: "Ready",
  },
];

const journey = [
  {
    title: "Traditional Brokerage",
    subtitle: "Legacy Process",
    text: "Built on trusted relationships, local expertise, and premium neighborhood access.",
    icon: Users,
  },
  {
    title: "AI Operations Manager",
    subtitle: "Smart Automation",
    text: "Lead scoring, property matching, and advisor workflows powered by intelligent systems.",
    icon: Bot,
  },
  {
    title: "Unified Digital Stack",
    subtitle: "Full Integration",
    text: "Inventory, reporting, communication, and decision support merged into one premium platform.",
    icon: BrainCircuit,
  },
];

const sidebar = [
  { label: "Inventory", icon: Building2 },
  { label: "Leads Pipeline", icon: Users },
  { label: "Deals", icon: CircleDollarSign },
  { label: "AI Reports", icon: BarChart3 },
];

function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={shell}>
      <GlobalBackground />
      <TopBar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="relative z-10 pt-24 pb-12">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "explore" && <ExplorePage />}
        {page === "property" && <PropertyPage />}
        {page === "about" && <AboutPage />}
        {page === "dashboard" && <DashboardPage />}
      </main>
    </div>
  );
}

function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(26,26,46,0.95)_0%,rgba(5,5,16,1)_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,229,255,0.08),transparent_24%),radial-gradient(circle_at_85%_12%,rgba(199,159,63,0.08),transparent_18%),radial-gradient(circle_at_70%_50%,rgba(0,45,98,0.18),transparent_30%)]" />
      <div className="absolute left-[-8%] top-28 h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="absolute right-[-10%] top-[24rem] h-80 w-80 rounded-full bg-amber-400/10 blur-[140px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:90px_90px]" />
    </div>
  );
}

function TopBar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <div className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-8 xl:px-12">
      <div className={`${container} px-0`}>
        <div className={`flex items-center justify-between rounded-[28px] px-4 py-3 md:px-6 ${glass}`}>
          <button onClick={() => setPage("home")} className="flex items-center gap-3 text-left transition hover:opacity-95">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(199,159,63,0.12)] border border-[rgba(199,159,63,0.28)] shadow-[0_0_30px_rgba(199,159,63,0.16)]">
              <ShieldCheck className="h-5 w-5 text-[#C79F3F]" />
            </div>
            <div>
              <div className="font-[Cinzel] text-lg tracking-[0.18em] text-white md:text-xl">Sierra AI</div>
              <div className="text-[11px] uppercase tracking-[0.38em] text-white/50">Realty</div>
            </div>
          </button>

          <div className="hidden items-center gap-2 lg:flex">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                    active
                      ? "bg-[rgba(0,229,255,0.10)] text-cyan-200 shadow-[0_0_20px_rgba(0,229,255,0.18)]"
                      : "text-white/72 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button className="rounded-full bg-[rgba(255,255,255,0.04)] px-4 text-white hover:bg-white/10 border border-white/10">
              EN | AR
            </Button>
            <Button className="rounded-full bg-gradient-to-r from-[#00E5FF] to-cyan-500 px-5 text-[#041218] hover:opacity-95 shadow-[0_0_26px_rgba(0,229,255,0.30)]">
              Get VIP Voucher
            </Button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden rounded-full border border-white/10 bg-white/5 p-3 text-white">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {mobileOpen && (
          <div className={`mt-3 rounded-[24px] p-3 lg:hidden ${glass}`}>
            <div className="grid gap-2">
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    setMobileOpen(false);
                  }}
                  className="rounded-2xl px-4 py-3 text-left text-white/80 hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}
              <Button className="mt-2 rounded-full bg-gradient-to-r from-[#00E5FF] to-cyan-500 text-[#041218]">
                Get VIP Voucher
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`space-y-4 ${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <Badge className="rounded-full border border-[rgba(199,159,63,0.28)] bg-[rgba(199,159,63,0.10)] px-4 py-1 text-[#E7C58A]">
        {eyebrow}
      </Badge>
      <h2 className="font-[Cormorant_Garamond] text-4xl leading-none md:text-6xl text-white">{title}</h2>
      <p className="text-base leading-7 text-white/68 md:text-lg">{description}</p>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[34px]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,16,0.90)_0%,rgba(5,5,16,0.48)_42%,rgba(5,5,16,0.16)_100%)] z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,45,98,0.55),transparent_35%),linear-gradient(180deg,rgba(26,26,46,0.15),rgba(5,5,16,0.40))] z-10" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center scale-[1.02]" />
    </div>
  );
}

function PropertyThumb({ compact = false, image = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] border border-white/10 ${compact ? "h-28" : "h-44"} bg-cover bg-center`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/20 to-transparent" />
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <div className={`${container} space-y-10`}>
      <section className="relative min-h-[86vh] overflow-hidden rounded-[34px] border border-white/10">
        <HeroVisual />
        <div className="relative z-20 flex min-h-[86vh] flex-col justify-between p-6 md:p-10 xl:p-14">
          <div className="flex justify-between">
            <Badge className="w-fit rounded-full border border-[rgba(0,229,255,0.18)] bg-[rgba(0,229,255,0.08)] px-4 py-2 text-cyan-200">
              AI-Powered Real Estate Intelligence
            </Badge>
            <Badge className="hidden rounded-full border border-[rgba(199,159,63,0.30)] bg-[rgba(199,159,63,0.12)] px-4 py-2 text-[#EACB92] md:flex">
              New Cairo • Luxury Advisory
            </Badge>
          </div>

          <div className="max-w-3xl space-y-6 py-10 md:py-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-[Cinzel] text-4xl leading-[0.92] text-white md:text-6xl xl:text-7xl"
            >
              Sierra AI Realty:
              <span className="block text-[#C79F3F]">Beyond Brokerage</span>
            </motion.h1>
            <p className="max-w-2xl text-xl text-white/82 md:text-3xl font-light tracking-wide">Smart Decisions, AI-Driven</p>
            <p className="max-w-2xl text-base leading-7 text-white/68 md:text-lg">
              A cinematic luxury platform for buyers and investors who want curated properties, sharper insights,
              and a modern advisory experience in New Cairo.
            </p>

            <div className={`max-w-3xl rounded-[28px] p-3 ${glassCyan}`}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-200" />
                  <Input
                    placeholder="What is your investment goal today?"
                    className="h-14 rounded-full border-white/10 bg-white/5 pl-12 text-base text-white placeholder:text-white/45 focus-visible:ring-cyan-400"
                  />
                </div>
                <Button className="h-14 rounded-full bg-gradient-to-r from-[#00E5FF] to-cyan-500 px-6 text-base text-[#041218] hover:opacity-95 shadow-[0_0_30px_rgba(0,229,255,0.32)]">
                  Search with AI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {quickFilters.map((filter) => (
                  <button key={filter} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/78 transition hover:border-cyan-400/30 hover:text-white">
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`rounded-[30px] p-4 md:p-5 ${glass}`}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-lg md:text-xl font-medium">AI-Matched Properties</div>
                <div className="text-sm text-white/50">Personalized for your investment profile</div>
              </div>
              <Badge className="rounded-full bg-[rgba(0,229,255,0.08)] text-cyan-200 border border-[rgba(0,229,255,0.18)]">Live Match Engine</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {matchedProperties.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="group rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3 transition-all hover:-translate-y-1 hover:border-cyan-400/25 hover:shadow-[0_0_24px_rgba(0,229,255,0.14)]"
                >
                  <PropertyThumb compact />
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-medium">{item.title}</h3>
                        <p className="text-xs text-white/50">{item.meta}</p>
                      </div>
                      <Badge className="rounded-full bg-[rgba(0,229,255,0.12)] text-cyan-200 border border-[rgba(0,229,255,0.18)]">
                        {item.match}% Match
                      </Badge>
                    </div>
                    <div className="text-sm text-white/80">{item.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_1fr_1fr]">
        <ValueCard icon={Sparkles} title="Win-Win Situations" description="We align investor intent, seller timing, and premium inventory to create better outcomes." />
        <ValueCard icon={Users} title="1600+ Brokers in New Cairo" description="An exclusive network giving Sierra AI unmatched off-market access and brokerage intelligence." featured />
        <ValueCard icon={Crown} title="50% VIP Discount" description="A dedicated luxury entry offer for non-Egyptians, paired with direct WhatsApp advisory." gold />
      </section>

      <section className={`rounded-[32px] p-6 md:p-8 ${glass} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
        <div className="space-y-3 max-w-2xl">
          <Badge className="rounded-full border border-[rgba(199,159,63,0.28)] bg-[rgba(199,159,63,0.10)] text-[#EACB92]">Priority Concierge</Badge>
          <h3 className="font-[Cormorant_Garamond] text-4xl md:text-5xl leading-none">Get Your Voucher & Connect via WhatsApp</h3>
          <p className="text-white/65 leading-7">
            Instant access to a Sierra AI advisor with AI-prepared property recommendations, pricing context,
            and the best fit for your budget and timeline.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="rounded-full bg-gradient-to-r from-[#00E5FF] to-cyan-500 px-6 py-6 text-[#041218] shadow-[0_0_30px_rgba(0,229,255,0.30)]">
            <MessageCircle className="mr-2 h-5 w-5" />
            Connect Now
          </Button>
          <Button variant="outline" onClick={() => setPage("explore")} className="rounded-full border-[rgba(199,159,63,0.28)] bg-[rgba(199,159,63,0.08)] text-[#EACB92] hover:bg-[rgba(199,159,63,0.16)]">
            Explore Listings
          </Button>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description, featured = false, gold = false }) {
  return (
    <Card className={`rounded-[28px] border-0 text-white ${glass} ${featured ? "shadow-[0_0_24px_rgba(0,229,255,0.12)]" : ""} ${gold ? goldBorder : ""}`}>
      <CardContent className="p-6 md:p-7">
        <div className="space-y-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${gold ? "bg-[rgba(199,159,63,0.14)] text-[#E7C58A]" : "bg-[rgba(0,229,255,0.10)] text-cyan-200"}`}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className={`font-[Cormorant_Garamond] text-3xl leading-none ${gold ? "text-[#EFCB8A]" : "text-white"}`}>{title}</h3>
          <p className="leading-7 text-white/65">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ExplorePage() {
  const [investorMode, setInvestorMode] = useState(true);
  const [highROI, setHighROI] = useState(true);
  const [ready, setReady] = useState(true);

  return (
    <div className={`${container} space-y-8`}>
      <SectionTitle
        eyebrow="Map-First Search"
        title="Explore Properties in New Cairo"
        description="A cinematic split-screen search experience with premium listings, AI match scoring, and quick contact flows."
      />

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className={`rounded-[32px] p-4 md:p-5 ${glass}`}>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <FilterToggle label="Investor Mode" checked={investorMode} onChange={setInvestorMode} />
            <FilterToggle label="High ROI" checked={highROI} onChange={setHighROI} />
            <FilterToggle label="Ready to Move" checked={ready} onChange={setReady} />
            <div className="ml-auto rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">157 Properties Found</div>
          </div>

          <div className="relative min-h-[620px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(0,45,98,0.22),rgba(5,5,16,0.65))]">
            <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:140px_140px,42px_42px,42px_42px]" />
            <MapRoads />
            {[
              { top: "18%", left: "20%", type: "gold", label: "Palm Hills" },
              { top: "34%", left: "39%", type: "cyan", label: "New Cairo" },
              { top: "57%", left: "62%", type: "gold", label: "90 Street" },
              { top: "65%", left: "30%", type: "cyan", label: "Future City" },
              { top: "24%", left: "72%", type: "cyan", label: "Mivida" },
              { top: "48%", left: "77%", type: "gold", label: "Golden Sq" },
            ].map((m) => (
              <MapMarker key={m.label} {...m} />
            ))}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {[
                { label: "High ROI", color: "bg-cyan-400" },
                { label: "Ready", color: "bg-emerald-400" },
                { label: "Hot Deal", color: "bg-amber-400" },
              ].map((item) => (
                <div key={item.label} className="rounded-full border border-white/10 bg-[#050510]/70 px-3 py-2 text-xs text-white/75 backdrop-blur-xl">
                  <span className={`mr-2 inline-block h-2 w-2 rounded-full ${item.color}`} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`rounded-[32px] p-4 md:p-5 ${glass}`}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xl font-medium">Curated Results</div>
              <div className="text-sm text-white/50">Sorted by AI Match</div>
            </div>
            <Button className="rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10">AI Sort</Button>
          </div>
          <div className="space-y-4">
            {exploreListings.map((item, idx) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3 transition hover:border-cyan-400/25 hover:shadow-[0_0_24px_rgba(0,229,255,0.14)]">
                <div className="grid gap-3 sm:grid-cols-[160px_1fr_auto]">
                  <PropertyThumb compact image={idx % 2 === 0 ? "https://images.unsplash.com/photo-1600607687644-c7f34b5a6d8b?auto=format&fit=crop&w=1200&q=80" : "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"} />
                  <div className="space-y-2 py-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <Badge className="rounded-full border border-[rgba(199,159,63,0.28)] bg-[rgba(199,159,63,0.10)] text-[#EACB92]">{item.tag}</Badge>
                    </div>
                    <div className="text-sm text-white/55">{item.location}</div>
                    <div className="flex flex-wrap gap-4 text-sm text-white/72">
                      <span className="inline-flex items-center gap-1"><BedDouble className="h-4 w-4 text-cyan-200" /> {item.beds} Beds</span>
                      <span className="inline-flex items-center gap-1"><Ruler className="h-4 w-4 text-cyan-200" /> {item.area} m²</span>
                      <span className="inline-flex items-center gap-1"><Wallet className="h-4 w-4 text-cyan-200" /> {item.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-semibold text-cyan-300">{item.match}%</div>
                      <div className="text-xs text-cyan-200/80">AI Match</div>
                    </div>
                    <Button className="rounded-full bg-gradient-to-r from-[#00E5FF] to-cyan-500 text-[#041218] shadow-[0_0_24px_rgba(0,229,255,0.25)]">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Inquire
                    </Button>
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
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
      <Switch checked={checked} onCheckedChange={onChange} />
      <span className="text-sm text-white/78">{label}</span>
    </div>
  );
}

function MapRoads() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 1000 700" fill="none">
      <path d="M40 600C160 520 220 470 340 455C440 440 530 470 660 410C760 365 860 250 960 205" stroke="rgba(255,255,255,0.18)" strokeWidth="4" />
      <path d="M80 180C220 210 310 250 430 310C520 355 620 360 800 340" stroke="rgba(255,255,255,0.13)" strokeWidth="3" />
      <path d="M180 70C230 160 270 250 230 360C190 470 120 540 70 650" stroke="rgba(255,255,255,0.10)" strokeWidth="3" />
      <path d="M640 60C610 140 560 240 575 355C590 480 700 590 820 660" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
      <path d="M290 120C385 145 505 185 580 245C675 320 705 405 770 520" stroke="rgba(255,255,255,0.09)" strokeWidth="2.5" />
      <path d="M350 610C470 570 530 520 610 520C690 520 770 555 920 610" stroke="rgba(255,255,255,0.15)" strokeWidth="3.5" />
    </svg>
  );
}

function MapMarker({ top, left, type, label }) {
  const color = type === "gold" ? "#C79F3F" : "#00E5FF";
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
      <div className="flex flex-col items-center gap-2">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.85, 0.4] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} className="absolute h-10 w-10 rounded-full" style={{ background: color, filter: "blur(16px)" }} />
        <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-white/40" style={{ background: color, boxShadow: `0 0 24px ${color}` }}>
          <MapPinned className="h-3.5 w-3.5 text-[#041218]" />
        </div>
        <div className="rounded-full border border-white/10 bg-[#050510]/75 px-3 py-1 text-xs text-white/78 backdrop-blur-xl">{label}</div>
      </div>
    </div>
  );
}

function PropertyPage() {
  return (
    <div className={`${container} space-y-8 pb-28`}>
      <div className="flex flex-wrap items-center gap-2 text-sm text-white/52">
        <span>Back to Listings</span>
        <ChevronRight className="h-4 w-4" />
        <span>New Cairo</span>
        <ChevronRight className="h-4 w-4" />
        <span>Mivida</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white/75">Luxury Villa LV-450</span>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
            <div className="relative min-h-[480px] overflow-hidden rounded-[30px] border border-white/10 bg-[url('https://images.unsplash.com/photo-1600607687644-c7f34b5a6d8b?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-[#050510]/70 px-4 py-2 text-sm backdrop-blur-xl">24 Photos</div>
            </div>
            <div className="grid gap-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="min-h-[108px] overflow-hidden rounded-[24px] border border-white/10 bg-[url('https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center">
                  <div className="h-full w-full bg-gradient-to-t from-[#050510]/55 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          <div className={`grid gap-4 rounded-[28px] p-4 md:grid-cols-3 ${glass}`}>
            <FinancialBox icon={Wallet} label="Price" value="EGP 48,000,000" sub="Premium ready asset" />
            <FinancialBox icon={Landmark} label="Down Payment" value="20%" sub="EGP 9,600,000" />
            <FinancialBox icon={CalendarDays} label="Installments" value="6 Years" sub="Low commitment plan" />
          </div>
        </div>

        <div className={`rounded-[30px] p-5 md:p-6 ${glassCyan}`}>
          <div className="space-y-5">
            <div>
              <Badge className="rounded-full bg-[rgba(0,229,255,0.12)] text-cyan-200 border border-[rgba(0,229,255,0.18)]">AI-Powered Insights</Badge>
              <h2 className="mt-4 font-[Cormorant_Garamond] text-4xl leading-none">Why this property?</h2>
            </div>

            <div className="space-y-3 rounded-[24px] border border-white/10 bg-white/5 p-5">
              {[
                "Prime lake view & corner unit",
                "High rental demand in Mivida",
                "Next to AUC & 90 Street",
                "Architectural finish with luxury positioning",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 text-white/78">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InsightStat label="ROI Estimate" value="12.5%" sub="Annual" />
              <InsightStat label="Freshness Score" value="96/100" sub="Very low supply" />
            </div>

            <div className="rounded-[24px] border border-[rgba(199,159,63,0.28)] bg-[rgba(199,159,63,0.08)] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-[#E7C58A]/78">Market Trend</div>
                  <div className="mt-2 text-white/84">+8.3% in New Cairo this season</div>
                </div>
                <TrendingUp className="h-8 w-8 text-[#E7C58A]" />
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#050510]/50 p-5">
              <div className="mb-3 flex items-center justify-between text-sm text-white/65">
                <span>Area Freshness</span>
                <span>Excellent</span>
              </div>
              <Progress value={96} className="h-2 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      <div className={`fixed bottom-4 left-4 right-4 z-30 mx-auto max-w-[1320px] rounded-[26px] p-4 ${glass}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-medium">Luxury Villa in Mivida</div>
            <div className="mt-1 flex flex-wrap gap-4 text-sm text-white/58">
              <span>5 Beds</span>
              <span>450 m²</span>
              <span>Ready to Move</span>
              <span className="text-cyan-300">95% AI Match</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white">EGP 48,000,000</div>
            <Button className="rounded-full bg-gradient-to-r from-[#00E5FF] to-cyan-500 px-6 text-[#041218] shadow-[0_0_30px_rgba(0,229,255,0.30)]">
              <MessageCircle className="mr-2 h-4 w-4" />
              Book Viewing via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancialBox({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(0,229,255,0.10)] text-cyan-200">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm text-white/52">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-white/52">{sub}</div>
    </div>
  );
}

function InsightStat({ label, value, sub }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
      <div className="text-sm text-white/52">{label}</div>
      <div className="mt-1 text-3xl font-semibold text-cyan-300">{value}</div>
      <div className="mt-1 text-sm text-white/52">{sub}</div>
    </div>
  );
}

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
            <Badge className="rounded-full border border-[rgba(199,159,63,0.28)] bg-[rgba(199,159,63,0.10)] text-[#EACB92]">From Brokerage to PropTech</Badge>
            <h3 className="font-[Cormorant_Garamond] text-4xl md:text-5xl leading-none">Human expertise, upgraded by intelligent systems.</h3>
            <p className="max-w-2xl text-white/68 leading-8">
              We started with local relationships, premium inventory access, and market intuition. Now,
              Sierra AI adds AI-assisted matching, advisor tooling, pricing context, and a connected operational
              stack that makes every client interaction sharper and more valuable.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {journey.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,229,255,0.10)] text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm uppercase tracking-[0.28em] text-white/42">0{index + 1}</div>
                    <h4 className="mt-2 text-xl font-medium">{step.title}</h4>
                    <div className="mt-1 text-sm text-[#EACB92]">{step.subtitle}</div>
                    <p className="mt-3 text-sm leading-6 text-white/60">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`rounded-[32px] p-6 md:p-8 ${glassCyan}`}>
          <div className="space-y-5">
            <div>
              <Badge className="rounded-full bg-[rgba(0,229,255,0.12)] text-cyan-200 border border-[rgba(0,229,255,0.18)]">Unified Digital Stack</Badge>
              <h3 className="mt-4 font-[Cormorant_Garamond] text-4xl leading-none">Operational intelligence, end to end.</h3>
            </div>
            <div className="space-y-4">
              {[
                { title: "AI Operations Manager", text: "Routes leads, prioritizes opportunities, and guides advisor focus." },
                { title: "Inventory Intelligence", text: "Tracks property freshness, fit score, pricing range, and activation status." },
                { title: "Conversion Layer", text: "Connects WhatsApp, listing views, and sales actions into one premium workflow." },
                { title: "Executive Reporting", text: "Gives leadership instant visibility into lead quality, movement, and performance." },
              ].map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium">{item.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 text-cyan-300" />
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

function DashboardPage() {
  const kpis = useMemo(
    () => [
      { label: "Total Inventory", value: "284", sub: "Active properties", icon: Building2 },
      { label: "New Leads", value: "47", sub: "+23% vs last month", icon: Users },
      { label: "Monthly Revenue", value: "EGP 24.8M", sub: "Closed + pipeline", icon: CircleDollarSign },
      { label: "Property Freshness", value: "23", sub: "New this week", icon: Activity },
    ],
    []
  );

  return (
    <div className={`${container} grid gap-6 xl:grid-cols-[280px_1fr]`}>
      <aside className={`rounded-[32px] p-5 ${glass} h-fit xl:sticky xl:top-28`}>
        <div className="mb-6">
          <div className="text-sm uppercase tracking-[0.28em] text-white/42">Sierra AI Realty</div>
          <div className="mt-2 font-[Cormorant_Garamond] text-4xl leading-none">Admin Dashboard</div>
        </div>
        <div className="space-y-2">
          {sidebar.map((item, index) => {
            const Icon = item.icon;
            const active = index === 0;
            return (
              <button key={item.label} className={`flex w-full items-center gap-3 rounded-[20px] px-4 py-4 text-left transition ${active ? "bg-[rgba(0,229,255,0.10)] text-cyan-200 shadow-[0_0_18px_rgba(0,229,255,0.12)]" : "text-white/72 hover:bg-white/5 hover:text-white"}`}>
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-6 rounded-[24px] border border-[rgba(199,159,63,0.28)] bg-[rgba(199,159,63,0.08)] p-5">
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-[#EACB92]" />
            <div className="text-[#EACB92]">System Online</div>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/60">AI reports, freshness monitoring, and lead intelligence are active across the current inventory.</p>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className={`rounded-[28px] p-5 ${glass}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-white/52">{item.label}</div>
                    <div className="mt-2 text-3xl font-semibold text-white">{item.value}</div>
                    <div className="mt-2 text-sm text-cyan-300">{item.sub}</div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,229,255,0.10)] text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[32px] p-6 ${glass}`}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-xl font-medium">Sales Performance</div>
                <div className="text-sm text-white/50">This month</div>
              </div>
              <Badge className="rounded-full border border-[rgba(0,229,255,0.18)] bg-[rgba(0,229,255,0.08)] text-cyan-200">Live Analytics</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <MiniStat title="Property Views" value="12.4K" delta="+18%" />
              <MiniStat title="Qualified Leads" value="348" delta="+12%" />
              <MiniStat title="Advisory Calls" value="92" delta="+9%" />
            </div>
            <div className="mt-6 rounded-[26px] border border-white/10 bg-white/5 p-5">
              <div className="mb-4 flex items-center justify-between text-sm text-white/55">
                <span>Revenue Momentum</span>
                <span>Luxury segment outpacing plan</span>
              </div>
              <svg className="h-52 w-full" viewBox="0 0 700 220" fill="none">
                <path d="M0 170C70 165 110 120 180 118C255 116 280 150 355 134C435 117 470 66 555 72C615 76 660 44 700 24" stroke="rgba(255,255,255,0.20)" strokeWidth="3" />
                <path d="M0 185C70 178 110 145 180 138C255 130 280 165 355 148C435 130 470 92 555 98C615 102 660 65 700 38" stroke="rgba(0,229,255,0.95)" strokeWidth="4" strokeLinecap="round" />
                {[180,355,555,700].map((x, i) => {
                  const y = [138,148,98,38][i];
                  return <circle key={i} cx={x} cy={y} r="6" fill="#00E5FF" />;
                })}
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`rounded-[32px] p-6 ${glassCyan}`}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-xl font-medium">AI Lead Scoring</div>
                  <div className="text-sm text-white/50">Priority by conversion probability</div>
                </div>
                <Gauge className="h-6 w-6 text-cyan-300" />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <ScoreCard label="Hot" value="128" color="bg-rose-500/20 text-rose-300 border-rose-400/25" />
                <ScoreCard label="Warm" value="342" color="bg-amber-500/20 text-amber-300 border-amber-400/25" />
                <ScoreCard label="Cold" value="375" color="bg-slate-500/20 text-slate-300 border-slate-400/25" />
              </div>
            </div>

            <div className={`rounded-[32px] p-6 ${glass}`}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-xl font-medium">Property Freshness Tracker</div>
                  <div className="text-sm text-white/50">Updated within 24 hours</div>
                </div>
                <BadgePercent className="h-5 w-5 text-[#EACB92]" />
              </div>
              <div className="space-y-5">
                <FreshRow label="0 - 3 Days" value={85} tone="bg-cyan-400" />
                <FreshRow label="4 - 7 Days" value={52} tone="bg-emerald-400" />
                <FreshRow label="7+ Days" value={18} tone="bg-amber-400" />
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
    <div className="rounded-[22px] border border-white/10 bg-[#050510]/45 p-5">
      <div className="text-sm text-white/52">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      <div className="mt-2 text-sm text-cyan-300">{delta}</div>
    </div>
  );
}

function ScoreCard({ label, value, color }) {
  return (
    <div className={`rounded-[24px] border p-5 ${color}`}>
      <div className="text-sm uppercase tracking-[0.24em]">{label}</div>
      <div className="mt-3 text-4xl font-semibold">{value}</div>
      <div className="mt-2 text-sm opacity-80">Lead pool</div>
    </div>
  );
}

function FreshRow({ label, value, tone }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-white/60">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default App;
