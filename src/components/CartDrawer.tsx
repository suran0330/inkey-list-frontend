"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, X, ShoppingBag, Info } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const { 
    state, 
    removeItem, 
    updateQuantity, 
    closeCart, 
    getSubtotal,
    hasShopifyItems,
    hasMockItems,
    getShopifyItems,
    getMockItems
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-lato">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({state.items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-[#c1c0cb] mx-auto mb-4" />
                <p className="text-[#747474] font-inter">Your cart is empty</p>
                <p className="text-sm text-[#97979d] mt-2 font-inter">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => {
                  const isShopifyProduct = 'isShopifyProduct' in item.product && item.product.isShopifyProduct;
                  return (
                    <div key={item.product.id} className="flex gap-4 p-4 border border-[#c1c0cb] rounded-lg">
                      <Link href={`/products/${item.product.id}`} onClick={closeCart}>
                        <div className="w-16 h-16 bg-[#efeff0] rounded-lg overflow-hidden cursor-pointer">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product.id}`} onClick={closeCart}>
                          <h3 className="font-semibold text-[#1c1c22] text-sm leading-tight hover:text-[#746cad] transition-colors cursor-pointer font-inter">
                            {item.product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-[#97979d] font-inter">
                            {item.product.category}
                          </p>
                          {isShopifyProduct ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                              Shopify
                            </span>
                          ) : (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              Demo
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-[#1c1c22] mt-1 font-inter">
                          {item.product.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#c1c0cb] rounded">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#efeff0] transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 text-sm font-inter">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#efeff0] transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-[#97979d] hover:text-red-500 transition-colors p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Info */}
          {state.items.length > 0 && (hasShopifyItems() || hasMockItems()) && (
            <div className="border-t border-[#c1c0cb] pt-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 font-medium text-xs">Cart Information</p>
                    {hasShopifyItems() && hasMockItems() ? (
                      <p className="text-blue-700 text-xs mt-1">
                        Mix of real Shopify products and demo items. Only Shopify products can be purchased.
                      </p>
                    ) : hasShopifyItems() ? (
                      <p className="text-blue-700 text-xs mt-1">
                        Real Shopify products ready for purchase.
                      </p>
                    ) : (
                      <p className="text-blue-700 text-xs mt-1">
                        Demo products only - mock checkout available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cart Summary */}
          {state.items.length > 0 && (
            <div className="border-t border-[#c1c0cb] pt-6 mt-6">
              <div className="space-y-3">
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

                {subtotal < 50 && (
                  <p className="text-xs text-[#746cad] font-inter">
                    Add {formatPrice(50 - subtotal)} more for free shipping
                  </p>
                )}

                <div className="border-t border-[#c1c0cb] pt-3">
                  <div className="flex justify-between font-semibold font-inter">
                    <span className="text-[#1c1c22]">Total</span>
                    <span className="text-[#1c1c22]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-3 mt-6">
                <Link href="/checkout" onClick={closeCart}>
                  <Button className="w-full bg-[#746cad] hover:bg-[#aca4e9] text-white py-3 font-medium">
                    {hasShopifyItems() ? 'Proceed to Checkout' : 'Demo Checkout'}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-[#c1c0cb] text-[#747474] hover:text-[#1c1c22]"
                  onClick={closeCart}
                >
                  Continue Shopping
                </Button>
              </div>

              {/* Free Shipping Notice */}
              <div className="mt-4 p-3 bg-[#efeff0] rounded-lg">
                <p className="text-xs text-[#747474] font-inter text-center">
                  🚚 Free shipping on orders over $50
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}