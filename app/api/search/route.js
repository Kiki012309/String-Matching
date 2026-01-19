import prisma from '@/lib/db'
import { boyerMoore, bruteForce, kmp } from '@/lib/stringMatch'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { query, page = 1, limit = 20, algorithm = 'kmp' } = await request.json()

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Query pencarian tidak boleh kosong' },
        { status: 400 }
      )
    }

    const searchQuery = query.trim()
    const skip = (page - 1) * limit

    // Fetch all journals for algorithm-based search
    const allJournals = await prisma.journal.findMany()

    // Select algorithm
    let algorithmFunction
    let algorithmName
    switch (algorithm) {
      case 'naive':
        algorithmFunction = bruteForce
        algorithmName = 'Naive (Brute Force)'
        break
      case 'boyerMoore':
        algorithmFunction = boyerMoore
        algorithmName = 'Boyer-Moore'
        break
      case 'kmp':
      default:
        algorithmFunction = kmp
        algorithmName = 'KMP'
    }

    // Apply algorithm to find matches
    const startTime = performance.now()
    const matchedJournals = []
    let totalComparisons = 0

    for (const journal of allJournals) {
      const searchText = `${journal.title} ${journal.authors} ${journal.keywords || ''} ${journal.abstract || ''}`.toLowerCase()
      const result = algorithmFunction(searchText, searchQuery.toLowerCase())
      
      if (result.matches > 0) {
        matchedJournals.push({
          id: Number(journal.id),
          title: journal.title,
          authors: journal.authors,
          publication_date: journal.publication_date,
          abstract: journal.abstract,
          keywords: journal.keywords,
          pdf_url: journal.pdf_url,
          created_at: journal.created_at,
          updated_at: journal.updated_at,
          relevance: result.matches
        })
        totalComparisons += result.comparisons || 0
      }
    }

    const endTime = performance.now()
    const executionTime = (endTime - startTime).toFixed(2)

    // Sort by relevance
    matchedJournals.sort((a, b) => b.relevance - a.relevance)

    const total = matchedJournals.length
    const paginatedResults = matchedJournals.slice(skip, skip + limit)

    // Get time complexity
    const getComplexity = () => {
      switch (algorithm) {
        case 'naive':
          return 'O(n×m)'
        case 'kmp':
          return 'O(n+m)'
        case 'boyerMoore':
          return 'O(n/m) best case'
        default:
          return 'O(n+m)'
      }
    }

    return NextResponse.json({
      results: paginatedResults,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      algorithmStats: {
        algorithm: algorithmName,
        executionTime,
        comparisons: totalComparisons,
        timeComplexity: getComplexity()
      }
    })

  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mencari jurnal' },
      { status: 500 }
    )
  }
}
