import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  icon: () => '📢',
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Title (Internal)',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Internal reference - not shown on frontend'
    }),

    // Banner Content
    defineField({
      name: 'content',
      title: 'Banner Content',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Main Text',
          type: 'string',
          validation: Rule => Rule.required(),
          description: 'Main banner message'
        }),
        defineField({
          name: 'subtext',
          title: 'Subtext',
          type: 'string',
          description: 'Optional additional text'
        }),
        defineField({
          name: 'ctaButton',
          title: 'Call to Action Button',
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
              type: 'string',
              description: 'Where the button should link to'
            },
            {
              name: 'openNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false
            }
          ]
        })
      ]
    }),

    // Visual Styling
    defineField({
      name: 'styling',
      title: 'Visual Styling',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
          initialValue: {hex: '#ff6b35'}
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'color',
          initialValue: {hex: '#ffffff'}
        }),
        defineField({
          name: 'fontSize',
          title: 'Font Size',
          type: 'string',
          options: {
            list: [
              {title: 'Small', value: 'text-sm'},
              {title: 'Medium', value: 'text-base'},
              {title: 'Large', value: 'text-lg'}
            ]
          },
          initialValue: 'text-base'
        }),
        defineField({
          name: 'alignment',
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
        }),
        defineField({
          name: 'height',
          title: 'Banner Height',
          type: 'string',
          options: {
            list: [
              {title: 'Small (40px)', value: 'h-10'},
              {title: 'Medium (48px)', value: 'h-12'},
              {title: 'Large (64px)', value: 'h-16'},
              {title: 'Extra Large (80px)', value: 'h-20'}
            ]
          },
          initialValue: 'h-12'
        }),
        defineField({
          name: 'position',
          title: 'Banner Position',
          type: 'string',
          options: {
            list: [
              {title: 'Top of Page', value: 'top'},
              {title: 'Bottom of Page', value: 'bottom'},
              {title: 'Sticky Top', value: 'sticky-top'}
            ]
          },
          initialValue: 'top'
        })
      ]
    }),

    // Display Settings
    defineField({
      name: 'displaySettings',
      title: 'Display Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'active',
          title: 'Banner Active',
          type: 'boolean',
          initialValue: false,
          description: 'Turn this on to show the banner on the website'
        }),
        defineField({
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
        }),
        defineField({
          name: 'specificPages',
          title: 'Specific Page URLs',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Enter specific page URLs (e.g., "/about", "/products/serums")',
          hidden: ({parent}) => parent?.showOnPages !== 'specific'
        }),
        defineField({
          name: 'startDate',
          title: 'Start Date',
          type: 'datetime',
          description: 'When to start showing this banner (optional)'
        }),
        defineField({
          name: 'endDate',
          title: 'End Date',
          type: 'datetime',
          description: 'When to stop showing this banner (optional)'
        }),
        defineField({
          name: 'dismissible',
          title: 'User Can Dismiss',
          type: 'boolean',
          initialValue: true,
          description: 'Allow users to close/hide the banner'
        }),
        defineField({
          name: 'priority',
          title: 'Display Priority',
          type: 'number',
          validation: Rule => Rule.min(1).max(10),
          initialValue: 5,
          description: 'Higher numbers = higher priority (if multiple banners are active)'
        })
      ]
    }),

    // Analytics & Tracking
    defineField({
      name: 'tracking',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        defineField({
          name: 'campaignName',
          title: 'Campaign Name',
          type: 'string',
          description: 'For tracking banner performance (e.g., "summer-sale-2024")'
        }),
        defineField({
          name: 'utmParameters',
          title: 'UTM Parameters',
          type: 'object',
          fields: [
            {
              name: 'source',
              title: 'UTM Source',
              type: 'string'
            },
            {
              name: 'medium',
              title: 'UTM Medium',
              type: 'string'
            },
            {
              name: 'campaign',
              title: 'UTM Campaign',
              type: 'string'
            }
          ]
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'content.headline',
      active: 'displaySettings.active'
    },
    prepare(selection) {
      const {title, subtitle, active} = selection
      return {
        title: title,
        subtitle: subtitle,
        media: active ? '✅' : '❌'
      }
    }
  },

  orderings: [
    {
      title: 'Priority',
      name: 'priorityDesc',
      by: [{field: 'displaySettings.priority', direction: 'desc'}]
    },
    {
      title: 'Created Date',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}]
    }
  ]
})