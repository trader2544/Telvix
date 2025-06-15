
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Cookie, Settings, BarChart, Shield, Eye, Mail } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary via-primary/90 to-accent text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl mb-4 md:mb-6">
              <Cookie className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">Cookie Policy</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Learn about how we use cookies to enhance your browsing experience.
            </p>
            <p className="text-sm text-white/70 mt-3 md:mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </section>

        {/* Cookie Policy Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8 md:space-y-12">
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <Eye className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">What Are Cookies?</h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They help us provide you with a better experience by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remembering your preferences and settings</li>
                    <li>Enabling certain website features and functionality</li>
                    <li>Helping us understand how you use our website</li>
                    <li>Providing relevant content and advertisements</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <Settings className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Types of Cookies We Use</h2>
                </div>
                <div className="space-y-4 md:space-y-6 text-gray-700 text-sm md:text-base">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                    <p>These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                    <p>We use these cookies to understand how visitors interact with our website, helping us improve our services and user experience.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Functional Cookies</h3>
                    <p>These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <BarChart className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Third-Party Cookies</h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  <p>We may use third-party services that set cookies on your device. These include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                    <li><strong>Social Media Platforms:</strong> For social sharing and integration features</li>
                    <li><strong>Communication Tools:</strong> For chat widgets and customer support</li>
                  </ul>
                  <p>These third parties have their own privacy policies and cookie practices, which we encourage you to review.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <Shield className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Managing Cookies</h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  <p>You can control and manage cookies in various ways:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Most web browsers allow you to control cookies through their settings</li>
                    <li>You can set your browser to refuse all cookies or alert you when cookies are being sent</li>
                    <li>You can delete cookies that have already been set</li>
                    <li>You can opt out of third-party cookies through their respective websites</li>
                  </ul>
                  <p className="bg-amber-50 p-3 md:p-4 rounded-xl border border-amber-200 text-sm">
                    <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website and your user experience.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Contact Us</h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  <p>If you have any questions about our use of cookies, please contact us:</p>
                  <div className="bg-gray-50 p-3 md:p-4 rounded-xl">
                    <p><strong>Email:</strong> digitelhr@outlook.com</p>
                    <p><strong>Phone:</strong> +254741947599</p>
                  </div>
                  <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
