"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "Shipping & Orders",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days within the continental US. Expedited shipping options are available at checkout for 1-2 day delivery."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order in your account under 'Order History'."
      },
      {
        question: "What if I need to change my order?",
        answer: "If you need to make changes to your order, please contact us within 1 hour of placing it. After that, we may not be able to modify orders that have already been processed."
      }
    ]
  },
  {
    category: "Products & Ingredients",
    questions: [
      {
        question: "Are INKEY products suitable for sensitive skin?",
        answer: "Many of our products are formulated to be gentle and suitable for sensitive skin. We always recommend patch testing new products and consulting with a dermatologist if you have specific concerns."
      },
      {
        question: "Can I use multiple INKEY products together?",
        answer: "Yes! Our products are designed to work well together. However, we recommend introducing new products gradually and checking our ingredient compatibility guide if you're using active ingredients."
      },
      {
        question: "Are your products cruelty-free?",
        answer: "Absolutely! All INKEY products are cruelty-free and we never test on animals. We're also certified by Leaping Bunny."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unopened products. If you're not satisfied with your purchase, contact our customer service team within 30 days for a full refund."
      },
      {
        question: "How do I return a product?",
        answer: "Contact our customer service team to initiate a return. We'll provide you with a prepaid return label and instructions for sending your items back."
      }
    ]
  },
  {
    category: "Account & Rewards",
    questions: [
      {
        question: "How do I join INKEY Insiders?",
        answer: "Simply create an account on our website to automatically become an INKEY Insider! You'll get access to exclusive offers, early product launches, and earn points with every purchase."
      },
      {
        question: "How do rewards points work?",
        answer: "Earn 1 point for every $1 spent. Collect 100 points to get $5 off your next order. Points never expire and can be redeemed at checkout."
      }
    ]
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#c1c0cb] py-4">
      <button
        className="w-full text-left flex justify-between items-center py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-[#1c1c22] font-inter">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#746cad]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#746cad]" />
        )}
      </button>
      {isOpen && (
        <div className="mt-3 pb-2">
          <p className="text-[#747474] font-inter leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQSection({ category, questions }: { category: string; questions: Array<{ question: string; answer: string }> }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">{category}</h2>
      <div className="space-y-0">
        {questions.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#97979d] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/help" className="hover:text-[#1c1c22]">Help</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1c1c22]">FAQ</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-[#747474] max-w-2xl mx-auto font-inter">
            Find answers to common questions about our products, shipping, and more.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((section, index) => (
            <FAQSection key={index} category={section.category} questions={section.questions} />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Still have questions?
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Our customer service team is here to help you find the perfect skincare routine.
          </p>
          <a
            href="/help/contact"
            className="inline-block bg-[#746cad] hover:bg-[#aca4e9] text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Contact Us
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
