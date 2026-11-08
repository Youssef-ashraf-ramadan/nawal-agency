<script setup>
import { useLocale } from '@/composables/useLocale'
import { site } from '@/config/site'
import AppIcon from './AppIcon.vue'
import SocialLinks from './SocialLinks.vue'

const { t, to } = useLocale()
</script>

<template>
  <section class="cta" aria-labelledby="cta-title">
    <div class="container cta__inner">
      <img class="cta__logo" :src="site.logo.white" :width="site.logo.width" :height="site.logo.height" alt="" loading="lazy" decoding="async" />
      <div class="cta__text">
        <h2 id="cta-title">{{ t.cta.title }}</h2>
        <p>{{ t.cta.text }}</p>
        <RouterLink :to="to('/contact')" class="btn btn--lime">
          {{ t.cta.button }} <AppIcon name="arrow" :size="18" flip />
        </RouterLink>
      </div>
      <SocialLinks class="cta__social" />
    </div>
  </section>
</template>

<style scoped>
.cta { background: var(--blue-800); color: rgb(255 255 255 / 0.8); padding-block: 40px; }
.cta__inner { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 32px; }
.cta__logo { height: 64px; width: auto; }
.cta__text { text-align: center; display: grid; justify-items: center; gap: 10px; }
.cta__text h2 { color: var(--white); font-size: clamp(1.2rem, 1rem + 0.8vw, 1.5rem); }
.cta__text p { font-size: var(--fs-sm); }
.cta__text .btn { margin-top: 4px; }

@media (max-width: 820px) {
  .cta__inner { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 20px; }
}
</style>
