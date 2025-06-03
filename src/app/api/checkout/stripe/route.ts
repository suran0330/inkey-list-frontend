import { type NextRequest, NextResponse } from 'next/server';
import { getStripeServer, isStripeConfigured } from '@/lib/stripe/server';
import type { StripeCheckoutRequest, StripeLineItem } from '@/types/stripe';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured()) {
      return NextResponse.json({
        success: false,
        error: 'Stripe is not configured'
      }, { status: 500 });
    }

    const body: StripeCheckoutRequest = await request.json();
    const { items, customerEmail, successUrl, cancelUrl, metadata } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No items provided'
      }, { status: 400 });
    }

    const stripe = getStripeServer();

    // Convert cart items to Stripe line items
    const lineItems: StripeLineItem[] = items.map(item => {
      const price = Number.parseFloat(item.product.price.replace('$', ''));
      const isShopifyProduct = 'isShopifyProduct' in item.product && item.product.isShopifyProduct;
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
            description: item.product.description || undefined,
            images: item.product.image ? [item.product.image] : undefined,
            metadata: {
              productId: item.product.id,
              isShopifyProduct: (isShopifyProduct || false).toString(),
            },
          },
          unit_amount: Math.round(price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Calculate totals
    const subtotal = items.reduce((total, item) => {
      const price = Number.parseFloat(item.product.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);

    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax

    // Add shipping as a line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
            description: 'Standard shipping',
          },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    // Add tax as a line item
    if (tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tax',
            description: 'Sales tax',
          },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${request.nextUrl.origin}/checkout`,
      customer_email: customerEmail,
      metadata: {
        ...metadata,
        source: 'inkey-list-clone',
        itemCount: items.length.toString(),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      billing_address_collection: 'required',
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}