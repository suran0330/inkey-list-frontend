import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for blog listings and SEO',
      validation: Rule => Rule.max(300)
    }),

    // Content
    defineField({
      name: 'content',
      title: 'Post Content',
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
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: false
                  }
                ]
              },
              {
                title: 'Product Link',
                name: 'productLink',
                type: 'object',
                fields: [
                  {
                    title: 'Shopify Product Handle',
                    name: 'productHandle',
                    type: 'string',
                    description: 'Enter the Shopify product handle (e.g., "hyaluronic-acid-serum")'
                  },
                  {
                    title: 'Link Text',
                    name: 'text',
                    type: 'string'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption (optional)'
            }
          ]
        }
      ]
    }),

    // Featured Image
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: Rule => Rule.required()
        }
      ]
    }),

    // Author and Publishing
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Author Name',
          type: 'string',
          initialValue: 'INKEY List Team'
        },
        {
          name: 'image',
          title: 'Author Image',
          type: 'image',
          options: {
            hotspot: true,
          }
        },
        {
          name: 'bio',
          title: 'Author Bio',
          type: 'text',
          rows: 2
        }
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'}
        ]
      },
      initialValue: 'draft'
    }),

    // Categories and Tags
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Skincare Tips', value: 'skincare-tips'},
          {title: 'Ingredient Spotlight', value: 'ingredients'},
          {title: 'Routine Guides', value: 'routines'},
          {title: 'Product Reviews', value: 'reviews'},
          {title: 'Skin Concerns', value: 'concerns'},
          {title: 'News & Updates', value: 'news'}
        ]
      }
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Add relevant tags for better organization'
    }),

    // Related Products (Shopify handles)
    defineField({
      name: 'relatedProductHandles',
      title: 'Related Products',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Enter Shopify product handles mentioned in this post',
      validation: Rule => Rule.max(6)
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'If left empty, post title will be used',
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
          title: 'Focus Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Main keywords for this post'
        },
        {
          name: 'shareImage',
          title: 'Social Media Share Image',
          type: 'image',
          description: 'Custom image for social sharing (defaults to featured image)'
        }
      ]
    }),

    // Blog Settings
    defineField({
      name: 'settings',
      title: 'Post Settings',
      type: 'object',
      fields: [
        {
          name: 'featured',
          title: 'Featured Post',
          type: 'boolean',
          description: 'Show in featured posts section',
          initialValue: false
        },
        {
          name: 'allowComments',
          title: 'Allow Comments',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'newsletter',
          title: 'Include in Newsletter',
          type: 'boolean',
          description: 'Include this post in email newsletters',
          initialValue: false
        },
        {
          name: 'readingTime',
          title: 'Estimated Reading Time (minutes)',
          type: 'number',
          description: 'Leave empty to auto-calculate',
          validation: Rule => Rule.min(1).max(30)
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      status: 'status',
      publishedAt: 'publishedAt'
    },
    prepare(selection) {
      const {title, author, status, publishedAt} = selection
      const statusIcon = status === 'published' ? '🟢' : status === 'draft' ? '🟡' : '🔴'
      const formattedDate = publishedAt ? new Date(publishedAt).toLocaleDateString() : ''

      return {
        title: `${statusIcon} ${title}`,
        subtitle: `By ${author || 'Unknown'} ${formattedDate ? `- ${formattedDate}` : ''}`,
        media: selection.media
      }
    }
  },

  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Published Date (Oldest)',
      name: 'publishedAsc',
      by: [
        {field: 'publishedAt', direction: 'asc'}
      ]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Status',
      name: 'status',
      by: [
        {field: 'status', direction: 'asc'},
        {field: 'publishedAt', direction: 'desc'}
      ]
    }
  ]
})
