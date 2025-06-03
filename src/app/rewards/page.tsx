"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, Star, Gift, Crown, ShoppingBag, Award } from "lucide-react";
import Link from "next/link";

export default function RewardsPage() {
  const { isAuthenticated, state: authState, openSignupModal } = useAuth();

  const rewardTiers = [
    {
      name: "INKEY Beginner",
      icon: Heart,
      pointsRequired: 0,
      benefits: [
        "Earn 1 point per $1 spent",
        "Birthday surprise",
        "Free shipping on $50+"
      ],
      color: "bg-gray-400"
    },
    {
      name: "INKEY Enthusiast",
      icon: Star,
      pointsRequired: 100,
      benefits: [
        "Earn 1.5 points per $1 spent",
        "Early access to sales",
        "Free samples with orders",
        "All previous tier benefits"
      ],
      color: "bg-blue-500"
    },
    {
      name: "INKEY Expert",
      icon: Award,
      pointsRequired: 250,
      benefits: [
        "Earn 2 points per $1 spent",
        "Exclusive product launches",
        "Personal skincare consultation",
        "All previous tier benefits"
      ],
      color: "bg-purple-500"
    },
    {
      name: "INKEY Insider",
      icon: Crown,
      pointsRequired: 500,
      benefits: [
        "Earn 2.5 points per $1 spent",
        "30% off insider pricing",
        "VIP customer service",
        "Quarterly premium gifts",
        "All previous tier benefits"
      ],
      color: "bg-[#746cad]"
    }
  ];

  const rewardRedemptions = [
    { points: 50, reward: "$5 off your next order", icon: Gift },
    { points: 100, reward: "Free deluxe sample", icon: Star },
    { points: 200, reward: "$20 off your next order", icon: Gift },
    { points: 300, reward: "Free full-size product", icon: ShoppingBag },
    { points: 500, reward: "Exclusive product bundle", icon: Crown },
  ];

  const userPoints = authState.user?.orders.reduce((total, order) => {
    return total + Math.floor(order.total);
  }, 0) || 0;

  const getCurrentTier = (points: number) => {
    if (points >= 500) return rewardTiers[3];
    if (points >= 250) return rewardTiers[2];
    if (points >= 100) return rewardTiers[1];
    return rewardTiers[0];
  };

  const getNextTier = (points: number) => {
    if (points < 100) return rewardTiers[1];
    if (points < 250) return rewardTiers[2];
    if (points < 500) return rewardTiers[3];
    return null;
  };

  const currentTier = getCurrentTier(userPoints);
  const nextTier = getNextTier(userPoints);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#747474] mb-8 font-inter">
          <Link href="/" className="hover:text-[#1c1c22]">Home</Link> /
          <span className="text-[#1c1c22]"> Rewards</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1c1c22] mb-4 font-lato">
            INKEY Rewards
          </h1>
          <p className="text-xl text-[#747474] mb-8 font-inter">
            Earn points with every purchase and unlock exclusive benefits
          </p>

          {isAuthenticated ? (
            <div className="max-w-md mx-auto bg-[#efeff0] rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <currentTier.icon className={`h-8 w-8 ${currentTier.color.replace('bg-', 'text-')} mr-2`} />
                <h2 className="text-xl font-bold text-[#1c1c22] font-inter">
                  {currentTier.name}
                </h2>
              </div>
              <div className="text-3xl font-bold text-[#746cad] mb-2 font-lato">
                {userPoints} points
              </div>
              {nextTier && (
                <p className="text-sm text-[#747474] font-inter">
                  {nextTier.pointsRequired - userPoints} points to {nextTier.name}
                </p>
              )}
              {nextTier && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div
                    className="bg-[#746cad] h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (userPoints / nextTier.pointsRequired) * 100)}%`
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={openSignupModal}
              className="bg-[#746cad] hover:bg-[#aca4e9] text-white px-8 py-3"
            >
              <Heart className="h-5 w-5 mr-2" />
              Join Rewards Program
            </Button>
          )}
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] text-center mb-8 font-lato">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#746cad] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1c1c22] mb-2 font-inter">
                1. Shop & Earn
              </h3>
              <p className="text-[#747474] font-inter">
                Earn points with every purchase. The more you spend, the more you earn!
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#746cad] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1c1c22] mb-2 font-inter">
                2. Level Up
              </h3>
              <p className="text-[#747474] font-inter">
                Reach new tiers to unlock better earning rates and exclusive perks
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#746cad] rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1c1c22] mb-2 font-inter">
                3. Redeem Rewards
              </h3>
              <p className="text-[#747474] font-inter">
                Use your points for discounts, free products, and exclusive experiences
              </p>
            </div>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] text-center mb-8 font-lato">
            Reward Tiers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`rounded-xl p-6 text-white ${tier.color} ${
                  isAuthenticated && currentTier.name === tier.name
                    ? 'ring-4 ring-yellow-400'
                    : ''
                }`}
              >
                <div className="text-center">
                  <tier.icon className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-bold mb-2 font-inter">{tier.name}</h3>
                  <p className="text-sm opacity-90 mb-4 font-inter">
                    {tier.pointsRequired === 0 ? 'Join now' : `${tier.pointsRequired} points`}
                  </p>

                  <ul className="text-sm space-y-2 text-left">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start font-inter">
                        <span className="mr-2">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redemption Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#1c1c22] text-center mb-8 font-lato">
            Redeem Your Points
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewardRedemptions.map((redemption, index) => (
              <div key={index} className="border border-[#c1c0cb] rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <redemption.icon className="h-12 w-12 text-[#746cad] mx-auto mb-4" />
                <h3 className="font-semibold text-[#1c1c22] mb-2 font-inter">
                  {redemption.reward}
                </h3>
                <p className="text-2xl font-bold text-[#746cad] mb-4 font-lato">
                  {redemption.points} points
                </p>
                <Button
                  variant="outline"
                  className="w-full border-[#746cad] text-[#746cad] hover:bg-[#746cad] hover:text-white"
                  disabled={!isAuthenticated || userPoints < redemption.points}
                >
                  {!isAuthenticated ? 'Sign in to redeem' :
                   userPoints < redemption.points ? 'Insufficient points' : 'Redeem'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1c1c22] text-center mb-8 font-lato">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#1c1c22] mb-2 font-inter">
                How do I earn points?
              </h3>
              <p className="text-[#747474] font-inter">
                You earn points automatically with every purchase. The earning rate depends on your tier level, starting at 1 point per $1 spent.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#1c1c22] mb-2 font-inter">
                When do points expire?
              </h3>
              <p className="text-[#747474] font-inter">
                Points never expire as long as you make at least one purchase within 12 months.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#1c1c22] mb-2 font-inter">
                Can I combine rewards with other discounts?
              </h3>
              <p className="text-[#747474] font-inter">
                Point redemptions cannot be combined with other promotional codes, but tier benefits like Insider pricing are automatically applied.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
