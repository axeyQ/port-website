import './globals.css';

export const metadata = {
  title: 'Creative Developer Portfolio',
  description: 'Interactive portfolio website built with Next.js, Three.js, and Tailwind CSS',
};

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