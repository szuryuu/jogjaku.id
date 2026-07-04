<script setup lang="ts">
import { useI18n } from "#imports";

const { locale } = useI18n();

defineProps<{
  mode: "poi" | "internet";
  category: "all" | "wisata" | "kuliner" | "budaya" | "teknologi";
}>();

const emit = defineEmits(["update:mode", "update:category"]);

const filterOptions = [
  { id: "all", label: { id: "Semua", en: "All" } },
  { id: "wisata", label: { id: "Wisata", en: "Tourism" } },
  { id: "budaya", label: { id: "Budaya", en: "Culture" } },
  { id: "kuliner", label: { id: "Kuliner", en: "Culinary" } },
  { id: "teknologi", label: { id: "Teknologi", en: "Technology" } },
];
</script>

<template>
  <div class="flex flex-col items-start xl:items-end gap-2">
    <div
      class="flex bg-warm-white/50 p-0.5 border border-line rounded-md w-fit backdrop-blur-md"
    >
      <button
        @click="emit('update:mode', 'poi')"
        class="px-2.5 py-1 font-josefin text-[10px] uppercase tracking-widest rounded-sm transition-all cursor-pointer"
        :class="
          mode === 'poi'
            ? 'bg-ink text-warm-white shadow-md'
            : 'text-ink/60 hover:text-ink'
        "
      >
        {{ locale === "en" ? "Destinations" : "Destinasi" }}
      </button>
      <button
        @click="emit('update:mode', 'internet')"
        class="px-2.5 py-1 font-josefin text-[10px] uppercase tracking-widest rounded-sm transition-all cursor-pointer"
        :class="
          mode === 'internet'
            ? 'bg-terra text-warm-white shadow-md'
            : 'text-ink/60 hover:text-ink'
        "
      >
        {{ locale === "en" ? "Connectivity" : "Konektivitas" }}
      </button>
    </div>
    <transition name="filter-slide-fade" mode="out-in">
      <div
        v-if="mode === 'poi'"
        class="grid grid-cols-3 sm:grid-cols-5 gap-1 bg-warm-white/50 p-0.5 border border-line rounded-md w-full sm:w-auto backdrop-blur-md"
      >
        <button
          v-for="filter in filterOptions"
          :key="filter.id"
          @click="emit('update:category', filter.id)"
          class="w-full px-2 py-1 font-josefin text-[9px] text-center uppercase tracking-widest rounded-sm transition-all cursor-pointer"
          :class="
            category === filter.id
              ? 'bg-parchment text-ink border border-line shadow-sm'
              : 'text-ink/50 hover:text-ink'
        "
        >
          {{ locale === "en" ? filter.label.en : filter.label.id }}
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.filter-slide-fade-enter-active,
.filter-slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.filter-slide-fade-enter-from,
.filter-slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
.filter-slide-fade-enter-to,
.filter-slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
