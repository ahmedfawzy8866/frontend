import { NextRequest, NextResponse } from 'next/server';
import { pfClient } from '@/lib/property-finder-client';
import { PFIntegrationService } from '@/lib/services/PFIntegrationService';

/**
 * PROPERTY FINDER INTEGRATION GATEWAY (SERVER-SIDE)
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'search-listings':
        const filters = Object.fromEntries(searchParams.entries());
        delete filters.action;
        const result = await pfClient.searchListings(filters);
        return NextResponse.json(result);

      case 'search-locations':
        const query = searchParams.get('q') || '';
        const locations = await pfClient.searchLocations(query);
        return NextResponse.json(locations);

      case 'search-stakeholders':
        const stakeholderFilters = Object.fromEntries(searchParams.entries());
        delete stakeholderFilters.action;
        const stakeholders = await pfClient.fetchInvestmentStakeholderRegistry(stakeholderFilters);
        return NextResponse.json(stakeholders);

      case 'get-amenities':
        const amenities = await pfClient.getAmenities();
        return NextResponse.json(amenities);

      default:
        return NextResponse.json({ error: 'Unsupported integration protocol' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('[GATEWAY_ERROR] Property Finder API Proxy:', error);
    return NextResponse.json({ 
      error: 'Integration synchronization interrupted', 
      details: 'Check secure credentials in the environmental vault or consult system logs for telemetry details.'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = new URL(request.url).searchParams.get('action');

    if (action === 'sync-leads') {
      const summary = await PFIntegrationService.syncIncomingLeads();
      return NextResponse.json({
        success: true,
        summary,
        message: `Imported ${summary.created} new leads and refreshed ${summary.updated} existing records.`,
      });
    }

    if (action === 'sync-listings') {
      const summary = await PFIntegrationService.syncIncomingListings();
      return NextResponse.json({
        success: true,
        summary,
        message: `Imported ${summary.imported} new listings and refreshed ${summary.updated} existing records.`,
      });
    }

    if (action === 'publish-unit') {
      if (!body?.unitId || typeof body.unitId !== 'string') {
        return NextResponse.json({ error: 'unitId is required' }, { status: 400 });
      }

      const result = await PFIntegrationService.publishListing(body.unitId);
      return NextResponse.json({ success: true, result });
    }

    if (action === 'create-listing') {
      const result = await pfClient.createListing(body);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Unsupported write protocol' }, { status: 400 });
  } catch (error: any) {
    console.error('[WRITE_ERROR] Property Finder API Proxy:', error);
    return NextResponse.json({ 
      error: 'Data persistence protocol interrupted', 
      details: 'Ensure the payload adheres to the enterprise-grade schema requirements.'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) return NextResponse.json({ error: 'Reference ID missing' }, { status: 400 });

    const result = await pfClient.updateListing(id, body);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[UPDATE_ERROR] Property Finder API Proxy:', error);
    return NextResponse.json({ 
      error: 'Update protocol failed', 
      details: 'Asset reference ID may be invalid or unauthorized.'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Reference ID missing' }, { status: 400 });

    await pfClient.deleteListing(id);
    return NextResponse.json({ success: true, message: 'Portfolio asset successfully de-listed' });
  } catch (error: any) {
    console.error('[DELETE_ERROR] Property Finder API Proxy:', error);
    return NextResponse.json({ 
      error: 'Asset de-listing failed', 
      details: 'Resource may have already been purged or is locked by a concurrent operation.'
    }, { status: 500 });
  }
}
