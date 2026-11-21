import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Scroll-reveal for the whole site, without touching every component:
 * section headings, cards, list items and media fade/slide in as they enter the viewport.
 * Client-only and progressive: pre-rendered HTML stays fully visible, elements already on screen
 * are left alone, and users who prefer reduced motion get no animation.
 */
const SELECTOR = [
  'main .section .head',
  'main .section h2',
  'main .card',
  'main .section li',
  'main .section img',
  'main .section .btn',
  '.cta__inner > *',
].join(',')

const SKIP = '.hero, .page-hero, .lightbox, .gallery li, .case__thumbs li, .nav, [data-no-reveal]'

export function useReveal() {
  const route = useRoute()
  let io

  function scan() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    io ??= new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target
          io.unobserve(el)
          el.classList.add('is-revealed')
          // Hand the element back to its own styles (hover transforms etc.) once it has arrived
          const done = (ev) => {
            if (ev.target !== el) return // ignore animations bubbling up from children
            el.removeEventListener('animationend', done)
            el.classList.remove('reveal', 'is-revealed')
            el.style.removeProperty('--reveal-delay')
            el.dataset.revealed = ''
          }
          el.addEventListener('animationend', done)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    const vh = window.innerHeight
    const seen = new Set()
    for (const el of document.querySelectorAll(SELECTOR)) {
      if (el.classList.contains('reveal') || 'revealed' in el.dataset || el.closest(SKIP)) continue
      // Don't reveal both a card and its own inner items
      if (el.parentElement?.closest('.reveal, [data-revealed]')) continue
      if (el.getBoundingClientRect().top < vh * 0.92) continue // already visible: never hide it
      // Stagger siblings (e.g. cards in a grid)
      const parent = el.parentElement
      const n = seen.has(parent) ? [...parent.children].indexOf(el) % 4 : 0
      seen.add(parent)
      el.style.setProperty('--reveal-delay', `${n * 90}ms`)
      el.classList.add('reveal')
      io.observe(el)
    }
  }

  onMounted(() => setTimeout(scan, 60))
  watch(() => route.fullPath, () => nextTick(() => setTimeout(scan, 120)))
}
