import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  Copy,
  Check,
  X,
  Phone,
  User,
  Sparkles,
  BellRing,
  Calendar,
  Sprout,
  ShieldCheck,
  Megaphone,
  CheckCircle2
} from 'lucide-react';
import { Schedule } from '../types';

interface WANotifikasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPhone?: string;
  defaultName?: string;
  scheduleContext?: Schedule | null;
}

export default function WANotifikasiModal({
  isOpen,
  onClose,
  defaultPhone = '089517923634',
  defaultName = 'Warga Cibunian',
  scheduleContext = null
}: WANotifikasiModalProps) {
  const [recipientPhone, setRecipientPhone] = useState(defaultPhone);
  const [recipientName, setRecipientName] = useState(
    scheduleContext ? scheduleContext.name : defaultName
  );
  const [category, setCategory] = useState<
    'jadwal' | 'kompos' | 'edukasi' | 'kustom'
  >(scheduleContext ? 'jadwal' : 'jadwal');

  // Custom parameters
  const [pupukType, setPupukType] = useState(
    scheduleContext ? scheduleContext.fertilizerType : 'Kompos Kering'
  );
  const [jumlah, setJumlah] = useState(
    scheduleContext ? `${scheduleContext.amount} Kg/Liter` : '15 Kg'
  );
  const [tanggal, setTanggal] = useState(
    scheduleContext ? scheduleContext.date : new Date().toISOString().split('T')[0]
  );
  const [customNotes, setCustomNotes] = useState(
    scheduleContext?.notes || 'Harap membawa kantong/wadah sendiri dari rumah.'
  );

  const [copied, setCopied] = useState(false);
  const [simulatedToast, setSimulatedToast] = useState(false);

  // Sync when scheduleContext changes
  React.useEffect(() => {
    if (scheduleContext) {
      setRecipientName(scheduleContext.name);
      setPupukType(scheduleContext.fertilizerType);
      setJumlah(`${scheduleContext.amount} ${scheduleContext.fertilizerType.includes('POC') ? 'Liter' : 'Kg'}`);
      setTanggal(scheduleContext.date);
      setCustomNotes(scheduleContext.notes || 'Harap membawa kantong/wadah sendiri dari rumah.');
      setCategory('jadwal');
    }
  }, [scheduleContext]);

  // Format phone number to clean country code international format (e.g., 6289517923634)
  const formatPhoneForWA = (phoneStr: string) => {
    let clean = phoneStr.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = '62' + clean.slice(1);
    }
    return clean || '6289517923634';
  };

  // Build message based on category
  const generateWAMessage = () => {
    const formattedName = recipientName || 'Warga Cibunian';
    
    if (category === 'jadwal') {
      return (
`*📢 [SIKOMDIG DESA CIBUNIAN]*
*NOTIFIKASI JADWAL PENGAMBILAN PUPUK ORGANIK*

Yth. Bapak/Ibu *${formattedName}*,

Pemberitahuan resmi mengenai agenda distribusi pupuk organik Anda:
• *Jenis Pupuk:* ${pupukType}
• *Jumlah:* ${jumlah}
• *Tanggal Pengambilan:* ${tanggal}
• *Lokasi:* Depo TPS3R / Bank Sampah Desa Cibunian
• *Catatan:* ${customNotes}

Mohon dapat mengambil sesuai jadwal yang telah ditentukan. Mari wujudkan Desa Cibunian yang mandiri pangan & bebas sampah!

_Sistem Informasi Komposting Digital (SIKOMDIG)_
_Pemerintah Desa Cibunian_`
      );
    }

    if (category === 'kompos') {
      return (
`*♻️ [SIKOMDIG DESA CIBUNIAN]*
*PEMBERITAHUAN SIKLUS KOMPOSTER RW & PANEN PUPUK*

Yth. *${formattedName}* / Pengurus RW Desa Cibunian,

Diberitahukan bahwa Bak Komposter Organik di wilayah Anda telah memasuki tahap panen / pengolahan:
• *Status Bak:* Siap Panen Kompos Kering
• *Estimasi Hasil:* ~50-80 Kg
• *Tindakan:* Tim Kebersihan & Komposting Desa akan melakukan pemanenan dan pengemasan.

Untuk koordinasi lokasi & distribusi warga, silakan hubungi Kantor Desa Cibunian.

_Salam Lingkungan Bersih - SIKOMDIG_`
      );
    }

    if (category === 'edukasi') {
      return (
`*📚 [SIKOMDIG DESA CIBUNIAN]*
*UNDANGAN PELATIHAN & DOKUMEN EDUKASI PENGOLAHAN SAMPAH*

Halo *${formattedName}*!

Mari bergabung dalam gerakan pemilahan sampah dari rumah & pembuatan Pupuk Organik Cair (POC) / Budidaya Maggot BSF Desa Cibunian.

• *Materi:* Pemilahan Limbah Dapur, Fermentasi POC, & Pakan BSF
• *Jadwal Workshop:* Setiap Sabtu Pagi at Posko TPS3R
• *Modul Online:* Akses portal SIKOMDIG Desa Cibunian

Terima kasih atas partisipasi aktif Bapak/Ibu dalam menjaga kelestarian lingkungan Desa Cibunian.

_Salam Inovasi Lingkungan - SIKOMDIG_`
      );
    }

    // Kustom
    return (
`*💬 [SIKOMDIG DESA CIBUNIAN]*
*PEMBERITAHUAN WARGA DESA CIBUNIAN*

Yth. *${formattedName}*,

${customNotes}

Jika ada pertanyaan lebih lanjut, silakan balas pesan ini atau hubungi Layanan SIKOMDIG Desa Cibunian di 089517923634.

_Terima Kasih - Pemdes Cibunian_`
    );
  };

  const messageText = generateWAMessage();

  const handleSendWA = () => {
    const waPhone = formatPhoneForWA(recipientPhone);
    const encodedMsg = encodeURIComponent(messageText);
    const url = `https://wa.me/${waPhone}?text=${encodedMsg}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateToast = () => {
    setSimulatedToast(true);
    setTimeout(() => setSimulatedToast(false), 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500 text-white rounded-2xl shadow-md shadow-emerald-500/20">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-800 dark:text-white">
                    Kirim Notifikasi WhatsApp (WA)
                  </h3>
                  <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Live Direct
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Kirim pesan notifikasi otomatis langsung ke nomor WhatsApp warga
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Content Scrollable */}
          <div className="overflow-y-auto my-4 pr-1 space-y-4 text-xs">
            {/* Notification Category selector */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1.5">
                Pilih Kategori Notifikasi WA
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'jadwal', label: 'Jadwal Pupuk', icon: Calendar },
                  { id: 'kompos', label: 'Siklus Kompos', icon: Sprout },
                  { id: 'edukasi', label: 'Edukasi / Acara', icon: Megaphone },
                  { id: 'kustom', label: 'Pesan Bebas', icon: MessageSquare }
                ].map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id as any)}
                      className={`p-2.5 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-[11px] font-bold">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipient details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                  <User className="h-3 w-3 text-emerald-500" /> Nama Penerima Notifikasi
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 dark:text-white"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Nama Warga..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                  <Phone className="h-3 w-3 text-emerald-500" /> Nomor WhatsApp Pengguna
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 dark:text-white font-mono"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="089517923634"
                />
              </div>
            </div>

            {/* Category specific dynamic inputs */}
            {category === 'jadwal' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Jenis Pupuk</label>
                  <select
                    value={pupukType}
                    onChange={(e) => setPupukType(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-white"
                  >
                    <option value="Kompos Kering">Kompos Kering</option>
                    <option value="Pupuk Organik Cair (POC)">Pupuk Organik Cair (POC)</option>
                    <option value="Maggot BSF">Maggot BSF</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Jumlah</label>
                  <input
                    type="text"
                    value={jumlah}
                    onChange={(e) => setJumlah(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">Tanggal Ambil</label>
                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                Catatan / Pesan Tambahan
              </label>
              <textarea
                rows={2}
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none text-slate-800 dark:text-white"
                placeholder="Tulis instruksi atau pesan khusus..."
              />
            </div>

            {/* Live WhatsApp Message Preview */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Pratinjau Pesan WhatsApp
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  Format Otomatis SIKOMDIG
                </span>
              </div>
              <div className="p-4 bg-emerald-950/90 text-emerald-50 rounded-2xl border border-emerald-800/80 font-mono text-[11px] whitespace-pre-wrap leading-relaxed shadow-inner max-h-48 overflow-y-auto">
                {messageText}
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={handleSimulateToast}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BellRing className="h-3.5 w-3.5 text-amber-500" />
              <span>Simulasi Notif In-App</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMessage}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Pesan'}</span>
              </button>

              <button
                onClick={handleSendWA}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Kirim Ke WhatsApp ({recipientPhone})</span>
              </button>
            </div>
          </div>

          {/* Toast Banner Simulation */}
          <AnimatePresence>
            {simulatedToast && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute bottom-4 left-4 right-4 bg-emerald-600 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 z-50 border border-emerald-400"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/20 rounded-xl shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs">Notifikasi WA Masuk!</h4>
                    <p className="text-[10px] text-emerald-100">
                      Pesan terkirim ke {recipientPhone} ({recipientName})
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded text-white font-bold">
                  200 OK
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
