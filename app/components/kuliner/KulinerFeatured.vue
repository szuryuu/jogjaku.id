<script setup lang="ts">
import { MapPin, Banknote } from "lucide-vue-next";

defineProps<{
  item: any;
}>();
</script>

<template>
  <section
    v-observe
    class="mt-12 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start reveal-up delay-100"
  >
    <div
      class="aspect-[4/3] lg:aspect-[3/4] bg-[#1a1208] relative overflow-hidden group shadow-2xl border border-line"
    >
      <AppImage
        :src="item.image"
        :alt="item.displayTitle"
        class="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div
        class="absolute top-4 left-4 z-10 font-josefin text-[9px] uppercase tracking-widest text-[#faf7f2]/90 bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1 border border-[#faf7f2]/10"
      >
        {{ $t("kuliner.traditional_mataram") }}
      </div>
    </div>
    <div class="flex flex-col justify-center lg:pt-8">
      <div
        class="font-josefin text-[11px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
      >
        {{ item.displayMeta }}
      </div>
      <h2
        class="font-libre text-[36px] lg:text-[52px] font-bold text-ink mb-8 leading-[1.1]"
      >
        {{ item.displayTitle }}
      </h2>
      <blockquote
        class="text-[18px] lg:text-[22px] font-light text-brown leading-[1.8] mb-10 italic border-l-[3px] border-terra pl-6 py-1"
      >
        "{{ item.displayStory }}"
      </blockquote>
      <div
        class="flex flex-col gap-4 pt-8 border-t border-line font-josefin text-[11px] tracking-[0.15em] text-muted"
      >
        <div class="flex items-center gap-3">
          <MapPin class="w-3.5 h-3.5 text-terra shrink-0" />
          {{ item.displayAddress }}
        </div>
        <div class="flex items-center gap-3">
          <Banknote class="w-3.5 h-3.5 text-terra shrink-0" />
          {{ item.displayPrice }}
        </div>
      </div>
    </div>
  </section>
</template>
