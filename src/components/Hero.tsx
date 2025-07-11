
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Calculator, Clock, HelpCircle, BarChart3, Zap, Code, Cpu } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const navigateToPortfolio = () => {
    navigate('/portfolio');
  };

  const navigateToCareers = () => {
    navigate('/careers');
  };

  const navigateToQuote = () => {
    navigate('/quote');
  };

  const scrollToCompetitiveAnalysis = () => {
    document.getElementById('competitive-analysis')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Streamable Video Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://streamable.com/e/g6f9ev?autoplay=1&nocontrols=1&loop=1"
          frameBorder="0" 
          width="100%" 
          height="100%" 
          allowFullScreen
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '100vh',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
          title="Futuristic Digital Agency Background"
        ></iframe>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/60 to-purple-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>
      
      {/* Animated Cyber Grid Overlay */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-cyan-400/30 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-rows-8 h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border-b border-cyan-400/30 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Cyber Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 md:w-72 md:h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float z-10"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-float z-10" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse z-10"></div>
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-in text-white">
            {/* Futuristic Status Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-cyan-400/30 shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg shadow-green-400/50"></div>
              <Zap className="w-4 h-4 mr-2 text-cyan-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                NEXT-GEN DIGITAL SOLUTIONS ONLINE
              </span>
            </div>
            
            {/* Main Headline with Cyber Aesthetic */}
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent block mb-2">
                TELVIX
              </span>
              <span className="text-white text-2xl md:text-3xl lg:text-4xl block mb-2">
                Quantum Digital Agency
              </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-lg md:text-2xl lg:text-3xl block">
                Future-Ready Solutions
              </span>
            </h1>
            
            {/* Cyber Description */}
            <p className="text-base md:text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl font-light">
              Harness the power of <span className="text-cyan-400 font-semibold">AI-driven development</span>, 
              <span className="text-purple-400 font-semibold"> quantum-speed optimization</span>, and 
              <span className="text-blue-400 font-semibold"> next-gen digital experiences</span>. 
              We don't just build websites—we engineer digital futures.
            </p>
            
            {/* CTA Buttons with Cyber Design */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-8 py-4 text-base group shadow-2xl shadow-cyan-500/25 border border-cyan-400/50 hover:shadow-cyan-500/40 transition-all duration-300"
                onClick={navigateToQuote}
              >
                <Code className="mr-2 w-5 h-5" />
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:text-white font-bold px-8 py-4 text-base backdrop-blur-md bg-white/5 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                onClick={navigateToPortfolio}
              >
                <Play className="mr-2 w-5 h-5" />
                View Portfolio
              </Button>
            </div>

            {/* Advanced Interactive Tools Section */}
            <div className="mb-8 p-6 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-2xl shadow-blue-500/10">
              <div className="flex items-center mb-4">
                <Cpu className="w-6 h-6 mr-3 text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold text-lg">
                  🚀 AI-POWERED BUSINESS TOOLS
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Access our quantum-enhanced suite: neural cost calculator, timeline AI, service intelligence & SEO quantum analysis!
              </p>
              
              {/* Tools Grid with Cyber Aesthetic */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white font-medium px-3 py-3 text-xs flex flex-col items-center gap-2 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 bg-gradient-to-br from-cyan-500/10 to-transparent"
                  onClick={navigateToQuote}
                >
                  <Calculator className="w-4 h-4" />
                  <span>Neural Calculator</span>
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:text-white font-medium px-3 py-3 text-xs flex flex-col items-center gap-2 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 bg-gradient-to-br from-purple-500/10 to-transparent"
                  onClick={navigateToQuote}
                >
                  <Clock className="w-4 h-4" />
                  <span>Timeline AI</span>
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-400/50 text-blue-300 hover:bg-blue-500/20 hover:text-white font-medium px-3 py-3 text-xs flex flex-col items-center gap-2 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 bg-gradient-to-br from-blue-500/10 to-transparent"
                  onClick={navigateToQuote}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Service Intel</span>
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-green-400/50 text-green-300 hover:bg-green-500/20 hover:text-white font-medium px-3 py-3 text-xs flex flex-col items-center gap-2 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 bg-gradient-to-br from-green-500/10 to-transparent"
                  onClick={scrollToCompetitiveAnalysis}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>SEO Quantum</span>
                </Button>
              </div>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gradient-to-r from-cyan-400 to-purple-400 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white hover:from-cyan-500/30 hover:to-purple-500/30 font-medium px-4 py-2 text-sm w-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                onClick={navigateToQuote}
              >
                <Zap className="mr-2 w-4 h-4" />
                Access Full Quantum Suite
              </Button>
            </div>

            {/* Futuristic Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <div className="animate-fade-in bg-gradient-to-br from-cyan-500/10 to-transparent p-4 rounded-xl border border-cyan-400/20" style={{ animationDelay: '0.2s' }}>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">50+</div>
                <div className="text-xs text-gray-400">Quantum Projects</div>
              </div>
              <div className="animate-fade-in bg-gradient-to-br from-purple-500/10 to-transparent p-4 rounded-xl border border-purple-400/20" style={{ animationDelay: '0.4s' }}>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">99.9%</div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
              <div className="animate-fade-in bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-xl border border-green-400/20" style={{ animationDelay: '0.6s' }}>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">24/7</div>
                <div className="text-xs text-gray-400">Neural Support</div>
              </div>
            </div>
          </div>
          
          {/* Futuristic Right Panel */}
          <div className="relative animate-slide-up hidden lg:block">
            <div className="relative group">
              {/* Holographic Frame Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-purple-400/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              {/* Cyber Frame */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-400/30 shadow-2xl shadow-blue-500/20">
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400 rounded-br-lg"></div>
                
                {/* Content */}
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <Code className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      Quantum Development
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Next-generation web solutions powered by advanced algorithms
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                      <span className="text-gray-300 text-sm">AI Integration</span>
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                      <span className="text-gray-300 text-sm">Performance</span>
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                      <span className="text-gray-300 text-sm">Security</span>
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-green-500 to-cyan-500 animate-pulse" style={{animationDelay: '1s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
