import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Trophy,
  Medal,
  Sparkles,
  PlusCircle,
  Search,
  Filter,
  History,
  Gift,
  Leaf,
  Scale,
  Calendar,
  UserCheck,
  Building2,
  TrendingUp,
  CheckCircle2,
  X,
  Share2,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { EcoPointUser, EcoPointLog, EcoRewardItem, User } from '../types';

interface PoinPengelolaProps {
  users: EcoPointUser[];
  logs: EcoPointLog[];
  rewards: EcoRewardItem[];
  currentUser: User;
  onAddLog: (newLog: Omit<EcoPointLog, 'id' | 'timestamp'>) => void;
  onRedeemReward: (rewardId: string, pointsRequired: number, userName: string) => boolean;
}

export default function PoinPengelola({
  users,
  logs,
  rewards,
  currentUser,
  onAddLog,
  onRedeemReward
}: PoinPengelolaProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRtRw, setSelectedRtRw] = useState('semua');
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'input' | 'rewards' | 'logs'>('leaderboard');
  
  // Modal states
  const [showInputModal, setShowInputModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState<EcoPointUser | null>(null);
  const [showRedeemModal, setShowRedeemModal] = useState<EcoRewardItem | null>(null);
  const [rewardCategory, setRewardCategory] = useState<string>('semua');
  const [redeemUserName, setRedeemUserName] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Input form state
  const [formName, setFormName] = useState(currentUser.name || 'Warga Cibunian');
  const [formRtRw, setFormRtRw] = useState('RT 02 / RW 01');
  const [formActivity, setFormActivity] = useState<EcoPointLog['activityType']>('Setor Sampah Dapur');
  const [formWeight, setFormWeight] = useState<number>(3);
  const [formNotes, setFormNotes] = useState('');

  // Calculate points formula
  const getPointsMultiplier = (type: EcoPointLog['activityType']) => {
    switch (type) {
      case 'Setor Sampah Dapur': return 10;
      case 'Olah Kompos Kering': return 12;
      case 'Produksi POC': return 12;
      case 'Pakan Maggot BSF': return 10;
      case 'Perawatan Bak Komposter': return 50; // Flat bonus for maintenance
      default: return 10;
    }
  };

  const calculatedPoints = formActivity === 'Perawatan Bak Komposter' 
    ? 50 
    : Math.round(formWeight * getPointsMultiplier(formActivity));

  // Sort users by total points descending
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  // Filtered users
  const filteredUsers = sortedUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.rtRw.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRt = selectedRtRw === 'semua' || u.rtRw.includes(selectedRtRw);
    return matchesSearch && matchesRt;
  });

  // Filtered rewards catalog
  const filteredRewards = useMemo(() => {
    if (rewardCategory === 'semua') return rewards;
    return rewards.filter((r) => r.category === rewardCategory);
  }, [rewards, rewardCategory]);

  // Calculate community totals
  const totalCommunityPoints = users.reduce((acc, u) => acc + u.totalPoints, 0);
  const totalCommunityWasteKg = users.reduce((acc, u) => acc + u.totalWasteProcessedKg, 0);

  // Badge Helper
  const getBadgeStyle = (badge: EcoPointUser['badge']) => {
    switch (badge) {
      case 'Pahlawan Cibunian':
        return {
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-400/30',
          label: '👑 Pahlawan Cibunian'
        };
      case 'Maestro Organik':
        return {
          bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-400/30',
          label: '🌳 Maestro Organik'
        };
      case 'Pahlawan Hijau':
        return {
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-400/30',
          label: '🍃 Pahlawan Hijau'
        };
      default:
        return {
          bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-400/30',
          label: '🌱 Pejuang Pemula'
        };
    }
  };

  // Submit new log
  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formWeight <= 0) return;

    const actualWeight = Math.min(5, Math.max(1, formWeight));

    onAddLog({
      userName: formName,
      userRtRw: formRtRw,
      activityType: formActivity,
      weightKg: actualWeight,
      pointsEarned: calculatedPoints,
      notes: formNotes || `Pengolahan ${actualWeight}kg sampah organik (${formActivity})`
    });

    setToastMessage(`Selamat! ${formName} berhasil mendapatkan +${calculatedPoints} Poin Eco-Pengelola!`);
    setShowInputModal(false);
    setFormNotes('');
    setFormWeight(3);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle Reward Redeem
  const handleRedeem = (reward: EcoRewardItem, targetUser?: string) => {
    const userToRedeem = targetUser || redeemUserName || (users[0]?.name) || currentUser.name;
    const success = onRedeemReward(reward.id, reward.pointsRequired, userToRedeem);
    if (success) {
      setToastMessage(`Berhasil menukar ${reward.pointsRequired} poin dengan "${reward.title}" untuk ${userToRedeem}!`);
      setShowRedeemModal(null);
      setRedeemUserName('');
    } else {
      alert(`Poin "${userToRedeem}" tidak mencukupi (${reward.pointsRequired} Poin dibutuhkan) atau stok hadiah telah habis.`);
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Share WA
  const handleShareWa = () => {
    const text = `🏆 *PAPAN PERINGKAT ECO-POINTS DESA CIBUNIAN*\n\n` +
      `🌱 *Total Sampah Organik Diolah:* ${totalCommunityWasteKg.toLocaleString('id-ID')} Kg\n` +
      `⭐ *Total Poin Kebaikan Desa:* ${totalCommunityPoints.toLocaleString('id-ID')} Poin\n\n` +
      `🥇 *Juara 1:* ${sortedUsers[0]?.name || '-'} (${sortedUsers[0]?.totalPoints || 0} Poin)\n` +
      `🥈 *Juara 2:* ${sortedUsers[1]?.name || '-'} (${sortedUsers[1]?.totalPoints || 0} Poin)\n` +
      `🥉 *Juara 3:* ${sortedUsers[2]?.name || '-'} (${sortedUsers[2]?.totalPoints || 0} Poin)\n\n` +
      `Mari kelola sampah organik warga Desa Cibunian dan kumpulkan poinnya di Portal SIRAM! 🍃`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 bg-emerald-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3"
          >
            <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">{toastMessage}</p>
              <p className="text-[10px] text-emerald-200 mt-0.5">Terima kasih telah menjaga kebersihan & kelestarian Desa Cibunian!</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-300 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute right-0 top-0 -mr-12 -mt-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                <Trophy className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                <span>Program Apresiasi Pengelola Sampah Organik</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-semibold">
                <Building2 className="h-3 w-3 text-emerald-400 shrink-0" />
                <span>Desa Cibunian, Pamijahan</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Poin & Papan Peringkat Eco-Pengelola
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Setiap sampah organik sisa dapur, panen, atau pasar yang Anda olah di bak komposter desa menghasilkan **Poin Kebaikan Lingkungan** yang tercatat transparan dan dapat dipantau seluruh warga!
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowInputModal(true)}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Catat Olah Sampah / Klaim Poin</span>
            </button>

            <button
              onClick={handleShareWa}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Share2 className="h-4 w-4 text-emerald-400" />
              <span>Bagikan WA</span>
            </button>
          </div>
        </div>

        {/* Global Community Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-800/50">
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-emerald-800/40">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">TOTAL SAMPAH DIOLAH</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Scale className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="text-lg sm:text-xl font-black font-mono text-white">
                {totalCommunityWasteKg.toLocaleString('id-ID')} Kg
              </span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-emerald-800/40">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">TOTAL POIN TERKUMPUL</span>
            <div className="flex items-center gap-1.5 mt-1">
              <Award className="h-4 w-4 text-amber-400 shrink-0" />
              <span className="text-lg sm:text-xl font-black font-mono text-amber-300">
                {totalCommunityPoints.toLocaleString('id-ID')} Poin
              </span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-emerald-800/40">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">PENGELOLA / WARGA AKTIF</span>
            <div className="flex items-center gap-1.5 mt-1">
              <UserCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="text-lg sm:text-xl font-black font-mono text-white">
                {users.length} Akun Warga
              </span>
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-emerald-800/40">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">STATUS DATA</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-300 truncate">Publik & Terbuka</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'leaderboard'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Trophy className="h-4 w-4" />
          <span>Papan Peringkat Desa</span>
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'rewards'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Gift className="h-4 w-4 text-amber-400" />
          <span>Katalog Tukar Poin</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'logs'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <History className="h-4 w-4" />
          <span>Aktivitas Pengolahan Terbaru</span>
        </button>
      </div>

      {/* 1. TAB LEADERBOARD (Papan Peringkat) */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* Empty State Banner if no users recorded yet */}
          {sortedUsers.length === 0 && (
            <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6 text-center space-y-3">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 rounded-2xl w-fit mx-auto">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                Papan Peringkat Siap Diisi!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Belum ada catatan olah sampah. Klik tombol di bawah untuk memasukkan data penimbangan sampah & mengumpulkan Poin Eco pertama Anda!
              </p>
              <button
                onClick={() => setShowInputModal(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Input Data Olah Sampah Pertama</span>
              </button>
            </div>
          )}

          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rank #2 - Silver (Left on Desktop, 2nd on Mobile) */}
            {sortedUsers[1] && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="order-2 md:order-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white font-black text-[11px] px-3 py-1 rounded-bl-2xl flex items-center gap-1 shadow-xs">
                  <Medal className="h-3.5 w-3.5 text-slate-400 shrink-0" /> JUARA 2
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
                      {sortedUsers[1].avatarEmoji || '🥈'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm truncate">
                        {sortedUsers[1].name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium truncate">{sortedUsers[1].rtRw}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Sampah Diolah</span>
                      <span className="text-sm font-black font-mono text-slate-700 dark:text-slate-200">
                        {sortedUsers[1].totalWasteProcessedKg} Kg
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-amber-500 block uppercase">Poin Eco</span>
                      <span className="text-base font-black font-mono text-amber-600 dark:text-amber-400">
                        {sortedUsers[1].totalPoints} Poin
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border truncate ${getBadgeStyle(sortedUsers[1].badge).bg}`}>
                    {getBadgeStyle(sortedUsers[1].badge).label}
                  </span>
                  <button
                    onClick={() => setShowHistoryModal(sortedUsers[1])}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline text-[11px] flex items-center gap-0.5 cursor-pointer shrink-0"
                  >
                    <span>Riwayat</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Rank #1 - Gold (Center on Desktop, 1st on Mobile) */}
            {sortedUsers[0] && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="order-1 md:order-2 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-white dark:to-slate-900 border-2 border-amber-400/60 rounded-3xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between md:-translate-y-2"
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[11px] px-3.5 py-1 rounded-bl-2xl flex items-center gap-1 shadow-md">
                  <Trophy className="h-3.5 w-3.5 text-slate-950 shrink-0" /> JUARA 1 DESA
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-3 bg-amber-100 dark:bg-amber-950/60 rounded-2xl border border-amber-300 dark:border-amber-700 shadow-xs shrink-0">
                      {sortedUsers[0].avatarEmoji || '🥇'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-black text-slate-900 dark:text-amber-300 text-base leading-tight truncate">
                        {sortedUsers[0].name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{sortedUsers[0].rtRw}</p>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-300/40 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Sampah Diolah</span>
                      <span className="text-sm font-black font-mono text-slate-800 dark:text-slate-100">
                        {sortedUsers[0].totalWasteProcessedKg} Kg
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block uppercase">Poin Eco</span>
                      <span className="text-lg font-black font-mono text-amber-600 dark:text-amber-300">
                        {sortedUsers[0].totalPoints} Poin
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-amber-200/60 dark:border-slate-800 flex items-center justify-between text-xs gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border truncate ${getBadgeStyle(sortedUsers[0].badge).bg}`}>
                    {getBadgeStyle(sortedUsers[0].badge).label}
                  </span>
                  <button
                    onClick={() => setShowHistoryModal(sortedUsers[0])}
                    className="text-amber-700 dark:text-amber-300 font-extrabold hover:underline text-[11px] flex items-center gap-0.5 cursor-pointer shrink-0"
                  >
                    <span>Riwayat</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Rank #3 - Bronze (Right on Desktop, 3rd on Mobile) */}
            {sortedUsers[2] && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="order-3 md:order-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 bg-amber-700/80 text-white font-black text-[11px] px-3 py-1 rounded-bl-2xl flex items-center gap-1 shadow-xs">
                  <Medal className="h-3.5 w-3.5 text-amber-200 shrink-0" /> JUARA 3
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
                      {sortedUsers[2].avatarEmoji || '🥉'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm truncate">
                        {sortedUsers[2].name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium truncate">{sortedUsers[2].rtRw}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Sampah Diolah</span>
                      <span className="text-sm font-black font-mono text-slate-700 dark:text-slate-200">
                        {sortedUsers[2].totalWasteProcessedKg} Kg
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-amber-500 block uppercase">Poin Eco</span>
                      <span className="text-base font-black font-mono text-amber-600 dark:text-amber-400">
                        {sortedUsers[2].totalPoints} Poin
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border truncate ${getBadgeStyle(sortedUsers[2].badge).bg}`}>
                    {getBadgeStyle(sortedUsers[2].badge).label}
                  </span>
                  <button
                    onClick={() => setShowHistoryModal(sortedUsers[2])}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline text-[11px] flex items-center gap-0.5 cursor-pointer shrink-0"
                  >
                    <span>Riwayat</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Full Leaderboard Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                    Daftar Seluruh Pengelola & Warga
                  </h2>
                  <p className="text-xs text-slate-400">Daftar terbuka yang dapat diakses oleh seluruh pengguna web</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-48">
                  <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama/RW..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>

                <select
                  value={selectedRtRw}
                  onChange={(e) => setSelectedRtRw(e.target.value)}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                >
                  <option value="semua">Semua Wilayah</option>
                  <option value="RW 01">RW 01</option>
                  <option value="RW 02">RW 02</option>
                  <option value="RW 03">RW 03</option>
                  <option value="RW 04">RW 04</option>
                  <option value="RW 05">RW 05</option>
                </select>
              </div>
            </div>

            {/* Mobile Card List View (Visible on small screens) */}
            <div className="block md:hidden space-y-3 pt-1">
              {filteredUsers.length === 0 ? (
                <div className="py-8 text-center text-slate-400 font-medium text-xs">
                  Tidak ada pengelola yang cocok dengan pencarian.
                </div>
              ) : (
                filteredUsers.map((u) => {
                  const rank = sortedUsers.findIndex((su) => su.id === u.id) + 1;
                  const badgeInfo = getBadgeStyle(u.badge);

                  return (
                    <div
                      key={u.id}
                      className="p-3.5 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-mono font-black text-sm px-2 py-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
                            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                          </span>
                          <span className="text-xl shrink-0">{u.avatarEmoji || '👨‍🌾'}</span>
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-xs truncate">
                              {u.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-medium">{u.rtRw}</p>
                          </div>
                        </div>

                        <span className="font-mono font-black text-amber-600 dark:text-amber-400 text-sm shrink-0">
                          +{u.totalPoints} Poin
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400">Olah:</span>
                          <span className="font-mono font-bold text-slate-700 dark:text-slate-200 text-xs">
                            {u.totalWasteProcessedKg} Kg
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${badgeInfo.bg}`}>
                            {badgeInfo.label}
                          </span>
                          <button
                            onClick={() => setShowHistoryModal(u)}
                            className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] rounded-lg cursor-pointer"
                          >
                            Riwayat
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider bg-slate-50/60 dark:bg-slate-800/40">
                    <th className="py-3 pl-4 rounded-l-xl w-14 text-center">PERINGKAT</th>
                    <th className="py-3">NAMA PENGELOLA / WARGA</th>
                    <th className="py-3">WILAYAH (RT/RW)</th>
                    <th className="py-3">SAMPAH DIOLAH (KG)</th>
                    <th className="py-3">GELAR / BADGE ECO</th>
                    <th className="py-3">TOTAL POIN</th>
                    <th className="py-3 pr-4 rounded-r-xl text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                        Tidak ada pengelola yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const rank = sortedUsers.findIndex((su) => su.id === u.id) + 1;
                      const badgeInfo = getBadgeStyle(u.badge);

                      return (
                        <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="py-3.5 pl-4 text-center font-mono font-black text-sm">
                            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                          </td>

                          <td className="py-3.5 font-bold text-slate-800 dark:text-slate-100">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{u.avatarEmoji || '👨‍🌾'}</span>
                              <span>{u.name}</span>
                            </div>
                          </td>

                          <td className="py-3.5 text-slate-500 dark:text-slate-400 font-medium">
                            {u.rtRw}
                          </td>

                          <td className="py-3.5 font-mono font-bold text-slate-700 dark:text-slate-300">
                            {u.totalWasteProcessedKg} Kg
                          </td>

                          <td className="py-3.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${badgeInfo.bg}`}>
                              {badgeInfo.label}
                            </span>
                          </td>

                          <td className="py-3.5 font-mono font-black text-amber-600 dark:text-amber-400 text-sm">
                            +{u.totalPoints} Poin
                          </td>

                          <td className="py-3.5 pr-4 text-right">
                            <button
                              onClick={() => setShowHistoryModal(u)}
                              className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              Riwayat
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAB KATALOG TUKAR POIN */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
            {/* Catalog Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 rounded-2xl shadow-sm shrink-0">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-slate-100">
                    Katalog Hadiah & Apresiasi Poin Eco
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tukarkan poin hasil penimbangan sampah organik Anda dengan produk pupuk, bibit unggul, paket kebutuhan tani, atau peralatan berkebun.
                  </p>
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 shrink-0">
                {[
                  { id: 'semua', label: 'Semua Hadiah' },
                  { id: 'Pupuk & Bibit', label: '🌱 Pupuk & Bibit' },
                  { id: 'Kebutuhan Tani', label: '🌾 Kebutuhan Tani' },
                  { id: 'Alat Pertanian', label: '🛠️ Peralatan' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setRewardCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      rewardCategory === cat.id
                        ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reward Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRewards.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-400 font-medium text-xs">
                  Tidak ada item hadiah di kategori ini.
                </div>
              ) : (
                filteredRewards.map((rew) => (
                  <motion.div
                    key={rew.id}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-amber-400/50 hover:shadow-md transition-all"
                  >
                    <div className="space-y-3">
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl p-2.5 bg-white dark:bg-slate-800 rounded-2xl shadow-xs border border-slate-200/60 dark:border-slate-700 shrink-0">
                            {rew.iconEmoji}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200/70 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 rounded-lg">
                            {rew.category}
                          </span>
                        </div>

                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-mono font-black text-xs rounded-xl shadow-xs shrink-0">
                          ⭐ {rew.pointsRequired} POIN
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-snug">
                          {rew.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {rew.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs gap-2">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        Stok:{' '}
                        <strong className={rew.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}>
                          {rew.stock > 0 ? `${rew.stock} unit` : 'Habis'}
                        </strong>
                      </span>

                      <button
                        onClick={() => {
                          setRedeemUserName(users[0]?.name || '');
                          setShowRedeemModal(rew);
                        }}
                        disabled={rew.stock <= 0}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-300 disabled:to-slate-400 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 active:scale-95 flex items-center gap-1.5"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Tukar Poin</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB AKTIVITAS LOGS (Global Activity Feed) */}
      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                Riwayat Pengolahan Sampah Terbaru Desa
              </h2>
              <p className="text-xs text-slate-400">Catatan masuk real-time aktivitas pemilahan dan pengolahan dari seluruh warga</p>
            </div>
          </div>

          <div className="space-y-3">
            {logs.length === 0 ? (
              <div className="py-8 text-center text-slate-400 font-medium">Belum ada riwayat aktivitas recorded.</div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl mt-0.5 shrink-0">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                          {log.userName}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
                          {log.userRtRw}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        <strong className="text-emerald-700 dark:text-emerald-400">{log.activityType}</strong> — Bobot: <strong>{log.weightKg} Kg</strong>
                      </p>
                      {log.notes && (
                        <p className="text-[11px] text-slate-400 italic mt-0.5">"{log.notes}"</p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-700">
                    <span className="font-mono font-black text-amber-600 dark:text-amber-400 text-xs sm:text-sm">
                      +{log.pointsEarned} Poin
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODAL: INPUT OLAH SAMPAH BARU */}
      <AnimatePresence>
        {showInputModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden my-auto"
            >
              {/* Premium Gradient Header */}
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-5 text-white flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-emerald-100 shrink-0">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-200 uppercase tracking-wider block">
                      FORM PENIMBANGAN SAMPAH ORGANIK
                    </span>
                    <h3 className="font-extrabold text-white text-base">
                      Catat Olah Sampah & Klaim Poin
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setShowInputModal(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitLog} className="p-5 sm:p-6 space-y-4">
                {/* Input Nama Warga */}
                <div>
                  <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Nama Pengelola / Warga / Poktan</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">* Wajib diisi</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Pak Budi Santoso / Ibu Khadijah / Poktan RW 01"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Grid RT/RW & Jenis Pengolahan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Wilayah RT / RW
                    </label>
                    <select
                      value={formRtRw}
                      onChange={(e) => setFormRtRw(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    >
                      <option value="RT 01 / RW 01">RT 01 / RW 01</option>
                      <option value="RT 02 / RW 01">RT 02 / RW 01</option>
                      <option value="RT 03 / RW 01">RT 03 / RW 01</option>
                      <option value="RT 01 / RW 02">RT 01 / RW 02</option>
                      <option value="RT 02 / RW 02">RT 02 / RW 02</option>
                      <option value="RT 01 / RW 03">RT 01 / RW 03</option>
                      <option value="RT 02 / RW 03">RT 02 / RW 03</option>
                      <option value="RT 01 / RW 04">RT 01 / RW 04</option>
                      <option value="RT 01 / RW 05">RT 01 / RW 05</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Jenis Pengolahan
                    </label>
                    <select
                      value={formActivity}
                      onChange={(e) => setFormActivity(e.target.value as EcoPointLog['activityType'])}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    >
                      <option value="Setor Sampah Dapur">Setor Sampah Dapur (10 Poin/kg)</option>
                      <option value="Olah Kompos Kering">Olah Kompos Kering (12 Poin/kg)</option>
                      <option value="Produksi POC">Produksi POC (12 Poin/L)</option>
                      <option value="Pakan Maggot BSF">Pakan Maggot BSF (10 Poin/kg)</option>
                      <option value="Perawatan Bak Komposter">Perawatan Bak Komposter (50 Poin)</option>
                    </select>
                  </div>
                </div>

                {/* Bobot + Quick Selection Buttons */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Bobot / Volume Hasil (Maksimal 5 Kg / Liter)
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium">Pilihan cepat:</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      required
                      value={formWeight}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val > 5) setFormWeight(5);
                        else if (val < 1) setFormWeight(1);
                        else setFormWeight(val);
                      }}
                      className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />

                    {/* Quick Weight Chips */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {[1, 2, 3, 5].map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setFormWeight(w)}
                          className={`px-2.5 py-2 text-[11px] font-extrabold rounded-xl border transition-all cursor-pointer ${
                            formWeight === w
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                          }`}
                        >
                          {w} Kg
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    * Maksimal 5 Kg/Liter per pencatatan untuk menjaga ketelitian timbulan.
                  </p>
                </div>

                {/* Catatan Tambahan */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Catatan Tambahan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Misal: Limbah pasar ditambah EM4 dan Molase"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                {/* Calculation Preview Banner */}
                <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 p-4 rounded-2xl text-white flex items-center justify-between shadow-sm">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">
                      ESTIMASI POIN ECO DIPEROLEH
                    </span>
                    <span className="text-2xl font-black font-mono text-emerald-300 block">
                      +{calculatedPoints} POIN
                    </span>
                    <span className="text-[10px] text-slate-300 block">
                      {formActivity} • {formWeight} Kg/L
                    </span>
                  </div>
                  <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-400/30 text-amber-300 shrink-0">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>

                {/* Submit Action Bar */}
                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowInputModal(false)}
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Simpan & Klaim Poin</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: RIWAYAT POIN INDIVIDUAL */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{showHistoryModal.avatarEmoji || '👨‍🌾'}</span>
                  <div>
                    <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">
                      {showHistoryModal.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">{showHistoryModal.rtRw}</p>
                  </div>
                </div>
                <button onClick={() => setShowHistoryModal(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Total Poin</span>
                  <p className="text-lg font-black font-mono text-amber-600 dark:text-amber-400">
                    +{showHistoryModal.totalPoints} Poin
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Total Sampah</span>
                  <p className="text-lg font-black font-mono text-slate-800 dark:text-slate-100">
                    {showHistoryModal.totalWasteProcessedKg} Kg
                  </p>
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Catatan Aktivitas Poin:</h4>
                {logs.filter((l) => l.userName === showHistoryModal.name).length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center">Belum ada riwayat aktivitas recorded.</p>
                ) : (
                  logs
                    .filter((l) => l.userName === showHistoryModal.name)
                    .map((l) => (
                      <div key={l.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200/50 dark:border-slate-700 flex justify-between items-center text-xs">
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">{l.activityType} ({l.weightKg}kg)</strong>
                          <p className="text-[10px] text-slate-400">{l.timestamp}</p>
                        </div>
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400">+{l.pointsEarned} Poin</span>
                      </div>
                    ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: REDEEM CONFIRMATION */}
      <AnimatePresence>
        {showRedeemModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden my-auto space-y-0"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-5 text-slate-950 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-950/10 rounded-xl text-slate-950 shrink-0">
                    <Gift className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-950 text-base leading-tight">
                      Konfirmasi Penukaran Poin
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-900/80">
                      Tukarkan poin kelestarian dengan hadiah apresiasi desa
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRedeemModal(null)}
                  className="p-1.5 bg-slate-950/10 hover:bg-slate-950/20 rounded-xl text-slate-950 transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                {/* Selected Item Summary Card */}
                <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300/50 dark:border-amber-800/60 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-3xl p-2.5 bg-white dark:bg-slate-800 rounded-2xl shadow-2xs shrink-0">
                    {showRedeemModal.iconEmoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                      {showRedeemModal.category}
                    </span>
                    <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-snug truncate">
                      {showRedeemModal.title}
                    </h4>
                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-amber-500 text-slate-950 font-mono font-black text-xs rounded-lg">
                      ⭐ {showRedeemModal.pointsRequired} POIN
                    </span>
                  </div>
                </div>

                {/* User Selector or Empty User Warning */}
                {users.length === 0 ? (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-center space-y-2">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Belum ada pengelola/warga terdaftar yang memiliki poin.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRedeemModal(null);
                        setShowInputModal(true);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>Input Olah Sampah Dulu</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Pilih Warga / Pengelola yang Menukar Poin:
                      </label>
                      <select
                        value={redeemUserName || users[0]?.name}
                        onChange={(e) => setRedeemUserName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      >
                        {users.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.name} ({u.rtRw}) — {u.totalPoints} Poin
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Point Check Banner */}
                    {(() => {
                      const selectedUser = users.find((u) => u.name === (redeemUserName || users[0]?.name));
                      const userPoints = selectedUser ? selectedUser.totalPoints : 0;
                      const isEnough = userPoints >= showRedeemModal.pointsRequired;

                      return (
                        <div
                          className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
                            isEnough
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300/60 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300'
                              : 'bg-rose-50 dark:bg-rose-950/50 border-rose-300/60 dark:border-rose-800/60 text-rose-800 dark:text-rose-300'
                          }`}
                        >
                          <div>
                            <span className="font-bold block">Poin Tersedia: {userPoints} Poin</span>
                            <span className="text-[11px] opacity-80">
                              {isEnough
                                ? `Sisa poin setelah ditukar: ${userPoints - showRedeemModal.pointsRequired} Poin`
                                : `Kurang ${showRedeemModal.pointsRequired - userPoints} Poin lagi.`}
                            </span>
                          </div>
                          <span className="font-mono font-black text-sm">
                            {isEnough ? '✅ Cukup' : '⚠️ Kurang'}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Modal Footer Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setShowRedeemModal(null)}
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  {users.length > 0 && (
                    <button
                      onClick={() => handleRedeem(showRedeemModal)}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Konfirmasi Tukar</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
