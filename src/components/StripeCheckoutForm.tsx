"use client";

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, AlertCircle } from 'lucide-react';

interface StripeCheckoutFormProps {
  clientSecret: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function StripeCheckoutForm({ 
  clientSecret, 
  onSuccess, 
  onError 
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      
      if (submitError) {
        setError(submitError.message || 'An error occurred');
        setLoading(false);
        onError?.(submitError.message || 'An error occurred');
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
        onError?.(confirmError.message || 'Payment failed');
      } else {
        onSuccess?.();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#1c1c22] font-inter">
          Payment Information
        </h2>
        
        <div className="p-4 border border-[#c1c0cb] rounded-lg">
          <PaymentElement
            options={{
              layout: 'tabs',
              paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
            }}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Payment Error</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white py-3 font-medium disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4 mr-2" />
            Complete Payment
          </>
        )}
      </Button>

      <div className="text-xs text-[#747474] text-center font-inter">
        <p>Your payment information is encrypted and secure.</p>
        <p className="mt-1">Powered by Stripe</p>
      </div>
    </form>
  );
}