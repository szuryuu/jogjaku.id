<script setup lang="ts">
defineProps<{
  items: any[];
  activeIndex: number;
}>();

defineEmits(["update:activeIndex"]);
</script>

<template>
  <div
    class="timeline-root relative border-l border-line ml-3 pl-8 flex flex-col gap-12 lg:gap-16"
  >
    <button
      v-for="(item, index) in items"
      :key="index"
      @click="$emit('update:activeIndex', index)"
      :aria-label="`Lihat detail peristiwa ${item.displayTitle} tahun ${item.year}`"
      v-observe
      class="relative text-left group cursor-pointer reveal-up"
      :style="`transition-delay: ${(index % 5) * 100}ms`"
    >
      <div
        class="absolute -left-[37px] top-2 w-[11px] h-[11px] rounded-full border-2 transition-all duration-300"
        :class="
          activeIndex === index
            ? 'bg-terra border-terra scale-125'
            : 'bg-warm-white border-line group-hover:border-terra'
        "
      ></div>
      <div
        class="font-josefin text-[16px] lg:text-[20px] font-light transition-colors duration-300 mb-0.5"
        :class="
          activeIndex === index
            ? 'text-terra'
            : 'text-muted group-hover:text-terra/70'
        "
      >
        {{ item.year }}
      </div>
      <div
        class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra/55 mb-3 transition-colors duration-300"
        :class="
          activeIndex === index
            ? 'text-terra/80'
            : 'group-hover:text-terra/60'
        "
      >
        {{ item.displayMeta }}
      </div>
      <h3
        class="font-libre text-[18px] lg:text-[22px] font-bold transition-colors duration-300"
        :class="
          activeIndex === index
            ? 'text-ink'
            : 'text-ink/40 group-hover:text-ink/70'
        "
      >
        {{ item.displayTitle }}
      </h3>
    </button>
  </div>
</template>

<style scoped>
/* ponytail: subtle laid-paper texture via CSS gradient — replace with SVG noise filter if fidelity matters */
.timeline-root {
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(139, 90, 43, 0.012) 2px,
      rgba(139, 90, 43, 0.012) 4px
    );
}

@media (prefers-reduced-motion: reduce) {
  .timeline-root *,
  .timeline-root *::before,
  .timeline-root *::after {
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
</style>
