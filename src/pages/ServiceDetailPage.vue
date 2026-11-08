<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useSeo, breadcrumb } from '@/composables/useSeo'
import { services, cases, serviceCases } from '@/content/shared'
import { SITE_URL, site } from '@/config/site'
import PageHero from '@/components/PageHero.vue'
import SectionHead from '@/components/SectionHead.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import WorkCard from '@/components/WorkCard.vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({ id: { type: String, required: true } })
const { t, to } = useLocale()

const base = computed(() => t.value.services.items[props.id])
const detail = computed(() => t.value.serviceDetails.items[props.id])
const labels = computed(() => t.value.serviceDetails.labels)
const icon = computed(() => services.find((s) => s.id === props.id).icon)
const related = computed(() => serviceCases[props.id].map((id) => cases.find((c) => c.id === id)))
const others = computed(() => services.filter((s) => s.id !== props.id))

useSeo(({ url, canonical }) => ({
  title: `${base.value.name} | Point Marketing Agency`,
  description: detail.value.intro.slice(0, 158),
  jsonLd: [
    breadcrumb([
      [t.value.nav.home, url(to('/'))],
      [t.value.nav.services, url(to('/services'))],
      [base.value.name, url(to(`/services/${props.id}`))],
    ]),
    {
      '@type': 'Service',
      name: base.value.name,
      serviceType: base.value.title,
      description: detail.value.intro,
      url: canonical.value,
      provider: { '@id': `${SITE_URL}/#organization`, name: site.name },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: base.value.name,
        itemListElement: base.value.points.map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: p } })),
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: detail.value.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}))
</script>

<template>
  <PageHero
    :eyebrow="base.title"
    :title="base.name"
    :text="base.text"
    :crumbs="[{ label: t.nav.services, to: to('/services') }, { label: base.name }]"
  />

  <section class="section">
    <div class="container overview">
      <div class="overview__intro">
        <span class="overview__icon"><AppIcon :name="icon" :size="32" /></span>
        <p class="lead">{{ detail.intro }}</p>
        <RouterLink :to="to('/contact')" class="btn btn--lime">
          {{ t.common.freeConsult }} <AppIcon name="arrow" :size="18" flip />
        </RouterLink>
      </div>
      <div class="card overview__box">
        <h2>{{ labels.included }}</h2>
        <ul class="checks">
          <li v-for="p in base.points" :key="p"><AppIcon name="check" :size="18" /> {{ p }}</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="steps-title">
    <div class="container">
      <SectionHead id="steps-title" :title="labels.steps" />
      <ol class="steps">
        <li v-for="(s, i) in detail.steps" :key="s.title" class="card step">
          <span class="step__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="container two">
      <div>
        <SectionHead :title="labels.audience" />
        <ul class="audience">
          <li v-for="a in detail.audience" :key="a"><AppIcon name="users" :size="18" /> {{ a }}</li>
        </ul>
      </div>
      <div>
        <SectionHead :title="labels.faq" />
        <div class="faq">
          <details v-for="(f, i) in detail.faqs" :key="f.q" class="card" :open="i === 0">
            <summary>{{ f.q }}</summary>
            <p>{{ f.a }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tint" aria-labelledby="related-title">
    <div class="container">
      <SectionHead id="related-title" :title="labels.related">
        <RouterLink :to="to('/work')" class="btn btn--outline btn--sm">{{ t.common.allWork }} <AppIcon name="arrow" :size="16" flip /></RouterLink>
      </SectionHead>
      <ul class="related">
        <li v-for="c in related" :key="c.id">
          <WorkCard :image="c.cover" :tag="t.work.cases[c.id].tag" :title="t.work.cases[c.id].title" :link="to(`/work#${c.id}`)" :link-text="t.common.viewDetails" />
        </li>
      </ul>
    </div>
  </section>

  <section class="section" aria-labelledby="other-title">
    <div class="container">
      <SectionHead id="other-title" :title="labels.other" />
      <ul class="others">
        <li v-for="(s, i) in others" :key="s.id">
          <ServiceCard
            :index="services.indexOf(s) + 1"
            :icon="s.icon"
            :title="t.services.items[s.id].title"
            :text="t.services.items[s.id].text"
            :link="to(`/services/${s.id}`)"
            :link-text="t.common.learnService"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.overview { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(24px, 4vw, 56px); align-items: start; }
.overview__intro { display: grid; gap: 18px; justify-items: start; }
.overview__intro .lead { color: var(--text); font-size: var(--fs-md); max-width: none; }
.overview__icon { display: grid; place-items: center; width: 64px; height: 64px; border-radius: 18px; background: var(--blue-50); color: var(--blue-700); }
.overview__box { padding: clamp(20px, 3vw, 30px); display: grid; gap: 14px; }
.overview__box h2 { font-size: var(--fs-lg); }
.checks, .audience { display: grid; gap: 10px; }
.checks li, .audience li {
  display: flex; gap: 10px; align-items: flex-start; font-size: var(--fs-sm); color: var(--ink);
  padding: 10px 14px; background: var(--blue-50); border-radius: var(--radius-sm);
}
.checks svg, .audience svg { color: var(--blue-700); flex: none; margin-top: 3px; }
.steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.step { padding: 22px; display: grid; gap: 6px; align-content: start; }
.step__num { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--lime); color: var(--ink); font-weight: 700; font-size: var(--fs-sm); }
.step h3 { font-size: var(--fs-base); margin-top: 6px; }
.step p { font-size: var(--fs-sm); color: var(--muted); }
.two { display: grid; grid-template-columns: 1fr 1.2fr; gap: clamp(24px, 4vw, 56px); align-items: start; }
.faq { display: grid; gap: 10px; }
.faq details { padding: 14px 18px; }
.faq summary { cursor: pointer; font-weight: 600; color: var(--ink); font-size: var(--fs-sm); list-style-position: inside; }
.faq details p { margin-top: 8px; font-size: var(--fs-sm); color: var(--muted); }
.related { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); gap: 16px; max-width: 760px; }
.others { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 980px) {
  .overview, .two { grid-template-columns: 1fr; }
  .steps { grid-template-columns: repeat(2, 1fr); }
  .others { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .steps, .others { grid-template-columns: 1fr; }
}
</style>
