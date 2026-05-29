"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Cpu, Globe, Database, ArrowRight, Settings, Play, Terminal, CheckCircle, AlertTriangle, Info, Sparkles, User, Percent, DollarSign } from 'lucide-react';
import MaintenanceMonitor from './MaintenanceMonitor';
import { SbroOrchestrator, WorkflowLog, SimulationResult } from '../../lib/workflow/orchestrator';

export default function SystemDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'dqe' | 'orchestrator' | 'distribution' | 'maintenance'>('overview');

  // Simulation States
  const [rawMessageInput, setRawMessageInput] = useState(
    "Emaar Mivida - Villa BMM406 - 5 beds, ultra-lux, fully furnished, EGP 15M, with Pool"
  );
  const [customLeadName, setCustomLeadName] = useState("Ahmed Mansour");
  const [simulationLogs, setSimulationLogs] = useState<WorkflowLog[]>([]);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);

  const handleRunSimulation = async () => {
    setSimulationRunning(true);
    setSimResult(null);
    setSimulationLogs([]);
    
    const engine = new SbroOrchestrator((log) => {
      setSimulationLogs((prev) => [...prev, log]);
    });

    try {
      const res = await engine.runSimulation(rawMessageInput, customLeadName);
      setSimResult(res);
    } catch (err) {
      console.error("Simulation failed:", err);
    } finally {
      setSimulationRunning(false);
    }
  };

  const getLogStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={14} className="text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle size={14} className="text-amber-400 shrink-0" />;
      case 'error':
        return <AlertTriangle size={14} className="text-red-400 shrink-0" />;
      default:
        return <Info size={14} className="text-blue-400 shrink-0" />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-white" style={{ minHeight: '100vh', backgroundColor: 'var(--midnight-navy, #0B1021)' }}>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light tracking-wide flex items-center gap-3">
            <Cpu className="text-[var(--burnished-gold, #C9A96E)]" />
            OUTSIDER SYSTEM <span className="text-sm px-2 py-1 bg-white/10 rounded-full text-white/70 ms-2">v12.0</span>
          </h1>
          <p className="text-white/60 mt-2 text-sm uppercase tracking-widest">Admin & Employee Intelligence Dashboard</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-md bg-white/5 border border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs tracking-wider">PIPELINE ACTIVE</span>
          </div>
        </div>
      </header>

      <div className="flex gap-6 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
        {['overview', 'dqe', 'orchestrator', 'distribution', 'maintenance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`uppercase tracking-wider text-sm pb-2 transition-all ${
              activeTab === tab 
                ? 'text-[var(--burnished-gold, #C9A96E)] border-b-2 border-[var(--burnished-gold, #C9A96E)]' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Assets in Pipeline" value="1,204" icon={<Database size={20} />} trend="+12 this week" />
            <StatCard title="DQE Flags (Duplicates)" value="34" icon={<ShieldCheck size={20} />} trend="-5 this week" />
            <StatCard title="Active Syndications" value="892" icon={<Globe size={20} />} trend="Property Finder synced" />

            <div className="col-span-1 md:col-span-3 mt-6 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
              <h3 className="text-lg font-light mb-4 text-[var(--burnished-gold, #C9A96E)]">Live Orchestrator Feed</h3>
              <div className="space-y-4">
                <FeedItem time="Just now" event="Asset MVD-3F-75K+G generated branded media via Canvas Engine." status="success" />
                <FeedItem time="2 mins ago" event="Property Finder API Sync successful for 12 records." status="success" />
                <FeedItem time="15 mins ago" event="Data Quality Estimation flagged a potential duplicate in Shorouk Villa." status="warning" />
                <FeedItem time="1 hr ago" event="WhatsApp Scraper ingested 5 new raw texts. Routed to Scribe." status="info" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dqe' && (
          <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <h3 className="text-lg font-light mb-6 text-[var(--burnished-gold, #C9A96E)] flex items-center gap-2">
              <ShieldCheck /> Data Quality Estimation (DQE) Queue
            </h3>
            <p className="text-sm text-white/60 mb-6">Review pending assets flagged for +/- 5% price variance or duplicate locations.</p>
            
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-white/50 border-b border-white/10">
                <tr>
                  <th className="pb-3 font-medium">System Code</th>
                  <th className="pb-3 font-medium">Compound</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Flag Reason</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 font-mono text-[var(--burnished-gold, #C9A96E)]">CFC-2U-45K</td>
                    <td className="py-4 text-white/80">Cairo Festival City</td>
                    <td className="py-4 text-white/80">45,000 EGP</td>
                    <td className="py-4 text-amber-400">Duplicate Match (98%)</td>
                    <td className="py-4 text-right">
                      <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orchestrator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input & Controller Panel */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-light mb-6 text-[var(--burnished-gold, #C9A96E)] flex items-center gap-2">
                  <Play size={18} /> AI Workflow Pipeline Controller
                </h3>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  Ingest raw data packets matching the "Supply & Demand" workflows downloaded from the Sierra AI PropTech Operating System guidelines (Property Ingestion & Sales Consultancy lifecycle).
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Lead / Client Name</label>
                    <input
                      type="text"
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--burnished-gold, #C9A96E)] outline-none transition-colors"
                      value={customLeadName}
                      onChange={(e) => setCustomLeadName(e.target.value)}
                      placeholder="e.g. Ahmed Mansour"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Raw WhatsApp Intake Packet</label>
                    <textarea
                      rows={4}
                      className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--burnished-gold, #C9A96E)] outline-none transition-colors resize-none"
                      value={rawMessageInput}
                      onChange={(e) => setRawMessageInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleRunSimulation}
                  disabled={simulationRunning}
                  className="w-full py-4 bg-[var(--burnished-gold, #C9A96E)] hover:bg-white text-black font-bold text-xs uppercase tracking-widest rounded-lg transition-all shadow-[0_0_20px_rgba(201,168,76,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Play size={14} fill="currentColor" />
                  {simulationRunning ? "Processing Pipeline..." : "Execute S1-S10 Intelligence Pipeline"}
                </button>
              </div>
            </div>

            {/* Terminal Logging View */}
            <div className="p-6 rounded-xl border border-white/10 bg-[#040812] flex flex-col justify-between" style={{ minHeight: '420px' }}>
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Terminal size={12} />
                    Active Ingestion Terminal Logs
                  </span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto font-mono text-[11px] text-[#4AF626] pe-2 select-text">
                  {simulationLogs.length === 0 ? (
                    <div className="text-white/20 uppercase tracking-[0.2em] py-20 text-center text-xs">
                      Awaiting Pipeline Execution...
                    </div>
                  ) : (
                    simulationLogs.map((log) => (
                      <div key={log.id} className="flex gap-2 items-start py-1 border-b border-white/[0.02]">
                        <span className="text-white/30 shrink-0">[{log.timestamp}]</span>
                        <span className="text-[var(--burnished-gold, #C9A96E)] font-bold shrink-0">{log.stage}</span>
                        <span className="text-blue-400 font-bold shrink-0">[{log.agent}]</span>
                        <span className="text-white/90 flex-1">{log.message}</span>
                        {getLogStatusIcon(log.status)}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Dynamic Simulation Result Card */}
              <AnimatePresence>
                {simResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="mt-6 p-4 rounded-lg bg-white/5 border border-[var(--burnished-gold, #C9A96E)]/30 backdrop-blur-xl"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-white/40">Ingested SBR Asset</span>
                        <h4 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
                          <span className="text-[var(--burnished-gold, #C9A96E)]">{simResult.sbrCode}</span>
                          <span className="text-xs text-white/50 font-normal">({simResult.compound})</span>
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-widest text-white/40">VIP Priority</span>
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end mt-0.5">
                          <Sparkles size={10} />
                          Score: {simResult.vipScore}/10
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 border-t border-b border-white/5 py-3">
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-white/30">Price EGP</span>
                        <span className="text-sm font-bold text-white">{(simResult.priceEGP / 1000000).toFixed(1)}M</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-white/30">Price USD</span>
                        <span className="text-sm font-bold text-white">${(simResult.priceUSD / 1000).toFixed(0)}K</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-white/30">Match Accuracy</span>
                        <span className="text-sm font-bold text-[var(--burnished-gold, #C9A96E)]">{simResult.matchScore}%</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-white/30">Commission</span>
                        <span className="text-sm font-bold text-emerald-400">EGP {simResult.commissionEGP.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-1">Luxury Bilingual Narratives</span>
                      <div className="text-[10px] text-white/70 leading-relaxed italic border-s border-[var(--burnished-gold, #C9A96E)] ps-2">
                        {simResult.copywritingEN}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === 'distribution' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <h3 className="text-lg font-light mb-4">Property Finder API Sync</h3>
                <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                   <div className="flex items-center gap-3">
                      <Globe className="text-green-400" />
                      <span>Status: <strong className="text-green-400">Connected</strong></span>
                   </div>
                   <button className="text-xs bg-[var(--burnished-gold, #C9A96E)] text-black px-4 py-2 rounded font-medium">Force Sync</button>
                </div>
             </div>
             <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <h3 className="text-lg font-light mb-4">Telegram OS Bot</h3>
                <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                   <div className="flex items-center gap-3">
                      <Activity className="text-green-400" />
                      <span>Status: <strong className="text-green-400">Listening</strong></span>
                   </div>
                   <button className="text-xs bg-white/10 px-4 py-2 rounded font-medium">View Logs</button>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <MaintenanceMonitor />
        )}
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm text-white/60 tracking-wide uppercase">{title}</h3>
        <div className="text-[var(--burnished-gold, #C9A96E)] opacity-80">{icon}</div>
      </div>
      <div className="text-4xl font-light mb-2">{value}</div>
      <div className="text-xs text-green-400/80 tracking-wider">{trend}</div>
    </div>
  );
}

function FeedItem({ time, event, status }: { time: string, event: string, status: 'success' | 'warning' | 'info' }) {
  const colors = {
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500'
  };
  return (
    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
      <div className={`mt-1.5 w-2 h-2 rounded-full ${colors[status]}`}></div>
      <div>
        <p className="text-sm text-white/90">{event}</p>
        <p className="text-xs text-white/40 mt-1">{time}</p>
      </div>
    </div>
  );
}
