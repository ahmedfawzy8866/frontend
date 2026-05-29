"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  getDoc, 
  orderBy, 
  limit, 
  getCountFromServer,
  Timestamp,
  queryEqual
} from 'firebase/firestore';
import { COLLECTIONS } from '@/lib/models/schema';

/**
 * useSierraBlu
 * The master hook for the Sierra AI Frontend.
 * Abstracts away direct Firebase calls and ensures consistent collection naming.
 */
export function useSierraBlu() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Inventory (Units) ---
  const [units, setUnits] = useState<any[]>([]);
  
  useEffect(() => {
    setLoading(true);
    // Use COLLECTIONS.units which maps to 'listings'
    const q = query(collection(db, COLLECTIONS.units), limit(50));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const unitData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setUnits(unitData);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore Units Error:", err);
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // --- Lead & Stakeholder Management ---
  const getLeadData = async (leadId: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, COLLECTIONS.stakeholders, leadId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // --- KPI Aggregations ---
  const getDashboardStats = async () => {
    try {
      const [unitsCount, activeDealsCount, recentActivities] = await Promise.all([
        getCountFromServer(collection(db, COLLECTIONS.units)),
        getCountFromServer(query(collection(db, COLLECTIONS.sales), where('status', '!=', 'closed'))),
        getDocs(query(collection(db, COLLECTIONS.activities), orderBy('createdAt', 'desc'), limit(5)))
      ]);

      return {
        totalUnits: unitsCount.data().count,
        activeDeals: activeDealsCount.data().count,
        recentActivities: recentActivities.docs.map(d => ({ id: d.id, ...d.data() }))
      };
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  // --- Agent Commands (Orchestration) ---
  const triggerAgent = async (agentName: string, action: string, payload: any) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/agents/${agentName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
      });
      return await response.json();
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    units,
    loading,
    error,
    getLeadData,
    getDashboardStats,
    triggerAgent
  };
}
