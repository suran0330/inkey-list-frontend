"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#1c1c22] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 font-lato">Are you on the list?</h3>
            <p className="text-[#c1c0cb] text-sm mb-6 font-inter">
              We're not like other newsletters, these are the emails you can't wait to open. Get everything you
              didn't know about INKEY delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-black border-0"
                required
              />
              <Button
                type="submit"
                className="bg-[#746cad] hover:bg-[#aca4e9] text-white px-6"
              >
                →
              </Button>
            </form>
            <p className="text-xs text-[#97979d] mt-3 font-inter">
              How we use your data
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h4 className="text-lg font-bold mb-6 font-lato">Follow Us</h4>
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:opacity-75 transition-opacity">
                <img
                  src="https://ext.same-assets.com/3071055451/4219517047.png"
                  alt="Instagram"
                  className="w-8 h-8"
                />
              </a>
              <a href="#" className="hover:opacity-75 transition-opacity">
                <img
                  src="https://ext.same-assets.com/3071055451/4257248613.png"
                  alt="Twitter"
                  className="w-8 h-8"
                />
              </a>
              <a href="#" className="hover:opacity-75 transition-opacity">
                <img
                  src="https://ext.same-assets.com/3071055451/3823806176.png"
                  alt="Facebook"
                  className="w-8 h-8"
                />
              </a>
              <a href="#" className="hover:opacity-75 transition-opacity">
                <img
                  src="https://ext.same-assets.com/3071055451/1334586036.png"
                  alt="TikTok"
                  className="w-8 h-8"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications and Rewards */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h4 className="text-lg font-bold mb-6 font-lato">Rewards</h4>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#746cad] rounded-full flex items-center justify-center mb-2 mx-auto">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <p className="text-xs text-[#c1c0cb] font-inter">Certified<br/>B-Corp</p>
              </div>
              <div className="text-center">
                <img
                  src="https://ext.same-assets.com/3071055451/2208351290.png"
                  alt="Cruelty Free"
                  className="w-16 h-16 mx-auto mb-2"
                />
                <p className="text-xs text-[#c1c0cb] font-inter">Cruelty<br/>Free</p>
              </div>
              <div className="text-center">
                <img
                  src="https://ext.same-assets.com/3071055451/453663357.png"
                  alt="Natural"
                  className="w-16 h-16 mx-auto mb-2"
                />
                <p className="text-xs text-[#c1c0cb] font-inter">Natural<br/>Ingredients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-bold mb-4 font-inter">Shop</h5>
            <ul className="space-y-2 text-sm text-[#c1c0cb] font-inter">
              <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
              <li><Link href="/shop/serums" className="hover:text-white">Serums</Link></li>
              <li><Link href="/shop/moisturizers" className="hover:text-white">Moisturizers</Link></li>
              <li><Link href="/shop/cleansers" className="hover:text-white">Cleansers</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 font-inter">Help</h5>
            <ul className="space-y-2 text-sm text-[#c1c0cb] font-inter">
              <li><Link href="/help/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/help/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/help/shipping" className="hover:text-white">Shipping</Link></li>
              <li><Link href="/help/returns" className="hover:text-white">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 font-inter">About</h5>
            <ul className="space-y-2 text-sm text-[#c1c0cb] font-inter">
              <li><Link href="/about" className="hover:text-white">Our Story</Link></li>
              <li><Link href="/about/ingredients" className="hover:text-white">Ingredients</Link></li>
              <li><Link href="/about/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/about/press" className="hover:text-white">Press</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 font-inter">Legal</h5>
            <ul className="space-y-2 text-sm text-[#c1c0cb] font-inter">
              <li><Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/legal/accessibility" className="hover:text-white">Accessibility</Link></li>
              <li><Link href="/legal/cookies" className="hover:text-white">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-[#97979d] font-inter">
            © 2024 INKEY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
