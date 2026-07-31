<template>
  <div>
    <h1>nuxt-i18n-micro — localized path building</h1>

    <table border="1" cellpadding="6">
      <tr><th>case</th><th>expected</th><th>actual</th></tr>
      <tr>
        <td>A — dashed route name</td>
        <td><code>/es/blog-es/hello</code></td>
        <td><code data-test="a">{{ a }}</code></td>
      </tr>
      <tr>
        <td>B — param constraint</td>
        <td><code>/es/archivo/2024</code></td>
        <td><code data-test="b">{{ b }}</code></td>
      </tr>
    </table>

    <p>Both actual values 404. Click to confirm:</p>
    <ul>
      <li><a :href="a">{{ a }}</a></li>
      <li><a :href="b">{{ b }}</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { $localePath } = useNuxtApp()

const a = computed(() =>
  $localePath({ name: 'blog-slug', params: { slug: 'hello' } }, 'es'),
)

const b = computed(() =>
  $localePath({ name: 'archive-year', params: { year: '2024' } }, 'es'),
)
</script>
