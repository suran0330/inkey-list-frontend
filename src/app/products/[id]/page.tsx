import { notFound } from 'next/navigation';
import { products, Product } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';
import ProductDetailShopify from '@/components/ProductDetailShopify';
import { getProductByHandle } from '@/lib/shopify/api';
import { getProductFromAdmin } from '@/lib/admin-api';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;

  // First try to find local product
  const localProduct = products.find((p) => p.id === id);

  if (localProduct) {
    return {
      title: `${localProduct.name} | INKEY`,
      description: localProduct.description,
    };
  }

  // If not found locally, try Shopify (for server-side rendering)
  try {
    const shopifyProduct = await getProductByHandle(id);
    if (shopifyProduct) {
      return {
        title: `${shopifyProduct.name} | INKEY`,
        description: shopifyProduct.description,
      };
    }
  } catch (error) {
    console.log('Could not fetch Shopify product for metadata:', error);
  }

  return {
    title: 'Product Not Found',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // First try to get product from admin API
  const adminProduct = await getProductFromAdmin(id);

  if (adminProduct) {
    // Convert admin product to local product format for compatibility
    const convertedProduct: Product = {
      id: adminProduct.id,
      name: adminProduct.title,
      price: adminProduct.price,
      description: adminProduct.description,
      category: adminProduct.category.name,
      image: adminProduct.images[0] || '/placeholder-product.jpg',
      images: adminProduct.images,
      ingredients: [], // Will be enhanced later
      benefits: [], // Will be enhanced later
      howToUse: '', // Will be enhanced later
      keyIngredient: adminProduct.tags[0] || '',
      consistencyRating: 4.5, // Default rating
      absorptionRating: 4.5, // Default rating
      resultsRating: 4.5, // Default rating
      dermatologistTested: true,
    };
    return <ProductDetailClient product={convertedProduct} />;
  }

  // Try to find local product as fallback
  const localProduct = products.find((p) => p.id === id);

  if (localProduct) {
    return <ProductDetailClient product={localProduct} />;
  }

  // If not found locally, try to render Shopify product page
  // The Shopify product will be loaded client-side
  return <ProductDetailShopify productHandle={id} />;
}

// Enable Incremental Static Regeneration
export const revalidate = 300; // 5 minutes
