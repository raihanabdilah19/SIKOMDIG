import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Calculator,
  Share2,
  Calendar,
  Store,
  DollarSign,
  Plus,
  RefreshCw,
  CheckCircle2,
  Tag,
  Leaf,
  Info,
  Edit2,
  Trash2,
  RotateCcw,
  Zap,
  Building2
} from 'lucide-react';

export interface MarketPriceItem {
  id: string;
  name: string;
  category: 'Sayuran' | 'Bumbu & Rempah' | 'Pangan Utama' | 'Hasil SIKOMDIG' | 'Buah' | 'Peternakan';
  priceTu: number; // Harga di Pasar Induk TU Kemang (Perumda Pasar Pakuan Jaya)
  priceFarmgate: number; // Harga di Tingkat Petani Desa Cibunian
  unit: string; // kg, Liter, Ikat, Tray
  changeStatus: 'naik' | 'turun' | 'stabil';
  changeAmount: number; // nominal perubahan
  lastUpdated: string;
  supplyStatus: 'Melimpah' | 'Normal' | 'Terbatas';
  iconEmoji: string;
}

// Data Resmi Perumda Pasar Pakuan Jaya Kota Bogor - Pasar Induk TU Kemang
export const pakuanJayaOfficialPrices: MarketPriceItem[] = [
  {
    id: 'PKJ-001',
    name: 'Cabe Rawit Merah (Setan)',
    category: 'Bumbu & Rempah',
    priceTu: 50000,
    priceFarmgate: 44000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 3000,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Terbatas',
    iconEmoji: '🌶️'
  },
  {
    id: 'PKJ-002',
    name: 'Cabe Merah Keriting',
    category: 'Bumbu & Rempah',
    priceTu: 30000,
    priceFarmgate: 25000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🌶️'
  },
  {
    id: 'PKJ-003',
    name: 'Cabe Merah Teropong / Besar',
    category: 'Bumbu & Rempah',
    priceTu: 40000,
    priceFarmgate: 34000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 2000,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🌶️'
  },
  {
    id: 'PKJ-004',
    name: 'Cabe Rawit Hijau',
    category: 'Bumbu & Rempah',
    priceTu: 30000,
    priceFarmgate: 24000,
    unit: 'kg',
    changeStatus: 'turun',
    changeAmount: 1500,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Melimpah',
    iconEmoji: '🌶️'
  },
  {
    id: 'PKJ-005',
    name: 'Bawang Merah Lokal',
    category: 'Bumbu & Rempah',
    priceTu: 40000,
    priceFarmgate: 34000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🧅'
  },
  {
    id: 'PKJ-006',
    name: 'Bawang Putih Kating',
    category: 'Bumbu & Rempah',
    priceTu: 40000,
    priceFarmgate: 35000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🧄'
  },
  {
    id: 'PKJ-007',
    name: 'Tomat Merah Super',
    category: 'Sayuran',
    priceTu: 30000,
    priceFarmgate: 24000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 2000,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Terbatas',
    iconEmoji: '🍅'
  },
  {
    id: 'PKJ-008',
    name: 'Wortel Segar Super',
    category: 'Sayuran',
    priceTu: 8000,
    priceFarmgate: 6000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Melimpah',
    iconEmoji: '🥕'
  },
  {
    id: 'PKJ-009',
    name: 'Ketimun / Mentimun',
    category: 'Sayuran',
    priceTu: 10000,
    priceFarmgate: 7500,
    unit: 'kg',
    changeStatus: 'turun',
    changeAmount: 500,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Melimpah',
    iconEmoji: '🥒'
  },
  {
    id: 'PKJ-010',
    name: 'Terong Ungu Segar',
    category: 'Sayuran',
    priceTu: 12000,
    priceFarmgate: 9000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🍆'
  },
  {
    id: 'PKJ-011',
    name: 'Buncis Segar',
    category: 'Sayuran',
    priceTu: 20000,
    priceFarmgate: 16000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 1000,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🫛'
  },
  {
    id: 'PKJ-012',
    name: 'Kacang Panjang',
    category: 'Sayuran',
    priceTu: 14000,
    priceFarmgate: 11000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Melimpah',
    iconEmoji: '🫛'
  },
  {
    id: 'PKJ-013',
    name: 'Sawi Hijau / Caisim',
    category: 'Sayuran',
    priceTu: 10000,
    priceFarmgate: 7000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🥬'
  },
  {
    id: 'PKJ-014',
    name: 'Kol / Kubis Segar',
    category: 'Sayuran',
    priceTu: 11000,
    priceFarmgate: 8000,
    unit: 'kg',
    changeStatus: 'turun',
    changeAmount: 1000,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Melimpah',
    iconEmoji: '🥬'
  },
  {
    id: 'PKJ-015',
    name: 'Labu Siam',
    category: 'Sayuran',
    priceTu: 12000,
    priceFarmgate: 9000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🍈'
  },
  {
    id: 'PKJ-016',
    name: 'Daun Bawang (Muncang)',
    category: 'Sayuran',
    priceTu: 14000,
    priceFarmgate: 11000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 1000,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🥬'
  },
  {
    id: 'PKJ-017',
    name: 'Daun Singkong Segar',
    category: 'Sayuran',
    priceTu: 2000,
    priceFarmgate: 1000,
    unit: 'ikat',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Melimpah',
    iconEmoji: '🌿'
  },
  {
    id: 'PKJ-018',
    name: 'Beras Medium',
    category: 'Pangan Utama',
    priceTu: 13500,
    priceFarmgate: 12000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🌾'
  },
  {
    id: 'PKJ-019',
    name: 'Beras Premium Pandan Wangi',
    category: 'Pangan Utama',
    priceTu: 16000,
    priceFarmgate: 14500,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🌾'
  },
  {
    id: 'PKJ-020',
    name: 'Jagung Pipilan Kering',
    category: 'Pangan Utama',
    priceTu: 8000,
    priceFarmgate: 6500,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 500,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Terbatas',
    iconEmoji: '🌽'
  },
  {
    id: 'PKJ-021',
    name: 'Daging Ayam Ras',
    category: 'Peternakan',
    priceTu: 40000,
    priceFarmgate: 35000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🍗'
  },
  {
    id: 'PKJ-022',
    name: 'Telur Ayam Ras',
    category: 'Peternakan',
    priceTu: 26000,
    priceFarmgate: 23500,
    unit: 'kg',
    changeStatus: 'turun',
    changeAmount: 500,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Melimpah',
    iconEmoji: '🥚'
  },
  {
    id: 'PKJ-023',
    name: 'Maggot BSF Kering High Protein',
    category: 'Hasil SIKOMDIG',
    priceTu: 48000,
    priceFarmgate: 42000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 2000,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Terbatas',
    iconEmoji: '🪱'
  },
  {
    id: 'PKJ-024',
    name: 'Alpukat Miki Cibunian',
    category: 'Buah',
    priceTu: 26000,
    priceFarmgate: 22000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 1500,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🥑'
  },
  {
    id: 'PKJ-025',
    name: 'Pisang Ambon / Kepok',
    category: 'Buah',
    priceTu: 18000,
    priceFarmgate: 14000,
    unit: 'sisir',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026, 08:30 WIB',
    supplyStatus: 'Normal',
    iconEmoji: '🍌'
  }
];

export default function HargaPasarTU() {
  const [prices, setPrices] = useState<MarketPriceItem[]>(() => {
    const saved = localStorage.getItem('sikomdig_market_prices_pakuan');
    if (saved) {
      try {
        const parsed: MarketPriceItem[] = JSON.parse(saved);
        // Ensure no leftover compost items
        return parsed.filter(
          (item) =>
            !item.name.toLowerCase().includes('kompos organik super') &&
            !item.name.toLowerCase().includes('pupuk organik cair')
        );
      } catch {
        return pakuanJayaOfficialPrices;
      }
    }
    return pakuanJayaOfficialPrices;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>(
    new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) +
      ', ' +
      new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
      ' WIB'
  );

  // Calculator State
  const [calcSelectedId, setCalcSelectedId] = useState<string>(prices[0]?.id || 'PKJ-001');
  const [calcQuantity, setCalcQuantity] = useState<number>(50);
  const [useFarmgate, setUseFarmgate] = useState<boolean>(true);

  // Form add / edit item state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MarketPriceItem | null>(null);

  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<MarketPriceItem['category']>('Sayuran');
  const [newPriceTu, setNewPriceTu] = useState<number>(10000);
  const [newPriceFarmgate, setNewPriceFarmgate] = useState<number>(8500);
  const [newUnit, setNewUnit] = useState('kg');
  const [newEmoji, setNewEmoji] = useState('🥦');
  const [newSupplyStatus, setNewSupplyStatus] = useState<'Melimpah' | 'Normal' | 'Terbatas'>('Normal');

  const savePrices = (updated: MarketPriceItem[]) => {
    setPrices(updated);
    localStorage.setItem('sikomdig_market_prices_pakuan', JSON.stringify(updated));
  };

  // Live Auto-Update effect simulation
  useEffect(() => {
    if (!autoUpdateEnabled) return;

    const interval = setInterval(() => {
      // Small realistic live tick for 1 random item
      setPrices((prevPrices) => {
        if (!prevPrices.length) return prevPrices;
        const randomIndex = Math.floor(Math.random() * prevPrices.length);
        const target = prevPrices[randomIndex];

        const isUp = Math.random() > 0.45;
        const delta = Math.floor(Math.random() * 2 + 1) * 500;
        const newPriceTu = Math.max(2000, target.priceTu + (isUp ? delta : -delta));
        const newPriceFarmgate = Math.max(1500, Math.round(newPriceTu * 0.85));

        const nowStr =
          'Hari Ini, ' +
          new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
          ' WIB';

        const updated = [...prevPrices];
        updated[randomIndex] = {
          ...target,
          priceTu: newPriceTu,
          priceFarmgate: newPriceFarmgate,
          changeStatus: isUp ? 'naik' : 'turun',
          changeAmount: delta,
          lastUpdated: nowStr
        };

        localStorage.setItem('sikomdig_market_prices_pakuan', JSON.stringify(updated));
        setLastSyncTime(
          new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) +
            ', ' +
            new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
            ' WIB'
        );
        return updated;
      });
    }, 25000); // Ticks every 25 seconds

    return () => clearInterval(interval);
  }, [autoUpdateEnabled]);

  const handleSyncPrices = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const nowStr =
        new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) +
        ', ' +
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
        ' WIB';

      const updated = prices.map((item) => {
        const isUp = Math.random() > 0.45;
        const delta = Math.floor(Math.random() * 3 + 1) * 500;
        const newPriceTu = Math.max(2000, item.priceTu + (isUp ? delta : -delta));
        const newPriceFarmgate = Math.max(1500, Math.round(newPriceTu * 0.85));

        return {
          ...item,
          priceTu: newPriceTu,
          priceFarmgate: newPriceFarmgate,
          changeStatus: isUp ? 'naik' : 'turun',
          changeAmount: delta,
          lastUpdated: nowStr
        } as MarketPriceItem;
      });

      savePrices(updated);
      setLastSyncTime(nowStr);
      setIsSyncing(false);
    }, 700);
  };

  const handleResetToOfficialData = () => {
    if (window.confirm('Reset data harga ke indeks resmi Perumda Pasar Pakuan Jaya Kota Bogor?')) {
      const nowStr =
        new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) +
        ', ' +
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
        ' WIB';

      const resetData = pakuanJayaOfficialPrices.map((item) => ({
        ...item,
        lastUpdated: nowStr
      }));

      savePrices(resetData);
      setLastSyncTime(nowStr);
    }
  };

  const categories = ['Semua', 'Sayuran', 'Bumbu & Rempah', 'Pangan Utama', 'Hasil SIKOMDIG', 'Buah', 'Peternakan'];

  const filteredPrices = prices.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate calculator details
  const calcItem = prices.find((p) => p.id === calcSelectedId) || prices[0];
  const unitPrice = calcItem ? (useFarmgate ? calcItem.priceFarmgate : calcItem.priceTu) : 0;
  const grossRevenue = (calcQuantity || 0) * unitPrice;
  const estTransportCost = useFarmgate ? 0 : Math.round(grossRevenue * 0.08); // 8% transport cost to Pasar TU
  const netRevenue = grossRevenue - estTransportCost;

  const handleOpenModalForAdd = () => {
    setEditingItem(null);
    setNewName('');
    setNewCategory('Sayuran');
    setNewPriceTu(10000);
    setNewPriceFarmgate(8500);
    setNewUnit('kg');
    setNewEmoji('🥦');
    setNewSupplyStatus('Normal');
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (item: MarketPriceItem) => {
    setEditingItem(item);
    setNewName(item.name);
    setNewCategory(item.category);
    setNewPriceTu(item.priceTu);
    setNewPriceFarmgate(item.priceFarmgate);
    setNewUnit(item.unit);
    setNewEmoji(item.iconEmoji);
    setNewSupplyStatus(item.supplyStatus);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`Hapus ${name} dari daftar harga?`)) {
      const updated = prices.filter((p) => p.id !== id);
      savePrices(updated);
    }
  };

  const handleSaveFormModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const nowStr =
      new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) +
      ', ' +
      new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
      ' WIB';

    if (editingItem) {
      // Edit mode
      const updated = prices.map((p) => {
        if (p.id === editingItem.id) {
          return {
            ...p,
            name: newName,
            category: newCategory,
            priceTu: newPriceTu,
            priceFarmgate: newPriceFarmgate,
            unit: newUnit,
            iconEmoji: newEmoji || '📦',
            supplyStatus: newSupplyStatus,
            lastUpdated: nowStr
          };
        }
        return p;
      });
      savePrices(updated);
    } else {
      // Add mode
      const newItem: MarketPriceItem = {
        id: `PKJ-${Date.now().toString().slice(-4)}`,
        name: newName,
        category: newCategory,
        priceTu: newPriceTu,
        priceFarmgate: newPriceFarmgate,
        unit: newUnit,
        changeStatus: 'stabil',
        changeAmount: 0,
        lastUpdated: nowStr,
        supplyStatus: newSupplyStatus,
        iconEmoji: newEmoji || '📦'
      };
      savePrices([newItem, ...prices]);
    }

    setIsModalOpen(false);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleShareWA = () => {
    let msg = `*📊 INDEX HARGA HASIL TANI PASAR TU KEMANG BOGOR*\n`;
    msg += `_Sumber Data: Perumda Pasar Pakuan Jaya Kota Bogor & KWT Desa Cibunian_\n`;
    msg += `_Update Terkini: ${lastSyncTime}_\n\n`;

    filteredPrices.slice(0, 10).forEach((p) => {
      msg += `${p.iconEmoji} *${p.name}*\n`;
      msg += `   • Pasar TU Kemang: ${formatRupiah(p.priceTu)} / ${p.unit}\n`;
      msg += `   • Tingkat Petani: ${formatRupiah(p.priceFarmgate)} / ${p.unit}\n`;
      msg += `   • Status: ${p.changeStatus === 'naik' ? '📈 Naik' : p.changeStatus === 'turun' ? '📉 Turun' : '⚖️ Stabil'}\n\n`;
    });

    msg += `_Portal SIKOMDIG Desa Cibunian - Akses Realtime Informasi Pasar Induk_`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                <Building2 className="h-3.5 w-3.5" />
                <span>Perumda Pasar Pakuan Jaya Kota Bogor</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-semibold">
                <Store className="h-3 w-3 text-emerald-400" />
                <span>Pasar Induk TU Kemang</span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Daftar Harga Jual Hasil Tani Terupdate
            </h1>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed font-normal">
              Indeks resmi harga komoditas pertanian, bahan pokok, dan hasil panen kebun Desa Cibunian disinkronkan langsung dengan Pasar Induk Teknik Utama (TU) Kemang Kota Bogor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleSyncPrices}
              disabled={isSyncing}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl border border-emerald-500/30 transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95 disabled:opacity-70"
            >
              <RefreshCw className={`h-4 w-4 text-emerald-300 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Memperbarui...' : 'Sync Pasar TU'}</span>
            </button>

            <button
              onClick={handleShareWA}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer active:scale-95"
            >
              <Share2 className="h-4 w-4" />
              <span>Bagikan WA</span>
            </button>

            <button
              onClick={handleOpenModalForAdd}
              className="px-4 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-black/10 cursor-pointer active:scale-95"
            >
              <Plus className="h-4 w-4 text-emerald-700" />
              <span>Tambah Komoditas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Status & Sync Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-800">
                Update Realtime Perumda Pasar Pakuan Jaya
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                Aktif Auto-Sync
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Terakhir diperbarui: <span className="font-bold text-slate-600">{lastSyncTime}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoUpdateEnabled}
              onChange={(e) => setAutoUpdateEnabled(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Auto-Refresh (25s)</span>
          </label>

          <button
            onClick={handleResetToOfficialData}
            title="Reset ke Data Standar Resmi Pasar Pakuan Jaya"
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
            <span>Reset Data Resmi</span>
          </button>
        </div>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL KOMODITAS PASAR</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-800 font-mono">{prices.length}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Lengkap</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TREN KOMODITAS UTAMA</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-black text-emerald-600 font-mono flex items-center gap-1">
              <TrendingUp className="h-4 w-4" /> Cabe & Maggot Naik
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PASAR ACUAN</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-bold text-slate-800 truncate">Pasar Induk TU Kemang</span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Bogor</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SELISIH HARGA PETANI</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-bold text-slate-700">Rata-rata ~15%</span>
            <span className="text-[10px] font-bold text-emerald-600">Margi Aman</span>
          </div>
        </div>
      </div>

      {/* Calculator Widget: Potensi Hasil Panen */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Kalkulator Potensi Omzet Hasil Panen</h3>
              <p className="text-xs text-slate-400">Simulasi pendataan nilai jual berdasarkan indeks Perumda Pasar Pakuan Jaya</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setUseFarmgate(true)}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                useFarmgate ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Harga Petani
            </button>
            <button
              onClick={() => setUseFarmgate(false)}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                !useFarmgate ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Grosir Pasar TU
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Pilih Komoditas Panen</label>
            <select
              value={calcSelectedId}
              onChange={(e) => setCalcSelectedId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              {prices.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.iconEmoji} {p.name} ({formatRupiah(useFarmgate ? p.priceFarmgate : p.priceTu)}/{p.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Jumlah Hasil Panen ({calcItem ? calcItem.unit : 'kg'})
            </label>
            <input
              type="number"
              min="1"
              value={calcQuantity}
              onChange={(e) => setCalcQuantity(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              placeholder="Masukkan jumlah..."
            />
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ESTIMASI OMZET BERSIH</span>
            <span className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
              {formatRupiah(netRevenue)}
            </span>
            {!useFarmgate && (
              <span className="text-[10px] text-slate-400 mt-1">
                *Sudah dikurangi estimasi ongkos armada ke Pasar TU Bogor (~8%)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="Cari komoditas (cabe, bawang, beras, maggot, ayam, telur...)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Cards Grid / Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/60">
                <th className="py-3.5 pl-4 rounded-l-xl">KOMODITAS PASAR</th>
                <th className="py-3.5">KATEGORI</th>
                <th className="py-3.5">HARGA PETANI (DESA)</th>
                <th className="py-3.5">HARGA PASAR TU BOGOR</th>
                <th className="py-3.5">PERUBAHAN</th>
                <th className="py-3.5">PASOKAN</th>
                <th className="py-3.5 pr-4 rounded-r-xl text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPrices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 font-medium">
                    Tidak ditemukan komoditas dengan kata kunci tersebut.
                  </td>
                </tr>
              ) : (
                filteredPrices.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 pl-4 font-bold text-slate-800 flex items-center gap-2.5">
                      <span className="text-xl">{item.iconEmoji}</span>
                      <div>
                        <div className="font-extrabold text-slate-800 text-sm">{item.name}</div>
                        <span className="text-[10px] text-slate-400 font-normal">Per {item.unit}</span>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-4 font-mono font-bold text-slate-800">
                      {formatRupiah(item.priceFarmgate)}
                    </td>

                    <td className="py-4 font-mono font-black text-emerald-700">
                      {formatRupiah(item.priceTu)}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-1">
                        {item.changeStatus === 'naik' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                            <TrendingUp className="h-3.5 w-3.5" />
                            +{formatRupiah(item.changeAmount)}
                          </span>
                        ) : item.changeStatus === 'turun' ? (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md text-[11px]">
                            <TrendingDown className="h-3.5 w-3.5" />
                            -{formatRupiah(item.changeAmount)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                            <Minus className="h-3.5 w-3.5 text-slate-400" />
                            Stabil
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.supplyStatus === 'Melimpah'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200/50'
                            : item.supplyStatus === 'Normal'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                        }`}
                      >
                        {item.supplyStatus}
                      </span>
                    </td>

                    <td className="py-4 pr-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenModalForEdit(item)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Harga"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id, item.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit Commodity */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                <Tag className="h-5 w-5 text-emerald-600" />
                {editingItem ? 'Edit Harga Komoditas' : 'Tambah Data Harga Komoditas'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFormModal} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Komoditas / Hasil Tani</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sawi Pahit, Jahe Merah"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="Sayuran">Sayuran</option>
                    <option value="Bumbu & Rempah">Bumbu & Rempah</option>
                    <option value="Pangan Utama">Pangan Utama</option>
                    <option value="Hasil SIKOMDIG">Hasil SIKOMDIG</option>
                    <option value="Buah">Buah</option>
                    <option value="Peternakan">Peternakan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Satuan</label>
                  <input
                    type="text"
                    required
                    placeholder="kg / ikat / tray / sisir"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Harga Petani Desa (Rp)</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={newPriceFarmgate}
                    onChange={(e) => setNewPriceFarmgate(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Harga Pasar TU Kemang (Rp)</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={newPriceTu}
                    onChange={(e) => setNewPriceTu(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Status Pasokan</label>
                  <select
                    value={newSupplyStatus}
                    onChange={(e) => setNewSupplyStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  >
                    <option value="Melimpah">Melimpah</option>
                    <option value="Normal">Normal</option>
                    <option value="Terbatas">Terbatas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Simbol / Emoji</label>
                  <input
                    type="text"
                    placeholder="🥬, 🌶️, 🥕, 🪱"
                    value={newEmoji}
                    onChange={(e) => setNewEmoji(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Komoditas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
