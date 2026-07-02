<script setup lang="ts">
import StoryChapter from "./StoryChapter.vue";

const { t } = useI18n();
</script>

<template>
  <StoryChapter
    chapter-number="IV"
    chapter-label="WISATA"
    variant="staggered"
    reverse
    :data-chapter="4"
  >
    <div class="stagger-text max-w-[480px] reveal-up text-right">
      <h2 class="font-libre text-[clamp(1.8rem,4.2vw,3.4rem)] max-w-[18ch] leading-[1.15]">
        {{ t("home.editorial.wisata.desc") }}
      </h2>
      <NuxtLink
        to="/wisata"
        class="cta-link inline-flex items-center gap-[0.6rem] font-josefin text-xs tracking-[0.15em] uppercase text-terra mt-6 pb-[0.3rem] border-b border-terra transition-all duration-300 hover:gap-4 focus-visible:gap-4 flex-row-reverse"
      >
        Buka Peta Wisata →
      </NuxtLink>
    </div>
    <div class="parallax-img reveal-up delay-100 w-[40%] max-w-[480px] h-[50vh] shrink-0 max-md:w-full max-md:max-w-full max-md:h-[40vh]">
      <img
        src="/images/wisata/prambanan.jpg"
        alt="Candi Prambanan"
        width="800"
        height="600"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover"
      />
    </div>
  </StoryChapter>
</template>
