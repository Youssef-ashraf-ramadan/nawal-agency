// Single source of truth for brand & contact info. Edit here, it updates everywhere (UI, SEO, JSON-LD).
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://point-marketing.vercel.app').replace(/\/$/, '')

export const site = {
  name: 'Point Marketing Agency',
  shortName: 'Point',
  email: 'pointmarketingagency.eg@gmail.com',
  phones: ['+201030064495', '+201556097775'],
  whatsapp: '201030064495',
  linktree: 'https://linktr.ee/pointmarketingagency.eg',
  // Add profile URLs to show their icons in the header/footer. Empty entries are hidden.
  socials: {
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    youtube: '',
  },
  logo: { src: '/images/logo.webp', white: '/images/logo-white.webp', width: 160, height: 96 },
  ogImage: '/images/og-image.jpg',
}

export const whatsappUrl = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const LOCALES = ['ar', 'en']
export const DEFAULT_LOCALE = 'ar'
