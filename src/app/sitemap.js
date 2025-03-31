// This is a server component to generate a dynamic sitemap
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

export default function sitemap() {
    const baseUrl = 'https://yourdomain.com'; // Replace with your domain
    
    // Define static routes
    const routes = [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];
    
    // For a real project, you might want to add dynamic routes
    // from a CMS or database here
    
    return routes;
  }