import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';
import {
  MapPin,
  Plus,
  Thermometer,
  Percent,
  Compass,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  X,
  Sliders,
  Settings,
  Layers,
  Navigation,
  Maximize2,
  Minimize2,
  Flame,
  Droplet,
  Map as MapIcon,
  Crosshair,
  Route,
  Clock
} from 'lucide-react';
import { Composter } from '../types';

interface PetaKomposterProps {
  composters: Composter[];
  onAddComposter: (composter: Composter) => void;
  onUpdateComposter: (composter: Composter) => void;
}

// Center of Desa Cibunian, Kecamatan Pamijahan, Kabupaten Bogor
const CIBUNIAN_CENTER = { lat: -6.6812, lng: 106.6668 };

export default function PetaKomposter({ composters, onAddComposter, onUpdateComposter }: PetaKomposterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [selectedId, setSelectedId] = useState<string | null>(composters[0]?.id || null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'dark'>('roadmap');
  
  // Directions / Route simulator state
  const [activeRouteTo, setActiveRouteTo] = useState<Composter | null>(null);

  // Add new node state
  const [isAdding, setIsAdding] = useState(false);
  const [clickGeoCoords, setClickGeoCoords] = useState<{ lat: number; lng: number } | null>(null);
  
  const [newCode, setNewCode] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRtRw, setNewRtRw] = useState('');
  const [newCapacity, setNewCapacity] = useState<number>(200);

  // Edit selected state
  const [isEditing, setIsEditing] = useState(false);
  const [editTemp, setEditTemp] = useState(50);
  const [editPh, setEditPh] = useState(7);
  const [editMoisture, setEditMoisture] = useState(60);
  const [editWeight, setEditWeight] = useState(100);
  const [editStatus, setEditStatus] = useState<Composter['status']>('Aktif');

  // Leaflet map container reference
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polylineRef = useRef<L.Polyline | null>(null);

  // Find currently selected composter
  const selectedComposter = composters.find((c) => c.id === selectedId);

  // Initialize and update Leaflet Google Maps tiles engine
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      // Create leaflet map centered on Desa Cibunian
      const map = L.map(mapContainerRef.current, {
        center: [CIBUNIAN_CENTER.lat, CIBUNIAN_CENTER.lng],
        zoom: 15,
        zoomControl: false // custom zoom controls
      });

      leafletMapRef.current = map;

      // Handle click on map for adding new composter node
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        setClickGeoCoords({
          lat: Number(lat.toFixed(6)),
          lng: Number(lng.toFixed(6))
        });
      });
    }

    const map = leafletMapRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Select tile URL based on mapType
    let tileUrl = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'; // Google Roadmap
    if (mapType === 'satellite') {
      tileUrl = 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'; // Google Satellite
    } else if (mapType === 'hybrid') {
      tileUrl = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'; // Google Hybrid
    } else if (mapType === 'dark') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'; // CartoDB Dark
    }

    L.tileLayer(tileUrl, {
      maxZoom: 20,
      attribution: '&copy; <a href="https://maps.google.com">Google Maps</a> | SIKOMDIG Cibunian',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    return () => {
      // Keep map persistent across renders, destroyed on unmount
    };
  }, [mapType]);

  // Update markers on Leaflet map
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => map.removeLayer(marker));
    markersRef.current = {};

    composters.forEach((c) => {
      const lat = c.geoCoords?.lat || CIBUNIAN_CENTER.lat + (c.coordinates.y - 50) * 0.0003;
      const lng = c.geoCoords?.lng || CIBUNIAN_CENTER.lng + (c.coordinates.x - 50) * 0.0003;

      const isSelected = selectedId === c.id;

      // Color coding based on status
      const statusColor =
        c.status === 'Aktif'
          ? '#10b981'
          : c.status === 'Penuh'
          ? '#f59e0b'
          : '#ef4444';

      // Custom Google Maps style marker HTML icon
      const iconHtml = `
        <div class="relative group cursor-pointer">
          <div class="absolute -inset-2 rounded-full animate-ping opacity-40" style="background-color: ${statusColor}"></div>
          <div class="relative flex items-center justify-center w-9 h-9 rounded-full shadow-lg border-2 border-white transition-all transform ${
            isSelected ? 'scale-125 ring-4 ring-black/20 z-50' : 'hover:scale-110'
          }" style="background-color: ${statusColor}">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div class="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-md whitespace-nowrap border border-slate-700">
            ${c.code}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-gmaps-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 36]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedId(c.id);
        setIsEditing(false);
      });

      markersRef.current[c.id] = marker;
    });

    // Add temporary marker if adding new point
    if (isAdding && clickGeoCoords) {
      const addIconHtml = `
        <div class="relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white border-2 border-white shadow-xl animate-bounce">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
        </div>
      `;
      const addIcon = L.divIcon({
        html: addIconHtml,
        className: 'custom-gmaps-add-pin',
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });

      const tempMarker = L.marker([clickGeoCoords.lat, clickGeoCoords.lng], { icon: addIcon }).addTo(map);
      markersRef.current['temp_add'] = tempMarker;
    }
  }, [composters, selectedId, isAdding, clickGeoCoords]);

  // Handle route simulation polyline
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }

    if (activeRouteTo) {
      const destLat = activeRouteTo.geoCoords?.lat || CIBUNIAN_CENTER.lat;
      const destLng = activeRouteTo.geoCoords?.lng || CIBUNIAN_CENTER.lng;

      // Draw simulated route line from Kantor Desa (-6.6812, 106.6668) to target
      const routePoints: [number, number][] = [
        [CIBUNIAN_CENTER.lat, CIBUNIAN_CENTER.lng],
        [CIBUNIAN_CENTER.lat + (destLat - CIBUNIAN_CENTER.lat) * 0.5, CIBUNIAN_CENTER.lng + 0.0005],
        [destLat, destLng]
      ];

      const polyline = L.polyline(routePoints, {
        color: '#2563eb',
        weight: 5,
        opacity: 0.8,
        dashArray: '8, 8'
      }).addTo(map);

      polylineRef.current = polyline;
      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
    }
  }, [activeRouteTo]);

  // Center map on selected composter
  const handleCenterOnNode = (c: Composter) => {
    setSelectedId(c.id);
    setIsEditing(false);
    const map = leafletMapRef.current;
    if (!map) return;

    const lat = c.geoCoords?.lat || CIBUNIAN_CENTER.lat + (c.coordinates.y - 50) * 0.0003;
    const lng = c.geoCoords?.lng || CIBUNIAN_CENTER.lng + (c.coordinates.x - 50) * 0.0003;

    map.flyTo([lat, lng], 17, { duration: 1.2 });
  };

  // Submit new node form
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clickGeoCoords || !newCode.trim() || !newLocation.trim() || !newRtRw.trim()) {
      alert('Mohon klik titik pada peta untuk mendapatkan GPS koordinat dan isi data.');
      return;
    }

    const newNode: Composter = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      code: newCode,
      location: newLocation,
      rtRw: newRtRw,
      status: 'Aktif',
      temperature: 45,
      pH: 7.0,
      moisture: 60,
      capacity: Number(newCapacity),
      currentWeight: 10,
      lastChecked: new Date().toISOString().replace('T', ' ').substring(0, 16),
      coordinates: { x: 50, y: 50 },
      geoCoords: clickGeoCoords
    };

    onAddComposter(newNode);
    setSelectedId(newNode.id);
    
    // reset
    setIsAdding(false);
    setClickGeoCoords(null);
    setNewCode('');
    setNewLocation('');
    setNewRtRw('');
  };

  // Open edit stats
  const handleOpenEdit = () => {
    if (!selectedComposter) return;
    setEditTemp(selectedComposter.temperature);
    setEditPh(selectedComposter.pH);
    setEditMoisture(selectedComposter.moisture);
    setEditWeight(selectedComposter.currentWeight);
    setEditStatus(selectedComposter.status);
    setIsEditing(true);
  };

  // Save edited stats
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComposter) return;

    const updatedNode: Composter = {
      ...selectedComposter,
      temperature: Number(editTemp),
      pH: Number(editPh),
      moisture: Number(editMoisture),
      currentWeight: Number(editWeight),
      status: editStatus,
      lastChecked: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    onUpdateComposter(updatedNode);
    setIsEditing(false);
  };

  // Filter composters search list
  const filteredComposters = composters.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rtRw.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'semua') return matchesSearch;
    if (filterStatus === 'panas') return matchesSearch && c.temperature >= 55;
    return matchesSearch && c.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Top Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <MapIcon className="h-3 w-3" /> PETA GIS DESA
            </span>
            <span className="text-xs font-bold text-slate-500">Desa Cibunian, Kecamatan Pamijahan, Kabupaten Bogor</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Peta Digital Komposter Desa Cibunian
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Sistem Pemetaan Geografis (GIS) Bak Komposter Organik — Wilayah Desa Cibunian, Kec. Pamijahan, Kab. Bogor
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsAdding(!isAdding);
              setClickGeoCoords(null);
            }}
            className={`px-4 py-2.5 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${
              isAdding
                ? 'bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100'
                : 'bg-green-600 text-white hover:bg-green-700 shadow-green-600/10'
            }`}
          >
            {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            <span>{isAdding ? 'Batal Tambah' : 'Tambah Titik Komposter'}</span>
          </button>
        </div>
      </div>

      {/* Guide Banner for placing nodes */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-start gap-3"
          >
            <Info className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-extrabold text-sm mb-1">Mode Tambah Titik Baru Aktif (Klik Peta):</p>
              <p className="leading-relaxed font-normal">
                1. Silakan **klik lokasi manapun pada peta Google Maps** Desa Cibunian di bawah.<br />
                2. Koordinat GPS (Latitude, Longitude) akan otomatis terdeteksi.<br />
                3. Lengkapi formulir pendaftaran kode komposter dan rukun warga yang muncul.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Split visual section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Main Column: Visual Google Map Stage */}
        <div className="xl:col-span-8 space-y-4">
          <div className="bg-white border border-slate-100 rounded-3xl p-3 md:p-4 shadow-xs relative overflow-hidden">
            
            {/* Top GMaps Bar controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  TAMPILAN LAYER:
                </span>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setMapType('roadmap')}
                    className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                      mapType === 'roadmap' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Roadmap
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                      mapType === 'satellite' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Satelit
                  </button>
                  <button
                    onClick={() => setMapType('hybrid')}
                    className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                      mapType === 'hybrid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Hibrida
                  </button>
                  <button
                    onClick={() => setMapType('dark')}
                    className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg transition-all cursor-pointer ${
                      mapType === 'dark' ? 'bg-slate-900 text-emerald-400 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              {/* Reset view button */}
              <button
                onClick={() => {
                  setActiveRouteTo(null);
                  if (leafletMapRef.current) {
                    leafletMapRef.current.flyTo([CIBUNIAN_CENTER.lat, CIBUNIAN_CENTER.lng], 15);
                  }
                }}
                className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <Crosshair className="h-3.5 w-3.5 text-blue-600" />
                <span>Pusat Desa Cibunian</span>
              </button>
            </div>

            {/* Map Canvas Container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <div
                ref={mapContainerRef}
                className="h-[420px] md:h-[500px] w-full z-0"
              />

              {/* Floating Google Maps Overlay UI */}
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 shadow-lg max-w-xs space-y-2">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-extrabold text-slate-800">Cakupan Desa Cibunian</span>
                </div>
                <div className="text-[10px] space-y-1 font-medium text-slate-600">
                  <div className="flex justify-between">
                    <span>Kecamatan:</span>
                    <strong className="text-slate-800">Pamijahan</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Kabupaten:</span>
                    <strong className="text-slate-800">Bogor, Jawa Barat</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Bak Komposter:</span>
                    <strong className="text-green-600 font-bold">{composters.length} Unit</strong>
                  </div>
                </div>
              </div>

              {/* Map Legend Floating */}
              <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 shadow-lg text-[10px] space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="font-bold text-slate-700">Aktif (Suhu Normal)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span className="font-bold text-slate-700">Penuh (Matang)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="font-bold text-slate-700">Perbaikan Sensor</span>
                </div>
              </div>

              {/* Route status banner if active */}
              {activeRouteTo && (
                <div className="absolute top-4 right-4 z-10 bg-blue-900/90 text-white backdrop-blur-md rounded-2xl p-3 shadow-xl flex items-center gap-3 border border-blue-400/30 max-w-sm">
                  <Route className="h-6 w-6 text-blue-300 shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold block text-blue-200">Petunjuk Rute Aktif</span>
                    <p className="text-[11px] text-slate-200">
                      Kantor Desa ➔ {activeRouteTo.code} ({activeRouteTo.rtRw})
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveRouteTo(null)}
                    className="p-1 hover:bg-white/20 rounded-lg text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* New Composter Entry Form (shown when coordinate is clicked on map) */}
          <AnimatePresence>
            {isAdding && clickGeoCoords && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white border border-emerald-200 rounded-3xl p-6 shadow-md space-y-4"
              >
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      Daftarkan Bak Komposter Baru
                    </h3>
                    <p className="text-[10px] text-emerald-600 font-mono font-bold mt-0.5">
                      GPS Terpilih: Lat {clickGeoCoords.lat}, Lng {clickGeoCoords.lng}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setClickGeoCoords(null)}
                    className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Kode Komposter
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: KMP-RW06"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800 placeholder-slate-400"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Rukun Warga (RT/RW)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: RT 03 / RW 06"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800 placeholder-slate-400"
                      value={newRtRw}
                      onChange={(e) => setNewRtRw(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Lokasi / Patokan
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Samping Pos Kamling Dusun Atas"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800 placeholder-slate-400"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Kapasitas (Kg)
                      </label>
                      <input
                        type="number"
                        required
                        min="50"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                        value={newCapacity}
                        onChange={(e) => setNewCapacity(Number(e.target.value))}
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white font-bold text-xs rounded-xl hover:bg-green-700 transition-colors h-9 shrink-0 cursor-pointer shadow-md"
                    >
                      Daftarkan
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Column: Node list & telemetry controls */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Composter node search & filter list */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-3.5 w-3.5" />
                </div>
                <input
                  type="text"
                  placeholder="Cari lokasi komposter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
                <button
                  onClick={() => setFilterStatus('semua')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterStatus === 'semua'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilterStatus('aktif')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterStatus === 'aktif'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  Aktif
                </button>
                <button
                  onClick={() => setFilterStatus('penuh')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterStatus === 'penuh'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  Penuh
                </button>
                <button
                  onClick={() => setFilterStatus('panas')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filterStatus === 'panas'
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                  🔥 Matang (&gt;55°C)
                </button>
              </div>
            </div>

            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {filteredComposters.map((c) => {
                const isSelected = selectedId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleCenterOnNode(c)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-950 shadow-md'
                        : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold">{c.code}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {c.temperature}°C
                        </span>
                      </div>
                      <span className={`text-[10px] block truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {c.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-block h-2.5 w-2.5 rounded-full ${
                        c.status === 'Aktif'
                          ? 'bg-emerald-500'
                          : c.status === 'Penuh'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Node Live Telemetry Stats */}
          {selectedComposter ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-5">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">DETAIL LIVE SENSOR</span>
                  <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                    {selectedComposter.code}
                    <span className={`inline-block h-2 w-2 rounded-full ${
                      selectedComposter.status === 'Aktif'
                        ? 'bg-emerald-500'
                        : selectedComposter.status === 'Penuh'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`} />
                  </h3>
                  <span className="text-[9px] text-slate-500 font-mono block pt-0.5">
                    Cek terakhir: {selectedComposter.lastChecked}
                  </span>
                </div>

                <button
                  onClick={() => setActiveRouteTo(selectedComposter)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Petunjuk Rute</span>
                </button>
              </div>

              {isEditing ? (
                /* Simulated Telemetry Admin controls form */
                <form onSubmit={handleSaveEdit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                      Status Node
                    </label>
                    <select
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                    >
                      <option value="Aktif">Aktif (Suhu normal)</option>
                      <option value="Penuh">Penuh (Kompos matang)</option>
                      <option value="Perbaikan">Perbaikan (Sensor rusak)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Suhu (°C)
                      </label>
                      <input
                        type="number"
                        required
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none text-slate-800"
                        value={editTemp}
                        onChange={(e) => setEditTemp(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        pH Keasaman
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none text-slate-800"
                        value={editPh}
                        onChange={(e) => setEditPh(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Kelembaban (%)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        max="100"
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none text-slate-800"
                        value={editMoisture}
                        onChange={(e) => setEditMoisture(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Isi Berat (Kg)
                      </label>
                      <input
                        type="number"
                        required
                        max={selectedComposter.capacity}
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none text-slate-800"
                        value={editWeight}
                        onChange={(e) => setEditWeight(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-1.5 bg-green-600 text-white hover:bg-green-700 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Simpan Sensor
                    </button>
                  </div>
                </form>
              ) : (
                /* View measurements */
                <div className="space-y-4">
                  {/* Progress fill visual bar */}
                  <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-600">Kapasitas Muatan Bak</span>
                      <span className="font-mono font-black text-slate-800">
                        {selectedComposter.currentWeight} / {selectedComposter.capacity} Kg
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${(selectedComposter.currentWeight / selectedComposter.capacity) * 100}%` }}
                        className={`h-full rounded-full transition-all ${
                          selectedComposter.status === 'Penuh'
                            ? 'bg-amber-500'
                            : 'bg-emerald-600'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Telemetry Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-50/50 p-3 rounded-xl text-center border border-slate-100">
                      <Flame className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">SUHU</span>
                      <span className="text-sm font-black text-slate-700 font-mono block mt-1">
                        {selectedComposter.temperature}°C
                      </span>
                    </div>
                    <div className="bg-slate-50/50 p-3 rounded-xl text-center border border-slate-100">
                      <Droplet className="h-4 w-4 text-sky-500 mx-auto mb-1" />
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">BASAH</span>
                      <span className="text-sm font-black text-slate-700 font-mono block mt-1">
                        {selectedComposter.moisture}%
                      </span>
                    </div>
                    <div className="bg-slate-50/50 p-3 rounded-xl text-center border border-slate-100">
                      <Compass className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                      <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">PH</span>
                      <span className="text-sm font-black text-slate-700 font-mono block mt-1">
                        {selectedComposter.pH}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 leading-relaxed font-normal">
                    <p className="text-slate-600">
                      <strong className="text-slate-800">Detail Lokasi:</strong> {selectedComposter.location}
                    </p>
                    <p className="text-slate-600">
                      <strong className="text-slate-800">Wilayah RW:</strong> {selectedComposter.rtRw}
                    </p>
                    {selectedComposter.geoCoords && (
                      <p className="text-slate-500 font-mono text-[10px] pt-1">
                        GPS: Lat {selectedComposter.geoCoords.lat}, Lng {selectedComposter.geoCoords.lng}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleOpenEdit}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-100 transition-colors cursor-pointer"
                  >
                    <Settings className="h-4 w-4 text-slate-400" />
                    <span>Konfigurasi Sensor (Simulasi)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-10 text-center text-slate-400">
              Pilih komposter di peta untuk melihat telemetry data.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
