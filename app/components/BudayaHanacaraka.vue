<script setup lang="ts">
import { useI18n } from "#imports";

defineProps<{
  items: any[];
}>();

const { t, locale } = useI18n();
</script>

<template>
  <section class="mt-32 pt-24 border-t border-line">
    <div v-observe class="reveal-up mb-16 text-center">
      <div
        class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-6"
      >
        {{ t("budaya.aksara_category") }}
      </div>
      <h2 class="font-libre text-[36px] lg:text-[48px] font-bold text-ink mb-6">
        {{ t("budaya.aksara") }}
      </h2>
      <p
        class="text-[14px] font-light text-brown max-w-[600px] mx-auto italic leading-relaxed"
      >
        {{ t("budaya.aksara_desc") }}
      </p>
    </div>
    <div
      v-observe
      class="grid grid-cols-5 gap-2 lg:gap-3 max-w-4xl mx-auto reveal-up"
    >
      <div
        v-for="char in items"
        :key="char.latin"
        class="group relative aspect-[1/1.1] bg-parchment border border-line/60 flex flex-col items-center justify-center transition-all duration-300 hover:border-terra overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)] rounded-[2px]"
      >
        <!-- ponytail: inner frame to suggest stamp impression edge -->
        <div
          class="absolute inset-[5px] border border-line/25 rounded-[1px] pointer-events-none transition-colors duration-300 group-hover:border-terra/20"
        ></div>
        <div
          class="relative z-10 text-[32px] lg:text-[42px] text-ink/85 transition-all duration-500 group-hover:-translate-y-3"
          style="font-family: &quot;Noto Sans Javanese&quot;, sans-serif; text-shadow: 0 1px 1px rgba(0,0,0,0.08)"
        >
          {{ char.script }}
        </div>
        <div
          class="relative z-10 font-josefin text-[10px] uppercase tracking-widest text-muted transition-opacity duration-300 group-hover:opacity-0"
        >
          {{ char.latin }}
        </div>
        <div
          class="absolute inset-0 z-20 p-3 flex flex-col items-center justify-end pb-4 text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
        >
          <div
            class="font-josefin text-[9px] text-terra uppercase tracking-[0.2em] mb-1"
          >
            {{ char.latin }}
          </div>
          <p
            class="text-[10px] text-ink font-semibold leading-tight bg-warm-white/90 px-2 py-1 rounded"
          >
            {{ char.philosophy[locale as "id" | "en"] }}
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
