import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
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
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(160),
      description: 'Brief description for search engines (max 160 characters)'
    }),

    // Page Header
    defineField({
      name: 'pageHeader',
      title: 'Page Header',
      type: 'object',
      fields: [
        defineField({
          name: 'showHeader',
          title: 'Show Page Header',
          type: 'boolean',
          initialValue: true
        }),
        defineField({
          name: 'headline',
          title: 'Page Headline',
          type: 'string'
        }),
        defineField({
          name: 'subheadline',
          title: 'Page Subheadline',
          type: 'text',
          rows: 2
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Header Background Image',
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
        }),
        defineField({
          name: 'textAlign',
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
        })
      ]
    }),

    // Page Content Sections
    defineField({
      name: 'contentSections',
      title: 'Page Content',
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
              of: [{type: 'block'}]
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'color'
            },
            {
              name: 'padding',
              title: 'Section Padding',
              type: 'string',
              options: {
                list: [
                  {title: 'Small', value: 'small'},
                  {title: 'Medium', value: 'medium'},
                  {title: 'Large', value: 'large'}
                ]
              },
              initialValue: 'medium'
            }
          ],
          preview: {
            select: {
              content: 'content'
            },
            prepare(selection) {
              const block = (selection.content || []).find(
                (block: any) => block._type === 'block'
              )
              return {
                title: 'Rich Text Section',
                subtitle: block ? block.children?.[0]?.text : 'No content'
              }
            }
          }
        },

        // Image + Text Section
        {
          type: 'object',
          name: 'imageTextSection',
          title: 'Image + Text Section',
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
        },

        // CTA Section
        {
          type: 'object',
          name: 'ctaSection',
          title: 'Call to Action Section',
          fields: [
            {
              name: 'title',
              title: 'CTA Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'CTA Description',
              type: 'text',
              rows: 3
            },
            {
              name: 'buttons',
              title: 'CTA Buttons',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'ctaButton',
                  title: 'CTA Button',
                  fields: [
                    {
                      name: 'text',
                      title: 'Button Text',
                      type: 'string'
                    },
                    {
                      name: 'link',
                      title: 'Button Link',
                      type: 'string'
                    },
                    {
                      name: 'style',
                      title: 'Button Style',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Primary', value: 'primary'},
                          {title: 'Secondary', value: 'secondary'},
                          {title: 'Outline', value: 'outline'}
                        ]
                      },
                      initialValue: 'primary'
                    }
                  ]
                }
              ]
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'color'
            },
            {
              name: 'textColor',
              title: 'Text Color',
              type: 'color'
            },
            {
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              options: {
                hotspot: true,
              }
            }
          ],
          preview: {
            select: {
              title: 'title'
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
              title: 'FAQ Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'faqItem',
                  title: 'FAQ Item',
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
                  ],
                  preview: {
                    select: {
                      title: 'question'
                    }
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
              title: 'title',
              faqCount: 'faqs'
            },
            prepare(selection) {
              const {title, faqCount} = selection
              return {
                title: title,
                subtitle: `${faqCount?.length || 0} FAQ items`
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
          name: 'metaKeywords',
          title: 'Meta Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Keywords for search engines'
        },
        {
          name: 'openGraphImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image used when shared on social media (recommended: 1200x630px)'
        },
        {
          name: 'noIndex',
          title: 'Hide from Search Engines',
          type: 'boolean',
          initialValue: false,
          description: 'Prevent search engines from indexing this page'
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug.current'
    },
    prepare(selection) {
      const {title, slug} = selection
      return {
        title: title,
        subtitle: slug ? `/${slug}` : 'No slug set'
      }
    }
  },

  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}]
    },
    {
      title: 'Created Date, New',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}]
    }
  ]
})