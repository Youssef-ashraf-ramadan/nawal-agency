<script setup>
import AppIcon from './AppIcon.vue'
defineProps({
  index: Number,
  icon: String,
  title: String,
  text: String,
  link: String,
  linkText: String,
})
</script>

<template>
  <article class="svc card">
    <span class="svc__num">{{ String(index).padStart(2, '0') }}</span>
    <span class="svc__icon"><AppIcon :name="icon" :size="30" /></span>
    <h3 lang="en" dir="auto">{{ title }}</h3>
    <p>{{ text }}</p>
    <RouterLink v-if="link" :to="link" class="link-arrow">
      {{ linkText }} <span class="sr-only">— {{ title }}</span><AppIcon name="arrow" :size="16" flip />
    </RouterLink>
  </article>
</template>

<style scoped>
.svc {
  position: relative; display: flex; flex-direction: column; gap: 10px;
  padding: 24px 22px 22px; height: 100%;
  transition: transform 0.25s var(--ease), box-shadow 0.25s, border-color 0.25s;
}
.svc:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--blue-100); }
.svc__num { font-size: var(--fs-xs); color: var(--muted); }
.svc__icon {
  display: grid; place-items: center; width: 56px; height: 56px; margin: 4px auto 6px;
  color: var(--blue-700); background: var(--blue-50); border-radius: 16px;
}
.svc h3 { font-size: var(--fs-base); text-align: center; }
.svc p { font-size: var(--fs-sm); color: var(--muted); line-height: 1.8; flex: 1; }
.svc .link-arrow { margin-top: 6px; }
</style>
