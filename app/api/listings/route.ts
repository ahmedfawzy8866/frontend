import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/server/firebase-admin';
import { COLLECTIONS } from '@/lib/models/schema';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const doc = await adminDb.collection(COLLECTIONS.units).doc(id).get();
      if (!doc.exists) {
        return NextResponse.json({ success: false, error: 'Listing not found' }, { status: 404 });
      }
      const data = doc.data()!;
      return NextResponse.json({ 
        success: true, 
        listing: {
          id: doc.id,
          ...data,
          beds: data.bedrooms || 0,
          baths: data.bathrooms || 0,
          area: data.area || 0,
          propertyType: data.propertyType || data.type || 'apartment',
        } 
      });
    }

    const limitParam = parseInt(searchParams.get('limit') || '12', 10);
    const snapshot = await adminDb
      .collection(COLLECTIONS.units)
      .limit(limitParam)
      .get();

    const listings = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        beds: data.bedrooms || 0,
        baths: data.bathrooms || 0,
        area: data.area || 0,
        propertyType: data.propertyType || data.type || 'apartment',
      };
    });

    return NextResponse.json({ success: true, listings, count: listings.length });
  } catch (error) {
    console.error('[LISTINGS_ERROR] Failed to fetch listings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
