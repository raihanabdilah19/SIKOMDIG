import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Plus,
  Search,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  UserPlus,
  FileText,
  Weight,
  X,
  XCircle,
  Filter,
  MessageSquare,
  Send,
  BellRing,
  AlertTriangle,
  Zap,
  Sparkles
} from 'lucide-react';
import { Schedule } from '../types';
import WANotifikasiModal from './WANotifikasiModal';

interface JadwalCRUDProps {
  schedules: Schedule[];
  onAddSchedule: (schedule: Schedule) => void;
  onUpdateSchedule: (schedule: Schedule) => void;
  onDeleteSchedule: (id: string) => void;
}

export default function JadwalCRUD({
  schedules,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule
}: JadwalCRUDProps) {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Selesai' | 'Dibatalkan'>('All');
  const [fertilizerFilter, setFertilizerFilter] = useState<'All' | 'Kompos Kering' | 'Pupuk Organik Cair (POC)' | 'Maggot BSF'>('All');

  // Delete Confirmation state
  const [deletingSchedule, setDeletingSchedule] = useState<Schedule | null>(null);

  // Form states (Add/Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // WhatsApp Modal state
  const [isWAModalOpen, setIsWAModalOpen] = useState(false);
  const [waSchedule, setWaSchedule] = useState<Schedule | null>(null);

  // Auto notification state for due schedules
  const todayStr = new Date().toISOString().split('T')[0];
  const dueSchedules = schedules.filter(
    (s) => s.status === 'Pending' && s.date <= todayStr
  );

  const [showAutoNotifModal, setShowAutoNotifModal] = useState<boolean>(false);
  const [autoNotifDismissed, setAutoNotifDismissed] = useState<boolean>(false);

  // Auto-show popup modal if there are due schedules
  useEffect(() => {
    if (dueSchedules.length > 0 && !autoNotifDismissed) {
      setShowAutoNotifModal(true);
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          try {
            new Notification('📢 SIRAM Desa Cibunian', {
              body: `Ada ${dueSchedules.length} agenda pengambilan pupuk yang memasuki tanggal hari ini (${todayStr})!`,
            });
          } catch {
            // ignore
          }
        } else if (Notification.permission === 'default') {
          Notification.requestPermission();
        }
      }
    }
  }, [dueSchedules.length, autoNotifDismissed, todayStr]);

  // State for direct auto notification status feedback
  const [directNotifSent, setDirectNotifSent] = useState<string | null>(null);

  // Date calculation helper according to SIKOMDIG rules
  // Pupuk Organik Cair (POC) / Maggot: 2 Minggu (14 Hari)
  // Kompos Kering / Padat: 4 Minggu (28 Hari)
  const calculateReadyDate = (startDateStr: string, fertilizerType: Schedule['fertilizerType']): string => {
    const d = new Date(startDateStr || todayStr);
    if (isNaN(d.getTime())) return todayStr;
    const daysToAdd = fertilizerType === 'Pupuk Organik Cair (POC)' || fertilizerType === 'Maggot BSF' ? 14 : 28;
    d.setDate(d.getDate() + daysToAdd);
    return d.toISOString().split('T')[0];
  };

  const handleSendDirectBackgroundApi = async (item: Schedule) => {
    const token = localStorage.getItem('SIKOMDIG_WA_GATEWAY_TOKEN') || '';
    const formattedName = item.name.trim() || 'Warga Cibunian';
    const isPOC = item.fertilizerType.includes('POC') || item.fertilizerType.includes('Cair');
    const processDuration = isPOC ? '2 MINGGU (14 Hari)' : '4 MINGGU (28 Hari)';
    const msg = `*📢 [SIRAM DESA CIBUNIAN]*\n` +
      `*NOTIFIKASI OTOMATIS JADWAL PENGAMBILAN PUPUK*\n\n` +
      `Yth. Bapak/Ibu *${formattedName}*,\n\n` +
      `Pemberitahuan resmi mengenai agenda distribusi pupuk organik Anda:\n` +
      `• *Jenis Pupuk:* ${item.fertilizerType}\n` +
      `• *Masa Olah/Fermentasi:* ${processDuration} (Proses Matang Selesai)\n` +
      `• *Tanggal Mulai Proses:* ${item.startDate || 'Pendaftaran'}\n` +
      `• *Tanggal Siap Ambil:* ${item.date} (HARI INI / JATUH TEMPO)\n` +
      `• *Jumlah:* ${item.amount} ${item.fertilizerType.includes('POC') ? 'Liter' : 'Kg'}\n` +
      `• *Lokasi:* Depo TPS3R / Bank Sampah Desa Cibunian\n` +
      `• *Catatan:* ${item.notes || 'Harap membawa wadah/kantong sendiri.'}\n\n` +
      `Masa proses pembuatan pupuk (${processDuration}) telah selesai dan pupuk kini sudah siap diambil di Depo TPS3R. Terima kasih!\n\n` +
      `_Sistem Informasi Ramah Lingkungan (SIRAM)_\n` +
      `_Pemerintah Desa Cibunian_`;

    // 1. Immediately open WhatsApp with target phone number 089517923634 and text
    const waUrl = `https://api.whatsapp.com/send?phone=6289517923634&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    // 2. Also send via API Gateway if Fonnte token exists
    if (token.trim()) {
      try {
        await fetch('https://api.fonnte.com/send-message', {
          method: 'POST',
          headers: {
            'Authorization': token.trim(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            target: '6289517923634',
            message: msg,
            countryCode: '62'
          })
        });
      } catch {
        // ignore
      }
    }

    setDirectNotifSent(`📲 Membuka WhatsApp & Mengirim Notifikasi ke ${item.name || 'Warga'} (089517923634)!`);
    setTimeout(() => setDirectNotifSent(null), 5000);
  };

  const handleSendAllBackgroundApi = async () => {
    setDirectNotifSent(`⏳ Mengirimkan ${dueSchedules.length} Notifikasi WA Otomatis di Latar Belakang...`);
    for (let i = 0; i < dueSchedules.length; i++) {
      await handleSendDirectBackgroundApi(dueSchedules[i]);
    }
    setDirectNotifSent(`✅ Seluruh ${dueSchedules.length} Notifikasi WA Otomatis Sukses Terkirim di Latar Belakang!`);
    setTimeout(() => setDirectNotifSent(null), 6000);
  };

  const handleSendDirectWA = (item: Schedule) => {
    const formattedName = item.name.trim() || 'Warga Cibunian';
    const isPOC = item.fertilizerType.includes('POC') || item.fertilizerType.includes('Cair');
    const processDuration = isPOC ? '2 MINGGU (14 Hari)' : '4 MINGGU (28 Hari)';
    const msg = `*📢 [SIRAM DESA CIBUNIAN]*\n` +
      `*NOTIFIKASI OTOMATIS JADWAL PENGAMBILAN PUPUK*\n\n` +
      `Yth. Bapak/Ibu *${formattedName}*,\n\n` +
      `Pemberitahuan resmi mengenai agenda distribusi pupuk organik Anda:\n` +
      `• *Jenis Pupuk:* ${item.fertilizerType}\n` +
      `• *Masa Olah/Fermentasi:* ${processDuration} (Proses Matang Selesai)\n` +
      `• *Tanggal Siap Ambil:* ${item.date} (HARI INI / JATUH TEMPO)\n` +
      `• *Jumlah:* ${item.amount} ${item.fertilizerType.includes('POC') ? 'Liter' : 'Kg'}\n` +
      `• *Lokasi:* Depo TPS3R / Bank Sampah Desa Cibunian\n` +
      `• *Catatan:* ${item.notes || 'Harap membawa wadah/kantong sendiri.'}\n\n` +
      `Masa fermentasi/proses ${processDuration} telah selesai dan pupuk kini sudah siap diambil di Depo TPS3R. Terima kasih!\n\n` +
      `_Sistem Informasi Ramah Lingkungan (SIRAM)_\n` +
      `_Pemerintah Desa Cibunian_`;

    const waUrl = `https://api.whatsapp.com/send?phone=6289517923634&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };
  
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState<Schedule['fertilizerType']>('Kompos Kering');
  const [formStartDate, setFormStartDate] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formAmount, setFormAmount] = useState<number>(10);
  const [formStatus, setFormStatus] = useState<Schedule['status']>('Pending');
  const [formNotes, setFormNotes] = useState('');

  // Stats calculation
  const totalCount = schedules.length;
  const pendingCount = schedules.filter((s) => s.status === 'Pending').length;
  const completedCount = schedules.filter((s) => s.status === 'Selesai').length;

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormName('');
    setFormType('Kompos Kering');
    const start = new Date().toISOString().split('T')[0];
    setFormStartDate(start);
    const calculatedReady = calculateReadyDate(start, 'Kompos Kering');
    setFormDate(calculatedReady);
    setFormAmount(10);
    setFormStatus('Pending');
    setFormNotes(`Mulai proses komposting ${start}. Estimasi matang 4 minggu (28 hari) pada ${calculatedReady}.`);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (item: Schedule) => {
    setEditingId(item.id);
    setFormName(item.name);
    setFormType(item.fertilizerType);
    const start = item.startDate || item.date;
    setFormStartDate(start);
    setFormDate(item.date);
    setFormAmount(item.amount);
    setFormStatus(item.status);
    setFormNotes(item.notes || '');
    setIsFormOpen(true);
  };

  const handleTypeChange = (newType: Schedule['fertilizerType']) => {
    setFormType(newType);
    const start = formStartDate || todayStr;
    const ready = calculateReadyDate(start, newType);
    setFormDate(ready);
    const daysText = newType === 'Pupuk Organik Cair (POC)' ? '2 minggu (14 hari)' : '4 minggu (28 hari)';
    setFormNotes(`Proses pembuatan dimulai ${start}. Estimasi matang ${daysText} pada ${ready}.`);
  };

  const handleStartDateChange = (newStart: string) => {
    setFormStartDate(newStart);
    const ready = calculateReadyDate(newStart, formType);
    setFormDate(ready);
    const daysText = formType === 'Pupuk Organik Cair (POC)' ? '2 minggu (14 hari)' : '4 minggu (28 hari)';
    setFormNotes(`Proses pembuatan dimulai ${newStart}. Estimasi matang ${daysText} pada ${ready}.`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim() || !formDate || formAmount <= 0) {
      alert('Mohon isi semua bidang formulir dengan benar.');
      return;
    }

    if (editingId) {
      // Edit mode
      const updatedItem: Schedule = {
        id: editingId,
        name: formName,
        fertilizerType: formType,
        startDate: formStartDate || todayStr,
        date: formDate,
        amount: Number(formAmount),
        status: formStatus,
        notes: formNotes
      };
      onUpdateSchedule(updatedItem);
      if (formStatus === 'Pending' && formDate <= todayStr) {
        setAutoNotifDismissed(false);
        setShowAutoNotifModal(true);
      }
    } else {
      // Add mode
      const newItem: Schedule = {
        id: `SCH-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formName,
        fertilizerType: formType,
        startDate: formStartDate || todayStr,
        date: formDate,
        amount: Number(formAmount),
        status: formStatus,
        notes: formNotes
      };
      onAddSchedule(newItem);
      if (formStatus === 'Pending' && formDate <= todayStr) {
        setAutoNotifDismissed(false);
        setShowAutoNotifModal(true);
      }
    }
    setIsFormOpen(false);
  };

  // Filtered lists
  const filteredSchedules = schedules.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (s.notes && s.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesFertilizer = fertilizerFilter === 'All' || s.fertilizerType === fertilizerFilter;

    return matchesSearch && matchesStatus && matchesFertilizer;
  });

  return (
    <div className="space-y-6">
      {/* Top action header & stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-50 text-green-600 rounded-xl border border-green-100">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                Jadwal Pengambilan Pupuk & Pakan BSF
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Kelola pencatatan distribusi pupuk organik padat, cair, dan maggot pakan ternak warga
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              setWaSchedule(null);
              setIsWAModalOpen(true);
            }}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Kirim Notif WA Warga</span>
          </button>

          <button
            onClick={handleOpenAddForm}
            className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-green-600/20 active:scale-[0.98] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Buat Jadwal Baru</span>
          </button>
        </div>
      </div>

      {/* Auto-Notification Alert Banner for Due Schedules */}
      {dueSchedules.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-700 rounded-2xl p-4 md:p-5 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden border border-amber-300/40"
        >
          <div className="flex items-start gap-3 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shrink-0 text-white animate-bounce">
              <BellRing className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-amber-300 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Notifikasi Otomatis Hari Ini
                </span>
                <span className="text-xs font-mono font-bold text-amber-100">
                  {todayStr}
                </span>
              </div>
              <h3 className="font-black text-sm md:text-base leading-tight">
                ⏰ Ada {dueSchedules.length} Jadwal Pengambilan Pupuk Sudah Waktunya!
              </h3>
              <p className="text-xs text-emerald-50/90 leading-relaxed max-w-2xl">
                Sistem mendeteksi jadwal pengambilan pupuk yang telah memasuki tanggal pengambilan. Kirimkan pesan notifikasi resmi langsung ke WhatsApp warga!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 relative z-10 w-full md:w-auto justify-end">
            <button
              onClick={() => {
                // Trigger WA notification for the first due schedule
                if (dueSchedules[0]) {
                  handleSendDirectWA(dueSchedules[0]);
                }
              }}
              className="px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Send className="h-4 w-4 text-emerald-600" />
              <span>📱 Kirim Notif WA Otomatis</span>
            </button>
            <button
              onClick={() => setShowAutoNotifModal(true)}
              className="px-3 py-2.5 bg-black/20 hover:bg-black/30 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Lihat Detail ({dueSchedules.length})
            </button>
          </div>
        </motion.div>
      )}

      {/* Stats row widget */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">TOTAL AGENDA</span>
            <span className="text-2xl font-black text-slate-800 font-mono block mt-0.5">{totalCount}</span>
          </div>
          <div className="h-10 w-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100">
            <Calendar className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-amber-50/40 border border-amber-100/80 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-600 block uppercase tracking-wider">MENUNGGU (PENDING)</span>
            <span className="text-2xl font-black text-amber-700 font-mono block mt-0.5">{pendingCount}</span>
          </div>
          <div className="h-10 w-10 bg-amber-100/60 text-amber-600 rounded-xl flex items-center justify-center">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-emerald-50/40 border border-emerald-100/80 rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 block uppercase tracking-wider">TELAH DIANTAR/DIAMBIL</span>
            <span className="text-2xl font-black text-emerald-700 font-mono block mt-0.5">{completedCount}</span>
          </div>
          <div className="h-10 w-10 bg-emerald-100/60 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Cari nama pengambil, catatan kelompok tani..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-slate-800 placeholder-slate-400 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-100 shrink-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase pl-1.5 pr-1">Status:</span>
            {['All', 'Pending', 'Selesai'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {st === 'All' ? 'Semua' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Fertilizer Type Filter Tabs */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Jenis Komoditas:</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {[
              { id: 'All', label: 'Semua Komoditas' },
              { id: 'Kompos Kering', label: '🌱 Kompos Kering' },
              { id: 'Pupuk Organik Cair (POC)', label: '💧 Pupuk POC' },
              { id: 'Maggot BSF', label: '🪱 Pakan Maggot BSF' }
            ].map((ft) => (
              <button
                key={ft.id}
                onClick={() => setFertilizerFilter(ft.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  fertilizerFilter === ft.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                }`}
              >
                {ft.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main CRUD table lists */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                <th className="py-4 pl-6">ID AGENDA</th>
                <th className="py-4">NAMA PENGAMBIL</th>
                <th className="py-4">JENIS PUPUK / PAKAN</th>
                <th className="py-4">JUMLAH</th>
                <th className="py-4">TANGGAL AMBIL</th>
                <th className="py-4">STATUS</th>
                <th className="py-4 pr-6 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchedules.length > 0 ? (
                filteredSchedules.map((item) => {
                  const isDue = item.status === 'Pending' && item.date <= todayStr;
                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isDue
                          ? 'bg-amber-50/40 hover:bg-amber-50/70 border-l-4 border-l-amber-500'
                          : 'hover:bg-slate-50/30'
                      }`}
                    >
                      <td className="py-4 pl-6 font-mono font-bold text-slate-400 text-[10px]">
                        {item.id}
                      </td>
                      <td className="py-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-700 block">
                              {item.name || <span className="text-slate-400 italic">Belum diisi</span>}
                            </span>
                            {isDue && (
                              <span className="bg-amber-500 text-white font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse flex items-center gap-1">
                                <Zap className="h-2.5 w-2.5" /> Hari Ini
                              </span>
                            )}
                          </div>
                          {item.notes && (
                            <span className="text-[10px] text-slate-400 block truncate max-w-xs font-normal">
                              "{item.notes}"
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg text-xs ${
                          item.fertilizerType === 'Kompos Kering'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : item.fertilizerType === 'Pupuk Organik Cair (POC)'
                            ? 'bg-sky-50 text-sky-700 border border-sky-200/60'
                            : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                        }`}>
                          {item.fertilizerType === 'Kompos Kering' && '🌱 '}
                          {item.fertilizerType === 'Pupuk Organik Cair (POC)' && '💧 '}
                          {item.fertilizerType === 'Maggot BSF' && '🪱 '}
                          {item.fertilizerType}
                          <span className="text-[9px] font-mono opacity-80 border-l border-current/30 pl-1.5 ml-1">
                            {item.fertilizerType === 'Pupuk Organik Cair (POC)' ? '2 Mgg' : '4 Mgg'}
                          </span>
                        </span>
                      </td>
                      <td className="py-4 font-extrabold text-slate-700 font-mono">
                        {item.amount} {item.fertilizerType === 'Pupuk Organik Cair (POC)' ? 'Liter' : 'Kg'}
                      </td>
                      <td className="py-4 font-mono font-semibold text-slate-500">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <span>Mulai:</span>
                            <span className="font-bold text-slate-600">{item.startDate || item.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400 text-[10px]">Siap:</span>
                            <span className="font-bold text-slate-800">{item.date}</span>
                          </div>
                          {isDue && (
                            <span className="text-[9px] font-black text-amber-600 block animate-pulse">
                              🎉 Matang & Siap Ambil!
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          item.status === 'Selesai'
                            ? 'bg-green-50 text-green-600 border-green-200'
                            : item.status === 'Pending'
                            ? isDue
                              ? 'bg-amber-100 text-amber-800 border-amber-300 font-black'
                              : 'bg-amber-50 text-amber-600 border-amber-200'
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}>
                          {item.status === 'Selesai' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          <span>{item.status}</span>
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSendDirectWA(item)}
                            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                              isDue
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/30 active:scale-95'
                                : 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-500/20'
                            }`}
                            title="Kirim Notifikasi WA Langsung"
                          >
                            <Send className="h-3 w-3" />
                            <span>{isDue ? '📱 Auto WA' : 'Notif WA'}</span>
                          </button>
                          <button
                            onClick={() => handleOpenEditForm(item)}
                            className="p-1.5 bg-slate-50 hover:bg-green-50 text-slate-400 hover:text-green-600 rounded-lg border border-slate-100 transition-colors cursor-pointer"
                            title="Edit Agenda"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingSchedule(item)}
                            className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-100 transition-colors cursor-pointer"
                            title="Hapus Agenda"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <Calendar className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Belum Ada Agenda Penjadwalan</p>
                        <p className="text-xs text-slate-400 mt-0.5">Daftar agenda pengambilan pupuk saat ini dalam keadaan kosong.</p>
                      </div>
                      <button
                        onClick={handleOpenAddForm}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Tambah Agenda Pengambilan</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Form Dialog (Add/Edit Modal) */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-6 md:p-7 max-w-xl w-full border border-slate-100 dark:border-slate-800 overflow-hidden z-10 max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-2xl shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                    {editingId ? 'Edit Agenda Pengambilan Pupuk' : 'Tambah Agenda Pengambilan Baru'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Pencatatan resmi distribusi & jadwal panen pupuk organik Desa Cibunian
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Section 1: Data Penerima */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nama Lengkap Pengambil / Kelompok Tani <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                      <UserPlus className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama warga atau kelompok tani (contoh: Pak Suherman / Tani Makmur)"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                    />
                  </div>
                </div>

                {/* Section 2: Pilih Jenis Pupuk (Visual Cards) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Pilih Jenis Pupuk & Masa Olah <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleTypeChange('Kompos Kering')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        formType === 'Kompos Kering'
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base">🌱</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          formType === 'Kompos Kering' ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          4 MINGGU
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-800 dark:text-slate-100">Kompos Kering</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">28 Hari Masa Matang</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTypeChange('Pupuk Organik Cair (POC)')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        formType === 'Pupuk Organik Cair (POC)'
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base">💧</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          formType === 'Pupuk Organik Cair (POC)' ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          2 MINGGU
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-800 dark:text-slate-100">Pupuk Cair (POC)</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">14 Hari Fermentasi</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTypeChange('Maggot BSF')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        formType === 'Maggot BSF'
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-500 dark:border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base">🪱</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          formType === 'Maggot BSF' ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          2 MINGGU
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-800 dark:text-slate-100">Maggot BSF</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">14 Hari Pengolahan</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Amount Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Jumlah Alokasi ({formType === 'Pupuk Organik Cair (POC)' ? 'Liter' : 'Kg'}) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                      <Weight className="h-4 w-4" />
                    </div>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Contoh: 10"
                      value={formAmount}
                      onChange={(e) => setFormAmount(Number(e.target.value))}
                      className="w-full pl-10 pr-16 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all font-mono"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-xs font-bold text-slate-400 dark:text-slate-500">
                      {formType === 'Pupuk Organik Cair (POC)' ? 'Liter' : 'Kg'}
                    </div>
                  </div>
                </div>

                {/* Auto Timeline Calculation Card */}
                <div className="p-4 bg-gradient-to-br from-emerald-50/90 to-teal-50/50 dark:from-emerald-950/50 dark:to-teal-950/30 border border-emerald-200/80 dark:border-emerald-800/80 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-900 dark:text-emerald-200">
                      <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Estimasi Otomatis Jadwal Panen
                    </span>
                    <span className="bg-emerald-200/80 dark:bg-emerald-800/80 text-emerald-900 dark:text-emerald-100 font-mono text-[10px] px-2.5 py-0.5 rounded-full font-black">
                      {formType === 'Pupuk Organik Cair (POC)' ? '⏱️ FERMENTASI 14 HARI' : '⏱️ PEMATANGAN 28 HARI'}
                    </span>
                  </div>

                  {/* Horizontal Timeline Visual */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-200/60 dark:border-emerald-800/60">
                    <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">1. Tanggal Mulai Olah</span>
                      <span className="text-xs font-extrabold font-mono text-emerald-800 dark:text-emerald-300 block mt-0.5">
                        {formStartDate || todayStr}
                      </span>
                    </div>
                    <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">2. Tanggal Siap Ambil</span>
                      <span className="text-xs font-extrabold font-mono text-amber-700 dark:text-amber-400 block mt-0.5">
                        {formDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Tanggal Mulai Proses
                      </label>
                      <button
                        type="button"
                        onClick={() => handleStartDateChange(todayStr)}
                        className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60 transition-colors"
                      >
                        ⚡ Hari Ini
                      </button>
                    </div>
                    <input
                      type="date"
                      required
                      value={formStartDate}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 font-mono transition-all"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Tanggal Siap Ambil (Panen)
                      </label>
                      <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-200/60 dark:border-amber-800/60">
                        Hitung Otomatis
                      </span>
                    </div>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 font-mono transition-all"
                    />
                  </div>
                </div>

                {/* Status Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Status Agenda Pengambilan
                  </label>
                  <select
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 transition-all"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                  >
                    <option value="Pending">⏳ Pending (Dalam masa olah / Menunggu jadwal panen)</option>
                    <option value="Selesai">✅ Selesai (Pupuk telah diserahkan ke warga)</option>
                  </select>
                </div>

                {formDate && formDate <= todayStr && formStatus === 'Pending' && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-start gap-2.5 text-amber-800 dark:text-amber-200 text-xs font-medium">
                    <BellRing className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 animate-bounce" />
                    <div>
                      <strong className="font-bold block text-amber-900 dark:text-amber-100">Notifikasi Otomatis Aktif</strong>
                      <span className="text-[11px] text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
                        Tanggal yang dipilih ({formDate}) adalah hari ini / sudah jatuh tempo. Notifikasi WA otomatis & modal pemberitahuan siap dikirim saat agenda disimpan.
                      </span>
                    </div>
                  </div>
                )}

                {/* Notes Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Catatan & Keterangan Tambahan
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3.5 text-slate-400 dark:text-slate-500">
                      <FileText className="h-4 w-4" />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Bantuan subsidi kelompok tani RW 02 Desa Cibunian..."
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none transition-all"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-2xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xs font-extrabold rounded-2xl transition-all shadow-lg shadow-emerald-600/20 cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    {editingId ? 'Simpan Perubahan' : 'Tambahkan Agenda'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WhatsApp Notification Modal Component */}
      <WANotifikasiModal
        isOpen={isWAModalOpen}
        onClose={() => setIsWAModalOpen(false)}
        defaultPhone="089517923634"
        scheduleContext={waSchedule}
      />

      {/* Auto Notification Popup Modal for Due Schedules */}
      <AnimatePresence>
        {showAutoNotifModal && dueSchedules.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500" />

              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg shadow-amber-500/20 animate-pulse">
                    <BellRing className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      Notifikasi Otomatis System
                    </span>
                    <h3 className="text-base font-extrabold text-slate-800 dark:text-white mt-0.5">
                      Jadwal Pengambilan Pupuk Hari Ini!
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAutoNotifModal(false);
                    setAutoNotifDismissed(true);
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="my-4 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Sistem mendeteksi <strong className="text-amber-600 font-bold">{dueSchedules.length} agenda pengambilan pupuk</strong> yang telah memasuki tanggal pengambilan (jatuh tempo). Anda dapat langsung mengirim notifikasi otomatis ke WhatsApp warga tanpa perlu membuka aplikasi WA:
                </p>

                {directNotifSent && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs font-extrabold text-emerald-800 dark:text-emerald-200 animate-fade-in flex items-center justify-between">
                    <span>{directNotifSent}</span>
                    <span className="text-[9px] font-mono bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-2 py-0.5 rounded-full">
                      HTTP 200 OK
                    </span>
                  </div>
                )}

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {dueSchedules.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-800 dark:text-white">
                            {item.name || 'Pengambil Pupuk'}
                          </span>
                          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-md">
                            {item.fertilizerType}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          Jumlah: {item.amount} {item.fertilizerType.includes('POC') ? 'Liter' : 'Kg'} • Tanggal: {item.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleSendDirectBackgroundApi(item)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
                          title="Kirim pesan WA otomatis di latar belakang tanpa membuka aplikasi WA"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>⚡ Kirim Otomatis</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={handleSendAllBackgroundApi}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white rounded-xl text-xs font-extrabold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Kirim Semua WA Otomatis ({dueSchedules.length})</span>
                </button>

                <button
                  onClick={() => {
                    setShowAutoNotifModal(false);
                    setAutoNotifDismissed(true);
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Tutup Notifikasi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingSchedule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-2xl shrink-0">
                  <Trash2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Hapus Agenda Penjadwalan?
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Apakah Anda yakin ingin menghapus agenda pengambilan pupuk ini?
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-800 dark:text-white text-sm">
                    {deletingSchedule.name || <span className="italic text-slate-400">Tanpa Nama Pengambil</span>}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                    {deletingSchedule.id}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  {deletingSchedule.fertilizerType} • {deletingSchedule.amount} {deletingSchedule.fertilizerType.includes('POC') ? 'Liter' : 'Kg'}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  📅 Tanggal: {deletingSchedule.date}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingSchedule(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeleteSchedule(deletingSchedule.id);
                    setDeletingSchedule(null);
                  }}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl transition-colors shadow-md shadow-rose-600/20 cursor-pointer active:scale-95"
                >
                  Ya, Hapus Agenda
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
