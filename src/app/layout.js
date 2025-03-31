import './globals.css';

export const metadata = {
  title: 'Interactive Portfolio',
  description: 'Interactive portfolio website built with Next.js, Three.js, and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}