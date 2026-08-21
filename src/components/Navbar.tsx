import React, { useState, useEffect } from 'react';
import { LogoBadge } from './LogoBadge';
import { UserProfile } from '../types';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  History, 
  Grid, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  Menu, 
  X, 
  Home, 
  LogIn, 
  LogOut, 
  User, 
  UserCheck 
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
  historyCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: (mode?: 'user_login' | 'user_register' | 'admin_login') => void;
  onLogout: () => void;
  onOpenProfile?: () => void;
  onOpenBookRequest?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  historyCount,
  searchQuery,
  setSearchQuery,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenProfile,
  onOpenBookRequest,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'katalog', label: 'Katalog', icon: BookOpen },
    { id: 'kategori', label: 'Kategori', icon: Grid },
    { id: 'favorit', label: 'Favorit', icon: Bookmark, badge: favoritesCount },
    { id: 'riwayat', label: 'Riwayat', icon: History, badge: historyCount },
    { id: 'literasi', label: 'Pojok Literasi', icon: Sparkles },
    { id: 'tentang', label: 'Tentang', icon: Info },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A192F]/95 backdrop-blur-md shadow-sm border-b border-[#D4AF37]/30 py-2.5'
          : 'bg-[#0A192F] border-b border-[#162A45] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo & Identity */}
          <button
            id="nav-logo-btn"
            onClick={() => {
              setActiveTab('beranda');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer shrink-0"
            title="Kembali ke Beranda"
          >
            <LogoBadge size="sm" showText={false} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]">
                  KKN 47 UPGRIS
                </span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#52B788]"></span>
                <span className="text-[10px] text-slate-300 hidden sm:inline">Desa Batursari</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                Pojok Baca <span className="text-slate-300 font-normal text-sm hidden md:inline">Desa Batursari</span>
              </h1>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Navigasi Utama">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => {
                    setActiveTab(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#162A45] text-[#D4AF37] shadow-xs font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-300'}`} />
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#D4AF37] text-[#0A192F] leading-none">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Quick Input & Auth / Admin Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick search input */}
            <div className="relative hidden md:block w-36 lg:w-48">
              <input
                id="navbar-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'katalog' && e.target.value.trim() !== '') {
                    setActiveTab('katalog');
                  }
                }}
                placeholder="Cari buku..."
                className="w-full bg-[#112240] border border-[#1E3A5F] rounded-full py-1.5 pl-7 pr-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* User Profile / Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#162A45] hover:bg-[#1E3A5F] border border-slate-700 text-white cursor-pointer transition-all text-xs"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-[#D4AF37]">
                    <img
                      src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left hidden sm:block max-w-[100px] truncate">
                    <span className="font-bold text-slate-200 block truncate leading-tight">
                      {currentUser.name}
                    </span>
                    <span className={`text-[9px] uppercase font-bold tracking-wider ${
                      currentUser.role === 'admin' ? 'text-[#D4AF37]' : 'text-emerald-400'
                    }`}>
                      {currentUser.role === 'admin' ? 'Pengelola' : 'Warga'}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 text-[#0A192F] z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold truncate text-[#0A192F]">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {currentUser.village || currentUser.schoolOrAffiliation || 'Pembaca Terdaftar'}
                      </span>
                    </div>

                    {onOpenProfile && (
                      <button
                        onClick={() => {
                          onOpenProfile();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-bold text-[#0A192F] hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-[#D4AF37]" />
                        <span>Kartu Anggota & Profil</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveTab('riwayat');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <History className="w-4 h-4 text-slate-500" />
                      <span>Riwayat Bacaan Saya</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('favorit');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4 text-slate-500" />
                      <span>Buku Favorit ({favoritesCount})</span>
                    </button>

                    {onOpenBookRequest && (
                      <button
                        onClick={() => {
                          onOpenBookRequest();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span>Usulkan Buku Baru</span>
                      </button>
                    )}

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-bold text-[#1E3A8A] hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                        <span>Dashboard Admin</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={() => onOpenAuth('user_login')}
                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-[#D4AF37] hover:bg-[#E5B83B] text-[#0A192F] shadow-xs shrink-0"
                title="Masuk atau Daftar Akun Pembaca"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk / Daftar</span>
              </button>
            )}

            {/* Admin Portal Direct Button */}
            <button
              id="nav-admin-btn"
              onClick={() => {
                if (currentUser?.role === 'admin') {
                  setActiveTab('admin');
                } else {
                  onOpenAuth('admin_login');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border shrink-0 ${
                activeTab === 'admin'
                  ? 'bg-[#162A45] text-[#D4AF37] border-[#D4AF37] shadow-sm'
                  : 'bg-[#162A45]/70 text-slate-300 hover:text-white hover:bg-[#162A45] border-slate-700'
              }`}
              title="Dashboard Pengelola / Admin KKN"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden pt-3 pb-4 border-t border-slate-700/60 mt-3 space-y-2 animate-fadeIn">
            {/* User status banner in mobile drawer */}
            <div className="p-3 rounded-2xl bg-[#112240] border border-slate-700 flex items-center justify-between">
              {currentUser ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-[#D4AF37]">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400">{currentUser.email}</p>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-300">
                  <span>Anda dalam mode <strong>Tamu</strong></span>
                </div>
              )}

              {currentUser ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-900/60 text-rose-200 text-xs font-semibold hover:bg-rose-900"
                >
                  Keluar
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('user_login');
                  }}
                  className="px-3 py-1 rounded-lg bg-[#D4AF37] text-[#0A192F] text-xs font-bold hover:bg-[#E5B83B]"
                >
                  Masuk
                </button>
              )}
            </div>

            {/* Mobile Search input */}
            <div className="relative px-1">
              <input
                id="mobile-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'katalog' && e.target.value.trim() !== '') {
                    setActiveTab('katalog');
                  }
                }}
                placeholder="Cari buku, judul, penulis..."
                className="w-full bg-[#112240] border border-[#1E3A5F] rounded-lg py-2 pl-9 pr-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Mobile Links */}
            <div className="grid grid-cols-2 gap-1.5 px-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    id={`mobile-nav-${link.id}`}
                    onClick={() => {
                      setActiveTab(link.id);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#162A45] text-[#D4AF37] font-semibold border border-[#D4AF37]/30'
                        : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-300'}`} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge !== undefined && link.badge > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#D4AF37] text-[#0A192F]">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
