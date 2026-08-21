import { BookCategory } from '../types';

export interface CategoryInfo {
  id: BookCategory;
  name: BookCategory;
  description: string;
  iconName: string;
  bgColor: string;
  textColor: string;
  badgeBg: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'Pendidikan',
    name: 'Pendidikan',
    description: 'Panduan belajar, kurikulum sekolah, tips belajar mandiri, dan metode numerasi-literasi.',
    iconName: 'GraduationCap',
    bgColor: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200',
    textColor: 'text-blue-900',
    badgeBg: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'Anak-anak',
    name: 'Anak-anak',
    description: 'Buku cerita bergambar, pengenalan huruf/angka, dan petualangan fauna sahabat cilik.',
    iconName: 'Smile',
    bgColor: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200',
    textColor: 'text-amber-900',
    badgeBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'Dongeng',
    name: 'Dongeng',
    description: 'Cerita rakyat Nusantara, fabel nusantara berhikmah, dan legenda pesisir Jawa Tengah.',
    iconName: 'Sparkles',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200',
    textColor: 'text-emerald-900',
    badgeBg: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'Pengetahuan',
    name: 'Pengetahuan',
    description: 'Ensiklopedia sains sederhana, keajaiban bumi, antariksa, dan fenomena alam.',
    iconName: 'Globe',
    bgColor: 'bg-cyan-50 hover:bg-cyan-100/80 border-cyan-200',
    textColor: 'text-cyan-900',
    badgeBg: 'bg-cyan-100 text-cyan-800'
  },
  {
    id: 'Sejarah',
    name: 'Sejarah',
    description: 'Jejak Kesultanan Demak Bintoro, arsitektur Masjid Agung Demak, dan kearifan lokal.',
    iconName: 'Landmark',
    bgColor: 'bg-stone-100 hover:bg-stone-200/80 border-stone-300',
    textColor: 'text-stone-900',
    badgeBg: 'bg-stone-200 text-stone-800'
  },
  {
    id: 'Agama',
    name: 'Agama',
    description: 'Tuntunan doa harian, akhlakul karimah, keteladanan para Nabi, dan ibadah praktis.',
    iconName: 'HeartHandshake',
    bgColor: 'bg-teal-50 hover:bg-teal-100/80 border-teal-200',
    textColor: 'text-teal-900',
    badgeBg: 'bg-teal-100 text-teal-800'
  },
  {
    id: 'Teknologi',
    name: 'Teknologi',
    description: 'Literasi digital, internet cerdas & aman, menangkal hoaks, dan aplikasi produktif.',
    iconName: 'Laptop',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200',
    textColor: 'text-indigo-900',
    badgeBg: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'Keterampilan',
    name: 'Keterampilan',
    description: 'Ide usaha UMKM rumahan, kerajinan tangan daur ulang, dan resep olahan lokal.',
    iconName: 'Scissors',
    bgColor: 'bg-orange-50 hover:bg-orange-100/80 border-orange-200',
    textColor: 'text-orange-900',
    badgeBg: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'Pertanian',
    name: 'Pertanian',
    description: 'Budidaya padi ramah lingkungan, pupuk organik cair, dan hidroponik pekarangan.',
    iconName: 'Sprout',
    bgColor: 'bg-green-50 hover:bg-green-100/80 border-green-200',
    textColor: 'text-green-900',
    badgeBg: 'bg-green-100 text-green-800'
  },
  {
    id: 'Kesehatan',
    name: 'Kesehatan',
    description: 'Pedoman gizi cegah stunting, Isi Piringku, sanitasi lingkungan, dan P3K keluarga.',
    iconName: 'HeartPulse',
    bgColor: 'bg-rose-50 hover:bg-rose-100/80 border-rose-200',
    textColor: 'text-rose-900',
    badgeBg: 'bg-rose-100 text-rose-800'
  }
];
