import type { Product } from '@/data/products';
import type { ShopifyProductNormalized } from '@/types/shopify';

// Type guard to check if a product is from Shopify
export const isShopifyProduct = (product: Product | ShopifyProductNormalized): product is ShopifyProductNormalized => {
  return 'isShopifyProduct' in product && product.isShopifyProduct === true;
};

// Normalize product for cart compatibility
export const normalizeProductForCart = (product: Product | ShopifyProductNormalized): Product => {
  if (isShopifyProduct(product)) {
    // Convert Shopify product to local Product interface
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      images: product.images,
      description: product.description,
      inStock: product.inStock,
      // Provide defaults for required fields that Shopify products might not have
      benefits: [],
      skinType: [],
      keyIngredients: [],
      allIngredients: '',
      howToUse: [],
      size: '',
      // Optional fields for Shopify products
      handle: product.handle,
      vendor: product.vendor,
      productType: product.productType,
      tags: product.tags,
      shopifyId: product.shopifyId,
      isShopifyProduct: product.isShopifyProduct,
    };
  }
  
  // Already a local product, return as is
  return product;
};

// Get product URL based on type
export const getProductUrl = (product: Product | ShopifyProductNormalized): string => {
  if (isShopifyProduct(product) && product.handle) {
    return `/products/${product.handle}`;
  }
  return `/products/${product.id}`;
};

// Get product price as number
export const getProductPriceAsNumber = (price: string): number => {
  return Number.parseFloat(price.replace('$', '').replace(',', ''));
};

// Format price consistently
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// Check if product has required fields for display
export const isValidProduct = (product: Product | ShopifyProductNormalized | null | undefined): product is Product | ShopifyProductNormalized => {
  return !!(
    product?.id &&
    product.name &&
    product.price &&
    product.image &&
    typeof product.inStock === 'boolean'
  );
};

// Get product display name with vendor (for Shopify products)
export const getProductDisplayName = (product: Product | ShopifyProductNormalized): string => {
  if (isShopifyProduct(product) && product.vendor) {
    return `${product.name} by ${product.vendor}`;
  }
  return product.name;
};

// Get product category for filtering
export const getProductCategory = (product: Product | ShopifyProductNormalized): string => {
  return product.category || 'Uncategorized';
};

// Check if product is available
export const isProductAvailable = (product: Product | ShopifyProductNormalized): boolean => {
  return product.inStock === true;
};

// Get product tags for filtering (Shopify products only)
export const getProductTags = (product: Product | ShopifyProductNormalized): string[] => {
  if (isShopifyProduct(product) && product.tags) {
    return product.tags;
  }
  return [];
};

// Combine local and Shopify products for unified display
export const combineProducts = (
  localProducts: Product[],
  shopifyProducts: ShopifyProductNormalized[]
): Product[] => {
  const normalizedShopifyProducts = shopifyProducts.map(normalizeProductForCart);
  return [...localProducts, ...normalizedShopifyProducts];
};

// Filter products by category (works for both types)
export const filterProductsByCategory = (
  products: (Product | ShopifyProductNormalized)[],
  category: string
): (Product | ShopifyProductNormalized)[] => {
  if (category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
};

// Filter products by price range
export const filterProductsByPriceRange = (
  products: (Product | ShopifyProductNormalized)[],
  minPrice: number,
  maxPrice: number
): (Product | ShopifyProductNormalized)[] => {
  return products.filter(product => {
    const price = getProductPriceAsNumber(product.price);
    return price >= minPrice && price <= maxPrice;
  });
};

// Sort products by various criteria
export const sortProducts = (
  products: (Product | ShopifyProductNormalized)[],
  sortBy: 'name' | 'price-low' | 'price-high' | 'vendor'
): (Product | ShopifyProductNormalized)[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return getProductPriceAsNumber(a.price) - getProductPriceAsNumber(b.price);
      case 'price-high':
        return getProductPriceAsNumber(b.price) - getProductPriceAsNumber(a.price);
      case 'vendor': {
        const aVendor = isShopifyProduct(a) ? a.vendor || '' : '';
        const bVendor = isShopifyProduct(b) ? b.vendor || '' : '';
        return aVendor.localeCompare(bVendor);
      }
      default:
        return 0;
    }
  });
};