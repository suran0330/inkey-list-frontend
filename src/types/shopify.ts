// Shopify Storefront API Types

export interface ShopifyImage {
  id: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: ShopifyImage;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  productType: string;
  vendor: string;
  tags: string[];
  featuredImage?: ShopifyImage;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ShopifyProductVariant;
    }[];
  };
  options: ShopifyProductOption[];
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  totalInventory?: number;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage;
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
  };
}

export interface ShopifyCart {
  id: string;
  lines: {
    edges: {
      node: ShopifyCartLine;
    }[];
  };
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
    totalTaxAmount?: ShopifyMoney;
    totalDutyAmount?: ShopifyMoney;
  };
  buyerIdentity: {
    email?: string;
    phone?: string;
    customer?: {
      id: string;
    };
    countryCode?: string;
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: ShopifyProductVariant;
  cost: {
    totalAmount: ShopifyMoney;
    amountPerQuantity: ShopifyMoney;
    compareAtAmountPerQuantity?: ShopifyMoney;
  };
  attributes: {
    key: string;
    value: string;
  }[];
}

// Normalized product type that combines our local Product interface with Shopify data
export interface ShopifyProductNormalized {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  inStock: boolean;
  handle: string;
  vendor: string;
  productType: string;
  tags: string[];
  variants: ShopifyProductVariant[];
  shopifyId: string;
  isShopifyProduct: true;
}

// API Response types
export interface ShopifyProductsResponse {
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
  };
}

export interface ShopifyCollectionsResponse {
  collections: {
    edges: {
      node: ShopifyCollection;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string;
      endCursor?: string;
    };
  };
}

export interface ShopifyProductResponse {
  product: ShopifyProduct;
}

export interface ShopifyCollectionResponse {
  collection: ShopifyCollection;
}

// Checkout types
export interface ShopifyCheckout {
  id: string;
  webUrl: string;
  totalPrice: ShopifyMoney;
  subtotalPrice: ShopifyMoney;
  totalTax: ShopifyMoney;
  lineItems: {
    edges: {
      node: ShopifyCheckoutLineItem;
    }[];
  };
  shippingAddress?: ShopifyCheckoutAddress;
  email?: string;
}

export interface ShopifyCheckoutLineItem {
  id: string;
  title: string;
  quantity: number;
  variant: ShopifyProductVariant & {
    product: {
      id: string;
      title: string;
      handle: string;
    };
  };
}

export interface ShopifyCheckoutAddress {
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
}

export interface ShopifyCheckoutInput {
  email?: string;
  lineItems: {
    variantId: string;
    quantity: number;
  }[];
  shippingAddress?: ShopifyCheckoutAddress;
  allowPartialAddresses?: boolean;
}

export interface ShopifyCheckoutResponse {
  checkoutCreate: {
    checkout: ShopifyCheckout;
    userErrors: ShopifyError[];
    checkoutUserErrors: ShopifyError[];
  };
}

export interface ShopifyUpdateCheckoutResponse {
  checkoutShippingAddressUpdateV2: {
    checkout: ShopifyCheckout;
    userErrors: ShopifyError[];
    checkoutUserErrors: ShopifyError[];
  };
}

export interface ShopifyError {
  field: string[];
  message: string;
}