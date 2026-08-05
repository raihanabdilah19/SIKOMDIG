import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Bell, User as UserIcon, Leaf, Check } from 'lucide-react';

import { User, Schedule, Composter, FoodSecurityStats, AppSettings } from './types';
import { defaultSchedules, defaultComposters, defaultFoodSecurityStats } from './data/initialData';

// Modular views
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
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
    adminName: 'Raihan Abdilah',
    notificationsEnabled: true,
    systemSoundEnabled: true,
    selectedTheme: 'dark',
    simulatedNotificationCount: 2
  });

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
      setCurrentUser(JSON.parse(savedSession));
    }

    // 2. Load schedules
    const savedSchedules = localStorage.getItem('sikomdig_schedules');
    if (savedSchedules) {
      setSchedules(JSON.parse(savedSchedules));
    } else {
      setSchedules(defaultSchedules);
      localStorage.setItem('sikomdig_schedules', JSON.stringify(defaultSchedules));
    }

    // 3. Load composters
    const savedComposters = localStorage.getItem('sikomdig_composters');
    if (savedComposters) {
      setComposters(JSON.parse(savedComposters));
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

  // --- SYSTEM FUNCTIONS ---
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
          Memuat Portal SIKOMDIG...
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
                  PORTAL SIKOMDIG DESA CIBUNIAN
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
              {settings.simulatedNotificationCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notification drop simulation */}
            <AnimatePresence>
              {showNotificationPopup && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 top-12 w-80 bg-white border border-slate-100 rounded-3xl p-5 shadow-2xl z-50 space-y-3.5"
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

                  {settings.simulatedNotificationCount > 0 ? (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-slate-50 rounded-xl text-[11px] leading-relaxed font-medium">
                        <span className="text-green-600 font-bold block mb-1">📢 SUHU KOMPOSTER RW 03</span>
                        Suhu bak **KMP-RW03** mencapai 62°C. Menandakan pembusukan aerobik bekerja optimal (Termofilik).
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl text-[11px] leading-relaxed font-medium">
                        <span className="text-sky-600 font-bold block mb-1">📅 JADWAL PENGAMBILAN</span>
                        Ibu Siti Aminah menjadwalkan pengambilan 25L Pupuk POC sore hari ini.
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-400 text-center py-4">Semua pemberitahuan telah dibaca.</p>
                  )}
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
        <main className="flex-1 p-6 md:p-8 max-w-[1500px] w-full mx-auto">
          {renderActiveScreen()}
        </main>

        {/* Small footer */}
        <footer className="py-6 px-6 md:px-8 border-t border-slate-100 text-center text-[10px] font-mono font-medium text-slate-400">
          SIKOMDIG Desa Cibunian • © 2026 Pemerintahan Desa Cibunian, Kec. Pamijahan, Kab. Bogor, Jawa Barat.
        </footer>
      </div>
    </div>
  );
}
