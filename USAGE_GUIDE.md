# 📖 Panduan Penggunaan Website Pencarian Jurnal

## 🚀 Quick Start

1. **Jalankan Server**
```bash
npm run dev
```

2. **Buka Browser**
- URL: http://localhost:3000
- Website akan terbuka dengan tampilan gradien biru yang menarik

## 🔍 Fitur-Fitur Utama

### 1. Dashboard & Statistik
Saat pertama kali membuka website, Anda akan melihat:
- **Total Jurnal**: Jumlah total jurnal dalam database (100 jurnal)
- **Hasil Ditemukan**: Akan muncul setelah melakukan pencarian
- **Kategori**: Jumlah kategori jurnal yang tersedia (5 kategori)

### 2. Pencarian Jurnal

#### Cara Mencari:
1. **Ketik kata kunci** di kotak pencarian
   - Contoh: "machine learning", "COVID-19", "pendidikan"
2. **Klik tombol "🔎 Cari Jurnal"** atau tekan **Enter**
3. **Hasil akan muncul** dengan animasi slide-in

#### Tips Pencarian Efektif:
- ✅ Gunakan kata kunci spesifik: "deep learning", "neural network"
- ✅ Cari berdasarkan nama penulis: "Dr. Ahmad", "Maria Santos"
- ✅ Cari berdasarkan topik: "kesehatan mental", "ekonomi digital"
- ✅ Cari berdasarkan keywords: "AI", "blockchain", "IoT"
- ⚡ Toleran typo: "machne learing" → akan menemukan "machine learning"

#### Contoh Pencarian:

| Kata Kunci | Hasil Yang Didapat |
|------------|-------------------|
| `machine learning` | Jurnal tentang ML, AI, Deep Learning |
| `COVID` | Penelitian tentang COVID-19, pandemic |
| `Dr. Sarah` | Jurnal yang ditulis oleh Dr. Sarah |
| `pendidikan online` | Jurnal tentang e-learning, education |
| `renewable energy` | Jurnal tentang energi terbarukan |
| `blockchain` | Teknologi blockchain dan cryptocurrency |

### 3. Melihat Hasil Pencarian

Setiap card jurnal menampilkan:
- 📄 **Judul Jurnal**: Nama lengkap jurnal
- 👤 **Penulis**: Nama penulis/author
- 📅 **Tanggal Publikasi**: Kapan jurnal dipublikasikan
- 🏷️ **Keywords**: Tag/kata kunci jurnal
- 📝 **Abstract**: Ringkasan singkat (200 karakter pertama)
- ➡️ **Klik untuk detail**: Link ke halaman detail lengkap

### 4. Melihat Detail Jurnal

**Cara Akses:**
- Klik pada **card jurnal** manapun dari hasil pencarian

**Informasi Lengkap:**
- ✅ Judul lengkap jurnal
- ✅ Nama semua penulis
- ✅ Tanggal publikasi
- ✅ Abstract lengkap
- ✅ Semua keywords dengan badge berwarna
- ✅ Tombol "← Kembali" untuk kembali ke hasil pencarian

### 5. Navigasi Pagination

Jika hasil pencarian lebih dari 20 jurnal:
- Gunakan tombol **"← Sebelumnya"** untuk halaman sebelumnya
- Gunakan tombol **"Selanjutnya →"** untuk halaman berikutnya
- Lihat informasi **"Halaman X dari Y"** di tengah

## 🎯 Algoritma Pencarian

Website menggunakan **3-Tier Search Algorithm**:

### Tier 1: FULLTEXT Search (Tercepat)
- Menggunakan MySQL FULLTEXT index
- Pencarian di kolom: title, authors, keywords
- Hasil terurut berdasarkan relevance

### Tier 2: LIKE Search (Fallback)
- Aktif jika Tier 1 tidak menemukan hasil
- Pencarian dengan wildcard `%query%`
- Lebih fleksibel tapi sedikit lebih lambat

### Tier 3: Fuzzy Matching (Toleran Typo)
- Menggunakan **Levenshtein Distance Algorithm**
- Toleransi kesalahan ketik 2-3 karakter
- Similarity threshold: 50%

**Contoh Fuzzy Matching:**
```
Input: "machne learing"
Hasil: "machine learning" ✅
Alasan: Hanya berbeda 2 karakter

Input: "neurol netwrk"  
Hasil: "neural network" ✅
Alasan: Similarity > 50%
```

## 📊 Statistik & Informasi

### Footer Section
Di bagian bawah website terdapat:

1. **Tentang Sistem**
   - Deskripsi singkat website
   - Teknologi yang digunakan

2. **Teknologi**
   - Next.js & React
   - MySQL Database
   - FULLTEXT Search
   - Levenshtein Algorithm

3. **Statistik**
   - Jumlah jurnal tersedia
   - Jumlah kategori
   - Algoritma yang digunakan

## 🎨 Fitur Visual

### Animasi & Efek
- **Background Gradien**: Animasi gradien biru yang smooth
- **Floating Shapes**: Bentuk geometris yang mengambang
- **Slide-in Animation**: Card jurnal muncul dengan efek slide
- **Hover Effects**: Transform dan shadow saat cursor di atas card
- **Glass Morphism**: Efek kaca transparan pada card

### Warna Tema
- Primary: Blue gradient (#1e3c72 → #85c1e9)
- Cards: White dengan transparansi
- Text: Dark blue untuk heading, gray untuk content
- Accent: Light blue untuk highlights

## 🔧 Troubleshooting User

### Hasil Pencarian Kosong
**Solusi:**
1. Coba kata kunci yang lebih umum
2. Periksa spelling/ejaan
3. Gunakan sinonim: "ML" → "machine learning"
4. Coba pencarian dengan 1-2 kata saja

### Website Lambat
**Solusi:**
1. Periksa koneksi internet
2. Refresh halaman (F5)
3. Clear browser cache
4. Coba browser lain

### Card Tidak Clickable
**Solusi:**
1. Pastikan JavaScript aktif
2. Klik tepat di tengah card
3. Refresh halaman

## 📱 Responsive Design

Website dapat diakses dengan optimal di:
- 💻 Desktop (1920x1080 atau lebih)
- 💻 Laptop (1366x768)
- 📱 Tablet (768x1024)
- 📱 Mobile (375x667)

## 🎓 Use Cases

### 1. Mahasiswa Penelitian
```
Skenario: Mencari referensi untuk skripsi tentang AI
Langkah:
1. Cari "artificial intelligence"
2. Filter hasil dengan melihat tahun publikasi
3. Klik jurnal yang relevan
4. Baca abstract untuk memilih referensi
```

### 2. Dosen/Peneliti
```
Skenario: Mencari jurnal terbaru tentang kesehatan
Langkah:
1. Cari "health" atau "medicine"
2. Lihat tanggal publikasi
3. Check keywords untuk spesialisasi
4. Simpan yang relevan
```

### 3. Perpustakaan Digital
```
Skenario: Katalog jurnal untuk akses mahasiswa
Langkah:
1. Browse semua kategori
2. Cari berdasarkan topik
3. Sediakan link detail untuk download
```

## 📈 Tips Maksimalkan Penggunaan

1. **Gunakan Kata Kunci Spesifik**
   - ❌ "komputer" (terlalu umum)
   - ✅ "computer vision deep learning" (spesifik)

2. **Manfaatkan Keywords**
   - Lihat keywords di card hasil
   - Gunakan keywords untuk refine search

3. **Baca Abstract**
   - Preview singkat sudah cukup informatif
   - Klik detail hanya jika sangat relevan

4. **Gunakan Pagination**
   - Jelajahi beberapa halaman
   - Hasil tersortir berdasarkan relevance

5. **Bookmark Halaman Detail**
   - URL detail bisa di-bookmark
   - Format: `/journals/[id]`

## 🌟 Fitur Upcoming (Planned)

- [ ] Filter berdasarkan tahun publikasi
- [ ] Sort berdasarkan tanggal/relevance
- [ ] Export hasil ke PDF/CSV
- [ ] Save favorite journals
- [ ] Advanced search dengan operator Boolean
- [ ] Dark mode theme
- [ ] Multi-language support

## 📞 Support

Jika mengalami masalah:
1. Check README.md untuk troubleshooting
2. Periksa console browser (F12) untuk error
3. Restart development server
4. Check database connection

---

**Selamat Menggunakan! 🎉**
