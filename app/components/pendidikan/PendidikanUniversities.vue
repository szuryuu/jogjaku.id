<script setup lang="ts">
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
</script>

<template>
  <section
    id="universitas"
    class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32"
  >
    <div v-observe class="reveal-up max-w-[760px] mb-14 lg:mb-20">
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
        class="text-[15px] lg:text-[16px] font-light leading-[1.9] text-brown max-w-[620px]"
      >
        {{ universitiesIntro }}
      </p>
    </div>

    <div
      class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
    >
      <button
        v-for="university in universities"
        :key="university.name"
        type="button"
        class="uni-card flex-none w-[300px] snap-start text-left bg-warm-white border border-line rounded-md overflow-hidden transition-transform duration-250 ease-out hover:-translate-y-1 hover:shadow-xl"
        @click="emit('select', university)"
      >
        <div class="h-40 relative bg-[#1a1208] overflow-hidden">
          <AppImage
            :src="university.image"
            :alt="university.name"
            class="w-full h-full object-cover opacity-90"
            loading="lazy"
          />
          <span
            v-if="university.displayStrength"
            class="absolute top-3 left-3 bg-[#1a1208] text-[#faf7f2] font-josefin text-[0.65rem] tracking-[0.08em] uppercase px-2.5 py-1 rounded"
          >
            {{ university.displayStrength }}
          </span>
        </div>
        <div class="p-5">
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
            class="font-josefin text-[0.7rem] tracking-[0.1em] uppercase text-terra"
          >
            {{ detailLabel }} &rarr;
          </span>
        </div>
      </button>
    </div>
  </section>
</template>
