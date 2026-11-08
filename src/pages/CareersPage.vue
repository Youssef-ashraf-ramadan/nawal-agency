<script setup>
import { useLocale } from '@/composables/useLocale'
import { useSeo, breadcrumb } from '@/composables/useSeo'
import { site } from '@/config/site'
import PageHero from '@/components/PageHero.vue'
import SectionHead from '@/components/SectionHead.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
useSeo(({ url }) => ({
  ...t.value.meta.careers,
  jsonLd: [breadcrumb([[t.value.nav.home, url(to('/'))], [t.value.nav.careers, url(to('/careers'))]])],
}))
const perkIcons = ['globe', 'briefcase', 'trend']
const mail = (role) => `mailto:${site.email}?subject=${encodeURIComponent(t.value.careers.mailSubject + role)}`
</script>

<template>
  <PageHero :eyebrow="t.careers.eyebrow" :title="t.careers.title" :text="t.careers.pageText" :crumbs="[{ label: t.nav.careers }]" />

  <section class="section">
    <div class="container">
      <SectionHead :title="t.careers.perksTitle" />
      <ul class="perks">
        <li v-for="(p, i) in t.careers.perks" :key="p.title" class="card perk">
          <span class="icon-badge"><AppIcon :name="perkIcons[i]" /></span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section section--tint">
    <div class="container">
      <SectionHead :title="t.careers.openTitle" :text="t.careers.applyNote" />
      <ul class="roles">
        <li v-for="r in t.careers.roles" :key="r.title" class="card role">
          <div>
            <h3>{{ r.title }}</h3>
            <p><AppIcon name="clock" :size="14" /> {{ r.type }}</p>
          </div>
          <a :href="mail(r.title)" class="btn btn--blue btn--sm">{{ t.careers.apply }} <span class="sr-only">— {{ r.title }}</span></a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.perks { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 16px; }
.perk { padding: 22px; display: grid; gap: 8px; align-content: start; }
.perk h3 { font-size: var(--fs-base); }
.perk p { font-size: var(--fs-sm); color: var(--muted); }
.roles { display: grid; gap: 12px; }
.role { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; flex-wrap: wrap; }
.role h3 { font-size: var(--fs-base); }
.role p { display: inline-flex; align-items: center; gap: 6px; font-size: var(--fs-xs); color: var(--muted); }
</style>
