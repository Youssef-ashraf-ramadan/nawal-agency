<script setup>
import { useLocale } from '@/composables/useLocale'
import { heroImages } from '@/content/shared'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <span class="hero__dash hero__dash--1" aria-hidden="true" />
    <span class="hero__dash hero__dash--2" aria-hidden="true" />
    <span class="hero__half" aria-hidden="true" />

    <div class="container hero__inner">
      <div class="hero__content">
        <p class="hero__eyebrow">{{ t.hero.eyebrow }}</p>
        <h1 id="hero-title">
          <span>{{ t.hero.title1 }}</span>
          <span class="hero__accent">{{ t.hero.title2 }}</span>
        </h1>
        <p class="hero__text">{{ t.hero.text }}</p>
        <div class="hero__actions">
          <RouterLink :to="to('/contact')" class="btn btn--lime">
            {{ t.hero.primary }} <AppIcon name="arrow" :size="18" flip />
          </RouterLink>
          <RouterLink :to="to('/services')" class="btn btn--ghost">{{ t.hero.secondary }}</RouterLink>
        </div>
      </div>

      <div class="hero__visual">
        <svg class="hero__plus" viewBox="0 0 200 200" aria-hidden="true">
          <path d="M84 8c10-6 26-4 31 8 4 10 2 34 8 44s34 6 48 10c14 4 22 18 16 30-6 13-24 13-40 15-14 2-26 4-28 18s6 40-2 52c-7 11-24 12-33 2-8-9-6-34-10-48-3-12-18-14-32-15-15-1-34-3-38-17-4-13 8-24 22-27 15-3 34 0 42-10s-1-28 4-44c2-7 7-13 12-18z" fill="currentColor" />
        </svg>
        <figure class="hero__card hero__card--main">
          <img :src="heroImages[0]" width="600" height="600" :alt="t.hero.imgAlt" fetchpriority="high" decoding="async" />
        </figure>
        <figure class="hero__card hero__card--top">
          <img :src="heroImages[1]" width="600" height="600" alt="" decoding="async" />
        </figure>
        <figure class="hero__card hero__card--bottom">
          <img :src="heroImages[2]" width="600" height="600" alt="" decoding="async" />
        </figure>
        <p class="hero__tagline" lang="en" dir="ltr">
          Find the<br />Point.<br />Move Forward.
          <svg viewBox="0 0 90 40" aria-hidden="true"><path d="M2 6c18 26 52 32 80 18M72 14l10 10-14 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative; overflow: hidden; isolation: isolate;
  background: radial-gradient(120% 90% at 85% 10%, var(--blue-600) 0%, var(--blue-700) 45%, var(--blue-800) 100%);
  color: rgb(255 255 255 / 0.86);
}
.hero__inner {
  display: grid; grid-template-columns: 1.05fr 1fr; align-items: center; gap: clamp(24px, 4vw, 56px);
  padding-block: clamp(40px, 6vw, 72px);
}
.hero__eyebrow { font-size: var(--fs-xs); letter-spacing: 0.14em; font-weight: 500; color: rgb(255 255 255 / 0.75); margin-bottom: 14px; }
.hero h1 { color: var(--white); display: grid; gap: 4px; line-height: 1.45; }
.hero__accent { color: var(--lime); }
.hero__text { margin-top: 16px; font-size: var(--fs-base); max-width: 54ch; }
.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }

.hero__visual { position: relative; aspect-ratio: 1 / 0.86; max-width: 520px; width: 100%; justify-self: center; }
.hero__plus { position: absolute; inset: 4% 8% 2% 12%; width: 80%; height: auto; color: var(--lime); z-index: -1; }
.hero__card {
  position: absolute; margin: 0; overflow: hidden; border-radius: var(--radius-lg);
  box-shadow: 0 24px 50px rgb(5 10 60 / 0.35); background: var(--white);
}
.hero__card img { width: 100%; height: 100%; object-fit: cover; }
.hero__card--main { width: 54%; aspect-ratio: 1; inset-inline-start: 23%; top: 12%; transform: rotate(-3deg); z-index: 2; }
.hero__card--top { width: 34%; aspect-ratio: 1; inset-inline-end: 2%; top: 0; transform: rotate(6deg); }
.hero__card--bottom { width: 34%; aspect-ratio: 1; inset-inline-end: 0; bottom: 0; transform: rotate(-6deg); z-index: 3; }
.hero__tagline {
  position: absolute; inset-inline-start: 0; bottom: 4%; z-index: 4;
  font-size: var(--fs-sm); font-style: italic; line-height: 1.35; color: var(--white); text-align: left;
  transform: rotate(-8deg);
}
.hero__tagline svg { width: 70px; color: var(--white); margin-top: 4px; }

.hero__dash { position: absolute; width: 70px; height: 12px; border-radius: 999px; background: var(--lime); z-index: -1; }
.hero__dash--1 { inset-inline-start: 2%; top: 46%; transform: rotate(-38deg); }
.hero__dash--2 { inset-inline-end: 48%; top: 10%; width: 46px; height: 9px; transform: rotate(50deg); opacity: 0.9; }
.hero__half { position: absolute; inset-inline-start: -70px; bottom: 14%; width: 120px; height: 120px; border-radius: 50%; background: var(--lime); z-index: -1; }

@media (max-width: 900px) {
  .hero__inner { grid-template-columns: 1fr; }
  .hero__visual { max-width: 420px; }
  .hero__dash--2 { display: none; }
}
@media (max-width: 480px) {
  .hero__actions .btn { flex: 1 1 100%; }
  .hero__tagline { font-size: var(--fs-xs); }
}
</style>
