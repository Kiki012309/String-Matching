const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Daftar URL PDF yang valid (sample URLs dari berbagai sumber)
const pdfUrls = [
  "https://arxiv.org/pdf/2404.01234.pdf",
  "https://arxiv.org/pdf/2403.19876.pdf",
  "https://arxiv.org/pdf/2402.13579.pdf",
  "https://arxiv.org/pdf/2401.24680.pdf",
  "https://arxiv.org/pdf/2312.98765.pdf",
  "https://scholar.google.com/scholar_files/journal1.pdf",
  "https://researchgate.net/publication/123456789",
  "https://doi.org/10.1145/3606362",
  "https://ieeexplore.ieee.org/iel7/9876543",
  "https://dl.acm.org/doi/pdf/10.1145/3595066",
  "https://springer.com/content/pdf/sample.pdf",
  "https://sciencedirect.com/science/article/pii/S1047320313000849",
  "https://www.ijcai.org/papers/15-sample.pdf",
  "https://nips.cc/papers/16-sample.pdf",
  "https://icml.cc/papers/17-sample.pdf",
  "https://openreview.net/pdf?id=sample",
  "https://jmlr.org/papers/volume1/sample.pdf",
  "https://mlr.press/papers/v24/sample.pdf",
]

async function updatePdfUrls() {
  try {
    console.log('🔄 Updating PDF URLs for all journals...')
    
    // Get all journals
    const journals = await prisma.journal.findMany()
    console.log(`📊 Found ${journals.length} journals`)
    
    // Update each journal with a PDF URL
    for (let i = 0; i < journals.length; i++) {
      const journal = journals[i]
      const pdfUrl = pdfUrls[i % pdfUrls.length]
      
      await prisma.journal.update({
        where: { id: journal.id },
        data: { pdf_url: pdfUrl }
      })
    }
    
    console.log(`✅ Successfully updated ${journals.length} journals with PDF URLs`)
    
    // Verify
    const updated = await prisma.journal.findMany({
      where: { pdf_url: { not: null } }
    })
    console.log(`📥 Verified: ${updated.length} journals have PDF URLs`)
    
  } catch (error) {
    console.error('❌ Error updating PDF URLs:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

updatePdfUrls()
