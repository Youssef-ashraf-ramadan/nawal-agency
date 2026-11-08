<script setup>
import { useLocale } from '@/composables/useLocale'
import { site } from '@/config/site'

const { t, to } = useLocale()
const year = new Date().getFullYear()
const links = ['home', 'services', 'work', 'blog', 'careers', 'about', 'contact']
const path = (k) => (k === 'home' ? '/' : `/${k}`)
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <nav :aria-label="t.nav.menu">
        <ul class="footer__links">
          <li v-for="k in links" :key="k"><RouterLink :to="to(path(k))">{{ t.nav[k] }}</RouterLink></li>
        </ul>
      </nav>
      <div class="footer__langs">
        <a href="/en" hreflang="en" lang="en">EN</a>
        <span aria-hidden="true">|</span>
        <a href="/" hreflang="ar" lang="ar">AR</a>
      </div>
      <p class="footer__copy">© {{ year }} {{ site.name }}. {{ t.footer.rights }}.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--blue-950); color: rgb(255 255 255 / 0.7); font-size: var(--fs-sm); padding-block: 22px; }
.footer__inner { display: flex; align-items: center; justify-content: space-between; gap: 16px 32px; flex-wrap: wrap; }
.footer__links { display: flex; flex-wrap: wrap; gap: 8px 24px; }
.footer a:hover { color: var(--lime); }
.footer__langs { display: flex; gap: 10px; font-weight: 600; color: var(--white); }
.footer__copy { font-size: var(--fs-xs); }
@media (max-width: 720px) {
  .footer__inner { flex-direction: column; text-align: center; }
  .footer__links { justify-content: center; }
}
</style>
