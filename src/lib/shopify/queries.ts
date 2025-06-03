// Shopify Storefront API GraphQL Queries

// Fragment for product images
const productImageFragment = `
  fragment ProductImage on Image {
    id
    url
    altText
    width
    height
  }
`;

// Fragment for money fields
const moneyFragment = `
  fragment Money on MoneyV2 {
    amount
    currencyCode
  }
`;

// Fragment for product variants
const productVariantFragment = `
  fragment ProductVariant on ProductVariant {
    id
    title
    availableForSale
    price {
      ...Money
    }
    compareAtPrice {
      ...Money
    }
    selectedOptions {
      name
      value
    }
    image {
      ...ProductImage
    }
  }
`;

// Fragment for product fields
const productFragment = `
  fragment Product on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    createdAt
    updatedAt
    productType
    vendor
    tags
    featuredImage {
      ...ProductImage
    }
    images(first: 10) {
      edges {
        node {
          ...ProductImage
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          ...ProductVariant
        }
      }
    }
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        ...Money
      }
      maxVariantPrice {
        ...Money
      }
    }
  }
`;

// Get all products query
export const GET_PRODUCTS_QUERY = `
  ${moneyFragment}
  ${productImageFragment}
  ${productVariantFragment}
  ${productFragment}
  
  query GetProducts($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...Product
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// Get single product by handle
export const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${moneyFragment}
  ${productImageFragment}
  ${productVariantFragment}
  ${productFragment}
  
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...Product
    }
  }
`;

// Get single product by ID
export const GET_PRODUCT_BY_ID_QUERY = `
  ${moneyFragment}
  ${productImageFragment}
  ${productVariantFragment}
  ${productFragment}
  
  query GetProductById($id: ID!) {
    product(id: $id) {
      ...Product
    }
  }
`;

// Get products by collection
export const GET_COLLECTION_PRODUCTS_QUERY = `
  ${moneyFragment}
  ${productImageFragment}
  ${productVariantFragment}
  ${productFragment}
  
  query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        ...ProductImage
      }
      products(first: $first, after: $after) {
        edges {
          node {
            ...Product
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

// Get all collections
export const GET_COLLECTIONS_QUERY = `
  ${productImageFragment}
  
  query GetCollections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            ...ProductImage
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// Search products query
export const SEARCH_PRODUCTS_QUERY = `
  ${moneyFragment}
  ${productImageFragment}
  ${productVariantFragment}
  ${productFragment}
  
  query SearchProducts($query: String!, $first: Int!, $after: String) {
    products(first: $first, after: $after, query: $query) {
      edges {
        node {
          ...Product
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// Get featured products (you can modify the query filter as needed)
export const GET_FEATURED_PRODUCTS_QUERY = `
  ${moneyFragment}
  ${productImageFragment}
  ${productVariantFragment}
  ${productFragment}
  
  query GetFeaturedProducts($first: Int!) {
    products(first: $first, query: "tag:featured") {
      edges {
        node {
          ...Product
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

// Cart queries (for future cart integration)
export const CREATE_CART_MUTATION = `
  ${moneyFragment}
  
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    ...Money
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
              cost {
                totalAmount {
                  ...Money
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            ...Money
          }
          subtotalAmount {
            ...Money
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_LINES_TO_CART_MUTATION = `
  ${moneyFragment}
  
  mutation AddLinesToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    ...Money
                  }
                  product {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
              cost {
                totalAmount {
                  ...Money
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            ...Money
          }
          subtotalAmount {
            ...Money
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Create Shopify checkout URL
export const CREATE_CHECKOUT_MUTATION = `
  ${moneyFragment}
  
  mutation CreateCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        totalPrice {
          ...Money
        }
        subtotalPrice {
          ...Money
        }
        totalTax {
          ...Money
        }
        lineItems(first: 100) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                price {
                  ...Money
                }
                product {
                  id
                  title
                  handle
                }
              }
            }
          }
        }
        shippingAddress {
          firstName
          lastName
          address1
          city
          province
          zip
          country
        }
        email
      }
      userErrors {
        field
        message
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

// Update checkout with shipping address
export const UPDATE_CHECKOUT_MUTATION = `
  ${moneyFragment}
  
  mutation UpdateCheckout($checkoutId: ID!, $input: CheckoutInput!) {
    checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $input) {
      checkout {
        id
        webUrl
        totalPrice {
          ...Money
        }
        subtotalPrice {
          ...Money
        }
        totalTax {
          ...Money
        }
        shippingAddress {
          firstName
          lastName
          address1
          city
          province
          zip
          country
        }
        email
      }
      userErrors {
        field
        message
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;