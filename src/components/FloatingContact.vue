<script setup>
import { useLocale } from '@/composables/useLocale'
import { whatsappUrl } from '@/config/site'
import AppIcon from './AppIcon.vue'

const { t } = useLocale()
</script>

<template>
  <a class="fab" :href="whatsappUrl()" target="_blank" rel="noopener noreferrer" :aria-label="t.contact.whatsappFloat">
    <AppIcon name="whatsapp" :size="28" />
    <span class="fab__tip">{{ t.contact.whatsappFloat }}</span>
  </a>
</template>

<style scoped>
.fab {
  position: fixed; bottom: 20px; inset-inline-end: 20px; z-index: 60;
  display: grid; place-items: center; width: 58px; height: 58px; border-radius: 50%;
  background: #25d366; color: var(--white);
  box-shadow: 0 12px 28px rgb(14 21 80 / 0.28);
  animation: fab-in 0.6s var(--ease) both 1.2s, fab-ring 2.8s ease-out infinite 2s;
  transition: transform 0.25s var(--ease);
}
.fab:hover { transform: scale(1.08); }
.fab__tip {
  position: absolute; inset-inline-end: calc(100% + 12px); white-space: nowrap;
  padding: 8px 14px; border-radius: 999px; background: var(--ink); color: var(--white);
  font-size: var(--fs-xs); font-weight: 600; pointer-events: none;
  opacity: 0; translate: 6px 0; transition: opacity 0.2s, translate 0.2s var(--ease);
}
[dir='rtl'] .fab__tip { translate: -6px 0; }
.fab:hover .fab__tip, .fab:focus-visible .fab__tip { opacity: 1; translate: 0 0; }
@keyframes fab-in { from { opacity: 0; transform: scale(0.4); } }
@keyframes fab-ring {
  0% { box-shadow: 0 12px 28px rgb(14 21 80 / 0.28), 0 0 0 0 rgb(37 211 102 / 0.55); }
  70%, 100% { box-shadow: 0 12px 28px rgb(14 21 80 / 0.28), 0 0 0 18px rgb(37 211 102 / 0); }
}
@media (prefers-reduced-motion: reduce) { .fab { animation: none; } }
@media (max-width: 560px) { .fab { width: 52px; height: 52px; bottom: 14px; inset-inline-end: 14px; } .fab__tip { display: none; } }
</style>
