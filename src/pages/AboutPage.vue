<script setup>
import { useLocale } from '@/composables/useLocale'
import { useSeo, breadcrumb } from '@/composables/useSeo'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero.vue'
import SectionHead from '@/components/SectionHead.vue'
import ProcessSection from '@/sections/ProcessSection.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
useSeo(({ url }) => ({
  ...t.value.meta.about,
  jsonLd: [breadcrumb([[t.value.nav.home, url(to('/'))], [t.value.nav.about, url(to('/about'))]])],
}))
const whyIcons = ['target', 'star', 'bulb']
const howIcons = ['users', 'layout', 'globe', 'chart']
</script>

<template>
  <PageHero :eyebrow="t.about.eyebrow" :title="t.about.title" :crumbs="[{ label: t.nav.about }]" />

  <section class="section">
    <div class="container intro">
      <div class="intro__text">
        <p class="lead">{{ t.about.text }}</p>
        <p class="lead">{{ t.about.text2 }}</p>
      </div>
      <div class="vision">
        <img :src="site.logo.white" :width="site.logo.width" :height="site.logo.height" alt="" loading="lazy" />
        <h2>{{ t.about.visionTitle }}</h2>
        <p>{{ t.about.vision }}</p>
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="why-title">
    <div class="container">
      <SectionHead id="why-title" :title="t.about.whyTitle" />
      <ul class="tiles tiles--3">
        <li v-for="(w, i) in t.about.why" :key="w.title" class="card tile">
          <span class="icon-badge"><AppIcon :name="whyIcons[i]" /></span>
          <h3>{{ w.title }}</h3>
          <p>{{ w.text }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section" aria-labelledby="how-title">
    <div class="container">
      <SectionHead id="how-title" :title="t.about.howTitle" />
      <ul class="tiles tiles--4">
        <li v-for="(h, i) in t.about.how" :key="h.title" class="card tile">
          <span class="icon-badge"><AppIcon :name="howIcons[i]" /></span>
          <h3>{{ h.title }}</h3>
          <p>{{ h.text }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="ind-title">
    <div class="container">
      <SectionHead id="ind-title" :title="t.about.industriesTitle" />
      <ul class="tiles tiles--auto">
        <li v-for="(ind, i) in t.about.industries" :key="ind.title" class="card tile">
          <span class="tile__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ ind.title }}</h3>
          <p>{{ ind.text }}</p>
        </li>
      </ul>
    </div>
  </section>

  <ProcessSection :show-link="false" />
</template>

<style scoped>
.intro { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(24px, 4vw, 56px); align-items: center; }
.intro__text { display: grid; gap: 16px; }
.intro__text .lead { color: var(--text); font-size: var(--fs-md); max-width: none; }
.vision {
  position: relative; overflow: hidden; display: grid; gap: 10px; padding: clamp(24px, 3vw, 36px);
  border-radius: var(--radius-lg); color: rgb(255 255 255 / 0.85);
  background: linear-gradient(150deg, var(--blue-700), var(--blue-900));
}
.vision::after { content: ''; position: absolute; width: 120px; height: 120px; border-radius: 50%; background: var(--lime); inset-inline-end: -40px; bottom: -40px; }
.vision img { height: 52px; width: auto; }
.vision h2 { color: var(--lime); font-size: var(--fs-lg); }
.vision p { position: relative; z-index: 1; font-size: var(--fs-sm); }
.tiles { display: grid; gap: 16px; }
.tiles--3 { grid-template-columns: repeat(3, 1fr); }
.tiles--4 { grid-template-columns: repeat(4, 1fr); }
.tiles--auto { grid-template-columns: repeat(auto-fit, minmax(min(100%, 210px), 1fr)); }
.tile { padding: 22px; display: grid; gap: 8px; align-content: start; }
.tile h3 { font-size: var(--fs-base); }
.tile p { font-size: var(--fs-sm); color: var(--muted); }
.tile__num { font-weight: 700; color: var(--blue-700); font-size: var(--fs-sm); }
@media (max-width: 980px) {
  .intro { grid-template-columns: 1fr; }
  .tiles--4 { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .tiles--3, .tiles--4 { grid-template-columns: 1fr; }
}
</style>
