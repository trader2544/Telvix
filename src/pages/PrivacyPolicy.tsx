
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Eye, Database, UserCheck, Lock, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-white/70 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-12">
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact us through our website forms</li>
                    <li>Subscribe to our newsletters or updates</li>
                    <li>Request quotes or consultations</li>
                    <li>Apply for career opportunities</li>
                  </ul>
                  <p>This may include your name, email address, phone number, company information, and project details.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Database className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you project updates and communications</li>
                    <li>Process job applications and recruitment</li>
                    <li>Improve our services and website functionality</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <UserCheck className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With your explicit consent</li>
                    <li>To trusted service providers who assist us in operating our website</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In connection with a business transfer or merger</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Lock className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and databases</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal information</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <Mail className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p><strong>Email:</strong> digitelhr@outlook.com</p>
                    <p><strong>Phone:</strong> +254741947599</p>
                  </div>
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

export default PrivacyPolicy;
