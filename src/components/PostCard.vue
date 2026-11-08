<script setup>
import AppIcon from './AppIcon.vue'
defineProps({ icon: String, tag: String, title: String, date: String, dateIso: String, link: String, variant: { type: Number, default: 0 } })
</script>

<template>
  <article class="pc card">
    <RouterLink :to="link" class="pc__link">
      <div class="pc__cover" :class="`pc__cover--${variant % 3}`" aria-hidden="true">
        <AppIcon :name="icon" :size="40" />
      </div>
      <div class="pc__body">
        <span class="pc__tag" lang="en">{{ tag }}</span>
        <h3>{{ title }}</h3>
        <time :datetime="dateIso">{{ date }}</time>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.pc { overflow: hidden; height: 100%; transition: transform 0.25s var(--ease), box-shadow 0.25s; }
.pc:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.pc__link { display: flex; flex-direction: column; height: 100%; }
.pc__cover { display: grid; place-items: center; aspect-ratio: 16 / 9; color: var(--white); position: relative; overflow: hidden; }
.pc__cover::after { content: ''; position: absolute; width: 60%; aspect-ratio: 1; border-radius: 50%; border: 14px solid rgb(255 255 255 / 0.12); inset-inline-end: -18%; top: -30%; }
.pc__cover--0 { background: linear-gradient(135deg, var(--blue-600), var(--blue-900)); }
.pc__cover--1 { background: linear-gradient(135deg, #3b2bd1, #0b1466); }
.pc__cover--2 { background: linear-gradient(135deg, var(--blue-800), #06104a); color: var(--lime); }
.pc__body { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
.pc__tag { font-size: 0.6875rem; font-weight: 600; color: var(--blue-700); }
.pc h3 { font-size: var(--fs-sm); line-height: 1.6; }
.pc time { font-size: var(--fs-xs); color: var(--muted); margin-top: auto; }
</style>
