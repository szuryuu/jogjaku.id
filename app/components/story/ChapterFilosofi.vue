<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

const { t } = useI18n();
</script>

<template>
  <StoryChapter
    chapter-number="III"
    chapter-label="SUMBU FILOSOFI"
    variant="center"
    :data-chapter="3"
  >
    <div class="parallax-img absolute inset-0 z-0 opacity-35 blur-[3px]">
      <img
        src="/images/home/parangtritis.jpg"
        alt="Garis imajiner Kraton–Tugu–Parangtritis"
        width="1920"
        height="1080"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </div>
    <h2 class="reveal-up relative z-1 font-libre text-[clamp(1.8rem,4vw,3rem)] max-w-[20ch]">
      {{ t("home.editorial.sumbu.desc") }}
    </h2>
    <NuxtLink
      to="/filosofi"
      class="cta-link reveal-up delay-100 relative z-1 inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
    >
      Pahami Sumbu Filosofi →
    </NuxtLink>
  </StoryChapter>
</template>
