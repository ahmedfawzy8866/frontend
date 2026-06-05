"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { I18nProvider, useI18n } from '../../lib/I18nContext';
import LanguageToggle from '../../components/ui/LanguageToggle';
import { SiteConfig } from '../../lib/config';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, Cpu, ShieldCheck, Users, 
  ChevronRight, Database, Globe, Play
} from 'lucide-react';
import dynamic from 'next/dynamic';
import GravityWarp from '../../components/Visuals';

const LiveInventoryMap = dynamic(() => import('../../components/Operations/LiveInventoryMap'), {
  ssr: false,
  loading: () => <div className="map-placeholder">Loading Intelligence Matrix...</div>
});


function LandingContent() {
  const { locale, setLocale } = useI18n();
  const isAr = locale === 'ar';
  const listingsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', v => setScrolled(v > 0.02));
    return unsubscribe;
  }, [scrollYProgress]);


  const scrollToListings = () => {
    listingsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormError('Please enter your full name');
      return;
    }
    if (!formData.phone.match(/^(\+20|0)?1[0-9]{9}$/)) {
      setFormError('Please enter a valid Egyptian phone number (e.g. 01XXXXXXXXX)');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        source: 'landing_master_overhaul',
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setFormError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-container midnight-mode" dir={isAr ? 'rtl' : 'ltr'}>
      <GravityWarp />

      {/* ── Navigation ── */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-left">
            <LanguageToggle onLocaleChange={setLocale} />
            <Link href="#services" className="nav-link">{isAr ? 'خدمات' : 'Services'}</Link>
            <Link href="#listings" className="nav-link">{isAr ? 'قوائم' : 'Listings'}</Link>
          </div>
          <div className="brand-logo-wrap animate-swing">
            <img src="/sierra_blu_logo_dark.png" alt="Sierra AI" className="brand-logo centered" />
            <span className="logo-badge text-metallic">{isAr ? 'أبعد من مجرد وساطة' : 'Beyond Brokerage'}</span>
          </div>
          <div className="nav-right">
            <Link href="#insights" className="nav-link">{isAr ? 'رؤى' : 'Insights'}</Link>
            <Link href="/" className="btn btn-luxury-outline sm dark-glow-btn">
              {isAr ? 'مدخل المستشارين' : 'Advisor Portal'}
            </Link>
          </div>
        </div>
      </nav>

      <header className="hero-section day-hero overflow-hidden">
        <motion.div 
          className="hero-day-bg"
          style={{ scale: heroScale, y: heroY }}
        >
          <div className="overlay-dark bg-[#050B14]/70"></div>
        </motion.div>


        <motion.div 
          className="hero-content master-content relative z-10"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        >
          <div className="hero-badge animate-glow border-[#D4AF37]/30 bg-[#050B14]/60 text-ivory">
            <Play size={10} fill="currentColor" /> {isAr ? 'شاهد الرؤية' : 'WATCH THE VISION'}
          </div>
          <h1 className="hero-title master-title serif text-metallic">
            {isAr ? 'ذكاء في الاختيار... وثقة في القرار' : 'Smarter Decisions. AI-Driven.'}
          </h1>
          <p className="hero-subtext master-subtext text-ivory/80">
            {isAr 
              ? 'سييرا بلو ريلتي — أبعد من مجرد وساطة. ذكاء عقاري مدعوم بالبيانات.' 
              : 'Sierra AI Realty — Beyond Brokerage. Real Estate Intelligence Powered by Data.'}
          </p>
          <div className="hero-cta-group">
            <button className="btn btn-gold btn-lg btn-glow" onClick={scrollToListings}>
              {isAr ? 'استكشاف القوائم' : 'Explore Listings'}
            </button>
            <button className="btn dark-glow-btn btn-lg">
              {isAr ? 'طلب استشارة AI' : 'Request AI Consultation'}
            </button>
          </div>
        </motion.div>
      </header>


      {/* ── Section 2: Featured Listings ── */}
      <section id="listings" ref={listingsRef} className="featured-listings-section scroll-mt">
        <div className="container">
          <div className="section-header-master center">
            <h2 className="serif h1">{isAr ? 'قوائم منسقة' : 'Curated Portfolios'}</h2>
            <p className="sub">{isAr ? 'منازل استثنائية، مطابقة ذكية.' : 'Exceptional Homes, Intelligent Matching.'}</p>
          </div>

          <div className="listings-grid-refined">
            {[
              { 
                name: isAr ? 'سييرا فيو ريزيدنس' : 'Sierra View Residences', 
                loc: 'New Cairo', 
                type: 'Luxury Apartment', 
                price: '4.2M',
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=800&fit=crop' 
              },
              { 
                name: isAr ? 'بالم هيلز إستيتس' : 'Palm Hills Estates', 
                loc: 'West Cairo', 
                type: 'Villa', 
                price: '6.5M',
                img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&h=800&fit=crop' 
              },
              { 
                name: isAr ? 'ليك فيو ريزيدنس' : 'Lakeview Residence', 
                loc: 'New Cairo', 
                type: 'Luxury Apartment', 
                price: '3.8M',
                img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&h=800&fit=crop' 
              },
            ].map((listing, i) => (
              <motion.div 
                key={i} 
                className="listing-card-master sbr-shield-glass group cursor-pointer" 
                whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(201, 168, 76, 0.15)' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="card-media-master overflow-hidden relative h-[400px]">
                  <img 
                    src={listing.img} 
                    alt={listing.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="card-info-master p-8 bg-white/50 backdrop-blur-sm">
                  <div className="info-row flex justify-between items-start mb-3">
                    <div>
                      <h3 className="serif text-2xl text-[#0A1628] font-playfair">{listing.name}</h3>
                      <p className="loc text-[#0A1628]/50 text-sm mt-1">{listing.loc}</p>
                    </div>
                    <span className="price-tag text-[#C9A84C] font-bold text-lg">{listing.price}</span>
                  </div>
                  <div className="type-badge inline-block px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#C9A84C]">{listing.type}</span>
                  </div>
                  <button className="btn-view-prop text-[#0A1628] hover:text-[#C9A84C] font-semibold uppercase text-xs tracking-widest flex items-center gap-2 transition-colors">
                    {isAr ? 'عرض التفاصيل' : 'View Details'} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>
      {/* ── Section 3: The Intelligence Map (Apple Style) ── */}
      <section className="intelligence-map-section">
        <div className="container">
          <div className="map-intro text-center mb-16">
            <div className="badge-luxury">{isAr ? 'بيانات حية' : 'Live Data'}</div>
            <h2 className="serif h1">{isAr ? 'خريطة الذكاء' : 'Intelligence Map'}</h2>
            <p className="text-xl opacity-60">{isAr ? 'خريطة تفاعلية متكاملة لأهم مناطق المربع الذهبي القاهرة الجديدة.' : 'Integrated, interactive map of New Cairo key areas.'}</p>
          </div>
          
          <div className="map-glass-apple luxury-shadow relative rounded-3xl overflow-hidden border border-black/5">
            <div className="live-status-pill absolute top-8 right-8 z-10 bg-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 border border-black/5">
              <span className="pulse-dot w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">{isAr ? 'مباشر من BOS' : 'BOS LIVE SYNC'}</span>
            </div>
            <div className="h-[700px]">
               <LiveInventoryMap isLandingPage={true} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Insights ── */}
      <section id="insights" className="insights-preview-section">
        <div className="container">
          <div className="section-header-master">
            <div className="badge-luxury">{isAr ? 'رؤى عقارية' : 'Market Insights'}</div>
            <h2 className="serif h1">{isAr ? 'آخر التحليلات' : 'Recent Insights'}</h2>
            <p className="text-xl opacity-60 mt-4">{isAr ? 'نشارككم تحديثات عملية وتوجيهات حول العقارات في التجمع الخامس.' : 'We share practical updates and guidance on New Cairo real estate.'}</p>
          </div>

          <div className="insights-grid grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {[
              { title: isAr ? 'أذكى الطرق التي يتبعها المستثمرون في التجمع' : 'How investors approach New Cairo smarter', date: 'Jul 10, 2024', tag: isAr ? 'استثمار' : 'Investing', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800' },
              { title: isAr ? 'ماذا يجب أن يعرف البائعون قبل عرض منازلهم' : 'What sellers should know before listing', date: 'Jun 19, 2025', tag: isAr ? 'عقارات' : 'Real Estate', img: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?q=80&w=800' },
              { title: isAr ? 'لماذا تظل القاهرة الجديدة هي الخيار الأول للسكن' : 'Why New Cairo remains a top choice for living', date: 'Sep 5, 2024', tag: isAr ? 'نمط حياة' : 'Lifestyle', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800' },
            ].map((post, i) => (
              <motion.div key={i} className="insight-card group cursor-pointer" whileHover={{ y: -10 }}>
                <div className="insight-media h-[350px] overflow-hidden rounded-sm mb-6">
                   <img src={post.img} alt="" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                </div>
                <div className="insight-content">
                  <div className="insight-meta flex items-center gap-3 mb-3">
                    <span className="insight-tag text-[10px] font-black uppercase text-gold/80">{post.tag}</span>
                    <span className="w-1 h-1 bg-black/10 rounded-full" />
                    <span className="insight-date text-[11px] opacity-40">{post.date}</span>
                  </div>
                  <h3 className="serif text-2xl leading-snug group-hover:text-gold transition-colors">{post.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Testimonials ── */}
      <section className="testimonials-section py-32 bg-[#050B14]">
        <div className="container">
          <div className="testimonials-grid grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="testimonials-intro">
               <div className="badge-luxury">{isAr ? 'شهادات' : 'Testimonials'}</div>
               <h2 className="serif text-5xl leading-tight">{isAr ? 'ماذا يقول عملاؤنا الفخورون' : 'What our proud clients say'}</h2>
               <div className="nav-controls flex gap-4 mt-12">
                  <button className="btn-nav w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-navy hover:text-white transition-all"><ChevronRight size={20} className="rotate-180" /></button>
                  <button className="btn-nav w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center shadow-lg"><ChevronRight size={20} /></button>
               </div>
            </div>
            
            <div className="lg:col-span-2 flex flex-col md:flex-row gap-8">
               {[
                 { name: isAr ? 'ماريا ثومبسون' : 'Maria Thompson', role: isAr ? 'مشترية سكنية' : 'Residential Buyer', quote: isAr ? 'جعلت سييرا بلو بحثي عن منزلي بسيطاً للغاية. معرفتهم المحلية ساعدتني في حجز المكان المثالي في ميفيدا.' : 'Sierra AI made my home search incredibly simple. Their local knowledge helped us secure the perfect place in Mivida.' },
                 { name: isAr ? 'براين رويز' : 'Brian Ruiz', role: isAr ? 'مستثمر عقاري' : 'Real Estate Investor', quote: isAr ? 'شعرت بالدعم في كل خطوة. النصائح الواضحة والتحديثات المستمرة جعلت التجربة سلسة وخالية من أي ضغوط.' : 'We felt supported through every step. Clear advice, quick updates, and genuine care made the entire experience smooth.' }
               ].map((t, i) => (
                 <motion.div key={i} className="testimonial-card flex-1 sbr-shield-glass p-12 relative shadow-sm hover:shadow-xl transition-shadow duration-500">
                    <div className="quote-icon text-6xl serif text-gold opacity-20 absolute top-8 left-8">“</div>
                    <p className="quote-text text-xl font-medium leading-relaxed relative z-10 italic">"{t.quote}"</p>
                    <div className="user-profile mt-12 flex items-center gap-4">
                       <div className="user-avatar bg-white/5 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center font-bold text-metallic"> {t.name[0]} </div>
                       <div>
                          <h4 className="font-bold text-sm tracking-wide">{t.name}</h4>
                          <span className="text-[10px] uppercase font-black tracking-widest opacity-40">{t.role}</span>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: FAQ ── */}
      <section className="faq-section py-32">
        <div className="container">
           <div className="faq-grid grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="faq-header">
                 <div className="badge-luxury">{isAr ? 'مركز المساعدة' : 'Help Center'}</div>
                 <h2 className="serif text-5xl mb-12">{isAr ? 'الأسئلة الأكثر تكراراً' : 'Frequently Asked Questions'}</h2>
                 <div className="relative group">
                    <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600" className="rounded-3xl w-64 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" alt="Specialist" />
                    <div className="absolute -bottom-6 -right-6 sbr-shield-glass p-6 rounded-2xl shadow-2xl border border-white/5">
                        <p className="text-xs font-bold text-ivory leading-relaxed w-40">{isAr ? 'فريق الدعم متاح على مدار الساعة للإجابة.' : 'Our support team is available 24/7 to assist.'}</p>
                    </div>
                 </div>
              </div>

              <div className="faq-list space-y-2">
                 {[
                   { q: isAr ? 'كيف تبدأ عملية البحث عن وحدات إعادة البيع؟' : 'How does the resale search start?', a: isAr ? 'نقوم أولاً بتحليل محفظة أهدافك الاستثمارية أو السكنية، ثم نقوم بمطابقتها مع أكثر من 1000 وحدة حصرية لدينا.' : 'We first analyze your investment or residential goals, then match them with over 1,000 exclusive units in our platform.' },
                   { q: isAr ? 'ما هي الرسوم التي تتحملونها في الإيجار؟' : 'What are the rental service fees?', a: isAr ? 'نحن نتبع لوائح السوق القياسية ولكن نقدم خدمات إضافية مثل صياغة العقود القانونية والتحقق من المالكين مجاناً.' : 'We follow standard market regulations but offer extras like legal drafting and owner verification at no cost.' },
                   { q: isAr ? 'هل الموقع يغطي التجمع الخامس فقط؟' : 'Do you only cover New Cairo?', a: isAr ? 'تركيزنا الأساسي والحصري هو التجمع الخامس والعاصمة الإدارية لضمان أعلى مستوى من الخبرة والسرعة.' : 'Our primary and exclusive focus is New Cairo and the New Capital to ensure the highest expertise.' }
                 ].map((item, i) => (
                   <div key={i} className="faq-item border-b border-white/5 py-8 group cursor-pointer hover:bg-white/5 transition-colors px-6">
                      <div className="faq-question flex justify-between items-center text-2xl serif text-ivory">
                         <span>{item.q}</span>
                         <div className="faq-icon text-gold opacity-50 text-3xl font-light">+</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ── Section 7: Final CTA ── */}
      <section className="final-cta-master py-32">
        <div className="container">
          <div className="cta-grid-master">
             <div className="cta-text">
                <h2 className="serif h1">{isAr ? 'ابدأ رحلتك العقارية الذكية' : 'Start Your Intelligent Journey'}</h2>
                <p>{isAr ? 'دع الذكاء الاصطناعي يطابقك مع منزلك المثالي.' : 'Let AI match you with your perfect home.'}</p>
             </div>
             <div className="cta-form-box card-glow">
               {submitted ? (
                 <div className="success-msg-master">{isAr ? 'تم الاستلام بنجاح!' : 'Received Successfully!'}</div>
               ) : (
                  <form onSubmit={handleSubmit} className="master-form">
                    <div className="input-group">
                      <input placeholder={isAr ? 'الاسم' : 'Name'} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="input-group">
                      <input placeholder={isAr ? 'الهاتف' : 'Phone'} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                    </div>
                    {formError && (
                      <p className="text-red-400 text-xs mt-1">{formError}</p>
                    )}
                    <button className="btn btn-gold btn-block btn-glow" disabled={loading}>
                      {loading ? (isAr ? 'جاري الإرسال...' : 'SENDING...') : (isAr ? 'تأمين جلسة' : 'SECURE SESSION')}
                    </button>
                  </form>
               )}
             </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="master-footer">
        <div className="container footer-grid-wide">
           <div className="footer-col brand-col">
             <img src="/sierra_blu_logo_dark.png" alt="Sierra AI" className="footer-logo-lg" />
             <p className="tagline">{isAr ? 'سييرا بلو — أبعد من مجرد وساطة.' : 'Sierra AI — Beyond Brokerage.'}</p>
           </div>
           
           <div className="footer-col">
             <h4>{isAr ? 'الخدمات' : 'Services'}</h4>
             <ul>
               <li>{isAr ? 'خدمة فاخرة مخصصة' : 'Personalized Luxury Service'}</li>
               <li>{isAr ? 'تحليل سوق AI' : 'AI-Driven Market Analysis'}</li>
               <li>{isAr ? 'قوائم عقارات حصرية' : 'Exclusive Property Listings'}</li>
             </ul>
           </div>

           <div className="footer-col">
             <h4>{isAr ? 'تواصل' : 'Contact'}</h4>
             <p>{SiteConfig.executive.phone}</p>
             <p>{SiteConfig.executive.email}</p>
           </div>
        </div>
        <div className="footer-bottom">
           <p>© {new Date().getFullYear()} Sierra AI Realty. All Rights Reserved.</p>
        </div>
      </footer>

      <style>{`
        /* --- Master Layout Fixes --- */
        .landing-container { position: relative; overflow: hidden; background: var(--sb-navy-deep); color: var(--sb-ivory); }
        .container { max-width: 1400px; margin: 0 auto; padding: 0 60px; }

        /* --- New Sections Styling --- */
        .badge-luxury { display: inline-block; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: var(--sb-gold); margin-bottom: 20px; position: relative; padding-left: 15px; }
        .badge-luxury::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; background: var(--sb-gold); border-radius: 50%; }
        [dir="rtl"] .badge-luxury { padding-left: 0; padding-right: 15px; }
        [dir="rtl"] .badge-luxury::before { left: auto; right: 0; }

        .insights-preview-section { padding: 120px 0; background: var(--sb-navy-deep); }
        .insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 60px; }
        .insight-card { cursor: pointer; }
        .insight-media { height: 350px; border-radius: 2px; overflow: hidden; margin-bottom: 25px; }
        .insight-media img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%); transition: 0.8s var(--sb-transition); }
        .insight-card:hover img { filter: grayscale(0%); transform: scale(1.05); }
        .insight-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .insight-tag { font-size: 10px; font-weight: 800; text-transform: uppercase; opacity: 0.6; color: var(--sb-gold); }
        .insight-date { font-size: 11px; opacity: 0.4; }
        .insight-content h3 { line-height: 1.3; color: var(--sb-ivory); }

        .testimonials-section { padding: 140px 0; background: var(--sb-navy); }
        .testimonials-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 80px; }
        .btn-nav { width: 45px; height: 45px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); cursor: pointer; transition: 0.3s; color: var(--sb-ivory); }
        .btn-nav.active { background: var(--sb-gold); color: var(--sb-navy-deep); border-color: var(--sb-gold); }
        .testimonial-cards-wrap { display: flex; gap: 30px; }
        .testimonial-card { flex: 1; background: rgba(255,255,255,0.02); padding: 60px; position: relative; border-radius: 2px; border: 1px solid rgba(255,255,255,0.05); }
        .quote-icon { font-size: 6rem; font-family: serif; color: var(--sb-gold); opacity: 0.2; position: absolute; top: 20px; left: 40px; }
        [dir="rtl"] .quote-icon { left: auto; right: 40px; }
        .quote-text { font-size: 1.3rem; line-height: 1.6; font-weight: 500; position: relative; z-index: 1; color: var(--sb-ivory); }

        .faq-section { padding: 140px 0; background: var(--sb-navy-deep); }
        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 100px; }
        .faq-list { display: flex; flex-direction: column; }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.05); }
        .faq-answer { animation: fadeIn 0.5s ease forwards; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 0.6; transform: translateY(0); } }

        @media (max-width: 1000px) {
          .master-title { font-size: 3rem; }
          .cta-grid-master, .listings-grid-refined, .footer-grid-wide, .cta-text h2 { grid-template-columns: 1fr; gap: 40px; }
          .nav-inner { flex-direction: column; gap: 40px; }
          .brand-logo-wrap { position: static; transform: none; }
          .container { padding: 0 30px; }
          .insights-grid, .testimonials-grid, .faq-grid { grid-template-columns: 1fr; }
          .testimonial-cards-wrap { flex-direction: column; }
        }
        
        /* --- Existing Styles --- */
        /* --- Navigation --- */
        .landing-nav { position: fixed; top: 0; width: 100%; z-index: 1000; padding: 40px 0; transition: 0.5s var(--sb-transition); }
        .landing-nav.scrolled { background: rgba(5, 11, 20, 0.9); backdrop-filter: blur(25px); padding: 15px 0; border-bottom: 1px solid rgba(212, 175, 55, 0.1); }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; position: relative; }
        .nav-left, .nav-right { display: flex; align-items: center; gap: 32px; }
        .nav-link { color: var(--sb-ivory); font-weight: 600; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; opacity: 0.8; transition: 0.3s; }
        .nav-link:hover { color: var(--sb-gold); opacity: 1; }
        .brand-logo-wrap { display: flex; flex-direction: column; align-items: center; position: absolute; left: 50%; transform: translateX(-50%); }
        .brand-logo { height: 75px; }
        .logo-badge { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: var(--sb-gold); margin-top: -10px; }

        /* --- Hero Section --- */
        .hero-section { height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; position: relative; }
        .hero-day-bg { position: absolute; inset: 0; z-index: -1; background: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670'); background-size: cover; background-position: center; }
        .overlay-dark { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(5, 11, 20, 0.4), rgba(5, 11, 20, 0.95)); }
        .master-content { max-width: 900px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(5,11,20,0.6); padding: 8px 16px; border-radius: 40px; font-size: 10px; font-weight: 900; letter-spacing: 2px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); color: var(--sb-ivory); border: 1px solid rgba(212,175,55,0.3); }
        .master-title { font-size: 5rem; line-height: 1; margin-bottom: 25px; color: var(--sb-gold); }
        .master-subtext { font-size: 1.4rem; opacity: 0.7; margin-bottom: 40px; font-weight: 500; }
        .hero-cta-group { display: flex; gap: 20px; justify-content: center; }

        /* --- Listings Refinement --- */
        .featured-listings-section { padding: 160px 0; background: var(--sb-navy-deep); }
        .section-header-master { margin-bottom: 80px; }
        .section-header-master h2 { font-size: 3.5rem; margin-bottom: 10px; }
        .section-header-master .sub { font-size: 1.2rem; opacity: 0.6; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--sb-gold); }
        .listings-grid-refined { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        .listing-card-master { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; position: relative; cursor: pointer; transition: 0.5s; }
        .card-media-master { height: 450px; position: relative; overflow: hidden; }
        .card-media-master img { width: 100%; height: 100%; object-fit: cover; transition: 0.8s var(--sb-transition); }
        .listing-card-master:hover img { transform: scale(1.1); }
        .media-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3)); }
        .card-info-master { padding: 30px; }
        .info-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .info-row h3 { font-size: 1.8rem; margin: 0; }
        .price-tag { font-family: var(--font-sans); font-weight: 800; color: var(--sb-gold); font-size: 1.2rem; }
        .loc { font-size: 13px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 25px; }
        .btn-view-prop { background: none; border: none; font-size: 11px; font-weight: 900; letter-spacing: 2px; display: flex; align-items: center; gap: 8px; color: var(--sb-ivory); cursor: pointer; transition: 0.3s; }
        .btn-view-prop:hover { gap: 15px; color: var(--sb-gold); }

        /* --- Map Master --- */
        .intelligence-map-section { padding: 120px 0; background: var(--sb-navy-deep); }
        .map-intro { margin-bottom: 60px; text-align: center; }
        .map-intro h2 { font-size: 3rem; margin-bottom: 10px; }
        .map-intro p { font-size: 1.2rem; opacity: 0.6; }
        .map-glass-apple { padding: 15px; position: relative; height: 700px; }
        .live-status-pill { position: absolute; top: 30px; right: 30px; z-index: 100; background: rgba(5, 11, 20, 0.7); backdrop-filter: blur(10px); padding: 10px 20px; border-radius: 40px; border: 1px solid rgba(34, 197, 94, 0.2); display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 900; color: #22c55e; }
        .pulse-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; }

        /* --- Final CTA Master --- */
        .final-cta-master { padding: 160px 0; }
        .cta-grid-master { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .cta-text h2 { font-size: 4rem; margin-bottom: 20px; line-height: 1.1; }
        .cta-text p { font-size: 1.4rem; opacity: 0.7; }
        .cta-form-box { background: var(--sb-navy); padding: 60px; border-radius: 30px; color: #fff; box-shadow: 0 40px 100px rgba(10, 22, 40, 0.3); border: 1px solid rgba(255,255,255,0.05); }
        .master-form { display: flex; flex-direction: column; gap: 20px; }
        .master-form input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 18px 25px; border-radius: 12px; color: #fff; font-size: 15px; transition: 0.3s; }
        .master-form input:focus { border-color: var(--sb-gold); background: rgba(255,255,255,0.08); }

        /* --- Footer --- */
        .master-footer { background: var(--sb-navy-deep); padding: 100px 0 0; border-top: 1px solid var(--border); }
        .footer-grid-wide { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 80px; padding-bottom: 100px; }
        .footer-logo-lg { height: 80px; margin-bottom: 30px; }
        .footer-col h4 { font-size: 12px; letter-spacing: 2px; margin-bottom: 30px; border-bottom: 2px solid var(--sb-gold); width: fit-content; padding-bottom: 5px; }
        .footer-col ul { list-style: none; padding: 0; }
        .footer-col li { margin-bottom: 15px; font-size: 15px; opacity: 0.6; }
        .footer-bottom { border-top: 1px solid #eee; padding: 40px 0; text-align: center; font-size: 13px; opacity: 0.4; letter-spacing: 1px; }

        /* --- Utility Buttons --- */
        .btn-lg { padding: 18px 45px; font-size: 13px; letter-spacing: 2px; }
        .btn-gold { background: var(--sb-gold); color: #fff; }
        .btn-gold:hover { background: var(--sb-gold-light); transform: translateY(-3px); box-shadow: 0 15px 40px rgba(201, 168, 76, 0.4); }
        .btn-block { width: 100%; }
      `}</style>
    </div>
  );
}

export default function LandingPage() {
  return (
    <I18nProvider>
      <LandingContent />
    </I18nProvider>
  );
}
