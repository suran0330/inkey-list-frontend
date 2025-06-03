import Stripe from 'stripe';
import { stripeConfig, isStripeConfigured } from './config';

let stripe: Stripe | null = null;

export const getStripeServer = (): Stripe => {
  if (!stripe) {
    if (!isStripeConfigured()) {
      throw new Error('Stripe is not properly configured. Check your environment variables.');
    }
    
    stripe = new Stripe(stripeConfig.secretKey, {
      apiVersion: '2025-04-30.basil',
      typescript: true,
    });
  }
  
  return stripe;
};

export { stripeConfig, isStripeConfigured } from './config';