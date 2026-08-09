import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Lock, User as UserIcon, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { User } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username dan Password wajib diisi.');
      return;
    }

    // Get users from localStorage or fall back to default
    const existingUsersRaw = localStorage.getItem('sikomdig_users');
    let users = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

    // Fallback default admin if no users exist or update legacy admin name
    if (users.length === 0) {
      const defaultAdmin = { username: 'admin', name: 'Pengelola SIRAM', password: 'admin' };
      users.push(defaultAdmin);
      localStorage.setItem('sikomdig_users', JSON.stringify(users));
    } else {
      users = users.map((u: any) =>
        (u.name === 'Raihan Abdilah' || u.name === 'Pengelola SIKOMDIG') ? { ...u, name: 'Pengelola SIRAM' } : u
      );
      localStorage.setItem('sikomdig_users', JSON.stringify(users));
    }

    const foundUser = users.find(
      (u: any) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const sessionUser: User = {
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.username.toLowerCase() === 'admin' ? 'admin' : 'user',
      };
      localStorage.setItem('sikomdig_session', JSON.stringify(sessionUser));
      onLoginSuccess(sessionUser);
    } else {
      setError('Username atau Password salah. Gunakan admin/admin untuk uji coba.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password || !fullName) {
      setError('Semua bidang (Nama, Username, Password) wajib diisi.');
      return;
    }

    const existingUsersRaw = localStorage.getItem('sikomdig_users');
    let users = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

    const userExists = users.some((u: any) => u.username.toLowerCase() === username.toLowerCase());
    if (userExists) {
      setError('Username sudah terdaftar. Silakan gunakan username lain.');
      return;
    }

    const newUser = { username, name: fullName, password };
    users.push(newUser);
    localStorage.setItem('sikomdig_users', JSON.stringify(users));

    setSuccess('Pendaftaran berhasil! Silakan login.');
    setIsLogin(true);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-gray-200 flex items-center justify-center p-4 relative font-sans">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#131318] shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid md:grid-cols-12 min-h-[600px] border border-white/5"
      >
        {/* Left Side: Illustration / Welcome Panel */}
        <div className="md:col-span-5 bg-gradient-to-tr from-indigo-950 via-slate-900 to-[#131318] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden border-r border-white/5">
          {/* Subtle nature details overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent opacity-60" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-indigo-600/20 backdrop-blur-md rounded-2xl border border-indigo-500/30">
                <Leaf className="h-6 w-6 text-indigo-400 animate-pulse" />
              </div>
              <span className="font-bold tracking-wider text-xs uppercase text-indigo-300">SIRAM DESA</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
              Portal SIRAM Desa Cibunian
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
              Inovasi pengelolaan sampah organik, monitoring pupuk berkualitas, dan ketahanan pangan lestari berbasis pemberdayaan masyarakat.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-8 border-t border-white/5">
            <div className="flex flex-col gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
                <span className="text-slate-300">Monitoring Suhu, Kelembaban, & pH Komposter</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="text-slate-300">Pencatatan Distribusi Pupuk & Budidaya Maggot</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="text-slate-300">Desa Mandiri Sampah & Berkelanjutan</span>
              </div>
            </div>
            <div className="mt-8 text-xs text-indigo-400/60 font-mono">
              Kec. Pamijahan, Kab. Bogor
            </div>
          </div>
        </div>

        {/* Right Side: Credentials & Input Forms */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-[#0F0F12]">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Portal'}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {isLogin 
                ? 'Masukkan kredensial Anda untuk masuk ke sistem. Jika sudah pernah mendaftar di HP lain, langsung gunakan username & password Anda.' 
                : 'Pendaftaran akun baru SIRAM. Jika sudah pernah daftar di HP/perangkat lain, tidak perlu daftar lagi — cukup masuk via menu Masuk.'}
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs text-rose-400 font-medium"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-400 font-medium"
            >
              {success}
            </motion.div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pengelola SIRAM / Budi Santoso"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#131318] border border-white/10 rounded-2xl text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <UserIcon className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  autoCapitalize="none"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#131318] border border-white/10 rounded-2xl text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder={isLogin ? '••••••••' : 'Buat password aman'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-[#131318] border border-white/10 rounded-2xl text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <span className="text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-2.5 py-1 font-medium">
                  Uji Coba Admin: username <b className="font-mono text-white">admin</b>, password <b className="font-mono text-white">admin</b>
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 text-white rounded-2xl text-sm font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-[0.98] cursor-pointer"
            >
              {isLogin ? (
                <>
                  <LogIn className="h-4 w-4" />
                  <span>Masuk Aplikasi</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Daftar Akun</span>
                </>
              )}
            </button>
          </form>

          {/* Toggle Screen Option */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              {isLogin ? (
                <span>Belum punya akun? Daftar gratis di sini</span>
              ) : (
                <span>Sudah pernah daftar di HP/perangkat lain? Klik di sini untuk Masuk</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
