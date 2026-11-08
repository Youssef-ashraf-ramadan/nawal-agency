<script setup>
import { computed } from 'vue'
import { site, whatsappUrl } from '@/config/site'
import AppIcon from './AppIcon.vue'

const items = computed(() => [
  ...Object.entries(site.socials).filter(([, url]) => url).map(([name, url]) => ({ name, url, label: name })),
  { name: 'whatsapp', url: whatsappUrl(), label: 'WhatsApp' },
  { name: 'mail', url: `mailto:${site.email}`, label: 'Email' },
  { name: 'link', url: site.linktree, label: 'Linktree' },
])
</script>

<template>
  <ul class="socials">
    <li v-for="s in items" :key="s.name">
      <a :href="s.url" :aria-label="s.label" target="_blank" rel="noopener noreferrer">
        <AppIcon :name="s.name" :size="18" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
.socials { display: flex; gap: 10px; }
.socials a {
  display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%;
  background: rgb(255 255 255 / 0.1); color: var(--white);
  border: 1px solid rgb(255 255 255 / 0.25);
  transition: background-color 0.2s, color 0.2s;
}
.socials a:hover { background: var(--lime); color: var(--ink); }
</style>
