<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ArrowRight,
  BookOpen,
  Coffee,
  Landmark,
  Lightbulb,
  MapPin,
  Music,
  Palette,
  Plug,
  X,
  Users,
  Wifi,
} from "lucide-vue-next";
import { useAsyncData, useI18n, useSeoMeta } from "#imports";

const { locale } = useI18n();

const language = computed(() => locale.value as "id" | "en");

const iconMap = {
  Landmark,
  Coffee,
  BookOpen,
  Users,
  Palette,
  Lightbulb,
  Music,
};

const copy = {
  id: {
    volume: "Vol. I · Pendidikan",
    heroTitle: "Yogyakarta — Kota Pelajar Indonesia",
    heroSubtitle:
      "Rumah bagi ribuan mahasiswa dari seluruh Indonesia dengan budaya belajar, kreativitas, dan kehidupan akademik yang hidup.",
    exploreUniversities: "Jelajahi Universitas",
    bestStudySpots: "Tempat Belajar Terbaik",
    scroll: "Gulir",
    historyCategory: "Sejarah Kota Pelajar",
    historyTitle: "Kota yang tumbuh dari ruang belajar dan percakapan.",
    historyIntro:
      "Julukan Kota Pelajar lahir dari tradisi intelektual, kampus yang berakar kuat, dan keberanian anak muda untuk merawat budaya sekaligus membayangkan masa depan.",
    universitiesCategory: "Universitas Unggulan",
    universitiesTitle:
      "Kampus-kampus yang membentuk ritme akademik Yogyakarta.",
    universitiesIntro:
      "Dari kampus riset nasional hingga universitas humanis dan kreatif, setiap institusi memberi warna berbeda pada ekosistem belajar kota ini.",
    detail: "Detail",
    openMaps: "Buka Maps",
    close: "Tutup",
    notableStrengths: "Keunggulan",
    atmosphereLabel: "Suasana",
    studyCategory: "Tempat Belajar Terbaik",
    studyTitle: "Tempat belajar dengan suasana yang menjaga fokus.",
    location: "Lokasi",
    lifeCategory: "Kehidupan Mahasiswa",
    lifeTitle: "Hidup sederhana, komunitas luas, ide yang terus bergerak.",
    lifeIntro:
      "Kos, angkringan, forum diskusi, ruang musik, dan kafe kecil membentuk keseharian mahasiswa. Biaya hidup yang bersahabat memberi ruang untuk belajar, berkarya, dan menemukan jejaring baru.",
    cultureCategory: "Pendidikan & Budaya Kreatif",
    cultureTitle: "Ketika ruang kelas bertemu studio, panggung, dan festival.",
    cultureIntro:
      "Pendidikan di Yogyakarta tidak berhenti di kampus. Ia mengalir ke komunitas seni, workshop, startup, festival budaya, dan ruang kreatif independen.",
    ctaCategory: "Panduan Mahasiswa",
    ctaTitle: "Mulai Perjalananmu di Yogyakarta",
    ctaSubtitle:
      "Temukan pendidikan, kreativitas, dan kehidupan mahasiswa di salah satu kota paling inspiratif di Indonesia.",
    exploreCity: "Jelajahi Kota",
    studentGuide: "Panduan Mahasiswa",
    seoTitle: "Pendidikan Yogyakarta — Kota Pelajar Indonesia",
    seoDescription:
      "Panduan pendidikan Yogyakarta: sejarah Kota Pelajar, universitas unggulan, tempat belajar, kehidupan mahasiswa, dan budaya kreatif.",
  },
  en: {
    volume: "Vol. I · Education",
    heroTitle: "Yogyakarta — Indonesia’s City of Students",
    heroSubtitle:
      "Home to thousands of students from across Indonesia, shaped by a lively culture of learning, creativity, and academic life.",
    exploreUniversities: "Explore Universities",
    bestStudySpots: "Best Study Spots",
    scroll: "Scroll",
    historyCategory: "History of Kota Pelajar",
    historyTitle: "A city shaped by learning spaces and conversations.",
    historyIntro:
      "The nickname City of Students grew from intellectual traditions, deeply rooted campuses, and young people’s courage to preserve culture while imagining the future.",
    universitiesCategory: "Top Universities",
    universitiesTitle: "Campuses that shape Yogyakarta’s academic rhythm.",
    universitiesIntro:
      "From national research campuses to humanistic and creative universities, each institution adds a distinct color to the city’s learning ecosystem.",
    detail: "Details",
    openMaps: "Open Maps",
    close: "Close",
    notableStrengths: "Notable strengths",
    atmosphereLabel: "Atmosphere",
    studyCategory: "Best Study Spots",
    studyTitle: "Study places with atmospheres that help you stay focused.",
    location: "Location",
    lifeCategory: "Student Life",
    lifeTitle: "Simple living, wide communities, and ideas in motion.",
    lifeIntro:
      "Boarding houses, angkringan, discussion forums, music spaces, and small cafés shape everyday student life. Friendly living costs create room to learn, create, and build new networks.",
    cultureCategory: "Education & Creative Culture",
    cultureTitle: "Where classrooms meet studios, stages, and festivals.",
    cultureIntro:
      "Education in Yogyakarta does not stop on campus. It flows into art communities, workshops, startups, cultural festivals, and independent creative spaces.",
    ctaCategory: "Student Guide",
    ctaTitle: "Start Your Journey in Yogyakarta",
    ctaSubtitle:
      "Discover education, creativity, and student life in one of Indonesia’s most inspiring cities.",
    exploreCity: "Explore the City",
    studentGuide: "Student Guide",
    seoTitle: "Yogyakarta Education — Indonesia’s City of Students",
    seoDescription:
      "A Yogyakarta education guide covering Kota Pelajar history, top universities, study spots, student life, and creative culture.",
  },
};

const localize = (value: any) => {
  if (value && typeof value === "object" && ("id" in value || "en" in value)) {
    return value[language.value] ?? value.id ?? value.en ?? "";
  }

  return value ?? "";
};

const pageCopy = computed(() => copy[language.value]);
const selectedUniversity = ref<any | null>(null);

const openUniversityDetail = (university: any) => {
  selectedUniversity.value = university;
};

const closeUniversityDetail = () => {
  selectedUniversity.value = null;
};

const { data: pendidikanData } = await useAsyncData("pendidikan", () =>
  $fetch<any>("/api/data/pendidikan"),
);

const universities = computed(() =>
  (pendidikanData.value?.universities ?? []).map((item: any) => ({
    ...item,
    displayDescription: localize(item.description),
    displayStrength: localize(item.strength),
    displayAtmosphere: localize(item.atmosphere),
    displayDetail: localize(item.detail),
  })),
);

const studySpots = computed(() =>
  (pendidikanData.value?.studySpots ?? []).map((item: any) => ({
    ...item,
    displayAtmosphere: localize(item.atmosphere),
    displayWifi: localize(item.wifi),
    displayPlugs: localize(item.plugs),
    displayPrice: localize(item.price),
    displayHours: localize(item.hours),
  })),
);

const lifeStats = computed(() =>
  (pendidikanData.value?.lifeStats ?? []).map((item: any) => ({
    ...item,
    displayLabel: localize(item.label),
    icon: iconMap[item.icon as keyof typeof iconMap],
  })),
);

const creativeCulture = computed(() =>
  (pendidikanData.value?.creativeCulture ?? []).map((item: any) => ({
    ...item,
    displayTitle: localize(item.title),
    displayDesc: localize(item.desc),
    icon: iconMap[item.icon as keyof typeof iconMap],
  })),
);

const historyBlocks = computed(() =>
  (pendidikanData.value?.historyBlocks ?? []).map((item: any) => ({
    ...item,
    displayPeriod: localize(item.period),
    displayTitle: localize(item.title),
    displayText: localize(item.text),
  })),
);

const heroImageScale = ref(1.12);
const heroObjectPosition = ref("center 42%");

const handleHeroImageLoad = (event: Event) => {
  const image = event.target as HTMLImageElement;
  const container = image.parentElement;

  if (!container || !image.naturalWidth || !image.naturalHeight) return;

  const containerRatio = container.clientWidth / container.clientHeight;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const ratioGap = Math.abs(containerRatio - imageRatio);

  heroImageScale.value =
    imageRatio < containerRatio ? 1.18 : 1.12 + Math.min(ratioGap * 0.04, 0.06);
  heroObjectPosition.value =
    imageRatio < containerRatio ? "center 34%" : "center 42%";
};

useSeoMeta({
  title: computed(() => pageCopy.value.seoTitle),
  description: computed(() => pageCopy.value.seoDescription),
  ogTitle: computed(() => pageCopy.value.seoTitle),
  ogDescription: computed(() => pageCopy.value.seoDescription),
});
</script>

<template>
  <main class="min-h-screen bg-parchment relative z-10 overflow-hidden">
    <section
      class="min-h-[100svh] pt-[88px] sm:pt-[96px] lg:pt-[120px] px-5 md:px-6 lg:px-[60px] py-16 sm:pb-20 lg:pb-16 flex items-center relative"
    >
      <div class="absolute inset-0 bg-[#1a1208] overflow-hidden">
        <AppImage
          src="/images/teknologi/ugm.jpg"
          alt="Suasana akademik Yogyakarta"
          class="w-full h-full object-cover opacity-70 transition-transform duration-700"
          :style="{
            transform: `scale(${heroImageScale})`,
            objectPosition: heroObjectPosition,
          }"
          @load="handleHeroImageLoad"
        />
        <div class="absolute inset-0 bg-[#1a1208]/45"></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#1a1208] via-[#1a1208]/45 to-transparent"
        ></div>
        <div
          class="absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-t from-[#1a1208] via-[#1a1208]/95 to-transparent"
        ></div>
      </div>

      <div class="relative z-20 max-w-[980px] pt-12">
        <p
          v-observe
          class="reveal-up font-josefin text-[10px] font-semibold tracking-[0.28em] uppercase text-[#faf7f2]/75 mb-6"
        >
          {{ pageCopy.volume }}
        </p>
        <h1
          v-observe
          class="reveal-up delay-100 font-libre text-[clamp(38px,12vw,92px)] md:text-[clamp(52px,7vw,92px)] font-bold leading-[1.04] md:leading-[1.02] text-[#faf7f2] max-w-[900px] mb-6 md:mb-8"
        >
          {{ pageCopy.heroTitle }}
        </h1>
        <p
          v-observe
          class="reveal-up delay-200 font-libre text-[15px] sm:text-[17px] lg:text-[22px] italic leading-[1.75] lg:leading-[1.8] text-[#faf7f2]/78 max-w-[680px] border-l-[3px] border-terra pl-4 sm:pl-5 mb-8 lg:mb-10"
        >
          {{ pageCopy.heroSubtitle }}
        </p>
        <div
          v-observe
          class="reveal-up delay-300 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#universities"
            class="group inline-flex items-center justify-center gap-3 bg-terra text-[#faf7f2] px-5 sm:px-7 py-4 font-josefin text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase hover:bg-[#1a1208] transition-colors duration-300"
          >
            {{ pageCopy.exploreUniversities }}
            <ArrowRight
              class="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#study-spots"
            class="inline-flex items-center justify-center border border-[#faf7f2]/35 text-[#faf7f2] px-5 sm:px-7 py-4 font-josefin text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase hover:bg-[#faf7f2] hover:text-ink transition-colors duration-300"
          >
            {{ pageCopy.bestStudySpots }}
          </a>
        </div>
      </div>

      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 font-josefin text-[9px] tracking-[0.25em] uppercase text-[#faf7f2]/55 animate-bounce"
      >
        {{ pageCopy.scroll }}
      </div>
    </section>

    <section
      class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32 border-b border-line"
    >
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
      >
        <div v-observe class="reveal-up lg:col-span-5 lg:sticky lg:top-28">
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-6"
          >
            {{ pageCopy.historyCategory }}
          </div>
          <h2
            class="font-libre text-[clamp(32px,4vw,56px)] font-bold leading-[1.12] text-ink mb-6"
          >
            {{ pageCopy.historyTitle }}
          </h2>
          <p
            class="font-libre text-[16px] lg:text-[18px] italic leading-[1.8] text-muted border-l-[3px] border-terra pl-5"
          >
            {{ pageCopy.historyIntro }}
          </p>
        </div>
        <div class="lg:col-span-7 flex flex-col gap-6">
          <article
            v-for="(item, index) in historyBlocks"
            :key="`${item.displayPeriod}-${item.displayTitle}`"
            v-observe
            class="reveal-up group grid grid-cols-1 sm:grid-cols-[86px_1fr] gap-4 sm:gap-6 p-6 lg:p-8 bg-warm-white border border-line hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            :class="`delay-${(index + 1) * 100}`"
          >
            <div
              class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase text-terra pt-1"
            >
              {{ item.displayPeriod }}
            </div>
            <div>
              <h3
                class="font-libre text-[24px] font-bold text-ink mb-3 group-hover:text-terra transition-colors"
              >
                {{ item.displayTitle }}
              </h3>
              <p
                class="text-[14px] lg:text-[15px] font-light leading-[1.9] text-brown"
              >
                {{ item.displayText }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section
      id="universities"
      class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32"
    >
      <div v-observe class="reveal-up max-w-[760px] mb-14 lg:mb-20">
        <div
          class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
        >
          {{ pageCopy.universitiesCategory }}
        </div>
        <h2
          class="font-libre text-[clamp(32px,4vw,56px)] font-bold text-ink leading-[1.12] mb-6"
        >
          {{ pageCopy.universitiesTitle }}
        </h2>
        <p
          class="text-[15px] lg:text-[16px] font-light leading-[1.9] text-brown max-w-[620px]"
        >
          {{ pageCopy.universitiesIntro }}
        </p>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12"
      >
        <article
          v-for="university in universities"
          :key="university.name"
          v-observe
          class="reveal-up group flex flex-col h-full"
        >
          <div
            class="h-[220px] sm:h-[250px] bg-[#1a1208] mb-6 overflow-hidden relative border border-line shadow-sm"
          >
            <AppImage
              :src="university.image"
              :alt="university.name"
              class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-[#1a1208]/10 group-hover:bg-transparent transition-colors duration-500"
            ></div>
          </div>
          <div
            class="font-josefin text-[9px] font-semibold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-terra mb-3 break-words"
          >
            {{ university.displayStrength }}
          </div>
          <h3
            class="font-libre text-[24px] sm:text-[24px] font-bold text-ink mb-3 group-hover:text-terra transition-colors duration-300"
          >
            {{ university.name }}
          </h3>
          <p
            class="text-[14px] font-light text-brown leading-[1.8] flex-grow mb-5"
          >
            {{ university.displayDescription }}
          </p>
          <div
            class="pt-4 border-t border-line grid grid-cols-[1fr_auto] items-center gap-4"
          >
            <span
              class="font-josefin text-[9px] tracking-[0.15em] uppercase text-muted break-words min-w-0"
              >{{ university.displayAtmosphere }}</span
            >
            <button
              type="button"
              class="inline-flex shrink-0 items-center justify-center font-josefin text-[10px] font-semibold tracking-[0.18em] uppercase text-terra hover:text-ink transition-colors"
              @click="openUniversityDetail(university)"
            >
              {{ pageCopy.detail }}
            </button>
          </div>
        </article>
      </div>
    </section>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedUniversity"
          class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-[#1a1208]/70 backdrop-blur-sm px-4 py-4 sm:py-8"
          @click.self="closeUniversityDetail"
        >
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-8 sm:scale-[0.98]"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-8 sm:scale-[0.98]"
          >
            <article
              v-if="selectedUniversity"
              class="w-full max-w-[920px] max-h-[90svh] overflow-y-auto bg-parchment border border-line shadow-2xl"
              role="dialog"
              aria-modal="true"
              :aria-label="selectedUniversity.name"
            >
              <div class="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
                <div
                  class="relative h-[240px] sm:h-[320px] lg:h-full bg-[#1a1208] overflow-hidden"
                >
                  <AppImage
                    :src="selectedUniversity.image"
                    :alt="selectedUniversity.name"
                    class="w-full h-full object-cover opacity-90"
                    loading="lazy"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-[#1a1208]/80 to-transparent"
                  ></div>
                </div>
                <div class="p-6 sm:p-8 lg:p-10 relative">
                  <button
                    type="button"
                    class="absolute top-5 right-5 w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-warm-white transition-colors"
                    :aria-label="pageCopy.close"
                    @click="closeUniversityDetail"
                  >
                    <X class="w-4 h-4" />
                  </button>
                  <div
                    class="font-josefin text-[9px] font-semibold tracking-[0.22em] uppercase text-terra mb-4 pr-12"
                  >
                    {{ selectedUniversity.displayStrength }}
                  </div>
                  <h3
                    class="font-libre text-[clamp(30px,4vw,48px)] font-bold leading-[1.12] text-ink mb-5 pr-10"
                  >
                    {{ selectedUniversity.name }}
                  </h3>
                  <p
                    class="text-[15px] font-light leading-[1.9] text-brown mb-8"
                  >
                    {{
                      selectedUniversity.displayDetail ||
                      selectedUniversity.displayDescription
                    }}
                  </p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div class="border border-line p-4">
                      <div
                        class="font-josefin text-[9px] tracking-[0.2em] uppercase text-terra mb-2"
                      >
                        {{ pageCopy.notableStrengths }}
                      </div>
                      <p class="text-[13px] leading-[1.7] text-brown">
                        {{ selectedUniversity.displayStrength }}
                      </p>
                    </div>
                    <div class="border border-line p-4">
                      <div
                        class="font-josefin text-[9px] tracking-[0.2em] uppercase text-terra mb-2"
                      >
                        {{ pageCopy.atmosphereLabel }}
                      </div>
                      <p class="text-[13px] leading-[1.7] text-brown">
                        {{ selectedUniversity.displayAtmosphere }}
                      </p>
                    </div>
                  </div>
                  <a
                    :href="selectedUniversity.mapsUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-terra text-[#faf7f2] px-6 py-4 font-josefin text-[10px] font-semibold tracking-[0.18em] uppercase hover:bg-ink transition-colors duration-300"
                  >
                    <MapPin class="w-4 h-4" />
                    {{ pageCopy.openMaps }}
                  </a>
                </div>
              </div>
            </article>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <section
      id="study-spots"
      class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32 bg-warm-white border-y border-line"
    >
      <div
        class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 md:mb-14"
      >
        <div v-observe class="reveal-up max-w-[680px]">
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
          >
            {{ pageCopy.studyCategory }}
          </div>
          <h2
            class="font-libre text-[clamp(32px,4vw,56px)] font-bold text-ink leading-[1.12]"
          >
            {{ pageCopy.studyTitle }}
          </h2>
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch"
      >
        <article
          v-for="spot in studySpots"
          :key="spot.name"
          v-observe
          class="reveal-up group bg-parchment border border-line hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col"
        >
          <div
            class="h-[200px] sm:h-[210px] bg-[#1a1208] overflow-hidden relative"
          >
            <AppImage
              :src="spot.image"
              :alt="spot.name"
              class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
          <div class="p-6 flex flex-col flex-1">
            <div
              class="font-josefin text-[9px] font-semibold tracking-[0.2em] uppercase text-terra mb-3"
            >
              {{ spot.category }}
            </div>
            <h3
              class="font-libre text-[21px] sm:text-[22px] font-bold text-ink mb-3 sm:min-h-[58px]"
            >
              {{ spot.name }}
            </h3>
            <p
              class="text-[14px] font-light leading-[1.7] text-brown mb-5 sm:min-h-[48px]"
            >
              {{ spot.displayAtmosphere }}
            </p>
            <div
              class="grid grid-cols-2 gap-x-4 gap-y-3 font-josefin text-[9px] tracking-[0.14em] uppercase text-muted mb-5"
            >
              <span class="flex items-center gap-2 min-w-0">
                <Wifi class="w-3 h-3 shrink-0 text-terra" />{{
                  spot.displayWifi
                }}
              </span>
              <span class="flex items-center gap-2 min-w-0">
                <Plug class="w-3 h-3 shrink-0 text-terra" />{{
                  spot.displayPlugs
                }}
              </span>
              <span class="pl-5">{{ spot.displayPrice }}</span>
              <span class="pl-5">{{ spot.displayHours }}</span>
            </div>
            <a
              :href="spot.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-auto inline-flex w-full items-center justify-center gap-2 border border-line px-4 py-3 font-josefin text-[10px] font-semibold tracking-[0.18em] uppercase text-terra hover:bg-ink hover:text-warm-white hover:border-ink transition-colors duration-300"
            >
              <MapPin class="w-3.5 h-3.5" />
              {{ pageCopy.location }}
            </a>
          </div>
        </article>
      </div>
    </section>

    <section class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32">
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        <div v-observe class="reveal-up lg:col-span-5">
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
          >
            {{ pageCopy.lifeCategory }}
          </div>
          <h2
            class="font-libre text-[clamp(32px,4vw,56px)] font-bold text-ink leading-[1.12] mb-6"
          >
            {{ pageCopy.lifeTitle }}
          </h2>
          <p
            class="text-[15px] lg:text-[16px] font-light leading-[1.9] text-brown"
          >
            {{ pageCopy.lifeIntro }}
          </p>
        </div>
        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <article
            v-for="stat in lifeStats"
            :key="stat.displayLabel"
            v-observe
            class="reveal-up group p-7 bg-warm-white border border-line hover:bg-[#1a1208] transition-colors duration-500"
          >
            <component
              :is="stat.icon"
              class="w-5 h-5 text-terra mb-8 group-hover:text-[#faf7f2] transition-colors"
            />
            <div
              class="font-libre text-[38px] font-bold text-ink group-hover:text-[#faf7f2] transition-colors mb-2"
            >
              {{ stat.value }}
            </div>
            <div
              class="font-josefin text-[10px] tracking-[0.18em] uppercase text-muted group-hover:text-[#faf7f2]/65 transition-colors"
            >
              {{ stat.displayLabel }}
            </div>
          </article>
        </div>
      </div>
    </section>

    <section
      class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32 bg-[#1a1208] text-[#faf7f2]"
    >
      <div v-observe class="reveal-up max-w-[760px] mb-14">
        <div
          class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-5"
        >
          {{ pageCopy.cultureCategory }}
        </div>
        <h2
          class="font-libre text-[clamp(32px,4vw,56px)] font-bold leading-[1.12] mb-6"
        >
          {{ pageCopy.cultureTitle }}
        </h2>
        <p
          class="text-[15px] lg:text-[16px] font-light leading-[1.9] text-[#faf7f2]/68 max-w-[640px]"
        >
          {{ pageCopy.cultureIntro }}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        <article
          v-for="item in creativeCulture"
          :key="item.displayTitle"
          v-observe
          class="reveal-up group p-8 border border-[#faf7f2]/15 hover:border-terra hover:-translate-y-1 transition-all duration-500"
        >
          <component :is="item.icon" class="w-6 h-6 text-terra mb-10" />
          <h3
            class="font-libre text-[26px] font-bold mb-4 group-hover:text-terra transition-colors"
          >
            {{ item.displayTitle }}
          </h3>
          <p class="text-[14px] font-light leading-[1.9] text-[#faf7f2]/65">
            {{ item.displayDesc }}
          </p>
        </article>
      </div>
    </section>

    <section
      class="px-5 md:px-6 lg:px-[60px] py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-[#1a1208]">
        <AppImage
          src="/images/home/Malioboro_Street_Yogyakarta.jpg"
          alt="Kehidupan kota Yogyakarta"
          class="w-full h-full object-cover opacity-45"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-[#1a1208]/55"></div>
      </div>
      <div
        v-observe
        class="reveal-up relative z-10 max-w-[760px] mx-auto text-center py-10"
      >
        <div
          class="font-josefin text-[10px] font-semibold tracking-[0.25em] uppercase text-terra mb-6"
        >
          {{ pageCopy.ctaCategory }}
        </div>
        <h2
          class="font-libre text-[clamp(36px,5vw,68px)] font-bold text-[#faf7f2] leading-[1.08] mb-6"
        >
          {{ pageCopy.ctaTitle }}
        </h2>
        <p
          class="font-libre text-[17px] lg:text-[20px] italic leading-[1.8] text-[#faf7f2]/75 mb-10"
        >
          {{ pageCopy.ctaSubtitle }}
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            to="/wisata"
            class="inline-flex items-center justify-center bg-terra text-[#faf7f2] px-7 py-4 font-josefin text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#faf7f2] hover:text-ink transition-colors duration-300"
          >
            {{ pageCopy.exploreCity }}
          </NuxtLink>
          <a
            href="#study-spots"
            class="inline-flex items-center justify-center border border-[#faf7f2]/35 text-[#faf7f2] px-7 py-4 font-josefin text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#faf7f2] hover:text-ink transition-colors duration-300"
          >
            {{ pageCopy.studentGuide }}
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
