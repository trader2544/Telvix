
import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontPreload = document.createElement('link');
      fontPreload.rel = 'preload';
      fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
      fontPreload.as = 'style';
      fontPreload.onload = () => {
        fontPreload.rel = 'stylesheet';
      };
      document.head.appendChild(fontPreload);

      // Preconnect to external domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com',
        'https://connect.facebook.net'
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Defer non-critical JavaScript
    const deferNonCriticalJS = () => {
      // Move non-critical scripts to load after page load
      const scripts = document.querySelectorAll('script[data-defer="true"]');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.getAttribute('src') || '';
        newScript.async = true;
        newScript.defer = true;
        document.body.appendChild(newScript);
      });
    };

    // Optimize images loading
    const optimizeImageLoading = () => {
      // Add intersection observer for lazy loading
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        // Observe all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
      }
    };

    // Run optimizations
    preloadCriticalResources();
    deferNonCriticalJS();
    optimizeImageLoading();

    // Critical resource hints
    const addResourceHints = () => {
      // DNS prefetch for external resources
      const dnsPrefetchDomains = [
        '//www.googletagmanager.com',
        '//platform.twitter.com',
        '//connect.facebook.net'
      ];

      dnsPrefetchDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    addResourceHints();
  }, []);

  return null;
};

export default PerformanceOptimizer;
