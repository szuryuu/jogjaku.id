<script setup lang="ts">
import { useI18n } from "#imports";

defineProps<{
  activeIndex: number;
  stopsCount: number;
}>();

const { locale } = useI18n();
</script>

<template>
  <div
    class="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[50] flex flex-col items-center gap-5 pointer-events-none transition-opacity duration-500 bg-[#1a1208]/70 backdrop-blur-md px-3 py-6 rounded-full border border-[#faf7f2]/10 shadow-2xl transform-gpu"
    :class="activeIndex >= stopsCount - 1 ? 'opacity-0' : 'opacity-100'"
  >
    <span
      class="font-josefin text-[10px] lg:text-[11px] font-bold tracking-[0.3em] uppercase text-[#faf7f2]/90"
      style="writing-mode: vertical-rl"
    >
      {{ locale === "id" ? "Scroll" : "Scroll" }}
    </span>
    <div
      class="w-[2px] h-10 lg:h-12 bg-[#faf7f2]/20 relative overflow-hidden rounded-full"
    >
      <div
        class="absolute top-0 left-0 w-full h-full bg-[#b8491f] animate-scroll-vertical"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.animate-scroll-vertical {
  animation: scrollVertical 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
@keyframes scrollVertical {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
