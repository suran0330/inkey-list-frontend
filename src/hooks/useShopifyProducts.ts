"use client";

import { useState, useEffect, useCallback } from 'react';
import type { ShopifyProductNormalized } from '@/types/shopify';
import {
  getProducts,
  getFeaturedProducts,
  getProductsByCollection,
  getRecentProducts,
  getBestSellingProducts
} from '@/lib/shopify/api';
export interface UseShopifyProductsOptions {
  type?: 'all' | 'featured' | 'recent' | 'bestselling' | 'collection';
  collectionHandle?: string;
  maxProducts?: number;
  autoLoad?: boolean;
}

export interface UseShopifyProductsResult {
  products: ShopifyProductNormalized[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  isConfigured: boolean;
}

export const useShopifyProducts = (options: UseShopifyProductsOptions = {}): UseShopifyProductsResult => {
  const {
    type = 'featured',
    collectionHandle,
    maxProducts = 12,
    autoLoad = true,
  } = options;

  const [products, setProducts] = useState<ShopifyProductNormalized[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | undefined>();

  const isConfigured = true; // Force configured for testing

  const loadProducts = useCallback(async (append = false) => {

    try {
      setLoading(true);
      setError(null);

      let result: { 
        products: ShopifyProductNormalized[]; 
        hasNextPage: boolean; 
        endCursor?: string; 
      } | null = null;

      switch (type) {
        case 'all':
          result = await getProducts({
            first: maxProducts,
            after: append ? endCursor : undefined,
          });
          break;

        case 'featured':
          const featuredProducts = await getFeaturedProducts(maxProducts);
          result = featuredProducts ? {
            products: featuredProducts,
            hasNextPage: false,
            endCursor: undefined,
          } : null;
          break;

        case 'recent':
          const recentProducts = await getRecentProducts(maxProducts);
          result = recentProducts ? {
            products: recentProducts,
            hasNextPage: false,
            endCursor: undefined,
          } : null;
          break;

        case 'bestselling':
          const bestSellingProducts = await getBestSellingProducts(maxProducts);
          result = bestSellingProducts ? {
            products: bestSellingProducts,
            hasNextPage: false,
            endCursor: undefined,
          } : null;
          break;

        case 'collection':
          if (!collectionHandle) {
            throw new Error('Collection handle is required for collection type');
          }
          result = await getProductsByCollection(collectionHandle, {
            first: maxProducts,
            after: append ? endCursor : undefined,
          });
          if (result) {
            result = {
              products: result.products,
              hasNextPage: result.hasNextPage,
              endCursor: result.endCursor,
            };
          }
          break;

        default:
          throw new Error(`Unsupported product type: ${type}`);
      }

      if (result) {
        if (append) {
          setProducts(prev => [...prev, ...result.products]);
        } else {
          setProducts(result.products);
        }
        setHasNextPage(result.hasNextPage || false);
        setEndCursor(result.endCursor);
      } else {
        if (!append) {
          setProducts([]);
        }
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error loading Shopify products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
      if (!append) {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  }, [type, collectionHandle, maxProducts, endCursor]);

  const loadMore = useCallback(async () => {
    if (hasNextPage && !loading) {
      await loadProducts(true);
    }
  }, [hasNextPage, loading, loadProducts]);

  const refresh = useCallback(async () => {
    setEndCursor(undefined);
    await loadProducts(false);
  }, [loadProducts]);

  useEffect(() => {
    if (autoLoad) {
      loadProducts(false);
    }
  }, [autoLoad, loadProducts]);

  return {
    products,
    loading,
    error,
    hasNextPage,
    loadMore,
    refresh,
    isConfigured,
  };
};

export default useShopifyProducts;
