# Shopify Integration Guide

This document explains how to set up and use the Shopify Storefront API integration with your INKEY List e-commerce clone.

## Features

✅ **Seamless Integration**: Shopify products display alongside local mock products  
✅ **Unified Cart**: Both local and Shopify products work in the same shopping cart  
✅ **Product Detail Pages**: Support for both local and Shopify product pages  
✅ **Real-time Data**: Live product data fetched from your Shopify store  
✅ **Error Handling**: Graceful fallbacks when Shopify is unavailable  
✅ **TypeScript Support**: Full type safety for Shopify data structures  

## Setup Instructions

### 1. Create a Shopify Private App

1. Go to your Shopify admin panel
2. Navigate to **Settings > Apps and sales channels**
3. Click **Develop apps** at the bottom
4. Click **Create an app**
5. Name your app (e.g., "INKEY List Integration")
6. Configure the app permissions:

#### Required Storefront API Permissions:
```
✅ Read products and product listings
✅ Read product inventory
✅ Read collections
✅ Read customer details (optional, for future features)
```

### 2. Generate Storefront Access Token

1. In your private app settings, go to **API credentials**
2. Under **Storefront API access tokens**, click **Create token**
3. Set the scope to include:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_collections`
   - `unauthenticated_read_product_inventory`
4. Copy the generated token

### 3. Configure Environment Variables

Create or update your `.env.local` file:

```env
# Shopify Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important**: Replace `your-store-name` with your actual Shopify store name and use your real access token.

### 4. Tag Products as Featured (Optional)

To display products in the "Featured from Our Store" section, tag them with `featured` in your Shopify admin:

1. Go to **Products** in your Shopify admin
2. Select a product
3. In the **Search engine listing preview** section, add `featured` to the tags
4. Save the product

## Usage

### Homepage Integration

The homepage automatically displays Shopify products in the "Featured from Our Store" section:

```tsx
<ShopifyProductGrid 
  title="Featured from Our Store"
  maxProducts={12}
  showTitle={true}
/>
```

### Shop Page Integration

The shop page includes a dedicated section for Shopify products:

```tsx
<ShopifyProductGrid 
  title="Available in Our Store"
  maxProducts={18}
  showTitle={true}
  className="mb-12"
/>
```

### Custom Implementation

You can use the Shopify hooks and components in your own pages:

```tsx
import { useShopifyProducts } from '@/hooks/useShopifyProducts';

function MyComponent() {
  const { products, loading, error } = useShopifyProducts({
    type: 'featured',
    maxProducts: 6
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## API Reference

### Shopify API Functions

#### `getFeaturedProducts(first?: number)`
Fetches products tagged as "featured" from Shopify.

#### `getProducts(options?)`
Fetches all products with optional filtering and pagination.

#### `getProductByHandle(handle: string)`
Fetches a single product by its Shopify handle.

#### `getProductsByCollection(handle: string, options?)`
Fetches products from a specific collection.

### Custom Hooks

#### `useShopifyProducts(options)`
A React hook for managing Shopify product state.

```tsx
const {
  products,
  loading,
  error,
  hasNextPage,
  loadMore,
  refresh
} = useShopifyProducts({
  type: 'featured', // 'all' | 'featured' | 'recent' | 'bestselling' | 'collection'
  maxProducts: 12,
  autoLoad: true
});
```

### Components

#### `<ShopifyProductGrid />`
Displays Shopify products in a grid layout matching the existing design.

#### `<ProductDetailShopify />`
Handles product detail pages for Shopify products.

#### `<ShopifyNotConfigured />`
Shows when Shopify credentials are not configured.

## Product Data Structure

Shopify products are normalized to match the local product interface:

```typescript
interface ShopifyProductNormalized {
  id: string;                    // Prefixed with "shopify-"
  name: string;                  // Product title
  price: string;                 // Formatted price (e.g., "$29.99")
  category: string;              // Mapped from productType
  image: string;                 // Featured image URL
  images: string[];              // All product images
  description: string;           // Product description
  inStock: boolean;              // Availability status
  handle: string;                // Shopify URL handle
  vendor: string;                // Brand/vendor name
  productType: string;           // Shopify product type
  tags: string[];                // Product tags
  variants: ShopifyProductVariant[]; // Product variants
  shopifyId: string;             // Original Shopify ID
  isShopifyProduct: true;        // Type identifier
}
```

## Cart Integration

Shopify products work seamlessly with the existing cart system:

- Products are normalized when added to cart
- Cart persistence works for both local and Shopify products
- Checkout flow remains unchanged (you may want to implement Shopify Checkout later)

## Error Handling

The integration includes comprehensive error handling:

- **No Configuration**: Shows setup instructions
- **API Errors**: Graceful fallbacks with error messages
- **Missing Products**: Displays "not found" pages
- **Network Issues**: Loading states and retry mechanisms

## Performance Considerations

- Products are fetched client-side to avoid blocking page renders
- Image optimization and lazy loading are implemented
- GraphQL queries are optimized for minimal data transfer
- Caching strategies can be added for production use

## Troubleshooting

### Common Issues

**"Shopify store not configured"**
- Check your `.env.local` file
- Ensure environment variables are properly set
- Restart your development server

**"Failed to load products"**
- Verify your Storefront Access Token
- Check your store domain format
- Ensure your app has the correct permissions

**Products not showing**
- Make sure products are published in your Shopify store
- Check if products are tagged correctly (for featured products)
- Verify your store has products available

### Debug Mode

Add this to your environment for detailed logging:
```env
NODE_ENV=development
```

This will log API calls and errors to the browser console.

## Future Enhancements

Potential features to implement:

- **Shopify Checkout**: Direct integration with Shopify's checkout system
- **Customer Authentication**: Shopify customer accounts
- **Inventory Sync**: Real-time inventory updates
- **Product Reviews**: Shopify product reviews integration
- **Search Integration**: Include Shopify products in site search
- **Collection Pages**: Dedicated pages for Shopify collections

## Support

If you encounter issues with the Shopify integration:

1. Check the browser console for error messages
2. Verify your Shopify app configuration
3. Ensure your environment variables are correct
4. Test your Storefront API access token using GraphQL tools

For Shopify-specific issues, refer to the [Shopify Storefront API documentation](https://shopify.dev/docs/api/storefront).