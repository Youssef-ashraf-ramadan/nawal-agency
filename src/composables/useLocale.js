import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { dictionaries } from '@/i18n'
import { DEFAULT_LOCALE } from '@/config/site'

export function useLocale() {
  const route = useRoute()
  const locale = computed(() => route.meta.locale || DEFAULT_LOCALE)
  // Loaded by the router guard before any page renders
  const t = computed(() => dictionaries[locale.value])
  const otherLocale = computed(() => (locale.value === 'ar' ? 'en' : 'ar'))

  /** Localized path for an app path, e.g. to('/services') -> '/en/services' */
  const to = (path = '/') => {
    if (locale.value === DEFAULT_LOCALE) return path
    return path === '/' ? `/${locale.value}` : `/${locale.value}${path}`
  }

  const switchPath = computed(() => route.meta.paths?.[otherLocale.value] || '/')

  const formatDate = (iso) =>
    new Intl.DateTimeFormat(locale.value === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))

  return { locale, t, to, otherLocale, switchPath, formatDate }
}
