import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/routes'
import { loadLocale } from './i18n'
import { DEFAULT_LOCALE } from './config/site'
import '@fontsource-variable/alexandria'
import './styles/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, saved) {
      if (saved) return saved
      if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
      return { top: 0 }
    },
  },
  ({ router }) => {
    // Must resolve to undefined: returning a value from a guard is treated as a redirect.
    router.beforeEach(async (to) => {
      await loadLocale(to.meta.locale || DEFAULT_LOCALE)
    })

    // Analytics: the first page view is sent by the snippets in index.html; report in-app navigations here.
    if (!import.meta.env.SSR) {
      let first = true
      router.afterEach((to, from) => {
        if (first) return void (first = false)
        if (to.path === from.path) return // hash-only change
        setTimeout(() => {
          window.dataLayer?.push({ event: 'virtual_page_view', page_path: to.fullPath, page_title: document.title })
          window.fbq?.('track', 'PageView')
        }, 0)
      })
    }
  },
)

/** Pre-render every static route (both languages). */
export const includedRoutes = (paths) => paths.filter((p) => !p.includes(':'))
