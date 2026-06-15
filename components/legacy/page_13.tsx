"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useI18n } from '../lib/I18nContext';
import dynamic from 'next/dynamic';
import LoginScreen from '../components/Auth/LoginScreen';
import Topbar from '../components/ui/Topbar';
import Sidebar from '../components/ui/Sidebar';
import MobileNav from '../components/ui/MobileNav';

const DashboardScreen    = dynamic(() => import('../components/Dashboard/DashboardScreen'),     { ssr: false });
const PortfolioAssets    = dynamic(() => import('../components/Admin/PortfolioAssets'),         { ssr: false });
const CRMKanban          = dynamic(() => import('../components/CRM/CRMKanban'),                 { ssr: false });
const LeadsFlow          = dynamic(() => import('../components/CRM/LeadsFlow'),                 { ssr: false });
const ClientsScreen      = dynamic(() => import('../components/CRM/ClientsScreen'),             { ssr: false });
const ReportsScreen      = dynamic(() => import('../components/Dashboard/ReportsScreen'),       { ssr: false });
const TeamScreen         = dynamic(() => import('../components/Dashboard/TeamScreen'),          { ssr: false });
const ActionProtocols    = dynamic(() => import('../components/Operations/ActionProtocols'),    { ssr: false });
const SiteExperiences    = dynamic(() => import('../components/Operations/SiteExperiences'),    { ssr: false });
const CommissionLedger   = dynamic(() => import('../components/Operations/CommissionLedger'),   { ssr: false });
const MediaHub           = dynamic(() => import('../components/Admin/MediaHub'),                { ssr: false });
const DedupeReviewQueue  = dynamic(() => import('../components/Admin/DedupeReviewQueue'),       { ssr: false });
const EasyListing        = dynamic(() => import('../components/Operations/EasyListing'),        { ssr: false });
const IntegrationHub     = dynamic(() => import('../components/Operations/IntegrationHub'),     { ssr: false });
const MarketIntelligence = dynamic(() => import('../components/Operations/MarketIntelligence'), { ssr: false });
const SystemDashboard    = dynamic(() => import('../components/System/SystemDashboard'),        { ssr: false });
const LiveInventoryMap   = dynamic(() => import('../components/Operations/LiveInventoryMap'),   {
  ssr: false,
  loading: () => <div className="w-full h-full rounded-[2rem] bg-white/5 animate-pulse" />,
});

type Screen =
  | 'dashboard' | 'listings' | 'crm'       | 'leads'    | 'clients'
  | 'reports'   | 'team'     | 'protocols'  | 'media'    | 'experiences'
  | 'ledger'    | 'sync'     | 'processing' | 'nexus'    | 'intelligence'
  | 'map'       | 'system';

export default function SierraBluApp() {
  const { user, isGuest, loading, signOut } = useAuth();
  const { locale }                           = useI18n();

  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [mounted, setMounted]           = useState(false);
  const [greeting, setGreeting]         = useState('');
  const [dateString, setDateString]     = useState('');

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    const g = {
      morning:   locale === 'ar' ? 'صباح الخير'  : 'Good morning',
      afternoon: locale === 'ar' ? 'مساء الخير'  : 'Good afternoon',
      evening:   locale === 'ar' ? 'مساء النور'  : 'Good evening',
    };
    setGreeting(hour < 12 ? g.morning : hour < 18 ? g.afternoon : g.evening);
    setDateString(
      new Date().toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })
    );
    const onMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
      document.documentElement.style.setProperty('--mouse-y', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
      document.documentElement.style.setProperty('--mouse-x-px', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y-px', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [locale]);

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="loader-logo">SB</div>
        <div className="loader-text">
          {locale === 'ar' ? 'جاري التحميل...' : 'Initializing Sierra AI…'}
        </div>
      </div>
    );
  }

  // غير مسجل → شاشة اللوجين مباشرة
  // زرار Back يرجعه للموقع العام /landing
  if (!user && !isGuest) {
    return (
      <LoginScreen
        onBack={() => { window.location.href = '/landing'; }}
      />
    );
  }

  if (!mounted) return null;

  const displayName = user?.displayName
    || user?.email?.split('@')[0]
    || (isGuest ? 'Guest Advisor' : 'A. Fawzy');
  const initials  = displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  const firstName = displayName.split(' ')[0];

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/landing';
  };

  return (
    <div className="screen active">
      <Topbar
        onHomeClick={() => setActiveScreen('dashboard')}
        onSignOut={handleSignOut}
        userInitials={initials}
        displayName={displayName}
        isGuest={isGuest ?? false}
      />
      <div className="app-layout">
        <div className="hidden md:block">
          <Sidebar
            activeScreen={activeScreen}
            onNavigate={setActiveScreen}
            displayName={displayName}
            userInitials={initials}
          />
        </div>
        <div className="main-content pb-[80px] md:pb-0">
          {activeScreen === 'dashboard'    && <DashboardScreen greeting={greeting} firstName={firstName} dateString={dateString} onNavigate={setActiveScreen} />}
          {activeScreen === 'listings'     && <PortfolioAssets />}
          {activeScreen === 'crm'          && <CRMKanban />}
          {activeScreen === 'leads'        && <LeadsFlow />}
          {activeScreen === 'clients'      && <ClientsScreen />}
          {activeScreen === 'reports'      && <ReportsScreen />}
          {activeScreen === 'team'         && <TeamScreen onNavigate={setActiveScreen} />}
          {activeScreen === 'protocols'    && <ActionProtocols />}
          {activeScreen === 'media'        && <MediaHub />}
          {activeScreen === 'experiences'  && <SiteExperiences />}
          {activeScreen === 'ledger'       && <CommissionLedger />}
          {activeScreen === 'sync'         && <DedupeReviewQueue />}
          {activeScreen === 'processing'   && <EasyListing />}
          {activeScreen === 'nexus'        && <IntegrationHub />}
          {activeScreen === 'intelligence' && <MarketIntelligence />}
          {activeScreen === 'map'          && <LiveInventoryMap />}
          {activeScreen === 'system'       && <SystemDashboard />}
        </div>
      </div>
      <MobileNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
}
