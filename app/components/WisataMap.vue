<script setup lang="ts">
import { computed } from "vue";
import { useAsyncData } from "#imports";

const props = defineProps<{
  activeDestination: string;
  activeMapUrl: string;
}>();

// ponytail: reuse the cached wisata data from the parent page
const { data: rawDestinations } = useAsyncData<any[]>("wisata", () =>
  $fetch("/api/data/wisata"),
);

const currentTitle = computed(() => {
  const d = rawDestinations.value?.find(
    (d) => d.id === props.activeDestination,
  );
  return d?.title ?? "";
});

const stopLabel = computed(() => {
  if (!rawDestinations.value?.length) return "";
  const idx = rawDestinations.value.findIndex(
    (d) => d.id === props.activeDestination,
  );
  if (idx === -1) return "";
  return `${idx + 1}/${rawDestinations.value.length}`;
});
</script>

<template>
  <div v-observe class="relative reveal-up delay-200 print:hidden">
    <div
      class="lg:sticky lg:top-[120px] h-[400px] lg:h-[600px] w-full bg-ink border border-line shadow-2xl overflow-hidden p-2"
    >
      <!-- map context badge -->
      <div
        v-if="currentTitle"
        class="absolute top-3 left-3 z-20 font-josefin text-[10px] tracking-[0.2em] uppercase bg-ink/90 backdrop-blur-sm px-3 py-1.5 text-parchment/80 border border-line/20"
      >
        <span class="text-terra">{{ $t("wisata.category") }}</span>
        <span class="mx-2 text-parchment/30">|</span>
        <span>{{ currentTitle }}</span>
        <span
          v-if="stopLabel"
          class="ml-2 text-[9px] text-parchment/50"
        >{{ stopLabel }}</span>
      </div>
      <div
        class="absolute inset-0 flex items-center justify-center font-josefin text-[10px] tracking-[0.2em] text-parchment/50 uppercase z-0"
      >
        {{ $t("wisata.loading_map") }}
      </div>
      <iframe
        :key="activeDestination"
        :src="activeMapUrl"
        class="relative z-10 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 bg-ink"
        allowfullscreen="false"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>
