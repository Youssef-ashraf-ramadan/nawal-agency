<script setup>
import { useLocale } from '@/composables/useLocale'
import { useSeo, breadcrumb } from '@/composables/useSeo'
import { computed } from 'vue'
import { postsByDate } from '@/content/shared'
import PageHero from '@/components/PageHero.vue'
import PostCard from '@/components/PostCard.vue'

const { t, to, formatDate } = useLocale()
const posts = computed(() => postsByDate(t.value))
useSeo(({ url }) => ({
  ...t.value.meta.blog,
  jsonLd: [breadcrumb([[t.value.nav.home, url(to('/'))], [t.value.nav.blog, url(to('/blog'))]])],
}))
</script>

<template>
  <PageHero :eyebrow="t.blog.eyebrow" :title="t.blog.title" :text="t.blog.text" :crumbs="[{ label: t.nav.blog }]" />
  <section class="section">
    <div class="container">
      <ul class="posts">
        <li v-for="(p, i) in posts" :key="p.slug" class="posts__item">
          <PostCard
            :variant="i"
            :icon="p.icon"
            :tag="t.blog.posts[p.slug].tag"
            :title="t.blog.posts[p.slug].title"
            :date="formatDate(t.blog.posts[p.slug].date)"
            :date-iso="t.blog.posts[p.slug].date"
            :link="to(`/blog/${p.slug}`)"
          />
          <p class="posts__excerpt">{{ t.blog.posts[p.slug].excerpt }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.posts { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 22px; }
.posts__item { display: grid; gap: 10px; align-content: start; }
.posts__excerpt { font-size: var(--fs-sm); color: var(--muted); padding-inline: 4px; }
</style>
