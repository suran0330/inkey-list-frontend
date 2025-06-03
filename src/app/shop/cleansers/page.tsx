import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import Link from "next/link";

// Filter products to show only cleansers
const cleanserProducts = products.filter(product =>
  product.category.toLowerCase().includes('cleanser') ||
  product.name.toLowerCase().includes('cleanser') ||
  product.name.toLowerCase().includes('wash') ||
  product.name.toLowerCase().includes('cleansing')
);

export default function CleansersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#97979d] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-[#1c1c22]">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1c1c22]">Cleansers</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Cleansers
          </h1>
          <p className="text-xl text-[#747474] max-w-3xl font-inter">
            The foundation of every great skincare routine. Our gentle yet effective cleansers remove
            impurities, makeup, and excess oil while maintaining your skin's natural balance.
          </p>
        </div>

        {/* Category Info */}
        <section className="mb-12">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              Why Cleansing Matters
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Deep Clean</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Remove dirt, oil, makeup, and pollution that can clog pores and cause breakouts.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Prep Your Skin</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Clean skin allows serums and moisturizers to penetrate better and work more effectively.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Gentle Formula</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Our cleansers are pH-balanced and won't strip your skin's natural protective barrier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cleanser Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Types of Cleansers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[#c1c0cb] rounded-lg p-6 text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧴</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Gel Cleansers</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Lightweight, foaming formulas perfect for oily and combination skin types.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Oily, Acne-prone</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6 text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥛</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Cream Cleansers</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Rich, nourishing formulas that cleanse while maintaining moisture levels.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Dry, Sensitive</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6 text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛢️</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Oil Cleansers</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Effective at removing makeup and sunscreen, especially in double cleansing routines.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: All skin types</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6 text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧽</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Exfoliating</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Contains gentle acids or physical exfoliants to remove dead skin cells.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Best for: Dull, Textured skin</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] font-lato">
              All Cleansers ({cleanserProducts.length > 0 ? cleanserProducts.length : products.slice(0, 8).length} products)
            </h2>
            <select className="border border-[#c1c0cb] rounded-lg px-4 py-2 font-inter text-sm">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Selling</option>
              <option>Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(cleanserProducts.length > 0 ? cleanserProducts : products.slice(0, 8)).map((product) => (
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
        </section>

        {/* Double Cleansing Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            The Double Cleansing Method
          </h2>
          <div className="bg-[#efeff0] rounded-lg p-8">
            <p className="text-[#747474] font-inter mb-6">
              Double cleansing is a two-step process that ensures your skin is thoroughly clean,
              especially important if you wear makeup or sunscreen.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Step 1: Oil Cleanser</h3>
                <ul className="space-y-2 text-[#747474] font-inter text-sm">
                  <li>• Apply to dry skin</li>
                  <li>• Massage gently to dissolve makeup and sunscreen</li>
                  <li>• Emulsify with a little water</li>
                  <li>• Rinse thoroughly</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Step 2: Water-Based Cleanser</h3>
                <ul className="space-y-2 text-[#747474] font-inter text-sm">
                  <li>• Apply to damp skin</li>
                  <li>• Massage gently to remove remaining impurities</li>
                  <li>• Focus on T-zone and problem areas</li>
                  <li>• Rinse with lukewarm water</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cleansing Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Cleansing Best Practices
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Frequency</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Cleanse twice daily - morning and evening. Over-cleansing can strip your skin's natural oils.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Water Temperature</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Use lukewarm water. Hot water can be too harsh and cold water won't effectively remove impurities.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Gentle Touch</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Massage gently with fingertips. Avoid scrubbing harshly, which can irritate and damage skin.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Start Your Routine Right
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Good skin starts with proper cleansing. Find the perfect cleanser for your skin type.
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
