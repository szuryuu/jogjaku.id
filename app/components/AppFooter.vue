<script setup lang="ts">
const heritageRoutes = ["sejarah", "budaya"];
const discoverRoutes = ["wisata", "kuliner"];
const futureRoutes = ["pendidikan", "teknologi"];
const axisRoutes = ["peta", "filosofi"];
</script>

<template>
  <footer
    class="bg-[#1a1208] text-[#faf7f2]/70 border-t-[3px] border-[#b8491f] relative z-50 transition-none"
  >
    <!-- Top 5-col grid -->
    <div
      class="foot-grid px-5 lg:px-[60px] pt-16 pb-14 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 border-b border-[#faf7f2]/10"
    >
      <!-- Col 1: Brand (2fr) -->
      <div class="flex flex-col gap-6 text-center md:text-left">
        <NuxtLink
          to="/"
          class="font-libre text-[24px] font-normal tracking-[0.04em] text-[#faf7f2]"
        >
          <em class="italic text-[#b8491f]">Jogja</em>Ku —
          <span class="text-[18px] opacity-90">{{
            $t("footer.portal_tagline")
          }}</span>
        </NuxtLink>
        <p
          class="font-josefin text-[13.5px] font-light leading-relaxed tracking-wider text-stone-300 max-w-[38ch] mx-auto md:mx-0"
        >
          {{ $t("footer.description") }}
        </p>
      </div>

      <!-- Col 2: Heritage (1fr) -->
      <div
        class="flex flex-col gap-4 font-josefin text-[11px] font-semibold uppercase tracking-[0.2em] text-center md:text-left"
      >
        <span class="text-stone-300">{{ $t("footer.col_heritage") }}</span>
        <NuxtLink
          v-for="item in heritageRoutes"
          :key="item"
          :to="`/${item}/`"
          class="hover:text-[#b8491f] transition-colors"
        >
          {{ $t(`nav.${item}`) }}
        </NuxtLink>
      </div>

      <!-- Col 3: Discover (1fr) -->
      <div
        class="flex flex-col gap-4 font-josefin text-[11px] font-semibold uppercase tracking-[0.2em] text-center md:text-left"
      >
        <span class="text-stone-300">{{ $t("footer.col_discover") }}</span>
        <NuxtLink
          v-for="item in discoverRoutes"
          :key="item"
          :to="`/${item}/`"
          class="hover:text-[#b8491f] transition-colors"
        >
          {{ $t(`nav.${item}`) }}
        </NuxtLink>
      </div>

      <!-- Col 4: Future (1fr) -->
      <div
        class="flex flex-col gap-4 font-josefin text-[11px] font-semibold uppercase tracking-[0.2em] text-center md:text-left"
      >
        <span class="text-stone-300">{{ $t("footer.col_future") }}</span>
        <NuxtLink
          v-for="item in futureRoutes"
          :key="item"
          :to="`/${item}/`"
          class="hover:text-[#b8491f] transition-colors"
        >
          {{ $t(`nav.${item}`) }}
        </NuxtLink>
      </div>

      <!-- Col 5: Axis (1fr) -->
      <div
        class="flex flex-col gap-4 font-josefin text-[11px] font-semibold uppercase tracking-[0.2em] text-center md:text-left"
      >
        <span class="text-stone-300">{{ $t("footer.col_axis") }}</span>
        <NuxtLink
          v-for="item in axisRoutes"
          :key="item"
          :to="`/${item}/`"
          class="hover:text-[#b8491f] transition-colors"
          :class="
            item === 'filosofi'
              ? 'text-[#faf7f2] underline decoration-terra decoration-2 underline-offset-4'
              : ''
          "
        >
          {{ $t(`nav.${item}`) }}
        </NuxtLink>
      </div>
    </div>

    <!-- Mega wordmark -->
    <div
      v-observe
      class="reveal-mega border-t border-[#faf7f2]/10 overflow-x-hidden pt-10 pb-8"
    >
      <div
        class="foot-mega-text font-libre font-bold text-[clamp(48px,13vw,200px)] tracking-[-0.04em] leading-[1.05] text-[#faf7f2] text-center md:text-left px-5 lg:px-[60px]"
      >
        <em class="italic text-[#b8491f]">Jogja</em>Ku.
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="foot-bottom px-4 sm:px-5 lg:px-[60px] py-[22px] flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[#faf7f2]/10 font-josefin text-[9px] sm:text-[10px] font-light uppercase tracking-[0.15em] text-stone-300"
    >
      <div class="flex items-center gap-2">
        <span class="pulse-dot inline-block w-2 h-2 rounded-full bg-[#b8491f]"></span>
        <span class="text-[#faf7f2] font-semibold">JogjaKu</span>
        <span class="text-stone-400">· 2026 / Vol. I / Issue Nº 1</span>
      </div>
      <div class="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-stone-400">
        <span>Yogyakarta / Indonesia / Earth</span>
        <span class="hidden sm:inline">|</span>
        <span>7.7956° S · 110.3695° E</span>
        <span class="hidden sm:inline">|</span>
        <span>♥ MMXXVI</span>
      </div>
    </div>
  </footer>
</template>


