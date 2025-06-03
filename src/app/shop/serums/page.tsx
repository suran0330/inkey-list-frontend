import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import Link from "next/link";

// Filter products to show only serums
const serumProducts = products.filter(product =>
  product.category.toLowerCase().includes('serum') ||
  product.name.toLowerCase().includes('serum')
);

export default function SerumsPage() {
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
          <span className="text-[#1c1c22]">Serums</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c22] mb-6 font-lato">
            Serums
          </h1>
          <p className="text-xl text-[#747474] max-w-3xl font-inter">
            Concentrated treatments that deliver powerful active ingredients directly to your skin.
            Our serums are formulated with clinically proven ingredients at effective concentrations
            to target specific skin concerns.
          </p>
        </div>

        {/* Category Info */}
        <section className="mb-12">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
              Why Choose INKEY Serums?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Targeted Treatment</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Each serum is formulated to address specific skin concerns with precise active ingredients.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Clinical Strength</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Our serums contain active ingredients at concentrations proven effective in clinical studies.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Layer-Friendly</h3>
                <p className="text-[#747474] font-inter text-sm">
                  Lightweight formulas that absorb quickly and work well with other skincare products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] font-lato">
              All Serums ({serumProducts.length} products)
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
            {serumProducts.map((product) => (
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

          {/* No products message if empty */}
          {serumProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#747474] font-inter">No serums found. Check back soon for new products!</p>
            </div>
          )}
        </section>

        {/* How to Use Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
            How to Use Serums
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#746cad]">1</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Cleanse</h3>
              <p className="text-[#747474] font-inter text-sm">Start with clean skin using a gentle cleanser.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#746cad]">2</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Apply Serum</h3>
              <p className="text-[#747474] font-inter text-sm">Use 2-3 drops and gently pat into skin.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#746cad]">3</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Wait</h3>
              <p className="text-[#747474] font-inter text-sm">Allow 5-10 minutes for full absorption.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#efeff0] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#746cad]">4</span>
              </div>
              <h3 className="font-bold text-[#1c1c22] mb-2 font-inter">Moisturize</h3>
              <p className="text-[#747474] font-inter text-sm">Follow with moisturizer and SPF during the day.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-[#efeff0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Need Help Choosing?
          </h2>
          <p className="text-[#747474] mb-6 font-inter">
            Not sure which serum is right for your skin? Take our skin quiz or chat with our skincare experts.
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
