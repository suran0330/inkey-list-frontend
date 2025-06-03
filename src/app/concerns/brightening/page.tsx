import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import Link from "next/link";
import { Sun, Sparkles, Shield, Zap } from "lucide-react";

// Filter products for brightening concerns
const brighteningProducts = products.filter(product =>
  product.name.toLowerCase().includes('vitamin c') ||
  product.name.toLowerCase().includes('brightening') ||
  product.name.toLowerCase().includes('glow') ||
  product.name.toLowerCase().includes('radiance') ||
  product.name.toLowerCase().includes('serum') ||
  product.concerns?.some(concern =>
    concern.toLowerCase().includes('dullness') ||
    concern.toLowerCase().includes('uneven tone') ||
    concern.toLowerCase().includes('dark spots') ||
    concern.toLowerCase().includes('brightening')
  ) ||
  product.description.toLowerCase().includes('brighten') ||
  product.description.toLowerCase().includes('glow') ||
  product.description.toLowerCase().includes('radiance') ||
  product.description.toLowerCase().includes('vitamin c') ||
  product.description.toLowerCase().includes('luminous')
);

const brighteningTips = [
  {
    icon: Sun,
    title: "Prevention is Key",
    description: "Protect against new pigmentation with daily sun protection",
    tips: ["Use SPF 30+ every day", "Reapply every 2 hours", "Wear protective clothing", "Seek shade during peak hours"]
  },
  {
    icon: Sparkles,
    title: "Layer Your Actives",
    description: "Combine multiple brightening ingredients for maximum effect",
    tips: ["Morning: Vitamin C serum", "Evening: Gentle retinol or AHA", "Use niacinamide for support", "Don't mix incompatible actives"]
  },
  {
    icon: Shield,
    title: "Be Gentle",
    description: "Avoid irritation that can worsen pigmentation",
    tips: ["Start with lower concentrations", "Introduce one active at a time", "Use a gentle cleanser", "Always moisturize after actives"]
  },
  {
    icon: Zap,
    title: "Consistency Wins",
    description: "Results take time - stick with your routine",
    tips: ["Use products daily as directed", "Results visible in 6-12 weeks", "Don't switch products too quickly", "Take progress photos"]
  }
];

const pigmentationTypes = [
  {
    type: "Sun Spots/Age Spots",
    description: "Brown spots caused by UV damage over time",
    causes: ["Chronic sun exposure", "Aging", "Cumulative UV damage"],
    treatments: ["Vitamin C", "Retinol", "AHA/BHA", "Professional treatments"],
    prevention: "Daily SPF use"
  },
  {
    type: "Melasma",
    description: "Symmetrical brown patches, often hormonal",
    causes: ["Hormonal changes", "Pregnancy", "Birth control", "Sun exposure"],
    treatments: ["Gentle vitamin C", "Kojic acid", "Professional guidance", "Strict sun protection"],
    prevention: "Hormone management + SPF"
  },
  {
    type: "Post-Inflammatory Hyperpigmentation",
    description: "Dark spots left after acne or injury",
    causes: ["Acne healing", "Skin injury", "Inflammation", "Picking at skin"],
    treatments: ["Niacinamide", "Vitamin C", "Gentle retinol", "AHA"],
    prevention: "Don't pick + treat acne gently"
  },
  {
    type: "General Dullness",
    description: "Overall lack of radiance and uneven tone",
    causes: ["Dead skin buildup", "Poor circulation", "Dehydration", "Environmental stress"],
    treatments: ["Gentle exfoliation", "Vitamin C", "Hydrating serums", "Face massage"],
    prevention: "Consistent routine + hydration"
  }
];

const brighteningIngredients = [
  {
    name: "Vitamin C (L-Ascorbic Acid)",
    benefits: "Antioxidant protection, collagen production, brightening",
    concentration: "10-20%",
    bestFor: "Sun damage, prevention, overall glow",
    tips: "Use in the morning, start with lower %"
  },
  {
    name: "Vitamin C (Magnesium Ascorbyl Phosphate)",
    benefits: "Gentler vitamin C derivative, stable formula",
    concentration: "5-15%",
    bestFor: "Sensitive skin, beginner-friendly",
    tips: "Less irritating than L-ascorbic acid"
  },
  {
    name: "Kojic Acid",
    benefits: "Natural skin lightener, anti-fungal properties",
    concentration: "1-4%",
    bestFor: "Stubborn dark spots, melasma",
    tips: "Can be sensitizing, use gradually"
  },
  {
    name: "Alpha Arbutin",
    benefits: "Gentle tyrosinase inhibitor, even skin tone",
    concentration: "1-2%",
    bestFor: "Sensitive skin, gradual brightening",
    tips: "Very gentle, safe for daily use"
  },
  {
    name: "Azelaic Acid",
    benefits: "Brightening, anti-inflammatory, acne-fighting",
    concentration: "10-20%",
    bestFor: "Acne + pigmentation, rosacea",
    tips: "Multi-functional, gentle exfoliant"
  },
  {
    name: "Licorice Root Extract",
    benefits: "Natural skin lightener, anti-inflammatory",
    concentration: "Variable",
    bestFor: "Sensitive skin, natural approach",
    tips: "Often combined with other brighteners"
  }
];

export default function BrighteningPage() {
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
          <span className="text-[#1c1c22]">Brightening</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-[#efeff0] p-3 rounded-lg mr-4">
              <Sparkles className="h-8 w-8 text-[#746cad]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] font-lato">
              Brightening
            </h1>
          </div>
          <p className="text-xl text-[#747474] max-w-3xl font-inter">
            Achieve a radiant, even complexion with targeted brightening treatments. From vitamin C serums
            to gentle exfoliants, discover products that fade dark spots and restore your natural glow.
          </p>
        </div>

        {/* About Brightening */}
        <section className="mb-12">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              Understanding Skin Pigmentation
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Melanin Production</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Dark spots form when melanocytes produce excess melanin in response to triggers like UV or inflammation.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Cell Turnover</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Slow cell renewal means pigmented cells stay on the surface longer, making spots appear more persistent.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Multi-Factorial</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Genetics, hormones, sun exposure, and inflammation all contribute to uneven skin tone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Pigmentation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Types of Pigmentation & How to Address Them
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pigmentationTypes.map((type, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                <h3 className="font-bold text-[#1c1c22] text-lg mb-3 font-inter">{type.type}</h3>
                <p className="text-[#747474] font-inter text-sm mb-4">{type.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-[#1c1c22] mb-2 font-inter text-sm">Common Causes:</h4>
                    <ul className="space-y-1">
                      {type.causes.map((cause, idx) => (
                        <li key={idx} className="text-[#747474] font-inter text-xs flex items-start">
                          <span className="w-1.5 h-1.5 bg-[#746cad] rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1c1c22] mb-2 font-inter text-sm">Treatments:</h4>
                    <ul className="space-y-1">
                      {type.treatments.map((treatment, idx) => (
                        <li key={idx} className="text-[#746cad] font-inter text-xs flex items-start">
                          <span className="w-1.5 h-1.5 bg-[#746cad] rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-[#efeff0] rounded p-3">
                  <h4 className="font-semibold text-[#1c1c22] mb-1 font-inter text-sm">Prevention:</h4>
                  <p className="text-[#747474] font-inter text-xs">{type.prevention}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brightening Ingredients */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Proven Brightening Ingredients
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brighteningIngredients.map((ingredient, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter text-sm">{ingredient.name}</h3>
                <p className="text-[#747474] font-inter text-xs mb-3">{ingredient.benefits}</p>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-[#97979d] font-inter text-xs">Concentration:</span>
                    <span className="text-[#746cad] font-inter text-xs font-semibold">{ingredient.concentration}</span>
                  </div>
                  <div>
                    <span className="text-[#97979d] font-inter text-xs">Best for: </span>
                    <span className="text-[#1c1c22] font-inter text-xs">{ingredient.bestFor}</span>
                  </div>
                </div>

                <div className="bg-[#efeff0] rounded p-3">
                  <span className="text-[#746cad] font-inter text-xs font-semibold">Tip: </span>
                  <span className="text-[#747474] font-inter text-xs">{ingredient.tips}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products for Brightening */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] font-lato">
              Brightening Products ({brighteningProducts.length} products)
            </h2>
            <select className="border border-[#c1c0cb] rounded-lg px-4 py-2 font-inter text-sm">
              <option>Sort by: Recommended</option>
              <option>Strength: Gentle to Strong</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Product Type</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brighteningProducts.map((product) => (
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

          {/* Show fallback if no brightening products */}
          {brighteningProducts.length === 0 && (
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

        {/* Brightening Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Brightening Tips & Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {brighteningTips.map((tip, index) => {
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
            Brightening Routine Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Morning Routine</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">1</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Gentle Cleanser</span>
                    <p className="text-[#747474] font-inter text-sm">Start with a mild, non-irritating cleanser</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Vitamin C Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Apply antioxidant protection and brightening</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Moisturizer</span>
                    <p className="text-[#747474] font-inter text-sm">Hydrate and support skin barrier</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">SPF 30+</span>
                    <p className="text-[#747474] font-inter text-sm">Essential for preventing new pigmentation</p>
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
                    <p className="text-[#747474] font-inter text-sm">Remove SPF and daily buildup thoroughly</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">AHA/Retinol (Alternate)</span>
                    <p className="text-[#747474] font-inter text-sm">Exfoliate or boost cell turnover</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Brightening Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Alpha arbutin or kojic acid treatment</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Night Moisturizer</span>
                    <p className="text-[#747474] font-inter text-sm">Rich cream for overnight repair</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h4 className="font-bold text-[#1c1c22] mb-2 font-inter text-sm">Important Notes:</h4>
            <ul className="space-y-1 text-[#747474] font-inter text-sm">
              <li>• Always patch test new brightening products</li>
              <li>• Start with one active ingredient at a time</li>
              <li>• Some ingredients increase sun sensitivity</li>
              <li>• Results typically visible after 6-12 weeks of consistent use</li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Reveal Your Natural Radiance
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Build an effective brightening routine with gentle yet powerful ingredients that deliver visible results.
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
