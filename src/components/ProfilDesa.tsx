import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Users,
  Compass,
  Calendar,
  User as UserIcon,
  Leaf,
  Mail,
  MapPin,
  Building,
  Target,
  Sparkles,
  Info,
  TrendingUp,
  Globe,
  Heart,
  BookOpen
} from 'lucide-react';

// Import custom generated high-quality assets
import kadesBasuni from '../assets/images/input_file_6.jpg';
import cibunianRice from '../assets/images/cibunian_rice_1783789338795.jpg';
import cibunianFarm from '../assets/images/cibunian_farm_1783789353491.jpg';
import cibunianStream from '../assets/images/cibunian_stream_1783789367860.jpg';
import cibunianCenter from '../assets/images/cibunian_center_1783789386172.jpg';
import cibunianGate from '../assets/images/cibunian_gate_1783789400218.jpg';
import cibunianCommunity from '../assets/images/cibunian_community_1783789414473.jpg';

interface ProfilDesaProps {
  theme?: string;
}

export default function ProfilDesa({ theme }: ProfilDesaProps) {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState(theme || 'dark');

  useEffect(() => {
    if (theme) {
      setActiveTheme(theme);
    } else {
      const savedSettings = localStorage.getItem('sikomdig_settings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          if (parsed.selectedTheme) {
            setActiveTheme(parsed.selectedTheme);
          }
        } catch (e) {
          // fallback
        }
      }
    }
  }, [theme]);

  // Styling helper classes matching parent theme state
  const isDark = activeTheme === 'dark';
  
  const getContainerClass = () => {
    return isDark 
      ? 'bg-[#0F0F12] border border-white/5 text-slate-100' 
      : 'bg-white border border-slate-100 text-slate-800 shadow-xs';
  };

  const getSubCardClass = () => {
    return isDark 
      ? 'bg-[#141418] border border-white/5' 
      : 'bg-slate-50 border border-slate-100/80';
  };

  const getTextMutedClass = () => {
    return isDark ? 'text-slate-400' : 'text-slate-500';
  };

  const staffList = [
    {
      id: 'kades',
      name: 'Basuni',
      role: 'Kepala Desa',
      email: 'cibuniand@gmail.com',
      phone: '089517923634',
      quote: 'Pemerintah Desa Cibunian berkomitmen penuh untuk mewujudkan pembangunan yang terarah, bersih, transparan, serta mengutamakan pemenuhan hak-hak kebutuhan dasar seluruh warga.',
      desc: 'Memimpin penyelenggaraan pemerintahan desa, menetapkan kebijakan pembangunan, serta bertanggung jawab penuh atas kesejahteraan dan kemajuan Desa Cibunian.'
    },
    {
      id: 'bpd',
      name: 'Yudi Agustian S.Pd',
      role: 'Ketua BPD',
      email: 'bpd@cibunian.desa.id',
      phone: '0857-XXXX-XXXX',
      quote: 'Kemitraan strategis antara BPD dan Pemerintah Desa adalah kunci bagi kemajuan transparansi dan pembangunan partisipatif di Desa Cibunian.',
      desc: 'Badan Permusyawaratan Desa (BPD) bertugas membahas dan menyepakati rancangan peraturan desa, menampung dan menyalurkan aspirasi masyarakat desa, serta mengawasi kinerja Kepala Desa.'
    },
    {
      id: 'sekdes',
      name: 'Deden Ariawan',
      role: 'Sekretaris Desa',
      email: 'sekretaris@cibunian.desa.id',
      phone: '0858-XXXX-XXXX',
      quote: 'Keteraturan administrasi, ketepatan data, dan sinergi antar lini pelayanan publik adalah pondasi utama tata kelola desa yang bersih dan transparan.',
      desc: 'Mengkoordinasikan urusan administrasi pemerintahan, kesekretariatan, penyusunan rancangan peraturan, pengelolaan keuangan dan aset desa, serta memberikan pelayanan administratif bagi masyarakat.'
    },
    {
      id: 'kasi_pemerintahan',
      name: 'Asep Saepudin',
      role: 'Kasi Pemerintahan',
      email: 'pemerintahan@cibunian.desa.id',
      phone: '0812-XXXX-XXXX',
      quote: 'Pelayanan administrasi kependudukan yang cepat, tertib, dan berintegritas demi terciptanya ketenteraman masyarakat.',
      desc: 'Membantu Kepala Desa dalam urusan administrasi pertanahan, kependudukan, pembinaan ketenteraman, penataan batas wilayah, dan ketertiban umum di wilayah Desa Cibunian.'
    },
    {
      id: 'kasi_kesra',
      name: 'Taofikur Rohman',
      role: 'Kasi Kesejahteraan Rakyat (Kesra)',
      email: 'kesra@cibunian.desa.id',
      phone: '0856-XXXX-XXXX',
      quote: 'Mengutamakan pemenuhan hak dasar sosial, keagamaan, kepemudaan, serta penanggulangan kemiskinan secara berkesinambungan.',
      desc: 'Mengelola urusan keagamaan, sosial kemasyarakatan, pembinaan olahraga, kesenian, kebudayaan, pemenuhan gizi ibu-anak, serta program pemberdayaan dan kesejahteraan warga.'
    },
    {
      id: 'kasi_pelayanan',
      name: 'Deviani',
      role: 'Kasi Pelayanan',
      email: 'pelayanan@cibunian.desa.id',
      phone: '0878-XXXX-XXXX',
      quote: 'Memberikan pelayanan terbaik, inklusif, ramah, dan solutif untuk seluruh lapisan masyarakat Desa Cibunian.',
      desc: 'Mengurus pembinaan kemasyarakatan, pelayanan perizinan non-usaha, administrasi nikah-rujuk, serta koordinasi layanan sosial dasar bagi warga.'
    },
    {
      id: 'staff_pelaksana_pelayanan',
      name: 'Yeni Rahmawati S.E',
      role: 'Staff Pelaksana Pelayanan',
      email: 'staff.pelayanan@cibunian.desa.id',
      phone: '0813-XXXX-XXXX',
      quote: 'Siap mendukung kelancaran operasional administrasi dan mendampingi keluhan pelayanan warga secara sigap.',
      desc: 'Membantu Kasi Pelayanan dalam pelaksanaan tugas-tugas administratif harian, pencatatan data layanan publik, dan pendampingan warga.'
    },
    {
      id: 'kaur_perencanaan',
      name: 'Duloh S.Ap',
      role: 'Kaur Perencanaan',
      email: 'perencanaan@cibunian.desa.id',
      phone: '0815-XXXX-XXXX',
      quote: 'Merancang rencana pembangunan desa yang matang, terukur, dan selaras dengan aspirasi pembangunan berkelanjutan.',
      desc: 'Menyusun rencana kerja pembangunan desa (RKPDesa), RPJMDesa, melakukan monitoring dan evaluasi jalannya program pembangunan, serta menyusun laporan pertanggungjawaban.'
    },
    {
      id: 'kaur_keuangan',
      name: 'Ai Purtadiyah',
      role: 'Kaur Keuangan',
      email: 'keuangan@cibunian.desa.id',
      phone: '0857-XXXX-XXXX',
      quote: 'Pengelolaan keuangan desa yang akuntabel, efisien, dan transparan agar setiap rupiah bermanfaat bagi masyarakat.',
      desc: 'Mengelola administrasi keuangan desa, penyusunan anggaran (APBDesa), pencairan dana, pembukuan kas desa, serta pelaporan realisasi keuangan.'
    },
    {
      id: 'kaur_umum',
      name: 'Ripal Lubis',
      role: 'Kaur Umum & Tata Usaha (TU)',
      email: 'umum.tu@cibunian.desa.id',
      phone: '0821-XXXX-XXXX',
      quote: 'Mengatur tata kelola persuratan, inventarisasi aset desa, dan perlengkapan sarana prasarana penunjang tugas kantor.',
      desc: 'Mengelola administrasi ketatausahaan, ekspedisi surat, pengarsipan, penyediaan sarana kantor, inventarisasi barang milik desa, dan urusan rumah tangga kantor desa.'
    },
    {
      id: 'staff_pelaksana_umum',
      name: 'Nanang',
      role: 'Staff Pelaksana Umum / TU',
      email: 'staff.umum@cibunian.desa.id',
      phone: '0896-XXXX-XXXX',
      quote: 'Menjaga keteraturan sarana operasional dan efisiensi urusan rumah tangga kantor demi kelancaran tugas harian.',
      desc: 'Membantu Kaur Umum & Tata Usaha dalam urusan operasional harian kantor, pengelolaan logistik surat-menyurat, serta pemeliharaan kebersihan kantor.'
    },
    {
      id: 'kadus_1',
      name: 'Hafidz Nurdiansyah S.Pd',
      role: 'Kepala Dusun I',
      email: 'kadus1@cibunian.desa.id',
      phone: '0812-XXXX-XXXX',
      quote: 'Menjadi jembatan utama komunikasi dan sinergi pembangunan antara warga Dusun I dengan Pemerintah Desa.',
      desc: 'Membantu Kepala Desa dalam pelaksanaan tugas kewilayahan di wilayah Dusun I, meliputi pembinaan masyarakat, ketenteraman, pembangunan fisik, dan ketertiban.'
    },
    {
      id: 'kadus_2',
      name: 'Rudi Yuliato',
      role: 'Kepala Dusun II',
      email: 'kadus2@cibunian.desa.id',
      phone: '0857-XXXX-XXXX',
      quote: 'Meningkatkan partisipasi gotong royong warga Dusun II demi kebersihan lingkungan dan kemandirian ekonomi.',
      desc: 'Pelaksana tugas kewilayahan di Dusun II, memfasilitasi aspirasi warga dusun, mendampingi program sosial-ekonomi, dan menjaga kerukunan wilayah.'
    },
    {
      id: 'kadus_3',
      name: 'Mudrika',
      role: 'Kepala Dusun III',
      email: 'kadus3@cibunian.desa.id',
      phone: '0819-XXXX-XXXX',
      quote: 'Siap mengawal pembangunan pertanian dan jalan desa di wilayah Dusun III secara gotong-royong.',
      desc: 'Pelaksana kewilayahan di Dusun III, membina ketertiban lingkungan rukun tetangga, serta mendukung koordinasi penanggulangan kebencanaan tingkat dusun.'
    },
    {
      id: 'kadus_4',
      name: 'Barnas',
      role: 'Kepala Dusun IV',
      email: 'kadus4@cibunian.desa.id',
      phone: '0858-XXXX-XXXX',
      quote: 'Membangun kesejahteraan sosial rukun tetangga dan merawat ketersediaan pangan berkelanjutan tingkat dusun.',
      desc: 'Pelaksana kewilayahan di Dusun IV, bertanggung jawab memelihara ketenteraman rukun warga dan menyalurkan program bantuan sosial tepat sasaran.'
    },
    {
      id: 'kadus_5',
      name: 'Suwardi',
      role: 'Kepala Dusun V',
      email: 'kadus5@cibunian.desa.id',
      phone: '0822-XXXX-XXXX',
      quote: 'Menjaga kelestarian lingkungan pegunungan and meningkatkan kemandirian warga Dusun V.',
      desc: 'Pelaksana kewilayahan di Dusun V, menggerakkan aksi sosial kemasyarakatan, memelihara kelestarian alam dan sumber daya lokal di wilayahnya.'
    }
  ];

  const renderStaffNode = (id: string) => {
    const staff = staffList.find(s => s.id === id);
    if (!staff) return null;

    const isSelected = selectedStaff === id;
    
    // Style specific borders or accent colors depending on roles
    let borderAccent = 'hover:border-green-500/50';
    let textAccent = 'text-green-500';
    let ringAccent = 'ring-green-500/30';
    let activeBg = 'bg-green-950 text-white border-green-950 dark:bg-green-900';

    if (id === 'bpd') {
      borderAccent = 'hover:border-purple-500/50';
      textAccent = 'text-purple-500';
      ringAccent = 'ring-purple-500/30';
      activeBg = 'bg-purple-950 text-white border-purple-950 dark:bg-purple-900';
    } else if (id.startsWith('kadus')) {
      borderAccent = 'hover:border-amber-500/50';
      textAccent = 'text-amber-500';
      ringAccent = 'ring-amber-500/30';
      activeBg = 'bg-amber-950 text-white border-amber-950 dark:bg-amber-900';
    } else if (id === 'sekdes' || id.startsWith('kaur') || id === 'staff_pelaksana_umum') {
      borderAccent = 'hover:border-sky-500/50';
      textAccent = 'text-sky-500';
      ringAccent = 'ring-sky-500/30';
      activeBg = 'bg-sky-950 text-white border-sky-950 dark:bg-sky-900';
    } else if (id.startsWith('kasi') || id === 'staff_pelaksana_pelayanan') {
      borderAccent = 'hover:border-emerald-500/50';
      textAccent = 'text-emerald-500';
      ringAccent = 'ring-emerald-500/30';
      activeBg = 'bg-emerald-950 text-white border-emerald-950 dark:bg-emerald-900';
    }

    return (
      <button
        key={staff.id}
        onClick={() => setSelectedStaff(selectedStaff === id ? null : id)}
        className={`w-full p-3.5 rounded-xl border text-center transition-all duration-300 cursor-pointer relative overflow-hidden group shadow-xs ${
          isSelected
            ? `${activeBg} shadow-md ring-2 ${ringAccent}`
            : isDark
            ? 'bg-[#0F0F12] border-white/5 text-slate-200 hover:bg-[#141418]'
            : 'bg-white border-slate-150 text-slate-700 hover:bg-slate-50'
        } ${borderAccent}`}
      >
        <div className="flex items-center justify-center gap-2">
          {id === 'kades' && (
            <img
              src={kadesBasuni}
              alt="Kades Basuni"
              className="w-9 h-9 rounded-full object-cover border-2 border-green-500 shrink-0 shadow-sm"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="space-y-0.5 text-center">
            <p className={`text-[8px] font-black uppercase tracking-widest ${
              isSelected ? 'text-white/85' : textAccent
            }`}>
              {staff.role}
            </p>
            <h4 className="font-extrabold text-xs md:text-sm tracking-tight leading-tight group-hover:scale-[1.01] transition-transform">
              {staff.name}
            </h4>
          </div>
        </div>
      </button>
    );
  };

  const timelineEvents = [
    { 
      year: 'Pra-RI', 
      title: 'Hutan & Asal-usul', 
      desc: 'Dahulu berupa hutan belantara & persawahan. Penduduk awal konon berasal dari Kuningan yang mengungsi pada masa Raja Syarif Hidayatullah.' 
    },
    { 
      year: 'Belanda', 
      title: 'Kecamatan Leuwiliang', 
      desc: 'Pada masa penjajahan Belanda, secara administratif Desa Cibunian dimasukkan ke dalam wilayah Kecamatan Leuwiliang.' 
    },
    { 
      year: 'Merdeka', 
      title: 'Kecamatan Cibungbulang', 
      desc: 'Setelah kemerdekaan Indonesia, status wilayah Desa Cibunian masuk ke dalam administratif Kecamatan Cibungbulang.' 
    },
    { 
      year: '1995', 
      title: 'Kecamatan Pamijahan', 
      desc: 'Tahun 1995 Kecamatan Cibungbulang dimekarkan, sehingga Desa Cibunian masuk ke wilayah Kecamatan Pamijahan hingga sekarang.' 
    }
  ];

  const galleryList = [
    { img: cibunianRice, title: 'Keindahan Alam Sawah', desc: 'Sawah terasering subur yang melingkupi Desa Cibunian' },
    { img: cibunianFarm, title: 'Pertanian Hortikultura', desc: 'Lahan pertanian organik sayuran dan palawija mandiri' },
    { img: cibunianStream, title: 'Aliran Sungai Bersih', desc: 'Sumber air alami pegunungan yang melimpah dan murni' },
    { img: cibunianCenter, title: 'Pusat Kompos Organik', desc: 'Pengolahan pupuk organik warga melalui program SIRAM' },
    { img: cibunianGate, title: 'Gerbang Hijau Desa', desc: 'Keasrian gerbang masuk kawasan Desa Cibunian' },
    { img: cibunianCommunity, title: 'Gotong Royong Warga', desc: 'Kebersamaan warga desa dalam mewujudkan ketahanan pangan' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      {/* Marquee Banner Ticker */}
      <div className="bg-amber-500 text-slate-900 overflow-hidden py-2.5 px-6 rounded-2xl relative border border-amber-600 flex items-center shadow-md">
        <div className="whitespace-nowrap flex gap-10 animate-[marquee_30s_linear_infinite] text-xs font-bold uppercase tracking-wider">
          <span>📢 Selamat Datang di Website Profil Desa Cibunian • Desa Maju, Mandiri, Sejahtera dan Berwawasan Lingkungan • Bersama SIRAM Kelola Sampah, Hasilkan Berkah 📢</span>
          <span>📢 Selamat Datang di Website Profil Desa Cibunian • Desa Maju, Mandiri, Sejahtera dan Berwawasan Lingkungan • Bersama SIRAM Kelola Sampah, Hasilkan Berkah 📢</span>
        </div>
      </div>

      {/* Hero Header Card with Background */}
      <div 
        className="relative rounded-3xl overflow-hidden py-16 px-8 md:py-24 md:px-12 text-white flex items-center justify-center text-center shadow-xl border border-black/10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${cibunianRice})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="bg-green-600/90 text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full inline-block border border-green-500/20 backdrop-blur-xs">
            🏢 Profil Resmi Pemerintahan
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
            Desa Cibunian
          </h1>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium drop-shadow-xs">
            Kecamatan Pamijahan, Kabupaten Bogor, Provinsi Jawa Barat
          </p>
          <div className="pt-2">
            <a 
              href="#profil-kades" 
              className="inline-block bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 text-xs font-bold px-6 py-3 rounded-full shadow-lg transition-all"
            >
              Jelajahi Profil Desa
            </a>
          </div>
        </div>
      </div>

      {/* Profile Kepala Desa Section */}
      <section id="profil-kades" className={`rounded-3xl p-6 md:p-8 ${getContainerClass()}`}>
        <div className="flex items-center gap-2 mb-6 border-b border-slate-100/10 pb-4">
          <div className="p-2 bg-green-500/10 text-green-600 rounded-xl">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">Kepala Desa Cibunian</h2>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sambutan Pimpinan Wilayah</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-xs opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <img 
                src={kadesBasuni} 
                alt="Kepala Desa Basuni" 
                className="relative rounded-2xl w-full max-w-[260px] aspect-[3/4] object-cover border border-white/10 shadow-lg"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest block">KEPALA DESA AKTIF</span>
              <h3 className="text-2xl font-black">{staffList[0].name}</h3>
              <p className={`text-xs font-medium ${getTextMutedClass()}`}>Pemerintah Desa Cibunian, Pamijahan, Bogor</p>
            </div>

            <div className={`${getSubCardClass()} p-5 rounded-2xl border leading-relaxed text-xs space-y-4`}>
              <p className="font-semibold italic text-slate-600 dark:text-slate-300">
                "{staffList[0].quote}"
              </p>
              
              <div className="border-t border-slate-150/10 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <div className="space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">📍 Alamat Kantor:</span>
                  <span>Jl. KH Abdul Hamid Km. 17, Kp. Cipatat Satu</span>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">📞 Telepon/WA:</span>
                  <a
                    href="https://wa.me/6289517923634"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>089517923634</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 rounded font-bold">Chat WA</span>
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">🌐 Website Resmi:</span>
                  <a href="https://cibunian-pamijahan.desa.id" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
                    cibunian-pamijahan.desa.id
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">✉️ Email Kantor:</span>
                  <span>cibuniand@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Village Stats Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100/10">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <div>
            <h3 className="text-base font-black text-slate-800 dark:text-slate-100">Kondisi Umum & Statistik Wilayah</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Data demografis resmi Desa Cibunian</p>
          </div>
        </div>

        {/* 4 Core Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '13.070', suffix: 'Jiwa', label: 'Jumlah Penduduk', desc: 'Total warga terdaftar', icon: Users, color: 'bg-green-500/10 text-green-600' },
            { value: '4.077', suffix: 'Keluarga', label: 'Jumlah Keluarga', desc: 'Kepala Keluarga (KK)', icon: Heart, color: 'bg-rose-500/10 text-rose-600' },
            { value: '1.600,29', suffix: 'Ha', label: 'Luas Wilayah', desc: 'Bentang luas wilayah', icon: Leaf, color: 'bg-amber-500/10 text-amber-600' },
            { value: '8,17', suffix: 'Jiwa / Ha', label: 'Kepadatan Penduduk', desc: 'Rasio kepadatan pemukiman', icon: Compass, color: 'bg-sky-500/10 text-sky-600' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className={`p-5 rounded-2xl ${getContainerClass()} flex flex-col justify-between h-36 hover:translate-y-[-4px] transition-transform duration-300`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
                  <div className={`p-2 rounded-xl ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl md:text-3xl font-black font-mono tracking-tight">{stat.value}</span>
                    <span className="text-[10px] font-bold text-slate-400">{stat.suffix}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{stat.desc}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demographics Breakdowns (Religion & Marriage Status) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Religion Card */}
          <div className={`p-6 rounded-3xl ${getContainerClass()} space-y-5`}>
            <div className="flex items-center justify-between border-b border-slate-100/10 pb-3">
              <span className="text-xs font-black tracking-tight flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse"></span>
                Penduduk Berdasarkan Agama
              </span>
              <span className="text-[9px] font-mono bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded-md font-bold">13.070 Jiwa</span>
            </div>

            <div className="space-y-3.5">
              {[
                { name: 'Islam', count: 13066, pct: 99.97, color: 'bg-purple-500' },
                { name: 'Kristen', count: 4, pct: 0.03, color: 'bg-purple-400' },
                { name: 'Hindu', count: 0, pct: 0.00, color: 'bg-purple-300' },
                { name: 'Budha', count: 0, pct: 0.00, color: 'bg-purple-200' },
                { name: 'Konghucu', count: 0, pct: 0.00, color: 'bg-purple-100' },
                { name: 'Kepercayaan', count: 0, pct: 0.00, color: 'bg-purple-50' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-medium font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-sans">{item.name}</span>
                    <span className="text-slate-400">
                      <strong className="text-slate-700 dark:text-slate-200">{item.count.toLocaleString('id-ID')}</strong> ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marriage Status Card */}
          <div className={`p-6 rounded-3xl ${getContainerClass()} space-y-5`}>
            <div className="flex items-center justify-between border-b border-slate-100/10 pb-3">
              <span className="text-xs font-black tracking-tight flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500 animate-pulse"></span>
                Penduduk Berdasarkan Status
              </span>
              <span className="text-[9px] font-mono bg-sky-500/10 text-sky-500 px-2 py-0.5 rounded-md font-bold">13.070 Jiwa</span>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Kawin', count: 6391, pct: 48.90, color: 'bg-sky-500' },
                { name: 'Belum Kawin', count: 6144, pct: 47.01, color: 'bg-sky-400' },
                { name: 'Cerai Mati', count: 352, pct: 2.69, color: 'bg-sky-300' },
                { name: 'Cerai Hidup', count: 183, pct: 1.40, color: 'bg-sky-200' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-medium font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-sans">{item.name}</span>
                    <span className="text-slate-400">
                      <strong className="text-slate-700 dark:text-slate-200">{item.count.toLocaleString('id-ID')}</strong> ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className={`p-6 md:p-8 rounded-3xl ${getContainerClass()} flex flex-col justify-between`}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100/10">
              <div className="p-2 bg-green-500/10 text-green-600 rounded-xl">
                <Target className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-md font-black">Visi Desa</h3>
            </div>
            <div className="space-y-3">
              <p className={`text-xs ${getTextMutedClass()} leading-relaxed`}>
                Visi adalah suatu gambaran yang menantang tentang keadaan masa depan yang diinginkan dengan melihat potensi dan kebutuhan desa. Penyusunan Visi Desa Cibunian dilakukan dengan pendekatan partisipatif, melibatkan pihak-pihak yang berkepentingan di Desa Cibunian seperti pemerintah Desa, BPD, Tokoh Masyarakat, tokoh agama, lembaga masyarakat desa dan masyarakat desa pada umumnya. Pertimbangan kondisi eksternal di desa seperti satuan kerja wilayah pembangunan di Kecamatan.
              </p>
              <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/10 text-center">
                <p className="text-[10px] font-black tracking-widest text-green-500 uppercase">VISI UTAMA DESA</p>
                <p className="text-sm font-black text-slate-800 dark:text-white mt-1 leading-relaxed">
                  "MEWUJUDKAN DESA CIBUNIAN MAJU DAN BERKEADABAN"
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-100/10 pt-4">
            <span className="text-[9px] font-bold text-slate-400 uppercase block">Prinsip Pembangunan</span>
            <span className="text-xs font-bold text-green-500 mt-1 block">Kemajuan, Keadaban & Kebersamaan</span>
          </div>
        </div>

        <div className={`p-6 md:p-8 rounded-3xl ${getContainerClass()} space-y-4`}>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100/10">
            <div className="p-2 bg-green-500/10 text-green-600 rounded-xl">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <h3 className="text-md font-black">Misi Desa</h3>
          </div>
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {[
              'Meningkatkan kualitas kesejahteraan warga masyarakat yang berdaya saing.',
              'Memberikan pemenuhan segala hak-hak kebutuhan dasar warga masyarakat Desa Cibunian.',
              'Pembangunan yang terarah dan terencana serta berkesinambungan.',
              'Meningkatkan aktifitas keagamaan, budaya, sosial kemasyarakatan serta mendorong kegiatan ekstra kurikuler kepemudaan.',
              'Menyelenggarakan pemerintahan yang bersih dan transparan serta bertanggung jawab.',
              'Merancang Website Portal Berita Desa agar pembangunan desa lebih transparan kepada masyarakat Desa Cibunian maupun masyarakat luas.',
              'Membangun Kemitraan Pemerintah Swasta.',
              'Pemenuhan gizi ibu dan anak.'
            ].map((misi, idx) => (
              <div key={idx} className="flex gap-3 items-start text-xs font-medium text-slate-600 dark:text-slate-300">
                <span className="h-5 w-5 rounded-lg bg-green-500/10 text-green-500 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {idx + 1}
                </span>
                <p className="leading-relaxed pt-0.5">{misi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Struktur Organisasi Desa Cibunian
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Klik pejabat desa untuk melihat uraian tugas & kontak resmi</p>
          </div>
        </div>

        {/* Interactive Organizational Tree */}
        <div className="space-y-6 p-4 md:p-8 rounded-3xl bg-slate-50/50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5">
          
          {/* Level 1: Top Tier (BPD & Kepala Desa) */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 relative">
            {/* BPD Node */}
            <div className="flex flex-col items-center w-full max-w-xs">
              <span className="text-[9px] text-purple-500 font-bold uppercase tracking-widest mb-1.5 font-mono">Badan Permusyawaratan</span>
              {renderStaffNode('bpd')}
            </div>

            {/* Horizontal connection line on desktop */}
            <div className="hidden md:block w-16 h-0.5 bg-slate-200 dark:bg-white/10 shrink-0"></div>

            {/* Kades Node */}
            <div className="flex flex-col items-center w-full max-w-xs">
              <span className="text-[9px] text-green-500 font-bold uppercase tracking-widest mb-1.5 font-mono">Kepala Desa</span>
              {renderStaffNode('kades')}
            </div>
          </div>

          {/* Vertical line from Kades to Sekdes */}
          <div className="hidden md:flex justify-center">
            <div className="w-0.5 h-6 bg-slate-200 dark:bg-white/10"></div>
          </div>

          {/* Level 2: Sekretaris Desa */}
          <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-xs flex flex-col items-center">
              <span className="text-[9px] text-sky-500 font-bold uppercase tracking-widest mb-1.5 font-mono">Sekretariat Desa</span>
              {renderStaffNode('sekdes')}
            </div>
          </div>

          {/* Vertical line from Sekdes branching left and right */}
          <div className="hidden md:flex flex-col items-center">
            <div className="w-0.5 h-6 bg-slate-200 dark:bg-white/10"></div>
            <div className="w-1/2 h-0.5 bg-slate-200 dark:bg-white/10"></div>
            <div className="flex justify-between w-1/2">
              <div className="w-0.5 h-6 bg-slate-200 dark:bg-white/10"></div>
              <div className="w-0.5 h-6 bg-slate-200 dark:bg-white/10"></div>
            </div>
          </div>

          {/* Level 3: Divisions (KASI on Left, KAUR on Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 md:pt-0">
            
            {/* KASI Division (Left Side) */}
            <div className="space-y-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-white/5">
              <div className="text-center md:text-left mb-3">
                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Pelaksana Teknis (KASI)
                </span>
              </div>
              <div className="flex flex-col gap-3 items-center md:items-start">
                <div className="w-full max-w-xs">{renderStaffNode('kasi_pemerintahan')}</div>
                <div className="w-full max-w-xs">{renderStaffNode('kasi_kesra')}</div>
                
                {/* Kasi Pelayanan and its subordinated Staff */}
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  {renderStaffNode('kasi_pelayanan')}
                  
                  {/* Connected Staff Pelaksana Pelayanan */}
                  <div className="flex gap-2 items-center pl-6">
                    <div className="w-3 h-8 border-l-2 border-b-2 border-slate-200 dark:border-white/10 -mt-8 shrink-0"></div>
                    <div className="w-full">{renderStaffNode('staff_pelaksana_pelayanan')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* KAUR Division (Right Side) */}
            <div className="space-y-4 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-white/5">
              <div className="text-center md:text-right mb-3">
                <span className="bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Sekretariat (KAUR)
                </span>
              </div>
              <div className="flex flex-col gap-3 items-center md:items-end">
                <div className="w-full max-w-xs">{renderStaffNode('kaur_perencanaan')}</div>
                <div className="w-full max-w-xs">{renderStaffNode('kaur_keuangan')}</div>
                
                {/* Kaur Umum and its subordinated Staff */}
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  {renderStaffNode('kaur_umum')}
                  
                  {/* Connected Staff Pelaksana Umum */}
                  <div className="flex gap-2 items-center pl-6 md:pl-0 md:pr-6 md:flex-row-reverse">
                    <div className="w-3 h-8 border-l-2 border-b-2 md:border-l-0 md:border-r-2 border-slate-200 dark:border-white/10 -mt-8 shrink-0"></div>
                    <div className="w-full">{renderStaffNode('staff_pelaksana_umum')}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Level 4: Kepala Dusun (KADUS) */}
          <div className="border-t border-slate-200 dark:border-white/5 pt-6 space-y-4">
            <div className="text-center mb-3">
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                Pelaksana Kewilayahan (KADUS)
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
              {renderStaffNode('kadus_1')}
              {renderStaffNode('kadus_2')}
              {renderStaffNode('kadus_3')}
              {renderStaffNode('kadus_4')}
              {renderStaffNode('kadus_5')}
            </div>
          </div>

        </div>

        {/* Selected Staff drawer panel */}
        <AnimatePresence>
          {selectedStaff && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`rounded-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center ${getContainerClass()}`}
            >
              <div className="md:col-span-8 space-y-3">
                <h4 className="font-extrabold text-sm md:text-base flex items-center gap-2">
                  <Building className="h-4.5 w-4.5 text-green-500" />
                  Uraian Tugas: {staffList.find((s) => s.id === selectedStaff)?.role}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {staffList.find((s) => s.id === selectedStaff)?.desc}
                </p>
                <p className={`text-xs leading-relaxed font-semibold italic p-3 rounded-xl border ${getSubCardClass()}`}>
                  "{staffList.find((s) => s.id === selectedStaff)?.quote}"
                </p>
              </div>

              <div className={`md:col-span-4 p-4 rounded-xl space-y-2.5 ${getSubCardClass()}`}>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">KOTAK HUBUNGI</span>
                
                <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 font-medium font-mono">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{staffList.find((s) => s.id === selectedStaff)?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>Kantor Desa Cibunian</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* History Timeline Section */}
      <section className={`p-6 md:p-8 rounded-3xl ${getContainerClass()} space-y-6`}>
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100/10">
          <div className="p-2 bg-green-500/10 text-green-600 rounded-xl">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">Sejarah Singkat Desa</h2>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Asal-Usul & Perjalanan Administratif Desa Cibunian</p>
          </div>
        </div>

        {/* Narrative Prose Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className={`${getSubCardClass()} p-6 rounded-2xl border lg:col-span-8 flex flex-col justify-between space-y-4`}>
            <div className="space-y-3">
              <span className="text-[9px] font-black tracking-widest text-green-500 uppercase">KISAH SEJARAH & LEGENDA</span>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                Desa Cibunian adalah salah satu dari 15 desa yang berada di wilayah Kecamatan Pamijahan, Kabupaten Bogor, Provinsi Jawa Barat. Jauh sebelum zaman kemerdekaan, Desa Cibunian memang sudah ada meskipun awalnya bukan berupa administrasi desa melainkan bentangan persawahan subur dan hutan belantara yang asri.
              </p>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                Konon menurut cerita turun-temurun masyarakat, penduduk mula-mula Desa Cibunian berasal dari daerah <strong className="text-slate-800 dark:text-white">Kuningan, Jawa Barat</strong>. Mereka melakukan perjalanan migrasi dan melarikan diri ke kawasan pegunungan ini karena teguh mempertahankan keyakinan lama dan tidak ingin memeluk agama Islam ketika Raja Syarif Hidayatullah berkuasa di tanah asalnya.
              </p>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                Pada masa penjajahan kolonial Belanda, Desa Cibunian masuk ke dalam wilayah administratif <strong className="text-slate-800 dark:text-white">Kecamatan Leuwiliang</strong>. Setelah Indonesia meraih kemerdekaannya, tata wilayah mengalami penyesuaian di mana Desa Cibunian masuk ke dalam <strong className="text-slate-800 dark:text-white">Kecamatan Cibungbulang</strong>. Tepat pada tahun <strong className="text-slate-800 dark:text-white">1995</strong>, Kecamatan Cibungbulang dimekarkan dan Desa Cibunian resmi menjadi bagian dari wilayah <strong className="text-slate-800 dark:text-white">Kecamatan Pamijahan</strong> hingga saat ini.
              </p>
            </div>
            <div className="border-t border-slate-100/10 pt-3 flex flex-wrap gap-2 items-center text-[10px] text-slate-400">
              <span className="font-bold uppercase tracking-wider text-green-500">Kata Kunci:</span>
              <span className="bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md font-semibold text-slate-600 dark:text-slate-300">Kuningan</span>
              <span className="bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md font-semibold text-slate-600 dark:text-slate-300">Leuwiliang</span>
              <span className="bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md font-semibold text-slate-600 dark:text-slate-300">Cibungbulang</span>
              <span className="bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md font-semibold text-slate-600 dark:text-slate-300">Pamijahan 1995</span>
            </div>
          </div>

          {/* Etymology Breakdown Box */}
          <div className="bg-gradient-to-br from-green-950 to-[#142316] text-white p-6 rounded-2xl border border-green-800/30 lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-black tracking-widest text-green-400 uppercase">ETIMOLOGI NAMA</span>
                <h4 className="text-xl font-black">Asal Kata Cibunian</h4>
              </div>
              <p className="text-xs text-green-200/90 leading-relaxed font-medium">
                Nama <strong className="text-white">Cibunian</strong> berasal dari bahasa Sunda yang luhur dan puitis, tersusun dari gabungan dua kata utama:
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-green-500/20 text-green-300 font-extrabold flex items-center justify-center text-xs shrink-0 font-mono">
                    Cai
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Air / Sumber Kehidupan</h5>
                    <p className="text-[10px] text-green-300">Melambangkan kelimpahan aliran air murni pegunungan.</p>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-green-500/20 text-green-300 font-extrabold flex items-center justify-center text-xs shrink-0 font-mono">
                    Bunian
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Bersembunyi / Tersembunyi</h5>
                    <p className="text-[10px] text-green-300">Melambangkan keasrian wilayah yang tenang dan damai.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-green-400/80 font-bold italic pt-4 mt-4 border-t border-white/10">
              "Cai Bunian — Air yang tersembunyi dalam kedamaian alam."
            </p>
          </div>
        </div>

        {/* Horizontal Milestone Cards */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Garis Waktu Administratif</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timelineEvents.map((ev, i) => (
              <div key={i} className={`relative space-y-2 bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-150/10 hover:-translate-y-1 transition-transform duration-300`}>
                <span className="text-2xl font-black text-green-500/20 font-mono block">
                  {ev.year}
                </span>
                <h4 className="font-extrabold text-xs">{ev.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-600" />
            Galeri Kegiatan & Keindahan Desa
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Visualisasi keindahan ekologi, pertanian, dan gotong royong Desa Cibunian</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryList.map((item, idx) => (
            <div 
              key={idx} 
              className={`group overflow-hidden rounded-2xl border shadow-xs hover:shadow-md transition-all duration-300 ${getContainerClass()}`}
            >
              <div className="relative h-44 overflow-hidden bg-slate-900 shrink-0">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white space-y-0.5">
                    <h5 className="font-extrabold text-xs">{item.title}</h5>
                    <p className="text-[9px] text-slate-200 font-medium">{item.desc}</p>
                  </div>
                </div>
              </div>
              <div className="p-3.5 space-y-0.5">
                <h4 className="font-extrabold text-xs text-slate-700 dark:text-slate-200">{item.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back Button and Footer message block */}
      <div className="text-center pt-4">
        <div className="text-xs text-slate-400 font-medium italic">
          © 2026 SIRAM Desa Cibunian | Kelola Sampah, Hasilkan Berkah, Wujudkan Desa Mandiri
        </div>
      </div>
    </div>
  );
}
