import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {colorInput} from '@sanity/color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'

import {schema} from './schemaTypes'

// Define preview URLs for different content types
const previewUrl = {
  previewUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://inkey-list-frontend.vercel.app',
  draftMode: {
    enable: '/api/draft',
  },
}

export default defineConfig({
  name: 'inkey-list-frontend-studio',
  title: 'INKEY List Content Studio - Integrated',

  projectId: 'zqetc89y',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Homepage as top-level item
            S.listItem()
              .title('🏠 Homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),

            // Divider
            S.divider(),

            // Products section
            S.listItem()
              .title('🧴 Products')
              .child(
                S.list()
                  .title('Product Management')
                  .items([
                    S.listItem()
                      .title('All Products')
                      .child(S.documentTypeList('product').title('All Products')),
                    S.listItem()
                      .title('Featured Products')
                      .child(
                        S.documentList()
                          .title('Featured Products')
                          .filter('_type == "product" && featured == true')
                      ),
                    S.listItem()
                      .title('Out of Stock')
                      .child(
                        S.documentList()
                          .title('Out of Stock')
                          .filter('_type == "product" && inStock == false')
                      ),
                  ])
              ),

            // Categories
            S.listItem()
              .title('📂 Categories')
              .child(S.documentTypeList('category').title('Product Categories')),

            // Divider
            S.divider(),

            // Blog section
            S.listItem()
              .title('📝 Blog Posts')
              .child(S.documentTypeList('blogPost').title('Blog Posts')),

            // Pages
            S.listItem()
              .title('📄 Pages')
              .child(S.documentTypeList('page').title('Static Pages')),

            // Banners
            S.listItem()
              .title('📢 Banners')
              .child(S.documentTypeList('banner').title('Site Banners')),

            // Divider
            S.divider(),

            // Global Content
            S.listItem()
              .title('🌐 Global Content')
              .child(
                S.document()
                  .schemaType('globalContent')
                  .documentId('globalContent')
              ),

            // Site Settings
            S.listItem()
              .title('⚙️ Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ])
    }),

    // Visual editing with live preview
    presentationTool({
      ...previewUrl,
      name: 'visual-editing',
      title: 'Visual Editing',
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || 'https://inkey-list-frontend.vercel.app',
        draftMode: {
          enable: '/api/draft',
        },
        preview: '/api/preview',
      },
      resolve: {
        mainDocuments: (S) => [
          S.document()
            .schemaType('homepage')
            .documentId('homepage'),
          ...S.documentTypeList('product').getItems(),
          ...S.documentTypeList('blogPost').getItems(),
          ...S.documentTypeList('page').getItems(),
        ],
        locations: {
          homepage: {
            select: {
              title: 'title',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Homepage',
                  href: '/?preview=true',
                },
              ],
            }),
          },
          product: {
            select: {
              title: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => {
              const slug = doc?.slug
              if (!slug) {
                return {
                  message: 'Missing slug',
                  tone: 'critical',
                } as const
              }
              return {
                locations: [
                  {
                    title: doc?.title || 'Product',
                    href: `/products/${slug}?preview=true`,
                  },
                  {
                    title: 'Products Page',
                    href: '/products?preview=true',
                  },
                ],
              }
            },
          },
          blogPost: {
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => {
              const slug = doc?.slug
              if (!slug) {
                return {
                  message: 'Missing slug',
                  tone: 'critical',
                } as const
              }
              return {
                locations: [
                  {
                    title: doc?.title || 'Blog Post',
                    href: `/blog/${slug}?preview=true`,
                  },
                  {
                    title: 'Blog Page',
                    href: '/blog?preview=true',
                  },
                ],
              }
            },
          },
          page: {
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => {
              const slug = doc?.slug
              if (!slug) {
                return {
                  message: 'Missing slug',
                  tone: 'critical',
                } as const
              }
              return {
                locations: [
                  {
                    title: doc?.title || 'Page',
                    href: `/${slug}?preview=true`,
                  },
                ],
              }
            },
          },
        },
      },
    }),

    // Vision tool for GROQ queries
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),

    // Color input for brand colors
    colorInput(),

    // Image hotspot array plugin
    imageHotspotArrayPlugin(),
  ],

  schema: schema,

  // Document actions
  document: {
    actions: (prev, {schemaType}) => {
      // Add preview action to all documents
      return prev.map((action) => {
        if (action.action === 'publish') {
          return {
            ...action,
            onHandle: () => {
              // Trigger webhook after publish
              action.onHandle?.()

              // Optional: Show success toast
              console.log('Document published and webhook triggered')
            },
          }
        }
        return action
      })
    },
  },

  // Studio branding and bridge script
  studio: {
    components: {
      layout: (props) => {
        // Add bridge script for dashboard integration
        if (typeof window !== 'undefined') {
          const bridgeScript = document.createElement('script')
          bridgeScript.src = 'https://core.sanity-cdn.com/bridge.js'
          bridgeScript.async = true
          bridgeScript.type = 'module'
          if (!document.querySelector('script[src="https://core.sanity-cdn.com/bridge.js"]')) {
            document.head.appendChild(bridgeScript)
          }
        }
        return props.renderDefault(props)
      },
      navbar: (props) => {
        return (
          <div style={{
            padding: '10px 20px',
            backgroundColor: '#1c1c22',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1c1c22',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                I
              </div>
              <h2 style={{ margin: 0, fontSize: '16px' }}>INKEY List Content Studio</h2>
            </div>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              Frontend Integrated
            </div>
          </div>
        )
      }
    }
  },

  // API configuration
  api: {
    projectId: 'zqetc89y',
    dataset: 'production',
    apiVersion: '2024-01-01',
  },
})