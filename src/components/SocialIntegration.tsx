
import { useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const SocialIntegration = () => {
  useEffect(() => {
    // Add Open Graph and Twitter Card meta tags dynamically
    const addMetaTag = (property: string, content: string) => {
      const existingTag = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
      if (!existingTag) {
        const metaTag = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('fb:')) {
          metaTag.setAttribute('property', property);
        } else {
          metaTag.setAttribute('name', property);
        }
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };

    // Enhanced social media meta tags
    addMetaTag('og:type', 'website');
    addMetaTag('og:site_name', 'Telvix');
    addMetaTag('fb:app_id', 'YOUR_FACEBOOK_APP_ID');
    addMetaTag('twitter:site', '@telvix_dev');
    addMetaTag('twitter:creator', '@telvix_dev');
    
    // Add social sharing functionality
    const addSocialSharing = () => {
      // Facebook SDK
      const facebookScript = document.createElement('script');
      facebookScript.innerHTML = `
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
      `;
      document.body.appendChild(facebookScript);

      // Twitter widgets
      const twitterScript = document.createElement('script');
      twitterScript.src = 'https://platform.twitter.com/widgets.js';
      twitterScript.async = true;
      document.body.appendChild(twitterScript);
    };

    addSocialSharing();
  }, []);

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/telvix', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com/telvix_dev', label: 'Twitter' },
    { icon: Linkedin, url: 'https://linkedin.com/company/telvix', label: 'LinkedIn' },
    { icon: Instagram, url: 'https://instagram.com/telvix', label: 'Instagram' },
  ];

  return (
    <div className="flex gap-4 justify-center items-center">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors"
            aria-label={`Visit our ${social.label} page`}
          >
            <Icon className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIntegration;
