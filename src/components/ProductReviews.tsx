"use client";

import { useState } from "react";
import { Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductReviews, getReviewStats } from "@/data/reviews";

interface ProductReviewsProps {
  productId: string;
  productHandle?: string;
}

export default function ProductReviews({ productId, productHandle }: ProductReviewsProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const reviews = getProductReviews(productId, productHandle);
  const stats = getReviewStats(productId, productHandle);

  // Before/After photos from reviews
  const beforeAfterPhotos = [
    {
      before: "https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=200&h=200&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=200&h=200&fit=crop&crop=face",
      caption: "I've struggled with hormonal acne for 15+ years and this is the only product that has helped me heal my acne more.",
      user: "Sarah"
    },
    {
      before: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=200&h=200&fit=crop&crop=face",
      caption: "The changes found it helpful - first time trying this specific acne cleanser. These products helped reduce my inflammation and acne breakouts! Not a magic fix but a good foundation.",
      user: "Christine"
    },
    {
      before: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=200&h=200&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face",
      caption: "Calling total INKEYlist products for 3 years.",
      user: "Celia"
    }
  ];

  // User generated content with more authentic skincare content
  const userContent = [
    {
      type: "video",
      url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
      caption: "Really acne cleanser powerful 💖",
      user: "@skincarebyemma"
    },
    {
      type: "video",
      url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=200&h=200&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=200&h=200&fit=crop",
      caption: "THE INKEY LIST BRIGHTENING CLEANSER",
      user: "@glowwithsarah"
    },
    {
      type: "video",
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&h=200&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=200&h=200&fit=crop",
      caption: "Would 100% get two boosters!!!",
      user: "@skincarewithlex"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=200&h=200&fit=crop",
      caption: "Double cleanse done ✅",
      user: "@clearskinjourney"
    },
    {
      type: "video",
      url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop",
      caption: "Morning routine with The INKEY List",
      user: "@skincare_addict"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=200&h=200&fit=crop",
      caption: "My holy grail cleanser 🙌",
      user: "@acnewarrior"
    },
    {
      type: "video",
      url: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=200&h=200&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=200&h=200&fit=crop",
      caption: "Before bed skincare routine",
      user: "@nighttimeskincare"
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop",
      caption: "Results after 2 months! 🤩",
      user: "@glowingskin2024"
    }
  ];

  // Additional customer photos for the grid
  const customerPhotos = [
    "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop&crop=face"
  ];

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`${sizeClass} ${
              i < Math.floor(rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 mt-16">
      {/* Before/After Photo Grid */}
      <div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {beforeAfterPhotos.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <div className="relative">
                  <img
                    src={item.before}
                    alt="Before"
                    className="w-full aspect-square object-cover rounded"
                  />
                  <span className="absolute top-1 left-1 bg-black text-white text-xs px-1 py-0.5 rounded">
                    BEFORE
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={item.after}
                    alt="After"
                    className="w-full aspect-square object-cover rounded"
                  />
                  <span className="absolute top-1 left-1 bg-black text-white text-xs px-1 py-0.5 rounded">
                    AFTER
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-tight">
                "{item.caption}"
              </p>
              <p className="text-xs text-gray-500 font-medium">- {item.user}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="text-sm text-gray-500">••••</button>
        </div>
      </div>

      {/* User Generated Content */}
      <div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {userContent.slice(0, 4).map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              <img
                src={item.url}
                alt="User content"
                className="w-full aspect-square object-cover rounded"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-2">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-1 left-1 right-1">
                <p className="text-xs text-white bg-black bg-opacity-50 px-1 py-0.5 rounded text-center">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-8">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-medium">REVIEWS</h2>
          <h3 className="text-xl font-medium text-gray-500">QUESTIONS</h3>
        </div>

        {/* Review Summary */}
        <div className="flex gap-12 mb-8">
          {/* Left side - Rating breakdown */}
          <div className="w-64">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-medium">{stats.averageRating}</span>
                {renderStars(stats.averageRating, "md")}
              </div>

              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 text-sm">
                    <span className="w-8">{rating}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-400 h-2 rounded-full"
                        style={{ width: `${stats.percentage[rating as keyof typeof stats.percentage]}%` }}
                      />
                    </div>
                    <span className="w-8 text-gray-500">{stats.percentage[rating as keyof typeof stats.percentage]}%</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4">
                Write a review
              </Button>
            </div>
          </div>

          {/* Right side - Customer photos grid */}
          <div className="flex-1">
            <h4 className="font-medium mb-3">Customer photos & videos</h4>
            <div className="grid grid-cols-8 gap-1">
              {customerPhotos.map((photo, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded">
                  <img
                    src={photo}
                    alt="Customer photo"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-6">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="all">All reviews</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
            <option value="photos">With photos</option>
          </select>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex gap-4">
                {/* Left side - Rating and user info */}
                <div className="w-32 flex-shrink-0">
                  <div className="space-y-1">
                    {renderStars(review.rating)}
                    <p className="text-sm font-medium">{review.userName}</p>
                    <p className="text-xs text-gray-500">Verified Purchase</p>
                    <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Right side - Review content */}
                <div className="flex-1">
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {review.content}
                  </p>

                  {/* Review images */}
                  {review.media.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.media.slice(0, 3).map((media) => (
                        <img
                          key={media.id}
                          src={media.url}
                          alt="Review photo"
                          className="w-16 h-16 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}

                  {/* Helpful buttons */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="hover:text-black">
                      Helpful ({review.helpful})
                    </button>
                    <button className="hover:text-black">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="px-8">
            Show more reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
