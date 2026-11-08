<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useSeo, breadcrumb } from '@/composables/useSeo'
import { posts } from '@/content/shared'
import { SITE_URL, site } from '@/config/site'
import PageHero from '@/components/PageHero.vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({ slug: { type: String, required: true } })
const { t, to, formatDate, locale } = useLocale()
const post = computed(() => t.value.blog.posts[props.slug])
const meta = computed(() => posts.find((p) => p.slug === props.slug))

useSeo(({ url, canonical }) => ({
  title: `${post.value.title} | Point`,
  description: post.value.excerpt,
  type: 'article',
  jsonLd: [
    breadcrumb([
      [t.value.nav.home, url(to('/'))],
      [t.value.nav.blog, url(to('/blog'))],
      [post.value.title, url(to(`/blog/${props.slug}`))],
    ]),
    {
      '@type': 'BlogPosting',
      headline: post.value.title,
      description: post.value.excerpt,
      datePublished: post.value.date,
      dateModified: post.value.date,
      inLanguage: locale.value,
      mainEntityOfPage: canonical.value,
      image: `${SITE_URL}${site.ogImage}`,
      author: { '@type': 'Organization', name: site.name, url: SITE_URL },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}))
</script>

<template>
  <PageHero
    :eyebrow="post.tag"
    :title="post.title"
    :text="post.excerpt"
    :crumbs="[{ label: t.nav.blog, to: to('/blog') }, { label: post.title }]"
  />
  <article class="section">
    <div class="container article">
      <p class="article__meta">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        <span aria-hidden="true">·</span>
        <span><AppIcon name="clock" :size="14" /> {{ meta.minutes }} {{ t.common.minRead }}</span>
      </p>
      <section v-for="b in post.body" :key="b.h">
        <h2>{{ b.h }}</h2>
        <p>{{ b.p }}</p>
      </section>
      <RouterLink :to="to('/blog')" class="link-arrow article__back">
        <AppIcon name="arrow" :size="16" :flip="false" class="back-icon" /> {{ t.common.backToBlog }}
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.article { max-width: 760px; display: grid; gap: 26px; }
.article__meta { display: flex; gap: 10px; align-items: center; font-size: var(--fs-xs); color: var(--muted); }
.article__meta span { display: inline-flex; align-items: center; gap: 4px; }
.article h2 { font-size: 1.15rem; margin-bottom: 8px; }
.article p { font-size: var(--fs-md); line-height: 1.95; }
.back-icon { transform: scaleX(-1); }
[dir='rtl'] .back-icon { transform: none; }
.article__back:hover .back-icon { transform: scaleX(-1); }
[dir='rtl'] .article__back:hover .back-icon { transform: none; }
</style>
