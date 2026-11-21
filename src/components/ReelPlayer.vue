<script setup>
// Click-to-play Google Drive video: a light local poster first, the Drive player iframe only after a click.
import { ref } from 'vue'
import { driveEmbed, driveView } from '@/content/shared'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  id: { type: String, required: true },
  poster: { type: String, required: true },
  wide: { type: Boolean, default: false },
  label: { type: String, default: '' },
  playLabel: { type: String, default: 'Play' },
})
const playing = ref(false)
</script>

<template>
  <figure class="reel" :class="{ 'reel--wide': props.wide }">
    <iframe
      v-if="playing"
      :src="driveEmbed(props.id)"
      :title="props.label"
      allow="autoplay; fullscreen; encrypted-media"
      allowfullscreen
      loading="lazy"
    />
    <button v-else type="button" class="reel__poster" :aria-label="`${props.playLabel} — ${props.label}`" @click="playing = true">
      <img class="reel__bg" :src="props.poster" alt="" loading="lazy" decoding="async" aria-hidden="true" />
      <img class="reel__img" :src="props.poster" alt="" loading="lazy" decoding="async" />
      <span class="reel__play"><AppIcon name="play" :size="26" /></span>
      <span class="reel__label">{{ props.label }}</span>
    </button>
    <a class="reel__open" :href="driveView(props.id)" target="_blank" rel="noopener" :aria-label="props.label">
      <AppIcon name="external" :size="14" />
    </a>
  </figure>
</template>

<style scoped>
.reel {
  position: relative; margin: 0; overflow: hidden; isolation: isolate;
  aspect-ratio: 9 / 16; border-radius: var(--radius); background: var(--blue-950);
  box-shadow: var(--shadow-sm);
}
.reel--wide { aspect-ratio: 16 / 9; }
.reel iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.reel__poster { position: absolute; inset: 0; padding: 0; border: 0; background: none; cursor: pointer; display: grid; place-items: center; }
.reel__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: blur(18px) brightness(0.55); transform: scale(1.2); }
.reel__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; transition: transform 0.6s var(--ease); }
.reel__poster:hover .reel__img { transform: scale(1.04); }
.reel__play {
  position: relative; z-index: 1; display: grid; place-items: center; width: 62px; height: 62px; border-radius: 50%;
  background: var(--lime); color: var(--ink); padding-inline-start: 4px;
  box-shadow: 0 0 0 0 rgb(232 242 91 / 0.6); animation: reel-pulse 2.2s infinite;
  transition: transform 0.25s var(--ease);
}
.reel__poster:hover .reel__play { transform: scale(1.1); }
.reel__label {
  position: absolute; inset-inline: 0; bottom: 0; z-index: 1; padding: 22px 12px 10px;
  background: linear-gradient(to top, rgb(7 13 74 / 0.85), transparent);
  color: var(--white); font-size: var(--fs-xs); font-weight: 600; text-align: start;
}
.reel__open {
  position: absolute; top: 8px; inset-inline-end: 8px; z-index: 2; display: grid; place-items: center;
  width: 30px; height: 30px; border-radius: 50%; background: rgb(255 255 255 / 0.85); color: var(--ink);
}
.reel__open:hover { background: var(--lime); }
@keyframes reel-pulse {
  70% { box-shadow: 0 0 0 16px rgb(232 242 91 / 0); }
  100% { box-shadow: 0 0 0 0 rgb(232 242 91 / 0); }
}
@media (prefers-reduced-motion: reduce) { .reel__play { animation: none; } }
</style>
