# 🔍 Website Pencarian Jurnal Ilmiah

Website pencarian cepat judul jurnal ilmiah menggunakan algoritma **String Matching** dengan **Next.js**, **MySQL**, dan **Levenshtein Distance Algorithm**.

## ✨ Fitur Utama

- 🔍 **Pencarian Cepat** - MySQL FULLTEXT search dengan 3-tier algorithm
- 🎯 **Fuzzy Matching** - Algoritma Levenshtein Distance untuk hasil pencarian yang toleran terhadap typo
- 📚 **100 Jurnal Sampel** - Database lengkap dengan jurnal dari berbagai kategori
- 📄 **Pagination** - Tampilan hasil pencarian dengan pagination (20 per halaman)
- 📖 **Detail Jurnal** - Halaman detail lengkap untuk setiap jurnal
- 📊 **Statistik Real-time** - Dashboard statistik jurnal yang dinamis
- 🎨 **UI Modern** - Desain gradien biru dengan animasi smooth
- 📱 **Responsive** - Tampilan optimal di semua device

## 🚀 Teknologi

- **Frontend**: Next.js 14.2.18 (App Router), React 18
- **Backend**: Next.js API Routes
- **Database**: MySQL dengan Prisma ORM 5.22.0
- **Algoritma**: FULLTEXT Search + Levenshtein Distance
- **Styling**: Pure CSS dengan gradien animasi

## 📦 Instalasi

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database MySQL

Pastikan MySQL sudah terinstall dan running. Buat database baru:

```sql
CREATE DATABASE journal_db;
```

### 3. Konfigurasi Environment

Update file `.env` dengan kredensial MySQL Anda:

```env
DATABASE_URL="mysql://root:@localhost:3306/journal_db"
```

Ganti `root` dengan username MySQL Anda (default: root).
Tambahkan password setelah `:` jika MySQL Anda memiliki password.

### 4. Generate Prisma Client & Migrate Database

```bash
npm run prisma:generate
npm run prisma:migrate
```

Ketika diminta nama migration, masukkan: `init`

### 5. Seed Database dengan Sample Data

```bash
npm run prisma:seed
```

Ini akan mengisi database dengan **100 jurnal sampel** dari berbagai kategori:
- 25 Teknologi & Computer Science
- 25 Kesehatan & Kedokteran  
- 20 Pendidikan
- 15 Lingkungan & Sustainability
- 15 Ekonomi & Bisnis

## 🎮 Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
```

Buka browser dan akses: **http://localhost:3000**

### Production Build

```bash
npm run build
npm start
```

## 📖 Cara Penggunaan

### 1. Pencarian Jurnal
1. Masukkan kata kunci di search box (judul, penulis, atau keywords)
2. Klik tombol "🔎 Cari Jurnal" atau tekan **Enter**
3. Hasil akan ditampilkan dengan animasi slide-in
4. Lihat statistik pencarian di bagian atas

### 2. Melihat Detail Jurnal
- Klik pada card jurnal untuk melihat informasi lengkap
- Lihat abstract, authors, publication date, dan keywords
- Klik tombol "← Kembali" untuk kembali ke hasil pencarian

### 3. Navigasi Hasil
- Gunakan tombol pagination jika hasil > 20 jurnal
- Informasi halaman ditampilkan di tengah pagination

## 🔍 Algoritma Pencarian (3-Tier Search)

Aplikasi menggunakan strategi pencarian bertingkat:

### Tier 1: FULLTEXT Search
```sql
MATCH(title) AGAINST('query') OR
MATCH(authors) AGAINST('query') OR  
MATCH(keywords) AGAINST('query')
```
- Pencarian tercepat menggunakan MySQL native index
- Hasil diurutkan berdasarkan relevance score

### Tier 2: LIKE Search
```sql
WHERE title LIKE '%query%' OR
      authors LIKE '%query%' OR
      keywords LIKE '%query%'
```
- Aktif jika FULLTEXT tidak menemukan hasil
- Wildcard search untuk fleksibilitas

### Tier 3: Fuzzy Matching
```javascript
levenshteinDistance(str1, str2) <= 2-3
similarity >= 50%
```
- Toleran terhadap typo dan variasi penulisan
- Menggunakan Levenshtein Distance Algorithm

## 💡 Contoh Pencarian

| Query | Hasil |
|-------|-------|
| `machine learning` | Jurnal tentang ML, AI, Deep Learning |
| `COVID-19` | Jurnal penelitian COVID, pandemic |
| `Ahmad Rizki` | Jurnal oleh penulis tertentu |
| `pendidikan` | Topik pendidikan & pembelajaran |
| `sustanability` | Fuzzy match → "sustainability" |

## 📁 Struktur Proyek

```
Web string match/
├── app/
│   ├── api/
│   │   ├── search/
│   │   │   └── route.js         # Search API (3-tier algorithm)
│   │   ├── stats/
│   │   │   └── route.js         # Statistics API
│   │   └── journals/[id]/
│   │       └── route.js         # Journal detail API
│   ├── journals/[id]/
│   │   └── page.js              # Journal detail page
│   ├── layout.js                # Root layout
│   ├── page.js                  # Homepage (search interface)
│   └── globals.css              # Styling (557 lines)
├── lib/
│   ├── db.js                    # Prisma client singleton
│   └── stringMatch.js           # Levenshtein algorithm
├── prisma/
│   ├── schema.prisma            # Database schema with FULLTEXT
│   └── seed.js                  # 100 sample journals
├── .env                         # Database connection
├── setup-db.sql                 # Manual DB setup script
└── README.md
```

## 🗄️ Database Schema

```prisma
model Journal {
  id                Int      @id @default(autoincrement())
  title             String   @db.VarChar(500)
  authors           String   @db.Text
  publication_date  DateTime @db.Date
  abstract          String?  @db.Text
  keywords          String?  @db.VarChar(500)
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt

  @@fulltext([title])
  @@fulltext([authors])
  @@fulltext([keywords])
}
```

**Note**: Menggunakan FULLTEXT index terpisah untuk setiap kolom (bukan composite index).

## 🎨 Fitur UI/UX

- ✨ **Gradient Background**: Animasi gradien biru smooth
- 🎯 **Glass Morphism**: Efek kaca transparan pada card
- 🎭 **Animations**: Slide-in, fade-in, pulse, float
- 📊 **Real-time Stats**: Total jurnal, hasil pencarian, kategori
- 🎪 **Hover Effects**: Transform dan shadow pada interaksi
- 📱 **Responsive**: Mobile-first design
- 🦶 **Footer**: Informasi sistem dan teknologi

## 🛠️ API Endpoints

### POST `/api/search`
```json
{
  "query": "machine learning",
  "page": 1,
  "limit": 20
}
```

Response:
```json
{
  "results": [...],
  "total": 45,
  "page": 1,
  "limit": 20
}
```

### GET `/api/stats`
Response:
```json
{
  "total": 100,
  "categories": 5,
  "authors": 156,
  "recentJournals": [...]
}
```

### GET `/api/journals/[id]`
Response:
```json
{
  "id": 1,
  "title": "...",
  "authors": "...",
  "publication_date": "...",
  "abstract": "...",
  "keywords": "..."
}
```

## 🔧 Troubleshooting

### Error: Cannot connect to MySQL
```bash
# 1. Pastikan MySQL running
mysql.server start  # macOS
sudo service mysql start  # Linux

# 2. Test koneksi
mysql -u root -p

# 3. Cek database exists
SHOW DATABASES;
```

### Error: Prisma Client not generated
```bash
npm run prisma:generate
```

### Error: FULLTEXT index missing
```bash
# Gunakan script manual
mysql -u root -p journal_db < setup-db.sql
```

### Migration error
```bash
# Reset dan rebuild
npx prisma migrate reset
npm run prisma:migrate  
npm run prisma:seed
```

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Atau gunakan port lain
PORT=3001 npm run dev
```

## 📝 License

MIT License - Feel free to use for learning purposes

## 👨‍💻 Author

Built with ❤️ using Next.js, React, and MySQL

---

**Happy Searching! 🔍📚**

## License

MIT
