<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { site } from '@/config/site'
import AppIcon from './AppIcon.vue'

const route = useRoute()
const { t, to, switchPath, otherLocale } = useLocale()
const open = ref(false)

const links = computed(() => [
  { key: 'home', path: '/' },
  { key: 'services', path: '/services' },
  { key: 'work', path: '/work' },
  { key: 'blog', path: '/blog' },
  { key: 'careers', path: '/careers' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
])

const isActive = (key) => {
  const page = route.meta.page || ''
  if (key === 'blog') return page === 'blog' || page.startsWith('post-')
  if (key === 'services') return page === 'services' || page.startsWith('service-')
  return page === key
}

watch(() => route.fullPath, () => (open.value = false))
watch(open, (v) => {
  if (typeof document !== 'undefined') document.documentElement.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <header class="header">
    <div class="container header__bar">
      <RouterLink :to="to('/')" class="header__logo" :aria-label="t.nav.home_aria">
        <img :src="site.logo.src" :width="site.logo.width" :height="site.logo.height" :alt="site.name" fetchpriority="high" />
      </RouterLink>

      <nav class="nav" :class="{ 'nav--open': open }" id="main-nav" :aria-label="t.nav.menu">
        <ul class="nav__list">
          <li v-for="l in links" :key="l.key">
            <RouterLink :to="to(l.path)" class="nav__link" :class="{ 'is-active': isActive(l.key) }" :aria-current="isActive(l.key) ? 'page' : undefined">
              {{ t.nav[l.key] }}
            </RouterLink>
          </li>
        </ul>
        <div class="nav__mobile-cta">
          <RouterLink :to="to('/contact')" class="btn btn--lime">
            <AppIcon name="calendar" :size="18" /> {{ t.nav.cta }}
          </RouterLink>
        </div>
      </nav>

      <div class="header__actions">
        <a :href="switchPath" class="lang" :hreflang="otherLocale" :lang="otherLocale" :aria-label="t.nav.switchTo">
          <span>{{ t.nav.switchShort }}</span>
          <AppIcon name="globe" :size="18" />
        </a>
        <RouterLink :to="to('/contact')" class="btn btn--lime header__cta">
          <AppIcon name="calendar" :size="18" /> {{ t.nav.cta }}
        </RouterLink>
        <button
          type="button"
          class="burger"
          :aria-expanded="open"
          aria-controls="main-nav"
          :aria-label="open ? t.nav.close : t.nav.menu"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" :size="24" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky; top: 0; z-index: 50;
  background: rgb(255 255 255 / 0.96);
  backdrop-filter: saturate(1.4) blur(8px);
  border-bottom: 1px solid var(--line);
}
.header__bar { height: var(--header-h); display: flex; align-items: center; gap: 20px; }
.header__logo img { height: 46px; width: auto; }
.nav { margin-inline-start: auto; }
.nav__list { display: flex; align-items: center; gap: clamp(12px, 1.8vw, 28px); }
.nav__link {
  position: relative; display: block; padding-block: 8px;
  font-size: var(--fs-sm); font-weight: 500; color: var(--ink);
  transition: color 0.2s;
}
.nav__link::after {
  content: ''; position: absolute; inset-inline: 0; bottom: 0; height: 3px; border-radius: 3px;
  background: var(--lime-600); transform: scaleX(0); transition: transform 0.25s var(--ease);
}
.nav__link:hover { color: var(--blue-700); }
.nav__link.is-active { color: var(--blue-700); font-weight: 600; }
.nav__link.is-active::after, .nav__link:hover::after { transform: scaleX(1); }
.nav__mobile-cta { display: none; }

.header__actions { display: flex; align-items: center; gap: 14px; }
.lang {
  display: inline-flex; align-items: center; gap: 6px; padding: 6px 4px;
  font-size: var(--fs-sm); font-weight: 600; color: var(--ink);
}
.lang:hover { color: var(--blue-700); }
.burger {
  display: none; place-items: center; width: 44px; height: 44px;
  border: 1px solid var(--line); border-radius: 12px; background: var(--white); color: var(--ink); cursor: pointer;
}

@media (max-width: 1100px) {
  .header__cta { display: none; }
}

@media (max-width: 920px) {
  .burger { display: grid; }
  .header__actions { margin-inline-start: auto; }
  .nav {
    position: fixed; inset: var(--header-h) 0 0 0; margin: 0;
    background: var(--white); padding: 20px var(--gutter) 32px;
    overflow-y: auto;
    opacity: 0; visibility: hidden; transform: translateY(-8px);
    transition: opacity 0.2s, transform 0.2s var(--ease), visibility 0.2s;
  }
  .nav--open { opacity: 1; visibility: visible; transform: none; }
  .nav__list { flex-direction: column; align-items: stretch; gap: 0; }
  .nav__link { padding: 14px 4px; font-size: var(--fs-md); border-bottom: 1px solid var(--line); }
  .nav__link::after { display: none; }
  .nav__mobile-cta { display: block; margin-top: 24px; }
  .nav__mobile-cta .btn { width: 100%; }
}
</style>
