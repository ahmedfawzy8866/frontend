'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/I18nContext';
import { motion } from 'framer-motion';

const COMPOUNDS = [
  { name: 'Mivida', zone: '5th Settlement', baseYield: 8.4 },
  { name: 'Lake View', zone: 'New Cairo', baseYield: 7.9 },
  { name: 'Hyde Park', zone: '5th Settlement', baseYield: 7.5 },
  { name: 'Uptown Cairo', zone: 'Mokattam', baseYield: 7.2 },
  { name: 'Mountain View iCity', zone: 'New Cairo', baseYield: 8.1 },
  { name: 'Palm Hills New Cairo', zone: 'New Cairo', baseYield: 7.8 },
  { name: 'Taj City', zone: 'New Cairo', baseYield: 8.5 },
  { name: 'ZED East', zone: 'New Cairo', baseYield: 7.6 },
  { name: 'Eastown', zone: '90th Street', baseYield: 8.2 },
].sort((a, b) => b.baseYield - a.baseYield);

export default function ROIPage() {
  const { lang } = useI18n();
  const isAr = lang === 'ar';
  
  const [price, setPrice] = useState(6000000);
  const [rent, setRent] = useState(38000);
  const [appr, setAppr] = useState(9);

  const formatM = (v: number) => {
    if (v >= 1000000) return `EGP ${(v / 1000000).toFixed(1)}M`;
    return `EGP ${Math.round(v / 1000).toLocaleString()}K`;
  };

  const R = rent * 12;
  const P = price;
  const A = appr / 100;
  
  const gross = P > 0 ? (R / P) * 100 : 0;
  const net = gross * 0.82;
  const fiveYr = P > 0 ? (((R * 5 * 0.82) + P * (Math.pow(1 + A, 5) - 1)) / P) * 100 : 0;
  const payback = net > 0 ? 100 / net : 0;

  const maxY = COMPOUNDS[0].baseYield;

  const t = {
    title: isAr ? 'تحليل العائد الاستثماري (ROI)' : 'Best ROI Analysis',
    desc: isAr ? 'ترتيب الذكاء الاصطناعي لعوائد الإيجار في مجمعات القاهرة الجديدة، مع حاسبة حية للعائد الإجمالي/الصافي والتقدير.' : 'AI-ranked rental yields across New Cairo compounds, with a live gross/net yield and appreciation calculator.',
    leaderboard: isAr ? 'لوحة صدارة العوائد' : 'Yield Leaderboard',
    calculator: isAr ? 'حاسبة العائد' : 'Yield Calculator',
    calcSub: isAr ? 'قدّر عوائدك على وحدة في القاهرة الجديدة.' : 'Estimate returns on a New Cairo unit.',
    priceLabel: isAr ? 'سعر الشراء' : 'Purchase price',
    rentLabel: isAr ? 'الإيجار الشهري' : 'Monthly rent',
    apprLabel: isAr ? 'الزيادة السنوية في القيمة' : 'Annual appreciation',
    grossLabel: isAr ? 'العائد الإجمالي' : 'Gross Yield',
    netLabel: isAr ? 'العائد الصافي (−18%)' : 'Net Yield (−18%)',
    fiveYrLabel: isAr ? 'العائد الكلي في 5 سنوات' : '5-yr Total Return',
    paybackLabel: isAr ? 'سنوات الاسترداد' : 'Payback Years',
    back: isAr ? '← العودة للرئيسية' : '← Back to home',
  };

  return (
    <div className={`min-h-screen bg-[#D5E8E6] dark:bg-[#0D2035] text-[#071422] dark:text-[#EFF8F7] ${isAr ? 'rtl' : 'ltr'} pt-24 pb-20 px-6 font-sans transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-block mb-12 text-[#1B6CA8] dark:text-[#E9C176] hover:underline font-medium text-sm tracking-wide">
          {t.back}
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs uppercase tracking-widest text-[#1B6CA8] dark:text-[#E9C176] font-bold mb-4 block">
            {isAr ? 'دعم الذكاء الاصطناعي · ذكاء الاستثمار' : 'AI Support · Investment Intelligence'}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">{t.title}</h1>
          <p className="text-lg opacity-70 leading-relaxed">{t.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          
          {/* Leaderboard */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/50 dark:bg-white/5 border border-[#1B6CA8]/20 dark:border-[#E9C176]/20 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm"
          >
            <div className="p-6 md:p-8 border-b border-[#1B6CA8]/20 dark:border-[#E9C176]/20">
              <h3 className="font-serif text-2xl font-semibold m-0">{t.leaderboard}</h3>
            </div>
            <div>
              {COMPOUNDS.map((c, i) => (
                <div key={c.name} className="grid grid-cols-[30px_1.4fr_1fr_1fr] gap-3 items-center p-4 md:p-6 border-b border-[#1B6CA8]/10 dark:border-[#E9C176]/10 last:border-0 hover:bg-[#1B6CA8]/5 dark:hover:bg-[#E9C176]/5 transition-colors">
                  <div className="text-sm font-bold text-[#C8961A] dark:text-[#E9C176]">{i + 1}</div>
                  <div>
                    <div className="font-semibold text-[15px]">{c.name}</div>
                    <div className="text-xs opacity-60 mt-1">{c.zone}</div>
                  </div>
                  <div className="h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden" dir="ltr">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(c.baseYield / maxY) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#E9C176] to-[#C8961A]"
                    />
                  </div>
                  <div className="text-right font-bold text-base font-mono">
                    {c.baseYield.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calculator */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/50 dark:bg-white/5 border border-[#1B6CA8]/20 dark:border-[#E9C176]/20 rounded-2xl p-6 md:p-8 shadow-sm backdrop-blur-sm sticky top-24"
          >
            <h3 className="font-serif text-2xl font-semibold mb-2">{t.calculator}</h3>
            <div className="text-sm opacity-70 mb-8">{t.calcSub}</div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs uppercase tracking-wider opacity-70 mb-4">
                  <span>{t.priceLabel}</span>
                  <b className="text-sm text-[#C8961A] dark:text-[#E9C176] font-bold">{formatM(price)}</b>
                </div>
                <input 
                  type="range" 
                  min="1500000" max="30000000" step="100000" 
                  value={price} 
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-black/10 dark:bg-white/10 outline-none cursor-pointer accent-[#C8961A] dark:accent-[#E9C176]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs uppercase tracking-wider opacity-70 mb-4">
                  <span>{t.rentLabel}</span>
                  <b className="text-sm text-[#C8961A] dark:text-[#E9C176] font-bold">EGP {rent.toLocaleString()}</b>
                </div>
                <input 
                  type="range" 
                  min="5000" max="250000" step="1000" 
                  value={rent} 
                  onChange={e => setRent(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-black/10 dark:bg-white/10 outline-none cursor-pointer accent-[#C8961A] dark:accent-[#E9C176]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs uppercase tracking-wider opacity-70 mb-4">
                  <span>{t.apprLabel}</span>
                  <b className="text-sm text-[#C8961A] dark:text-[#E9C176] font-bold">{appr}%</b>
                </div>
                <input 
                  type="range" 
                  min="0" max="20" step="0.5" 
                  value={appr} 
                  onChange={e => setAppr(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-black/10 dark:bg-white/10 outline-none cursor-pointer accent-[#C8961A] dark:accent-[#E9C176]"
                />
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#1B6CA8]/20 dark:border-[#E9C176]/20 grid grid-cols-2 gap-4">
              <div className="bg-white/60 dark:bg-[#122A47]/60 rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#C8961A] dark:text-[#E9C176] font-mono mb-1">{gross.toFixed(1)}%</div>
                <div className="text-[10px] uppercase tracking-wider opacity-60">{t.grossLabel}</div>
              </div>
              <div className="bg-white/60 dark:bg-[#122A47]/60 rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#C8961A] dark:text-[#E9C176] font-mono mb-1">{net.toFixed(1)}%</div>
                <div className="text-[10px] uppercase tracking-wider opacity-60">{t.netLabel}</div>
              </div>
              <div className="bg-white/60 dark:bg-[#122A47]/60 rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#C8961A] dark:text-[#E9C176] font-mono mb-1">{fiveYr.toFixed(0)}%</div>
                <div className="text-[10px] uppercase tracking-wider opacity-60">{t.fiveYrLabel}</div>
              </div>
              <div className="bg-white/60 dark:bg-[#122A47]/60 rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#C8961A] dark:text-[#E9C176] font-mono mb-1">{payback.toFixed(0)}</div>
                <div className="text-[10px] uppercase tracking-wider opacity-60">{t.paybackLabel}</div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
