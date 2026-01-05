import React from 'react';
import { Soup, Instagram, Twitter, Facebook } from 'lucide-react';
export function Footer() {
  return <footer className="bg-[#2C1810] text-[#FFF8F0] pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Soup className="h-8 w-8 text-[#FF6B35] mr-2" />
              <span className="font-sans text-2xl font-bold">
                Spice Kitchen
              </span>
            </div>
            <p className="text-[#FFF8F0]/80 text-sm max-w-xs mx-auto md:mx-0">
              Cook what you have. Discover what you love. Simple recipes for
              every kitchen.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h3 className="font-sans text-lg font-semibold text-[#F39C12] mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-[#FFF8F0]/80">
              <li>
                <a href="/recipes" className="hover:text-white transition-colors">
                  All Recipes
                </a>
              </li>
              <li>
                <a href="/saved" className="hover:text-white transition-colors">
                  My Favorites
                </a>
              </li>
              <li>
                <a href="/shopping-list" className="hover:text-white transition-colors">
                  Shopping List
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h3 className="font-sans text-lg font-semibold text-[#F39C12] mb-4">
              Connect
            </h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="hover:text-[#F39C12] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#F39C12] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#F39C12] transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FFF8F0]/20 pt-6 text-center text-xs text-[#FFF8F0]/60">
          <p>&copy; 2025 Spice Kitchen. Enjoy your meal!</p>
        </div>
      </div>
    </footer>;
}