// Language-independent data: ordering, icons and images. Texts live in ar.js / en.js keyed by the same ids.
const img = (name) => `/images/work/${name}.webp`

export const services = [
  { id: 'marketing', icon: 'chart' },
  { id: 'ai', icon: 'brain' },
  { id: 'software', icon: 'code' },
  { id: 'media', icon: 'video' },
]

export const helpIcons = ['search', 'bulb', 'gear', 'bars']
export const processIcons = ['bot', 'target', 'layout', 'rocket', 'trend']

export const cases = [
  { id: 'arab-stone', cover: img('arab-stone-1'), gallery: ['arab-stone-2', 'arab-stone-5', 'arab-stone-6'].map(img) },
  { id: 'variety', cover: img('variety-1'), gallery: ['variety-2', 'variety-3', 'variety-4'].map(img) },
  { id: 'egypta', cover: img('egypta-website'), gallery: [] },
  { id: 'habiba', cover: img('habiba-1'), gallery: ['habiba-2', 'habiba-3', 'habiba-4'].map(img) },
  { id: 'well-align', cover: img('well-align-1'), gallery: ['well-align-2', 'well-align-3', 'well-align-4'].map(img) },
]

/** Cases featured on the home page (design shows four). */
export const featuredCases = ['arab-stone', 'variety', 'egypta', 'habiba']

/** Where the home-page "View details" buttons go. Set to null to link each card to its case study on /work instead. */
export const featuredCasesLink = 'https://egyptamaxillofacial.com/'

/** Live websites shown on the case studies page. */
export const caseWebsites = { egypta: 'https://egyptamaxillofacial.com/' }

export const gallery = [
  ['well-align-1', 'medical'], ['habiba-7', 'tourism'], ['variety-1', 'construction'], ['arab-stone-2', 'marble'],
  ['food-1', 'food'], ['swimming-1', 'lifestyle'], ['medical-1', 'medical'], ['habiba-4', 'tourism'],
  ['construction-1', 'construction'], ['arab-stone-4', 'marble'], ['food-2', 'food'], ['cafe-1', 'lifestyle'],
  ['brand-arab-stone', 'branding'], ['medical-2', 'medical'], ['habiba-6', 'tourism'], ['variety-3', 'construction'],
  ['arab-stone-3', 'marble'], ['food-3', 'food'], ['beauty-2', 'lifestyle'], ['brand-sara-mazen', 'branding'],
  ['well-align-3', 'medical'], ['habiba-5', 'tourism'], ['construction-2', 'construction'], ['arab-stone-6', 'marble'],
  ['swimming-2', 'lifestyle'], ['brand-skyline', 'branding'], ['medical-3', 'medical'], ['habiba-3', 'tourism'],
  ['variety-4', 'construction'], ['cafe-2', 'lifestyle'], ['beauty-1', 'lifestyle'], ['cafe-3', 'lifestyle'],
].map(([name, cat]) => ({ src: img(name), cat, name }))

export const galleryFilters = ['all', 'medical', 'tourism', 'construction', 'marble', 'food', 'lifestyle', 'branding']

export const posts = [
  { slug: 'choose-marketing-strategy', icon: 'chart', minutes: 4 },
  { slug: 'ai-tools-for-business', icon: 'brain', minutes: 4 },
  { slug: 'video-engagement-ideas', icon: 'video', minutes: 3 },
  { slug: 'seo-basics', icon: 'search', minutes: 5 },
  { slug: 'brand-identity-guide', icon: 'star', minutes: 4 },
  { slug: 'meta-ads-lead-generation', icon: 'target', minutes: 5 },
  { slug: 'website-that-converts', icon: 'code', minutes: 5 },
  { slug: 'social-media-content-plan', icon: 'layout', minutes: 4 },
  { slug: 'whatsapp-automation-sales', icon: 'whatsapp', minutes: 4 },
]

/** All articles, newest first. */
export const postsByDate = (dict) =>
  [...posts].sort((a, b) => dict.blog.posts[b.slug].date.localeCompare(dict.blog.posts[a.slug].date))

/** Articles shown on the home page (latest three). */
export const latestPosts = (dict) => postsByDate(dict).slice(0, 3)

/** Case studies related to each service (shown on service detail pages). */
export const serviceCases = {
  marketing: ['arab-stone', 'well-align'],
  ai: ['variety'],
  software: ['egypta'],
  media: ['habiba', 'variety'],
}

export const heroImages = [img('well-align-1'), img('habiba-1'), img('arab-stone-1')]
