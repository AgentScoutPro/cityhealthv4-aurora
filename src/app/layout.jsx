import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300','400','500','600','700'],
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300','400','500','600','700'],
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400','500','600'],
  display: 'swap',
})

export const metadata = {
  title: 'City Health Chiropractic — Where Pain Ends and Performance Begins',
  description: 'East Valley\'s premier chiropractic clinic. Precision spinal adjustments, decompression therapy, physiotherapy, and sports injury care in Mesa & Gilbert, AZ.',
  keywords: 'chiropractor mesa az, spinal decompression, sports injury, back pain relief, chiropractic gilbert az',
  openGraph: {
    title: 'City Health Chiropractic',
    description: 'Precision care. Measurable results. East Valley\'s premier chiropractic clinic.',
    type: 'website',
    url: 'https://cityhealthaz.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
