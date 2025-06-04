// This is a backup of the current config that has issues
// Moving to a simpler, more reliable configuration

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

// Try to import i18n configuration safely
try {
  import('./src/i18n').catch(e => console.warn('i18n not available:', e))
} catch (e) {
  console.warn('Failed to import i18n:', e)
}

// Import schema types with error handling
let homepage, globalContent, page, banner, blogPost, category, product, siteSettings

try {
  homepage = require('./schemaTypes/homepage').default
  globalContent = require('./schemaTypes/globalContent').default
  page = require('./schemaTypes/page').default
  banner = require('./schemaTypes/banner').default
  blogPost = require('./schemaTypes/blogPost').default
  category = require('./schemaTypes/category').default
  product = require('./schemaTypes/product').default
  siteSettings = require('./schemaTypes/siteSettings').default
} catch (error) {
  console.error('Schema import error:', error)
  // Fallback to empty schemas
  const fallbackSchema = { name: 'fallback', type: 'document', fields: [] }
  homepage = globalContent = page = banner = blogPost = category = product = siteSettings = fallbackSchema
}

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
    types: (() => {
      try {
        // Validate that all schemas are properly loaded
        const schemas = [homepage, globalContent, page, banner, siteSettings, product, category, blogPost]
        const validSchemas = schemas.filter(schema =>
          schema &&
          typeof schema === 'object' &&
          schema.name &&
          (schema.type === 'document' || schema.type === 'object')
        )

        console.log(`Loaded ${validSchemas.length} valid schemas out of ${schemas.length} total`)

        return validSchemas.length > 0 ? validSchemas : [
          // Minimal fallback schema
          {
            name: 'page',
            title: 'Page',
            type: 'document',
            fields: [
              {
                name: 'title',
                title: 'Title',
                type: 'string',
                validation: (Rule: any) => Rule.required()
              },
              {
                name: 'content',
                title: 'Content',
                type: 'text'
              }
            ]
          }
        ]
      } catch (error) {
        console.error('Schema validation error:', error)
        return [{
          name: 'fallback',
          title: 'Fallback Content',
          type: 'document',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            }
          ]
        }]
      }
    })(),
  },
})
