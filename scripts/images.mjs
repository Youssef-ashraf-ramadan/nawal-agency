/**
 * Image pipeline.
 * Takes a curated selection from /data (the full folder is ~1.2GB and is never shipped)
 * and writes small, web-ready WebP files into /public/images.
 *
 *   npm run images
 *
 * To add or swap a picture, edit the WORK list below and re-run the script.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const DATA = path.join(ROOT, 'data')
const OUT = path.join(ROOT, 'public', 'images')
const BRAND = path.join(import.meta.dirname, 'brand')

const D = 'Designs'
const BI = 'Brand Identity'

/** [output name, source path inside /data] — square 600px thumbnails */
const WORK = [
  ['well-align-1', `${D}/Medical & Healthcare/4.png`],
  ['well-align-2', `${D}/Medical & Healthcare/626.png`],
  ['well-align-3', `${D}/Medical & Healthcare/wellalgin.png2.png`],
  ['well-align-4', `${D}/Medical & Healthcare/wellalgin.png4.png`],
  ['medical-1', `${D}/Medical & Healthcare/2 التقويم الشفاف.png`],
  ['medical-2', `${D}/Medical & Healthcare/WhatsApp Image 2025-01-29 at 11.31.59 PM.jpeg`],
  ['medical-3', `${D}/Medical & Healthcare/علاج-العصب-بدون-الم.png`],
  ['habiba-1', `${D}/Tourism & Travel/Starting-2.jpg`],
  ['habiba-2', `${D}/Tourism & Travel/WhatsApp Image 2024-07-28 at 11.54.58 PM.jpeg`],
  ['habiba-3', `${D}/Tourism & Travel/Ticket-2-2-.jpg`],
  ['habiba-4', `${D}/Tourism & Travel/Khan.jpg`],
  ['habiba-5', `${D}/Tourism & Travel/safe-2--.jpg`],
  ['habiba-6', `${D}/Tourism & Travel/اختار-مصيفك.jpg`],
  ['habiba-7', `${D}/Tourism & Travel/1722957137720.jpg`],
  ['variety-1', `${D}/Construction & Interior Finishing/Royal living1.png`],
  ['variety-2', `${D}/Construction & Interior Finishing/481238062_122125714688699596_8151337456659811984_n.jpg`],
  ['variety-3', `${D}/Construction & Interior Finishing/Need Custom Kitchen Set (1).png`],
  ['variety-4', `${D}/Construction & Interior Finishing/WhatsApp Image 2026-02-18 at 12.16.15 AM.jpeg`],
  ['construction-1', `${D}/Construction & Interior Finishing/222222.png`],
  ['construction-2', `${D}/Construction & Interior Finishing/WhatsApp Image 2025-08-04 at 1.57.02 AM.jpeg`],
  ['arab-stone-1', `${D}/Marble & Granite/WhatsApp Image 2026-01-09 at 12.23.11 AM.jpeg`],
  ['arab-stone-2', `${D}/Marble & Granite/جلاكسى ستار.png`],
  ['arab-stone-3', `${D}/Marble & Granite/WhatsApp Image 2026-02-10 at 10.33.35 PM.jpeg`],
  ['arab-stone-4', `${D}/Marble & Granite/7--قلب-المحجر.jpg.jpeg`],
  ['arab-stone-5', `${BI}/Arabstone/Posts Arab (24).png`],
  ['arab-stone-6', `${BI}/Arabstone/WhatsApp Image 2025-09-25 at 12.08.53 AM.jpeg`],
  ['food-1', `${D}/Food & Beverage (F&B)/1717624472181.jpg`],
  ['food-2', `${D}/Food & Beverage (F&B)/24-04-07_12-22-48-679.jpg`],
  ['food-3', `${D}/Food & Beverage (F&B)/24-04-20_20-46-17-482 (1) - Copy.jpg`],
  ['swimming-1', `${D}/Swimming & Aquatics/1 (1).png`],
  ['swimming-2', `${D}/Swimming & Aquatics/2.png`],
  ['cafe-1', `${D}/Café & Gaming/1311.jpg`],
  ['cafe-2', `${D}/Café & Gaming/WhatsApp Image 2024-07-11 at 4.10.23 PM.jpeg`],
  ['cafe-3', `${D}/Café & Gaming/WhatsApp Image 2024-08-22 at 4.17.40 PM.jpeg`],
  ['beauty-1', `${D}/Beauty & Personal Care/55.png`],
  ['beauty-2', `${D}/Beauty & Personal Care/555.png`],
  ['brand-arab-stone', `${BI}/Arabstone/12-37-35-120-removebg-preview.png`],
  ['brand-sara-mazen', `${BI}/Coach.Sara Mazen/jpeg/Artboard 1 copy 2.png`],
  ['brand-skyline', `${BI}/Skyline/skyline whait-0٣.png`],
]

const webp = (img, q = 72) => img.webp({ quality: q, effort: 6 })

async function exists(p) {
  try { await fs.access(p); return true } catch { return false }
}

async function work() {
  await fs.mkdir(path.join(OUT, 'work'), { recursive: true })
  let done = 0
  for (const [name, rel] of WORK) {
    const src = path.join(DATA, rel)
    if (!(await exists(src))) { console.warn(`  skip (missing): ${rel}`); continue }
    const flat = name.startsWith('brand-') ? { background: '#ffffff' } : undefined
    let img = sharp(src).rotate()
    if (flat) img = img.flatten(flat)
    await webp(img.resize(600, 600, { fit: 'cover', position: 'attention' }))
      .toFile(path.join(OUT, 'work', `${name}.webp`))
    done++
  }
  console.log(`work: ${done}/${WORK.length}`)
}

async function websiteShot() {
  const src = path.join(DATA, 'Websites/Medical & Healthcare/screencapture-egyptamaxillofacial-2026-03-24-16_51_08.png')
  if (!(await exists(src))) return
  const { width } = await sharp(src).metadata()
  await webp(sharp(src).extract({ left: 0, top: 0, width, height: Math.round(width * 0.75) }).resize(800, 600))
    .toFile(path.join(OUT, 'work', 'egypta-website.webp'))
  console.log('website screenshot: ok')
}

async function brand() {
  const logo = sharp(path.join(BRAND, 'logo-source.png')).trim()
  const buf = await logo.png().toBuffer()
  // Header logo (2x of 44px display height)
  await webp(sharp(buf).resize({ height: 96 }), 90).toFile(path.join(OUT, 'logo.webp'))
  // White version for dark backgrounds
  const { data, info } = await sharp(buf).resize({ height: 96 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 4) { data[i] = data[i + 1] = data[i + 2] = 255 }
  await webp(sharp(data, { raw: info }), 90).toFile(path.join(OUT, 'logo-white.webp'))
  // PNG logo for structured data
  await sharp(buf).resize({ height: 256 }).png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'public', 'logo.png'))

  // Section photos
  await webp(sharp(path.join(BRAND, 'digital-source.png')).resize(720, 600, { fit: 'cover' }))
    .toFile(path.join(OUT, 'digital.webp'))
  await webp(sharp(path.join(BRAND, 'contact-source.jpg')).resize(900, 560, { fit: 'cover', position: 'right' }))
    .toFile(path.join(OUT, 'contact.webp'))

  // Open Graph image 1200x630
  const ogLogo = await sharp(buf).resize({ height: 230 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < ogLogo.data.length; i += 4) { ogLogo.data[i] = ogLogo.data[i + 1] = ogLogo.data[i + 2] = 255 }
  const white = await sharp(ogLogo.data, { raw: ogLogo.info }).png().toBuffer()
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1a2bc0"/><stop offset="1" stop-color="#0b1466"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <circle cx="1120" cy="70" r="150" fill="#e8f25b" opacity=".95"/>
    <circle cx="70" cy="590" r="110" fill="#e8f25b" opacity=".9"/>
    <text x="600" y="500" fill="#fff" font-family="Arial, sans-serif" font-size="40" text-anchor="middle">Marketing · AI · Software · Media Production</text>
  </svg>`)
  await sharp(bg).composite([{ input: white, top: 150, left: Math.round((1200 - ogLogo.info.width) / 2) }])
    .jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, 'og-image.jpg'))
  console.log('brand: ok')
}

await fs.mkdir(OUT, { recursive: true })
await Promise.all([work(), websiteShot(), brand()])
