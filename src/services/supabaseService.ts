import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { Book, ReadingProgress, UserProfile, UserRole } from '../types';
import { INITIAL_BOOKS } from '../data/initialBooks';

const SESSION_STORAGE_KEY = 'batursari_auth_user';
const USERS_STORAGE_KEY = 'batursari_registered_users';

// Transform DB row (snake_case) to Book object (camelCase)
const mapRowToBook = (row: any): Book => ({
  id: row.id,
  title: row.title,
  author: row.author,
  publisher: row.publisher || 'Pojok Baca Batursari Press',
  year: row.year || new Date().getFullYear(),
  category: row.category,
  coverUrl: row.cover_url || row.coverUrl,
  coverColor: row.cover_color || row.coverColor,
  description: row.description || '',
  synopsis: row.synopsis || row.description || '',
  totalPages: row.total_pages || row.totalPages || 1,
  readCount: row.read_count ?? row.readCount ?? 0,
  likesCount: row.likes_count ?? row.likesCount ?? 0,
  isPopular: Boolean(row.is_popular ?? row.isPopular),
  isNew: Boolean(row.is_new ?? row.isNew),
  isFeatured: Boolean(row.is_featured ?? row.isFeatured),
  rating: row.rating ? Number(row.rating) : 4.8,
  chapters: Array.isArray(row.chapters) ? row.chapters : [],
  pages: Array.isArray(row.pages) ? row.pages : [],
  uploadedAt: row.uploaded_at || row.uploadedAt || new Date().toISOString(),
});

// Transform Book object to DB row (snake_case)
const mapBookToRow = (book: Book) => ({
  id: book.id,
  title: book.title,
  author: book.author,
  publisher: book.publisher,
  year: book.year,
  category: book.category,
  cover_url: book.coverUrl,
  cover_color: book.coverColor,
  description: book.description,
  synopsis: book.synopsis,
  total_pages: book.totalPages,
  read_count: book.readCount,
  likes_count: book.likesCount,
  is_popular: book.isPopular || false,
  is_new: book.isNew || false,
  is_featured: book.isFeatured || false,
  rating: book.rating,
  chapters: book.chapters,
  pages: book.pages,
  uploaded_at: book.uploadedAt,
});

/**
 * Fetch all books from Supabase or fallback to LocalStorage/Initial
 */
export async function fetchBooks(): Promise<Book[]> {
  const client = getSupabaseClient();
  if (!client) {
    const saved = localStorage.getItem('batursari_books');
    if (saved) {
      try {
        const parsed: Book[] = JSON.parse(saved);
        const existingIds = new Set(parsed.map((b) => b.id));
        const missingInitial = INITIAL_BOOKS.filter((b) => !existingIds.has(b.id));
        if (missingInitial.length > 0) {
          const merged = [...parsed, ...missingInitial];
          localStorage.setItem('batursari_books', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch {
        return INITIAL_BOOKS;
      }
    }
    return INITIAL_BOOKS;
  }

  try {
    const { data, error } = await client
      .from('books')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.warn('Supabase query error, falling back to local data:', error.message);
      const saved = localStorage.getItem('batursari_books');
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    }

    if (!data || data.length === 0) {
      return INITIAL_BOOKS;
    }

    return data.map(mapRowToBook);
  } catch (err) {
    console.error('Error fetching books from Supabase:', err);
    return INITIAL_BOOKS;
  }
}

/**
 * Insert a new book into Supabase
 */
export async function insertBook(book: Book): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) {
    return true;
  }

  try {
    const row = mapBookToRow(book);
    const { error } = await client.from('books').insert([row]);
    if (error) {
      console.error('Error inserting book into Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error inserting book:', err);
    return false;
  }
}

/**
 * Update an existing book in Supabase
 */
export async function updateBook(book: Book): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) {
    return true;
  }

  try {
    const row = mapBookToRow(book);
    const { error } = await client.from('books').update(row).eq('id', book.id);
    if (error) {
      console.error('Error updating book in Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error updating book:', err);
    return false;
  }
}

/**
 * Delete a book from Supabase
 */
export async function deleteBook(bookId: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) {
    return true;
  }

  try {
    const { error } = await client.from('books').delete().eq('id', bookId);
    if (error) {
      console.error('Error deleting book in Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleting book:', err);
    return false;
  }
}

/**
 * Increment reading count for a book
 */
export async function incrementBookReadCount(bookId: string, currentCount: number): Promise<void> {
  const client = getSupabaseClient();
  if (!client) return;

  try {
    await client
      .from('books')
      .update({ read_count: currentCount + 1 })
      .eq('id', bookId);
  } catch (e) {
    console.warn('Failed to increment read count on Supabase', e);
  }
}

// ==============================================================================
// AUTHENTICATION & USER MANAGEMENT
// ==============================================================================

/**
 * Get currently logged-in user from local storage
 */
export function getStoredUserSession(): UserProfile | null {
  const data = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * Alias for getStoredUserSession
 */
export const getCurrentUserSession = getStoredUserSession;

/**
 * Save user session to local storage
 */
export function saveUserSession(user: UserProfile | null): void {
  if (user) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

/**
 * Initial registered members of Batursari Digital Library
 */
const DEFAULT_INITIAL_MEMBERS = [
  {
    id: 'user-warga-1',
    name: 'Budi Santoso',
    email: 'budi@batursari.desa.id',
    password: 'password123',
    role: 'user' as UserRole,
    village: 'Dusun Krajan RT 02, Desa Batursari',
    schoolOrAffiliation: 'Kelompok Tani Makmur',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    createdAt: '2026-01-10T08:00:00.000Z'
  },
  {
    id: 'user-siswa-2',
    name: 'Siti Aminah',
    email: 'siti@batursari.desa.id',
    password: 'password123',
    role: 'user' as UserRole,
    village: 'Dusun Jetis, Desa Batursari',
    schoolOrAffiliation: 'SDN 1 Batursari',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    createdAt: '2026-02-01T09:30:00.000Z'
  }
];

function getRegisteredUsers(): any[] {
  const saved = localStorage.getItem(USERS_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_INITIAL_MEMBERS));
    return DEFAULT_INITIAL_MEMBERS;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return DEFAULT_INITIAL_MEMBERS;
  }
}

/**
 * Get all registered library members for admin management
 */
export function getAllRegisteredMembers(): UserProfile[] {
  const users = getRegisteredUsers();
  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role || 'user',
    village: u.village || 'Desa Batursari',
    schoolOrAffiliation: u.schoolOrAffiliation || 'Warga Batursari',
    avatarUrl: u.avatarUrl,
    createdAt: u.createdAt || new Date().toISOString()
  }));
}

/**
 * Update User Profile
 */
export async function updateUserProfile(profile: UserProfile): Promise<{ success: boolean; message: string }> {
  saveUserSession(profile);

  const users = getRegisteredUsers();
  const index = users.findIndex((u) => u.id === profile.id || u.email === profile.email);
  if (index >= 0) {
    users[index] = {
      ...users[index],
      name: profile.name,
      village: profile.village,
      schoolOrAffiliation: profile.schoolOrAffiliation,
      avatarUrl: profile.avatarUrl
    };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('profiles').upsert({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role,
        village: profile.village,
        school_or_affiliation: profile.schoolOrAffiliation,
        avatar_url: profile.avatarUrl
      });
    } catch (e) {
      console.warn('Supabase profile update warning', e);
    }
  }

  return { success: true, message: 'Profil pembaca berhasil diperbarui!' };
}

export interface BookRequestItem {
  id: string;
  bookTitle: string;
  author: string;
  category: string;
  requesterName: string;
  requesterContact: string;
  reason: string;
  status: 'pending' | 'approved' | 'available';
  createdAt: string;
}

const BOOK_REQUESTS_KEY = 'batursari_book_requests';

/**
 * Submit Community Book Request
 */
export function submitBookRequest(request: {
  bookTitle: string;
  author: string;
  category: string;
  requesterName: string;
  requesterContact: string;
  reason: string;
}): BookRequestItem {
  const newItem: BookRequestItem = {
    id: `req-${Date.now()}`,
    ...request,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  const existing = getBookRequests();
  existing.unshift(newItem);
  localStorage.setItem(BOOK_REQUESTS_KEY, JSON.stringify(existing));
  return newItem;
}

/**
 * Get all book requests for admin
 */
export function getBookRequests(): BookRequestItem[] {
  const saved = localStorage.getItem(BOOK_REQUESTS_KEY);
  if (!saved) {
    const initialRequests: BookRequestItem[] = [
      {
        id: 'req-1',
        bookTitle: 'Teknik Budidaya Padi Organik Modern',
        author: 'Dr. Ir. Suwarto',
        category: 'Pertanian',
        requesterName: 'Pak Sukirno (Kelompok Tani Krajan)',
        requesterContact: '081234567890',
        reason: 'Panduan peningkatan hasil panen sawah warga Dusun Krajan Batursari',
        status: 'approved',
        createdAt: '2026-02-15T10:00:00.000Z'
      },
      {
        id: 'req-2',
        bookTitle: 'Kumpulan Soal & Pembahasan Matematika SD',
        author: 'Tim Guru Berprestasi',
        category: 'Pendidikan',
        requesterName: 'Ibu Rahmawati (Guru SDN 1 Batursari)',
        requesterContact: '085712345678',
        reason: 'Bahan belajar tambahan bimbingan belajar anak-anak di Posko KKN',
        status: 'available',
        createdAt: '2026-02-18T14:20:00.000Z'
      }
    ];
    localStorage.setItem(BOOK_REQUESTS_KEY, JSON.stringify(initialRequests));
    return initialRequests;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

/**
 * Update status of a book request
 */
export function updateBookRequestStatus(id: string, status: 'pending' | 'approved' | 'available'): void {
  const requests = getBookRequests();
  const updated = requests.map((r) => r.id === id ? { ...r, status } : r);
  localStorage.setItem(BOOK_REQUESTS_KEY, JSON.stringify(updated));
}

/**
 * Register a new Warga / Pelajar user
 */
export async function registerUser(
  name: string,
  email: string,
  password: string,
  village?: string,
  schoolOrAffiliation?: string
): Promise<{ success: boolean; user?: UserProfile; message: string }> {
  const client = getSupabaseClient();
  const normalizedEmail = email.trim().toLowerCase();

  // Try Supabase registration if configured
  if (client) {
    try {
      // 1. Supabase Auth signup
      const { data: authData, error: authError } = await client.auth.signUp({
        email: normalizedEmail,
        password: password,
        options: {
          data: {
            name,
            village,
            schoolOrAffiliation,
            role: 'user'
          }
        }
      });

      if (!authError && authData.user) {
        // 2. Insert into profiles table
        const profile: UserProfile = {
          id: authData.user.id,
          name: name.trim(),
          email: normalizedEmail,
          role: 'user',
          village: village?.trim() || 'Desa Batursari',
          schoolOrAffiliation: schoolOrAffiliation?.trim() || 'Warga Batursari',
          avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
          createdAt: new Date().toISOString()
        };

        await client.from('profiles').upsert({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          village: profile.village,
          school_or_affiliation: profile.schoolOrAffiliation,
          avatar_url: profile.avatarUrl,
        });

        saveUserSession(profile);
        return { success: true, user: profile, message: 'Pendaftaran akun warga berhasil!' };
      }
    } catch (err: any) {
      console.warn('Supabase auth failed, using local user storage:', err);
    }
  }

  // Local Storage fallback registration
  const users = getRegisteredUsers();
  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain atau masuk.' };
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: 'user' as UserRole,
    village: village?.trim() || 'Desa Batursari',
    schoolOrAffiliation: schoolOrAffiliation?.trim() || 'Warga Batursari',
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  const profile: UserProfile = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    village: newUser.village,
    schoolOrAffiliation: newUser.schoolOrAffiliation,
    avatarUrl: newUser.avatarUrl,
    createdAt: newUser.createdAt
  };

  saveUserSession(profile);
  return { success: true, user: profile, message: 'Pendaftaran akun warga berhasil!' };
}

/**
 * Sign In User (Warga / Pelajar)
 */
export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: UserProfile; message: string; userNotFound?: boolean }> {
  const client = getSupabaseClient();
  const normalizedEmail = email.trim().toLowerCase();

  // Try Supabase login if configured
  if (client) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (!error && data.user) {
        // Fetch profile
        const { data: profileRow } = await client
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const profile: UserProfile = {
          id: data.user.id,
          name: profileRow?.name || data.user.user_metadata?.name || normalizedEmail.split('@')[0],
          email: normalizedEmail,
          role: 'user',
          village: profileRow?.village || data.user.user_metadata?.village || 'Desa Batursari',
          schoolOrAffiliation: profileRow?.school_or_affiliation || data.user.user_metadata?.schoolOrAffiliation || 'Warga Batursari',
          avatarUrl: profileRow?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalizedEmail)}`,
          createdAt: data.user.created_at || new Date().toISOString()
        };

        saveUserSession(profile);
        return { success: true, user: profile, message: 'Berhasil masuk ke akun Pojok Baca Batursari.' };
      }
    } catch (err: any) {
      console.warn('Supabase signin failed, checking local users:', err);
    }
  }

  // Local storage check
  const users = getRegisteredUsers();
  const userWithEmail = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!userWithEmail) {
    return {
      success: false,
      userNotFound: true,
      message: `Email "${normalizedEmail}" belum terdaftar. Silakan buat akun anggota baru melalui tab Daftar.`
    };
  }

  if (userWithEmail.password !== password) {
    return {
      success: false,
      userNotFound: false,
      message: 'Kata sandi tidak sesuai. Silakan periksa kembali.'
    };
  }

  const profile: UserProfile = {
    id: userWithEmail.id,
    name: userWithEmail.name,
    email: userWithEmail.email,
    role: userWithEmail.role || 'user',
    village: userWithEmail.village,
    schoolOrAffiliation: userWithEmail.schoolOrAffiliation,
    avatarUrl: userWithEmail.avatarUrl,
    createdAt: userWithEmail.createdAt
  };
  saveUserSession(profile);
  return { success: true, user: profile, message: 'Selamat datang kembali di Pojok Baca Batursari!' };
}

/**
 * Sign In Admin (Pengelola KKN 47 & Pemdes Batursari)
 */
export async function loginAdmin(
  pinOrPassword: string
): Promise<{ success: boolean; user?: UserProfile; message: string }> {
  // Accepted PINs for KKN 47 Batursari Admin
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
  
  if (validPins.includes(pinOrPassword.trim().toLowerCase())) {
    const adminProfile: UserProfile = {
      id: 'admin-kkn-47',
      name: 'Pengelola KKN 47 UPGRIS',
      email: 'admin@batursari.desa.id',
      role: 'admin',
      village: 'Desa Batursari',
      schoolOrAffiliation: 'KKN Tematik UPGRIS Kelompok 47',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      createdAt: '2026-01-01T00:00:00.000Z'
    };

    saveUserSession(adminProfile);
    return { success: true, user: adminProfile, message: 'Akses administrator berhasil diverifikasi!' };
  }

  return { success: false, message: 'PIN pengelola salah. Gunakan PIN: "batursari2026" atau "admin47".' };
}

/**
 * Log Out
 */
export async function logoutUser(): Promise<void> {
  const client = getSupabaseClient();
  if (client) {
    try {
      await client.auth.signOut();
    } catch (e) {
      console.warn('Supabase signout failed', e);
    }
  }
  saveUserSession(null);
}

// ==============================================================================
// USER-SCOPED READING PROGRESS & FAVORITES
// ==============================================================================

/**
 * Fetch Reading Progress for a specific logged-in user
 */
export async function fetchUserReadingHistory(userId: string): Promise<Record<string, ReadingProgress>> {
  if (!userId) return {};

  const client = getSupabaseClient();
  if (!client) {
    const saved = localStorage.getItem(`batursari_history_${userId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  }

  try {
    const { data, error } = await client
      .from('reading_history')
      .select('*')
      .eq('session_id', userId);

    if (error || !data) {
      const saved = localStorage.getItem(`batursari_history_${userId}`);
      return saved ? JSON.parse(saved) : {};
    }

    const result: Record<string, ReadingProgress> = {};
    data.forEach((row: any) => {
      result[row.book_id] = {
        bookId: row.book_id,
        currentPage: row.current_page || 1,
        totalPages: row.total_pages || 1,
        progressPercent: row.progress_percent || 0,
        isCompleted: Boolean(row.is_completed),
        lastReadAt: row.last_read_at || new Date().toISOString(),
      };
    });

    return result;
  } catch (err) {
    console.error('Error fetching user reading history:', err);
    return {};
  }
}

/**
 * Save user reading progress (Only runs if user is authenticated)
 */
export async function saveReadingProgress(
  userId: string,
  progress: ReadingProgress
): Promise<void> {
  if (!userId) return;

  // Save to user-specific local storage
  const currentKey = `batursari_history_${userId}`;
  const saved = localStorage.getItem(currentKey);
  const currentHistory = saved ? JSON.parse(saved) : {};
  currentHistory[progress.bookId] = progress;
  localStorage.setItem(currentKey, JSON.stringify(currentHistory));

  const client = getSupabaseClient();
  if (!client) return;

  try {
    await client.from('reading_history').upsert({
      session_id: userId,
      book_id: progress.bookId,
      current_page: progress.currentPage,
      total_pages: progress.totalPages,
      progress_percent: progress.progressPercent,
      is_completed: progress.isCompleted,
      last_read_at: progress.lastReadAt,
    }, { onConflict: 'session_id,book_id' });
  } catch (e) {
    console.warn('Failed to save reading progress on Supabase', e);
  }
}

/**
 * Clear user reading history
 */
export async function clearUserReadingHistory(userId: string): Promise<void> {
  if (!userId) return;

  localStorage.removeItem(`batursari_history_${userId}`);

  const client = getSupabaseClient();
  if (!client) return;

  try {
    await client.from('reading_history').delete().eq('session_id', userId);
  } catch (e) {
    console.warn('Failed to clear reading history on Supabase', e);
  }
}

/**
 * Fetch user favorite books
 */
export async function fetchUserFavorites(userId: string): Promise<string[]> {
  if (!userId) return [];

  const saved = localStorage.getItem(`batursari_favs_${userId}`);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Alias for saveReadingProgress
 */
export const saveUserReadingProgress = saveReadingProgress;

/**
 * Save user favorite books
 */
export async function saveUserFavorites(userId: string, favoriteIds: string[]): Promise<void> {
  if (!userId) return;
  localStorage.setItem(`batursari_favs_${userId}`, JSON.stringify(favoriteIds));
}

/**
 * Toggle favorite for a specific user
 */
export async function toggleUserFavorite(
  userId: string,
  bookId: string,
  currentFavorites: string[]
): Promise<string[]> {
  const isFav = currentFavorites.includes(bookId);
  const updated = isFav
    ? currentFavorites.filter((id) => id !== bookId)
    : [...currentFavorites, bookId];

  await saveUserFavorites(userId, updated);
  return updated;
}

/**
 * Seed initial data into Supabase if empty
 */
export async function seedInitialDataToSupabase(): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { 
      success: false, 
      message: 'Supabase belum terkonfigurasi. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY terlebih dahulu.' 
    };
  }

  try {
    const rows = INITIAL_BOOKS.map(mapBookToRow);
    const { error } = await client.from('books').upsert(rows, { onConflict: 'id' });

    if (error) {
      return { success: false, message: `Gagal sinkronisasi data: ${error.message}` };
    }

    return { 
      success: true, 
      message: `Berhasil mengekspor ${rows.length} buku awal ke database Supabase!` 
    };
  } catch (err: any) {
    return { success: false, message: `Error: ${err.message || 'Terjadi kesalahan'}` };
  }
}
