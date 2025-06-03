"use client";

import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { User, Package, Heart, Settings, Crown, Edit } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { state, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  useEffect(() => {
    if (state.user) {
      setFormData({
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        email: state.user.email
      });
    }
  }, [state.user]);

  if (!isAuthenticated || !state.user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#1c1c22] mb-4 font-lato">
            Please Sign In
          </h1>
          <p className="text-[#747474] mb-8 font-inter">
            You need to be signed in to view your account.
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

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#747474] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link> /
          <span className="text-[#1c1c22]"> My Account</span>
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
                  {user.isInsider && (
                    <div className="flex items-center space-x-1">
                      <Crown className="h-3 w-3 text-[#746cad]" />
                      <span className="text-xs text-[#746cad] font-medium font-inter">
                        INKEY Insider
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <nav className="space-y-2">
                <Link href="/account">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg text-[#1c1c22] font-inter">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </div>
                </Link>
                <Link href="/account/orders">
                  <div className="flex items-center space-x-3 p-3 hover:bg-white rounded-lg text-[#747474] hover:text-[#1c1c22] transition-colors font-inter">
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
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#1c1c22] font-lato">
                  Profile Information
                </h1>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-[#c1c0cb]"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1c1c22] mb-2 font-inter">
                        First Name
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="border-[#c1c0cb] focus:border-[#746cad]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1c1c22] mb-2 font-inter">
                        Last Name
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="border-[#c1c0cb] focus:border-[#746cad]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1c1c22] mb-2 font-inter">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-[#c1c0cb] focus:border-[#746cad]"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleSave}
                      className="bg-[#746cad] hover:bg-[#aca4e9] text-white"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-[#c1c0cb]"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#747474] mb-1 font-inter">
                        First Name
                      </label>
                      <p className="text-[#1c1c22] font-inter">{user.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#747474] mb-1 font-inter">
                        Last Name
                      </label>
                      <p className="text-[#1c1c22] font-inter">{user.lastName}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#747474] mb-1 font-inter">
                      Email Address
                    </label>
                    <p className="text-[#1c1c22] font-inter">{user.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#747474] mb-1 font-inter">
                      Member Since
                    </label>
                    <p className="text-[#1c1c22] font-inter">
                      {new Date(user.dateJoined).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#747474] mb-1 font-inter">
                      Account Status
                    </label>
                    <div className="flex items-center space-x-2">
                      {user.isInsider ? (
                        <>
                          <Crown className="h-4 w-4 text-[#746cad]" />
                          <span className="text-[#746cad] font-medium font-inter">INKEY Insider</span>
                        </>
                      ) : (
                        <span className="text-[#1c1c22] font-inter">Regular Member</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="bg-[#efeff0] rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-[#1c1c22] font-lato">
                  {user.orders.length}
                </div>
                <div className="text-[#747474] text-sm font-inter">Total Orders</div>
              </div>
              <div className="bg-[#efeff0] rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-[#1c1c22] font-lato">
                  ${user.orders.reduce((total, order) => total + order.total, 0).toFixed(2)}
                </div>
                <div className="text-[#747474] text-sm font-inter">Total Spent</div>
              </div>
              <div className="bg-[#efeff0] rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-[#1c1c22] font-lato">
                  {user.isInsider ? '30%' : '0%'}
                </div>
                <div className="text-[#747474] text-sm font-inter">Discount Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
