<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

const { t } = useI18n();
</script>

<template>
  <StoryChapter
    chapter-number="II"
    chapter-label="BUDAYA"
    variant="focus"
    :data-chapter="2"
  >
    <div class="parallax-img reveal-up w-[min(60vw,560px)] h-[50vh]">
      <img
        src="/images/budaya/kraton.jpg"
        alt="Pusaka Budaya Yogyakarta"
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </div>
    <!-- ponytail: Kawung-inspired circles from prototype -->
    <div class="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
      <div
        class="h-full w-full"
        style="
          background:
            radial-gradient(circle at 0 0, rgba(184, 73, 31, 0.03) 25px, transparent 26px),
            radial-gradient(circle at 100% 100%, rgba(184, 73, 31, 0.03) 25px, transparent 26px);
          background-size: 80px 80px;
        "
      />
    </div>
    <div class="text-box reveal-up delay-100 relative z-2 bg-parchment p-10 max-w-[420px] text-center shadow-[0_30px_60px_rgba(0,0,0,0.12)] -mt-8">
      <h3 class="font-libre text-[1.6rem] mb-3">
        {{ t("home.editorial.budaya.title") }}
      </h3>
      <p class="font-lato text-[0.95rem] leading-relaxed opacity-75 max-w-[34ch] mx-auto">
        {{ t("home.editorial.budaya.desc") }}
      </p>
      <NuxtLink
        to="/budaya"
        class="cta-link inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4"
      >
        {{ t('home.story.budaya.cta') }} →
      </NuxtLink>
    </div>
  </StoryChapter>
</template>
