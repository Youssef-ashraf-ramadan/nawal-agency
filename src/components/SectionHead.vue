<script setup>
defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  text: String,
  id: String,
  level: { type: Number, default: 2 },
})
</script>

<template>
  <div class="head">
    <div class="head__text">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <component :is="`h${level}`" :id="id">{{ title }}</component>
      <p v-if="text" class="lead">{{ text }}</p>
    </div>
    <div v-if="$slots.default" class="head__action"><slot /></div>
  </div>
</template>

<style scoped>
.head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px 32px; flex-wrap: wrap; margin-bottom: clamp(24px, 3.5vw, 40px); }
.head__text { display: grid; gap: 4px; max-width: 640px; }
.head .lead { margin-top: 6px; }
</style>
