import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Beaker, Shield, Zap, Droplets } from "lucide-react";

const keyIngredients = [
  {
    name: "Hyaluronic Acid",
    category: "Hydration",
    icon: Droplets,
    benefits: ["Intense hydration", "Plumps skin", "Reduces fine lines"],
    description: "A powerful humectant that can hold up to 1000 times its weight in water, providing deep hydration to all skin types.",
    suitableFor: "All skin types, especially dry and dehydrated skin",
    products: ["Hyaluronic Acid Serum", "Marine Hyaluronics", "Natural Moisturizing Factors"]
  },
  {
    name: "Retinol",
    category: "Anti-Aging",
    icon: Zap,
    benefits: ["Reduces wrinkles", "Improves texture", "Increases cell turnover"],
    description: "A vitamin A derivative that promotes cell renewal and collagen production, helping to reduce signs of aging.",
    suitableFor: "Normal to oily skin, not recommended for sensitive skin or pregnancy",
    products: ["Retinol Eye Cream", "Granactive Retinoid", "Retinol Serum"]
  },
  {
    name: "Niacinamide",
    category: "Multi-Purpose",
    icon: Shield,
    benefits: ["Controls oil", "Minimizes pores", "Reduces redness"],
    description: "A form of vitamin B3 that regulates sebum production and strengthens the skin barrier.",
    suitableFor: "All skin types, especially oily and acne-prone skin",
    products: ["Niacinamide 10% + Zinc 1%", "Multi-Biome Moisturizer"]
  },
  {
    name: "Salicylic Acid",
    category: "Exfoliation",
    icon: Beaker,
    benefits: ["Unclogs pores", "Reduces acne", "Smooths texture"],
    description: "A beta-hydroxy acid that penetrates deep into pores to remove dead skin cells and excess oil.",
    suitableFor: "Oily and acne-prone skin",
    products: ["Salicylic Acid Cleanser", "BHA Exfoliant", "Spot Treatment"]
  }
];

const ingredientCategories = [
  {
    name: "Hydrating Ingredients",
    description: "Attract and retain moisture in the skin",
    examples: ["Hyaluronic Acid", "Glycerin", "Ceramides", "Squalane"]
  },
  {
    name: "Anti-Aging Actives",
    description: "Target signs of aging and promote cell renewal",
    examples: ["Retinol", "Peptides", "Vitamin C", "AHA/BHA"]
  },
  {
    name: "Soothing Agents",
    description: "Calm irritation and reduce inflammation",
    examples: ["Niacinamide", "Allantoin", "Panthenol", "Aloe Vera"]
  },
  {
    name: "Protective Antioxidants",
    description: "Shield skin from environmental damage",
    examples: ["Vitamin E", "Green Tea", "Resveratrol", "Ferulic Acid"]
  }
];

export default function IngredientsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <nav className="text-sm text-[#97979d] font-inter">
            <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/about" className="hover:text-[#1c1c22]">About</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1c1c22]">Ingredients</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
              Know Your Ingredients
            </h1>
            <p className="text-xl text-[#747474] max-w-2xl mx-auto font-inter">
              Understanding what goes on your skin shouldn't require a chemistry degree. We break down the science behind effective skincare.
            </p>
          </div>
        </section>

        {/* Key Ingredients */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Star Ingredients
            </h2>
            <div className="space-y-12">
              {keyIngredients.map((ingredient, index) => {
                const IconComponent = ingredient.icon;
                return (
                  <div key={index} className="border border-[#c1c0cb] rounded-lg p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="bg-[#efeff0] p-3 rounded-lg mr-4">
                            <IconComponent className="h-6 w-6 text-[#746cad]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[#1c1c22] font-inter">{ingredient.name}</h3>
                            <p className="text-[#746cad] font-inter text-sm">{ingredient.category}</p>
                          </div>
                        </div>
                        <p className="text-[#747474] font-inter leading-relaxed">{ingredient.description}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#1c1c22] mb-3 font-inter">Key Benefits</h4>
                        <ul className="space-y-2">
                          {ingredient.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-[#747474] font-inter text-sm flex items-center">
                              <span className="w-2 h-2 bg-[#746cad] rounded-full mr-3"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-bold text-[#1c1c22] mt-6 mb-3 font-inter">Suitable For</h4>
                        <p className="text-[#747474] font-inter text-sm">{ingredient.suitableFor}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-[#1c1c22] mb-3 font-inter">Find It In</h4>
                        <ul className="space-y-2">
                          {ingredient.products.map((product, idx) => (
                            <li key={idx} className="text-[#747474] font-inter text-sm">
                              • {product}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ingredient Categories */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
              Ingredient Categories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {ingredientCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-[#c1c0cb]">
                  <h3 className="text-xl font-bold text-[#1c1c22] mb-3 font-inter">{category.name}</h3>
                  <p className="text-[#747474] font-inter mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="bg-[#efeff0] text-[#746cad] px-3 py-1 rounded-full text-sm font-inter"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-8 font-lato">
              Our Ingredient Philosophy
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Evidence-Based</h3>
                <p className="text-[#747474] font-inter leading-relaxed mb-6">
                  Every ingredient we use is backed by scientific research. We don't chase trends –
                  we stick to what's proven to work effectively.
                </p>

                <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Optimal Concentrations</h3>
                <p className="text-[#747474] font-inter leading-relaxed">
                  We formulate with ingredients at concentrations that are both effective and well-tolerated,
                  ensuring you get results without irritation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Clean & Safe</h3>
                <p className="text-[#747474] font-inter leading-relaxed mb-6">
                  We avoid potentially harmful ingredients and focus on formulations that are safe
                  for daily use and suitable for sensitive skin.
                </p>

                <h3 className="text-xl font-bold text-[#1c1c22] mb-4 font-inter">Transparency</h3>
                <p className="text-[#747474] font-inter leading-relaxed">
                  We list all ingredients clearly and explain what each one does. No hidden fillers,
                  no confusing proprietary blends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#efeff0] py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              Ready to Build Your Routine?
            </h2>
            <p className="text-[#747474] mb-8 font-inter">
              Now that you know the ingredients, discover products formulated with the actives your skin needs.
            </p>
            <a
              href="/shop"
              className="inline-block bg-[#746cad] hover:bg-[#aca4e9] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Shop by Ingredient
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
