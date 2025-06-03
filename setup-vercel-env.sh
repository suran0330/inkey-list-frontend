#!/bin/bash

# Vercel Environment Variables Setup Script
# Run this script to configure all required environment variables for Sanity Studio integration

echo "🚀 Setting up Vercel Environment Variables for Sanity Studio Integration..."
echo ""

# Sanity Configuration
echo "📋 Configuring Sanity Studio Environment Variables..."

vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID development production preview <<EOF
zqetc89y
EOF

vercel env add NEXT_PUBLIC_SANITY_DATASET development production preview <<EOF
production
EOF

vercel env add SANITY_API_TOKEN development production preview <<EOF
skCIUBXDA9nQDKSLKwecrRA0WQTXOdbgsFgJaOluVCDXpDjhazBhlYShczJC20tKt0iWPJZQ8gHBKsNJrJ72MNoW1VZGHGWunH30CmFzajbxs7oD8RvwaiqDbPHboZXuEvUSgfsjIullyyHJ7wqSuFW8BgYWYvxPdNor1aVPxXPeBHUQqBtD
EOF

vercel env add NEXT_PUBLIC_SANITY_TOKEN development production preview <<EOF
skhbPSi0fqjmcaX5CshsZfHIeUjzW4i9GTFmHinuJQjUTH0tS1crdSQ5lGrnlL7CeaHJdGDG1NstxV06kxzb1hTkUIMNa1bHEGI7UDm9si6iPZK2hYTLcug1B55ZVAP8C07jkKuLojtSOefwBZcY1kb7i5iXI5nm2kVgcsUFfEzKU50vTQPo
EOF

vercel env add SANITY_REVALIDATE_SECRET development production preview <<EOF
K93afja23AJAJJKLLJasfiwl_8zxcv9012
EOF

vercel env add NEXT_PUBLIC_SITE_URL development production preview <<EOF
https://inkey-list-frontend.vercel.app
EOF

echo ""
echo "✅ Environment variables configured successfully!"
echo ""
echo "🔗 Next Steps:"
echo "1. Deploy the application: vercel --prod"
echo "2. Test Studio access: https://inkey-list-frontend.vercel.app/studio"
echo "3. Configure Sanity webhooks for auto-revalidation"
echo ""
echo "📚 Documentation: See SANITY_STUDIO_INTEGRATION.md for complete setup guide"
echo ""