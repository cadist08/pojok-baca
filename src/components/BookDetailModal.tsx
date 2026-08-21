import React, { useState } from 'react';
import { Book } from '../types';
import { 
  X, 
  BookOpen, 
  Bookmark, 
  Star, 
  Eye, 
  Calendar, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Share2, 
  Sparkles,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (bookId: string) => void;
  onStartReading: (book: Book) => void;
  relatedBooks: Book[];
  onSelectRelatedBook: (book: Book) => void;
  readingProgress?: number;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onStartReading,
  relatedBooks,
  onSelectRelatedBook,
  readingProgress
}) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen || !book) return null;

  const categoryMeta = CATEGORIES_DATA.find((c) => c.id === book.category);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${book.title} - Pojok Baca Desa Batursari`,
        text: `Yuk baca buku "${book.title}" gratis di Pojok Baca Digital Desa Batursari!`,
        url: window.location.href,
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div 
        id="book-detail-modal"
        className="relative bg-[#FAF9F6] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#D4AF37]/50 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header bar */}
        <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">
              Detail Buku & Informasi Bacaan
            </span>
            <span className="text-slate-300 text-xs">• Pojok Baca Batursari</span>
          </div>
          
          <button
            id="close-detail-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Col: Cover Image & Quick Action */}
            <div className="md:col-span-4 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#D4AF37]/40 bg-slate-900 aspect-[3/4] max-w-xs mx-auto md:max-w-none">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Category Pill on Cover */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-xs backdrop-blur-md ${
                    categoryMeta ? categoryMeta.badgeBg : 'bg-slate-800 text-white'
                  }`}>
                    {book.category}
                  </span>
                </div>

                {/* Progress Overlay */}
                {readingProgress !== undefined && readingProgress > 0 && (
                  <div className="absolute bottom-0 inset-x-0 bg-black/75 p-2 text-center text-xs text-[#D4AF37] font-semibold">
                    Progress: {Math.round(readingProgress)}% dibaca
                  </div>
                )}
              </div>

              {/* Action Buttons under cover */}
              <div className="space-y-2.5">
                <button
                  id="modal-start-reading-btn"
                  onClick={() => onStartReading(book)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-sm shadow-sm flex items-center justify-center gap-2 border border-[#D4AF37]/50 transition-transform active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Baca Sekarang</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="modal-toggle-favorite-btn"
                    onClick={() => onToggleFavorite(book.id)}
                    className={`py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      isFavorite
                        ? 'bg-[#D4AF37] text-[#0A192F] border-[#D4AF37]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                    <span>{isFavorite ? 'Tersimpan' : 'Favorit'}</span>
                  </button>

                  <button
                    id="modal-share-btn"
                    onClick={handleShare}
                    className={`py-2.5 px-3 rounded-xl font-semibold text-xs border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Tersalin!' : 'Bagikan'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Col: Metadata & Synopsis */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Title & Author */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2D5A27]">
                  <Sparkles className="w-4 h-4" />
                  <span>Koleksi Terverifikasi KKN Tematik 47</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F] leading-tight">
                  {book.title}
                </h2>

                <p className="text-sm font-medium text-slate-600">
                  Ditulis oleh: <strong className="text-[#0A192F]">{book.author}</strong>
                </p>
              </div>

              {/* Badges and metadata grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-600 block">Penerbit</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#0A192F]">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{book.publisher}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-600 block">Tahun Terbit</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#0A192F]">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{book.year}</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-600 block">Total Halaman</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#0A192F]">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{book.totalPages} Halaman</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-600 block">Pembaca / Rating</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#0A192F]">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                    <span>{book.rating.toFixed(1)} ({book.readCount})</span>
                  </div>
                </div>
              </div>

              {/* Synopsis & Overview */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A192F] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  Sinopsis / Ringkasan Buku
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-white/70 p-4 rounded-xl border border-slate-200">
                  {book.synopsis || book.description}
                </p>
              </div>

              {/* Table of Contents Preview */}
              {book.chapters && book.chapters.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A192F] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#2D5A27]" />
                    Daftar Bab & Pembahasan
                  </h3>
                  <div className="space-y-2">
                    {book.chapters.map((ch, idx) => (
                      <div
                        key={ch.id || idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs hover:border-[#D4AF37] transition-colors"
                      >
                        <div className="flex items-center gap-2.5 font-medium text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-[#52B788] shrink-0" />
                          <span>{ch.title}</span>
                        </div>
                        <span className="text-slate-600 font-mono text-[11px] shrink-0">
                          Hal. {ch.startPage} - {ch.endPage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Related Recommended Books */}
          {relatedBooks.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-display text-[#0A192F] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  Rekomendasi Buku Sejenis Lainnya
                </h3>
                <span className="text-xs text-slate-600">Kategori {book.category}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {relatedBooks.map((relBook) => (
                  <div
                    key={relBook.id}
                    onClick={() => onSelectRelatedBook(relBook)}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#D4AF37] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2"
                  >
                    <img
                      src={relBook.coverUrl}
                      alt={relBook.title}
                      className="w-full h-28 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-xs font-bold font-display text-[#0A192F] line-clamp-2 leading-snug">
                        {relBook.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 truncate mt-0.5">{relBook.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
