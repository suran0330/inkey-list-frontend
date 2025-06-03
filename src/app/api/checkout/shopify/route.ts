import { type NextRequest, NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/client';
import { CREATE_CHECKOUT_MUTATION } from '@/lib/shopify/queries';
import type { 
  ShopifyCheckoutResponse, 
  ShopifyCheckoutInput,
  ShopifyError 
} from '@/types/shopify';
import { z } from 'zod';

// Validation schema for checkout request
const CheckoutRequestSchema = z.object({
  email: z.string().email().optional(),
  items: z.array(z.object({
    variantId: z.string(),
    quantity: z.number().positive(),
    productId: z.string(),
    isShopifyProduct: z.boolean()
  })),
  shippingAddress: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address1: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional()
  }).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CheckoutRequestSchema.parse(body);

    // Filter only Shopify products for checkout
    const shopifyItems = validatedData.items.filter(item => item.isShopifyProduct);

    if (shopifyItems.length === 0) {
      return NextResponse.json(
        { 
          error: 'No Shopify products in cart',
          message: 'This checkout only supports Shopify products. Please add some products from our store.',
          type: 'no_shopify_products'
        },
        { status: 400 }
      );
    }

    // Create Shopify checkout input
    const checkoutInput: ShopifyCheckoutInput = {
      email: validatedData.email,
      lineItems: shopifyItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      })),
      shippingAddress: validatedData.shippingAddress,
      allowPartialAddresses: true
    };

    // Create checkout with Shopify
    const response = await shopifyFetch<ShopifyCheckoutResponse>(
      CREATE_CHECKOUT_MUTATION,
      { input: checkoutInput }
    );

    if (!response) {
      return NextResponse.json(
        { 
          error: 'Shopify API error',
          message: 'Unable to connect to Shopify. Please try again later.'
        },
        { status: 500 }
      );
    }

    const { checkout, userErrors, checkoutUserErrors } = response.checkoutCreate;

    // Check for errors
    const allErrors = [...userErrors, ...checkoutUserErrors];
    if (allErrors.length > 0) {
      console.error('Shopify checkout errors:', allErrors);
      return NextResponse.json(
        { 
          error: 'Checkout creation failed',
          message: allErrors[0]?.message || 'Unable to create checkout',
          details: allErrors
        },
        { status: 400 }
      );
    }

    // Return successful checkout
    return NextResponse.json({
      success: true,
      checkout: {
        id: checkout.id,
        webUrl: checkout.webUrl,
        totalPrice: checkout.totalPrice,
        subtotalPrice: checkout.subtotalPrice,
        totalTax: checkout.totalTax
      },
      itemCount: shopifyItems.length,
      totalItems: validatedData.items.length
    });

  } catch (error) {
    console.error('Checkout API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          message: 'Please check your request and try again.',
          details: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.'
      },
      { status: 500 }
    );
  }
}