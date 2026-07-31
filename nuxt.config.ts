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
      // (A) dashed route name — `doctors-tag` is what Nuxt itself generates
      //     for pages/doctors/[tag].vue
      'doctors': { en: '/doctors', es: '/medicos' },
      'doctors-tag': { en: '/doctors/:tag', es: '/medicos/:tag' },

      // (B) a Vue Router param constraint in the template
      'medicines-country': {
        en: '/medicines/:country(spain|poland|portugal|italy)',
        es: '/medicamentos/:country(spain|poland|portugal|italy)',
      },
    },
  },
})
