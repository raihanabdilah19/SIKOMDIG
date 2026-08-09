import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  User as UserIcon,
  Bell,
  Volume2,
  Trash2,
  Check,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  X,
  MessageSquare,
  Send,
  Phone
} from 'lucide-react';
import { AppSettings } from '../types';
import WANotifikasiModal from './WANotifikasiModal';

interface PengaturanProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onResetDatabase: () => void;
}

export default function Pengaturan({ settings, onUpdateSettings, onResetDatabase }: PengaturanProps) {
  const [adminName, setAdminName] = useState(settings.adminName);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // WhatsApp Notification states
  const [waNumber, setWaNumber] = useState('089517923634');
  const [isWAModalOpen, setIsWAModalOpen] = useState(false);

  const themesList = [
    { id: 'light', name: 'Alabaster Light (Off-white)', desc: 'Desain bersih berlatar putih gembur, nyaman untuk siang hari.' },
    { id: 'dark', name: 'Sophisticated Dark (Nexus)', desc: 'Skema malam gelap premium dengan aksen indigo, violet, dan metalik modern.' },
    { id: 'nature', name: 'Emerald Nature (Organik)', desc: 'Kombinasi hijau daun hutan basah, mengedepankan identitas tani.' }
  ] as const;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName.trim()) return;

    onUpdateSettings({
      ...settings,
      adminName: adminName.trim()
    });

    triggerSuccess('Nama admin berhasil diperbarui!');
  };

  const handleToggleNotification = () => {
    onUpdateSettings({
      ...settings,
      notificationsEnabled: !settings.notificationsEnabled
    });
  };

  const handleToggleSound = () => {
    onUpdateSettings({
      ...settings,
      systemSoundEnabled: !settings.systemSoundEnabled
    });
  };

  const handleSelectTheme = (themeId: AppSettings['selectedTheme']) => {
    onUpdateSettings({
      ...settings,
      selectedTheme: themeId
    });
    triggerSuccess(`Tema sistem diubah ke ${themeId === 'nature' ? 'Emerald Nature' : themeId === 'dark' ? 'Charcoal Dark' : 'Alabaster Light'}`);
  };

  const handleResetConfirm = () => {
    if (resetConfirmText.toLowerCase() === 'cibunian') {
      onResetDatabase();
      setIsResetModalOpen(false);
      setResetConfirmText('');
      alert('Sistem berhasil di-reset ke data bawaan awal Desa Cibunian!');
      window.location.reload();
    } else {
      alert('Kata kunci konfirmasi salah. Reset dibatalkan.');
    }
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          <Settings className="h-6 w-6 text-green-600 animate-spin-slow" />
          Pengaturan Aplikasi SIRAM
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Konfigurasi preferensi sistem monitoring, preferensi visual, dan utilitas pengaturan database portal desa
        </p>
      </div>

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-2xl flex items-center gap-2"
        >
          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </motion.div>
      )}

      {/* Admin Name Card Form */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 shrink-0">
            <UserIcon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">Identitas Profil Admin Utama</h3>
            <p className="text-[10px] text-slate-400 font-medium">Mengubah nama sapaan yang muncul di beranda utama</p>
          </div>
        </div>

        <form onSubmit={handleSaveName} className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
              Nama Lengkap Pengurus / Pejabat Desa
            </label>
            <input
              type="text"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/10 focus:border-green-500 text-slate-800"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-green-600 text-white font-bold text-xs rounded-xl hover:bg-green-700 transition-colors h-[42px] cursor-pointer"
          >
            Simpan Nama
          </button>
        </form>
      </div>

      {/* Theme selector block */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">Visual Skema Tema Portal</h3>
            <p className="text-[10px] text-slate-400 font-medium">Pilih satu gaya estetika yang paling pas dengan preferensi perangkat Anda</p>
          </div>
        </div>

        <div className="space-y-2">
          {themesList.map((t) => {
            const isSelected = settings.selectedTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTheme(t.id)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-950 shadow-md'
                    : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/50'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-extrabold block">{t.name}</span>
                  <span className={`text-[10px] block font-normal ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                    {t.desc}
                  </span>
                </div>

                <div className={`h-5 w-5 rounded-full flex items-center justify-center border ${
                  isSelected ? 'bg-green-600 border-green-500 text-white' : 'border-slate-300'
                }`}>
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sound & Notifications preferences toggle */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 shrink-0">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800">Notifikasi & Suara (Simulasi)</h3>
            <p className="text-[10px] text-slate-400 font-medium">Pengendalian notifikasi logistik distribusi desa</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {/* Notifications Toggle */}
          <div className="py-3 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-extrabold text-slate-700 block">Kirim Notifikasi Logistik WA</span>
              <span className="text-[10px] text-slate-500 block font-normal">
                Kirim pesan otomatis via WA ke kelompok tani saat pupuk siap diambil.
              </span>
            </div>
            <button
              onClick={handleToggleNotification}
              className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                settings.notificationsEnabled ? 'bg-green-600' : 'bg-slate-200'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-xs transition-transform ${
                settings.notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="py-3 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-extrabold text-slate-700 block">Suara Efek Tombol (System Beeps)</span>
              <span className="text-[10px] text-slate-500 block font-normal">
                Mainkan audio bip tombol interaktif saat merubah sensor atau membuat jadwal.
              </span>
            </div>
            <button
              onClick={handleToggleSound}
              className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                settings.systemSoundEnabled ? 'bg-green-600' : 'bg-slate-200'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-xs transition-transform ${
                settings.systemSoundEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Notification Gateway & Testing Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 border border-emerald-800/80 rounded-3xl p-6 text-white shadow-xl space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-2xl shrink-0">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-white">Integrasi Notifikasi WhatsApp (Direct WA)</h3>
                <span className="bg-emerald-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                  TERHUBUNG
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-medium">
                Kirim notifikasi otomatis ke nomor WhatsApp warga untuk jadwal pupuk, panen kompos, dan edukasi.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-950/70 rounded-2xl border border-emerald-900/60 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div>
              <label className="block text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Phone className="h-3 w-3 text-emerald-400" /> Nomor WA Utama Warga / Pengurus
              </label>
              <input
                type="text"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-emerald-700/60 rounded-xl text-xs font-semibold text-emerald-100 font-mono focus:outline-none focus:border-emerald-400"
                placeholder="089517923634"
              />
            </div>

            <button
              onClick={() => setIsWAModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer h-[38px]"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Uji Notifikasi WA Sekarang</span>
            </button>
          </div>

          <div className="pt-2 text-[11px] text-slate-300 space-y-1 border-t border-slate-800 leading-relaxed">
            <p>
              💡 **Fitur Notifikasi WA SIRAM**:
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[10px]">
              <li>Langsung membuka WhatsApp Web / Aplikasi WA di HP warga dengan pesan terformat resmi.</li>
              <li>Mendukung notifikasi jadwal pengambilan pupuk, panen bak kompos RW, dan modul pelatihan.</li>
              <li>Nomor terdaftar bawaan: <span className="font-mono text-emerald-400 font-bold">089517923634</span>.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Auto-Update & Continuous Deployment Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 text-white shadow-xl space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-2xl shrink-0">
              <RefreshCw className="h-6 w-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-white">Sistem Auto-Update Live (Tanpa Re-Hosting)</h3>
                <span className="bg-emerald-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                  AKTIF
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Setiap pembaruan fitur, data, atau tampilan otomatis ter-sync di Cloud Run Server
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Check className="h-4 w-4 shrink-0" />
            <span>Continuous Cloud Deployment Active</span>
          </div>
          <p className="text-slate-300">
            Aplikasi SIRAM Desa Cibunian ini di-host secara langsung melalui Cloud Infrastructure. Setiap kali ada penambahan fitur atau modifikasi data, sistem secara **otomatis membangun ulang (auto-build & auto-deploy)** aplikasi tanpa memerlukan hosting manual ulang atau perubahan URL link shared app.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400 border-t border-slate-800">
            <span className="bg-slate-800 px-2 py-1 rounded">URL Live: Shared App Ready</span>
            <span className="bg-slate-800 px-2 py-1 rounded">Build Engine: Cloud Run Live Sync</span>
            <span className="bg-slate-800 px-2 py-1 rounded">Local Storage: Auto Persistence</span>
          </div>
        </div>
      </div>

      {/* Dangerous area database reset section */}
      <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-rose-200">
          <div className="p-2 bg-rose-100 text-rose-600 border border-rose-200 rounded-xl shrink-0">
            <Trash2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-rose-800">Zona Bahaya (Reset Database)</h3>
            <p className="text-[10px] text-rose-500 font-medium">Menghapus semua perubahan custom dan mengembalikan database awal</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          Tindakan ini akan **menghapus semua** komposter yang baru didaftarkan, semua jadwal pengambilan pupuk buatan Anda, serta mengembalikan semua angka pilar pangan ke data default asal Desa Cibunian tahun 2026. Data yang terhapus tidak dapat dipulihkan kembali!
        </p>

        <button
          onClick={() => setIsResetModalOpen(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-rose-600/10 cursor-pointer"
        >
          Reset Semua Data SIRAM
        </button>
      </div>

      {/* Reset confirmation modal */}
      <AnimatePresence>
        {isResetModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsResetModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-2xl max-w-md w-full z-10"
            >
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                  <AlertTriangle className="h-6 w-6 animate-pulse" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-800">Apakah Anda Yakin?</h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    Tindakan ini permanen. Silakan ketik nama desa <strong className="text-rose-600 font-bold font-mono bg-rose-50 px-1.5 py-0.5 rounded">cibunian</strong> di bawah sebagai kunci konfirmasi keamanan.
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Ketik 'cibunian'"
                  value={resetConfirmText}
                  onChange={(e) => setResetConfirmText(e.target.value)}
                  className="w-full text-center px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none text-slate-800 focus:ring-2 focus:ring-rose-500/10 placeholder-slate-400 uppercase tracking-widest font-mono"
                />

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsResetModalOpen(false);
                      setResetConfirmText('');
                    }}
                    className="flex-1 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleResetConfirm}
                    disabled={resetConfirmText.toLowerCase() !== 'cibunian'}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-rose-600/10 cursor-pointer"
                  >
                    Ya, Reset Database
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WhatsApp Notification Modal Component */}
      <WANotifikasiModal
        isOpen={isWAModalOpen}
        onClose={() => setIsWAModalOpen(false)}
        defaultPhone={waNumber}
      />
    </div>
  );
}
