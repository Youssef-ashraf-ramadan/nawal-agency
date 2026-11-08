import { shallowReactive } from 'vue'

// Each locale's content is its own chunk: a page only downloads the language it shows.
const loaders = {
  ar: () => import('@/content/ar'),
  en: () => import('@/content/en'),
}

export const dictionaries = shallowReactive({})

export async function loadLocale(locale) {
  if (!dictionaries[locale]) dictionaries[locale] = (await loaders[locale]()).default
  return dictionaries[locale]
}
