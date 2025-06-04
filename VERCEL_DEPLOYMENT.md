# 🚨 VERCEL DEPLOYMENT FIX - Frontend Environment Variables

## Required Environment Variables for inkey-list-frontend

When deploying the `inkey-list-frontend` repository to Vercel, you **MUST** add these environment variables:

### ⚠️ CRITICAL - Sanity Studio Configuration
```bash
SANITY_STUDIO_PROJECT_ID=7i4b2ni6
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_TOKEN=skOgdVyih7UfpZxrm0PmeVhkFbzM2trJ4xzVxl6wdi4w0R3L7o6AtivkClLocFAyHUXS3yNDOauW8zHS17FrSjpWpe84xgfAQx8F5IJZVVB2hiD2ONi7nVOM7YKZoriggYg4v35wzgjtKI2MBHg75HWW6ADnoq4SIhwb3RNmHSumh9wB1Lgf
SANITY_STUDIO_PREVIEW_URL=https://inkey-list-clone2.vercel.app
```

### Additional Environment Variables
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=7i4b2ni6
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-06-01
```

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select the `inkey-list-frontend` project
3. Go to Settings → Environment Variables
4. Add each variable:
   - Variable Name: `SANITY_STUDIO_PROJECT_ID`
   - Value: `7i4b2ni6`
   - Environment: Production, Preview, Development (select all)
5. Click "Save"
6. Repeat for all variables above

## Framework Settings

**IMPORTANT**: Set the framework preset to "Other" in Vercel project settings since this is a Sanity Studio, not a Next.js app.

## Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Expected Result

After adding environment variables and redeploying, you should see:
- ✅ Sanity Studio loads successfully
- ✅ Connection to project 7i4b2ni6 established
- ✅ Content editing interface available
- ✅ No schema configuration errors

## Quick Copy-Paste for Vercel

```
SANITY_STUDIO_PROJECT_ID=7i4b2ni6
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_TOKEN=skOgdVyih7UfpZxrm0PmeVhkFbzM2trJ4xzVxl6wdi4w0R3L7o6AtivkClLocFAyHUXS3yNDOauW8zHS17FrSjpWpe84xgfAQx8F5IJZVVB2hiD2ONi7nVOM7YKZoriggYg4v35wzgjtKI2MBHg75HWW6ADnoq4SIhwb3RNmHSumh9wB1Lgf
SANITY_STUDIO_PREVIEW_URL=https://inkey-list-clone2.vercel.app
NEXT_PUBLIC_SANITY_PROJECT_ID=7i4b2ni6
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-06-01
```

## Alternative: Deploy to Sanity (Recommended)

For the best experience, deploy Sanity Studio to Sanity's hosting:

```bash
npm install -g @sanity/cli
sanity login
cd inkey-list-frontend
sanity deploy
```

This will provide a dedicated studio URL like: `https://your-studio-name.sanity.studio`
