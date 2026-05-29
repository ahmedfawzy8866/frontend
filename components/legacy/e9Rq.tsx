'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ConciergeGallery from '@/components/Proposals/ConciergeGallery';
import type { ConciergeSelection, ConciergeUnit } from '@/lib/services/portfolio-engine';
import { trackPortfolioEngagement } from '@/lib/services/portfolio-engine';

export default function ConciergePage() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get('lead');
  const galleryMode = searchParams.get('gallery') === 'true';

  const [portfolio, setPortfolio] = useState<ConciergeSelection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      if (!leadId) {
        setError('No lead ID provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch portfolio from API
        const response = await fetch(`/api/concierge/${leadId}`);
        if (!response.ok) throw new Error('Portfolio not found');
        
        const data = await response.json();
        setPortfolio(data);

        // Track portfolio view
        await trackPortfolioEngagement(data.id, leadId, 'viewed');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolio');
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
      await trackPortfolioEngagement(portfolio.id, leadId!, 'requested_viewing');

      alert('Viewing request sent! Our team will contact you shortly.');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to request viewing');
    }
  };

  const handleShare = async (unit: ConciergeUnit) => {
    const shareText = `Check out this exclusive property from Sierra AI Realty!\n\n${unit.title}\n${(unit.price / 1_000_000).toFixed(1)}M EGP\nROI: ${unit.estimatedROI.toFixed(1)}%\n\n${window.location.href}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: unit.title,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      alert('Link copied to clipboard!');
    }

    // Track engagement
    if (portfolio) {
      await trackPortfolioEngagement(portfolio.id, leadId!, 'unit_clicked');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-amber-400 text-4xl mb-4">✨</div>
          <p className="text-white text-lg">Loading your curated portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <p className="text-white text-lg">{error || 'Portfolio not found'}</p>
          <p className="text-slate-400 text-sm mt-2">
            Please check your link and try again.
          </p>
        </div>
      </div>
    );
  }

  return <ConciergeGallery portfolio={portfolio} onViewingRequested={handleViewingRequested} onShare={handleShare} />;
}
