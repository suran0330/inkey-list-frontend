import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'globalContent',
  title: 'Global Content',
  type: 'document',
  icon: () => '🌐',
  fields: [
    // Navigation
    defineField({
      name: 'navigation',
      title: 'Main Navigation',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Logo',
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
          name: 'menuItems',
          title: 'Menu Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Menu Title',
                  type: 'string'
                },
                {
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                  description: 'Internal links start with / (e.g., /products)'
                },
                {
                  name: 'hasDropdown',
                  title: 'Has Dropdown',
                  type: 'boolean',
                  initialValue: false
                },
                {
                  name: 'dropdownItems',
                  title: 'Dropdown Items',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'title',
                          title: 'Title',
                          type: 'string'
                        },
                        {
                          name: 'link',
                          title: 'Link',
                          type: 'string'
                        },
                        {
                          name: 'categoryId',
                          title: 'Category ID (from Admin)',
                          type: 'string',
                          description: 'Link to category from your admin system'
                        }
                      ]
                    }
                  ],
                  hidden: ({parent}) => !parent?.hasDropdown
                }
              ]
            }
          ]
        }
      ]
    }),

    // Announcement Bar
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Announcement Bar',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'text',
          title: 'Announcement Text',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Click Link (optional)',
          type: 'string'
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
          initialValue: {hex: '#000000'}
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'color',
          initialValue: {hex: '#ffffff'}
        },
        {
          name: 'dismissible',
          title: 'Can be Dismissed',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),

    // Footer
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'logo',
          title: 'Footer Logo',
          type: 'image',
          options: {
            hotspot: true,
          }
        },
        {
          name: 'description',
          title: 'Company Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'sections',
          title: 'Footer Sections',
          type: 'array',
          of: [
            {
              type: 'object',
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
        },
        {
          name: 'socialMedia',
          title: 'Social Media Links',
          type: 'object',
          fields: [
            {
              name: 'instagram',
              title: 'Instagram URL',
              type: 'url'
            },
            {
              name: 'tiktok',
              title: 'TikTok URL',
              type: 'url'
            },
            {
              name: 'youtube',
              title: 'YouTube URL',
              type: 'url'
            },
            {
              name: 'twitter',
              title: 'Twitter/X URL',
              type: 'url'
            },
            {
              name: 'facebook',
              title: 'Facebook URL',
              type: 'url'
            }
          ]
        },
        {
          name: 'newsletter',
          title: 'Newsletter Signup',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Show Newsletter Signup',
              type: 'boolean',
              initialValue: true
            },
            {
              name: 'title',
              title: 'Newsletter Title',
              type: 'string',
              initialValue: 'Stay Updated'
            },
            {
              name: 'description',
              title: 'Newsletter Description',
              type: 'text',
              rows: 2,
              initialValue: 'Get the latest skincare tips and exclusive offers'
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Subscribe'
            }
          ]
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: '© 2024 INKEY List. All rights reserved.'
        }
      ]
    }),

    // Contact Information
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Contact Email',
          type: 'email'
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Physical Address',
          type: 'text',
          rows: 3
        },
        {
          name: 'businessHours',
          title: 'Business Hours',
          type: 'text',
          rows: 2,
          placeholder: 'Mon-Fri: 9AM-5PM EST'
        }
      ]
    }),

    // Global SEO Defaults
    defineField({
      name: 'seoDefaults',
      title: 'Default SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'defaultTitle',
          title: 'Default Page Title',
          type: 'string',
          description: 'Used when individual pages don\'t have titles'
        },
        {
          name: 'titleTemplate',
          title: 'Title Template',
          type: 'string',
          description: 'Use %s for page title, e.g., "%s | INKEY List"',
          initialValue: '%s | INKEY List'
        },
        {
          name: 'defaultDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 2,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'defaultShareImage',
          title: 'Default Share Image',
          type: 'image',
          description: 'Used for social media sharing when pages don\'t have specific images'
        },
        {
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          description: 'Small icon that appears in browser tabs'
        }
      ]
    }),

    // Brand Colors and Styling
    defineField({
      name: 'brandSettings',
      title: 'Brand Settings',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primary Brand Color',
          type: 'color',
          description: 'Main brand color used throughout the site'
        },
        {
          name: 'secondaryColor',
          title: 'Secondary Brand Color',
          type: 'color',
          description: 'Accent color for highlights and buttons'
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
          description: 'Main background color'
        },
        {
          name: 'textColor',
          title: 'Primary Text Color',
          type: 'color',
          description: 'Main text color'
        }
      ]
    })
  ],

  preview: {
    prepare() {
      return {
        title: 'Global Content Settings'
      }
    }
  }
})
