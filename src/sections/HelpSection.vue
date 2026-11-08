<script setup>
import { useLocale } from '@/composables/useLocale'
import { helpIcons } from '@/content/shared'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
</script>

<template>
  <section class="section section--tint help" aria-labelledby="help-title">
    <div class="container help__grid">
      <ol class="help__steps">
        <li v-for="(s, i) in t.help.steps" :key="s.title">
          <span class="help__icon"><AppIcon :name="helpIcons[i]" :size="22" /></span>
          <div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </div>
        </li>
      </ol>

      <div class="help__text">
        <p class="eyebrow">{{ t.help.eyebrow }}</p>
        <h2 id="help-title">{{ t.help.title }}</h2>
        <p class="lead">{{ t.help.text }}</p>
        <RouterLink :to="to('/contact')" class="btn btn--lime">
          {{ t.common.freeConsult }} <AppIcon name="arrow" :size="18" flip />
        </RouterLink>
      </div>

      <figure class="help__media">
        <span class="help__blob" aria-hidden="true" />
        <img src="/images/digital.webp" width="720" height="600" :alt="t.help.imgAlt" loading="lazy" decoding="async" />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.help__grid { display: grid; grid-template-columns: 0.8fr 1.1fr 1fr; gap: clamp(24px, 4vw, 48px); align-items: center; }
.help__steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 18px; }
.help__steps li { display: flex; align-items: center; gap: 14px; }
.help__icon {
  display: grid; place-items: center; flex: none; width: 48px; height: 48px; border-radius: 50%;
  background: var(--white); color: var(--blue-700); box-shadow: var(--shadow-sm);
}
.help__steps h3 { font-size: var(--fs-sm); }
.help__steps p { font-size: var(--fs-xs); color: var(--muted); line-height: 1.6; }
.help__text { display: grid; gap: 8px; justify-items: start; }
.help__text .lead { margin-block: 6px 14px; }
.help__media { position: relative; margin: 0; }
.help__media img { position: relative; width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow); aspect-ratio: 6 / 5; object-fit: cover; }
.help__blob { position: absolute; width: 90px; height: 90px; border-radius: 50%; background: var(--lime); inset-inline-end: -24px; top: -24px; }

@media (max-width: 980px) {
  .help__grid { grid-template-columns: 1fr 1fr; }
  .help__text { grid-column: 1 / -1; order: -1; }
}
@media (max-width: 640px) {
  .help__grid { grid-template-columns: 1fr; }
  .help__media { order: -1; }
  .help__text { order: -2; }
}
</style>
