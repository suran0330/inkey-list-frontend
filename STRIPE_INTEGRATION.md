# Stripe Payment Integration

This project now includes a complete Stripe payment integration as an alternative to the existing Shopify checkout. The integration supports both one-time payments and handles mixed carts with Shopify and mock products.

## Features

- **Multiple Payment Methods**: Choose between Shopify checkout, Stripe credit card payments, or demo checkout
- **Embedded Payment Forms**: Stripe Elements integration with card, Apple Pay, and Google Pay
- **Checkout Sessions**: Redirect-based Stripe checkout for simplified payment flow
- **Mixed Cart Support**: Handle carts containing both Shopify products and mock products
- **Secure Configuration**: Proper environment variable handling and security best practices
- **TypeScript Support**: Full type safety throughout the integration
- **Error Handling**: Comprehensive error handling and user feedback

## Setup Instructions

### 1. Get Stripe API Keys

1. Sign up for a Stripe account at [https://stripe.com](https://stripe.com)
2. Go to your [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Copy your **Publishable key** (starts with `pk_test_`)
4. Copy your **Secret key** (starts with `sk_test_`)

### 2. Configure Environment Variables

Add your Stripe keys to `.env.local`:

```bash
# Stripe Configuration (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
NEXT_PUBLIC_STRIPE_ENABLED=true
```

**Important**: 
- Never commit real API keys to version control
- Use test keys during development
- Switch to live keys only in production

### 3. Test the Integration

1. Start the development server: `bun run dev`
2. Add products to your cart
3. Go to checkout page
4. Select "Credit Card" as payment method
5. Use Stripe's test card numbers:
   - `4242424242424242` (Visa)
   - `4000000000000002` (Card declined)
   - Use any future expiry date and any 3-digit CVC

## Payment Methods Available

### 1. Shopify Checkout
- **When**: Cart contains Shopify products
- **Behavior**: Redirects to Shopify's hosted checkout
- **Supports**: Only Shopify products (mock products excluded)

### 2. Stripe Credit Card
- **When**: Stripe is configured (`NEXT_PUBLIC_STRIPE_ENABLED=true`)
- **Behavior**: Processes all cart items through Stripe
- **Supports**: All product types (Shopify + mock products)
- **Payment Methods**: Credit cards, Apple Pay, Google Pay

### 3. Demo Checkout
- **When**: Cart contains only mock products
- **Behavior**: Simulates order placement without payment
- **Supports**: Mock products only

## File Structure

```
src/
├── lib/stripe/
│   ├── config.ts         # Stripe configuration and validation
│   ├── client.ts         # Client-side Stripe setup
│   └── server.ts         # Server-side Stripe setup
├── types/
│   └── stripe.ts         # TypeScript types for Stripe
├── components/
│   ├── StripeCheckoutForm.tsx      # Embedded payment form
│   └── PaymentMethodSelector.tsx   # Payment method selection
├── app/
│   ├── api/checkout/
│   │   └── stripe/
│   │       ├── route.ts                    # Checkout session creation
│   │       └── payment-intent/route.ts     # Payment intent creation
│   └── checkout/
│       ├── page.tsx         # Enhanced checkout page
│       └── success/page.tsx # Payment success page
```

## API Endpoints

### `/api/checkout/stripe`
Creates a Stripe checkout session for redirect-based payments.

**Request**:
```json
{
  "items": [/* cart items */],
  "customerEmail": "customer@example.com",
  "metadata": { "hasShopifyItems": "true" }
}
```

**Response**:
```json
{
  "success": true,
  "sessionId": "cs_...",
  "url": "https://checkout.stripe.com/..."
}
```

### `/api/checkout/stripe/payment-intent`
Creates a payment intent for embedded payment forms.

**Request**:
```json
{
  "items": [/* cart items */],
  "customerEmail": "customer@example.com",
  "metadata": { "orderType": "mixed" }
}
```

**Response**:
```json
{
  "success": true,
  "clientSecret": "pi_..._secret_...",
  "paymentIntentId": "pi_..."
}
```

## Security Considerations

1. **API Keys**: Secret keys are only used server-side, never exposed to clients
2. **Environment Variables**: Proper separation of public vs private keys
3. **Input Validation**: All API inputs are validated before processing
4. **Error Handling**: Errors don't expose sensitive information
5. **HTTPS Required**: Stripe requires HTTPS in production

## Testing

### Test Card Numbers

| Card Number | Brand | Result |
|-------------|-------|--------|
| 4242424242424242 | Visa | Success |
| 4000000000000002 | Visa | Declined |
| 4000000000000069 | Visa | Expired |
| 4000000000000127 | Visa | Incorrect CVC |

### Test Scenarios

1. **Stripe-only Cart**: Add mock products → Should show Stripe payment option
2. **Shopify-only Cart**: Add Shopify products → Should show both Stripe and Shopify options
3. **Mixed Cart**: Add both types → Should show both options, Stripe processes all items
4. **Payment Failures**: Use declined test cards → Should show appropriate error messages

## Production Deployment

### 1. Switch to Live Keys
Replace test keys with live keys from your Stripe dashboard:
```bash
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
```

### 2. Enable Webhooks (Optional)
For production, consider setting up webhooks to handle:
- Payment confirmations
- Failed payments
- Subscription events

### 3. Configure Domain
Update success/cancel URLs in the Stripe configuration if needed.

## Troubleshooting

### Stripe Not Appearing as Payment Option
- Check `NEXT_PUBLIC_STRIPE_ENABLED=true` in `.env.local`
- Verify API keys are correctly formatted (start with `pk_test_` and `sk_test_`)
- Restart development server after changing environment variables

### Payment Form Not Loading
- Check browser console for JavaScript errors
- Verify `@stripe/stripe-js` and `@stripe/react-stripe-js` are installed
- Ensure proper Suspense boundary around components using `useSearchParams`

### API Errors
- Check server console for detailed error messages
- Verify secret key has proper permissions
- Test with Stripe's test card numbers

## Next Steps

1. **Add Webhooks**: Implement webhook handling for payment confirmations
2. **Enhanced UI**: Add more payment method icons and better styling
3. **Analytics**: Track payment method preferences and conversion rates
4. **Subscriptions**: Extend to support recurring payments if needed
5. **Multi-currency**: Add support for different currencies

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Elements Guide](https://stripe.com/docs/stripe-js)
- [Test Card Numbers](https://stripe.com/docs/testing)