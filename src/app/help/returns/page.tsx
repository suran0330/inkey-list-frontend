import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RotateCcw, Shield, Clock, CheckCircle } from "lucide-react";

const returnSteps = [
  {
    step: 1,
    title: "Contact Us",
    description: "Email us at returns@theinkeylist.com or use our contact form within 30 days of purchase."
  },
  {
    step: 2,
    title: "Get Return Authorization",
    description: "We'll send you a return authorization number and prepaid shipping label."
  },
  {
    step: 3,
    title: "Package Your Items",
    description: "Securely package your unopened items with the return authorization number."
  },
  {
    step: 4,
    title: "Ship It Back",
    description: "Drop off your package at any authorized shipping location using our prepaid label."
  },
  {
    step: 5,
    title: "Get Your Refund",
    description: "Once we receive your return, we'll process your refund within 3-5 business days."
  }
];

export default function ReturnsPage() {
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
          <span className="text-[#1c1c22]">Returns</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Returns & Refunds
          </h1>
          <p className="text-xl text-[#747474] max-w-2xl mx-auto font-inter">
            Your satisfaction is our priority. Easy returns within 30 days.
          </p>
        </div>

        {/* Return Policy Overview */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[#efeff0] rounded-lg">
              <Clock className="h-12 w-12 text-[#746cad] mx-auto mb-4" />
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">30-Day Window</h3>
              <p className="text-[#747474] font-inter">Return unopened items within 30 days of purchase</p>
            </div>

            <div className="text-center p-6 bg-[#efeff0] rounded-lg">
              <Shield className="h-12 w-12 text-[#746cad] mx-auto mb-4" />
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Free Returns</h3>
              <p className="text-[#747474] font-inter">We provide prepaid return shipping labels</p>
            </div>

            <div className="text-center p-6 bg-[#efeff0] rounded-lg">
              <RotateCcw className="h-12 w-12 text-[#746cad] mx-auto mb-4" />
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Full Refund</h3>
              <p className="text-[#747474] font-inter">Get your money back, no questions asked</p>
            </div>
          </div>
        </section>

        {/* How to Return */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">How to Return Your Order</h2>

          <div className="space-y-6">
            {returnSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 border border-[#c1c0cb] rounded-lg">
                <div className="bg-[#746cad] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">{step.title}</h3>
                  <p className="text-[#747474] font-inter">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Return Policy Details */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">Return Policy Details</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-lato flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                What Can Be Returned
              </h3>
              <ul className="space-y-2 text-[#747474] font-inter ml-7">
                <li>• Unopened products in original packaging</li>
                <li>• Items purchased within the last 30 days</li>
                <li>• Products with proof of purchase (order confirmation email)</li>
                <li>• Items that haven't been used or damaged</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-lato">What Cannot Be Returned</h3>
              <ul className="space-y-2 text-[#747474] font-inter">
                <li>• Opened or used products (for hygiene reasons)</li>
                <li>• Items purchased over 30 days ago</li>
                <li>• Products without original packaging</li>
                <li>• Gift cards or promotional items</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-lato">Refund Timeline</h3>
              <div className="bg-[#efeff0] rounded-lg p-6">
                <p className="text-[#747474] font-inter mb-4">
                  Once we receive your returned items, we'll inspect them and process your refund within 3-5 business days.
                </p>
                <ul className="space-y-2 text-[#747474] font-inter">
                  <li>• Credit card refunds: 3-5 business days</li>
                  <li>• PayPal refunds: 1-2 business days</li>
                  <li>• Store credit: Immediate</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Exchanges */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">Exchanges</h2>
          <div className="bg-[#efeff0] rounded-lg p-6">
            <p className="text-[#747474] font-inter mb-4">
              We currently don't offer direct exchanges. If you'd like a different product, please:
            </p>
            <ol className="space-y-2 text-[#747474] font-inter">
              <li>1. Return your original item for a full refund</li>
              <li>2. Place a new order for the item you want</li>
              <li>3. We'll expedite processing of your new order</li>
            </ol>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Need Help with a Return?
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Our customer service team is here to make your return process as smooth as possible.
          </p>
          <div className="space-x-4">
            <a
              href="/help/contact"
              className="inline-block bg-[#746cad] hover:bg-[#aca4e9] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:returns@theinkeylist.com"
              className="inline-block border-2 border-[#746cad] text-[#746cad] hover:bg-[#746cad] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Email Returns Team
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
