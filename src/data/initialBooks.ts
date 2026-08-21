import { Book } from '../types';

export const INITIAL_BOOKS: Book[] = [
  // ==========================================
  // 1. PENDIDIKAN
  // ==========================================
  {
    id: 'buku-pendidikan-01',
    title: 'Panduan Belajar Mandiri & Sukses Kurikulum Merdeka',
    author: 'Tim Literasi Pendidikan KKN UPGRIS',
    publisher: 'Pojok Baca Batursari Press',
    year: 2024,
    category: 'Pendidikan',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-blue-800 to-indigo-950',
    description: 'Panduan praktis bagi siswa dan orang tua di Desa Batursari dalam membangun kebiasaan belajar mandiri dan adaptif.',
    synopsis: 'Buku ini disusun khusus untuk mendampingi pelajar di tingkat dasar hingga menengah dalam menyusun jadwal belajar efektif, teknik mencatat metode Cornell, serta penguasaan literasi dan numerasi dasar sesuai prinsip Kurikulum Merdeka.',
    totalPages: 5,
    readCount: 342,
    likesCount: 89,
    isPopular: true,
    isFeatured: true,
    rating: 4.9,
    uploadedAt: '2024-08-01',
    chapters: [
      { id: 'c1', title: 'Bab 1: Menemukan Gaya Belajar Pribadi', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Manajemen Waktu Belajar di Rumah', startPage: 3, endPage: 4 },
      { id: 'c3', title: 'Bab 3: Teknik Mengingat & Catatan Efektif', startPage: 5, endPage: 5 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: Menemukan Gaya Belajar Pribadi',
        title: 'Mengenal Tiga Tipe Gaya Belajar',
        paragraphs: [
          'Setiap anak dan pelajar memiliki keunikan dalam menyerap informasi baru. Ada yang lebih mudah paham melalui gambar visual, ada yang menangkap materi lewat suara pendengaran (auditori), dan ada pula yang memerlukan gerakan praktik langsung (kinestetik).',
          'Di Desa Batursari, suasana belajar di rumah yang tenang dan lingkungan yang asri menjadi modal berharga. Siswa visual dapat memanfaatkan diagram warna-warni saat membaca buku, sedangkan siswa auditori sangat terbantu saat membaca ringkasan materi secara bersuara.'
        ],
        callout: {
          type: 'tip',
          title: 'Tips Cepat untuk Pelajar Batursari',
          text: 'Cobalah belajar selama 25 menit penuh konsentrasi, lalu istirahat 5 menit (Teknik Pomodoro) untuk menjaga kesegaran pikiran.'
        },
        keyPoints: [
          'Visual: gunakan spidol warna atau mind mapping.',
          'Auditori: bacakan kembali materi atau diskusikan dengan teman.',
          'Kinestetik: lakukan eksperimen sederhana dan simulasi.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: Menemukan Gaya Belajar Pribadi',
        title: 'Membangun Ruang Belajar yang Nyaman',
        paragraphs: [
          'Ruang belajar tidak harus mewah atau luas. Sudut kecil di ruang tamu atau kamar tidur yang bersih, memiliki pencahayaan cukup, dan bebas dari distraksi gawai sudah lebih dari cukup.',
          'Pastikan meja belajar memiliki sirkulasi udara baik. Menjauhkan ponsel sejenak saat sedang mengerjakan tugas sekolah akan meningkatkan pemahaman materi hingga dua kali lipat.'
        ],
        keyPoints: [
          'Pencahayaan terang alami dari jendela.',
          'Meja bersih dan buku pelajaran tertata rapi.',
          'Sediakan air putih agar fokus tetap terjaga.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Manajemen Waktu Belajar di Rumah',
        title: 'Membuat Jadwal Harian yang Seimbang',
        paragraphs: [
          'Keseimbangan antara membantu orang tua di rumah, bermain dengan teman sebaya di desa, dan menuntaskan tugas sekolah merupakan kunci kedisiplinan.',
          'Buatlah matriks prioritas harian: tugas penting yang mendesak diselesaikan pada sore hari sepulang sekolah, sehingga malam hari dapat digunakan untuk membaca santai di Pojok Baca.'
        ],
        callout: {
          type: 'quote',
          title: 'Kata Mutiara Pendidikan',
          text: 'Pendidikan bukanlah persiapan untuk hidup; pendidikan adalah kehidupan itu sendiri. - John Dewey'
        }
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Manajemen Waktu Belajar di Rumah',
        title: 'Mengatasi Rasa Malas dan Menunda Tugas',
        paragraphs: [
          'Penundaan biasanya terjadi ketika tugas terasa terlalu besar atau sulit. Cara terbaik mengatasinya adalah dengan memecah tugas besar menjadi langkah-langkah kecil 10 menitan.',
          'Ketika berhasil menyelesaikan satu bab bacaan, berikan apresiasi sederhana pada diri sendiri, seperti menikmati cemilan tradisional bersama keluarga.'
        ],
        keyPoints: [
          'Gunakan aturan 5 detik untuk mulai membuka buku.',
          'Kerjakan soal termudah terlebih dahulu sebagai pemanasan.'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'Bab 3: Teknik Mengingat & Catatan Efektif',
        title: 'Metode Catatan Cornell & Mind Mapping',
        paragraphs: [
          'Metode Cornell membagi halaman buku catatan menjadi tiga bagian: kolom kata kunci di sisi kiri, catatan detail di sisi kanan, dan ringkasan 2 kalimat di bagian bawah.',
          'Dengan metode ini, mengulang materi sebelum ujian di sekolah hanya memerlukan waktu 5 hingga 10 menit per bab pelajaran.'
        ],
        callout: {
          type: 'highlight',
          title: 'Kesimpulan Penting',
          text: 'Belajar bukan tentang menghafal semalam suntuk, melainkan memahami konsep dan mengaitkannya dengan pengalaman sehari-hari di lingkungan kita.'
        }
      }
    ]
  },
  {
    id: 'buku-pendidikan-02',
    title: 'Matematika Asyik dan Logika Praktis Sehari-hari',
    author: 'Drs. Suwarno, M.Pd & Tim Matematika UPGRIS',
    publisher: 'Cendekia Pustaka Mandiri',
    year: 2024,
    category: 'Pendidikan',
    coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-blue-900 to-slate-950',
    description: 'Trik berhitung cepat, pemecahan masalah logika, dan penerapan matematika dalam jual beli pertanian.',
    synopsis: 'Buku ini mengubah anggapan bahwa matematika itu sulit. Melalui contoh nyata seperti menghitung hasil panen padi, diskon toko kelontong, dan luas petak sawah, anak-anak diajak mencintai logika numerasi dengan ceria.',
    totalPages: 4,
    readCount: 215,
    likesCount: 64,
    isNew: true,
    rating: 4.85,
    uploadedAt: '2024-08-05',
    chapters: [
      { id: 'c1', title: 'Bab 1: Trik Berhitung Cepat Tanpa Kalkulator', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Matematika untuk Pasar dan Pertanian', startPage: 3, endPage: 4 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: Trik Berhitung Cepat Tanpa Kalkulator',
        title: 'Keajaiban Perkalian 9 dan Kuadrat Cepat',
        paragraphs: [
          'Matematika sesungguhnya penuh dengan pola yang indah. Contohnya perkalian sembilan dengan jari tangan, atau perkalian bilangan puluhan dengan angka satuan sama.',
          'Dengan memahami logika di balik pola angka, kita tidak perlu lagi merasa takut atau tertekan saat menghadapi soal ulangan sekolah.'
        ],
        callout: {
          type: 'tip',
          title: 'Trik Jari Ajaib Perkalian 9',
          text: 'Rentangkan 10 jari tangan Anda. Lipat jari ke-3 untuk 9 x 3. Di sebelah kiri ada 2 jari dan di sebelah kanan ada 7 jari = 27!'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: Trik Berhitung Cepat Tanpa Kalkulator',
        title: 'Penjumlahan dan Pengurangan Bersusun Mental',
        paragraphs: [
          'Teknik hitung cepat mental mengutamakan pembulatan ke angka puluhan terdekat. Misalnya, 48 + 37 dapat disederhanakan menjadi (50 + 37) - 2 = 85.',
          'Latihan mental ini melatih ketajaman otak kiri dan membuat anak semakin percaya diri dalam kehidupan sehari-hari.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Matematika untuk Pasar dan Pertanian',
        title: 'Menghitung Hasil Panen & Perkiraan Laba',
        paragraphs: [
          'Dalam dunia pertanian Desa Batursari, kemampuan menghitung persentase susut panen, kebutuhan pupuk per hektar, dan selisih harga jual sangat berharga.',
          'Pelajar dapat membantu orang tua menghitung estimasi biaya bibit dan pupuk sehingga perencanaan keuangan keluarga menjadi lebih rapi.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Matematika untuk Pasar dan Pertanian',
        title: 'Literasi Finansial & Menabung Sejak Dini',
        paragraphs: [
          'Kunci kemandirian ekonomi dimulai dari rumus sederhana: Pendapatan - Tabungan = Pengeluaran. Sisihkan minimal 10-20% dari uang saku ke celengan bambu setiap hari.',
          'Uang yang terkumpul dapat dimanfaatkan untuk membeli buku bacaan tambahan atau perlengkapan sekolah.'
        ]
      }
    ]
  },
  {
    id: 'buku-pendidikan-03',
    title: 'Kamus Praktis Unggah-Ungguh Basa Jawa & Pepak Batursari',
    author: 'Ki Haryo Danusubroto & Paguyuban Bahasa Jawa',
    publisher: 'Widya Budaya Press',
    year: 2024,
    category: 'Pendidikan',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-amber-900 to-stone-900',
    description: 'Panduan tata bahasa Jawa ngoko, krama madya, krama inggil, serta aksara Jawa untuk generasi muda.',
    synopsis: 'Melestarikan bahasa ibu dan sopan santun Jawa bagi anak-anak dan generasi penerus Desa Batursari, dilengkapi contoh percakapan santun kepada orang tua dan sesepuh.',
    totalPages: 3,
    readCount: 198,
    likesCount: 72,
    rating: 4.88,
    uploadedAt: '2024-08-06',
    chapters: [
      { id: 'c1', title: 'Tingkatan Bahasa & Tata Krama', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Paribasan & Aksara Jawa Sederhana', startPage: 3, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Tingkatan Bahasa & Tata Krama',
        title: 'Basa Ngoko Lugu vs Basa Krama Alus',
        paragraphs: [
          'Bahasa Jawa memiliki keindahan tingkatan tutur bahasa. Bahasa Ngoko digunakan saat berbincang akrab dengan teman sebaya, sedangkan Krama Alus digunakan saat berbicara dengan orang tua, guru, atau tamu kehormatan.',
          'Contoh sederhana: "Aku mangan" (ngoko) menjadi "Kula nedha" (krama) dan "Bapak dhahar" (krama inggil).'
        ],
        callout: {
          type: 'highlight',
          title: 'Prinsip Basa Jawa',
          text: 'Ajining dhiri gumantung saka lathi, ajining raga saka busana (Kehormatan diri tergantung dari tutur kata, dan kehormatan tubuh dari pakaian).'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Tingkatan Bahasa & Tata Krama',
        title: 'Sikap Santun dalam Bergaul di Desa',
        paragraphs: [
          'Saat melintas di depan orang yang lebih tua, ucapkan "Nyuwun sewu" atau "Ndherek langkung" sambil membungkukkan badan sedikit dan menurunkan tangan kanan.',
          'Sikap ini menunjukkan budi pekerti luhur yang menjadi kebanggaan masyarakat Batursari.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Paribasan & Aksara Jawa Sederhana',
        title: 'Mengenal 20 Aksara Jawa Hanacaraka',
        paragraphs: [
          'Aksara Jawa terdiri dari 20 aksara denta: Ha, Na, Ca, Ra, Ka, Da, Ta, Sa, Wa, La, Pa, Dha, Ja, Ya, Nya, Ma, Ga, Ba, Tha, Nga.',
          'Mempelajari aksara Jawa bukan hanya mengenal huruf kuno, tetapi menjaga warisan leluhur nusantara agar tidak punah ditelan zaman.'
        ]
      }
    ]
  },

  // ==========================================
  // 2. ANAK-ANAK
  // ==========================================
  {
    id: 'buku-anak-01',
    title: 'Petualangan Si Kancil Cerdik di Hutan Batursari',
    author: 'Kak Nurul & Tim Cerita Desa UPGRIS',
    publisher: 'Pustaka Sahabat Cilik',
    year: 2024,
    category: 'Anak-anak',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-amber-600 to-orange-950',
    description: 'Kisah seru fabel penuh keceriaan tentang tolong-menolong, kejujuran, dan persahabatan satwa rimba.',
    synopsis: 'Kancil cerdik yang baik hati membantu hewan-hewan lain saat musim kemarau melanda. Menanamkan pesan moral bahwa kepintaran harus digunakan untuk kebaikan bersama.',
    totalPages: 4,
    readCount: 290,
    likesCount: 95,
    isPopular: true,
    isFeatured: true,
    rating: 4.92,
    uploadedAt: '2024-08-02',
    chapters: [
      { id: 'c1', title: 'Bab 1: Sahabat di Tepi Sungai', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Membangun Bendungan Bersama', startPage: 3, endPage: 4 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: Sahabat di Tepi Sungai',
        title: 'Pagi Cerah di Tepi Sungai Batursari',
        paragraphs: [
          'Di sebuah hutan pinggir Desa Batursari yang sejuk, Si Kancil sedang berjalan-jalan riang. Tiba-tiba ia mendengar suara tangisan di balik rimbunnya pohon pisang.',
          'Ternyata Si Tupai kecil terjebak di cabang pohon yang patah karena angin kencang semalam. Kancil segera mencari akal untuk menolong sahabatnya.'
        ],
        callout: {
          type: 'quote',
          title: 'Pesan Sahabat Cilik',
          text: 'Teman yang baik adalah teman yang selalu ada dan sigap menolong saat orang lain sedang kesusahan.'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: Sahabat di Tepi Sungai',
        title: 'Akal Cerdik Kancil Menolong Tupai',
        paragraphs: [
          'Kancil mengumpulkan daun pisang kering dan ranting pohon yang kuat. Bersama Kura-kura, mereka membuat bantalan empuk di bawah pohon.',
          'Tupai pun melompat dengan selamat di atas tumpukan daun pisang itu. "Terima kasih Kancil, kamu memang sahabat sejati!" seru Tupai gembira.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Membangun Bendungan Bersama',
        title: 'Musim Kemarau dan Kerja Sama Rimba',
        paragraphs: [
          'Ketika air sungai mulai surut, satwa rimba khawatir tidak memiliki air bersih untuk minum. Gajah, Kera, dan Burung Pipit berkumpul di balai hutan.',
          'Kancil mengusulkan gotong royong membuat tampungan air sederhana menggunakan batu kali dan dedaunan lebat.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Membangun Bendungan Bersama',
        title: 'Pesta Air Bersih dan Rasa Syukur',
        paragraphs: [
          'Berkat kerja sama seluruh satwa, tampungan air berhasil selesai sebelum senja tiba. Semua hewan bersuka cita dan bernyanyi riang.',
          'Cerita ini mengajarkan adik-adik di Desa Batursari bahwa seberat apa pun tantangan, pasti bisa diselesaikan jika kita saling bergandengan tangan.'
        ],
        keyPoints: [
          'Kecerdasan harus dipakai untuk membantu sesama.',
          'Gotong royong membuat pekerjaan berat menjadi ringan.',
          'Selalu bersyukur atas nikmat alam ciptaan Tuhan.'
        ]
      }
    ]
  },
  {
    id: 'buku-anak-02',
    title: 'Sahabat Cilik Penjaga Kebersihan Desa',
    author: 'Kak Nurul & Tim KKN UPGRIS',
    publisher: 'Pustaka Sahabat Desa',
    year: 2024,
    category: 'Anak-anak',
    coverUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-amber-800 to-stone-900',
    description: 'Petualangan seru anak-anak Batursari mengumpulkan botol plastik dan mendaur ulang menjadi pot bunga cantik.',
    synopsis: 'Kisah inspiratif sekelompok anak desa yang kreatif mengubah sampah plastik menjadi taman bunga warna-warni di halaman balai desa.',
    totalPages: 3,
    readCount: 180,
    likesCount: 52,
    rating: 4.87,
    uploadedAt: '2024-08-10',
    chapters: [
      { id: 'c1', title: 'Taman Bunga Ceria', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Taman Bunga Ceria',
        title: 'Pagi Hari yang Penuh Ide',
        paragraphs: [
          'Rian dan Siti melihat banyak botol plastik minuman berserakan di pinggir lapangan. Daripada menjadi sampah yang mencemari tanah, mereka berinisiatif mengumpulkannya dalam karung bersih.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Taman Bunga Ceria',
        title: 'Mengecat Pot Karakter Lucu',
        paragraphs: [
          'Bersama kakak-kakak mahasiswa KKN 47, botol-botol dipotong rapi dan dicat menyerupai karakter kelinci, kucing, dan panda yang lucu.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Taman Bunga Ceria',
        title: 'Taman Mini di Pojok Baca',
        paragraphs: [
          'Pot-pot cantik tersebut kemudian ditanami bunga krokot warna-warni dan diletakkan di teras Pojok Baca Desa Batursari. Semua warga tersenyum bangga melihat karya mereka.'
        ]
      }
    ]
  },
  {
    id: 'buku-anak-03',
    title: 'Mengenal Bintang, Satwa & Keajaiban Lautan',
    author: 'Dra. Ratna Handayani',
    publisher: 'Erlangga Cilik',
    year: 2024,
    category: 'Anak-anak',
    coverUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-cyan-800 to-blue-950',
    description: 'Eksplorasi visual seru mengenalkan nama-nama hewan darat, burung eksotis nusantara, dan keindahan terumbu karang.',
    synopsis: 'Buku bergambar penuh warna yang memicu rasa ingin tahu anak-anak usia dini tentang alam semesta, bintang di langit malam, dan lumba-lumba di samudera.',
    totalPages: 3,
    readCount: 165,
    likesCount: 48,
    isNew: true,
    rating: 4.81,
    uploadedAt: '2024-08-11',
    chapters: [
      { id: 'c1', title: 'Sahabat Rimba dan Laut', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Sahabat Rimba dan Laut',
        title: 'Burung Cenderawasih dan Merpati Pos',
        paragraphs: [
          'Indonesia kaya akan ribuan jenis burung yang bersuara merdu. Burung Cenderawasih dijuluki burung surga karena bulunya yang berkilau indah seperti pelangi.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Sahabat Rimba dan Laut',
        title: 'Lumba-lumba Sahabat Nelayan',
        paragraphs: [
          'Lumba-lumba bernapas menggunakan paru-paru seperti manusia dan sering membantu nelayan yang tersesat di laut lepas. Mereka hewan yang sangat cerdas dan ramah.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Sahabat Rimba dan Laut',
        title: 'Langit Malam dan Rasi Bintang Pari',
        paragraphs: [
          'Ketika langit Desa Batursari cerah tanpa awan di malam hari, kita bisa melihat rasi bintang Salib Selatan (Bintang Pari) yang menjadi penunjuk arah selatan bagi para pelaut tradisional.'
        ]
      }
    ]
  },

  // ==========================================
  // 3. DONGENG & CERITA RAKYAT
  // ==========================================
  {
    id: 'buku-dongeng-01',
    title: 'Kumpulan Cerita Rakyat Jawa Tengah & Legenda Pesisir',
    author: 'Balai Pelestarian Nilai Budaya & Tim KKN',
    publisher: 'Pustaka Nusantara Abadi',
    year: 2024,
    category: 'Dongeng',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-emerald-900 to-slate-950',
    description: 'Legenda Baru Klinthing Rawa Pening, Asal Usul Bledug Kuwu, dan Kisah Teladan Ki Ageng Pandanaran.',
    synopsis: 'Kumpulan dongeng warisan leluhur yang sarat dengan kearifan lokal Jawa Tengah, mengajarkan rasa rendah hati, menghormati orang tua, dan menjaga kelestarian alam.',
    totalPages: 4,
    readCount: 265,
    likesCount: 78,
    isPopular: true,
    rating: 4.88,
    uploadedAt: '2024-08-03',
    chapters: [
      { id: 'c1', title: 'Legenda Baru Klinthing & Rawa Pening', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Kisah Asal Usul Bledug Kuwu', startPage: 3, endPage: 4 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Legenda Baru Klinthing & Rawa Pening',
        title: 'Ujian Keramahan di Desa Pathok',
        paragraphs: [
          'Zaman dahulu di lembah Gunung Telomoyo, ada seorang anak jelmaan naga bernama Baru Klinthing. Tubuhnya penuh luka dan berbau amis sehingga ia dijauhi warga desa yang sedang berpesta pora.',
          'Hanya seorang janda tua miskin bernama Mbok Randha yang tulus memberikan sepiring nasi hangat dan secangkir air kelapa.'
        ],
        callout: {
          type: 'highlight',
          title: 'Pelajaran Moral Cerita',
          text: 'Jangan pernah menilai seseorang hanya dari rupa luarnya. Kebaikan hati dan ketulusan jauh lebih mulia daripada harta kemewahan.'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Legenda Baru Klinthing & Rawa Pening',
        title: 'Tancapan Lidi dan Terciptanya Danau',
        paragraphs: [
          'Baru Klinthing kemudian menancapkan sebatang lidi di tengah tanah lapang desa. Tak seorang pun warga sombong yang sanggup mencabutnya.',
          'Ketika Baru Klinthing mencabutnya, keluarlah pancuran air jernih yang menenggelamkan desa yang sombong tersebut, berubah menjadi danau Rawa Pening yang luas dan subur hingga kini.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Kisah Asal Usul Bledug Kuwu',
        title: 'Jaka Linglung dan Perjalanan Bawah Tanah',
        paragraphs: [
          'Legenda Bledug Kuwu di Grobogan mengisahkan naga Jaka Linglung yang berusaha membuktikan baktinya kepada sang ayah, Prabu Ajisaka.',
          'Setelah mengalahkan buaya putih di laut selatan, ia kembali ke daratan melalui lorong bawah tanah yang menyemburkan letupan lumpur dan garam.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Kisah Asal Usul Bledug Kuwu',
        title: 'Hikmah dan Rasa Bakti Seorang Anak',
        paragraphs: [
          'Cerita rakyat ini menjadi simbol ilmiah bagaimana fenomena alam gunung lumpur (mud volcano) dijelaskan oleh nenek moyang kita secara turun-temurun.',
          'Pesan terbesarnya adalah tentang rasa hormat, bakti kepada orang tua, serta kebesaran alam semesta yang harus kita rawat dengan bijaksana.'
        ]
      }
    ]
  },
  {
    id: 'buku-dongeng-02',
    title: 'Timun Mas dan Raksasa yang Bijaksana',
    author: 'Koleksi Cerita Rakyat Nusantara',
    publisher: 'Pustaka Klasik Jawa',
    year: 2024,
    category: 'Dongeng',
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-teal-900 to-stone-900',
    description: 'Dongeng abadi keberanian seorang gadis desa menghadapi rintangan dengan kecerdikan dan empat bungkusan sakti.',
    synopsis: 'Kisah klasik Timun Mas yang dibekali biji mentimun, jarum, garam, dan terasi oleh sang petapa untuk menyelamatkan diri dari marabahaya.',
    totalPages: 3,
    readCount: 175,
    likesCount: 56,
    rating: 4.83,
    uploadedAt: '2024-08-08',
    chapters: [
      { id: 'c1', title: 'Timun Emas yang Berani', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Timun Emas yang Berani',
        title: 'Biji Mentimun dan Kelahiran Emas',
        paragraphs: [
          'Mbok Srini yang hidup sebatang kara merawat buah mentimun raksasa berwarna keemasan. Di dalam buah tersebut, lahirlah seorang bayi perempuan jelita yang diberi nama Timun Mas.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Timun Emas yang Berani',
        title: 'Empat Bekal Petapa Sakti',
        paragraphs: [
          'Saat raksasa datang menagih janji, Timun Mas berlari cepat. Ia menebarkan biji mentimun yang berubah menjadi kebun lebat, lalu jarum yang berubah menjadi hutan bambu berduri tajam.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Timun Emas yang Berani',
        title: 'Lautan Garam dan Kedamaian Desa',
        paragraphs: [
          'Bungkusan garam berubah menjadi lautan luas dan terasi menjadi lumpur mendidih. Timun Mas berhasil selamat dan kembali ke pelukan sang ibu dengan rasa syukur yang mendalam.'
        ]
      }
    ]
  },

  // ==========================================
  // 4. PENGETAHUAN
  // ==========================================
  {
    id: 'buku-pengetahuan-01',
    title: 'Ensiklopedia Sains Sederhana & Rahasia Alam Semesta',
    author: 'Prof. Dr. Bambang Sudarsono, M.Si',
    publisher: 'Lembaga Penerbitan Sains Nusantara',
    year: 2024,
    category: 'Pengetahuan',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-cyan-900 to-indigo-950',
    description: 'Menjawab rasa penasaran mengapa langit berwarna biru, bagaimana petir terjadi, dan daur air di bumi.',
    synopsis: 'Eksplorasi sains interaktif yang disusun dengan bahasa yang mudah dicerna oleh siswa sekolah dasar dan masyarakat umum. Mengupas fisika, biologi, dan astronomi sehari-hari.',
    totalPages: 4,
    readCount: 310,
    likesCount: 92,
    isPopular: true,
    rating: 4.91,
    uploadedAt: '2024-08-04',
    chapters: [
      { id: 'c1', title: 'Bab 1: Mengapa Langit Berwarna Biru?', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Daur Air & Keajaiban Hujan Tropis', startPage: 3, endPage: 4 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: Mengapa Langit Berwarna Biru?',
        title: 'Hamburan Cahaya Matahari Rayleigh',
        paragraphs: [
          'Cahaya matahari yang terlihat putih sesungguhnya merupakan gabungan dari tujuh spektrum warna pelangi: merah, jingga, kuning, hijau, biru, nila, dan ungu.',
          'Ketika cahaya memasuki atmosfer bumi, gas dan partikel debu menghamburkan warna dengan panjang gelombang pendek (biru dan ungu) ke segala arah. Karena mata manusia lebih sensitif terhadap warna biru, langit tampak berwarna biru cerah di siang hari.'
        ],
        callout: {
          type: 'tip',
          title: 'Tahukah Kamu?',
          text: 'Saat senja hari, cahaya matahari harus menempuh lapisan atmosfer yang lebih tebal, sehingga hanya gelombang panjang (merah dan jingga) yang sanggup menembus hingga ke mata kita.'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: Mengapa Langit Berwarna Biru?',
        title: 'Petir, Kilat, dan Kecepatan Suara',
        paragraphs: [
          'Kilat dan guruh sesungguhnya terjadi pada detik yang persis sama di dalam awan Cumulonimbus akibat gesekan muatan listrik positif dan negatif.',
          'Namun kita melihat kilatan cahaya terlebih dahulu sebelum mendengar suara guntur. Hal ini terjadi karena kecepatan cahaya (300.000 km/detik) jauh lebih cepat daripada kecepatan suara di udara (340 meter/detik).'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Daur Air & Keajaiban Hujan Tropis',
        title: 'Siklus Hidrologi yang Menghidupi Sawah Batursari',
        paragraphs: [
          'Air di laut, sungai, dan waduk menguap akibat panas matahari (evaporasi). Tanaman dan pepohonan juga melepaskan uap air melalui daunnya (transpirasi).',
          'Uap air membubung tinggi ke atmosfer yang dingin, membentuk gumpalan awan (kondensasi), hingga akhirnya turun kembali menjadi tetesan hujan (presipitasi) yang menyuburkan lahan pertanian desa.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Daur Air & Keajaiban Hujan Tropis',
        title: 'Menjaga Sumber Mata Air dan Resapan Tanah',
        paragraphs: [
          'Hutan dan pepohonan rindang bertindak sebagai spons raksasa yang menyerap air hujan ke dalam akuifer tanah, sehingga sumur warga tetap mengalirkan air jernih meski di musim kemarau.',
          'Menanam pohon di pekarangan rumah adalah langkah nyata generasi muda dalam menjaga keberlanjutan siklus air.'
        ]
      }
    ]
  },
  {
    id: 'buku-pengetahuan-02',
    title: 'Energi Bersih Terbarukan: Tenaga Surya & Biogas Desa',
    author: 'Pusat Riset Energi Terapan & KKN UPGRIS',
    publisher: 'Batursari Inovasi Press',
    year: 2024,
    category: 'Pengetahuan',
    coverUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-amber-700 to-slate-900',
    description: 'Pemanfaatan panel surya fotovoltaik dan instalasi biogas dari kotoran ternak untuk penerangan jalan desa.',
    synopsis: 'Mengenalkan konsep kemandirian energi desa melalui teknologi ramah lingkungan yang hemat biaya dan berkelanjutan.',
    totalPages: 3,
    readCount: 190,
    likesCount: 60,
    isNew: true,
    rating: 4.86,
    uploadedAt: '2024-08-09',
    chapters: [
      { id: 'c1', title: 'Energi Hijau Masa Depan', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Energi Hijau Masa Depan',
        title: 'Prinsip Kerja Panel Surya Sederhana',
        paragraphs: [
          'Panel surya terbuat dari sel silikon semi-konduktor yang dapat mengubah foton sinar matahari langsung menjadi energi listrik DC (arus searah). Listrik ini kemudian disimpan dalam aki/baterai.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Energi Hijau Masa Depan',
        title: 'Biogas Mandiri dari Limbah Ternak',
        paragraphs: [
          'Kotoran sapi dan kambing yang difermentasi dalam tangki digester kedap udara oleh bakteri anaerob akan menghasilkan gas metana (CH4) yang aman digunakan untuk memasak menggantikan gas elpiji.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Energi Hijau Masa Depan',
        title: 'Menuju Desa Mandiri Energi',
        paragraphs: [
          'Dengan menggabungkan tenaga surya dan biogas, Desa Batursari dapat menghemat pengeluaran bulanan sekaligus melestarikan lingkungan dari polusi bahan bakar fosil.'
        ]
      }
    ]
  },

  // ==========================================
  // 5. SEJARAH
  // ==========================================
  {
    id: 'buku-sejarah-01',
    title: 'Jejak Kesultanan Demak Bintoro & Glagahwangi',
    author: 'Lembaga Sejarah Islam Nusantara & Tim Budaya Demak',
    publisher: 'Pustaka Sejarah Pesisir',
    year: 2024,
    category: 'Sejarah',
    coverUrl: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-stone-800 to-stone-950',
    description: 'Peradaban kerajaan Islam pertama di tanah Jawa, kepemimpinan Raden Patah, dan peranan luhur Wali Songo.',
    synopsis: 'Buku rujukan sejarah yang menguraikan transisi dari Majapahit akhir menuju era kejayaan Kesultanan Demak, pembangunan Masjid Agung Demak dengan saka tatalnya, serta nilai-nilai toleransi kebangsaan.',
    totalPages: 5,
    readCount: 285,
    likesCount: 88,
    isPopular: true,
    rating: 4.93,
    uploadedAt: '2024-08-01',
    chapters: [
      { id: 'c1', title: 'Bab 1: Hutan Glagahwangi Menjadi Kerajaan', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Saka Tatal Masjid Agung Demak', startPage: 3, endPage: 4 },
      { id: 'c3', title: 'Bab 3: Kebijakan Maritim & Pertanian', startPage: 5, endPage: 5 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: Hutan Glagahwangi Menjadi Kerajaan',
        title: 'Awal Mula Pendirian Demak Bintoro',
        paragraphs: [
          'Pada akhir abad ke-15, kawasan yang dulunya merupakan rawa-rawa dan hutan Glagahwangi yang harum berkembang menjadi pelabuhan dagang internasional yang ramai dikunjungi pedagang Gujarat, Persia, dan Campa.',
          'Raden Patah, didampingi oleh Sunan Ampel dan para sesepuh Wali Songo, mendirikan pusat peradaban baru yang mengedepankan keadilan, kesejahteraan rakyat, dan dakwah Islam yang santun dan menghargai budaya lokal.'
        ],
        callout: {
          type: 'highlight',
          title: 'Fakta Sejarah Pesisir',
          text: 'Kata "Demak" berasal dari bahasa Jawa Kuno "Dhemak" yang berarti tanah hadiah atau tanah rawa yang subur untuk persawahan.'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: Hutan Glagahwangi Menjadi Kerajaan',
        title: 'Dakwah Kultural Wali Songo',
        paragraphs: [
          'Sunan Kalijaga memanfaatkan kesenian wayang kulit, tembang Ilir-Ilir, dan gamelan Sekaten untuk memperkenalkan ajaran tauhid dan budi pekerti tanpa menimbulkan gesekan sosial.',
          'Pendekatan kultural ini membuktikan bahwa persatuan dan harmoni adalah pondasi terkuat dalam membangun masyarakat yang maju.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Saka Tatal Masjid Agung Demak',
        title: 'Arsitektur Kayu Jati Tanpa Paku Besi',
        paragraphs: [
          'Masjid Agung Demak yang berdiri megah memiliki atap tumpang tiga yang melambangkan Iman, Islam, dan Ihsan.',
          'Salah satu dari empat pilar utamanya (saka guru) di sisi barat laut dibuat oleh Sunan Kalijaga dari susunan serpihan-serpihan kayu jati (tatal) yang dipadatkan dan diikat dengan kekuatan spiritual yang tinggi.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Saka Tatal Masjid Agung Demak',
        title: 'Simbol Persatuan Bangsa',
        paragraphs: [
          'Saka tatal bukan hanya keajaiban teknik pertukangan kuno, tetapi juga simbol persatuan: pecahan-pecahan kecil yang bersatu padu akan menjadi pilar yang kokoh menyangga atap kebangsaan.',
          'Masyarakat Demak dan sekitarnya memelihara warisan ini dengan penuh rasa bangga dan penghormatan.'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'Bab 3: Kebijakan Maritim & Pertanian',
        title: 'Lumbung Pangan dan Armada Laut Nusantara',
        paragraphs: [
          'Pati Unus (Pangeran Sabrang Lor) membangun armada kapal perang berukuran raksasa untuk melindungi kedaulatan maritim Selat Malaka dari penjajah Portugis.',
          'Di daratan, sistem irigasi pertanian digalakkan sehingga Demak menjadi lumbung beras utama bagi seluruh kepulauan Nusantara.'
        ]
      }
    ]
  },
  {
    id: 'buku-sejarah-02',
    title: 'Kisah Perjuangan Pangeran Diponegoro di Tanah Jawa',
    author: 'Museum Kebangkitan Nasional',
    publisher: 'Pustaka Pahlawan',
    year: 2024,
    category: 'Sejarah',
    coverUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-amber-950 to-stone-900',
    description: 'Kisah patriotik Perang Jawa (1825–1830), strategi perang gerilya, dan keteguhan membela hak rakyat kecil.',
    synopsis: 'Riwayat heroik Pangeran Diponegoro dan laskar santri-petani dalam melawan kesewenang-wenangan kolonial Hindia Belanda.',
    totalPages: 3,
    readCount: 210,
    likesCount: 65,
    rating: 4.89,
    uploadedAt: '2024-08-07',
    chapters: [
      { id: 'c1', title: 'Perang Jawa & Nilai Kepahlawanan', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Perang Jawa & Nilai Kepahlawanan',
        title: 'Membela Hak Petani Tertindas',
        paragraphs: [
          'Pangeran Diponegoro mengangkat senjata bukan demi kekuasaan pribadi, melainkan karena tidak tahan melihat penderitaan rakyat akibat pajak tanah yang mencekik dan pemasangan patok jalan di atas makam leluhur di Tegalrejo.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Perang Jawa & Nilai Kepahlawanan',
        title: 'Taktik Perang Gerilya di Gua Selarong',
        paragraphs: [
          'Didukung oleh Kiai Mojo dan Sentot Alibasya Prawirodirdjo, pasukan Diponegoro menguasai medan perbukitan dan hutan lebat sehingga membuat militer Belanda kewalahan.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Perang Jawa & Nilai Kepahlawanan',
        title: 'Semangat Pantang Menyerah untuk Generasi Muda',
        paragraphs: [
          'Meskipun akhirnya ditangkap melalui tipu muslihat perundingan di Magelang, semangat Diponegoro membuktikan bahwa kebenaran dan keadilan tidak akan pernah padam.'
        ]
      }
    ]
  },

  // ==========================================
  // 6. AGAMA & AKHLAK
  // ==========================================
  {
    id: 'buku-agama-01',
    title: 'Tuntunan Doa Sehari-hari, Dzikir & Adab Islami',
    author: 'Majelis Taklim & Bimbingan Masyarakat Kemenag',
    publisher: 'Pustaka Insan Kamil',
    year: 2024,
    category: 'Agama',
    coverUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-teal-800 to-emerald-950',
    description: 'Lengkap dengan teks Arab, transliterasi Latin, arti bahasa Indonesia, dan etika bertetangga.',
    synopsis: 'Buku panduan doa harian yang praktis untuk anak-anak dan keluarga muslim Desa Batursari, mencakup doa sebelum belajar, adab makan, tidur, safar, serta amalan birrul walidain.',
    totalPages: 4,
    readCount: 330,
    likesCount: 110,
    isPopular: true,
    rating: 4.95,
    uploadedAt: '2024-08-02',
    chapters: [
      { id: 'c1', title: 'Bab 1: Doa Bangun Tidur & Memulai Hari', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Doa Menuntut Ilmu & Adab Belajar', startPage: 3, endPage: 4 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: Doa Bangun Tidur & Memulai Hari',
        title: 'Membuka Hari dengan Rasa Syukur',
        paragraphs: [
          'Setiap kali terbangun dari tidur di waktu fajar yang sejuk, ucapkanlah rasa syukur kepada Allah SWT yang telah menghidupkan kita kembali setelah kematian sementara.',
          'Doa bangun tidur:\n"Alhamdulillahil ladzii ahyaanaa ba\'da maa amaatanaa wa ilaihin nusyuur" (Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan hanya kepada-Nya kami akan dikumpulkan).'
        ],
        callout: {
          type: 'tip',
          title: 'Adab Pagi Hari',
          text: 'Dahulukan melangkah dengan kaki kanan saat keluar kamar dan bersegera mengambil air wudhu untuk menunaikan shalat Subuh berjamaah di masjid/mushola.'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: Doa Bangun Tidur & Memulai Hari',
        title: 'Doa Memakai Pakaian & Keluar Rumah',
        paragraphs: [
          'Saat mengenakan pakaian bersih, mulailah dari lengan/kaki sebelah kanan sambil membaca bismillah.',
          'Doa keluar rumah:\n"Bismillahi tawakkaltu \'alallahi, laa haula wa laa quwwata illaa billaah" (Dengan menyebut nama Allah, aku bertawakal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah).'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Doa Menuntut Ilmu & Adab Belajar',
        title: 'Memohon Kelapangan Hati dan Kemudahan Hafalan',
        paragraphs: [
          'Sebelum membuka buku pelajaran di sekolah atau di Pojok Baca, bacalah doa memohon tambahan ilmu:\n"Robbi zidnii \'ilman warzuqnii fahman" (Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan dan berikanlah aku pemahaman yang baik).',
          'Serta doa kelapangan dada: "Robbisyroh lii shodrii wa yassir lii amrii".'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Doa Menuntut Ilmu & Adab Belajar',
        title: 'Menghormati Guru dan Orang Tua (Birrul Walidain)',
        paragraphs: [
          'Ilmu yang berkah diperoleh melalui keridhaan orang tua dan keikhlasan para guru yang mengajar. Jangan pernah meninggikan suara di hadapan ibu dan ayah.',
          'Senantiasa doakan mereka: "Rabbighfir lii wa liwaalidayya warhamhumaa kamaa robbayaanii shoghiiroo".'
        ]
      }
    ]
  },
  {
    id: 'buku-agama-02',
    title: 'Kisah Teladan 25 Nabi & Rasul Penuh Hikmah',
    author: 'Ustadz H. Ahmad Fauzi & Tim Dakwah UPGRIS',
    publisher: 'Pustaka Hidayah Umat',
    year: 2024,
    category: 'Agama',
    coverUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-emerald-800 to-teal-950',
    description: 'Perjalanan dakwah, mukjizat, ketabahan ulul azmi, dan akhlak mulia Nabi Muhammad SAW.',
    synopsis: 'Membimbing generasi muda meneladani kesabaran Nabi Ayyub, keberanian Nabi Musa, dan kejujuran Nabi Muhammad SAW (Al-Amin) dalam kehidupan sosial bermasyarakat.',
    totalPages: 3,
    readCount: 240,
    likesCount: 75,
    rating: 4.92,
    uploadedAt: '2024-08-05',
    chapters: [
      { id: 'c1', title: 'Keteladanan Para Nabi', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Keteladanan Para Nabi',
        title: 'Nabi Ibrahim AS: Bapak Para Nabi',
        paragraphs: [
          'Nabi Ibrahim mengajarkan keteguhan tauhid dan pencarian kebenaran melalui akal budi yang jernih saat mengamati bintang, bulan, dan matahari, hingga meyakini bahwa hanya Allah Pencipta alam semesta.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Keteladanan Para Nabi',
        title: 'Kesabaran Luar Biasa Nabi Ayyub AS',
        paragraphs: [
          'Meskipun diuji dengan kehilangan harta benda dan sakit bertahun-tahun, Nabi Ayyub tidak pernah berprasangka buruk kepada Allah dan lisannya senantiasa berdzikir memuji-Nya.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Keteladanan Para Nabi',
        title: 'Akhlak Luhur Rasulullah SAW Rahmatan lil Alamin',
        paragraphs: [
          'Nabi Muhammad SAW diutus untuk menyempurnakan kemuliaan akhlak. Beliau selalu tersenyum, menyayangi anak yatim, menghormati orang miskin, dan memaafkan orang yang menyakitinya.'
        ]
      }
    ]
  },

  // ==========================================
  // 7. TEKNOLOGI & LITERASI DIGITAL
  // ==========================================
  {
    id: 'buku-teknologi-01',
    title: 'Internet Cerdas & Bijak: Menangkal Hoaks di Era Digital',
    author: 'Tim Komunikasi Informasi KKN 47 & Relawan TIK',
    publisher: 'Informatika Desa Press',
    year: 2024,
    category: 'Teknologi',
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-indigo-900 to-blue-950',
    description: 'Panduan keamanan gawai pintar, verifikasi berita palsu di grup WhatsApp, dan etika bermedia sosial.',
    synopsis: 'Membekali warga Desa Batursari agar cerdas membedakan informasi valid dan penipuan digital (phishing/pinjol ilegal), serta memanfaatkan gawai untuk kegiatan produktif dan edukasi.',
    totalPages: 4,
    readCount: 305,
    likesCount: 82,
    isPopular: true,
    rating: 4.89,
    uploadedAt: '2024-08-03',
    chapters: [
      { id: 'c1', title: 'Bab 1: 5 Langkah Memeriksa Berita Hoaks', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Mengamankan Akun & Privasi Gawai', startPage: 3, endPage: 4 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: 5 Langkah Memeriksa Berita Hoaks',
        title: 'Saring Sebelum Sharing di Media Sosial',
        paragraphs: [
          'Di era digital saat ini, informasi beredar sangat cepat melalui grup pesan instan keluarga. Namun, tidak semua kabar yang dibagikan adalah kebenaran.',
          'Ciri utama berita hoaks adalah judul yang provokatif, huruf kapital berlebihan, mengancam ("sebarkan jika tidak ingin tertimpa sial"), serta tidak mencantumkan nama narasumber kredibel.'
        ],
        callout: {
          type: 'tip',
          title: 'Rumus Cek Fakta Cepat',
          text: 'Gunakan situs resmi cekfakta.com atau bot WhatsApp TurnBackHoax (Mafindo) sebelum meneruskan pesan yang mencurigakan.'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: 5 Langkah Memeriksa Berita Hoaks',
        title: 'Verifikasi Gambar dan Tautan Mencurigakan',
        paragraphs: [
          'Banyak penipuan mengatasnamakan bantuan sosial atau undian berhadiah dari pemerintah dengan meminta korban mengklik tautan berbahaya (APK/phishing).',
          'Jangan pernah memasang file .APK tak dikenal yang dikirim via WhatsApp kurir palsu atau undangan pernikahan digital asing.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Mengamankan Akun & Privasi Gawai',
        title: 'Password Kuat & Verifikasi Dua Langkah (2FA)',
        paragraphs: [
          'Gunakan kata sandi yang menggabungkan huruf besar, huruf kecil, angka, dan simbol (minimal 8 karakter). Jangan gunakan tanggal lahir atau nomor HP pribadi sebagai password.',
          'Aktifkan fitur Two-Factor Authentication (2FA) pada akun WhatsApp dan Google agar tidak mudah dibajak oleh pihak tidak bertanggung jawab.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Mengamankan Akun & Privasi Gawai',
        title: 'Menjaga Data Pribadi dan Jejak Digital',
        paragraphs: [
          'Hindari mengunggah foto KTP, Kartu Keluarga, tiket perjalanan, atau lokasi rumah secara publik di media sosial.',
          'Ingatlah bahwa apa yang kita ketik di internet meninggalkan jejak digital permanen. Berkomentarlah dengan santun dan menyejukkan.'
        ]
      }
    ]
  },
  {
    id: 'buku-teknologi-02',
    title: 'Panduan Pemasaran Digital & Foto Produk untuk UMKM',
    author: 'Komunitas Digital Kreatif & Mahasiswa KKN',
    publisher: 'UMKM Mandiri Press',
    year: 2024,
    category: 'Teknologi',
    coverUrl: 'https://images.unsplash.com/photo-1556742049-0a67e557229b?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-blue-900 to-indigo-950',
    description: 'Foto produk estetik hanya dengan HP, membuat toko di Google Maps, dan promosi WhatsApp Business.',
    synopsis: 'Membantu pelaku usaha mikro dan ibu-ibu pengrajin Batursari menjangkau pelanggan di luar kota dengan teknik pemasaran digital praktis tanpa biaya mahal.',
    totalPages: 3,
    readCount: 220,
    likesCount: 68,
    isNew: true,
    rating: 4.87,
    uploadedAt: '2024-08-08',
    chapters: [
      { id: 'c1', title: 'Pemasaran Digital Praktis', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Pemasaran Digital Praktis',
        title: 'Foto Produk Menarik dengan Cahaya Alami',
        paragraphs: [
          'Letakkan produk keripik atau anyaman di dekat jendela dengan latar belakang karton putih bersih. Manfaatkan cahaya matahari pagi pukul 08.00–10.00 untuk menghasilkan warna foto yang tajam dan natural.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Pemasaran Digital Praktis',
        title: 'Mendaftarkan Toko di Google Bisnisku',
        paragraphs: [
          'Daftarkan lokasi usaha Anda di Google Maps secara gratis. Cantumkan jam buka, nomor WhatsApp, foto produk, dan ulasan pelanggan agar mudah ditemukan oleh pencari oleh-oleh di wilayah Demak dan sekitarnya.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Pemasaran Digital Praktis',
        title: 'Katalog Otomatis WhatsApp Business',
        paragraphs: [
          'Gunakan fitur WhatsApp Business untuk membuat katalog produk lengkap beserta harga dan deskripsi. Atur pesan balasan otomatis untuk melayani pembeli saat Anda sedang sibuk berproduksi.'
        ]
      }
    ]
  },

  // ==========================================
  // 8. KETERAMPILAN & UMKM
  // ==========================================
  {
    id: 'buku-keterampilan-01',
    title: 'Kriya Anyaman Bambu & Kerajinan Ramah Lingkungan',
    author: 'Paguyuban Pengrajin Seni Batursari & Tim KKN',
    publisher: 'Kreasi Warga Nusantara',
    year: 2024,
    category: 'Keterampilan',
    coverUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-orange-800 to-amber-950',
    description: 'Teknik merawat bilah bambu, pola motif anyaman besek modern, dan packaging hampers ramah lingkungan.',
    synopsis: 'Meningkatkan nilai ekonomi tanaman bambu lokal Desa Batursari menjadi produk kerajinan bernilai jual tinggi seperti tas hampers, wadah ramah lingkungan, dan lampu hias estetik.',
    totalPages: 4,
    readCount: 245,
    likesCount: 71,
    isPopular: true,
    rating: 4.88,
    uploadedAt: '2024-08-04',
    chapters: [
      { id: 'c1', title: 'Bab 1: Memilih & Mengawetkan Bilah Bambu', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Variasi Pola Motif Anyaman Modern', startPage: 3, endPage: 4 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: Memilih & Mengawetkan Bilah Bambu',
        title: 'Memilih Jenis Bambu Berkualitas',
        paragraphs: [
          'Bambu apus (Gigantochloa apus) adalah pilihan terbaik untuk anyaman halus karena seratnya yang panjang, lentur, dan tidak mudah patah saat diserut tipis.',
          'Penebangan sebaiknya dilakukan pada musim kemarau saat kadar air bambu rendah, tepatnya sebelum matahari terbit agar tidak mudah diserang kumbang bubuk.'
        ],
        callout: {
          type: 'tip',
          title: 'Pengawetan Tradisional',
          text: 'Rendam bilah bambu di dalam air mengalir selama 2 minggu, lalu keringkan di tempat teduh berangin untuk mencegah jamur.'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: Memilih & Mengawetkan Bilah Bambu',
        title: 'Teknik Menyerut dan Menyamakan Ketebalan',
        paragraphs: [
          'Gunakan pisau raut tajam dengan sudut kemiringan 15 derajat. Serut bilah bambu hingga ketebalan 0,5 mm untuk anyaman rapat atau 1,2 mm untuk kerangka besek kokoh.',
          'Pewarnaan dapat menggunakan pewarna alami seperti kunyit untuk kuning cerah, kulit manggis untuk ungu tua, dan daun jati untuk cokelat kemerahan.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Variasi Pola Motif Anyaman Modern',
        title: 'Motif Sasak, Kepang, dan Mata Bintang',
        paragraphs: [
          'Anyaman tunggal (sasak) adalah dasar paling kuat untuk dasar keranjang. Untuk menambah nilai estetika, kombinasikan dengan motif kepang ganda atau anyaman mata bintang pada sisi samping.',
          'Produk anyaman dengan motif unik memiliki harga jual hingga 3 kali lipat lebih tinggi di pasar suvenir kota.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Variasi Pola Motif Anyaman Modern',
        title: 'Pemasaran Hampers Ramadan & Oleh-Oleh',
        paragraphs: [
          'Tambahkan sentuhan pita kain goni dan label berbahan kertas daur ulang pada besek bambu.',
          'Kemas olahan pangan lokal seperti dodol, keripik pisang, atau telor asin dalam hampers bambu estetik untuk pesanan pesta hajatan dan hari raya.'
        ]
      }
    ]
  },
  {
    id: 'buku-keterampilan-02',
    title: 'Aneka Olahan Pangan Lokal: Keripik, Sambal & Kue Basah',
    author: 'Kelompok PKK Desa Batursari',
    publisher: 'Dapur Nusantara Mandiri',
    year: 2024,
    category: 'Keterampilan',
    coverUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-red-900 to-amber-950',
    description: 'Resep rahasia renyah keripik singkong balado, sambal terasi khas pesisir, dan kue tradisional legit.',
    synopsis: 'Buku panduan kuliner praktis untuk ibu-ibu rumah tangga dalam mengolah komoditas singkong, pisang, dan cabai hasil panen desa menjadi camilan bernilai komersial tinggi.',
    totalPages: 3,
    readCount: 230,
    likesCount: 77,
    isNew: true,
    rating: 4.87,
    uploadedAt: '2024-08-09',
    chapters: [
      { id: 'c1', title: 'Resep Olahan Bernilai Jual', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Resep Olahan Bernilai Jual',
        title: 'Trik Keripik Singkong Renyah Anti Gosong',
        paragraphs: [
          'Rendam irisan singkong tipis dalam air kapur sirih dan bawang putih selama 30 menit sebelum digoreng. Gunakan minyak panas melimpah dengan api sedang agar keripik mekar sempurna dan tahan renyah hingga 3 bulan.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Resep Olahan Bernilai Jual',
        title: 'Sambal Kemasan Botol Higienis',
        paragraphs: [
          'Tumis cabai rawit merah, bawang merah, dan terasi matang hingga benar-benar tanak dan minyak cabai keluar kemerahan. Masukkan ke dalam botol kaca steril saat masih hangat dan segel menggunakan segel plastik panas (shrink wrap).'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Resep Olahan Bernilai Jual',
        title: 'Kalkulasi Modal dan Menentukan Harga Jual',
        paragraphs: [
          'Hitung seluruh biaya bahan baku, gas, kemasan, dan tenaga kerja. Tambahkan margin laba 30–40% untuk menentukan harga jual yang kompetitif dan menguntungkan bagi kas keluarga.'
        ]
      }
    ]
  },

  // ==========================================
  // 9. PERTANIAN & KETAHANAN PANGAN
  // ==========================================
  {
    id: 'buku-pertanian-01',
    title: 'Budi Daya Padi Sehat & Pembuatan Pupuk Organik Cair (POC)',
    author: 'Dinas Pertanian & Gabungan Kelompok Tani (Gapoktan) Batursari',
    publisher: 'Pustaka Tani Sejahtera',
    year: 2024,
    category: 'Pertanian',
    coverUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-green-900 to-emerald-950',
    description: 'Metode tanam SRI, pembuatan mikroorganisme lokal (MOL), dan pestisida nabati pengendali wereng.',
    synopsis: 'Pedoman lengkap bagi petani Desa Batursari untuk meningkatkan produktivitas panen padi secara berkelanjutan, menekan biaya pupuk kimia, serta menjaga kesuburan tanah sawah.',
    totalPages: 5,
    readCount: 360,
    likesCount: 115,
    isPopular: true,
    isFeatured: true,
    rating: 4.96,
    uploadedAt: '2024-08-01',
    chapters: [
      { id: 'c1', title: 'Bab 1: Persiapan Lahan & Benih Unggul Bersertifikat', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Formulasi Pupuk Organik Cair (POC)', startPage: 3, endPage: 4 },
      { id: 'c3', title: 'Bab 3: Pestisida Nabati Daun Mimba & Bawang Putih', startPage: 5, endPage: 5 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: Persiapan Lahan & Benih Unggul Bersertifikat',
        title: 'Uji Bernas Benih dengan Larutan Garam',
        paragraphs: [
          'Kunci awal keberhasilan panen berlimpah terletak pada seleksi benih bermutu. Masukkan benih padi ke dalam larutan air garam (gunakan telur bebek mentah sebagai indikator; jika telur mengapung, larutan sudah pas).',
          'Ambil hanya benih yang tenggelam di dasar ember. Benih yang hampa dan mengapung dibuang karena rentan terserang penyakit jamur dan kresek.'
        ],
        callout: {
          type: 'tip',
          title: 'Metode Tanam Jajar Legowo 2:1',
          text: 'Terapkan pola tanam jajar legowo untuk menciptakan efek lorong angin dan pencahayaan matahari optimal yang meningkatkan jumlah anakan produktif.'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: Persiapan Lahan & Benih Unggul Bersertifikat',
        title: 'Pengolahan Tanah dengan Jerami Terfermentasi',
        paragraphs: [
          'Jangan membakar jerami sisa panen! Pembakaran merusak mikroba tanah dan membuang unsur hara kalium yang berharga.',
          'Sebarkan jerami di sawah, semprot dengan dekomposer organik, lalu bajak tanah hingga lumer. Dalam 2 minggu, jerami akan berubah menjadi kompos alami penyubur sawah.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Formulasi Pupuk Organik Cair (POC)',
        title: 'Membuat POC dari Bonggol Pisang dan Air Kelapa',
        paragraphs: [
          'Bonggol pisang kaya akan sitokinin dan giberelin (hormon pemicu pertumbuhan akar). Cincang halus 5 kg bonggol pisang, campur dengan 10 liter air kelapa, 1 liter tetes tebu (molase), dan 1 botol EM4 Pertanian.',
          'Tutup rapat dalam tong plastik selama 14 hari dengan selang aerasi air untuk membuang gas fermentasi.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Formulasi Pupuk Organik Cair (POC)',
        title: 'Dosis dan Jadwal Aplikasi pada Tanaman',
        paragraphs: [
          'Saring larutan POC yang telah matang (beraroma manis asam seperti tapai). Encerkan 250 ml POC ke dalam 1 tangki semprot 16 liter air bersih.',
          'Semprotkan pada bagian bawah daun tanaman padi pada pagi hari pukul 06.30–09.00 saat stomata daun terbuka lebar, pada umur 14, 28, dan 42 hari setelah tanam.'
        ]
      },
      {
        pageNumber: 5,
        chapterTitle: 'Bab 3: Pestisida Nabati Daun Mimba & Bawang Putih',
        title: 'Pengendali Alami Wereng Batang Cokelat',
        paragraphs: [
          'Tumbuk 1 kg daun mimba/sirsak, 250 gram bawang putih, dan 1 sendok sabun colek sebagai perata. Rebus sebentar dan diamkan semalam.',
          'Ekstrak ini efektif mengusir wereng dan walang sangit tanpa membunuh serangga predator alami seperti laba-laba dan kepik.'
        ]
      }
    ]
  },
  {
    id: 'buku-hidroponik-01',
    title: 'Sayuran Segar di Pekarangan Rumah: Panduan Hidroponik Sederhana',
    author: 'Kelompok Tani Muda & KKN 47',
    publisher: 'Batursari Mandiri Press',
    year: 2024,
    category: 'Pertanian',
    coverUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-emerald-800 to-green-950',
    description: 'Menanam sawi, kangkung, dan selada menggunakan botol bekas dan pipa paralon di lahan terbatas.',
    synopsis: 'Solusi cerdas bagi warga desa yang ingin menikmati sayuran segar higienis bebas pestisida langsung dari teras rumah sendiri dengan sistem wick dan nutrisi AB Mix.',
    totalPages: 3,
    readCount: 220,
    likesCount: 65,
    isNew: true,
    rating: 4.84,
    uploadedAt: '2024-08-09',
    chapters: [
      { id: 'c1', title: 'Sistem Wick Botol Bekas', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Perawatan & Panen Cepat', startPage: 3, endPage: 3 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Sistem Wick Botol Bekas',
        title: 'Memanfaatkan Barang Bekas Jadi Kebun Mini',
        paragraphs: [
          'Potong botol air mineral bekas menjadi dua bagian. Lubangi tutup botol dan pasang kain flanel sebagai sumbu kapiler untuk menyerap air nutrisi ke akar tanaman.',
          'Isi bagian atas botol dengan media tanam arang sekam atau rockwool yang telah dibasahi.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Sistem Wick Botol Bekas',
        title: 'Penyemaian Benih Kangkung & Pakcoy',
        paragraphs: [
          'Semai benih di tempat teduh hingga berkecambah (2-3 hari). Setelah muncul 3-4 helai daun sejati, pindahkan ke modul botol hidroponik dan letakkan di tempat yang terkena sinar matahari pagi.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Perawatan & Panen Cepat',
        title: 'Panen Segar dalam 25-30 Hari',
        paragraphs: [
          'Jaga agar wadah nutrisi tidak kekeringan. Dalam waktu kurang dari sebulan, sayuran pakcoy dan kangkung segar siap dipanen untuk lauk keluarga yang sehat dan lezat!'
        ]
      }
    ]
  },
  {
    id: 'buku-pertanian-03',
    title: 'Panduan Ternak Kambing & Ayam Kampung Super Organik',
    author: 'Pusat Peternakan Mandiri & Tim KKN 47',
    publisher: 'Agro Ternak Nusantara',
    year: 2024,
    category: 'Pertanian',
    coverUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-lime-900 to-stone-900',
    description: 'Manajemen kandang panggung sehat, pembuatan pakan fermentasi silase, dan vaksinasi alami herbal.',
    synopsis: 'Strategi peternakan terintegrasi (integrated farming) yang mengolah kotoran ternak menjadi pupuk biogas dan hijauan pakan ternak dari sela tanaman pekarangan.',
    totalPages: 3,
    readCount: 205,
    likesCount: 62,
    rating: 4.86,
    uploadedAt: '2024-08-10',
    chapters: [
      { id: 'c1', title: 'Ternak Unggul & Pakan Murah', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Ternak Unggul & Pakan Murah',
        title: 'Desain Kandang Panggung Bersih dan Tidak Berbau',
        paragraphs: [
          'Buat lantai kandang panggung setinggi 80 cm dengan celah lantai kayu 1,5 cm agar kotoran jatuh ke bawah. Buat lantai bawah miring beralaskan terpal untuk memudahkan pengumpulan pupuk kandang setiap pagi.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Ternak Unggul & Pakan Murah',
        title: 'Pakan Fermentasi Silase Rumput Gajah & Bekatul',
        paragraphs: [
          'Cacah rumput odot atau rumput gajah, campur dengan bekatul dan molase prebiotik. Padatkan dalam drum plastik kedap udara selama 21 hari. Pakan silase tahan disimpan 6 bulan dan membuat ternak cepat gemuk.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Ternak Unggul & Pakan Murah',
        title: 'Jamu Herbal Temulawak untuk Daya Tahan Ternak',
        paragraphs: [
          'Berikan air rebusan temulawak, kunyit, dan jahe seminggu sekali pada air minum ayam dan kambing untuk mencegah penyakit tetelo dan meningkatkan nafsu makan secara alami.'
        ]
      }
    ]
  },

  // ==========================================
  // 10. KESEHATAN & GIZI KELUARGA
  // ==========================================
  {
    id: 'buku-kesehatan-01',
    title: 'Gizi Seimbang Keluarga & Pencegahan Stunting Balita',
    author: 'Puskesmas & Bidan Desa Batursari',
    publisher: 'Dinas Kesehatan & Pojok Baca Press',
    year: 2024,
    category: 'Kesehatan',
    coverUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-rose-800 to-pink-950',
    description: 'Panduan 1000 Hari Pertama Kehidupan (HPK), menu MPASI bergizi lokal, dan PHBS keluarga sehat.',
    synopsis: 'Buku rujukan kesehatan keluarga yang disiapkan bersama tenaga medis desa untuk mengedukasi para calon pengantin, ibu hamil, dan orang tua dalam memenuhi gizi mikro dan makro anak demi generasi Batursari yang cerdas dan bebas stunting.',
    totalPages: 4,
    readCount: 350,
    likesCount: 104,
    isPopular: true,
    rating: 4.94,
    uploadedAt: '2024-08-01',
    chapters: [
      { id: 'c1', title: 'Bab 1: 1000 Hari Pertama Kehidupan (HPK)', startPage: 1, endPage: 2 },
      { id: 'c2', title: 'Bab 2: Piring Gizi Seimbang & Protein Hewani', startPage: 3, endPage: 4 },
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Bab 1: 1000 Hari Pertama Kehidupan (HPK)',
        title: 'Masa Emas Pertumbuhan Otak Anak',
        paragraphs: [
          '1000 Hari Pertama Kehidupan dimulai sejak pembuahan dalam kandungan (270 hari) hingga anak berusia 2 tahun (730 hari). Periode ini menentukan perkembangan otak, kekebalan tubuh, dan pertumbuhan fisik sepanjang hayat.',
          'Ibu hamil wajib meminum tablet tambah darah (TTD) minimal 90 tablet selama kehamilan dan mencukupi asupan asam folat, kalsium, serta protein hewani seperti telur dan ikan.'
        ],
        callout: {
          type: 'tip',
          title: 'Komitmen Desa Sehat',
          text: 'Pemberian ASI Eksklusif selama 6 bulan pertama tanpa tambahan cairan lain merupakan imunisasi alami terbaik bagi bayi.'
        }
      },
      {
        pageNumber: 2,
        chapterTitle: 'Bab 1: 1000 Hari Pertama Kehidupan (HPK)',
        title: 'Pola Asuh Penuh Kasih & Pantau Timbangan Balita',
        paragraphs: [
          'Bawalah balita ke Posyandu setiap bulan untuk memantau grafik berat dan tinggi badan di Buku KIA.',
          'Stimulasi bicara, bernyanyi bersama, dan membacakan buku cerita sejak dini di Pojok Baca terbukti melipatgandakan perbendaharaan kata anak.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Bab 2: Piring Gizi Seimbang & Protein Hewani',
        title: 'Konsep "Isi Piringku" Sekali Makan',
        paragraphs: [
          'Bagi piring makan menjadi tiga bagian: 1/3 makanan pokok (nasi/jagung), 1/3 sayuran hijau segar, 1/6 lauk pauk berprotein, dan 1/6 buah-buahan lokal.',
          'Protein hewani seperti telur ayam, ikan kembung, hati ayam, dan tempe sangat esensial untuk mencegah anemia dan mendukung pertumbuhan tulang anak.'
        ]
      },
      {
        pageNumber: 4,
        chapterTitle: 'Bab 2: Piring Gizi Seimbang & Protein Hewani',
        title: 'Cuci Tangan Pakai Sabun & Air Bersih',
        paragraphs: [
          'Gizi yang baik harus ditopang dengan sanitasi lingkungan yang higienis. Biasakan mencuci tangan pakai sabun di air mengalir sebelum menyiapkan makanan dan sesudah buang air.',
          'Jaga kebersihan pekarangan rumah dari genangan air agar terhindar dari penyakit demam berdarah.'
        ]
      }
    ]
  },
  {
    id: 'buku-kesehatan-02',
    title: 'Buku Saku P3K & Penanganan Pertama Kegawatdaruratan Rumah Tangga',
    author: 'Palang Merah Indonesia & Tim Medis KKN 47',
    publisher: 'Pustaka Medika Desa',
    year: 2024,
    category: 'Kesehatan',
    coverUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-rose-900 to-slate-950',
    description: 'Pertolongan pertama luka bakar ringan, mimisan, tersedak (Heimlich Maneuver), demam kejang, dan gigitan serangga.',
    synopsis: 'Panduan ringkas dan lugas yang wajib dimiliki setiap keluarga di Desa Batursari untuk memberikan pertolongan pertama sebelum bantuan medis puskesmas tiba.',
    totalPages: 3,
    readCount: 215,
    likesCount: 66,
    isNew: true,
    rating: 4.88,
    uploadedAt: '2024-08-08',
    chapters: [
      { id: 'c1', title: 'Pedoman P3K Rumah Tangga', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Pedoman P3K Rumah Tangga',
        title: 'Pertolongan Pertama Luka Bakar Ringan',
        paragraphs: [
          'Segera guyur luka bakar akibat cipratan minyak panas atau air mendidih dengan air mengalir suhu ruang selama 15–20 menit. Jangan mengoleskan odol/pasta gigi atau mentega karena dapat menjebak panas dan memicu infeksi bakteri.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Pedoman P3K Rumah Tangga',
        title: 'Menangani Anak Mimisan dan Demam',
        paragraphs: [
          'Saat mimisan, duduk tegak dan condongkan badan ke depan (jangan mendongak ke belakang). Pijat cuping hidung dengan ibu jari dan telunjuk selama 10 menit.',
          'Untuk demam tinggi, kompres dahi dan ketiak dengan air hangat (suam kuku), beri banyak minum air putih, dan berikan parasetamol sesuai dosis berat badan.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Pedoman P3K Rumah Tangga',
        title: 'Menolong Orang Tersedak (Heimlich Maneuver)',
        paragraphs: [
          'Berdirilah di belakang korban, lingkarkan lengan di pinggang korban. Kepalkan satu tangan di atas pusar dan hentakkan ke dalam dan ke atas dengan cepat hingga benda yang menyumbat tenggorokan keluar.'
        ]
      }
    ]
  },
  {
    id: 'buku-kesehatan-03',
    title: 'Tanaman Obat Keluarga (TOGA) & Jamu Herbal Berkhasiat',
    author: 'Balai Kesehatan Herbal & Ibu PKK',
    publisher: 'Husada Herbal Press',
    year: 2024,
    category: 'Kesehatan',
    coverUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&auto=format&fit=crop&q=80',
    coverColor: 'from-emerald-900 to-green-950',
    description: 'Manfaat kunyit asam, jahe merah, kencur, daun sirih, dan kumis kucing untuk menjaga kebugaran tubuh.',
    synopsis: 'Mengupas khasiat herbal nusantara yang tumbuh subur di pekarangan Desa Batursari, resep rebusan jamu tradisional pereda batuk, asam lambung, dan daya tahan tubuh.',
    totalPages: 3,
    readCount: 195,
    likesCount: 59,
    rating: 4.85,
    uploadedAt: '2024-08-11',
    chapters: [
      { id: 'c1', title: 'Apotek Hidup di Teras Rumah', startPage: 1, endPage: 3 }
    ],
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'Apotek Hidup di Teras Rumah',
        title: 'Jahe Merah dan Serai untuk Menghangatkan Tubuh',
        paragraphs: [
          'Rebusan jahe merah yang dimemarkan bersama batang serai dan gula aren sangat ampuh meredakan masuk angin, melancarkan peredaran darah, dan mengatasi pegal linu setelah beraktivitas di sawah.'
        ]
      },
      {
        pageNumber: 2,
        chapterTitle: 'Apotek Hidup di Teras Rumah',
        title: 'Kunyit Asam Penjaga Kesehatan Lambung',
        paragraphs: [
          'Kandungan kurkumin pada kunyit memiliki sifat antiradang yang melapisi dinding lambung. Dipadukan dengan asam jawa, minuman ini juga menyegarkan tubuh dan membersihkan racun alami.'
        ]
      },
      {
        pageNumber: 3,
        chapterTitle: 'Apotek Hidup di Teras Rumah',
        title: 'Daun Sirih dan Kumis Kucing',
        paragraphs: [
          'Daun sirih berfungsi sebagai antiseptik alami untuk berkumur menjaga kesehatan gigi dan gusi. Daun kumis kucing berkhasiat melancarkan buang air kecil dan menjaga kesehatan ginjal.'
        ]
      }
    ]
  }
];
