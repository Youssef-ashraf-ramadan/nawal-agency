<script setup>
// Self-hosted video reel: muted autoplay loop while on screen (paused off screen to save data/CPU),
// native controls for sound, seeking and fullscreen. Nothing is downloaded until it is near the viewport.
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, required: true },
  wide: { type: Boolean, default: false },
  label: { type: String, default: '' },
})

const video = ref(null)
const ready = ref(false) // becomes true when near the viewport → sets preload/autoplay
let io
let autoPausing = false

onMounted(() => {
  const el = video.value
  if (!el) return
  el.muted = true // required for autoplay (the attribute alone isn't always applied)
  if (!('IntersectionObserver' in window)) { ready.value = true; return }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver(
    async ([e]) => {
      if (e.isIntersecting) {
        ready.value = true
        await nextTick() // let the src attribute attach first
        if (!reduce && el.paused && !el.dataset.userPaused) el.play().catch(() => {})
      } else if (!el.paused) {
        autoPausing = true
        el.pause()
      }
    },
    { rootMargin: '200px 0px', threshold: 0.35 },
  )
  io.observe(el)
  // Respect a manual pause: don't auto-resume it when scrolling back
  el.addEventListener('pause', () => {
    if (!autoPausing) el.dataset.userPaused = '1'
    autoPausing = false
  })
  el.addEventListener('play', () => delete el.dataset.userPaused)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <figure class="reel" :class="{ 'reel--wide': props.wide }">
    <video
      ref="video"
      :src="ready ? props.src : undefined"
      :poster="props.poster"
      :aria-label="props.label"
      :preload="ready ? 'auto' : 'none'"
      muted
      loop
      playsinline
      controls
      controlslist="nodownload"
      disablepictureinpicture
    />
  </figure>
</template>

<style scoped>
.reel {
  position: relative; margin: 0; overflow: hidden;
  aspect-ratio: 9 / 16; border-radius: var(--radius); background: var(--blue-950);
  box-shadow: var(--shadow-sm);
}
.reel--wide { aspect-ratio: 16 / 9; }
.reel video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: var(--blue-950); }
</style>
