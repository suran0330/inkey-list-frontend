import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'banner',
  title: 'Banners & Announcements',
  type: 'document',
  icon: () => '📢',
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Title (Internal)',
      type: 'string',
      description: 'Internal title for organization - not shown to users',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bannerType',
      title: 'Banner Type',
      type: 'string',
      options: {
        list: [
          {title: 'Announcement Bar', value: 'announcement'},
          {title: 'Hero Banner', value: 'hero'},
          {title: 'Promotional Banner', value: 'promo'},
          {title: 'Sale Banner', value: 'sale'},
          {title: 'Newsletter Signup', value: 'newsletter'},
          {title: 'Popup Modal', value: 'popup'}
        ]
      },
      validation: Rule => Rule.required()
    }),

    // Display Settings
    defineField({
      name: 'displaySettings',
      title: 'Display Settings',
      type: 'object',
      fields: [
        {
          name: 'active',
          title: 'Active',
          type: 'boolean',
          description: 'Show this banner to users',
          initialValue: false
        },
        {
          name: 'priority',
          title: 'Priority',
          type: 'number',
          description: 'Higher numbers show first (1-100)',
          validation: Rule => Rule.min(1).max(100),
          initialValue: 50
        },
        {
          name: 'showOnPages',
          title: 'Show on Pages',
          type: 'string',
          options: {
            list: [
              {title: 'All Pages', value: 'all'},
              {title: 'Homepage Only', value: 'homepage'},
              {title: 'Product Pages Only', value: 'products'},
              {title: 'Specific Pages', value: 'specific'}
            ]
          },
          initialValue: 'all'
        },
        {
          name: 'specificPages',
          title: 'Specific Page URLs',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Enter page URLs (e.g., /about, /products/serums)',
          hidden: ({parent}) => parent?.showOnPages !== 'specific'
        },
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'datetime',
          description: 'When to start showing this banner'
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'datetime',
          description: 'When to stop showing this banner (optional)'
        }
      ]
    }),

    // Content
    defineField({
      name: 'content',
      title: 'Banner Content',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main message text'
        },
        {
          name: 'subtext',
          title: 'Subtext',
          type: 'text',
          rows: 2,
          description: 'Additional details (optional)'
        },
        {
          name: 'ctaButton',
          title: 'Call to Action Button',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Show Button',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'text',
              title: 'Button Text',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Button Link',
              type: 'string',
              description: 'URL or path (e.g., /products, https://example.com)'
            },
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'primary'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Outline', value: 'outline'},
                  {title: 'Link', value: 'link'}
                ]
              },
              initialValue: 'primary'
            }
          ]
        },
        {
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
              title: 'Alternative text'
            }
          ]
        }
      ]
    }),

    // Styling
    defineField({
      name: 'styling',
      title: 'Visual Styling',
      type: 'object',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
          description: 'Used if no background image is set'
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'color',
          initialValue: {hex: '#000000'}
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
        },
        {
          name: 'height',
          title: 'Banner Height',
          type: 'string',
          options: {
            list: [
              {title: 'Small (60px)', value: 'small'},
              {title: 'Medium (120px)', value: 'medium'},
              {title: 'Large (200px)', value: 'large'},
              {title: 'Extra Large (300px)', value: 'xl'},
              {title: 'Full Screen', value: 'fullscreen'}
            ]
          },
          initialValue: 'medium'
        },
        {
          name: 'overlay',
          title: 'Background Overlay',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Enable Overlay',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'color',
              title: 'Overlay Color',
              type: 'color',
              initialValue: {hex: '#000000'}
            },
            {
              name: 'opacity',
              title: 'Overlay Opacity',
              type: 'number',
              validation: Rule => Rule.min(0).max(1),
              initialValue: 0.5
            }
          ]
        }
      ]
    }),

    // Behavior Settings
    defineField({
      name: 'behaviorSettings',
      title: 'Behavior Settings',
      type: 'object',
      fields: [
        {
          name: 'dismissible',
          title: 'Can be Dismissed',
          type: 'boolean',
          description: 'Allow users to close/hide this banner',
          initialValue: true
        },
        {
          name: 'autoHide',
          title: 'Auto Hide After (seconds)',
          type: 'number',
          description: 'Automatically hide after X seconds (0 = never)',
          initialValue: 0
        },
        {
          name: 'sticky',
          title: 'Sticky Position',
          type: 'boolean',
          description: 'Banner stays visible when scrolling',
          initialValue: false
        },
        {
          name: 'animation',
          title: 'Entry Animation',
          type: 'string',
          options: {
            list: [
              {title: 'None', value: 'none'},
              {title: 'Fade In', value: 'fade'},
              {title: 'Slide Down', value: 'slide-down'},
              {title: 'Slide Up', value: 'slide-up'},
              {title: 'Zoom In', value: 'zoom'}
            ]
          },
          initialValue: 'fade'
        }
      ]
    }),

    // Targeting (Advanced)
    defineField({
      name: 'targeting',
      title: 'Advanced Targeting',
      type: 'object',
      fields: [
        {
          name: 'showToNewVisitors',
          title: 'Show to New Visitors Only',
          type: 'boolean',
          description: 'Only show to first-time visitors',
          initialValue: false
        },
        {
          name: 'showToReturningVisitors',
          title: 'Show to Returning Visitors Only',
          type: 'boolean',
          description: 'Only show to visitors who have been here before',
          initialValue: false
        },
        {
          name: 'deviceTargeting',
          title: 'Device Targeting',
          type: 'string',
          options: {
            list: [
              {title: 'All Devices', value: 'all'},
              {title: 'Desktop Only', value: 'desktop'},
              {title: 'Mobile Only', value: 'mobile'},
              {title: 'Tablet Only', value: 'tablet'}
            ]
          },
          initialValue: 'all'
        },
        {
          name: 'maxViewsPerUser',
          title: 'Max Views Per User',
          type: 'number',
          description: 'How many times to show this banner to the same user (0 = unlimited)',
          initialValue: 0
        }
      ]
    }),

    // Analytics
    defineField({
      name: 'analytics',
      title: 'Analytics Tracking',
      type: 'object',
      fields: [
        {
          name: 'trackViews',
          title: 'Track Views',
          type: 'boolean',
          description: 'Track how many times this banner is viewed',
          initialValue: true
        },
        {
          name: 'trackClicks',
          title: 'Track Clicks',
          type: 'boolean',
          description: 'Track how many times the CTA button is clicked',
          initialValue: true
        },
        {
          name: 'analyticsId',
          title: 'Analytics ID',
          type: 'string',
          description: 'Custom ID for tracking this banner in analytics'
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      type: 'bannerType',
      active: 'displaySettings.active',
      headline: 'content.headline',
      startDate: 'displaySettings.startDate'
    },
    prepare(selection) {
      const {title, type, active, headline, startDate} = selection
      const status = active ? '🟢' : '🔴'
      const formattedDate = startDate ? new Date(startDate).toLocaleDateString() : ''

      return {
        title: `${status} ${title}`,
        subtitle: `${type} - "${headline}" ${formattedDate ? `(starts ${formattedDate})` : ''}`
      }
    }
  },

  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [
        {field: 'displaySettings.priority', direction: 'desc'}
      ]
    },
    {
      title: 'Start Date',
      name: 'startDate',
      by: [
        {field: 'displaySettings.startDate', direction: 'desc'}
      ]
    },
    {
      title: 'Active Status',
      name: 'activeFirst',
      by: [
        {field: 'displaySettings.active', direction: 'desc'},
        {field: 'displaySettings.priority', direction: 'desc'}
      ]
    }
  ]
})
