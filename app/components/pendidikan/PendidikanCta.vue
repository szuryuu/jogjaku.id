<script setup lang="ts">
defineProps<{
  ctaCategory: string;
  ctaTitle: string;
  ctaSubtitle: string;
  exploreCity: string;
  studentGuide: string;
}>();
</script>

<template>
  <section
    class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32 relative overflow-hidden"
  >
    <div class="absolute inset-0 bg-[#1a1208]">
      <AppImage
        src="/images/home/Malioboro_Street_Yogyakarta.jpg"
        alt="Kehidupan kota Yogyakarta"
        class="w-full h-full object-cover opacity-45"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-[#1a1208]/55"></div>
    </div>
    <div
      v-observe
      class="reveal-up relative z-10 max-w-[760px] mx-auto text-center py-10"
    >
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-6"
      >
        {{ ctaCategory }}
      </div>
      <h2
        class="font-libre text-[clamp(36px,5vw,68px)] font-bold text-[#faf7f2] leading-[1.08] mb-6"
      >
        {{ ctaTitle }}
      </h2>
      <p
        class="font-libre text-[17px] lg:text-[20px] italic leading-[1.8] text-[#faf7f2]/75 mb-10"
      >
        {{ ctaSubtitle }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink
          to="/wisata/"
          class="inline-flex items-center justify-center bg-terra text-[#faf7f2] px-7 py-4 font-josefin text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#faf7f2] hover:text-ink transition-colors duration-300"
        >
          {{ exploreCity }}
        </NuxtLink>
        <a
          href="#belajar"
          class="inline-flex items-center justify-center border border-[#faf7f2]/35 text-[#faf7f2] px-7 py-4 font-josefin text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#faf7f2] hover:text-ink transition-colors duration-300"
        >
          {{ studentGuide }}
        </a>
      </div>
    </div>
  </section>
</template>
