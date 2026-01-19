'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AlgorithmComparison() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('bruteForce')
  const router = useRouter()

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      setError('Masukkan kata kunci pencarian')
      return
    }

    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan')
      }

      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleJournalClick = (id) => {
    router.push(`/journals/${id}`)
  }

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div className="header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>🔬 Perbandingan Algoritma String Matching</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '10px' }}>
          Bandingkan performa 3 algoritma: Brute Force, KMP, dan Boyer-Moore
        </p>
      </div>

      {/* Search Box */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        borderRadius: '15px',
        marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
      }}>
        <form onSubmit={handleSearch}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Masukkan kata kunci untuk dibandingkan (contoh: machine learning, BERT, ResNet)..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '18px 24px',
                fontSize: '1.1rem',
                border: '3px solid white',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            <button 
              type="submit"
              disabled={loading || !searchQuery.trim()}
              style={{
                padding: '18px 40px',
                fontSize: '1.1rem',
                fontWeight: '600',
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: (loading || !searchQuery.trim()) ? 0.6 : 1
              }}
            >
              {loading ? '⏳ Membandingkan...' : '🚀 Bandingkan'}
            </button>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#991b1b',
          padding: '15px 20px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #fecaca'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto 20px',
            border: '6px solid #e0e7ff',
            borderTop: '6px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }}></div>
          <h3>Sedang membandingkan algoritma...</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Brute Force, KMP, dan Boyer-Moore sedang mencari pattern...
          </p>
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <>
          {/* Comparison Summary */}
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '30px',
            boxShadow: '0 8px 20px rgba(245, 87, 108, 0.3)'
          }}>
            <h2 style={{ marginBottom: '15px' }}>📊 Ringkasan Perbandingan</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
              <strong>Query:</strong> "{results.query}"
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
              <strong>Total Jurnal Dicari:</strong> {results.totalJournalsSearched} jurnal
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
              <strong>🏆 Tercepat:</strong> {results.comparison.fastestAlgorithm} ({results.comparison.fastestTime} ms)
            </p>
            <p style={{ fontSize: '1.1rem' }}>
              <strong>⚡ Paling Efisien:</strong> {results.comparison.mostEfficientAlgorithm} ({results.comparison.leastComparisons.toLocaleString()} perbandingan)
            </p>
          </div>

          {/* Algorithm Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* Brute Force */}
            <div style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              padding: '25px',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 8px 16px rgba(250, 112, 154, 0.3)',
              cursor: 'pointer',
              transform: activeTab === 'bruteForce' ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }} onClick={() => setActiveTab('bruteForce')}>
              <h3 style={{ marginBottom: '15px' }}>🔨 Brute Force</h3>
              <p><strong>Hasil:</strong> {results.bruteForce.matches} jurnal</p>
              <p><strong>Waktu:</strong> {results.bruteForce.executionTime} ms</p>
              <p><strong>Perbandingan:</strong> {results.bruteForce.comparisons.toLocaleString()}</p>
              <p><strong>Kompleksitas:</strong> {results.bruteForce.timeComplexity}</p>
            </div>

            {/* KMP */}
            <div style={{
              background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
              padding: '25px',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 8px 16px rgba(48, 207, 208, 0.3)',
              cursor: 'pointer',
              transform: activeTab === 'kmp' ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }} onClick={() => setActiveTab('kmp')}>
              <h3 style={{ marginBottom: '15px' }}>🎯 KMP</h3>
              <p><strong>Hasil:</strong> {results.kmp.matches} jurnal</p>
              <p><strong>Waktu:</strong> {results.kmp.executionTime} ms</p>
              <p><strong>Perbandingan:</strong> {results.kmp.comparisons.toLocaleString()}</p>
              <p><strong>Kompleksitas:</strong> {results.kmp.timeComplexity}</p>
            </div>

            {/* Boyer-Moore */}
            <div style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              padding: '25px',
              borderRadius: '12px',
              color: '#333',
              boxShadow: '0 8px 16px rgba(168, 237, 234, 0.3)',
              cursor: 'pointer',
              transform: activeTab === 'boyerMoore' ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }} onClick={() => setActiveTab('boyerMoore')}>
              <h3 style={{ marginBottom: '15px' }}>🚀 Boyer-Moore</h3>
              <p><strong>Hasil:</strong> {results.boyerMoore.matches} jurnal</p>
              <p><strong>Waktu:</strong> {results.boyerMoore.executionTime} ms</p>
              <p><strong>Perbandingan:</strong> {results.boyerMoore.comparisons.toLocaleString()}</p>
              <p><strong>Kompleksitas:</strong> {results.boyerMoore.timeComplexity}</p>
            </div>
          </div>

          {/* Journal Results for Active Algorithm */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>
              📚 Hasil {results[activeTab].algorithm}: {results[activeTab].matches} Jurnal
            </h2>

            {results[activeTab].journals.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                Tidak ada jurnal yang ditemukan dengan algoritma ini
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {results[activeTab].journals.slice(0, 10).map((journal, index) => (
                  <div 
                    key={journal.id}
                    onClick={() => handleJournalClick(journal.id)}
                    style={{
                      padding: '20px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '2px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e9ecef'
                      e.currentTarget.style.borderColor = '#667eea'
                      e.currentTarget.style.transform = 'translateX(5px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8f9fa'
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <h3 style={{ color: '#667eea', marginBottom: '10px' }}>
                      {index + 1}. {journal.title}
                    </h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '8px' }}>
                      👤 {journal.authors}
                    </p>
                    <p style={{ color: '#888', fontSize: '0.85rem' }}>
                      📅 {formatDate(journal.publication_date)}
                    </p>
                    {journal.keywords && (
                      <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {journal.keywords.split(',').slice(0, 3).map((keyword, i) => (
                          <span key={i} style={{
                            background: '#e0e7ff',
                            color: '#667eea',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {keyword.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
