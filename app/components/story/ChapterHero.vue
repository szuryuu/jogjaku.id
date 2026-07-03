<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

const { t } = useI18n();
</script>

<template>
  <StoryChapter
    chapter-number="0"
    chapter-label="MULAI"
    variant="center"
    :data-chapter="0"
    class="!h-dvh !min-h-0"
  >
    <picture class="parallax-img absolute inset-0 z-0 opacity-35 blur-[3px]">
      <source
        type="image/webp"
        srcset="
          /images/home/Tugu_Jogja-hero-sm.webp  960w,
          /images/home/Tugu_Jogja-hero.webp    1920w
        "
        sizes="100vw"
      />
      <img
        src="/images/home/Tugu_Jogja-hero.jpg"
        srcset="
          /images/home/Tugu_Jogja-hero-sm.jpg  960w,
          /images/home/Tugu_Jogja-hero.jpg    1920w
        "
        sizes="100vw"
        alt="Tugu Yogyakarta"
        width="1920"
        height="1080"
        fetchpriority="high"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </picture>

    <h1 class="reveal-up font-libre italic text-terra text-[clamp(2.5rem,8vw,6.5rem)] mb-6">
      {{ t("home.hero.title") }}
    </h1>
    <p class="reveal-up delay-100 font-lato text-base leading-relaxed opacity-75 max-w-[34ch]">
      {{ t("home.hero.subtitle") }}
    </p>
    <div class="reveal-up delay-200 absolute bottom-[4vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
      <span class="font-josefin text-[9px] tracking-[0.3em] uppercase opacity-60">Scroll</span>
      <div class="w-px h-10 bg-ink/20 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full bg-terra animate-[scrollcue_1.8s_ease-in-out_infinite]" />
      </div>
    </div>
  </StoryChapter>
</template>

<style scoped>
@keyframes scrollcue {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
</style>
