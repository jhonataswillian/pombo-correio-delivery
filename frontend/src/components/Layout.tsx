import { Link, useLocation } from "react-router-dom";
import { Home, Package, Users, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import Breadcrumbs from "./ui/Breadcrumbs";
import Footer from "./ui/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Pombos", href: "/pigeons", icon: Package },
    { name: "Clientes", href: "/customers", icon: Users },
    { name: "Cartas", href: "/letters", icon: Mail },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-white text-xl">🐦</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Pombo Correio
                </span>
                <div className="text-xs text-gray-500 font-medium">
                  Sistema de Entregas
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-blue-100 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${active ? "text-blue-600" : ""}`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${active ? "text-blue-600" : ""}`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs melhorados */}
          <div className="mb-6">
            <Breadcrumbs />
          </div>

          {/* Page Content */}
          <div className="relative">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toasts Container */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
        {/* Toasts aparecerão aqui */}
      </div>

      {/* Background decorativo */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-pink-300/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
