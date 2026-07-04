<script setup lang="ts">
defineProps<{
  items: any[];
}>();
</script>

<template>
  <div class="flex flex-col gap-20 lg:gap-32 mt-10">
    <article
      v-for="(item, index) in items"
      :key="item.id"
      v-observe
      class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center reveal-up"
      :style="`transition-delay: ${index * 100}ms`"
    >
      <div
        class="relative aspect-[4/5] md:aspect-video lg:aspect-[4/5] bg-ink group overflow-hidden border border-line"
        :class="item.reverse ? 'lg:order-2' : 'lg:order-1'"
      >
        <AppImage
          :src="item.image"
          :alt="item.displayTitle"
          class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
        />
      </div>
      <div
        class="flex flex-col justify-center"
        :class="item.reverse ? 'lg:order-1' : 'lg:order-2'"
      >
        <div
          class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra mb-5"
        >
          {{ item.category }}
        </div>
        <h2
          class="font-libre text-[32px] lg:text-[44px] font-bold text-ink leading-[1.1] mb-4"
        >
          {{ item.displayTitle }}
        </h2>
        <h3 class="font-libre text-[16px] italic text-muted mb-8">
          {{ item.displaySubtitle }}
        </h3>
        <p
          class="text-[15px] font-light text-brown leading-[1.9] mb-10 max-w-[500px]"
        >
          {{ item.displayDescription }}
        </p>
        <ul class="flex flex-col gap-4 border-l border-line pl-6">
          <li
            v-for="highlight in item.displayHighlights"
            :key="highlight"
            class="font-josefin text-[11px] font-semibold tracking-[0.15em] uppercase text-ink flex items-center gap-4 before:w-3 before:h-[1px] before:bg-terra"
          >
            {{ highlight }}
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<style scoped>
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-up.in-view {
  opacity: 1;
  transform: translateY(0);
}
</style>
