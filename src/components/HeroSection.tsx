"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  content?: {
    headline?: string;
    subheadline?: string;
    backgroundImage?: {
      asset: { url: string };
      alt?: string;
    };
    ctaButton?: {
      text: string;
      link: string;
    };
  };
}

export default function HeroSection({ content }: HeroSectionProps) {
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Email submitted:", email);
    setShowModal(false);
  };

  return (
    <section className="relative bg-[#efeff0] min-h-[80vh] flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-white/80 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-[#ccc4e7]/60 blur-2xl"></div>
        {/* Large circular element from the original design */}
        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/50 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <img
            src="https://ext.same-assets.com/3071055451/326357800.svg"
            alt="THE INKEY LIST"
            className="h-12 mx-auto mb-8"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-[#1c1c22] mb-6 leading-tight font-lato">
          {content?.headline || 'INSIDERS WEEK IS HERE!'}
        </h1>

        <h2 className="text-3xl md:text-5xl font-bold text-[#1c1c22] mb-12 font-lato">
          {content?.subheadline || 'Get up to 30% off'}
        </h2>
      </div>

      {/* Email Signup Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold mb-4 text-[#1c1c22]">
              INSIDERS WEEK IS HERE!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-[#747474] leading-relaxed">
              By submitting your email address, you agree to receive marketing emails including AI content from The
              INKEY List. We may share info with service providers as outlined in our{" "}
              <button className="underline">Privacy Policy</button>. You can unsubscribe at any
              time. By submitting your email address, you also agree to our{" "}
              <button className="underline">Terms (incl. arbitration)</button> &{" "}
              <button className="underline">Privacy Policy</button>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-[#c1c0cb] focus:border-[#746cad]"
                required
              />

              <Button
                type="submit"
                className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white py-3 rounded-lg font-medium"
              >
                UNLOCK YOUR DISCOUNT
              </Button>

              <p className="text-xs text-center text-[#97979d]">
                when you sign up to INKEY Insiders
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
