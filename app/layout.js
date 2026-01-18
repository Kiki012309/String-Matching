import './globals.css'

export const metadata = {
  title: 'Pencarian Jurnal - String Matching',
  description: 'Website pencarian cepat judul jurnal menggunakan algoritma string matching',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
