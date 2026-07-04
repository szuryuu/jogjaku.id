<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "#imports";

const { locale } = useI18n();

interface NavData {
  volume: string;
  items: { label: string; href: string }[];
}

const navCopy: { id: NavData; en: NavData } = {
  id: {
    volume: "Vol. I · Pendidikan",
    items: [
      { label: "Sejarah", href: "#sejarah" },
      { label: "Universitas", href: "#universitas" },
      { label: "Tempat Belajar", href: "#belajar" },
      { label: "Kehidupan Mahasiswa", href: "#kehidupan" },
      { label: "Budaya Kreatif", href: "#budaya-kreatif" },
    ],
  },
  en: {
    volume: "Vol. I · Education",
    items: [
      { label: "History", href: "#sejarah" },
      { label: "Universities", href: "#universitas" },
      { label: "Study Spots", href: "#belajar" },
      { label: "Student Life", href: "#kehidupan" },
      { label: "Creative Culture", href: "#budaya-kreatif" },
    ],
  },
};

const t = computed<NavData>(() =>
  locale.value === "id" ? navCopy.id : navCopy.en,
);
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-parchment/90 backdrop-blur-md border-b border-line flex items-center gap-2 px-[6vw] py-3 overflow-x-auto"
    aria-label="Navigasi halaman Pendidikan"
  >
    <span
      class="font-josefin text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-terra whitespace-nowrap mr-4 shrink-0"
    >
      {{ t.volume }}
    </span>
    <a
      v-for="item in t.items"
      :key="item.href"
      :href="item.href"
      class="font-josefin text-[0.75rem] tracking-[0.05em] whitespace-nowrap px-3.5 py-1.5 rounded-full text-ink/65 hover:text-ink hover:bg-terra/10 focus-visible:outline-none focus-visible:bg-terra/10 focus-visible:text-ink transition"
    >
      {{ item.label }}
    </a>
  </nav>
</template>
