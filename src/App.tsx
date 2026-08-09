import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Bell, User as UserIcon, Leaf, Check, Send, AlertTriangle, CalendarDays, X } from 'lucide-react';

import { User, Schedule, Composter, FoodSecurityStats, AppSettings, EcoPointUser, EcoPointLog, EcoRewardItem } from './types';
import { defaultSchedules, defaultComposters, defaultFoodSecurityStats, defaultEcoUsers, defaultEcoLogs, defaultEcoRewards } from './data/initialData';

// Modular views
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PoinPengelola from './components/PoinPengelola';
import Edukasi from './components/Edukasi';
import KomposModule from './components/KomposModule';
import CairModule from './components/CairModule';
import MaggotModule from './components/MaggotModule';
import JadwalCRUD from './components/JadwalCRUD';
import HargaPasarTU from './components/HargaPasarTU';
import PetaKomposter from './components/PetaKomposter';
import ProfilDesa from './components/ProfilDesa';
import Pengaturan from './components/Pengaturan';

export default function App() {
  // --- SESSION STATE ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  // --- APPLICATION STATES ---
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [composters, setComposters] = useState<Composter[]>([]);
  const [foodSecurity, setFoodSecurity] = useState<FoodSecurityStats>({
    riceStock: 0,
    compostStock: 0,
    fertilizerStock: 0,
    maggotStock: 0,
    wasteProcessed: 0
  });
  const [settings, setSettings] = useState<AppSettings>({
    adminName: 'Pengelola SIRAM',
    notificationsEnabled: true,
    systemSoundEnabled: true,
    selectedTheme: 'dark',
    simulatedNotificationCount: 2
  });

  // --- ECO POINTS STATES ---
  const [ecoUsers, setEcoUsers] = useState<EcoPointUser[]>([]);
  const [ecoLogs, setEcoLogs] = useState<EcoPointLog[]>([]);
  const [ecoRewards, setEcoRewards] = useState<EcoRewardItem[]>([]);

  // --- NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  // Load session & initial records from localStorage
  useEffect(() => {
    // 1. Session check
    const savedSession = localStorage.getItem('sikomdig_session');
    if (savedSession) {
      try {
        const parsedUser = JSON.parse(savedSession);
        if (parsedUser && (parsedUser.name === 'Raihan Abdilah' || parsedUser.name === 'Pengelola SIKOMDIG' || !parsedUser.name)) {
          parsedUser.name = 'Pengelola SIRAM';
          localStorage.setItem('sikomdig_session', JSON.stringify(parsedUser));
        }
        setCurrentUser(parsedUser);
      } catch {
        // ignore parse error
      }
    }

    // 2. Load schedules
    const savedSchedules = localStorage.getItem('sikomdig_schedules');
    if (savedSchedules) {
      try {
        const parsed: Schedule[] = JSON.parse(savedSchedules);
        // Filter out sample or test schedules
        const filtered = parsed.filter(
          (s) =>
            !s.name.toLowerCase().includes('contoh') &&
            !s.name.toLowerCase().includes('uji') &&
            !s.name.includes('Harapan Jaya') &&
            !s.name.includes('Siti Aminah') &&
            !s.name.includes('Dadang') &&
            !s.name.includes('Tunas Mekar') &&
            !s.name.includes('Hendi') &&
            !s.name.includes('Mulyadi')
        );
        setSchedules(filtered);
        localStorage.setItem('sikomdig_schedules', JSON.stringify(filtered));
      } catch {
        setSchedules(defaultSchedules);
      }
    } else {
      setSchedules(defaultSchedules);
      localStorage.setItem('sikomdig_schedules', JSON.stringify(defaultSchedules));
    }

    // 3. Load composters
    const savedComposters = localStorage.getItem('sikomdig_composters');
    if (savedComposters) {
      try {
        const parsed: Composter[] = JSON.parse(savedComposters);
        const userOnly = parsed.filter(
          (c) => !['CMP-001', 'CMP-002', 'CMP-003', 'CMP-004', 'CMP-005'].includes(c.id)
        );
        setComposters(userOnly);
        localStorage.setItem('sikomdig_composters', JSON.stringify(userOnly));
      } catch {
        setComposters(defaultComposters);
        localStorage.setItem('sikomdig_composters', JSON.stringify(defaultComposters));
      }
    } else {
      setComposters(defaultComposters);
      localStorage.setItem('sikomdig_composters', JSON.stringify(defaultComposters));
    }

    // 4. Load Food Security Stats
    const savedStats = localStorage.getItem('sikomdig_food_stats');
    if (savedStats) {
      setFoodSecurity(JSON.parse(savedStats));
    } else {
      setFoodSecurity(defaultFoodSecurityStats);
      localStorage.setItem('sikomdig_food_stats', JSON.stringify(defaultFoodSecurityStats));
    }

    // 5. Load settings
    const savedSettings = localStorage.getItem('sikomdig_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      localStorage.setItem('sikomdig_settings', JSON.stringify(settings));
    }

    // 6. Load Eco Points Users
    const savedEcoUsers = localStorage.getItem('sikomdig_eco_users');
    if (savedEcoUsers) {
      try {
        const parsed: EcoPointUser[] = JSON.parse(savedEcoUsers);
        const userOnly = parsed.filter(
          (u) => !['USR-001', 'USR-002', 'USR-003', 'USR-004', 'USR-005'].includes(u.id)
        );
        setEcoUsers(userOnly);
        localStorage.setItem('sikomdig_eco_users', JSON.stringify(userOnly));
      } catch {
        setEcoUsers(defaultEcoUsers);
        localStorage.setItem('sikomdig_eco_users', JSON.stringify(defaultEcoUsers));
      }
    } else {
      setEcoUsers(defaultEcoUsers);
      localStorage.setItem('sikomdig_eco_users', JSON.stringify(defaultEcoUsers));
    }

    // 7. Load Eco Logs
    const savedEcoLogs = localStorage.getItem('sikomdig_eco_logs');
    if (savedEcoLogs) {
      try {
        const parsed: EcoPointLog[] = JSON.parse(savedEcoLogs);
        const userOnly = parsed.filter(
          (l) => !['LOG-101', 'LOG-102', 'LOG-103', 'LOG-104'].includes(l.id)
        );
        setEcoLogs(userOnly);
        localStorage.setItem('sikomdig_eco_logs', JSON.stringify(userOnly));
      } catch {
        setEcoLogs(defaultEcoLogs);
        localStorage.setItem('sikomdig_eco_logs', JSON.stringify(defaultEcoLogs));
      }
    } else {
      setEcoLogs(defaultEcoLogs);
      localStorage.setItem('sikomdig_eco_logs', JSON.stringify(defaultEcoLogs));
    }

    // 8. Load Eco Rewards
    const savedEcoRewards = localStorage.getItem('sikomdig_eco_rewards');
    if (savedEcoRewards) {
      try {
        const parsed: EcoRewardItem[] = JSON.parse(savedEcoRewards);
        const updated = parsed.map((r) => {
          if (r.id === 'REW-004' && (r.title.includes('Voucher') || r.category === 'Voucher / Diskon')) {
            return {
              id: 'REW-004',
              title: 'Paket Mulsa Organik & Bio-Pestisida Tani (10 Kg)',
              category: 'Kebutuhan Tani',
              pointsRequired: 220,
              stock: 20,
              description: 'Mulsa penutup tanah jerami dan pestisida hayati nabati ramah lingkungan pencegah hama.',
              iconEmoji: '🌾'
            };
          }
          return r;
        });
        setEcoRewards(updated);
        localStorage.setItem('sikomdig_eco_rewards', JSON.stringify(updated));
      } catch {
        setEcoRewards(defaultEcoRewards);
        localStorage.setItem('sikomdig_eco_rewards', JSON.stringify(defaultEcoRewards));
      }
    } else {
      setEcoRewards(defaultEcoRewards);
      localStorage.setItem('sikomdig_eco_rewards', JSON.stringify(defaultEcoRewards));
    }

    setIsSessionLoading(false);
  }, []);

  // Sync state helpers
  const handleUpdateSchedules = (newSchedules: Schedule[]) => {
    setSchedules(newSchedules);
    localStorage.setItem('sikomdig_schedules', JSON.stringify(newSchedules));
  };

  const handleUpdateComposters = (newComposters: Composter[]) => {
    setComposters(newComposters);
    localStorage.setItem('sikomdig_composters', JSON.stringify(newComposters));
  };

  const handleUpdateFoodSecurity = (newStats: FoodSecurityStats) => {
    setFoodSecurity(newStats);
    localStorage.setItem('sikomdig_food_stats', JSON.stringify(newStats));
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('sikomdig_settings', JSON.stringify(newSettings));
  };

  // --- ECO POINTS HANDLERS ---
  const handleAddEcoLog = (newLogData: Omit<EcoPointLog, 'id' | 'timestamp'>) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newLog: EcoPointLog = {
      ...newLogData,
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp
    };

    const updatedLogs = [newLog, ...ecoLogs];
    setEcoLogs(updatedLogs);
    localStorage.setItem('sikomdig_eco_logs', JSON.stringify(updatedLogs));

    // Update user points and badge
    const existingUser = ecoUsers.find((u) => u.name.toLowerCase() === newLog.userName.toLowerCase());
    let updatedUsers: EcoPointUser[] = [];

    if (existingUser) {
      updatedUsers = ecoUsers.map((u) => {
        if (u.id === existingUser.id) {
          const newPts = u.totalPoints + newLog.pointsEarned;
          const newKg = u.totalWasteProcessedKg + newLog.weightKg;
          let badge: EcoPointUser['badge'] = 'Pejuang Pemula';
          if (newPts >= 1000) badge = 'Pahlawan Cibunian';
          else if (newPts >= 600) badge = 'Maestro Organik';
          else if (newPts >= 300) badge = 'Pahlawan Hijau';

          return {
            ...u,
            totalPoints: newPts,
            totalWasteProcessedKg: newKg,
            badge,
            lastActivity: timestamp
          };
        }
        return u;
      });
    } else {
      // Create new user entry on leaderboard
      let badge: EcoPointUser['badge'] = 'Pejuang Pemula';
      if (newLog.pointsEarned >= 1000) badge = 'Pahlawan Cibunian';
      else if (newLog.pointsEarned >= 600) badge = 'Maestro Organik';
      else if (newLog.pointsEarned >= 300) badge = 'Pahlawan Hijau';

      const newUser: EcoPointUser = {
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: newLog.userName,
        rtRw: newLog.userRtRw,
        totalPoints: newLog.pointsEarned,
        totalWasteProcessedKg: newLog.weightKg,
        badge,
        lastActivity: timestamp,
        avatarEmoji: '🌾'
      };
      updatedUsers = [newUser, ...ecoUsers];
    }

    setEcoUsers(updatedUsers);
    localStorage.setItem('sikomdig_eco_users', JSON.stringify(updatedUsers));

    // Also increment food security waste processed
    const updatedFoodSec = {
      ...foodSecurity,
      wasteProcessed: foodSecurity.wasteProcessed + newLog.weightKg
    };
    handleUpdateFoodSecurity(updatedFoodSec);

    if (settings.systemSoundEnabled) playSystemBeep();
  };

  const handleRedeemReward = (rewardId: string, pointsRequired: number, userName: string) => {
    // Find target reward
    const reward = ecoRewards.find((r) => r.id === rewardId);
    if (!reward || reward.stock <= 0) return false;

    // Deduct stock
    const updatedRewards = ecoRewards.map((r) =>
      r.id === rewardId ? { ...r, stock: r.stock - 1 } : r
    );
    setEcoRewards(updatedRewards);
    localStorage.setItem('sikomdig_eco_rewards', JSON.stringify(updatedRewards));

    // Deduct points from user if found
    const targetUser = ecoUsers.find((u) => u.name.toLowerCase() === userName.toLowerCase()) || ecoUsers[0];
    if (targetUser && targetUser.totalPoints >= pointsRequired) {
      const updatedUsers = ecoUsers.map((u) =>
        u.id === targetUser.id ? { ...u, totalPoints: u.totalPoints - pointsRequired } : u
      );
      setEcoUsers(updatedUsers);
      localStorage.setItem('sikomdig_eco_users', JSON.stringify(updatedUsers));
    }

    if (settings.systemSoundEnabled) playSystemBeep();
    return true;
  };

  // --- CRUD ACTIONS ---
  const handleAddSchedule = (item: Schedule) => {
    const updated = [item, ...schedules];
    handleUpdateSchedules(updated);
    if (settings.systemSoundEnabled) playSystemBeep();
  };

  const handleUpdateSchedule = (updatedItem: Schedule) => {
    const updated = schedules.map((s) => (s.id === updatedItem.id ? updatedItem : s));
    handleUpdateSchedules(updated);
    if (settings.systemSoundEnabled) playSystemBeep();
  };

  const handleDeleteSchedule = (id: string) => {
    const updated = schedules.filter((s) => s.id !== id);
    handleUpdateSchedules(updated);
    if (settings.systemSoundEnabled) playSystemBeep();
  };

  const handleAddComposter = (newNode: Composter) => {
    const updated = [...composters, newNode];
    handleUpdateComposters(updated);
    if (settings.systemSoundEnabled) playSystemBeep();
  };

  const handleUpdateComposter = (updatedNode: Composter) => {
    const updated = composters.map((c) => (c.id === updatedNode.id ? updatedNode : c));
    handleUpdateComposters(updated);
    if (settings.systemSoundEnabled) playSystemBeep();
  };

  const handleDeleteComposter = (id: string) => {
    const updated = composters.filter((c) => c.id !== id);
    handleUpdateComposters(updated);
    if (settings.systemSoundEnabled) playSystemBeep();
  };

  // --- SYSTEM FUNCTIONS ---
  const todayStr = new Date().toISOString().split('T')[0];
  const dueSchedules = schedules.filter(
    (s) => s.status === 'Pending' && s.date <= todayStr
  );
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  const handleSendDirectWA = (item: Schedule) => {
    const formattedName = item.name.trim() || 'Warga Cibunian';
    const msg = `*📢 [SIRAM DESA CIBUNIAN]*\n` +
      `*NOTIFIKASI OTOMATIS JADWAL PENGAMBILAN PUPUK*\n\n` +
      `Yth. Bapak/Ibu *${formattedName}*,\n\n` +
      `Pemberitahuan resmi mengenai agenda distribusi pupuk organik Anda:\n` +
      `• *Jenis Pupuk:* ${item.fertilizerType}\n` +
      `• *Jumlah:* ${item.amount} ${item.fertilizerType.includes('POC') ? 'Liter' : 'Kg'}\n` +
      `• *Tanggal Pengambilan:* ${item.date} (SUDAH WAKTUNYA / JATUH TEMPO)\n` +
      `• *Lokasi:* Depo TPS3R / Bank Sampah Desa Cibunian\n` +
      `• *Catatan:* ${item.notes || 'Harap membawa wadah/kantong sendiri.'}\n\n` +
      `Mohon segera mengambil sesuai jadwal yang telah ditentukan. Terima kasih!\n\n` +
      `_Sistem Informasi Ramah Lingkungan (SIRAM)_\n` +
      `_Pemerintah Desa Cibunian_`;

    const waUrl = `https://api.whatsapp.com/send?phone=6289517923634&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  const playSystemBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(650, audioCtx.currentTime); // Pitch
      gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime); // Soft volume

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.08); // Short duration
    } catch (e) {
      console.log('Audio Context blocked or not supported');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sikomdig_session');
    setCurrentUser(null);
  };

  const handleResetDatabase = () => {
    localStorage.removeItem('sikomdig_schedules');
    localStorage.removeItem('sikomdig_composters');
    localStorage.removeItem('sikomdig_food_stats');
    localStorage.removeItem('sikomdig_settings');
  };

  // Theme layout styling maps
  const getThemeWrapperClass = () => {
    switch (settings.selectedTheme) {
      case 'dark':
        return 'bg-[#0A0A0B] text-slate-100 dark-theme-active';
      case 'nature':
        return 'bg-[#f4f7f5] text-slate-800 nature-theme-active';
      default:
        return 'bg-slate-50 text-slate-800 light-theme-active';
    }
  };

  const getCardHeaderClass = () => {
    return settings.selectedTheme === 'dark'
      ? 'bg-[#0F0F12] border-white/5 text-slate-100'
      : 'bg-white border-slate-100 text-slate-800';
  };

  // Render proper Tab/Screen view
  const renderActiveScreen = () => {
    if (!currentUser) return null;

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            user={currentUser}
            schedules={schedules}
            composters={composters}
            foodSecurity={foodSecurity}
            setFoodSecurity={handleUpdateFoodSecurity}
            onUpdateComposter={handleUpdateComposter}
            onUpdateComposters={handleUpdateComposters}
            setActiveTab={setActiveTab}
          />
        );
      case 'poin':
        return (
          <PoinPengelola
            users={ecoUsers}
            logs={ecoLogs}
            rewards={ecoRewards}
            currentUser={currentUser}
            onAddLog={handleAddEcoLog}
            onRedeemReward={handleRedeemReward}
          />
        );
      case 'edukasi':
        return <Edukasi setActiveTab={setActiveTab} />;
      case 'kompos':
        return <KomposModule />;
      case 'cair':
        return <CairModule />;
      case 'maggot':
        return <MaggotModule />;
      case 'jadwal':
        return (
          <JadwalCRUD
            schedules={schedules}
            onAddSchedule={handleAddSchedule}
            onUpdateSchedule={handleUpdateSchedule}
            onDeleteSchedule={handleDeleteSchedule}
          />
        );
      case 'harga':
        return <HargaPasarTU />;
      case 'peta':
        return (
          <PetaKomposter
            composters={composters}
            onAddComposter={handleAddComposter}
            onUpdateComposter={handleUpdateComposter}
            onDeleteComposter={handleDeleteComposter}
          />
        );
      case 'profil':
        return <ProfilDesa theme={settings.selectedTheme} />;
      case 'settings':
        return (
          <Pengaturan
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onResetDatabase={handleResetDatabase}
          />
        );
      default:
        return <div className="p-10 text-center font-bold text-slate-400">Halaman tidak ditemukan.</div>;
    }
  };

  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 space-y-4">
        <div className="p-3 bg-green-600 rounded-2xl animate-spin">
          <Leaf className="h-8 w-8 text-white" />
        </div>
        <p className="text-xs font-bold font-mono tracking-widest uppercase text-green-400">
          Memuat Portal SIRAM...
        </p>
      </div>
    );
  }

  // If session not active, force Login screen
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${getThemeWrapperClass()}`}>
      
      {/* Sidebar container */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={currentUser}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        mobileOpen={isMobileSidebarOpen}
        setMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${
        isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'
      }`}>
        
        {/* Top Header Navigation panel */}
        <header className={`sticky top-0 z-20 backdrop-blur-md border-b py-4 px-6 md:px-8 flex items-center justify-between transition-colors duration-300 ${
          settings.selectedTheme === 'dark'
            ? 'bg-[#0A0A0B]/80 border-white/5 text-zinc-100'
            : settings.selectedTheme === 'nature'
            ? 'bg-[#f4f7f5]/80 border-green-100 text-slate-800'
            : 'bg-white/80 border-slate-100 text-slate-800'
        }`}>
          
          {/* Left panel: mobile menu trigger & greeting */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className={`md:hidden p-2 rounded-xl transition-colors cursor-pointer ${
                settings.selectedTheme === 'dark' ? 'hover:bg-white/5 text-slate-300' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Mobile-only subtle watermark */}
            <div className="md:hidden">
              <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full select-none">
                KKM 06 UIB
              </span>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  settings.selectedTheme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                }`}>
                  PORTAL SIRAM DESA CIBUNIAN
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full select-none">
                  KKM 06 UIB Ummul Quro
                </span>
              </div>
              <h2 className={`text-sm font-extrabold capitalize mt-0.5 ${
                settings.selectedTheme === 'dark' ? 'text-zinc-100' : 'text-slate-700'
              }`}>
                Modul Aktif: {activeTab === 'dashboard' ? 'Beranda Utama' : activeTab}
              </h2>
            </div>
          </div>

          {/* Right panel: Notification toggle, Admin name */}
          <div className="flex items-center gap-3.5 relative">
            <button
              onClick={() => {
                setShowNotificationPopup(!showNotificationPopup);
                if (settings.systemSoundEnabled) playSystemBeep();
              }}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-xl text-slate-500 hover:text-slate-700 relative transition-all cursor-pointer"
            >
              <Bell className="h-4.5 w-4.5" />
              {(dueSchedules.length > 0 || settings.simulatedNotificationCount > 0) && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center ring-2 ring-white animate-pulse">
                  {dueSchedules.length + (settings.simulatedNotificationCount > 0 ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Notification drop simulation */}
            <AnimatePresence>
              {showNotificationPopup && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 top-12 w-88 bg-white border border-slate-100 rounded-3xl p-5 shadow-2xl z-50 space-y-3.5"
                >
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="text-xs font-black text-slate-800">Pemberitahuan Sistem</span>
                    <button
                      onClick={() => {
                        handleUpdateSettings({ ...settings, simulatedNotificationCount: 0 });
                        setShowNotificationPopup(false);
                      }}
                      className="text-[10px] font-bold text-green-600 hover:text-green-700"
                    >
                      Tandai Dibaca
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-0.5">
                    {/* Due Schedule Notifications */}
                    {dueSchedules.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-[11px] leading-relaxed font-medium space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-amber-800 font-black flex items-center gap-1">
                            ⏰ JADWAL HARI INI
                          </span>
                          <span className="text-[9px] font-mono text-amber-700 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-slate-700">
                          Pengambilan <strong>{item.amount} {item.fertilizerType.includes('POC') ? 'L' : 'Kg'} {item.fertilizerType}</strong> oleh <strong>{item.name || 'Warga'}</strong> telah memasuki jadwal!
                        </p>
                        <button
                          onClick={() => handleSendDirectWA(item)}
                          className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                        >
                          <Send className="h-3 w-3" />
                          <span>📱 Kirim WA Otomatis</span>
                        </button>
                      </div>
                    ))}

                    {settings.simulatedNotificationCount > 0 && (
                      <div className="p-3 bg-slate-50 rounded-xl text-[11px] leading-relaxed font-medium">
                        <span className="text-green-600 font-bold block mb-1">📢 SUHU KOMPOSTER RW 03</span>
                        Suhu bak **KMP-RW03** mencapai 62°C. Menandakan pembusukan aerobik bekerja optimal.
                      </div>
                    )}

                    {dueSchedules.length === 0 && settings.simulatedNotificationCount === 0 && (
                      <p className="text-[11px] text-slate-400 text-center py-4">Semua pemberitahuan telah dibaca.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 border-l border-slate-100 pl-3.5">
              <div className="h-8 w-8 rounded-full bg-green-50 text-green-600 border border-green-100 flex items-center justify-center">
                <UserIcon className="h-4 w-4" />
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <span className="font-extrabold text-slate-700 block truncate max-w-[120px]">{currentUser.name}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">{currentUser.role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Primary container page content wrapper */}
        <main className="flex-1 p-6 md:p-8 max-w-[1500px] w-full mx-auto space-y-6">
          {/* Global Auto-Notification Banner for Due Schedules */}
          {dueSchedules.length > 0 && !isBannerDismissed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-700 text-white p-4 md:p-5 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-amber-300/40 relative overflow-hidden"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shrink-0 text-white animate-bounce">
                  <Bell className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-300 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Notifikasi Otomatis Penjadwalan
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-100">
                      {todayStr}
                    </span>
                  </div>
                  <h3 className="font-black text-sm md:text-base leading-tight">
                    ⏰ {dueSchedules.length} Jadwal Pengambilan Pupuk Sudah Waktunya Ambil!
                  </h3>
                  <p className="text-xs text-emerald-50/90 leading-relaxed max-w-2xl">
                    Sistem otomatis mendeteksi jadwal pengambilan pupuk yang telah jatuh tempo. Klik tombol di bawah untuk langsung mengirimkan notifikasi resmi ke WhatsApp warga!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
                <button
                  onClick={() => {
                    if (dueSchedules[0]) {
                      handleSendDirectWA(dueSchedules[0]);
                    }
                  }}
                  className="px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="h-4 w-4 text-emerald-600" />
                  <span>📱 Kirim Notif WA Otomatis</span>
                </button>
                <button
                  onClick={() => setActiveTab('jadwal')}
                  className="px-3.5 py-2.5 bg-black/20 hover:bg-black/30 text-white font-bold text-xs rounded-2xl transition-all cursor-pointer"
                >
                  Buka Kelola Jadwal
                </button>
                <button
                  onClick={() => setIsBannerDismissed(true)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-colors cursor-pointer"
                  title="Tutup banner"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {renderActiveScreen()}
        </main>

        {/* Small footer */}
        <footer className="py-6 px-6 md:px-8 border-t border-slate-100 text-center text-[10px] font-mono font-medium text-slate-400">
          SIRAM Desa Cibunian • © 2026 Pemerintahan Desa Cibunian, Kec. Pamijahan, Kab. Bogor, Jawa Barat.
        </footer>
      </div>
    </div>
  );
}
