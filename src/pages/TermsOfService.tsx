
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Users, CreditCard, AlertTriangle, Scale, Phone } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary via-primary/90 to-accent text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-2xl mb-4 md:mb-6">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">Terms of Service</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-white/70 mt-3 md:mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8 md:space-y-12">
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  <p>By accessing and using Digitel's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                  <p>These terms apply to all visitors, users, and others who access or use our services.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Services and Payment</h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  <p>Digitel provides digital development services including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Web application development</li>
                    <li>Mobile application development</li>
                    <li>SaaS solutions and platforms</li>
                    <li>AI integration and automation</li>
                    <li>Freelance developer placement</li>
                  </ul>
                  <p>Payment terms and project specifications will be outlined in individual project agreements. All payments are due according to the agreed schedule.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Freelancer Services</h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  <p>Our freelancer placement service is currently available for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Kenyan developers and digital professionals</li>
                    <li>Nigerian developers and digital professionals</li>
                  </ul>
                  <p>All freelancers are vetted for quality and professionalism. Project assignments are based on availability and skill match. Digitel acts as an intermediary and is not directly responsible for freelancer performance, though we provide support and mediation when needed.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <Scale className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Limitation of Liability</h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  <p>In no event shall Digitel, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                  <p>Our liability is limited to the amount paid by you for the specific service in question. We provide services "as is" and make no warranties, express or implied.</p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <Phone className="w-6 h-6 md:w-8 md:h-8 text-primary mr-3 md:mr-4" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">Contact Information</h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  <p>For questions about these Terms of Service, please contact us:</p>
                  <div className="bg-gray-50 p-3 md:p-4 rounded-xl">
                    <p><strong>Email:</strong> digitelhr@outlook.com</p>
                    <p><strong>Phone:</strong> +254741947599</p>
                  </div>
                  <p>We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of any changes.</p>
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

export default TermsOfService;
