<script setup lang="ts">
import { MapPin, Plug, Wifi } from "lucide-vue-next";

interface StudySpot {
  name: string;
  category: string;
  image: string;
  displayAtmosphere: string;
  displayWifi: string;
  displayPlugs: string;
  displayPrice: string;
  displayHours: string;
  mapsUrl: string;
}

defineProps<{
  studySpots: StudySpot[];
  studyCategory: string;
  studyTitle: string;
  location: string;
}>();
</script>

<template>
  <section
    id="belajar"
    class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32 bg-warm-white border-y border-line"
  >
    <div
      class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 md:mb-14"
    >
      <div v-observe class="reveal-up max-w-[680px]">
        <div
          class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
        >
          {{ studyCategory }}
        </div>
        <h2
          class="font-libre text-[clamp(32px,4vw,56px)] font-bold text-ink leading-[1.12]"
        >
          {{ studyTitle }}
        </h2>
      </div>
    </div>

    <div
      class="grid gap-6 items-stretch"
      style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))"
    >
      <article
        v-for="spot in studySpots"
        :key="spot.name"
        v-observe
        class="reveal-up group bg-parchment border border-line rounded-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col"
      >
        <div class="h-[200px] sm:h-[210px] bg-[#1a1208] overflow-hidden relative rounded-t-md">
          <AppImage
            :src="spot.image"
            :alt="spot.name"
            class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>

        <div class="p-[1.4rem] flex flex-col flex-1">
          <div
            class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3"
          >
            {{ spot.category }}
          </div>

          <h3
            class="font-libre text-[22px] font-bold text-ink mb-3"
          >
            {{ spot.name }}
          </h3>

          <p class="text-[14px] font-light leading-[1.7] text-brown mb-5">
            {{ spot.displayAtmosphere }}
          </p>

          <div class="flex gap-2 flex-wrap mt-auto mb-5">
            <span
              class="inline-flex items-center gap-1.5 font-josefin text-[10px] tracking-[0.05em] uppercase px-2.5 py-1.5 rounded-full bg-terra/10 text-terra"
            >
              <Wifi class="w-3 h-3 shrink-0" />
              {{ spot.displayWifi }}
            </span>
            <span
              v-if="spot.displayPlugs"
              class="inline-flex items-center gap-1.5 font-josefin text-[10px] tracking-[0.05em] uppercase px-2.5 py-1.5 rounded-full bg-terra/10 text-terra"
            >
              <Plug class="w-3 h-3 shrink-0" />
              {{ spot.displayPlugs }}
            </span>
            <span
              v-if="spot.displayPrice"
              class="inline-flex items-center font-josefin text-[10px] tracking-[0.05em] uppercase px-2.5 py-1.5 rounded-full bg-terra/10 text-terra"
            >
              {{ spot.displayPrice }}
            </span>
            <span
              v-if="spot.displayHours"
              class="inline-flex items-center font-josefin text-[10px] tracking-[0.05em] uppercase px-2.5 py-1.5 rounded-full bg-terra/10 text-terra"
            >
              {{ spot.displayHours }}
            </span>
          </div>

          <a
            :href="spot.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-full items-center justify-center gap-2 border border-line px-4 py-3 font-josefin text-[10px] font-semibold tracking-[0.18em] uppercase text-terra hover:bg-ink hover:text-warm-white hover:border-ink transition-colors duration-300 rounded-md"
          >
            <MapPin class="w-3.5 h-3.5" />
            {{ location }}
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
