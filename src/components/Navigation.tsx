import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Soup, Menu, X } from 'lucide-react';
import { COLORS } from '../utils/constants';
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'All Recipes',
    path: '/recipes'
  }, {
    name: 'My Favorites',
    path: '/saved'
  }, {
    name: 'Shopping List',
    path: '/shopping-list'
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-[#FFF8F0]/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="bg-[#FFF8F0] p-2 rounded-full border-2 border-[#FF6B35] mr-3 group-hover:scale-105 transition-transform">
              <Soup size={24} color={COLORS.primary} />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xl md:text-2xl font-bold text-[#FF6B35] leading-none tracking-tight">
                Spice Kitchen
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors duration-200 hover:text-[#FF6B35] ${location.pathname === link.path ? 'text-[#FF6B35] font-bold' : 'text-[#2C1810]'}`}>
                {link.name}
              </Link>)}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#FF6B35] p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden bg-[#FFF8F0] border-t border-[#FF6B35]/20 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map(link => <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-3 rounded-md text-base font-medium ${location.pathname === link.path ? 'bg-[#FF6B35]/10 text-[#FF6B35]' : 'text-[#2C1810] hover:bg-[#FF6B35]/5'}`}>
                {link.name}
              </Link>)}
          </div>
        </div>}
    </nav>;
}