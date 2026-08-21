import React, { useState, useEffect, useRef } from 'react';
import { Book, BookPage, UserProfile } from '../types';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ListOrdered, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  Bookmark, 
  Sparkles, 
  RotateCcw,
  CheckCircle,
  Award,
  BookOpen,
  LogIn,
  Volume2,
  VolumeX,
  Play,
  Pause,
  StickyNote,
  Share2,
  Check,
  Type
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookReaderProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProgress: (bookId: string, page: number, totalPages: number) => void;
  initialPage?: number;
  isLoggedIn?: boolean;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

type ReaderTheme = 'paper' | 'sepia' | 'dark' | 'clean';

export const BookReader: React.FC<BookReaderProps> = ({
  book,
  isOpen,
  onClose,
  onUpdateProgress,
  initialPage = 1,
  isLoggedIn = false,
  currentUser = null,
  onOpenAuth,
}) => {
  if (!isOpen || !book) return null;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0: sm, 1: base, 2: lg, 3: xl
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>('paper');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('serif');
  const [showToc, setShowToc] = useState<boolean>(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);
  
  // Audio Speech (TTS) State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  
  // Personal Notes & Bookmark Storage
  const [userNote, setUserNote] = useState<string>('');
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>([]);
  const readerContainerRef = useRef<HTMLDivElement>(null);

  // Load bookmarks & notes for this book
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem(`bookmarks_${book.id}`);
      if (savedBookmarks) {
        setBookmarkedPages(JSON.parse(savedBookmarks));
      }
      const savedNote = localStorage.getItem(`note_${book.id}_p${currentPage}`);
      if (savedNote) {
        setUserNote(savedNote);
      } else {
        setUserNote('');
      }
    } catch {
      // ignore
    }
  }, [book.id, currentPage]);

  // Sync initial page when book opens
  useEffect(() => {
    if (initialPage && initialPage >= 1 && initialPage <= book.totalPages) {
      setCurrentPage(initialPage);
    } else {
      setCurrentPage(1);
    }
    setHasCelebrated(false);
  }, [book.id, initialPage]);

  // Stop speech when page changes or closes
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentPage, isOpen]);

  // Track progress on page changes
  useEffect(() => {
    onUpdateProgress(book.id, currentPage, book.totalPages);

    // If reached the last page, trigger celebratory confetti
    if (currentPage === book.totalPages && !hasCelebrated) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#2D6A4F', '#1E3A8A']
      });
      setHasCelebrated(true);
    }
  }, [currentPage, book.id, book.totalPages]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          toggleFullscreen();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, book.totalPages, isFullscreen]);

  const handleNextPage = () => {
    if (currentPage < book.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      readerContainerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const toggleBookmark = () => {
    let updated: number[];
    if (bookmarkedPages.includes(currentPage)) {
      updated = bookmarkedPages.filter((p) => p !== currentPage);
    } else {
      updated = [...bookmarkedPages, currentPage];
    }
    setBookmarkedPages(updated);
    try {
      localStorage.setItem(`bookmarks_${book.id}`, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleSaveNote = (text: string) => {
    setUserNote(text);
    try {
      localStorage.setItem(`note_${book.id}_p${currentPage}`, text);
    } catch {
      // ignore
    }
  };

  // Get current page content or fallback
  const currentPageData: BookPage = book.pages?.find(
    (p) => p.pageNumber === currentPage
  ) || {
    pageNumber: currentPage,
    chapterTitle: `Bab ${currentPage}`,
    title: `${book.title} - Bagian ${currentPage}`,
    paragraphs: [
      `Halaman ${currentPage} dari buku "${book.title}".`,
      book.description || book.synopsis,
      'Membaca memperluas cakrawala berpikir dan memperkaya pemahaman kita tentang ilmu pengetahuan dan kearifan hidup di Desa Batursari.'
    ]
  };

  // Text-To-Speech (TTS) Handler
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Fitur suara tidak didukung di browser ini.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const fullText = [
      currentPageData.chapterTitle,
      currentPageData.title,
      ...currentPageData.paragraphs,
      currentPageData.callout ? currentPageData.callout.text : ''
    ].filter(Boolean).join('. ');

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'id-ID';
    utterance.rate = speechRate;
    
    // Find Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find((v) => v.lang.startsWith('id') || v.lang.startsWith('ID'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleShareQuote = () => {
    const quote = `"${currentPageData.paragraphs[0]?.slice(0, 150)}..." — Dari buku ${book.title} (Pojok Baca Desa Batursari)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(quote);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2500);
    }
  };

  const fontSizes = [
    'text-sm leading-relaxed',
    'text-base leading-relaxed',
    'text-lg leading-loose',
    'text-xl leading-loose',
  ];

  const themeStyles = {
    paper: 'bg-[#FAF9F6] text-[#0A192F] border-[#D4AF37]/30',
    sepia: 'bg-[#F4ECD8] text-[#433422] border-[#C5A059]/40',
    dark: 'bg-[#0A192F] text-[#E2E8F0] border-slate-700',
    clean: 'bg-white text-[#0A192F] border-slate-200'
  };

  const progressPercent = Math.round((currentPage / book.totalPages) * 100);
  const isCurrentPageBookmarked = bookmarkedPages.includes(currentPage);

  return (
    <div
      ref={readerContainerRef}
      id="book-reader-container"
      className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex flex-col justify-between animate-fadeIn select-text"
    >
      {/* Top Reader Navbar */}
      <header className="bg-[#0A192F] text-white px-4 sm:px-6 py-3 border-b border-[#D4AF37]/40 flex items-center justify-between gap-3 shrink-0 z-20">
        
        {/* Left: Book Meta & Table of Contents Toggle */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            id="reader-toc-toggle-btn"
            onClick={() => {
              setShowToc(!showToc);
              setShowNotesDrawer(false);
            }}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
              showToc ? 'bg-[#D4AF37] text-[#0A192F]' : 'bg-[#162A45] text-slate-200 hover:bg-[#1E3A5F]'
            }`}
            title="Daftar Isi"
          >
            <ListOrdered className="w-4 h-4" />
            <span className="hidden sm:inline">Daftar Isi</span>
          </button>

          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-bold truncate text-white" title={book.title}>
              {book.title}
            </h2>
            <p className="text-[11px] text-[#D4AF37] truncate font-medium">
              {currentPageData.chapterTitle || `Halaman ${currentPage}`}
            </p>
          </div>
        </div>

        {/* Center: Progress indicator */}
        <div className="hidden md:flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-200">
            Halaman <span className="text-[#D4AF37] font-bold">{currentPage}</span> dari {book.totalPages}
          </div>
          <div className="w-36 h-1.5 bg-slate-700 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#52B788] to-[#D4AF37] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Controls (Audio Reader, Notes, Font, Theme, Fullscreen, Close) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Audio Reader Button (TTS) */}
          <button
            onClick={handleToggleSpeech}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-[#162A45] text-slate-200 hover:bg-[#1E3A5F] hover:text-[#D4AF37]'
            }`}
            title={isSpeaking ? 'Hentikan Pembaca Suara' : 'Dengarkan Bacaan (Audio)'}
          >
            {isSpeaking ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{isSpeaking ? 'Jeda Suara' : 'Dengarkan'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isCurrentPageBookmarked
                ? 'bg-[#D4AF37] text-[#0A192F]'
                : 'bg-[#162A45] text-slate-300 hover:text-white'
            }`}
            title={isCurrentPageBookmarked ? 'Hapus Penanda' : 'Tandai Halaman Ini'}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Notes Drawer Toggle */}
          <button
            onClick={() => {
              setShowNotesDrawer(!showNotesDrawer);
              setShowToc(false);
            }}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              showNotesDrawer
                ? 'bg-[#52B788] text-white'
                : 'bg-[#162A45] text-slate-300 hover:text-white'
            }`}
            title="Catatan Pribadi"
          >
            <StickyNote className="w-4 h-4" />
          </button>

          {/* Font Type Toggle (Serif / Sans) */}
          <button
            onClick={() => setFontFamily(fontFamily === 'serif' ? 'sans' : 'serif')}
            className="p-2 bg-[#162A45] hover:bg-[#1E3A5F] text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer hidden sm:flex items-center gap-1 text-xs"
            title="Ganti Jenis Huruf (Serif / Sans)"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-mono">{fontFamily}</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-[#162A45] rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setFontSizeLevel((prev) => Math.max(0, prev - 1))}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-white/10 cursor-pointer"
              title="Perkecil Tulisan"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-1.5 text-[#D4AF37]">
              {fontSizeLevel + 1}x
            </span>
            <button
              onClick={() => setFontSizeLevel((prev) => Math.min(fontSizes.length - 1, prev + 1))}
              className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-white/10 cursor-pointer"
              title="Perbesar Tulisan"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center bg-[#162A45] rounded-lg p-1 border border-slate-700 gap-1">
            <button
              onClick={() => setReaderTheme('paper')}
              className={`w-5 h-5 rounded-full bg-[#FAF9F6] border ${
                readerTheme === 'paper' ? 'ring-2 ring-[#D4AF37]' : ''
              }`}
              title="Tema Kertas Krem"
            />
            <button
              onClick={() => setReaderTheme('sepia')}
              className={`w-5 h-5 rounded-full bg-[#F4ECD8] border ${
                readerTheme === 'sepia' ? 'ring-2 ring-[#D4AF37]' : ''
              }`}
              title="Tema Sepia Hangat"
            />
            <button
              onClick={() => setReaderTheme('dark')}
              className={`w-5 h-5 rounded-full bg-[#0A192F] border border-slate-500 ${
                readerTheme === 'dark' ? 'ring-2 ring-[#D4AF37]' : ''
              }`}
              title="Tema Gelap Malam"
            />
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-[#162A45] hover:bg-[#1E3A5F] text-slate-200 hover:text-white rounded-lg transition-colors cursor-pointer"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Reader */}
          <button
            id="close-reader-btn"
            onClick={onClose}
            className="p-2 bg-rose-900/80 hover:bg-rose-800 text-white rounded-lg transition-colors cursor-pointer ml-1"
            title="Tutup Bacaan"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

      </header>

      {/* Main Reading Canvas & Sidebar Drawer */}
      <div className="relative flex-1 flex overflow-hidden">
        
        {/* Table of Contents Drawer */}
        {showToc && (
          <aside className="w-72 sm:w-80 bg-[#0A192F] text-white border-r border-[#D4AF37]/30 flex flex-col z-30 shadow-2xl animate-fadeIn">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Daftar Isi & Navigasi Bab
              </span>
              <button onClick={() => setShowToc(false)} className="text-slate-400 hover:text-white text-xs">
                Tutup ✕
              </button>
            </div>

            <div className="overflow-y-auto p-3 space-y-1.5 flex-1">
              {book.chapters && book.chapters.length > 0 ? (
                book.chapters.map((ch, idx) => (
                  <button
                    key={ch.id || idx}
                    onClick={() => {
                      setCurrentPage(ch.startPage);
                      setShowToc(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                      currentPage >= ch.startPage && currentPage <= ch.endPage
                        ? 'bg-[#162A45] text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="line-clamp-2">{ch.title}</span>
                    <span className="font-mono text-[10px] text-slate-400 shrink-0 ml-2">
                      Hal {ch.startPage}
                    </span>
                  </button>
                ))
              ) : (
                <div className="text-xs text-slate-400 p-3">
                  Tidak ada daftar bab terpisah.
                </div>
              )}

              {/* Direct Page Jump Buttons */}
              <div className="pt-4 border-t border-slate-700">
                <span className="text-[11px] text-slate-400 font-semibold px-2 block mb-2">
                  Lompat Langsung ke Halaman:
                </span>
                <div className="grid grid-cols-5 gap-1.5 px-2">
                  {Array.from({ length: book.totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          setShowToc(false);
                        }}
                        className={`p-2 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-[#D4AF37] text-[#0A192F]'
                            : 'bg-[#162A45] text-slate-300 hover:bg-[#1E3A5F]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Personal Notes Drawer */}
        {showNotesDrawer && (
          <aside className="w-72 sm:w-80 bg-[#0A192F] text-white border-r border-[#52B788]/30 flex flex-col z-30 shadow-2xl animate-fadeIn">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#52B788] flex items-center gap-1.5">
                <StickyNote className="w-3.5 h-3.5" />
                Catatan Halaman {currentPage}
              </span>
              <button onClick={() => setShowNotesDrawer(false)} className="text-slate-400 hover:text-white text-xs">
                Tutup ✕
              </button>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col">
              <p className="text-[11px] text-slate-400">
                Tuliskan rangkuman, kutipan penting, atau catatan belajar Anda untuk halaman ini:
              </p>
              <textarea
                value={userNote}
                onChange={(e) => handleSaveNote(e.target.value)}
                placeholder="Tulis catatan Anda di sini (otomatis tersimpan)..."
                className="flex-1 w-full p-3 rounded-xl bg-[#112240] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52B788] resize-none"
              />
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Tersimpan otomatis di sesi akun</span>
                <button
                  onClick={handleShareQuote}
                  className="text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
                  <span>{copiedSnippet ? 'Tersalin!' : 'Salin Kutipan'}</span>
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Main Book Page Content Viewer */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 flex justify-center items-start transition-colors duration-300 ${themeStyles[readerTheme]}`}>
          
          <article className={`w-full max-w-3xl space-y-6 bg-transparent my-auto ${fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}>
            
            {/* Page Header metadata */}
            <div className="border-b border-current/20 pb-4 flex items-center justify-between opacity-80 text-xs font-mono">
              <span className="uppercase tracking-wider font-semibold">
                {book.category} • {book.publisher}
              </span>
              <div className="flex items-center gap-2">
                {isCurrentPageBookmarked && (
                  <span className="bg-[#D4AF37] text-[#0A192F] px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <Bookmark className="w-3 h-3 fill-current" /> Ditandai
                  </span>
                )}
                <span className="font-bold text-[#D4AF37]">
                  Halaman {currentPage} dari {book.totalPages}
                </span>
              </div>
            </div>

            {/* Chapter & Page Title */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider opacity-75 block text-[#2D5A27]">
                {currentPageData.chapterTitle}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display leading-tight">
                {currentPageData.title}
              </h1>
            </div>

            {/* Paragraphs Body */}
            <div className={`space-y-4 font-normal ${fontSizes[fontSizeLevel]}`}>
              {currentPageData.paragraphs.map((p, idx) => (
                <p key={idx} className="indent-6 sm:indent-8">
                  {p}
                </p>
              ))}
            </div>

            {/* Callout Box / Tip / Quote if available */}
            {currentPageData.callout && (
              <div className={`p-4 sm:p-5 rounded-2xl border-l-4 my-6 shadow-sm ${
                readerTheme === 'dark' 
                  ? 'bg-[#112240] border-[#D4AF37] text-slate-200'
                  : 'bg-[#FAF9F6] border-[#D4AF37] text-[#0A192F]'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1 text-[#D4AF37]">
                  <Sparkles className="w-4 h-4" />
                  <span>{currentPageData.callout.title}</span>
                </div>
                <p className="text-sm font-medium italic">
                  "{currentPageData.callout.text}"
                </p>
              </div>
            )}

            {/* Keypoints list if available */}
            {currentPageData.keyPoints && currentPageData.keyPoints.length > 0 && (
              <div className="p-4 rounded-xl bg-current/5 border border-current/10 space-y-2 my-4">
                <h4 className="text-xs font-bold uppercase tracking-wider opacity-85 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#52B788]" />
                  Poin Penting Bacaan:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm pl-4 list-disc">
                  {currentPageData.keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Completion Banner on final page */}
            {currentPage === book.totalPages && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1B4332] to-[#0A192F] text-white border-2 border-[#D4AF37] shadow-xl text-center space-y-3 mt-8 animate-bounce-short">
                <Award className="w-10 h-10 text-[#D4AF37] mx-auto" />
                <h3 className="text-lg font-bold font-display text-[#D4AF37]">
                  Selamat! Anda Telah Menyelesaikan Buku Ini
                </h3>
                <p className="text-xs text-slate-200 max-w-md mx-auto">
                  Semoga ilmu dan wawasan yang diperoleh bermanfaat bagi kehidupan sehari-hari di Desa Batursari.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Baca Ulang</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0A192F] text-xs font-bold hover:bg-[#E5B83B] transition-colors cursor-pointer"
                  >
                    Tutup & Pilih Buku Lain
                  </button>
                </div>
              </div>
            )}

            {/* Footer page stamp */}
            <div className="pt-8 border-t border-current/20 flex items-center justify-between opacity-60 text-xs font-mono">
              <span>Perpustakaan Digital Pojok Baca Batursari</span>
              <span>Hal. {currentPage}</span>
            </div>

          </article>

        </main>

      </div>

      {/* Bottom Reader Navigation Toolbar */}
      <footer className="bg-[#0A192F] text-white px-4 sm:px-8 py-3 border-t border-[#D4AF37]/40 flex items-center justify-between gap-4 shrink-0 z-20">
        
        {/* Prev Page Button */}
        <button
          id="reader-prev-btn"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentPage <= 1
              ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-400'
              : 'bg-[#162A45] hover:bg-[#1E3A5F] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        {/* Page Slider / Jump Selector */}
        <div className="flex-1 max-w-md flex items-center gap-3 mx-2">
          <span className="text-xs font-mono text-slate-300 hidden sm:inline">Hal {currentPage}</span>
          <input
            id="reader-page-slider"
            type="range"
            min={1}
            max={book.totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
          />
          <span className="text-xs font-mono text-slate-300 hidden sm:inline">Total {book.totalPages}</span>
        </div>

        {/* Next Page Button */}
        <button
          id="reader-next-btn"
          onClick={handleNextPage}
          disabled={currentPage >= book.totalPages}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            currentPage >= book.totalPages
              ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-400'
              : 'bg-[#D4AF37] hover:bg-[#E5B83B] text-[#0A192F] shadow-sm'
          }`}
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </footer>

    </div>
  );
};
