import {defineField, defineType} from 'sanity'

export const minimalSchema = [
  defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required()
      }),
      defineField({
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{type: 'block'}]
      })
    ]
  }),

  defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Product Name',
        type: 'string',
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
        type: 'number'
      })
    ]
  }),

  defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Category Name',
        type: 'string',
        validation: (Rule) => Rule.required()
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text'
      })
    ]
  })
]

export default minimalSchema
