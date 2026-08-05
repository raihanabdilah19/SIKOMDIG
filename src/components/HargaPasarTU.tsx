import React, { useState } from 'react';
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
  Info
} from 'lucide-react';

export interface MarketPriceItem {
  id: string;
  name: string;
  category: 'Sayuran' | 'Bumbu & Rempah' | 'Pangan Utama' | 'Hasil SIKOMDIG' | 'Buah';
  priceTu: number; // Harga di Pasar Induk TU Bogor per Satuan
  priceFarmgate: number; // Harga di Tingkat Petani Desa Cibunian
  unit: string; // kg, Liter, Sisir
  changeStatus: 'naik' | 'turun' | 'stabil';
  changeAmount: number; // nominal perubahan (misal: +2000)
  lastUpdated: string;
  supplyStatus: 'Melimpah' | 'Normal' | 'Terbatas';
  iconEmoji: string;
}

const defaultMarketPrices: MarketPriceItem[] = [
  {
    id: 'PRC-001',
    name: 'Cabai Rawit Merah (Setan)',
    category: 'Bumbu & Rempah',
    priceTu: 45000,
    priceFarmgate: 40000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 3000,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Terbatas',
    iconEmoji: '🌶️'
  },
  {
    id: 'PRC-002',
    name: 'Cabai Merah Keriting',
    category: 'Bumbu & Rempah',
    priceTu: 38000,
    priceFarmgate: 33000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 2000,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Normal',
    iconEmoji: '🌶️'
  },
  {
    id: 'PRC-003',
    name: 'Bawang Merah Lokal',
    category: 'Bumbu & Rempah',
    priceTu: 28000,
    priceFarmgate: 24000,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Melimpah',
    iconEmoji: '🧅'
  },
  {
    id: 'PRC-004',
    name: 'Tomat Merah Super',
    category: 'Sayuran',
    priceTu: 12000,
    priceFarmgate: 9500,
    unit: 'kg',
    changeStatus: 'turun',
    changeAmount: 1500,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Melimpah',
    iconEmoji: '🍅'
  },
  {
    id: 'PRC-005',
    name: 'Terong Ungu Segar',
    category: 'Sayuran',
    priceTu: 8500,
    priceFarmgate: 6500,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Normal',
    iconEmoji: '🍆'
  },
  {
    id: 'PRC-006',
    name: 'Daun Bawang (Muncang)',
    category: 'Sayuran',
    priceTu: 14000,
    priceFarmgate: 11000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 1000,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Normal',
    iconEmoji: '🥬'
  },
  {
    id: 'PRC-007',
    name: 'Beras Medium Pandan Wangi',
    category: 'Pangan Utama',
    priceTu: 14000,
    priceFarmgate: 12500,
    unit: 'kg',
    changeStatus: 'stabil',
    changeAmount: 0,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Normal',
    iconEmoji: '🌾'
  },
  {
    id: 'PRC-008',
    name: 'Gabah Kering Giling (GKG)',
    category: 'Pangan Utama',
    priceTu: 7800,
    priceFarmgate: 7200,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 300,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Terbatas',
    iconEmoji: '🌾'
  },
  {
    id: 'PRC-009',
    name: 'Maggot BSF Kering High Protein',
    category: 'Hasil SIKOMDIG',
    priceTu: 48000,
    priceFarmgate: 42000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 2000,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Terbatas',
    iconEmoji: '🪱'
  },
  {
    id: 'PRC-010',
    name: 'Alpukat Miki Cibunian',
    category: 'Buah',
    priceTu: 26000,
    priceFarmgate: 22000,
    unit: 'kg',
    changeStatus: 'naik',
    changeAmount: 1500,
    lastUpdated: '05 Agustus 2026',
    supplyStatus: 'Normal',
    iconEmoji: '🥑'
  }
];

export default function HargaPasarTU() {
  const [prices, setPrices] = useState<MarketPriceItem[]>(() => {
    const saved = localStorage.getItem('sikomdig_market_prices');
    if (saved) {
      try {
        const parsed: MarketPriceItem[] = JSON.parse(saved);
        const filtered = parsed.filter(
          (item) =>
            !item.name.toLowerCase().includes('kompos organik super') &&
            !item.name.toLowerCase().includes('pupuk organik cair')
        );
        return filtered;
      } catch {
        return defaultMarketPrices;
      }
    }
    return defaultMarketPrices;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('05 Agustus 2026, 09:15 WIB');

  // Calculator State
  const [calcSelectedId, setCalcSelectedId] = useState<string>(prices[0]?.id || 'PRC-001');
  const [calcQuantity, setCalcQuantity] = useState<number>(50);
  const [useFarmgate, setUseFarmgate] = useState<boolean>(true);

  // Form add / edit item state
  const [isAddingModal, setIsAddingModal] = useState(false);
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
    localStorage.setItem('sikomdig_market_prices', JSON.stringify(updated));
  };

  const handleSyncPrices = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const updated = prices.map((item) => {
        // Minor realistic random fluctuation for simulation
        const isUp = Math.random() > 0.5;
        const delta = Math.floor(Math.random() * 3 + 1) * 500;
        const newPriceTu = Math.max(2000, item.priceTu + (isUp ? delta : -delta));
        const newPriceFarmgate = Math.max(1500, Math.round(newPriceTu * 0.85));

        return {
          ...item,
          priceTu: newPriceTu,
          priceFarmgate: newPriceFarmgate,
          changeStatus: isUp ? 'naik' : 'turun',
          changeAmount: delta,
          lastUpdated: 'Hari Ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
        } as MarketPriceItem;
      });

      const nowStr = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

      savePrices(updated);
      setLastSyncTime(nowStr);
      setIsSyncing(false);
    }, 800);
  };

  const categories = ['Semua', 'Sayuran', 'Bumbu & Rempah', 'Pangan Utama', 'Hasil SIKOMDIG', 'Buah'];

  const filteredPrices = prices.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate calculator details
  const calcItem = prices.find((p) => p.id === calcSelectedId) || prices[0];
  const unitPrice = useFarmgate ? calcItem.priceFarmgate : calcItem.priceTu;
  const grossRevenue = (calcQuantity || 0) * unitPrice;
  const estTransportCost = useFarmgate ? 0 : Math.round(grossRevenue * 0.08); // 8% transport cost to Pasar TU
  const netRevenue = grossRevenue - estTransportCost;

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newItem: MarketPriceItem = {
      id: `PRC-${Date.now().toString().slice(-4)}`,
      name: newName,
      category: newCategory,
      priceTu: newPriceTu,
      priceFarmgate: newPriceFarmgate,
      unit: newUnit,
      changeStatus: 'stabil',
      changeAmount: 0,
      lastUpdated: 'Hari Ini',
      supplyStatus: 'Normal',
      iconEmoji: newEmoji || '📦'
    };

    savePrices([newItem, ...prices]);
    setIsAddingModal(false);
    setNewName('');
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleShareWA = () => {
    let msg = `*📊 ACUAN HARGA HASIL TANI & PASAR TU BOGOR*\n`;
    msg += `_Update Desa Cibunian - ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}_\n\n`;
    
    filteredPrices.slice(0, 8).forEach((p) => {
      msg += `${p.iconEmoji} *${p.name}*\n`;
      msg += `   • Pasar TU: ${formatRupiah(p.priceTu)} / ${p.unit}\n`;
      msg += `   • Harga Petani: ${formatRupiah(p.priceFarmgate)} / ${p.unit}\n`;
      msg += `   • Status: ${p.changeStatus === 'naik' ? '📈 Naik' : p.changeStatus === 'turun' ? '📉 Turun' : '⚖️ Stabil'}\n\n`;
    });
    
    msg += `_Sumber Data: Informasi Pasar Induk TU Kemang Bogor & KWT Desa Cibunian_`;
    
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Store className="h-3.5 w-3.5" />
              <span>Pasar Induk Teknik Utama (TU) Kemang Bogor</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Daftar Harga Jual Hasil Tani
            </h1>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed font-normal">
              Acuan standar harga komoditas pertanian & hasil kebun tingkat Petani Desa Cibunian & Pasar Induk TU Bogor.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleSyncPrices}
              disabled={isSyncing}
              className="px-4 py-2.5 bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl border border-emerald-500/30 transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95 disabled:opacity-70"
            >
              <RefreshCw className={`h-4 w-4 text-emerald-300 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Memperbarui...' : 'Update Harga Terkini'}</span>
            </button>

            <button
              onClick={handleShareWA}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/30 cursor-pointer active:scale-95"
            >
              <Share2 className="h-4 w-4" />
              <span>Bagikan WA</span>
            </button>

            <button
              onClick={() => {
                setEditingItem(null);
                setNewName('');
                setNewPriceTu(10000);
                setNewPriceFarmgate(8500);
                setNewUnit('kg');
                setNewEmoji('🥦');
                setIsAddingModal(true);
              }}
              className="px-4 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-black/10 cursor-pointer active:scale-95"
            >
              <Plus className="h-4 w-4 text-emerald-700" />
              <span>Tambah Komoditas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL KOMODITAS</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-black text-slate-800 font-mono">{prices.length}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Terdaftar</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">STATUS UPDATE PASAR</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md truncate">
              🟢 Terupdate ({lastSyncTime.split(',')[0]})
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ACUAN LOKASI</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-bold text-slate-700 truncate">Pasar TU Kemang</span>
            <span className="text-[10px] font-semibold text-slate-400">Bogor</span>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">REKOMENDASI PANEN</span>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Cabai & Maggot BSF</span>
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
              <h3 className="text-base font-extrabold text-white">Kalkulator Estimasi Hasil Jual Panen</h3>
              <p className="text-xs text-slate-400">Hitung nilai omzet bersih hasil kebun berdasarkan harga terkini</p>
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
              Jumlah Panen ({calcItem.unit})
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
                *Sudah dikurangi estimasi transport ke Pasar TU Bogor (~8%)
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
              placeholder="Cari komoditas (cabai, beras, kompos, maggot...)..."
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
                <th className="py-3.5 pl-4 rounded-l-xl">KOMODITAS</th>
                <th className="py-3.5">KATEGORI</th>
                <th className="py-3.5">HARGA PETANI (DESA)</th>
                <th className="py-3.5">HARGA PASAR TU BOGOR</th>
                <th className="py-3.5">PERUBAHAN</th>
                <th className="py-3.5 pr-4 rounded-r-xl text-right">PASOKAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPrices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-medium">
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

                    <td className="py-4 pr-4 text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.supplyStatus === 'Melimpah'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200/50'
                          : item.supplyStatus === 'Normal'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                          : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                      }`}>
                        {item.supplyStatus}
                      </span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add New Commodity */}
      {isAddingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                <Tag className="h-5 w-5 text-emerald-600" />
                Tambah Data Harga Komoditas
              </h3>
              <button
                onClick={() => setIsAddingModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewItem} className="space-y-3">
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
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Satuan</label>
                  <input
                    type="text"
                    required
                    placeholder="kg / Liter"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Harga Petani (Rp)</label>
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
                  <label className="block text-xs font-bold text-slate-600 mb-1">Harga Pasar TU (Rp)</label>
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

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Simbol / Emoji</label>
                <input
                  type="text"
                  placeholder="🥬, 🌶️, 🥕, 🪱, 🌱"
                  value={newEmoji}
                  onChange={(e) => setNewEmoji(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20"
                >
                  Simpan Komoditas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
