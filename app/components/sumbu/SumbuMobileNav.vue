<script setup lang="ts">
defineProps<{
  activeIndex: number;
  stopsCount: number;
}>();

const emit = defineEmits(["navigate"]);
</script>

<template>
  <div
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 lg:hidden pointer-events-auto bg-[#1a1208]/50 px-4 py-2 rounded-full backdrop-blur-md transform-gpu"
  >
    <button
      @click="$emit('navigate', -1)"
      class="w-2 h-2 rounded-full transition-all duration-300"
      :class="activeIndex === -1 ? 'bg-[#b8491f] scale-125' : 'bg-[#faf7f2]/40'"
    ></button>
    <button
      v-for="i in stopsCount"
      :key="i"
      @click="$emit('navigate', i - 1)"
      class="w-2 h-2 rounded-full transition-all duration-300"
      :class="
        activeIndex === i - 1 ? 'bg-[#b8491f] scale-125' : 'bg-[#faf7f2]/40'
      "
    ></button>
  </div>
</template>
