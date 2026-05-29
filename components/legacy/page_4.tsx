"use client";
import React, { useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const AdminPortal = dynamic(() => import('../../components/Admin/AdminPortal'), { ssr: false });

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="loader-logo">SB</div>
        <div className="loader-text">Authenticating Admin…</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <AdminPortal />;
}
