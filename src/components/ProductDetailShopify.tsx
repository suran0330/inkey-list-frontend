"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { getProductByHandle } from "@/lib/shopify/api";
import { isShopifyProduct, getProductDisplayName, formatPrice, getProductPriceAsNumber } from "@/lib/utils/productUtils";
import ProductReviews from "@/components/ProductReviews";
import { getReviewStats } from "@/data/reviews";
import type { ShopifyProductNormalized } from "@/types/shopify";
import type { Product } from "@/data/products";

interface ProductDetailShopifyProps {
  productHandle: string;
  fallbackProduct?: Product;
}

export default function ProductDetailShopify({ productHandle, fallbackProduct }: ProductDetailShopifyProps) {
  const [product, setProduct] = useState<ShopifyProductNormalized | Product | null>(fallbackProduct || null);
  const [loading, setLoading] = useState(!fallbackProduct);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const loadShopifyProduct = async () => {
      if (fallbackProduct) return;

      try {
        setLoading(true);
        const shopifyProduct = await getProductByHandle(productHandle);

        if (shopifyProduct) {
          setProduct(shopifyProduct);
        } else {
          setError("Product not found in store");
        }
      } catch (err) {
        console.error("Error loading Shopify product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    loadShopifyProduct();
  }, [productHandle, fallbackProduct]);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setQuantity(1);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'fill-black text-black' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Product not found"}</p>
          <Link href="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isShopify = isShopifyProduct(product);
  const productName = getProductDisplayName(product);
  const currentPrice = isShopify && product.variants?.[selectedVariant]
    ? formatPrice(getProductPriceAsNumber(product.variants[selectedVariant].price.amount))
    : product.price;

  const compareAtPrice = isShopify && product.variants?.[selectedVariant]?.compareAtPrice
    ? formatPrice(getProductPriceAsNumber(product.variants[selectedVariant].compareAtPrice.amount))
    : product.originalPrice;

  // Get review stats for this product
  const reviewStats = getReviewStats(product.id, isShopify ? product.handle : undefined);

  const selectedSize = isShopify && product.variants?.[selectedVariant]
    ? product.variants[selectedVariant].title
    : "150ml";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side - Amazon-style image gallery */}
        <div className="flex gap-4">
          {/* Thumbnail column */}
          <div className="flex flex-col gap-2 w-20">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded border-2 overflow-hidden transition-colors ${
                  selectedImage === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img
                  src={image}
                  alt={`${productName} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img
                src={product.images[selectedImage]}
                alt={productName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="space-y-6">
          {/* Product title and description */}
          <div>
            <h1 className="text-3xl font-normal text-black mb-2">
              {productName}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {isShopify
                ? (product.description?.substring(0, 100) + "..." || "Daily skincare essential")
                : "Daily acne-busting & oil reducing cleanser"
              }
            </p>

            {/* Reviews */}
            {reviewStats.totalReviews > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStars(reviewStats.averageRating)}
                </div>
                <span className="text-sm text-black">
                  {reviewStats.averageRating} ({reviewStats.totalReviews.toLocaleString()} Reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <span className="text-2xl font-normal text-black">{currentPrice}</span>
              {compareAtPrice && (
                <span className="text-lg text-gray-500 line-through ml-2">
                  {compareAtPrice}
                </span>
              )}
              <span className="text-sm text-gray-600 ml-2">/ {selectedSize}</span>
            </div>

            {/* Product description */}
            <div className="text-gray-700 leading-relaxed mb-6">
              <p>{product.description}</p>
              <button className="text-black underline text-sm mt-2">
                Read more
              </button>
            </div>
          </div>

          {/* Variant Selection (for Shopify products) */}
          {isShopify && product.variants && product.variants.length > 1 && (
            <div>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              >
                {product.variants.map((variant, index) => (
                  <option key={variant.id} value={index}>
                    {variant.title} - {formatPrice(getProductPriceAsNumber(variant.price.amount))}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 text-base font-normal disabled:bg-gray-400"
            >
              {product.inStock ? "Add to cart" : "Out of Stock"}
            </Button>
          </div>

          {/* Insiders Points */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded">
            <Star className="h-4 w-4 text-purple-600" />
            <span className="text-sm">
              Worth <strong>65 Insiders Points</strong>
            </span>
            <Link href="/rewards" className="text-sm underline ml-auto">
              Sign up now
            </Link>
          </div>

          {/* Product info sections */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            {/* Suitable for */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-black mb-3">Suitable for:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-100 border border-amber-300"></div>
                    <span className="text-sm">Oily Skin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-100 border border-blue-300"></div>
                    <span className="text-sm">Combination Skin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-100 border border-green-300"></div>
                    <span className="text-sm">Normal Skin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-100 border border-gray-300"></div>
                    <span className="text-sm">Teenagers</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-black mb-3">Targets:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Breakouts & Blemishes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Excess Oil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Blackheads</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Proud to be */}
            <div>
              <h3 className="font-medium text-black mb-3">Proud to be:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-green-600">🌱</div>
                  <span className="text-sm">Carbon Net Zero</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-green-600">♻️</div>
                  <span className="text-sm">Recyclable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-green-600">🌿</div>
                  <span className="text-sm">Fragrance Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-blue-600">🏢</div>
                  <span className="text-sm">B-Corp</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-purple-600">🌸</div>
                  <span className="text-sm">Vegan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-pink-600">🐰</div>
                  <span className="text-sm">Cruelty Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-orange-600">🤱</div>
                  <span className="text-sm">Pregnancy & Breastfeeding Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 text-yellow-600">🌾</div>
                  <span className="text-sm">Gluten Free</span>
                </div>
              </div>
            </div>

            {/* Shopify-specific product info */}
            {isShopify && product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="font-medium text-black mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Reviews - Same as ProductDetailClient */}
      <ProductReviews
        productId={product.id}
        productHandle={isShopify ? product.handle : undefined}
      />
    </div>
  );
}
