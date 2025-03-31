// This file generates a robots.txt file
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'], // Add any private routes here
      },
      sitemap: 'https://yourdomain.com/sitemap.xml', // Replace with your domain
    };
  }