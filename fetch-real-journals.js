const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Fungsi untuk fetch jurnal dari arXiv API
async function fetchArxivPapers(searchQuery, maxResults = 20) {
  const baseUrl = 'http://export.arxiv.org/api/query'
  const params = new URLSearchParams({
    search_query: `all:${searchQuery}`,
    start: 0,
    max_results: maxResults,
    sortBy: 'relevance',
    sortOrder: 'descending'
  })

  try {
    const response = await fetch(`${baseUrl}?${params}`)
    const xmlText = await response.text()
    
    // Parse XML response
    const entries = []
    const entryMatches = xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g)
    
    for (const match of entryMatches) {
      const entry = match[1]
      
      // Extract title
      const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/)
      const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : ''
      
      // Extract authors
      const authorMatches = entry.matchAll(/<name>([\s\S]*?)<\/name>/g)
      const authors = Array.from(authorMatches, m => m[1].trim()).join(', ')
      
      // Extract abstract
      const abstractMatch = entry.match(/<summary>([\s\S]*?)<\/summary>/)
      const abstract = abstractMatch ? abstractMatch[1].trim().replace(/\s+/g, ' ') : ''
      
      // Extract published date
      const publishedMatch = entry.match(/<published>([\s\S]*?)<\/published>/)
      const publishedDate = publishedMatch ? new Date(publishedMatch[1].trim()) : new Date()
      
      // Extract PDF link
      const pdfLinkMatch = entry.match(/<link[^>]*title="pdf"[^>]*href="([^"]*)"/)
      const pdfUrl = pdfLinkMatch ? pdfLinkMatch[1] : ''
      
      // Extract categories/keywords
      const categoryMatches = entry.matchAll(/<category term="([^"]*)"\/>/g)
      const keywords = Array.from(categoryMatches, m => m[1]).join(', ')
      
      if (title && authors && pdfUrl) {
        entries.push({
          title,
          authors,
          publication_date: publishedDate,
          abstract: abstract.substring(0, 1000), // Limit abstract length
          keywords: keywords || 'computer science, research',
          pdf_url: pdfUrl
        })
      }
    }
    
    return entries
  } catch (error) {
    console.error(`Error fetching arXiv papers for "${searchQuery}":`, error.message)
    return []
  }
}

// Fungsi untuk fetch jurnal dari Semantic Scholar API
async function fetchSemanticScholarPapers(searchQuery, maxResults = 20) {
  const baseUrl = 'https://api.semanticscholar.org/graph/v1/paper/search'
  const params = new URLSearchParams({
    query: searchQuery,
    limit: maxResults,
    fields: 'title,authors,abstract,year,openAccessPdf,publicationDate'
  })

  try {
    const response = await fetch(`${baseUrl}?${params}`)
    const data = await response.json()
    
    if (!data.data) return []
    
    const entries = data.data
      .filter(paper => paper.openAccessPdf && paper.openAccessPdf.url)
      .map(paper => ({
        title: paper.title,
        authors: paper.authors?.map(a => a.name).join(', ') || 'Unknown',
        publication_date: paper.publicationDate ? new Date(paper.publicationDate) : new Date(`${paper.year}-01-01`),
        abstract: paper.abstract || 'No abstract available',
        keywords: searchQuery,
        pdf_url: paper.openAccessPdf.url
      }))
    
    return entries
  } catch (error) {
    console.error(`Error fetching Semantic Scholar papers for "${searchQuery}":`, error.message)
    return []
  }
}

async function main() {
  console.log('🔄 Fetching real journals from arXiv and Semantic Scholar...\n')

  // Topik-topik yang akan dicari
  const searchTopics = [
    'string matching algorithms',
    'pattern recognition computer science',
    'machine learning',
    'deep learning neural networks',
    'natural language processing',
    'computer vision',
    'data mining',
    'artificial intelligence',
    'algorithm optimization',
    'distributed systems',
    'cloud computing',
    'cybersecurity',
    'blockchain technology',
    'fuzzy logic systems',
    'quantum computing'
  ]

  // Hapus data lama
  await prisma.journal.deleteMany({})
  console.log('🗑️  Cleared existing journals\n')

  let totalJournals = 0

  // Fetch dari arXiv (lebih banyak karena lebih reliable)
  for (const topic of searchTopics) {
    console.log(`📚 Fetching from arXiv: "${topic}"...`)
    const papers = await fetchArxivPapers(topic, 15)
    
    for (const paper of papers) {
      try {
        await prisma.journal.create({ data: paper })
        totalJournals++
      } catch (error) {
        // Skip duplicate entries
        continue
      }
    }
    
    console.log(`   ✅ Added ${papers.length} papers`)
    
    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Fetch dari Semantic Scholar untuk topik spesifik
  const semanticTopics = [
    'string matching',
    'pattern matching algorithms',
    'machine learning applications',
    'deep learning models',
    'NLP transformers'
  ]

  console.log('\n📖 Fetching from Semantic Scholar...')
  for (const topic of semanticTopics) {
    console.log(`   Searching: "${topic}"...`)
    const papers = await fetchSemanticScholarPapers(topic, 10)
    
    for (const paper of papers) {
      try {
        await prisma.journal.create({ data: paper })
        totalJournals++
      } catch (error) {
        // Skip duplicate entries
        continue
      }
    }
    
    console.log(`   ✅ Added ${papers.length} papers`)
    
    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  // Verify total
  const count = await prisma.journal.count()
  
  console.log(`\n✨ Successfully fetched and stored ${count} real journals!`)
  console.log('📥 All journals have downloadable PDF links from arXiv and Semantic Scholar')
  
  // Show sample
  const sample = await prisma.journal.findMany({ take: 3 })
  console.log('\n📄 Sample journals:')
  sample.forEach((j, i) => {
    console.log(`\n${i + 1}. ${j.title}`)
    console.log(`   Authors: ${j.authors.substring(0, 60)}...`)
    console.log(`   PDF: ${j.pdf_url}`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
