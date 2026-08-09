export interface User {
  username: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Schedule {
  id: string;
  name: string;
  fertilizerType: 'Kompos Kering' | 'Pupuk Organik Cair (POC)' | 'Maggot BSF';
  date: string; // Tanggal Siap Ambil / Panen
  startDate?: string; // Tanggal Mulai Proses
  amount: number; // in kg or liters
  status: 'Pending' | 'Selesai' | 'Dibatalkan';
  notes?: string;
}

export interface Composter {
  id: string;
  code: string;
  location: string;
  rtRw: string;
  status: 'Aktif' | 'Penuh' | 'Perbaikan';
  temperature: number; // in °C
  pH: number;
  moisture: number; // in %
  capacity: number; // total capacity in kg
  currentWeight: number; // current organic waste weight in kg
  lastChecked: string;
  coordinates: { x: number; y: number }; // Percentage coordinate on visual map
  geoCoords?: { lat: number; lng: number }; // Real GPS coordinates for Google Maps
}

export interface AppSettings {
  adminName: string;
  notificationsEnabled: boolean;
  systemSoundEnabled: boolean;
  selectedTheme: 'light' | 'dark' | 'nature';
  simulatedNotificationCount: number;
}

export interface FoodSecurityStats {
  riceStock: number; // in kg
  compostStock: number; // in kg
  fertilizerStock: number; // in liters
  maggotStock: number; // in kg
  wasteProcessed: number; // in kg
}

export interface EcoPointLog {
  id: string;
  userName: string;
  userRtRw: string;
  activityType: 'Setor Sampah Dapur' | 'Olah Kompos Kering' | 'Produksi POC' | 'Pakan Maggot BSF' | 'Perawatan Bak Komposter';
  weightKg: number;
  pointsEarned: number;
  timestamp: string;
  notes?: string;
}

export interface EcoPointUser {
  id: string;
  name: string;
  rtRw: string;
  totalPoints: number;
  totalWasteProcessedKg: number;
  badge: 'Pejuang Pemula' | 'Pahlawan Hijau' | 'Maestro Organik' | 'Pahlawan Cibunian';
  lastActivity: string;
  avatarEmoji?: string;
}

export interface EcoRewardItem {
  id: string;
  title: string;
  category: 'Pupuk & Bibit' | 'Hasil Tani' | 'Voucher / Diskon' | 'Alat Pertanian' | 'Kebutuhan Tani';
  pointsRequired: number;
  stock: number;
  description: string;
  iconEmoji: string;
}

