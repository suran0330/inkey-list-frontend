"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { isShopifyProduct, getProductDisplayName, formatPrice, getProductPriceAsNumber } from "@/lib/utils/productUtils";
import type { Product } from "@/data/products";
import type { ShopifyProductNormalized } from "@/types/shopify";

// Define concern categories for organization
const concernCategories = [
  {
    id: "hydration",
    name: "Hydration & Moisturizing",
    description: "Products for dry, dehydrated skin",
    concerns: ["Hydration", "Dryness", "Dehydration"]
  },
  {
    id: "blemishes",
    name: "Blemishes & Acne",
    description: "Target breakouts and oily skin",
    concerns: ["Acne", "Blemishes", "Blackheads", "Excess Oil"]
  },
  {
    id: "anti-aging",
    name: "Anti-Aging",
    description: "Fight fine lines and aging",
    concerns: ["Fine Lines", "Aging", "Wrinkles"]
  },
  {
    id: "brightening",
    name: "Brightening",
    description: "Even skin tone and reduce dark spots",
    concerns: ["Dark Spots", "Dullness", "Uneven Tone", "Brightening"]
  }
];

// Define product type categories
const productTypeCategories = [
  { id: "cleansers", name: "Cleansers", types: ["Cleansers", "Cleansing"] },
  { id: "serums", name: "Serums", types: ["Serums", "Treatments"] },
  { id: "moisturizers", name: "Moisturizers", types: ["Moisturizers", "Moisturizing"] },
  { id: "eye-care", name: "Eye Care", types: ["Eye Care"] }
];

type CombinedProduct = Product | ShopifyProductNormalized;

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<"concerns" | "types">("concerns");
  const [selectedCategory, setSelectedCategory] = useState(concernCategories[0].id);
  const { addItem } = useCart();

  // Get Shopify products
  const { data: shopifyData } = useShopifyProducts('all', 20);
  const shopifyProducts = shopifyData?.products || [];

  // Combine mock and Shopify products
  const allProducts: CombinedProduct[] = [...products, ...shopifyProducts];

  // Filter products by selected category
  const getFilteredProducts = (categoryId: string, isTypeFilter = false): CombinedProduct[] => {
    if (isTypeFilter) {
      const category = productTypeCategories.find(cat => cat.id === categoryId);
      if (!category) return [];

      return allProducts.filter(product => {
        const productCategory = isShopifyProduct(product)
          ? product.productType || "Other"
          : product.category;

        return category.types.includes(productCategory);
      });
    } else {
      const category = concernCategories.find(cat => cat.id === categoryId);
      if (!category) return [];

      return allProducts.filter(product => {
        const productConcerns = isShopifyProduct(product)
          ? [] // Shopify products don't have concern mapping yet
          : product.concerns || [];

        return category.concerns.some(concern =>
          productConcerns.includes(concern)
        );
      });
    }
  };

  const filteredProducts = getFilteredProducts(
    selectedCategory,
    activeTab === "types"
  );

  const handleAddToCart = (product: CombinedProduct) => {
    addItem(product, 1);
  };

  const getProductPrice = (product: CombinedProduct): string => {
    if (isShopifyProduct(product) && product.variants && product.variants.length > 0) {
      return formatPrice(getProductPriceAsNumber(product.variants[0].price.amount));
    }
    return product.price;
  };

  const getProductImage = (product: CombinedProduct): string => {
    if (isShopifyProduct(product)) {
      return product.images[0] || "/placeholder-product.jpg";
    }
    return product.images?.[0] || product.image || "/placeholder-product.jpg";
  };

  const getProductLink = (product: CombinedProduct): string => {
    if (isShopifyProduct(product)) {
      return `/products/${product.handle}`;
    }
    return `/products/${product.id}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Shop by Category Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Shop by category
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover products organized by your skin concerns and product types
        </p>
      </div>

      {/* Category Icons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
        {/* Skin Concern Categories */}
        <Link href="/shop/serums" className="text-center group">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <span className="text-2xl">🧪</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Serums</p>
        </Link>

        <Link href="/shop/cleansers" className="text-center group">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <span className="text-2xl">🧴</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Cleansers</p>
        </Link>

        <Link href="/shop/moisturizers" className="text-center group">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <span className="text-2xl">🫧</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Treatments</p>
        </Link>

        <Link href="/concerns/hydration" className="text-center group">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <span className="text-2xl">💧</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Body Treatments</p>
        </Link>

        <Link href="/shop/cleansers" className="text-center group">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <span className="text-2xl">🧼</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Cleansers</p>
        </Link>

        <Link href="/concerns/hydration" className="text-center group">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
            <span className="text-2xl">💦</span>
          </div>
          <p className="text-sm font-medium text-gray-700">Hydrators</p>
        </Link>
      </div>

      {/* Shop bestsellers Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-black mb-8 text-center">Shop bestsellers</h3>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => {
                setActiveTab("concerns");
                setSelectedCategory(concernCategories[0].id);
              }}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "concerns"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              By Skin Concern
            </button>
            <button
              onClick={() => {
                setActiveTab("types");
                setSelectedCategory(productTypeCategories[0].id);
              }}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "types"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              By Product Type
            </button>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {(activeTab === "concerns" ? concernCategories : productTypeCategories).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <div key={isShopifyProduct(product) ? product.id : product.id} className="group">
              <Link href={getProductLink(product)} className="block">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={getProductImage(product)}
                    alt={getProductDisplayName(product)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="font-medium text-sm text-black mb-2 line-clamp-2">
                  {getProductDisplayName(product)}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-black">
                    {getProductPrice(product)}
                  </p>
                  {product.inStock && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                      className="bg-black text-white text-xs px-3 py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                      Add
                    </button>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Show more link */}
        <div className="text-center mt-8">
          <Link
            href={activeTab === "concerns" ? `/concerns/${selectedCategory}` : `/shop/${selectedCategory}`}
            className="inline-flex items-center text-black hover:text-gray-700 transition-colors"
          >
            View all {(activeTab === "concerns" ? concernCategories : productTypeCategories).find(cat => cat.id === selectedCategory)?.name.toLowerCase()}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
