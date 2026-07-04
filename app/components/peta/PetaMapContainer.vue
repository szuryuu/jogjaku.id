<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

defineProps<{
  mode: "poi" | "internet";
  category: "all" | "wisata" | "kuliner" | "budaya" | "teknologi";
}>();

const highlightedTier = ref<string | null>(null);
const isFullscreen = ref(false);
const isLegendVisible = ref(true);
const resetViewSignal = ref(0);

const fullContainer = ref<HTMLElement | null>(null);

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    fullContainer.value?.requestFullscreen();
    isFullscreen.value = true;
  } else {
    document.exitFullscreen();
    isFullscreen.value = false;
  }
};

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

onMounted(() => {
  document.addEventListener("fullscreenchange", handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
});
</script>

<template>
  <div
    ref="fullContainer"
    class="w-full h-[70vh] lg:h-[85vh] relative rounded-2xl overflow-hidden border border-line shadow-2xl bg-parchment transition-all duration-500 map-wrapper"
  >
    <ClientOnly>
      <PetaInteractiveMap
        :mode="mode"
        :category="category"
        :highlighted-tier="highlightedTier"
        :reset-view-signal="resetViewSignal"
      />
    </ClientOnly>

    <div class="absolute top-6 right-6 z-20 flex flex-col gap-3">
      <PetaActionControls
        :isLegendVisible="isLegendVisible"
        :isFullscreen="isFullscreen"
        @reset="resetViewSignal += 1"
        @toggleLegend="isLegendVisible = !isLegendVisible"
        @toggleFullscreen="toggleFullscreen"
      />

      <transition name="legend-fade">
        <PetaLegend
          v-show="isLegendVisible"
          :mode="mode"
          @update:tier="highlightedTier = $event"
        />
      </transition>
    </div>

    <PetaInfoPanel />
  </div>
</template>

<style scoped>
.map-wrapper:fullscreen {
  border-radius: 0 !important;
  height: 100vh !important;
  width: 100vw !important;
  padding: 0 !important;
  margin: 0 !important;
}
.legend-fade-enter-active,
.legend-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.legend-fade-enter-from,
.legend-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
