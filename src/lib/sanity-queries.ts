import { sanity, validateSanityConfig } from './sanity';

// Ensure Sanity is properly configured
validateSanityConfig();

// Product queries
export async function getAllProducts() {
  try {
    const query = `*[_type == "product"] | order(name asc) {
      _id,
      name,
      slug,
      price,
      description,
      images,
      category->{name, slug},
      skinConcerns,
      ingredients,
      inStock
    }`;

    const products = await sanity.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const query = `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      price,
      description,
      images,
      category->{name, slug},
      skinConcerns,
      ingredients,
      benefits,
      howToUse,
      inStock
    }`;

    const product = await sanity.fetch(query, { slug });
    return product;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
}

export async function getProductsByCategory(categorySlug: string) {
  try {
    const query = `*[_type == "product" && category->slug.current == $categorySlug] | order(name asc) {
      _id,
      name,
      slug,
      price,
      description,
      images,
      skinConcerns,
      inStock
    }`;

    const products = await sanity.fetch(query, { categorySlug });
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
}

// Category queries
export async function getAllCategories() {
  try {
    const query = `*[_type == "category"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      image
    }`;

    const categories = await sanity.fetch(query);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

// Homepage content queries
export async function getHomepageContent() {
  try {
    const query = `*[_type == "homepage"][0] {
      _id,
      hero {
        title,
        subtitle,
        ctaText,
        ctaLink,
        backgroundImage
      },
      featuredProducts[]->{
        _id,
        name,
        slug,
        price,
        images,
        description
      },
      categories[]->{
        _id,
        name,
        slug,
        description,
        image
      },
      testimonials[] {
        name,
        text,
        rating,
        productUsed
      }
    }`;

    const homepage = await sanity.fetch(query);
    return homepage;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    throw error;
  }
}

// Banner queries
export async function getActiveBanners() {
  try {
    const query = `*[_type == "banner" && active == true] | order(priority asc) {
      _id,
      title,
      subtitle,
      ctaText,
      ctaLink,
      backgroundColor,
      textColor,
      startDate,
      endDate
    }`;

    const banners = await sanity.fetch(query);
    return banners;
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
}

// Global content queries
export async function getGlobalContent() {
  try {
    const query = `*[_type == "globalContent"][0] {
      _id,
      siteInfo {
        name,
        tagline,
        description,
        logo
      },
      contact {
        email,
        phone,
        address
      },
      social {
        instagram,
        twitter,
        facebook,
        tiktok
      },
      footer {
        copyright,
        links[] {
          title,
          items[] {
            name,
            url
          }
        }
      }
    }`;

    const globalContent = await sanity.fetch(query);
    return globalContent;
  } catch (error) {
    console.error('Error fetching global content:', error);
    throw error;
  }
}

// Generic query function
export async function executeQuery(query: string, params?: any) {
  try {
    const result = await sanity.fetch(query, params);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}
