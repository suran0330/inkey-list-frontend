import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Droplets, Zap, Target, Sparkles, Heart } from "lucide-react";

const skinConcerns = [
  {
    title: "Hydration",
    description: "Achieve plump, dewy skin with our collection of hydrating products",
    icon: Droplets,
    href: "/concerns/hydration",
    keyIngredients: ["Hyaluronic Acid", "Glycerin", "Ceramides"],
    benefits: ["Plumps skin", "Reduces fine lines", "Improves texture"],
    color: "blue"
  },
  {
    title: "Anti-Aging",
    description: "Target fine lines, wrinkles, and loss of firmness with proven actives",
    icon: Zap,
    href: "/concerns/anti-aging",
    keyIngredients: ["Retinol", "Peptides", "Vitamin C"],
    benefits: ["Reduces wrinkles", "Improves firmness", "Evens skin tone"],
    color: "purple"
  },
  {
    title: "Blemishes",
    description: "Clear breakouts and prevent future blemishes with targeted treatments",
    icon: Target,
    href: "/concerns/blemishes",
    keyIngredients: ["Salicylic Acid", "Niacinamide", "Zinc"],
    benefits: ["Unclogs pores", "Reduces inflammation", "Controls oil"],
    color: "green"
  },
  {
    title: "Brightening",
    description: "Fade dark spots and achieve a radiant, even complexion",
    icon: Sparkles,
    href: "/concerns/brightening",
    keyIngredients: ["Vitamin C", "Kojic Acid", "Alpha Arbutin"],
    benefits: ["Fades dark spots", "Evens skin tone", "Boosts radiance"],
    color: "yellow"
  },
  {
    title: "Sensitive Skin",
    description: "Gentle, effective formulas designed for reactive and delicate skin",
    icon: Heart,
    href: "/concerns/sensitive",
    keyIngredients: ["Ceramides", "Oat Extract", "Panthenol"],
    benefits: ["Calms irritation", "Strengthens barrier", "Reduces redness"],
    color: "pink"
  }
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        icon: "text-blue-600"
      };
    case "purple":
      return {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-800",
        icon: "text-purple-600"
      };
    case "green":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        icon: "text-green-600"
      };
    case "yellow":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-800",
        icon: "text-yellow-600"
      };
    case "pink":
      return {
        bg: "bg-pink-50",
        border: "border-pink-200",
        text: "text-pink-800",
        icon: "text-pink-600"
      };
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-800",
        icon: "text-gray-600"
      };
  }
};

export default function ConcernsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#97979d] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1c1c22]">Skin Concerns</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Skin Concerns
          </h1>
          <p className="text-xl text-[#747474] max-w-3xl mx-auto font-inter">
            Find targeted solutions for your specific skin needs. Our expertly curated collections
            address common concerns with proven ingredients and gentle, effective formulations.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 text-center font-lato">
              How to Choose the Right Products
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Identify Your Concern</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Browse our concern categories to find solutions that match your specific skin needs.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Learn About Ingredients</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Understand which active ingredients are most effective for your concerns.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Build Your Routine</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Start with gentle formulations and gradually introduce actives for best results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skin Concerns Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 text-center font-lato">
            Explore By Concern
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skinConcerns.map((concern, index) => {
              const IconComponent = concern.icon;
              const colorClasses = getColorClasses(concern.color);

              return (
                <Link key={index} href={concern.href} className="group">
                  <div className={`border-2 ${colorClasses.border} rounded-lg p-6 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 ${colorClasses.bg}`}>
                    <div className="flex items-center mb-4">
                      <div className="bg-white p-3 rounded-lg mr-4 shadow-sm">
                        <IconComponent className={`h-6 w-6 ${colorClasses.icon}`} />
                      </div>
                      <h3 className="text-xl font-bold text-[#1c1c22] font-inter group-hover:text-[#746cad] transition-colors">
                        {concern.title}
                      </h3>
                    </div>

                    <p className="text-[#747474] font-inter text-sm mb-4 leading-relaxed">
                      {concern.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-[#1c1c22] mb-2 font-inter text-sm">Key Ingredients:</h4>
                      <div className="flex flex-wrap gap-2">
                        {concern.keyIngredients.map((ingredient, idx) => (
                          <span key={idx} className={`px-2 py-1 ${colorClasses.text} bg-white rounded-full text-xs font-inter font-medium`}>
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#1c1c22] mb-2 font-inter text-sm">Benefits:</h4>
                      <ul className="space-y-1">
                        {concern.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-[#747474] font-inter text-xs flex items-start">
                            <span className={`w-1.5 h-1.5 ${colorClasses.icon.replace('text-', 'bg-')} rounded-full mr-2 mt-1.5 flex-shrink-0`}></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex items-center text-[#746cad] font-medium text-sm font-inter group-hover:text-[#aca4e9] transition-colors">
                      Explore Solutions →
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* General Products Card */}
            <Link href="/shop" className="group">
              <div className="border-2 border-[#c1c0cb] rounded-lg p-6 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 bg-gradient-to-br from-[#efeff0] to-white">
                <div className="flex items-center mb-4">
                  <div className="bg-[#746cad] p-3 rounded-lg mr-4">
                    <span className="text-white font-bold text-lg">✨</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1c1c22] font-inter group-hover:text-[#746cad] transition-colors">
                    Not Sure?
                  </h3>
                </div>

                <p className="text-[#747474] font-inter text-sm mb-4 leading-relaxed">
                  Browse all our products or take our skin quiz to get personalized recommendations.
                </p>

                <div className="space-y-3">
                  <div className="bg-white border border-[#c1c0cb] rounded-lg p-3 hover:border-[#746cad] transition-colors">
                    <span className="text-[#1c1c22] font-medium text-sm font-inter">Take Skin Quiz →</span>
                  </div>
                  <div className="bg-white border border-[#c1c0cb] rounded-lg p-3 hover:border-[#746cad] transition-colors">
                    <span className="text-[#1c1c22] font-medium text-sm font-inter">Shop All Products →</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Multi-Concern Solutions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 text-center font-lato">
            Multi-Concern Solutions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#1c1c22] mb-3 font-inter">
                Aging + Sensitive Skin
              </h3>
              <p className="text-[#747474] font-inter text-sm mb-4">
                Gentle anti-aging solutions that won't irritate sensitive skin.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#efeff0] text-[#746cad] px-3 py-1 rounded-full text-xs font-inter">Bakuchiol</span>
                <span className="bg-[#efeff0] text-[#746cad] px-3 py-1 rounded-full text-xs font-inter">Gentle Peptides</span>
                <span className="bg-[#efeff0] text-[#746cad] px-3 py-1 rounded-full text-xs font-inter">Ceramides</span>
              </div>
              <Link href="/concerns/sensitive" className="text-[#746cad] hover:text-[#aca4e9] font-medium text-sm transition-colors">
                Learn More →
              </Link>
            </div>

            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#1c1c22] mb-3 font-inter">
                Acne + Post-Inflammatory Marks
              </h3>
              <p className="text-[#747474] font-inter text-sm mb-4">
                Clear active breakouts while fading dark spots from previous blemishes.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#efeff0] text-[#746cad] px-3 py-1 rounded-full text-xs font-inter">Salicylic Acid</span>
                <span className="bg-[#efeff0] text-[#746cad] px-3 py-1 rounded-full text-xs font-inter">Niacinamide</span>
                <span className="bg-[#efeff0] text-[#746cad] px-3 py-1 rounded-full text-xs font-inter">Vitamin C</span>
              </div>
              <Link href="/concerns/blemishes" className="text-[#746cad] hover:text-[#aca4e9] font-medium text-sm transition-colors">
                Learn More →
              </Link>
            </div>
          </div>
        </section>

        {/* Expert Tips */}
        <section className="mb-16 bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 text-center font-lato">
            Expert Tips for Better Results
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🔬</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter text-sm">Start Slow</h3>
              <p className="text-[#747474] font-inter text-xs">
                Introduce one new active ingredient at a time to avoid irritation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">☀️</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter text-sm">SPF Daily</h3>
              <p className="text-[#747474] font-inter text-xs">
                Sun protection is essential, especially when using active ingredients.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⏰</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter text-sm">Be Patient</h3>
              <p className="text-[#747474] font-inter text-xs">
                Most skincare results take 6-12 weeks of consistent use to show.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter text-sm">Track Progress</h3>
              <p className="text-[#747474] font-inter text-xs">
                Take photos and notes to monitor improvements over time.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Need Personalized Recommendations?
          </h2>
          <p className="text-[#747474] mb-8 font-inter">
            Not sure which products are right for your skin? Our experts are here to help you build the perfect routine.
          </p>
          <div className="space-x-4">
            <Link href="/quiz" className="inline-block bg-[#746cad] hover:bg-[#aca4e9] text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Take Skin Quiz
            </Link>
            <Link href="/help/contact" className="inline-block border-2 border-[#746cad] text-[#746cad] hover:bg-[#746cad] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Ask an Expert
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
