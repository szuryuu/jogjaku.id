# JogjaKu

A comprehensive guide to Yogyakarta covering tourism, history, culture, cuisine, education, technology, interactive maps, and the Philosophical Axis (Sumbu Filosofi).

---

## Features

- **Immersive Scrolling Narrative**
  Ten-chapter scroll-driven storytelling with GSAP-powered animations. Each chapter covers a different facet of Yogyakarta: history, culture, philosophy, tourism, cuisine, education, technology, and interactive maps.
- **AI Travel Guide**
  Integrated Gemini-powered chatbot (`/api/chat`) answers questions about Yogyakarta destinations, cuisine, culture, and student life. Supports both Indonesian and English with locale-aware system instructions.
- **AI Itinerary Planner**
  Groq-powered itinerary generator (`/api/planner`) creates multi-day travel plans based on user interests, using only officially listed destinations.
- **Interactive Map**
  MapLibre GL and Leaflet-powered map (`/peta`) displays points of interest across all five regencies of DIY with region-level digital penetration statistics and the philosophical axis layer.
- **Cultural Database**
  Static JSON datasets covering history (10 major events from 732 AD to 2012), culture (batik, wayang, gamelan, Javanese script), cuisine (12 local dishes), universities (7 institutions), study spots, and tourism destinations.
- **Global Search**
  Fuse.js-powered fuzzy search across all sections with localized results.
- **Bilingual Support**
  Full i18n via `@nuxtjs/i18n` in Indonesian (default) and English, with `no_prefix` routing strategy.
- **PWA**
  Installable as a standalone app with offline support, custom manifest, and install prompt via `@vite-pwa/nuxt`.
- **Weather Telemetry**
  Live temperature, humidity, and conditions from OpenWeatherMap for Yogyakarta coordinates.
- **SEO & Structured Data**
  Per-page meta tags, canonical URLs, JSON-LD structured data, robots.txt, and sitemap.xml. Dark mode support via `@nuxtjs/color-mode`.

## Tech Stack

| Category            | Technologies                                  |
| :------------------ | :-------------------------------------------- |
| **Framework**       | Nuxt 4, Vue 3                                 |
| **Styling**         | TailwindCSS 4                                 |
| **Animation**       | GSAP (ScrollTrigger, Observer)                |
| **Maps**            | MapLibre GL, Leaflet, Leaflet.markercluster   |
| **Search**          | Fuse.js                                       |
| **AI / LLM**        | Google Gemini (`@google/generative-ai`), Groq |
| **PWA**             | `@vite-pwa/nuxt`                              |
| **i18n**            | `@nuxtjs/i18n`                                |
| **Icons**           | Lucide Vue Next                               |
| **Package Manager** | pnpm                                          |
| **Dev Environment** | Nix flake (Node 22, pnpm)                     |

## Setup Instructions

### Prerequisites

- **Node.js** 22 or later
- **pnpm** (or use the Nix flake: `nix develop`)

### Step 1: Clone the Repository

```bash
git clone <repo-url>
cd jogjaku.id
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Configure Environment

Copy the example environment file and fill in the API keys:

```bash
cp .env.example .env
```

Edit `.env` with your keys:

```env
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
```

| Variable              | Required | Purpose                        |
| :-------------------- | :------- | :----------------------------- |
| `GEMINI_API_KEY`      | AI chat  | Gemini-powered travel guide    |
| `GROQ_API_KEY`        | Planner  | Groq-powered itinerary planner |
| `OPENWEATHER_API_KEY` | Weather  | Weather telemetry widget       |

The application functions without these keys. The AI chat, itinerary planner, and weather widget show fallback states when keys are missing.

### Step 4: Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000`.

### Build for Production

```bash
pnpm build
pnpm preview
```

### Generate Static Site

```bash
pnpm generate
```

Pre-rendered routes: `/`, `/sejarah/`, `/budaya/`, `/kuliner/`, `/wisata/`, `/pendidikan/`, `/teknologi/`, `/peta/`, `/filosofi/`.

### Format Code

```bash
pnpm format
```
