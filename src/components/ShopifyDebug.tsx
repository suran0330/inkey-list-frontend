"use client";

import { useEffect, useState } from 'react';

export default function ShopifyDebug() {
  const [envTest, setEnvTest] = useState<any>(null);
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  useEffect(() => {
    // Test API route
    fetch('/api/test-env')
      .then(res => res.json())
      .then(data => setEnvTest(data))
      .catch(err => console.error('Failed to test env:', err));
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded m-4">
      <h3 className="font-bold mb-2">Shopify Debug Info</h3>
      <div className="text-sm">
        <p><strong>Client-side Domain:</strong> {domain || "NOT SET"}</p>
        <p><strong>Client-side Token:</strong> {token ? `SET (${token.length} chars)` : "NOT SET"}</p>
        <p><strong>Client-side Configured:</strong> {!!(domain && token) ? "YES" : "NO"}</p>

        <hr className="my-2" />

        <p><strong>Server-side Test:</strong></p>
        {envTest ? (
          <div className="ml-4">
            <p>Domain: {envTest.domain}</p>
            <p>Token: {envTest.token}</p>
            <p>Configured: {envTest.configured ? "YES" : "NO"}</p>
          </div>
        ) : (
          <p className="ml-4">Loading...</p>
        )}
      </div>
    </div>
  );
}
