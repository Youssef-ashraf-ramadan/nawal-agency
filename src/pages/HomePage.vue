<script setup>
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { SITE_URL, site } from '@/config/site'
import HeroSection from '@/sections/HeroSection.vue'
import ServicesSection from '@/sections/ServicesSection.vue'
import HelpSection from '@/sections/HelpSection.vue'
import ProcessSection from '@/sections/ProcessSection.vue'
import WorkSection from '@/sections/WorkSection.vue'
import BlogCareersSection from '@/sections/BlogCareersSection.vue'

const { t, locale } = useLocale()
useSeo(() => ({
  ...t.value.meta.home,
  jsonLd: [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      inLanguage: locale.value,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}))
</script>

<template>
  <HeroSection />
  <ServicesSection />
  <HelpSection />
  <ProcessSection />
  <WorkSection />
  <BlogCareersSection />
</template>
