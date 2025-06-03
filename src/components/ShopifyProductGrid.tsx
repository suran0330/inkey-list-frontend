"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, AlertCircle, Loader2 } from "lucide-react";
import { getProducts } from "@/lib/shopify/api";
import type { ShopifyProductNormalized } from "@/types/shopify";

interface ShopifyProductGridProps {
  title?: string;
  maxProducts?: number;
  showTitle?: boolean;
  className?: string;
}

export default function ShopifyProductGrid({
  title = "From Our Shopify Store",
  maxProducts = 12,
  showTitle = true,
  className = ""
}: ShopifyProductGridProps) {
  const { addItem } = useCart();
  const [products, setProducts] = useState<ShopifyProductNormalized[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShopifyProducts = async () => {
      // Skip configuration check - credentials are hardcoded
      console.log('Fetching Shopify products...');

      try {
        setLoading(true);
        const result = await getProducts({ first: maxProducts });
        if (result && result.products) {
          setProducts(result.products);
          console.log('Shopify products loaded:', result.products.length);
        } else {
          setError("Failed to load products from Shopify");
          console.log('No products returned from Shopify API');
        }
      } catch (err) {
        console.error("Error fetching Shopify products:", err);
        setError("Failed to load products from Shopify");
      } finally {
        setLoading(false);
      }
    };

    fetchShopifyProducts();
  }, [maxProducts]);

  const handleQuickAdd = (e: React.MouseEvent, product: ShopifyProductNormalized) => {
    e.preventDefault();
    e.stopPropagation();

    // Convert Shopify product to our Product interface for cart compatibility
    const cartProduct = {
      id: product.id,
      name: product.name, // Use normalized name property
      price: product.price,
      category: product.category || 'Skincare', // Use category property
      image: product.image,
      images: product.images,
      description: product.description,
      inStock: product.inStock, // Use normalized inStock property
      // Required fields with defaults for Shopify products
      benefits: [],
      skinType: [],
      keyIngredients: [],
      allIngredients: '',
      howToUse: [],
      size: '',
      // Optional Shopify fields
      handle: product.handle,
      vendor: product.vendor,
      productType: product.productType,
      tags: product.tags,
      isShopifyProduct: true,
    };

    addItem(cartProduct, 1);
  };

  // Configuration check removed - credentials are hardcoded

  // Don't render anything if there's an error and no products
  if (error && products.length === 0) {
    return (
      <div className={`bg-white py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-8">
            <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Unable to load Shopify products at this time</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if no products and not loading
  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {showTitle && (
          <h2 className="text-3xl font-bold text-center text-[#1c1c22] mb-12 font-lato">
            {title}
          </h2>
        )}

        {loading && products.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#746cad]" />
            <span className="ml-2 text-[#747474] font-inter">Loading products...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <Link href={`/products/${product.handle || product.id}`}>
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#efeff0] mb-4 group-hover:scale-105 transition-transform cursor-pointer relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.currentTarget.src = "https://via.placeholder.com/300x300?text=Product+Image";
                      }}
                    />
                    {/* Stock status indicator */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Out of Stock</span>
                      </div>
                    )}
                    {/* Quick Add Button */}
                    {product.inStock && (
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Quick Add to Cart"
                      >
                        <ShoppingCart className="h-4 w-4 text-[#746cad]" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-[#97979d] font-inter">{product.category || 'Skincare'}</p>
                    <h3 className="text-sm font-semibold text-[#1c1c22] font-inter leading-tight group-hover:text-[#746cad] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[#1c1c22] font-inter">${product.price}</p>
                      {product.vendor && (
                        <p className="text-xs text-[#97979d] font-inter">by {product.vendor}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {error && products.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-red-600 text-sm font-inter">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
