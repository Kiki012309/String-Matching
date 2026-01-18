import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request, { params }) {
  try {
    const id = Number(params.id)
    
    const journal = await prisma.journal.findUnique({
      where: { id }
    })

    if (!journal) {
      return NextResponse.json(
        { error: 'Jurnal tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...journal,
      id: Number(journal.id)
    })
  } catch (error) {
    console.error('Journal detail error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data jurnal' },
      { status: 500 }
    )
  }
}
