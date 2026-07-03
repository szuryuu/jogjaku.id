<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

const { t } = useI18n();
</script>

<template>
  <StoryChapter
    chapter-number="VIII"
    chapter-label="PETA"
    variant="staggered"
    :data-chapter="8"
  >
    <!-- ponytail: Jogja map motif — grid + scattered landmark dots -->
    <div class="absolute inset-y-0 right-0 w-[55vw] pointer-events-none opacity-10" aria-hidden="true">
      <div class="h-full w-full" style="background:
        /* street grid */
        linear-gradient(#b8491f 1px, transparent 1px) 0 0 / 40px 40px,
        linear-gradient(90deg, #b8491f 1px, transparent 1px) 0 0 / 40px 40px,
        /* organic alley (diagonal path) */
        repeating-linear-gradient(22deg, transparent 0, transparent 79px, #b8491f 79px, #b8491f 80px, transparent 80px, transparent 160px),
        /* landmarks (larger dots in a loose cluster) */
        radial-gradient(circle at 60% 30%, #b8491f 4px, transparent 4px),
        radial-gradient(circle at 52% 45%, #b8491f 4px, transparent 4px),
        radial-gradient(circle at 68% 42%, #b8491f 5px, transparent 5px),
        radial-gradient(circle at 55% 58%, #b8491f 3px, transparent 3px),
        radial-gradient(circle at 72% 65%, #b8491f 4px, transparent 4px),
        radial-gradient(circle at 42% 72%, #b8491f 4px, transparent 4px),
        radial-gradient(circle at 64% 78%, #b8491f 5px, transparent 5px),
        radial-gradient(circle at 78% 55%, #b8491f 3px, transparent 3px),
        radial-gradient(circle at 35% 50%, #b8491f 4px, transparent 4px)
      " />
    </div>
    <div class="stagger-text max-w-[480px] reveal-up">
      <h2 class="font-libre text-[clamp(1.8rem,4.2vw,3.4rem)] max-w-[18ch] leading-[1.15]">
        {{ t("home.editorial.peta.desc") }}
      </h2>
      <NuxtLink
        to="/peta"
        class="cta-link inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
      >
        Buka Peta Interaktif →
      </NuxtLink>
    </div>
    <div class="parallax-img reveal-up delay-100 w-[40%] max-w-[480px] h-[50vh] shrink-0 max-md:w-full max-md:max-w-full max-md:h-[40vh]">
      <img
        src="/images/home/Malioboro_Street_Yogyakarta.jpg"
        alt="Malioboro — teaser statis peta Yogyakarta"
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </div>
  </StoryChapter>
</template>
