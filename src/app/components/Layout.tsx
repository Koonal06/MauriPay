import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/app/contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Don't show nav on dashboard
  if (location.pathname === "/dashboard") {
    return <>{children}</>;
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/features", label: "Features" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/dstpuchpj/image/upload/v1769930693/MauriPay_qohfpo.png"
                alt="MauriPay"
                className="h-12"
              />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors ${
                    location.pathname === link.to
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to={
                  isAuthenticated
                    ? "/dashboard"
                    : "/get-started"
                }
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-md transition-shadow"
              >
                {isAuthenticated ? "Dashboard" : "Get Started"}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">
                MauriPay
              </h3>
              <p className="text-gray-400 text-sm">
                Alternative credit scoring for MSMEs in
                Mauritius. Fair, transparent, and bank-agnostic.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Data Protection</li>
                <li>GDPR Compliance</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              © 2026 MauriPay. All rights reserved. Compliant
              with Mauritius Data Protection Act 2017.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};