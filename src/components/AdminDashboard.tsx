import React, { useState, useEffect } from 'react';
import { Book, BookCategory, BookChapter, BookPage, UserProfile } from '../types';
import { CATEGORIES_DATA } from '../data/categories';
import { LogoBadge } from './LogoBadge';
import { isSupabaseConfigured } from '../lib/supabase';
import { 
  seedInitialDataToSupabase, 
  getAllRegisteredMembers, 
  getBookRequests, 
  updateBookRequestStatus,
  BookRequestItem 
} from '../services/supabaseService';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  BarChart3, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Flame, 
  Search, 
  X, 
  Check, 
  Lock, 
  LogOut, 
  RotateCcw,
  Sparkles,
  Layers,
  Image as ImageIcon,
  FileText,
  Database,
  Globe,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Award,
  Filter
} from 'lucide-react';

interface AdminDashboardProps {
  books: Book[];
  onAddBook: (newBook: Book) => void;
  onEditBook: (updatedBook: Book) => void;
  onDeleteBook: (bookId: string) => void;
  onResetDefaults: () => void;
  totalReaders: number;
  totalReads: number;
  currentUser?: UserProfile | null;
  onAdminAuthSuccess?: (adminUser: UserProfile) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  books,
  onAddBook,
  onEditBook,
  onDeleteBook,
  onResetDefaults,
  totalReaders,
  totalReads,
  currentUser = null,
  onAdminAuthSuccess,
}) => {
  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(currentUser?.role === 'admin');
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Keep authenticated if currentUser is admin
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      setIsAuthenticated(true);
    }
  }, [currentUser]);

  // Tab inside admin: 'books' | 'members' | 'requests' | 'stats' | 'categories' | 'database'
  const [adminTab, setAdminTab] = useState<'books' | 'members' | 'requests' | 'stats' | 'categories' | 'database'>('books');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');

  // Members state
  const [members, setMembers] = useState<UserProfile[]>(() => getAllRegisteredMembers());
  const [memberSearch, setMemberSearch] = useState<string>('');
  const [selectedVillageFilter, setSelectedVillageFilter] = useState<string>('Semua');

  // Book Requests state
  const [bookRequests, setBookRequests] = useState<BookRequestItem[]>(() => getBookRequests());
  const [requestFilter, setRequestFilter] = useState<'all' | 'pending' | 'approved' | 'available'>('all');

  // Refresh members and requests periodically or on tab open
  useEffect(() => {
    setMembers(getAllRegisteredMembers());
    setBookRequests(getBookRequests());
  }, [adminTab]);

  // Supabase sync states
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const isConnectedToSupabase = isSupabaseConfigured();

  const handleSyncToSupabase = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await seedInitialDataToSupabase();
      setSyncFeedback(res);
    } catch (err: any) {
      setSyncFeedback({ success: false, message: err.message || 'Gagal sinkronisasi data.' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopyCode = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Export Members to CSV
  const handleExportMembersCSV = () => {
    const headers = ['ID Anggota', 'Nama Lengkap', 'Email', 'Peran', 'Dusun / Domisili', 'Status / Afiliasi', 'Tanggal Bergabung'];
    const rows = members.map(m => [
      m.id,
      `"${m.name.replace(/"/g, '""')}"`,
      m.email,
      m.role,
      `"${(m.village || '').replace(/"/g, '""')}"`,
      `"${(m.schoolOrAffiliation || '').replace(/"/g, '""')}"`,
      m.createdAt || ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Anggota_Pojok_Baca_Batursari_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Book Catalog to CSV
  const handleExportCatalogCSV = () => {
    const headers = ['ID Buku', 'Judul Buku', 'Penulis', 'Kategori', 'Tahun', 'Total Halaman', 'Total Dibaca', 'Rating'];
    const rows = books.map(b => [
      b.id,
      `"${b.title.replace(/"/g, '""')}"`,
      `"${b.author.replace(/"/g, '""')}"`,
      b.category,
      b.year,
      b.totalPages,
      b.readCount,
      b.rating
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Katalog_Buku_Pojok_Baca_Batursari_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Update Request Status Handler
  const handleUpdateRequest = (id: string, status: 'pending' | 'approved' | 'available') => {
    updateBookRequestStatus(id, status);
    setBookRequests(getBookRequests());
  };

  // Book Modal state (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    author: string;
    publisher: string;
    year: number;
    category: BookCategory;
    coverUrl: string;
    description: string;
    synopsis: string;
    totalPages: number;
    chapter1Title: string;
    page1Text: string;
  }>({
    title: '',
    author: '',
    publisher: 'Pojok Baca Batursari Press',
    year: 2026,
    category: 'Pendidikan',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: '',
    synopsis: '',
    totalPages: 3,
    chapter1Title: 'Bab 1: Pengantar',
    page1Text: '',
  });

  // Admin PIN Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validPins = [
      'batursari2026', 
      'kkn47', 
      'admin123', 
      'batursari47', 
      'admin47', 
      '47', 
      'kknupgris', 
      'batursari', 
      'admin', 
      '123456'
    ];
    if (validPins.includes(pinInput.trim().toLowerCase())) {
      setIsAuthenticated(true);
      setAuthError('');
      if (onAdminAuthSuccess) {
        onAdminAuthSuccess({
          id: 'admin-kkn-47',
          name: 'Pengelola KKN 47 UPGRIS',
          email: 'admin@batursari.desa.id',
          role: 'admin',
          village: 'Desa Batursari',
          schoolOrAffiliation: 'KKN Tematik UPGRIS Kelompok 47',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          createdAt: '2026-01-01T00:00:00.000Z'
        });
      }
    } else {
      setAuthError('Kata sandi / PIN pengelola salah. Gunakan sandi resmi pengelola KKN 47.');
    }
  };

  const handleOpenAddModal = () => {
    setEditingBookId(null);
    setFormData({
      title: '',
      author: '',
      publisher: 'Pojok Baca Batursari Press',
      year: 2026,
      category: 'Pendidikan',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: '',
      synopsis: '',
      totalPages: 3,
      chapter1Title: 'Bab 1: Pengantar',
      page1Text: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book: Book) => {
    setEditingBookId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      publisher: book.publisher || 'Pojok Baca Batursari Press',
      year: book.year || 2026,
      category: book.category,
      coverUrl: book.coverUrl,
      description: book.description,
      synopsis: book.synopsis || '',
      totalPages: book.totalPages,
      chapter1Title: book.chapters?.[0]?.title || 'Bab 1: Pendahuluan',
      page1Text: book.pages?.[0]?.paragraphs?.[0] || '',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBookId) {
      const existing = books.find((b) => b.id === editingBookId);
      if (existing) {
        const updatedBook: Book = {
          ...existing,
          title: formData.title,
          author: formData.author,
          publisher: formData.publisher,
          year: Number(formData.year),
          category: formData.category,
          coverUrl: formData.coverUrl,
          description: formData.description,
          synopsis: formData.synopsis,
          totalPages: Number(formData.totalPages),
          chapters: existing.chapters || [
            {
              id: 'ch1',
              title: formData.chapter1Title || 'Bab 1: Pengantar',
              startPage: 1,
              endPage: Number(formData.totalPages) || 3
            }
          ],
          pages: existing.pages || Array.from({ length: Number(formData.totalPages) || 3 }).map((_, i) => ({
            pageNumber: i + 1,
            chapterTitle: formData.chapter1Title || 'Bab 1: Pengantar',
            title: `${formData.title} - Bagian ${i + 1}`,
            paragraphs: [
              i === 0 ? formData.page1Text : `Materi halaman ${i + 1} buku ${formData.title}`,
              formData.synopsis || formData.description
            ]
          }))
        };
        onEditBook(updatedBook);
      }
    } else {
      const newId = `buku-${Date.now()}`;
      const newBook: Book = {
        id: newId,
        title: formData.title,
        author: formData.author,
        publisher: formData.publisher,
        year: Number(formData.year),
        category: formData.category,
        coverUrl: formData.coverUrl,
        description: formData.description,
        synopsis: formData.synopsis,
        totalPages: Number(formData.totalPages) || 3,
        readCount: 0,
        likesCount: 0,
        rating: 5.0,
        isNew: true,
        uploadedAt: new Date().toISOString().split('T')[0],
        chapters: [
          {
            id: 'ch1',
            title: formData.chapter1Title || 'Bab 1: Pengantar',
            startPage: 1,
            endPage: Number(formData.totalPages) || 3
          }
        ],
        pages: Array.from({ length: Number(formData.totalPages) || 3 }).map((_, i) => ({
          pageNumber: i + 1,
          chapterTitle: formData.chapter1Title || 'Bab 1: Pengantar',
          title: `${formData.title} - Bagian ${i + 1}`,
          paragraphs: [
            i === 0 ? formData.page1Text : `Lanjutan materi bacaan halaman ${i + 1} dari buku "${formData.title}".`,
            formData.synopsis || formData.description
          ]
        }))
      };
      onAddBook(newBook);
    }

    setIsModalOpen(false);
  };

  // Compute Statistics
  const totalBooksCount = books.length;
  const popularBooks = [...books].sort((a, b) => b.readCount - a.readCount).slice(0, 5);

  const categoryDistribution = CATEGORIES_DATA.map((c) => {
    const count = books.filter((b) => b.category === c.id).length;
    return { name: c.name, count, color: c.badgeBg };
  });

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.author.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCat = categoryFilter === 'Semua' || b.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      (m.village || '').toLowerCase().includes(memberSearch.toLowerCase()) ||
      (m.schoolOrAffiliation || '').toLowerCase().includes(memberSearch.toLowerCase());
    const matchesVillage = selectedVillageFilter === 'Semua' || (m.village || '').includes(selectedVillageFilter);
    return matchesSearch && matchesVillage;
  });

  const filteredRequests = bookRequests.filter((r) => {
    if (requestFilter === 'all') return true;
    return r.status === requestFilter;
  });

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div id="admin-login-screen" className="py-12 max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-8 border border-[#D4AF37]/50 shadow-lg space-y-6 text-center">
          
          <div className="flex justify-center">
            <LogoBadge size="lg" showText={false} />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162A45] text-[#D4AF37] text-xs font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Pengelola Resmi</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-[#0A192F]">
              Dashboard Admin KKN 47
            </h2>
            <p className="text-xs text-slate-600">
              Pojok Baca Desa Batursari, Kec. Mranggen, Kab. Demak
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Kunci Otentikasi Administrator:
              </label>
              <div className="relative">
                <input
                  id="admin-pin-input"
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Masukkan sandi / PIN pengelola"
                  className="w-full bg-[#FAF9F6] border border-slate-300 rounded-xl px-4 py-3 text-sm text-[#0A192F] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {authError}
              </div>
            )}

            <button
              id="admin-login-submit-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-sm shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Masuk ke Dashboard</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div id="admin-dashboard-container" className="space-y-8 pb-16">
      
      {/* Top Header Card */}
      <div className="bg-[#0A192F] text-white p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <LogoBadge size="md" showText={false} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
                Panel Manajemen Terpadu
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#162A45] text-emerald-400 font-bold border border-emerald-500/30">
                Sistem Aktif
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Pojok Baca Desa Batursari
            </h1>
            <p className="text-xs text-slate-300">
              Pengelola: KKN Tematik 47 Universitas PGRI Semarang & Pemerintah Desa Batursari
            </p>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            id="admin-add-book-btn"
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5B83B] text-[#0A192F] font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Buku Baru</span>
          </button>

          <button
            id="admin-logout-btn"
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-2.5 rounded-xl bg-[#162A45] hover:bg-rose-900 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Keluar Admin"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>

      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          id="admin-tab-books"
          onClick={() => setAdminTab('books')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
            adminTab === 'books'
              ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Koleksi Buku ({totalBooksCount})</span>
        </button>

        <button
          id="admin-tab-members"
          onClick={() => setAdminTab('members')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
            adminTab === 'members'
              ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Anggota Pembaca ({members.length})</span>
        </button>

        <button
          id="admin-tab-requests"
          onClick={() => setAdminTab('requests')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
            adminTab === 'requests'
              ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Usulan Buku Warga ({bookRequests.length})</span>
        </button>

        <button
          id="admin-tab-stats"
          onClick={() => setAdminTab('stats')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
            adminTab === 'stats'
              ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Statistik & Laporan</span>
        </button>

        <button
          id="admin-tab-categories"
          onClick={() => setAdminTab('categories')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
            adminTab === 'categories'
              ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Kategori ({CATEGORIES_DATA.length})</span>
        </button>

        <button
          id="admin-tab-database"
          onClick={() => setAdminTab('database')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
            adminTab === 'database'
              ? 'bg-[#0A192F] text-[#D4AF37] shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Sinkronisasi Database</span>
          <span className={`w-2 h-2 rounded-full ${isConnectedToSupabase ? 'bg-emerald-500' : 'bg-emerald-400'}`} />
        </button>
      </div>

      {/* TAB 1: Books Management */}
      {adminTab === 'books' && (
        <div className="space-y-6">
          
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cari judul buku atau penulis..."
                className="w-full pl-9 pr-4 py-2 bg-[#FAF9F6] border border-slate-200 rounded-xl text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#FAF9F6] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Semua">Semua Kategori</option>
                {CATEGORIES_DATA.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleExportCatalogCSV}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Unduh data katalog dalam format CSV/Excel"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ekspor CSV</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Muat ulang katalog awal standar? Perubahan kustom tetap tersimpan.')) {
                    onResetDefaults();
                  }
                }}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Sinkronkan kembali koleksi buku rujukan KKN 47"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sinkronisasi Koleksi Awal</span>
              </button>
            </div>
          </div>

          {/* Books Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F6] text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Buku & Penulis</th>
                    <th className="py-3.5 px-4">Kategori</th>
                    <th className="py-3.5 px-4">Tahun</th>
                    <th className="py-3.5 px-4">Halaman</th>
                    <th className="py-3.5 px-4 text-center">Dibaca</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredBooks.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        Tidak ada buku yang sesuai dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="w-9 h-12 object-cover rounded-md shadow-xs shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-[#0A192F] text-xs truncate max-w-xs sm:max-w-md">
                                {book.title}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">{book.author}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                            {book.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono">{book.year}</td>
                        <td className="py-3 px-4 font-mono">{book.totalPages} hlm</td>
                        <td className="py-3 px-4 text-center font-mono font-bold text-[#2D5A27]">
                          {book.readCount}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditModal(book)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#0A192F] hover:bg-slate-100 cursor-pointer"
                              title="Edit Buku"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Hapus buku "${book.title}" dari database perpustakaan?`)) {
                                  onDeleteBook(book.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                              title="Hapus Buku"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Members Management */}
      {adminTab === 'members' && (
        <div className="space-y-6">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder="Cari nama, email, dusun, instansi..."
                className="w-full pl-9 pr-4 py-2 bg-[#FAF9F6] border border-slate-200 rounded-xl text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
              <select
                value={selectedVillageFilter}
                onChange={(e) => setSelectedVillageFilter(e.target.value)}
                className="bg-[#FAF9F6] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Semua">Semua Wilayah Dusun</option>
                <option value="Krajan">Dusun Krajan</option>
                <option value="Jetis">Dusun Jetis</option>
                <option value="Batursari">Dusun Batursari</option>
                <option value="Wonosari">Dusun Wonosari</option>
                <option value="Karanganyar">Dusun Karanganyar</option>
              </select>

              <button
                onClick={handleExportMembersCSV}
                className="px-3.5 py-2 rounded-xl bg-[#2D5A27] hover:bg-[#1E431B] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Rekap Anggota (CSV)</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F6] text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Nama Anggota</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Dusun / Domisili</th>
                    <th className="py-3.5 px-4">Status / Pekerjaan</th>
                    <th className="py-3.5 px-4">Tipe Akun</th>
                    <th className="py-3.5 px-4 text-right">Tgl Bergabung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        Tidak ada anggota yang sesuai dengan filter.
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                              <img src={member.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-bold text-[#0A192F]">{member.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{member.email}</td>
                        <td className="py-3 px-4">{member.village || 'Desa Batursari'}</td>
                        <td className="py-3 px-4">{member.schoolOrAffiliation || 'Masyarakat Umum'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            member.role === 'admin' 
                              ? 'bg-[#0A192F] text-[#D4AF37]' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {member.role === 'admin' ? 'Pengelola' : 'Pembaca'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-slate-500 font-mono text-[11px]">
                          {member.createdAt ? new Date(member.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: Community Book Requests */}
      {adminTab === 'requests' && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRequestFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  requestFilter === 'all' ? 'bg-[#0A192F] text-[#D4AF37]' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Semua Usulan ({bookRequests.length})
              </button>
              <button
                onClick={() => setRequestFilter('pending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  requestFilter === 'pending' ? 'bg-amber-500 text-white' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Menunggu Tinjauan
              </button>
              <button
                onClick={() => setRequestFilter('approved')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  requestFilter === 'approved' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Disetujui
              </button>
              <button
                onClick={() => setRequestFilter('available')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  requestFilter === 'available' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Sudah Tersedia
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRequests.length === 0 ? (
              <div className="col-span-2 bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
                Tidak ada usulan buku dalam kategori ini.
              </div>
            ) : (
              filteredRequests.map((req) => (
                <div key={req.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {req.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#0A192F] font-display mt-1">
                        {req.bookTitle}
                      </h4>
                      <p className="text-xs text-slate-500">Penulis / Sumber: {req.author}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      req.status === 'available' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : req.status === 'approved'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status === 'available' ? 'Sudah Tersedia' : req.status === 'approved' ? 'Disetujui Pengelola' : 'Menunggu Tinjauan'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-600 border border-slate-100 space-y-1">
                    <p className="italic leading-relaxed">"{req.reason}"</p>
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>Diusulkan oleh: <strong>{req.requesterName}</strong></span>
                      {req.requesterContact && <span>WA: {req.requesterContact}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(req.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {req.status !== 'approved' && (
                        <button
                          onClick={() => handleUpdateRequest(req.id, 'approved')}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-bold cursor-pointer"
                        >
                          Setujui
                        </button>
                      )}
                      {req.status !== 'available' && (
                        <button
                          onClick={() => handleUpdateRequest(req.id, 'available')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold cursor-pointer"
                        >
                          Tandai Tersedia
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* TAB 4: Statistics & Reporting */}
      {adminTab === 'stats' && (
        <div className="space-y-8">
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-600 font-medium">Total Judul Koleksi</span>
              <p className="text-3xl font-bold font-display text-[#0A192F] mt-1">{totalBooksCount}</p>
              <span className="text-[11px] text-[#2D5A27] font-semibold">Buku digital tersedia</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-600 font-medium">Anggota Terdaftar</span>
              <p className="text-3xl font-bold font-display text-[#0A192F] mt-1">{members.length}</p>
              <span className="text-[11px] text-[#2D5A27] font-semibold">Warga & Pelajar Batursari</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-600 font-medium">Total Aktivitas Membaca</span>
              <p className="text-3xl font-bold font-display text-[#0A192F] mt-1">{totalReads}</p>
              <span className="text-[11px] text-[#2D5A27] font-semibold">Sesi literasi digital</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-600 font-medium">Kategori Aktif</span>
              <p className="text-3xl font-bold font-display text-[#0A192F] mt-1">{CATEGORIES_DATA.length}</p>
              <span className="text-[11px] text-[#2D5A27] font-semibold">Bidang keilmuan</span>
            </div>
          </div>

          {/* Popular Books and Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Top 5 Popular Reads */}
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Buku Paling Banyak Dibaca Warga</span>
              </div>

              <div className="space-y-3">
                {popularBooks.map((book, idx) => (
                  <div
                    key={book.id}
                    className="p-3 rounded-xl bg-[#FAF9F6] border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-[#0A192F] text-[#D4AF37] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-[#0A192F] truncate">{book.title}</p>
                        <p className="text-slate-600 text-[11px] truncate">{book.author} • {book.category}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-bold text-[#2D5A27]">{book.readCount} kali</span>
                      <p className="text-[10px] text-slate-600">dibaca</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution Bar Chart */}
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
                <TrendingUp className="w-4 h-4 text-[#2D5A27]" />
                <span>Distribusi Kategori Koleksi</span>
              </div>

              <div className="space-y-2.5">
                {categoryDistribution.map((cat, idx) => {
                  const percent = totalBooksCount > 0 ? (cat.count / totalBooksCount) * 100 : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{cat.name}</span>
                        <span className="font-mono text-slate-600">{cat.count} buku ({Math.round(percent)}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2D5A27]"
                          style={{ width: `${Math.max(5, percent)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Official Report Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-[#0A192F] font-display">Laporan Resmi Kinerja Literasi Digital</h4>
              <p className="text-xs text-slate-500">
                Unduh rekapitulasi data literasi untuk arsip laporan KKN Tematik 47 UPGRIS & Pemdes Batursari.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / PDF</span>
              </button>
              <button
                onClick={handleExportCatalogCSV}
                className="px-4 py-2 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Katalog</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: Categories Overview */}
      {adminTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const count = books.filter((b) => b.category === cat.id).length;
            return (
              <div
                key={cat.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${cat.badgeBg}`}>
                    {cat.name}
                  </span>
                  <span className="text-xs font-bold text-[#0A192F] font-mono">
                    {count} Koleksi
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 6: Supabase Database & Vercel Deployment Panel */}
      {adminTab === 'database' && (
        <div className="space-y-8">
          
          {/* Status Banner */}
          <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs ${
            isConnectedToSupabase 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
              : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl shrink-0 bg-[#2D5A27] text-white">
                <Database className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Status Penyimpanan Data</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                    {isConnectedToSupabase ? 'Terhubung (Cloud PostgreSQL Supabase)' : 'Penyimpanan Lokal Terpadu (Offline-First)'}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display">
                  {isConnectedToSupabase 
                    ? 'Aplikasi terhubung langsung ke cloud database Supabase'
                    : 'Penyimpanan data lokal siap pakai (Offline-First & Cloud Ready)'}
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  {isConnectedToSupabase
                    ? 'Setiap penambahan buku, edit, bacaan warga, dan riwayat membaca otomatis disinkronkan ke tabel PostgreSQL Supabase secara real-time.'
                    : 'Data buku, riwayat membaca, dan akun anggota disimpan di browser lokal secara persisten. Anda juga dapat menghubungkan Cloud Supabase kapan saja.'}
                </p>
              </div>
            </div>

            {/* Sync Action */}
            <div className="shrink-0 w-full md:w-auto">
              <button
                onClick={handleSyncToSupabase}
                disabled={isSyncing || !isConnectedToSupabase}
                className={`w-full md:w-auto px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all ${
                  isConnectedToSupabase
                    ? 'bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Menyinkronkan Data...' : 'Ekspor Buku ke Supabase'}</span>
              </button>
            </div>
          </div>

          {/* Feedback Message */}
          {syncFeedback && (
            <div className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-3 ${
              syncFeedback.success 
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}>
              {syncFeedback.success ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <span>{syncFeedback.message}</span>
            </div>
          )}

          {/* Dual Column Setup Guide: Supabase & Vercel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Supabase Guide Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-base font-display text-[#0A192F]">
                    Langkah 1: Setup Supabase Database
                  </h4>
                  <p className="text-xs text-slate-500">Gratis & siap pakai dalam 1 menit</p>
                </div>
              </div>

              <ol className="space-y-4 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-slate-400">1.</span>
                  <div>
                    Buka <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#1E3A8A] font-bold underline inline-flex items-center gap-1">supabase.com <ExternalLink className="w-3 h-3" /></a> dan buat project baru (contoh: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">pojok-baca-batursari</code>).
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-slate-400">2.</span>
                  <div>
                    Masuk ke menu <strong>SQL Editor</strong> di dashboard Supabase, lalu salin dan jalankan skrip SQL di bawah untuk membuat tabel <code>books</code>, <code>reading_history</code>, dan <code>profiles</code>.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-slate-400">3.</span>
                  <div>
                    Buka <strong>Project Settings → API</strong>, lalu salin <strong>Project URL</strong> dan <strong>anon public key</strong>.
                  </div>
                </li>
              </ol>

              {/* SQL Schema Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0A192F]">Skrip SQL Skema Database (schema.sql)</span>
                  <button
                    onClick={() => handleCopyCode(`-- 1. TABEL BUKU (books)
CREATE TABLE IF NOT EXISTS public.books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    publisher TEXT DEFAULT 'Pojok Baca Batursari Press',
    year INTEGER DEFAULT 2026,
    category TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    cover_color TEXT,
    description TEXT,
    synopsis TEXT,
    total_pages INTEGER DEFAULT 1,
    read_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    is_popular BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    rating NUMERIC(3,2) DEFAULT 4.80,
    chapters JSONB DEFAULT '[]'::jsonb,
    pages JSONB DEFAULT '[]'::jsonb,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL PROFIL ANGGOTA (profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'user',
    village TEXT DEFAULT 'Desa Batursari',
    school_or_affiliation TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL RIWAYAT MEMBACA (reading_history)
CREATE TABLE IF NOT EXISTS public.reading_history (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    book_id TEXT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    current_page INTEGER DEFAULT 1,
    total_pages INTEGER DEFAULT 1,
    progress_percent INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    last_read_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, book_id)
);

-- 4. PERIZINAN ROW LEVEL SECURITY (RLS)
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Semua pengguna dapat membaca buku" ON public.books FOR SELECT USING (true);
CREATE POLICY "Pengelola dapat mengubah buku" ON public.books FOR ALL USING (true);
CREATE POLICY "Akses profil publik" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Akses riwayat membaca" ON public.reading_history FOR ALL USING (true);
`, 'sql')}
                    className="text-[#2D5A27] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedText === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText === 'sql' ? 'Tersalin!' : 'Salin SQL'}</span>
                  </button>
                </div>

                <div className="bg-[#0A192F] p-4 rounded-2xl text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48 border border-slate-800">
                  <pre>
{`CREATE TABLE public.books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_url TEXT NOT NULL,
  total_pages INTEGER DEFAULT 1,
  read_count INTEGER DEFAULT 0
);`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Vercel Deployment Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0A192F] text-[#D4AF37] flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-base font-display text-[#0A192F]">
                    Langkah 2: Environment Variables
                  </h4>
                  <p className="text-xs text-slate-500">Konfigurasi file .env</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <p>
                  Tambahkan variabel berikut ke file <code>.env</code> lokal Anda atau menu Environment Variables hosting:
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0A192F]">.env Konfigurasi</span>
                    <button
                      onClick={() => handleCopyCode(`VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key-here`, 'env')}
                      className="text-[#2D5A27] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText === 'env' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText === 'env' ? 'Tersalin!' : 'Salin Variabel'}</span>
                    </button>
                  </div>

                  <div className="bg-[#0A192F] p-4 rounded-2xl text-[11px] font-mono text-amber-300 border border-slate-800">
                    <p>VITE_SUPABASE_URL=https://xyzcompany.supabase.co</p>
                    <p>VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200 space-y-2">
                  <p className="font-bold text-[#0A192F]">Status Siap Produksi:</p>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Sistem pojok baca sudah terintegrasi secara otomatis dengan pencadangan lokal offline-first, pembaca digital TTS, kartu anggota digital, dan manajemen usulan buku warga.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Add / Edit Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#0A192F] text-[#D4AF37]">
                  {editingBookId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-[#0A192F]">
                    {editingBookId ? 'Edit Data Koleksi Buku' : 'Tambah Buku Baru ke Pojok Baca'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Katalog Perpustakaan Digital KKN 47 Batursari
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Judul Buku *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: Panduan Menanam Padi Organik"
                    className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Penulis / Pengarang *</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Contoh: Dr. Ir. Suwarto"
                    className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Kategori *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as BookCategory })}
                    className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {CATEGORIES_DATA.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tahun Terbit</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Total Halaman</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.totalPages}
                    onChange={(e) => setFormData({ ...formData, totalPages: Number(e.target.value) })}
                    className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Gambar Sampul (Cover Image)</label>
                <input
                  type="url"
                  required
                  value={formData.coverUrl}
                  onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Deskripsi Singkat / Sinopsis *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value, synopsis: e.target.value })}
                  placeholder="Tuliskan rangkuman isi materi buku yang bermanfaat bagi pembaca..."
                  className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Isi Bacaan Halaman 1 (Untuk E-Reader)</label>
                <textarea
                  rows={4}
                  value={formData.page1Text}
                  onChange={(e) => setFormData({ ...formData, page1Text: e.target.value })}
                  placeholder="Ketik atau tempel teks isi bacaan yang dapat langsung dibaca dan dinarasikan suara oleh warga..."
                  className="w-full bg-[#FAF9F6] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0A192F] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-xs shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingBookId ? 'Simpan Perubahan' : 'Terbitkan Buku'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
