# Point Marketing Agency — Website

Bilingual (Arabic / English) agency website built with **Vue 3 + Vite**, statically pre-rendered with **vite-ssg** for SEO and speed. Ready to deploy on **Vercel**.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # pre-render all pages (AR + EN) + sitemap.xml + robots.txt + 404.html
npm run preview   # preview the production build
npm run images    # regenerate optimized images from /data into /public/images
```

## Deploy on Vercel

1. Push the project to GitHub (the `data/` folder is git-ignored) and import it in Vercel. `vercel.json` already sets the build command, output folder, clean URLs and cache headers.
2. Add the environment variable `VITE_SITE_URL` with your final domain (e.g. `https://pointmarketing.com`). It is used for canonical URLs, hreflang, Open Graph and the sitemap.

## Where to edit

| What | File |
| --- | --- |
| Phone, email, WhatsApp, social links | `src/config/site.js` |
| Arabic / English texts | `src/content/ar.js`, `src/content/en.js` |
| Blog articles | `src/content/posts.ar.js`, `src/content/posts.en.js` + `posts` in `src/content/shared.js` |
| Service detail pages | `src/content/services.ar.js`, `src/content/services.en.js` |
| Images, case studies, gallery, home "View details" link | `src/content/shared.js` |
| Colors & font sizes | `src/styles/main.css` (`:root` tokens) |

## Routes

Arabic is the default language at `/`, English lives under `/en`. Every page exists in both:
`/`, `/services`, `/services/{marketing|ai|software|media}`, `/work`, `/blog`, `/blog/{slug}`, `/careers`, `/about`, `/contact`.

## Images

`/data` holds only the 40 source files the site uses. `npm run images` converts them into small WebP files in `public/images`. To swap or add an image, edit the `WORK` list in `scripts/images.mjs` and re-run it.
