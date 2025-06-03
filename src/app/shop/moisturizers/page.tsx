import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import Link from "next/link";

// Filter products to show only moisturizers
const moisturizerProducts = products.filter(product =>
  product.category.toLowerCase().includes('moisturizer') ||
  product.name.toLowerCase().includes('moisturizer') ||
  product.name.toLowerCase().includes('cream') ||
  product.category.toLowerCase().includes('cream')
);

export default function MoisturizersPage() {
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
          <span className="text-[#1c1c22]">Moisturizers</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Moisturizers
          </h1>
          <p className="text-xl text-[#747474] max-w-3xl font-inter">
            Essential daily hydration for healthy, balanced skin. Our moisturizers are formulated to
            strengthen the skin barrier, lock in moisture, and provide lasting comfort for all skin types.
          </p>
        </div>

        {/* Category Info */}
        <section className="mb-12">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              Find Your Perfect Moisturizer
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">For Every Skin Type</h3>
                <p className="text-[#747474] font-inter text-sm">
                  From lightweight gels for oily skin to rich creams for dry skin - we have options for everyone.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Barrier Support</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Our moisturizers contain ceramides and other barrier-supporting ingredients for healthy skin.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Multi-Benefit</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Beyond hydration, our moisturizers offer additional benefits like anti-aging and oil control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skin Type Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            Choose by Skin Type
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-[#c1c0cb] rounded-lg p-6 text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Dry Skin</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Rich, nourishing creams that provide intense hydration and barrier repair.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Recommended: Rich Cream</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6 text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Oily Skin</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Lightweight, non-comedogenic formulas that hydrate without clogging pores.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Recommended: Oil-Free Gel</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6 text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Combination</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Balanced formulas that address both oily and dry areas of your face.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Recommended: Daily Moisturizer</p>
            </div>
            <div className="border border-[#c1c0cb] rounded-lg p-6 text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌸</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Sensitive</h3>
              <p className="text-[#747474] font-inter text-sm mb-3">
                Gentle, fragrance-free formulas with soothing ingredients for reactive skin.
              </p>
              <p className="text-[#746cad] font-inter text-sm font-semibold">Recommended: Gentle Cream</p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] font-lato">
              All Moisturizers ({moisturizerProducts.length} products)
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
            {moisturizerProducts.map((product) => (
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

          {/* Show all products if no specific moisturizers */}
          {moisturizerProducts.length === 0 && (
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

        {/* Application Tips */}
        <section className="mb-16 bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
            Moisturizer Application Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Morning Routine</h3>
              <ul className="space-y-2 text-[#747474] font-inter text-sm">
                <li>• Apply to clean, dry skin</li>
                <li>• Use upward, gentle motions</li>
                <li>• Always follow with SPF</li>
                <li>• Allow to absorb before makeup</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#1c1c22] mb-3 font-inter">Evening Routine</h3>
              <ul className="space-y-2 text-[#747474] font-inter text-sm">
                <li>• Apply after serums and treatments</li>
                <li>• Use slightly more product than morning</li>
                <li>• Include neck and décolletage</li>
                <li>• Choose richer formulas for overnight repair</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Find Your Perfect Match
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Still unsure which moisturizer is right for you? Get personalized recommendations.
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
