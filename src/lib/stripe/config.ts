export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
  enabled: process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true',
  currency: 'usd',
  country: 'US',
} as const;

export const isStripeConfigured = (): boolean => {
  return !!(
    stripeConfig.publishableKey &&
    stripeConfig.secretKey &&
    stripeConfig.enabled &&
    stripeConfig.publishableKey.startsWith('pk_') &&
    stripeConfig.secretKey.startsWith('sk_')
  );
};

export type StripeConfig = typeof stripeConfig;