<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

const { t } = useI18n();
</script>

<template>
  <StoryChapter
    chapter-number="V"
    chapter-label="KULINER"
    variant="focus"
    :data-chapter="5"
  >
    <div class="flex gap-6 items-center">
      <div class="parallax-img reveal-up delay-100 w-[24vh] h-[24vh] rounded-full overflow-hidden mb-4">
        <img
          src="/images/kuliner/bakpia.jpg"
          alt="Bakpia — jajanan khas Yogyakarta"
          width="600"
          height="600"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="parallax-img reveal-up w-[32vh] h-[32vh] rounded-full overflow-hidden">
        <img
          src="/images/kuliner/gudeg.jpg"
          alt="Gudeg — kuliner khas Yogyakarta"
          width="600"
          height="600"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="parallax-img reveal-up delay-200 w-[24vh] h-[24vh] rounded-full overflow-hidden mt-8">
        <img
          src="/images/kuliner/kopi-joss.jpg"
          alt="Kopi Joss — kopi arang khas Yogyakarta"
          width="600"
          height="600"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <div class="text-box reveal-up delay-100 relative z-2 bg-parchment p-10 max-w-[420px] text-center shadow-[0_30px_60px_rgba(0,0,0,0.12)] -mt-8">
      <h3 class="font-libre text-[1.6rem] mb-3">
        {{ t("home.editorial.kuliner.title") }}
      </h3>
      <p class="font-lato text-[0.95rem] leading-relaxed opacity-75 max-w-[34ch] mx-auto">
        {{ t("home.editorial.kuliner.desc") }}
      </p>
      <NuxtLink
        to="/kuliner"
        class="cta-link inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
      >
        Eksplorasi Gastronomi →
      </NuxtLink>
    </div>
  </StoryChapter>
</template>
