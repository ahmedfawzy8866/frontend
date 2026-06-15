"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowUpRight, MapPin, Globe, Shield, User, Menu, X, Sparkles, Star, TrendingUp, Building2, Phone } from 'lucide-react';
import BrandLogo from '../ui/BrandLogo';
import { collection, query, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { COLLECTIONS, Unit } from '../../lib/models/schema';

interface PropertyCardProps {
  image: string;
  location: string;
  title: string;
  price: string;
  index: number;
}

const PropertyCard = ({ image, location, title, price, index }: PropertyCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    viewport={{ once: true, margin: "-50px" }}
    className="group relative cursor-pointer w-full aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl"
  >
    {/* Cinematic Image with slow zoom on hover */}
    <img 
      src={image} 
      alt={title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
      onError={(e) => {
        // Fallback if image fails to load
        e.currentTarget.src = "/penthouse.png";
      }}
    />
    
    {/* Deep Editorial Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-[#0A1628]/10 opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>

    {/* Content Container */}
    <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between">
      {/* Top Badge */}
      <div className="flex justify-between items-start">
        <span className="px-4 py-1.5 bg-[#F4F0E8]/10 border border-[#F4F0E8]/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
          High ROI Gem
        </span>
      </div>

      <div className="relative z-10 transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-4">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold mb-3">
          <MapPin size={12} /> {location}
        </div>
        <h3 className="text-3xl lg:text-4xl font-medium text-[#F4F0E8] leading-tight serif mb-2">
          {title}
        </h3>
        <p className="text-xl text-[#F4F0E8]/70 font-light tracking-wide mb-8">
          {price}
        </p>
        
        {/* Animated Hover Action */}
        <div className="overflow-hidden absolute bottom-[-30px] left-0">
          <div className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest text-[#C9A84C] translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)]">
            Explore Property <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function LightLandingScreen({ onEnterPortal }: { onEnterPortal: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [properties, setProperties] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(collection(db, COLLECTIONS.units), limit(6));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Unit));
        setProperties(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Static Fallbacks incase backend is empty or loading
  const fallbackProperties = [
    {
      image: "/estate.png",
      location: "New Cairo | District 5",
      title: "The Glass Pavilion",
      price: "EGP 42,500,000"
    },
    {
      image: "/villa.png",
      location: "New Cairo | Katameya Heights",
      title: "Azure Shore Villa",
      price: "EGP 68,000,000"
    },
    {
      image: "/penthouse.png",
      location: "New Cairo | Mivida",
      title: "The Minimalist Estate",
      price: "EGP 31,200,000"
    }
  ];

  const displayProperties = (properties.length > 0 && !loading) 
    ? properties.slice(0, 3).map(p => ({
        image: p.featuredImage || p.images?.[0] || "/penthouse.png",
        location: `New Cairo | ${p.compound || p.location || 'Premium Location'}`,
        title: p.title || 'Luxury Estate',
        price: `EGP ${p.price?.toLocaleString() || 'Contact for Price'}`
      }))
    : fallbackProperties;

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#0A1628] overflow-x-hidden selection:bg-[#C9A84C]/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 lg:px-12 py-6 flex items-center justify-between ${isScrolled ? 'bg-[#F4F0E8]/90 backdrop-blur-xl py-4 shadow-sm' : ''}`}>
        <BrandLogo size="md" themeOverride="light" />
        
        <div className="hidden md:flex items-center gap-10">
          {['Portfolio', 'Advisory', 'Philosophy', 'Intelligence'].map((item) => (
            <a key={item} href="#" className="text-[13px] font-bold uppercase tracking-widest text-[#0A1628]/70 hover:text-[#C9A84C] transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onEnterPortal}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#0A1628] text-[#F4F0E8] rounded-full text-[12px] font-bold uppercase tracking-wider hover:bg-[#C9A84C] transition-all hover:scale-105 active:scale-95"
          >
            Advisor Portal <ChevronRight size={14} />
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 md:hidden text-[#0A1628]"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#F4F0E8] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <BrandLogo size="md" themeOverride="light" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#0A1628]">
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {['Portfolio', 'Advisory', 'Philosophy', 'Intelligence'].map((item, i) => (
                <motion.a 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  key={item} 
                  href="#" 
                  className="text-4xl serif font-medium text-[#0A1628]"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-[#0A1628]/10">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnterPortal();
                }}
                className="w-full py-5 bg-[#0A1628] text-[#F4F0E8] rounded-2xl text-lg font-bold uppercase tracking-widest flex items-center justify-center gap-3"
              >
                Advisor Portal <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto overflow-hidden">
        {/* Parallax 'S' Background */}
        <motion.div 
          style={{ 
            position: 'absolute',
            top: '20%',
            right: '-5%',
            fontSize: '60vw',
            fontWeight: 800,
            lineHeight: 1,
            color: '#0A1628',
            opacity: 0.03,
            pointerEvents: 'none',
            zIndex: 0,
            fontFamily: 'var(--font-serif)'
          }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 1, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          S
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/5 text-[#C9A84C] text-[11px] font-bold uppercase tracking-widest mb-8">
                <Sparkles size={14} /> New Cairo's Largest Collection
              </div>
              
              <h1 className="text-[11vw] lg:text-[6.5vw] leading-[1] font-medium serif text-[#0A1628] tracking-tighter mb-8">
                The Ultimate <br />
                <span className="text-[#C9A84C] italic pr-4">Real Estate Gathering.</span>
              </h1>
              <p className="text-lg lg:text-xl text-[#0A1628]/70 max-w-2xl leading-relaxed mb-12 font-light">
                The premier platform for rent and resale specialized in New Cairo compounds. 
                We leverage AI to analyze market data, refine it, and deliver the finest hidden gems and comfortable luxury villas at unbeatable prices.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto px-10 py-5 bg-[#0A1628] text-[#F4F0E8] rounded-full text-[14px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-[#0A1628]/20"
                >
                  Explore New Cairo <ArrowUpRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#0A1628] border-8 border-[#F4F0E8] flex items-center justify-center"
            >
              {/* Fallback image if media doesn't load, but we point to the uploaded one */}
              <img 
                src="/media__1776833126231.png" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-50"
                alt="Sierra AI Identity"
                onError={(e) => {
                    // Fallback to penthouse if the specific media artifact isn't right
                    e.currentTarget.src = "/penthouse.png";
                    e.currentTarget.className = "absolute inset-0 w-full h-full object-cover";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent"></div>
              
              {/* Overlaid Gold Emphasis */}
              <div className="relative z-10 text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#C9A84C]/20 backdrop-blur-xl border border-[#C9A84C]/50 flex items-center justify-center">
                  <img src="/media__1776831969777.png" alt="Gold Element" className="w-16 h-16 object-contain drop-shadow-2xl" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
                <h3 className="text-3xl serif text-[#F4F0E8] mb-2">Quiet Luxury</h3>
                <p className="text-[#C9A84C] uppercase tracking-widest text-xs font-bold">Unlocking The Fifth Settlement</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-[#0A1628]/5 bg-[#EBE7DE]/30">
        <div className="px-6 lg:px-12 max-w-[1600px] mx-auto overflow-hidden">
          <div className="flex flex-wrap justify-between items-center gap-8 lg:gap-20 opacity-40 grayscale">
            {['Emaar', 'SODIC', 'Mountain View', 'Palm Hills', 'Orascom'].map((brand) => (
              <span key={brand} className="text-xl font-bold uppercase tracking-widest serif">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] block mb-4"
            >
              Curated Selection
            </motion.span>
            <h2 className="text-4xl lg:text-6xl serif font-medium text-[#0A1628]">Featured Assets</h2>
          </div>
          <button className="flex items-center gap-2 text-[#0A1628] font-bold uppercase tracking-widest text-[12px] group">
            View All Listings <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {displayProperties.map((prop, i) => (
            <PropertyCard key={i} {...prop} index={i} />
          ))}
        </div>
      </section>

      {/* The Intelligence Section */}
      <section className="py-24 md:py-32 bg-[#0A1628] text-[#F4F0E8] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4299E1]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="px-6 lg:px-12 max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] block mb-4"
              >
                Intelligence Driven
              </motion.span>
              <h2 className="text-4xl lg:text-6xl serif font-medium mb-8 leading-[1.1]">The Art of <br />Institutional Precision.</h2>
              <p className="text-lg md:text-xl text-[#F4F0E8]/60 leading-relaxed mb-12 font-light max-w-lg">
                Behind the visual elegance lies our proprietary intelligence engine. We normalize real-time data from 1,000+ sources to give our clients an unfair advantage in New Cairo's market.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="text-3xl font-bold serif text-[#C9A84C]">1.2k+</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">Live Assets tracked</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold serif text-[#C9A84C]">98%</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-40">Match Fidelity</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: <Globe size={24} />, title: "AI-Powered Access", desc: "Instantly filtering the noise to bring you the best opportunities." },
                { icon: <Shield size={24} />, title: "Secure Advisory", desc: "Privacy-first concierge services for rent and resale." },
                { icon: <User size={24} />, title: "Human Touch", desc: "The perfect synthesis of neural matching and professional instinct." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#C9A84C]/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl serif mb-3">{feature.title}</h3>
                  <p className="text-[#F4F0E8]/50 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 md:py-20 px-6 lg:px-12 bg-[#F4F0E8] border-t border-[#0A1628]/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-12 md:gap-16">
            <div className="max-w-md">
              <BrandLogo size="lg" themeOverride="light" />
              <p className="mt-8 text-[#0A1628]/60 leading-relaxed italic serif text-lg">
                "Real estate in New Cairo is no longer just about locations; it is about the synthesis of data, desire, and design."
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-24">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0A1628]/40 mb-6">Discovery</h4>
                <ul className="space-y-4 text-[13px] font-bold uppercase tracking-widest">
                  <li><a href="#" className="hover:text-[#C9A84C] transition-colors">Residential</a></li>
                  <li><a href="#" className="hover:text-[#C9A84C] transition-colors">Commercial</a></li>
                  <li><a href="#" className="hover:text-[#C9A84C] transition-colors">Investment</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0A1628]/40 mb-6">Company</h4>
                <ul className="space-y-4 text-[13px] font-bold uppercase tracking-widest">
                  <li><a href="#" className="hover:text-[#C9A84C] transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-[#C9A84C] transition-colors">Advisors</a></li>
                  <li><a href="#" className="hover:text-[#C9A84C] transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 md:mt-20 pt-8 border-t border-[#0A1628]/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="text-[11px] uppercase tracking-widest font-bold text-[#0A1628]/40">
              © 2026 Sierra AI Realty. All Rights Reserved.
            </div>
            <div className="flex gap-8 text-[11px] uppercase tracking-widest font-bold text-[#0A1628]/40">
              <a href="#" className="hover:text-[#0A1628]">Privacy Policy</a>
              <a href="#" className="hover:text-[#0A1628]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

