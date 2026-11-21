<script setup>
import { reactive, ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { useSeo, breadcrumb } from '@/composables/useSeo'
import { services } from '@/content/shared'
import { site, whatsappUrl, SITE_URL } from '@/config/site'
import PageHero from '@/components/PageHero.vue'
import AppIcon from '@/components/AppIcon.vue'
import SocialLinks from '@/components/SocialLinks.vue'

const { t, to } = useLocale()
useSeo(({ url }) => ({
  ...t.value.meta.contact,
  jsonLd: [
    breadcrumb([[t.value.nav.home, url(to('/'))], [t.value.nav.contact, url(to('/contact'))]]),
    { '@type': 'ContactPage', name: t.value.meta.contact.title, about: { '@id': `${SITE_URL}/#organization` } },
  ],
}))

const form = reactive({ name: '', phone: '', email: '', service: '', message: '' })
const touched = ref(false)
const errors = computed(() => ({
  name: !form.name.trim(),
  phone: !/^[+\d][\d\s-]{6,}$/.test(form.phone.trim()),
}))
const valid = computed(() => !errors.value.name && !errors.value.phone)

const f = computed(() => t.value.contact.form)
const body = computed(() => {
  const svc = form.service ? t.value.services.items[form.service].name : ''
  return [
    f.value.intro,
    `${f.value.name}: ${form.name}`,
    `${f.value.phone}: ${form.phone}`,
    form.email && `${f.value.email}: ${form.email}`,
    svc && `${f.value.service}: ${svc}`,
    form.message && `${f.value.message}: ${form.message}`,
  ].filter(Boolean).join('\n')
})
const mailHref = computed(() => `mailto:${site.email}?subject=${encodeURIComponent(t.value.nav.cta)}&body=${encodeURIComponent(body.value)}`)

function submit() {
  touched.value = true
  if (!valid.value) return
  window.open(whatsappUrl(body.value), '_blank', 'noopener')
}

const channels = computed(() => [
  { icon: 'whatsapp', label: t.value.contact.channels.whatsapp, value: `+${site.whatsapp}`, href: whatsappUrl(), external: true },
  ...site.phones.map((p) => ({ icon: 'phone', label: t.value.contact.channels.phone, value: p, href: `tel:${p}` })),
  { icon: 'mail', label: t.value.contact.channels.email, value: site.email, href: `mailto:${site.email}` },
  { icon: 'link', label: t.value.contact.channels.links, value: 'linktr.ee/pointmarketingagency.eg', href: site.linktree, external: true },
])
</script>

<template>
  <PageHero :eyebrow="t.contact.eyebrow" :title="t.contact.title" :text="t.contact.text" :crumbs="[{ label: t.nav.contact }]" />

  <section class="section">
    <div class="container contact">
      <form class="card form" novalidate @submit.prevent="submit">
        <div class="form__row">
          <label class="field">
            <span>{{ f.name }} *</span>
            <input v-model="form.name" type="text" name="name" autocomplete="name" required :aria-invalid="touched && errors.name" />
            <small v-if="touched && errors.name" role="alert">{{ f.required }}</small>
          </label>
          <label class="field">
            <span>{{ f.phone }} *</span>
            <input v-model="form.phone" type="tel" name="phone" autocomplete="tel" dir="ltr" required :aria-invalid="touched && errors.phone" />
            <small v-if="touched && errors.phone" role="alert">{{ f.required }}</small>
          </label>
        </div>
        <div class="form__row">
          <label class="field">
            <span>{{ f.email }}</span>
            <input v-model="form.email" type="email" name="email" autocomplete="email" dir="ltr" />
          </label>
          <label class="field">
            <span>{{ f.service }}</span>
            <select v-model="form.service" name="service">
              <option value="">{{ f.choose }}</option>
              <option v-for="s in services" :key="s.id" :value="s.id">{{ t.services.items[s.id].name }}</option>
            </select>
          </label>
        </div>
        <label class="field">
          <span>{{ f.message }}</span>
          <textarea v-model="form.message" name="message" rows="5" />
        </label>
        <div class="form__actions">
          <button type="submit" class="btn btn--lime"><AppIcon name="whatsapp" :size="18" /> {{ f.submit }}</button>
          <a :href="mailHref" class="link-arrow">{{ f.submitMail }} <AppIcon name="arrow" :size="16" flip /></a>
        </div>
        <p class="form__note">{{ f.note }}</p>
      </form>

      <aside class="side">
        <div class="discovery">
          <span class="discovery__icon"><AppIcon name="form" :size="26" /></span>
          <h2>{{ t.contact.discovery.title }}</h2>
          <p>{{ t.contact.discovery.text }}</p>
          <a :href="site.discoveryForm" target="_blank" rel="noopener" class="btn btn--lime">
            {{ t.contact.discovery.button }} <AppIcon name="arrow" :size="18" flip />
          </a>
        </div>
        <img src="/images/contact.webp" width="900" height="560" :alt="t.contact.imgAlt" loading="lazy" decoding="async" />
        <ul class="channels">
          <li v-for="c in channels" :key="c.value">
            <a :href="c.href" :target="c.external ? '_blank' : undefined" :rel="c.external ? 'noopener noreferrer' : undefined">
              <span class="icon-badge"><AppIcon :name="c.icon" /></span>
              <span>
                <small>{{ c.label }}</small>
                <strong dir="ltr">{{ c.value }}</strong>
              </span>
            </a>
          </li>
        </ul>
        <div class="follow">
          <strong>{{ t.contact.follow }}</strong>
          <SocialLinks class="follow__links" />
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.contact { display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; align-items: start; }
.form { padding: clamp(20px, 3vw, 32px); display: grid; gap: 16px; }
.form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field { display: grid; gap: 6px; font-size: var(--fs-sm); font-weight: 500; color: var(--ink); }
.field input, .field select, .field textarea {
  width: 100%; min-height: 46px; padding: 10px 14px; border-radius: var(--radius-sm);
  border: 1px solid var(--line); background: var(--blue-50); font-size: var(--fs-sm); font-weight: 400;
  transition: border-color 0.2s, background-color 0.2s;
}
[dir='rtl'] .field input[dir='ltr'] { text-align: right; }
.field textarea { resize: vertical; }
.field :is(input, select, textarea):focus { outline: none; border-color: var(--blue-700); background: var(--white); }
.field [aria-invalid='true'] { border-color: #d43c3c; }
.field small { color: #c02f2f; font-size: var(--fs-xs); }
.form__actions { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.form__note { font-size: var(--fs-xs); color: var(--muted); }
.side { display: grid; gap: 16px; }
.side img { width: 100%; aspect-ratio: 900 / 560; object-fit: cover; border-radius: var(--radius-lg); }
.channels { display: grid; gap: 10px; }
.channels a { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius); transition: border-color 0.2s; }
.channels a:hover { border-color: var(--blue-700); }
.channels small { display: block; font-size: var(--fs-xs); color: var(--muted); }
.channels strong { display: block; font-size: var(--fs-sm); color: var(--ink); font-weight: 600; word-break: break-all; }
.discovery {
  position: relative; overflow: hidden; display: grid; gap: 10px; justify-items: start;
  padding: 22px; border-radius: var(--radius-lg); color: rgb(255 255 255 / 0.85);
  background: linear-gradient(140deg, var(--blue-700), var(--blue-900));
}
.discovery::after { content: ''; position: absolute; width: 110px; height: 110px; border-radius: 50%; background: var(--lime); inset-inline-end: -40px; top: -40px; opacity: 0.9; }
.discovery h2 { color: var(--white); font-size: 1.15rem; }
.discovery p { font-size: var(--fs-sm); }
.discovery__icon { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 14px; background: rgb(255 255 255 / 0.12); color: var(--lime); }
.follow { display: grid; gap: 10px; padding: 16px; border-radius: var(--radius); background: var(--blue-800); }
.follow strong { color: var(--white); font-size: var(--fs-sm); }
@media (max-width: 900px) { .contact { grid-template-columns: 1fr; } }
@media (max-width: 560px) { .form__row { grid-template-columns: 1fr; } }
</style>
