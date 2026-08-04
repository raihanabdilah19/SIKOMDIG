import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  CloudRain,
  Clock,
  Sprout,
  Droplet,
  Bug,
  Calendar,
  MapPin,
  ShieldCheck,
  TrendingUp,
  FileEdit,
  PhoneCall,
  Mail,
  User as UserIcon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Leaf,
  MessageSquare,
  Send
} from 'lucide-react';
import { User, Schedule, Composter, FoodSecurityStats } from '../types';
import kadesBasuni from '../assets/images/input_file_6.jpg';
import WANotifikasiModal from './WANotifikasiModal';

interface DashboardProps {
  user: User;
  schedules: Schedule[];
  composters: Composter[];
  foodSecurity: FoodSecurityStats;
  setFoodSecurity: (stats: FoodSecurityStats) => void;
  onUpdateComposter?: (composter: Composter) => void;
  onUpdateComposters?: (composters: Composter[]) => void;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({
  user,
  schedules,
  composters,
  foodSecurity,
  setFoodSecurity,
  onUpdateComposter,
  onUpdateComposters,
  setActiveTab
}: DashboardProps) {
  const [dateTime, setDateTime] = useState(new Date());
  const [isEditingStats, setIsEditingStats] = useState(false);
  const [isWAModalOpen, setIsWAModalOpen] = useState(false);
  const [tempStats, setTempStats] = useState<FoodSecurityStats>({ ...foodSecurity });
  const [tempComposters, setTempComposters] = useState<Composter[]>(composters);

  // Sync temperature stats with prop changes
  useEffect(() => {
    setTempStats({ ...foodSecurity });
  }, [foodSecurity]);

  useEffect(() => {
    setTempComposters(composters);
  }, [composters]);

  // Clock ticks
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get greeting based on hour
  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 19) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  // Calculate statistics
  const activeCompostersCount = composters.filter((c) => c.status === 'Aktif').length;
  const fullCompostersCount = composters.filter((c) => c.status === 'Penuh').length;
  const pendingSchedules = schedules.filter((s) => s.status === 'Pending').length;

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    setFoodSecurity(tempStats);
    if (onUpdateComposters) {
      onUpdateComposters(tempComposters);
    } else if (onUpdateComposter) {
      tempComposters.forEach((c) => onUpdateComposter(c));
    }
    setIsEditingStats(false);
  };

  const handleComposterStatusChange = (id: string, newStatus: Composter['status']) => {
    setTempComposters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleComposterWeightChange = (id: string, weight: number) => {
    setTempComposters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, currentWeight: weight } : c))
    );
  };

  const handleComposterTempChange = (id: string, temp: number) => {
    setTempComposters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, temperature: temp } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Greeting, Date, & Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Personalized Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 bg-gradient-to-r from-green-700 to-emerald-600 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-lg shadow-green-700/10"
        >
          {/* Decorative graphic nodes */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-500/20 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-green-500/20 blur-2xl" />

          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-green-200/90 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              Portal SIKOMDIG • Desa Cibunian
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">
              {getGreeting()}, <span className="text-green-200">{user.name}</span>
            </h2>
            <p className="text-sm text-green-50/90 mt-2 max-w-xl font-light leading-relaxed">
              Selamat datang di pusat pemantauan pupuk organik dan pengolahan limbah ramah lingkungan. Mari bersama wujudkan kedaulatan pangan dan kelestarian pertanian Desa Cibunian!
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-4 mt-8 pt-4 border-t border-white/10 text-xs text-green-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-300" />
              <span>Sistem Terverifikasi</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-white/40" />
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-300" />
              <span>Efisiensi Pengomposan: 94%</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-white/40" />
            <button
              onClick={() => setIsWAModalOpen(true)}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white font-extrabold text-[11px] rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer border border-white/20"
            >
              <MessageSquare className="h-3.5 w-3.5 text-emerald-300" />
              <span>💬 Kirim Notif WA Warga</span>
            </button>
            <button
              onClick={() => setActiveTab('edukasi')}
              className="flex items-center gap-1 font-bold text-white hover:text-green-200 transition-colors ml-auto group cursor-pointer"
            >
              <span>Pelajari Edukasi Sampah</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Real-time DateTime & Weather Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-xs relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                WAKTU & CUACA LOKAL
              </span>
              <div className="flex items-center gap-2 text-slate-500 font-medium text-xs mt-1">
                <Clock className="h-3.5 w-3.5 text-green-600 shrink-0" />
                <span>Cibunian, Pamijahan</span>
              </div>
            </div>
            <div className="p-2.5 bg-sky-50 rounded-2xl text-sky-600 border border-sky-100">
              <CloudRain className="h-5 w-5 animate-bounce" />
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl font-black font-mono text-slate-800 tracking-tight">
              {formatTime(dateTime)}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              {formatDate(dateTime)}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-700">25°C</span>
              <span className="text-[10px] font-semibold bg-sky-50 border border-sky-100 text-sky-600 rounded-full px-2 py-0.5">
                Hujan Ringan
              </span>
            </div>
            <div className="text-slate-400 font-medium text-right">
              Kelembaban: <span className="font-bold text-slate-600">88%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key Metrics Grid & Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              METRIK REKOMPOSING & STOK
            </span>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Dapat Diedit Live
            </span>
          </div>
          <button
            onClick={() => setIsEditingStats(!isEditingStats)}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <FileEdit className="h-3.5 w-3.5" />
            <span>{isEditingStats ? 'Tutup Form Edit' : '✏️ Edit Data & Siklus'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Pengolahan Sampah',
              value: `${foodSecurity.wasteProcessed.toLocaleString('id-ID')} kg`,
              subtitle: 'Total limbah terolah',
              icon: Leaf,
              colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100/50',
              anim: { scale: 1.02 }
            },
            {
              title: 'Stok Kompos Kering',
              value: `${foodSecurity.compostStock.toLocaleString('id-ID')} kg`,
              subtitle: 'Pupuk siap distribusikan',
              icon: Sprout,
              colorClass: 'bg-green-50 text-green-600 border-green-100/50',
              anim: { scale: 1.02 }
            },
            {
              title: 'Stok Pupuk Cair',
              value: `${foodSecurity.fertilizerStock.toLocaleString('id-ID')} Liter`,
              subtitle: 'POC fermentasi matang',
              icon: Droplet,
              colorClass: 'bg-sky-50 text-sky-600 border-sky-100/50',
              anim: { scale: 1.02 }
            },
            {
              title: 'Siklus Komposter',
              value: `${activeCompostersCount} / ${composters.length}`,
              subtitle: `${fullCompostersCount} bak terisi penuh`,
              icon: ShieldCheck,
              colorClass: 'bg-amber-50 text-amber-600 border-amber-100/50',
              anim: { scale: 1.02 }
            }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={stat.anim}
                onClick={() => setIsEditingStats(true)}
                className="bg-white border border-slate-100 rounded-2xl p-4 md:p-5 flex flex-col justify-between shadow-xs transition-all hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-400 truncate group-hover:text-emerald-600 transition-colors">
                    {stat.title}
                  </span>
                  <div className={`p-2 rounded-xl border ${stat.colorClass} shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-lg md:text-2xl font-black text-slate-800 tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium mt-1 truncate">
                    {stat.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Products Showcase & Stats */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Food Security Interactive Stats Panel */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs relative">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  Pilar Ketahanan Pangan Desa Cibunian
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Integrasi logistik bahan pangan, pupuk hasil komposting, dan pakan budidaya BSF
                </p>
              </div>
              
              <button
                onClick={() => {
                  if (isEditingStats) {
                    setIsEditingStats(false);
                    setTempStats({ ...foodSecurity });
                  } else {
                    setIsEditingStats(true);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isEditingStats
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-green-50 text-green-600 border border-green-100 hover:bg-green-100'
                }`}
              >
                <FileEdit className="h-3.5 w-3.5" />
                <span>{isEditingStats ? 'Batal' : 'Edit Stok'}</span>
              </button>
            </div>

            {isEditingStats ? (
              <form onSubmit={handleSaveStats} className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">
                    1. Update Data Pengolahan & Stok Hasil (Kg / Liter)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        ♻️ Pengolahan Sampah / Limbah Terolah (Kg)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                        value={tempStats.wasteProcessed}
                        onChange={(e) => setTempStats({ ...tempStats, wasteProcessed: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        🌱 Stok Kompos Kering Siap Pakai (Kg)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                        value={tempStats.compostStock}
                        onChange={(e) => setTempStats({ ...tempStats, compostStock: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        💧 Stok Pupuk Organik Cair / POC (Liter)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                        value={tempStats.fertilizerStock}
                        onChange={(e) => setTempStats({ ...tempStats, fertilizerStock: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        🪱 Pakan Maggot BSF Kering (Kg)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                        value={tempStats.maggotStock}
                        onChange={(e) => setTempStats({ ...tempStats, maggotStock: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        🌾 Cadangan Beras / Lumbung Pangan (Kg)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                        value={tempStats.riceStock}
                        onChange={(e) => setTempStats({ ...tempStats, riceStock: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="mb-3">
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
                      2. Update Siklus Kompos & Status Bak Komposter RW
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Atur siklus keberadaan bak komposter (Aktif = Siap Diisi, Penuh = Dalam Proses Fermentasi, Perbaikan = Maintenance)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tempComposters.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-800">{c.code}</span>
                          <span className="text-[10px] text-slate-500 font-bold">{c.rtRw}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium truncate">{c.location}</p>

                        <div className="space-y-1.5 pt-1">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500">Status Siklus</label>
                            <select
                              value={c.status}
                              onChange={(e) => handleComposterStatusChange(c.id, e.target.value as any)}
                              className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none"
                            >
                              <option value="Aktif">🟢 Aktif (Siap Diisi)</option>
                              <option value="Penuh">🟡 Penuh (Fermentasi)</option>
                              <option value="Perbaikan">🔴 Perbaikan (Maintenance)</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500">Suhu (°C)</label>
                              <input
                                type="number"
                                value={c.temperature}
                                onChange={(e) => handleComposterTempChange(c.id, Number(e.target.value))}
                                className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500">Isi (Kg)</label>
                              <input
                                type="number"
                                value={c.currentWeight}
                                onChange={(e) => handleComposterWeightChange(c.id, Number(e.target.value))}
                                className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingStats(false);
                      setTempStats({ ...foodSecurity });
                      setTempComposters(composters);
                    }}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/10 cursor-pointer"
                  >
                    Simpan Semua Data & Siklus
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: 'Cadangan Pangan (Padi/Beras)',
                    value: `${foodSecurity.riceStock} kg`,
                    color: 'text-green-600 bg-green-50 border-green-100/50',
                    desc: 'Cadangan lumbung desa'
                  },
                  {
                    name: 'Stok Kompos Kering',
                    value: `${foodSecurity.compostStock} kg`,
                    color: 'text-amber-700 bg-amber-50 border-amber-100/50',
                    desc: 'Siap sebar ke petani'
                  },
                  {
                    name: 'Stok Pupuk Cair POC',
                    value: `${foodSecurity.fertilizerStock} L`,
                    color: 'text-sky-600 bg-sky-50 border-sky-100/50',
                    desc: 'Suplemen nutrisi tanah'
                  },
                  {
                    name: 'Pakan Maggot BSF',
                    value: `${foodSecurity.maggotStock} kg`,
                    color: 'text-rose-600 bg-rose-50 border-rose-100/50',
                    desc: 'Protein alternatif ternak'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        {item.name}
                      </span>
                      <span className="text-xl font-black text-slate-800 block">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium mt-3 block">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Products Grid (Click to view full module) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <Sprout className="h-5 w-5 text-green-600" />
                  Modul & Produk SIKOMDIG
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Klik modul di bawah untuk mempelajari cara pembuatan dan pemanfaatannya
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: 'kompos',
                  title: 'Pupuk Kompos Kering',
                  desc: 'Media tanam organik gembur kaya humus hasil penguraian aerobik mikroba.',
                  icon: Sprout,
                  colorClass: 'from-green-600/10 to-emerald-600/5 text-green-700 hover:border-green-300'
                },
                {
                  id: 'cair',
                  title: 'Pupuk Cair (POC)',
                  desc: 'Ekstrak cair kaya mikroorganisme aktif pelarut fosfat dan pemacu tumbuh.',
                  icon: Droplet,
                  colorClass: 'from-sky-600/10 to-blue-600/5 text-sky-700 hover:border-sky-300'
                },
                {
                  id: 'maggot',
                  title: 'Budidaya Maggot BSF',
                  desc: 'Pemanfaatan larva Black Soldier Fly untuk mereduksi sampah organik masif.',
                  icon: Bug,
                  colorClass: 'from-rose-600/10 to-amber-600/5 text-rose-700 hover:border-rose-300'
                }
              ].map((prod) => {
                const Icon = prod.icon;
                return (
                  <button
                    key={prod.id}
                    onClick={() => setActiveTab(prod.id)}
                    className={`bg-gradient-to-br ${prod.colorClass} border border-slate-100 rounded-2xl p-5 text-left flex flex-col justify-between h-48 transition-all hover:shadow-lg group cursor-pointer`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-white rounded-xl shadow-xs shrink-0 text-current">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/60 px-2 py-0.5 rounded-full text-slate-500 border border-slate-100">
                        Buka Modul
                      </span>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-extrabold text-slate-800 group-hover:text-green-700 transition-colors text-sm">
                        {prod.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {prod.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Schedule Table widget */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Upcoming Pickup Schedule
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Agenda pengambilan pupuk terdekat oleh petani & peternak
                </p>
              </div>
              <button
                onClick={() => setActiveTab('jadwal')}
                className="flex items-center gap-1 font-bold text-xs text-green-600 hover:text-green-700 transition-colors cursor-pointer group"
              >
                <span>Kelola Semua Jadwal ({pendingSchedules} Pending)</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold">
                    <th className="pb-3 pl-2">NAMA PENGAMBIL</th>
                    <th className="pb-3">JENIS PUPUK</th>
                    <th className="pb-3">TANGGAL</th>
                    <th className="pb-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {schedules.slice(0, 3).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 font-semibold text-slate-700 pl-2">
                        {item.name}
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 font-bold ${
                          item.fertilizerType === 'Kompos Kering'
                            ? 'text-green-600'
                            : item.fertilizerType === 'Pupuk Organik Cair (POC)'
                            ? 'text-sky-600'
                            : 'text-rose-600'
                        }`}>
                          {item.fertilizerType}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-slate-500">
                        {item.date}
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Selesai'
                            ? 'bg-green-50 text-green-600 border border-green-100'
                            : item.status === 'Pending'
                            ? 'bg-amber-50 text-amber-600 border border-amber-100'
                            : 'bg-slate-50 text-slate-500 border border-slate-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Profile summary & Quick coordinates map */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Quick Village Profile widget */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <div className="p-2 bg-green-50 text-green-600 rounded-xl border border-green-100 shrink-0">
                  <UserIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">Profil Pemimpin Desa</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Pemerintahan Desa Cibunian</p>
                </div>
              </div>

              {/* Leader profile details with beautiful mockup avatar */}
              <div className="flex gap-4 items-center mb-4">
                <div className="h-16 w-16 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center relative shrink-0 shadow-inner">
                  <img
                    src={kadesBasuni}
                    alt="Kades Basuni"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-green-600 text-white text-[8px] text-center font-bold py-0.5">
                    KADES
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-800 leading-tight">Basuni</h4>
                  <p className="text-xs text-slate-500 font-medium">Kepala Desa Cibunian</p>
                  <span className="inline-block text-[10px] font-bold bg-green-50 border border-green-100 text-green-600 rounded-full px-2 py-0.5">
                    Periode Aktif
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-normal bg-slate-50 p-3.5 rounded-2xl">
                "Pemerintah Desa Cibunian berkomitmen penuh untuk mewujudkan pembangunan yang terarah, bersih, transparan, serta mengutamakan pemenuhan hak-hak kebutuhan dasar seluruh warga."
              </p>
            </div>

            <button
              onClick={() => setActiveTab('profil')}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer border border-slate-100"
            >
              <span>Lihat Struktur Pemerintahan & Sejarah</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Map Location widget */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="p-2 bg-slate-50 text-slate-600 rounded-xl border border-slate-100 shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">Peta Sebaran Komposter</h3>
                <p className="text-[10px] text-slate-400 font-medium">Desa Cibunian, Pamijahan</p>
              </div>
            </div>

            {/* Simulated mini map container */}
            <div className="h-40 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200/60 shadow-inner flex items-center justify-center">
              {/* Fake abstract topographic lines */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute h-24 w-24 rounded-full bg-green-500/10 blur-xl top-4 left-6" />
              <div className="absolute h-20 w-20 rounded-full bg-emerald-500/10 blur-xl bottom-4 right-10" />

              {/* Fake roads */}
              <svg className="absolute inset-0 h-full w-full stroke-slate-300/80 stroke-[2] fill-none">
                <path d="M 0,20 Q 50,50 150,40 T 300,80" />
                <path d="M 120,0 Q 110,60 160,110 T 200,200" />
              </svg>

              {/* Pins from real composter coordinates */}
              {composters.slice(0, 4).map((c, i) => (
                <div
                  key={c.id}
                  style={{ left: `${c.coordinates.x}%`, top: `${c.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                >
                  <div className={`h-3 w-3 rounded-full animate-ping absolute -inset-1 ${
                    c.status === 'Aktif'
                      ? 'bg-green-400'
                      : c.status === 'Penuh'
                      ? 'bg-amber-400'
                      : 'bg-rose-400'
                  }`} />
                  <div className={`h-2.5 w-2.5 rounded-full border border-white shadow-xs relative ${
                    c.status === 'Aktif'
                      ? 'bg-green-500'
                      : c.status === 'Penuh'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`} />
                </div>
              ))}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-3 text-white flex items-center justify-between">
                <span className="text-[10px] font-bold">Sebaran 5 Titik RW</span>
                <span className="text-[9px] bg-green-600 px-2 py-0.5 rounded-full font-bold">LIVE</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('peta')}
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 text-white hover:bg-green-700 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg shadow-green-600/10"
            >
              <span>Buka Peta Interaktif & Koordinat</span>
              <MapPin className="h-3.5 w-3.5 animate-bounce" />
            </button>
          </div>

          {/* Quick Help Contacts widget */}
          <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-green-400">Kontak Pengaduan / Konsultasi</h3>
              <p className="text-[10px] text-slate-400 font-medium">Layanan respons cepat warga Desa Cibunian</p>
            </div>

            <div className="space-y-2 text-xs">
              <a
                href="https://wa.me/6289517923634"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors text-slate-200"
              >
                <div className="p-2 bg-green-500/10 text-green-400 rounded-lg">
                  <PhoneCall className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-bold">WhatsApp Admin SIKOMDIG</p>
                  <p className="text-[10px] text-slate-400 font-mono">089517923634 (+62 895-1792-3634)</p>
                </div>
              </a>

              <a
                href="mailto:sikomdig@cibunian-bogor.desa.id"
                className="flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors text-slate-200"
              >
                <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-bold">Email Portal Desa</p>
                  <p className="text-[10px] text-slate-400 font-mono">sikomdig@cibunian.desa.id</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* WhatsApp Notification Modal Component */}
      <WANotifikasiModal
        isOpen={isWAModalOpen}
        onClose={() => setIsWAModalOpen(false)}
        defaultPhone="089517923634"
      />
    </div>
  );
}
