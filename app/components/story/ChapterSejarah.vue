<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

const { t } = useI18n();
</script>

<template>
  <StoryChapter
    chapter-number="I"
    chapter-label="SEJARAH"
    variant="staggered"
    :data-chapter="1"
    class="!pt-0"
  >
    <!-- ponytail: vertical stripe motif behind text -->
    <div class="absolute left-0 top-0 bottom-0 w-[55vw] pointer-events-none opacity-10" aria-hidden="true">
      <div class="h-full w-full" style="background-image: repeating-linear-gradient(90deg, #b8491f 0, #b8491f 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, #b8491f 0, #b8491f 0.5px, transparent 0.5px, transparent 6px)" />
    </div>
    <div class="stagger-text max-w-[480px] reveal-up">
      <h2 class="font-libre text-[clamp(1.8rem,4.2vw,3.4rem)] max-w-[18ch] leading-[1.15]">
        {{ t("home.editorial.sejarah.desc") }}
      </h2>
      <NuxtLink
        to="/sejarah"
        class="cta-link inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
      >
        Jelajahi Sejarah →
      </NuxtLink>
    </div>
    <div class="parallax-img reveal-up delay-100 w-[40%] max-w-[480px] h-[50vh] shrink-0 max-md:w-full max-md:max-w-full max-md:h-[40vh]">
      <img
        src="/images/sejarah/keraton.jpg"
        alt="Kraton Yogyakarta"
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </div>
  </StoryChapter>
</template>
