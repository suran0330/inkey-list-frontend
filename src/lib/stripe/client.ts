import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { stripeConfig } from './config';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    if (!stripeConfig.publishableKey) {
      console.warn('Stripe publishable key not found');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(stripeConfig.publishableKey);
  }
  return stripePromise;
};

export { stripeConfig } from './config';