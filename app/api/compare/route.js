import prisma from '@/lib/db'
import { searchWithAllAlgorithms } from '@/lib/stringMatch'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Query pencarian tidak boleh kosong' },
        { status: 400 }
      )
    }

    // Fetch all journals from database
    const allJournals = await prisma.journal.findMany({
      select: {
        id: true,
        title: true,
        authors: true,
        publication_date: true,
        abstract: true,
        keywords: true,
        pdf_url: true
      }
    })

    // Convert BigInt to Number
    const journals = allJournals.map(journal => ({
      ...journal,
      id: Number(journal.id)
    }))

    // Perform search with all three algorithms
    const results = searchWithAllAlgorithms(journals, query)

    if (!results) {
      return NextResponse.json({
        query: query,
        bruteForce: { algorithm: 'Brute Force', matches: 0, comparisons: 0, executionTime: '0', journals: [] },
        kmp: { algorithm: 'KMP', matches: 0, comparisons: 0, executionTime: '0', journals: [] },
        boyerMoore: { algorithm: 'Boyer-Moore', matches: 0, comparisons: 0, executionTime: '0', journals: [] }
      })
    }

    // Determine the fastest and most efficient algorithm
    const algorithms = [
      { name: 'Brute Force', time: parseFloat(results.bruteForce.executionTime), comparisons: results.bruteForce.comparisons },
      { name: 'KMP', time: parseFloat(results.kmp.executionTime), comparisons: results.kmp.comparisons },
      { name: 'Boyer-Moore', time: parseFloat(results.boyerMoore.executionTime), comparisons: results.boyerMoore.comparisons }
    ]

    const fastest = algorithms.reduce((min, curr) => curr.time < min.time ? curr : min)
    const mostEfficient = algorithms.reduce((min, curr) => curr.comparisons < min.comparisons ? curr : min)

    return NextResponse.json({
      query: query,
      totalJournalsSearched: journals.length,
      bruteForce: results.bruteForce,
      kmp: results.kmp,
      boyerMoore: results.boyerMoore,
      comparison: {
        fastestAlgorithm: fastest.name,
        fastestTime: fastest.time.toFixed(4),
        mostEfficientAlgorithm: mostEfficient.name,
        leastComparisons: mostEfficient.comparisons,
        summary: `${fastest.name} adalah tercepat dengan ${fastest.time.toFixed(4)}ms. ${mostEfficient.name} paling efisien dengan ${mostEfficient.comparisons} perbandingan.`
      }
    })

  } catch (error) {
    console.error('Algorithm comparison error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membandingkan algoritma', details: error.message },
      { status: 500 }
    )
  }
}
