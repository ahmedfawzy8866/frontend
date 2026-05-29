import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

interface ViewingRequest {
  leadId: string;
  unitId: string;
  portfolioId: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const body: ViewingRequest = await req.json();
    const { leadId, unitId, portfolioId } = body;

    if (!leadId || !unitId) {
      return NextResponse.json(
        { error: 'Lead ID and Unit ID are required' },
        { status: 400 }
      );
    }

    // Create viewing request record
    const viewingRef = await addDoc(collection(db, 'viewing_requests'), {
      leadId,
      unitId,
      portfolioId,
      status: 'pending',
      createdAt: serverTimestamp(),
      requestedAt: new Date().toISOString(),
    });

    // Update lead record
    await updateDoc(doc(db, 'stakeholders', leadId), {
      'viewingRequests': {
        [unitId]: {
          requestedAt: serverTimestamp(),
          status: 'pending',
        },
      },
      'lastViewingRequestAt': serverTimestamp(),
    });

    // TODO: Send Telegram alert to sales team about viewing request
    console.log(`📍 Viewing request created for ${leadId} - ${unitId}`);

    return NextResponse.json({
      success: true,
      viewingId: viewingRef.id,
      message: 'Viewing request submitted successfully',
    });
  } catch (error) {
    console.error('Error requesting viewing:', error);
    return NextResponse.json(
      { error: 'Failed to request viewing' },
      { status: 500 }
    );
  }
};
