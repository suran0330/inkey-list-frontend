export interface Product {
  id: string;
  name: string;
  shortDescription?: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  images: string[];
  category: string;
  skinTypes?: string[];
  concerns?: string[];
  inStock: boolean;
  featured?: boolean;
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "hyaluronic-acid-serum",
    name: "Hyaluronic Acid Serum",
    shortDescription: "Plumps & hydrates for smoother skin",
    description: "A lightweight serum that holds up to 1000 times its weight in water, providing instant and long-lasting hydration. Perfect for all skin types, this serum helps reduce the appearance of fine lines and creates a plump, dewy complexion.",
    price: "£7.99",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop"
    ],
    category: "Serums",
    skinTypes: ["Dry", "Normal", "Combination", "Oily"],
    concerns: ["Hydration", "Fine Lines", "Dryness"],
    inStock: true,
    featured: true,
    sizes: ["30ml"]
  },
  {
    id: "retinol-eye-cream",
    name: "Retinol Eye Cream",
    shortDescription: "Smooths fine lines around delicate eye area",
    description: "A gentle retinol formula specifically designed for the delicate eye area. Helps reduce the appearance of fine lines, crow's feet, and dark circles while being gentle enough for nightly use.",
    price: "£9.99",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop"
    ],
    category: "Eye Care",
    skinTypes: ["Normal", "Combination", "Dry"],
    concerns: ["Fine Lines", "Dark Circles", "Anti-Aging"],
    inStock: true,
    featured: true,
    sizes: ["15ml"]
  },
  {
    id: "niacinamide",
    name: "Niacinamide",
    shortDescription: "Balances oil & reduces blemishes",
    description: "A powerful 10% niacinamide serum that helps regulate oil production, minimize the appearance of pores, and reduce blemishes. This water-based formula is perfect for oily and combination skin types.",
    price: "£5.99",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop"
    ],
    category: "Serums",
    skinTypes: ["Oily", "Combination", "Acne-Prone"],
    concerns: ["Blemishes", "Large Pores", "Excess Oil"],
    inStock: true,
    featured: true,
    sizes: ["30ml"]
  },
  {
    id: "vitamin-c-serum",
    name: "Vitamin C Serum",
    shortDescription: "Brightens & protects with antioxidants",
    description: "A stable vitamin C serum that brightens skin tone, provides antioxidant protection, and helps reduce the appearance of dark spots. The lightweight formula absorbs quickly without leaving a sticky residue.",
    price: "£9.99",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop"
    ],
    category: "Serums",
    skinTypes: ["Normal", "Combination", "Dry"],
    concerns: ["Dullness", "Dark Spots", "Antioxidant Protection"],
    inStock: true,
    featured: true,
    sizes: ["30ml"]
  },
  {
    id: "bha-beta-hydroxy-acid",
    name: "BHA (Beta Hydroxy Acid) Exfoliant",
    shortDescription: "Unclogs pores & smooths texture",
    description: "A gentle 2% salicylic acid exfoliant that penetrates deep into pores to remove dead skin cells and excess oil. Helps prevent blackheads and improves overall skin texture without over-drying.",
    price: "£8.99",
    image: "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop"
    ],
    category: "Exfoliants",
    skinTypes: ["Oily", "Combination", "Acne-Prone"],
    concerns: ["Blackheads", "Rough Texture", "Clogged Pores"],
    inStock: true,
    featured: true,
    sizes: ["30ml"]
  },
  {
    id: "peptide-moisturizer",
    name: "Peptide Moisturizer",
    shortDescription: "Firms & hydrates with peptides",
    description: "An advanced moisturizer featuring peptides that help support skin's natural collagen production. Provides long-lasting hydration while working to improve skin firmness and elasticity.",
    price: "£12.99",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop"
    ],
    category: "Moisturizers",
    skinTypes: ["Normal", "Dry", "Mature"],
    concerns: ["Fine Lines", "Firmness", "Hydration"],
    inStock: true,
    featured: false,
    sizes: ["50ml"]
  },
  {
    id: "caffeine-eye-cream",
    name: "Caffeine Eye Cream",
    shortDescription: "Reduces puffiness & dark circles",
    description: "A cooling eye cream infused with caffeine to help reduce the appearance of puffiness and dark circles. The lightweight formula provides instant cooling and long-term brightening benefits.",
    price: "£6.99",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400&h=400&fit=crop"
    ],
    category: "Eye Care",
    skinTypes: ["All Skin Types"],
    concerns: ["Puffiness", "Dark Circles", "Tired Eyes"],
    inStock: true,
    featured: false,
    sizes: ["15ml"]
  },
  {
    id: "oat-cleansing-balm",
    name: "Oat Cleansing Balm",
    shortDescription: "Gentle makeup removing balm",
    description: "A nourishing cleansing balm that melts away makeup and impurities while being gentle on sensitive skin. Formulated with colloidal oatmeal to soothe and comfort the skin during cleansing.",
    price: "£9.99",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop"
    ],
    category: "Cleansers",
    skinTypes: ["Sensitive", "Dry", "Normal"],
    concerns: ["Makeup Removal", "Sensitivity", "Dryness"],
    inStock: true,
    featured: false,
    sizes: ["150ml"]
  },
  {
    id: "alpha-arbutin-serum",
    name: "Alpha Arbutin Serum",
    shortDescription: "Targets dark spots & hyperpigmentation",
    description: "A concentrated serum featuring 2% alpha arbutin to help reduce the appearance of dark spots and hyperpigmentation. Works gently to even skin tone and brighten complexion over time.",
    price: "£7.99",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=400&fit=crop"
    ],
    category: "Serums",
    skinTypes: ["All Skin Types"],
    concerns: ["Dark Spots", "Hyperpigmentation", "Uneven Tone"],
    inStock: true,
    featured: false,
    sizes: ["30ml"]
  },
  // Homepage featured products
  {
    id: "mega-water-cream",
    name: "Mega Water Cream - 50ML",
    shortDescription: "Deep hydration for plump, supple skin",
    description: "An ultra-hydrating cream that provides deep moisturization with a lightweight, non-greasy formula. Enriched with hyaluronic acid and glycerin to lock in moisture for up to 24 hours.",
    price: "£12.99",
    originalPrice: "£15.99",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop"
    ],
    category: "Moisturizers",
    skinTypes: ["Dry", "Normal", "Combination"],
    concerns: ["Hydration", "Dryness"],
    inStock: true,
    featured: true,
    sizes: ["50ml"]
  },
  {
    id: "salicylic-acid-cleanser",
    name: "Salicylic Acid Cleanser",
    shortDescription: "Daily acne-busting & oil reducing cleanser",
    description: "A gentle yet effective BHA cleanser that helps unclog pores, reduce blackheads, and control excess oil production. Perfect for daily use on acne-prone skin.",
    price: "£9.99",
    image: "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop"
    ],
    category: "Cleansers",
    skinTypes: ["Oily", "Combination", "Acne-Prone"],
    concerns: ["Acne", "Blackheads", "Excess Oil"],
    inStock: true,
    featured: true,
    sizes: ["150ml"]
  },
  {
    id: "succinic-acid-serum",
    name: "Succinic Acid Serum",
    shortDescription: "Targeted treatment for blemishes",
    description: "A powerful spot treatment serum that targets individual blemishes and reduces their appearance overnight. Contains 2% succinic acid for effective acne treatment.",
    price: "£7.99",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop"
    ],
    category: "Serums",
    skinTypes: ["Oily", "Combination", "Acne-Prone"],
    concerns: ["Acne", "Blemishes"],
    inStock: true,
    featured: true,
    sizes: ["15ml"]
  }
];

// Helper function to get a product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

// Helper function to get featured products
export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}