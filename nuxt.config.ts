import tailwindcss from "@tailwindcss/vite";

const env = import.meta.env;
const siteUrl = env.NUXT_PUBLIC_SITE_URL || "https://jogjaku.id";
const siteName = "JogjaKu";
const siteDescription =
  "Panduan lengkap Yogyakarta untuk wisata, sejarah, budaya, kuliner, pendidikan, teknologi, peta interaktif, dan Sumbu Filosofi.";
const indexedRoutes = [
  "/",
  "/sejarah",
  "/budaya",
  "/kuliner",
  "/wisata",
  "/pendidikan",
  "/teknologi",
  "/peta",
  "/filosofi",
];

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: env.NODE_ENV === "development" },
  css: ["~/assets/css/main.css"],

  modules: ["@nuxtjs/i18n", "@vite-pwa/nuxt", "@nuxtjs/color-mode"],

  colorMode: {
    classSuffix: "",
    preference: "dark",
    fallback: "dark",
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
    geminiApiKey: env.GEMINI_API_KEY,
    groqApiKey: env.GROQ_API_KEY,
    openWeatherApiKey: env.OPENWEATHER_API_KEY,
    public: {
      siteUrl,
      siteName,
      siteDescription,
      indexedRoutes,
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
      title:
        "JogjaKu — Panduan Wisata, Budaya, Kuliner, dan Sejarah Yogyakarta",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: siteDescription,
        },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#faf7f2" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: siteName },
        { property: "og:locale", content: "id_ID" },
        { property: "og:title", content: "JogjaKu — Panduan Yogyakarta" },
        { property: "og:description", content: siteDescription },
        {
          property: "og:image",
          content: `${siteUrl}/images/home/Tugu_Jogja-hero.jpg`,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "JogjaKu — Panduan Yogyakarta" },
        {
          name: "twitter:description",
          content: siteDescription,
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
        { rel: "canonical", href: siteUrl },
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
      routes: indexedRoutes,
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
        "maplibre-gl",
        "leaflet",
        "leaflet.markercluster",
      ],
    },
  },
});
