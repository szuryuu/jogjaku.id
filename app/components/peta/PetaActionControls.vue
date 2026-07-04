<script setup lang="ts">
defineProps<{
  isLegendVisible: boolean;
  isFullscreen: boolean;
}>();

defineEmits(["reset", "toggleLegend", "toggleFullscreen"]);
</script>

<template>
  <div class="flex gap-2 self-end">
    <button
      @click="$emit('reset')"
      class="bg-warm-white/90 backdrop-blur-md border border-line p-3 rounded-xl shadow-xl hover:bg-terra hover:text-warm-white transition-all"
      :title="$t('peta.reset_view')"
      :aria-label="$t('peta.reset_view')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2" />
        <line x1="12" y1="3" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="3" y1="12" x2="7" y2="12" />
        <line x1="17" y1="12" x2="21" y2="12" />
      </svg>
    </button>
    <button
      @click="$emit('toggleLegend')"
      class="bg-warm-white/90 backdrop-blur-md border border-line p-3 rounded-xl shadow-xl hover:bg-terra hover:text-warm-white transition-all"
    >
      <svg
        v-if="isLegendVisible"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path
          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
        />
        <path
          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
        />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    </button>
    <button
      @click="$emit('toggleFullscreen')"
      class="bg-warm-white/90 backdrop-blur-md border border-line p-3 rounded-xl shadow-xl hover:bg-terra hover:text-warm-white transition-all"
    >
      <svg
        v-if="!isFullscreen"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
        <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
        <path d="M3 16v3a2 2 0 0 0 2 2h3" />
        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
        <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
        <path d="M3 16h3a2 2 0 0 1 2 2v3" />
        <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
      </svg>
    </button>
  </div>
</template>
