"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  ChevronRight,
  User,
  ShoppingCart,
  Search,
  Crown,
  Package,
  Heart,
  Settings,
  LogOut,
  Home,
  Droplets,
  Sparkles,
  Shield,
  Sun
} from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, state: authState, logout, openLoginModal } = useAuth();
  const { getItemCount, toggleCart } = useCart();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const cartItemCount = getItemCount();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleLinkClick = () => {
    onClose();
  };

  const handleCartClick = () => {
    onClose();
    toggleCart();
  };

  const handleLoginClick = () => {
    onClose();
    openLoginModal();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const shopCategories = [
    { name: "All Products", href: "/shop", icon: Package },
    { name: "Serums", href: "/shop/serums", icon: Droplets },
    { name: "Moisturizers", href: "/shop/moisturizers", icon: Shield },
    { name: "Cleansers", href: "/shop/cleansers", icon: Sparkles },
    { name: "Treatments", href: "/shop/treatments", icon: Sun },
  ];

  const skincareConcerns = [
    { name: "Hydration", href: "/concerns/hydration" },
    { name: "Anti-Aging", href: "/concerns/anti-aging" },
    { name: "Blemishes", href: "/concerns/blemishes" },
    { name: "Brightening", href: "/concerns/brightening" },
    { name: "Sensitive Skin", href: "/concerns/sensitive" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-[#c1c0cb]">
            <SheetTitle className="flex items-center justify-between">
              <img
                src="https://ext.same-assets.com/3071055451/326357800.svg"
                alt="THE INKEY LIST"
                className="h-8"
              />
              {cartItemCount > 0 && (
                <button
                  onClick={handleCartClick}
                  className="flex items-center space-x-2 text-[#746cad] hover:text-[#aca4e9]"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="text-sm font-medium">{cartItemCount}</span>
                </button>
              )}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            <div className="p-4 border-b border-[#efeff0]">
              {isAuthenticated && authState.user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#746cad] rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#1c1c22] font-inter">
                        {authState.user.firstName} {authState.user.lastName}
                      </p>
                      {authState.user.isInsider && (
                        <div className="flex items-center space-x-1">
                          <Crown className="h-3 w-3 text-[#746cad]" />
                          <span className="text-xs text-[#746cad] font-medium">INKEY Insider</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Link href="/account" onClick={handleLinkClick}>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <User className="h-3 w-3 mr-1" />
                        Profile
                      </Button>
                    </Link>
                    <Link href="/account/orders" onClick={handleLinkClick}>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <Package className="h-3 w-3 mr-1" />
                        Orders
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="w-full text-xs" onClick={handleLogout}>
                      <LogOut className="h-3 w-3 mr-1" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In / Create Account
                </Button>
              )}
            </div>

            {/* Navigation Sections */}
            <div className="py-2">
              {/* Home */}
              <Link href="/" onClick={handleLinkClick}>
                <div className="flex items-center justify-between p-4 hover:bg-[#efeff0] transition-colors">
                  <div className="flex items-center space-x-3">
                    <Home className="h-5 w-5 text-[#747474]" />
                    <span className="font-medium text-[#1c1c22] font-inter">Home</span>
                  </div>
                </div>
              </Link>

              {/* Shop Section */}
              <div>
                <button
                  onClick={() => toggleSection('shop')}
                  className="flex items-center justify-between w-full p-4 hover:bg-[#efeff0] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-[#747474]" />
                    <span className="font-medium text-[#1c1c22] font-inter">Shop</span>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 text-[#747474] transition-transform ${
                      expandedSection === 'shop' ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedSection === 'shop' && (
                  <div className="bg-[#efeff0] py-2">
                    {shopCategories.map((category) => (
                      <Link key={category.name} href={category.href} onClick={handleLinkClick}>
                        <div className="flex items-center space-x-3 p-3 pl-12 hover:bg-white transition-colors">
                          <category.icon className="h-4 w-4 text-[#746cad]" />
                          <span className="text-[#1c1c22] font-inter">{category.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Skincare Concerns */}
              <div>
                <button
                  onClick={() => toggleSection('concerns')}
                  className="flex items-center justify-between w-full p-4 hover:bg-[#efeff0] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-5 w-5 text-[#747474]" />
                    <span className="font-medium text-[#1c1c22] font-inter">Skincare Concerns</span>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 text-[#747474] transition-transform ${
                      expandedSection === 'concerns' ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedSection === 'concerns' && (
                  <div className="bg-[#efeff0] py-2">
                    {skincareConcerns.map((concern) => (
                      <Link key={concern.name} href={concern.href} onClick={handleLinkClick}>
                        <div className="flex items-center space-x-3 p-3 pl-12 hover:bg-white transition-colors">
                          <div className="w-2 h-2 bg-[#746cad] rounded-full"></div>
                          <span className="text-[#1c1c22] font-inter">{concern.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Insiders Week */}
              <Link href="/insiders-week" onClick={handleLinkClick}>
                <div className="flex items-center justify-between p-4 hover:bg-[#efeff0] transition-colors">
                  <div className="flex items-center space-x-3">
                    <Crown className="h-5 w-5 text-[#746cad]" />
                    <span className="font-medium text-[#1c1c22] font-inter">Insiders Week</span>
                    <span className="text-xs bg-[#ccc4e7] text-[#746cad] px-2 py-1 rounded font-inter">
                      SEE OFFERS
                    </span>
                  </div>
                </div>
              </Link>

              {/* Rewards */}
              <Link href="/rewards" onClick={handleLinkClick}>
                <div className="flex items-center justify-between p-4 hover:bg-[#efeff0] transition-colors">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-[#747474]" />
                    <span className="font-medium text-[#1c1c22] font-inter">Rewards</span>
                  </div>
                </div>
              </Link>

              {/* Search */}
              <Link href="/search" onClick={handleLinkClick}>
                <div className="flex items-center justify-between p-4 hover:bg-[#efeff0] transition-colors">
                  <div className="flex items-center space-x-3">
                    <Search className="h-5 w-5 text-[#747474]" />
                    <span className="font-medium text-[#1c1c22] font-inter">Search</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#c1c0cb] bg-[#efeff0]">
            <div className="text-center">
              <p className="text-xs text-[#747474] font-inter mb-2">
                Free shipping on orders over $50
              </p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-[#746cad] hover:text-[#aca4e9]">
                  <img
                    src="https://ext.same-assets.com/3071055451/4219517047.png"
                    alt="Instagram"
                    className="w-6 h-6"
                  />
                </a>
                <a href="#" className="text-[#746cad] hover:text-[#aca4e9]">
                  <img
                    src="https://ext.same-assets.com/3071055451/4257248613.png"
                    alt="Twitter"
                    className="w-6 h-6"
                  />
                </a>
                <a href="#" className="text-[#746cad] hover:text-[#aca4e9]">
                  <img
                    src="https://ext.same-assets.com/3071055451/3823806176.png"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </a>
                <a href="#" className="text-[#746cad] hover:text-[#aca4e9]">
                  <img
                    src="https://ext.same-assets.com/3071055451/1334586036.png"
                    alt="TikTok"
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
