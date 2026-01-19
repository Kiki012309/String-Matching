'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [stats, setStats] = useState({ total: 100, categories: 5, authors: 0 })
  const [algorithm, setAlgorithm] = useState('kmp') // naive, kmp, boyerMoore
  const [algorithmStats, setAlgorithmStats] = useState(null)
  const resultsPerPage = 20
  const router = useRouter()

  // Fetch statistics on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        setStats(data)
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      }
    }
    fetchStats()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      return
    }

    setLoading(true)
    setError(null)
    setSearched(true)
    setCurrentPage(1)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: searchQuery,
          page: 1,
          limit: resultsPerPage,
          algorithm: algorithm
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mencari')
      }

      setResults(data.results)
      setTotalResults(data.total)
      setAlgorithmStats(data.algorithmStats)
    } catch (err) {
      setError(err.message)
      setResults([])
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = async (newPage) => {
    setLoading(true)
    setCurrentPage(newPage)

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: searchQuery,
          page: newPage,
          limit: resultsPerPage,
          algorithm: algorithm
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mencari')
      }

      setResults(data.results)
      setTotalResults(data.total)
      setAlgorithmStats(data.algorithmStats)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(totalResults / resultsPerPage)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  const handleJournalClick = (id) => {
    router.push(`/journals/${id}`)
  }

  return (
    <>
      {/* Floating background shapes */}
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      
      <div className="container">
        <div className="header">
          <h1>🔍 Pencarian Jurnal Ilmiah</h1>
          <p>Temukan jurnal dengan cepat menggunakan algoritma String Matching</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px', flexWrap: 'wrap' }}>
            <a 
              href="/compare" 
              className="header-badge"
              style={{ 
                textDecoration: 'none', 
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            >
              📊 Bandingkan Algoritma
            </a>
            <a 
              href="https://scholar.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="header-badge"
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              ✨ Cari di Google Scholar →
            </a>
          </div>

          {/* Statistics Cards */}
          <div className="stats-section">
            <div className="stat-card">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Jurnal</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{searched ? totalResults : '-'}</span>
              <span className="stat-label">Hasil Ditemukan</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.categories}</span>
              <span className="stat-label">Kategori</span>
            </div>
          </div>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch}>
            <div className="search-box" style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                disabled={loading}
                style={{
                  padding: '15px',
                  borderRadius: '12px',
                  border: '2px solid #ddd',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'white',
                  cursor: 'pointer',
                  minWidth: '200px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="naive">🔨 Naive (Brute Force)</option>
                <option value="kmp">🎯 KMP</option>
                <option value="boyerMoore">🚀 Boyer-Moore</option>
              </select>
              
              <input
                type="text"
                className="search-input"
                placeholder="Masukkan judul, penulis, atau kata kunci jurnal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={loading}
                style={{ flex: 1, minWidth: '300px' }}
              />
              
              <button 
                type="submit" 
                className="search-button"
                disabled={loading || !searchQuery.trim()}
              >
                <span>{loading ? '🔄 Mencari...' : '🔎 Cari Jurnal'}</span>
              </button>
            </div>
            <p className="search-info" style={{ marginTop: '15px' }}>
              💡 <strong>Tips:</strong> Pilih algoritma dan masukkan kata kunci seperti machine learning, BERT, transformer, atau nama penulis
            </p>
          </form>
        </div>

        {searched && (
          <div className="results-section">
            {error && (
              <div className="error">
                ❌ {error}
              </div>
            )}

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p><strong>Sedang mencari jurnal...</strong></p>
                <p style={{fontSize: '0.9rem', color: '#5a7a99', marginTop: '10px'}}>
                  Menggunakan algoritma {algorithm === 'naive' ? 'Naive (Brute Force)' : algorithm === 'kmp' ? 'KMP' : 'Boyer-Moore'}
                </p>
              </div>
            ) : (
              <>
                <div className="results-header">
                  <h2>📚 Hasil Pencarian</h2>
                  <p className="results-count">
                    Ditemukan <strong>{totalResults}</strong> jurnal {searchQuery && `untuk "${searchQuery}"`}
                  </p>
                  {algorithmStats && (
                    <div style={{
                      marginTop: '15px',
                      padding: '15px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '8px',
                      color: 'white'
                    }}>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>⚡ Algoritma:</strong> {algorithmStats.algorithm}
                      </p>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>⏱️ Waktu Eksekusi:</strong> {algorithmStats.executionTime} ms
                      </p>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>🔢 Perbandingan:</strong> {algorithmStats.comparisons?.toLocaleString() || 0}
                      </p>
                      <p>
                        <strong>📊 Kompleksitas:</strong> {algorithmStats.timeComplexity}
                      </p>
                    </div>
                  )}
                </div>

                {totalResults === 0 ? (
                  <div className="no-results">
                    <p>🔍 Tidak ada jurnal yang ditemukan</p>
                    <p>Coba gunakan kata kunci yang berbeda atau lebih spesifik</p>
                  </div>
                ) : (
                  <>
                    <div className="journal-list">
                      {results.map((journal, index) => (
                        <div 
                          key={journal.id} 
                          className="journal-card"
                          onClick={() => handleJournalClick(journal.id)}
                          style={{
                            animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
                            cursor: 'pointer'
                          }}
                        >
                          <h3 className="journal-title">📄 {journal.title}</h3>
                          <p className="journal-authors">
                            👤 <strong>Penulis:</strong> {journal.authors}
                          </p>
                          <div className="journal-meta">
                            <span className="journal-date">
                              📅 {formatDate(journal.publication_date)}
                            </span>
                          </div>
                          {journal.keywords && (
                            <div className="journal-keywords">
                              {journal.keywords.split(',').map((keyword, idx) => (
                                <span key={idx} className="keyword-tag">
                                  🏷️ {keyword.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                          {journal.abstract && (
                            <p className="journal-abstract">
                              <strong>Abstract:</strong> {journal.abstract.substring(0, 200)}...
                            </p>
                          )}
                          <div className="read-more">
                            Klik untuk melihat detail →
                          </div>
                        </div>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="pagination">
                        <button
                          className="pagination-button"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          ← Sebelumnya
                        </button>
                        
                        <span className="pagination-info">
                          Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
                        </span>

                        <button
                          className="pagination-button"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Selanjutnya →
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>📚 Tentang Sistem</h3>
              <p>Website pencarian jurnal ilmiah dengan teknologi string matching untuk hasil pencarian yang akurat dan cepat.</p>
              <a 
                href="https://scholar.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#5dade2', textDecoration: 'none', display: 'block', marginTop: '10px' }}
              >
                → Cari di Google Scholar
              </a>
            </div>
            <div className="footer-section">
              <h3>⚙️ Teknologi</h3>
              <ul>
                <li>Next.js & React</li>
                <li>MySQL Database</li>
                <li>String Matching Algorithms:</li>
                <li>• Naive (Brute Force)</li>
                <li>• KMP (Knuth-Morris-Pratt)</li>
                <li>• Boyer-Moore</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>🔗 Sumber Jurnal</h3>
              <ul>
                <li>
                  <a 
                    href="https://scholar.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Google Scholar
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.semanticscholar.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Semantic Scholar
                  </a>
                </li>
                <li>
                  <a 
                    href="https://arxiv.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    arXiv.org
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Website Pencarian Jurnal | Rezky Amaliah Rusli & Musdalipa ❤️</p>
          </div>
        </footer>
      </div>
    </>
  )
}
