// Instructions: Create admin API client with proper error handling and fallback values

// Instructions: Add missing admin API functions for frontend integration

const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL;

// Check if admin API is configured
export const isAdminApiConfigured = !!ADMIN_API_URL;

export interface AdminProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  category: {
    name: string;
  };
  tags: string[];
  featured: boolean;
  inStock: boolean;
}

export async function getProductsFromAdmin(params?: {
  featured?: boolean;
  limit?: number;
  category?: string;
}): Promise<{ products: AdminProduct[] }> {
  if (!isAdminApiConfigured) {
    console.warn('Admin API URL not configured, returning empty products array');
    return { products: [] };
  }

  try {
    const searchParams = new URLSearchParams();
    if (params?.featured) searchParams.set('featured', 'true');
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.category) searchParams.set('category', params.category);

    const url = `${ADMIN_API_URL}/products?${searchParams.toString()}`;
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      console.warn('Failed to fetch products from admin API:', response.status);
      return { products: [] };
    }

    const data = await response.json();
    return { products: data.products || [] };
  } catch (error) {
    console.error('Error fetching products from admin API:', error);
    return { products: [] };
  }
}

export async function getProductFromAdmin(id: string): Promise<AdminProduct | null> {
  if (!isAdminApiConfigured) {
    console.warn('Admin API URL not configured');
    return null;
  }

  try {
    const response = await fetch(`${ADMIN_API_URL}/products/${id}`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      console.warn('Failed to fetch product from admin API:', response.status);
      return null;
    }

    const data = await response.json();
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product from admin API:', error);
    return null;
  }
}
