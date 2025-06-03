import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import Link from "next/link";
import { Droplets, Clock, Shield, Sparkles } from "lucide-react";

// Filter products for hydration concerns
const hydrationProducts = products.filter(product =>
  product.name.toLowerCase().includes('hyaluronic') ||
  product.name.toLowerCase().includes('hydra') ||
  product.name.toLowerCase().includes('moistur') ||
  product.name.toLowerCase().includes('serum') ||
  product.concerns?.some(concern =>
    concern.toLowerCase().includes('hydration') ||
    concern.toLowerCase().includes('dryness') ||
    concern.toLowerCase().includes('moisture')
  ) ||
  product.description.toLowerCase().includes('hydrat') ||
  product.description.toLowerCase().includes('moisture') ||
  product.description.toLowerCase().includes('plump') ||
  product.description.toLowerCase().includes('hyaluronic')
);

const hydrationTips = [
  {
    icon: Droplets,
    title: "Layer Hydrating Products",
    description: "Apply thinnest to thickest consistency for maximum absorption",
    tips: ["Start with hydrating toner", "Apply hyaluronic acid serum", "Seal with moisturizer", "Use facial oil if needed"]
  },
  {
    icon: Clock,
    title: "Apply to Damp Skin",
    description: "Hyaluronic acid works best when applied to slightly damp skin",
    tips: ["Don't completely dry skin after cleansing", "Spritz with facial mist if needed", "Apply serum while skin is still damp", "Follow with moisturizer immediately"]
  },
  {
    icon: Shield,
    title: "Protect Your Barrier",
    description: "A healthy skin barrier retains moisture more effectively",
    tips: ["Use gentle, pH-balanced cleansers", "Avoid over-exfoliating", "Include ceramides in your routine", "Always use SPF during the day"]
  },
  {
    icon: Sparkles,
    title: "Consistency is Key",
    description: "Regular use of hydrating products yields the best results",
    tips: ["Apply products twice daily", "Be patient - results take 2-4 weeks", "Don't skip your routine", "Adjust products seasonally if needed"]
  }
];

export default function HydrationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#97979d] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/concerns" className="hover:text-[#1c1c22]">Skin Concerns</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1c1c22]">Hydration</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-[#efeff0] p-3 rounded-lg mr-4">
              <Droplets className="h-8 w-8 text-[#746cad]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] font-lato">
              Hydration
            </h1>
          </div>
          <p className="text-xl text-[#747474] max-w-3xl font-inter">
            Achieve plump, dewy skin with our collection of hydrating products. From hyaluronic acid serums
            to moisture-locking creams, find everything you need to maintain optimal skin hydration.
          </p>
        </div>

        {/* About Hydration */}
        <section className="mb-12">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              Why Hydration Matters
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Plump Appearance</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Well-hydrated skin appears fuller and more youthful, reducing the appearance of fine lines.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Healthy Barrier</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Proper hydration supports your skin's natural barrier function and protection.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Better Absorption</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Hydrated skin absorbs skincare products more effectively for better results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Ingredients */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Key Hydrating Ingredients
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Hyaluronic Acid</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Can hold up to 1000x its weight in water, providing intense hydration for all skin types.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: All skin types</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Glycerin</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                A humectant that draws moisture from the environment into your skin.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Dry, dehydrated skin</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Ceramides</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Lipids that help restore and maintain the skin's natural barrier to lock in moisture.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Dry, compromised skin</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Squalane</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                A lightweight oil that provides deep hydration without clogging pores.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: All skin types</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Beta Glucan</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Soothes skin while providing moisture and supporting the skin barrier.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Sensitive, irritated skin</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Polyglutamic Acid</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Can hold even more water than hyaluronic acid for superior hydration.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Very dry skin</p>
            </div>
          </div>
        </section>

        {/* Products for Hydration */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] font-lato">
              Products for Hydration ({hydrationProducts.length} products)
            </h2>
            <select className="border border-[#c1c0cb] rounded-lg px-4 py-2 font-inter text-sm">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Selling</option>
              <option>Product Type</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hydrationProducts.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#efeff0] mb-4 group-hover:scale-105 transition-transform cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-[#97979d] font-inter">{product.category}</p>
                    <h3 className="text-sm font-semibold text-[#1c1c22] font-inter leading-tight group-hover:text-[#746cad] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm font-bold text-[#1c1c22] font-inter">{product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Show fallback if no hydration products */}
          {hydrationProducts.length === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <div key={product.id} className="group">
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square rounded-lg overflow-hidden bg-[#efeff0] mb-4 group-hover:scale-105 transition-transform cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-[#97979d] font-inter">{product.category}</p>
                      <h3 className="text-sm font-semibold text-[#1c1c22] font-inter leading-tight group-hover:text-[#746cad] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold text-[#1c1c22] font-inter">{product.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Hydration Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Hydration Tips & Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {hydrationTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#efeff0] p-3 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-[#746cad]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1c1c22] font-inter">{tip.title}</h3>
                    </div>
                  </div>
                  <p className="text-[#747474] font-inter mb-4">{tip.description}</p>
                  <ul className="space-y-2">
                    {tip.tips.map((tipItem, idx) => (
                      <li key={idx} className="text-[#747474] font-inter text-sm flex items-start">
                        <span className="w-2 h-2 bg-[#746cad] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        {tipItem}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Routine Guide */}
        <section className="mb-16 bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Daily Hydration Routine
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Morning Routine</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">1</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Gentle Cleanser</span>
                    <p className="text-[#747474] font-inter text-sm">Remove overnight buildup without stripping skin</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Hydrating Toner</span>
                    <p className="text-[#747474] font-inter text-sm">Prep skin with an extra layer of moisture</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Hyaluronic Acid Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Apply to damp skin for maximum absorption</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Moisturizer</span>
                    <p className="text-[#747474] font-inter text-sm">Lock in hydration with appropriate moisturizer</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">5</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">SPF 30+</span>
                    <p className="text-[#747474] font-inter text-sm">Protect from UV damage and dehydration</p>
                  </div>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Evening Routine</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">1</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Double Cleanse</span>
                    <p className="text-[#747474] font-inter text-sm">Remove makeup and daily buildup thoroughly</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Treatment Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Apply any active ingredients first</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Hydrating Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Layer hyaluronic acid or similar humectants</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Rich Moisturizer</span>
                    <p className="text-[#747474] font-inter text-sm">Use a heavier cream for overnight repair</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">5</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Face Oil (Optional)</span>
                    <p className="text-[#747474] font-inter text-sm">Seal everything in with facial oil if needed</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Build a personalized hydration routine with our expert guidance and clinically proven products.
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
