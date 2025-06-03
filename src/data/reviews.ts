// TypeScript interfaces for reviews
export interface ReviewMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption: string;
}

export interface BeforeAfter {
  before: string;
  after: string;
  timeframe: string;
}

export interface Review {
  id: string;
  productId: string;
  productHandle: string;
  userId: string;
  userName: string;
  userInitials: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  skinType: string[];
  ageRange: string;
  skinConcerns: string[];
  helpful: number;
  notHelpful: number;
  media: ReviewMedia[];
  beforeAfter?: BeforeAfter;
  userLocation: string;
  reviewLength: 'short' | 'medium' | 'long';
}

// Sample reviews data
export const reviews: Review[] = [
  // Hyaluronic Acid Serum Reviews
  {
    id: "rev_001",
    productId: "hyaluronic-acid",
    productHandle: "hyaluronic-acid-serum",
    userId: "user_001",
    userName: "Sarah M.",
    userInitials: "SM",
    rating: 5,
    title: "Holy grail for dehydrated skin!",
    content: "I've been using this serum for 3 months now and the difference is incredible. My skin was so dehydrated and flaky, especially around my nose and forehead. After just one week of using this twice daily, my skin felt plumper and looked more radiant. The texture is perfect - not sticky or heavy, absorbs quickly. I layer it under my moisturizer and sometimes mix a drop with my foundation for that dewy look. Will definitely repurchase!",
    date: "2024-11-15",
    verified: true,
    skinType: ["Dry", "Sensitive"],
    ageRange: "25-34",
    skinConcerns: ["Dehydration", "Fine Lines", "Dullness"],
    helpful: 47,
    notHelpful: 5,
    media: [
      {
        id: "media_001",
        type: "image",
        url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400",
        caption: "Before using serum - dehydrated skin"
      },
      {
        id: "media_002",
        type: "image",
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400",
        caption: "After 3 months - plump, hydrated skin"
      }
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=400",
      after: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400",
      timeframe: "3 months"
    },
    userLocation: "California, USA",
    reviewLength: "long"
  },
  {
    id: "rev_002",
    productId: "hyaluronic-acid",
    productHandle: "hyaluronic-acid-serum",
    userId: "user_002",
    userName: "Emma K.",
    userInitials: "EK",
    rating: 4,
    title: "Great hydration, subtle results",
    content: "Love how lightweight this feels. Definitely hydrating but took about 6 weeks to see real plumping effects. Great value for money compared to other HA serums.",
    date: "2024-11-10",
    verified: true,
    skinType: ["Combination"],
    ageRange: "18-24",
    skinConcerns: ["Dehydration", "Occasional Breakouts"],
    helpful: 23,
    notHelpful: 6,
    media: [],
    userLocation: "London, UK",
    reviewLength: "short"
  },
  {
    id: "rev_003",
    productId: "hyaluronic-acid",
    productHandle: "hyaluronic-acid-serum",
    userId: "user_003",
    userName: "Jessica L.",
    userInitials: "JL",
    rating: 5,
    title: "Amazing transformation - with photos!",
    content: "I was skeptical about all the hype around hyaluronic acid, but this serum converted me! My skin was looking dull and tired (new mom life), and within 2 weeks I started getting compliments. The texture is like water but somehow deeply hydrating. I use 2-3 drops morning and night. Pro tip: apply on slightly damp skin for better absorption. My makeup looks so much better now too!",
    date: "2024-11-08",
    verified: true,
    skinType: ["Normal", "Dehydrated"],
    ageRange: "25-34",
    skinConcerns: ["Dullness", "Fatigue", "Fine Lines"],
    helpful: 89,
    notHelpful: 6,
    media: [
      {
        id: "media_003",
        type: "image",
        url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
        caption: "Before - tired, dull skin"
      },
      {
        id: "media_004",
        type: "image",
        url: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400",
        caption: "After 2 weeks - glowing, hydrated skin"
      },
      {
        id: "media_005",
        type: "video",
        url: "https://player.vimeo.com/video/sample",
        thumbnail: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400",
        caption: "My morning skincare routine with HA serum"
      }
    ],
    userLocation: "New York, USA",
    reviewLength: "long"
  },

  // Add reviews for common Shopify product handles
  {
    id: "rev_shopify_001",
    productId: "shopify-product-1",
    productHandle: "salicylic-acid-cleanser",
    userId: "user_011",
    userName: "Ashley R.",
    userInitials: "AR",
    rating: 5,
    title: "Best cleanser for acne-prone skin!",
    content: "This BHA cleanser has been a game-changer for my acne-prone skin. I've been using it for 2 months and my breakouts have significantly reduced. It's gentle enough for daily use but effective at removing excess oil and keeping my pores clear.",
    date: "2024-11-20",
    verified: true,
    skinType: ["Oily", "Acne-Prone"],
    ageRange: "18-24",
    skinConcerns: ["Acne", "Blackheads", "Excess Oil"],
    helpful: 67,
    notHelpful: 3,
    media: [
      {
        id: "media_shopify_001",
        type: "image",
        url: "https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=400",
        caption: "Before using cleanser - frequent breakouts"
      },
      {
        id: "media_shopify_002",
        type: "image",
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400",
        caption: "After 2 months - clear, balanced skin"
      }
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=400",
      after: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400",
      timeframe: "2 months"
    },
    userLocation: "Seattle, USA",
    reviewLength: "medium"
  },
  {
    id: "rev_shopify_002",
    productId: "shopify-product-2",
    productHandle: "vitamin-c-serum",
    userId: "user_012",
    userName: "Jennifer M.",
    userInitials: "JM",
    rating: 4,
    title: "Brightening but takes time",
    content: "I've been using this vitamin C serum for about 6 weeks. It definitely helps with brightening and I've noticed my dark spots are lighter. Takes consistent use to see results but worth the patience.",
    date: "2024-11-18",
    verified: true,
    skinType: ["Normal", "Combination"],
    ageRange: "25-34",
    skinConcerns: ["Dark Spots", "Dullness", "Uneven Tone"],
    helpful: 45,
    notHelpful: 8,
    media: [
      {
        id: "media_shopify_003",
        type: "video",
        url: "https://player.vimeo.com/video/sample2",
        thumbnail: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
        caption: "6 week vitamin C progress"
      }
    ],
    userLocation: "Austin, USA",
    reviewLength: "medium"
  },
  {
    id: "rev_shopify_003",
    productId: "shopify-product-3",
    productHandle: "retinol-serum",
    userId: "user_013",
    userName: "Maria G.",
    userInitials: "MG",
    rating: 5,
    title: "Anti-aging powerhouse",
    content: "This retinol serum is amazing! I started slowly with 2x per week and worked up to nightly use. After 4 months, my fine lines are noticeably reduced and my skin texture is much smoother. No irritation when used properly with moisturizer.",
    date: "2024-11-12",
    verified: true,
    skinType: ["Normal", "Mature"],
    ageRange: "35-44",
    skinConcerns: ["Fine Lines", "Aging", "Texture"],
    helpful: 89,
    notHelpful: 4,
    media: [
      {
        id: "media_shopify_004",
        type: "image",
        url: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400",
        caption: "Before retinol - visible fine lines"
      },
      {
        id: "media_shopify_005",
        type: "image",
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
        caption: "After 4 months - smoother, firmer skin"
      }
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400",
      after: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
      timeframe: "4 months"
    },
    userLocation: "Miami, USA",
    reviewLength: "long"
  },
  // Homepage featured products reviews
  {
    id: "rev_mega_water_001",
    productId: "mega-water-cream",
    productHandle: "mega-water-cream",
    userId: "user_020",
    userName: "Rachel T.",
    userInitials: "RT",
    rating: 5,
    title: "Perfect moisturizer for all skin types",
    content: "This water cream is incredible! It's lightweight yet deeply hydrating. Perfect for my combination skin - doesn't make my T-zone oily but keeps my cheeks moisturized all day.",
    date: "2024-11-22",
    verified: true,
    skinType: ["Combination"],
    ageRange: "25-34",
    skinConcerns: ["Dehydration", "Oiliness"],
    helpful: 78,
    notHelpful: 4,
    media: [],
    userLocation: "Toronto, Canada",
    reviewLength: "medium"
  },
  {
    id: "rev_salicylic_001",
    productId: "salicylic-acid-cleanser",
    productHandle: "salicylic-acid-cleanser",
    userId: "user_021",
    userName: "Mike D.",
    userInitials: "MD",
    rating: 5,
    title: "Game changer for acne",
    content: "Been struggling with adult acne and this cleanser finally cleared it up. Gentle but effective, use it every other day to avoid over-drying.",
    date: "2024-11-20",
    verified: true,
    skinType: ["Oily", "Acne-Prone"],
    ageRange: "25-34",
    skinConcerns: ["Acne", "Blackheads"],
    helpful: 92,
    notHelpful: 2,
    media: [],
    userLocation: "Chicago, USA",
    reviewLength: "short"
  },
  {
    id: "rev_succinic_001",
    productId: "succinic-acid-serum",
    productHandle: "succinic-acid-serum",
    userId: "user_022",
    userName: "Lisa K.",
    userInitials: "LK",
    rating: 4,
    title: "Great for spot treatment",
    content: "Love using this on individual breakouts. Really helps reduce inflammation and speeds up healing. The texture is a bit thick but absorbs well.",
    date: "2024-11-18",
    verified: true,
    skinType: ["Combination", "Sensitive"],
    ageRange: "18-24",
    skinConcerns: ["Acne", "Inflammation"],
    helpful: 45,
    notHelpful: 7,
    media: [],
    userLocation: "Los Angeles, USA",
    reviewLength: "short"
  }
];

// Helper functions for reviews
export function getReviewsByProductHandle(handle: string): Review[] {
  return reviews.filter(review => review.productHandle === handle);
}

export function getReviewsByProductId(id: string): Review[] {
  return reviews.filter(review => review.productId === id);
}

export function getAverageRating(productHandle: string): number {
  const productReviews = getReviewsByProductHandle(productHandle);
  if (productReviews.length === 0) return 0;
  
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
}

export function getReviewCount(productHandle: string): number {
  return getReviewsByProductHandle(productHandle).length;
}

export function getRatingDistribution(productHandle: string): { [key: number]: number } {
  const productReviews = getReviewsByProductHandle(productHandle);
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  productReviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++;
  });
  
  return distribution;
}

// Interface for review statistics
export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { [key: number]: number };
  percentage: { [key: number]: number };
}

// Get product reviews (supports both productId and productHandle)
export function getProductReviews(productId: string, productHandle?: string): Review[] {
  if (productHandle) {
    return getReviewsByProductHandle(productHandle);
  }
  return getReviewsByProductId(productId);
}

// Get review statistics (supports both single productId and productId + productHandle)
export function getReviewStats(productId: string, productHandle?: string): ReviewStats {
  const productReviews = getProductReviews(productId, productHandle);
  const totalReviews = productReviews.length;
  
  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      percentage: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }
  
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = Math.round((sum / totalReviews) * 10) / 10;
  
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  productReviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++;
  });
  
  const percentage = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (let i = 1; i <= 5; i++) {
    percentage[i] = totalReviews > 0 ? Math.round((distribution[i] / totalReviews) * 100) : 0;
  }
  
  return {
    averageRating,
    totalReviews,
    ratingDistribution: distribution,
    percentage
  };
}