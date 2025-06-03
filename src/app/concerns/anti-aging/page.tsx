import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import Link from "next/link";
import { Zap, Sun, Clock, Shield } from "lucide-react";

// Filter products for anti-aging concerns
const antiAgingProducts = products.filter(product =>
  product.name.toLowerCase().includes('retinol') ||
  product.name.toLowerCase().includes('peptide') ||
  product.name.toLowerCase().includes('vitamin c') ||
  product.name.toLowerCase().includes('collagen') ||
  product.name.toLowerCase().includes('eye cream') ||
  product.concerns?.some(concern =>
    concern.toLowerCase().includes('anti-aging') ||
    concern.toLowerCase().includes('fine lines') ||
    concern.toLowerCase().includes('aging') ||
    concern.toLowerCase().includes('wrinkles') ||
    concern.toLowerCase().includes('firmness')
  ) ||
  product.description.toLowerCase().includes('anti-aging') ||
  product.description.toLowerCase().includes('retinol') ||
  product.description.toLowerCase().includes('fine lines') ||
  product.description.toLowerCase().includes('wrinkles') ||
  product.description.toLowerCase().includes('firmness')
);

const antiAgingTips = [
  {
    icon: Sun,
    title: "Sun Protection is Essential",
    description: "Preventing UV damage is the most effective anti-aging strategy",
    tips: ["Use SPF 30+ daily, even indoors", "Reapply every 2 hours", "Wear protective clothing", "Seek shade during peak hours"]
  },
  {
    icon: Zap,
    title: "Start with Gentle Actives",
    description: "Introduce anti-aging ingredients slowly to avoid irritation",
    tips: ["Begin with 2-3 times per week", "Use lowest effective concentration", "Always patch test first", "Increase frequency gradually"]
  },
  {
    icon: Clock,
    title: "Consistency Over Intensity",
    description: "Regular use of proven ingredients yields better results than harsh treatments",
    tips: ["Stick to your routine daily", "Results take 8-12 weeks minimum", "Don't switch products too quickly", "Patience is key to success"]
  },
  {
    icon: Shield,
    title: "Support Your Skin Barrier",
    description: "A healthy barrier is essential for effective anti-aging",
    tips: ["Use gentle, non-stripping cleansers", "Include ceramides and niacinamide", "Avoid over-exfoliating", "Keep skin well-moisturized"]
  }
];

const ageGroups = [
  {
    age: "20s - Prevention",
    focus: "Building good habits and preventing damage",
    products: ["Vitamin C Serum", "Gentle Retinol", "Moisturizer", "SPF"],
    concerns: ["First signs of aging", "Sun damage prevention", "Acne and texture"]
  },
  {
    age: "30s - Early Treatment",
    focus: "Addressing first signs while preventing future damage",
    products: ["Retinol Serum", "Peptide Cream", "Eye Cream", "Antioxidant Serum"],
    concerns: ["Fine lines", "Loss of elasticity", "Uneven tone", "Dullness"]
  },
  {
    age: "40s - Active Correction",
    focus: "Targeting visible signs of aging with proven actives",
    products: ["Advanced Retinol", "Peptide Complex", "Firming Cream", "Brightening Serum"],
    concerns: ["Deeper wrinkles", "Sagging skin", "Age spots", "Texture changes"]
  },
  {
    age: "50+ - Comprehensive Care",
    focus: "Maximizing skin health and addressing advanced aging",
    products: ["Retinol + Peptides", "Rich Moisturizer", "Neck Cream", "Repair Serum"],
    concerns: ["Deep wrinkles", "Volume loss", "Pigmentation", "Thinning skin"]
  }
];

export default function AntiAgingPage() {
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
          <span className="text-[#1c1c22]">Anti-Aging</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-[#efeff0] p-3 rounded-lg mr-4">
              <Zap className="h-8 w-8 text-[#746cad]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] font-lato">
              Anti-Aging
            </h1>
          </div>
          <p className="text-xl text-[#747474] max-w-3xl font-inter">
            Turn back the clock with scientifically proven anti-aging ingredients. From retinol to peptides,
            discover products that target fine lines, wrinkles, and loss of firmness for visibly younger-looking skin.
          </p>
        </div>

        {/* About Anti-Aging */}
        <section className="mb-12">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              The Science of Aging Skin
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Collagen Loss</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Starting in your 20s, collagen production decreases by about 1% per year, leading to fine lines and sagging.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Cellular Turnover</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Skin cell renewal slows down, causing dullness and rough texture as we age.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Environmental Damage</h3>
                <p className="text-[#747474] font-inter text-sm">
                  UV exposure, pollution, and lifestyle factors accelerate aging through free radical damage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Anti-Aging Ingredients */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Proven Anti-Aging Ingredients
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Retinol</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                The gold standard for anti-aging. Stimulates collagen production and accelerates cell turnover.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Fine lines, texture, uneven tone</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Vitamin C</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Powerful antioxidant that protects against free radicals and brightens skin.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Sun damage, dullness, prevention</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Peptides</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Signal molecules that help stimulate collagen production and improve skin firmness.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Loss of firmness, wrinkles</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Bakuchiol</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Plant-based retinol alternative that's gentler but still effective for anti-aging.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Sensitive skin, pregnancy-safe</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">AHA/BHA</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Chemical exfoliants that remove dead skin cells and improve texture and radiance.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Texture, dullness, surface lines</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Niacinamide</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Improves skin elasticity, reduces redness, and helps maintain a healthy skin barrier.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Overall skin health, gentleness</p>
            </div>
          </div>
        </section>

        {/* Anti-Aging by Age */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Anti-Aging by Age Group
          </h2>
          <div className="space-y-6">
            {ageGroups.map((group, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="font-bold text-[#746cad] text-lg mb-2 font-inter">{group.age}</h3>
                    <p className="text-[#747474] font-inter text-sm">{group.focus}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c22] mb-2 font-inter text-sm">Key Products</h4>
                    <ul className="space-y-1">
                      {group.products.map((product, idx) => (
                        <li key={idx} className="text-[#747474] font-inter text-xs">• {product}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1c1c22] mb-2 font-inter text-sm">Main Concerns</h4>
                    <ul className="space-y-1">
                      {group.concerns.map((concern, idx) => (
                        <li key={idx} className="text-[#747474] font-inter text-xs">• {concern}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-[#746cad] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products for Anti-Aging */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] font-lato">
              Anti-Aging Products ({antiAgingProducts.length} products)
            </h2>
            <select className="border border-[#c1c0cb] rounded-lg px-4 py-2 font-inter text-sm">
              <option>Sort by: Recommended</option>
              <option>Strength: Beginner to Advanced</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Selling</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {antiAgingProducts.map((product) => (
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

          {/* Show fallback if no anti-aging products */}
          {antiAgingProducts.length === 0 && (
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

        {/* Anti-Aging Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Anti-Aging Tips & Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {antiAgingTips.map((tip, index) => {
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
            Essential Anti-Aging Routine
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Morning Routine</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">1</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Gentle Cleanser</span>
                    <p className="text-[#747474] font-inter text-sm">Start with a non-stripping cleanser</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Vitamin C Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Antioxidant protection for the day</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Eye Cream</span>
                    <p className="text-[#747474] font-inter text-sm">Target delicate eye area concerns</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Moisturizer</span>
                    <p className="text-[#747474] font-inter text-sm">Hydrate and protect skin barrier</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">5</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">SPF 30+</span>
                    <p className="text-[#747474] font-inter text-sm">Most important anti-aging step</p>
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
                    <p className="text-[#747474] font-inter text-sm">Remove all makeup and SPF thoroughly</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Retinol Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Apply 2-3x per week to start</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Hydrating Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Layer moisture before cream</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Eye Cream</span>
                    <p className="text-[#747474] font-inter text-sm">Specialized treatment for eye area</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">5</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Night Moisturizer</span>
                    <p className="text-[#747474] font-inter text-sm">Rich cream for overnight repair</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Start Your Anti-Aging Journey
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Build an effective anti-aging routine with clinically proven ingredients and expert guidance.
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
