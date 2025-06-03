"use client";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { CreditCard, Lock, ArrowLeft, ShoppingBag, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Elements } from '@stripe/react-stripe-js';
import { getStripe, stripeConfig } from '@/lib/stripe/client';
import { isStripeConfigured } from '@/lib/stripe/config';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import StripeCheckoutForm from '@/components/StripeCheckoutForm';
import type { PaymentMethod, PaymentMethodOption } from '@/types/stripe';

// Form validation schema
const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(1, "Country is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  checkoutUrl?: string;
  hasShopifyItems?: boolean;
  hasMockItems?: boolean;
}

interface StripeState {
  clientSecret: string | null;
  paymentIntentId: string | null;
  loading: boolean;
  error: string | null;
}

export default function CheckoutPage() {
  const { 
    state, 
    getSubtotal, 
    getShopifyItems, 
    getMockItems, 
    hasShopifyItems, 
    hasMockItems,
    clearCart 
  } = useCart();
  const { state: authState, isAuthenticated, openLoginModal } = useAuth();
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({ status: 'idle' });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('shopify');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [stripeState, setStripeState] = useState<StripeState>({
    clientSecret: null,
    paymentIntentId: null,
    loading: false,
    error: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: authState.user?.email || "",
      firstName: authState.user?.firstName || "",
      lastName: authState.user?.lastName || "",
      country: "United States"
    }
  });

  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Payment method options
  const paymentMethodOptions: PaymentMethodOption[] = [
    {
      id: 'shopify',
      name: 'Shopify Checkout',
      description: 'Secure checkout powered by Shopify (Shopify products only)',
      available: hasShopifyItems(),
    },
    {
      id: 'stripe',
      name: 'Credit Card',
      description: 'Pay securely with your credit or debit card',
      available: isStripeConfigured(),
    },
    {
      id: 'mock',
      name: 'Demo Checkout',
      description: 'Demo checkout for testing purposes',
      available: !hasShopifyItems() && hasMockItems(),
    },
  ];

  // Auto-select appropriate payment method
  useEffect(() => {
    const availableOptions = paymentMethodOptions.filter(option => option.available);
    
    if (availableOptions.length > 0) {
      // Prefer Stripe if available, then Shopify, then mock
      const preferredOrder: PaymentMethod[] = ['stripe', 'shopify', 'mock'];
      const preferred = preferredOrder.find(method => 
        availableOptions.some(option => option.id === method)
      );
      
      if (preferred && preferred !== selectedPaymentMethod) {
        setSelectedPaymentMethod(preferred);
      }
    }
  }, [hasShopifyItems(), hasMockItems()]);

  // Create Stripe payment intent
  const createStripePaymentIntent = async (customerEmail: string) => {
    setStripeState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch('/api/checkout/stripe/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items,
          customerEmail,
          metadata: {
            hasShopifyItems: hasShopifyItems().toString(),
            hasMockItems: hasMockItems().toString(),
          },
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStripeState({
          clientSecret: result.clientSecret,
          paymentIntentId: result.paymentIntentId,
          loading: false,
          error: null,
        });
        setShowPaymentForm(true);
      } else {
        throw new Error(result.error || 'Failed to create payment intent');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create payment intent';
      setStripeState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      setCheckoutState({
        status: 'error',
        message: errorMessage,
      });
    }
  };

  // Handle Stripe checkout redirect
  const handleStripeCheckout = async (customerEmail: string) => {
    setCheckoutState({ status: 'loading' });

    try {
      const response = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items,
          customerEmail,
          metadata: {
            hasShopifyItems: hasShopifyItems().toString(),
            hasMockItems: hasMockItems().toString(),
          },
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        throw new Error(result.error || 'Stripe checkout creation failed');
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      setCheckoutState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Stripe checkout failed',
      });
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    // Handle different payment methods
    if (selectedPaymentMethod === 'stripe') {
      if (showPaymentForm) {
        // Payment form will handle submission
        return;
      } else {
        // Redirect to Stripe checkout
        await handleStripeCheckout(data.email);
        return;
      }
    }

    setCheckoutState({ status: 'loading' });

    try {
      const shopifyItems = getShopifyItems();
      const mockItems = getMockItems();

      // If Shopify checkout is selected and there are Shopify items
      if (selectedPaymentMethod === 'shopify' && shopifyItems.length > 0) {
        const checkoutData = {
          email: data.email,
          items: state.items.map(item => {
            const isShopifyProduct = 'isShopifyProduct' in item.product && item.product.isShopifyProduct;
            return {
              variantId: isShopifyProduct && 'variants' in item.product && Array.isArray(item.product.variants)
                ? (item.product.variants as any[])[0]?.id || item.product.id 
                : item.product.id,
              quantity: item.quantity,
              productId: item.product.id,
              isShopifyProduct
            };
          }),
          shippingAddress: {
            firstName: data.firstName,
            lastName: data.lastName,
            address1: data.address,
            city: data.city,
            province: data.state,
            zip: data.zipCode,
            country: data.country
          }
        };

        const response = await fetch('/api/checkout/shopify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkoutData),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setCheckoutState({
            status: 'success',
            message: `Checkout created successfully! ${mockItems.length > 0 ? 'Note: Mock products were excluded from Shopify checkout.' : ''}`,
            checkoutUrl: result.checkout.webUrl,
            hasShopifyItems: shopifyItems.length > 0,
            hasMockItems: mockItems.length > 0
          });
          
          // Redirect to Shopify checkout after a short delay
          setTimeout(() => {
            window.location.href = result.checkout.webUrl;
          }, 2000);
        } else {
          throw new Error(result.message || 'Checkout creation failed');
        }
      } else if (selectedPaymentMethod === 'mock') {
        // Handle mock-only checkout
        setCheckoutState({
          status: 'success',
          message: 'Demo order placed successfully! (This contains only mock products)',
          hasShopifyItems: false,
          hasMockItems: true
        });
        
        // Clear cart after demo order
        setTimeout(() => {
          clearCart();
          setCheckoutState({ status: 'idle' });
        }, 3000);
      } else {
        throw new Error('Invalid payment method selected');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      });
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-16 w-16 text-[#c1c0cb] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Your cart is empty
          </h1>
          <p className="text-[#747474] mb-8 font-inter">
            Add some products to your cart before checking out.
          </p>
          <Link href="/">
            <Button className="bg-[#746cad] hover:bg-[#aca4e9] text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-[#746cad] hover:text-[#aca4e9] font-inter">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to shopping
          </Link>
        </div>

        {/* Success/Error Messages */}
        {checkoutState.status === 'success' && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">{checkoutState.message}</p>
              {checkoutState.checkoutUrl && (
                <p className="text-green-700 text-sm mt-1">
                  Redirecting to Shopify checkout...
                </p>
              )}
            </div>
          </div>
        )}

        {checkoutState.status === 'error' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Checkout Error</p>
              <p className="text-red-700 text-sm mt-1">{checkoutState.message}</p>
            </div>
          </div>
        )}

        {/* Cart Type Information */}
        {(hasShopifyItems() || hasMockItems()) && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="text-blue-800 font-medium">Cart Information</p>
                {hasShopifyItems() && hasMockItems() ? (
                  <p className="text-blue-700 text-sm mt-1">
                    Your cart contains both real Shopify products and demo products. 
                    Only the Shopify products will be processed for actual purchase.
                  </p>
                ) : hasShopifyItems() ? (
                  <p className="text-blue-700 text-sm mt-1">
                    Your cart contains real Shopify products that can be purchased.
                  </p>
                ) : (
                  <p className="text-blue-700 text-sm mt-1">
                    Your cart contains only demo products. This will be a mock checkout.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <h1 className="text-2xl font-bold text-[#1c1c22] mb-8 font-lato">
              Checkout
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-[#1c1c22] font-inter">
                    Contact Information
                  </h2>
                  {!isAuthenticated && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={openLoginModal}
                      className="border-[#c1c0cb]"
                    >
                      Sign In
                    </Button>
                  )}
                </div>

                {isAuthenticated ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                    <p className="text-green-800 text-sm font-inter">
                      ✓ Signed in as {authState.user?.email}
                      {authState.user?.isInsider && (
                        <span className="ml-2 text-[#746cad] font-medium">
                          (INKEY Insider - 30% off applied!)
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-[#efeff0] border border-[#c1c0cb] rounded-lg mb-4">
                    <p className="text-[#747474] text-sm font-inter">
                      💡 Sign in to save your information and earn rewards
                    </p>
                  </div>
                )}

                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    {...register("email")}
                    disabled={isAuthenticated}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-lg font-semibold text-[#1c1c22] mb-4 font-inter">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="First name"
                        {...register("firstName")}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        placeholder="Last name"
                        {...register("lastName")}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Input
                      placeholder="Address"
                      {...register("address")}
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Input
                        placeholder="City"
                        {...register("city")}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        placeholder="State"
                        {...register("state")}
                        className={errors.state ? "border-red-500" : ""}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        placeholder="ZIP code"
                        {...register("zipCode")}
                        className={errors.zipCode ? "border-red-500" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <PaymentMethodSelector
                options={paymentMethodOptions}
                selected={selectedPaymentMethod}
                onSelect={setSelectedPaymentMethod}
                onProceed={() => {
                  if (selectedPaymentMethod === 'stripe' && !showPaymentForm) {
                    createStripePaymentIntent(watch('email'));
                  }
                }}
                loading={stripeState.loading}
              />

              {/* Stripe Payment Form */}
              {selectedPaymentMethod === 'stripe' && showPaymentForm && stripeState.clientSecret && (
                <Elements
                  stripe={getStripe()}
                  options={{
                    clientSecret: stripeState.clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#746cad',
                      },
                    },
                  }}
                >
                  <StripeCheckoutForm
                    clientSecret={stripeState.clientSecret}
                    onSuccess={() => {
                      setCheckoutState({
                        status: 'success',
                        message: 'Payment successful! Redirecting...',
                      });
                      clearCart();
                    }}
                    onError={(error) => {
                      setCheckoutState({
                        status: 'error',
                        message: error,
                      });
                    }}
                  />
                </Elements>
              )}

              {/* Payment Information - Only show for mock items */}
              {selectedPaymentMethod === 'mock' && (
                <div>
                  <h2 className="text-lg font-semibold text-[#1c1c22] mb-4 font-inter">
                    Payment Information (Demo)
                  </h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input placeholder="Card number (Demo)" className="pl-10" disabled />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#97979d]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" disabled />
                      <Input placeholder="CVC" disabled />
                    </div>
                  </div>
                  <p className="text-[#747474] text-sm mt-2 font-inter">
                    This is a demo. No real payment will be processed.
                  </p>
                </div>
              )}

              {/* Submit Button - Only show if not using Stripe embedded form */}
              {!(selectedPaymentMethod === 'stripe' && showPaymentForm) && (
                <Button
                  type="submit"
                  disabled={checkoutState.status === 'loading' || stripeState.loading}
                  className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white py-3 font-medium disabled:opacity-50"
                >
                  {checkoutState.status === 'loading' || stripeState.loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {selectedPaymentMethod === 'stripe' ? 'Setting up payment...' : 'Creating Checkout...'}
                    </>
                  ) : selectedPaymentMethod === 'shopify' ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Proceed to Shopify Checkout
                    </>
                  ) : selectedPaymentMethod === 'stripe' ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Proceed to Stripe Checkout
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Place Demo Order
                    </>
                  )}
                </Button>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#efeff0] rounded-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-[#1c1c22] mb-6 font-inter">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => {
                  const isShopifyProduct = 'isShopifyProduct' in item.product && item.product.isShopifyProduct;
                  return (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-[#1c1c22] font-inter">
                          {item.product.name}
                          {isShopifyProduct && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                              Shopify
                            </span>
                          )}
                          {!isShopifyProduct && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              Demo
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-[#97979d] font-inter">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-[#1c1c22] font-inter">
                        {formatPrice(Number.parseFloat(item.product.price.replace('$', '')) * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Totals */}
              <div className="border-t border-[#c1c0cb] pt-4 space-y-3">
                <div className="flex justify-between text-sm font-inter">
                  <span className="text-[#747474]">Subtotal</span>
                  <span className="text-[#1c1c22]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-inter">
                  <span className="text-[#747474]">Shipping</span>
                  <span className="text-[#1c1c22]">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-inter">
                  <span className="text-[#747474]">Tax</span>
                  <span className="text-[#1c1c22]">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-[#c1c0cb] pt-3">
                  <div className="flex justify-between font-semibold font-inter">
                    <span className="text-[#1c1c22]">Total</span>
                    <span className="text-[#1c1c22]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Cart composition notice */}
              <div className="mt-4 text-xs text-[#747474] font-inter">
                {hasShopifyItems() && hasMockItems() && (
                  <p>* Only Shopify products will be processed for payment</p>
                )}
                {!hasShopifyItems() && hasMockItems() && (
                  <p>* This is a demo checkout with mock products</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}