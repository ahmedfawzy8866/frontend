/**
 * SIERRA DEALS MCP SERVER (PRODUCTION READY)
 * Handles Deal state management & orchestration logic.
 */

import { adminDb } from '../lib/server/firebase-admin';
import { COLLECTIONS } from '../lib/models/schema';
import { Timestamp } from 'firebase-admin/firestore';

export const mcp_sierra_deals = {
  name: 'sierra-deals',
  tools: [
    {
      name: 'create_deal',
      async handler(args: { leadId: string; propertyCode: string; terms: any }) {
        console.log(`[DealsMCP] Creating deal record for ${args.leadId}`);
        const dealRef = await adminDb.collection('deals').add({
          leadId: args.leadId,
          propertyCode: args.propertyCode,
          status: 'draft',
          terms: args.terms,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
        return { success: true, dealId: dealRef.id };
      }
    },
    {
      name: 'update_deal_status',
      async handler(args: { dealId: string; status: string }) {
        console.log(`[DealsMCP] Transitioning Deal ${args.dealId} to ${args.status}`);
        await adminDb.collection('deals').doc(args.dealId).update({
          status: args.status,
          updatedAt: Timestamp.now()
        });
        return { success: true };
      }
    },
    {
      name: 'get_deal_summary',
      async handler(args: { dealId: string }) {
        const snap = await adminDb.collection('deals').doc(args.dealId).get();
        return snap.exists ? snap.data() : { error: 'Not found' };
      }
    }
  ]
};
