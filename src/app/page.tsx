import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { getHomepageContent, getActiveBanners } from "@/lib/sanity";
import { getProductsFromAdmin } from "@/lib/admin-api";

export default async function HomePage() {
  // Get content from Sanity CMS
  const [content, banners] = await Promise.all([
    getHomepageContent(),
    getActiveBanners('/')
  ]);

  // Get featured products from admin API
  const { products: featuredProducts } = await getProductsFromAdmin({
    featured: true,
    limit: 6
  });
  // Define the before/after result sets with corresponding products
  const resultSets = [
    {
      id: 1,
      before: "https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=150&h=150&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=150&h=150&fit=crop&crop=face",
      review: "I hardly could have this confidence within 8-10 days. But I must say BHA...",
      productName: "BHA (Beta Hydroxy Acid)",
      productLink: "/products/bha-beta-hydroxy-acid"
    },
    {
      id: 2,
      before: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=150&h=150&fit=crop&crop=face",
      review: "Perfect choice for my skin. The BHA feels amazing on my skin.",
      productName: "Salicylic Acid Cleanser",
      productLink: "/products/salicylic-acid-cleanser"
    },
    {
      id: 3,
      before: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=150&h=150&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face",
      review: "I have been using this for 6 weeks and I have been reducing the scar tissue...",
      productName: "Retinol Eye Cream",
      productLink: "/products/retinol-eye-cream"
    },
    {
      id: 4,
      before: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150&h=150&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=150&h=150&fit=crop&crop=face",
      review: "I have been using this product for 8-9 months now and can say even my...",
      productName: "Hyaluronic Acid Serum",
      productLink: "/products/hyaluronic-acid-serum"
    },
    {
      id: 5,
      before: "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=150&h=150&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=150&h=150&fit=crop&crop=face",
      review: "This is the first serum I found that works actually. From the 1st...",
      productName: "Niacinamide",
      productLink: "/products/niacinamide"
    },
    {
      id: 6,
      before: "https://images.unsplash.com/photo-1556229010-aa9dc4df5ca6?w=150&h=150&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=150&h=150&fit=crop&crop=face",
      review: "Yes! Amazing results with consistent use.",
      productName: "Vitamin C Serum",
      productLink: "/products/vitamin-c-serum"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Display active banners */}
      {banners.map((banner: any) => (
        <div key={banner._id} className="bg-purple-600 text-white text-center py-2 px-4">
          <p className="text-sm">{banner.content.headline}</p>
        </div>
      ))}

      {/* Hero Section with Sanity Content */}
      <HeroSection content={content?.heroSection} />

      {/* Featured Products from Admin API */}
      {featuredProducts.length > 0 && (
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-normal text-black mb-12">
              {content?.featuredProductsSection?.title || 'Featured Products'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {featuredProducts.slice(0, 6).map((product: any) => (
                <Link key={product.id} href={`/products/${product.handle}`} className="group">
                  <div className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
                    <img
                      src={product.images[0] || '/placeholder-product.jpg'}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-sm font-medium text-black mb-2 group-hover:text-purple-600">
                      {product.title}
                    </h3>
                    <p className="text-lg font-normal text-black">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Original Product Grid as fallback */}
      <ProductGrid />

      {/* New INKEY List Content Sections */}
      <main>
        {/* Hero Banners Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-16">
          {/* Left Banner - 30% off bestselling Intro Routines */}
          <div className="relative bg-white">
            <div className="flex items-center justify-center h-[400px] md:h-[500px]">
              <div className="text-left max-w-md px-8">
                <div className="mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1556229010-aa9dc4df5ca6?w=300&h=200&fit=crop"
                    alt="Intro Routines Products"
                    className="w-full max-w-[280px] h-auto object-contain"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-normal text-black mb-4 leading-tight">
                  30% off bestselling Intro Routines
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Get started with our most popular multi-step routines and save on our clinical trials.
                </p>
                <Link href="/shop">
                  <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-medium">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Banner - Heroes for Hydrated Skin */}
          <div className="relative bg-gray-50">
            <div className="flex items-center justify-center h-[400px] md:h-[500px]">
              <div className="text-left max-w-md px-8">
                <div className="mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=300&h=300&fit=crop&crop=face"
                    alt="Hydrated Skin Model"
                    className="w-full max-w-[280px] h-auto object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-normal text-black mb-4 leading-tight">
                  Heroes for Hydrated Skin
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Boost hydration, lock in moisture and glow with our dewy skin favourites and brightening must-haves.
                </p>
                <Link href="/concerns/hydration">
                  <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-medium">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* INKEY delivers real results Section */}
        <div className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-normal text-black mb-12">
              INKEY delivers real results
            </h2>

            {/* Before/After Results Grid - Grouped Sets */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {resultSets.map((resultSet) => (
                <Link
                  key={resultSet.id}
                  href={resultSet.productLink}
                  className="block group cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    {/* Before/After Photos */}
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      <div className="relative">
                        <img
                          src={resultSet.before}
                          alt="Before"
                          className="w-full aspect-square object-cover rounded"
                        />
                        <span className="absolute top-1 left-1 bg-black text-white text-xs px-1 py-0.5 rounded">
                          BEFORE
                        </span>
                      </div>
                      <div className="relative">
                        <img
                          src={resultSet.after}
                          alt="After"
                          className="w-full aspect-square object-cover rounded"
                        />
                        <span className="absolute top-1 left-1 bg-black text-white text-xs px-1 py-0.5 rounded">
                          AFTER
                        </span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-xs text-gray-600 leading-tight mb-2 h-12 overflow-hidden">
                      "{resultSet.review}"
                    </p>

                    {/* Product Name */}
                    <p className="text-xs font-medium text-black group-hover:text-purple-600 transition-colors duration-300">
                      {resultSet.productName}
                    </p>

                    {/* Hover indicator */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-purple-600 font-medium">
                        View Product →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product 1 - Mega Water Cream */}
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">💧</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-black mb-2">MEGA WATER CREAM - 50ML</h3>
                <p className="text-2xl font-normal text-black mb-4">£12.99</p>
                <Link href="/products/mega-water-cream">
                  <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm w-full">
                    Add
                  </Button>
                </Link>
              </div>

              {/* Product 2 - Salicylic Acid Cleanser */}
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">🧴</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-black mb-2">SALICYLIC ACID CLEANSER</h3>
                <p className="text-2xl font-normal text-black mb-4">£9.99</p>
                <Link href="/products/salicylic-acid-cleanser">
                  <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm w-full">
                    Add
                  </Button>
                </Link>
              </div>

              {/* Product 3 - Succinic Acid Serum */}
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">💚</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-black mb-2">SUCCINIC ACID SERUM</h3>
                <p className="text-2xl font-normal text-black mb-4">£7.99</p>
                <Link href="/products/succinic-acid-serum">
                  <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm w-full">
                    Add
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button className="w-2 h-2 bg-black rounded-full"></button>
              <button className="w-2 h-2 bg-gray-300 rounded-full"></button>
              <button className="w-2 h-2 bg-gray-300 rounded-full"></button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Enable Incremental Static Regeneration
export const revalidate = 60;
