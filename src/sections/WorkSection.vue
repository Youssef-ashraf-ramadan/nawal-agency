<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { cases, featuredCases, featuredCasesLink } from '@/content/shared'
import WorkCard from '@/components/WorkCard.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
const items = computed(() => featuredCases.map((id) => cases.find((c) => c.id === id)))
</script>

<template>
  <section class="section work" aria-labelledby="work-title">
    <div class="work__grid">
      <div class="work__panel">
        <div class="work__panel-inner">
          <p class="eyebrow">{{ t.work.eyebrow }}</p>
          <h2 id="work-title">{{ t.work.title }}</h2>
          <p>{{ t.work.text }}</p>
          <RouterLink :to="to('/work')" class="btn btn--lime">
            {{ t.common.allWork }} <AppIcon name="arrow" :size="18" flip />
          </RouterLink>
        </div>
      </div>
      <ul class="work__cards">
        <li v-for="c in items" :key="c.id">
          <WorkCard
            :image="c.cover"
            :tag="t.work.cases[c.id].tag"
            :title="t.work.cases[c.id].title"
            :link="featuredCasesLink || to(`/work#${c.id}`)"
            :link-text="t.common.viewDetails"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.work { padding-block: clamp(32px, 5vw, 56px); background: linear-gradient(to bottom, var(--white) 0 50%, var(--blue-50) 50%); }
.work__grid {
  width: min(100% - 2 * var(--gutter), 1320px); margin-inline: auto;
  display: grid; grid-template-columns: 2.2fr 1fr; gap: 20px; align-items: stretch;
}
.work__panel {
  order: 2; position: relative; overflow: hidden;
  background: linear-gradient(150deg, var(--blue-700), var(--blue-900));
  border-radius: var(--radius-lg); color: rgb(255 255 255 / 0.82); display: flex; align-items: center;
}
.work__panel::before {
  content: ''; position: absolute; width: 150px; height: 150px; border-radius: 50%;
  inset-inline-start: -50px; bottom: -50px; background: var(--lime); opacity: 0.9;
}
.work__panel-inner { position: relative; padding: clamp(24px, 3vw, 40px); display: grid; gap: 10px; justify-items: start; }
.work__panel .eyebrow { color: var(--lime); }
.work__panel h2 { color: var(--white); }
.work__panel p:not(.eyebrow) { font-size: var(--fs-sm); margin-bottom: 8px; }
.work__cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; padding: 14px; background: var(--white); border: 1px solid var(--line); border-radius: var(--radius-lg); }

@media (max-width: 1100px) {
  .work__grid { grid-template-columns: 1fr; }
  .work__panel { order: 0; }
  .work__cards { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .work__cards { grid-template-columns: 1fr; padding: 10px; }
}
</style>
