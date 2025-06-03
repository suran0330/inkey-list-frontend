import {type SchemaTypeDefinition} from 'sanity'

import homepage from './homepage'
import globalContent from './globalContent'
import page from './page'
import banner from './banner'
import blogPost from './blogPost'
import category from './category'
import product from './product'
import siteSettings from './siteSettings'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Core content management
    homepage,
    globalContent,
    page,
    banner,

    // Blog content
    blogPost,
    category,

    // Product management
    product,

    // Site settings
    siteSettings,
  ],
}