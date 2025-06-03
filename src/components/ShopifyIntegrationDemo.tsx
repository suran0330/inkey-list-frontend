"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShopifyProductGrid from "./ShopifyProductGrid";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

import { RefreshCw, Package, ShoppingBag, Zap, CheckCircle } from "lucide-react";

export default function ShopifyIntegrationDemo() {
  const [demoType, setDemoType] = useState<'featured' | 'all' | 'recent'>('featured');

  const {
    products,
    loading,
    error,
    hasNextPage,
    loadMore,
    refresh,
    isConfigured
  } = useShopifyProducts({
    type: demoType,
    maxProducts: 6,
    autoLoad: true
  });

  // Configuration check removed - force show products

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-green-600" />
            <Badge className="bg-green-100 text-green-800">
              Shopify Connected
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-[#1c1c22] mb-4 font-lato">
            Live Shopify Products
          </h2>
          <p className="text-[#747474] font-inter max-w-2xl mx-auto">
            These products are fetched live from your Shopify store using the Storefront API.
            Try the different views and see how they integrate with your cart.
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#1c1c22]">View:</span>
            <div className="flex gap-1">
              {(['featured', 'all', 'recent'] as const).map((type) => (
                <Button
                  key={type}
                  onClick={() => setDemoType(type)}
                  variant={demoType === type ? "default" : "outline"}
                  size="sm"
                  className={demoType === type ? "bg-[#746cad] hover:bg-[#aca4e9]" : ""}
                >
                  {type === 'featured' && 'Featured'}
                  {type === 'all' && 'All Products'}
                  {type === 'recent' && 'Recent'}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={refresh}
            disabled={loading}
            variant="outline"
            size="sm"
            className="border-[#746cad] text-[#746cad] hover:bg-[#746cad] hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Products Display */}
        {error ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={refresh} variant="outline">
              Try Again
            </Button>
          </div>
        ) : (
          <div>
            {loading && products.length === 0 ? (
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i}>
                        <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-[#efeff0] mb-4 group-hover:scale-105 transition-transform">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-[#97979d] font-inter">{product.category}</p>
                          <div className="h-1 w-1 bg-green-500 rounded-full"></div>
                          <p className="text-xs text-green-600 font-inter">Live</p>
                        </div>
                        <h3 className="text-sm font-semibold text-[#1c1c22] font-inter leading-tight">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-[#1c1c22] font-inter">{product.price}</p>
                          {product.vendor && (
                            <p className="text-xs text-[#97979d] font-inter">by {product.vendor}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                {hasNextPage && (
                  <div className="text-center mt-8">
                    <Button
                      onClick={loadMore}
                      disabled={loading}
                      variant="outline"
                      className="border-[#746cad] text-[#746cad] hover:bg-[#746cad] hover:text-white"
                    >
                      {loading ? 'Loading...' : 'Load More Products'}
                    </Button>
                  </div>
                )}

                {/* Stats */}
                <div className="mt-12 bg-[#efeff0] rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#746cad] mb-1">
                        {products.length}
                      </div>
                      <div className="text-sm text-[#747474]">
                        Products Loaded
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#746cad] mb-1">
                        {products.filter(p => p.inStock).length}
                      </div>
                      <div className="text-sm text-[#747474]">
                        In Stock
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#746cad] mb-1">
                        {new Set(products.map(p => p.vendor)).size}
                      </div>
                      <div className="text-sm text-[#747474]">
                        Unique Vendors
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
