# JogjaKu

Panduan lengkap Yogyakarta — wisata, sejarah, budaya, kuliner, pendidikan, teknologi, peta interaktif, dan Sumbu Filosofi.

## Tech Stack

- **Framework:** Nuxt 4 + Vue 3
- **Styling:** Tailwind CSS 4
- **i18n:** @nuxtjs/i18n (ID ↔ EN)
- **Maps:** Leaflet + MapLibre GL
- **Animation:** GSAP
- **Search:** Fuse.js
- **AI:** Gemini + Groq (chat & planner)
- **PWA:** @vite-pwa/nuxt

## Setup

```bash
bun install
```

## Development

```bash
bun run dev
```

## Production

```bash
bun run build
bun run preview
```

## Routes

| Route         | EN                 | ID              |
| ------------- | ------------------ | --------------- |
| `/`           | Home               | Beranda         |
| `/sejarah`    | History            | Sejarah         |
| `/budaya`     | Culture            | Budaya          |
| `/kuliner`    | Culinary           | Kuliner         |
| `/wisata`     | Tourism            | Wisata          |
| `/pendidikan` | Education          | Pendidikan      |
| `/teknologi`  | Technology         | Teknologi       |
| `/peta`       | Interactive Map    | Peta Interaktif |
| `/filosofi`   | Philosophical Axis | Sumbu Filosofi  |

## Project Structure

```
app/
├── components/   # Vue components grouped by domain
├── composables/  # useToast, useScrollProgress, useJsonLd, useLocaleToggle
├── layouts/      # default.vue, story.vue
├── pages/        # Route pages
├── plugins/      # observe.ts (scroll reveal), seo.ts
└── utils/        # page-seo.ts
server/
├── api/          # chat, planner, weather, data endpoints
└── data/         # Static JSON data per domain
i18n/locales/     # en.json, id.json
public/
├── images/       # Hero, budaya, kuliner, wisata, etc.
└── audio/        # sejarah & sumbu narration mp3s
```
