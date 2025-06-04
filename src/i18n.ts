import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Studio translations
      'studio.title': 'INKEY List Content Studio',
      'studio.description': 'Content management for INKEY List skincare products',

      // Common terms
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.add': 'Add',
      'common.remove': 'Remove',
      'common.search': 'Search',
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',

      // Content types
      'content.homepage': 'Homepage',
      'content.products': 'Products',
      'content.categories': 'Categories',
      'content.pages': 'Pages',
      'content.banners': 'Banners',
      'content.blog': 'Blog Posts',
      'content.settings': 'Site Settings',
      'content.global': 'Global Content',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    react: {
      useSuspense: false, // Prevent suspense issues in Sanity Studio
    }
  })

export default i18n
