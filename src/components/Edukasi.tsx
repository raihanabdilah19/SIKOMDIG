import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  AlertOctagon,
  TrendingUp,
  Sprout,
  Droplet,
  Bug,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

interface EdukasiProps {
  setActiveTab: (tab: string) => void;
}

export default function Edukasi({ setActiveTab }: EdukasiProps) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Header */}
      <div className="text-center space-y-3 py-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 border border-green-100 text-green-600 rounded-full text-xs font-bold"
        >
          <GraduationCap className="h-4 w-4" />
          <span>KAMPANYE LINGKUNGAN DESA</span>
        </motion.div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
          Ayo Olah Sampah Jadi <span className="text-green-600">Kompos Bermanfaat!</span>
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Mengubah tumpukan sampah yang mencemari pemukiman menjadi berkah pupuk penyubur lahan tani dan pakan ternak produktif.
        </p>
      </div>

      {/* Why We Must Care & The Problem Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: The Threat */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white border border-rose-100/60 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-2xl pointer-events-none" />
          <div className="p-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl w-fit mb-6">
            <AlertOctagon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Dampak Penumpukan Sampah Organik</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            Sampah organik sisa makanan dan daun kering yang menumpuk tanpa pengelolaan menimbulkan pembusukan anaerobik. Hal ini melepaskan gas metana (CH₄) beracun, merusak sanitasi udara, mencemari sumber air bersih warga Desa Cibunian, dan memicu bencana banjir.
          </p>
          <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Bau menyengat mengganggu pemukiman padat warga.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Menjadi sarang nyamuk, lalat, dan bakteri pembawa penyakit pencernaan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Menyebabkan limpahan air lindi yang merusak pH kesuburan tanah pertanian.</span>
            </li>
          </ul>
        </motion.div>

        {/* Right Card: The Blessing */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-white border border-green-100/60 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-2xl pointer-events-none" />
          <div className="p-3 bg-green-50 text-green-600 border border-green-100 rounded-2xl w-fit mb-6">
            <Sprout className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Manfaat Nyata Pengolahan Kompos</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            Dengan mengolah sampah secara digital (SIKOMDIG), bahan organik tersebut dikonversi secara higienis menjadi humus kompos bernutrisi makro dan mikro tinggi. Tanah sawah kembali subur alami tanpa tergantung pupuk kimia sintetis yang mahal.
          </p>
          <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span>Memperbaiki agregat fisik tanah sawah agar gembur dan menyimpan air.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span>Meningkatkan unsur nitrogen, fosfor, kalium (NPK) alami tanah.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span>Menciptakan kemandirian pertanian pupuk organik bagi kelompok tani desa.</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* How SIKOMDIG Works Timeline */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="text-center space-y-1 max-w-md mx-auto">
          <h3 className="text-xl font-extrabold text-slate-800">Bagaimana SIKOMDIG Bekerja?</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Sistem terintegrasi yang mendigitalisasi pemantauan pengolahan pupuk desa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Pemilahan Sampah',
              desc: 'Warga memisahkan sampah organik sisa makanan, daun, dan sayuran di rumah.'
            },
            {
              step: '02',
              title: 'Pengolahan Komposter',
              desc: 'Limbah dimasukkan ke bak komposter digital berukuran besar di titik RW masing-masing.'
            },
            {
              step: '03',
              title: 'Monitoring IoT / Digital',
              desc: 'Suhu, pH, dan kelembaban dipantau di portal SIKOMDIG guna menjamin kematangan sempurna.'
            },
            {
              step: '04',
              title: 'Distribusi Tani',
              desc: 'Pupuk matang (Kompos & POC) didata dan diambil oleh kelompok tani melalui penjadwalan.'
            }
          ].map((item, idx) => (
            <div key={idx} className="relative space-y-3 bg-slate-50 p-5 rounded-2xl">
              <span className="text-3xl font-black text-green-600/30 font-mono block">
                {item.step}
              </span>
              <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Products Showcase & CTA */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-extrabold text-slate-800">Hasil Nyata Karya SIKOMDIG</h3>
          <p className="text-xs text-slate-500 font-medium">Tiga komoditas bernilai guna tinggi hasil olahan limbah desa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kompos Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="p-3 bg-green-50 text-green-600 border border-green-100 rounded-2xl w-fit">
                <Sprout className="h-5 w-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-800">Kompos Kering Organik</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Pupuk padat yang kaya akan humus mikroba tanah, sangat optimal diaplikasikan sebagai media tanam padi sawah, jagung, perkebunan alpukat, dan hortikultura.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('kompos')}
              className="flex items-center justify-between text-xs font-bold text-green-600 hover:text-green-700 transition-colors w-full pt-3 border-t border-slate-50 cursor-pointer group"
            >
              <span>Pelajari Pembuatan Kompos</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* POC Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="p-3 bg-sky-50 text-sky-600 border border-sky-100 rounded-2xl w-fit">
                <Droplet className="h-5 w-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-800">Pupuk Organik Cair (POC)</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Suplemen cair konsentrat tinggi yang disemprotkan ke daun atau disiramkan ke perakaran tanaman. Meningkatkan daya serap hara, ketahanan buah, dan klorofil daun.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('cair')}
              className="flex items-center justify-between text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors w-full pt-3 border-t border-slate-50 cursor-pointer group"
            >
              <span>Pelajari Formula POC</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Maggot Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="p-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl w-fit">
                <Bug className="h-5 w-5" />
              </div>
              <h4 className="text-base font-extrabold text-slate-800">Budidaya Maggot BSF</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Larva lalat ramah lingkungan (Hermetia illucens) yang mengkonsumsi limbah organik dapur sangat cepat, menghasilkan pakan ternak ayam & ikan tinggi protein.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('maggot')}
              className="flex items-center justify-between text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors w-full pt-3 border-t border-slate-50 cursor-pointer group"
            >
              <span>Pelajari Siklus Maggot</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Impact / Success Story */}
      <div className="bg-gradient-to-tr from-green-800 to-emerald-700 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/15 via-transparent to-transparent opacity-50" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-300" />
            <span className="text-[10px] font-bold tracking-widest text-green-200 uppercase">DAMPAK NYATA LINGKUNGAN</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight">Sudah 4,3 Ton Sampah Organik Terselamatkan!</h3>
          <p className="text-xs text-green-50/90 leading-relaxed max-w-xl font-light">
            Sejak diluncurkan pada tahun 2026, SIKOMDIG telah mendampingi puluhan rukun tetangga mengelola komposter dengan rapi. Lingkungan bersih bebas bau, petani mandiri berkat pupuk gratis berkualitas tinggi!
          </p>
        </div>

        <button
          onClick={() => setActiveTab('jadwal')}
          className="px-6 py-3 bg-white text-green-700 hover:bg-green-55 rounded-2xl text-xs font-bold transition-all relative z-10 shrink-0 flex items-center gap-2 shadow-xl shadow-green-950/20 active:scale-[0.98] cursor-pointer"
        >
          <span>Jadwalkan Pengambilan Pupuk</span>
          <ArrowRight className="h-4 w-4 text-green-700" />
        </button>
      </div>
    </div>
  );
}
