import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Import custom generated high-quality assets
import cairFile0 from '../assets/images/cair_file_0_1783786530155.jpg';
import cairFile1 from '../assets/images/cair_file_1_1783786550803.jpg';
import cairFile2 from '../assets/images/cair_file_2_1783786567869.jpg';
import cairFile3 from '../assets/images/cair_file_3_1783786583074.jpg';
import cairFile4 from '../assets/images/cair_file_4_1783786596924.jpg';
import {
  Droplet,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Info,
  Beaker,
  Sprout,
  CheckCircle,
  HelpCircle,
  Leaf,
  Shield,
  Heart,
  Smile,
  Check
} from 'lucide-react';

export default function CairModule() {
  // Store open state for each of the 5 main sections
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true, // First section open by default
  });

  // Track the active theme dynamically
  const [theme, setTheme] = useState<'light' | 'dark' | 'nature'>(() => {
    try {
      const saved = localStorage.getItem('settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.selectedTheme || 'dark';
      }
    } catch (e) {}
    return 'dark';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('settings');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.selectedTheme) {
            setTheme(parsed.selectedTheme);
          }
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const toggleSection = (id: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Theme-based style utility functions
  const getAccordionContainerClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#131318] border border-white/5 text-gray-100 shadow-xl';
      case 'nature':
        return 'bg-white border border-green-100 text-slate-800 shadow-md';
      default:
        return 'bg-white border border-slate-200 text-slate-800 shadow-md';
    }
  };

  const getHeaderHoverClass = () => {
    switch (theme) {
      case 'dark':
        return 'hover:bg-white/5 text-sky-400';
      case 'nature':
        return 'hover:bg-green-50/50 text-green-700';
      default:
        return 'hover:bg-slate-50 text-[#1e7d4f]';
    }
  };

  const getContentBgClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#0F0F12] border-t border-white/5';
      case 'nature':
        return 'bg-[#fcfdfe] border-t border-green-50/60';
      default:
        return 'bg-[#fafafa] border-t border-slate-100';
    }
  };

  const getParagraphClass = () => {
    switch (theme) {
      case 'dark':
        return 'text-zinc-300 leading-relaxed text-xs md:text-sm font-medium';
      case 'nature':
        return 'text-slate-700 leading-relaxed text-xs md:text-sm font-medium';
      default:
        return 'text-slate-700 leading-relaxed text-xs md:text-sm font-medium';
    }
  };

  const getHeadingClass = () => {
    switch (theme) {
      case 'dark':
        return 'text-white font-black text-sm md:text-base tracking-tight';
      case 'nature':
        return 'text-green-950 font-black text-sm md:text-base tracking-tight';
      default:
        return 'text-slate-950 font-black text-sm md:text-base tracking-tight';
    }
  };

  const getHighlightBoxClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-sky-950/40 border border-sky-400/30 text-sky-200 p-4 rounded-2xl';
      case 'nature':
        return 'bg-green-50 border border-green-200 text-green-950 p-4 rounded-2xl';
      default:
        return 'bg-[#e8fff3] border border-emerald-200 text-emerald-950 p-4 rounded-2xl';
    }
  };

  const getStepBoxClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#181825] border-l-6 border-sky-400 p-5 rounded-r-2xl space-y-3';
      case 'nature':
        return 'bg-[#dfebd6] border-l-6 border-[#2ecc71] p-5 rounded-r-2xl space-y-3';
      default:
        return 'bg-emerald-50/60 border-l-6 border-emerald-600 p-5 rounded-r-2xl space-y-3';
    }
  };

  const getStepTitleClass = () => {
    switch (theme) {
      case 'dark':
        return 'font-black text-sky-200 text-xs md:text-sm uppercase tracking-wide';
      case 'nature':
        return 'font-black text-green-950 text-xs md:text-sm uppercase tracking-wide';
      default:
        return 'font-black text-emerald-950 text-xs md:text-sm uppercase tracking-wide';
    }
  };

  const getStepTextClass = () => {
    switch (theme) {
      case 'dark':
        return 'text-zinc-300 text-xs md:text-sm leading-relaxed font-medium';
      case 'nature':
        return 'text-slate-700 text-xs md:text-sm leading-relaxed font-medium';
      default:
        return 'text-slate-700 text-xs md:text-sm leading-relaxed font-medium';
    }
  };

  // State for interactive checklists
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toolsAndIngredients = [
    { type: 'Bahan Utama', name: 'Limbah Sayur & Kulit Buah Basah (Cacah Lembut)', qty: '2-3 kg' },
    { type: 'Aktivator', name: 'EM4 (Effective Microorganisms) Pertanian', qty: '2 Tutup Botol' },
    { type: 'Pakan Bakteri', name: 'Gula Merah / Molase cair (Dilarutkan)', qty: '150 gram' },
    { type: 'Pelarut', name: 'Air Cucian Beras (Air Leri)', qty: '5-7 Liter' },
    { type: 'Wadah', name: 'Ember Plastik Tertutup / Tong Ber-kran khusus', qty: '1 Unit' },
    { type: 'Sirkulator Udara', name: 'Selang Transparan & Botol Plastik Kecil (Aerasi)', qty: '1 Set' }
  ];

  const sections = [
    {
      id: 0,
      emoji: '🌱',
      title: '1. Pengertian Pupuk Cair',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Pupuk cair organik adalah salah satu bentuk pupuk hasil olahan bahan-bahan organik yang telah melalui proses
            fermentasi sehingga berubah menjadi larutan kaya nutrisi yang dapat langsung dimanfaatkan oleh tanaman.
            Bahan dasar pembuatan pupuk cair umumnya berasal dari limbah organik rumah tangga seperti sisa sayuran,
            kulit buah, daun hijau, air cucian beras, serta bahan alami lainnya yang mudah terurai di lingkungan.
          </p>

          <div className={getHighlightBoxClass()}>
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong className="block text-sm mb-1">Inti Pupuk Cair:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-90">
                  Pupuk cair = limbah organik + mikroorganisme + proses fermentasi → menjadi nutrisi tanaman
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Proses perubahan bahan organik menjadi pupuk cair tidak terjadi secara instan, melainkan melalui proses biologis
            yang disebut fermentasi. Dalam proses ini, mikroorganisme seperti bakteri baik, jamur, dan aktivator EM4 bekerja
            memecah senyawa kompleks menjadi bentuk yang lebih sederhana sehingga dapat diserap oleh tanaman.
          </p>

          <p className={getParagraphClass()}>
            Keunggulan utama pupuk cair dibandingkan pupuk padat terletak pada bentuknya yang sudah berupa larutan. Hal ini
            membuat unsur hara di dalamnya lebih cepat masuk ke jaringan tanaman melalui akar maupun daun. Dengan demikian,
            respon pertumbuhan tanaman terhadap pupuk cair biasanya lebih cepat terlihat dibandingkan pupuk organik padat.
          </p>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src={cairFile0} 
              alt="Dekomposisi Bahan Organik" 
              className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 1: Pengertian Pupuk Cair - Media informasi sisa organik difermentasi menjadi cairan bernutrisi
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-4 rounded-2xl">
            <div className="flex gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <strong className="block text-sm mb-1">Catatan Penting:</strong>
                <p className="text-xs font-semibold">
                  Pupuk cair tidak boleh digunakan langsung tanpa pengenceran karena konsentrasi nutrisi yang tinggi dapat merusak
                  jaringan tanaman jika digunakan secara berlebihan.
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Dalam ilmu pertanian, pupuk cair termasuk ke dalam kategori pupuk organik cair (POC) yang memiliki kandungan unsur
            hara makro seperti nitrogen (N), fosfor (P), dan kalium (K), serta unsur mikro seperti magnesium, kalsium, dan
            zat besi. Unsur-unsur ini sangat penting dalam mendukung proses fotosintesis, pembentukan akar, serta pertumbuhan
            batang dan daun tanaman.
          </p>

          <p className={getParagraphClass()}>
            Selain unsur hara, pupuk cair juga mengandung mikroorganisme aktif yang berfungsi meningkatkan kesuburan tanah.
            Mikroorganisme ini membantu memperbaiki struktur tanah, meningkatkan kemampuan tanah dalam menyimpan air, serta
            meningkatkan aktivitas biologis tanah sehingga tanah menjadi lebih “hidup”.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 p-5 rounded-2xl space-y-2">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm flex items-center gap-2">
                <Sprout className="h-4 w-4" /> 🌱 Fungsi Utama
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-medium list-disc list-inside">
                <li>Mempercepat pertumbuhan tanaman</li>
                <li>Meningkatkan hasil panen</li>
                <li>Menambah kesuburan tanah</li>
              </ul>
            </div>

            <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 p-5 rounded-2xl space-y-2">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2">
                <Leaf className="h-4 w-4" /> 🌍 Dampak Lingkungan
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-medium list-disc list-inside">
                <li>Mengurangi limbah organik</li>
                <li>Mengurangi pencemaran</li>
                <li>Mendukung pertanian berkelanjutan</li>
              </ul>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Dari perspektif lingkungan, pupuk cair merupakan salah satu inovasi sederhana yang memiliki dampak besar.
            Dengan memanfaatkan limbah rumah tangga yang biasanya dibuang begitu saja, masyarakat dapat mengubahnya menjadi
            produk bernilai guna tinggi yang mendukung pertanian ramah lingkungan.
          </p>

          <p className={getParagraphClass()}>
            Hal ini sejalan dengan konsep ekonomi sirkular, yaitu sistem pengelolaan sumber daya yang tidak membuang limbah
            begitu saja, tetapi mengolahnya kembali menjadi produk baru yang bermanfaat. Dalam konteks desa, pupuk cair dapat
            menjadi solusi mandiri untuk mengurangi ketergantungan terhadap pupuk kimia yang mahal dan berpotensi merusak tanah.
          </p>

          <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-4 rounded-2xl">
            <div className="flex gap-3">
              <span className="text-xl">🌿</span>
              <div>
                <strong className="block text-sm mb-1">Kesimpulan Ilmiah:</strong>
                <p className="text-xs font-semibold leading-relaxed">
                  Pupuk cair adalah hasil transformasi biologis bahan organik menjadi larutan nutrisi yang cepat diserap tanaman,
                  ramah lingkungan, dan mendukung pertanian berkelanjutan.
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Dengan demikian, pupuk cair tidak hanya sekadar hasil olahan sampah organik, tetapi juga merupakan teknologi
            sederhana berbasis alam yang mampu meningkatkan produktivitas pertanian sekaligus menjaga keseimbangan ekosistem
            lingkungan secara berkelanjutan.
          </p>
        </div>
      )
    },
    {
      id: 1,
      emoji: '🌿',
      title: '2. Manfaat Pupuk Cair',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Pupuk cair organik memiliki peran yang sangat penting dalam dunia pertanian modern maupun pertanian berkelanjutan.
            Keunggulannya terletak pada bentuknya yang berupa larutan sehingga nutrisi di dalamnya dapat langsung diserap oleh
            tanaman melalui akar maupun daun. Hal ini membuat pupuk cair menjadi salah satu solusi paling efektif untuk
            meningkatkan produktivitas pertanian tanpa merusak lingkungan.
          </p>

          <div className={getHighlightBoxClass()}>
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong className="block text-sm mb-1">Inti Manfaat Pupuk Cair:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-90">
                  Pupuk cair = nutrisi cepat serap + pertumbuhan cepat + tanah tetap sehat + lingkungan tetap terjaga
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Berbeda dengan pupuk kimia yang sering memberikan efek cepat namun merusak tanah dalam jangka panjang,
            pupuk cair organik justru memperbaiki kualitas tanah secara perlahan namun berkelanjutan. Kandungan
            mikroorganisme di dalamnya membantu menghidupkan kembali ekosistem tanah yang sehat.
          </p>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src={cairFile1} 
              alt="Tanaman Subur & Sehat" 
              className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 2: Manfaat Pupuk Cair - Tanaman tumbuh subur, berdaun lebat, dan tanah terjaga kesehatannya
            </div>
          </div>

          {/* Grid Manfaat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-blue-50/40 dark:bg-blue-950/10 border border-blue-200/30 dark:border-blue-900/20 rounded-2xl space-y-2">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 text-xs md:text-sm flex items-center gap-2">
                <span>⚡</span> 1. Pertumbuhan Lebih Cepat
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Pupuk cair langsung diserap oleh tanaman melalui akar dan daun. Proses ini membuat tanaman lebih cepat
                tumbuh, terutama pada fase awal pertumbuhan. Daun menjadi lebih hijau, batang lebih kuat, dan akar
                lebih cepat berkembang.
              </p>
            </div>

            <div className="p-5 bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-200/30 dark:border-emerald-900/20 rounded-2xl space-y-2">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-xs md:text-sm flex items-center gap-2">
                <span>🌾</span> 2. Meningkatkan Hasil Panen
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Tanaman yang mendapatkan nutrisi cukup dari pupuk cair akan menghasilkan buah dan sayuran yang lebih
                besar, lebih segar, dan lebih berkualitas. Produktivitas lahan pertanian pun meningkat secara signifikan.
              </p>
            </div>

            <div className="p-5 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200/30 dark:border-amber-900/20 rounded-2xl space-y-2">
              <h4 className="font-bold text-amber-950 dark:text-amber-300 text-xs md:text-sm flex items-center gap-2">
                <span>🛡️</span> 3. Meningkatkan Daya Tahan Tanaman
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Kandungan nutrisi alami dan mikroorganisme baik membantu memperkuat sistem imun tanaman sehingga lebih
                tahan terhadap serangan hama, jamur, dan penyakit tanaman.
              </p>
            </div>

            <div className="p-5 bg-purple-50/40 dark:bg-purple-950/10 border border-purple-200/30 dark:border-purple-900/20 rounded-2xl space-y-2">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 text-xs md:text-sm flex items-center gap-2">
                <span>🌍</span> 4. Ramah Lingkungan
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Tidak mengandung bahan kimia berbahaya sehingga aman untuk tanah, air, hewan, dan manusia. Penggunaan
                pupuk cair membantu mengurangi pencemaran lingkungan dari limbah organik rumah tangga.
              </p>
            </div>
          </div>

          {/* Core Advantages section containing requested highlights */}
          <div className="bg-sky-500/5 border border-sky-500/10 rounded-2xl p-6 space-y-4">
            <h4 className="font-black text-slate-900 dark:text-sky-200 text-xs md:text-sm flex items-center gap-2 uppercase tracking-wide">
              <Sparkles className="h-4 w-4 text-sky-500" /> Keunggulan Utama POC
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-[#1c1c24] border border-slate-100 dark:border-white/5 rounded-xl">
                <span className="font-bold text-xs text-sky-600 dark:text-sky-400 block mb-1">⚡ Penyerapan Instan</span>
                <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Diserap langsung oleh klorofil stomata daun dan rambut akar tanaman sawah tanpa hambatan.
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-[#1c1c24] border border-slate-100 dark:border-white/5 rounded-xl">
                <span className="font-bold text-xs text-sky-600 dark:text-sky-400 block mb-1">🦠 Mikroba Penyubur</span>
                <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Mengandung miliaran koloni lactobacillus penyerap nitrogen dan pelarut fosfat alami.
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-[#1c1c24] border border-slate-100 dark:border-white/5 rounded-xl">
                <span className="font-bold text-xs text-sky-600 dark:text-sky-400 block mb-1">💰 Praktis & Murah</span>
                <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Memanfaatkan limbah basah sayur-mayur dan buah busuk dapur dengan biaya pembuatan sangat murah.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f1f8e9] dark:bg-emerald-950/20 p-5 rounded-2xl border-l-6 border-[#7cb342] space-y-1">
            <h4 className="font-bold text-[#7cb342] text-xs md:text-sm">🌿 Dampak Ekologis Positif</h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Pupuk cair tidak hanya bermanfaat untuk tanaman, tetapi juga berperan besar dalam menjaga keseimbangan
              ekosistem. Dengan memanfaatkan limbah organik menjadi pupuk cair, kita membantu mengurangi jumlah sampah
              yang berakhir di tempat pembuangan akhir (TPA).
            </p>
          </div>

          <p className={getParagraphClass()}>
            Selain itu, penggunaan pupuk cair secara rutin juga membantu meningkatkan aktivitas mikroorganisme tanah.
            Tanah yang kaya mikroorganisme akan lebih subur, gembur, dan mampu menyimpan air lebih lama, sehingga
            sangat baik untuk pertanian jangka panjang.
          </p>

          {/* Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-200/30 dark:border-red-900/20 p-5 rounded-2xl space-y-2">
              <h5 className="font-bold text-red-700 dark:text-red-400 text-xs md:text-sm">❌ Pupuk Kimia</h5>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
                <li>• Cepat memberi hasil instan</li>
                <li>• Bisa mengeraskan & merusak struktur tanah</li>
                <li>• Mengurangi kesuburan biologis jangka panjang</li>
                <li>• Berisiko mencemari air & lingkungan sekitar</li>
              </ul>
            </div>
            <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200/30 dark:border-emerald-900/20 p-5 rounded-2xl space-y-2">
              <h5 className="font-bold text-emerald-700 dark:text-emerald-400 text-xs md:text-sm">✅ Pupuk Cair Organik</h5>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
                <li>• Hasil panen alami, sehat, berkelanjutan</li>
                <li>• Menjaga & memperbaiki kesuburan tanah</li>
                <li>• Sangat aman bagi lingkungan dan kesehatan</li>
                <li>• Mendukung kehidupan mikroba tanah yang baik</li>
              </ul>
            </div>
          </div>

          <div className="bg-cyan-50/50 dark:bg-cyan-950/20 p-5 rounded-2xl border-l-6 border-cyan-600/70 space-y-1">
            <h4 className="font-bold text-cyan-800 dark:text-cyan-400 text-xs md:text-sm">🌱 Fakta Penting</h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Semakin sering kita menggunakan pupuk cair organik, semakin sehat tanah yang kita kelola.
              Tanah yang sehat akan menghasilkan tanaman yang lebih kuat, lebih produktif, dan lebih tahan terhadap perubahan iklim.
            </p>
          </div>

          <p className={getParagraphClass()}>
            Dalam praktik pertanian desa, pupuk cair sangat membantu petani dalam mengurangi biaya produksi.
            Karena bahan pembuatannya berasal dari limbah rumah tangga, petani tidak perlu mengeluarkan biaya besar
            untuk membeli pupuk kimia.
          </p>

          <p className={getParagraphClass()}>
            Hal ini sejalan dengan konsep pertanian berkelanjutan (sustainable agriculture), yaitu sistem pertanian
            yang tidak hanya mengejar hasil panen tinggi, tetapi juga menjaga keseimbangan lingkungan untuk generasi mendatang.
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-800 dark:text-yellow-400 p-4 rounded-2xl">
            <div className="flex gap-3">
              <span className="text-xl">📌</span>
              <div>
                <strong className="block text-sm mb-1">Kesimpulan Manfaat:</strong>
                <p className="text-xs font-semibold leading-relaxed">
                  Pupuk cair adalah solusi lengkap untuk pertanian modern: mempercepat pertumbuhan tanaman, meningkatkan hasil panen,
                  menjaga kesehatan tanah, serta melindungi lingkungan dari pencemaran.
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Dengan memahami manfaat ini, kita dapat melihat bahwa pupuk cair bukan hanya sekadar pupuk biasa, tetapi
            merupakan inovasi sederhana berbasis alam yang sangat penting untuk masa depan pertanian yang lebih hijau
            dan berkelanjutan.
          </p>
        </div>
      )
    },
    {
      id: 2,
      emoji: '⚙️',
      title: '3. Proses Pembuatan Pupuk Cair',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Proses pembuatan pupuk cair organik merupakan tahapan penting yang mengubah limbah organik
            menjadi cairan bernutrisi tinggi melalui proses alami yang disebut fermentasi. Proses ini
            melibatkan mikroorganisme baik seperti bakteri, jamur, dan aktivator EM4 yang bekerja
            memecah bahan organik menjadi unsur hara yang mudah diserap oleh tanaman.
          </p>

          <div className={getHighlightBoxClass()}>
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong className="block text-sm mb-1">Konsep Dasar Proses:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-90">
                  Limbah organik + Mikroorganisme + Waktu → Pupuk Cair Berkualitas
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Jika dilakukan dengan benar, proses ini tidak hanya menghasilkan pupuk cair yang kaya nutrisi,
            tetapi juga membantu mengurangi limbah rumah tangga serta mendukung pertanian yang ramah lingkungan
            dan berkelanjutan.
          </p>

          {/* Interactive Checklist of Ingredients requested */}
          <div className="bg-slate-50 dark:bg-[#181820] border border-slate-100 dark:border-white/5 rounded-2xl p-5 space-y-3">
            <div>
              <h4 className="font-extrabold text-xs md:text-sm text-slate-800 dark:text-slate-200">
                🛠️ Alat & Bahan POC (Bisa Dicentang)
              </h4>
              <p className="text-[10px] text-slate-400">Siapkan seluruh bahan berikut sebelum memulai proses</p>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {toolsAndIngredients.map((item, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className="w-full py-2.5 flex items-center justify-between text-left text-xs font-medium hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition-all ${
                        isChecked ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 dark:border-slate-700 bg-transparent'
                      }`}>
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <span className={`block transition-all ${isChecked ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          {item.name}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                          {item.type}
                        </span>
                      </div>
                    </div>
                    <span className="text-sky-600 dark:text-sky-400 font-bold bg-sky-50 dark:bg-sky-950/40 border border-sky-100/50 dark:border-sky-900/30 px-2 py-0.5 rounded-lg shrink-0">
                      {item.qty}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src={cairFile2} 
              alt="Alat & Bahan POC" 
              className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 3: Alat & Bahan POC - Sisa sayur, EM4, gula merah, air cucian beras, dan wadah fermentasi
            </div>
          </div>

          {/* Simple Process Flow chart */}
          <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-5 space-y-3">
            <h4 className="font-extrabold text-xs md:text-sm text-slate-800 dark:text-slate-200">
              🌿 ALUR PROSES PEMBUATAN (FLOW SEDERHANA)
            </h4>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-xs text-slate-700 dark:text-slate-300 font-semibold">
              <span className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">1. Kumpulkan Sampah</span>
              <span className="text-slate-400">➔</span>
              <span className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">2. Cacah Lembut</span>
              <span className="text-slate-400">➔</span>
              <span className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">3. Campur EM4+Gula</span>
              <span className="text-slate-400">➔</span>
              <span className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">4. Fermentasi 14 Hari</span>
              <span className="text-slate-400">➔</span>
              <span className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">5. Saring Cairan</span>
            </div>
          </div>

          {/* Steps list */}
          <div className="space-y-4">
            <div className={getStepBoxClass()}>
              <span className={getStepTitleClass()}>🥬 1. Kumpulkan Bahan Organik</span>
              <p className={getStepTextClass()}>
                Tahap pertama adalah mengumpulkan bahan organik yang mudah terurai seperti sisa sayuran,
                kulit buah, daun hijau, serta air cucian beras. Bahan-bahan ini merupakan sumber nutrisi
                alami yang akan menjadi dasar pembentukan pupuk cair.
                <br /><br />
                Semakin beragam bahan yang digunakan, semakin kaya kandungan nutrisi pupuk yang dihasilkan.
                Hindari bahan anorganik seperti plastik, kaca, atau logam karena tidak dapat terurai.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <span className={getStepTitleClass()}>🔪 2. Cacah dan Hancurkan Bahan</span>
              <p className={getStepTextClass()}>
                Bahan organik yang sudah terkumpul perlu dicacah menjadi bagian kecil agar proses penguraian
                lebih cepat. Ukuran kecil memperluas permukaan bahan sehingga mikroorganisme dapat bekerja
                lebih efektif.
                <br /><br />
                Tahap ini sangat penting karena semakin kecil bahan, semakin cepat proses fermentasi berlangsung.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <span className={getStepTitleClass()}>🍯 3. Proses Fermentasi Aktif</span>
              <p className={getStepTextClass()}>
                Campurkan bahan yang sudah dicacah dengan gula merah dan EM4 (mikroorganisme aktif).
                Gula berfungsi sebagai sumber energi bagi bakteri baik untuk berkembang.
                <br /><br />
                Setelah dicampur, simpan dalam wadah tertutup selama 7–14 hari. Selama proses ini,
                terjadi perubahan biologis yang menghasilkan cairan kaya nutrisi.
                <br /><br />
                💡 Biasanya akan muncul aroma fermentasi khas yang menandakan proses berjalan dengan baik.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <span className={getStepTitleClass()}>🧪 4. Penyaringan Hasil Fermentasi</span>
              <p className={getStepTextClass()}>
                Setelah masa fermentasi selesai, campuran akan dipisahkan antara cairan dan ampasnya.
                Cairan inilah yang menjadi pupuk cair organik.
                <br /><br />
                Ampas yang tersisa masih bisa dimanfaatkan sebagai kompos padat sehingga tidak ada
                limbah yang terbuang percuma.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <span className={getStepTitleClass()}>💧 5. Siap Digunakan untuk Tanaman</span>
              <p className={getStepTextClass()}>
                Pupuk cair yang sudah jadi tidak boleh langsung digunakan dalam bentuk pekat.
                Harus diencerkan terlebih dahulu dengan air agar tidak merusak tanaman.
                <br /><br />
                Perbandingan umum adalah 1:10 (1 liter pupuk cair dicampur 10 liter air),
                kemudian bisa disemprotkan ke daun atau disiram ke tanah.
              </p>
            </div>
          </div>

          {/* Core anaerob warning requested to keep */}
          <div className="bg-red-500/10 border-2 border-red-500/30 text-red-700 dark:text-red-400 p-6 rounded-2xl space-y-2">
            <h4 className="font-extrabold text-xs md:text-sm flex items-center gap-2">
              <Info className="h-5 w-5 text-red-600 dark:text-red-400" />
              ⚠️ PERINGATAN FERMENTASI ANAEROB
            </h4>
            <p className="text-xs leading-relaxed font-semibold">
              Jangan membuka tutup ember dalam 7 hari pertama. Oksigen luar yang masuk akan merusak kinerja bakteri anaerob EM4, memicu pembusukan yang gagal (ditandai bau bangkai yang busuk menyengat dan tumbuhnya belatung sampah biasa, bukan maggot).
            </p>
          </div>

          {/* Tips box */}
          <div className="bg-[#fff3e0] dark:bg-amber-950/20 border border-amber-500/20 text-amber-900 dark:text-amber-300 p-4 rounded-2xl">
            <h4 className="font-bold text-sm mb-2">⚠️ Tips Penting:</h4>
            <ul className="text-xs font-semibold space-y-1">
              <li>• Jangan membuka wadah fermentasi terlalu sering</li>
              <li>• Simpan di tempat teduh dan tidak terkena matahari langsung</li>
              <li>• Gunakan wadah tertutup agar proses anaerob berjalan optimal</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="bg-blue-50/50 dark:bg-blue-950/10 p-5 border border-blue-200/20 dark:border-blue-900/10 rounded-2xl space-y-1">
              <h5 className="font-bold text-blue-950 dark:text-blue-300 text-xs">🌱 Hasil Akhir</h5>
              <ul className="text-xs text-slate-700 dark:text-slate-300 font-semibold space-y-1">
                <li>• Pupuk cair kaya nutrisi</li>
                <li>• Mudah diserap tanaman</li>
                <li>• Aman untuk lingkungan</li>
              </ul>
            </div>
            <div className="bg-green-50/50 dark:bg-green-950/10 p-5 border border-green-200/20 dark:border-green-900/10 rounded-2xl space-y-1">
              <h5 className="font-bold text-green-950 dark:text-green-300 text-xs">♻️ Dampak Lingkungan</h5>
              <ul className="text-xs text-slate-700 dark:text-slate-300 font-semibold space-y-1">
                <li>• Mengurangi sampah organik</li>
                <li>• Mengurangi bau sampah dapur</li>
                <li>• Mendukung iklim desa hijau</li>
              </ul>
            </div>
          </div>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src={cairFile3} 
              alt="Proses Pembuatan Pupuk Cair" 
              className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 4: Proses Pembuatan - Wadah tertutup rapat dengan selang aerasi agar fermentasi anaerob berlangsung optimal
            </div>
          </div>

          <div className="bg-[#e0f7fa] dark:bg-cyan-950/20 border-l-6 border-[#00acc1] p-5 rounded-r-2xl">
            <span className="font-bold text-cyan-800 dark:text-cyan-400 text-xs md:text-sm block mb-1">🌿 Kesimpulan Proses</span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Proses pembuatan pupuk cair adalah contoh sederhana bagaimana limbah dapat diubah menjadi sesuatu yang bernilai tinggi.
              Dengan sedikit usaha, kita dapat menghasilkan pupuk alami yang bermanfaat bagi tanaman sekaligus menjaga lingkungan tetap bersih.
            </p>
          </div>

          <p className={getParagraphClass()}>
            Dengan memahami proses ini, kita tidak hanya belajar membuat pupuk cair, tetapi juga belajar
            tentang siklus alam di mana tidak ada yang benar-benar terbuang—semua bisa dimanfaatkan kembali.
          </p>
        </div>
      )
    },
    {
      id: 3,
      emoji: '💧',
      title: '4. Cara Penggunaan Pupuk Cair',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Pupuk cair itu ibarat “minuman sehat untuk tanaman” 🍹🌱. Tapi jangan sampai salah pakai ya!
            Kalau terlalu pekat, tanaman bisa “kaget seperti minum kopi 10 gelas sekaligus” 😆☕
          </p>

          <div className={getHighlightBoxClass()}>
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong className="block text-sm mb-1">Aturan Emas:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-90">
                  Pupuk cair WAJIB diencerkan dulu sebelum digunakan supaya tanaman tetap happy 🌱😄
                </p>
              </div>
            </div>
          </div>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src={cairFile4} 
              alt="Cara penggunaan pupuk cair" 
              className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 5: Cara Penggunaan - Pengenceran larutan POC dengan air bersih perbandingan 1:10 sebelum diaplikasikan
            </div>
          </div>

          {/* Simple usage flow chart */}
          <div className="bg-[#f1f8e9] dark:bg-emerald-950/10 border border-green-200/20 dark:border-green-900/10 p-5 rounded-2xl space-y-3">
            <h4 className="font-extrabold text-xs md:text-sm text-slate-800 dark:text-slate-200">
              🌱 ALUR PENGGUNAAN (SUPER SIMPLE)
            </h4>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] md:text-xs text-slate-700 dark:text-slate-300 font-semibold">
              <span className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">1. Ambil 1 L POC 💧</span>
              <span className="text-slate-400">➔</span>
              <span className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">2. Campur 10 L Air 🚰</span>
              <span className="text-slate-400">➔</span>
              <span className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">3. Aduk Rata 😄</span>
              <span className="text-slate-400">➔</span>
              <span className="bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl">4. Semprot/Siram Tanaman 🌿</span>
            </div>
          </div>

          {/* Grid methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50/50 dark:bg-blue-950/10 p-5 border border-blue-200/20 dark:border-blue-900/10 rounded-2xl space-y-1">
              <h5 className="font-bold text-blue-950 dark:text-blue-300 text-xs md:text-sm flex items-center gap-1.5">
                <span>🌿</span> Cara 1: Semprot Daun
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Semprotkan ke bagian daun agar nutrisi langsung diserap.
                Cocok untuk “boost cepat” biar daun hijau glowing ✨🍃
              </p>
            </div>
            <div className="bg-green-50/50 dark:bg-green-950/10 p-5 border border-green-200/20 dark:border-green-900/10 rounded-2xl space-y-1">
              <h5 className="font-bold text-green-950 dark:text-green-300 text-xs md:text-sm flex items-center gap-1.5">
                <span>💧</span> Cara 2: Siram ke Tanah
              </h5>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Siram ke akar supaya tanaman punya “stok makanan jangka panjang” 🍽️🌱
              </p>
            </div>
          </div>

          {/* Dosage table requested */}
          <div className="bg-white dark:bg-[#15151b] border border-slate-100 dark:border-white/5 p-5 rounded-2xl space-y-3 shadow-xs">
            <div>
              <h4 className="font-extrabold text-xs md:text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Beaker className="h-4.5 w-4.5 text-sky-500" /> Panduan Cara Penggunaan & Dosis POC
              </h4>
              <p className="text-[10px] text-slate-400">Panduan pengenceran cairan konsentrat agar efektif dan aman</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl space-y-1.5 border border-slate-100 dark:border-white/5">
                <span className="text-[9px] font-bold uppercase tracking-widest bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900 px-2 py-0.5 rounded-full block w-fit">
                  Semprot Daun
                </span>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">Tanaman Padi & Jagung</h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-300 leading-relaxed font-medium">
                  Rasio 1:100 (100 ml POC + 10L air). Semprot merata pada umur 15, 30, dan 45 hari di pagi hari.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl space-y-1.5 border border-slate-100 dark:border-white/5">
                <span className="text-[9px] font-bold uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 px-2 py-0.5 rounded-full block w-fit">
                  Kocor Tanah
                </span>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">Hortikultura / Sayur</h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-300 leading-relaxed font-medium">
                  Rasio 1:50 (200 ml POC + 10L air). Siram area perakaran 250 ml per lubang seminggu sekali.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl space-y-1.5 border border-slate-100 dark:border-white/5">
                <span className="text-[9px] font-bold uppercase tracking-widest bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900 px-2 py-0.5 rounded-full block w-fit">
                  Kocor Batang
                </span>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">Buah Perkebunan</h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-300 leading-relaxed font-medium">
                  Rasio 1:20 (500 ml POC + 10L air). Siram merata sekeliling tajuk daun 2 minggu sekali.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 p-4 rounded-2xl">
            <h4 className="font-bold text-xs md:text-sm mb-2 flex items-center gap-1.5">
              <Smile className="h-4.5 w-4.5 text-amber-500" /> 😂 Tips Lucu Tapi Penting:
            </h4>
            <ul className="text-xs font-semibold space-y-1">
              <li>• Jangan disiram siang bolong ☀️ → tanaman bisa “kepanasan vibes” 🔥😆</li>
              <li>• Jangan kebanyakan → tanaman bisa “kekenyangan” 🤰🌱</li>
              <li>• Jangan jarang → tanaman bisa “kurus kayak diet ekstrem” 😭</li>
            </ul>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-900 dark:text-cyan-300 p-4 rounded-2xl">
            <h4 className="font-bold text-xs md:text-sm mb-1">⏱ Waktu Ideal:</h4>
            <p className="text-xs font-semibold leading-relaxed">
              ✔ 1–2 kali seminggu <br />
              ✔ Pagi hari 🌅 atau sore hari 🌇 <br />
              ✔ Hindari panas terik (tanaman juga butuh nyaman 😌)
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-300 p-4 rounded-2xl">
            <h4 className="font-bold text-xs md:text-sm mb-2">🌱 Hasil Kalau Rutin Dipakai:</h4>
            <ul className="text-xs font-semibold space-y-1.5">
              <li>✔ Daun hijau seperti filter Instagram 🍃✨</li>
              <li>✔ Batang kuat seperti “atlet tanaman” 💪🌿</li>
              <li>✔ Panen melimpah seperti festival panen 🎉🌾</li>
            </ul>
          </div>

          <div className="bg-[#e8fff3] dark:bg-emerald-950/20 border-l-6 border-[#2ecc71] p-5 rounded-r-2xl">
            <span className="font-bold text-emerald-950 dark:text-emerald-300 text-xs md:text-sm block mb-1">😄 Pesan Akhir</span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Rawat tanaman seperti teman sendiri 🌱🤝 <br />
              Kasih makan cukup, jangan berlebihan, dan jangan diabaikan. <br />
              Kalau tanaman bahagia, kita juga ikut panen bahagia 💚
            </p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      emoji: '🚀',
      title: '5. Kesimpulan',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Pupuk cair organik bukan sekadar hasil olahan limbah dapur, tetapi merupakan bentuk inovasi sederhana
            yang memiliki dampak besar bagi pertanian, lingkungan, dan kehidupan manusia. Dari bahan-bahan yang
            awalnya dianggap sampah, kita dapat menghasilkan cairan bernutrisi tinggi yang mampu menyuburkan tanaman
            secara alami dan berkelanjutan.
          </p>

          <div className={getHighlightBoxClass()}>
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong className="block text-sm mb-1">Inti Besar Pupuk Cair:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-90">
                  Sampah organik + mikroorganisme + waktu = solusi pertanian masa depan 🌱✨
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Jika dilihat lebih dalam, pupuk cair memberikan dua manfaat besar sekaligus: pertama, meningkatkan kualitas
            pertumbuhan tanaman; kedua, mengurangi jumlah sampah organik yang biasanya menumpuk di lingkungan.
            Dengan kata lain, satu proses sederhana ini mampu menyelesaikan dua masalah besar secara bersamaan.
          </p>



          <p className={getParagraphClass()}>
            Dalam praktiknya, penggunaan pupuk cair juga sangat membantu petani maupun masyarakat umum dalam
            menghemat biaya pertanian. Karena bahan pembuatannya berasal dari limbah rumah tangga seperti sisa
            sayuran, buah, dan air cucian beras, maka tidak diperlukan biaya besar untuk mendapatkannya.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="bg-blue-50/50 dark:bg-blue-950/10 p-5 border border-blue-200/20 dark:border-blue-900/10 rounded-2xl space-y-1">
              <h5 className="font-bold text-blue-950 dark:text-blue-300 text-xs">🌿 Manfaat Lingkungan</h5>
              <ul className="text-xs text-slate-700 dark:text-slate-300 font-semibold space-y-1">
                <li>✔ Mengurangi sampah organik</li>
                <li>✔ Menekan pencemaran lingkungan</li>
                <li>✔ Mengurangi emisi gas rumah kaca</li>
              </ul>
            </div>
            <div className="bg-green-50/50 dark:bg-green-950/10 p-5 border border-green-200/20 dark:border-green-900/10 rounded-2xl space-y-1">
              <h5 className="font-bold text-green-950 dark:text-green-300 text-xs">🌱 Manfaat Pertanian</h5>
              <ul className="text-xs text-slate-700 dark:text-slate-300 font-semibold space-y-1">
                <li>✔ Tanaman lebih sehat</li>
                <li>✔ Hasil panen meningkat</li>
                <li>✔ Tanah lebih subur alami</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 p-4 rounded-2xl">
            <div className="flex gap-3">
              <span className="text-xl">😄</span>
              <div>
                <strong className="block text-sm mb-1">Fun Fact Santai:</strong>
                <p className="text-xs font-semibold leading-relaxed">
                  Kalau tanaman bisa ngomong, mungkin mereka akan bilang:<br />
                  “Terima kasih sudah kasih aku pupuk cair, aku jadi nggak lemes lagi 🌱😂”
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Lebih dari itu, pupuk cair juga mengajarkan kita tentang pentingnya siklus alam. Tidak ada yang benar-benar
            terbuang di alam—semuanya bisa diproses kembali menjadi sesuatu yang bermanfaat. Konsep inilah yang menjadi
            dasar pertanian berkelanjutan dan ekonomi sirkular.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-300 p-4 rounded-2xl">
            <h4 className="font-bold text-xs md:text-sm mb-1 flex items-center gap-1.5">
              <Sprout className="h-4 w-4" /> 🌍 Pesan Penting:
            </h4>
            <p className="text-xs font-semibold leading-relaxed">
              Mulai dari hal kecil seperti mengolah sampah dapur, kita sebenarnya sedang berkontribusi besar dalam
              menjaga bumi tetap hijau dan layak dihuni untuk generasi berikutnya.
            </p>
          </div>

          <p className={getParagraphClass()}>
            Dengan membuat dan menggunakan pupuk cair secara mandiri, kita tidak hanya menjadi pengguna teknologi
            ramah lingkungan, tetapi juga menjadi bagian dari solusi terhadap permasalahan sampah dan ketahanan pangan.
          </p>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src={cairFile3} 
              alt="Hasil Panen Subur" 
              className="w-full max-h-[300px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 6: Hasil Penggunaan POC - Hasil panen sayuran segar yang melimpah dan berkualitas tinggi
            </div>
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-950 dark:text-cyan-300 p-4 rounded-2xl">
            <div className="flex gap-3">
              <span className="text-xl">🌟</span>
              <div>
                <strong className="block text-sm mb-1">Kesimpulan Akhir:</strong>
                <p className="text-xs font-semibold leading-relaxed">
                  Pupuk cair adalah bukti bahwa solusi besar bisa lahir dari hal sederhana. Dengan sedikit kreativitas,
                  limbah organik dapat berubah menjadi sumber kehidupan baru bagi tanaman dan lingkungan.
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            🌱 Mari mulai dari rumah kita sendiri. Jangan biarkan sampah organik terbuang sia-sia, ubah menjadi
            pupuk cair yang bermanfaat. Dengan langkah kecil ini, kita sedang membangun masa depan yang lebih
            hijau, sehat, dan berkelanjutan.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="relative p-6 md:p-8 rounded-3xl overflow-hidden bg-linear-to-br from-emerald-500/10 via-sky-500/5 to-transparent border border-emerald-500/10 shadow-xs">
        <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold">
            <Droplet className="h-4 w-4 animate-pulse text-emerald-500" />
            <span>SIKOMDIG Cibunian</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            🧪 MODUL LENGKAP PUPUK CAIR
          </h1>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-2xl font-medium leading-relaxed">
            Belajar lengkap tentang pupuk cair organik mulai dari pengertian, manfaat, proses pembuatan, hingga cara penggunaan yang benar untuk pertanian modern dan ramah lingkungan.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {sections.map((section) => {
          const isOpen = !!openSections[section.id];
          return (
            <div
              key={section.id}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${getAccordionContainerClass()}`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-5 font-black text-xs md:text-base text-left transition-all cursor-pointer ${getHeaderHoverClass()}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg md:text-xl shrink-0">{section.emoji}</span>
                  <span className={getHeadingClass()}>{section.title}</span>
                </div>
                <div className="h-6 w-6 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className={`p-5 md:p-6 space-y-4 ${getContentBgClass()}`}>
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Module Footer Footer */}
      <div className="text-center py-6 text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase">
        SIKOMDIG - Desa Cibunian ♻️ | Modul Edukasi Pupuk Cair
      </div>
    </div>
  );
}
