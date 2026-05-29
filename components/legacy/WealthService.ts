/**
 * Sierra AI — WEALTH SERVICE BRIDGE
 * Orchestrates between raw Inventory and Neural Intelligence.
 */

import { IntelligentAsset } from '../models/intelligence';
import { InventoryService, Property } from './InventoryService';
import { analyzeAssetFinancials } from './roi-service';
import { Unit } from '../models/schema';

export const WealthService = {
  /**
   * Fetches the top curated assets and runs a neural ROI analysis on each.
   */
  async getCuratedPortfolio(count: number = 6, market?: 'egypt' | 'uae'): Promise<IntelligentAsset[]> {
    const rawAssets = await InventoryService.getFeaturedListings(count, market);
    
    const enriched = await Promise.all(
      rawAssets.map(async (asset) => {
        // Cast to Unit for ROI engine compatibility
        const unit: Unit = {
          ...asset,
          title: asset.title,
          price: asset.price,
          location: asset.location,
          propertyType: asset.propertyType as any,
          area: asset.area,
          category: asset.category,
          market: asset.market,
          ownerType: asset.ownerType,
          status: asset.status as any,
        };

        try {
          const financials = await analyzeAssetFinancials(unit);
          return {
            ...asset,
            financials
          };
        } catch (e) {
          console.error(`Wealth Intelligence failed for asset ${asset.id}`, e);
          return asset;
        }
      })
    );

    return enriched;
  }
};
