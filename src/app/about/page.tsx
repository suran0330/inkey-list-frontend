import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Leaf, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Transparency",
    description: "We believe in honest ingredients and clear communication about what goes into our products."
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Quality skincare shouldn't break the bank. We make effective formulations affordable for everyone."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We're committed to sustainable practices and cruelty-free formulations that respect our planet."
  },
  {
    icon: Award,
    title: "Science-Backed",
    description: "Every product is formulated with proven ingredients at effective concentrations."
  }
];

const team = [
  {
    name: "Colette Laxton",
    role: "Co-Founder & Brand Director",
    image: "https://ext.same-assets.com/3071055451/2165639085.png",
    bio: "Former beauty editor with 15+ years in the industry, passionate about demystifying skincare."
  },
  {
    name: "Mark Curry",
    role: "Co-Founder & CEO",
    image: "https://ext.same-assets.com/3071055451/653406535.png",
    bio: "Beauty industry veteran focused on making quality skincare accessible to everyone."
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Head of Product Development",
    image: "https://ext.same-assets.com/3071055451/2316002344.png",
    bio: "Dermatologist and cosmetic chemist with expertise in active ingredient formulation."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <nav className="text-sm text-[#97979d] font-inter">
            <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1c1c22]">About</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
              Our Story
            </h1>
            <p className="text-xl text-[#747474] max-w-2xl mx-auto font-inter">
              Founded on the belief that great skincare should be accessible, transparent, and effective for everyone.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">How It All Started</h2>
                <p className="text-[#747474] font-inter leading-relaxed mb-6">
                  The INKEY List was born from a simple frustration: skincare was confusing, expensive, and often ineffective.
                  As beauty industry insiders, our founders Colette Laxton and Mark Curry saw firsthand how consumers were
                  overwhelmed by complicated routines and unclear ingredient lists.
                </p>
                <p className="text-[#747474] font-inter leading-relaxed mb-6">
                  We decided to strip away the complexity and focus on what really matters: proven ingredients,
                  effective formulations, and honest education. No fancy packaging, no inflated prices – just
                  straightforward skincare that works.
                </p>
                <p className="text-[#747474] font-inter leading-relaxed">
                  Since launching in 2018, we've helped millions of people build effective skincare routines
                  with products they can understand and afford. Our mission remains the same: to demystify
                  skincare and make it accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-[#746cad]" />
                    </div>
                    <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">{value.title}</h3>
                    <p className="text-[#747474] font-inter text-sm leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Meet the Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#efeff0] mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-[#1c1c22] text-lg mb-2 font-inter">{member.name}</h3>
                  <p className="text-[#746cad] font-semibold mb-4 font-inter">{member.role}</p>
                  <p className="text-[#747474] font-inter text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">Our Commitments</h2>
            <div className="flex justify-center items-center space-x-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#746cad] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <p className="text-sm text-[#1c1c22] font-inter font-semibold">Certified B-Corp</p>
                <p className="text-xs text-[#747474] font-inter">Meeting high standards of social and environmental impact</p>
              </div>
              <div className="text-center">
                <img
                  src="https://ext.same-assets.com/3071055451/2208351290.png"
                  alt="Cruelty Free"
                  className="w-16 h-16 mx-auto mb-4"
                />
                <p className="text-sm text-[#1c1c22] font-inter font-semibold">Cruelty Free</p>
                <p className="text-xs text-[#747474] font-inter">Leaping Bunny certified, never tested on animals</p>
              </div>
              <div className="text-center">
                <img
                  src="https://ext.same-assets.com/3071055451/453663357.png"
                  alt="Sustainable"
                  className="w-16 h-16 mx-auto mb-4"
                />
                <p className="text-sm text-[#1c1c22] font-inter font-semibold">Sustainable</p>
                <p className="text-xs text-[#747474] font-inter">Committed to reducing our environmental impact</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              Join the INKEY Community
            </h2>
            <p className="text-[#747474] mb-8 font-inter">
              Ready to simplify your skincare routine? Discover science-backed products at honest prices.
            </p>
            <a
              href="/shop"
              className="inline-block bg-[#746cad] hover:bg-[#aca4e9] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Shop Our Products
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
