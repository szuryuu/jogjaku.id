<script setup lang="ts">
import { useI18n } from "#imports";

const { locale } = useI18n();
</script>

<template>
  <div
    class="absolute bottom-6 left-6 z-20 pointer-events-none flex flex-col gap-4"
  >
    <div
      class="bg-warm-white/90 backdrop-blur-md px-3 py-2 rounded-lg border border-line shadow-lg max-w-[280px] pointer-events-auto"
    >
      <div
        class="font-josefin text-[9px] text-terra uppercase tracking-widest font-bold mb-1"
      >
        D.I. Yogyakarta
      </div>
      <p class="font-lato text-[11px] text-ink/75 leading-tight">
        {{
          locale === "en"
            ? "1 City, 4 Regencies:"
            : "1 Kota, 4 Kabupaten:"
        }}
        <strong class="text-ink"
          >Kota Yogyakarta, Sleman, Bantul, Kulon Progo,
          {{ locale === "en" ? "and" : "dan" }} Gunungkidul.</strong
        >
      </p>
    </div>
  </div>
</template>
