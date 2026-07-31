<template>
  <div>
    <h1>nuxt-i18n-micro — path building repro</h1>

    <h2>A. Dashed route name → duplicated segment</h2>
    <p>
      expected <code>/es/medicos/x</code>
      <br>actual <code data-test="dashed">{{ dashed }}</code>
    </p>

    <h2>B. Param regex constraint → leaks into href</h2>
    <p>
      expected <code>/es/medicamentos/spain</code>
      <br>actual <code data-test="regex">{{ regex }}</code>
    </p>

    <h2>Live links (click to see the 404)</h2>
    <ul>
      <li><a :href="dashed">{{ dashed }}</a></li>
      <li><a :href="regex">{{ regex }}</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { $localePath } = useNuxtApp()

const dashed = computed(() =>
  $localePath({ name: 'doctors-tag', params: { tag: 'x' } }, 'es'),
)

const regex = computed(() =>
  $localePath({ name: 'medicines-country', params: { country: 'spain' } }, 'es'),
)
</script>
