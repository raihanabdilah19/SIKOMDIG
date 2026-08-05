import React, { useState } from 'react';
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
  Send
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

  // Form states (Add/Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // WhatsApp Modal state
  const [isWAModalOpen, setIsWAModalOpen] = useState(false);
  const [waSchedule, setWaSchedule] = useState<Schedule | null>(null);
  
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState<Schedule['fertilizerType']>('Kompos Kering');
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
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormAmount(10);
    setFormStatus('Pending');
    setFormNotes('');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (item: Schedule) => {
    setEditingId(item.id);
    setFormName(item.name);
    setFormType(item.fertilizerType);
    setFormDate(item.date);
    setFormAmount(item.amount);
    setFormStatus(item.status);
    setFormNotes(item.notes || '');
    setIsFormOpen(true);
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
        date: formDate,
        amount: Number(formAmount),
        status: formStatus,
        notes: formNotes
      };
      onUpdateSchedule(updatedItem);
    } else {
      // Add mode
      const newItem: Schedule = {
        id: `SCH-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formName,
        fertilizerType: formType,
        date: formDate,
        amount: Number(formAmount),
        status: formStatus,
        notes: formNotes
      };
      onAddSchedule(newItem);
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

        <div className="flex items-center gap-2.5 shrink-0">
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
                filteredSchedules.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="py-4 pl-6 font-mono font-bold text-slate-400 text-[10px]">
                      {item.id}
                    </td>
                    <td className="py-4">
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-slate-700 block">{item.name}</span>
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
                      </span>
                    </td>
                    <td className="py-4 font-extrabold text-slate-700 font-mono">
                      {item.amount} {item.fertilizerType === 'Pupuk Organik Cair (POC)' ? 'Liter' : 'Kg'}
                    </td>
                    <td className="py-4 font-mono font-semibold text-slate-500">
                      {item.date}
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        item.status === 'Selesai'
                          ? 'bg-green-50 text-green-600 border-green-200'
                          : item.status === 'Pending'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}>
                        {item.status === 'Selesai' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setWaSchedule(item);
                            setIsWAModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-lg border border-emerald-500/20 text-[10px] font-extrabold transition-all flex items-center gap-1 cursor-pointer"
                          title="Kirim Notifikasi WA"
                        >
                          <Send className="h-3 w-3" />
                          <span>Notif WA</span>
                        </button>
                        <button
                          onClick={() => handleOpenEditForm(item)}
                          className="p-1.5 bg-slate-50 hover:bg-green-50 text-slate-400 hover:text-green-600 rounded-lg border border-slate-100 transition-colors cursor-pointer"
                          title="Edit Agenda"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Hapus agenda pengambilan untuk "${item.name}"?`)) {
                              onDeleteSchedule(item.id);
                            }
                          }}
                          className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-100 transition-colors cursor-pointer"
                          title="Hapus Agenda"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 font-medium">
                    Tidak ada jadwal pengambilan yang sesuai filter pencarian.
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
              className="relative bg-white shadow-2xl rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-100 overflow-hidden z-10"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-5 pb-3 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  {editingId ? 'Edit Agenda Pengambilan' : 'Buat Agenda Pengambilan Baru'}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">Pencatatan tertib subsidi penyaluran pupuk desa</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">
                    Nama Lengkap Pengambil / Kelompok Tani
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <UserPlus className="h-3.5 w-3.5" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Pak Mulyadi (Kelompok Tani Tunas Jaya)"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800 placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Jenis Pupuk / Pakan
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                    >
                      <option value="Kompos Kering">🌱 Kompos Kering (Kg)</option>
                      <option value="Pupuk Organik Cair (POC)">💧 Pupuk Organik Cair / POC (Liter)</option>
                      <option value="Maggot BSF">🪱 Pakan Maggot BSF (Kg)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      {formType === 'Pupuk Organik Cair (POC)'
                        ? 'Jumlah (Liter)'
                        : formType === 'Maggot BSF'
                        ? 'Jumlah Pakan Maggot BSF (Kg)'
                        : 'Jumlah Kompos Kering (Kg)'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Weight className="h-3.5 w-3.5" />
                      </div>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="Contoh: 10"
                        value={formAmount}
                        onChange={(e) => setFormAmount(Number(e.target.value))}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800 placeholder-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Tanggal Pengambilan
                    </label>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Status Agenda
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800"
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                    >
                      <option value="Pending">Pending (Sedang diproses)</option>
                      <option value="Selesai">Selesai (Sudah diambil)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">
                    Catatan Keperluan / Keterangan Tambahan
                  </label>
                  <div className="relative">
                    <div className="absolute top-2.5 left-3 text-slate-400">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Contoh: Pupuk bantuan RW 01 untuk pemeliharaan pohon durian..."
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 text-slate-800 placeholder-slate-400 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 text-xs font-bold rounded-xl transition-all shadow-lg shadow-green-600/10 cursor-pointer"
                  >
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
    </div>
  );
}
