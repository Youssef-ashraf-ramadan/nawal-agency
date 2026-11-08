import { LOCALES, DEFAULT_LOCALE } from '@/config/site'
import { posts, services } from '@/content/shared'

const prefix = (locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`)
const join = (locale, path) => `${prefix(locale)}${path}` || '/'

const pages = [
  { name: 'home', path: '', component: () => import('@/pages/HomePage.vue') },
  { name: 'services', path: '/services', component: () => import('@/pages/ServicesPage.vue') },
  ...services.map((s) => ({
    name: `service-${s.id}`,
    path: `/services/${s.id}`,
    component: () => import('@/pages/ServiceDetailPage.vue'),
    props: { id: s.id },
  })),
  { name: 'work', path: '/work', component: () => import('@/pages/WorkPage.vue') },
  { name: 'blog', path: '/blog', component: () => import('@/pages/BlogPage.vue') },
  ...posts.map((p) => ({
    name: `post-${p.slug}`,
    path: `/blog/${p.slug}`,
    component: () => import('@/pages/PostPage.vue'),
    props: { slug: p.slug },
  })),
  { name: 'careers', path: '/careers', component: () => import('@/pages/CareersPage.vue') },
  { name: 'about', path: '/about', component: () => import('@/pages/AboutPage.vue') },
  { name: 'contact', path: '/contact', component: () => import('@/pages/ContactPage.vue') },
  { name: '404', path: '/404', component: () => import('@/pages/NotFoundPage.vue'), noindex: true },
]

/** Every page exists once per locale; meta.paths links the translations for hreflang + the language switch. */
export const routes = [
  ...LOCALES.flatMap((locale) =>
    pages.map(({ name, path, component, props, noindex }) => ({
      path: join(locale, path),
      name: `${locale}:${name}`,
      component,
      props,
      meta: {
        locale,
        page: name,
        noindex: !!noindex,
        paths: Object.fromEntries(LOCALES.map((l) => [l, join(l, path)])),
      },
    })),
  ),
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { locale: DEFAULT_LOCALE, page: '404', noindex: true, paths: { ar: '/', en: '/en' } },
  },
]

/** All indexable paths (used by the sitemap script). */
export const sitemapEntries = routes
  .filter((r) => r.meta.page !== '404' && !r.path.includes(':'))
  .map((r) => ({ path: r.path, locale: r.meta.locale, paths: r.meta.paths, page: r.meta.page }))
