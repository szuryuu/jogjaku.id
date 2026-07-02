<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  chapterNumber: string;
  chapterLabel: string;
  variant: "center" | "staggered" | "focus" | "typographic";
  isDark?: boolean;
  reverse?: boolean;
}>();

const variantClass = computed(() => {
  const base: Record<string, string> = {
    center: "flex-col text-center",
    staggered: `gap-[5vw] max-w-[1200px] mx-auto w-full max-md:flex-col max-md:text-center${props.reverse ? " flex-row-reverse" : ""}`,
    focus: "flex-col",
    typographic: "flex-col text-center",
  };
  return base[props.variant];
});
</script>

<template>
  <section
    class="chapter relative min-h-screen w-full flex items-center justify-center px-[8vw] py-32 overflow-hidden"
    :class="[variantClass, isDark ? 'bg-ink text-parchment' : '']"
  >
    <div
      class="absolute top-12 left-[6vw] z-5 font-josefin text-[11px] tracking-[0.3em] uppercase opacity-55"
    >
      {{ chapterNumber }}. {{ chapterLabel }}
    </div>
    <slot />
  </section>
</template>
