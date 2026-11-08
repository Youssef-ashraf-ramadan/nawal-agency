/**
 * Post-build: generates sitemap.xml (with hreflang alternates), robots.txt and a root 404.html for Vercel.
 * Runs automatically after `vite-ssg build`.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { loadEnv } from 'vite'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
const env = { ...loadEnv('production', ROOT, 'VITE_'), ...process.env }
const SITE = (env.VITE_SITE_URL || 'https://point-marketing.vercel.app').replace(/\/$/, '')

async function walk(dir) {
  const out = []
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (e.name === 'index.html') out.push(p)
  }
  return out
}

const toRoute = (file) => {
  const rel = path.relative(DIST, path.dirname(file)).split(path.sep).join('/')
  return rel ? `/${rel}` : '/'
}
const arOf = (route) => (route === '/en' ? '/' : route.replace(/^\/en(?=\/)/, ''))
const enOf = (route) => (route === '/' ? '/en' : `/en${route}`)
const abs = (route) => (route === '/' ? `${SITE}/` : `${SITE}${route}`)

const routes = (await walk(DIST)).map(toRoute).filter((r) => !/(^|\/)404$/.test(r)).sort()
const today = new Date().toISOString().slice(0, 10)

const urls = routes.map((r) => {
  const ar = arOf(r)
  const en = enOf(ar)
  const depth = ar === '/' ? 0 : ar.split('/').length - 1
  const priority = depth === 0 ? '1.0' : depth === 1 ? '0.8' : '0.6'
  return `  <url>
    <loc>${abs(r)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${depth === 0 ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${abs(ar)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(ar)}"/>
  </url>`
})

await fs.writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`,
)
await fs.writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)

// Vercel serves /404.html for unknown paths
const nf = path.join(DIST, '404', 'index.html')
try {
  await fs.copyFile(nf, path.join(DIST, '404.html'))
  await fs.rm(path.join(DIST, '404'), { recursive: true })
  await fs.rm(path.join(DIST, 'en', '404'), { recursive: true, force: true })
} catch {}

console.log(`sitemap: ${routes.length} urls → ${SITE}`)
