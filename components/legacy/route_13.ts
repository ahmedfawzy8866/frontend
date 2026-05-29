import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) => {
  try {
    const { leadId } = await params;
    
    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Query Firestore for the concierge portfolio
    const q = query(
      collection(db, 'concierge_selections'),
      where('leadId', '==', leadId)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    const portfolio = snapshot.docs[0].data();
    portfolio.id = snapshot.docs[0].id;

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
};
