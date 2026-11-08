<script setup>
import { useLocale } from '@/composables/useLocale'
import AppIcon from './AppIcon.vue'

defineProps({ eyebrow: String, title: String, text: String, crumbs: { type: Array, default: () => [] } })
const { t, to } = useLocale()
</script>

<template>
  <section class="page-hero">
    <div class="container">
      <nav aria-label="Breadcrumb" class="crumbs">
        <ol>
          <li><RouterLink :to="to('/')">{{ t.nav.home }}</RouterLink></li>
          <li v-for="c in crumbs" :key="c.label">
            <AppIcon name="chevron" :size="14" flip />
            <RouterLink v-if="c.to" :to="c.to">{{ c.label }}</RouterLink>
            <span v-else aria-current="page">{{ c.label }}</span>
          </li>
        </ol>
      </nav>
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p v-if="text">{{ text }}</p>
    </div>
  </section>
</template>

<style scoped>
.crumbs ol { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: var(--fs-xs); margin-bottom: 18px; color: rgb(255 255 255 / 0.7); }
.crumbs li { display: inline-flex; align-items: center; gap: 6px; }
.crumbs a:hover { color: var(--lime); }
.crumbs [aria-current] { color: var(--white); }
.page-hero .container { position: relative; z-index: 1; }
</style>
