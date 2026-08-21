export type BookCategory =
  | 'Pendidikan'
  | 'Anak-anak'
  | 'Dongeng'
  | 'Pengetahuan'
  | 'Sejarah'
  | 'Agama'
  | 'Teknologi'
  | 'Keterampilan'
  | 'Pertanian'
  | 'Kesehatan';

export interface BookPage {
  pageNumber: number;
  chapterTitle: string;
  title: string;
  paragraphs: string[];
  callout?: {
    type: 'tip' | 'info' | 'quote' | 'highlight';
    title: string;
    text: string;
  };
  keyPoints?: string[];
  imageUrl?: string;
  imageCaption?: string;
}

export interface BookChapter {
  id: string;
  title: string;
  startPage: number;
  endPage: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  category: BookCategory;
  coverUrl: string;
  coverColor?: string;
  description: string;
  synopsis: string;
  totalPages: number;
  readCount: number;
  likesCount: number;
  isPopular?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  chapters: BookChapter[];
  pages: BookPage[];
  uploadedAt: string;
}

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  progressPercent: number;
  lastReadAt: string;
  isCompleted: boolean;
}

export interface LiteracyArticle {
  id: string;
  title: string;
  category: 'Desa Batursari' | 'Tips Membaca' | 'Artikel Literasi' | 'Dokumentasi KKN';
  date: string;
  author: string;
  readTime: string;
  imageUrl: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface KKNMember {
  id: string;
  name: string;
  role: string;
  major: string;
  quote?: string;
}

export interface VillageStat {
  label: string;
  value: string | number;
  iconName: string;
  description: string;
}

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  village?: string;
  schoolOrAffiliation?: string;
  createdAt: string;
}

export interface AuthSession {
  user: UserProfile | null;
  isAuthenticated: boolean;
  token?: string;
}
