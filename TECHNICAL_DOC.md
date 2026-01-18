# 🔧 Technical Documentation - Website Pencarian Jurnal

## Architecture Overview

### Technology Stack

```
┌─────────────────────────────────────────┐
│          Frontend Layer                  │
│  Next.js 14 + React 18 + CSS            │
│  (Server & Client Components)           │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          API Layer                       │
│  Next.js API Routes                     │
│  - /api/search                          │
│  - /api/stats                           │
│  - /api/journals/[id]                   │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          Data Access Layer               │
│  Prisma ORM 5.22.0                      │
│  - Schema Definition                    │
│  - Query Builder                        │
│  - Type Safety                          │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          Database Layer                  │
│  MySQL 8.0+                             │
│  - FULLTEXT Indexes                     │
│  - InnoDB Engine                        │
└─────────────────────────────────────────┘
```

## Database Design

### Schema Definition

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

### Index Strategy

**FULLTEXT Indexes** (Separate, not composite):
```sql
-- Index 1: Title search
CREATE FULLTEXT INDEX Journal_title_idx ON Journal(title);

-- Index 2: Authors search  
CREATE FULLTEXT INDEX Journal_authors_idx ON Journal(authors);

-- Index 3: Keywords search
CREATE FULLTEXT INDEX Journal_keywords_idx ON Journal(keywords);
```

**Why Separate Indexes?**
- MySQL FULLTEXT requires all columns in query to match index definition
- Using OR operator with separate indexes provides more flexibility
- Better performance for mixed queries

### Sample Data Distribution

```
Total: 100 journals
├── Technology & CS:     25 journals (25%)
├── Health & Medicine:   25 journals (25%)
├── Education:           20 journals (20%)
├── Environment:         15 journals (15%)
└── Economics:           15 journals (15%)
```

## API Endpoints Specification

### 1. Search API

**Endpoint:** `POST /api/search`

**Request Body:**
```json
{
  "query": "machine learning",
  "page": 1,
  "limit": 20
}
```

**Response:**
```json
{
  "results": [
    {
      "id": 1,
      "title": "Advanced Machine Learning Techniques...",
      "authors": "Dr. John Doe, Dr. Jane Smith",
      "publication_date": "2023-05-15T00:00:00.000Z",
      "abstract": "This paper explores...",
      "keywords": "machine learning, AI, neural networks",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 20
}
```

**Search Algorithm:**
```javascript
// Tier 1: FULLTEXT Search
$querymode=natural language mode
MATCH(title) AGAINST('query') OR
MATCH(authors) AGAINST('query') OR
MATCH(keywords) AGAINST('query')

// Tier 2: LIKE Search (if Tier 1 returns 0)
WHERE title LIKE '%query%' OR
      authors LIKE '%query%' OR
      keywords LIKE '%query%'

// Tier 3: Fuzzy Matching (if Tier 2 returns 0)
levenshteinDistance(journal.title, query) <= threshold
similarity >= 0.5
```

**Performance:**
- Tier 1: ~5-20ms (FULLTEXT index)
- Tier 2: ~50-100ms (LIKE wildcard)
- Tier 3: ~200-500ms (full scan with algorithm)

### 2. Stats API

**Endpoint:** `GET /api/stats`

**Response:**
```json
{
  "total": 100,
  "categories": 5,
  "authors": 156,
  "recentJournals": [
    {
      "id": 95,
      "title": "Recent Research...",
      "publication_date": "2024-01-15"
    }
  ]
}
```

**Query Optimization:**
```sql
-- Total count (cached)
SELECT COUNT(*) FROM Journal;

-- Distinct categories (estimated)
SELECT COUNT(DISTINCT 
  CASE 
    WHEN keywords LIKE '%technology%' THEN 'tech'
    WHEN keywords LIKE '%health%' THEN 'health'
    ...
  END
) FROM Journal;

-- Recent journals (indexed)
SELECT * FROM Journal 
ORDER BY publication_date DESC 
LIMIT 5;
```

### 3. Journal Detail API

**Endpoint:** `GET /api/journals/[id]`

**Response:**
```json
{
  "id": 1,
  "title": "Advanced Machine Learning...",
  "authors": "Dr. John Doe, Dr. Jane Smith",
  "publication_date": "2023-05-15T00:00:00.000Z",
  "abstract": "Full abstract text here...",
  "keywords": "machine learning, AI, neural networks",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

**Error Handling:**
```json
{
  "error": "Journal not found",
  "status": 404
}
```

## String Matching Algorithm

### Levenshtein Distance Implementation

```javascript
function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null)
    .map(() => Array(n + 1).fill(0));

  // Initialize first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // deletion
          dp[i][j - 1] + 1,    // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return dp[m][n];
}
```

**Time Complexity:** O(m × n)
**Space Complexity:** O(m × n)

### Similarity Calculation

```javascript
function calculateSimilarity(str1, str2) {
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return 1 - (distance / maxLength);
}

// Example:
calculateSimilarity("machine", "machin")  // 0.857
calculateSimilarity("learning", "learing") // 0.875
```

**Threshold:** 
- Minimum similarity: 50% (0.5)
- Character tolerance: 2-3 characters

## Frontend Architecture

### Component Structure

```
app/
├── page.js (Homepage)
│   ├── useState: searchQuery, results, loading, error
│   ├── useEffect: fetchStats()
│   └── Functions:
│       ├── handleSearch()
│       ├── handlePageChange()
│       └── handleJournalClick()
│
├── journals/[id]/page.js (Detail Page)
│   ├── useState: journal, loading, error
│   ├── useEffect: fetchJournal(id)
│   ├── useRouter: navigation
│   └── handleBack()
│
└── layout.js (Root Layout)
    └── Metadata & Global Config
```

### State Management

**Homepage State:**
```javascript
const [searchQuery, setSearchQuery] = useState('')
const [results, setResults] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [searched, setSearched] = useState(false)
const [currentPage, setCurrentPage] = useState(1)
const [totalResults, setTotalResults] = useState(0)
const [stats, setStats] = useState({ 
  total: 100, 
  categories: 5, 
  authors: 0 
})
```

**Detail Page State:**
```javascript
const [journal, setJournal] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
```

### API Integration

```javascript
// Search API call
const response = await fetch('/api/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    query: searchQuery,
    page: currentPage,
    limit: 20
  }),
})

// Stats API call
const response = await fetch('/api/stats')

// Detail API call
const response = await fetch(`/api/journals/${id}`)
```

## CSS Architecture

### Design System

**Color Palette:**
```css
/* Primary Colors */
--blue-dark: #1e3c72;
--blue-primary: #2a5298;
--blue-medium: #3498db;
--blue-light: #5dade2;
--blue-lighter: #85c1e9;

/* Neutral Colors */
--white: #ffffff;
--gray-light: #f8f9fa;
--gray-medium: #5a7a99;
--gray-dark: #2c3e50;
```

**Gradients:**
```css
/* Background */
background: linear-gradient(
  135deg,
  #1e3c72 0%,
  #2a5298 25%,
  #3498db 50%,
  #5dade2 75%,
  #85c1e9 100%
);

/* Cards */
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
```

### Animation System

**Keyframes:**
```css
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}
```

**Performance:**
- GPU-accelerated: transform, opacity
- 60 FPS target
- Will-change optimization

### Responsive Breakpoints

```css
/* Mobile: < 768px */
@media (max-width: 768px) {
  .header h1 { font-size: 2rem; }
  .search-box { flex-direction: column; }
  .stat-card { min-width: 100%; }
  .detail-card { padding: 25px; }
}

/* Tablet: 768px - 1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  .container { max-width: 90%; }
}

/* Desktop: > 1024px */
@media (min-width: 1024px) {
  .container { max-width: 1200px; }
}
```

## Performance Optimization

### Database Optimization

1. **FULLTEXT Indexes**
   - Reduces search time from O(n) to O(log n)
   - IN BOOLEAN MODE for exact matches
   - IN NATURAL LANGUAGE MODE for relevance

2. **Query Optimization**
   ```sql
   -- Good: Uses index
   MATCH(title) AGAINST('query')
   
   -- Bad: Full table scan
   title LIKE '%query%'
   ```

3. **Connection Pooling**
   - Prisma handles connection pool
   - Max connections: 10 (default)
   - Connection timeout: 30s

### Frontend Optimization

1. **Code Splitting**
   - Next.js automatic code splitting
   - Route-based chunks
   - Dynamic imports for heavy components

2. **Lazy Loading**
   ```javascript
   // Images
   <Image loading="lazy" />
   
   // Components
   const HeavyComponent = dynamic(() => import('./Heavy'))
   ```

3. **Caching Strategy**
   - Stats API: Cache 5 minutes
   - Search results: No cache (dynamic)
   - Static assets: Long-term cache

### API Optimization

1. **Pagination**
   - Limit: 20 results per page
   - Offset calculation: (page - 1) * limit
   - Total count optimization

2. **Response Compression**
   - Next.js automatic gzip/brotli
   - JSON minification

3. **Error Handling**
   ```javascript
   try {
     // API logic
   } catch (error) {
     return NextResponse.json(
       { error: error.message },
       { status: 500 }
     )
   }
   ```

## Security Considerations

### Input Validation

```javascript
// Search query validation
if (!query || query.trim().length === 0) {
  return { error: 'Query is required' }
}

if (query.length > 200) {
  return { error: 'Query too long' }
}

// SQL Injection Prevention
// Prisma automatically escapes parameters
await prisma.journal.findMany({
  where: { title: { contains: query } } // Safe
})
```

### API Rate Limiting

```javascript
// TODO: Implement rate limiting
// Example: 100 requests per minute per IP
```

### Environment Variables

```env
# .env (never commit to git)
DATABASE_URL="mysql://user:pass@localhost:3306/db"

# .env.example (commit this)
DATABASE_URL="mysql://user:password@localhost:3306/journal_db"
```

## Deployment Guide

### Production Build

```bash
# Build
npm run build

# Start production server
npm start

# Or use PM2
pm2 start npm --name "journal-search" -- start
```

### Environment Variables (Production)

```env
DATABASE_URL="mysql://prod_user:strong_password@prod_host:3306/journal_db"
NODE_ENV="production"
```

### Database Migration (Production)

```bash
# Deploy migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### Performance Monitoring

```javascript
// Add timing headers
export async function GET(request) {
  const start = Date.now()
  
  // ... API logic
  
  const duration = Date.now() - start
  return new Response(json, {
    headers: {
      'X-Response-Time': `${duration}ms`
    }
  })
}
```

## Testing Strategy

### Unit Tests (TODO)

```javascript
// lib/__tests__/stringMatch.test.js
describe('levenshteinDistance', () => {
  it('should calculate correct distance', () => {
    expect(levenshteinDistance('cat', 'hat')).toBe(1)
    expect(levenshteinDistance('machine', 'machin')).toBe(1)
  })
})
```

### Integration Tests (TODO)

```javascript
// app/api/search/__tests__/route.test.js
describe('Search API', () => {
  it('should return results for valid query', async () => {
    const response = await POST({ 
      json: () => ({ query: 'test', page: 1, limit: 20 })
    })
    expect(response.status).toBe(200)
  })
})
```

### E2E Tests (TODO)

```javascript
// e2e/search.test.js (Playwright)
test('search flow', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.fill('input', 'machine learning')
  await page.click('button[type="submit"]')
  await expect(page.locator('.journal-card')).toHaveCount(20)
})
```

## Maintenance & Monitoring

### Logging

```javascript
// Add structured logging
console.log({
  timestamp: new Date().toISOString(),
  level: 'INFO',
  message: 'Search query executed',
  query: query,
  results: results.length,
  duration: duration
})
```

### Error Tracking

```javascript
// Catch and log errors
catch (error) {
  console.error({
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    message: error.message,
    stack: error.stack
  })
}
```

### Health Check Endpoint

```javascript
// app/api/health/route.js
export async function GET() {
  const dbStatus = await checkDatabase()
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus
  })
}
```

---

**Documentation Version:** 1.0.0  
**Last Updated:** 2026-01-17
