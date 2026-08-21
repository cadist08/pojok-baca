import React, { useState, useEffect, useMemo } from 'react';
import { Book, BookCategory, ReadingProgress, UserProfile } from './types';
import { INITIAL_BOOKS } from './data/initialBooks';
import { CATEGORIES_DATA } from './data/categories';
import { 
  fetchBooks, 
  insertBook, 
  updateBook, 
  deleteBook, 
  incrementBookReadCount, 
  getCurrentUserSession,
  logoutUser,
  fetchUserFavorites,
  fetchUserReadingHistory,
  toggleUserFavorite,
  saveUserReadingProgress,
  updateUserProfile,
  submitBookRequest
} from './services/supabaseService';
import { isSupabaseConfigured } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { BookCard } from './components/BookCard';
import { BookDetailModal } from './components/BookDetailModal';
import { BookReader } from './components/BookReader';
import { CategoryFilter } from './components/CategoryFilter';
import { PojokLiterasiSection } from './components/PojokLiterasiSection';
import { TentangKamiSection } from './components/TentangKamiSection';
import { FavoritesView } from './components/FavoritesView';
import { HistoryView } from './components/HistoryView';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { BookRequestModal } from './components/BookRequestModal';
import { NotificationToast } from './components/NotificationToast';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Flame, 
  Clock, 
  Grid, 
  List, 
  ArrowUpDown, 
  Layers, 
  Bookmark, 
  ChevronRight,
  TrendingUp,
  Award,
  ArrowRight,
  SlidersHorizontal,
  Info,
  User,
  ShieldAlert,
  LogIn,
  GraduationCap,
  Smile,
  Globe,
  Landmark,
  HeartHandshake,
  Laptop,
  Scissors,
  Sprout,
  HeartPulse
} from 'lucide-react';

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Smile,
  Sparkles,
  Globe,
  Landmark,
  HeartHandshake,
  Laptop,
  Scissors,
  Sprout,
  HeartPulse,
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getCurrentUserSession());
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'user_login' | 'user_register' | 'admin_login'>('user_login');
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [bookRequestModalOpen, setBookRequestModalOpen] = useState<boolean>(false);

  // Books State with LocalStorage Persistence & Smart Sync with INITIAL_BOOKS
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('batursari_books');
    if (saved) {
      try {
        const parsed: Book[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((b) => b.id));
        const missing = INITIAL_BOOKS.filter((b) => !existingIds.has(b.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          localStorage.setItem('batursari_books', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch (e) {
        return INITIAL_BOOKS;
      }
    }
    return INITIAL_BOOKS;
  });

  // Fetch from Supabase on initial load if configured
  useEffect(() => {
    let isMounted = true;
    if (isSupabaseConfigured()) {
      fetchBooks().then((dbBooks) => {
        if (isMounted && dbBooks && dbBooks.length > 0) {
          setBooks(dbBooks);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Save books to localStorage as fallback
  useEffect(() => {
    localStorage.setItem('batursari_books', JSON.stringify(books));
  }, [books]);

  // Favorites State (User scoped when logged in, guest storage when logged out)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const user = getCurrentUserSession();
    if (user) {
      const userFavs = localStorage.getItem(`batursari_favs_${user.id}`);
      if (userFavs) {
        try { return JSON.parse(userFavs); } catch (e) { /* ignore */ }
      }
    }
    const saved = localStorage.getItem('batursari_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ['buku-pendidikan-01', 'buku-pertanian-01'];
      }
    }
    return ['buku-pendidikan-01', 'buku-pertanian-01'];
  });

  // Reading History State (Only saved/restored if user is logged in)
  const [readingHistory, setReadingHistory] = useState<Record<string, ReadingProgress>>(() => {
    const user = getCurrentUserSession();
    if (user) {
      const userHistory = localStorage.getItem(`batursari_history_${user.id}`);
      if (userHistory) {
        try { return JSON.parse(userHistory); } catch (e) { /* ignore */ }
      }
      return {
        'buku-pendidikan-01': {
          bookId: 'buku-pendidikan-01',
          currentPage: 2,
          totalPages: 5,
          progressPercent: 40,
          lastReadAt: new Date().toISOString(),
          isCompleted: false,
        }
      };
    }
    // Guest has empty history by default
    return {};
  });

  // Re-sync favorites and history whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchUserFavorites(currentUser.id).then((favs) => setFavorites(favs));
      fetchUserReadingHistory(currentUser.id).then((hist) => setReadingHistory(hist));
    } else {
      setReadingHistory({});
      const saved = localStorage.getItem('batursari_favorites');
      if (saved) {
        try { setFavorites(JSON.parse(saved)); } catch (e) { setFavorites([]); }
      }
    }
  }, [currentUser]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'Semua'>('Semua');
  const [sortBy, setSortBy] = useState<'populer' | 'terbaru' | 'az' | 'rating'>('populer');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals & Reader State
  const [detailBook, setDetailBook] = useState<Book | null>(null);
  const [readerBook, setReaderBook] = useState<Book | null>(null);
  const [readerInitialPage, setReaderInitialPage] = useState<number>(1);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ message: string; type?: 'success' | 'favorite' | 'info' } | null>(null);

  // Open Auth Modal helper
  const handleOpenAuth = (mode: 'user_login' | 'user_register' | 'admin_login' = 'user_login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  // Logout handler
  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setToastMessage({ message: 'Anda telah keluar dari akun.', type: 'info' });
  };

  // Toggle Favorite Handler
  const handleToggleFavorite = async (bookId: string) => {
    if (currentUser) {
      const updated = await toggleUserFavorite(currentUser.id, bookId, favorites);
      setFavorites(updated);
      const isFav = updated.includes(bookId);
      setToastMessage({
        message: isFav ? 'Buku disimpan ke Favorit akun Anda!' : 'Buku dihapus dari Favorit.',
        type: isFav ? 'favorite' : 'info'
      });
    } else {
      // Guest mode
      const isFav = favorites.includes(bookId);
      let updated: string[];
      if (isFav) {
        updated = favorites.filter((id) => id !== bookId);
        setToastMessage({ message: 'Buku dihapus dari daftar Favorit.', type: 'info' });
      } else {
        updated = [...favorites, bookId];
        setToastMessage({ message: 'Buku disimpan sementara. Masuk akun agar tersimpan permanen!', type: 'favorite' });
      }
      setFavorites(updated);
      localStorage.setItem('batursari_favorites', JSON.stringify(updated));
    }
  };

  // Open Online Reader
  const handleOpenReader = (book: Book, startPage: number = 1) => {
    // Check if existing progress exists for logged-in user
    const existing = readingHistory[book.id];
    const targetPage = startPage > 1 ? startPage : existing ? existing.currentPage : 1;

    setReaderInitialPage(targetPage);
    setReaderBook(book);
    setDetailBook(null); // Close detail modal if open

    // Increment read count in memory & Supabase
    incrementBookReadCount(book.id, book.readCount);
    setBooks((prev) =>
      prev.map((b) => (b.id === book.id ? { ...b, readCount: b.readCount + 1 } : b))
    );
  };

  // Update Reading Progress Handler from Reader
  const handleUpdateProgress = async (bookId: string, page: number, totalPages: number) => {
    // CRITICAL USER REQUIREMENT:
    // "kalau tidak login hanya bisa membaca tapi progresnya tidak tersimpan"
    if (!currentUser) {
      // Do not save progress for guests!
      return;
    }

    const percent = Math.round((page / totalPages) * 100);
    const progress: ReadingProgress = {
      bookId,
      currentPage: page,
      totalPages,
      progressPercent: percent,
      lastReadAt: new Date().toISOString(),
      isCompleted: page >= totalPages,
    };

    // Save to user storage and cloud
    await saveUserReadingProgress(currentUser.id, progress);
    setReadingHistory((prev) => ({
      ...prev,
      [bookId]: progress,
    }));
  };

  // Clear History
  const handleClearHistory = () => {
    if (window.confirm('Bersihkan seluruh riwayat aktivitas membaca Anda?')) {
      if (currentUser) {
        localStorage.removeItem(`batursari_history_${currentUser.id}`);
      }
      setReadingHistory({});
      setToastMessage({ message: 'Riwayat membaca telah dibersihkan.', type: 'info' });
    }
  };

  // Admin CRUD Handlers (Synchronized with Supabase and local state)
  const handleAddBook = async (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);
    await insertBook(newBook);
    setToastMessage({ message: `Buku "${newBook.title}" berhasil ditambahkan ke database!`, type: 'success' });
  };

  const handleEditBook = async (updatedBook: Book) => {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    await updateBook(updatedBook);
    setToastMessage({ message: `Data buku "${updatedBook.title}" berhasil diperbarui.`, type: 'success' });
  };

  const handleDeleteBook = async (bookId: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    await deleteBook(bookId);
    setToastMessage({ message: 'Buku telah dihapus dari koleksi.', type: 'info' });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Kembalikan seluruh data ke koleksi default KKN Tematik 47?')) {
      setBooks(INITIAL_BOOKS);
      setToastMessage({ message: 'Koleksi buku default berhasil dipulihkan.', type: 'success' });
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES_DATA.forEach((c) => {
      counts[c.id] = books.filter((b) => b.category === c.id).length;
    });
    return counts;
  }, [books]);

  // Total Statistics
  const totalReadersCount = useMemo(() => {
    return 147 + Object.keys(readingHistory).length * 3;
  }, [readingHistory]);

  const totalReadsCount = useMemo(() => {
    return books.reduce((acc, b) => acc + (b.readCount || 0), 0) + 120;
  }, [books]);

  // Filtered and Sorted Catalog Books
  const catalogBooks = useMemo(() => {
    return books
      .filter((b) => {
        const matchesQuery =
          searchQuery.trim() === '' ||
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCat = selectedCategory === 'Semua' || b.category === selectedCategory;
        return matchesQuery && matchesCat;
      })
      .sort((a, b) => {
        if (sortBy === 'populer') return b.readCount - a.readCount;
        if (sortBy === 'terbaru') return b.year - a.year || (b.isNew ? -1 : 1);
        if (sortBy === 'az') return a.title.localeCompare(b.title);
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [books, searchQuery, selectedCategory, sortBy]);

  // Popular Books (Top 4)
  const popularBooks = useMemo(() => {
    return [...books].sort((a, b) => b.readCount - a.readCount).slice(0, 4);
  }, [books]);

  // Newest Books (Top 4)
  const newestBooks = useMemo(() => {
    return [...books].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.year - a.year).slice(0, 4);
  }, [books]);

  // Favorite Books List
  const favoriteBooks = useMemo(() => {
    return books.filter((b) => favorites.includes(b.id));
  }, [books, favorites]);

  // Related books for detail modal
  const relatedBooks = useMemo(() => {
    if (!detailBook) return [];
    return books
      .filter((b) => b.category === detailBook.category && b.id !== detailBook.id)
      .slice(0, 4);
  }, [books, detailBook]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#0A192F]">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={favorites.length}
        historyCount={Object.keys(readingHistory).length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenBookRequest={() => setBookRequestModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: BERANDA (HOME) */}
        {activeTab === 'beranda' && (
          <div className="space-y-12 pb-16">
            
            {/* Hero Section */}
            <HeroSection
              onStartReading={() => {
                setActiveTab('katalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBrowseCategories={() => {
                setActiveTab('kategori');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              totalBooks={books.length}
              totalReaders={totalReadersCount}
              totalReads={totalReadsCount}
              categoriesCount={CATEGORIES_DATA.length}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearchSubmit={() => {
                setActiveTab('katalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* User Session Ribbon when logged in / Guest CTA when logged out */}
              {!currentUser ? (
                <div className="bg-[#0A192F] text-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#162A45] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                      <LogIn className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        Simpan Riwayat Halaman & Koleksi Bacaan Anda
                      </h3>
                      <p className="text-xs text-slate-300">
                        Masuk sebagai Warga/Pelajar Desa Batursari agar progres baca tersimpan otomatis di cloud.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 w-full md:w-auto">
                    <button
                      onClick={() => handleOpenAuth('user_login')}
                      className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5B83B] text-[#0A192F] font-bold text-xs shadow-xs transition-colors cursor-pointer text-center"
                    >
                      Masuk Akun
                    </button>
                    <button
                      onClick={() => handleOpenAuth('user_register')}
                      className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-[#162A45] hover:bg-[#1E3A5F] text-slate-200 font-bold text-xs border border-slate-700 transition-colors cursor-pointer text-center"
                    >
                      Daftar Baru
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D4AF37] bg-slate-100">
                      <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium">Selamat Datang Kembali,</span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0A192F]">
                        {currentUser.name} <span className="text-[10px] font-normal text-slate-500">({currentUser.role === 'admin' ? 'Pengelola' : currentUser.village || 'Warga Batursari'})</span>
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('riwayat')}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#0A192F] transition-colors cursor-pointer"
                    >
                      Buka Riwayat ({Object.keys(readingHistory).length})
                    </button>
                    <button
                      onClick={() => setActiveTab('favorit')}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF9F6] hover:bg-slate-100 text-xs font-semibold text-amber-900 border border-amber-200 transition-colors cursor-pointer"
                    >
                      Favorit ({favorites.length})
                    </button>
                  </div>
                </div>
              )}

              {/* Category Quick Shortcuts */}
              <section id="home-categories-preview" className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
                      Jelajahi Berdasarkan Tema
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0A192F]">
                      Kategori Pilihan Desa Batursari
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('kategori');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs sm:text-sm font-bold text-[#1E3A8A] hover:text-[#0A192F] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lihat Semua Kategori ({CATEGORIES_DATA.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
                  {CATEGORIES_DATA.map((cat) => {
                    const count = categoryCounts[cat.id] || 0;
                    const CatIcon = categoryIconMap[cat.iconName] || Sparkles;
                    return (
                      <button
                        key={cat.id}
                        id={`home-cat-card-${cat.id.toLowerCase()}`}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setActiveTab('katalog');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-[#D4AF37] hover:shadow-sm transition-all duration-200 text-left group cursor-pointer"
                      >
                        <div className={`w-10 h-10 rounded-xl ${cat.bgColor} ${cat.textColor} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                          <CatIcon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-xs sm:text-sm text-[#0A192F] group-hover:text-[#1E3A8A] transition-colors line-clamp-1">
                          {cat.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {count} Buku Tersedia
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Popular Books Carousel / Grid */}
              <section id="home-popular-books" className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
                      <Flame className="w-4 h-4 fill-current" />
                      <span>Paling Sering Dibaca</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0A192F]">
                      Buku Terpopuler Warga
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setSortBy('populer');
                      setActiveTab('katalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs sm:text-sm font-bold text-[#1E3A8A] hover:text-[#0A192F] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Buka Semua Katalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {popularBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      isFavorite={favorites.includes(book.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectBook={setDetailBook}
                      onQuickRead={handleOpenReader}
                    />
                  ))}
                </div>
              </section>

              {/* New Releases Section */}
              <section id="home-newest-books" className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Koleksi Terkini 2024</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0A192F]">
                      Buku Baru Ditambahkan
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setSortBy('terbaru');
                      setActiveTab('katalog');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs sm:text-sm font-bold text-[#1E3A8A] hover:text-[#0A192F] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lihat Koleksi Terbaru</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {newestBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      isFavorite={favorites.includes(book.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectBook={setDetailBook}
                      onQuickRead={handleOpenReader}
                    />
                  ))}
                </div>
              </section>

              {/* Village Literacy Mission Banner */}
              <section className="bg-gradient-to-br from-[#0A192F] via-[#162A45] to-[#1E3A5F] rounded-3xl p-6 sm:p-10 text-white border border-[#D4AF37]/30 shadow-md relative overflow-hidden">
                <div className="max-w-2xl space-y-4 relative z-10">
                  <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#D4AF37] px-3 py-1 bg-white/10 rounded-full inline-block">
                    Inisiatif Digital Desa
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                    Mewujudkan Batursari yang Gemar Membaca & Berdaya
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Setiap warga, pelajar, petani, dan pelaku UMKM kini dapat mengakses referensi berkualitas langsung dari gawai pintar. Membaca membuka wawasan, membangun masa depan desa yang lebih maju.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setActiveTab('literasi');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5B83B] text-[#0A192F] font-bold text-xs shadow-sm transition-colors cursor-pointer"
                    >
                      Baca Program Literasi
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('tentang');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors cursor-pointer"
                    >
                      Profil KKN 47 UPGRIS
                    </button>
                  </div>
                </div>
              </section>

            </div>

          </div>
        )}

        {/* VIEW 2: KATALOG LENGKAP BUKU */}
        {activeTab === 'katalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            
            {/* Catalog Header & Controls */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
                    E-Library Koleksi Digital
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F]">
                    Katalog Buku Desa Batursari
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Menampilkan {catalogBooks.length} buku dari total {books.length} koleksi yang tersedia.
                  </p>
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-500 font-medium">Urutkan:</span>
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent font-bold text-[#0A192F] focus:outline-none cursor-pointer"
                    >
                      <option value="populer">Paling Populer</option>
                      <option value="terbaru">Terbaru (2024)</option>
                      <option value="az">Judul (A - Z)</option>
                      <option value="rating">Rating Tertinggi</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === 'grid'
                          ? 'bg-[#0A192F] text-white'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="Tampilan Grid"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === 'list'
                          ? 'bg-[#0A192F] text-white'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="Tampilan List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>

              {/* Search Bar & Category Filter Pills */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                
                {/* Search Input */}
                <div className="relative">
                  <input
                    id="catalog-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul buku, nama penulis, kategori, atau topik materi..."
                    className="w-full bg-[#FAF9F6] border border-slate-200 rounded-2xl py-3 pl-11 pr-10 text-xs sm:text-sm text-[#0A192F] placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                    >
                      Bersihkan
                    </button>
                  )}
                </div>

                {/* Category Pills Bar */}
                <CategoryFilter
                  categories={CATEGORIES_DATA}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  categoryCounts={categoryCounts}
                  totalBooks={books.length}
                />

              </div>

            </div>

            {/* Catalog Grid / List */}
            {catalogBooks.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {catalogBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      isFavorite={favorites.includes(book.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectBook={setDetailBook}
                      onQuickRead={handleOpenReader}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {catalogBooks.map((book) => {
                    const categoryMeta = CATEGORIES_DATA.find((c) => c.id === book.category);
                    const isFav = favorites.includes(book.id);
                    return (
                      <div
                        key={book.id}
                        id={`list-book-${book.id}`}
                        className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-[#D4AF37] shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div 
                            onClick={() => setDetailBook(book)}
                            className="w-16 h-22 sm:w-20 sm:h-28 rounded-xl overflow-hidden shadow-xs bg-slate-900 shrink-0 cursor-pointer"
                          >
                            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-1.5 min-w-0">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                              categoryMeta ? categoryMeta.badgeBg : 'bg-slate-100 text-slate-700'
                            }`}>
                              {book.category}
                            </span>
                            <h3 
                              onClick={() => setDetailBook(book)}
                              className="text-base font-bold font-display text-[#0A192F] hover:text-[#1E3A8A] transition-colors line-clamp-1 cursor-pointer"
                            >
                              {book.title}
                            </h3>
                            <p className="text-xs text-slate-600 truncate">{book.author} • {book.publisher} ({book.year})</p>
                            <p className="text-xs text-slate-500 line-clamp-2">{book.description}</p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <button
                            onClick={() => handleOpenReader(book)}
                            className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Baca Online</span>
                          </button>
                          <button
                            onClick={() => handleToggleFavorite(book.id)}
                            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                              isFav
                                ? 'bg-amber-50 text-amber-600 border-amber-300'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                            title={isFav ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                            <span className="sm:hidden">{isFav ? 'Favorit' : 'Simpan'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-[#0A192F]">
                  Tidak Menemukan Buku
                </h3>
                <p className="text-xs text-slate-600">
                  Tidak ada buku yang cocok dengan pencarian "{searchQuery}" pada kategori "{selectedCategory}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Semua');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0A192F] text-[#D4AF37] font-bold text-xs cursor-pointer hover:bg-[#162A45] transition-colors"
                >
                  Reset Pencarian & Kategori
                </button>
              </div>
            )}

          </div>
        )}

        {/* VIEW 3: KATEGORI LENGKAP */}
        {activeTab === 'kategori' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
                Struktur Koleksi Bacaan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F]">
                Daftar Kategori Lengkap
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Pilih topik pengetahuan yang sesuai dengan minat dan kebutuhan Anda di Desa Batursari.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES_DATA.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const sampleBooks = books.filter((b) => b.category === cat.id).slice(0, 2);
                const CatIcon = categoryIconMap[cat.iconName] || Sparkles;

                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#D4AF37] shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl ${cat.bgColor} ${cat.textColor} flex items-center justify-center`}>
                          <CatIcon className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF9F6] border border-slate-200 text-[#0A192F]">
                          {count} Buku
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold font-display text-[#0A192F]">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      {/* Sample Books in this category */}
                      {sampleBooks.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Contoh Koleksi:
                          </span>
                          {sampleBooks.map((sb) => (
                            <button
                              key={sb.id}
                              onClick={() => {
                                setDetailBook(sb);
                              }}
                              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 hover:text-[#0A192F] flex items-center gap-2 cursor-pointer truncate"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                              <span className="truncate">{sb.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setActiveTab('katalog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FAF9F6] hover:bg-[#0A192F] text-[#0A192F] hover:text-[#D4AF37] text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Lihat Semua Buku {cat.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 4: FAVORIT */}
        {activeTab === 'favorit' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FavoritesView
              favoriteBooks={favoriteBooks}
              onToggleFavorite={handleToggleFavorite}
              onSelectBook={setDetailBook}
              onQuickRead={handleOpenReader}
              onBrowseCatalog={() => {
                setActiveTab('katalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isLoggedIn={Boolean(currentUser)}
              currentUser={currentUser}
              onOpenAuth={() => handleOpenAuth('user_login')}
            />
          </div>
        )}

        {/* VIEW 5: RIWAYAT MEMBACA */}
        {activeTab === 'riwayat' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HistoryView
              readingHistory={readingHistory}
              allBooks={books}
              onResumeReading={(book, page) => handleOpenReader(book, page)}
              onClearHistory={handleClearHistory}
              onBrowseCatalog={() => {
                setActiveTab('katalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectBook={setDetailBook}
              isLoggedIn={Boolean(currentUser)}
              currentUser={currentUser}
              onOpenAuth={() => handleOpenAuth('user_login')}
            />
          </div>
        )}

        {/* VIEW 6: POJOK LITERASI DESA */}
        {activeTab === 'literasi' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PojokLiterasiSection />
          </div>
        )}

        {/* VIEW 7: TENTANG KAMI */}
        {activeTab === 'tentang' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TentangKamiSection />
          </div>
        )}

        {/* VIEW 8: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdminDashboard
              books={books}
              onAddBook={handleAddBook}
              onEditBook={handleEditBook}
              onDeleteBook={handleDeleteBook}
              onResetDefaults={handleResetDefaults}
              totalReaders={totalReadersCount}
              totalReads={totalReadsCount}
              currentUser={currentUser}
              onAdminAuthSuccess={(adminUser) => {
                setCurrentUser(adminUser);
                setToastMessage({ message: 'Login Pengelola KKN 47 Berhasil!', type: 'success' });
              }}
            />
          </div>
        )}

      </main>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={detailBook}
        isOpen={Boolean(detailBook)}
        onClose={() => setDetailBook(null)}
        isFavorite={detailBook ? favorites.includes(detailBook.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onStartReading={(book) => handleOpenReader(book)}
        relatedBooks={relatedBooks}
        onSelectRelatedBook={setDetailBook}
        readingProgress={detailBook ? readingHistory[detailBook.id]?.progressPercent : undefined}
      />

      {/* Online Book E-Reader Fullscreen/Modal */}
      <BookReader
        book={readerBook}
        isOpen={Boolean(readerBook)}
        onClose={() => setReaderBook(null)}
        onUpdateProgress={handleUpdateProgress}
        initialPage={readerInitialPage}
        isLoggedIn={Boolean(currentUser)}
        currentUser={currentUser}
        onOpenAuth={() => handleOpenAuth('user_login')}
      />

      {/* Unified User & Admin Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setToastMessage({
            message: `Selamat datang di Pojok Baca, ${user.name}!`,
            type: 'success'
          });
        }}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          setToastMessage({
            message: `Selamat datang di Pojok Baca, ${user.name}!`,
            type: 'success'
          });
        }}
      />

      {/* User Digital Membership Card & Profile Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        currentUser={currentUser}
        readingHistory={readingHistory}
        allBooks={books}
        onUpdateProfile={(updated) => {
          setCurrentUser(updated);
          updateUserProfile(updated);
          setToastMessage({
            message: 'Profil anggota berhasil diperbarui!',
            type: 'success'
          });
        }}
        onLogout={() => {
          handleLogout();
          setProfileModalOpen(false);
        }}
      />

      {/* Community Book Request Modal */}
      <BookRequestModal
        isOpen={bookRequestModalOpen}
        onClose={() => setBookRequestModalOpen(false)}
        currentUser={currentUser}
        onSubmit={(requestData) => {
          submitBookRequest(requestData);
          setToastMessage({
            message: 'Usulan buku Anda berhasil dikirim ke pengurus perpustakaan!',
            type: 'success'
          });
        }}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <NotificationToast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Main Footer */}
      <Footer
        setActiveTab={setActiveTab}
        setSelectedCategory={setSelectedCategory}
      />

    </div>
  );
}
