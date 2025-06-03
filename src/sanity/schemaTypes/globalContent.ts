import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'globalContent',
  title: 'Global Content',
  type: 'document',
  icon: () => '🌍',
  fields: [
    defineField({
      name: 'title',
      title: 'Content Title (Internal)',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Internal reference - not shown on frontend'
    }),

    // Site Header
    defineField({
      name: 'header',
      title: 'Site Header',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Site Logo',
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
          name: 'navigation',
          title: 'Main Navigation',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'navigationItem',
              title: 'Navigation Item',
              fields: [
                {
                  name: 'title',
                  title: 'Menu Item Title',
                  type: 'string'
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                  description: 'Internal link (e.g., /products) or external link'
                },
                {
                  name: 'openNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  initialValue: false
                }
              ]
            }
          ]
        }),
        defineField({
          name: 'ctaButton',
          title: 'Header CTA Button',
          type: 'object',
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
        })
      ]
    }),

    // Site Footer
    defineField({
      name: 'footer',
      title: 'Site Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'description',
          title: 'Company Description',
          type: 'text',
          rows: 3
        }),
        defineField({
          name: 'footerSections',
          title: 'Footer Sections',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'footerSection',
              title: 'Footer Section',
              fields: [
                {
                  name: 'title',
                  title: 'Section Title',
                  type: 'string'
                },
                {
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'footerLink',
                      title: 'Footer Link',
                      fields: [
                        {
                          name: 'title',
                          title: 'Link Title',
                          type: 'string'
                        },
                        {
                          name: 'url',
                          title: 'URL',
                          type: 'string'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }),
        defineField({
          name: 'socialMedia',
          title: 'Social Media Links',
          type: 'object',
          fields: [
            {
              name: 'facebook',
              title: 'Facebook URL',
              type: 'string'
            },
            {
              name: 'instagram',
              title: 'Instagram URL',
              type: 'string'
            },
            {
              name: 'twitter',
              title: 'Twitter URL',
              type: 'string'
            },
            {
              name: 'youtube',
              title: 'YouTube URL',
              type: 'string'
            },
            {
              name: 'tiktok',
              title: 'TikTok URL',
              type: 'string'
            }
          ]
        }),
        defineField({
          name: 'newsletter',
          title: 'Newsletter Signup',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Newsletter Title',
              type: 'string',
              initialValue: 'Stay in the Loop'
            },
            {
              name: 'description',
              title: 'Newsletter Description',
              type: 'text',
              rows: 2,
              initialValue: 'Get the latest skincare tips and product updates'
            },
            {
              name: 'buttonText',
              title: 'Subscribe Button Text',
              type: 'string',
              initialValue: 'Subscribe'
            }
          ]
        }),
        defineField({
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2024 INKEY List. All rights reserved.'
        })
      ]
    }),

    // Notification Bar
    defineField({
      name: 'notificationBar',
      title: 'Notification Bar',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Show Notification Bar',
          type: 'boolean',
          initialValue: false
        }),
        defineField({
          name: 'message',
          title: 'Notification Message',
          type: 'string'
        }),
        defineField({
          name: 'link',
          title: 'Link (Optional)',
          type: 'string'
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color'
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'color'
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'title'
    }
  }
})