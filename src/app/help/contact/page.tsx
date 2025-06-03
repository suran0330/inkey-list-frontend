"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Here you would typically send the form data to your backend
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#97979d] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/help" className="hover:text-[#1c1c22]">Help</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1c1c22]">Contact</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Contact Us
          </h1>
          <p className="text-xl text-[#747474] max-w-2xl mx-auto font-inter">
            Have questions? We're here to help! Reach out to our customer service team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1c1c22] mb-2 font-inter">
                  Full Name *
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-[#c1c0cb] focus:border-[#746cad]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1c1c22] mb-2 font-inter">
                  Email Address *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-[#c1c0cb] focus:border-[#746cad]"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#1c1c22] mb-2 font-inter">
                  Subject *
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full border-[#c1c0cb] focus:border-[#746cad]"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1c1c22] mb-2 font-inter">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full border-[#c1c0cb] focus:border-[#746cad] resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white py-3 rounded-lg font-medium"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">Get in touch</h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-[#efeff0] p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-[#746cad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1c1c22] mb-2 font-inter">Email Support</h3>
                  <p className="text-[#747474] font-inter">hello@theinkeylist.com</p>
                  <p className="text-sm text-[#97979d] font-inter">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#efeff0] p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-[#746cad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1c1c22] mb-2 font-inter">Phone Support</h3>
                  <p className="text-[#747474] font-inter">1-800-INKEY-LIST</p>
                  <p className="text-sm text-[#97979d] font-inter">Monday - Friday, 9AM - 6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#efeff0] p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-[#746cad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1c1c22] mb-2 font-inter">Live Chat</h3>
                  <p className="text-[#747474] font-inter">Available on our website</p>
                  <p className="text-sm text-[#97979d] font-inter">Monday - Friday, 9AM - 6PM EST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#efeff0] p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-[#746cad]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1c1c22] mb-2 font-inter">Response Time</h3>
                  <p className="text-[#747474] font-inter">Email: Within 24 hours</p>
                  <p className="text-[#747474] font-inter">Phone/Chat: Immediate</p>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="mt-12 bg-[#efeff0] rounded-lg p-6">
              <h3 className="font-semibold text-[#1c1c22] mb-2 font-inter">Looking for quick answers?</h3>
              <p className="text-[#747474] mb-4 font-inter">
                Check out our FAQ section for answers to common questions.
              </p>
              <a
                href="/help/faq"
                className="inline-block bg-[#746cad] hover:bg-[#aca4e9] text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
