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
    <!-- ponytail: vertical timeline threads -->
    <div class="absolute inset-0 pointer-events-none opacity-100" aria-hidden="true">
      <div
        class="h-full w-full"
        style="
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 39px,
            rgba(184, 73, 31, 0.1) 39px,
            rgba(184, 73, 31, 0.1) 40px
          );
        "
      />
    </div>
    <div class="stagger-text max-w-[480px] reveal-up">
      <h2 class="font-libre text-[clamp(1.8rem,4.2vw,3.4rem)] max-w-[18ch] leading-[1.15]">
        {{ t("home.editorial.sejarah.desc") }}
      </h2>
      <NuxtLink
        to="/sejarah"
        class="cta-link inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
      >
        {{ t('home.story.sejarah.cta') }} →
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
