<script setup lang="ts">
import { ref } from "vue";
import { ArrowRight } from "lucide-vue-next";

defineProps<{
  volume: string;
  heroTitle: string;
  heroSubtitle: string;
  exploreUniversities: string;
  bestStudySpots: string;
}>();

const heroImageScale = ref(1.12);
const heroObjectPosition = ref("center 42%");

const handleHeroImageLoad = (event: Event) => {
  const image = event.target as HTMLImageElement;
  const container = image.parentElement;

  if (!container || !image.naturalWidth || !image.naturalHeight) return;

  const containerRatio = container.clientWidth / container.clientHeight;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const ratioGap = Math.abs(containerRatio - imageRatio);

  heroImageScale.value =
    imageRatio < containerRatio ? 1.18 : 1.12 + Math.min(ratioGap * 0.04, 0.06);
  heroObjectPosition.value =
    imageRatio < containerRatio ? "center 34%" : "center 42%";
};
</script>

<template>
  <section
    class="min-h-[100svh] pt-[88px] sm:pt-[96px] lg:pt-[120px] px-5 md:px-6 lg:px-[60px] py-16 sm:pb-20 lg:pb-16 flex items-center relative"
  >
    <div class="absolute inset-0 bg-[#1a1208] overflow-hidden">
      <AppImage
        src="/images/teknologi/ugm.jpg"
        alt="Suasana akademik Yogyakarta"
        class="w-full h-full object-cover opacity-70 transition-transform duration-700"
        :style="{
          transform: `scale(${heroImageScale})`,
          objectPosition: heroObjectPosition,
        }"
        @load="handleHeroImageLoad"
      />
      <div class="absolute inset-0 bg-[#1a1208]/45"></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-[#1a1208]/45 to-transparent"
      ></div>
      <div
        class="absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-t from-[#1a1208] via-[#1a1208]/95 to-transparent"
      ></div>
    </div>

    <div class="relative z-20 max-w-[980px] pt-12">
      <p
        v-observe
        class="reveal-up font-josefin text-[10px] font-semibold tracking-[0.28em] uppercase text-[#faf7f2]/75 mb-6"
      >
        {{ volume }}
      </p>
      <h1
        v-observe
        class="reveal-up delay-100 font-libre text-[clamp(38px,12vw,92px)] md:text-[clamp(52px,7vw,92px)] font-bold leading-[1.04] md:leading-[1.02] text-[#faf7f2] max-w-[900px] mb-6 md:mb-8"
      >
        {{ heroTitle }}
      </h1>
      <p
        v-observe
        class="reveal-up delay-200 font-libre text-[15px] sm:text-[17px] lg:text-[22px] italic leading-[1.75] lg:leading-[1.8] text-[#faf7f2]/78 max-w-[680px] border-l-[3px] border-terra pl-4 sm:pl-5 mb-8 lg:mb-10"
      >
        {{ heroSubtitle }}
      </p>
      <div
        v-observe
        class="reveal-up delay-300 flex flex-col sm:flex-row gap-4"
      >
        <a
          href="#universitas"
          class="group inline-flex items-center justify-center gap-3 bg-terra text-[#faf7f2] px-5 sm:px-7 py-4 font-josefin text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase hover:bg-[#1a1208] transition-colors duration-300"
        >
          {{ exploreUniversities }}
          <ArrowRight
            class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          />
        </a>
        <a
          href="#belajar"
          class="inline-flex items-center justify-center border border-[#faf7f2]/35 text-[#faf7f2] px-5 sm:px-7 py-4 font-josefin text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase hover:bg-[#faf7f2] hover:text-ink transition-colors duration-300"
        >
          {{ bestStudySpots }}
        </a>
      </div>
    </div>
  </section>
</template>
