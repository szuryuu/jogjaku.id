import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.NODE_ENV === "development" },
  css: ["~/assets/css/main.css"],

  modules: ["@nuxtjs/i18n", "@vite-pwa/nuxt", "@nuxtjs/color-mode"],

  colorMode: {
    classSuffix: "",
    preference: "light",
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
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://jogjaku.id",
    },
  },

  pwa: {
    injectRegister: "script-defer",
    registerType: "prompt",
    manifest: {
      name: "JogjaKu — Pusaka Jiwa Mataram",
      short_name: "JogjaKu",
      theme_color: "#faf7f2",
      background_color: "#faf7f2",
      display: "standalone",
      orientation: "portrait",
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      runtimeCaching: [],
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
          rel: "preload",
          as: "image",
          href: "/images/home/Tugu_Jogja-hero-sm.webp",
          type: "image/webp",
          media: "(max-width: 768px)",
          fetchpriority: "high",
        },
        {
          rel: "preload",
          as: "image",
          href: "/images/home/Tugu_Jogja-hero.webp",
          type: "image/webp",
          media: "(min-width: 769px)",
          fetchpriority: "high",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
      script: [
        {
          src: "https://analytics.ahrefs.com/analytics.js",
          "data-key": "QxxH32F25vSb6kZY0Fxm2w",
          async: true,
        },
      ],
    },
  },

  nitro: {
    compressPublicAssets: true,
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
    routeRules: {
      "/images/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      },
      "/_nuxt/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "gsap",
        "gsap/Observer",
        "lucide-vue-next",
        "fuse.js",
        "maplibre-gl", // CJS
        "leaflet", // CJS
        "leaflet.markercluster", // CJS
      ],
    },
  },
});
