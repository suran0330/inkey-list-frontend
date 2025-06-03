import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { draftMode } from 'next/headers';

// Sanity configuration with fallbacks
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zqetc89y';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

// Check if Sanity is configured
export const isSanityConfigured = !!(projectId && dataset);

// Client for reading data (public)
export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: true,
});

// Client for writing data and live preview (requires token)
export const sanityClientWrite = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper to get the right client based on draft mode
export function getClient(preview = false) {
  if (typeof window === 'undefined') {
    const isDraftMode = draftMode().isEnabled;
    if (isDraftMode || preview) {
      return sanityClientWrite;
    }
  }
  return sanityClient;
}

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  if (!isSanityConfigured) {
    console.warn('Sanity not configured, returning empty URL');
    return { url: () => '' };
  }
  return builder.image(source);
}

export async function getHomepageContent() {
  if (!isSanityConfigured) {
    console.warn('Sanity not configured, returning default homepage content');
    return {
      title: 'INKEY List - Default Content',
      heroSection: {
        headline: 'INSIDERS WEEK IS HERE!',
        subheadline: 'Get up to 30% off',
        ctaButton: { text: 'Shop Now', link: '/shop' }
      }
    };
  }

  try {
    const query = `*[_type == "homepage"][0]{
      title,
      heroSection{
        headline,
        subheadline,
        backgroundImage{
          asset->{
            url
          },
          alt
        },
        ctaButton
      },
      featuredProductsSection{
        enabled,
        title,
        productIds
      },
      contentSections[]{
        _type,
        _key,
        title,
        content,
        image{
          asset->{
            url
          },
          alt
        }
      }
    }`;

    const client = getClient();
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return {
      title: 'INKEY List',
      heroSection: {
        headline: 'INSIDERS WEEK IS HERE!',
        subheadline: 'Get up to 30% off',
        ctaButton: { text: 'Shop Now', link: '/shop' }
      }
    };
  }
}

export async function getActiveBanners(pageUrl = '/') {
  if (!isSanityConfigured) {
    console.warn('Sanity not configured, returning empty banners');
    return [];
  }

  try {
    const query = `*[_type == "banner" && displaySettings.active == true]{
      _id,
      content{
        headline,
        subtext,
        ctaButton
      },
      styling,
      displaySettings
    }`;

    const client = getClient();
    const banners = await client.fetch(query);

    return banners.filter((banner: any) => {
      const { showOnPages } = banner.displaySettings;
      return showOnPages === 'all' ||
             (showOnPages === 'homepage' && pageUrl === '/') ||
             (showOnPages === 'products' && pageUrl.startsWith('/products'));
    });
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
}