#!/bin/bash

# Frontend Environment Setup Script
echo "Setting up Frontend environment variables..."

cat > .env.local << 'EOF'
# Sanity Studio Environment Variables (Studio specific)
SANITY_STUDIO_PROJECT_ID=7i4b2ni6
SANITY_STUDIO_DATASET=production

# Sanity Studio API Token for content management
SANITY_STUDIO_API_TOKEN=your_studio_token_here

# Frontend Client Environment Variables (Public)
NEXT_PUBLIC_SANITY_PROJECT_ID=7i4b2ni6
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-06-01

# Preview URL for visual editing
SANITY_STUDIO_PREVIEW_URL=https://inkey-list-clone2.vercel.app
EOF

echo "✅ Frontend .env.local created!"
echo "⚠️  Remember to replace 'your_studio_token_here' with your actual Sanity API token"
echo "📝 Get your token from: https://sanity.io/manage/project/7i4b2ni6/api"
