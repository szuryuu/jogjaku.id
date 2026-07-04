<script setup lang="ts">
import { useI18n } from "#imports";

defineProps<{
  items: any[];
}>();

const { t } = useI18n();
</script>

<template>
  <section class="mt-32 pt-24 border-t border-line">
    <div v-observe class="reveal-up text-center mb-16">
      <div
        class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-6"
      >
        {{ t("budaya.ritual_calendar") }}
      </div>
      <h2 class="font-libre text-[36px] lg:text-[48px] font-bold text-ink mb-6">
        {{ t("budaya.time_cycle") }}
      </h2>
      <p class="text-[15px] font-light text-brown max-w-[600px] mx-auto">
        {{ t("budaya.time_cycle_desc") }}
      </p>
    </div>
    <div class="space-y-0">
      <div
        v-for="(fest, index) in items"
        :key="fest.id"
        v-observe
        class="reveal-up flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 py-8 lg:py-10 border-b border-line last:border-b-0 group"
        :style="`transition-delay: ${index * 100}ms`"
      >
        <!-- month lane marker -->
        <div
          class="md:w-[180px] lg:w-[240px] shrink-0 flex md:flex-col items-center md:items-start gap-3 md:gap-4"
        >
          <span class="w-2 h-2 rounded-full bg-terra shrink-0"></span>
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra md:mt-0"
          >
            {{ t("budaya.month_of") }} {{ fest.displayMonth }}
          </div>
        </div>

        <!-- festival card -->
        <div
          class="flex-1 bg-warm-white border border-line p-8 lg:p-10 relative overflow-hidden group-hover:border-terra transition-colors duration-300"
        >
          <div
            class="absolute top-0 right-0 p-4 font-josefin text-[40px] font-light text-ink/5 group-hover:text-terra/10 transition-colors duration-300"
          >
            0{{ index + 1 }}
          </div>
          <h3
            class="font-libre text-[22px] lg:text-[26px] font-bold text-ink mb-4"
          >
            {{ fest.displayName }}
          </h3>
          <p class="text-[14px] font-light text-brown leading-[1.8]">
            {{ fest.displayDesc }}
          </p>
        </div>
      </div>
    </div>
  </section>
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
