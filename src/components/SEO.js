// Component for handling SEO metadata with Open Graph and structured data
// This is a server component that can be imported in layout.js

export default function SEO({
    title = 'Creative Developer Portfolio',
    description = 'Interactive portfolio website showcasing creative web development with Next.js, Three.js, and Tailwind CSS',
    canonical = 'https://yourdomain.com',
    openGraph = {},
    twitter = {},
    keywords = [],
    author = 'Your Name',
    structuredData = {},
  }) {
    // Combine default and provided Open Graph data
    const defaultOpenGraph = {
      title: title,
      description: description,
      url: canonical,
      type: 'website',
      images: [
        {
          url: `${canonical}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...openGraph,
    };
  
    // Combine default and provided Twitter data
    const defaultTwitter = {
      card: 'summary_large_image',
      site: '@yourusername',
      title: title,
      description: description,
      image: `${canonical}/twitter-image.jpg`,
      ...twitter,
    };
  
    // Default structured data for a personal website/portfolio
    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: author,
        url: canonical,
        jobTitle: 'Web Developer',
        ...structuredData.person,
      },
      ...structuredData,
    };
  
    // Return metadata object for Next.js
    return {
      // Basic metadata
      title,
      description,
      keywords: keywords.join(', '),
      authors: [{ name: author }],
      
      // Verification for search consoles
      verification: {
        google: 'google-site-verification-code',
        // Add other verification codes as needed
      },
      
      // Canonicals
      alternates: {
        canonical: canonical,
      },
      
      // Open Graph metadata
      openGraph: defaultOpenGraph,
      
      // Twitter metadata
      twitter: defaultTwitter,
      
      // Other metadata
      robots: {
        index: true,
        follow: true,
      },
      
      // Additional metadata
      icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
      },
      
      // Structured data for SEO
      // Note: This needs to be manually added to the layout
      structuredData: JSON.stringify(defaultStructuredData),
    };
  }