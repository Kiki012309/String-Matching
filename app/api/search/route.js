import prisma from '@/lib/db'
import { calculateSimilarity } from '@/lib/stringMatch'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { query, page = 1, limit = 20 } = await request.json()

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Query pencarian tidak boleh kosong' },
        { status: 400 }
      )
    }

    const searchQuery = query.trim()
    const skip = (page - 1) * limit

    // First, try FULLTEXT search for better performance
    const results = await prisma.$queryRaw`
      SELECT * FROM journals
      WHERE MATCH(title) AGAINST(${searchQuery} IN BOOLEAN MODE)
         OR MATCH(authors) AGAINST(${searchQuery} IN BOOLEAN MODE)
         OR MATCH(keywords) AGAINST(${searchQuery} IN BOOLEAN MODE)
      ORDER BY 
        CASE 
          WHEN LOWER(title) LIKE LOWER(CONCAT('%', ${searchQuery}, '%')) THEN 1
          WHEN LOWER(authors) LIKE LOWER(CONCAT('%', ${searchQuery}, '%')) THEN 2
          WHEN LOWER(keywords) LIKE LOWER(CONCAT('%', ${searchQuery}, '%')) THEN 3
          ELSE 4
        END,
        publication_date DESC
      LIMIT ${limit} OFFSET ${skip}
    `

    const totalCount = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM journals
      WHERE MATCH(title) AGAINST(${searchQuery} IN BOOLEAN MODE)
         OR MATCH(authors) AGAINST(${searchQuery} IN BOOLEAN MODE)
         OR MATCH(keywords) AGAINST(${searchQuery} IN BOOLEAN MODE)
    `

    let total = Number(totalCount[0].count)
    let finalResults = results

    // If no results from FULLTEXT, fall back to LIKE search
    if (results.length === 0) {
      const likeResults = await prisma.journal.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery } },
            { authors: { contains: searchQuery } },
            { keywords: { contains: searchQuery } },
          ],
        },
        orderBy: { publication_date: 'desc' },
        skip: skip,
        take: limit,
      })

      const likeTotal = await prisma.journal.count({
        where: {
          OR: [
            { title: { contains: searchQuery } },
            { authors: { contains: searchQuery } },
            { keywords: { contains: searchQuery } },
          ],
        },
      })

      finalResults = likeResults
      total = likeTotal
    }

    // If still no results, try fuzzy matching on all records (limited)
    if (finalResults.length === 0) {
      const allJournals = await prisma.journal.findMany({
        take: 500, // Limit to avoid performance issues
      })

      const fuzzyMatches = allJournals
        .map(journal => ({
          ...journal,
          similarity: Math.max(
            calculateSimilarity(searchQuery, journal.title),
            calculateSimilarity(searchQuery, journal.authors),
            calculateSimilarity(searchQuery, journal.keywords || '')
          )
        }))
        .filter(journal => journal.similarity > 0.5) // Only keep matches with >50% similarity
        .sort((a, b) => b.similarity - a.similarity)

      total = fuzzyMatches.length
      finalResults = fuzzyMatches.slice(skip, skip + limit)
    }

    // Convert BigInt to Number for JSON serialization
    const serializedResults = finalResults.map(journal => ({
      id: Number(journal.id),
      title: journal.title,
      authors: journal.authors,
      publication_date: journal.publication_date,
      abstract: journal.abstract,
      keywords: journal.keywords,
      created_at: journal.created_at,
      updated_at: journal.updated_at,
    }))

    return NextResponse.json({
      results: serializedResults,
      total: total,
      page: page,
      totalPages: Math.ceil(total / limit),
    })

  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat melakukan pencarian' },
      { status: 500 }
    )
  }
}
