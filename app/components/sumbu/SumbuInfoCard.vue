<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "#imports";
import gsap from "gsap";

const props = defineProps<{
  activeIndex: number;
  stops: any[];
  isCardVisible: boolean;
}>();

const emit = defineEmits(["navigate", "secretState"]);

const { locale } = useI18n();

const activeStop = computed(() =>
  props.activeIndex >= 0 ? props.stops[props.activeIndex] : null,
);

const expandedSection = ref<"philosophy" | "secret" | null>(null);

const toggleSection = (section: "philosophy" | "secret") => {
  expandedSection.value = expandedSection.value === section ? null : section;
  emit("secretState", expandedSection.value === "secret");
};

const navigateTo = (index: number) => {
  emit("navigate", index);
};

const onEnter = (el: Element, done: () => void) => {
  const tl = gsap.timeline({ onComplete: done });
  tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 });

  const title = el.querySelector(".gsap-title");
  const line = el.querySelector(".gsap-line");
  const texts = el.querySelectorAll(".gsap-text");
  const controls = el.querySelectorAll(".gsap-control");

  if (title)
    tl.fromTo(
      title,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  if (line)
    tl.fromTo(
      line,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4",
    );
  if (texts.length)
    tl.fromTo(
      texts,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.2",
    );
  if (controls.length)
    tl.fromTo(
      controls,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.1 },
      "-=0.4",
    );
};

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power3.in",
    onComplete: done,
  });
};
</script>

<template>
  <div
    class="fixed bottom-24 lg:bottom-10 left-4 right-4 lg:right-auto lg:left-10 z-50 lg:w-[400px] xl:w-[440px] flex flex-col justify-end pointer-events-none transform-gpu"
  >
    <transition @enter="onEnter" @leave="onLeave" mode="out-in" :css="false">
      <div
        v-if="activeIndex === -1 && isCardVisible"
        key="hero"
        class="pointer-events-auto bg-[#1a1208]/90 backdrop-blur-md border border-[#faf7f2]/10 p-6 lg:p-8 shadow-2xl flex flex-col items-start gap-4 lg:gap-6 max-h-[65vh] overflow-y-auto card-scrollbar rounded-2xl transform-gpu will-change-transform"
      >
        <div class="flex items-center gap-4 w-full">
          <div class="w-8 h-[1px] bg-[#b8491f] gsap-line"></div>
          <span
            class="font-josefin text-[9px] tracking-[0.4em] uppercase text-[#b8491f] gsap-text"
          >
            {{
              locale === "id" ? "Perjalanan Interaktif" : "Interactive Journey"
            }}
          </span>
        </div>
        <h1
          class="font-libre text-[32px] lg:text-[40px] font-bold leading-[1.1] text-[#faf7f2] gsap-title"
        >
          {{ locale === "id" ? "Sumbu Filosofis" : "The Philosophical Axis" }}
          <em class="text-[#b8491f] italic block mt-1">Yogyakarta</em>
        </h1>
        <p
          class="font-lato text-[14px] text-[#faf7f2]/70 font-light leading-[1.7] gsap-text"
        >
          {{
            locale === "id"
              ? "Sebuah garis 33 kilometer yang bukan sekadar jalan. Ia adalah pernyataan kosmologis yang merentang dari api gunung berapi di utara hingga keabadian samudra di selatan."
              : "A 33-kilometer line that is not merely a road. It is a cosmological declaration stretching from volcanic fire in the north to oceanic eternity in the south."
          }}
        </p>
        <div
          class="flex items-center gap-3 text-[#faf7f2]/40 font-josefin text-[8px] uppercase tracking-widest flex-wrap mt-2 gsap-text"
        >
          <span
            >5 {{ locale === "id" ? "Titik Sakral" : "Sacred Points" }}</span
          >
          <span class="w-1 h-1 rounded-full bg-[#b8491f]"></span>
          <span>33 km</span>
          <span class="w-1 h-1 rounded-full bg-[#b8491f]"></span>
          <span>{{ locale === "id" ? "Sejak 1755" : "Since 1755" }}</span>
        </div>
      </div>

      <div
        v-else-if="activeStop && isCardVisible"
        :key="activeStop.id"
        class="pointer-events-auto bg-[#1a1208]/90 backdrop-blur-md border border-[#faf7f2]/10 p-6 lg:p-8 shadow-2xl max-h-[65vh] overflow-y-auto card-scrollbar rounded-2xl transform-gpu will-change-transform"
      >
        <div class="flex items-center gap-3 mb-4">
          <span
            class="font-josefin text-[9px] tracking-[0.3em] uppercase text-[#b8491f] gsap-text"
          >
            {{ String(activeIndex + 1).padStart(2, "0") }} /
            {{ String(stops.length).padStart(2, "0") }}
          </span>
          <div class="w-6 h-[1px] bg-[#b8491f] gsap-line"></div>
          <span
            class="font-josefin text-[8px] tracking-[0.2em] uppercase text-[#faf7f2]/40 gsap-text"
          >
            {{ activeStop.coordsDisplay }}
          </span>
        </div>

        <div
          class="font-josefin text-[9px] tracking-[0.3em] uppercase text-[#b8491f] mb-2 gsap-text"
        >
          {{ activeStop.displaySubtitle }}
        </div>
        <h2
          class="font-libre text-[28px] lg:text-[32px] font-bold text-[#faf7f2] leading-[1.15] mb-4 gsap-title"
        >
          {{ activeStop.displayName }}
        </h2>
        <div class="flex items-center gap-3 mb-4 gsap-text">
          <span
            class="font-josefin text-[8px] tracking-widest uppercase text-[#faf7f2]/40"
          >
            {{ activeStop.elevation }}
          </span>
        </div>
        <p
          class="font-lato text-[13px] lg:text-[14px] text-[#faf7f2]/80 font-light leading-[1.7] mb-6 gsap-text"
        >
          {{ activeStop.displayNarrative }}
        </p>
        <div class="flex flex-col gap-2">
          <button
            @click="toggleSection('philosophy')"
            class="group flex items-center justify-between px-4 py-3 border transition-all duration-300 cursor-pointer gsap-control"
            :class="
              expandedSection === 'philosophy'
                ? 'border-[#b8491f] bg-[#b8491f]/10 text-[#faf7f2]'
                : 'border-[#faf7f2]/10 hover:border-[#b8491f]/40 text-[#faf7f2]/60'
            "
          >
            <span class="font-josefin text-[9px] tracking-[0.2em] uppercase">
              {{
                locale === "id" ? "Filosofi & Makna" : "Philosophy & Meaning"
              }}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-transform duration-300"
              :class="expandedSection === 'philosophy' ? 'rotate-45' : ''"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <div
            class="overflow-hidden transition-all duration-500"
            :class="
              expandedSection === 'philosophy'
                ? 'max-h-[500px] opacity-100'
                : 'max-h-0 opacity-0'
            "
          >
            <div
              class="px-4 py-4 border border-t-0 border-[#b8491f]/30 bg-[#b8491f]/5"
            >
              <p
                class="font-lato text-[12px] lg:text-[13px] text-[#faf7f2]/75 font-light leading-[1.7]"
              >
                {{ activeStop.displayPhilosophy }}
              </p>
            </div>
          </div>

          <button
            @click="toggleSection('secret')"
            class="group flex items-center justify-between px-4 py-3 border transition-all duration-300 cursor-pointer select-none gsap-control"
            :class="
              expandedSection === 'secret'
                ? 'border-[#c4840a] bg-[#c4840a]/10 text-[#faf7f2]'
                : 'border-[#faf7f2]/10 hover:border-[#c4840a]/40 text-[#faf7f2]/60'
            "
          >
            <span
              class="font-josefin text-[9px] tracking-[0.2em] uppercase flex items-center gap-2"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-[#c4840a]"
                :class="expandedSection === 'secret' ? '' : 'animate-pulse'"
              ></span>
              {{ locale === "id" ? "Rahasia Tersembunyi" : "Hidden Secret" }}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-transform duration-300"
              :class="expandedSection === 'secret' ? 'rotate-45' : ''"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <div
            class="overflow-hidden transition-all duration-500"
            :class="
              expandedSection === 'secret'
                ? 'max-h-[500px] opacity-100'
                : 'max-h-0 opacity-0'
            "
          >
            <div
              class="px-4 py-4 border border-t-0 border-[#c4840a]/30 bg-[#c4840a]/5"
            >
              <p
                class="font-lato text-[12px] lg:text-[13px] text-[#faf7f2]/75 font-light leading-[1.7]"
              >
                {{ activeStop.displaySecret }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-between w-full mt-6 pt-4 border-t border-[#faf7f2]/10 gsap-control"
        >
          <button
            v-if="activeIndex > 0"
            @click="navigateTo(activeIndex - 1)"
            class="flex items-center gap-2 font-josefin text-[9px] tracking-widest uppercase text-[#faf7f2]/40 hover:text-terra transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            {{ locale === "id" ? "Sebelumnya" : "Prev" }}
          </button>
          <button
            v-else-if="activeIndex === 0"
            @click="navigateTo(-1)"
            class="flex items-center gap-2 font-josefin text-[9px] tracking-widest uppercase text-[#faf7f2]/40 hover:text-terra transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            {{ locale === "id" ? "Beranda" : "Home" }}
          </button>
          <div v-else></div>

          <button
            v-if="activeIndex < stops.length - 1"
            @click="navigateTo(activeIndex + 1)"
            class="flex items-center gap-2 font-josefin text-[9px] tracking-widest uppercase text-[#faf7f2]/60 hover:text-terra transition-colors cursor-pointer"
          >
            {{ locale === "id" ? "Selanjutnya" : "Next" }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          <div v-else class="flex flex-col items-end gap-1">
            <span
              class="font-josefin text-[8px] tracking-widest uppercase text-[#b8491f]"
            >
              {{ locale === "id" ? "Perjalanan Selesai" : "End" }}
            </span>
            <NuxtLink
              to="/peta/"
              class="font-josefin text-[8px] tracking-widest uppercase text-[#faf7f2]/40 hover:text-[#faf7f2] transition-colors underline"
            >
              {{ locale === "id" ? "Lihat di Peta" : "View Map" }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.card-scrollbar::-webkit-scrollbar {
  display: none;
}
.card-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
