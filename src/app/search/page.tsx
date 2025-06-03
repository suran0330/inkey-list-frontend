"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { getReviewStats } from "@/data/reviews";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(products);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('inkey-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.keyIngredients.some(ingredient =>
          ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(products);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      const newRecentSearches = [query, ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecentSearches);
      localStorage.setItem('inkey-recent-searches', JSON.stringify(newRecentSearches));
    }
    setSearchQuery(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('inkey-recent-searches');
  };

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

  const popularSearches = [
    "Hyaluronic Acid",
    "Niacinamide",
    "Vitamin C",
    "Retinol",
    "BHA",
    "Moisturizer",
    "Anti-aging",
    "Acne"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#747474] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link> /
          <span className="text-[#1c1c22]"> Search</span>
        </nav>

        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-[#1c1c22] text-center mb-8 font-lato">
            Search Products
          </h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#747474]" />
            <Input
              type="text"
              placeholder="Search for products, ingredients, or concerns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-[#c1c0cb] focus:border-[#746cad]"
            />
          </div>
        </div>

        {/* Search Suggestions */}
        {!searchQuery && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Popular Searches */}
              <div>
                <h2 className="text-lg font-semibold text-[#1c1c22] mb-4 font-inter">
                  Popular Searches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleSearch(search)}
                      className="px-4 py-2 bg-[#efeff0] text-[#747474] rounded-full hover:bg-[#c1c0cb] transition-colors font-inter"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#1c1c22] font-inter">
                      Recent Searches
                    </h2>
                    <button
                      onClick={clearRecentSearches}
                      className="text-[#747474] hover:text-[#1c1c22] text-sm font-inter"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="flex items-center justify-between w-full p-3 bg-[#efeff0] rounded-lg hover:bg-[#c1c0cb] transition-colors"
                      >
                        <span className="text-[#747474] font-inter">{search}</span>
                        <Search className="h-4 w-4 text-[#97979d]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#1c1c22] font-inter">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </h2>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="flex items-center text-[#747474] hover:text-[#1c1c22] font-inter"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear search
                </button>
              )}
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-[#c1c0cb] mx-auto mb-4" />
                <p className="text-[#747474] font-inter mb-4">
                  No products found for "{searchQuery}"
                </p>
                <p className="text-sm text-[#97979d] font-inter">
                  Try searching for ingredients like "niacinamide" or concerns like "acne"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((product) => {
                  const reviewStats = getReviewStats(product.id);

                  return (
                    <div key={product.id} className="group">
                      <Link href={`/products/${product.id}`}>
                        <div className="aspect-square rounded-lg overflow-hidden bg-[#efeff0] mb-4 group-hover:scale-105 transition-transform">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      <div className="space-y-2">
                        <p className="text-xs text-[#97979d] font-inter">{product.category}</p>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-sm font-semibold text-[#1c1c22] font-inter leading-tight group-hover:text-[#746cad] transition-colors">
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

                        <p className="text-sm font-bold text-[#1c1c22] font-inter">{product.price}</p>

                        <Button
                          onClick={() => addItem(product, 1)}
                          className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white text-sm"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Default Product Grid */}
        {!searchQuery && (
          <div>
            <h2 className="text-2xl font-bold text-[#1c1c22] text-center mb-8 font-lato">
              All Products
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => {
                const reviewStats = getReviewStats(product.id);

                return (
                  <div key={product.id} className="group">
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square rounded-lg overflow-hidden bg-[#efeff0] mb-4 group-hover:scale-105 transition-transform">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    <div className="space-y-2">
                      <p className="text-xs text-[#97979d] font-inter">{product.category}</p>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-sm font-semibold text-[#1c1c22] font-inter leading-tight group-hover:text-[#746cad] transition-colors">
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

                      <p className="text-sm font-bold text-[#1c1c22] font-inter">{product.price}</p>

                      <Button
                        onClick={() => addItem(product, 1)}
                        className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white text-sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
