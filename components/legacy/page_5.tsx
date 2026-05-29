'use client';

import React, { useEffect, useState } from 'react';
import { useSierraBlu } from '@/hooks/useSierraBlu';
import { Building2, TrendingUp, Handshake, Activity as ActivityIcon } from 'lucide-react';

interface KPI {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  color: string;
}

interface RecentActivity {
  id: string;
  actorName: string;
  description: string;
  createdAt: any;
  type: string;
}

const ACTIVITY_COLORS: Record<string, string> = {
  lead_created:      'bg-blue-50 text-blue-600',
  listing_added:     'bg-green-50 text-green-700',
  sale_closed:       'bg-purple-50 text-purple-600',
  sync_completed:    'bg-orange-50 text-orange-600',
};

export default function AdminDashboardPage() {
  const { getDashboardStats, loading: hookLoading } = useSierraBlu();
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const stats = await getDashboardStats();
        if (stats) {
          setKpis([
            {
              label: 'Total Units',
              value: stats.totalUnits.toLocaleString(),
              sub: 'in listings collection',
              icon: Building2,
              color: '#031632',
            },
            {
              label: 'Active Pipeline',
              value: stats.activeDeals.toLocaleString(),
              sub: 'ongoing transactions',
              icon: Handshake,
              color: '#C9A84C',
            },
            {
              label: 'System Health',
              value: '100%',
              sub: 'all agents operational',
              icon: ActivityIcon,
              color: '#16a34a',
            },
            {
              label: 'Intelligence',
              value: 'Neural',
              sub: 'V13.0 activated',
              icon: TrendingUp,
              color: '#3a5570',
            },
          ]);
          setRecentActivities(stats.recentActivities);
        }
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [getDashboardStats]);

  return (
    <div className="p-8" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#071422] tracking-tight mb-1"
          style={{ fontFamily: 'var(--font-display)' }}>
          Intelligence Dashboard
        </h1>
        <p className="text-[#3a5570] text-sm font-light">
          Real-time oversight of the Sierra AI Neural Network.
        </p>
      </div>

      {/* ══ KPI Cards ══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {loading || hookLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 h-36 animate-pulse border border-[#f3f4f5]" />
            ))
          : kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div key={kpi.label}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#f3f4f5] hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${kpi.color}14` }}>
                      <Icon size={18} style={{ color: kpi.color }} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold tracking-tight mb-1"
                    style={{ color: kpi.color, fontFamily: 'var(--font-display)' }}>
                    {kpi.value}
                  </div>
                  <div className="text-xs font-semibold text-[#071422] mb-0.5 uppercase tracking-wide">{kpi.label}</div>
                  <div className="text-[10px] text-[#3a5570]/60 uppercase tracking-widest">{kpi.sub}</div>
                </div>
              );
            })}
      </div>

      {/* ══ Recent Activities Feed ══ */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#f3f4f5] overflow-hidden">
        <div className="px-8 py-6 border-b border-[#f3f4f5] flex items-center justify-between">
          <h2 className="font-bold text-[#071422] uppercase tracking-widest text-xs" style={{ fontFamily: 'var(--font-display)' }}>
            System Activity Log
          </h2>
          <span className="text-[9px] text-[#3a5570]/50 uppercase tracking-widest font-mono bg-[#f8f9fa] px-2 py-1 rounded">
            Live Nexus Feed
          </span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-[#3a5570]/40 text-sm">Synchronizing with Nexus...</div>
        ) : recentActivities.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#3a5570]/40 text-sm">No recent activity detected.</p>
            <p className="text-[9px] text-[#3a5570]/30 mt-2 uppercase tracking-widest">
              Agent logs will appear here in real-time.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#f3f4f5]">
            {recentActivities.map((act) => (
              <div key={act.id}
                className="flex items-center justify-between px-8 py-5 hover:bg-[#f8f9fa] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${act.type.includes('sale') ? 'bg-purple-500' : 'bg-blue-400'}`} />
                  <div>
                    <div className="font-semibold text-sm text-[#071422]">{act.description}</div>
                    <div className="text-[10px] text-[#3a5570]/50 uppercase tracking-wide mt-0.5">
                      {act.actorName} · {act.type.replace(/_/g, ' ')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-mono text-[#3a5570]/40">
                    {act.createdAt?.toDate ? act.createdAt.toDate().toLocaleTimeString() : 'Recent'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
