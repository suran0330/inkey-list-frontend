"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import UserAccountMenu from "@/components/UserAccountMenu";
import MobileMenu from "@/components/MobileMenu";
import Link from "next/link";

export default function Header() {
  const { toggleCart, getItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#c1c0cb] shadow-sm">
      {/* Top promotional banner */}
      <div className="bg-[#efeff0] text-center py-2 px-4 text-sm text-[#747474] font-inter">
        Insiders can exclusively shop a NEW product now!{" "}
        <Link href="/insiders-week" className="underline hover:text-[#1c1c22] transition-colors">
          Sign up &gt;
        </Link>
      </div>

      {/* Main navigation */}
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Left side navigation */}
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/shop" className="text-sm font-medium text-[#747474] hover:text-[#1c1c22] transition-colors font-inter">
              Shop
            </Link>
            <Link href="/insiders-week" className="text-sm font-medium text-[#747474] hover:text-[#1c1c22] transition-colors flex items-center font-inter">
              Insiders Week
              <span className="ml-1 text-xs bg-[#ccc4e7] text-[#746cad] px-2 py-1 rounded font-inter">
                SEE OFFERS
              </span>
            </Link>
          </nav>
        </div>

        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <img
              src="https://ext.same-assets.com/3071055451/326357800.svg"
              alt="THE INKEY LIST"
              className="h-8 cursor-pointer"
            />
          </Link>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center space-x-4">
          {/* Navigation removed for cleaner header */}

          <div className="flex items-center space-x-2">
            <Link href="/search">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-[#efeff0]">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <UserAccountMenu />
            <Button
              variant="ghost"
              size="sm"
              className="p-2 relative hover:bg-[#efeff0]"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#746cad] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-inter">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
