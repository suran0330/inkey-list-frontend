const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
  projectId: '7i4b2ni6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skCIUBXDA9nQDKSLKwecrRA0WQTXOdbgsFgJaOluVCDXpDjhazBhlYShczJC20tKt0iWPJZQ8gHBKsNJrJ72MNoW1VZGHGWunH30CmFzajbxs7oD8RvwaiqDbPHboZXuEvUSgfsjIullyyHJ7wqSuFW8BgYWYvxPdNor1aVPxXPeBHUQqBtD'
});

// First, create categories
const categories = [
  {
    _type: 'category',
    name: 'Serums',
    slug: { current: 'serums' },
    description: 'Concentrated treatments targeting specific skin concerns'
  },
  {
    _type: 'category',
    name: 'Eye Care',
    slug: { current: 'eye-care' },
    description: 'Specialized treatments for the delicate eye area'
  },
  {
    _type: 'category',
    name: 'Cleansers',
    slug: { current: 'cleansers' },
    description: 'Gentle yet effective cleansers for all skin types'
  }
];

// Sample INKEY List products
const products = [
  {
    _type: 'product',
    name: 'Hyaluronic Acid Serum',
    slug: { current: 'hyaluronic-acid-serum' },
    description: 'A lightweight serum that holds up to 1000 times its weight in water, providing instant and long-lasting hydration for all skin types.',
    price: 7.99,
    inStock: true,
    skinConcerns: ['Hydration', 'Fine Lines', 'Dryness'],
    ingredients: ['Hyaluronic Acid', 'Water', 'Pentylene Glycol'],
    benefits: ['Provides instant hydration', 'Plumps fine lines', 'Suitable for all skin types'],
    howToUse: 'Apply 2-3 drops to clean skin morning and evening. Follow with moisturizer.',
    category: { _type: 'reference', _ref: null } // Will be set after category creation
  },
  {
    _type: 'product',
    name: 'Niacinamide',
    slug: { current: 'niacinamide' },
    description: 'A 10% niacinamide serum that helps control excess oil production and reduce the appearance of enlarged pores.',
    price: 5.99,
    inStock: true,
    skinConcerns: ['Oil Control', 'Large Pores', 'Uneven Texture'],
    ingredients: ['Niacinamide 10%', 'Water', 'Pentylene Glycol', 'Zinc PCA'],
    benefits: ['Controls excess oil', 'Minimizes pore appearance', 'Evens skin tone'],
    howToUse: 'Apply 2-3 drops to clean skin morning and evening.',
    category: { _type: 'reference', _ref: null }
  },
  {
    _type: 'product',
    name: 'Retinol Eye Cream',
    slug: { current: 'retinol-eye-cream' },
    description: 'A gentle retinol formula specifically designed for the delicate eye area.',
    price: 9.99,
    inStock: true,
    skinConcerns: ['Fine Lines', 'Dark Circles', 'Eye Area Aging'],
    ingredients: ['Retinol', 'Squalane', 'Ceramides', 'Peptides'],
    benefits: ['Reduces fine lines', 'Gentle for eye area', 'Improves skin texture'],
    howToUse: 'Apply a small amount around the eye area before bed.',
    category: { _type: 'reference', _ref: null }
  },
  {
    _type: 'product',
    name: 'Vitamin C Serum',
    slug: { current: 'vitamin-c-serum' },
    description: 'A potent vitamin C serum with 30% L-Ascorbic Acid that brightens skin and helps reduce dark spots.',
    price: 9.99,
    inStock: false,
    skinConcerns: ['Dark Spots', 'Dullness', 'Uneven Skin Tone'],
    ingredients: ['L-Ascorbic Acid 30%', 'Vitamin E', 'Water'],
    benefits: ['Brightens complexion', 'Reduces dark spots', 'Antioxidant protection'],
    howToUse: 'Apply 2-3 drops to clean skin in the morning. Always follow with SPF.',
    category: { _type: 'reference', _ref: null }
  },
  {
    _type: 'product',
    name: 'Caffeine Eye Serum',
    slug: { current: 'caffeine-eye-serum' },
    description: 'An energizing eye serum with 5% caffeine solution that helps reduce puffiness and dark circles.',
    price: 6.99,
    inStock: true,
    skinConcerns: ['Puffiness', 'Dark Circles', 'Tired Eyes'],
    ingredients: ['Caffeine 5%', 'Epigallocatechin Gallatyl Glucoside', 'Water'],
    benefits: ['Reduces puffiness', 'Minimizes dark circles', 'Energizes tired eyes'],
    howToUse: 'Apply 1-2 drops around the eye area morning and evening.',
    category: { _type: 'reference', _ref: null }
  },
  {
    _type: 'product',
    name: 'Salicylic Acid Cleanser',
    slug: { current: 'salicylic-acid-cleanser' },
    description: 'A gentle daily cleanser with 2% salicylic acid that helps unclog pores and remove dead skin cells.',
    price: 8.99,
    inStock: true,
    skinConcerns: ['Acne', 'Blackheads', 'Clogged Pores'],
    ingredients: ['Salicylic Acid 2%', 'Cocamidopropyl Betaine', 'Water'],
    benefits: ['Unclogs pores', 'Removes dead skin cells', 'Gentle on skin'],
    howToUse: 'Use morning and evening. Apply to damp skin, massage gently, and rinse thoroughly.',
    category: { _type: 'reference', _ref: null }
  }
];

async function addSampleContent() {
  console.log('🚀 Adding sample content to Sanity...');

  try {
    // First, create categories
    console.log('📂 Creating categories...');
    const createdCategories = {};

    for (const category of categories) {
      const result = await client.create(category);
      createdCategories[category.name] = result._id;
      console.log(`✅ Created category: ${category.name} (${result._id})`);
    }

    // Update products with category references
    products[0].category._ref = createdCategories['Serums']; // Hyaluronic Acid
    products[1].category._ref = createdCategories['Serums']; // Niacinamide
    products[2].category._ref = createdCategories['Eye Care']; // Retinol Eye Cream
    products[3].category._ref = createdCategories['Serums']; // Vitamin C
    products[4].category._ref = createdCategories['Eye Care']; // Caffeine Eye Serum
    products[5].category._ref = createdCategories['Cleansers']; // Salicylic Acid Cleanser

    // Create products
    console.log('\n🧴 Creating products...');
    const createdProducts = [];

    for (const product of products) {
      const result = await client.create(product);
      createdProducts.push(result);
      console.log(`✅ Created product: ${product.name} - £${product.price} (${result._id})`);
    }

    // Create homepage content
    console.log('\n🏠 Creating homepage content...');
    const homepage = {
      _type: 'homepage',
      title: 'INKEY List - Science-Backed Skincare',
      heroHeadline: 'INSIDERS WEEK IS HERE!',
      heroSubheadline: 'Get up to 30% off our science-backed skincare'
    };

    const homepageResult = await client.create(homepage);
    console.log(`✅ Created homepage: ${homepageResult._id}`);

    console.log('\n🎉 Sample content added successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Categories: ${Object.keys(createdCategories).length}`);
    console.log(`   Products: ${createdProducts.length}`);
    console.log(`   In Stock: ${createdProducts.filter(p => p.inStock).length}`);
    console.log(`   Out of Stock: ${createdProducts.filter(p => !p.inStock).length}`);

    console.log('\n📂 Products by Category:');
    for (const [categoryName, categoryId] of Object.entries(createdCategories)) {
      const categoryProducts = createdProducts.filter(p => p.category._ref === categoryId);
      console.log(`   ${categoryName}: ${categoryProducts.length} products`);
    }

  } catch (error) {
    console.error('❌ Error adding content to Sanity:', error);
    process.exit(1);
  }
}

addSampleContent();
