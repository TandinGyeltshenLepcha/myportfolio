import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MusicProvider } from '@/components/music-provider'
import { GoogleAnalytics } from '@/components/google-analytics'
import { AriaAnnouncerProvider } from '@/components/aria-announcer'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tandin Gyeltshen Lepcha | Game UI Designer',
  description: 'I solve UI production redundancy in AAA studios by building scalable, production-ready component systems. Game UI that feels tactile and alive.',
  generator: 'v0.app',
  keywords: ['Game UI', 'UI Designer', 'Game Design', 'HUD Systems', 'Component Systems', 'Tandin Gyeltshen Lepcha'],
  authors: [{ name: 'Tandin Gyeltshen Lepcha' }],
  creator: 'Tandin Gyeltshen Lepcha',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Tandin Gyeltshen Lepcha | Game UI Designer',
    description: 'I solve UI production redundancy in AAA studios by building scalable, production-ready component systems.',
    siteName: 'Tandin Gyeltshen Lepcha Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tandin Gyeltshen Lepcha | Game UI Designer',
    description: 'Game UI that feels tactile and alive.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E89820' },
    { media: '(prefers-color-scheme: dark)', color: '#1a0800' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wozt03c8of");`
          }}
        />
      </head>
      <body className="font-sans antialiased ruled">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <AriaAnnouncerProvider>
          <MusicProvider>
            <main id="main-content" role="main" tabIndex={-1}>
              {children}
            </main>
          </MusicProvider>
        </AriaAnnouncerProvider>
        <GoogleAnalytics />
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
