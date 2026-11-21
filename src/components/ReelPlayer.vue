<script setup>
// Self-hosted video reel with a minimal custom UI (native mobile controls are too cramped on small cards):
// tap = play/pause, sound toggle, fullscreen. Plays muted while on screen, pauses off screen,
// and downloads nothing until it is near the viewport.
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, required: true },
  wide: { type: Boolean, default: false },
  label: { type: String, default: '' },
})

const video = ref(null)
const ready = ref(false) // near the viewport → attach src
const playing = ref(false)
const muted = ref(true)
let io
let autoPausing = false
let userPaused = false

onMounted(() => {
  const el = video.value
  if (!el) return
  el.muted = true // required for autoplay
  el.addEventListener('play', () => (playing.value = true))
  el.addEventListener('pause', () => {
    playing.value = false
    if (!autoPausing) userPaused = true
    autoPausing = false
  })
  if (!('IntersectionObserver' in window)) { ready.value = true; return }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver(
    async ([e]) => {
      if (e.isIntersecting) {
        ready.value = true
        await nextTick()
        if (!reduce && el.paused && !userPaused) el.play().catch(() => {})
      } else if (!el.paused) {
        autoPausing = true
        el.pause()
      }
    },
    { threshold: 0.4 },
  )
  io.observe(el)
})
onBeforeUnmount(() => io?.disconnect())

async function toggle() {
  const el = video.value
  ready.value = true
  await nextTick()
  if (el.paused) { userPaused = false; el.play().catch(() => {}) }
  else el.pause()
}
function toggleSound() {
  const el = video.value
  el.muted = !el.muted
  muted.value = el.muted
  if (!el.muted && el.paused) toggle()
}
async function fullscreen() {
  const el = video.value
  ready.value = true
  await nextTick()
  el.muted = false
  muted.value = false
  el.play().catch(() => {})
  if (el.requestFullscreen) el.requestFullscreen().catch(() => {})
  else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen() // iOS Safari
}
</script>

<template>
  <figure class="reel" :class="{ 'reel--wide': props.wide, 'is-playing': playing }">
    <video
      ref="video"
      :src="ready ? props.src : undefined"
      :poster="props.poster"
      :aria-label="props.label"
      :preload="ready ? 'auto' : 'none'"
      muted
      loop
      playsinline
      disablepictureinpicture
      @click="toggle"
    />
    <button type="button" class="reel__center" :aria-label="playing ? 'Pause' : 'Play'" @click="toggle">
      <AppIcon :name="playing ? 'pause' : 'play'" :size="22" />
    </button>
    <div class="reel__bar">
      <button type="button" class="reel__btn" :aria-label="muted ? 'Unmute' : 'Mute'" :aria-pressed="!muted" @click="toggleSound">
        <AppIcon :name="muted ? 'mute' : 'volume'" :size="18" />
      </button>
      <button type="button" class="reel__btn" aria-label="Fullscreen" @click="fullscreen">
        <AppIcon name="expand" :size="18" />
      </button>
    </div>
  </figure>
</template>

<style scoped>
.reel {
  position: relative; margin: 0; overflow: hidden; isolation: isolate;
  aspect-ratio: 9 / 16; border-radius: var(--radius); background: var(--blue-950);
  box-shadow: var(--shadow-sm);
}
.reel--wide { aspect-ratio: 16 / 9; }
.reel video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: var(--blue-950); cursor: pointer; }

.reel__center {
  position: absolute; top: 50%; left: 50%; translate: -50% -50%; z-index: 1;
  display: grid; place-items: center; width: 54px; height: 54px; border-radius: 50%; border: 0;
  background: var(--lime); color: var(--ink); cursor: pointer; padding: 0;
  box-shadow: 0 8px 22px rgb(5 10 60 / 0.35);
  transition: opacity 0.25s, transform 0.25s var(--ease);
}
.reel__center:hover { transform: scale(1.08); }
/* While playing, the big button hides (tap the video to pause); on desktop it reappears on hover */
.reel.is-playing .reel__center { opacity: 0; pointer-events: none; }
@media (hover: hover) {
  .reel.is-playing:hover .reel__center { opacity: 0.9; pointer-events: auto; }
}
.reel__center:focus-visible { opacity: 1 !important; pointer-events: auto; }

.reel__bar { position: absolute; bottom: 8px; inset-inline-end: 8px; z-index: 1; display: flex; gap: 6px; }
.reel__btn {
  display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; border: 0; padding: 0;
  background: rgb(7 13 74 / 0.6); color: var(--white); cursor: pointer; backdrop-filter: blur(4px);
  transition: background-color 0.2s, color 0.2s;
}
.reel__btn:hover { background: var(--lime); color: var(--ink); }
.reel--wide .reel__center { width: 46px; height: 46px; }
@media (max-width: 560px) {
  .reel__center { width: 44px; height: 44px; }
  .reel__btn { width: 30px; height: 30px; }
}
</style>
