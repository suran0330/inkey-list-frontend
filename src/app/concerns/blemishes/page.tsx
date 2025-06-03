import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import Link from "next/link";
import { Target, Shield, AlertCircle, CheckCircle } from "lucide-react";

// Filter products for blemishes/acne concerns
const blemishProducts = products.filter(product =>
  product.name.toLowerCase().includes('salicylic') ||
  product.name.toLowerCase().includes('niacinamide') ||
  product.name.toLowerCase().includes('zinc') ||
  product.name.toLowerCase().includes('bha') ||
  product.name.toLowerCase().includes('acne') ||
  product.name.toLowerCase().includes('blemish') ||
  product.name.toLowerCase().includes('cleanser') ||
  product.concerns?.some(concern =>
    concern.toLowerCase().includes('acne') ||
    concern.toLowerCase().includes('blemish') ||
    concern.toLowerCase().includes('pore') ||
    concern.toLowerCase().includes('oil') ||
    concern.toLowerCase().includes('breakout')
  ) ||
  product.description.toLowerCase().includes('acne') ||
  product.description.toLowerCase().includes('blemish') ||
  product.description.toLowerCase().includes('oil control') ||
  product.description.toLowerCase().includes('salicylic') ||
  product.description.toLowerCase().includes('niacinamide')
);

const blemishTips = [
  {
    icon: Target,
    title: "Target Root Causes",
    description: "Address excess oil, clogged pores, and bacteria for clearer skin",
    tips: ["Use BHA to unclog pores", "Control oil with niacinamide", "Gentle exfoliation 2-3x/week", "Don't over-dry your skin"]
  },
  {
    icon: Shield,
    title: "Protect Your Barrier",
    description: "Maintain skin health while treating blemishes",
    tips: ["Don't skip moisturizer", "Use gentle, non-comedogenic products", "Avoid harsh scrubbing", "Include barrier-repairing ingredients"]
  },
  {
    icon: AlertCircle,
    title: "Start Slowly",
    description: "Introduce acne treatments gradually to avoid irritation",
    tips: ["Begin with lower concentrations", "Use 2-3 times per week initially", "Watch for over-drying or irritation", "Increase frequency gradually"]
  },
  {
    icon: CheckCircle,
    title: "Be Patient & Consistent",
    description: "Acne treatment takes time - stick with your routine",
    tips: ["Results take 6-12 weeks", "Don't switch products too quickly", "Maintain routine during clear periods", "Track progress with photos"]
  }
];

const acneTypes = [
  {
    type: "Blackheads & Whiteheads",
    description: "Non-inflammatory acne caused by clogged pores",
    causes: ["Excess oil production", "Dead skin cell buildup", "Hormonal changes"],
    treatments: ["BHA (Salicylic Acid)", "Gentle exfoliation", "Oil cleansing"],
    severity: "Mild"
  },
  {
    type: "Papules & Pustules",
    description: "Inflammatory acne with red, raised bumps",
    causes: ["Bacterial infection", "Inflammation", "Clogged pores"],
    treatments: ["Benzoyl Peroxide", "Niacinamide", "Gentle cleansing"],
    severity: "Moderate"
  },
  {
    type: "Hormonal Acne",
    description: "Breakouts caused by hormonal fluctuations",
    causes: ["Hormonal imbalances", "Menstrual cycle", "Stress"],
    treatments: ["Consistent routine", "Gentle actives", "Professional help if severe"],
    severity: "Variable"
  },
  {
    type: "Cystic Acne",
    description: "Deep, painful bumps under the skin",
    causes: ["Severe inflammation", "Deep bacterial infection", "Genetics"],
    treatments: ["Professional treatment recommended", "Gentle home care", "Avoid picking"],
    severity: "Severe"
  }
];

const mythBusters = [
  {
    myth: "Acne is caused by poor hygiene",
    truth: "Over-cleansing can actually worsen acne by irritating the skin and disrupting the barrier."
  },
  {
    myth: "You should dry out acne completely",
    truth: "Overly drying treatments can lead to more oil production and irritation. Balance is key."
  },
  {
    myth: "Moisturizer will make acne worse",
    truth: "The right moisturizer helps maintain barrier function and can actually improve acne treatment."
  },
  {
    myth: "Acne only affects teenagers",
    truth: "Adult acne is very common, especially in women due to hormonal fluctuations."
  },
  {
    myth: "Popping pimples helps them heal faster",
    truth: "Picking and popping can lead to scarring, infection, and more breakouts."
  },
  {
    myth: "Sun exposure clears acne",
    truth: "While it may temporarily dry out blemishes, sun damage and thickened skin can worsen acne long-term."
  }
];

export default function BlemishesPage() {
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
          <span className="text-[#1c1c22]">Blemishes</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-[#efeff0] p-3 rounded-lg mr-4">
              <Target className="h-8 w-8 text-[#746cad]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] font-lato">
              Blemishes & Acne
            </h1>
          </div>
          <p className="text-xl text-[#747474] max-w-3xl font-inter">
            Clear your skin with targeted treatments that address the root causes of blemishes.
            From gentle BHAs to oil-controlling niacinamide, find effective solutions for clearer, healthier skin.
          </p>
        </div>

        {/* About Blemishes */}
        <section className="mb-12">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              Understanding Blemishes
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Clogged Pores</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Dead skin cells and excess oil block pores, creating the perfect environment for bacteria to thrive.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Inflammation</h3>
                <p className="text-[#747474] font-inter text-sm">
                  The immune system responds to bacteria, causing redness, swelling, and painful bumps.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Multiple Factors</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Hormones, genetics, lifestyle, and skincare choices all play a role in blemish formation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Acne */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Types of Acne & How to Treat Them
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {acneTypes.map((type, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-[#1c1c22] text-lg font-inter">{type.type}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    type.severity === 'Mild' ? 'bg-green-100 text-green-800' :
                    type.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    type.severity === 'Variable' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {type.severity}
                  </span>
                </div>
                <p className="text-[#747474] font-inter text-sm mb-4">{type.description}</p>

                <div className="mb-4">
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
                  <h4 className="font-semibold text-[#1c1c22] mb-2 font-inter text-sm">Recommended Treatments:</h4>
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
            ))}
          </div>
        </section>

        {/* Key Ingredients for Blemishes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Proven Blemish-Fighting Ingredients
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Salicylic Acid (BHA)</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Penetrates deep into pores to dissolve oil and dead skin cells that cause blackheads and whiteheads.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Blackheads, whiteheads, clogged pores</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Niacinamide</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Regulates oil production, reduces inflammation, and helps minimize the appearance of pores.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Oil control, inflammation, large pores</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Zinc</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Has anti-inflammatory and antimicrobial properties that help calm existing breakouts.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Inflammatory acne, redness</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Benzoyl Peroxide</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Kills acne-causing bacteria and helps prevent new breakouts from forming.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Active breakouts, bacterial acne</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Tea Tree Oil</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Natural antimicrobial that can help reduce acne-causing bacteria without over-drying.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Spot treatments, sensitive skin</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6">
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Retinol</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Increases cell turnover to prevent pore clogging and improve skin texture over time.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Prevention, post-acne marks</p>
            </div>
          </div>
        </section>

        {/* Products for Blemishes */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] font-lato">
              Blemish-Fighting Products ({blemishProducts.length} products)
            </h2>
            <select className="border border-[#c1c0cb] rounded-lg px-4 py-2 font-inter text-sm">
              <option>Sort by: Recommended</option>
              <option>Severity: Mild to Severe</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Product Type</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blemishProducts.map((product) => (
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

          {/* Show fallback if no blemish products */}
          {blemishProducts.length === 0 && (
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

        {/* Myth Busters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Acne Myths vs. Facts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mythBusters.map((item, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    <h3 className="font-bold text-red-700 font-inter text-sm">MYTH</h3>
                  </div>
                  <p className="text-[#747474] font-inter text-sm">{item.myth}</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <h3 className="font-bold text-green-700 font-inter text-sm">FACT</h3>
                  </div>
                  <p className="text-[#747474] font-inter text-sm">{item.truth}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blemish Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Blemish-Fighting Tips & Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blemishTips.map((tip, index) => {
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
            Blemish-Fighting Routine
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Morning Routine</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">1</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Gentle Cleanser</span>
                    <p className="text-[#747474] font-inter text-sm">Use a gentle, non-comedogenic cleanser</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Niacinamide Serum</span>
                    <p className="text-[#747474] font-inter text-sm">Control oil and reduce inflammation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Lightweight Moisturizer</span>
                    <p className="text-[#747474] font-inter text-sm">Non-comedogenic, oil-free formula</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">SPF 30+</span>
                    <p className="text-[#747474] font-inter text-sm">Non-comedogenic sunscreen</p>
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
                    <p className="text-[#747474] font-inter text-sm">Remove makeup and SPF thoroughly</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">2</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">BHA Treatment</span>
                    <p className="text-[#747474] font-inter text-sm">Salicylic acid 2-3x per week</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">3</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Spot Treatment</span>
                    <p className="text-[#747474] font-inter text-sm">Apply to active blemishes only</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#746cad] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 font-inter">4</span>
                  <div>
                    <span className="font-semibold text-[#1c1c22] font-inter">Oil-Free Moisturizer</span>
                    <p className="text-[#747474] font-inter text-sm">Maintain hydration without clogging</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Clear Skin Starts Here
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Build an effective blemish-fighting routine with gentle yet effective treatments.
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
