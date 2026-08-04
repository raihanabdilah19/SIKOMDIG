import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout,
  ChevronDown,
  CheckCircle,
  HelpCircle,
  Info,
  Droplet,
  Trash2,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';

export default function KomposModule() {
  // Store open state for each of the 8 sections
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
    } catch (e) {
      // fallback
    }
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

  // Theme-based class configurations to ensure perfect readability and contrast
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
        return 'hover:bg-white/5 text-indigo-400';
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
        return 'text-zinc-100 leading-relaxed text-xs md:text-sm font-medium';
      case 'nature':
        return 'text-slate-950 leading-relaxed text-xs md:text-sm font-medium';
      default:
        return 'text-slate-950 leading-relaxed text-xs md:text-sm font-medium';
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
        return 'bg-indigo-950/60 border border-indigo-400/30 text-indigo-100 p-4 rounded-2xl';
      case 'nature':
        return 'bg-green-50 border border-green-200 text-green-950 p-4 rounded-2xl';
      default:
        return 'bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded-2xl';
    }
  };

  const getStepBoxClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#181825] border-l-6 border-indigo-400 p-5 rounded-r-2xl space-y-3';
      case 'nature':
        return 'bg-[#dfebd6] border-l-6 border-[#2ecc71] p-5 rounded-r-2xl space-y-3';
      default:
        return 'bg-emerald-50 border-l-6 border-emerald-600 p-5 rounded-r-2xl space-y-3';
    }
  };

  const getStepTitleClass = () => {
    switch (theme) {
      case 'dark':
        return 'font-black text-indigo-200 text-xs md:text-sm uppercase tracking-wide';
      case 'nature':
        return 'font-black text-green-950 text-xs md:text-sm uppercase tracking-wide';
      default:
        return 'font-black text-emerald-950 text-xs md:text-sm uppercase tracking-wide';
    }
  };

  const getStepTextClass = () => {
    switch (theme) {
      case 'dark':
        return 'text-zinc-100 text-xs md:text-sm leading-relaxed font-medium';
      case 'nature':
        return 'text-slate-950 text-xs md:text-sm leading-relaxed font-medium';
      default:
        return 'text-slate-950 text-xs md:text-sm leading-relaxed font-medium';
    }
  };

  const sections = [
    {
      id: 0,
      emoji: '🌱',
      title: '1. Pengertian Pupuk Kompos',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Pupuk kompos adalah salah satu bentuk pupuk organik yang dihasilkan melalui proses penguraian bahan-bahan organik
            secara alami oleh mikroorganisme seperti bakteri, jamur, cacing tanah, dan organisme pengurai lainnya. Bahan organik
            yang digunakan dalam pembuatan kompos dapat berasal dari sisa-sisa makhluk hidup seperti daun kering, ranting pohon,
            rumput, sisa sayuran, kulit buah, sisa makanan rumah tangga, hingga limbah pertanian yang sudah tidak terpakai.
          </p>
          <p className={getParagraphClass()}>
            Proses perubahan bahan organik menjadi kompos disebut dekomposisi atau pengomposan. Proses ini terjadi karena adanya
            aktivitas mikroorganisme yang memecah senyawa organik kompleks menjadi senyawa yang lebih sederhana sehingga akhirnya
            menghasilkan material baru yang menyerupai tanah berwarna gelap, bertekstur remah, tidak berbau menyengat, dan kaya
            akan unsur hara penting bagi tanaman.
          </p>
          
          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src="/input_file_0.png" 
              alt="Dekomposisi Bahan Organik" 
              className="w-full max-h-[380px] object-cover hover:scale-101 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 1: Pengertian Pupuk Kompos - Media informasi dekomposisi organik
            </div>
          </div>

          <p className={getParagraphClass()}>
            Dalam prosesnya, pengomposan membutuhkan kondisi lingkungan yang ideal seperti adanya oksigen (aerasi yang cukup),
            kelembaban yang seimbang, serta suhu yang stabil. Jika kondisi ini terpenuhi, maka proses penguraian akan berjalan
            lebih cepat dan menghasilkan kompos berkualitas tinggi. Sebaliknya, jika kondisi tidak seimbang seperti terlalu basah
            atau kurang udara, maka proses dapat melambat bahkan menimbulkan bau tidak sedap.
          </p>
          <p className={getParagraphClass()}>
            Secara ilmiah, kompos mengandung berbagai unsur hara makro dan mikro seperti nitrogen (N), fosfor (P), kalium (K),
            kalsium, magnesium, dan unsur lainnya yang sangat dibutuhkan oleh tanaman untuk tumbuh secara optimal. Kandungan ini
            membuat kompos menjadi salah satu alternatif pupuk yang sangat ramah lingkungan dan berkelanjutan dibandingkan pupuk
            kimia sintetis yang berpotensi merusak struktur tanah jika digunakan terus-menerus.
          </p>
          <p className={getParagraphClass()}>
            Pupuk kompos juga memiliki peran penting dalam memperbaiki struktur tanah. Tanah yang keras dan padat dapat menjadi
            lebih gembur dan subur setelah diberikan kompos secara rutin. Hal ini terjadi karena kompos meningkatkan kemampuan
            tanah dalam menyerap air, menyimpan nutrisi, serta meningkatkan aktivitas mikroorganisme tanah yang bermanfaat.
          </p>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src="/input_file_0.png" 
              alt="Manfaat Pupuk Kompos" 
              className="w-full max-h-[420px] object-contain bg-white hover:scale-[1.02] transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar: Manfaat Pupuk Kompos Bagi Kelestarian Lingkungan dan Pertanian
            </div>
          </div>

          <p className={getParagraphClass()}>
            Selain manfaat terhadap tanah, penggunaan kompos juga memberikan dampak besar terhadap lingkungan. Dengan mengolah
            sampah organik menjadi kompos, jumlah sampah yang dibuang ke tempat pembuangan akhir (TPA) dapat berkurang secara
            signifikan. Hal ini membantu mengurangi pencemaran lingkungan, mengurangi bau tidak sedap, serta mengurangi emisi gas
            metana yang dihasilkan dari pembusukan sampah organik secara tidak terkontrol.
          </p>
          <p className={getParagraphClass()}>
            Dari perspektif keberlanjutan, pupuk kompos merupakan solusi sederhana namun sangat efektif dalam mendukung konsep
            ekonomi sirkular, yaitu mengubah limbah menjadi sumber daya yang memiliki nilai guna. Dalam konteks masyarakat desa,
            penerapan kompos dapat membantu menciptakan kemandirian pupuk, menekan biaya pertanian, serta meningkatkan hasil panen
            secara alami.
          </p>
          <p className={getParagraphClass()}>
            Lebih jauh lagi, pupuk kompos juga memiliki peran edukatif dalam membangun kesadaran masyarakat terhadap pentingnya
            pengelolaan sampah berbasis rumah tangga. Dengan membiasakan diri memilah dan mengolah sampah organik, masyarakat
            tidak hanya menjaga kebersihan lingkungan, tetapi juga turut berkontribusi dalam menjaga keseimbangan ekosistem.
          </p>
          <p className={`font-semibold border-l-4 border-green-500 pl-3 py-2 rounded-r-xl ${
            theme === 'dark' ? 'bg-indigo-950/20 text-indigo-200' : 'bg-green-50/50 text-slate-800'
          }`}>
            Dengan demikian, dapat disimpulkan bahwa pupuk kompos bukan hanya sekadar hasil olahan sampah organik, tetapi merupakan
            bentuk inovasi sederhana yang memiliki dampak besar terhadap pertanian, lingkungan, ekonomi, dan keberlanjutan hidup
            manusia di masa depan. Kompos adalah bukti bahwa sesuatu yang dianggap tidak berguna dapat diubah menjadi sumber
            kehidupan baru yang sangat bermanfaat.
          </p>
        </div>
      )
    },
    {
      id: 1,
      emoji: '🌿',
      title: '2. Manfaat Pupuk Kompos',
      content: (
        <div className="space-y-6">
          <p className={getParagraphClass()}>
            Pupuk kompos merupakan salah satu bentuk pupuk organik yang sangat penting dalam dunia pertanian modern maupun tradisional. Kompos dihasilkan dari proses penguraian bahan-bahan organik seperti daun kering, sisa makanan, rumput, jerami, dan limbah organik lainnya oleh mikroorganisme seperti bakteri, jamur, dan cacing tanah. Proses ini menghasilkan material menyerupai tanah yang kaya akan unsur hara dan sangat bermanfaat bagi kesuburan tanah.
          </p>
          <p className={getParagraphClass()}>
            Dalam beberapa tahun terakhir, penggunaan pupuk kompos semakin dianjurkan karena mampu menjadi solusi atas berbagai masalah lingkungan, seperti penumpukan sampah organik, penurunan kualitas tanah akibat pupuk kimia, serta rendahnya kesadaran pengelolaan limbah rumah tangga. Oleh karena itu, memahami manfaat pupuk kompos menjadi sangat penting bagi masyarakat, pelajar, maupun petani.
          </p>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src="/input_file_1.png" 
              alt="Proses pembuatan kompos" 
              className="w-full max-h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 2: Manfaat Pupuk Kompos - Solusi Alami Menjaga Kelestarian Lingkungan
            </div>
          </div>

          <div className="space-y-5">
            <div className={`${theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-100'} p-5 rounded-2xl border`}>
              <h4 className={`${getHeadingClass()} flex items-center gap-2 mb-2`}>
                <span>🌱</span> 1. Menyuburkan Tanah Secara Alami
              </h4>
              <p className={getParagraphClass()}>
                Salah satu manfaat utama pupuk kompos adalah kemampuannya dalam menyuburkan tanah secara alami. Kompos mengandung unsur hara penting seperti nitrogen (N), fosfor (P), dan kalium (K) yang sangat dibutuhkan oleh tanaman. Selain itu, kompos juga memperbaiki struktur tanah sehingga menjadi lebih gembur dan mudah diolah.
              </p>
              <p className={`${getParagraphClass()} mt-2`}>
                Tanah yang diberi kompos akan memiliki kehidupan mikroorganisme yang lebih aktif. Mikroorganisme ini membantu proses penguraian bahan organik lebih lanjut dan menjaga keseimbangan nutrisi di dalam tanah. Dengan demikian, tanaman dapat tumbuh lebih sehat, kuat, dan tahan terhadap penyakit.
              </p>
              <div className={`mt-3 ${getHighlightBoxClass()} font-bold text-xs`}>
                💡 Tanah yang sehat = Tanaman yang kuat dan produktif
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-100'} p-5 rounded-2xl border`}>
              <h4 className={`${getHeadingClass()} flex items-center gap-2 mb-2`}>
                <span>💧</span> 2. Menambah Daya Serap Air Tanah
              </h4>
              <p className={getParagraphClass()}>
                Manfaat penting lainnya dari pupuk kompos adalah meningkatkan kemampuan tanah dalam menyerap dan menyimpan air. Kompos membuat struktur tanah menjadi lebih porous (berpori), sehingga air dapat masuk dan tersimpan lebih lama di dalam tanah.
              </p>
              <p className={`${getParagraphClass()} mt-2`}>
                Hal ini sangat bermanfaat terutama pada musim kemarau, karena tanaman tetap dapat memperoleh cadangan air yang cukup. Selain itu, tanah yang mampu menyerap air dengan baik juga dapat mengurangi risiko banjir akibat aliran air permukaan yang berlebihan.
              </p>
              
              <div className="my-4 overflow-hidden rounded-xl border border-black/10 dark:border-white/5 shadow-sm">
                <img 
                  src="/input_file_2.png" 
                  alt="Tanah menyerap air" 
                  className="w-full object-cover max-h-[300px]"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-black/40 backdrop-blur-md p-2 text-center text-white text-[10px] font-medium">
                  Gambar 3: Manfaat Pupuk Kompos - Membantu Tanah Menyerap & Mengunci Air Lebih Baik
                </div>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-100'} p-5 rounded-2xl border`}>
              <h4 className={`${getHeadingClass()} flex items-center gap-2 mb-2`}>
                <span>🌾</span> 3. Meningkatkan Hasil Pertanian
              </h4>
              <p className={getParagraphClass()}>
                Penggunaan pupuk kompos secara rutin terbukti dapat meningkatkan hasil pertanian. Tanaman yang tumbuh di tanah yang kaya kompos akan memiliki akar yang lebih kuat, daun yang lebih hijau, serta buah atau hasil panen yang lebih berkualitas.
              </p>
              <p className={`${getParagraphClass()} mt-2`}>
                Tidak hanya meningkatkan jumlah hasil panen, tetapi juga meningkatkan kualitasnya. Sayuran dan buah yang dihasilkan dari tanah berkompos cenderung lebih sehat, lebih alami, dan lebih aman untuk dikonsumsi karena bebas dari bahan kimia berbahaya.
              </p>
              
              <div className="my-4 overflow-hidden rounded-xl border border-black/10 dark:border-white/5 shadow-sm">
                <img 
                  src="/input_file_3.png" 
                  alt="Hasil panen segar" 
                  className="w-full object-cover max-h-[300px]"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-black/40 backdrop-blur-md p-2 text-center text-white text-[10px] font-medium">
                  Gambar 4: Manfaat Pupuk Kompos - Meningkatkan Hasil dan Kualitas Panen Tani
                </div>
              </div>

              <div className={`mt-3 ${
                theme === 'dark' ? 'bg-indigo-950/40 border border-indigo-500/20 text-indigo-300' : 'bg-sky-50 border border-sky-100 text-sky-700'
              } p-4 rounded-xl text-xs font-bold`}>
                🌾 Pertanian sehat dimulai dari tanah yang sehat
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-100'} p-5 rounded-2xl border`}>
              <h4 className={`${getHeadingClass()} flex items-center gap-2 mb-2`}>
                <span>♻</span> 4. Mengurangi Sampah Rumah Tangga
              </h4>
              <p className={getParagraphClass()}>
                Salah satu manfaat terbesar pupuk kompos dalam kehidupan sehari-hari adalah kemampuannya mengurangi sampah organik rumah tangga. Sisa makanan, daun kering, kulit buah, dan limbah dapur lainnya sering kali dibuang begitu saja.
              </p>
              <p className={`${getParagraphClass()} mt-2`}>
                With membuat kompos, sampah tersebut dapat diolah menjadi sesuatu yang bermanfaat. Hal ini tidak hanya mengurangi volume sampah yang dibuang ke tempat pembuangan akhir (TPA), tetapi juga membantu mengurangi pencemaran lingkungan.
              </p>
              
              <div className="my-4 overflow-hidden rounded-xl border border-black/10 dark:border-white/5 shadow-sm">
                <img 
                  src="/input_file_4.png" 
                  alt="Pengolahan sampah organik" 
                  className="w-full object-cover max-h-[300px]"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-black/40 backdrop-blur-md p-2 text-center text-white text-[10px] font-medium">
                  Gambar 5: Manfaat Pupuk Kompos - Pengurangan dan Daur Ulang Sampah Organik
                </div>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-100'} p-5 rounded-2xl border`}>
              <h4 className={`${getHeadingClass()} flex items-center gap-2 mb-2`}>
                <span>🚫</span> 5. Mengurangi Ketergantungan pada Pupuk Kimia
              </h4>
              <p className={getParagraphClass()}>
                Penggunaan pupuk kimia yang berlebihan dapat merusak struktur tanah dalam jangka panjang. Tanah menjadi keras, kurang subur, dan kehilangan mikroorganisme penting. Pupuk kompos hadir sebagai solusi alami untuk mengurangi ketergantungan tersebut.
              </p>
              <p className={`${getParagraphClass()} mt-2`}>
                Dengan mengganti sebagian pupuk kimia menggunakan kompos, tanah dapat tetap terjaga kesehatannya. Selain itu, biaya pertanian juga menjadi lebih hemat karena kompos dapat dibuat sendiri dari bahan-bahan yang mudah ditemukan di sekitar kita.
              </p>
              <div className={`mt-3 ${
                theme === 'dark' ? 'bg-indigo-950/40 border border-indigo-500/20 text-indigo-300' : 'bg-amber-50 border border-amber-100 text-amber-700'
              } p-4 rounded-xl text-xs font-bold`}>
                🚫 Semakin sedikit kimia, semakin sehat tanah jangka panjang
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-100'} p-5 rounded-2xl border`}>
              <h4 className={`${getHeadingClass()} flex items-center gap-2 mb-2`}>
                <span>🌍</span> Dampak Positif bagi Lingkungan
              </h4>
              <p className={getParagraphClass()}>
                Selain bermanfaat bagi tanaman, pupuk kompos juga memberikan dampak besar bagi lingkungan. Penggunaan kompos membantu menjaga keseimbangan ekosistem, mengurangi emisi gas rumah kaca dari sampah organik, serta mendukung konsep pertanian berkelanjutan.
              </p>
              <p className={`${getParagraphClass()} mt-2`}>
                Lingkungan yang dikelola dengan baik akan menciptakan kehidupan yang lebih sehat bagi manusia, hewan, dan tumbuhan. Oleh karena itu, penggunaan pupuk kompos bukan hanya pilihan, tetapi juga tanggung jawab bersama.
              </p>
              
              <div className="my-4 overflow-hidden rounded-xl border border-black/10 dark:border-white/5 shadow-sm">
                <img 
                  src="/input_file_4.png" 
                  alt="Lingkungan hijau" 
                  className="w-full object-cover max-h-[300px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          <div className={`${theme === 'dark' ? 'bg-indigo-950/20 border-white/5' : 'bg-green-50/50 border-green-100'} p-5 border rounded-2xl space-y-2`}>
            <h5 className={`${getHeadingClass()} flex items-center gap-1.5`}>
              <CheckCircle className="h-4.5 w-4.5 text-green-500" /> Kesimpulan Manfaat
            </h5>
            <p className={getParagraphClass()}>
              Pupuk kompos memiliki banyak manfaat yang sangat penting, mulai dari menyuburkan tanah, meningkatkan hasil pertanian, mengurangi sampah, hingga menjaga lingkungan tetap sehat. Dengan memanfaatkan limbah organik menjadi kompos, kita tidak hanya membantu diri sendiri tetapi juga berkontribusi terhadap kelestarian bumi.
            </p>
            <p className={`${getParagraphClass()} font-bold`}>
              Oleh karena itu, penggunaan pupuk kompos sangat dianjurkan dalam kehidupan sehari-hari, baik di rumah, sekolah, maupun dalam dunia pertanian modern.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      emoji: '🎥',
      title: '3. Video Tutorial Lengkap Kompos',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Simak video berikut untuk memahami cara membuat kompos dari nol:
          </p>
          
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-black/10 dark:border-white/5 bg-black">
            <iframe 
              src="https://www.youtube.com/embed/VKKvQYBpXIc" 
              title="Video Tutorial Pembuatan Kompos"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          </div>

          <p className={`${getParagraphClass()} italic text-center text-xs font-semibold`}>
            Video ini menjelaskan langkah praktis yang bisa langsung dipraktikkan di rumah.
          </p>
        </div>
      )
    },
    {
      id: 3,
      emoji: '🧺',
      title: '4. Bahan Pembuatan Kompos',
      content: (
        <div className="space-y-6">
          <p className={getParagraphClass()}>
            Pembuatan kompos merupakan salah satu cara sederhana untuk mengolah sampah organik menjadi pupuk yang bermanfaat bagi tanaman. 
            Kompos dibuat dari bahan-bahan alami yang mudah ditemukan di sekitar kita, seperti sisa dapur, daun kering, dan rumput.
            Dengan mengolah bahan-bahan ini, kita tidak hanya mengurangi sampah, tetapi juga membantu menjaga kesuburan tanah.
          </p>
          <p className={getParagraphClass()}>
            Agar kompos yang dihasilkan berkualitas baik, diperlukan campuran bahan yang seimbang antara bahan hijau (kaya nitrogen) dan bahan cokelat (kaya karbon). 
            Bahan hijau membantu mempercepat proses pembusukan, sedangkan bahan cokelat menjaga struktur kompos agar tidak terlalu basah dan tetap memiliki udara yang cukup.
          </p>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src="/input_file_5.png" 
              alt="Bahan Komposasi Organik" 
              className="w-full max-h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 6: Bahan Pembuatan Kompos - Pilihan Bahan Organik Cokelat & Hijau
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-emerald-50/20 border-emerald-100/60'
            }`}>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full inline-block mb-3 ${
                theme === 'dark' ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/20' : 'bg-emerald-100 text-emerald-800'
              }`}>
                🍂 Daun kering (Bahan Cokelat - Karbon)
              </span>
              <p className={getParagraphClass()}>
                Daun kering merupakan bahan utama dalam pembuatan kompos. Daun yang jatuh dari pohon mengandung karbon tinggi yang sangat penting untuk proses penguraian. 
                Selain itu, daun kering membantu menjaga kompos agar tidak terlalu lembek. Agar lebih cepat terurai, daun sebaiknya dicacah menjadi bagian kecil.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-emerald-50/20 border-emerald-100/60'
            }`}>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full inline-block mb-3 ${
                theme === 'dark' ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/20' : 'bg-emerald-100 text-emerald-800'
              }`}>
                🍚 Sisa makanan organik (Bahan Hijau - Nitrogen)
              </span>
              <p className={getParagraphClass()}>
                Sisa makanan seperti sayuran, kulit buah, and sisa nasi dapat digunakan sebagai bahan kompos karena mengandung nitrogen tinggi. 
                Bahan ini sangat baik untuk menyuburkan tanah. Namun, hindari sisa makanan berminyak, daging, atau makanan berlemak karena dapat menimbulkan bau tidak sedap.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-emerald-50/20 border-emerald-100/60'
            }`}>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full inline-block mb-3 ${
                theme === 'dark' ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/20' : 'bg-emerald-100 text-emerald-800'
              }`}>
                🌿 Rumput / jerami (Serat Tambahan)
              </span>
              <p className={getParagraphClass()}>
                Rumput segar dan jerami membantu menjaga kelembapan kompos sekaligus menambah unsur nitrogen. 
                Jerami juga membuat struktur kompos tetap longgar sehingga udara dapat masuk dengan baik. Hal ini sangat penting agar mikroorganisme dapat bekerja secara optimal.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-emerald-50/20 border-emerald-100/60'
            }`}>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full inline-block mb-3 ${
                theme === 'dark' ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/20' : 'bg-emerald-100 text-emerald-800'
              }`}>
                🪱 Tanah atau starter kompos (Inokulan)
              </span>
              <p className={getParagraphClass()}>
                Tanah atau starter kompos berfungsi sebagai sumber mikroorganisme yang mempercepat proses penguraian. 
                Biasanya digunakan EM4 atau kompos jadi yang sudah matang sebagai “pemicu” agar proses fermentasi berjalan lebih cepat dan tidak berbau.
              </p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border ${
            theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-emerald-50/20 border-emerald-100/60'
          }`}>
            <span className={`text-xs font-black px-2.5 py-1 rounded-full inline-block mb-3 ${
              theme === 'dark' ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/20' : 'bg-emerald-100 text-emerald-800'
            }`}>
              💧 Air bersih secukupnya
            </span>
            <p className={getParagraphClass()}>
              Air berfungsi menjaga kelembapan kompos. Kondisi ideal kompos adalah lembap seperti spons yang diperas. 
              Jika terlalu kering, proses penguraian melambat. Jika terlalu basah, kompos bisa menjadi busuk dan berbau tidak sedap. Oleh karena itu, air harus digunakan secukupnya saja.
            </p>
          </div>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src="/input_file_5.png" 
              alt="Daun kering di kebun" 
              className="w-full max-h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 6: Formasi Bahan Kompos Seimbang
            </div>
          </div>

          <p className={`${getParagraphClass()} font-semibold`}>
            Dengan memahami bahan-bahan tersebut, kita dapat membuat kompos yang baik, ramah lingkungan, dan bermanfaat untuk tanaman. 
            Pembuatan kompos juga menjadi langkah sederhana dalam mengurangi sampah rumah tangga dan mendukung kehidupan yang lebih hijau dan berkelanjutan.
          </p>
        </div>
      )
    },
    {
      id: 4,
      emoji: '⚙️',
      title: '5. Cara Membuat Kompos (STEP DETAIL)',
      content: (
        <div className="space-y-6">
          <p className={getParagraphClass()}>
            Membuat kompos merupakan salah satu cara paling sederhana, murah, dan ramah lingkungan untuk mengolah sampah organik menjadi pupuk alami yang sangat bermanfaat bagi kesuburan tanah. Proses ini bekerja melalui penguraian bahan organik oleh mikroorganisme seperti bakteri, jamur, dan organisme kecil lainnya yang secara alami mengubah sampah menjadi tanah yang kaya nutrisi. Berikut langkah-langkah lengkapnya:
          </p>

          <div className="space-y-4">
            <div className={getStepBoxClass()}>
              <h4 className={getStepTitleClass()}>
                1. Kumpulkan sampah organik rumah tangga
              </h4>
              <p className={getStepTextClass()}>
                Langkah pertama dalam membuat kompos adalah mengumpulkan bahan-bahan organik yang mudah terurai secara alami. Bahan ini biasanya berasal dari aktivitas sehari-hari di dapur dan halaman rumah, seperti sisa sayuran, kulit buah, daun kering, rumput, ampas kopi, teh celup, serta sisa makanan berbahan nabati.
              </p>
              <p className={getStepTextClass()}>
                Pengumpulan bahan ini sebaiknya dilakukan secara terpisah dari sampah anorganik. Sampah seperti plastik, kaca, logam, styrofoam, popok sekali pakai, dan minyak tidak boleh dicampurkan karena tidak dapat terurai dan dapat menghambat proses pengomposan. Bahkan, jika tercampur, kualitas kompos akan menurun dan bisa berbahaya bagi tanah.
              </p>
              <p className={`${getStepTextClass()} font-semibold`}>
                Semakin segar dan bervariasi bahan organik yang dikumpulkan, semakin baik hasil kompos yang akan dihasilkan. Kombinasi antara bahan basah (sisa sayur/buah) dan bahan kering (daun kering/rumput) juga sangat penting untuk menjaga keseimbangan proses penguraian.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <h4 className={getStepTitleClass()}>
                2. Cacah kecil agar cepat terurai
              </h4>
              <p className={getStepTextClass()}>
                Setelah bahan organik terkumpul, langkah selanjutnya adalah mencacah atau memotong bahan tersebut menjadi ukuran kecil, idealnya sekitar 1–5 cm. Tujuan utama dari proses ini adalah memperluas permukaan bahan agar mikroorganisme pengurai lebih mudah bekerja.
              </p>
              <p className={getStepTextClass()}>
                Bahan yang berukuran kecil akan lebih cepat mengalami proses dekomposisi karena panas yang dihasilkan lebih merata dan aktivitas bakteri menjadi lebih optimal. Sebaliknya, bahan yang besar akan membutuhkan waktu lebih lama untuk terurai.
              </p>
              <p className={`${getStepTextClass()} font-semibold`}>
                Untuk bahan seperti daun kering, sebaiknya diremas, dihancurkan, atau dicabik terlebih dahulu agar lebih mudah menyatu dengan bahan lain. Dengan cara ini, proses fermentasi akan berjalan lebih cepat dan efisien.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <h4 className={getStepTitleClass()}>
                3. Campurkan dengan tanah atau starter kompos
              </h4>
              <p className={getStepTextClass()}>
                Langkah berikutnya adalah mencancurkan bahan organik yang sudah dicacah dengan tanah atau starter kompos seperti EM4. Tanah mengandung mikroorganisme alami yang sangat penting dalam mempercepat proses penguraian.
              </p>
              <p className={`${getStepTextClass()} font-semibold`}>
                Jika menggunakan EM4, cairan ini biasanya dicampur dengan air dan sedikit gula untuk mengaktifkan bakteri pengurai. Campuran tersebut kemudian disemprotkan atau dituangkan secara merata ke seluruh bahan kompos. Proses pencampuran ini menentukan kualitas fermentasi keseluruhan.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <h4 className={getStepTitleClass()}>
                4. Masukkan ke dalam wadah komposter
              </h4>
              <p className={getStepTextClass()}>
                Setelah semua bahan tercampur dengan baik, langkah selanjutnya adalah memasukkannya ke dalam wadah komposter. Wadah ini bisa berupa ember berlubang, tong plastik, keranjang kompos, atau lubang tanah yang dibuat khusus.
              </p>
              <p className={getStepTextClass()}>
                Wadah komposter harus memiliki sirkulasi udara yang baik karena proses pengomposan membutuhkan oksigen (proses aerob). Tanpa oksigen yang cukup, kompos bisa menjadi bau dan prosesnya berubah menjadi anaerob yang kurang efektif.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <h4 className={getStepTitleClass()}>
                5. Jaga kelembaban (tidak terlalu basah)
              </h4>
              <p className={getStepTextClass()}>
                Kelembaban merupakan faktor penting dalam proses pembuatan kompos. Kondisi ideal kompos adalah lembab seperti spons yang diperas—tidak terlalu kering, tetapi juga tidak terlalu basah hingga meneteskan air.
              </p>
              <p className={getStepTextClass()}>
                Jika kompos terlalu kering, mikroorganisme tidak dapat bekerja secara maksimal sehingga proses menjadi lambat. Sebaliknya, jika terlalu basah, kompos bisa menjadi busuk, berbau tidak sedap, dan kekurangan oksigen.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <h4 className={getStepTitleClass()}>
                6. Aduk setiap 3–7 hari
              </h4>
              <p className={getStepTextClass()}>
                Pengadukan atau pembalikan kompos secara rutin sangat penting untuk menjaga sirkulasi udara di dalam tumpukan bahan. Oksigen diperlukan agar mikroorganisme tetap aktif dalam proses penguraian.
              </p>
              <p className={getStepTextClass()}>
                Selain itu, pengadukan juga membantu meratakan suhu dan kelembaban di seluruh bagian kompos sehingga proses fermentasi berjalan lebih merata dan cepat.
              </p>
            </div>

            <div className={getStepBoxClass()}>
              <h4 className={getStepTitleClass()}>
                7. Tunggu 3–4 minggu hingga matang
              </h4>
              <p className={getStepTextClass()}>
                Proses pengomposan membutuhkan waktu sekitar 3–4 minggu, tergantung jenis bahan, kelembaban, dan perawatan yang dilakukan. Selama proses ini, suhu kompos biasanya meningkat akibat aktivitas mikroorganisme, kemudian perlahan menurun saat kompos mulai matang.
              </p>
              <p className={`${getStepTextClass()} font-semibold`}>
                Kompos yang sudah matang memiliki ciri-ciri warna cokelat tua hingga hitam, tekstur remah seperti tanah, tidak berbau menyengat, dan tidak lagi terlihat bentuk asli sampah.
              </p>
            </div>
          </div>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1000" 
              alt="Mencampur Bahan Kompos" 
              className="w-full max-h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Ilustrasi: Petani sedang melakukan proses pencampuran bahan dan aktivator organik di lapangan
            </div>
          </div>

          <p className={`p-5 border rounded-2xl ${
            theme === 'dark' ? 'bg-[#181820] border-white/5 text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-700'
          }`}>
            Setelah kompos matang, pupuk alami ini dapat langsung digunakan untuk berbagai tanaman seperti sayuran, bunga, maupun tanaman buah. Penggunaan kompos secara rutin membantu meningkatkan kesuburan tanah, memperbaiki struktur tanah agar lebih gembur, serta meningkatkan kemampuan tanah dalam menyimpan air dan nutrisi. Dengan demikian, kompos menjadi solusi sederhana namun sangat efektif untuk mendukung lingkungan yang lebih sehat dan berkelanjutan.
          </p>
        </div>
      )
    },
    {
      id: 5,
      emoji: '🔬',
      title: '6. Proses Terbentuknya Kompos',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Proses penguraian terjadi oleh bakteri dan jamur yang mengubah bahan organik menjadi humus secara bertahap melalui fluktuasi suhu dan populasi biologi tanah.
          </p>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src="/input_file_6.PNG" 
              alt="Tahapan Proses Pengomposan" 
              className="w-full max-h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 7: Diagram Alir Proses Terbentuknya Kompos Organik Secara Bertahap
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className={`flex gap-4 p-4 border rounded-2xl items-center ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-100'
            }`}>
              <span className={`font-black px-2.5 py-1 rounded-xl text-[10px] ${
                theme === 'dark' ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/20' : 'bg-green-100 text-green-800'
              }`}>Hari 1–7</span>
              <p className={getParagraphClass()}>Pemanasan awal (Bakteri Mesofilik berkembang biak secara eksponensial di suhu hangat)</p>
            </div>
            
            <div className={`flex gap-4 p-4 border rounded-2xl items-center ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-100'
            }`}>
              <span className={`font-black px-2.5 py-1 rounded-xl text-[10px] ${
                theme === 'dark' ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/20' : 'bg-green-100 text-green-800'
              }`}>Hari 7–14</span>
              <p className={getParagraphClass()}>Penguraian aktif (Suhu tinggi 50-65°C, bakteri Termofilik mengurai lignin & selulosa)</p>
            </div>

            <div className={`flex gap-4 p-4 border rounded-2xl items-center ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-100'
            }`}>
              <span className={`font-black px-2.5 py-1 rounded-xl text-[10px] ${
                theme === 'dark' ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/20' : 'bg-green-100 text-green-800'
              }`}>Hari 14–30</span>
              <p className={getParagraphClass()}>Proses pematangan (Suhu menurun kembali ke normal, humus gelap terbentuk sempurna bebas pathogen)</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      emoji: '📌',
      title: '7. Ciri Kompos Matang',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Untuk memastikan keamanan penggunaan kompos pada tanaman hias ataupun perkebunan, kenali 4 tanda fisik kompos yang telah matang sempurna berikut ini:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-4 border rounded-2xl flex items-start gap-3.5 ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-150'
            }`}>
              <span className="text-emerald-500 font-black text-lg select-none mt-0.5">✔</span>
              <div>
                <h5 className={getHeadingClass()}>Warna Cokelat Kehitaman</h5>
                <p className={`${getParagraphClass()} text-xs mt-1`}>Gelap pekat menyerupai tanah humus hutan subur asli, mengindikasikan kandungan zat humat tinggi.</p>
              </div>
            </div>

            <div className={`p-4 border rounded-2xl flex items-start gap-3.5 ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-150'
            }`}>
              <span className="text-emerald-500 font-black text-lg select-none mt-0.5">✔</span>
              <div>
                <h5 className={getHeadingClass()}>Tidak Berbau Busuk</h5>
                <p className={`${getParagraphClass()} text-xs mt-1`}>Tidak beraroma amonia ataupun sulfur busuk, melainkan harum segar khas tanah basah berhutan.</p>
              </div>
            </div>

            <div className={`p-4 border rounded-2xl flex items-start gap-3.5 ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-150'
            }`}>
              <span className="text-emerald-500 font-black text-lg select-none mt-0.5">✔</span>
              <div>
                <h5 className={getHeadingClass()}>Tekstur Remah & Gembur</h5>
                <p className={`${getParagraphClass()} text-xs mt-1`}>Bertekstur remah lembut dan tidak lengket atau berbentuk gumpalan liat yang keras.</p>
              </div>
            </div>

            <div className={`p-4 border rounded-2xl flex items-start gap-3.5 ${
              theme === 'dark' ? 'bg-[#181820] border-white/5' : 'bg-slate-50 border-slate-150'
            }`}>
              <span className="text-emerald-500 font-black text-lg select-none mt-0.5">✔</span>
              <div>
                <h5 className={getHeadingClass()}>Suhu Stabil Sesuai Ruang</h5>
                <p className={`${getParagraphClass()} text-xs mt-1`}>Suhu stabil mendekati suhu ruang sekitar (25°C-30°C) dan tidak terasa hangat lagi saat disentuh langsung.</p>
              </div>
            </div>
          </div>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src="/input_file_7.PNG" 
              alt="Ciri Kompos Matang Siap Pakai" 
              className="w-full max-h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Gambar 8: Tanda Fisik Utama Pupuk Kompos yang Telah Matang Sempurna & Siap Digunakan
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      emoji: '🚀',
      title: '8. Kesimpulan',
      content: (
        <div className="space-y-5">
          <p className={getParagraphClass()}>
            Pembuatan kompos merupakan salah satu langkah sederhana namun memiliki dampak yang sangat besar bagi kehidupan manusia dan lingkungan. Dengan memanfaatkan sampah organik seperti sisa makanan, daun kering, dan limbah dapur, kita sebenarnya sedang melakukan proses daur ulang alami yang sangat bermanfaat. Sampah yang sebelumnya dianggap tidak berguna, justru dapat diubah menjadi sesuatu yang bernilai tinggi yaitu pupuk kompos.
          </p>
          <p className={getParagraphClass()}>
            Melalui proses pengomposan, kita tidak hanya membantu mengurangi jumlah sampah yang menumpuk di tempat pembuangan akhir, tetapi juga berkontribusi dalam mengurangi pencemaran lingkungan, mengurangi bau tidak sedap, serta menekan emisi gas rumah kaca yang dihasilkan dari pembusukan sampah organik secara tidak terkelola. Hal ini menunjukkan bahwa tindakan kecil di rumah dapat memberikan dampak besar bagi bumi kita.
          </p>
          <p className={getParagraphClass()}>
            Selain itu, kompos yang dihasilkan memiliki banyak manfaat bagi pertanian. Tanah menjadi lebih subur, gembur, dan mampu menyimpan air lebih baik. Tanaman pun dapat tumbuh lebih sehat tanpa harus bergantung pada pupuk kimia yang berlebihan. Dengan demikian, penggunaan kompos juga mendukung terciptanya pertanian yang lebih ramah lingkungan dan berkelanjutan.
          </p>
          <p className={getParagraphClass()}>
            Lebih jauh lagi, kebiasaan membuat kompos dapat membentuk pola pikir masyarakat yang lebih peduli terhadap lingkungan. Kesadaran ini sangat penting untuk diwariskan kepada generasi muda agar mereka tumbuh menjadi generasi yang bertanggung jawab dalam menjaga bumi. Jika setiap rumah tangga mulai menerapkan pengolahan sampah organik, maka perubahan besar akan terjadi secara perlahan namun pasti.
          </p>
          
          <div className={`p-5 border rounded-2xl space-y-3 mt-3 ${
            theme === 'dark' ? 'bg-indigo-950/20 border-indigo-500/10' : 'bg-[#e8fff3] border-green-200/50'
          }`}>
            <p className={`font-semibold text-xs md:text-sm ${theme === 'dark' ? 'text-indigo-200' : 'text-slate-800'}`}>
              🌱 Oleh karena itu, mari kita mulai dari diri sendiri, dari rumah kita masing-masing. Jangan lagi menganggap sampah organik sebagai masalah, tetapi lihatlah sebagai peluang untuk menciptakan sesuatu yang bermanfaat. Mulailah memilah sampah, mengolahnya menjadi kompos, dan mengajak keluarga serta lingkungan sekitar untuk melakukan hal yang sama.
            </p>
            <p className={`font-semibold text-xs md:text-sm ${theme === 'dark' ? 'text-indigo-400' : 'text-[#1e7d4f]'}`}>
              💚 Dengan langkah kecil yang kita lakukan hari ini, kita sedang membangun masa depan yang lebih bersih, lebih hijau, dan lebih sehat. Jadilah bagian dari perubahan ini. Karena bumi yang lebih baik bukan hanya harapan, tetapi tanggung jawab kita bersama.
            </p>
          </div>

          <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1000" 
              alt="Lingkungan Desa Hijau dan Bersih" 
              className="w-full max-h-[380px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="bg-black/40 backdrop-blur-md p-3 text-center text-white text-[11px] font-medium border-t border-white/5">
              Ilustrasi: Lahan budidaya tani desa yang hijau, sehat, dan ramah lingkungan lestari
            </div>
          </div>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero section */}
      <div className={`border rounded-3xl p-8 md:p-12 relative overflow-hidden text-center shadow-md ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-indigo-950/20 via-[#131318] to-purple-950/15 border-white/5' 
          : 'bg-gradient-to-br from-[#e8fff3]/40 to-[#dff6ff]/30 border-green-100'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className={`mx-auto h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm border ${
            theme === 'dark' ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-400' : 'bg-green-50 border-green-100 text-[#1e7d4f]'
          }`}>
            <Sprout className="h-6 w-6 animate-pulse" />
          </div>
          
          <h1 className={`text-2xl md:text-4xl font-black tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-[#1e7d4f]'
          }`}>
            ♻️ MODUL LENGKAP PUPUK KOMPOS
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto font-medium leading-relaxed ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Belajar lengkap mulai dari pengertian, manfaat, bahan, proses, hingga praktik membuat kompos dengan video tutorial dan panduan langkah demi langkah secara mendalam.
          </p>
        </div>
      </div>

      {/* Accordion container */}
      <div className="space-y-5">
        {sections.map((sec) => {
          const isOpen = !!openSections[sec.id];
          return (
            <div
              key={sec.id}
              className={`rounded-3xl overflow-hidden transition-all duration-200 ${getAccordionContainerClass()}`}
            >
              <button
                onClick={() => toggleSection(sec.id)}
                className={`w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer transition-colors ${getHeaderHoverClass()}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl md:text-2xl select-none">{sec.emoji}</span>
                  <h3 className={`font-black text-sm md:text-base ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {sec.title}
                  </h3>
                </div>

                <div className={`h-8 w-8 rounded-full flex items-center justify-center border transition-transform duration-200 ${
                  theme === 'dark' 
                    ? 'border-white/10 text-slate-400 bg-white/5' 
                    : 'border-slate-100 text-slate-500 bg-slate-50'
                } ${isOpen ? 'rotate-180 text-emerald-500 border-emerald-500/30' : ''}`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className={`p-6 pt-2 ${getContentBgClass()}`}>
                      {sec.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
