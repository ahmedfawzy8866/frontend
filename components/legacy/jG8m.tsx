'use client';

import { useEffect, useRef, useState } from 'react';

const compounds = [
  { name: 'Mivida', lat: 30.027, lng: 31.443, units: 240, type: 'Residential' },
  { name: 'Hyde Park', lat: 30.018, lng: 31.480, units: 180, type: 'Luxury' },
  { name: 'Cairo Festival City', lat: 30.032, lng: 31.488, units: 320, type: 'Mixed' },
  { name: 'Mountain View', lat: 30.045, lng: 31.455, units: 150, type: 'Residential' },
  { name: 'Palm Hills', lat: 30.010, lng: 31.462, units: 200, type: 'Luxury' },
  { name: 'Sodic East', lat: 30.056, lng: 31.490, units: 280, type: 'Premium' },
  { name: 'Rehab City', lat: 30.038, lng: 31.435, units: 190, type: 'Standard' },
];

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [activeCompound, setActiveCompound] = useState<string | null>(null);
  const markersRef = useRef<Record<string, any>>({});

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // dynamically import leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!).setView([30.035, 31.460], 13);
      mapInstance.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© CartoDB',
        maxZoom: 19,
        minZoom: 10,
      }).addTo(map);

      const customIcon = L.divIcon({
        html: `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#D4AF37" opacity="0.9"/>
          <circle cx="16" cy="16" r="8" fill="none" stroke="#1A3D6B" stroke-width="2"/>
          <text x="16" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#1A3D6B" font-family="Arial">S</text>
        </svg>`,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      });

      compounds.forEach((compound) => {
        const marker = L.marker([compound.lat, compound.lng], { icon: customIcon })
          .bindPopup(
            `<div style="font-family: Inter, sans-serif; width: 220px;">
              <div style="background: linear-gradient(135deg, #D4AF37, #E8CC6A); color: #1A3D6B; padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                ✓ Verified Listing
              </div>
              <h3 style="color: #1A3D6B; font-size: 16px; margin-bottom: 8px;">${compound.name}</h3>
              <p style="color: #6B7280; font-size: 13px; margin-bottom: 12px;">${compound.type} • ${compound.units} Units</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #E5E7EB;">
                <div style="font-size: 12px;"><span style="color: #6B7280; font-size: 10px; text-transform: uppercase; font-weight: 600;">Type</span><br><span style="color: #1A3D6B; font-weight: 700;">${compound.type}</span></div>
                <div style="font-size: 12px;"><span style="color: #6B7280; font-size: 10px; text-transform: uppercase; font-weight: 600;">Units</span><br><span style="color: #1A3D6B; font-weight: 700;">${compound.units}</span></div>
              </div>
              <button style="width: 100%; padding: 10px; background: #1A3D6B; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 13px;">View Details →</button>
            </div>`
          )
          .addTo(map);

        markersRef.current[compound.name] = { marker, compound };
      });
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const flyTo = (compound: (typeof compounds)[0]) => {
    setActiveCompound(compound.name);
    if (mapInstance.current && markersRef.current[compound.name]) {
      mapInstance.current.flyTo([compound.lat, compound.lng], 15, { duration: 1 });
      markersRef.current[compound.name].marker.openPopup();
    }
  };

  return (
    <div className="map-container">
      <div className="compound-list">
        <h3 style={{ marginBottom: '16px', color: '#1A3D6B', fontSize: '16px', fontWeight: 700 }}>
          Compounds
        </h3>
        {compounds.map((c) => (
          <div
            key={c.name}
            className={`compound-item${activeCompound === c.name ? ' active-compound' : ''}`}
            onClick={() => flyTo(c)}
          >
            <h4>{c.name}</h4>
            <p>{c.type} • {c.units} units</p>
          </div>
        ))}
      </div>
      <div ref={mapRef} id="map" />
    </div>
  );
}
