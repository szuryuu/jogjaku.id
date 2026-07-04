<script setup lang="ts">
interface HistoryBlock {
  displayPeriod: string;
  displayTitle: string;
  displayText: string;
}

defineProps<{
  historyBlocks: HistoryBlock[];
  historyCategory: string;
  historyTitle: string;
  historyIntro: string;
}>();
</script>

<template>
  <section
    class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32 border-b border-line"
  >
    <div v-observe class="reveal-up max-w-[640px] mb-12">
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
      >
        {{ historyCategory }}
      </div>
      <h2
        class="font-libre text-[clamp(32px,4vw,56px)] font-bold leading-[1.12] text-ink mb-6"
      >
        {{ historyTitle }}
      </h2>
      <p
        class="font-libre text-[16px] lg:text-[18px] italic leading-[1.8] text-muted border-l-[3px] border-terra pl-5"
      >
        {{ historyIntro }}
      </p>
    </div>

    <div
      v-observe
      class="reveal-up flex gap-8 overflow-x-auto pb-4 snap-x snap-proximity"
    >
      <article
        v-for="(item, index) in historyBlocks"
        :key="`${item.displayPeriod}-${item.displayTitle}`"
        class="flex-[0_0_260px] snap-start border-l-[3px] border-terra pl-5"
        :style="{ transitionDelay: `${index * 100}ms` }"
      >
        <div
          class="font-josefin text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-terra mb-1.5"
        >
          {{ item.displayPeriod }}
        </div>
        <h3 class="font-libre text-[1.1rem] font-bold text-ink mb-2">
          {{ item.displayTitle }}
        </h3>
        <p class="text-[0.85rem] leading-[1.65] text-brown font-light">
          {{ item.displayText }}
        </p>
      </article>
    </div>
  </section>
</template>
