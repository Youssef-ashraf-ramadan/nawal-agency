<script setup>
import { useLocale } from '@/composables/useLocale'
import { computed } from 'vue'
import { latestPosts } from '@/content/shared'
import PostCard from '@/components/PostCard.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, to, formatDate } = useLocale()
const posts = computed(() => latestPosts(t.value))
</script>

<template>
  <section class="section bc">
    <div class="container bc__grid">
      <div class="careers" aria-labelledby="careers-title">
        <div class="careers__text">
          <p class="eyebrow">{{ t.careers.eyebrow }}</p>
          <h2 id="careers-title">{{ t.careers.title }}</h2>
          <p class="lead">{{ t.careers.text }}</p>
          <RouterLink :to="to('/careers')" class="btn btn--lime btn--sm">
            {{ t.common.allJobs }} <AppIcon name="arrow" :size="16" flip />
          </RouterLink>
        </div>
        <svg class="careers__art" viewBox="0 0 120 150" aria-hidden="true">
          <path d="M60 8 C 64 30, 70 50, 104 58" stroke="var(--lime-600)" stroke-width="10" stroke-linecap="round" fill="none" />
          <rect x="34" y="40" width="52" height="56" rx="12" fill="var(--blue-700)" />
          <rect x="26" y="92" width="68" height="14" rx="7" fill="var(--blue-800)" />
          <path d="M60 106v22M36 140l24-12 24 12" stroke="var(--blue-900)" stroke-width="6" stroke-linecap="round" fill="none" />
          <circle cx="36" cy="142" r="5" fill="var(--blue-900)" /><circle cx="84" cy="142" r="5" fill="var(--blue-900)" />
        </svg>
      </div>

      <div class="blog" aria-labelledby="blog-title">
        <div class="blog__head">
          <p class="eyebrow">{{ t.blog.eyebrow }}</p>
          <h2 id="blog-title">{{ t.blog.title }}</h2>
          <p class="lead">{{ t.blog.text }}</p>
          <RouterLink :to="to('/blog')" class="btn btn--lime btn--sm">
            {{ t.common.allPosts }} <AppIcon name="arrow" :size="16" flip />
          </RouterLink>
        </div>
        <ul class="blog__list">
          <li v-for="(p, i) in posts" :key="p.slug">
            <PostCard
              :variant="i"
              :icon="p.icon"
              :tag="t.blog.posts[p.slug].tag"
              :title="t.blog.posts[p.slug].title"
              :date="formatDate(t.blog.posts[p.slug].date)"
              :date-iso="t.blog.posts[p.slug].date"
              :link="to(`/blog/${p.slug}`)"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bc__grid { display: grid; grid-template-columns: 1fr 2.6fr; gap: 20px; align-items: stretch; }
.careers {
  position: relative; display: flex; align-items: flex-end; justify-content: space-between; gap: 12px;
  background: var(--blue-50); border-radius: var(--radius-lg); padding: 24px; overflow: hidden;
}
.careers__text { display: grid; gap: 6px; justify-items: start; position: relative; z-index: 1; }
.careers__text .lead { font-size: var(--fs-sm); margin-bottom: 10px; }
.careers__art { width: 96px; flex: none; }
.blog { display: grid; grid-template-columns: 0.9fr 2fr; gap: 20px; align-items: center; }
.blog__head { display: grid; gap: 6px; justify-items: start; }
.blog__head .lead { font-size: var(--fs-sm); margin-bottom: 10px; }
.blog__list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

@media (max-width: 1100px) {
  .bc__grid { grid-template-columns: 1fr; }
  .careers { order: 2; }
}
@media (max-width: 760px) {
  .blog { grid-template-columns: 1fr; }
  .blog__list { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
}
</style>
