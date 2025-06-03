import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title (SEO)',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'INKEY List - Science-Backed Skincare'
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(160),
      description: 'Brief description for search engines (max 160 characters)'
    }),

    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Main Headline',
          type: 'string',
          initialValue: 'Science-Backed Skincare'
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
          initialValue: 'Effective ingredients. Honest prices. Real results.'
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility'
            }
          ]
        }),
        defineField({
          name: 'ctaButton',
          title: 'Call to Action Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Shop Now'
            },
            {
              name: 'link',
              title: 'Button Link',
              type: 'string',
              description: 'Link to products page or specific collection',
              initialValue: '/products'
            }
          ]
        }),
        defineField({
          name: 'overlay',
          title: 'Background Overlay',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Enable Overlay',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'opacity',
              title: 'Overlay Opacity',
              type: 'number',
              validation: Rule => Rule.min(0).max(1),
              initialValue: 0.3
            },
            {
              name: 'color',
              title: 'Overlay Color',
              type: 'color',
              initialValue: {hex: '#000000'}
            }
          ]
        })
      ]
    }),

    // Featured Products Section (references your admin products by ID/handle)
    defineField({
      name: 'featuredProductsSection',
      title: 'Featured Products Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Featured Products',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Best Sellers'
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 2
        }),
        defineField({
          name: 'productIds',
          title: 'Featured Product IDs',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Enter product IDs from your admin system (e.g., "prod_123", "prod_456")',
          validation: Rule => Rule.max(6)
        }),
        defineField({
          name: 'layout',
          title: 'Layout Style',
          type: 'string',
          options: {
            list: [
              {title: '2 Columns', value: 'grid-2'},
              {title: '3 Columns', value: 'grid-3'},
              {title: '4 Columns', value: 'grid-4'},
              {title: 'Carousel', value: 'carousel'}
            ]
          },
          initialValue: 'grid-3'
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color'
        })
      ]
    }),

    // Content Sections (flexible content blocks)
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        // Text + Image Section
        {
          type: 'object',
          name: 'textImageSection',
          title: 'Text + Image Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string'
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{type: 'block'}]
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text'
                }
              ]
            },
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  {title: 'Image Left', value: 'image-left'},
                  {title: 'Image Right', value: 'image-right'},
                  {title: 'Image Top', value: 'image-top'},
                  {title: 'Image Bottom', value: 'image-bottom'}
                ]
              },
              initialValue: 'image-right'
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'color'
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        }
      ]
    }),

    // SEO and Social
    defineField({
      name: 'seo',
      title: 'SEO & Social Media',
      type: 'object',
      fields: [
        {
          name: 'openGraphImage',
          title: 'Social Media Share Image',
          type: 'image',
          description: 'Recommended size: 1200x630px'
        },
        {
          name: 'twitterCard',
          title: 'Twitter Card Type',
          type: 'string',
          options: {
            list: [
              {title: 'Summary', value: 'summary'},
              {title: 'Summary Large Image', value: 'summary_large_image'}
            ]
          },
          initialValue: 'summary_large_image'
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'heroSection.headline'
    }
  }
})