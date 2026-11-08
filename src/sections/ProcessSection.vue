<script setup>
import { useLocale } from '@/composables/useLocale'
import { processIcons } from '@/content/shared'
import AppIcon from '@/components/AppIcon.vue'

defineProps({ showLink: { type: Boolean, default: true } })
const { t, to } = useLocale()
</script>

<template>
  <section class="section process" aria-labelledby="process-title">
    <div class="container process__grid">
      <div class="process__intro">
        <p class="eyebrow">{{ t.process.eyebrow }}</p>
        <h2 id="process-title">{{ t.process.title }}</h2>
        <p class="lead">{{ t.process.text }}</p>
        <RouterLink v-if="showLink" :to="to('/about')" class="link-arrow">
          {{ t.common.methodology }} <AppIcon name="arrow" :size="16" flip />
        </RouterLink>
      </div>
      <ol class="steps">
        <li v-for="(s, i) in t.process.steps" :key="s.title" class="step">
          <span class="step__icon"><AppIcon :name="processIcons[i]" :size="24" /></span>
          <span class="step__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process__grid { display: grid; grid-template-columns: 1fr 2.4fr; gap: clamp(24px, 4vw, 56px); align-items: center; }
.process__intro { display: grid; gap: 8px; justify-items: start; }
.process__intro .lead { margin-bottom: 8px; }
.steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.step { position: relative; text-align: center; display: grid; justify-items: center; gap: 4px; }
.step:not(:last-child)::after {
  content: ''; position: absolute; top: 26px; inset-inline-start: calc(50% + 38px); width: calc(100% - 64px);
  border-top: 2px dashed var(--blue-100);
}
.step__icon {
  display: grid; place-items: center; width: 54px; height: 54px; border-radius: 16px;
  background: var(--white); color: var(--blue-700); border: 1px solid var(--line); box-shadow: var(--shadow-sm);
  margin-bottom: 8px;
}
.step__num { font-size: var(--fs-xs); font-weight: 700; color: var(--blue-800); }
.step h3 { font-size: var(--fs-md); }
.step p { font-size: var(--fs-xs); color: var(--muted); line-height: 1.6; }

@media (max-width: 1024px) {
  .process__grid { grid-template-columns: 1fr; }
}
@media (max-width: 680px) {
  .steps { grid-template-columns: repeat(2, 1fr); row-gap: 28px; }
  .step:not(:last-child)::after { display: none; }
  .step:last-child { grid-column: 1 / -1; }
}
</style>
