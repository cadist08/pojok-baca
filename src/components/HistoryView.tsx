import React from 'react';
import { Book, ReadingProgress, UserProfile } from '../types';
import { 
  History, 
  BookOpen, 
  Play, 
  CheckCircle, 
  RotateCcw, 
  Trash2, 
  Calendar,
  Clock,
  LogIn,
  User,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';

interface HistoryViewProps {
  readingHistory: Record<string, ReadingProgress>;
  allBooks: Book[];
  onResumeReading: (book: Book, startPage: number) => void;
  onClearHistory: () => void;
  onBrowseCatalog: () => void;
  onSelectBook: (book: Book) => void;
  isLoggedIn?: boolean;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  readingHistory,
  allBooks,
  onResumeReading,
  onClearHistory,
  onBrowseCatalog,
  onSelectBook,
  isLoggedIn = false,
  currentUser = null,
  onOpenAuth,
}) => {
  const historyEntries = (Object.values(readingHistory) as ReadingProgress[]).sort(
    (a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime()
  );

  const historyBooksWithMeta = historyEntries
    .map((entry) => {
      const book = allBooks.find((b) => b.id === entry.bookId);
      return book ? { book, progress: entry } : null;
    })
    .filter(Boolean) as { book: Book; progress: ReadingProgress }[];

  return (
    <div id="history-view" className="space-y-8 py-6">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
            <History className="w-4 h-4" />
            <span>Aktivitas Membaca Terakhir</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0A192F]">
            Riwayat Bacaan Saya
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isLoggedIn && currentUser
              ? `Tersinkronisasi untuk akun ${currentUser.name} (${currentUser.village || 'Warga Batursari'}).`
              : 'Lanjutkan membaca dari halaman terakhir yang Anda tinggalkan tanpa kehilangan progress.'}
          </p>
        </div>

        {isLoggedIn && historyBooksWithMeta.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Bersihkan Riwayat</span>
          </button>
        )}
      </div>

      {/* Guest Warning Card if not logged in */}
      {!isLoggedIn && (
        <div className="bg-amber-50/90 border-2 border-amber-300/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs animate-fadeIn">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full">
                  Perlu Masuk Akun
                </span>
                <span className="text-xs text-amber-800 font-semibold">Mode Pembaca Tamu</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-amber-950">
                Masuk untuk Menyimpan Progres Halaman & Riwayat Membaca
              </h3>
              <p className="text-xs text-slate-700 max-w-2xl leading-relaxed">
                Saat ini Anda dapat membaca buku di katalog secara bebas. Namun, agar <strong>halaman terakhir yang Anda baca tidak hilang</strong> dan otomatis tersimpan di cloud Supabase, silakan masuk atau daftar akun warga/pelajar terlebih dahulu.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk / Daftar Akun</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* History Items List (When Logged in & has history) */}
      {isLoggedIn && historyBooksWithMeta.length > 0 ? (
        <div className="space-y-4">
          {historyBooksWithMeta.map(({ book, progress }) => {
            const categoryMeta = CATEGORIES_DATA.find((c) => c.id === book.category);
            const isFinished = progress.currentPage >= book.totalPages;

            return (
              <div
                key={book.id}
                id={`history-item-${book.id}`}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-[#D4AF37] shadow-xs hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Book Cover & Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div 
                    onClick={() => onSelectBook(book)}
                    className="w-16 h-22 sm:w-20 sm:h-28 rounded-xl overflow-hidden shadow-xs bg-slate-900 shrink-0 cursor-pointer"
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      categoryMeta ? categoryMeta.badgeBg : 'bg-slate-100 text-slate-700'
                    }`}>
                      {book.category}
                    </span>

                    <h3 
                      onClick={() => onSelectBook(book)}
                      className="text-base font-bold font-display text-[#0A192F] hover:text-[#1E3A8A] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {book.title}
                    </h3>

                    <p className="text-xs text-slate-600 truncate">{book.author}</p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-600 pt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        Terakhir: {new Date(progress.lastReadAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Continue Action */}
                <div className="w-full sm:w-64 space-y-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">
                      Halaman <strong className="text-[#0A192F]">{progress.currentPage}</strong> dari {book.totalPages}
                    </span>
                    <span className={`font-mono font-bold ${
                      isFinished ? 'text-[#2D5A27]' : 'text-[#D4AF37]'
                    }`}>
                      {progress.progressPercent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isFinished ? 'bg-[#2D5A27]' : 'bg-gradient-to-r from-[#52B788] to-[#D4AF37]'
                      }`}
                      style={{ width: `${progress.progressPercent}%` }}
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onResumeReading(book, progress.currentPage)}
                    className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                      isFinished
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37]'
                    }`}
                  >
                    {isFinished ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Baca Ulang Buku</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Lanjutkan Halaman {progress.currentPage}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : isLoggedIn ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-300 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold font-display text-[#0A192F]">
            Belum Ada Riwayat Membaca
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Halo <strong>{currentUser?.name}</strong>, buku yang Anda buka dan baca secara online akan otomatis tercatat di sini beserta halaman terakhir Anda.
          </p>
          <button
            onClick={onBrowseCatalog}
            className="px-6 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-xs shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Mulai Membaca Buku</span>
          </button>
        </div>
      ) : (
        /* Empty Guest State when not logged in */
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-[#0A192F]">
            Riwayat Tersedia Setelah Masuk Akun
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Daftar buku yang sedang Anda baca akan tersusun rapi di halaman ini setelah Anda masuk ke akun.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#162A45] text-[#D4AF37] font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Masuk / Daftar
              </button>
            )}
            <button
              onClick={onBrowseCatalog}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Lihat Katalog
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
