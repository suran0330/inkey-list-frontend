import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: () => '🧴',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'productId',
      title: 'Product ID',
      type: 'string',
      description: 'External product ID from your e-commerce system',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
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
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in your base currency'
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      description: 'Original price (for showing discounts)'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}]
    }),
    defineField({
      name: 'tags',
      title: 'Product Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'ingredients',
      title: 'Key Ingredients',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'howToUse',
      title: 'How to Use',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'metaKeywords',
          title: 'Meta Keywords',
          type: 'array',
          of: [{type: 'string'}]
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      price: 'price',
      inStock: 'inStock'
    },
    prepare(selection) {
      const {title, price, inStock} = selection
      return {
        title: title,
        subtitle: `${price ? `$${price}` : 'No price'} • ${inStock ? 'In Stock' : 'Out of Stock'}`
      }
    }
  }
})