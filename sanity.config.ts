import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {defineField, defineType} from 'sanity'

// Simple, inline schema definitions to avoid import issues
const productSchema = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true
    })
  ]
})

const categorySchema = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    })
  ]
})

const pageSchema = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}]
    })
  ]
})

export default defineConfig({
  name: 'inkey-list-studio',
  title: 'INKEY List Content Studio',
  projectId: '7i4b2ni6',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Homepage with preview
            S.listItem()
              .title('🏠 Homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),

            // Products with preview
            S.documentTypeListItem('product')
              .title('🧴 Products')
              .child(
                S.documentTypeList('product')
                  .title('Products')
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('product')
                  )
              ),

            // Categories
            S.documentTypeListItem('category').title('📂 Categories'),

            // Pages
            S.documentTypeListItem('page').title('📄 Pages'),
          ])
    }),
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
  ],

  // Live preview configuration
  document: {
    productionUrl: async (prev, { document }) => {
      const baseUrl = 'https://inkey-list-clone2.vercel.app'; // Deployed consumer site URL

      if (document._type === 'product' && document.slug?.current) {
        return `${baseUrl}/products/${document.slug.current}`;
      }

      if (document._type === 'homepage') {
        return baseUrl;
      }

      if (document._type === 'page' && document.slug?.current) {
        return `${baseUrl}/${document.slug.current}`;
      }

      return prev;
    },
  },

  schema: {
    types: [
      productSchema,
      categorySchema,
      pageSchema
    ],
  },
})
