<script setup lang="ts">
import { computed, ref } from "vue";
import {
  BookOpen,
  Coffee,
  Landmark,
  Lightbulb,
  Music,
  Palette,
  Users,
} from "lucide-vue-next";
import { useAsyncData, useI18n } from "#imports";

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

setPageSeo({
  title: pageCopy.value.seoTitle,
  description: pageCopy.value.seoDescription,
  path: "/pendidikan",
});
</script>

<template>
  <main class="min-h-screen bg-parchment relative z-10 overflow-hidden">
    <PendidikanSubNav />
    <PendidikanHero
      :volume="pageCopy.volume"
      :heroTitle="pageCopy.heroTitle"
      :heroSubtitle="pageCopy.heroSubtitle"
      :exploreUniversities="pageCopy.exploreUniversities"
      :bestStudySpots="pageCopy.bestStudySpots"
    />
    <PendidikanHistory
      :historyBlocks="historyBlocks"
      :historyCategory="pageCopy.historyCategory"
      :historyTitle="pageCopy.historyTitle"
      :historyIntro="pageCopy.historyIntro"
    />
    <PendidikanUniversities
      :universities="universities"
      :universitiesCategory="pageCopy.universitiesCategory"
      :universitiesTitle="pageCopy.universitiesTitle"
      :universitiesIntro="pageCopy.universitiesIntro"
      :detailLabel="pageCopy.detail"
      @select="openUniversityDetail"
    />
    <PendidikanStudySpots
      :studySpots="studySpots"
      :studyCategory="pageCopy.studyCategory"
      :studyTitle="pageCopy.studyTitle"
      :location="pageCopy.location"
    />
    <PendidikanStudentLife
      :lifeStats="lifeStats"
      :lifeCategory="pageCopy.lifeCategory"
      :lifeTitle="pageCopy.lifeTitle"
      :lifeIntro="pageCopy.lifeIntro"
    />
    <PendidikanCreativeCulture
      :creativeCulture="creativeCulture"
      :cultureCategory="pageCopy.cultureCategory"
      :cultureTitle="pageCopy.cultureTitle"
      :cultureIntro="pageCopy.cultureIntro"
    />
    <PendidikanCta
      :ctaCategory="pageCopy.ctaCategory"
      :ctaTitle="pageCopy.ctaTitle"
      :ctaSubtitle="pageCopy.ctaSubtitle"
      :exploreCity="pageCopy.exploreCity"
      :studentGuide="pageCopy.studentGuide"
    />
    <PendidikanUniversityModal
      :university="selectedUniversity"
      :open="!!selectedUniversity"
      @close="closeUniversityDetail"
    />
  </main>
</template>
