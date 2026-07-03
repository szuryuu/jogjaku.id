<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

/* ponytail: education chapter pulls heroTitle/heroSubtitle from pendidikan.vue's
   pageCopy object instead of i18n, since no home.editorial.pendidikan key exists. */

const pageCopy = {
  heroTitle: "Yogyakarta — Kota Pelajar Indonesia",
  heroSubtitle:
    "Ribuan mahasiswa dari seluruh Nusantara menemukan semangat belajar, berdiskusi, dan berkarya di kota ini.",
};
</script>

<template>
  <StoryChapter
    chapter-number="VI"
    chapter-label="PENDIDIKAN"
    variant="center"
    :data-chapter="6"
  >
    <div class="parallax-img absolute inset-0 z-0 opacity-35 blur-[3px]">
      <img
        src="/images/teknologi/ugm.jpg"
        alt="Kampus UGM Yogyakarta"
        width="1920"
        height="1080"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="reveal-up relative z-1 flex flex-col items-center">
      <h2 class="font-libre text-[clamp(1.8rem,4.2vw,3.4rem)] max-w-[22ch] leading-[1.35]">
        {{ pageCopy.heroSubtitle }}
      </h2>
      <NuxtLink
        to="/pendidikan"
        class="cta-link inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
      >
        Lihat Ekosistem Pendidikan →
      </NuxtLink>
    </div>
  </StoryChapter>
</template>
