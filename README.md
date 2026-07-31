# `localePath({ name })` returns paths that 404

Minimal reproduction for [`nuxt-i18n-micro`](https://github.com/s00d/nuxt-i18n-micro) **3.24.3**.

▶️ **[Open in StackBlitz](https://stackblitz.com/github/vad1ym/nuxt-i18n-micro-path-building-repro)**
&nbsp;·&nbsp;
[Open in CodeSandbox](https://codesandbox.io/p/github/vad1ym/nuxt-i18n-micro-path-building-repro)

Two cases, both caused by building the path with string operations instead of the
router's stringifier.

## Run

```bash
npm install && npm run dev
```

Open `/` — the page prints both generated paths next to the expected ones. Or:

```bash
curl -s http://localhost:3000/ | grep -o 'data-test="[ab]">[^<]*'
```

## Case A — a dash in the route name duplicates a segment

Pages `pages/blog/index.vue` and `pages/blog/[slug].vue`; Nuxt names the second
one `blog-slug`.

```ts
globalLocaleRoutes: {
  'blog':      { es: '/blog-es' },
  'blog-slug': { es: '/blog-es/:slug' },
}
```

```ts
$localePath({ name: 'blog-slug', params: { slug: 'hello' } }, 'es')
```

| | |
|---|---|
| expected | `/es/blog-es/hello` |
| actual | `/es/blog-es/blog-es/hello` → **404** |

The `-` is read as a parent/child boundary, so the path configured for `blog` is
prepended to the path configured for `blog-slug` — which is already absolute.

## Case B — a param constraint is not stripped

Page `pages/archive/[year].vue`.

```ts
globalLocaleRoutes: {
  'archive-year': { es: '/archivo/:year(2024|2025)' },
}
```

```ts
$localePath({ name: 'archive-year', params: { year: '2024' } }, 'es')
```

| | |
|---|---|
| expected | `/es/archivo/2024` |
| actual | `/es/archivo/2024(2024\|2025)` → **404** |

`:year` is substituted, the `(2024|2025)` matcher is left in the string.

## Verifying the URLs

```
/es/blog-es/blog-es/hello    404      /es/blog-es/hello    200
/es/archivo/2024(2024|2025)  404      /es/archivo/2024     200
```

## Suggested fix

Build the path via Vue Router's `stringifyPath` / the compiled matcher: it knows
the real parent chain (A) and that `(...)` is a constraint, not a literal (B).

For B specifically, the module already strips constraints in
`extractBaseRoutePattern` (`@i18n-micro/utils`) — but only for `:locale(...)`.
