"use client";

import { AlertCircle, Settings, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShopifyNotConfiguredProps {
  showTitle?: boolean;
  className?: string;
}

export default function ShopifyNotConfigured({ 
  showTitle = true, 
  className = "" 
}: ShopifyNotConfiguredProps) {
  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-lg p-8 text-center ${className}`}>
      <AlertCircle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
      
      {showTitle && (
        <h2 className="text-xl font-semibold text-amber-800 mb-2">
          Shopify Store Not Connected
        </h2>
      )}
      
      <p className="text-amber-700 mb-6 max-w-md mx-auto">
        To display products from your Shopify store, please configure your Shopify credentials in the environment variables.
      </p>
      
      <div className="space-y-3">
        <div className="text-sm text-amber-600 font-mono bg-amber-100 p-3 rounded border">
          <div>NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com</div>
          <div>NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token</div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://help.shopify.com/en/manual/apps/app-types/private-apps', '_blank')}
            className="border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Shopify Setup Guide
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://shopify.dev/docs/api/storefront', '_blank')}
            className="border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            <Settings className="h-4 w-4 mr-2" />
            Storefront API Docs
          </Button>
        </div>
      </div>
    </div>
  );
}