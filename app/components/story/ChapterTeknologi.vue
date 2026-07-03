<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

const { t } = useI18n();
</script>

<template>
  <StoryChapter
    chapter-number="VII"
    chapter-label="TEKNOLOGI"
    variant="typographic"
    :data-chapter="7"
  >
    <div class="parallax-img absolute inset-0 z-0 opacity-35 blur-[3px]">
      <img
        src="/images/home/Stasiun_Tugu_Yogyakarta.jpg"
        alt="Stasiun Tugu Yogyakarta"
        width="1920"
        height="1080"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </div>
    <h2 class="reveal-up font-josefin font-semibold text-[clamp(2rem,6vw,4.5rem)] leading-[1.15] tracking-[-0.01em]">
      {{ t("home.editorial.teknologi.title").toUpperCase() }}
    </h2>
    <p class="reveal-up delay-100 font-lato text-[0.95rem] leading-relaxed opacity-75 max-w-[34ch] mx-auto mt-6">
      {{ t("home.editorial.teknologi.desc") }}
    </p>
    <NuxtLink
      to="/teknologi"
      class="cta-link reveal-up delay-200 inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
    >
      Baca Selengkapnya →
    </NuxtLink>
  </StoryChapter>
</template>
