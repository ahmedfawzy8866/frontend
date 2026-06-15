"use client";
import React, { useState, FormEvent } from 'react';
import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import BrandLogo from '../../../components/ui/BrandLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ChevronRight, ShieldCheck, Zap, Languages } from 'lucide-react';
import { useI18n } from '../../../lib/I18nContext';

export default function AdminLoginPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const { t, locale, setLocale, dir } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already admin
  React.useEffect(() => {
    if (!authLoading && user && isAdmin) {
      router.push('/admin');
    }
  }, [user, isAdmin, authLoading, router]);

  const handleAdminLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 1. Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      
      // 2. Fetch role from Firestore (handled by AuthContext observer, 
      // but we need to wait/verify here to ensure admin access)
      const { db } = await import('../../../lib/firebase');
      const { doc, getDoc } = await import('firebase/firestore');
      const userDoc = await getDoc(doc(db, 'users', loggedInUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin') {
          router.push('/admin');
        } else {
          setError(t('admin.login.error.denied'));
          await auth.signOut();
        }
      } else {
        setError(t('admin.login.error.unauthorized'));
        await auth.signOut();
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError(t('admin.login.error.invalid'));
      } else if (err.code === 'auth/too-many-requests') {
        setError(t('admin.login.error.locked'));
      } else {
        setError(t('admin.login.error.failure'));
      }
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  };

  return (
    <div className="min-h-screen bg-[#060C1A] flex flex-col items-center justify-center p-6 relative overflow-hidden" dir={dir}>
      {/* ── Language Toggle (Floating Premium) ── */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
        className="fixed top-8 right-8 z-[100] flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl text-white transition-all group"
      >
        <Languages size={18} className="text-gold group-hover:rotate-12 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
          {locale === 'en' ? 'العربية' : 'English'}
        </span>
      </motion.button>
      {/* ── Cinematic Background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0B1A3E_0%,transparent_50%)] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* ── Login Container ── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full max-w-[480px] z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <BrandLogo size="xl" themeOverride="dark" />
          </motion.div>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {t('admin.login.title').split(' ')[0]} <span className="luxury-gradient-text">{t('admin.login.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-white/40 text-sm font-medium tracking-[0.1em] uppercase">{t('admin.login.subtitle')}</p>
          </motion.div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle glow edge */}
          <div className="absolute inset-px rounded-[2.5rem] border border-white/[0.05] pointer-events-none"></div>
          
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                <span className="text-xs font-bold text-red-400">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">{t('admin.login.identifier')}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-gold transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('admin.login.identifierPlaceholder')}
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-gold/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1">{t('admin.login.securityKey')}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/20 group-focus-within:text-gold transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('admin.login.keyPlaceholder')}
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-4 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-gold/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(200, 169, 110, 1)' }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-gold text-navy font-black text-sm uppercase tracking-[0.2em] py-5 rounded-2xl shadow-[0_0_30px_rgba(200,169,110,0.2)] flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-navy/20 border-t-navy rounded-full animate-spin"></div>
                ) : (
                  <>
                    {t('admin.login.initialize')} <ChevronRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-white/[0.05] flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/30">
              <ShieldCheck size={16} className="text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{t('admin.login.encrypted')}</span>
            </div>
            <div className="flex items-center gap-3 text-white/30">
              <Zap size={16} className="text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{t('admin.login.mfa')}</span>
            </div>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-[10px] text-white font-black uppercase tracking-[0.4em]"
        >
          Institutional Precision • Cinematic Luxury
        </motion.p>
      </motion.div>

      <style>{`
        .luxury-gradient-text {
          background: linear-gradient(135deg, #C8A96E 0%, #F5E6C8 50%, #C8A96E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}
