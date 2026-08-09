import { Schedule, Composter, FoodSecurityStats, EcoPointUser, EcoPointLog, EcoRewardItem } from '../types';

export const defaultSchedules: Schedule[] = [];

export const defaultComposters: Composter[] = [];

export const defaultFoodSecurityStats: FoodSecurityStats = {
  riceStock: 1250,
  compostStock: 850,
  fertilizerStock: 420,
  maggotStock: 180,
  wasteProcessed: 4320 // Lifetime total in kg
};

export const defaultEcoUsers: EcoPointUser[] = [];

export const defaultEcoLogs: EcoPointLog[] = [];

export const defaultEcoRewards: EcoRewardItem[] = [
  {
    id: 'REW-001',
    title: '1 Karung Kompos Organik Matang (5 Kg)',
    category: 'Pupuk & Bibit',
    pointsRequired: 150,
    stock: 25,
    description: 'Kompos siap pakai bernutrisi tinggi hasil olahan warga Desa Cibunian.',
    iconEmoji: '🌱'
  },
  {
    id: 'REW-002',
    title: '1 Botol Pupuk Organik Cair / POC (1 Liter)',
    category: 'Pupuk & Bibit',
    pointsRequired: 100,
    stock: 40,
    description: 'POC konsentrat tinggi mikroorganisme penyubur tanaman hortikultura.',
    iconEmoji: '🧪'
  },
  {
    id: 'REW-003',
    title: 'Paket Bibit Sayuran Unggul (Cabai, Bawang & Terong)',
    category: 'Pupuk & Bibit',
    pointsRequired: 80,
    stock: 50,
    description: 'Paket 3 varietas bibit siap tanam untuk ketahanan pangan pekarangan.',
    iconEmoji: '🌶️'
  },
  {
    id: 'REW-004',
    title: 'Paket Mulsa Organik & Bio-Pestisida Tani (10 Kg)',
    category: 'Kebutuhan Tani',
    pointsRequired: 220,
    stock: 20,
    description: 'Mulsa penutup tanah jerami dan pestisida hayati nabati ramah lingkungan pencegah hama.',
    iconEmoji: '🌾'
  },
  {
    id: 'REW-005',
    title: 'Sekop Mini & Sarung Tangan Organik',
    category: 'Alat Pertanian',
    pointsRequired: 200,
    stock: 12,
    description: 'Set alat berkebun dan pengolahan sampah komposter serbaguna.',
    iconEmoji: '🛠️'
  }
];

