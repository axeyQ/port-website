// src/app/layout.js - No 'use client' directive for metadata exports
import './globals.css';
import { Analytics } from "@vercel/analytics/react"
export const metadata = {
  title: 'axeyQ | Creative Developer Portfolio',
  description: 'Interactive portfolio website of Rakshit Singh Thakur, a frontend engineer specializing in React.js, Next.js, and modern web technologies.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { 
      url: '/favicon/apple-touch-icon.png'
    },
    other: [
      { 
        rel: 'manifest', 
        url: '/favicon/site.webmanifest' 
      }
    ]
  },
  themeColor: '#0ea5e9'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="absolute left-0 top-0 p-3 bg-sky-600 text-white transform -translate-y-full focus:translate-y-0 z-50 transition-transform focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        {/* Main content */}
        <main id="main-content" tabIndex="-1">
          {children}
        </main>
      </body>
    </html>
  );
}