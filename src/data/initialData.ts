import { Schedule, Composter, FoodSecurityStats } from '../types';

export const defaultSchedules: Schedule[] = [
  {
    id: 'SCH-001',
    name: 'Kelompok Tani Harapan Jaya (Pak Mulyadi)',
    fertilizerType: 'Kompos Kering',
    date: '2026-07-15',
    amount: 150,
    status: 'Pending',
    notes: 'Untuk pemupukan padi sawah RW 03'
  },
  {
    id: 'SCH-002',
    name: 'Ibu Siti Aminah (KWT Melati)',
    fertilizerType: 'Pupuk Organik Cair (POC)',
    date: '2026-07-14',
    amount: 25,
    status: 'Selesai',
    notes: 'Diambil sore hari untuk sayuran hidroponik'
  },
  {
    id: 'SCH-003',
    name: 'Pak Dadang (Peternak Lele RW 05)',
    fertilizerType: 'Maggot BSF',
    date: '2026-07-13',
    amount: 10,
    status: 'Selesai',
    notes: 'Pakan alternatif kaya protein tinggi'
  },
  {
    id: 'SCH-004',
    name: 'Kelompok Tani Tunas Mekar',
    fertilizerType: 'Kompos Kering',
    date: '2026-07-18',
    amount: 300,
    status: 'Pending',
    notes: 'Pesanan subsidi desa untuk musim tanam'
  },
  {
    id: 'SCH-005',
    name: 'Pak Hendi (Kebun Alpukat)',
    fertilizerType: 'Pupuk Organik Cair (POC)',
    date: '2026-07-16',
    amount: 50,
    status: 'Pending',
    notes: 'Pengiriman langsung ke kebun atas RW 02'
  }
];

export const defaultComposters: Composter[] = [
  {
    id: 'CMP-001',
    code: 'KMP-RW01',
    location: 'Pos Ronda RW 01 (Dusun Kampung Baru)',
    rtRw: 'RT 02 / RW 01',
    status: 'Aktif',
    temperature: 55, // Thermophilic phase (good compost!)
    pH: 6.8,
    moisture: 60,
    capacity: 200,
    currentWeight: 120,
    lastChecked: '2026-07-11 08:30',
    coordinates: { x: 25, y: 35 },
    geoCoords: { lat: -6.6785, lng: 106.6620 }
  },
  {
    id: 'CMP-002',
    code: 'KMP-RW02',
    location: 'Balai Warga RW 02 (Samping Masjid Al-Barokah)',
    rtRw: 'RT 01 / RW 02',
    status: 'Aktif',
    temperature: 42,
    pH: 7.2,
    moisture: 55,
    capacity: 200,
    currentWeight: 85,
    lastChecked: '2026-07-11 09:15',
    coordinates: { x: 45, y: 25 },
    geoCoords: { lat: -6.6792, lng: 106.6648 }
  },
  {
    id: 'CMP-003',
    code: 'KMP-RW03',
    location: 'Area Pertanian Terpadu RW 03',
    rtRw: 'RT 03 / RW 03',
    status: 'Penuh',
    temperature: 62, // High temp - maturation cooking
    pH: 6.5,
    moisture: 65,
    capacity: 300,
    currentWeight: 295,
    lastChecked: '2026-07-11 10:00',
    coordinates: { x: 65, y: 55 },
    geoCoords: { lat: -6.6830, lng: 106.6685 }
  },
  {
    id: 'CMP-004',
    code: 'KMP-RW04',
    location: 'Dusun Cigamea RW 04',
    rtRw: 'RT 02 / RW 04',
    status: 'Perbaikan',
    temperature: 28, // Low - heating failure
    pH: 5.2, // Too acidic
    moisture: 80, // Too wet
    capacity: 200,
    currentWeight: 140,
    lastChecked: '2026-07-10 16:45',
    coordinates: { x: 35, y: 75 },
    geoCoords: { lat: -6.6855, lng: 106.6630 }
  },
  {
    id: 'CMP-005',
    code: 'KMP-RW05',
    location: 'Samping Saung Tani RW 05',
    rtRw: 'RT 04 / RW 05',
    status: 'Aktif',
    temperature: 48,
    pH: 7.0,
    moisture: 58,
    capacity: 250,
    currentWeight: 110,
    lastChecked: '2026-07-11 11:20',
    coordinates: { x: 80, y: 40 },
    geoCoords: { lat: -6.6810, lng: 106.6715 }
  }
];

export const defaultFoodSecurityStats: FoodSecurityStats = {
  riceStock: 1250,
  compostStock: 850,
  fertilizerStock: 420,
  maggotStock: 180,
  wasteProcessed: 4320 // Lifetime total in kg
};
