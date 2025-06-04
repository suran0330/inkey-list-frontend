import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {minimalSchema} from './schemaTypes/minimal'

export default defineConfig({
  name: 'inkey-list-frontend',
  title: 'INKEY List Content Studio',
  projectId: '7i4b2ni6',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool({
      defaultApiVersion: '2024-01-01',
    }),
  ],

  schema: {
    types: minimalSchema,
  },
})
