'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function JournalDetail({ params }) {
  const [journal, setJournal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await fetch(`/api/journals/${params.id}`)
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error)
        }
        
        setJournal(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJournal()
  }, [params.id])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Memuat detail jurnal...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-page">
          <h1>❌ Error</h1>
          <p>{error}</p>
          <button onClick={() => router.back()} className="back-button">
            ← Kembali
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      
      <div className="container">
        <div className="detail-page">
          <button onClick={() => router.back()} className="back-button">
            ← Kembali ke Pencarian
          </button>
          
          <div className="detail-card">
            <div className="detail-header">
              <h1>{journal.title}</h1>
              <div className="detail-meta">
                <span className="meta-item">
                  👤 <strong>Penulis:</strong> {journal.authors}
                </span>
                <span className="meta-item">
                  📅 <strong>Tanggal Publikasi:</strong> {formatDate(journal.publication_date)}
                </span>
              </div>
            </div>

            {journal.keywords && (
              <div className="detail-keywords">
                <strong>🏷️ Kata Kunci:</strong>
                <div className="keywords-list">
                  {journal.keywords.split(',').map((keyword, idx) => (
                    <span key={idx} className="keyword-tag">
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {journal.abstract && (
              <div className="detail-abstract">
                <h2>📄 Abstrak</h2>
                <p>{journal.abstract}</p>
              </div>
            )}

            <div className="detail-footer">
              <p className="detail-id">ID Jurnal: #{journal.id}</p>
              <p className="detail-updated">
                Terakhir diperbarui: {formatDate(journal.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
