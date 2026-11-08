<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
const props = defineProps({ image: String, tag: String, title: String, metric: String, link: String, linkText: String })
const isExternal = computed(() => /^https?:\/\//.test(props.link || ''))
</script>

<template>
  <article class="wc card">
    <div class="wc__media">
      <img :src="image" width="600" height="600" :alt="title" loading="lazy" decoding="async" />
      <span class="wc__tag" lang="en">{{ tag }}</span>
    </div>
    <div class="wc__body">
      <h3>{{ title }}</h3>
      <component
        :is="isExternal ? 'a' : 'RouterLink'"
        v-bind="isExternal ? { href: link, target: '_blank', rel: 'noopener' } : { to: link }"
        class="link-arrow"
      >
        {{ linkText }} <span class="sr-only">— {{ title }}</span><AppIcon name="arrow" :size="16" flip />
      </component>
    </div>
  </article>
</template>

<style scoped>
.wc { overflow: hidden; display: flex; flex-direction: column; height: 100%; transition: transform 0.25s var(--ease), box-shadow 0.25s; }
.wc:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.wc__media { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: var(--blue-50); }
.wc__media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease); }
.wc:hover .wc__media img { transform: scale(1.04); }
.wc__tag {
  position: absolute; bottom: 10px; inset-inline-start: 10px;
  font-size: 0.6875rem; font-weight: 600; padding: 3px 10px; border-radius: 999px;
  background: var(--white); color: var(--blue-800); box-shadow: var(--shadow-sm);
}
.wc__body { padding: 14px 16px 16px; display: grid; gap: 8px; flex: 1; align-content: space-between; }
.wc__body h3 { font-size: var(--fs-sm); line-height: 1.6; }
</style>
