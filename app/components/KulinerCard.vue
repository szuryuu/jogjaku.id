<script setup lang="ts">
import { MapPin, Banknote } from "lucide-vue-next";

defineProps<{
  item: any;
}>();
</script>

<template>
  <article class="group flex flex-col h-full">
    <div
      class="h-[240px] bg-[#1a1208] mb-6 overflow-hidden relative border border-line shadow-sm"
    >
      <AppImage
        :src="item.image"
        :alt="item.displayTitle"
        class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        loading="lazy"
      />
      <div
        class="absolute inset-0 bg-[#1a1208]/10 group-hover:bg-transparent transition-colors duration-500"
      ></div>
    </div>
    <div
      class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3 flex items-center gap-2"
    >
      {{ item.displayCategory }} <span class="text-line">|</span>
      {{ item.displayMeta }}
    </div>
    <div class="flex items-baseline justify-between gap-4 mb-3">
      <h3
        class="font-libre text-[22px] font-bold text-ink group-hover:text-terra transition-colors duration-300"
      >
        {{ item.displayTitle }}
      </h3>
      <span
        class="font-josefin text-[16px] font-bold text-terra shrink-0 whitespace-nowrap flex items-center gap-1.5"
      >
        <Banknote class="w-3.5 h-3.5" /> {{ item.displayPrice }}
      </span>
    </div>
    <p class="font-libre text-[14px] italic text-brown leading-[1.8] flex-grow mb-6">
      {{ item.displayStory }}
    </p>
    <div
      class="pt-4 border-t border-line flex items-center gap-2.5 font-josefin text-[10px] tracking-[0.15em] text-muted"
    >
      <MapPin class="w-3 h-3 text-terra shrink-0" /> {{ item.displayAddress }}
    </div>
  </article>
</template>
