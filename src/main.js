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
  },
)

/** Pre-render every static route (both languages). */
export const includedRoutes = (paths) => paths.filter((p) => !p.includes(':'))
