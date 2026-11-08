<script setup>
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
useSeo(() => t.value.meta.notFound)
</script>

<template>
  <section class="nf section">
    <div class="container nf__inner">
      <p class="nf__code" aria-hidden="true">4<span>.</span>4</p>
      <h1>{{ t.notFound.title }}</h1>
      <p class="lead">{{ t.notFound.text }}</p>
      <RouterLink :to="to('/')" class="btn btn--lime">{{ t.notFound.back }} <AppIcon name="arrow" :size="18" flip /></RouterLink>
    </div>
  </section>
</template>

<style scoped>
.nf { min-height: 60vh; display: grid; place-items: center; text-align: center; }
.nf__inner { display: grid; justify-items: center; gap: 12px; }
.nf__code { font-size: clamp(4rem, 3rem + 6vw, 7rem); font-weight: 800; color: var(--blue-700); line-height: 1; }
.nf__code span { color: var(--lime-600); }
</style>
