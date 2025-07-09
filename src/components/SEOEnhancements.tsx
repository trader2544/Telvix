
import { useEffect } from 'react';

interface SEOEnhancementsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

const SEOEnhancements = ({
  title = 'Telvix - Professional Web Development Services',
  description = 'Expert web development, mobile apps, and digital solutions. Transform your business with cutting-edge technology and innovative design.',
  keywords = ['web development', 'mobile apps', 'digital solutions', 'React', 'TypeScript', 'Node.js'],
  image = 'https://telvix.app/og-image.jpg',
  url = 'https://telvix.app',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Telvix Team'
}: SEOEnhancementsProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Create or update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', author);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Telvix', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:site', '@telvix_dev');
    updateMetaTag('twitter:creator', '@telvix_dev');

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, true);
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, true);
      }
      updateMetaTag('article:author', author, true);
      updateMetaTag('article:section', 'Technology', true);
      keywords.forEach(keyword => {
        const tagElement = document.createElement('meta');
        tagElement.setAttribute('property', 'article:tag');
        tagElement.setAttribute('content', keyword);
        document.head.appendChild(tagElement);
      });
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

    // JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? "BlogPosting" : "WebSite",
      "name": title,
      "headline": title,
      "description": description,
      "image": image,
      "url": url,
      "author": {
        "@type": "Organization",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Telvix",
        "logo": {
          "@type": "ImageObject",
          "url": "https://telvix.app/favicon.ico"
        }
      }
    };

    if (type === 'article' && publishedTime) {
      Object.assign(structuredData, {
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        }
      });
    }

    // Add or update JSON-LD script
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type, publishedTime, modifiedTime, author]);

  return null;
};

export default SEOEnhancements;
