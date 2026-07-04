<script setup lang="ts">
defineProps<{
  categories: { key: string; label: string }[];
  modelValue: string;
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
  <div
    v-observe
    class="mb-12 flex flex-wrap gap-0 border-b border-line reveal-up delay-200 print:hidden"
  >
    <button
      v-for="cat in categories"
      :key="cat.key"
      @click="$emit('update:modelValue', cat.key)"
      class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer px-5 pb-3 pt-1 border-b-2"
      :class="
        modelValue === cat.key
          ? 'border-terra text-terra'
          : 'border-transparent text-muted hover:text-ink'
      "
    >
      {{ cat.label }}
    </button>
  </div>
</template>
