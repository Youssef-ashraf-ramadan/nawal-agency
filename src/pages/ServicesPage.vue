<script setup>
import { useLocale } from '@/composables/useLocale'
import { useSeo, breadcrumb } from '@/composables/useSeo'
import { services } from '@/content/shared'
import { SITE_URL, site } from '@/config/site'
import PageHero from '@/components/PageHero.vue'
import SectionHead from '@/components/SectionHead.vue'
import ProcessSection from '@/sections/ProcessSection.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
useSeo(({ url }) => ({
  ...t.value.meta.services,
  jsonLd: [
    breadcrumb([[t.value.nav.home, url(to('/'))], [t.value.nav.services, url(to('/services'))]]),
    ...services.map((s) => ({
      '@type': 'Service',
      name: t.value.services.items[s.id].name,
      description: t.value.services.items[s.id].text,
      serviceType: t.value.services.items[s.id].title,
      provider: { '@id': `${SITE_URL}/#organization`, name: site.name },
    })),
  ],
}))
</script>

<template>
  <PageHero :eyebrow="t.services.eyebrow" :title="t.services.title" :text="t.services.text" :crumbs="[{ label: t.nav.services }]" />

  <section class="section">
    <div class="container svc-list">
      <article v-for="(s, i) in services" :id="s.id" :key="s.id" class="svc-row card">
        <div class="svc-row__head">
          <span class="svc-row__icon"><AppIcon :name="s.icon" :size="30" /></span>
          <span class="svc-row__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h2>{{ t.services.items[s.id].name }}</h2>
          <p lang="en" class="svc-row__en">{{ t.services.items[s.id].title }}</p>
          <p class="lead">{{ t.services.items[s.id].text }}</p>
          <RouterLink :to="to(`/services/${s.id}`)" class="btn btn--blue btn--sm svc-row__more">
            {{ t.common.learnService }} <span class="sr-only">— {{ t.services.items[s.id].name }}</span><AppIcon name="arrow" :size="16" flip />
          </RouterLink>
        </div>
        <ul class="svc-row__points">
          <li v-for="p in t.services.items[s.id].points" :key="p"><AppIcon name="check" :size="18" /> {{ p }}</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="fw-title">
    <div class="container">
      <SectionHead id="fw-title" :eyebrow="t.process.framework.eyebrow" :title="t.process.framework.title" />
      <ol class="fw">
        <li v-for="(f, i) in t.process.framework.items" :key="f.title" class="fw__item card">
          <span class="fw__letter">{{ 'ABCDE'[i] }}</span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </li>
      </ol>
    </div>
  </section>

  <ProcessSection :show-link="false" />
</template>

<style scoped>
.svc-list { display: grid; gap: 18px; }
.svc-row { display: grid; grid-template-columns: 1.1fr 1fr; gap: 24px 48px; padding: clamp(20px, 3vw, 36px); align-items: center; scroll-margin-top: calc(var(--header-h) + 16px); }
.svc-row__head { display: grid; gap: 4px; justify-items: start; }
.svc-row__icon { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 16px; background: var(--blue-50); color: var(--blue-700); margin-bottom: 8px; }
.svc-row__num { font-size: var(--fs-xs); color: var(--muted); }
.svc-row__more { margin-top: 12px; }
.svc-row__en { font-size: var(--fs-sm); color: var(--blue-700); font-weight: 600; }
.svc-row__points { display: grid; gap: 10px; }
.svc-row__points li { display: flex; gap: 10px; align-items: flex-start; font-size: var(--fs-sm); color: var(--ink); padding: 10px 14px; background: var(--blue-50); border-radius: var(--radius-sm); }
.svc-row__points svg { color: var(--blue-700); flex: none; margin-top: 3px; }
.fw { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; }
.fw__item { padding: 22px; display: grid; gap: 8px; align-content: start; }
.fw__letter { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--lime); color: var(--ink); font-weight: 700; }
.fw__item h3 { font-size: var(--fs-base); }
.fw__item p { font-size: var(--fs-sm); color: var(--muted); }
@media (max-width: 820px) { .svc-row { grid-template-columns: 1fr; } }
</style>
