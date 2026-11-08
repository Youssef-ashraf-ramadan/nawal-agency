<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { SITE_URL, site } from '@/config/site'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CtaBand from '@/components/CtaBand.vue'
import fontArabic from '@fontsource-variable/alexandria/files/alexandria-arabic-wght-normal.woff2?url'
import fontLatin from '@fontsource-variable/alexandria/files/alexandria-latin-wght-normal.woff2?url'

const route = useRoute()
const { locale, t } = useLocale()
const showCta = computed(() => !['404', 'contact'].includes(route.meta.page))

const organization = {
  '@context': 'https://schema.org',
  '@type': 'MarketingAgency',
  '@id': `${SITE_URL}/#organization`,
  name: site.name,
  alternateName: ['Point', 'بوينت للتسويق'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}${site.ogImage}`,
  email: site.email,
  telephone: site.phones[0],
  areaServed: ['EG', 'SA', 'AE', 'LY'],
  knowsLanguage: ['ar', 'en'],
  slogan: 'A sentence is not complete without a point',
  sameAs: [site.linktree, ...Object.values(site.socials).filter(Boolean)],
  contactPoint: site.phones.map((telephone) => ({
    '@type': 'ContactPoint',
    telephone,
    contactType: 'customer service',
    availableLanguage: ['Arabic', 'English'],
  })),
}

useHead({
  htmlAttrs: { lang: () => locale.value, dir: () => t.value.dir },
  titleTemplate: (title) => title || site.name,
  link: () => [
    { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: locale.value === 'ar' ? fontArabic : fontLatin },
  ],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(organization), key: 'org' }],
})
</script>

<template>
  <a href="#main" class="skip-link">{{ t.nav.skip }}</a>
  <AppHeader />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <CtaBand v-if="showCta" />
  <AppFooter />
</template>
