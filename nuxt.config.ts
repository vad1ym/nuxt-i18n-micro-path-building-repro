export default defineNuxtConfig({
  compatibilityDate: '2025-04-01',
  modules: ['nuxt-i18n-micro'],

  i18n: {
    locales: [
      { code: 'en', iso: 'en' },
      { code: 'es', iso: 'es' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    translationDir: 'locales',
    disablePageLocales: true,

    globalLocaleRoutes: {
      // Case A.
      // `blog-slug` is the route name Nuxt generates for pages/blog/[slug].vue.
      // Both entries are absolute paths, as documented.
      'blog': { es: '/blog-es' },
      'blog-slug': { es: '/blog-es/:slug' },

      // Case B.
      // `(2024|2025)` is a standard Vue Router param constraint.
      'archive-year': { es: '/archivo/:year(2024|2025)' },
    },
  },
})
