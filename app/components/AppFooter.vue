<script setup lang="ts">
const routes = [
  "sejarah",
  "budaya",
  "kuliner",
  "wisata",
  "pendidikan",
  "teknologi",
  "peta",
  "filosofi",
];
</script>

<template>
  <footer
    class="bg-[#1a1208] text-[#faf7f2]/70 border-t-[3px] border-[#b8491f] relative z-50 transition-none"
  >
    <div
      class="px-5 lg:px-[60px] py-16 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#faf7f2]/10"
    >
      <div class="md:col-span-5 flex flex-col gap-6 text-center md:text-left">
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
          class="font-josefin text-[12px] font-light leading-relaxed tracking-wider text-stone-300 max-w-sm mx-auto md:mx-0"
        >
          {{ $t("footer.description") }}
        </p>
      </div>

      <div
        class="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 font-josefin text-[11px] font-semibold uppercase tracking-[0.2em] text-center md:text-left"
      >
        <div class="flex flex-col gap-4">
          <span class="text-stone-300">Eksplorasi</span>
          <NuxtLink
            v-for="item in routes.slice(0, 3)"
            :key="item"
            :to="`/${item}`"
            class="hover:text-[#b8491f] transition-colors"
          >
            {{ $t(`nav.${item}`) }}
          </NuxtLink>
        </div>

        <div class="flex flex-col gap-4">
          <span class="text-stone-300">Sistem</span>
          <NuxtLink
            v-for="item in routes.slice(3)"
            :key="item"
            :to="`/${item}`"
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

        <div class="flex flex-col gap-4">
          <span class="text-stone-300">Impactora</span>
          <span class="text-stone-400 tracking-[0.3em] block mt-1">MMXXVI</span>
          <div class="w-8 h-px bg-terra opacity-50 mx-auto md:mx-0"></div>
        </div>
      </div>
    </div>

    <div
      class="px-5 lg:px-[60px] py-6 flex justify-between items-center font-josefin text-[10px] font-light uppercase tracking-[0.15em] text-stone-300"
    >
      <span>&copy; 2026 JogjaKu.</span>
      <span class="text-stone-400">VOL. I YOGYAKARTA</span>
    </div>
  </footer>
</template>
