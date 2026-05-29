import { sendPortfolioViaWhatsApp } from '@/lib/services/portfolio-engine';
import { getDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextRequest, NextResponse } from 'next/server';

interface SendPortfolioRequest {
  leadId: string;
  phoneNumber?: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const body: SendPortfolioRequest = await req.json();
    const { leadId, phoneNumber } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Fetch lead to get phone number if not provided
    const leadSnap = await getDoc(doc(db, 'stakeholders', leadId));
    if (!leadSnap.exists()) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    const lead = leadSnap.data();
    const phone = phoneNumber || lead.phone || lead.whatsapp;

    if (!phone) {
      return NextResponse.json(
        { error: 'No phone number found for this lead' },
        { status: 400 }
      );
    }

    // Fetch the concierge portfolio
    const portfolioSnap = await getDoc(doc(db, 'stakeholders', leadId));
    const portfolioId = portfolioSnap.data()?.conciergePortfolioId;

    if (!portfolioId) {
      return NextResponse.json(
        { error: 'No portfolio found for this lead. Run curation first.' },
        { status: 400 }
      );
    }

    const portfolioSnap2 = await getDoc(doc(db, 'concierge_selections', portfolioId));
    if (!portfolioSnap2.exists()) {
      return NextResponse.json(
        { error: 'Portfolio data not found' },
        { status: 404 }
      );
    }

    const portfolio = { id: portfolioSnap2.id, ...portfolioSnap2.data() } as any;

    // Send via WhatsApp
    await sendPortfolioViaWhatsApp(leadId, portfolio, phone);

    // Update lead record
    await updateDoc(doc(db, 'stakeholders', leadId), {
      'conciergePortfolioSentAt': serverTimestamp(),
      'conciergePortfolioSentVia': 'whatsapp',
    });

    return NextResponse.json({
      success: true,
      message: `Portfolio sent to ${phone}`,
    });
  } catch (error) {
    console.error('Error sending portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to send portfolio' },
      { status: 500 }
    );
  }
};
