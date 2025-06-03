import {
  shopifyFetch,
  normalizeShopifyProducts,
  extractProductsFromResponse,
  extractProductFromResponse,
  extractCollectionsFromResponse,
} from './client';

import {
  GET_PRODUCTS_QUERY,
  GET_FEATURED_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_PRODUCT_BY_ID_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from './queries';

import type {
  ShopifyProductsResponse,
  ShopifyProductResponse,
  ShopifyCollectionsResponse,
  ShopifyCollectionResponse,
  ShopifyProductNormalized,
  ShopifyCollection,
} from '@/types/shopify';

// Default pagination size
const DEFAULT_FIRST = 12;

// Get all products with optional filtering and pagination
export const getProducts = async (options?: {
  first?: number;
  after?: string;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<{
  products: ShopifyProductNormalized[];
  hasNextPage: boolean;
  endCursor?: string;
} | null> => {
  try {
    const response = await shopifyFetch<ShopifyProductsResponse>(GET_PRODUCTS_QUERY, {
      first: options?.first || DEFAULT_FIRST,
      after: options?.after,
      query: options?.query,
      sortKey: options?.sortKey,
      reverse: options?.reverse,
    });

    if (!response?.products) {
      console.log('No products found in response');
      return { products: [], hasNextPage: false };
    }

    const products = extractProductsFromResponse(response);
    const normalizedProducts = normalizeShopifyProducts(products);

    return {
      products: normalizedProducts,
      hasNextPage: response.products.pageInfo.hasNextPage,
      endCursor: response.products.pageInfo.endCursor,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

// Get featured products (simple query for homepage)
export const getFeaturedProducts = async (limit = 12): Promise<ShopifyProductNormalized[] | null> => {
  try {
    const response = await shopifyFetch<ShopifyProductsResponse>(GET_FEATURED_PRODUCTS_QUERY, {
      first: limit,
    });

    if (!response?.products) {
      console.log('No featured products found, trying regular products');
      // Fallback to regular products if no featured products
      const fallbackResponse = await shopifyFetch<ShopifyProductsResponse>(GET_PRODUCTS_QUERY, {
        first: limit,
      });
      
      if (!fallbackResponse?.products) {
        return [];
      }
      
      const products = extractProductsFromResponse(fallbackResponse);
      return normalizeShopifyProducts(products);
    }

    const products = extractProductsFromResponse(response);
    return normalizeShopifyProducts(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return null;
  }
};

// Get a single product by handle
export const getProductByHandle = async (handle: string): Promise<ShopifyProductNormalized | null> => {
  try {
    const response = await shopifyFetch<ShopifyProductResponse>(GET_PRODUCT_BY_HANDLE_QUERY, {
      handle,
    });

    if (!response?.product) {
      console.log(`Product with handle "${handle}" not found`);
      return null;
    }

    const product = extractProductFromResponse(response);
    if (!product) return null;

    return normalizeShopifyProducts([product])[0];
  } catch (error) {
    console.error(`Error fetching product by handle "${handle}":`, error);
    return null;
  }
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<ShopifyProductNormalized | null> => {
  try {
    const response = await shopifyFetch<ShopifyProductResponse>(GET_PRODUCT_BY_ID_QUERY, {
      id,
    });

    if (!response?.product) {
      console.log(`Product with ID "${id}" not found`);
      return null;
    }

    const product = extractProductFromResponse(response);
    if (!product) return null;

    return normalizeShopifyProducts([product])[0];
  } catch (error) {
    console.error(`Error fetching product by ID "${id}":`, error);
    return null;
  }
};

// Get all collections
export const getCollections = async (options?: {
  first?: number;
  after?: string;
}): Promise<{
  collections: ShopifyCollection[];
  hasNextPage: boolean;
  endCursor?: string;
} | null> => {
  try {
    const response = await shopifyFetch<ShopifyCollectionsResponse>(GET_COLLECTIONS_QUERY, {
      first: options?.first || DEFAULT_FIRST,
      after: options?.after,
    });

    if (!response?.collections) {
      console.log('No collections found in response');
      return { collections: [], hasNextPage: false };
    }

    const collections = extractCollectionsFromResponse(response);

    return {
      collections,
      hasNextPage: response.collections.pageInfo.hasNextPage,
      endCursor: response.collections.pageInfo.endCursor,
    };
  } catch (error) {
    console.error('Error fetching collections:', error);
    return null;
  }
};

// Get products by collection handle
export const getProductsByCollection = async (
  collectionHandle: string,
  options?: {
    first?: number;
    after?: string;
  }
): Promise<{
  products: ShopifyProductNormalized[];
  hasNextPage: boolean;
  endCursor?: string;
  collection?: ShopifyCollection;
} | null> => {
  try {
    const response = await shopifyFetch<ShopifyCollectionResponse>(GET_COLLECTION_PRODUCTS_QUERY, {
      handle: collectionHandle,
      first: options?.first || DEFAULT_FIRST,
      after: options?.after,
    });

    if (!response?.collection) {
      console.log(`Collection with handle "${collectionHandle}" not found`);
      return { products: [], hasNextPage: false };
    }

    const products = response.collection.products.edges.map(edge => edge.node);
    const normalizedProducts = normalizeShopifyProducts(products);

    return {
      products: normalizedProducts,
      hasNextPage: response.collection.products.pageInfo.hasNextPage,
      endCursor: response.collection.products.pageInfo.endCursor,
      collection: response.collection,
    };
  } catch (error) {
    console.error(`Error fetching products from collection "${collectionHandle}":`, error);
    return null;
  }
};

// Get recent products (sorted by creation date)
export const getRecentProducts = async (limit = 12): Promise<ShopifyProductNormalized[] | null> => {
  try {
    const response = await shopifyFetch<ShopifyProductsResponse>(GET_PRODUCTS_QUERY, {
      first: limit,
      sortKey: 'CREATED_AT',
      reverse: true,
    });

    if (!response?.products) {
      console.log('No recent products found');
      return [];
    }

    const products = extractProductsFromResponse(response);
    return normalizeShopifyProducts(products);
  } catch (error) {
    console.error('Error fetching recent products:', error);
    return null;
  }
};

// Get best selling products (sorted by best selling)
export const getBestSellingProducts = async (limit = 12): Promise<ShopifyProductNormalized[] | null> => {
  try {
    const response = await shopifyFetch<ShopifyProductsResponse>(GET_PRODUCTS_QUERY, {
      first: limit,
      sortKey: 'BEST_SELLING',
      reverse: false,
    });

    if (!response?.products) {
      console.log('No best selling products found');
      return [];
    }

    const products = extractProductsFromResponse(response);
    return normalizeShopifyProducts(products);
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    return null;
  }
};

// Search products
export const searchProducts = async (
  searchQuery: string,
  options?: {
    first?: number;
    after?: string;
  }
): Promise<{
  products: ShopifyProductNormalized[];
  hasNextPage: boolean;
  endCursor?: string;
} | null> => {
  try {
    if (!searchQuery.trim()) {
      return { products: [], hasNextPage: false };
    }

    const response = await shopifyFetch<ShopifyProductsResponse>(SEARCH_PRODUCTS_QUERY, {
      query: searchQuery,
      first: options?.first || DEFAULT_FIRST,
      after: options?.after,
    });

    if (!response?.products) {
      console.log(`No products found for search query: "${searchQuery}"`);
      return { products: [], hasNextPage: false };
    }

    const products = extractProductsFromResponse(response);
    const normalizedProducts = normalizeShopifyProducts(products);

    return {
      products: normalizedProducts,
      hasNextPage: response.products.pageInfo.hasNextPage,
      endCursor: response.products.pageInfo.endCursor,
    };
  } catch (error) {
    console.error(`Error searching products for "${searchQuery}":`, error);
    return null;
  }
};

// Helper function to get product price range
export const getProductPriceRange = (product: ShopifyProductNormalized): { min: number; max: number } => {
  if (!product.variants || product.variants.length === 0) {
    return { min: Number.parseFloat(product.price), max: Number.parseFloat(product.price) };
  }

  const prices = product.variants.map(variant => Number.parseFloat(variant.price.amount));
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

// Helper function to check if product has multiple variants
export const hasMultipleVariants = (product: ShopifyProductNormalized): boolean => {
  return product.variants && product.variants.length > 1;
};

// Helper function to get product availability
export const isProductAvailable = (product: ShopifyProductNormalized): boolean => {
  return product.inStock && product.variants.some(variant => variant.availableForSale);
};