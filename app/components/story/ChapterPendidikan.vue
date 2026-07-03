<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

const { t } = useI18n();
</script>

<template>
  <StoryChapter
    chapter-number="VI"
    :chapter-label="t('nav.pendidikan')"
    variant="typographic"
    :data-chapter="6"
  >
    <!-- ponytail: cinematic vignette fade from prototype -->
    <div
      class="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style="
        background: radial-gradient(
          circle at center,
          transparent 30%,
          rgba(26, 18, 8, 0.5) 100%
        );
      "
    />
    <h2
      class="reveal-up font-josefin font-semibold text-[clamp(2rem,6vw,4.5rem)] leading-[1.15] tracking-[-0.01em]"
    >
      {{ t('home.story.pendidikan.title') }}
    </h2>
    <p class="reveal-up delay-100 lede mt-6 max-w-[42ch] mx-auto">
      {{ t('home.story.pendidikan.subtitle') }}
    </p>
    <NuxtLink
      to="/pendidikan"
      class="cta-link reveal-up delay-200 inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
    >
      {{ t('home.story.pendidikan.cta') }} →
    </NuxtLink>
  </StoryChapter>
</template>
