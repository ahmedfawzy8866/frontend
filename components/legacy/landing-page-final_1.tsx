'use client';
import React, { useState, useEffect, useRef, CSSProperties } from 'react';

// ══════════════════════════════════════════════════════════
//  DESIGN TOKENS
// ══════════════════════════════════════════════════════════
const G  = '#E9C176';
const G2 = '#C8961A';

const THEMES = {
  dark: {
    bg: '#071422', bg2: '#0A1E35', bgAlt: '#050B14',
    surface: 'rgba(255,255,255,0.04)', surfaceHover: 'rgba(233,193,118,0.08)',
    card: '#0A1E35', cardBorder: 'rgba(233,193,118,0.08)',
    border: 'rgba(233,193,118,0.15)',
    text: '#EFF8F7', textSub: 'rgba(239,248,247,0.6)', textMuted: 'rgba(239,248,247,0.32)',
    navBg: 'rgba(7,20,34,0.96)', heroBg: '#050B14',
  },
  light: {
    bg: '#EFF8F7', bg2: '#FFFFFF', bgAlt: '#DFF1EE',
    surface: 'rgba(27,108,168,0.05)', surfaceHover: 'rgba(233,193,118,0.10)',
    card: '#FFFFFF', cardBorder: 'rgba(27,108,168,0.08)',
    border: 'rgba(27,108,168,0.12)',
    text: '#071422', textSub: 'rgba(7,20,34,0.60)', textMuted: 'rgba(7,20,34,0.35)',
    navBg: 'rgba(239,248,247,0.97)', heroBg: '#DFF1EE',
  },
};

// ══════════════════════════════════════════════════════════
//  COPY  (EN / AR)
// ══════════════════════════════════════════════════════════
const COPY = {
  en: {
    dir: 'ltr' as CSSProperties['direction'],
    brand: 'Sierra AI', sub: 'REALTY',
    tagline: 'AI-POWERED REAL ESTATE INTELLIGENCE',
    nav: ['Properties','Intelligence','About','Contact'],
    cta: 'Enter Portal',
    heroTag: 'Beyond Brokerage',
    heroH1a: 'Smarter', heroH1b: 'Decisions.', heroItalic: 'AI\u2011Driven.',
    heroSub: 'The Real in Real Estate',
    heroDesc: "Exceptional homes, intelligently matched. We connect discerning investors with Egypt's finest properties \u2014 curated by humans, powered by AI.",
    btnDiscover: 'Explore Properties', btnView: 'Meet Sierra AI',
    stats: [['1,200+','Properties'],['98%','Match Accuracy'],['8+','Compounds'],['4s','Avg. Response']],
    secListings: 'Exclusive Listings', h2Listings: 'Homes worth knowing.', viewAll: 'View All \u2192',
    beds: 'bed', baths: 'bath',
    secWhy: 'Why Sierra AI', h2Why: 'The Sierra AI Difference',
    why: [
      { icon:'◆', title:'Curated Selection',  desc:'Every listing is personally vetted by our senior advisors. No overpriced inventory — only properties worth your attention.' },
      { icon:'◈', title:'Smart Investment',    desc:'AI-driven ROI analysis, market comparison, and growth corridor mapping. Decisions backed by data, not guesswork.' },
      { icon:'◉', title:'Trusted Guidance',    desc:'From first inquiry to final signature, a dedicated advisor who knows your goals and answers in 4 seconds.' },
    ],
    secMap: 'Market Intelligence', mapH1: 'New Cairo', mapH2: 'Investment Map',
    mapDesc: "Real-time data across New Cairo's premium zones. Track growth corridors, rental yields, and exclusive off-market signals.",
    zones: [
      { area:'Fifth Settlement', stat:'Growth +12%', color:'#4ECDC4' },
      { area:'Madinaty',         stat:'High Demand', color:G },
      { area:'Mountain View',    stat:'Yield 8%',    color:'#7EA8B4' },
      { area:'Mostakbal City',   stat:'Off\u2011Market', color:'#C084FC' },
    ],
    mapBtn: 'Explore AI Insights \u2192',
    secAI: 'Meet Sierra', aiH: 'Your AI Real Estate Consultant',
    aiSub: 'First Official AI Real Estate Bot Consultant in Egypt',
    aiDesc: 'Sierra is always on — analyzing market data, answering your questions, and matching you with properties that fit your exact criteria.',
    aiCTA: 'Start on Telegram \u2192',
    aiFeatures: ['Instant property matching','Market analytics & ROI','Arabic & English support','24/7 availability'],
    aiChat: [
      { from:'user', text:'Looking for a 4\u2011bed villa under 15M EGP in Fifth Settlement' },
      { from:'bot',  text:'Found 7 matching properties. Top pick: Villa Lumière — 5 beds, 480 m², EGP 14.2M. ROI: 8.3% annual yield. Shall I send the full report?' },
    ],
    secTesti: 'Client Stories', h2Testi: 'What our clients say',
    testimonials: [
      { q:"Sierra matched me with a villa I hadn't even considered. The AI understood my investment criteria better than I explained them.", name:'Ahmed Fawzy',  role:'Investor · Cairo',               i:'AF' },
      { q:"A question at 2am, answered in seconds. That's not service — that's a different category.",                                     name:'Layla Hassan', role:'Buyer · Dubai',                   i:'LH' },
      { q:'We found our compound home in 48 hours. The filtering, the data, the advisor — everything worked like it was built for us.',    name:'Omar Mansour', role:'Family Buyer · Fifth Settlement', i:'OM' },
    ],
    ctaTag: 'Find Your Place', ctaH: 'Find Your Place in New Cairo',
    ctaSub: 'Leave your details — a Sierra advisor reaches out within 4 seconds.',
    formName: 'Your name', formPhone: 'Mobile number', formSubmit: 'Get in Touch',
    formSuccess: 'Thank you! A Sierra advisor will reach out within 4 seconds.',
    footDesc: 'Beyond Brokerage. AI-powered real estate intelligence for discerning investors in New Cairo and beyond.',
    footCols: [
      { title:'NAVIGATE', links:['Properties','Intelligence','About Us','Contact'] },
      { title:'MARKETS',  links:['New Cairo','Fifth Settlement','Madinaty','Mostakbal City'] },
    ],
    copyright: '\u00a9 2026 Sierra AI Realty. All rights reserved.',
    legal: ['Privacy Policy','Terms of Service'],
  },
  ar: {
    dir: 'rtl' as CSSProperties['direction'],
    brand: '\u0633\u064a\u064a\u0631\u0627 \u0628\u0644\u0648', sub: '\u0644\u0644\u0639\u0642\u0627\u0631\u0627\u062a',
    tagline: '\u0630\u0643\u0627\u0621 \u0639\u0642\u0627\u0631\u064a \u0645\u062f\u0639\u0648\u0645 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a',
    nav: ['\u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a','\u0627\u0644\u0630\u0643\u0627\u0621','\u0639\u0646\u0651\u0627','\u0627\u062a\u0635\u0644'],
    cta: '\u0627\u0644\u062f\u062e\u0648\u0644 \u0644\u0644\u0628\u0648\u0627\u0628\u0629',
    heroTag: '\u0623\u0628\u0639\u062f \u0645\u0646 \u0627\u0644\u0648\u0633\u0627\u0637\u0629',
    heroH1a: '\u0642\u0631\u0627\u0631\u0627\u062a', heroH1b: '\u0623\u0630\u0643\u0649.', heroItalic: '\u0645\u062f\u0639\u0648\u0645\u0629 \u0628\u0627\u0644\u0630\u0643\u0627\u0621.',
    heroSub: '\u0627\u0644\u062d\u0642\u064a\u0642\u064a \u0641\u064a \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a',
    heroDesc: '\u0645\u0646\u0627\u0632\u0644 \u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0629\u060c \u0645\u0637\u0627\u0628\u0642\u0629 \u0630\u0643\u064a\u0629. \u0646\u0631\u0628\u0637 \u0627\u0644\u0645\u0633\u062a\u062b\u0645\u0631\u064a\u0646 \u0628\u0623\u0641\u062e\u0631 \u0639\u0642\u0627\u0631\u0627\u062a \u0645\u0635\u0631.',
    btnDiscover: '\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a', btnView: '\u062a\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0633\u064a\u064a\u0631\u0627',
    stats: [['\u061a\u0661\u0662\u0660\u0660+','\u0639\u0642\u0627\u0631'],['\u061a\u0669\u0668\u066a','\u062f\u0642\u0629 \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629'],['\u061a\u0668+','\u0643\u0645\u0628\u0627\u0648\u0646\u062f'],['\u061a\u0664\u062b','\u0645\u062a\u0648\u0633\u0637 \u0627\u0644\u0631\u062f']],
    secListings: '\u0642\u0648\u0627\u0626\u0645 \u062d\u0635\u0631\u064a\u0629', h2Listings: '\u0645\u0646\u0627\u0632\u0644 \u062a\u0633\u062a\u062d\u0642 \u0627\u0644\u0627\u0647\u062a\u0645\u0627\u0645.', viewAll: '\u2190 \u0639\u0631\u0636 \u0627\u0644\u0643\u0644',
    beds: '\u063a\u0631\u0641', baths: '\u062d\u0645\u0627\u0645\u0627\u062a',
    secWhy: '\u0644\u0645\u0627\u0630\u0627 \u0633\u064a\u064a\u0631\u0627 \u0628\u0644\u0648', h2Why: '\u0627\u0644\u0641\u0627\u0631\u0642 \u0641\u064a \u0633\u064a\u064a\u0631\u0627 \u0628\u0644\u0648',
    why: [
      { icon:'◆', title:'\u0627\u062e\u062a\u064a\u0627\u0631 \u0645\u0646\u062a\u0642\u0649',    desc:'\u0643\u0644 \u0642\u0627\u0626\u0645\u0629 \u064a\u0631\u0627\u062c\u0639\u0647\u0627 \u0645\u0633\u062a\u0634\u0627\u0631\u0648\u0646\u0627 \u0634\u062e\u0635\u064a\u0627\u064b.' },
      { icon:'◈', title:'\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0630\u0643\u064a',           desc:'\u062a\u062d\u0644\u064a\u0644 \u0639\u0627\u0626\u062f \u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a.' },
      { icon:'◉', title:'\u062a\u0648\u062c\u064a\u0647 \u0645\u0648\u062b\u0648\u0642',          desc:'\u0645\u0633\u062a\u0634\u0627\u0631 \u0645\u062e\u0635\u0635 \u064a\u0639\u0631\u0641 \u0623\u0647\u062f\u0627\u0641\u0643.' },
    ],
    secMap: '\u0630\u0643\u0627\u0621 \u0627\u0644\u0633\u0648\u0642', mapH1: '\u0627\u0644\u0642\u0627\u0647\u0631\u0629 \u0627\u0644\u062c\u062f\u064a\u062f\u0629', mapH2: '\u062e\u0631\u064a\u0637\u0629 \u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631',
    mapDesc: '\u0628\u064a\u0627\u0646\u0627\u062a \u0641\u0648\u0631\u064a\u0629 \u0639\u0628\u0631 \u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0627\u0644\u0645\u0645\u064a\u0632\u0629.',
    zones: [
      { area:'\u0627\u0644\u062a\u062c\u0645\u0639 \u0627\u0644\u062e\u0627\u0645\u0633', stat:'\u0646\u0645\u0648 +\u061a\u0661\u0662\u066a', color:'#4ECDC4' },
      { area:'\u0645\u062f\u064a\u0646\u062a\u064a',                                      stat:'\u0637\u0644\u0628 \u0645\u0631\u062a\u0641\u0639',  color:G },
      { area:'\u0645\u0627\u0648\u0646\u062a\u0646 \u0641\u064a\u0648',                   stat:'\u0639\u0627\u0626\u062f \u061a\u0668\u066a',         color:'#7EA8B4' },
      { area:'\u0645\u0633\u062a\u0642\u0628\u0644 \u0633\u064a\u062a\u064a',             stat:'\u062e\u0627\u0631\u062c \u0627\u0644\u0633\u0648\u0642', color:'#C084FC' },
    ],
    mapBtn: '\u2190 \u0627\u0633\u062a\u0643\u0634\u0641 \u0631\u0624\u0649 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a',
    secAI: '\u062a\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0633\u064a\u064a\u0631\u0627', aiH: '\u0645\u0633\u062a\u0634\u0627\u0631\u062a\u0643 \u0627\u0644\u0639\u0642\u0627\u0631\u064a\u0629 \u0627\u0644\u0630\u0643\u064a\u0629',
    aiSub: '\u0623\u0648\u0644 \u0628\u0648\u062a \u0627\u0633\u062a\u0634\u0627\u0631\u064a \u0639\u0642\u0627\u0631\u064a \u0631\u0633\u0645\u064a \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0641\u064a \u0645\u0635\u0631',
    aiDesc: '\u0633\u064a\u064a\u0631\u0627 \u062a\u0639\u0645\u0644 \u0639\u0644\u0649 \u0645\u062f\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629 \u2014 \u062a\u062d\u0644\u0644 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0633\u0648\u0642\u060c \u062a\u062c\u064a\u0628 \u0623\u0633\u0626\u0644\u062a\u0643.',
    aiCTA: '\u0627\u0628\u062f\u0623 \u0639\u0644\u0649 \u062a\u064a\u0644\u064a\u062c\u0631\u0627\u0645 \u2190',
    aiFeatures: ['\u0645\u0637\u0627\u0628\u0642\u0629 \u0641\u0648\u0631\u064a\u0629 \u0644\u0644\u0639\u0642\u0627\u0631\u0627\u062a','\u062a\u062d\u0644\u064a\u0644\u0627\u062a \u0627\u0644\u0633\u0648\u0642 \u0648\u0639\u0627\u0626\u062f \u0627\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631','\u062f\u0639\u0645 \u0639\u0631\u0628\u064a \u0648\u0625\u0646\u062c\u0644\u064a\u0632\u064a','\u0645\u062a\u0627\u062d \u061a\u0662\u0664/\u061a\u0667'],
    aiChat: [
      { from:'user', text:'\u0628\u062f\u0648\u0631 \u0639\u0644\u0649 \u0641\u064a\u0644\u0627 \u0664 \u063a\u0631\u0641 \u0623\u0642\u0644 \u0645\u0646 \u061a\u0661\u0665\u0645 \u0641\u064a \u0627\u0644\u062a\u062c\u0645\u0639 \u0627\u0644\u062e\u0627\u0645\u0633' },
      { from:'bot',  text:'\u0648\u062c\u062f\u062a \u061a\u0667 \u0639\u0642\u0627\u0631\u0627\u062a. \u0623\u0641\u0636\u0644 \u062e\u064a\u0627\u0631: \u0641\u064a\u0644\u0627 \u0644\u0648\u0645\u064a\u064a\u0631 \u2014 \u061a\u0665 \u063a\u0631\u0641\u060c \u061a\u0664\u0668\u0660\u0645\u00b2\u060c \u061a\u0661\u0664.\u0662\u0645 \u062c.\u0645. \u0639\u0627\u0626\u062f: \u061a\u0668.\u0663\u066a \u0633\u0646\u0648\u064a\u0627\u064b.' },
    ],
    secTesti: '\u0642\u0635\u0635 \u0639\u0645\u0644\u0627\u0626\u0646\u0627', h2Testi: '\u0645\u0627\u0630\u0627 \u064a\u0642\u0648\u0644 \u0639\u0645\u0644\u0627\u0624\u0646\u0627',
    testimonials: [
      { q:'\u0633\u064a\u064a\u0631\u0627 \u0637\u0627\u0628\u0642\u062a\u0646\u064a \u0645\u0639 \u0641\u064a\u0644\u0627 \u0644\u0645 \u0623\u0643\u0646 \u0644\u0623\u0641\u0643\u0631 \u0641\u064a\u0647\u0627.', name:'\u0623\u062d\u0645\u062f \u0641\u0648\u0632\u064a',  role:'\u0645\u0633\u062a\u062b\u0645\u0631 · \u0627\u0644\u0642\u0627\u0647\u0631\u0629',           i:'AF' },
      { q:'\u0633\u0624\u0627\u0644 \u0627\u0644\u0633\u0627\u0639\u0629 \u061a\u0662 \u0635\u0628\u0627\u062d\u0627\u064b\u060c \u0648\u0627\u0644\u0631\u062f \u0641\u064a \u062b\u0648\u0627\u0646\u064d.',                            name:'\u0644\u064a\u0644\u0649 \u062d\u0633\u0646',  role:'\u0645\u0634\u062a\u0631\u064a\u0629 · \u062f\u0628\u064a',              i:'LH' },
      { q:'\u0648\u062c\u062f\u0646\u0627 \u0645\u0646\u0632\u0644 \u0627\u0644\u0643\u0645\u0628\u0627\u0648\u0646\u062f \u0641\u064a \u061a\u0664\u0668 \u0633\u0627\u0639\u0629.',                                                    name:'\u0639\u0645\u0631 \u0645\u0646\u0635\u0648\u0631', role:'\u0645\u0634\u062a\u0631\u064a \u0639\u0627\u0626\u0644\u064a · \u0627\u0644\u062a\u062c\u0645\u0639 \u0627\u0644\u062e\u0627\u0645\u0633', i:'OM' },
    ],
    ctaTag: '\u0627\u0628\u062d\u062b \u0639\u0646 \u0645\u0643\u0627\u0646\u0643', ctaH: '\u0627\u0628\u062d\u062b \u0639\u0646 \u0645\u0643\u0627\u0646\u0643 \u0641\u064a \u0627\u0644\u0642\u0627\u0647\u0631\u0629 \u0627\u0644\u062c\u062f\u064a\u062f\u0629',
    ctaSub: '\u0627\u062a\u0631\u0643 \u0628\u064a\u0627\u0646\u0627\u062a\u0643 \u2014 \u0645\u0633\u062a\u0634\u0627\u0631 \u0633\u064a\u064a\u0631\u0627 \u0633\u064a\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u062e\u0644\u0627\u0644 \u061a\u0664 \u062b\u0648\u0627\u0646\u064d.',
    formName: '\u0627\u0633\u0645\u0643', formPhone: '\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0628\u0627\u064a\u0644', formSubmit: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
    formSuccess: '\u0634\u0643\u0631\u0627\u064b! \u0645\u0633\u062a\u0634\u0627\u0631 \u0633\u064a\u064a\u0631\u0627 \u0633\u064a\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u062e\u0644\u0627\u0644 \u061a\u0664 \u062b\u0648\u0627\u0646\u064d.',
    footDesc: '\u0623\u0628\u0639\u062f \u0645\u0646 \u0627\u0644\u0648\u0633\u0627\u0637\u0629. \u0630\u0643\u0627\u0621 \u0639\u0642\u0627\u0631\u064a \u0645\u062f\u0639\u0648\u0645 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a.',
    footCols: [
      { title:'\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u062a\u0646\u0642\u0644', links:['\u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062a','\u0627\u0644\u0630\u0643\u0627\u0621','\u0639\u0646\u0651\u0627','\u0627\u062a\u0635\u0644'] },
      { title:'\u0627\u0644\u0623\u0633\u0648\u0627\u0642',  links:['\u0627\u0644\u0642\u0627\u0647\u0631\u0629 \u0627\u0644\u062c\u062f\u064a\u062f\u0629','\u0627\u0644\u062a\u062c\u0645\u0639 \u0627\u0644\u062e\u0627\u0645\u0633','\u0645\u062f\u064a\u0646\u062a\u064a','\u0645\u0633\u062a\u0642\u0628\u0644 \u0633\u064a\u062a\u064a'] },
    ],
    copyright: '\u00a9 \u0662\u0660\u0662\u0666 \u0633\u064a\u064a\u0631\u0627 \u0628\u0644\u0648 \u0644\u0644\u0639\u0642\u0627\u0631\u0627\u062a.',
    legal: ['\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629','\u0634\u0631\u0648\u0637 \u0627\u0644\u062e\u062f\u0645\u0629'],
  },
};

// ══════════════════════════════════════════════════════════
//  LISTINGS
// ══════════════════════════════════════════════════════════
const LISTINGS = [
  { id:1, title:'Aurora Penthouse',    titleAr:'بنتهاوس أورورا',    location:'Madinaty · New Cairo',           locationAr:'مدينتي · القاهرة الجديدة',   price:'EGP 8,500,000',  beds:4, baths:3, sqft:'320 m²', badge:'Hidden Gem',    badgeColor:'#7C3AED', img:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80' },
  { id:2, title:'Villa Lumière',       titleAr:'فيلا لوميير',       location:'Mountain View · 5th Settlement', locationAr:'ماونتن فيو · التجمع الخامس', price:'EGP 14,200,000', beds:5, baths:4, sqft:'480 m²', badge:'Featured',      badgeColor:G2,        img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80' },
  { id:3, title:'The Boulevard',       titleAr:'ذا بوليفار',       location:'Mostakbal City · Future',        locationAr:'مستقبل سيتي · المستقبل',     price:'EGP 3,800,000',  beds:3, baths:2, sqft:'185 m²', badge:'New',           badgeColor:'#1B6CA8', img:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80' },
  { id:4, title:'Emirates Crown',      titleAr:'إيمارتس كراون',    location:'Fifth Settlement · Cairo',       locationAr:'التجمع الخامس · القاهرة',    price:'EGP 22,000,000', beds:6, baths:5, sqft:'650 m²', badge:'Off Market',    badgeColor:'#059669', img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80' },
  { id:5, title:'Palm Residences',     titleAr:'بالم ريزيدنسز',    location:'Madinaty · Block 7',             locationAr:'مدينتي · بلوك ٧',            price:'EGP 5,900,000',  beds:3, baths:3, sqft:'240 m²', badge:'High ROI',      badgeColor:'#DC2626', img:'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80' },
  { id:6, title:'Sky Tower Penthouse', titleAr:'بنتهاوس سكاي تاور', location:'Downtown New Cairo',            locationAr:'وسط القاهرة الجديدة',        price:'EGP 11,500,000', beds:4, baths:4, sqft:'380 m²', badge:'Price Reduced', badgeColor:'#D97706', img:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80' },
];

// ══════════════════════════════════════════════════════════
//  GLOBAL CSS
// ══════════════════════════════════════════════════════════
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500;600;700&family=Cairo:wght@300;400;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#071422}::-webkit-scrollbar-thumb{background:#C8961A;border-radius:2px}
  body{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
  @keyframes goldShimmer{0%{background-position:0% center}100%{background-position:200% center}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulseRing{0%,100%{transform:scale(1);opacity:.45}50%{transform:scale(2);opacity:0}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  .gold-text{background:linear-gradient(135deg,#E9C176 0%,#C8961A 40%,#F5D78E 70%,#987734 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:goldShimmer 4s linear infinite}
  .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
  .reveal.visible{opacity:1;transform:translateY(0)}
  .reveal-d1{transition-delay:.1s}.reveal-d2{transition-delay:.2s}.reveal-d3{transition-delay:.3s}
  .diff-card{border-radius:14px;padding:32px 26px;transition:transform .3s,box-shadow .3s;cursor:default}
  .diff-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(233,193,118,.14)}
  .prop-card{transition:all .3s cubic-bezier(.16,1,.3,1)!important}
  .prop-card:hover{transform:translateY(-6px)!important;box-shadow:0 24px 56px rgba(0,0,0,.35),0 0 30px rgba(233,193,118,.12)!important}
  .card-img img{transition:transform .6s cubic-bezier(.16,1,.3,1)}
  .prop-card:hover .card-img img{transform:scale(1.07)!important}
  .zone-row{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:10px;cursor:pointer;transition:all .2s}
  .navlink{background:none;border:none;font-size:11px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;cursor:pointer;transition:color .25s}
  .sb-btn-gold{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#E9C176,#C8961A);color:#071422;border:none;border-radius:4px;padding:13px 28px;font-family:'Jost',sans-serif;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;box-shadow:0 4px 20px rgba(233,193,118,.25);transition:opacity .2s,transform .2s,box-shadow .2s}
  .sb-btn-gold:hover{opacity:.88;transform:translateY(-1px);box-shadow:0 12px 36px rgba(233,193,118,.40)}
  .sb-btn-ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:transparent;border-radius:4px;padding:12px 28px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:border-color .25s,color .25s,background .25s}
  .sb-input{width:100%;border-radius:6px;padding:13px 16px;font-size:14px;font-weight:300;outline:none;transition:border-color .2s}
  .sb-input:focus{border-color:#E9C176!important}
  @media(max-width:768px){
    .sb-hero-grid,.sb-map-grid,.sb-ai-grid{grid-template-columns:1fr!important}
    .sb-stats-grid{grid-template-columns:repeat(2,1fr)!important}
    .sb-why-grid,.sb-prop-grid,.sb-testi-grid{grid-template-columns:1fr!important}
    .sb-foot-grid{grid-template-columns:1fr!important}
    .sb-nav-links{display:none!important}
    .sb-sec{padding:0 24px!important}
  }
`;

// ══════════════════════════════════════════════════════════
//  SHIELD LOGO
// ══════════════════════════════════════════════════════════
function ShieldLogo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 120 138" fill="none">
      <defs>
        <linearGradient id="sbl-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E070"/><stop offset="40%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#A07820"/>
        </linearGradient>
        <linearGradient id="sbl-n" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A2545"/><stop offset="100%" stopColor="#000A20"/>
        </linearGradient>
      </defs>
      <path d="M60 4L112 22V80Q112 122 60 136Q8 122 8 80V22Z" fill="url(#sbl-n)"/>
      <path d="M60 4L112 22V80Q112 122 60 136Q8 122 8 80V22Z" fill="none" stroke="url(#sbl-g)" strokeWidth="2"/>
      <text x="60" y="85" textAnchor="middle" fontFamily="Georgia,serif" fontSize="56" fontWeight="bold" fill="url(#sbl-g)">S</text>
      <path d="M60 4L112 22V80Q112 122 60 136Q8 122 8 80V22Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════
//  PARTICLE CANVAS
// ══════════════════════════════════════════════════════════
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    let W = (c.width = c.offsetWidth);
    let H = (c.height = c.offsetHeight);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: H + Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3, vy: -(Math.random() * 0.6 + 0.2),
      a: Math.random() * 0.5 + 0.1,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233,193,118,${p.a})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:1 }}/>;
}

// ══════════════════════════════════════════════════════════
//  PROP CARD
// ══════════════════════════════════════════════════════════
function PropCard({ p, isAr, th, bedsLabel, bathsLabel }: {
  p: typeof LISTINGS[0]; isAr: boolean; th: typeof THEMES.dark;
  bedsLabel: string; bathsLabel: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div className="prop-card reveal"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:th.card, border:`1px solid ${hov?'rgba(233,193,118,0.35)':th.cardBorder}`, borderRadius:14, overflow:'hidden', cursor:'pointer' }}
    >
      <div className="card-img" style={{ height:200, position:'relative', overflow:'hidden', background:'#0A1E35' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.img} alt={isAr ? p.titleAr : p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(transparent 40%,rgba(0,0,0,0.55))' }}/>
        <span style={{ position:'absolute', top:12, [isAr?'right':'left']:12, background:p.badgeColor, color:'#fff', fontSize:9, fontWeight:700, letterSpacing:'.08em', padding:'4px 10px', borderRadius:50, fontFamily:"'Jost',sans-serif", textTransform:'uppercase' }}>{p.badge}</span>
        <span style={{ position:'absolute', top:12, [isAr?'left':'right']:12, background:'rgba(0,48,135,0.85)', color:G, fontSize:8, fontWeight:600, padding:'3px 8px', borderRadius:4, fontFamily:"'Jost',sans-serif", backdropFilter:'blur(4px)' }}>PF</span>
      </div>
      <div style={{ padding:'16px 18px 20px' }}>
        <div style={{ fontSize:9, fontWeight:500, letterSpacing:'.16em', textTransform:'uppercase', color:G, marginBottom:4, fontFamily:"'Jost',sans-serif" }}>{isAr?p.locationAr:p.location}</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:th.text, lineHeight:1.2, marginBottom:8, textAlign:isAr?'right':'left' }}>{isAr?p.titleAr:p.title}</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:G, marginBottom:10 }}>{p.price}</div>
        <div style={{ display:'flex', gap:14, fontSize:11, color:th.textSub, fontFamily:"'Jost',sans-serif", paddingTop:12, borderTop:`1px solid ${th.border}`, flexDirection:isAr?'row-reverse':'row' }}>
          <span>🛏 {p.beds} {bedsLabel}</span><span>🚿 {p.baths} {bathsLabel}</span><span>📐 {p.sqft}</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════
export default function LandingPage() {
  const [mode,      setMode]      = useState<'dark'|'light'>('dark');
  const [lang,      setLang]      = useState<'en'|'ar'>('en');
  const [scrolled,  setScrolled]  = useState(false);
  const [loaded,    setLoaded]    = useState(false);
  const [formData,  setFormData]  = useState({ name:'', phone:'' });
  const [submitted, setSubmitted] = useState(false);
  const [activeZone,setActiveZone]= useState<number|null>(null);

  const th     = THEMES[mode];
  const T      = COPY[lang];
  const isAr   = lang === 'ar';
  const fontB  = isAr ? "'Cairo','Jost',sans-serif" : "'Jost','Cairo',sans-serif";
  const sec    = { maxWidth:1280, margin:'0 auto', padding:'0 48px' } as CSSProperties;

  useEffect(() => {
    document.documentElement.setAttribute('dir', T.dir as string);
    document.documentElement.setAttribute('lang', lang);
    document.body.style.background = th.bg;
  }, [mode, lang, th, T]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener('scroll', onScroll);
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [lang, mode]);

  const Label = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize:10, fontWeight:500, letterSpacing:'.24em', textTransform:'uppercase', color:G, marginBottom:10, fontFamily:"'Jost',sans-serif" }}>{children}</div>
  );
  const GoldRule = () => <div style={{ width:40, height:2, background:`linear-gradient(90deg,${G2},${G})`, borderRadius:1, margin:'14px 0' }}/>;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }}/>
      <div style={{ minHeight:'100vh', background:th.bg, color:th.text, transition:'background .5s,color .5s' }}>

        {/* ══ NAV ══ */}
        <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:300, height:68, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 48px', background:scrolled?th.navBg:'transparent', backdropFilter:scrolled?'blur(20px)':'none', borderBottom:scrolled?`1px solid ${th.border}`:'1px solid transparent', transition:'all .4s cubic-bezier(.16,1,.3,1)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
            <ShieldLogo size={38}/>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:isAr?16:18, fontWeight:600, letterSpacing:isAr?'.06em':'.2em', color:G, lineHeight:1 }}>{T.brand}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:'.38em', color:th.textSub, marginTop:2 }}>{T.sub}</div>
            </div>
          </div>
          <div className="sb-nav-links" style={{ display:'flex', gap:32, alignItems:'center' }}>
            {T.nav.map(n => (
              <button key={n} className="navlink" style={{ color:th.textSub, fontFamily:fontB }}
                onMouseOver={e=>{(e.target as HTMLElement).style.color=G;}}
                onMouseOut={e=>{(e.target as HTMLElement).style.color=th.textSub;}}
              >{n}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button onClick={()=>setLang(l=>l==='en'?'ar':'en')} style={{ background:th.surface, border:`1px solid ${th.border}`, color:G, padding:'6px 14px', borderRadius:4, fontSize:11, fontWeight:600, letterSpacing:'.1em', cursor:'pointer', fontFamily:"'Jost',sans-serif", transition:'all .2s' }}
              onMouseOver={e=>{(e.currentTarget).style.borderColor=G;}} onMouseOut={e=>{(e.currentTarget).style.borderColor=th.border;}}
            >{lang==='en'?'AR':'EN'}</button>
            <button onClick={()=>setMode(m=>m==='dark'?'light':'dark')} aria-label="Toggle theme" style={{ background:th.surface, border:`1px solid ${th.border}`, color:th.textSub, width:34, height:34, borderRadius:'50%', cursor:'pointer', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}
              onMouseOver={e=>{(e.currentTarget).style.borderColor=G;}} onMouseOut={e=>{(e.currentTarget).style.borderColor=th.border;}}
            >{mode==='dark'?'☀':'🌙'}</button>
            <button className="sb-btn-ghost" style={{ border:`1px solid ${th.border}`, color:th.text, padding:'8px 18px', fontSize:10 }}
              onMouseEnter={e=>{(e.currentTarget).style.borderColor=G;(e.currentTarget).style.color=G;(e.currentTarget).style.background='rgba(233,193,118,0.08)';}}
              onMouseLeave={e=>{(e.currentTarget).style.borderColor=th.border;(e.currentTarget).style.color=th.text;(e.currentTarget).style.background='transparent';}}
            >{T.cta}</button>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', background:th.heroBg }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:"url('https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?w=1800&q=80')", backgroundSize:'cover', backgroundPosition:'center 40%', transform:loaded?'scale(1)':'scale(1.06)', transition:'transform 2s cubic-bezier(.16,1,.3,1)', opacity:mode==='dark'?.55:.15 }}/>
          <div style={{ position:'absolute', inset:0, background:mode==='dark'?'linear-gradient(105deg,rgba(5,11,20,.97) 0%,rgba(7,20,34,.85) 45%,rgba(5,11,20,.4) 100%)':'linear-gradient(105deg,rgba(239,248,247,.98) 0%,rgba(223,241,238,.95) 50%,rgba(239,248,247,.7) 100%)' }}/>
          <ParticleCanvas/>
          <div style={{ ...sec, position:'relative', zIndex:2, paddingTop:120, paddingBottom:80, width:'100%' }}>
            <div className="sb-hero-grid" style={{ display:'grid', gridTemplateColumns:isAr?'45% 55%':'55% 45%', gap:56, alignItems:'center' }}>
              <div style={{ order:isAr?2:1, textAlign:isAr?'right':'left' }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:10, flexDirection:isAr?'row-reverse':'row', animation:loaded?'fadeUp .6s ease .1s both':'none' }}>
                  <div style={{ width:28, height:1, background:G }}/><span style={{ fontSize:10, letterSpacing:isAr?'.04em':'.28em', color:G, fontWeight:500, fontFamily:fontB }}>{T.tagline}</span>
                </div>
                <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(44px,5.5vw,80px)', fontWeight:300, color:th.text, lineHeight:1.05, letterSpacing:'-0.02em', margin:'20px 0 16px', animation:loaded?'fadeUp .7s ease .2s both':'none' }}>
                  {T.heroH1a}<br/>{T.heroH1b}<br/><em className="gold-text" style={{ fontStyle:'italic' }}>{T.heroItalic}</em>
                </h1>
                <div style={{ fontSize:isAr?14:13, letterSpacing:isAr?'.04em':'.18em', textTransform:'uppercase', color:G, fontWeight:500, fontFamily:fontB, marginBottom:18, animation:loaded?'fadeUp .7s ease .3s both':'none' }}>{T.heroSub}</div>
                <p style={{ fontSize:15, fontWeight:300, lineHeight:1.75, color:th.textSub, maxWidth:500, marginBottom:32, fontFamily:fontB, animation:loaded?'fadeUp .7s ease .38s both':'none' }}>{T.heroDesc}</p>
                <div style={{ display:'flex', gap:12, flexDirection:isAr?'row-reverse':'row', marginBottom:48, animation:loaded?'fadeUp .7s ease .46s both':'none' }}>
                  <button className="sb-btn-gold">{T.btnDiscover}</button>
                  <button className="sb-btn-ghost" style={{ border:`1px solid ${th.border}`, color:th.text }}
                    onMouseEnter={e=>{(e.currentTarget).style.borderColor=G;(e.currentTarget).style.color=G;(e.currentTarget).style.background='rgba(233,193,118,0.08)';}}
                    onMouseLeave={e=>{(e.currentTarget).style.borderColor=th.border;(e.currentTarget).style.color=th.text;(e.currentTarget).style.background='transparent';}}
                  >{T.btnView}</button>
                </div>
                <div className="sb-stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, background:mode==='dark'?'rgba(255,255,255,0.04)':'rgba(27,108,168,0.06)', border:`1px solid ${th.border}`, borderRadius:8, overflow:'hidden', backdropFilter:'blur(12px)', animation:loaded?'fadeUp .7s ease .56s both':'none' }}>
                  {T.stats.map(([val,lbl],i)=>(
                    <div key={i} style={{ textAlign:'center', padding:'18px 12px', borderRight:i<T.stats.length-1?`1px solid ${th.border}`:'none' }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:G, lineHeight:1 }}>{val}</div>
                      <div style={{ fontSize:10, fontWeight:400, letterSpacing:isAr?'.02em':'.12em', textTransform:'uppercase', color:th.textMuted, marginTop:5, fontFamily:fontB }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ order:isAr?1:2, position:'relative', height:520, animation:loaded?'fadeUp .9s ease .45s both':'none' }}>
                <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:mode==='dark'?.03:.025, animation:'floatY 6s ease-in-out infinite', pointerEvents:'none' }}><ShieldLogo size={340}/></div>
                {[{off:2,op:.4},{off:1,op:.65},{off:0}].map(({off,op},idx)=>(
                  <div key={idx} style={{ position:'absolute', top:off*20, left:off*20, right:-(off*20), bottom:-(off*20), background:off===0?th.card:th.surface, borderRadius:18, overflow:off===0?'hidden':'visible', border:off>0?`1px solid ${th.border}`:undefined, opacity:op||1, boxShadow:off===0?'0 40px 80px rgba(0,0,0,.4)':undefined, zIndex:3-off }}>
                    {off===0&&<>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={LISTINGS[1].img} alt="" style={{ width:'100%', height:'62%', objectFit:'cover' }}/>
                      <div style={{ position:'absolute', top:12, left:12, background:G2, color:'#fff', fontSize:9, fontWeight:700, letterSpacing:'.08em', padding:'4px 10px', borderRadius:50, fontFamily:"'Jost',sans-serif", textTransform:'uppercase' }}>{LISTINGS[1].badge}</div>
                      <div style={{ padding:'18px 22px' }}>
                        <div style={{ fontSize:10, fontWeight:500, letterSpacing:'.14em', textTransform:'uppercase', color:G, marginBottom:4, fontFamily:"'Jost',sans-serif" }}>{isAr?LISTINGS[1].locationAr:LISTINGS[1].location}</div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:600, color:th.text, marginBottom:8 }}>{isAr?LISTINGS[1].titleAr:LISTINGS[1].title}</div>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:G }}>{LISTINGS[1].price}</div>
                          <button className="sb-btn-gold" style={{ padding:'8px 16px', fontSize:10 }}>{isAr?'تفاصيل':'Details'}</button>
                        </div>
                      </div>
                    </>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ LISTINGS ══ */}
        <section style={{ background:th.bg2, padding:'96px 0', borderTop:`1px solid ${th.border}` }}>
          <div style={sec}>
            <div className="reveal" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:52, flexDirection:isAr?'row-reverse':'row' }}>
              <div style={{ textAlign:isAr?'right':'left' }}>
                <Label>{T.secListings}</Label>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,4vw,52px)', fontWeight:300, lineHeight:1.1, letterSpacing:'-0.02em' }}>{T.h2Listings}</h2>
              </div>
              <button className="sb-btn-ghost" style={{ border:`1px solid ${th.border}`, color:th.textSub, flexShrink:0 }}
                onMouseEnter={e=>{(e.currentTarget).style.borderColor=G;(e.currentTarget).style.color=G;}}
                onMouseLeave={e=>{(e.currentTarget).style.borderColor=th.border;(e.currentTarget).style.color=th.textSub;}}
              >{T.viewAll}</button>
            </div>
            <div className="sb-prop-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {LISTINGS.map(p=><PropCard key={p.id} p={p} isAr={isAr} th={th} bedsLabel={T.beds} bathsLabel={T.baths}/>)}
            </div>
          </div>
        </section>

        {/* ══ WHY Sierra AI ══ */}
        <section style={{ background:th.bg, padding:'96px 0' }}>
          <div style={sec}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:52 }}>
              <Label>{T.secWhy}</Label>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,4vw,52px)', fontWeight:300, lineHeight:1.1, letterSpacing:'-0.02em' }}>{T.h2Why}</h2>
            </div>
            <div className="sb-why-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {T.why.map((item,i)=>(
                <div key={i} className={`diff-card reveal reveal-d${i+1}`} style={{ background:th.card, border:`1px solid ${th.cardBorder}`, textAlign:isAr?'right':'left' }}>
                  <div style={{ fontSize:28, color:G, marginBottom:16 }}>{item.icon}</div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:500, marginBottom:10, color:th.text }}>{item.title}</h3>
                  <p style={{ fontSize:13, fontWeight:300, lineHeight:1.75, color:th.textSub, fontFamily:fontB }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ INTELLIGENCE MAP ══ */}
        <section style={{ background:mode==='dark'?'#040E1C':th.bgAlt, padding:'96px 0' }}>
          <div style={sec}>
            <div className="sb-map-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>
              <div style={{ order:isAr?2:1 }}>
                <div className="reveal" style={{ textAlign:isAr?'right':'left' }}>
                  <Label>{T.secMap}</Label>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,3.5vw,48px)', fontWeight:300, lineHeight:1.15, letterSpacing:'-0.02em', color:th.text, marginBottom:10 }}>{T.mapH1}<br/><em className="gold-text" style={{ fontStyle:'italic' }}>{T.mapH2}</em></h2>
                  <GoldRule/>
                  <p style={{ fontSize:14, fontWeight:300, lineHeight:1.8, color:th.textSub, marginBottom:24, fontFamily:fontB }}>{T.mapDesc}</p>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {T.zones.map((z,i)=>(
                    <div key={i} className={`zone-row reveal reveal-d${i+1}`} style={{ background:activeZone===i?th.surfaceHover:th.surface, border:`1px solid ${activeZone===i?z.color+'44':th.border}`, flexDirection:isAr?'row-reverse':'row' }} onClick={()=>setActiveZone(activeZone===i?null:i)}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:z.color, flexShrink:0, boxShadow:`0 0 8px ${z.color}88` }}/>
                      <div style={{ flex:1, fontSize:13, fontWeight:500, color:th.text, fontFamily:fontB, textAlign:isAr?'right':'left' }}>{z.area}</div>
                      <span style={{ fontSize:11, fontWeight:600, color:z.color, background:`${z.color}18`, padding:'3px 10px', borderRadius:50, fontFamily:"'Jost',sans-serif", whiteSpace:'nowrap' }}>{z.stat}</span>
                    </div>
                  ))}
                </div>
                <div className="reveal reveal-d3" style={{ marginTop:24 }}>
                  <button className="sb-btn-ghost" style={{ width:'100%', justifyContent:'center', border:`1px solid ${th.border}`, color:th.textSub }}
                    onMouseEnter={e=>{(e.currentTarget).style.borderColor=G;(e.currentTarget).style.color=G;}}
                    onMouseLeave={e=>{(e.currentTarget).style.borderColor=th.border;(e.currentTarget).style.color=th.textSub;}}
                  >{T.mapBtn}</button>
                </div>
              </div>
              <div className="reveal reveal-d2" style={{ order:isAr?1:2 }}>
                <div style={{ position:'relative', background:mode==='dark'?'rgba(4,14,28,.9)':'rgba(239,248,247,.9)', border:`1px solid rgba(233,193,118,0.2)`, borderRadius:16, overflow:'hidden', boxShadow:'0 32px 80px rgba(0,0,0,.4)', aspectRatio:'1.05/1' }}>
                  <svg viewBox="0 0 500 476" style={{ width:'100%', height:'100%' }}>
                    <defs>
                      <pattern id="mg2" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0L0 0 0 28" fill="none" stroke={G} strokeWidth=".25" opacity=".2"/></pattern>
                      <radialGradient id="mgr2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={G} stopOpacity=".06"/><stop offset="100%" stopColor={G} stopOpacity="0"/></radialGradient>
                      <filter id="pg"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    </defs>
                    <rect width="500" height="476" fill="url(#mg2)"/><rect width="500" height="476" fill="url(#mgr2)"/>
                    {([[190,20,190,456],[70,160,430,160],[70,250,430,250],[290,40,290,430]] as number[][]).map(([x1,y1,x2,y2],i)=>(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(233,193,118,0.15)" strokeWidth="1"/>))}
                    {[{cx:150,cy:180,name:'Fifth Settlement',stat:'Growth +12%'},{cx:310,cy:140,name:'Madinaty',stat:'High Demand'},{cx:225,cy:265,name:'Mountain View',stat:'Yield 8%'},{cx:375,cy:240,name:'Mostakbal City',stat:'Off‑Market'}].map((pin,i)=>(
                      <g key={i}>
                        <circle cx={pin.cx} cy={pin.cy} r="18" fill="none" stroke={G} strokeWidth="1" opacity=".25" style={{ animation:`pulseRing 2.5s ${i*0.5}s infinite` }}/>
                        <circle cx={pin.cx} cy={pin.cy} r="7" fill={G} filter="url(#pg)"/><circle cx={pin.cx} cy={pin.cy} r="3" fill="#fff"/>
                        <rect x={pin.cx-52} y={pin.cy-50} width="104" height="36" rx="6" fill={mode==='dark'?'rgba(4,14,28,.92)':'rgba(239,248,247,.95)'} stroke="rgba(233,193,118,0.4)" strokeWidth="1"/>
                        <text x={pin.cx} y={pin.cy-33} textAnchor="middle" fill={th.text} fontSize="9" fontFamily="'Jost',sans-serif" fontWeight="600">{pin.name}</text>
                        <text x={pin.cx} y={pin.cy-20} textAnchor="middle" fill={G} fontSize="8.5" fontFamily="'Jost',sans-serif">{pin.stat}</text>
                      </g>
                    ))}
                    <text x="250" y="462" textAnchor="middle" fill="rgba(233,193,118,0.2)" fontSize="9" fontFamily="'Jost',sans-serif" letterSpacing="4">Sierra AI INTELLIGENCE</text>
                  </svg>
                  {([{top:12,left:12},{top:12,right:12},{bottom:12,left:12},{bottom:12,right:12}] as CSSProperties[]).map((pos,i)=>(
                    <div key={i} style={{ position:'absolute', width:18, height:18, ...pos, borderTop:i<2?'2px solid rgba(233,193,118,0.5)':undefined, borderBottom:i>=2?'2px solid rgba(233,193,118,0.5)':undefined, borderLeft:i%2===0?'2px solid rgba(233,193,118,0.5)':undefined, borderRight:i%2!==0?'2px solid rgba(233,193,118,0.5)':undefined }}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SIERRA AI ══ */}
        <section style={{ padding:'96px 0', background:mode==='dark'?'linear-gradient(135deg,#050B14 0%,#071422 50%,#0D2444 100%)':'linear-gradient(135deg,#DFF1EE 0%,#EFF8F7 50%,#F8FDFC 100%)', borderTop:`1px solid ${th.border}`, borderBottom:`1px solid ${th.border}` }}>
          <div style={sec}>
            <div className="sb-ai-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
              <div className="reveal" style={{ textAlign:isAr?'right':'left', order:isAr?2:1 }}>
                <Label>{T.secAI}</Label>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,4vw,48px)', fontWeight:300, lineHeight:1.1, letterSpacing:'-0.02em', color:th.text, marginBottom:10 }}>{T.aiH}</h2>
                <div style={{ fontSize:11, fontWeight:500, letterSpacing:'.1em', color:'#1B6CA8', textTransform:'uppercase', marginBottom:16, fontFamily:"'Jost',sans-serif" }}>{T.aiSub}</div>
                <GoldRule/>
                <p style={{ fontSize:14, fontWeight:300, lineHeight:1.8, color:th.textSub, margin:'16px 0 24px', fontFamily:fontB }}>{T.aiDesc}</p>
                <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
                  {T.aiFeatures.map((f,i)=>(
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:th.textSub, flexDirection:isAr?'row-reverse':'row', fontFamily:fontB }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:G, flexShrink:0 }}/>{f}
                    </div>
                  ))}
                </div>
                <button className="sb-btn-gold">{T.aiCTA}</button>
              </div>
              <div className="reveal reveal-d2" style={{ order:isAr?1:2 }}>
                <div style={{ background:mode==='dark'?'rgba(255,255,255,0.04)':'rgba(27,108,168,0.05)', border:`1px solid rgba(233,193,118,0.25)`, borderRadius:16, padding:28, backdropFilter:'blur(12px)', boxShadow:'0 0 40px rgba(233,193,118,0.12)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:22 }}>
                    <div style={{ width:50, height:50, borderRadius:'50%', background:`linear-gradient(135deg,${G2},${G})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0, position:'relative' }}>
                      ◈<div style={{ position:'absolute', inset:-4, borderRadius:'50%', border:`1px solid ${G}`, animation:'pulseRing 2s infinite' }}/>
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:500, color:th.text }}>Sierra</div>
                      <div style={{ fontSize:11, color:'#4ADE80', marginTop:2, fontFamily:"'Jost',sans-serif" }}>● Online · 4s avg. response</div>
                    </div>
                  </div>
                  {T.aiChat.map((msg,i)=>(
                    <div key={i} style={{ display:'flex', justifyContent:msg.from==='user'?'flex-end':'flex-start', marginBottom:10 }}>
                      <div style={{ maxWidth:'80%', padding:'10px 14px', borderRadius:12, fontSize:13, fontWeight:300, lineHeight:1.55, fontFamily:fontB, background:msg.from==='user'?`linear-gradient(135deg,${G2},${G})`:th.surface, color:msg.from==='user'?'#071422':th.text, border:msg.from==='user'?'none':`1px solid ${th.border}` }}>{msg.text}</div>
                    </div>
                  ))}
                  <div style={{ textAlign:'center', marginTop:16, fontSize:11, color:th.textMuted, fontFamily:"'Jost',sans-serif" }}>🤖 AI-powered · 24/7 · Arabic & English</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section style={{ background:th.bg, padding:'96px 0' }}>
          <div style={sec}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:52 }}>
              <Label>{T.secTesti}</Label>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,4vw,48px)', fontWeight:300, lineHeight:1.1, letterSpacing:'-0.02em' }}>{T.h2Testi}</h2>
            </div>
            <div className="sb-testi-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:22 }}>
              {T.testimonials.map((t,i)=>(
                <div key={i} className={`reveal reveal-d${i+1}`} style={{ padding:28, background:th.card, border:`1px solid ${th.cardBorder}`, borderRadius:14 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, color:G, lineHeight:.7, marginBottom:16 }}>"</div>
                  <p style={{ fontSize:14, fontWeight:300, lineHeight:1.8, color:th.textSub, marginBottom:20, fontStyle:'italic', fontFamily:fontB }}>{t.q}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:12, flexDirection:isAr?'row-reverse':'row' }}>
                    <div style={{ width:40, height:40, borderRadius:'50%', background:`linear-gradient(135deg,${G2},${G})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#071422', flexShrink:0 }}>{t.i}</div>
                    <div style={{ textAlign:isAr?'right':'left' }}>
                      <div style={{ fontSize:14, fontWeight:500, color:th.text, fontFamily:fontB }}>{t.name}</div>
                      <div style={{ fontSize:11, color:th.textMuted, fontFamily:"'Jost',sans-serif" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA FORM ══ */}
        <section style={{ padding:'96px 0', background:mode==='dark'?'linear-gradient(135deg,#050B14,#071422)':'linear-gradient(135deg,#EFF8F7,#DFF1EE)', borderTop:`1px solid ${th.border}` }}>
          <div style={{ maxWidth:600, margin:'0 auto', padding:'0 24px' }}>
            <div className="reveal" style={{ textAlign:'center', marginBottom:40 }}>
              <Label>{T.ctaTag}</Label>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,4vw,48px)', fontWeight:300, lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:12 }}>{T.ctaH}</h2>
              <p style={{ fontSize:14, fontWeight:300, color:th.textSub, lineHeight:1.7, fontFamily:fontB }}>{T.ctaSub}</p>
            </div>
            <div className="reveal reveal-d1">
              {submitted?(
                <div style={{ textAlign:'center', padding:40, background:'rgba(233,193,118,0.08)', border:'1px solid rgba(233,193,118,0.3)', borderRadius:12 }}>
                  <div style={{ fontSize:40, marginBottom:12 }}>✓</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, color:G, marginBottom:8 }}>{lang==='en'?'Thank you!':'شكراً!'}</div>
                  <p style={{ fontSize:14, color:th.textSub, fontFamily:fontB }}>{T.formSuccess}</p>
                </div>
              ):(
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {([{key:'name' as const,label:T.formName,type:'text'},{key:'phone' as const,label:T.formPhone,type:'tel'}]).map(f=>(
                    <input key={f.key} type={f.type} required placeholder={f.label} value={formData[f.key]}
                      onChange={e=>setFormData({...formData,[f.key]:e.target.value})}
                      className="sb-input" style={{ background:th.card, border:`1px solid ${th.border}`, color:th.text, textAlign:isAr?'right':'left' as CSSProperties['textAlign'], fontFamily:fontB }}
                    />
                  ))}
                  <button className="sb-btn-gold" style={{ justifyContent:'center', padding:14 }}
                    onClick={()=>{if(formData.name.trim()&&formData.phone.trim())setSubmitted(true);}}
                  >{T.formSubmit}</button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ background:'#040E1C', color:'#EFF8F7', padding:'72px 60px 36px', borderTop:'1px solid rgba(233,193,118,0.12)' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            <div className="sb-foot-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:60, marginBottom:48 }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16, flexDirection:isAr?'row-reverse':'row' }}>
                  <ShieldLogo size={42}/>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:isAr?16:19, fontWeight:600, letterSpacing:isAr?'.06em':'.2em', color:G }}>{T.brand}</div>
                    <div style={{ fontSize:8, letterSpacing:'.38em', color:'rgba(239,248,247,0.4)', fontFamily:"'Jost',sans-serif" }}>{T.sub}</div>
                  </div>
                </div>
                <p style={{ fontSize:13, fontWeight:300, lineHeight:1.8, color:'rgba(239,248,247,0.4)', maxWidth:280, fontFamily:fontB, textAlign:isAr?'right':'left' }}>{T.footDesc}</p>
              </div>
              {T.footCols.map(col=>(
                <div key={col.title} style={{ textAlign:isAr?'right':'left' }}>
                  <div style={{ fontSize:9, fontWeight:500, letterSpacing:'.22em', color:G, marginBottom:16, fontFamily:"'Jost',sans-serif" }}>{col.title}</div>
                  {col.links.map(l=>(
                    <div key={l} style={{ fontSize:12, fontWeight:300, color:'rgba(239,248,247,0.4)', marginBottom:10, cursor:'pointer', transition:'color .2s', fontFamily:fontB }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.color=G;}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.color='rgba(239,248,247,0.4)';}}
                    >{l}</div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ borderTop:'1px solid rgba(239,248,247,0.06)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, flexDirection:isAr?'row-reverse':'row' }}>
              <div style={{ fontSize:11, fontWeight:300, color:'rgba(239,248,247,0.25)', fontFamily:fontB }}>{T.copyright}</div>
              <div style={{ display:'flex', gap:20 }}>
                {T.legal.map(l=>(
                  <span key={l} style={{ fontSize:11, fontWeight:300, color:'rgba(239,248,247,0.25)', cursor:'pointer', transition:'color .2s', fontFamily:"'Jost',sans-serif" }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLSpanElement).style.color=G;}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLSpanElement).style.color='rgba(239,248,247,0.25)';}}
                  >{l}</span>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
