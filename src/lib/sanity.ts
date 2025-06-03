import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity configuration with fallbacks
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zqetc89y';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Check if Sanity is configured
export const isSanityConfigured = !!(projectId && dataset);

export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

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

    return await sanityClient.fetch(query);
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

    const banners = await sanityClient.fetch(query);

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
