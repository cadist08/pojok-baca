import React, { useState } from 'react';
import { 
  X, 
  BookPlus, 
  Send, 
  CheckCircle2, 
  User, 
  BookOpen, 
  MessageSquare, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { UserProfile } from '../types';

interface BookRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSubmitRequest: (request: {
    bookTitle: string;
    author: string;
    category: string;
    requesterName: string;
    requesterContact: string;
    reason: string;
  }) => void;
}

export const BookRequestModal: React.FC<BookRequestModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSubmitRequest,
}) => {
  if (!isOpen) return null;

  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Pendidikan');
  const [requesterName, setRequesterName] = useState(currentUser?.name || '');
  const [requesterContact, setRequesterContact] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) return;

    onSubmitRequest({
      bookTitle: bookTitle.trim(),
      author: author.trim() || 'Tidak diketahui',
      category,
      requesterName: requesterName.trim() || 'Warga Batursari',
      requesterContact: requesterContact.trim() || '-',
      reason: reason.trim() || 'Mendukung minat baca masyarakat Desa Batursari'
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      // Reset
      setBookTitle('');
      setAuthor('');
      setReason('');
      setRequesterContact('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        id="book-request-modal"
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center">
              <BookPlus className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Usulkan Buku Baru
              </h3>
              <p className="text-[11px] text-[#D4AF37]">
                Kotak Partisipasi Literasi Warga Desa Batursari
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800 font-display">
                Terima Kasih Atas Usulan Anda!
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Usulan buku telah diteruskan ke Tim Pengelola KKN 47 UPGRIS dan Pemerintah Desa Batursari untuk pengadaan koleksi berikutnya.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <p className="text-xs text-slate-600">
                Punya judul buku, topik pelajaran, atau materi keterampilan yang ingin dibaca di Pojok Baca Batursari? Sampaikan di sini:
              </p>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                  <span>Judul Buku / Topik yang Diusulkan *</span>
                </label>
                <input
                  type="text"
                  required
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  placeholder="Contoh: Budidaya Jamur Tiram / Cerita Rakyat Demak"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Penulis / Pengarang (Opsional)
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    placeholder="Nama Pengarang"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Kategori Bacaan
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] bg-white"
                  >
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Anak-anak">Anak-anak</option>
                    <option value="Dongeng">Dongeng & Cerita</option>
                    <option value="Pertanian">Pertanian & Peternakan</option>
                    <option value="Keterampilan">Keterampilan & UMKM</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Sejarah">Sejarah & Budaya</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Agama">Agama</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Nama Pengusul</span>
                  </label>
                  <input
                    type="text"
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    placeholder="Nama Anda"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    No. WhatsApp / Kontak
                  </label>
                  <input
                    type="text"
                    value={requesterContact}
                    onChange={(e) => setRequesterContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Alasan / Manfaat untuk Warga Desa</span>
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  placeholder="Contoh: Sangat dibutuhkan untuk panduan belajar anak-anak di Dusun Krajan..."
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#1E431B] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Usulan Buku</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
