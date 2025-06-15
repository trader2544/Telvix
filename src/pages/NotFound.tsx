
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, Phone, Mail } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const popularPages = [
    { path: "/", label: "Home", icon: Home },
    { path: "/portfolio", label: "Portfolio", icon: Search },
    { path: "/quote", label: "Get Quote", icon: Mail },
    { path: "/#contact", label: "Contact", icon: Phone },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 text-lg mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4 mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Popular Pages */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Pages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
                >
                  <Icon className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">{page.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you believe this is an error or need assistance, please contact us:
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="mailto:telvixhr@outlook.com"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Mail className="w-4 h-4" />
              telvixhr@outlook.com
            </a>
            <a
              href="tel:+254741947599"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Phone className="w-4 h-4" />
              +254 741 947 599
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
