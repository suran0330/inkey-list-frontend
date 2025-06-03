import { GraphQLClient } from 'graphql-request';

async function testShopifyConnection() {
  const SHOPIFY_STORE_DOMAIN = 'evmxpp-pz.myshopify.com';
  const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '96b6920545b23376b888ff1cb002d5df';

  console.log('Testing Shopify connection...');
  console.log('Domain:', SHOPIFY_STORE_DOMAIN);
  console.log('Has Token:', !!SHOPIFY_STOREFRONT_ACCESS_TOKEN);
  console.log('URL:', `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`);

  const client = new GraphQLClient(
    `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
    {
      headers: {
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    }
  );

  const query = `
    query TestConnection {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            productType
            vendor
            description
            tags
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    console.log('\nMaking GraphQL request...');
    const response = await client.request(query);
    
    console.log('\n✅ SUCCESS: Shopify API connection working!');
    console.log('Products found:', response.products?.edges?.length || 0);
    
    if (response.products?.edges?.length > 0) {
      console.log('\nFirst few products:');
      response.products.edges.slice(0, 3).forEach((edge, index) => {
        const product = edge.node;
        console.log(`${index + 1}. ${product.title}`);
        console.log(`   Handle: ${product.handle}`);
        console.log(`   Type: ${product.productType}`);
        console.log(`   Vendor: ${product.vendor}`);
        console.log(`   Available: ${product.availableForSale}`);
        console.log(`   Price: ${product.priceRange?.minVariantPrice?.amount} ${product.priceRange?.minVariantPrice?.currencyCode}`);
        console.log(`   Image: ${product.images?.edges?.[0]?.node?.url || 'No image'}`);
        console.log('');
      });
    } else {
      console.log('\n⚠️  No products found in store');
    }

    return {
      success: true,
      productCount: response.products?.edges?.length || 0,
      products: response.products?.edges || []
    };

  } catch (error) {
    console.error('\n❌ ERROR: Shopify API connection failed');
    console.error('Error details:', error.message);
    console.error('Response:', error.response?.errors || error.response || 'No response data');
    
    return {
      success: false,
      error: error.message,
      response: error.response
    };
  }
}

// Run the test
testShopifyConnection().then((result) => {
  if (result.success) {
    console.log(`\n🎉 Test completed successfully! Found ${result.productCount} products.`);
  } else {
    console.log('\n💥 Test failed!');
    process.exit(1);
  }
}).catch((error) => {
  console.error('\n💥 Test crashed:', error);
  process.exit(1);
});