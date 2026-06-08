'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Play, 
  Pause,
  MapPin, 
  Maximize2,
  Minimize2,
  Sparkles
} from 'lucide-react';

type RoomId = 'salon' | 'pool' | 'penthouse';

interface Room {
  id: RoomId;
  name: string;
  image: string;
  description: string;
  hotspots: Hotspot[];
}

interface Hotspot {
  target: RoomId;
  label: string;
  yaw: number;     // horizontal angle in degrees (0 to 360)
  pitch: number;   // vertical offset in pixels
}

const ROOMS: Room[] = [
  {
    id: 'salon',
    name: 'Luxury Villa Salon',
    image: '/nc-villa.png',
    description: 'Bespoke grand reception featuring hand-carved marble floors and high ceiling double-glazed windows overlooking Golden Square.',
    hotspots: [
      { target: 'pool', label: 'Walk to Pool Terrace', yaw: 180, pitch: 0 },
    ]
  },
  {
    id: 'pool',
    name: 'Pool Terrace & Garden',
    image: '/villa.png',
    description: 'Private infinity pool enveloped by lush Mediterranean landscaping and premium outdoor lounge areas.',
    hotspots: [
      { target: 'salon', label: 'Enter Villa Salon', yaw: 40, pitch: -10 },
      { target: 'penthouse', label: 'Go up to Penthouse Suite', yaw: 280, pitch: 40 },
    ]
  },
  {
    id: 'penthouse',
    name: 'Master Penthouse Suite',
    image: '/penthouse.png',
    description: 'Executive sky suite with panoramic New Cairo horizons, custom dressing room, and private Jacuzzi.',
    hotspots: [
      { target: 'pool', label: 'Return to Pool Terrace', yaw: 160, pitch: -20 },
    ]
  }
];

export default function LuxuryVirtualViewport() {
  const [activeRoomId, setActiveRoomId] = useState<RoomId>('salon');
  const [yaw, setYaw] = useState(0); // 0 to 360 degrees
  const [pitch, setPitch] = useState(0); // -100 to 100 pixels
  const [zoom, setZoom] = useState(1.2); // 1.0 to 2.0
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startMouseRef = useRef({ x: 0, y: 0 });
  const startYawPitchRef = useRef({ yaw: 0, pitch: 0 });
  const imagesCachedRef = useRef<Record<string, HTMLImageElement>>({});

  const activeRoom = ROOMS.find(r => r.id === activeRoomId) || ROOMS[0];

  // Preload and cache all room images
  useEffect(() => {
    let loadedCount = 0;
    ROOMS.forEach(room => {
      const img = new Image();
      img.src = room.image;
      img.onload = () => {
        imagesCachedRef.current[room.id] = img;
        loadedCount++;
        if (loadedCount === ROOMS.length) {
          setLoading(false);
        }
      };
      img.onerror = () => {
        // Fallback if load fails
        console.warn(`Failed to load ${room.image}`);
        setLoading(false);
      };
    });
  }, []);

  // Auto-rotation system
  useEffect(() => {
    if (!autoRotate || isDraggingRef.current) return;
    const interval = setInterval(() => {
      setYaw(prev => (prev + 0.15) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesCachedRef.current[activeRoomId];
    if (!img) return;

    // Set canvas resolution to match container bounding box
    const rect = canvas.parentElement?.getBoundingClientRect();
    canvas.width = (rect?.width || 800) * window.devicePixelRatio;
    canvas.height = (rect?.height || 450) * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;

    ctx.clearRect(0, 0, w, h);

    // Calculate source slice parameters
    // We project the flat image as a wrap-around cylinder
    // Source dimensions
    const imgW = img.width;
    const imgH = img.height;

    // View dimensions with zoom
    const viewW = imgW / zoom;
    const viewH = imgH / zoom;

    // Calculate X center offset based on yaw
    // yaw maps 0..360 to 0..imgW
    const xCenter = (yaw / 360) * imgW;
    const sx = xCenter - viewW / 2;
    const sy = (imgH - viewH) / 2 + pitch;

    // Draw the image slice. To support wrapping at edges:
    if (sx < 0) {
      // Slice wraps around to the right
      const rightW = -sx;
      const leftW = viewW - rightW;

      // Draw right side of image on left side of canvas
      ctx.drawImage(img, imgW - rightW, sy, rightW, viewH, 0, 0, (rightW / viewW) * w, h);
      // Draw left side of image on right side of canvas
      ctx.drawImage(img, 0, sy, leftW, viewH, (rightW / viewW) * w, 0, (leftW / viewW) * w, h);
    } else if (sx + viewW > imgW) {
      // Slice wraps around to the left
      const leftW = imgW - sx;
      const rightW = viewW - leftW;

      // Draw left side on left of canvas
      ctx.drawImage(img, sx, sy, leftW, viewH, 0, 0, (leftW / viewW) * w, h);
      // Draw right side on right of canvas
      ctx.drawImage(img, 0, sy, rightW, viewH, (leftW / viewW) * w, 0, (rightW / viewW) * w, h);
    } else {
      // Normal draw without wrapping
      ctx.drawImage(img, sx, sy, viewW, viewH, 0, 0, w, h);
    }
  }, [activeRoomId, yaw, pitch, zoom, loading]);

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startMouseRef.current = { x: e.clientX, y: e.clientY };
    startYawPitchRef.current = { yaw, pitch };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startMouseRef.current.x;
    const dy = e.clientY - startMouseRef.current.y;

    // Sensitivity multipliers
    const sensitivityX = 0.25 / zoom;
    const sensitivityY = 0.4 / zoom;

    let nextYaw = (startYawPitchRef.current.yaw - dx * sensitivityX) % 360;
    if (nextYaw < 0) nextYaw += 360;

    let nextPitch = startYawPitchRef.current.pitch + dy * sensitivityY;
    // Bounds check to avoid panning outside image
    nextPitch = Math.max(-150, Math.min(150, nextPitch));

    setYaw(nextYaw);
    setPitch(nextPitch);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    isDraggingRef.current = true;
    startMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    startYawPitchRef.current = { yaw, pitch };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - startMouseRef.current.x;
    const dy = e.touches[0].clientY - startMouseRef.current.y;

    const sensitivityX = 0.25 / zoom;
    const sensitivityY = 0.4 / zoom;

    let nextYaw = (startYawPitchRef.current.yaw - dx * sensitivityX) % 360;
    if (nextYaw < 0) nextYaw += 360;

    let nextPitch = startYawPitchRef.current.pitch + dy * sensitivityY;
    nextPitch = Math.max(-150, Math.min(150, nextPitch));

    setYaw(nextYaw);
    setPitch(nextPitch);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const nextZoom = direction === 'in' ? prev + 0.15 : prev - 0.15;
      return Math.max(1.0, Math.min(2.0, nextZoom));
    });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        void containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        void document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen to escape key or fullscreen change events
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Compute hotspots screen positions based on yaw and pitch
  const renderHotspots = () => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    return activeRoom.hotspots.map((hs, idx) => {
      // Calculate delta yaw between hotspot and camera yaw
      let diffYaw = hs.yaw - yaw;
      // Normalize to -180..180
      if (diffYaw > 180) diffYaw -= 360;
      if (diffYaw < -180) diffYaw += 360;

      // Check if hotspot is within view frustum (approx ±55 degrees horizontal)
      const fieldOfView = 60 / zoom;
      if (Math.abs(diffYaw) > fieldOfView) return null;

      // Project onto canvas screen space
      const screenX = w / 2 + (diffYaw / fieldOfView) * (w / 2);
      // Project pitch
      const screenY = h / 2 - pitch * zoom + hs.pitch * zoom;

      // Bounds check on screen Y to avoid drawing out of container
      if (screenY < 40 || screenY > h - 40) return null;

      return (
        <button
          key={idx}
          onClick={(e) => {
            e.stopPropagation();
            setLoading(true);
            setTimeout(() => {
              setActiveRoomId(hs.target);
              setYaw(180); // reset yaw to center
              setPitch(0);
              setLoading(false);
            }, 600);
          }}
          style={{
            position: 'absolute',
            left: `${screenX}px`,
            top: `${screenY}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className="group flex flex-col items-center gap-2 z-10 transition-all select-none"
        >
          {/* Pulsing Hotspot Node */}
          <div className="relative w-8 h-8 rounded-full bg-gold/30 border-2 border-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <div className="w-3 h-3 rounded-full bg-gold animate-ping absolute" />
            <div className="w-3.5 h-3.5 rounded-full bg-gold" />
          </div>
          {/* Label banner */}
          <span className="px-3 py-1.5 rounded-xl bg-navy/95 border border-gold/40 text-gold text-[10px] font-black uppercase tracking-wider whitespace-nowrap shadow-xl opacity-90 group-hover:opacity-100 group-hover:bg-gold group-hover:text-navy transition-all">
            {hs.label}
          </span>
        </button>
      );
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full relative overflow-hidden rounded-[2.5rem] border border-gold/10 bg-navy ${
        isFullscreen ? 'h-screen w-screen' : 'aspect-[16/9] md:aspect-[21/9]'
      }`}
    >
      {/* ── Background Canvas ── */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* ── Hotspots Overlay ── */}
      {!loading && renderHotspots()}

      {/* ── Loading Overlay ── */}
      {loading && (
        <div className="absolute inset-0 bg-navy/80 backdrop-blur-md flex flex-col items-center justify-center z-20">
          <RotateCw className="animate-spin text-gold w-10 h-10 mb-4" />
          <p className="text-gold font-bold tracking-[0.2em] uppercase text-xs">Calibrating Immersive Space...</p>
        </div>
      )}

      {/* ── Top Bar Overlay (Branding & Description) ── */}
      <div className="absolute top-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start gap-4 pointer-events-none z-10">
        <div className="bg-navy/70 backdrop-blur-md border border-white/5 p-5 rounded-2xl max-w-sm pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="text-gold w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">AI 3D VIRTUAL TOUR</span>
          </div>
          <h2 className="text-white font-serif font-black text-lg">{activeRoom.name}</h2>
          <p className="text-white/60 text-xs leading-relaxed mt-2">{activeRoom.description}</p>
        </div>

        {/* Room selection tabs */}
        <div className="flex gap-2 bg-navy/70 backdrop-blur-md p-1.5 rounded-2xl border border-white/5 pointer-events-auto shadow-2xl">
          {ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setActiveRoomId(room.id);
                  setYaw(180);
                  setPitch(0);
                  setLoading(false);
                }, 500);
              }}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                activeRoomId === room.id 
                  ? 'bg-gold text-navy shadow-lg shadow-gold/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {room.id === 'salon' ? 'Salon' : room.id === 'pool' ? 'Pool Terrace' : 'Penthouse'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bottom Control Overlay (Compass, Zoom, Play/Pause, Fullscreen) ── */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10 pointer-events-none">
        
        {/* Compass dial */}
        <div className="flex items-center gap-3 bg-navy/70 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/5 pointer-events-auto shadow-2xl">
          <div 
            style={{ transform: `rotate(${-yaw}deg)` }}
            className="text-gold transition-transform duration-100 ease-out"
          >
            <Compass size={20} />
          </div>
          <div className="text-[10px] font-black text-white/70 tracking-widest uppercase font-mono">
            {Math.round(yaw)}° {yaw < 45 || yaw >= 315 ? 'N' : yaw < 135 ? 'E' : yaw < 225 ? 'S' : 'W'}
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={() => setAutoRotate(!autoRotate)}
            className="p-3 rounded-xl bg-navy/70 backdrop-blur-md border border-white/5 text-white/70 hover:text-gold hover:bg-navy transition-all shadow-2xl"
            title={autoRotate ? "Pause Auto-Rotation" : "Start Auto-Rotation"}
          >
            {autoRotate ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button 
            onClick={() => handleZoom('in')}
            className="p-3 rounded-xl bg-navy/70 backdrop-blur-md border border-white/5 text-white/70 hover:text-gold hover:bg-navy transition-all shadow-2xl"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>

          <button 
            onClick={() => handleZoom('out')}
            className="p-3 rounded-xl bg-navy/70 backdrop-blur-md border border-white/5 text-white/70 hover:text-gold hover:bg-navy transition-all shadow-2xl"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>

          <button 
            onClick={toggleFullscreen}
            className="p-3 rounded-xl bg-navy/70 backdrop-blur-md border border-white/5 text-white/70 hover:text-gold hover:bg-navy transition-all shadow-2xl"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
