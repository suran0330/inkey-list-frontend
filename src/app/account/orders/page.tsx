"use client";

import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Package, Heart, Settings, Eye } from "lucide-react";
import Link from "next/link";

export default function OrderHistoryPage() {
  const { state, isAuthenticated } = useAuth();

  if (!isAuthenticated || !state.user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Please Sign In
          </h1>
          <p className="text-[#747474] mb-8 font-inter">
            You need to be signed in to view your orders.
          </p>
          <Link href="/">
            <Button className="bg-[#746cad] hover:bg-[#aca4e9] text-white">
              Go Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const user = state.user;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#747474] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link> /
          <Link href="/account" className="hover:text-[#1c1c22]"> My Account</Link> /
          <span className="text-[#1c1c22]"> Order History</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[#efeff0] rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#746cad] rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1c1c22] font-inter">
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
              </div>

              <nav className="space-y-2">
                <Link href="/account">
                  <div className="flex items-center space-x-3 p-3 hover:bg-white rounded-lg text-[#747474] hover:text-[#1c1c22] transition-colors font-inter">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </div>
                </Link>
                <Link href="/account/orders">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg text-[#1c1c22] font-inter">
                    <Package className="h-4 w-4" />
                    <span>Order History</span>
                  </div>
                </Link>
                <Link href="/account/wishlist">
                  <div className="flex items-center space-x-3 p-3 hover:bg-white rounded-lg text-[#747474] hover:text-[#1c1c22] transition-colors font-inter">
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </div>
                </Link>
                <Link href="/account/settings">
                  <div className="flex items-center space-x-3 p-3 hover:bg-white rounded-lg text-[#747474] hover:text-[#1c1c22] transition-colors font-inter">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#c1c0cb] rounded-lg p-6">
              <h1 className="text-2xl font-bold text-[#1c1c22] mb-6 font-lato">
                Order History
              </h1>

              {user.orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-[#c1c0cb] mx-auto mb-4" />
                  <p className="text-[#747474] font-inter">No orders yet</p>
                  <p className="text-sm text-[#97979d] mt-2 font-inter">
                    When you make your first purchase, it will appear here
                  </p>
                  <Link href="/">
                    <Button className="mt-4 bg-[#746cad] hover:bg-[#aca4e9] text-white">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {user.orders.map((order) => (
                    <div key={order.id} className="border border-[#c1c0cb] rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-[#1c1c22] font-inter">
                            Order #{order.id.toUpperCase()}
                          </h3>
                          <p className="text-sm text-[#747474] font-inter">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="text-lg font-bold text-[#1c1c22] mt-1 font-inter">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-2 border-b border-[#efeff0] last:border-b-0">
                            <div>
                              <p className="font-medium text-[#1c1c22] font-inter">
                                {item.productName}
                              </p>
                              <p className="text-sm text-[#747474] font-inter">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium text-[#1c1c22] font-inter">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm" className="border-[#c1c0cb]">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          {order.status === 'delivered' && (
                            <Button variant="outline" size="sm" className="border-[#c1c0cb]">
                              Reorder
                            </Button>
                          )}
                        </div>
                        {order.status === 'shipped' && (
                          <Button variant="outline" size="sm" className="border-[#c1c0cb]">
                            Track Package
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
