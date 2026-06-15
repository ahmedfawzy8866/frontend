'use client';

import { useEffect, useState, use } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ConciergeGallery from '@/components/Proposals/ConciergeGallery';
import type { ConciergeSelection, ConciergeUnit } from '@/lib/services/portfolio-engine';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/models/schema';
import { useSierraBlu } from '@/hooks/useSierraBlu';
import { LuxuryCard, EditorialHeading } from '@/components/ui/LuxurySkeleton';

/** Inline version — avoids importing the server-only portfolio-engine on the client */
async function trackEngagement(
  portfolioId: string,
  _leadId: string,
  action: 'viewed' | 'unit_clicked' | 'requested_viewing'
) {
  try {
    await updateDoc(doc(db, COLLECTIONS.conciergeSelections, portfolioId), {
      [`engagement.${action}`]: serverTimestamp(),
    });
  } catch { /* non-critical */ }
}

export default function ConciergePage({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = use(params);
  const searchParams = useSearchParams();
  const galleryMode = searchParams.get('gallery') === 'true';

  const { getLeadData, loading: hookLoading, error: hookError } = useSierraBlu();
  const [portfolio, setPortfolio] = useState<ConciergeSelection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!leadId) {
        setError('No selection ID provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch portfolio from API or directly from Firestore via hook
        // For now, we'll use a fetch to an API route that handles the curation logic
        // or retrieves a pre-generated portfolio.
        const response = await fetch(`/api/concierge/${leadId}`);
        if (!response.ok) {
          // If API fails, try to fallback to pre-generated selection in Firestore
          const leadData = await getLeadData(leadId);
          if (leadData?.conciergePortfolioId) {
            // Further fetching logic could go here if needed
          }
          throw new Error('Selection not found. Please contact your advisor.');
        }
        
        const data = await response.json();
        setPortfolio(data);

        // Track portfolio view
        if (data.id) {
          await trackEngagement(data.id, leadId, 'viewed');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load selection');
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [leadId]);

  const handleViewingRequested = async (unitId: string) => {
    if (!portfolio) return;

    try {
      const response = await fetch('/api/leads/request-viewing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          unitId,
          portfolioId: portfolio.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to request viewing');

      // Track engagement
      await trackEngagement(portfolio.id, leadId!, 'requested_viewing');

      alert('Viewing request sent! Laila will contact you shortly to arrange the visit.');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to request viewing');
    }
  };

  const handleShare = async (unit: ConciergeUnit) => {
    const shareText = `Explore this curated Sierra AI property: ${unit.title} - ${(unit.price / 1_000_000).toFixed(1)}M EGP. ROI: ${unit.estimatedROI.toFixed(1)}%`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sierra AI Realty Selection',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Exclusive link copied to clipboard.');
    }

    if (portfolio) {
      await trackPortfolioEngagement(portfolio.id, leadId!, 'unit_clicked');
    }
  };

  if (loading || hookLoading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-[#C9A84C] border-solid rounded-full animate-spin mx-auto mb-8"></div>
          <EditorialHeading level={2} className="text-[#F4F0E8] text-2xl md:text-3xl">
            Curating Your Portfolio...
          </EditorialHeading>
          <p className="text-[#C9A84C] font-inter uppercase tracking-[0.2em] text-xs mt-4">
            Stage 8: The Concierge Selection
          </p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
        <LuxuryCard className="max-w-md text-center">
          <div className="text-[#C9A84C] text-4xl mb-6 italic font-playfair">Note</div>
          <EditorialHeading level={2} className="text-2xl mb-4">
            {error || 'Selection Unavailable'}
          </EditorialHeading>
          <p className="text-[#0A1628]/70 font-inter text-sm leading-relaxed mb-8">
            This personalized selection link has expired or is invalid. Please contact your Sierra AI advisor for a fresh curation.
          </p>
          <div className="w-full h-[1px] bg-[#C9A84C]/20 mb-8" />
          <p className="text-[#0A1628]/50 text-[10px] uppercase tracking-widest">
            Sierra AI Realty • Private Office
          </p>
        </LuxuryCard>
      </div>
    );
  }

  return (
    <ConciergeGallery 
      portfolio={portfolio} 
      onViewingRequested={handleViewingRequested} 
      onShare={handleShare} 
    />
  );
}
