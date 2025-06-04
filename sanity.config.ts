import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './schemaTypes'

export default defineConfig({
  name: 'inkey-list-frontend',
  title: 'INKEY List Content Studio',
  projectId: '7i4b2ni6',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Homepage
            S.listItem()
              .title('🏠 Homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),

            // Site Settings
            S.listItem()
              .title('⚙️ Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('site-settings')
              ),

            // Global Content
            S.listItem()
              .title('🌐 Global Content')
              .child(
                S.document()
                  .schemaType('globalContent')
                  .documentId('global-content')
              ),

            // Divider
            S.divider(),

            // Products
            S.documentTypeListItem('product').title('🧴 Products'),

            // Categories
            S.documentTypeListItem('category').title('📂 Categories'),

            // Pages
            S.documentTypeListItem('page').title('📄 Pages'),

            // Banners
            S.documentTypeListItem('banner').title('📢 Banners'),

            // Blog Posts
            S.documentTypeListItem('blogPost').title('📝 Blog Posts'),
          ])
    }),

    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
  ],

  schema: {
    types: schema,
  },
})
