import { type NextRequest, NextResponse } from 'next/server';
import { getStripeServer, isStripeConfigured } from '@/lib/stripe/server';
import type { StripePaymentIntentRequest } from '@/types/stripe';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured()) {
      return NextResponse.json({
        success: false,
        error: 'Stripe is not configured'
      }, { status: 500 });
    }

    const body: StripePaymentIntentRequest = await request.json();
    const { items, customerEmail, metadata } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No items provided'
      }, { status: 400 });
    }

    const stripe = getStripeServer();

    // Calculate totals
    const subtotal = items.reduce((total, item) => {
      const price = Number.parseFloat(item.product.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);

    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        ...metadata,
        source: 'inkey-list-clone',
        itemCount: items.length.toString(),
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        customerEmail: customerEmail || '',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('Stripe payment intent error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}