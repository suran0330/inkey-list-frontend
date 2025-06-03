import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import Link from "next/link";
import { Heart, Shield, AlertTriangle, CheckCircle } from "lucide-react";

// Filter products for sensitive skin concerns
const sensitiveProducts = products.filter(product =>
  product.name.toLowerCase().includes('gentle') ||
  product.name.toLowerCase().includes('sensitive') ||
  product.name.toLowerCase().includes('calm') ||
  product.name.toLowerCase().includes('sooth') ||
  product.name.toLowerCase().includes('cleanser') ||
  product.skinTypes?.some(type =>
    type.toLowerCase().includes('sensitive')
  ) ||
  product.concerns?.some(concern =>
    concern.toLowerCase().includes('sensitivity') ||
    concern.toLowerCase().includes('irritation') ||
    concern.toLowerCase().includes('redness')
  ) ||
  product.description.toLowerCase().includes('gentle') ||
  product.description.toLowerCase().includes('calm') ||
  product.description.toLowerCase().includes('sooth') ||
  product.description.toLowerCase().includes('sensitive')
);

const sensitiveTips = [
  {
    icon: Heart,
    title: "Less is More",
    description: "Simplify your routine to avoid overwhelming sensitive skin",
    tips: ["Start with 3-4 basic products", "Introduce one new product at a time", "Wait 2 weeks between new additions", "Focus on gentle, effective formulas"]
  },
  {
    icon: Shield,
    title: "Strengthen Your Barrier",
    description: "A healthy skin barrier is key to reducing sensitivity",
    tips: ["Use ceramide-rich moisturizers", "Avoid over-cleansing", "Include barrier repair ingredients", "Protect from environmental stressors"]
  },
  {
    icon: AlertTriangle,
    title: "Know Your Triggers",
    description: "Identify and avoid ingredients that cause reactions",
    tips: ["Keep a skincare diary", "Patch test all new products", "Avoid known irritants", "Read ingredient lists carefully"]
  },
  {
    icon: CheckCircle,
    title: "Choose Wisely",
    description: "Select products specifically formulated for sensitive skin",
    tips: ["Look for 'fragrance-free' labels", "Choose gentle, pH-balanced formulas", "Avoid high concentrations of actives", "Opt for dermatologist-tested products"]
  }
];

const commonIrritants = [
  {
    category: "Fragrances",
    irritants: ["Essential oils", "Perfumes", "Botanical extracts", "Citrus oils"],
    alternatives: ["Fragrance-free formulas", "Unscented products"]
  },
  {
    category: "Alcohols",
    irritants: ["Denat alcohol", "Ethanol", "Isopropyl alcohol"],
    alternatives: ["Fatty alcohols (cetyl, stearyl)", "Alcohol-free formulas"]
  },
  {
    category: "Harsh Actives",
    irritants: ["High % glycolic acid", "Strong retinoids", "High % vitamin C"],
    alternatives: ["Gentle alternatives (bakuchiol)", "Lower concentrations", "Buffered formulations"]
  },
  {
    category: "Preservatives",
    irritants: ["Formaldehyde releasers", "MIT/CIT", "Parabens (for some)"],
    alternatives: ["Gentle preservative systems", "Natural preservatives"]
  },
  {
    category: "Sulfates",
    irritants: ["SLS", "SLES", "Ammonium lauryl sulfate"],
    alternatives: ["Gentle cleansing agents", "Sulfate-free formulas"]
  }
];

const gentleIngredients = [
  {
    name: "Ceramides",
    benefits: "Restore and strengthen skin barrier function",
    why: "Naturally found in skin, help retain moisture and protect against irritants",
    products: "Moisturizers, cleansers, serums"
  },
  {
    name: "Niacinamide",
    benefits: "Reduce inflammation and strengthen barrier",
    why: "Well-tolerated by most, calms redness and improves skin resilience",
    products: "Serums, moisturizers"
  },
  {
    name: "Hyaluronic Acid",
    benefits: "Provide gentle hydration without irritation",
    why: "Naturally occurring humectant, rarely causes sensitivity",
    products: "Serums, moisturizers"
  },
  {
    name: "Oat Extract (Colloidal Oatmeal)",
    benefits: "Soothe irritation and calm inflammation",
    why: "Anti-inflammatory properties, clinically proven to reduce itching",
    products: "Cleansers, moisturizers"
  },
  {
    name: "Panthenol (Pro-Vitamin B5)",
    benefits: "Calm skin and provide moisture",
    why: "Anti-inflammatory, wound healing properties",
    products: "All product types"
  },
  {
    name: "Allantoin",
    benefits: "Soothe and heal irritated skin",
    why: "Gentle keratolytic, promotes cell regeneration",
    products: "Treatments, moisturizers"
  }
];

const sensitivityTypes = [
  {
    type: "Reactive Sensitive Skin",
    description: "Skin that reacts to products, weather, or stress",
    symptoms: ["Stinging", "Burning", "Redness", "Immediate reactions"],
    approach: "Minimal routine with proven gentle ingredients"
  },
  {
    type: "Acne-Prone Sensitive Skin",
    description: "Sensitive skin that also experiences breakouts",
    symptoms: ["Acne", "Irritation from treatments", "Dryness", "Redness"],
    approach: "Gentle acne treatments, barrier support"
  },
  {
    type: "Rosacea-Prone Skin",
    description: "Chronic condition with persistent redness",
    symptoms: ["Persistent redness", "Visible blood vessels", "Papules/pustules", "Burning sensation"],
    approach: "Anti-inflammatory ingredients, gentle approach"
  },
  {
    type: "Atopic/Eczema-Prone Skin",
    description: "Compromised barrier function and chronic inflammation",
    symptoms: ["Dryness", "Itching", "Flaking", "Rough texture"],
    approach: "Intensive barrier repair, minimal ingredients"
  }
];

export default function SensitivePage() {
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
          <span className="text-[#1c1c22]">Sensitive Skin</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-[#efeff0] p-3 rounded-lg mr-4">
              <Heart className="h-8 w-8 text-[#746cad]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] font-lato">
              Sensitive Skin
            </h1>
          </div>
          <p className="text-xl text-[#747474] max-w-3xl font-inter">
            Gentle, effective skincare for reactive skin. Our sensitive skin collection features
            fragrance-free, dermatologist-tested formulas that calm, soothe, and strengthen your skin barrier.
          </p>
        </div>

        {/* About Sensitive Skin */}
        <section className="mb-12">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              Understanding Sensitive Skin
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Compromised Barrier</h3>
                <p className="text-[#747474] font-inter text-sm">
                  A weakened skin barrier allows irritants to penetrate more easily, causing reactions.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Heightened Reactivity</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Sensitive skin has a lower threshold for irritation from products, environment, or stress.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Individual Triggers</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Everyone's triggers are different - what irritates one person may be fine for another.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Sensitive Skin */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Types of Sensitive Skin
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sensitivityTypes.map((type, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                <h3 className="font-bold text-[#1c1c22] text-lg mb-3 font-inter">{type.type}</h3>
                <p className="text-[#747474] font-inter text-sm mb-4">{type.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#1c1c22] mb-2 font-inter text-sm">Common Symptoms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {type.symptoms.map((symptom, idx) => (
                      <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-inter">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#efeff0] rounded p-3">
                  <h4 className="font-semibold text-[#1c1c22] mb-1 font-inter text-sm">Recommended Approach:</h4>
                  <p className="text-[#747474] font-inter text-xs">{type.approach}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Irritants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Common Irritants to Avoid
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {commonIrritants.map((category, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                <h3 className="font-bold text-[#1c1c22] text-lg mb-3 font-inter">{category.category}</h3>

                <div className="mb-4">
                  <h4 className="font-semibold text-red-700 mb-2 font-inter text-sm">Avoid:</h4>
                  <ul className="space-y-1">
                    {category.irritants.map((irritant, idx) => (
                      <li key={idx} className="text-[#747474] font-inter text-xs flex items-start">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        {irritant}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700 mb-2 font-inter text-sm">Choose Instead:</h4>
                  <ul className="space-y-1">
                    {category.alternatives.map((alternative, idx) => (
                      <li key={idx} className="text-[#747474] font-inter text-xs flex items-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                        {alternative}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gentle Ingredients */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Gentle, Skin-Loving Ingredients
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gentleIngredients.map((ingredient, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">{ingredient.name}</h3>
                <p className="text-[#746cad] font-inter text-sm font-semibold mb-3">{ingredient.benefits}</p>

                <div className="mb-3">
                  <h4 className="font-semibold text-[#1c1c22] mb-1 font-inter text-xs">Why It Works:</h4>
                  <p className="text-[#747474] font-inter text-xs">{ingredient.why}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#1c1c22] mb-1 font-inter text-xs">Found In:</h4>
                  <p className="text-[#97979d] font-inter text-xs">{ingredient.products}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products for Sensitive Skin */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] font-lato">
              Sensitive Skin Products ({sensitiveProducts.length} products)
            </h2>
            <select className="border border-[#c1c0cb] rounded-lg px-4 py-2 font-inter text-sm">
              <option>Sort by: Gentleness</option>
              <option>Product Type</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Selling</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sensitiveProducts.map((product) => (
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

          {/* Show fallback if no sensitive products */}
          {sensitiveProducts.length === 0 && (
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

        {/* Sensitive Skin Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Sensitive Skin Care Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {sensitiveTips.map((tip, index) => {
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

        {/* Patch Testing Guide */}
        <section className="mb-16 bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            How to Patch Test New Products
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Choose Your Spot</h3>
              <p className="text-[#747474] font-inter text-sm">Apply a small amount to your inner wrist or behind your ear.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Wait & Watch</h3>
              <p className="text-[#747474] font-inter text-sm">Leave for 24-48 hours and check for any reactions.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Face Test</h3>
              <p className="text-[#747474] font-inter text-sm">If no reaction, test on a small area of your face.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#746cad] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Full Use</h3>
              <p className="text-[#747474] font-inter text-sm">After 48 hours with no reaction, you can use the product normally.</p>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h4 className="font-bold text-[#1c1c22] mb-2 font-inter text-sm">Stop Using if You Experience:</h4>
            <ul className="grid md:grid-cols-2 gap-2 text-[#747474] font-inter text-sm">
              <li>• Redness or inflammation</li>
              <li>• Burning or stinging</li>
              <li>• Itching or tingling</li>
              <li>• Swelling or bumps</li>
              <li>• Peeling or flaking</li>
              <li>• Any unusual sensations</li>
            </ul>
          </div>
        </section>

        {/* Gentle Routine Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Gentle Daily Routine
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Morning Routine</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">1</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Gentle Cleanser</span>
                    <p className="text-[#747474] font-inter text-sm">Fragrance-free, pH-balanced formula</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Calming Serum (Optional)</span>
                    <p className="text-[#747474] font-inter text-sm">Niacinamide or hyaluronic acid</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Gentle Moisturizer</span>
                    <p className="text-[#747474] font-inter text-sm">Ceramide-rich, fragrance-free</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Mineral SPF 30+</span>
                    <p className="text-[#747474] font-inter text-sm">Zinc oxide or titanium dioxide</p>
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
                    <span className="font-semibold text-[#1c1c22] font-inter">Gentle Cleanser</span>
                    <p className="text-[#747474] font-inter text-sm">Same as morning, double cleanse if needed</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Treatment (2-3x/week)</span>
                    <p className="text-[#747474] font-inter text-sm">Gentle retinol or bakuchiol</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Hydrating Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Hyaluronic acid or ceramides</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Rich Night Cream</span>
                    <p className="text-[#747474] font-inter text-sm">Barrier-repairing formula</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Gentle Care for Sensitive Skin
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Build a routine that nurtures and protects your sensitive skin with our gentle, effective formulas.
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
