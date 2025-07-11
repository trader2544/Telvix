
import { Helmet } from 'react-helmet-async';

interface SEOEnhancementsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEOEnhancements = ({
  title = "Telvix - Premier Digital Agency | Web Design, AI & SaaS Solutions",
  description = "Transform your business with Telvix's cutting-edge web design, AI automation, SaaS development, and mobile app solutions. Get your free consultation today!",
  keywords = "web design, digital agency, AI automation, SaaS development, mobile apps, digital transformation, web development, UI/UX design",
  image = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
  url = "https://telvix.com",
  type = "website",
  author = "Telvix Team",
  publishedTime,
  modifiedTime,
  section = "Technology",
  tags = []
}: SEOEnhancementsProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        "name": "Telvix",
        "url": url,
        "logo": {
          "@type": "ImageObject",
          "url": `${url}/lovable-uploads/93789e97-518e-4b25-a28f-bb7947f42d2c.png`,
          "width": 200,
          "height": 200
        },
        "description": description,
        "foundingDate": "2020",
        "sameAs": [
          "https://linkedin.com/company/telvix",
          "https://twitter.com/telvix",
          "https://facebook.com/telvix"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-555-0123",
          "contactType": "customer service",
          "availableLanguage": "English"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US",
          "addressRegion": "CA"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        "url": url,
        "name": "Telvix",
        "description": description,
        "publisher": {
          "@id": `${url}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        "url": url,
        "name": title,
        "description": description,
        "isPartOf": {
          "@id": `${url}/#website`
        },
        "about": {
          "@id": `${url}/#organization`
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || new Date().toISOString(),
        "breadcrumb": {
          "@id": `${url}/#breadcrumb`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Service",
        "@id": `${url}/#services`,
        "name": "Digital Agency Services",
        "description": "Comprehensive digital solutions including web design, AI automation, SaaS development, and mobile applications",
        "provider": {
          "@id": `${url}/#organization`
        },
        "serviceType": [
          "Web Design",
          "AI Automation",
          "SaaS Development",
          "Mobile App Development",
          "Digital Transformation",
          "UI/UX Design"
        ],
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Web Design & Development"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "AI Automation Solutions"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "SaaS Development"
              }
            }
          ]
        }
      }
    ]
  };

  // Generate FAQ structured data
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does Telvix offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Telvix offers comprehensive digital solutions including web design, AI automation, SaaS development, mobile app development, and digital transformation services."
        }
      },
      {
        "@type": "Question", 
        "name": "How can I get a quote for my project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can get a free quote by clicking the 'Get Free Quote' button on our website or contacting us directly through our contact form."
        }
      },
      {
        "@type": "Question",
        "name": "Does Telvix work with international clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Telvix serves clients worldwide and provides 24/7 support to ensure seamless collaboration across different time zones."
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Telvix" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@telvix" />
      <meta name="twitter:creator" content="@telvix" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#14b8a6" />
      <meta name="msapplication-TileColor" content="#14b8a6" />
      <link rel="canonical" href={url} />
      
      {/* Article specific tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {author && <meta property="article:author" content={author} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* FAQ Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
      </script>
    </Helmet>
  );
};

export default SEOEnhancements;
