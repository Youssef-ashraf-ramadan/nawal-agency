import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { SITE_URL, site, LOCALES, DEFAULT_LOCALE } from '@/config/site'
import { useLocale } from './useLocale'

/**
 * Per-page SEO: title, description, canonical, hreflang alternates, Open Graph, Twitter and JSON-LD.
 * The getter receives `{ url, canonical }` so pages can build absolute URLs (breadcrumbs, JSON-LD).
 * @param {(helpers: { url: (path: string) => string, canonical: import('vue').ComputedRef<string> }) =>
 *   { title: string, description: string, image?: string, type?: string, jsonLd?: object[] }} getter
 */
export function useSeo(getter) {
  const route = useRoute()
  const { t } = useLocale()
  const url = (p) => `${SITE_URL}${p}`
  const canonical = computed(() => url(route.path === '/' ? '/' : route.path.replace(/\/$/, '')))
  const data = computed(() => getter({ url, canonical }))
  const image = computed(() => `${SITE_URL}${data.value.image || site.ogImage}`)

  useHead({
    title: () => data.value.title,
    meta: () => [
      { name: 'description', content: data.value.description },
      { name: 'robots', content: route.meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: data.value.type || 'website' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:title', content: data.value.title },
      { property: 'og:description', content: data.value.description },
      { property: 'og:url', content: canonical.value },
      { property: 'og:image', content: image.value },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: t.value.ogLocale },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: data.value.title },
      { name: 'twitter:description', content: data.value.description },
      { name: 'twitter:image', content: image.value },
    ],
    link: () =>
      route.meta.noindex
        ? []
        : [
            { rel: 'canonical', href: canonical.value },
            ...LOCALES.map((l) => ({ rel: 'alternate', hreflang: l, href: url(route.meta.paths[l]) })),
            { rel: 'alternate', hreflang: 'x-default', href: url(route.meta.paths[DEFAULT_LOCALE]) },
          ],
    script: () =>
      (data.value.jsonLd || []).map((obj) => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...obj }),
      })),
  })

  return { canonical, url }
}

/** Breadcrumb JSON-LD helper */
export const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
})
