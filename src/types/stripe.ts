import type { CartItem } from '@/contexts/CartContext';

export interface StripeLineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      description?: string;
      images?: string[];
      metadata?: {
        productId: string;
        isShopifyProduct: string;
      };
    };
    unit_amount: number;
  };
  quantity: number;
}

export interface StripeCheckoutRequest {
  items: CartItem[];
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
}

export interface StripeCheckoutResponse {
  success: boolean;
  sessionId?: string;
  url?: string;
  error?: string;
}

export interface StripePaymentIntentRequest {
  items: CartItem[];
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface StripePaymentIntentResponse {
  success: boolean;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
}

export type PaymentMethod = 'shopify' | 'stripe' | 'mock';

export interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  description: string;
  available: boolean;
  icon?: string;
}