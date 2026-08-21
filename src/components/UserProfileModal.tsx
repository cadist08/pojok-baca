import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  User, 
  Award, 
  BookOpen, 
  Bookmark, 
  Calendar, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  Edit3, 
  Save, 
  CheckCircle2, 
  QrCode, 
  Printer, 
  Sparkles,
  Heart,
  Share2
} from 'lucide-react';
import { LogoBadge } from './LogoBadge';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
  favoritesCount: number;
  completedBooksCount: number;
  totalReadingMinutes?: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile,
  favoritesCount,
  completedBooksCount,
  totalReadingMinutes = 45,
}) => {
  if (!isOpen || !currentUser) return null;

  const [activeTab, setActiveTab] = useState<'card' | 'edit' | 'stats'>('card');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [village, setVillage] = useState(currentUser.village || 'Dusun Krajan, Desa Batursari');
  const [schoolOrAffiliation, setSchoolOrAffiliation] = useState(currentUser.schoolOrAffiliation || 'Warga Batursari');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || '');
  const [successMessage, setSuccessMessage] = useState('');

  // Generate a clean Member ID
  const memberId = `BTR-47-${(currentUser.id.replace(/\D/g, '') || '2026').slice(-4).padStart(4, '0')}`;
  const joinDate = currentUser.createdAt 
    ? new Date(currentUser.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : '10 Januari 2026';

  const avatarOptions = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      name: name.trim() || currentUser.name,
      village: village.trim() || 'Desa Batursari',
      schoolOrAffiliation: schoolOrAffiliation.trim() || 'Warga Batursari',
      avatarUrl: avatarUrl || currentUser.avatarUrl
    };

    onUpdateProfile(updated);
    setSuccessMessage('Profil pembaca berhasil diperbarui!');
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="user-profile-modal"
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/40 shrink-0">
          <div className="flex items-center gap-3">
            <LogoBadge size="sm" />
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Profil Pembaca & Kartu Anggota
              </h3>
              <p className="text-[11px] text-[#D4AF37]">
                Perpustakaan Digital Pojok Baca Desa Batursari
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('card')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'card'
                ? 'border-[#2D5A27] text-[#2D5A27]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Kartu Anggota Digital</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'stats'
                ? 'border-[#2D5A27] text-[#2D5A27]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Aktivitas & Statistik</span>
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'edit'
                ? 'border-[#2D5A27] text-[#2D5A27]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profil</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: DIGITAL MEMBERSHIP CARD */}
          {activeTab === 'card' && (
            <div className="space-y-6">
              {/* The Visual Card Container */}
              <div 
                id="digital-member-card"
                className="relative rounded-3xl p-6 sm:p-7 text-white shadow-xl overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#1E3A5F] border-2 border-[#D4AF37]"
              >
                {/* Decorative background watermark */}
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
                  <LogoBadge size="lg" />
                </div>

                {/* Card Top Header */}
                <div className="flex items-start justify-between border-b border-white/15 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <LogoBadge size="sm" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase font-display">
                        Perpustakaan Desa Batursari
                      </h4>
                      <p className="text-[10px] text-[#D4AF37] font-semibold">
                        Kec. Mranggen, Kab. Demak • KKN 47 UPGRIS
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                    Anggota Aktif
                  </span>
                </div>

                {/* Card Body Information */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Photo / Avatar */}
                  <div className="sm:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-slate-800 shadow-md">
                      <img
                        src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="mt-2 text-[10px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">
                      {memberId}
                    </span>
                  </div>

                  {/* Member Meta */}
                  <div className="sm:col-span-8 space-y-2 text-center sm:text-left">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Nama Anggota
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                        {currentUser.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Domisili / RT
                        </span>
                        <span className="text-slate-200 font-medium">
                          {currentUser.village || 'Desa Batursari'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Status / Instansi
                        </span>
                        <span className="text-slate-200 font-medium">
                          {currentUser.schoolOrAffiliation || 'Warga Batursari'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-center sm:justify-between text-[10px] text-slate-300 border-t border-white/10">
                      <span>Bergabung: {joinDate}</span>
                      <span className="text-[#D4AF37] font-semibold hidden sm:inline">Literasi Desa Mandiri</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Barcode Strip */}
                <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>ID: {currentUser.id}</span>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>TERVERIFIKASI SISTEM POJOK BACA</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Card */}
              <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
                <button
                  onClick={handlePrintCard}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Cetak Kartu Anggota</span>
                </button>
                <button
                  onClick={() => setActiveTab('edit')}
                  className="px-4 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#1E431B] text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Perbarui Data Profil</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITY & STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <BookOpen className="w-6 h-6 text-[#2D5A27] mx-auto mb-1" />
                  <span className="text-2xl font-bold font-display text-[#2D5A27] block">
                    {completedBooksCount}
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold">Buku Selesai</span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <Bookmark className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                  <span className="text-2xl font-bold font-display text-amber-700 block">
                    {favoritesCount}
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold">Buku Favorit</span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                  <Sparkles className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <span className="text-2xl font-bold font-display text-blue-700 block">
                    {totalReadingMinutes}
                  </span>
                  <span className="text-[11px] text-slate-600 font-semibold">Menit Literasi</span>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Peringkat Literasi: {completedBooksCount > 5 ? 'Pembaca Teladan Desa' : 'Pembaca Aktif Batursari'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Terus tingkatkan minat baca Anda untuk mendukung kemajuan pendidikan di Desa Batursari.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EDIT PROFILE */}
          {activeTab === 'edit' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Nama Lengkap</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  placeholder="Nama Lengkap Anda"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Dusun / RT di Batursari</span>
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    placeholder="Contoh: Dusun Krajan RT 02"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                    <span>Status / Sekolah / Profesi</span>
                  </label>
                  <input
                    type="text"
                    value={schoolOrAffiliation}
                    onChange={(e) => setSchoolOrAffiliation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    placeholder="Contoh: Siswa SDN 1 Batursari / Petani"
                  />
                </div>
              </div>

              {/* Avatar Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Pilih Foto Profil:
                </label>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {avatarOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAvatarUrl(opt)}
                      className={`w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-transform cursor-pointer ${
                        (avatarUrl === opt || (!avatarUrl && i === 0))
                          ? 'border-[#2D5A27] ring-2 ring-[#2D5A27] scale-105'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={opt} alt={`Avatar option ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#1E431B] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
