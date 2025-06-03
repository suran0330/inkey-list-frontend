"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crown, ShoppingCart, Star, Clock, Gift } from "lucide-react";
import Link from "next/link";

export default function InsidersWeekPage() {
  const [email, setEmail] = useState("");
  const { addItem } = useCart();
  const { isAuthenticated, state: authState, openSignupModal } = useAuth();

  const featuredProducts = products.slice(0, 4);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      openSignupModal();
    }
  };

  const discountPrice = (price: string, discount: number) => {
    const originalPrice = Number.parseFloat(price.replace('$', ''));
    const discountedPrice = originalPrice * (1 - discount);
    return `$${discountedPrice.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#747474] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link> /
          <span className="text-[#1c1c22]"> Insiders Week</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-[#746cad] mr-2" />
            <h1 className="text-4xl md:text-6xl font-bold text-[#1c1c22] font-lato">
              INSIDERS WEEK
            </h1>
          </div>
          <p className="text-xl text-[#746cad] font-semibold mb-2 font-inter">
            Exclusive Access • Limited Time
          </p>
          <p className="text-2xl md:text-4xl font-bold text-[#1c1c22] mb-8 font-lato">
            Get up to 30% off
          </p>

          {isAuthenticated && authState.user?.isInsider ? (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-lg font-medium font-inter">
              <Crown className="h-5 w-5 mr-2" />
              You're an INKEY Insider! Enjoy your exclusive discounts.
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email to become an Insider"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-[#c1c0cb] focus:border-[#746cad]"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white py-3 font-medium"
                >
                  Join INKEY Insiders
                </Button>
              </form>
              <p className="text-sm text-[#747474] mt-4 font-inter">
                Free to join • Instant access to deals
              </p>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#746cad] rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#1c1c22] mb-2 font-inter">
              Exclusive Discounts
            </h3>
            <p className="text-[#747474] font-inter">
              Save up to 30% on your favorite products with Insider-only pricing
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#746cad] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#1c1c22] mb-2 font-inter">
              Early Access
            </h3>
            <p className="text-[#747474] font-inter">
              Be the first to shop new products and limited-edition releases
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[#746cad] rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#1c1c22] mb-2 font-inter">
              Special Perks
            </h3>
            <p className="text-[#747474] font-inter">
              Enjoy free shipping, birthday gifts, and exclusive content
            </p>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] text-center mb-8 font-lato">
            Insider Exclusive Deals
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => {
              const discount = index % 2 === 0 ? 0.3 : 0.2; // 30% or 20% discount
              const originalPrice = product.price;
              const salePrice = discountPrice(originalPrice, discount);

              return (
                <div key={product.id} className="group relative">
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded font-inter">
                      -{Math.round(discount * 100)}%
                    </span>
                  </div>

                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square rounded-lg overflow-hidden bg-[#efeff0] mb-4 group-hover:scale-105 transition-transform">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <div className="space-y-2">
                    <p className="text-xs text-[#97979d] font-inter">{product.category}</p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-sm font-semibold text-[#1c1c22] font-inter leading-tight group-hover:text-[#746cad] transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-[#746cad] font-inter">
                        {salePrice}
                      </span>
                      <span className="text-sm text-[#97979d] line-through font-inter">
                        {originalPrice}
                      </span>
                    </div>

                    <Button
                      onClick={() => addItem(product, 1)}
                      className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white text-sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#746cad] to-[#aca4e9] rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4 font-lato">
            Ready to Join the Insiders?
          </h2>
          <p className="text-lg mb-6 opacity-90 font-inter">
            Unlock exclusive deals, early access, and special perks
          </p>

          {!isAuthenticated && (
            <Button
              onClick={openSignupModal}
              className="bg-white text-[#746cad] hover:bg-gray-100 px-8 py-3 font-medium"
            >
              <Crown className="h-5 w-5 mr-2" />
              Become an Insider
            </Button>
          )}
        </div>

        {/* Countdown Timer (Mock) */}
        <div className="text-center mt-12">
          <p className="text-[#747474] font-inter mb-2">Insiders Week ends in:</p>
          <div className="flex justify-center space-x-4">
            {['2', '14', '35', '20'].map((time, index) => (
              <div key={index} className="bg-[#1c1c22] text-white rounded-lg p-4 min-w-[60px]">
                <div className="text-2xl font-bold font-lato">{time}</div>
                <div className="text-xs font-inter">
                  {['DAYS', 'HRS', 'MIN', 'SEC'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
