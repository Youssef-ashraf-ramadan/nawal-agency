<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useSeo, breadcrumb } from '@/composables/useSeo'
import { cases, gallery, galleryFilters, caseWebsites, mediaReels } from '@/content/shared'
import PageHero from '@/components/PageHero.vue'
import SectionHead from '@/components/SectionHead.vue'
import AppIcon from '@/components/AppIcon.vue'
import ReelPlayer from '@/components/ReelPlayer.vue'

const { t, to } = useLocale()
useSeo(({ url }) => ({
  ...t.value.meta.work,
  jsonLd: [breadcrumb([[t.value.nav.home, url(to('/'))], [t.value.nav.work, url(to('/work'))]])],
}))

const filter = ref('all')
const shown = computed(() => (filter.value === 'all' ? gallery : gallery.filter((g) => g.cat === filter.value)))

// Gallery lightbox
const current = ref(-1)
const active = computed(() => shown.value[current.value])
const open = (i) => (current.value = i)
const close = () => (current.value = -1)
const step = (d) => (current.value = (current.value + d + shown.value.length) % shown.value.length)
const onKey = (e) => {
  if (current.value < 0) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(document.dir === 'rtl' ? -1 : 1)
  else if (e.key === 'ArrowLeft') step(document.dir === 'rtl' ? 1 : -1)
}
watch(current, (v) => {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = v >= 0 ? 'hidden' : ''
  document[v >= 0 ? 'addEventListener' : 'removeEventListener']('keydown', onKey)
})
watch(filter, close)
onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = ''
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <PageHero :eyebrow="t.work.eyebrow" :title="t.work.pageTitle" :text="t.work.pageText" :crumbs="[{ label: t.nav.work }]" />

  <section class="section">
    <div class="container cases">
      <article v-for="c in cases" :id="c.id" :key="c.id" class="case card">
        <div class="case__media">
          <img :src="c.cover" :width="c.id === 'egypta' ? 800 : 600" :height="600" :alt="t.work.cases[c.id].title" loading="lazy" decoding="async" />
          <ul v-if="c.gallery.length" class="case__thumbs" :class="{ 'case__thumbs--4': c.gallery.length > 3 }">
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
          <div v-if="c.links" class="case__links">
            <a v-for="l in c.links" :key="l.id" :href="l.url" target="_blank" rel="noopener" class="case__link">
              <span class="icon-badge"><AppIcon :name="l.icon" /></span>
              <span>{{ t.work.caseLinks[l.id] }}</span>
              <AppIcon name="external" :size="16" class="case__link-ext" />
            </a>
          </div>
          <a v-if="caseWebsites[c.id]" :href="caseWebsites[c.id]" target="_blank" rel="noopener" class="btn btn--blue btn--sm case__visit">
            {{ t.work.labels.visit }} <AppIcon name="arrow" :size="16" flip />
          </a>
        </div>

        <div v-if="c.sites" class="case__extra">
          <h3>{{ t.work.labels.websites }}</h3>
          <ul class="sites">
            <li v-for="s in c.sites" :key="s.id" class="site">
              <a :href="s.url" target="_blank" rel="noopener">
                <span class="site__frame">
                  <span class="site__bar" aria-hidden="true"><i /><i /><i /></span>
                  <img :src="s.image" width="480" height="360" :alt="t.work.cases[c.id].sites[s.id]" loading="lazy" decoding="async" />
                </span>
                <span class="site__info">
                  <strong>{{ t.work.cases[c.id].sites[s.id] }}</strong>
                  <small dir="ltr">{{ s.url.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</small>
                </span>
                <span class="site__cta">{{ t.work.labels.visit }} <AppIcon name="arrow" :size="14" flip /></span>
              </a>
            </li>
          </ul>
        </div>

        <div v-if="c.reels" class="case__extra">
          <h3>{{ t.work.labels.reels }}</h3>
          <ul class="reels reels--wide">
            <li v-for="(r, i) in c.reels" :key="r.id">
              <ReelPlayer :id="r.id" :poster="r.poster" wide :label="`${t.work.labels.reel} ${i + 1}`" :play-label="t.work.labels.play" />
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>

  <section id="media-production" class="section media" aria-labelledby="media-title">
    <div class="container">
      <SectionHead id="media-title" :eyebrow="t.work.media.eyebrow" :title="t.work.media.title" :text="t.work.media.text" />
      <ul class="reels">
        <li v-for="(r, i) in mediaReels" :key="r.id">
          <ReelPlayer :id="r.id" :poster="r.poster" :wide="r.wide" :label="`${t.work.labels.reel} ${i + 1}`" :play-label="t.work.labels.play" />
        </li>
      </ul>
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
      <TransitionGroup tag="ul" name="grid" class="gallery">
        <li v-for="(g, i) in shown" :key="g.name">
          <button type="button" class="gallery__btn" :aria-label="`${t.work.filters[g.cat]} — Point`" @click="open(i)">
            <img :src="g.src" width="600" height="600" :alt="`${t.work.filters[g.cat]} — Point`" loading="lazy" decoding="async" />
          </button>
        </li>
      </TransitionGroup>
    </div>
  </section>

  <Teleport to="body">
    <Transition name="lb">
      <div v-if="active" class="lightbox" role="dialog" aria-modal="true" :aria-label="t.work.galleryTitle" @click.self="close">
        <button type="button" class="lightbox__btn lightbox__close" :aria-label="t.nav.close" @click="close"><AppIcon name="close" :size="22" /></button>
        <button type="button" class="lightbox__btn lightbox__prev" aria-label="‹" @click="step(-1)"><AppIcon name="chevron" :size="24" class="flip-rtl lightbox__chev-prev" /></button>
        <img :key="active.src" :src="active.src" width="600" height="600" :alt="`${t.work.filters[active.cat]} — Point`" />
        <button type="button" class="lightbox__btn lightbox__next" aria-label="›" @click="step(1)"><AppIcon name="chevron" :size="24" class="flip-rtl" /></button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cases { display: grid; gap: 22px; }
.case { display: grid; grid-template-columns: 1fr 1.15fr; gap: clamp(20px, 3vw, 40px); padding: clamp(16px, 2.4vw, 28px); scroll-margin-top: calc(var(--header-h) + 16px); }
.case:nth-child(even) .case__media { order: 2; }
.case__media { display: grid; gap: 10px; align-content: start; }
.case__media > img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--radius); background: var(--blue-50); }
.case__thumbs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.case__thumbs--4 { grid-template-columns: repeat(4, 1fr); gap: 8px; }
.case__thumbs li { overflow: hidden; border-radius: var(--radius-sm); }
.case__thumbs img { aspect-ratio: 1; object-fit: cover; width: 100%; transition: transform 0.5s var(--ease); }
.case__thumbs img:hover { transform: scale(1.08); }
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

.case__links { display: grid; gap: 10px; margin-top: 14px; }
.case__link {
  display: flex; align-items: center; gap: 12px; padding: 10px 14px; border: 1px solid var(--line); border-radius: var(--radius);
  font-size: var(--fs-sm); font-weight: 600; color: var(--ink); background: var(--white);
  transition: border-color 0.2s, transform 0.25s var(--ease), box-shadow 0.25s;
}
.case__link:hover { border-color: var(--blue-700); transform: translateY(-2px); box-shadow: var(--shadow-sm); }
.case__link-ext { margin-inline-start: auto; color: var(--blue-700); flex: none; }

.case__extra { order: 3; grid-column: 1 / -1; display: grid; gap: 12px; padding-top: 18px; border-top: 1px solid var(--line); }
.case__extra h3 { margin: 0; }

.sites { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.site a { display: grid; gap: 10px; height: 100%; padding: 10px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--white); transition: border-color 0.2s, transform 0.25s var(--ease), box-shadow 0.25s; }
.site a:hover { border-color: var(--blue-700); transform: translateY(-4px); box-shadow: var(--shadow); }
.site__frame { display: block; overflow: hidden; border-radius: var(--radius-sm); border: 1px solid var(--line); background: var(--blue-50); }
.site__bar { display: flex; gap: 5px; padding: 7px 9px; background: var(--blue-100); }
.site__bar i { width: 7px; height: 7px; border-radius: 50%; background: var(--white); }
.site__frame img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; object-position: top; transition: transform 0.6s var(--ease); }
.site a:hover .site__frame img { transform: scale(1.04); }
.site__info strong { display: block; font-size: var(--fs-sm); color: var(--ink); }
.site__info small { display: block; font-size: var(--fs-xs); color: var(--muted); text-align: start; }
.site__cta { display: inline-flex; align-items: center; gap: 6px; font-size: var(--fs-xs); font-weight: 600; color: var(--blue-700); }

.reels { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.reels--wide { grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); }
.media { background: linear-gradient(180deg, var(--white), var(--blue-50)); }

.filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
.filter { min-height: 38px; padding: 0 16px; border-radius: 999px; border: 1px solid var(--line); background: var(--white); color: var(--ink); font-size: var(--fs-xs); font-weight: 500; cursor: pointer; transition: background-color 0.2s, color 0.2s; }
.filter:hover { border-color: var(--blue-700); }
.filter.is-active { background: var(--blue-700); border-color: var(--blue-700); color: var(--white); }
.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); gap: 12px; }
.gallery__btn { display: block; width: 100%; padding: 0; border: 0; border-radius: var(--radius); overflow: hidden; cursor: zoom-in; background: var(--white); box-shadow: var(--shadow-sm); }
.gallery img { width: 100%; aspect-ratio: 1; object-fit: cover; transition: transform 0.5s var(--ease), filter 0.3s; }
.gallery__btn:hover img { transform: scale(1.06); filter: saturate(1.1); }
.grid-enter-active, .grid-leave-active { transition: opacity 0.3s, transform 0.3s var(--ease); }
.grid-enter-from, .grid-leave-to { opacity: 0; transform: scale(0.92); }
.grid-leave-active { position: absolute; visibility: hidden; }
.grid-move { transition: transform 0.4s var(--ease); }

.lightbox {
  position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 56px 64px;
  background: rgb(7 13 74 / 0.88); backdrop-filter: blur(6px);
}
.lightbox img { max-width: min(92vw, 720px); max-height: 82vh; width: auto; height: auto; border-radius: var(--radius); box-shadow: 0 30px 80px rgb(0 0 0 / 0.45); }
.lightbox__btn { position: absolute; display: grid; place-items: center; width: 46px; height: 46px; border-radius: 50%; border: 0; background: var(--white); color: var(--ink); cursor: pointer; transition: background-color 0.2s; }
.lightbox__btn:hover { background: var(--lime); }
.lightbox__close { top: 16px; inset-inline-end: 16px; }
.lightbox__prev { inset-inline-start: 12px; top: 50%; translate: 0 -50%; }
.lightbox__next { inset-inline-end: 12px; top: 50%; translate: 0 -50%; }
.lightbox__chev-prev { rotate: 180deg; }
.lb-enter-active, .lb-leave-active { transition: opacity 0.25s; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

@media (max-width: 960px) {
  .reels { grid-template-columns: repeat(2, 1fr); }
  .sites { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 860px) {
  .case { grid-template-columns: 1fr; }
  .case:nth-child(even) .case__media { order: 0; }
}
@media (max-width: 560px) {
  .sites { grid-template-columns: 1fr; }
  .lightbox { padding: 64px 12px; }
  .lightbox__prev, .lightbox__next { top: auto; bottom: 14px; translate: none; }
}
@media (max-width: 420px) {
  .gallery { grid-template-columns: repeat(2, 1fr); }
}
</style>
