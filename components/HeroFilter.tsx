"use client";

import React, { useState, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
//  SIERRA ESTATES — HERO FILTER
//  Quiet Luxury glassmorphic property filter
//  No external map APIs — lightweight vector zone overlay
// ═══════════════════════════════════════════════════════════

interface FilterState {
  propertyType: string;
  viewPreference: string;
  priceTier: string;
  furnishing: string;
}

interface HeroFilterProps {
  onFilter?: (filters: FilterState) => void;
  onAIMatch?: (filters: FilterState) => void;
}

const PROPERTY_TYPES = [
  { id: "apartment", label: "Apartment", labelAr: "شقة" },
  { id: "villa", label: "Villa", labelAr: "فيلا" },
  { id: "penthouse", label: "Penthouse", labelAr: "بنتهاوس" },
  { id: "townhouse", label: "Townhouse", labelAr: "تاونهاوس" },
  { id: "duplex", label: "Duplex", labelAr: "دوبلكس" },
  { id: "studio", label: "Studio", labelAr: "ستوديو" },
];

const VIEW_OPTIONS = [
  { id: "any", label: "Any View" },
  { id: "golf", label: "Golf Course" },
  { id: "park", label: "Park / Garden" },
  { id: "city", label: "City Skyline" },
  { id: "pool", label: "Pool / Lagoon" },
  { id: "landscape", label: "Landscape" },
];

const PRICE_TIERS = [
  { id: "entry-usd", label: "Under $5K", min: 0, max: 5000, currency: "USD" },
  { id: "mid-usd", label: "$5K – $10K", min: 5000, max: 10000, currency: "USD" },
  { id: "entry-egp", label: "10K – 50K EGP", min: 10000, max: 50000, currency: "EGP" },
  { id: "mid-egp", label: "50K – 500K EGP", min: 50000, max: 500000, currency: "EGP" },
  { id: "premium", label: "500K – 2M EGP", min: 500000, max: 2000000, currency: "EGP" },
  { id: "luxury", label: "2M+ EGP", min: 2000000, max: Infinity, currency: "EGP" },
];

const ZONES = [
  { code: "MIV", name: "Mivida", units: 312, status: "Available" as const },
  { code: "EST", name: "Eastown", units: 198, status: "Limited" as const },
  { code: "MDT", name: "Madinaty", units: 540, status: "Available" as const },
  { code: "HYD", name: "Hyde Park", units: 156, status: "Available" as const },
  { code: "MNT", name: "Mountain View", units: 88, status: "Launching" as const },
  { code: "UPT", name: "Uptown Cairo", units: 96, status: "Available" as const },
  { code: "SRK", name: "El Shorouk", units: 420, status: "Available" as const },
  { code: "PAL", name: "Palm Hills", units: 204, status: "Limited" as const },
];

const STATUS_COLORS: Record<string, string> = {
  Available: "text-emerald-400",
  Limited: "text-amber-400",
  Launching: "text-sky-400",
};

export default function HeroFilter({ onFilter, onAIMatch }: HeroFilterProps) {
  const [propertyType, setPropertyType] = useState("apartment");
  const [viewPreference, setViewPreference] = useState("any");
  const [priceTier, setPriceTier] = useState("mid-egp");
  const [furnishing, setFurnishing] = useState("any");
  const [showZoneGuide, setShowZoneGuide] = useState(false);

  const handleApply = useCallback(() => {
    onFilter?.({ propertyType, viewPreference, priceTier, furnishing });
  }, [propertyType, viewPreference, priceTier, furnishing, onFilter]);

  const handleAIMatch = useCallback(() => {
    onAIMatch?.({ propertyType, viewPreference, priceTier, furnishing });
  }, [propertyType, viewPreference, priceTier, furnishing, onAIMatch]);

  return (
    <section className="relative w-full py-10">
      {/* Gradient ambience — Deep Corporate Navy */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/95 via-[#0E1D35]/90 to-[#0A1628]/95 rounded-2xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header — Quiet Luxury editorial */}
        <div className="text-center mb-8">
          <p className="text-[#C9A24D] text-xs font-semibold uppercase tracking-[0.25em] mb-2"
             style={{ fontFamily: "Inter, sans-serif" }}>
            Sierra Estates
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-[#F4F0E8] tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            The First Exclusive Destination for{" "}
            <span className="text-[#C9A24D] font-medium">New Cairo Properties</span>
          </h2>
          <p className="text-sm text-[#F4F0E8]/50 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
            Rent &amp; Resale &middot; AI-Driven Excellence
          </p>
        </div>

        {/* Filter Panel — glassmorphic */}
        <div className="backdrop-blur-xl bg-white/[0.04] border border-[#C9A24D]/15 rounded-xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Property Type */}
            <div>
              <label className="block text-[10px] text-[#F4F0E8]/40 uppercase tracking-[0.2em] mb-2.5"
                     style={{ fontFamily: "Inter, sans-serif" }}>
                Property Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PROPERTY_TYPES.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setPropertyType(pt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                      propertyType === pt.id
                        ? "bg-[#C9A24D] text-[#0A1628] font-semibold shadow-lg shadow-[#C9A24D]/20"
                        : "bg-white/[0.04] text-[#F4F0E8]/60 hover:bg-white/[0.08] border border-white/[0.06]"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Preference */}
            <div>
              <label className="block text-[10px] text-[#F4F0E8]/40 uppercase tracking-[0.2em] mb-2.5"
                     style={{ fontFamily: "Inter, sans-serif" }}>
                View Preference
              </label>
              <select
                value={viewPreference}
                onChange={(e) => setViewPreference(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-[#F4F0E8]/80 focus:outline-none focus:border-[#C9A24D]/40 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {VIEW_OPTIONS.map((v) => (
                  <option key={v.id} value={v.id} className="bg-[#0A1628]">
                    {v.label}
                  </option>
                ))}
              </select>

              <label className="block text-[10px] text-[#F4F0E8]/40 uppercase tracking-[0.2em] mt-3 mb-2.5"
                     style={{ fontFamily: "Inter, sans-serif" }}>
                Furnishing
              </label>
              <select
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-[#F4F0E8]/80 focus:outline-none focus:border-[#C9A24D]/40 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <option value="any" className="bg-[#0A1628]">Any</option>
                <option value="furnished" className="bg-[#0A1628]">Furnished</option>
                <option value="semi-furnished" className="bg-[#0A1628]">Semi-Furnished</option>
                <option value="unfurnished" className="bg-[#0A1628]">Unfurnished</option>
              </select>
            </div>

            {/* Price Range — respects currency threshold rule */}
            <div>
              <label className="block text-[10px] text-[#F4F0E8]/40 uppercase tracking-[0.2em] mb-2.5"
                     style={{ fontFamily: "Inter, sans-serif" }}>
                Price Range
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRICE_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setPriceTier(tier.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                      priceTier === tier.id
                        ? "bg-[#C9A24D] text-[#0A1628] font-semibold shadow-lg shadow-[#C9A24D]/20"
                        : "bg-white/[0.04] text-[#F4F0E8]/60 hover:bg-white/[0.08] border border-white/[0.06]"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-end gap-2.5">
              <button
                onClick={handleAIMatch}
                className="w-full bg-gradient-to-r from-[#C9A24D] to-[#B8912F] text-[#0A1628] font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-[#C9A24D]/25 transition-all duration-300 text-sm tracking-wide"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                AI Match
              </button>
              <button
                onClick={handleApply}
                className="w-full bg-white/[0.04] border border-[#C9A24D]/20 text-[#C9A24D] py-2.5 rounded-lg hover:bg-[#C9A24D]/10 transition-all text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Apply Filters
              </button>
              <button
                onClick={() => setShowZoneGuide(!showZoneGuide)}
                className="w-full bg-white/[0.03] border border-white/[0.06] text-[#F4F0E8]/50 py-2 rounded-lg hover:bg-white/[0.06] transition-all text-xs"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {showZoneGuide ? "Hide" : "Show"} Zone Guide
              </button>
            </div>
          </div>
        </div>

        {/* Zone Guide — lightweight vector overlay (no external map APIs) */}
        {showZoneGuide && (
          <div className="mt-5 backdrop-blur-xl bg-white/[0.03] border border-[#C9A24D]/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#F4F0E8]/70"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                New Cairo &mdash; Development Zones
              </h3>
              <span className="text-[10px] text-[#F4F0E8]/30" style={{ fontFamily: "Inter, sans-serif" }}>
                {ZONES.reduce((sum, z) => sum + z.units, 0).toLocaleString()} total units tracked
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ZONES.map((z) => (
                <div
                  key={z.code}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 hover:border-[#C9A24D]/25 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#C9A24D]/60 font-mono">{z.code}</span>
                    <span className="text-xs font-medium text-[#F4F0E8]/80 group-hover:text-[#C9A24D] transition-colors"
                          style={{ fontFamily: "Inter, sans-serif" }}>
                      {z.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#F4F0E8]/40 mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    {z.units} units &middot;{" "}
                    <span className={STATUS_COLORS[z.status] || "text-white/50"}>
                      {z.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Vector map placeholder */}
            <div className="mt-4 h-28 bg-white/[0.02] rounded-lg border border-dashed border-white/[0.06] flex items-center justify-center">
              <span className="text-[11px] text-[#F4F0E8]/20" style={{ fontFamily: "Inter, sans-serif" }}>
                Interactive zone map &mdash; no external API required
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
