<script setup lang="ts">
export interface LifeStat {
  value: number;
  displayLabel: string;
  icon: any;
}

defineProps<{
  lifeStats: LifeStat[];
  lifeCategory: string;
  lifeTitle: string;
  lifeIntro: string;
}>();
</script>

<template>
  <section class="bg-[#1a1208] text-[#faf7f2] px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32">
    <div v-observe class="reveal-up max-w-[760px] mb-14">
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
      >
        {{ lifeCategory }}
      </div>
      <h2
        class="font-libre text-[clamp(32px,4vw,56px)] font-bold leading-[1.12] mb-6"
      >
        {{ lifeTitle }}
      </h2>
      <p
        class="text-[15px] lg:text-[16px] font-light leading-[1.9] text-[#faf7f2]/68 max-w-[640px]"
      >
        {{ lifeIntro }}
      </p>
    </div>
    <div
      class="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-8 md:gap-10"
    >
      <div
        v-for="stat in lifeStats"
        :key="stat.displayLabel"
        v-observe
        class="reveal-up flex flex-col items-center text-center"
      >
        <div
          class="w-[44px] h-[44px] border border-[#faf7f2]/25 rounded-full flex items-center justify-center mb-[14px]"
        >
          <component :is="stat.icon" class="w-5 h-5 text-[#faf7f2]" />
        </div>
        <div class="font-libre text-[38px] font-bold leading-none mb-2">
          {{ stat.value }}
        </div>
        <div
          class="font-josefin text-[10px] tracking-[0.18em] uppercase text-[#faf7f2]/75"
        >
          {{ stat.displayLabel }}
        </div>
      </div>
    </div>
  </section>
</template>
