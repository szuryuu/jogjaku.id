<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";
import { useLocaleToggle } from "~/composables/useLocaleToggle";

const { t } = useI18n();
const { locale, toggleLanguage } = useLocaleToggle();

const links = [
  { to: "/sejarah", key: "nav.sejarah" },
  { to: "/budaya", key: "nav.budaya" },
  { to: "/filosofi", key: "nav.filosofi" },
  { to: "/wisata", key: "nav.wisata" },
  { to: "/kuliner", key: "nav.kuliner" },
  { to: "/pendidikan", key: "nav.pendidikan" },
  { to: "/teknologi", key: "nav.teknologi" },
  { to: "/peta", key: "nav.peta" },
];
</script>

<template>
  <StoryChapter
    chapter-number="IX"
    chapter-label="MATUR NUWUN"
    variant="center"
    is-dark
    :data-chapter="9"
  >
    <!-- ponytail: diagonal crosshatch motif, CSS-only -->
    <div
      class="absolute inset-0 pointer-events-none opacity-10"
      aria-hidden="true"
    >
      <div
        class="h-full w-full"
        style="
          background-image:
            repeating-linear-gradient(
              45deg,
              #b8491f 0,
              #b8491f 1px,
              transparent 1px,
              transparent 32px
            ),
            repeating-linear-gradient(
              -45deg,
              #b8491f 0,
              #b8491f 1px,
              transparent 1px,
              transparent 32px
            );
        "
      />
    </div>
    <h2 class="reveal-up font-libre italic text-[clamp(1.8rem,4.2vw,3.4rem)]">
      {{ t('home.story.closing.heading') }}
    </h2>
    <p
      class="reveal-up delay-100 font-lato text-[0.95rem] leading-relaxed opacity-75 max-w-[34ch] mt-4"
    >
      {{ t('home.story.closing.lede') }}
    </p>
    <nav
      class="reveal-up delay-200 closing-links grid grid-cols-4 max-md:grid-cols-2 gap-px bg-white/10 mt-12 w-[min(70vw,800px)]"
      :aria-label="t('home.story.closing.aria_label')"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="bg-ink py-[1.2rem] px-4 no-underline font-josefin text-[0.8rem] tracking-[0.05em] text-center transition-all duration-300 hover:bg-terra hover:text-white focus-visible:bg-terra focus-visible:text-white"
      >
        {{ t(link.key) }}
      </NuxtLink>
    </nav>
    <div
      class="reveal-up delay-300 flex gap-3 mt-8"
      role="group"
      aria-label="Pilih bahasa"
    >
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
  </StoryChapter>
</template>
