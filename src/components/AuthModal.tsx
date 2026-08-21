import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  BookOpen, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Phone,
  HelpCircle,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';
import { loginUser, registerUser, loginAdmin } from '../services/supabaseService';
import { LogoBadge } from './LogoBadge';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: UserProfile, message?: string) => void;
  onAuthSuccess?: (user: UserProfile, message?: string) => void;
  initialMode?: 'user_login' | 'user_register' | 'admin_login';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onAuthSuccess,
  initialMode = 'user_login',
}) => {
  const [authMode, setAuthMode] = useState<'user_login' | 'user_register' | 'admin_login'>(initialMode);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('Dusun Krajan');
  const [schoolOrAffiliation, setSchoolOrAffiliation] = useState('Warga Batursari');
  const [rememberMe, setRememberMe] = useState(true);
  const [adminPin, setAdminPin] = useState('');

  // Forgot password dialog
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Loading & feedback states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync mode when initialMode prop changes
  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      setErrorMessage('');
      setShowForgotPassword(false);
      setForgotSent(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setVillage('Dusun Krajan');
    setSchoolOrAffiliation('Warga Batursari');
    setAdminPin('');
    setErrorMessage('');
    setShowForgotPassword(false);
  };

  const handleModeChange = (mode: 'user_login' | 'user_register' | 'admin_login') => {
    setAuthMode(mode);
    setErrorMessage('');
    setShowForgotPassword(false);
  };

  // Safe Unified Auth Success Callback
  const handleAuthDone = (user: UserProfile, message: string) => {
    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess(user, message);
    }
    if (typeof onAuthSuccess === 'function') {
      onAuthSuccess(user, message);
    }
    onClose();
    resetForm();
  };

  // User Login Submit
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Silakan isi email dan kata sandi Anda.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const result = await loginUser(email, password);
      if (result.success && result.user) {
        handleAuthDone(result.user, result.message);
      } else {
        setErrorMessage(result.message || 'Email atau kata sandi tidak cocok. Silakan periksa kembali.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi gangguan saat menghubungkan ke sistem.');
    } finally {
      setLoading(false);
    }
  };

  // User Register Submit
  const handleUserRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage('Mohon lengkapi seluruh kolom formulir pendaftaran.');
      return;
    }

    if (password.length < 5) {
      setErrorMessage('Kata sandi minimal 5 karakter demi keamanan akun Anda.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const fullAffiliation = phone.trim() ? `${schoolOrAffiliation} (WA: ${phone.trim()})` : schoolOrAffiliation;
      const result = await registerUser(name, email, password, village, fullAffiliation);
      if (result.success && result.user) {
        handleAuthDone(result.user, result.message);
      } else {
        setErrorMessage(result.message || 'Pendaftaran tidak berhasil. Silakan coba lagi.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi gangguan sistem saat pendaftaran.');
    } finally {
      setLoading(false);
    }
  };

  // Admin PIN Login Submit
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPin.trim()) {
      setErrorMessage('Masukkan PIN atau kata sandi akses administrator.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const result = await loginAdmin(adminPin);
      if (result.success && result.user) {
        handleAuthDone(result.user, result.message);
      } else {
        setErrorMessage(result.message || 'Kunci otentikasi administrator salah.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi gangguan saat memverifikasi pengelola.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSent(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Card Container */}
      <div 
        id="auth-modal-card"
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[min(92vh,700px)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#0A192F] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#D4AF37]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <LogoBadge size="sm" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white font-display leading-tight">
                Pojok Baca Desa Batursari
              </h3>
              <p className="text-[10px] text-[#D4AF37] font-medium leading-tight">
                Platform Literasi Digital KKN 47 UPGRIS
              </p>
            </div>
          </div>
          
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 bg-slate-100 p-1 border-b border-slate-200 shrink-0 text-center">
          <button
            id="tab-user-login"
            type="button"
            onClick={() => handleModeChange('user_login')}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'user_login'
                ? 'bg-white text-[#2D5A27] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Masuk
          </button>
          <button
            id="tab-user-register"
            type="button"
            onClick={() => handleModeChange('user_register')}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              authMode === 'user_register'
                ? 'bg-white text-[#2D5A27] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daftar Anggota
          </button>
          <button
            id="tab-admin-login"
            type="button"
            onClick={() => handleModeChange('admin_login')}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              authMode === 'admin_login'
                ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pengelola</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span className="leading-snug">{errorMessage}</span>
            </div>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {showForgotPassword ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold text-slate-800 font-display">Bantuan Lupa Kata Sandi</h4>
                <p className="text-xs text-slate-500">
                  Masukkan email terdaftar Anda untuk menerima instruksi pemulihan akun:
                </p>
              </div>

              {forgotSent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs text-emerald-800 font-semibold">
                    Instruksi pemulihan telah dikirim ke <strong>{forgotEmail}</strong>.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Anda juga dapat menghubungi Tim Pengelola KKN 47 Batursari jika memerlukan bantuan langsung.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotSent(false);
                    }}
                    className="mt-2 text-xs text-[#2D5A27] font-bold hover:underline"
                  >
                    Kembali ke Halaman Masuk
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#2D5A27] text-white text-xs font-bold hover:bg-[#1E431B] cursor-pointer"
                    >
                      Kirim Pemulihan
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <>
              {/* FORM 1: USER LOGIN */}
              {authMode === 'user_login' && (
                <form onSubmit={handleUserLogin} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>Email Akun Pembaca</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Kata Sandi</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[11px] text-[#2D5A27] hover:underline cursor-pointer font-medium"
                      >
                        Lupa kata sandi?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent transition-all pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded text-[#2D5A27] focus:ring-[#2D5A27] h-3.5 w-3.5"
                      />
                      <span className="text-xs text-slate-600 font-medium">Ingat saya di perangkat ini</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-[#2D5A27] hover:bg-[#1E431B] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Memverifikasi Akun...</span>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4" />
                        <span>Masuk ke Pojok Baca</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* FORM 2: USER REGISTER */}
              {authMode === 'user_register' && (
                <form onSubmit={handleUserRegister} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>Nama Lengkap *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama lengkap Anda"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>Dusun di Batursari</span>
                      </label>
                      <select
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] bg-white"
                      >
                        <option value="Dusun Krajan">Dusun Krajan</option>
                        <option value="Dusun Jetis">Dusun Jetis</option>
                        <option value="Dusun Batursari">Dusun Batursari</option>
                        <option value="Dusun Wonosari">Dusun Wonosari</option>
                        <option value="Dusun Karanganyar">Dusun Karanganyar</option>
                        <option value="Luar Desa Batursari">Luar Desa Batursari</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                        <span>Status / Pekerjaan</span>
                      </label>
                      <select
                        value={schoolOrAffiliation}
                        onChange={(e) => setSchoolOrAffiliation(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] bg-white"
                      >
                        <option value="Warga Batursari">Masyarakat Umum</option>
                        <option value="Siswa SD/MI">Pelajar SD / MI</option>
                        <option value="Siswa SMP/MTs">Pelajar SMP / MTs</option>
                        <option value="Siswa SMA/SMK">Pelajar SMA / SMK</option>
                        <option value="Mahasiswa">Mahasiswa</option>
                        <option value="Petani / Peternak">Petani / Peternak</option>
                        <option value="Wirausaha / UMKM">Pelaku UMKM</option>
                        <option value="Tenaga Pendidik / Guru">Guru / Pendidik</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>Email Akun *</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@anda.com"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>No. WhatsApp (Opsional)</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Buat Kata Sandi *</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimal 5 karakter"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] pr-9"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-[#2D5A27] hover:bg-[#1E431B] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Mendaftarkan Anggota...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Daftar & Terbitkan Kartu Anggota</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* FORM 3: ADMIN ACCESS */}
              {authMode === 'admin_login' && (
                <form onSubmit={handleAdminLogin} className="space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-[#0A192F] text-white space-y-1 border border-[#D4AF37]/30">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Portal Manajemen Pengelola</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Khusus Tim KKN 47 UPGRIS, Pengurus Perpustakaan, dan Perangkat Pemerintah Desa Batursari.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                      <span>Kunci Otentikasi Administrator</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      placeholder="Masukkan PIN / Sandi Pengelola"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0A192F] tracking-widest font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D4AF37]/40 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Memverifikasi Otoritas...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Buka Dashboard Pengelola</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </>
          )}

        </div>

        {/* Footer Policy Info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-500 shrink-0">
          Pojok Baca Desa Batursari • KKN Tematik 47 Universitas PGRI Semarang 2026
        </div>
      </div>
    </div>
  );
};
