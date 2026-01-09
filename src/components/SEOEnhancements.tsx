
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
  title = "Telvix - Premier Digital Agency in Kenya | Web Design, AI & SaaS Solutions",
  description = "Transform your business with Telvix's cutting-edge web design, AI automation, SaaS development, and mobile app solutions. Trusted by businesses in Kenya, Africa & worldwide. Get your free consultation today!",
  keywords = "web design Kenya, digital agency Nairobi, AI automation Africa, SaaS development Kenya, mobile apps Kenya, digital transformation, web development Nairobi, UI/UX design Kenya, e-commerce solutions Africa, software development Kenya, best web developers Kenya, affordable website design Nairobi",
  image = "https://telvix.tech/lovable-uploads/93789e97-518e-4b25-a28f-bb7947f42d2c.png",
  url = "https://telvix.tech",
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
        "alternateName": "Telvix Digital Solutions",
        "url": url,
        "logo": {
          "@type": "ImageObject",
          "url": `${url}/lovable-uploads/93789e97-518e-4b25-a28f-bb7947f42d2c.png`,
          "width": 200,
          "height": 200
        },
        "description": "Premier digital agency in Kenya offering web design, AI automation, SaaS development, and mobile app solutions.",
        "foundingDate": "2020",
        "areaServed": [
          {
            "@type": "Country",
            "name": "Kenya"
          },
          {
            "@type": "Country", 
            "name": "Nigeria"
          },
          {
            "@type": "Continent",
            "name": "Africa"
          },
          "Worldwide"
        ],
        "sameAs": [
          "https://linkedin.com/company/telvix",
          "https://twitter.com/telvix",
          "https://facebook.com/telvix",
          "https://instagram.com/telvix"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+254741947599",
            "contactType": "customer service",
            "email": "telvixhr@outlook.com",
            "availableLanguage": ["English", "Swahili"],
            "areaServed": ["KE", "NG", "AF"]
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "KE",
          "addressRegion": "Nairobi"
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
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "LocalBusiness",
        "@id": `${url}/#localbusiness`,
        "name": "Telvix Digital Solutions",
        "image": image,
        "url": url,
        "telephone": "+254741947599",
        "email": "telvixhr@outlook.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressCountry": "Kenya"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -1.286389,
          "longitude": 36.817223
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        "priceRange": "$$"
      },
      {
        "@type": "Service",
        "@id": `${url}/#services`,
        "name": "Digital Agency Services",
        "description": "Comprehensive digital solutions including web design, AI automation, SaaS development, and mobile applications for businesses in Kenya, Africa, and worldwide.",
        "provider": {
          "@id": `${url}/#organization`
        },
        "serviceType": [
          "Web Design",
          "Web Development",
          "AI Automation",
          "SaaS Development",
          "Mobile App Development",
          "E-commerce Solutions",
          "Digital Marketing",
          "SEO Services",
          "UI/UX Design"
        ],
        "areaServed": ["Kenya", "Nigeria", "Africa", "Worldwide"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Web Design & Development",
                "description": "Custom responsive websites built with React, Next.js, and modern frameworks"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "AI Automation Solutions",
                "description": "Custom AI chatbots, workflow automation, and intelligent business solutions"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "SaaS Development",
                "description": "Scalable Software-as-a-Service platforms with modern architecture"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Mobile App Development",
                "description": "iOS and Android apps with React Native and Flutter"
              }
            }
          ]
        }
      }
    ]
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does Telvix offer in Kenya?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Telvix offers comprehensive digital solutions including web design, AI automation, SaaS development, mobile app development, e-commerce solutions, and digital marketing services for businesses in Kenya and worldwide."
        }
      },
      {
        "@type": "Question", 
        "name": "How can I get a quote for my project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can get a free quote by clicking the 'Get Free Quote' button on our website, using our interactive cost calculator, or contacting us directly at telvixhr@outlook.com or +254741947599."
        }
      },
      {
        "@type": "Question",
        "name": "Does Telvix work with international clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Telvix serves clients in Kenya, Nigeria, across Africa, and worldwide. We provide remote services and support to ensure seamless collaboration across different time zones."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build a website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex web applications or SaaS platforms may take 2-4 months. We provide detailed timelines during our initial consultation."
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
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="-1.286389;36.817223" />
      <meta name="ICBM" content="-1.286389, 36.817223" />
      
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
