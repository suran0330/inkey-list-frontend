# 🎨 INKEY List Frontend (Sanity Studio) Deployment Guide

## ⚠️ IMPORTANT: Sanity Studio Deployment Options

The `inkey-list-frontend` repository contains a **Sanity Studio**, not a regular Next.js app. You have two deployment options:

## 🏆 **RECOMMENDED: Deploy to Sanity (Official)**

### Step 1: Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### Step 2: Login to Sanity
```bash
sanity login
```

### Step 3: Deploy to Sanity Hosting
```bash
cd inkey-list-frontend
sanity deploy
```

### Step 4: Choose Studio Name
- When prompted, enter: `inkey-list-studio`
- Your studio will be available at: `https://inkey-list-studio.sanity.studio`

### Benefits:
- ✅ Optimized for Sanity Studio
- ✅ Built-in authentication
- ✅ Automatic updates
- ✅ Better performance
- ✅ Free hosting

## 🔧 **ALTERNATIVE: Deploy to Vercel (Custom)**

If you prefer Vercel, use the configuration files I've added:

### Required Files Added:
- `vercel.json` - Vercel configuration
- `public/index.html` - Basic HTML structure

### Vercel Environment Variables:
```bash
SANITY_STUDIO_PROJECT_ID=7i4b2ni6
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_TOKEN=your-token-here
SANITY_STUDIO_PREVIEW_URL=https://inkey-list-clone2.vercel.app
```

### Steps:
1. Add environment variables in Vercel dashboard
2. Set Framework Preset to "Other"
3. Set Build Command to `npm run build`
4. Set Output Directory to `dist`
5. Redeploy

## 🎯 **Recommended Setup**

For the complete INKEY List system:

1. **Content Studio**: Deploy to `https://inkey-list-studio.sanity.studio` (Sanity hosting)
2. **Admin Dashboard**: Deploy to Vercel as `admin.vercel.app`
3. **Production Site**: Deploy to Vercel as `inkey-list-clone2.vercel.app`

## 🔄 **Content Flow**

```
Content Editors → Sanity Studio → Sanity CMS → Production Site
                     ↓
Admin Dashboard → Product Management → Production Site
```

## 🚀 **Quick Deploy to Sanity**

```bash
# From your local machine
git clone https://github.com/suran0330/inkey-list-frontend.git
cd inkey-list-frontend
npm install
sanity login
sanity deploy
```

Choose option 1 (Sanity hosting) for the best experience! 🎨
