<script setup lang="ts">
import { computed } from "vue";
import { useAsyncData } from "#imports";

const props = defineProps<{
  activeDestination: string;
  activeImage: string;
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

const stopTitle = computed(() => {
  if (!stopLabel.value) return currentTitle.value;
  return `Stop ${stopLabel.value} — ${currentTitle.value}`;
});
</script>

<template>
  <div
    v-observe
    class="w-full h-[30vh] lg:h-[40vh] mb-16 relative overflow-hidden reveal-up delay-100 border border-line shadow-xl bg-[#1a1208] print:hidden"
  >
    <AppImage
      :key="activeDestination"
      :src="activeImage"
      alt="Visual Destinasi"
      class="w-full h-full object-cover opacity-90 transition-opacity duration-500"
      loading="lazy"
    />
    <!-- Stop indicator: "your next stop" framing -->
    <div
      class="absolute top-4 left-4 z-20 font-josefin text-[10px] tracking-[0.2em] text-[#faf7f2]/90 uppercase bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1.5 border border-[#faf7f2]/10 transition-none"
    >
      {{ stopTitle }}
    </div>
    <div class="absolute inset-0 bg-[#1a1208]/10 transition-none"></div>
    <div
      class="absolute bottom-4 right-4 z-20 font-josefin text-[8px] tracking-[0.2em] text-[#faf7f2]/80 uppercase bg-[#1a1208]/80 backdrop-blur-sm px-3 py-1 border border-[#faf7f2]/10 transition-none"
    >
      {{ $t("wisata.location_preview") }}
    </div>
  </div>
</template>
