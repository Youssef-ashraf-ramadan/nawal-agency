<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { services } from '@/content/shared'
import { site } from '@/config/site'
import AppIcon from '@/components/AppIcon.vue'

const { t, to } = useLocale()
// Floating service chips around "the point"
const chips = computed(() => services.map((s) => ({ id: s.id, icon: s.icon, label: t.value.services.items[s.id].title })))
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <!-- Drifting brand dots in the background -->
    <span class="hero__dot hero__dot--1" aria-hidden="true" />
    <span class="hero__dot hero__dot--2" aria-hidden="true" />
    <span class="hero__dot hero__dot--3" aria-hidden="true" />
    <span class="hero__dot hero__dot--4" aria-hidden="true" />
    <span class="hero__dot hero__dot--5" aria-hidden="true" />
    <span class="hero__grid" aria-hidden="true" />

    <div class="container hero__inner">
      <div class="hero__content">
        <p class="hero__eyebrow">{{ t.hero.eyebrow }}</p>
        <h1 id="hero-title">
          <span>{{ t.hero.title1 }}</span>
          <span class="hero__accent">{{ t.hero.title2 }}</span>
        </h1>
        <p class="hero__text">{{ t.hero.text }}</p>
        <div class="hero__actions">
          <RouterLink :to="to('/contact')" class="btn btn--lime">
            {{ t.hero.primary }} <AppIcon name="arrow" :size="18" flip />
          </RouterLink>
          <RouterLink :to="to('/services')" class="btn btn--ghost">{{ t.hero.secondary }}</RouterLink>
        </div>
      </div>

      <div class="hero__visual" role="img" :aria-label="t.hero.imgAlt">
        <!-- Morphing lime shape (echoes the "+" in the logo) -->
        <span class="hero__blob" aria-hidden="true" />

        <!-- Orbits with travelling points -->
        <svg class="hero__orbits" viewBox="0 0 400 400" aria-hidden="true">
          <circle cx="200" cy="200" r="190" class="orbit orbit--dashed" />
          <circle cx="200" cy="200" r="142" class="orbit" />
          <circle cx="200" cy="200" r="96" class="orbit orbit--soft" />
          <g class="spin spin--slow"><circle cx="200" cy="10" r="9" class="pt pt--lime" /><circle cx="390" cy="200" r="5" class="pt pt--white" /></g>
          <g class="spin spin--rev"><circle cx="200" cy="58" r="7" class="pt pt--white" /><circle cx="58" cy="200" r="11" class="pt pt--lime" /><circle cx="342" cy="200" r="4" class="pt pt--lime" /></g>
          <g class="spin spin--fast"><circle cx="200" cy="104" r="6" class="pt pt--lime" /><circle cx="200" cy="296" r="4" class="pt pt--white" /></g>
        </svg>

        <!-- Ripples from the point -->
        <span class="hero__ripple" aria-hidden="true" />
        <span class="hero__ripple hero__ripple--2" aria-hidden="true" />
        <span class="hero__ripple hero__ripple--3" aria-hidden="true" />

        <!-- The point -->
        <div class="hero__core">
          <img :src="site.logo.src" :width="site.logo.width" :height="site.logo.height" alt="" fetchpriority="high" />
        </div>

        <ul class="hero__chips" aria-hidden="true">
          <li v-for="(c, i) in chips" :key="c.id" class="chip" :class="`chip--${i + 1}`">
            <span class="chip__icon"><AppIcon :name="c.icon" :size="16" /></span>
            <span lang="en">{{ c.label }}</span>
          </li>
        </ul>

        <p class="hero__tagline" lang="en" dir="ltr">
          Find the<br />Point.<br />Move Forward.
          <svg viewBox="0 0 90 40" aria-hidden="true"><path d="M2 6c18 26 52 32 80 18M72 14l10 10-14 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative; overflow: hidden; isolation: isolate;
  background: radial-gradient(120% 90% at 85% 10%, var(--blue-600) 0%, var(--blue-700) 45%, var(--blue-800) 100%);
  color: rgb(255 255 255 / 0.86);
}
.hero__grid {
  position: absolute; inset: 0; z-index: -2; opacity: 0.35;
  background-image: radial-gradient(rgb(255 255 255 / 0.22) 1px, transparent 1.5px);
  background-size: 26px 26px;
  mask-image: radial-gradient(70% 70% at 70% 50%, #000, transparent);
}
.hero__inner {
  display: grid; grid-template-columns: 1.05fr 1fr; align-items: center; gap: clamp(24px, 4vw, 56px);
  padding-block: clamp(40px, 6vw, 72px);
}
.hero__eyebrow { font-size: var(--fs-xs); letter-spacing: 0.14em; font-weight: 500; color: rgb(255 255 255 / 0.75); margin-bottom: 14px; }
.hero h1 { color: var(--white); display: grid; gap: 4px; line-height: 1.45; }
.hero__accent { color: var(--lime); }
.hero__text { margin-top: 16px; font-size: var(--fs-base); max-width: 54ch; }
.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }

/* Entrance */
.hero__content > * { animation: hero-up 0.8s var(--ease) both; }
.hero__content > :nth-child(2) { animation-delay: 0.1s; }
.hero__content > :nth-child(3) { animation-delay: 0.2s; }
.hero__content > :nth-child(4) { animation-delay: 0.3s; }

/* ---------- Visual ---------- */
.hero__visual {
  position: relative; width: 100%; max-width: 500px; aspect-ratio: 1; justify-self: center;
  display: grid; place-items: center;
  animation: hero-zoom 1s var(--ease) both 0.15s;
}
.hero__blob {
  position: absolute; inset: 16%; z-index: 0; background: var(--lime);
  border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%;
  animation: blob 12s ease-in-out infinite;
  box-shadow: 0 30px 80px rgb(5 10 60 / 0.35);
}
.hero__orbits { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; overflow: visible; }
.orbit { fill: none; stroke: rgb(255 255 255 / 0.28); stroke-width: 1.2; }
.orbit--dashed { stroke-dasharray: 4 9; stroke: rgb(255 255 255 / 0.4); }
.orbit--soft { stroke: rgb(14 21 80 / 0.18); }
.pt--lime { fill: var(--lime); }
.pt--white { fill: var(--white); }
.spin { transform-origin: 200px 200px; animation: spin 26s linear infinite; }
.spin--rev { animation-duration: 34s; animation-direction: reverse; }
.spin--fast { animation-duration: 14s; }

.hero__ripple {
  position: absolute; z-index: 1; width: 34%; aspect-ratio: 1; border-radius: 50%;
  border: 2px solid rgb(255 255 255 / 0.7);
  animation: ripple 3.6s ease-out infinite;
}
.hero__ripple--2 { animation-delay: 1.2s; }
.hero__ripple--3 { animation-delay: 2.4s; }

.hero__core {
  position: relative; z-index: 2; width: 38%; aspect-ratio: 1; border-radius: 50%;
  display: grid; place-items: center; background: var(--white);
  box-shadow: 0 0 0 10px rgb(255 255 255 / 0.18), 0 24px 60px rgb(5 10 60 / 0.4);
  animation: float 6s ease-in-out infinite;
}
.hero__core img { width: 76%; height: auto; }

.hero__chips { position: absolute; inset: 0; z-index: 3; }
.chip {
  position: absolute; display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 14px 7px 8px; border-radius: 999px; white-space: nowrap;
  background: rgb(255 255 255 / 0.95); color: var(--ink); font-size: var(--fs-xs); font-weight: 600;
  box-shadow: 0 14px 30px rgb(5 10 60 / 0.28);
  animation: float 5s ease-in-out infinite;
}
[dir='rtl'] .chip { padding: 7px 8px 7px 14px; }
.chip__icon { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--blue-700); color: var(--white); }
.chip--1 { top: 9%; left: 2%; animation-delay: -1s; }
.chip--2 { top: 20%; right: -2%; animation-delay: -2.5s; }
.chip--2 .chip__icon { background: var(--lime); color: var(--ink); }
.chip--3 { bottom: 22%; right: 0; animation-delay: -3.5s; }
.chip--4 { bottom: 9%; left: 10%; animation-delay: -0.5s; }
.chip--4 .chip__icon { background: var(--lime); color: var(--ink); }

.hero__tagline {
  position: absolute; left: -12%; top: 36%; z-index: 4;
  font-size: var(--fs-sm); font-style: italic; line-height: 1.35; color: var(--white); text-align: left;
  transform: rotate(-8deg); text-shadow: 0 2px 12px rgb(5 10 60 / 0.5);
}
.hero__tagline svg { width: 70px; color: var(--white); margin-top: 4px; }

/* Background dots */
.hero__dot { position: absolute; z-index: -1; border-radius: 50%; background: var(--lime); animation: drift 14s ease-in-out infinite; }
.hero__dot--1 { width: 120px; height: 120px; inset-inline-start: -60px; bottom: 12%; }
.hero__dot--2 { width: 18px; height: 18px; inset-inline-end: 47%; top: 12%; animation-delay: -4s; }
.hero__dot--3 { width: 10px; height: 10px; inset-inline-start: 46%; top: 6%; background: var(--white); opacity: 0.7; animation-delay: -8s; }
.hero__dot--4 { width: 26px; height: 26px; inset-inline-end: 4%; bottom: 8%; opacity: 0.85; animation-delay: -2s; }
.hero__dot--5 { width: 8px; height: 8px; inset-inline-end: 38%; bottom: 14%; background: var(--white); opacity: 0.6; animation-delay: -6s; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -10px; } }
@keyframes ripple {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.6); opacity: 0; }
}
@keyframes blob {
  0%, 100% { border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%; transform: rotate(0deg) scale(1); }
  33% { border-radius: 63% 37% 41% 59% / 57% 61% 39% 43%; transform: rotate(40deg) scale(1.04); }
  66% { border-radius: 36% 64% 52% 48% / 38% 50% 50% 62%; transform: rotate(-25deg) scale(0.97); }
}
@keyframes drift {
  0%, 100% { translate: 0 0; }
  50% { translate: 14px -22px; }
}
@keyframes hero-up { from { opacity: 0; transform: translateY(24px); } }
@keyframes hero-zoom { from { opacity: 0; transform: scale(0.85) rotate(-6deg); } }

@media (prefers-reduced-motion: reduce) {
  .hero *, .hero *::before { animation: none !important; }
  .hero__ripple { display: none; }
}

@media (max-width: 900px) {
  .hero__inner { grid-template-columns: 1fr; }
  .hero__visual { max-width: 420px; }
  .hero__dot--2 { display: none; }
}
@media (max-width: 480px) {
  .hero__actions .btn { flex: 1 1 100%; }
  .hero__tagline { font-size: var(--fs-xs); left: -2%; top: 30%; }
  .chip { font-size: 0.6875rem; padding-block: 5px; }
  .chip__icon { width: 24px; height: 24px; }
}
</style>
