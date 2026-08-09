import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  GraduationCap,
  Sprout,
  Droplet,
  Bug,
  CalendarDays,
  TrendingUp,
  MapPin,
  Trophy,
  Home,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User as UserIcon,
  Leaf
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  onLogout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard },
    { id: 'poin', label: 'Poin & Papan Peringkat', icon: Trophy },
    { id: 'edukasi', label: 'Edukasi Sampah', icon: GraduationCap },
    { id: 'kompos', label: 'Modul Pupuk Kompos', icon: Sprout },
    { id: 'cair', label: 'Modul Pupuk Cair (POC)', icon: Droplet },
    { id: 'maggot', label: 'Budidaya Maggot BSF', icon: Bug },
    { id: 'jadwal', label: 'Penjadwalan Pupuk', icon: CalendarDays },
    { id: 'harga', label: 'Harga Hasil Tani Pasar TU', icon: TrendingUp },
    { id: 'peta', label: 'Peta Komposter Desa', icon: MapPin },
    { id: 'profil', label: 'Profil Desa Cibunian', icon: Home },
    { id: 'settings', label: 'Pengaturan', icon: Settings }
  ];


  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between bg-slate-900 text-slate-100">
      {/* Brand Logo & Title */}
      <div>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-green-600 rounded-xl text-white shrink-0">
              <Leaf className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap"
              >
                <h1 className="font-extrabold text-sm tracking-widest text-green-400">SIRAM</h1>
                <p className="text-[10px] text-slate-400 font-medium">Desa Cibunian</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-wider">Live Auto-Updated</span>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Collapse Button (Desktop Only) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                id={`sidebar-item-${item.id}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative cursor-pointer ${
                  isActive
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`} />
                
                {!isCollapsed && (
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>
                )}

                {/* Tooltip on Collapsed Sidebar */}
                {isCollapsed && (
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-950 text-slate-100 text-xs px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 whitespace-nowrap z-50 shadow-xl border border-slate-800">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-3 border-t border-slate-800">
        {/* User Info Card */}
        <div className={`flex items-center gap-3 p-3 bg-slate-950/40 rounded-xl mb-3 border border-slate-800/40 overflow-hidden ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          <div className="h-9 w-9 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <UserIcon className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-200 truncate">{user.name}</h4>
              <p className="text-[10px] text-green-500 font-semibold uppercase tracking-wider">
                {user.role}
              </p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors group relative cursor-pointer ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          {!isCollapsed && <span>Keluar Portal</span>}

          {isCollapsed && (
            <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-950 text-slate-100 text-xs px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 whitespace-nowrap z-50 shadow-xl border border-slate-800">
              Keluar Portal
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-30 border-r border-slate-800 bg-slate-900 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Slide-in Menu */}
      <div className={`md:hidden fixed inset-0 z-50 flex transition-opacity duration-300 ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-out drawer content */}
        <div className={`relative flex flex-col w-72 h-full bg-slate-900 shadow-2xl transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Close button inside drawer */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </div>
    </>
  );
}
