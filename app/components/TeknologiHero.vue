<template>
  <div
    v-observe
    class="w-full h-[30vh] lg:h-[40vh] mt-10 mb-16 relative overflow-hidden reveal-up delay-100 border border-line shadow-xl bg-[#1a1208]"
  >
    <AppImage
      src="/images/teknologi/ugm.jpg"
      alt="Pusat Pendidikan UGM"
      class="w-full h-full object-cover grayscale-[60%] opacity-85 transition-none"
      loading="lazy"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-[#1a1208]/85 via-[#1a1208]/25 to-transparent transition-none z-10"
    ></div>
    <!-- ponytail: blueprint grid overlay — CSS repeating-linear-gradient, no canvas/SVG -->
    <div
      class="absolute inset-0 z-[15] pointer-events-none"
      style="background-image: repeating-linear-gradient(0deg, rgba(250,247,242,0.07) 0px, rgba(250,247,242,0.07) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(250,247,242,0.07) 0px, rgba(250,247,242,0.07) 1px, transparent 1px, transparent 40px);"
    ></div>
    <!-- Technical diagram label -->
    <div class="absolute bottom-6 left-6 z-20 transition-none flex items-end gap-3">
      <!-- ponytail: leader bracket → blueprint reference line aesthetic -->
      <div class="shrink-0 w-8 border-t border-[#faf7f2]/55 mb-[7px]"></div>
      <div>
        <div
          class="font-josefin text-[9px] tracking-[0.22em] text-[#faf7f2]/65 uppercase font-light mb-1.5"
        >
          {{ $t("teknologi.ecosystem_node") }}
        </div>
        <div class="font-libre text-[20px] text-[#faf7f2] font-bold">
          Universitas Gadjah Mada
        </div>
      </div>
    </div>
  </div>
</template>
