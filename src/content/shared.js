// Language-independent data: ordering, icons and images. Texts live in ar.js / en.js keyed by the same ids.
const img = (name) => `/images/work/${name}.webp`

/** A Google Drive video: `poster` is a local still (scripts/images.mjs → /data/Reels), `wide` = 16:9 instead of 9:16. */
const reel = (id, poster, wide = false) => ({ id, poster: `/images/reels/${poster}.webp`, wide })
export const driveEmbed = (id) => `https://drive.google.com/file/d/${id}/preview`
export const driveView = (id) => `https://drive.google.com/file/d/${id}/view`

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
  {
    id: 'variety',
    cover: img('variety-1'),
    gallery: ['variety-2', 'variety-3', 'variety-4'].map(img),
    reels: [
      reel('1rrKRbjK0iDy9gC608ahVVuJ83ou13Qul', 'ai-1', true),
      reel('1A7X33YTNwNnU5GPEuepPcTo3HWVJJgcT', 'ai-2'),
      reel('1cr8amYo06pNF7wZadl70WhSqwbZ8BG4l', 'ai-3', true),
      reel('19Lia6GaPEY65mpxprcO6HjNs0Z2xXWom', 'ai-4', true),
    ],
  },
  {
    id: 'egypta',
    cover: img('egypta-website'),
    gallery: [],
    sites: [
      { id: 'egypta', image: img('egypta-website'), url: 'https://egyptamaxillofacial.com/' },
      { id: 'arab-stone', image: img('site-arab-stone'), url: 'https://arabstone.online/' },
      { id: 'ibuild', image: img('site-ibuild'), url: 'https://build-egy.com/' },
    ],
  },
  {
    id: 'habiba',
    cover: img('habiba-1'),
    gallery: ['habiba-3', 'habiba-mothers-day', 'habiba-hajj', 'habiba-summer', 'habiba-find-flight', 'habiba-4', 'arab-stone-4', 'variety-hallway'].map(img),
  },
  {
    id: 'well-align',
    cover: img('well-align-1'),
    gallery: ['well-align-2', 'well-align-3', 'well-align-4'].map(img),
    links: [
      { id: 'well-align-strategy', icon: 'chart', url: driveView('1wtad7gpWWBMjyQIAcGMZqXicMSI0dvHR') },
      { id: 'market-plans', icon: 'layout', url: 'https://drive.google.com/drive/folders/1TD0woYgzLX6GqQi0NxnAHKJY_Sj1Tc27' },
    ],
  },
]

/** "Media Production" section on /work — videos produced by the Point team. */
export const mediaReels = [
  reel('1G1f-gRZdFxTV6FO5cWd8gans0ZReOseP', 'media-1'),
  reel('1BQ1WWv_THvCcI_2WN1vn1SPFBCYsC7yb', 'media-2'),
  reel('13ocO35CNQPjF8oHWtboMQRLZ8Xol6E84', 'media-3'),
  reel('1D9rG09Z5AfV9rnu3tG1FdEmKRF_yOEms', 'media-4'),
]

/** Cases featured on the home page (design shows four). */
export const featuredCases = ['arab-stone', 'variety', 'egypta', 'habiba']

/** Where the home-page "View details" buttons go. Set to null to link each card to its case study on /work instead. */
export const featuredCasesLink = null

/** Live websites shown on the case studies page. */
export const caseWebsites = {}

export const gallery = [
  ['well-align-1', 'medical'], ['habiba-hajj', 'tourism'], ['variety-hallway', 'construction'], ['arab-stone-2', 'marble'],
  ['habiba-summer', 'tourism'], ['well-align-4', 'medical'], ['habiba-find-flight', 'tourism'], ['arab-stone-1', 'marble'],
  ['habiba-mothers-day', 'tourism'], ['variety-2', 'construction'], ['habiba-3', 'tourism'], ['brand-arab-stone', 'branding'],
  ['habiba-7', 'tourism'], ['variety-1', 'construction'],
  ['food-1', 'food'], ['swimming-1', 'lifestyle'], ['medical-1', 'medical'], ['habiba-4', 'tourism'],
  ['construction-1', 'construction'], ['arab-stone-4', 'marble'], ['food-2', 'food'], ['cafe-1', 'lifestyle'],
  ['medical-2', 'medical'], ['habiba-6', 'tourism'], ['variety-3', 'construction'],
  ['arab-stone-3', 'marble'], ['food-3', 'food'], ['beauty-2', 'lifestyle'], ['brand-sara-mazen', 'branding'],
  ['well-align-3', 'medical'], ['habiba-5', 'tourism'], ['construction-2', 'construction'], ['arab-stone-6', 'marble'],
  ['swimming-2', 'lifestyle'], ['brand-skyline', 'branding'], ['medical-3', 'medical'],
  ['variety-4', 'construction'], ['cafe-2', 'lifestyle'], ['beauty-1', 'lifestyle'], ['cafe-3', 'lifestyle'],
].map(([name, cat]) => ({ src: img(name), cat, name }))

export const galleryFilters = ['all', 'medical', 'tourism', 'construction', 'marble', 'food', 'lifestyle', 'branding']

export const posts = [
  { slug: 'ai-automation', icon: 'brain', minutes: 4 },
  { slug: 'social-media-management', icon: 'users', minutes: 4 },
  { slug: 'web-development', icon: 'code', minutes: 5 },
  { slug: 'paid-advertising', icon: 'target', minutes: 4 },
  { slug: 'branding', icon: 'star', minutes: 4 },
  { slug: 'marketing-strategy-content-plan', icon: 'chart', minutes: 5 },
  { slug: 'media-production', icon: 'video', minutes: 4 },
  { slug: 'graphic-design', icon: 'layout', minutes: 4 },
  { slug: 'why-point-marketing-agency', icon: 'rocket', minutes: 4 },
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

