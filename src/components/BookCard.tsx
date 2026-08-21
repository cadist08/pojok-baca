import React from 'react';
import { Book } from '../types';
import { 
  BookOpen, 
  Bookmark, 
  Eye, 
  Star, 
  Calendar, 
  Sparkles,
  Flame,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (bookId: string) => void;
  onSelectBook: (book: Book) => void;
  onQuickRead: (book: Book) => void;
  readingProgress?: number;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isFavorite,
  onToggleFavorite,
  onSelectBook,
  onQuickRead,
  readingProgress
}) => {
  const categoryMeta = CATEGORIES_DATA.find((c) => c.id === book.category);

  return (
    <div
      id={`book-card-${book.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Cover Image Container */}
      <div 
        onClick={() => onSelectBook(book)}
        className="relative h-56 sm:h-64 overflow-hidden bg-slate-900 cursor-pointer"
      >
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category Badge Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs backdrop-blur-md ${
            categoryMeta ? categoryMeta.badgeBg : 'bg-slate-800 text-white'
          }`}>
            {book.category}
          </span>
        </div>

        {/* Favorite toggle button */}
        <button
          id={`favorite-btn-${book.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-sm ${
            isFavorite
              ? 'bg-[#D4AF37] text-[#0A192F]'
              : 'bg-black/50 text-white hover:bg-[#D4AF37] hover:text-[#0A192F]'
          }`}
          title={isFavorite ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Badges: Populer / Baru / Rekomendasi */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          {book.isPopular ? (
            <span className="flex items-center gap-1 bg-amber-500/90 text-[#0A192F] font-bold text-[10px] uppercase px-2 py-0.5 rounded-md">
              <Flame className="w-3 h-3 fill-current" /> Populer
            </span>
          ) : book.isNew ? (
            <span className="flex items-center gap-1 bg-[#2D5A27] text-emerald-100 font-bold text-[10px] uppercase px-2 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3" /> Baru
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-2.5 bg-black/60 px-2 py-1 rounded-md text-[11px] font-medium backdrop-blur-sm">
            <span className="flex items-center gap-1 text-amber-300">
              <Star className="w-3 h-3 fill-current" />
              {book.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Eye className="w-3 h-3" />
              {book.readCount}
            </span>
          </div>
        </div>

        {/* Reading progress overlay if exists */}
        {readingProgress !== undefined && readingProgress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/50">
            <div
              className="h-full bg-gradient-to-r from-[#52B788] to-[#D4AF37]"
              style={{ width: `${Math.min(100, readingProgress)}%` }}
            />
          </div>
        )}
      </div>

      {/* Book Metadata and Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
            <span className="truncate">{book.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1 shrink-0">
              <Calendar className="w-3 h-3" /> {book.year}
            </span>
          </div>

          <h3
            onClick={() => onSelectBook(book)}
            className="text-base font-bold font-display text-[#0A192F] line-clamp-2 leading-snug group-hover:text-[#1E3A8A] transition-colors cursor-pointer"
            title={book.title}
          >
            {book.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {book.description || book.synopsis}
          </p>
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelectBook(book)}
            className="text-xs font-semibold text-[#1E3A8A] hover:text-[#0A192F] hover:underline cursor-pointer"
          >
            Detail Buku
          </button>

          <button
            id={`read-now-btn-${book.id}`}
            onClick={() => onQuickRead(book)}
            className="px-3.5 py-1.5 rounded-lg bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Baca Online</span>
          </button>
        </div>

      </div>
    </div>
  );
};
