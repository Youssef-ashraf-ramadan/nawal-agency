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
      <div class="article__body">
        <section v-for="(b, i) in post.body" :key="i" :class="{ 'article__intro': !b.h, 'article__group': b.h && !b.p && !b.list }">
          <h2 v-if="b.h">{{ b.h }}</h2>
          <p v-if="b.p">{{ b.p }}</p>
          <ul v-if="b.list" class="article__list">
            <li v-for="item in b.list" :key="item"><AppIcon name="check" :size="16" /> {{ item }}</li>
          </ul>
        </section>
      </div>
      <div class="article__cta">
        <a :href="site.discoveryForm" target="_blank" rel="noopener" class="btn btn--lime"><AppIcon name="sparkle" :size="18" /> {{ t.nav.cta }}</a>
      </div>
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
.article__body { display: grid; gap: 22px; }
.article h2 { font-size: 1.1rem; margin-bottom: 8px; }
.article__group { margin-top: 12px; }
.article__group h2 { font-size: 1.3rem; padding-inline-start: 14px; border-inline-start: 4px solid var(--lime-600); }
.article p { font-size: var(--fs-md); line-height: 1.95; }
.article__list { display: grid; gap: 10px; margin-top: 10px; padding: 18px 20px; border-radius: var(--radius); background: var(--blue-50); }
.article__list li { display: flex; gap: 10px; font-size: var(--fs-md); line-height: 1.8; }
.article__list svg { flex: none; margin-top: 7px; color: var(--blue-700); }
.article__cta { padding: 22px; border-radius: var(--radius-lg); background: linear-gradient(135deg, var(--blue-700), var(--blue-900)); display: flex; justify-content: center; }
.back-icon { transform: scaleX(-1); }
[dir='rtl'] .back-icon { transform: none; }
.article__back:hover .back-icon { transform: scaleX(-1); }
[dir='rtl'] .article__back:hover .back-icon { transform: none; }
</style>
