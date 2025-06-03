import { NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';

export async function GET() {
  try {
    const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'evmxpp-pz.myshopify.com';
    const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!

    console.log('Testing Shopify connection with:', {
      domain: SHOPIFY_STORE_DOMAIN,
      hasToken: !!SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      url: `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`
    });

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
        products(first: 5) {
          edges {
            node {
              id
              title
              handle
              availableForSale
              productType
              vendor
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;

    const response = await client.request(query);

    return NextResponse.json({
      success: true,
      message: 'Shopify connection successful',
      config: {
        domain: SHOPIFY_STORE_DOMAIN,
        hasToken: !!SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        url: `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`
      },
      data: response,
      productCount: (response as any)?.products?.edges?.length || 0
    });

  } catch (error: any) {
    console.error('Shopify API Error:', error);

    return NextResponse.json({
      success: false,
      message: 'Shopify connection failed',
      error: error.message,
      config: {
        domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'evmxpp-pz.myshopify.com',
        hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        url: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'evmxpp-pz.myshopify.com'}/api/2023-10/graphql.json`
      }
    }, { status: 500 });
  }
}
