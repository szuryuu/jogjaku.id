<script setup lang="ts">
import type { Component } from "vue";

interface CreativeCultureItem {
  displayTitle: string;
  displayDesc: string;
  icon: Component;
}

defineProps<{
  creativeCulture: CreativeCultureItem[];
  cultureCategory: string;
  cultureTitle: string;
  cultureIntro: string;
}>();
</script>

<template>
  <section
    id="budaya-kreatif"
    class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32 bg-[#1a1208] text-[#faf7f2]"
  >
    <div v-observe class="reveal-up max-w-[760px] mb-14">
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
      >
        {{ cultureCategory }}
      </div>
      <h2
        class="font-libre text-[clamp(32px,4vw,56px)] font-bold leading-[1.12] mb-6"
      >
        {{ cultureTitle }}
      </h2>
      <p
        class="text-[15px] lg:text-[16px] font-light leading-[1.9] text-[#faf7f2]/68 max-w-[640px]"
      >
        {{ cultureIntro }}
      </p>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0"
    >
      <article
        v-for="item in creativeCulture"
        :key="item.displayTitle"
        v-observe
        class="reveal-up group pt-6 pb-4 px-3 border-t border-[#faf7f2]/15 hover:border-terra transition-colors duration-500"
      >
        <component :is="item.icon" class="w-6 h-6 text-terra mb-8" />
        <h3
          class="font-libre text-[22px] font-bold mb-3 group-hover:text-terra transition-colors"
        >
          {{ item.displayTitle }}
        </h3>
        <p class="text-[14px] font-light leading-[1.8] text-[#faf7f2]/65">
          {{ item.displayDesc }}
        </p>
      </article>
    </div>
  </section>
</template>
