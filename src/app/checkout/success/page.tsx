"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2, ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const sessionIdParam = searchParams.get('session_id');
    
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
      // Clear the cart after successful payment
      clearCart();
    }
    
    setLoading(false);
  }, [searchParams, clearCart]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <Loader2 className="h-16 w-16 text-[#746cad] mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Processing your order...
          </h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-[#1c1c22] mb-4 font-lato">
              Order Confirmed!
            </h1>
            <p className="text-lg text-[#747474] font-inter">
              Thank you for your purchase. Your order has been successfully processed.
            </p>
          </div>

          {sessionId && (
            <div className="bg-[#efeff0] rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-[#1c1c22] mb-2 font-inter">
                Order Details
              </h2>
              <p className="text-sm text-[#747474] font-inter">
                Order ID: <span className="font-mono text-[#1c1c22]">{sessionId}</span>
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <Package className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div className="text-left">
                <h3 className="text-blue-800 font-medium font-inter">What's Next?</h3>
                <div className="text-blue-700 text-sm mt-2 space-y-1 font-inter">
                  <p>• You'll receive an order confirmation email shortly</p>
                  <p>• We'll send tracking information once your order ships</p>
                  <p>• Standard shipping takes 3-5 business days</p>
                  <p>• Free shipping on orders over $50</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/account/orders">
              <Button className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white">
                View Order History
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full border-[#c1c0cb]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <Loader2 className="h-16 w-16 text-[#746cad] mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Loading...
          </h1>
        </div>
        <Footer />
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}