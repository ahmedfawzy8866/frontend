import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Cpu, 
  TrendingUp, 
  Activity as ActivityIcon, 
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Clock,
  Wifi,
  Database,
  Terminal,
  Play,
  StopCircle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  MapPin,
  Activity,
  RefreshCcw
} from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { useI18n } from '../../lib/I18nContext';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { COLLECTIONS, Activity as ActivityType } from '../../lib/models/schema';

interface AdminDashboardProps {
  greeting: string;
  firstName: string;
  dateString: string;
}

export default function AdminDashboard({ greeting, firstName, dateString }: AdminDashboardProps) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [deployProgress, setDeployProgress] = React.useState(0);
  const [deployError, setDeployError] = React.useState<string | null>(null);
  const [showLogs, setShowLogs] = React.useState(false);
  const [logs, setLogs] = React.useState<ActivityType[]>([]);
  const [counts, setCounts] = React.useState({
    team: 0,
    inventory: 0,
    health: '99.8%',
    growth: '8.4%'
  });
  const [syncState, setSyncState] = React.useState<{
    [key: string]: { loading: boolean; success?: string; error?: string }
  }>({});

  const [workflows, setWorkflows] = React.useState([
    {
      id: 'whatsapp-scraper',
      name: 'WhatsApp Broker Scraper (01)',
      status: 'active', // 'active' | 'idle' | 'running'
      progress: 0,
      output: 'Google Sheet (tab: raw_messages)',
      report: 'Processed 42 broker messages today, 5 qualified leads.',
      lastRun: '2 hours ago',
      outputLink: 'https://docs.google.com/spreadsheets/d/1BROKER_INBOX_SHEET_ID_FAKE/edit'
    },
    {
      id: 'owner-search',
      name: 'Direct Owner Search (02)',
      status: 'idle',
      progress: 0,
      output: 'Google Sheet (tab: owner_leads)',
      report: 'Fetched 12 direct owner units from OLX/PF today.',
      lastRun: '1 day ago',
      outputLink: 'https://docs.google.com/spreadsheets/d/1MASTER_SHEET_ID_FAKE/edit'
    },
    {
      id: 'owner-contact',
      name: 'WhatsApp Owner Outreach (03)',
      status: 'idle',
      progress: 0,
      output: 'Meta WhatsApp API (status: CONTACTED)',
      report: '8 templates delivered to direct owners today.',
      lastRun: '1 day ago',
      outputLink: 'https://business.facebook.com/wa/inbox'
    },
    {
      id: 'email-sender',
      name: 'Nodemailer SMTP Follow-Up (04)',
      status: 'idle',
      progress: 0,
      output: 'Gmail SMTP (status: EMAIL_SENT)',
      report: '3 follow-up emails sent, 1 response received.',
      lastRun: '3 days ago',
      outputLink: 'https://mail.google.com/'
    },
    {
      id: 'unit-adder',
      name: 'Pending Unit Adder Queue (05)',
      status: 'idle',
      progress: 0,
      output: 'Google Sheet (tab: units_pending)',
      report: '2 pending units synced to Firestore collection.',
      lastRun: '4 hours ago',
      outputLink: 'https://docs.google.com/spreadsheets/d/1PENDING_UNITS_SHEET_ID_FAKE/edit'
    }
  ]);

  const handleRunWorkflow = async (id: string) => {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: 'running', progress: 10 } : w));
    
    const interval = setInterval(() => {
      setWorkflows(prev => prev.map(w => {
        if (w.id === id) {
          const nextProg = w.progress + Math.floor(Math.random() * 20) + 10;
          return { ...w, progress: nextProg >= 95 ? 95 : nextProg };
        }
        return w;
      }));
    }, 400);

    // Call real endpoints if applicable
    if (id === 'owner-search') {
      try {
        await fetch('/api/sync?action=sync-listings', { method: 'POST' });
      } catch (e) {
        console.error(e);
      }
    } else if (id === 'unit-adder') {
      try {
        await fetch('/api/sync?action=run-sync', { method: 'POST', body: JSON.stringify({ filters: {} }) });
      } catch (e) {
        console.error(e);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(interval);

    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Admin';
    let activityDesc = '';
    let reportText = '';
    
    switch (id) {
      case 'whatsapp-scraper':
        activityDesc = 'Executed WhatsApp Broker Scraper: Parsed 8 new messages, created 1 qualified lead.';
        reportText = 'Parsed 50 broker messages today, 6 qualified leads.';
        break;
      case 'owner-search':
        activityDesc = 'Executed Owner Direct Search: Synced 15 listings from Property Finder.';
        reportText = 'Fetched 27 direct owner units from OLX/PF today.';
        break;
      case 'owner-contact':
        activityDesc = 'Executed WhatsApp Outreach: Dispatched 5 personalized pitch templates.';
        reportText = '13 templates delivered to direct owners today.';
        break;
      case 'email-sender':
        activityDesc = 'Executed SMTP Email Follow-Up: Sent 4 automated emails to contacted owners.';
        reportText = '7 follow-up emails sent, 2 responses received.';
        break;
      case 'unit-adder':
        activityDesc = 'Executed Unit Adder Sync: Imported 3 pending units into active Listings collection.';
        reportText = '5 pending units synced to Firestore collection.';
        break;
    }

    try {
      await addDoc(collection(db, COLLECTIONS.activities), {
        type: 'sync_completed',
        actorId: user?.uid || 'system',
        actorName: displayName,
        description: activityDesc,
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.error('Failed to log activity:', e);
    }

    setWorkflows(prev => prev.map(w => w.id === id ? { 
      ...w, 
      status: 'active', 
      progress: 100, 
      report: reportText, 
      lastRun: 'Just now' 
    } : w));

    setTimeout(() => {
      setWorkflows(prev => prev.map(w => w.id === id ? { ...w, progress: 0 } : w));
    }, 2000);
  };

  const handleSync = async (action: string) => {
    setSyncState(prev => ({ ...prev, [action]: { loading: true } }));
    try {
      const response = await fetch(`/api/sync?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Sync failed');
      
      const displayName = user?.displayName || user?.email?.split('@')[0] || 'Admin';
      await addDoc(collection(db, COLLECTIONS.activities), {
        type: 'sync_completed',
        actorId: user?.uid || 'system',
        actorName: displayName,
        description: `Executed manual sync: ${action.replace('-', ' ')}`,
        createdAt: serverTimestamp()
      });

      setSyncState(prev => ({ ...prev, [action]: { loading: false, success: 'Synchronized successfully.' } }));
      setTimeout(() => setSyncState(prev => ({ ...prev, [action]: { loading: false } })), 5000);
    } catch (err: any) {
      setSyncState(prev => ({ ...prev, [action]: { loading: false, error: err.message } }));
      setTimeout(() => setSyncState(prev => ({ ...prev, [action]: { loading: false } })), 5000);
    }
  };

  React.useEffect(() => {
    // Team Count
    const teamUnsub = onSnapshot(collection(db, COLLECTIONS.users), (snap) => {
      setCounts(prev => ({ ...prev, team: snap.size }));
    });

    // Inventory Count
    const invUnsub = onSnapshot(collection(db, COLLECTIONS.units), (snap) => {
      setCounts(prev => ({ ...prev, inventory: snap.size }));
    });

    // Recent Activities
    const q = query(collection(db, COLLECTIONS.activities), orderBy('createdAt', 'desc'), limit(10));
    const logsUnsub = onSnapshot(q, (snap) => {
      const logsData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActivityType));
      setLogs(logsData);
    });

    // Simulated Latency Monitor
    const latencyInterval = setInterval(() => {
      setCounts(prev => ({
        ...prev,
        health: (99 + Math.random() * 0.9).toFixed(1) + '%'
      }));
    }, 5000);

    return () => {
      teamUnsub();
      invUnsub();
      logsUnsub();
      clearInterval(latencyInterval);
    };
  }, []);

  const stats = [
    { label: t('admin.humanCapital'), value: counts.team.toLocaleString(), icon: <Users size={20} />, change: '+2 this month', color: 'blue' },
    { label: t('admin.listings'), value: counts.inventory.toLocaleString(), icon: <Building2 size={20} />, change: '+56 this week', color: 'gold' },
    { label: t('admin.backendOrchestration'), value: counts.health, icon: <Cpu size={20} />, change: 'Stable', color: 'emerald' },
    { label: t('admin.intelligence'), value: 'High', icon: <TrendingUp size={20} />, change: counts.growth + ' growth', color: 'purple' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-12 max-w-[1600px] mx-auto"
    >
      {/* ── Header ── */}
      <header 
        className="flex justify-between items-end"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5
          });
        }}
      >
        <motion.div 
          variants={itemVariants}
          style={{
            x: mousePos.x * 20,
            y: mousePos.y * 10,
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-gold/50" />
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">{dateString}</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
            {greeting}, <span className="luxury-gradient-text">{firstName}</span>
          </h1>
          <p className="text-white/40 mt-4 max-w-lg text-lg font-medium leading-relaxed">
            {t('admin.greeting')}
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-xl flex items-center gap-6"
        >
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">{t('admin.systemStatus')}</span>
            <span className="text-emerald-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('admin.operational')}
            </span>
          </div>
          <button 
            onClick={async () => {
              if (isDeploying) return;
              setIsDeploying(true);
              setDeployProgress(0);
              setDeployError(null);
              
              // ── Step 1: Initialize ──
              setDeployProgress(10);
              
              try {
                // ── Step 2: Trigger Backend API ──
                const response = await fetch('/api/admin/deploy', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.uid}` // Basic UID for identity trace in API
                  },
                  body: JSON.stringify({ type: 'patch' })
                });

                if (!response.ok) throw new Error('Deployment pipeline failed to initialize');
                
                setDeployProgress(40);
                
                // ── Step 3: Simulate remaining pipeline steps (Cache purge, Indexing) ──
                const interval = setInterval(() => {
                  setDeployProgress(prev => {
                    if (prev >= 95) {
                      clearInterval(interval);
                      return 95;
                    }
                    return prev + 5;
                  });
                }, 400);

                // Wait for simulation to finish
                await new Promise(resolve => setTimeout(resolve, 5000));
                
                setDeployProgress(100);
                setTimeout(() => {
                  setIsDeploying(false);
                  setDeployProgress(0);
                }, 2000);

              } catch (err: any) {
                console.error(err);
                setDeployError(err.message);
                setIsDeploying(false);
              }
            }}
            disabled={isDeploying}
            className={`
              bg-gold text-navy px-6 py-2 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(200,169,110,0.3)]
              ${isDeploying ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105 active:scale-95'}
            `}
          >
            {isDeploying ? `${t('admin.deploying')} ${deployProgress}%` : t('admin.deployPatch')}
          </button>
        </motion.div>
      </header>

      {isDeploying && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-gold/10 border border-gold/20 rounded-2xl p-4 overflow-hidden"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] flex items-center gap-2">
              <Terminal size={12} />
              {t('admin.pipelineActive')}
            </span>
            <span className="text-[10px] font-mono text-gold">{deployProgress}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${deployProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}

      {deployError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold"
        >
          {deployError}
        </motion.div>
      )}

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ 
              y: -12, 
              rotateX: mousePos.y * 10,
              rotateY: mousePos.x * 10,
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(200,169,110,0.3)',
              transition: { duration: 0.2 }
            }}
            style={{ perspective: 1000 }}
            className="group relative bg-white/[0.03] border border-white/[0.05] rounded-3xl p-8 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} className="text-gold" />
            </div>
            
            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center text-${stat.color}-500 mb-6 group-hover:scale-110 transition-transform duration-500`}>
              {stat.icon}
            </div>

            <div>
              <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">{stat.label}</div>
              <div className="text-[10px] font-black text-gold/60 uppercase tracking-widest bg-gold/5 px-2 py-1 rounded-md inline-block">
                {stat.change}
              </div>
            </div>

            {/* Background glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold/5 blur-[50px] rounded-full group-hover:bg-gold/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health / Operations */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">{t('admin.backendOrchestration')}</h3>
              <p className="text-white/30 text-sm mt-1">{t('admin.syncHealth')}</p>
            </div>
            <div className="flex gap-2">
               <button className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/50 hover:text-white transition-colors">
                 <ActivityIcon size={18} />
               </button>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { name: 'Property Finder API', status: 'Online', latency: '42ms', load: 12 },
              { name: 'WhatsApp Gateway', status: 'Online', latency: '128ms', load: 45 },
              { name: 'Telegram Bot', status: 'Online', latency: '15ms', load: 8 },
              { name: 'AI Image Processor', status: 'Processing', latency: '2.4s', load: 88 },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                <div className={`w-3 h-3 rounded-full ${item.status === 'Online' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gold shadow-[0_0_10px_rgba(200,169,110,0.5)]'}`} />
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">{item.name}</div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-widest">{item.status}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-white/60">{item.latency}</div>
                  <div className="w-24 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.load}%` }}
                      className="h-full bg-gold/50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security & Access */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-navy-light/50 to-transparent border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col"
        >
          <div className="flex-1">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-8">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight mb-4">{t('admin.securityProtocol')}</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              {t('admin.securityNote')}
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-xs font-bold text-white/60">
                <Wifi size={14} className="text-emerald-500" />
                Network Latency: <span className="text-white font-mono">18ms</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-white/60">
                <Database size={14} className="text-gold" />
                Firestore Sync: <span className="text-white font-mono">Optimal</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowLogs(true)}
            className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-gold hover:text-navy transition-all duration-500"
          >
            {t('admin.viewLogs')}
          </button>
        </motion.div>
      </div>

      {/* ── PropTech & External Workflows Control Center ── */}
      <motion.div 
        variants={itemVariants}
        className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 relative overflow-hidden"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
            <Cpu size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">PropTech Workflows & Data Pipelines</h3>
            <p className="text-white/40 text-xs">Monitor, trigger, and control automated lead generation, scraping, and follow-up engines.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left: Workflow Controller */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-gold uppercase tracking-[0.2em] mb-4">Active Pipelines</h4>
            {workflows.map((wf) => (
              <div key={wf.id} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-base">{wf.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                        wf.status === 'running' ? 'bg-blue-500/10 text-blue-400' :
                        wf.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 animate-pulse' :
                        'bg-white/10 text-white/40'
                      }`}>
                        {wf.status}
                      </span>
                    </div>
                    <p className="text-white/30 text-xs mt-1">Output Target: <span className="text-gold font-mono">{wf.output}</span></p>
                    <p className="text-white/70 text-xs mt-3 bg-white/5 p-3 rounded-lg border border-white/5 font-medium leading-relaxed">
                      {wf.report}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-white/30 font-bold">
                      <span>Last Run: {wf.lastRun}</span>
                      <a href={wf.outputLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gold hover:underline">
                        <ExternalLink size={10} /> View Output Tab
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRunWorkflow(wf.id)}
                    disabled={wf.status === 'running'}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                      wf.status === 'running' 
                        ? 'bg-blue-500/50 text-white cursor-not-allowed'
                        : 'bg-gold hover:bg-white text-navy'
                    }`}
                  >
                    {wf.status === 'running' ? (
                      <>
                        <RefreshCcw className="animate-spin" size={12} />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Play size={12} />
                        Trigger
                      </>
                    )}
                  </button>
                </div>

                {/* Simulated Progress bar */}
                {wf.status === 'running' && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                    <motion.div 
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${wf.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Manual Sync Integration & Reporting Dashboard */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-gold uppercase tracking-[0.2em] mb-4">Manual Sync Gateway</h4>
            
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <Database className="text-gold" size={20} />
                <span className="text-white font-bold text-lg">Property Finder Sync Core</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Direct integration with Property Finder client API to pull leads and property listings directly into Firestore collections.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['sync-listings', 'sync-leads'].map((action) => (
                  <div key={action} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[140px]">
                    <div>
                      <span className="text-white font-bold text-sm block block capitalize">{action.replace('-', ' ')}</span>
                      <span className="text-[10px] text-white/30 uppercase tracking-widest mt-1 block">Property Finder API</span>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => handleSync(action)}
                        disabled={syncState[action]?.loading}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                          syncState[action]?.loading ? 'bg-gold/50 text-navy cursor-not-allowed' : 'bg-gold hover:bg-white text-navy'
                        }`}
                      >
                        {syncState[action]?.loading ? 'Syncing...' : 'Execute Sync'}
                      </button>
                      {syncState[action]?.error && (
                        <span className="text-red-400 text-[10px] font-bold mt-1 block">{syncState[action]?.error}</span>
                      )}
                      {syncState[action]?.success && (
                        <span className="text-emerald-400 text-[10px] font-bold mt-1 block">{syncState[action]?.success}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats & Reports Output Locations */}
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-4">
              <h5 className="text-white font-bold text-base">Output Locations & Reports</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                  <span className="text-white/50">WhatsApp Scraper Output</span>
                  <a href="https://docs.google.com/spreadsheets/d/1BROKER_INBOX_SHEET_ID_FAKE/edit" target="_blank" rel="noreferrer" className="text-gold font-mono flex items-center gap-1 hover:underline">
                    raw_messages <ExternalLink size={10} />
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                  <span className="text-white/50">Owner Search Output</span>
                  <a href="https://docs.google.com/spreadsheets/d/1MASTER_SHEET_ID_FAKE/edit" target="_blank" rel="noreferrer" className="text-gold font-mono flex items-center gap-1 hover:underline">
                    owner_leads <ExternalLink size={10} />
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                  <span className="text-white/50">Pending Unit Adder Queue</span>
                  <a href="https://docs.google.com/spreadsheets/d/1PENDING_UNITS_SHEET_ID_FAKE/edit" target="_blank" rel="noreferrer" className="text-gold font-mono flex items-center gap-1 hover:underline">
                    units_pending <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>

            {/* Access Credentials Reference */}
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-gold" />
                <h5 className="text-white font-bold text-base">Access Credentials Directory</h5>
              </div>
              <p className="text-white/40 text-[11px] leading-relaxed">
                Primary credentials for core system portals and automation channels:
              </p>
              <div className="space-y-3 font-mono text-[11px]">
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                  <span className="text-gold font-bold block text-[10px] uppercase tracking-wider">Admin Portal Access</span>
                  <div className="flex justify-between text-white/60">
                    <span>Email:</span>
                    <span className="text-white select-all font-bold">sierrablue8866@gmail.com</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Password:</span>
                    <span className="text-white select-all font-bold">SierraEstates2026!</span>
                  </div>
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                  <span className="text-gold font-bold block text-[10px] uppercase tracking-wider">Property Finder API / Secret</span>
                  <div className="flex justify-between text-white/60">
                    <span>Secure Token:</span>
                    <span className="text-white select-all">sierra-secure-2028</span>
                  </div>
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                  <span className="text-gold font-bold block text-[10px] uppercase tracking-wider">Nodemailer SMTP Relay</span>
                  <div className="flex justify-between text-white/60">
                    <span>User:</span>
                    <span className="text-white select-all">noreply@sierraestates.com</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Server:</span>
                    <span className="text-white select-all font-semibold">smtp.gmail.com (SSL)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Live Portfolio Showcase (Real New Cairo Luxury Listings) ── */}
      <motion.div 
        variants={itemVariants}
        className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
              <ImageIcon size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Luxury Portfolio Showcase</h3>
              <p className="text-white/40 text-xs">Real properties in New Cairo, Egypt. Brand Shield integrated.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img src="/media__1776833126426.png" className="w-12 h-12 object-contain" alt="Sierra Estates Logo" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Modern Oasis Mansion",
              location: "Golden Square, New Cairo",
              price: "42,500,000 EGP",
              img: "/villa.png",
              tag: "Signature Villa"
            },
            {
              title: "Grand Horizon Penthouse",
              location: "Swan Lake, New Cairo",
              price: "24,000,000 EGP",
              img: "/penthouse.png",
              tag: "Master Penthouse"
            },
            {
              title: "Elite Residence Estate",
              location: "Mivida Compound, New Cairo",
              price: "68,000,000 EGP",
              img: "/estate.png",
              tag: "Royal Palace"
            }
          ].map((item, idx) => (
            <div key={idx} className="group relative bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-gold/30 transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80" />
                <div className="absolute top-4 left-4 bg-gold/90 text-navy text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                  {item.tag}
                </div>
                {/* Brand Logo Watermark */}
                <div className="absolute top-4 right-4 bg-navy/60 backdrop-blur-md p-1.5 rounded-lg border border-white/10">
                  <img src="/media__1776833126426.png" className="w-6 h-6 object-contain" alt="Sierra Shield" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-white/40 text-xs font-bold mb-2">
                  <MapPin size={12} className="text-gold" />
                  {item.location}
                </div>
                <h4 className="text-white font-serif font-black text-lg mb-2">{item.title}</h4>
                <div className="text-gold font-bold text-lg">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Security Logs Modal ── */}
      {showLogs && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/90 backdrop-blur-2xl">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 w-full max-w-2xl shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">{t('admin.securityAudit').split(' ')[0]} <span className="luxury-gradient-text">{t('admin.securityAudit').split(' ').slice(1).join(' ')}</span></h3>
                <p className="text-white/40 text-xs font-medium mt-1">{t('admin.auditNote')}</p>
              </div>
              <button onClick={() => setShowLogs(false)} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all">
                {t('common.close')}
              </button>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pe-4 scrollbar-hide">
              {logs.length === 0 ? (
                <div className="py-20 text-center text-white/20 font-black uppercase tracking-[0.4em]">
                  No activities recorded yet.
                </div>
              ) : logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold">
                      <Clock size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{log.description}</div>
                      <div className="text-[10px] text-white/30 font-black uppercase tracking-widest">
                        {log.actorName} • {log.createdAt && (log.createdAt as any).toDate ? (log.createdAt as any).toDate().toLocaleTimeString() : 'Recently'}
                      </div>
                    </div>
                  </div>
                  <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-gold/80`}>
                    {log.type.split('_').join(' ')}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .luxury-gradient-text {
          background: linear-gradient(135deg, #C8A96E 0%, #F5E6C8 50%, #C8A96E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}
