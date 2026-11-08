import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/** `vite preview`: serve /about → dist/about/index.html like Vercel's cleanUrls (instead of the SPA fallback). */
const prerenderedPreview = () => ({
  name: 'prerendered-preview',
  configurePreviewServer(server) {
    const dist = path.resolve(server.config.root, server.config.build.outDir)
    server.middlewares.use((req, res, next) => {
      const pathname = decodeURIComponent((req.url || '/').split('?')[0]).replace(/\/$/, '')
      if (pathname && !path.extname(pathname)) {
        const file = path.join(dist, pathname, 'index.html')
        if (fs.existsSync(file)) req.url = `${pathname}/index.html`
        else if (fs.existsSync(path.join(dist, '404.html'))) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(fs.readFileSync(path.join(dist, '404.html')))
        }
      }
      next()
    })
  },
})

export default defineConfig({
  plugins: [vue(), prerenderedPreview()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested',
    // Inline above-the-fold CSS into every pre-rendered page
    beastiesOptions: { preload: 'swap', preloadFonts: false, pruneSource: false, reduceInlineStyles: false },
  },
})
