<script setup>
import { useLocale } from '@/composables/useLocale'
import { services } from '@/content/shared'
import SectionHead from '@/components/SectionHead.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
</script>

<template>
  <section class="section services" aria-labelledby="services-title">
    <span class="services__dot" aria-hidden="true" />
    <div class="container">
      <SectionHead id="services-title" :eyebrow="t.services.eyebrow" :title="t.services.title" :text="t.services.text">
        <RouterLink :to="to('/services')" class="btn btn--outline btn--sm">
          {{ t.common.allServices }} <AppIcon name="arrow" :size="16" flip />
        </RouterLink>
      </SectionHead>
      <ul class="services__grid">
        <li v-for="(s, i) in services" :key="s.id">
          <ServiceCard
            :index="i + 1"
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
.services { position: relative; overflow: hidden; }
.services__dot { position: absolute; width: 22px; height: 22px; border-radius: 50%; background: var(--lime); inset-inline-end: 6%; top: 18%; }
.services__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
@media (max-width: 1024px) { .services__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .services__grid { grid-template-columns: 1fr; } }
</style>
