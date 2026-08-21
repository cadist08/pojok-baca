-- ==============================================================================
-- SKEMA DATABASE POJOK BACA DIGITAL DESA BATURSARI
-- Dibuat untuk Tim KKN Tematik Kelompok 47 UPGRIS & Desa Batursari
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. TABEL BUKU (books)
CREATE TABLE IF NOT EXISTS public.books (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    publisher TEXT DEFAULT 'Pojok Baca Batursari Press',
    year INTEGER DEFAULT 2026,
    category TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    cover_color TEXT,
    description TEXT,
    synopsis TEXT,
    total_pages INTEGER DEFAULT 1,
    read_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    is_popular BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    rating NUMERIC(3,2) DEFAULT 4.80,
    chapters JSONB DEFAULT '[]'::jsonb,
    pages JSONB DEFAULT '[]'::jsonb,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeks untuk pencarian cepat judul, penulis, dan kategori
CREATE INDEX IF NOT EXISTS idx_books_category ON public.books(category);
CREATE INDEX IF NOT EXISTS idx_books_uploaded_at ON public.books(uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_books_read_count ON public.books(read_count DESC);

-- 2. TABEL RIWAYAT BACAAN (reading_history)
CREATE TABLE IF NOT EXISTS public.reading_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    book_id TEXT NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    current_page INTEGER DEFAULT 1,
    total_pages INTEGER DEFAULT 1,
    progress_percent INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    last_read_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_session_book UNIQUE (session_id, book_id)
);

CREATE INDEX IF NOT EXISTS idx_reading_history_session ON public.reading_history(session_id);

-- 3. TABEL ARTIKEL LITERASI (articles)
CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    read_time TEXT NOT NULL,
    image_url TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content JSONB DEFAULT '[]'::jsonb,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Memberikan akses baca publik untuk warga desa & akses tulis
-- ==============================================================================

-- Aktifkan RLS
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses: Books (Siapa saja bisa membaca, anon & auth bisa menambah/mengubah)
CREATE POLICY "Allow public read access on books" 
ON public.books FOR SELECT USING (true);

CREATE POLICY "Allow anon and authenticated insert on books" 
ON public.books FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon and authenticated update on books" 
ON public.books FOR UPDATE USING (true);

CREATE POLICY "Allow anon and authenticated delete on books" 
ON public.books FOR DELETE USING (true);

-- Kebijakan Akses: Reading History
CREATE POLICY "Allow public all access on reading_history" 
ON public.reading_history FOR ALL USING (true);

-- Kebijakan Akses: Articles
CREATE POLICY "Allow public read access on articles" 
ON public.articles FOR SELECT USING (true);

CREATE POLICY "Allow anon and auth write on articles" 
ON public.articles FOR ALL USING (true);

-- ==============================================================================
-- CONTOH DATA AWAL (SEED DATA BUKU PERTANIAN & PENDIDIKAN BATURSARI)
-- ==============================================================================
INSERT INTO public.books (
    id, title, author, publisher, year, category, cover_url, 
    description, synopsis, total_pages, read_count, likes_count, 
    is_popular, is_new, is_featured, rating, chapters, pages
) VALUES 
(
    'buku-pertanian-01',
    'Panduan Pertanian Organik & Pupuk Kompos Desa Batursari',
    'Tim KKN UPGRIS Kelompok 47 & Poktan Batursari',
    'Pustaka Tani Batursari',
    2026,
    'Pertanian',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    'Panduan praktis pembuatan pupuk organik cair, kompos jerami, dan metode ramah lingkungan untuk meningkatkan kesuburan tanah warga Desa Batursari.',
    'Buku panduan ini disusun khusus oleh mahasiswa KKN Tematik UPGRIS Kelompok 47 berkolaborasi dengan kelompok tani Desa Batursari untuk memberikan langkah mudah pengelolaan limbah pertanian menjadi pupuk alami bernilai tinggi.',
    5,
    342,
    78,
    true,
    true,
    true,
    4.90,
    '[{"id":"ch-1","title":"Bab 1: Potensi Tanah dan Limbah Organik di Batursari","startPage":1,"endPage":2},{"id":"ch-2","title":"Bab 2: Langkah Pembuatan Pupuk Kompos Berkualitas","startPage":3,"endPage":4},{"id":"ch-3","title":"Bab 3: Perawatan Tanaman dan Pengendalian Hama Alami","startPage":5,"endPage":5}]'::jsonb,
    '[
      {
        "pageNumber": 1,
        "chapterTitle": "Bab 1: Potensi Tanah dan Limbah Organik di Batursari",
        "title": "Mengenal Kesuburan Tanah Pertanian Batursari",
        "paragraphs": [
          "Desa Batursari memiliki hamparan lahan pertanian subur yang kaya akan keanekaragaman hayati. Selama bertahun-tahun, masyarakat mengandalkan pertanian sebagai salah satu mata pencaharian utama.",
          "Namun, penggunaan pupuk kimia secara terus-menerus dapat menurunkan kualitas mikroorganisme alami dalam tanah. Oleh karena itu, peralihan menuju metode pemupukan organik sangat penting dilakukan guna menjaga produktivitas lahan jangka panjang."
        ],
        "callout": {
          "type": "tip",
          "title": "Kiat Pertanian Batursari",
          "text": "Mengombinasikan sisa jerami dan kotoran ternak dapat mempercepat proses penguraian unsur hara mikro dalam tanah hingga 2 kali lebih cepat."
        },
        "keyPoints": [
          "Mengurangi ketergantungan pada pupuk anorganik sintetis",
          "Memanfaatkan limbah jerami dan sampah dedaunan pekarangan warga",
          "Memperbaiki aerasi dan kemampuan tanah mengikat cadangan air"
        ]
      }
    ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
