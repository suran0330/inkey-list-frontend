import { NextResponse } from 'next/server';

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  return NextResponse.json({
    domain: domain || 'NOT SET',
    token: token ? `SET (${token.length} chars)` : 'NOT SET',
    configured: !!(domain && token)
  });
}
