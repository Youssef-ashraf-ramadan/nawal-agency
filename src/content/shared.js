// Language-independent data: ordering, icons and images. Texts live in ar.js / en.js keyed by the same ids.
const img = (name) => `/images/work/${name}.webp`

/**
 * A self-hosted video: /public/videos/<name>.mp4 (720p H.264, compressed from the client's Google Drive originals)
 * with its poster still /public/images/reels/<name>.webp (scripts/images.mjs). `wide` = 16:9 frame instead of 9:16.
 */
const reel = (name, wide = false) => ({ id: name, src: `/videos/${name}.mp4`, poster: `/images/reels/${name}.webp`, wide })
const driveView = (id) => `https://drive.google.com/file/d/${id}/view`

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
    // Shown instead of the images: AI videos produced for the client
    videos: [reel('ai-1', true), reel('ai-4', true), reel('ai-3', true), reel('ai-2', true)],
  },
  {
    id: 'egypta',
    cover: img('egypta-website'),
    gallery: [],
    sites: [
      { id: 'egypta', image: img('egypta-website'), url: 'https://egyptamaxillofacial.com/' },
      { id: 'arab-stone', image: img('site-arab-stone'), url: 'https://arabstone.online/' },
      { id: 'ibuild', image: img('site-ibuild'), url: 'https://www.ibuild-egy.com/' },
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
export const mediaReels = [reel('media-1'), reel('media-2'), reel('media-3'), reel('media-4')]

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

