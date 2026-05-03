import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  modules: ["@nuxtjs/i18n", "@vite-pwa/nuxt", "@nuxtjs/color-mode"],

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  i18n: {
    strategy: "no_prefix",
    locales: [
      { code: "id", name: "Indonesia", file: "id.json" },
      { code: "en", name: "English", file: "en.json" },
    ],
    defaultLocale: "id",
    langDir: "locales/",
  },

  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY,
    groqApiKey: process.env.GROQ_API_KEY,
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  },

  pwa: {
    registerType: "prompt",
    manifest: {
      name: "Jiwa Nusantara — Yogyakarta",
      short_name: "Yogyakarta.id",
      theme_color: "#faf7f2",
      background_color: "#faf7f2",
      display: "standalone",
      orientation: "portrait",
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff2}"],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    client: {
      installPrompt: true,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "id" },
      title: "JogjaKu — Pusaka Jiwa Mataram",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content:
            "Portal panduan wisata, sejarah, budaya, kuliner, dan teknologi Kota Yogyakarta.",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&family=Josefin+Sans:wght@300;400;600&family=Noto+Sans+Javanese:wght@400;700&display=swap",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
    },
  },

  nitro: {
    prerender: {
      routes: [
        "/",
        "/sejarah",
        "/budaya",
        "/kuliner",
        "/wisata",
        "/teknologi",
        "/peta",
        "/filosofi",
      ],
      crawlLinks: true,
    },
    serverAssets: [{ baseName: "data", dir: "./server/data" }],
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
