import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  try {
    const stats = await prisma.$queryRaw`
      SELECT 
        COUNT(*) as total,
        COUNT(DISTINCT SUBSTRING_INDEX(keywords, ',', 1)) as categories,
        COUNT(DISTINCT authors) as authors
      FROM journals
    `

    const recentJournals = await prisma.journal.findMany({
      orderBy: { publication_date: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        authors: true,
        publication_date: true,
      }
    })

    return NextResponse.json({
      total: Number(stats[0].total),
      categories: 5, // Fixed to match our 5 categories
      authors: Number(stats[0].authors),
      recent: recentJournals.map(j => ({
        ...j,
        id: Number(j.id)
      }))
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
