"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopifyProductGrid from "@/components/ShopifyProductGrid";
import { products, type Product } from "@/data/products";
import { getReviewStats } from "@/data/reviews";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Star, Filter, ShoppingCart, Grid, List } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "all", name: "All Products", count: products.length, href: null },
  { id: "Hydration", name: "Hydration", count: products.filter(p => p.category === "Hydration").length, href: "/concerns/hydration" },
  { id: "Anti-Aging", name: "Anti-Aging", count: products.filter(p => p.category === "Anti-Aging").length, href: "/concerns/anti-aging" },
  { id: "Blemishes", name: "Blemishes", count: products.filter(p => p.category === "Blemishes").length, href: "/concerns/blemishes" },
  { id: "Brightening", name: "Brightening", count: products.filter(p => p.category === "Brightening").length, href: "/concerns/brightening" },
  { id: "Exfoliation", name: "Exfoliation", count: products.filter(p => p.category === "Exfoliation").length, href: null },
  { id: "Moisturizing", name: "Moisturizing", count: products.filter(p => p.category === "Moisturizing").length, href: null },
];

const priceRanges = [
  { id: "all", name: "All Prices", min: 0, max: 1000 },
  { id: "under-10", name: "Under $10", min: 0, max: 10 },
  { id: "10-15", name: "$10 - $15", min: 10, max: 15 },
  { id: "15-20", name: "$15 - $20", min: 15, max: 20 },
  { id: "over-20", name: "Over $20", min: 20, max: 1000 },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addItem } = useCart();

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;

    const priceRange = priceRanges.find(range => range.id === selectedPriceRange);
    const price = Number.parseFloat(product.price.replace('$', ''));
    const priceMatch = !priceRange || (price >= priceRange.min && price <= priceRange.max);

    return categoryMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return Number.parseFloat(a.price.replace('$', '')) - Number.parseFloat(b.price.replace('$', ''));
      case "price-high":
        return Number.parseFloat(b.price.replace('$', '')) - Number.parseFloat(a.price.replace('$', ''));
      case "rating":
        const aStats = getReviewStats(a.id);
        const bStats = getReviewStats(b.id);
        return bStats.averageRating - aStats.averageRating;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleQuickAdd = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#747474] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link> /
          <span className="text-[#1c1c22]"> Shop</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1c1c22] mb-4 font-lato">
            Shop All Products
          </h1>
          <p className="text-[#747474] font-inter">
            Discover our complete range of science-backed skincare solutions
          </p>
        </div>

        {/* Shop by Concern Section */}
        <section className="mb-12">
          <div className="bg-[#efeff0] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#1c1c22] mb-6 text-center font-lato">
              Shop by Skin Concern
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/concerns/hydration" className="group block">
                <div className="bg-[#efeff0] rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer border-2 border-transparent hover:border-[#746cad]">
                  <div className="aspect-square bg-white rounded-lg mb-4 p-4 flex items-center justify-center transition-all duration-300 group-hover:bg-[#f8f7ff]">
                    <img
                      src="https://ext.same-assets.com/3071055451/2165639085.png"
                      alt="Hydration Products"
                      className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold font-inter text-sm text-[#1c1c22] mb-1 transition-colors duration-300 group-hover:text-[#746cad]">HYDRATION</h3>
                </div>
              </Link>
              <Link href="/concerns/anti-aging" className="group block">
                <div className="bg-[#efeff0] rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer border-2 border-transparent hover:border-[#746cad]">
                  <div className="aspect-square bg-white rounded-lg mb-4 p-4 flex items-center justify-center transition-all duration-300 group-hover:bg-[#f8f7ff]">
                    <img
                      src="https://ext.same-assets.com/3071055451/653406535.png"
                      alt="Anti-Aging Products"
                      className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold font-inter text-sm text-[#1c1c22] mb-1 transition-colors duration-300 group-hover:text-[#746cad]">ANTI-AGING</h3>
                </div>
              </Link>
              <Link href="/concerns/blemishes" className="group block">
                <div className="bg-[#efeff0] rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer border-2 border-transparent hover:border-[#746cad]">
                  <div className="aspect-square bg-white rounded-lg mb-4 p-4 flex items-center justify-center transition-all duration-300 group-hover:bg-[#f8f7ff]">
                    <img
                      src="https://ext.same-assets.com/3071055451/2316002344.png"
                      alt="Blemishes Products"
                      className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold font-inter text-sm text-[#1c1c22] mb-1 transition-colors duration-300 group-hover:text-[#746cad]">BLEMISHES</h3>
                </div>
              </Link>
              <Link href="/concerns/brightening" className="group block">
                <div className="bg-[#efeff0] rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 cursor-pointer border-2 border-transparent hover:border-[#746cad]">
                  <div className="aspect-square bg-white rounded-lg mb-4 p-4 flex items-center justify-center transition-all duration-300 group-hover:bg-[#f8f7ff]">
                    <img
                      src="https://ext.same-assets.com/3071055451/3667623108.png"
                      alt="Brightening Products"
                      className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold font-inter text-sm text-[#1c1c22] mb-1 transition-colors duration-300 group-hover:text-[#746cad]">BRIGHTENING</h3>
                </div>
              </Link>
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/concerns/sensitive" className="group block">
                <div className="bg-[#efeff0] rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105 w-48 cursor-pointer border-2 border-transparent hover:border-[#746cad]">
                  <div className="aspect-square bg-white rounded-lg mb-4 p-4 flex items-center justify-center mx-auto transition-all duration-300 group-hover:bg-[#f8f7ff]">
                    <img
                      src="https://ext.same-assets.com/3071055451/4219517047.png"
                      alt="Sensitive Skin Products"
                      className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold font-inter text-sm text-[#1c1c22] mb-1 transition-colors duration-300 group-hover:text-[#746cad]">SENSITIVE SKIN</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Shopify Products Section */}
        <ShopifyProductGrid 
          title="Available in Our Store"
          maxProducts={18}
          showTitle={true}
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-[#1c1c22] mb-4 font-inter">Filter Products</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    category.href ? (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="block w-full text-left p-3 rounded-lg transition-colors font-inter bg-[#efeff0] text-[#747474] hover:bg-[#746cad] hover:text-white"
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-xs">({category.count})</span>
                        </div>
                      </Link>
                    ) : (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors font-inter ${
                          selectedCategory === category.id
                            ? 'bg-[#746cad] text-white'
                            : 'bg-[#efeff0] text-[#747474] hover:bg-[#c1c0cb]'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-xs">({category.count})</span>
                        </div>
                      </button>
                    )
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-[#1c1c22] mb-4 font-inter">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors font-inter ${
                        selectedPriceRange === range.id
                          ? 'bg-[#746cad] text-white'
                          : 'bg-[#efeff0] text-[#747474] hover:bg-[#c1c0cb]'
                      }`}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between mb-6 p-4 bg-[#efeff0] rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-[#747474] font-inter">
                  {sortedProducts.length} products
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid" ? 'bg-[#746cad] text-white' : 'text-[#747474] hover:bg-white'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list" ? 'bg-[#746cad] text-white' : 'text-[#747474] hover:bg-white'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#747474] font-inter">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-[#c1c0cb] rounded-lg px-3 py-2 text-sm font-inter"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Filter className="h-12 w-12 text-[#c1c0cb] mx-auto mb-4" />
                <p className="text-[#747474] font-inter">
                  No products found with the selected filters
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1"
              }`}>
                {sortedProducts.map((product) => {
                  const reviewStats = getReviewStats(product.id);

                  return (
                    <div key={product.id} className={`group ${
                      viewMode === "list"
                        ? "flex space-x-6 p-6 border border-[#c1c0cb] rounded-lg"
                        : "space-y-4"
                    }`}>
                      <Link href={`/products/${product.id}`} className={`block ${
                        viewMode === "list" ? "w-48 flex-shrink-0" : ""
                      }`}>
                        <div className={`aspect-square rounded-lg overflow-hidden bg-[#efeff0] group-hover:scale-105 transition-transform ${
                          viewMode === "list" ? "w-full h-48" : ""
                        }`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      <div className={`${viewMode === "list" ? "flex-1" : "space-y-2"}`}>
                        <p className="text-xs text-[#97979d] font-inter">{product.category}</p>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold text-[#1c1c22] font-inter leading-tight group-hover:text-[#746cad] transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        {reviewStats.totalReviews > 0 && (
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {renderStars(reviewStats.averageRating)}
                            </div>
                            <span className="text-xs text-[#747474] font-inter">
                              ({reviewStats.totalReviews})
                            </span>
                          </div>
                        )}

                        <div className={`${viewMode === "list" ? "flex items-center justify-between mt-4" : ""}`}>
                          <p className="font-bold text-[#1c1c22] font-inter">{product.price}</p>
                          {viewMode === "list" && (
                            <Button
                              onClick={() => handleQuickAdd(product)}
                              className="bg-[#746cad] hover:bg-[#aca4e9] text-white"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          )}
                        </div>

                        {viewMode === "grid" && (
                          <Button
                            onClick={() => handleQuickAdd(product)}
                            className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white mt-2"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
