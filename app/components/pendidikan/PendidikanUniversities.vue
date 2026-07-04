<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

interface University {
  name: string;
  image: string;
  displayStrength?: string;
  displayAtmosphere?: string;
}

defineProps<{
  universities: University[];
  universitiesCategory: string;
  universitiesTitle: string;
  universitiesIntro: string;
  detailLabel: string;
}>();

const emit = defineEmits<{
  select: [university: University];
}>();

const rowRef = ref<HTMLElement | null>(null);

const scroll = (direction: "left" | "right") => {
  if (!rowRef.value) return;
  const delta = direction === "left" ? -320 : 320;
  rowRef.value.scrollBy({ left: delta, behavior: "smooth" });
};
</script>

<template>
  <section
    id="universitas"
    class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32"
  >
    <div
      v-observe
      class="reveal-up max-w-[760px] mx-auto text-center mb-14 lg:mb-20"
    >
      <div
        class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
      >
        {{ universitiesCategory }}
      </div>
      <h2
        class="font-libre text-[clamp(32px,4vw,56px)] font-bold text-ink leading-[1.12] mb-6"
      >
        {{ universitiesTitle }}
      </h2>
      <p
        class="text-[15px] lg:text-[16px] font-light leading-[1.9] text-brown max-w-[620px] mx-auto"
      >
        {{ universitiesIntro }}
      </p>
    </div>

    <div class="relative">
      <!-- scroll arrows -->
      <button
        type="button"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-warm-white/90 border border-line flex items-center justify-center text-ink hover:bg-terra hover:text-white hover:border-terra transition-colors shadow-md -ml-1"
        @click="scroll('left')"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>
      <button
        type="button"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-warm-white/90 border border-line flex items-center justify-center text-ink hover:bg-terra hover:text-white hover:border-terra transition-colors shadow-md -mr-1"
        @click="scroll('right')"
      >
        <ChevronRight class="w-4 h-4" />
      </button>

      <div
        ref="rowRef"
        class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth px-0.5 max-w-[948px] mx-auto"
      >
        <button
          v-for="university in universities"
          :key="university.name"
          type="button"
          class="uni-card flex-none w-[300px] snap-start text-left bg-warm-white border border-line rounded-md overflow-hidden transition-transform duration-250 ease-out hover:-translate-y-1 hover:shadow-xl flex flex-col"
          @click="emit('select', university)"
        >
          <div class="h-40 bg-[#1a1208] overflow-hidden">
            <AppImage
              :src="university.image"
              :alt="university.name"
              class="w-full h-full object-cover opacity-90"
              loading="lazy"
            />
          </div>
          <div class="p-5 flex flex-col flex-1">
            <h3 class="font-libre text-lg font-bold text-ink mb-1.5">
              {{ university.name }}
            </h3>
            <p
              v-if="university.displayAtmosphere"
              class="text-[0.8rem] text-muted mb-3"
            >
              {{ university.displayAtmosphere }}
            </p>
            <span
              class="font-josefin text-[0.7rem] tracking-[0.1em] uppercase text-terra mt-auto"
            >
              {{ detailLabel }} &rarr;
            </span>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
