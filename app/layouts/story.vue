<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useLocaleToggle } from "~/composables/useLocaleToggle";

const { locale, toggleLanguage } = useLocaleToggle();

const isNavOpen = ref(false);
const firstNavLink = ref<InstanceType<typeof NuxtLink> | null>(null);

const navLinks = [
  { to: "/sejarah", key: "nav.sejarah" },
  { to: "/budaya", key: "nav.budaya" },
  { to: "/filosofi", key: "nav.filosofi" },
  { to: "/wisata", key: "nav.wisata" },
  { to: "/kuliner", key: "nav.kuliner" },
  { to: "/pendidikan", key: "nav.pendidikan" },
  { to: "/teknologi", key: "nav.teknologi" },
  { to: "/peta", key: "nav.peta" },
];

const { t } = useI18n();

const closeNav = () => {
  isNavOpen.value = false;
};

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

// Auto-focus first link when nav opens, return focus when closed
watch(isNavOpen, async (open) => {
  if (open) {
    await nextTick();
    (firstNavLink.value?.$el as HTMLElement)?.focus();
  }
});

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isNavOpen.value) closeNav();
};

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div
    class="bg-parchment text-ink font-sans min-h-screen selection:bg-terra selection:text-white overflow-x-hidden"
  >
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-md focus:bg-terra focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-ink/30"
    >
      {{ t("home.hero.cta") || "Ke isi utama" }}
    </a>

    <!-- Floating logo -->
    <NuxtLink
      to="/"
      class="fixed top-6 left-6 z-[9998] font-libre font-bold italic text-[1.4rem] text-terra no-underline"
    >
      J
    </NuxtLink>

    <!-- Hamburger toggle -->
    <button
      class="story-nav-toggle fixed top-6 right-6 z-[9998] w-[52px] h-[52px] rounded-full bg-parchment border border-line flex items-center justify-center cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-terra focus-visible:outline-offset-[3px]"
      :aria-expanded="isNavOpen"
      aria-controls="navPanel"
      :aria-label="isNavOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'"
      @click="toggleNav"
    >
      <span
        class="block w-5 h-[1.5px] bg-ink relative transition-all duration-300"
        :class="isNavOpen ? 'bg-transparent' : ''"
      >
        <span
          class="absolute left-0 w-5 h-[1.5px] bg-ink transition-transform duration-300"
          :class="isNavOpen ? 'translate-y-[6px] rotate-45' : '-top-[6px]'"
        ></span>
        <span
          class="absolute left-0 w-5 h-[1.5px] bg-ink transition-transform duration-300"
          :class="isNavOpen ? '-translate-y-[6px] -rotate-45' : 'top-[6px]'"
        ></span>
      </span>
    </button>

    <!-- Scrim -->
    <div
      class="fixed inset-0 bg-black/30 z-[9996] transition-opacity duration-400"
      :class="isNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      @click="closeNav"
    ></div>

    <!-- Slide-in nav panel -->
    <nav
      id="navPanel"
      class="fixed top-0 right-0 h-full w-[min(400px,100vw)] bg-ink text-parchment z-[9997] py-28 px-12 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]"
      :class="isNavOpen ? 'translate-x-0' : 'translate-x-full'"
      :aria-hidden="!isNavOpen"
    >
      <div>
        <p class="font-josefin text-[0.7rem] tracking-[0.3em] uppercase opacity-50 mb-6">
          Jelajahi JogjaKu
        </p>
        <NuxtLink
          v-for="(link, idx) in navLinks"
          :key="link.to"
          :ref="idx === 0 ? (el: any) => firstNavLink = el : undefined"
          :to="link.to"
          class="block font-libre text-[1.6rem] py-2.5 no-underline opacity-85 border-b border-white/8 transition-all duration-200 hover:opacity-100 hover:pl-2 hover:text-terra focus-visible:opacity-100 focus-visible:pl-2 focus-visible:text-terra"
          @click="closeNav"
        >
          {{ t(link.key) }}
        </NuxtLink>
      </div>
      <div class="flex gap-3" role="group" aria-label="Pilih bahasa">
        <button
          type="button"
          class="font-josefin text-xs tracking-[0.1em] bg-none border border-white/30 text-parchment py-2 px-4 rounded-full cursor-pointer"
          :class="locale === 'id' ? 'bg-terra border-terra' : ''"
          :aria-pressed="locale === 'id'"
          @click="locale !== 'id' && toggleLanguage()"
        >
          ID
        </button>
        <button
          type="button"
          class="font-josefin text-xs tracking-[0.1em] bg-none border border-white/30 text-parchment py-2 px-4 rounded-full cursor-pointer"
          :class="locale === 'en' ? 'bg-terra border-terra' : ''"
          :aria-pressed="locale === 'en'"
          @click="locale !== 'en' && toggleLanguage()"
        >
          EN
        </button>
      </div>
    </nav>

    <!-- Progress rail -->
    <div class="progress-rail fixed right-7 top-1/2 -translate-y-1/2 z-[9995] flex flex-col gap-[0.9rem] max-md:hidden" aria-hidden="true">
      <div
        v-for="i in 10"
        :key="i"
        class="dot w-[7px] h-[7px] rounded-full bg-ink/20 transition-all duration-300 data-[active]:bg-terra data-[active]:scale-140"
        :data-index="i - 1"
        :data-active="i === 1 ? '' : undefined"
      ></div>
    </div>

    <main id="main-content" class="w-full">
      <slot />
    </main>

    <AiGuideWidget class="print:hidden" />
    <AppToast class="print:hidden" />
  </div>
</template>
