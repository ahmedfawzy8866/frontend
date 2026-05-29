'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import {
  collection, query, where, orderBy, limit, getDocs,
  startAfter, QueryDocumentSnapshot
} from 'firebase/firestore';
import { Plus, Search } from 'lucide-react';

type FirestoreTimestampLike =
  | Date
  | string
  | { toDate: () => Date }
  | { seconds: number };

interface Unit {
  id: string;
  title: string;
  compound: string;
  propertyType: string;
  area: number;
  bedrooms: number;
  price: number;
  status: string;
  isStale?: boolean;
  updatedAt?: FirestoreTimestampLike;
  lastSyncAt?: FirestoreTimestampLike;
  maintenanceNotes?: string;
  intelligence?: {
    lastUpdatedAt?: FirestoreTimestampLike;
  };
}

const STATUS_OPTIONS = ['all', 'available', 'reserved', 'sold'];
const STATUS_STYLES: Record<string, string> = {
  available: 'bg-green-50 text-green-700',
  reserved:  'bg-yellow-50 text-yellow-700',
  sold:      'bg-gray-100 text-gray-500',
};
const FRESHNESS_THRESHOLD_DAYS = 30;

function getTimestampDate(value?: FirestoreTimestampLike): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;

  if (typeof value === 'string') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  if ('toDate' in value && typeof value.toDate === 'function') {
    const parsed = value.toDate();
    return parsed instanceof Date && !isNaN(parsed.getTime()) ? parsed : null;
  }

  if ('seconds' in value && typeof value.seconds === 'number') {
    return new Date(value.seconds * 1000);
  }

  return null;
}

function getMaintenanceState(unit: Unit) {
  const latestActivity = [
    getTimestampDate(unit.updatedAt),
    getTimestampDate(unit.lastSyncAt),
    getTimestampDate(unit.intelligence?.lastUpdatedAt),
  ]
    .filter((value): value is Date => value instanceof Date)
    .sort((left, right) => right.getTime() - left.getTime())[0] ?? null;

  const ageInDays = latestActivity
    ? Math.floor((Date.now() - latestActivity.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  if (unit.isStale || ageInDays === null || ageInDays > FRESHNESS_THRESHOLD_DAYS) {
    return {
      label: 'Needs review',
      badgeClass: 'bg-amber-50 text-amber-700',
      detail: latestActivity ? `${ageInDays}d since update` : 'No freshness signal',
      title: unit.maintenanceNotes ?? 'Maintenance review recommended',
    };
  }

  if (ageInDays <= 7) {
    return {
      label: 'Fresh',
      badgeClass: 'bg-emerald-50 text-emerald-700',
      detail: ageInDays === 0 ? 'Updated today' : `${ageInDays}d ago`,
      title: 'Recently refreshed inventory data',
    };
  }

  return {
    label: 'Monitor',
    badgeClass: 'bg-blue-50 text-blue-700',
    detail: `${ageInDays}d ago`,
    title: 'Inventory is within the 30-day hygiene window',
  };
}

export default function AdminUnitsPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchUnits = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      let q = filter === 'all'
        ? query(collection(db, 'listings'), orderBy('createdAt', 'desc'), limit(50))
        : query(collection(db, 'listings'), where('status', '==', filter), orderBy('createdAt', 'desc'), limit(50));

      if (!reset && lastDoc) {
        q = filter === 'all'
          ? query(collection(db, 'listings'), orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(50))
          : query(collection(db, 'listings'), where('status', '==', filter), orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(50));
      }

      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Unit));
      setUnits(reset ? data : prev => [...prev, ...data]);
      setLastDoc(snap.docs[snap.docs.length - 1] ?? null);
      setHasMore(snap.docs.length === 50);
    } finally {
      setLoading(false);
    }
  }, [filter, lastDoc]);

  useEffect(() => {
    setLastDoc(null);
    fetchUnits(true);
  }, [filter]);

  const displayed = search
    ? units.filter(u =>
        u.title?.toLowerCase().includes(search.toLowerCase()) ||
        u.compound?.toLowerCase().includes(search.toLowerCase())
      )
    : units;

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#071422] tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}>
            Unit Inventory
          </h1>
          <p className="text-[#3a5570] text-sm mt-0.5">{units.length} units loaded</p>
        </div>
        <Link
          href="/admin/units/new"
          className="inline-flex items-center gap-2 bg-[#031632] text-white px-5 py-2.5 rounded-lg
                     text-xs font-bold tracking-widest uppercase hover:bg-[#1a2b48] transition-colors"
        >
          <Plus size={14} />
          Add Unit
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3a5570]/40" />
          <input
            type="text"
            placeholder="Search by title or compound..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e7e8e9] rounded-lg
                       text-sm outline-none focus:border-[#C9A84C] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                filter === s
                  ? 'bg-[#031632] text-white'
                  : 'bg-white text-[#3a5570] hover:bg-[#f3f4f5]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-[0_2px_16px_-4px_rgba(3,22,50,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f3f4f5]">
                {['Title', 'Compound', 'Type', 'Area', 'Beds', 'Price (EGP)', 'Status', 'Maintenance'].map(h => (
                  <th key={h}
                    className="text-left px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-[#3a5570]/50">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && units.length === 0
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-b border-[#f3f4f5]">
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 bg-[#f3f4f5] rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                : displayed.map(unit => {
                    const maintenance = getMaintenanceState(unit);

                    return (
                    <tr
                      key={unit.id}
                      className="border-b border-[#f3f4f5] hover:bg-[#f8f9fa] transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/admin/units/${unit.id}`}
                    >
                      <td className="px-6 py-4 font-semibold text-sm text-[#071422]">{unit.title}</td>
                      <td className="px-6 py-4 text-sm text-[#3a5570]">{unit.compound}</td>
                      <td className="px-6 py-4 text-sm text-[#3a5570] capitalize">{unit.propertyType}</td>
                      <td className="px-6 py-4 text-sm text-[#3a5570] font-mono">{unit.area} m²</td>
                      <td className="px-6 py-4 text-sm text-[#3a5570]">{unit.bedrooms}</td>
                      <td className="px-6 py-4 text-sm text-[#031632] font-mono font-semibold">
                        {unit.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] font-bold px-2.5 py-1 rounded uppercase tracking-widest ${
                          STATUS_STYLES[unit.status] ?? 'bg-gray-50 text-gray-400'
                        }`}>
                          {unit.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1" title={maintenance.title}>
                          <span className={`w-fit text-[9px] font-bold px-2.5 py-1 rounded uppercase tracking-widest ${maintenance.badgeClass}`}>
                            {maintenance.label}
                          </span>
                          <span className="text-[10px] text-[#3a5570]/70">{maintenance.detail}</span>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {/* Load More */}
        {hasMore && !search && (
          <div className="px-6 py-4 border-t border-[#f3f4f5] flex justify-center">
            <button
              onClick={() => fetchUnits(false)}
              disabled={loading}
              className="text-xs text-[#3a5570] hover:text-[#C9A84C] uppercase tracking-widest font-bold transition-colors"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
