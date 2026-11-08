<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useSeo, breadcrumb } from '@/composables/useSeo'
import { cases, gallery, galleryFilters, caseWebsites } from '@/content/shared'
import PageHero from '@/components/PageHero.vue'
import SectionHead from '@/components/SectionHead.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
useSeo(({ url }) => ({
  ...t.value.meta.work,
  jsonLd: [breadcrumb([[t.value.nav.home, url(to('/'))], [t.value.nav.work, url(to('/work'))]])],
}))

const filter = ref('all')
const shown = computed(() => (filter.value === 'all' ? gallery : gallery.filter((g) => g.cat === filter.value)))
</script>

<template>
  <PageHero :eyebrow="t.work.eyebrow" :title="t.work.pageTitle" :text="t.work.pageText" :crumbs="[{ label: t.nav.work }]" />

  <section class="section">
    <div class="container cases">
      <article v-for="c in cases" :id="c.id" :key="c.id" class="case card">
        <div class="case__media">
          <img :src="c.cover" :width="c.id === 'egypta' ? 800 : 600" :height="600" :alt="t.work.cases[c.id].title" loading="lazy" decoding="async" />
          <ul v-if="c.gallery.length" class="case__thumbs">
            <li v-for="g in c.gallery" :key="g"><img :src="g" width="600" height="600" alt="" loading="lazy" decoding="async" /></li>
          </ul>
        </div>
        <div class="case__body">
          <div class="case__top">
            <span class="case__tag" lang="en">{{ t.work.cases[c.id].tag }}</span>
            <span class="case__client" lang="en">{{ t.work.cases[c.id].client }}</span>
          </div>
          <h2>{{ t.work.cases[c.id].title }}</h2>
          <p class="case__industry"><strong>{{ t.work.labels.industry }}:</strong> {{ t.work.cases[c.id].industry }}</p>
          <h3>{{ t.work.labels.challenge }}</h3>
          <p>{{ t.work.cases[c.id].challenge }}</p>
          <h3>{{ t.work.labels.solution }}</h3>
          <ul class="case__list">
            <li v-for="s in t.work.cases[c.id].solution" :key="s"><AppIcon name="check" :size="16" /> {{ s }}</li>
          </ul>
          <div class="case__result">
            <span class="case__metric" dir="ltr">{{ t.work.cases[c.id].metric }}</span>
            <div>
              <strong>{{ t.work.labels.result }}</strong>
              <p>{{ t.work.cases[c.id].result }}</p>
            </div>
          </div>
          <a v-if="caseWebsites[c.id]" :href="caseWebsites[c.id]" target="_blank" rel="noopener" class="btn btn--blue btn--sm case__visit">
            {{ t.work.labels.visit }} <AppIcon name="arrow" :size="16" flip />
          </a>
        </div>
      </article>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="gallery-title">
    <div class="container">
      <SectionHead id="gallery-title" :title="t.work.galleryTitle" :text="t.work.galleryText" />
      <div class="filters" role="group" :aria-label="t.work.galleryTitle">
        <button
          v-for="f in galleryFilters"
          :key="f"
          type="button"
          class="filter"
          :class="{ 'is-active': filter === f }"
          :aria-pressed="filter === f"
          @click="filter = f"
        >
          {{ t.work.filters[f] }}
        </button>
      </div>
      <ul class="gallery">
        <li v-for="g in shown" :key="g.name">
          <img :src="g.src" width="600" height="600" :alt="`${t.work.filters[g.cat]} — Point`" loading="lazy" decoding="async" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cases { display: grid; gap: 22px; }
.case { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(20px, 3vw, 40px); padding: clamp(16px, 2.4vw, 28px); scroll-margin-top: calc(var(--header-h) + 16px); }
.case:nth-child(even) .case__media { order: 2; }
.case__media { display: grid; gap: 10px; align-content: start; }
.case__media > img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--radius); background: var(--blue-50); }
.case__thumbs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.case__thumbs img { aspect-ratio: 1; object-fit: cover; border-radius: var(--radius-sm); width: 100%; }
.case__body { display: grid; gap: 6px; align-content: start; }
.case__top { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.case__tag { font-size: 0.6875rem; font-weight: 600; padding: 3px 10px; border-radius: 999px; background: var(--blue-50); color: var(--blue-700); }
.case__client { font-size: var(--fs-sm); font-weight: 600; color: var(--muted); }
.case h2 { font-size: clamp(1.1rem, 1rem + 0.5vw, 1.35rem); margin-bottom: 4px; }
.case h3 { font-size: var(--fs-sm); margin-top: 10px; color: var(--blue-800); }
.case p { font-size: var(--fs-sm); }
.case__industry { color: var(--muted); }
.case__visit { justify-self: start; margin-top: 10px; }
.case__list { display: grid; gap: 6px; }
.case__list li { display: flex; gap: 8px; font-size: var(--fs-sm); }
.case__list svg { color: var(--blue-700); flex: none; margin-top: 4px; }
.case__result { display: flex; gap: 16px; align-items: center; margin-top: 14px; padding: 14px 16px; border-radius: var(--radius); background: var(--blue-800); color: rgb(255 255 255 / 0.85); }
.case__result strong { color: var(--lime); font-size: var(--fs-sm); }
.case__metric { font-size: 1.5rem; font-weight: 800; color: var(--lime); flex: none; min-width: 72px; text-align: center; }

.filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
.filter { min-height: 38px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); background: var(--white); color: var(--ink); font-size: var(--fs-xs); font-weight: 500; cursor: pointer; transition: background-color 0.2s, color 0.2s; }
.filter:hover { border-color: var(--blue-700); }
.filter.is-active { background: var(--blue-700); border-color: var(--blue-700); color: var(--white); }
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); gap: 12px; }
.gallery img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: var(--radius); background: var(--white); box-shadow: var(--shadow-sm); }

@media (max-width: 860px) {
  .case { grid-template-columns: 1fr; }
  .case:nth-child(even) .case__media { order: 0; }
}
@media (max-width: 420px) {
  .gallery { grid-template-columns: repeat(2, 1fr); }
}
</style>
