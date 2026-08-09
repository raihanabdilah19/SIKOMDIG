import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import maggotKeringFeed from '../assets/images/maggot_kering_feed_1783788063682.jpg';
import maggotChickenFeed from '../assets/images/maggot_chicken_feed_1783788079012.jpg';
import maggotCompostingBin from '../assets/images/maggot_composting_bin_1783788095049.jpg';
import maggotFishFeed from '../assets/images/maggot_fish_feed_1783788112664.jpg';
import {
  Bug,
  Award,
  ChevronDown,
  ChevronUp,
  Activity,
  Droplet,
  Flame,
  Clock,
  Sparkles,
  RefreshCw,
  TrendingUp,
  LayoutGrid,
  Sprout,
  HelpCircle,
  Info,
  CheckCircle,
  Image as ImageIcon,
  Check
} from 'lucide-react';

export default function MaggotModule() {
  const [activeTab, setActiveTab] = useState<'visual' | 'edukasi'>('visual');
  const [activePhase, setActivePhase] = useState<number>(1); // Active cycle phase

  // Store open state for each of the 4 educational sections
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

  // --- Theme Styling Mappers ---
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
        return 'hover:bg-white/5 text-rose-400';
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

  const getHighlightBoxClass = (colorType: 'orange' | 'green' | 'blue' | 'lime') => {
    if (theme === 'dark') {
      switch (colorType) {
        case 'orange':
          return 'bg-amber-950/40 border border-amber-400/30 text-amber-200 p-4 rounded-2xl';
        case 'green':
          return 'bg-emerald-950/40 border border-emerald-400/30 text-emerald-200 p-4 rounded-2xl';
        case 'blue':
          return 'bg-sky-950/40 border border-sky-400/30 text-sky-200 p-4 rounded-2xl';
        case 'lime':
          return 'bg-teal-950/40 border border-teal-400/30 text-teal-200 p-4 rounded-2xl';
      }
    } else if (theme === 'nature') {
      switch (colorType) {
        case 'orange':
          return 'bg-amber-50 border border-amber-200 text-amber-950 p-4 rounded-2xl';
        case 'green':
          return 'bg-green-50 border border-green-200 text-green-950 p-4 rounded-2xl';
        case 'blue':
          return 'bg-sky-50 border border-sky-200 text-sky-950 p-4 rounded-2xl';
        case 'lime':
          return 'bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded-2xl';
      }
    } else {
      switch (colorType) {
        case 'orange':
          return 'bg-[#fff3e0] border border-orange-200 text-orange-950 p-4 rounded-2xl';
        case 'green':
          return 'bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded-2xl';
        case 'blue':
          return 'bg-sky-50 border border-sky-200 text-sky-950 p-4 rounded-2xl';
        case 'lime':
          return 'bg-[#f1f8e9] border border-green-200 text-green-950 p-4 rounded-2xl';
      }
    }
    return 'bg-[#fff3e0] border border-orange-200 text-orange-950 p-4 rounded-2xl';
  };

  const getStepBoxClass = (colorType: 'green' | 'rose' | 'blue' | 'orange' | 'purple' | 'teal') => {
    const borders = {
      green: 'border-[#2ecc71] dark:border-emerald-500',
      rose: 'border-rose-500 dark:border-rose-400',
      blue: 'border-sky-500 dark:border-sky-400',
      orange: 'border-orange-500 dark:border-orange-400',
      purple: 'border-purple-500 dark:border-purple-400',
      teal: 'border-teal-500 dark:border-teal-400',
    };
    const bColor = borders[colorType] || 'border-rose-500';

    switch (theme) {
      case 'dark':
        return `bg-[#181825] border-l-6 ${bColor} p-5 rounded-r-2xl space-y-3`;
      case 'nature':
        return `bg-[#dfebd6] border-l-6 ${bColor} p-5 rounded-r-2xl space-y-3`;
      default:
        return `bg-emerald-50/40 border-l-6 ${bColor} p-5 rounded-r-2xl space-y-3`;
    }
  };

  const getStepTitleClass = (colorType: 'green' | 'rose' | 'blue' | 'orange' | 'purple' | 'teal') => {
    const textColors = {
      green: 'text-emerald-950 dark:text-emerald-200',
      rose: 'text-rose-950 dark:text-rose-200',
      blue: 'text-sky-950 dark:text-sky-200',
      orange: 'text-orange-950 dark:text-amber-200',
      purple: 'text-purple-950 dark:text-purple-200',
      teal: 'text-teal-950 dark:text-teal-200',
    };
    const textColor = textColors[colorType] || 'text-rose-950 dark:text-rose-200';
    return `font-black ${textColor} text-xs md:text-sm uppercase tracking-wide`;
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

  // --- Original Data (Dasbor Siklus) ---
  const cyclePhases = [
    {
      phase: 1,
      title: 'Fase Telur (Eggs)',
      duration: '3 - 4 Hari',
      desc: 'Lalat BSF betina bertelur di celah-celah kayu atau kardus kering di dekat tumpukan sampah yang beraroma fermentasi kuat. Satu lalat betina mampu mengeluarkan 500-900 butir telur berwarna putih krem yang sangat halus.',
      tips: 'Gunakan potongan kayu berongga halus atau tumpukan kardus tipis di atas wadah umpan dedak fermentasi.'
    },
    {
      phase: 2,
      title: 'Fase Larva / Maggot (Larvae)',
      duration: '18 - 21 Hari',
      desc: 'Telur menetas menjadi bayi larva yang langsung melahap sisa sampah organik dapur basah dengan nafsu makan luar biasa. Fase inilah sampah organik didegradasi secara masif. Tubuhnya tumbuh pesat berwarna kecokelatan penuh protein dan lemak sehat.',
      tips: 'Berikan sampah organik basah yang tidak berminyak (seperti buah busuk atau sisa nasi hangat).'
    },
    {
      phase: 3,
      title: 'Fase Prepupa & Pupa',
      duration: '7 - 14 Hari',
      desc: 'Larva dewasa berubah warna menjadi hitam pekat (prepupa) dan berhenti makan. Mereka akan bermigrasi keluar dari wadah makanan basah mencari sudut kering. Setelah itu menjadi kepompong diam mengeras (pupa) sebelum bermetamorfosis.',
      tips: 'Sediakan wadah kemiringan migrasi (ramp) khusus di bak budidaya agar prepupa merayap mandiri ke wadah penampung kering.'
    },
    {
      phase: 4,
      title: 'Fase Lalat Dewasa (Imago)',
      duration: '5 - 8 Hari',
      desc: 'Lalat dewasa keluar dari pupa. Lalat BSF dewasa tidak memiliki mulut fungsional, mereka tidak memakan sampah atau menyebarkan bakteri pembawa penyakit layaknya lalat rumah. Mereka hanya minum air embun, kawin, bertelur, lalu mati.',
      tips: 'Gunakan kandang ram kawat halus berukuran luas yang terpapar sinar matahari pagi guna menstimulasi hormon kawin alami.'
    }
  ];

  const nutrientTable = [
    { nutrient: 'Protein Kasar (Crude Protein)', percentage: '40% - 45%', benefit: 'Mendorong percepatan pertumbuhan otot ikan & unggas unggul.' },
    { nutrient: 'Lemak Kasar (Crude Fat)', percentage: '30% - 35%', benefit: 'Sumber asupan energi metabolisme tubuh hewan ternak.' },
    { nutrient: 'Kalsium (Calcium)', percentage: '5.2% - 7.5%', benefit: 'Memperkokoh struktur tulang ikan mas & cangkang telur unggas.' },
    { nutrient: 'Asam Laurat (Lauric Acid)', percentage: 'Tinggi', benefit: 'Meningkatkan sistem imun kekebalan tubuh alami hewan dari penyakit.' }
  ];

  const stepByStep = [
    {
      title: 'Persiapan Kandang BSF Dewasa',
      desc: 'Buat kandang jaring halus seukuran minimal 1x1x1.5 meter. Letakkan di luar ruangan yang mendapat sinar matahari pagi, berikan tanaman hijau berdaun lebar sebagai media istirahat lalat dewasa.'
    },
    {
      title: 'Pembuatan Media Penarik (Atraktan)',
      desc: 'Campur 1 kg dedak padi, 1 liter air hangat, 1 sendok ragi instan, dan 2 sendok gula pasir. Aduk merata di dalam ember, tutup rapat dan biarkan terfermentasi selama 3 hari. Aroma fermentasi manis ini akan menarik lalat liar bertelur di media yang kita sediakan.'
    },
    {
      title: 'Pemasangan Media Telur (Eggies)',
      desc: 'Letakkan tumpukan bilah kayu tipis di atas ember atraktan. Lalat betina akan meletakkan telur di sela-sela bilah kayu tersebut agar aman dari media basah.'
    },
    {
      title: 'Penetasan & Pembesaran Larva',
      desc: 'Kumpulkan telur dari bilah kayu seminggu sekali, letakkan di atas wadah penetasan jaring halus di atas media sampah organik basah yang lunak. Bayi larva yang menetas akan jatuh dengan sendirinya ke wadah pakan dan mulai tumbuh membesar.'
    },
    {
      title: 'Pemanenan Maggot',
      desc: 'Setelah umur 15-18 hari, larva berukuran optimal siap dipanen untuk pakan segar ikan lele, patin, gurame, atau ayam kampung. Maggot juga bisa dikeringkan menggunakan oven agar tahan disimpan berbulan-bulan.'
    }
  ];

  // --- New User Data (Materi Edukasi Accordions) ---
  const accordionData = [
    {
      id: 0,
      emoji: '🌱',
      title: '1. Pengertian Maggot BSF',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Maggot BSF (Black Soldier Fly) adalah larva dari lalat tentara hitam (<i>Hermetia illucens</i>) yang hidup di lingkungan alami dan memiliki kemampuan sangat luar biasa dalam menguraikan bahan organik. Maggot ini bukan hama, bukan juga lalat pengganggu, melainkan serangga yang justru sangat bermanfaat dalam pengelolaan sampah dan pertanian berkelanjutan.
          </p>

          <p className={getParagraphClass()}>
            Dalam kehidupan sehari-hari, maggot BSF dikenal sebagai “mesin pengurai sampah alami” karena kemampuannya mengonsumsi limbah organik seperti sisa makanan, buah-buahan busuk, sayuran layu, kotoran ternak, hingga limbah dapur rumah tangga. Semua bahan tersebut akan diubah menjadi biomassa bernilai tinggi.
          </p>

          <div className={getHighlightBoxClass('orange')}>
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong className="block text-sm mb-1 text-amber-950 dark:text-amber-200">Konsep Sederhana Maggot BSF:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-95 text-orange-900 dark:text-amber-100/90 leading-relaxed">
                  Sampah organik 🗑️ → dimakan maggot 🐛 → berubah menjadi:<br />
                  ✔ Kompos alami 🌱<br />
                  ✔ Protein tinggi 🐟<br />
                  ✔ Pakan ternak berkualitas 🐔
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Proses ini terjadi secara alami tanpa bantuan bahan kimia berbahaya. Artinya, maggot BSF bekerja menggunakan sistem biologis yang sudah diciptakan oleh alam. Inilah yang membuat metode ini sangat ramah lingkungan, aman, dan berkelanjutan.
          </p>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src={maggotKeringFeed} 
              alt="Maggot Kering BSF" 
              className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar: Maggot Kering BSF Grade A Protein tinggi, cocok untuk Ikan dan unggas, pakan alternatif ekonomis.
            </div>
          </div>

          <p className={getParagraphClass()}>
            Maggot BSF memiliki siklus hidup yang terdiri dari beberapa tahap, yaitu telur, larva (maggot), prepupa, pupa, hingga menjadi lalat dewasa. Namun, yang paling bermanfaat dalam pengolahan sampah adalah fase larva, karena pada fase inilah maggot memiliki nafsu makan yang sangat tinggi.
          </p>

          <p className={getParagraphClass()}>
            Dalam waktu singkat, ratusan hingga ribuan maggot dapat menghabiskan sampah organik dalam jumlah besar. Proses ini jauh lebih cepat dibandingkan metode pengomposan tradisional yang biasanya membutuhkan waktu berminggu-minggu hingga berbulan-bulan.
          </p>

          <div className={getHighlightBoxClass('green')}>
            <div className="flex gap-3">
              <span className="text-xl">🌿</span>
              <div>
                <strong className="block text-sm mb-1 text-green-950 dark:text-emerald-200">Fakta Menarik:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-95 text-green-900 dark:text-emerald-100/90 leading-relaxed">
                  • 1 kg larva maggot dapat mengurai hingga 3–5 kg sampah organik per hari<br />
                  • Tidak menimbulkan bau menyengat jika dikelola dengan benar<br />
                  • Tidak menyebarkan penyakit seperti lalat rumah biasa
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Selain sebagai pengurai sampah, maggot BSF juga memiliki nilai ekonomi yang tinggi. Setelah tumbuh besar, maggot dapat dipanen dan digunakan sebagai pakan ternak, terutama untuk ikan, ayam, bebek, dan unggas lainnya. Kandungan proteinnya sangat tinggi, bahkan bisa mencapai lebih dari 40–50%.
          </p>

          <p className={getParagraphClass()}>
            Hal ini menjadikan maggot BSF sebagai solusi ganda (double solution), yaitu menyelesaikan masalah sampah sekaligus menyediakan sumber pakan alternatif yang murah dan bergizi bagi peternak.
          </p>

          <div className={getHighlightBoxClass('lime')}>
            <div className="flex gap-3">
              <span className="text-xl">🌍</span>
              <div>
                <strong className="block text-sm mb-1 text-emerald-950 dark:text-teal-200">Manfaat Konsep Maggot BSF:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-95 text-emerald-900 dark:text-teal-100/90 leading-relaxed">
                  ✔ Mengurangi sampah organik di lingkungan<br />
                  ✔ Menghasilkan pakan ternak murah dan bergizi<br />
                  ✔ Mendukung ekonomi masyarakat desa<br />
                  ✔ Mengurangi ketergantungan pakan pabrikan<br />
                  ✔ Mendukung sistem pertanian dan peternakan berkelanjutan
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Jika dilihat dari sisi lingkungan, penggunaan maggot BSF sangat membantu mengurangi beban tempat pembuangan akhir (TPA). Sampah organik yang biasanya menumpuk dan menghasilkan bau tidak sedap dapat diolah langsung menjadi produk bermanfaat tanpa proses pembakaran atau bahan kimia.
          </p>

          <p className={getParagraphClass()}>
            Selain itu, maggot juga membantu mengurangi emisi gas rumah kaca seperti metana yang biasanya dihasilkan dari pembusukan sampah organik secara alami di TPA. Dengan demikian, penggunaan maggot secara tidak langsung membantu mengurangi dampak perubahan iklim.
          </p>

          <div className={getHighlightBoxClass('blue')}>
            <div className="flex gap-3">
              <span className="text-xl">🧠</span>
              <div>
                <strong className="block text-sm mb-1 text-sky-950 dark:text-sky-200">Kesimpulan Ilmiah:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-95 text-sky-900 dark:text-sky-100/90 leading-relaxed">
                  Maggot BSF adalah organisme pengurai alami yang mampu mengubah limbah organik menjadi biomassa bernilai tinggi berupa kompos dan protein, sehingga sangat efektif untuk sistem pengelolaan sampah dan ketahanan pangan berkelanjutan.
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Dengan memahami pengertian maggot BSF secara menyeluruh, kita dapat melihat bahwa makhluk kecil ini memiliki peran besar dalam menjaga keseimbangan lingkungan. Sesuatu yang sering dianggap menjijikkan ternyata justru menjadi solusi penting bagi masa depan pengelolaan sampah dan pertanian modern.
          </p>
        </div>
      )
    },
    {
      id: 1,
      emoji: '🌿',
      title: '2. Manfaat Maggot BSF',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Maggot BSF (Black Soldier Fly) tidak hanya berfungsi sebagai pengurai sampah, tetapi juga memiliki banyak manfaat penting dalam kehidupan manusia, khususnya di bidang lingkungan, pertanian, dan peternakan. Kehadiran maggot menjadi solusi inovatif yang mampu menjawab dua masalah besar sekaligus, yaitu penumpukan sampah organik dan kebutuhan pakan ternak yang terus meningkat.
          </p>

          <p className={getParagraphClass()}>
            Dengan kemampuannya mengurai sampah dalam waktu singkat serta menghasilkan protein tinggi, maggot BSF kini banyak digunakan di berbagai daerah sebagai teknologi sederhana berbasis alam yang sangat efektif dan ramah lingkungan.
          </p>

          <div className={getHighlightBoxClass('green')}>
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong className="block text-sm mb-1 text-green-950 dark:text-emerald-200">Inti Manfaat Maggot BSF:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-95 text-green-900 dark:text-emerald-100/90 leading-relaxed">
                  Maggot BSF = pengurai sampah cepat + sumber protein tinggi + solusi lingkungan + peluang ekonomi
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={getStepBoxClass('green')}>
              <span className={getStepTitleClass('green')}>♻ 1. Mengurai Sampah Organik dengan Sangat Cepat</span>
              <p className={getStepTextClass()}>
                Salah satu manfaat utama maggot BSF adalah kemampuannya dalam mengurai sampah organik seperti sisa makanan, buah busuk, sayuran layu, dan limbah dapur lainnya. Maggot bekerja secara biologis dengan cara memakan bahan organik tersebut hingga habis.
                <br /><br />
                Proses ini jauh lebih cepat dibandingkan pengomposan biasa. Jika pengomposan tradisional bisa memakan waktu berminggu-minggu, maggot BSF dapat mengurai sampah hanya dalam hitungan hari.
                <br /><br />
                Hal ini sangat membantu mengurangi penumpukan sampah di lingkungan rumah, pasar, maupun tempat pembuangan akhir (TPA).
              </p>
            </div>

            <div className={getStepBoxClass('rose')}>
              <span className={getStepTitleClass('rose')}>🐟 2. Sumber Pakan Ternak Berkualitas Tinggi</span>
              <p className={getStepTextClass()}>
                Maggot BSF memiliki kandungan protein yang sangat tinggi, bahkan bisa mencapai 40%–60%. Kandungan ini menjadikannya sebagai pakan alternatif yang sangat baik untuk ikan, ayam, bebek, burung, dan hewan ternak lainnya.
                <br /><br />
                Dibandingkan pakan pabrikan yang mahal, maggot jauh lebih ekonomis namun tetap bernutrisi tinggi. Oleh karena itu, banyak peternak mulai beralih menggunakan maggot sebagai pakan utama maupun tambahan.
                <br /><br />
                Selain protein, maggot juga mengandung lemak sehat dan asam amino penting yang mendukung pertumbuhan hewan ternak menjadi lebih cepat dan sehat.
              </p>
            </div>

            <div className={getStepBoxClass('blue')}>
              <span className={getStepTitleClass('blue')}>🌍 3. Ramah Lingkungan dan Mengurangi Sampah</span>
              <p className={getStepTextClass()}>
                Salah satu dampak terbesar dari penggunaan maggot BSF adalah pengurangan volume sampah organik secara signifikan. Sampah yang biasanya dibuang ke TPA dapat diolah langsung menjadi pakan maggot dan kompos alami.
                <br /><br />
                Hal ini membantu mengurangi pencemaran lingkungan seperti bau tidak sedap, lindi (air sampah), serta gas metana yang berbahaya bagi atmosfer.
                <br /><br />
                Dengan demikian, maggot BSF menjadi salah satu solusi penting dalam mengatasi masalah sampah di perkotaan maupun pedesaan.
              </p>
            </div>

            <div className={getStepBoxClass('orange')}>
              <span className={getStepTitleClass('orange')}>💰 4. Memberikan Nilai Ekonomi Tambahan</span>
              <p className={getStepTextClass()}>
                Selain bermanfaat bagi lingkungan, maggot BSF juga memiliki nilai ekonomi yang tinggi. Maggot yang sudah dipanen dapat dijual dalam bentuk segar maupun kering sebagai pakan ternak.
                <br /><br />
                Selain itu, residu atau sisa hasil penguraian sampah oleh maggot juga dapat dijadikan pupuk organik yang bernilai jual.
                <br /><br />
                Banyak masyarakat kini menjadikan budidaya maggot sebagai usaha sampingan yang menguntungkan karena modalnya kecil tetapi hasilnya cukup menjanjikan.
              </p>
            </div>

            <div className={getStepBoxClass('green')}>
              <span className={getStepTitleClass('green')}>🌱 5. Mendukung Pertanian Berkelanjutan</span>
              <p className={getStepTextClass()}>
                Maggot BSF juga berperan penting dalam mendukung sistem pertanian berkelanjutan. Hasil penguraian sampah oleh maggot dapat digunakan sebagai pupuk organik yang memperbaiki kualitas tanah.
                <br /><br />
                Tanah menjadi lebih subur, gembur, dan kaya mikroorganisme, sehingga sangat baik untuk pertumbuhan tanaman jangka panjang.
              </p>
            </div>

            <div className={getStepBoxClass('purple')}>
              <span className={getStepTitleClass('purple')}>🧠 6. Mengedukasi Masyarakat tentang Pengelolaan Sampah</span>
              <p className={getStepTextClass()}>
                Budidaya maggot juga memberikan nilai edukasi yang penting. Masyarakat dapat belajar bahwa sampah bukanlah sesuatu yang harus dibuang begitu saja, tetapi bisa diolah menjadi sesuatu yang bermanfaat.
                <br /><br />
                Hal ini mendorong kesadaran lingkungan sejak dini, terutama di kalangan pelajar dan masyarakat desa.
              </p>
            </div>
          </div>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src={maggotChickenFeed} 
              alt="Maggot Chicken Farm" 
              className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar: Grub's up: why maggot meals are a hit on one UK chicken farm.
            </div>
          </div>

          <div className={getHighlightBoxClass('lime')}>
            <div className="flex gap-3">
              <span className="text-xl">🌿</span>
              <div>
                <strong className="block text-sm mb-1 text-emerald-950 dark:text-teal-200">Kesimpulan Manfaat Maggot BSF:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-95 text-emerald-900 dark:text-teal-100/90 leading-relaxed">
                  Maggot BSF bukan hanya sekadar larva pengurai sampah, tetapi merupakan solusi lengkap yang mencakup aspek lingkungan, ekonomi, dan pertanian. Dengan kemampuannya yang luar biasa, maggot mampu mengubah masalah sampah menjadi peluang yang bermanfaat bagi manusia dan alam.
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Dengan memahami manfaat ini, kita dapat melihat bahwa maggot BSF is salah satu inovasi alami yang sangat penting untuk masa depan. Teknologi sederhana ini mampu memberikan dampak besar jika diterapkan secara luas di masyarakat.
          </p>
        </div>
      )
    },
    {
      id: 2,
      emoji: '⚙️',
      title: '3. Proses Budidaya Maggot',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Budidaya Maggot BSF (Black Soldier Fly) merupakan proses pemeliharaan larva lalat tentara hitam untuk mengurai sampah organik sekaligus menghasilkan pakan ternak bernilai tinggi. Proses ini sangat sederhana, tidak membutuhkan teknologi rumit, dan bisa dilakukan di skala rumah tangga maupun usaha besar.
          </p>

          <p className={getParagraphClass()}>
            Keunggulan utama budidaya maggot adalah kemampuannya yang “self-sustaining”, artinya sistem ini dapat berjalan dengan memanfaatkan sampah organik sebagai makanan utama tanpa biaya pakan tambahan yang mahal. Dengan kata lain, sampah berubah menjadi sumber kehidupan baru.
          </p>

          <div className={getHighlightBoxClass('green')}>
            <div className="flex gap-3">
              <span className="text-xl">💡</span>
              <div>
                <strong className="block text-sm mb-1 text-green-950 dark:text-emerald-200">Konsep Dasar Budidaya Maggot:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-95 text-green-900 dark:text-emerald-100/90 leading-relaxed">
                  Sampah organik 🗑️ + telur BSF 🥚 → larva maggot 🐛 → kompos + pakan protein tinggi
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Proses budidaya maggot berjalan melalui beberapa tahapan penting yang harus dilakukan secara berurutan agar hasil maksimal. Setiap tahap memiliki fungsi masing-masing dalam memastikan maggot tumbuh sehat dan mampu mengurai sampah dengan optimal.
          </p>

          <div className="space-y-4">
            <div className={getStepBoxClass('orange')}>
              <span className={getStepTitleClass('orange')}>1. 🪣 Menyiapkan Media dan Wadah Budidaya</span>
              <p className={getStepTextClass()}>
                Tahap pertama adalah menyiapkan wadah atau media budidaya. Wadah ini bisa berupa kotak plastik, ember besar, bak semen, atau rak budidaya khusus.
                <br /><br />
                Media yang digunakan berisi sampah organik seperti sisa makanan, sayuran, buah-buahan busuk, dan limbah dapur lainnya. Sampah ini akan menjadi sumber makanan utama bagi maggot.
                <br /><br />
                Sangat penting untuk menjaga kelembaban media agar tidak terlalu kering atau terlalu basah. Kondisi ideal akan membuat maggot tumbuh lebih cepat dan sehat.
              </p>
            </div>

            <div className={getStepBoxClass('blue')}>
              <span className={getStepTitleClass('blue')}>2. 🥚 Penebaran Telur BSF</span>
              <p className={getStepTextClass()}>
                Setelah media siap, langkah berikutnya adalah memasukkan telur Black Soldier Fly (BSF). Telur ini biasanya diletakkan di dekat media sampah agar setelah menetas, larva langsung mendapatkan makanan.
                <br /><br />
                Dalam waktu 1–2 hari, telur akan menetas menjadi larva kecil yang disebut maggot muda. Pada tahap ini, maggot mulai aktif mencari dan mengonsumsi makanan organik di sekitarnya.
                <br /><br />
                Jumlah telur yang digunakan akan mempengaruhi banyaknya maggot yang dihasilkan, sehingga perlu disesuaikan dengan jumlah sampah yang tersedia.
              </p>
            </div>

            <div className={getStepBoxClass('rose')}>
              <span className={getStepTitleClass('rose')}>3. 🐛 Proses Penguraian dan Pertumbuhan Maggot</span>
              <p className={getStepTextClass()}>
                Inilah tahap paling penting dalam budidaya maggot. Pada fase ini, larva akan tumbuh sangat cepat dan aktif memakan sampah organik yang tersedia.
                <br /><br />
                Maggot memiliki nafsu makan yang sangat tinggi, sehingga dalam waktu singkat sampah dapat berkurang secara signifikan. Proses ini juga tidak menimbulkan bau menyengat jika dikelola dengan benar.
                <br /><br />
                Selama proses ini, maggot akan mengalami beberapa kali pergantian kulit (molting) hingga mencapai ukuran maksimal.
              </p>
            </div>

            <div className={getStepBoxClass('green')}>
              <span className={getStepTitleClass('green')}>4. 🌿 Pengelolaan Media Selama Proses</span>
              <p className={getStepTextClass()}>
                Selama budidaya berlangsung, penting untuk menjaga kondisi media agar tetap stabil. Sampah yang terlalu basah dapat ditambahkan bahan kering seperti serbuk kayu atau daun kering.
                <br /><br />
                Sebaliknya, jika terlalu kering, dapat ditambahkan sedikit air atau sampah basah agar kelembaban tetap seimbang.
                <br /><br />
                Pengelolaan yang baik akan mempercepat pertumbuhan maggot dan mencegah munculnya bau tidak sedap.
              </p>
            </div>

            <div className={getStepBoxClass('purple')}>
              <span className={getStepTitleClass('purple')}>5. 🧪 Panen Maggot</span>
              <p className={getStepTextClass()}>
                Setelah 10–14 hari, maggot biasanya sudah mencapai ukuran optimal dan siap dipanen. Pada tahap ini, sebagian besar sampah sudah habis terurai.
                <br /><br />
                Panen dilakukan dengan cara memisahkan maggot dari sisa media menggunakan ayakan atau metode pencahayaan, karena maggot cenderung menjauh dari cahaya.
                <br /><br />
                Hasil panen dapat dibagi menjadi dua bagian, yaitu maggot basah untuk pakan langsung dan maggot kering untuk penyimpanan jangka panjang.
              </p>
            </div>

            <div className={getStepBoxClass('teal')}>
              <span className={getStepTitleClass('teal')}>6. 🌱 Hasil Akhir Budidaya</span>
              <p className={getStepTextClass()}>
                Hasil akhir dari budidaya maggot bukan hanya larva yang kaya protein, tetapi juga residu atau sisa penguraian sampah yang berubah menjadi kompos alami.
                <br /><br />
                Kompos ini sangat bermanfaat untuk menyuburkan tanah dan meningkatkan kualitas pertanian secara alami.
                <br /><br />
                Dengan demikian, tidak ada bagian yang terbuang dalam sistem budidaya maggot—semua menjadi bermanfaat kembali.
              </p>
            </div>
          </div>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src={maggotCompostingBin} 
              alt="Budidaya Maggot" 
              className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar: Bak pemeliharaan dan pengolahan sampah organik oleh Maggot BSF.
            </div>
          </div>

          <div className={getHighlightBoxClass('orange')}>
            <div className="flex gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <strong className="block text-sm mb-1 text-orange-950 dark:text-amber-200">Tips Penting Agar Budidaya Berhasil:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-95 text-orange-900 dark:text-amber-100/90 leading-relaxed">
                  • Jaga kelembaban media tetap stabil<br />
                  • Hindari sampah anorganik (plastik, logam)<br />
                  • Jangan terlalu banyak air agar tidak busuk<br />
                  • Pastikan ventilasi cukup<br />
                  • Jangan mencampur bahan beracun atau kimia
                </p>
              </div>
            </div>
          </div>

          {/* Grid display outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 p-5 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-blue-900 dark:text-blue-300 text-sm flex items-center gap-2">
                <span>🌿</span> Hasil Budidaya
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                ✔ Maggot kaya protein<br />
                ✔ Kompos alami<br />
                ✔ Lingkungan lebih bersih
              </p>
            </div>

            <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 p-5 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2">
                <span>♻</span> Dampak Positif
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                ✔ Mengurangi sampah<br />
                ✔ Menghasilkan pakan murah<br />
                ✔ Menambah penghasilan
              </p>
            </div>
          </div>

          <div className={getHighlightBoxClass('blue')}>
            <div className="flex gap-3">
              <span className="text-xl">🌍</span>
              <div>
                <strong className="block text-sm mb-1 text-sky-950 dark:text-sky-200">Kesimpulan Proses:</strong>
                <p className="text-xs md:text-sm font-semibold opacity-95 text-sky-900 dark:text-sky-100/90 leading-relaxed">
                  Budidaya maggot BSF adalah proses sederhana namun sangat bermanfaat yang mengubah sampah organik menjadi sumber daya bernilai tinggi. Dengan sistem ini, kita tidak hanya mengurangi sampah, tetapi juga menciptakan siklus kehidupan yang lebih berkelanjutan.
                </p>
              </div>
            </div>
          </div>

          <p className={getParagraphClass()}>
            Dengan memahami proses ini secara lengkap, kita dapat melihat bahwa maggot bukan sekadar larva, tetapi bagian penting dari sistem ekologi modern yang membantu menjaga keseimbangan lingkungan sekaligus meningkatkan ekonomi masyarakat.
          </p>
        </div>
      )
    },
    {
      id: 3,
      emoji: '🖼️',
      title: '4. Galeri Ilustrasi',
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className={`${getHeadingClass()} text-sm md:text-base`}>🐛 Maggot BSF</h3>
            <p className={getParagraphClass()}>Mengurai sampah organik lebih cepat dan dapat menjadi pakan ternak.</p>
            <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
              <img 
                src={maggotCompostingBin} 
                alt="Worm-like bugs in waste war" 
                className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-white/5">
            <h3 className={`${getHeadingClass()} text-sm md:text-base`}>🌱 Proses Penguraian</h3>
            <p className={getParagraphClass()}>Sampah berubah menjadi kompos alami yang bermanfaat.</p>
            <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
              <img 
                src={maggotKeringFeed} 
                alt="Maggots in Rice" 
                className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-white/5">
            <h3 className={`${getHeadingClass()} text-sm md:text-base`}>🐟 Pakan Ikan</h3>
            <p className={getParagraphClass()}>Maggot kering kaya protein untuk budidaya ikan.</p>
            <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
              <img 
                src={maggotFishFeed} 
                alt="Pakan Ikan Maggot" 
                className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-xs font-bold">
          <Bug className="h-4 w-4 animate-bounce text-rose-500" />
          <span>Biokonversi Organik Unggul</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
          Modul Budidaya <span className="text-rose-600">Maggot BSF</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 max-w-xl font-medium leading-relaxed">
          Pemanfaatan agen biokonversi biologis super guna mendegradasi sampah organik rumah tangga secara instan dalam hitungan jam sekaligus memproduksi pakan protein tinggi.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-zinc-900 rounded-2xl w-full sm:w-fit border border-slate-200/50 dark:border-white/5">
        <button
          onClick={() => setActiveTab('visual')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'visual'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/10'
              : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
          }`}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Dasbor Siklus & Gizi</span>
        </button>
        <button
          onClick={() => setActiveTab('edukasi')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'edukasi'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/10'
              : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
          }`}
        >
          <Bug className="h-4 w-4" />
          <span>Materi Edukasi Lengkap</span>
        </button>
      </div>

      {/* Conditional rendering based on tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'visual' ? (
          <motion.div
            key="visual-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Cyclical lifecycle visualizer */}
            <div className="bg-white dark:bg-[#131318] border border-slate-100 dark:border-white/5 rounded-3xl p-6 shadow-xs space-y-6">
              <div className="text-center space-y-1 max-w-sm mx-auto">
                <h3 className="text-base font-extrabold text-slate-800 dark:text-white flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 text-rose-500" />
                  Siklus Hidup Black Soldier Fly (BSF)
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">Klik pada fase siklus di bawah untuk melihat detail instruksi budidaya</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cyclePhases.map((phase) => (
                  <button
                    key={phase.phase}
                    onClick={() => setActivePhase(phase.phase)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all cursor-pointer ${
                      activePhase === phase.phase
                        ? 'bg-rose-900 text-white border-rose-900 shadow-lg shadow-rose-900/10'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-700 dark:text-zinc-300 hover:bg-slate-100/50 dark:hover:bg-white/10'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className={`text-[10px] font-mono font-bold ${
                        activePhase === phase.phase ? 'text-rose-300' : 'text-slate-400 dark:text-zinc-500'
                      }`}>
                        FASE {phase.phase}
                      </span>
                      <h4 className="font-extrabold text-xs md:text-sm">{phase.title}</h4>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
                      activePhase === phase.phase ? 'bg-rose-800 text-rose-100' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-zinc-300'
                    }`}>
                      {phase.duration}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Phase Detail Drawer style rendering */}
              <div className="bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100/60 dark:border-rose-900/20 rounded-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <h4 className="font-extrabold text-slate-800 dark:text-white text-sm md:text-base">
                    {cyclePhases[activePhase - 1].title} ({cyclePhases[activePhase - 1].duration})
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {cyclePhases[activePhase - 1].desc}
                  </p>
                </div>
                <div className="md:col-span-4 bg-white dark:bg-zinc-900 border border-rose-100/50 dark:border-rose-900/30 p-4 rounded-xl space-y-2">
                  <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                    💡 REKOMENDASI TIM SIRAM
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                    {cyclePhases[activePhase - 1].tips}
                  </p>
                </div>
              </div>
            </div>

            {/* Nutritional profile and Steps split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Nutritional chart table */}
              <div className="lg:col-span-5 bg-white dark:bg-[#131318] border border-slate-100 dark:border-white/5 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">Profil Nutrisi Larva BSF</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Kandungan gizi tinggi pengganti pakan konsentrat komersial</p>
                </div>

                <div className="space-y-3">
                  {nutrientTable.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100/80 dark:border-white/5 flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-800 dark:text-zinc-200">{item.nutrient}</span>
                        <span className="text-xs font-black text-rose-600 bg-rose-50 dark:bg-rose-950/40 border border-rose-100/50 dark:border-rose-900/30 px-2.5 py-0.5 rounded-lg shrink-0">
                          {item.percentage}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal mt-1.5 leading-relaxed">
                        {item.benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Steps to build a home colony */}
              <div className="lg:col-span-7 bg-white dark:bg-[#131318] border border-slate-100 dark:border-white/5 rounded-3xl p-6 shadow-xs space-y-5">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">Panduan Teknis Budidaya Maggot</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Langkah praktis merintis koloni budidaya di rumah atau kelompok tani</p>
                </div>

                <div className="space-y-4">
                  {stepByStep.map((step, index) => (
                    <div key={index} className="flex gap-4 items-start relative">
                      {/* Visual Connector Line */}
                      {index < stepByStep.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-100 dark:bg-zinc-800" />
                      )}

                      <span className="h-8 w-8 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 font-black text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>

                      <div className="space-y-1 pt-0.5">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200 leading-tight">{step.title}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-normal leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="edukasi-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Accordion List */}
            {accordionData.map((section) => {
              const isOpen = !!openSections[section.id];
              return (
                <div
                  key={section.id}
                  className={`rounded-3xl overflow-hidden transition-all duration-300 ${getAccordionContainerClass()}`}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full py-5 px-6 flex items-center justify-between text-left font-black text-sm md:text-base transition-colors ${getHeaderHoverClass()}`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{section.emoji}</span>
                      <span>{section.title}</span>
                    </span>
                    <span>{isOpen ? '−' : '+'}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`p-6 space-y-5 ${getContentBgClass()}`}>
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
