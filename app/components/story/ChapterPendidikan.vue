<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

/* ponytail: education chapter pulls heroTitle/heroSubtitle from pendidikan.vue's
   pageCopy object instead of i18n, since no home.editorial.pendidikan key exists. */

const pageCopy = {
  heroTitle: "Yogyakarta — Kota Pelajar Indonesia",
  heroSubtitle:
    "Rumah bagi ribuan mahasiswa dari seluruh Indonesia dengan budaya belajar, kreativitas, dan kehidupan akademik yang hidup.",
};
</script>

<template>
  <StoryChapter
    chapter-number="VI"
    chapter-label="PENDIDIKAN"
    variant="staggered"
    :data-chapter="6"
  >
    <div class="stagger-text max-w-[480px] reveal-up">
      <h2 class="font-libre text-[clamp(1.8rem,4.2vw,3.4rem)] max-w-[18ch] leading-[1.15]">
        {{ pageCopy.heroSubtitle }}
      </h2>
      <NuxtLink
        to="/pendidikan"
        class="cta-link inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
      >
        Lihat Ekosistem Pendidikan →
      </NuxtLink>
    </div>
    <div class="parallax-img reveal-up delay-100 w-[40%] max-w-[480px] h-[50vh] shrink-0 max-md:w-full max-md:max-w-full max-md:h-[40vh]">
      <img
        src="/images/teknologi/ugm.jpg"
        alt="Kampus UGM Yogyakarta"
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </div>
  </StoryChapter>
</template>
