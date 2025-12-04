import { useState } from 'react';
import { Link } from 'wouter';
import { useCartContext } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';

export function Header() {
  const { getCartCount } = useCartContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = getCartCount();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-2xl text-blue-600 hover:text-blue-700">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                TS
              </div>
              TechStore
            </a>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">
              <a className="text-gray-700 hover:text-blue-600 transition">Início</a>
            </Link>
            <Link href="/produtos">
              <a className="text-gray-700 hover:text-blue-600 transition">Produtos</a>
            </Link>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
              Categorias
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">
              Ofertas
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 mx-8 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent ml-2 flex-1 outline-none text-sm"
            />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* User Profile */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
              <User className="w-5 h-5 text-gray-700" />
            </button>

            {/* Shopping Cart */}
            <Link href="/carrinho">
              <a className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-3 mt-4">
              <Link href="/">
                <a className="text-gray-700 hover:text-blue-600 transition py-2">
                  Início
                </a>
              </Link>
              <Link href="/produtos">
                <a className="text-gray-700 hover:text-blue-600 transition py-2">
                  Produtos
                </a>
              </Link>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition py-2">
                Categorias
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition py-2">
                Ofertas
              </a>

              {/* Mobile Search */}
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mt-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent ml-2 flex-1 outline-none text-sm"
                />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
