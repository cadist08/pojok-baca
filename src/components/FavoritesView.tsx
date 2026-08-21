import React from 'react';
import { Book, UserProfile } from '../types';
import { BookCard } from './BookCard';
import { Bookmark, Sparkles, BookOpen, ArrowRight, LogIn, ShieldAlert } from 'lucide-react';

interface FavoritesViewProps {
  favoriteBooks: Book[];
  onToggleFavorite: (bookId: string) => void;
  onSelectBook: (book: Book) => void;
  onQuickRead: (book: Book) => void;
  onBrowseCatalog: () => void;
  isLoggedIn?: boolean;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteBooks,
  onToggleFavorite,
  onSelectBook,
  onQuickRead,
  onBrowseCatalog,
  isLoggedIn = false,
  currentUser = null,
  onOpenAuth,
}) => {
  return (
    <div id="favorites-view" className="space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            <Bookmark className="w-4 h-4 fill-current" />
            <span>Koleksi Favorit Pribadi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F]">
            Buku yang Anda Sukai
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isLoggedIn && currentUser
              ? `Koleksi buku tersimpan milik ${currentUser.name}.`
              : 'Daftar buku pilihan yang Anda simpan untuk dibaca kembali kapan saja.'}
          </p>
        </div>

        <div className="bg-[#FAF9F6] px-4 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-2 shrink-0">
          <span className="text-2xl font-bold font-display text-[#0A192F]">
            {favoriteBooks.length}
          </span>
          <span className="text-xs text-slate-600 font-medium">Buku Tersimpan</span>
        </div>
      </div>

      {/* Guest info banner if not logged in */}
      {!isLoggedIn && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Perhatian:</strong> Masuk ke Akun Pembaca agar koleksi buku favorit Anda tersimpan permanen dan dapat diakses dari perangkat mana pun.
            </span>
          </div>
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-[11px] shrink-0 cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk Akun</span>
            </button>
          )}
        </div>
      )}

      {/* Book Grid or Empty State */}
      {favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelectBook={onSelectBook}
              onQuickRead={onQuickRead}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-300 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-[#D4AF37] flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-display text-[#0A192F]">
            Belum Ada Buku Favorit
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Klik ikon bookmark pada buku mana saja di katalog untuk menyimpannya ke daftar bacaan favorit Anda.
          </p>
          <button
            onClick={onBrowseCatalog}
            className="px-6 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-xs shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Jelajahi Katalog Buku</span>
          </button>
        </div>
      )}

    </div>
  );
};
