<script setup lang="ts">
defineProps<{
  items: any[];
}>();
</script>

<template>
  <section
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pt-10 border-t border-line"
  >
    <article
      v-for="(item, index) in items"
      :key="item.id"
      v-observe
      class="flex flex-col reveal-up border-l-[3px] border-line/50 pl-5"
      :style="`transition-delay: ${(index % 3) * 100}ms`"
    >
      <div class="h-[2px] w-8 bg-terra mb-5 -ml-5"></div>
      <div
        class="font-josefin text-[9px] font-semibold tracking-[0.25em] uppercase text-terra/80 mb-1 transition-colors duration-300"
      >
        {{ item.displayMeta }}
      </div>
      <h3
        class="font-libre text-[22px] font-bold text-ink mb-3 transition-colors duration-300"
      >
        {{ item.displayTitle }}
      </h3>
      <div class="h-px w-full bg-line/30 mb-4"></div>
      <p
        class="text-[15px] font-light text-brown leading-[1.8] transition-colors duration-300"
      >
        {{ item.displayDesc }}
      </p>
    </article>
  </section>
</template>
