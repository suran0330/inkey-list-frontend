import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Content Pages',
  type: 'document',
  icon: () => '📄',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          {title: 'About Us', value: 'about'},
          {title: 'FAQ', value: 'faq'},
          {title: 'Contact', value: 'contact'},
          {title: 'Privacy Policy', value: 'privacy'},
          {title: 'Terms of Service', value: 'terms'},
          {title: 'Shipping Info', value: 'shipping'},
          {title: 'Returns', value: 'returns'},
          {title: 'Ingredients Guide', value: 'ingredients'},
          {title: 'How to Use', value: 'how-to'},
          {title: 'Landing Page', value: 'landing'},
          {title: 'Custom', value: 'custom'}
        ]
      },
      initialValue: 'custom'
    }),

    // Hero Section for Pages
    defineField({
      name: 'heroSection',
      title: 'Hero Section (Optional)',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Hero Section',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'headline',
          title: 'Headline',
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          }
        },
        {
          name: 'textAlignment',
          title: 'Text Alignment',
          type: 'string',
          options: {
            list: [
              {title: 'Left', value: 'left'},
              {title: 'Center', value: 'center'},
              {title: 'Right', value: 'right'}
            ]
          },
          initialValue: 'center'
        }
      ]
    }),

    // Flexible Content Sections
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        // Rich Text Section
        {
          type: 'object',
          name: 'richTextSection',
          title: 'Rich Text Section',
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H2', value: 'h2'},
                    {title: 'H3', value: 'h3'},
                    {title: 'H4', value: 'h4'},
                    {title: 'Quote', value: 'blockquote'}
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Code', value: 'code'}
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url'
                          }
                        ]
                      }
                    ]
                  }
                }
              ]
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'color'
            }
          ],
          preview: {
            select: {
              content: 'content'
            },
            prepare(selection) {
              const block = (selection.content || []).find(block => block._type === 'block')
              return {
                title: 'Rich Text Section',
                subtitle: block
                  ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                      .substring(0, 50) + '...'
                  : 'No content'
              }
            }
          }
        },

        // FAQ Section
        {
          type: 'object',
          name: 'faqSection',
          title: 'FAQ Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Frequently Asked Questions'
            },
            {
              name: 'faqs',
              title: 'FAQs',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'question',
                      title: 'Question',
                      type: 'string'
                    },
                    {
                      name: 'answer',
                      title: 'Answer',
                      type: 'array',
                      of: [{type: 'block'}]
                    }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              faqCount: 'faqs.length'
            },
            prepare(selection) {
              const {title, faqCount} = selection
              return {
                title: title || 'FAQ Section',
                subtitle: `${faqCount || 0} questions`
              }
            }
          }
        },

        // Contact Form Section
        {
          type: 'object',
          name: 'contactFormSection',
          title: 'Contact Form Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Get in Touch'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3
            },
            {
              name: 'formFields',
              title: 'Form Fields',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Field Label',
                      type: 'string'
                    },
                    {
                      name: 'fieldType',
                      title: 'Field Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Text', value: 'text'},
                          {title: 'Email', value: 'email'},
                          {title: 'Phone', value: 'tel'},
                          {title: 'Textarea', value: 'textarea'},
                          {title: 'Select', value: 'select'}
                        ]
                      }
                    },
                    {
                      name: 'required',
                      title: 'Required Field',
                      type: 'boolean',
                      initialValue: false
                    },
                    {
                      name: 'placeholder',
                      title: 'Placeholder Text',
                      type: 'string'
                    }
                  ]
                }
              ]
            },
            {
              name: 'submitButtonText',
              title: 'Submit Button Text',
              type: 'string',
              initialValue: 'Send Message'
            }
          ],
          preview: {
            select: {
              title: 'title'
            }
          }
        },

        // Featured Products Section (references admin products)
        {
          type: 'object',
          name: 'featuredProductsSection',
          title: 'Featured Products Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string'
            },
            {
              name: 'subtitle',
              title: 'Section Subtitle',
              type: 'text',
              rows: 2
            },
            {
              name: 'productIds',
              title: 'Product IDs',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Enter product IDs from your admin system'
            },
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  {title: '2 Columns', value: 'grid-2'},
                  {title: '3 Columns', value: 'grid-3'},
                  {title: '4 Columns', value: 'grid-4'}
                ]
              },
              initialValue: 'grid-3'
            }
          ],
          preview: {
            select: {
              title: 'title',
              productCount: 'productIds.length'
            },
            prepare(selection) {
              const {title, productCount} = selection
              return {
                title: title || 'Featured Products',
                subtitle: `${productCount || 0} products`
              }
            }
          }
        },

        // Image Gallery Section
        {
          type: 'object',
          name: 'imageGallerySection',
          title: 'Image Gallery Section',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string'
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative text'
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption (optional)'
                    }
                  ]
                }
              ]
            },
            {
              name: 'layout',
              title: 'Gallery Layout',
              type: 'string',
              options: {
                list: [
                  {title: 'Grid', value: 'grid'},
                  {title: 'Masonry', value: 'masonry'},
                  {title: 'Carousel', value: 'carousel'}
                ]
              },
              initialValue: 'grid'
            }
          ],
          preview: {
            select: {
              title: 'title',
              imageCount: 'images.length',
              firstImage: 'images.0'
            },
            prepare(selection) {
              const {title, imageCount, firstImage} = selection
              return {
                title: title || 'Image Gallery',
                subtitle: `${imageCount || 0} images`,
                media: firstImage
              }
            }
          }
        }
      ]
    }),

    // SEO Settings
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'If left empty, page title will be used',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Important keywords for this page'
        },
        {
          name: 'shareImage',
          title: 'Social Media Share Image',
          type: 'image',
          description: 'Image shown when sharing on social media'
        },
        {
          name: 'noIndex',
          title: 'Hide from Search Engines',
          type: 'boolean',
          description: 'Prevent search engines from indexing this page',
          initialValue: false
        }
      ]
    }),

    // Page Settings
    defineField({
      name: 'settings',
      title: 'Page Settings',
      type: 'object',
      fields: [
        {
          name: 'showInNavigation',
          title: 'Show in Main Navigation',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'showInFooter',
          title: 'Show in Footer',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'requiresAuth',
          title: 'Requires Authentication',
          type: 'boolean',
          description: 'Only logged-in users can access this page',
          initialValue: false
        },
        {
          name: 'template',
          title: 'Page Template',
          type: 'string',
          options: {
            list: [
              {title: 'Default', value: 'default'},
              {title: 'Full Width', value: 'full-width'},
              {title: 'Centered', value: 'centered'},
              {title: 'Sidebar', value: 'sidebar'}
            ]
          },
          initialValue: 'default'
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
      slug: 'slug.current'
    },
    prepare(selection) {
      const {title, pageType, slug} = selection
      return {
        title,
        subtitle: `${pageType} - /${slug}`
      }
    }
  }
})
