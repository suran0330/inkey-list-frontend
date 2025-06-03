# INKEY List E-commerce Clone

A complete e-commerce website clone of The INKEY List, built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

Deploy this project to Vercel by connecting this repository!

## ✨ Features

- **Complete E-commerce Functionality**
  - Product catalog with detailed product pages
  - Shopping cart with add/remove items
  - Checkout process with shipping forms
  - User authentication (login/signup)
  - User account and order history
  - **Shopify Integration** with Storefront API
  - **Stripe Payment Integration** with multiple payment methods

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - shadcn/ui components
  - Responsive design

- **Pages Included (47 total)**
  - Homepage with hero section and featured products
  - Product pages with detailed descriptions and reviews
  - Shop categories (Serums, Moisturizers, Cleansers)
  - About pages (Company, Ingredients, Careers, Press)
  - Help center (FAQ, Contact, Shipping, Returns)
  - Legal pages (Privacy, Terms, Accessibility, Cookies)
  - Skin concerns categories

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Package Manager**: Bun
- **E-commerce**: Shopify Storefront API integration
- **Deployment**: Optimized for Vercel

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/suran0330/inkey-list-clone)

1. Click the button above or go to [vercel.com](https://vercel.com)
2. Import this GitHub repository: `https://github.com/suran0330/inkey-list-clone`
3. Deploy with default settings
4. Your site will be live in minutes!

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/suran0330/inkey-list-clone.git

# Navigate to project directory
cd inkey-list-clone

# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 🛍️ Shopify Integration Setup

To enable real Shopify products alongside the mock data:

1. Create a Shopify private app with Storefront API access
2. Copy your store domain and access token
3. Create `.env.local` with your credentials:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
```

For detailed setup instructions, see [SHOPIFY_INTEGRATION.md](./SHOPIFY_INTEGRATION.md)

### 💳 Stripe Payment Setup

To enable Stripe payment processing:

1. Sign up for a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Add your Stripe credentials to `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
NEXT_PUBLIC_STRIPE_ENABLED=true
```

For detailed setup instructions, see [STRIPE_INTEGRATION.md](./STRIPE_INTEGRATION.md)

## 📁 Project Structure

```
inkey-list-clone/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── contexts/            # React context providers
│   ├── data/                # Static data and mock content
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── shopify/         # Shopify API integration
│   │   ├── stripe/          # Stripe payment integration
│   │   └── utils/           # Utility functions
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── vercel.json              # Vercel deployment settings
├── SHOPIFY_INTEGRATION.md   # Shopify setup guide
└── STRIPE_INTEGRATION.md    # Stripe payment setup guide
```

## 🎨 Design Features

- **Pixel-perfect clone** of The INKEY List website
- **Fully responsive** design for mobile, tablet, and desktop
- **Modern UI components** with smooth animations
- **Accessible** design following best practices
- **SEO optimized** with proper meta tags

## 🛒 E-commerce Features

- **Product Catalog**: Browse products by category (mock + Shopify)
- **Product Details**: Detailed product pages with images and descriptions
- **Shopping Cart**: Add/remove items, update quantities (unified cart)
- **Checkout Process**: Multiple payment methods (Shopify, Stripe, Demo)
- **Stripe Payments**: Credit card, Apple Pay, Google Pay support
- **User Accounts**: Registration, login, and account management
- **Order History**: View past orders and order details
- **Shopify Integration**: Real products from your Shopify store
- **Seamless Experience**: Mock and real products work together

## 📱 Pages Included

- **Homepage**: Hero section, featured products, skin concerns
- **Shop**: Product catalog with filtering
- **Product Pages**: Individual product details with reviews
- **About**: Company information, ingredients, careers, press
- **Help**: FAQ, contact, shipping, returns
- **Account**: User dashboard and order history
- **Legal**: Privacy policy, terms, accessibility, cookies

## 🚀 Deployment

This project is optimized for **Vercel deployment** with:
- Automatic builds with Bun
- Image optimization
- Static generation for best performance
- Global CDN distribution

## 📄 License

This project is for educational purposes only. The INKEY List is a trademark of their respective owners.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using Next.js and Vercel
