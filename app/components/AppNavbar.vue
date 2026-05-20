<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Search, Globe } from "lucide-vue-next";
import { useI18n, useState } from "#imports";

const { locale, setLocale } = useI18n();
const routes = [
  "sejarah",
  "budaya",
  "kuliner",
  "wisata",
  "pendidikan",
  "teknologi",
  "peta",
  "filosofi",
];

const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const route = useRoute();
const isTranslating = useState("isTranslating", () => false);

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  },
);

const toggleLanguage = () => {
  if (isTranslating.value) return;
  isTranslating.value = true;

  setTimeout(() => {
    setLocale(locale.value === "id" ? "en" : "id");
    setTimeout(() => {
      isTranslating.value = false;
    }, 50);
  }, 300);
};
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-[100] bg-parchment/94 backdrop-blur-md border-b border-line transition-all duration-300"
  >
    <div
      class="px-5 lg:px-[60px] h-[60px] lg:h-[72px] flex items-center justify-between relative z-[102] bg-transparent"
    >
      <NuxtLink
        to="/"
        class="font-libre text-[18px] lg:text-[20px] font-normal text-ink tracking-[0.04em]"
        @click="isMenuOpen = false"
      >
        <em class="italic text-terra">Jogja</em>Ku
      </NuxtLink>
      <ul class="hidden lg:flex gap-9">
        <li v-for="item in routes" :key="item">
          <NuxtLink
            :to="`/${item}`"
            active-class="text-terra"
            class="font-josefin text-[11px] font-semibold tracking-[0.18em] uppercase text-muted transition-colors duration-200 hover:text-terra"
            :class="item === 'filosofi' ? 'text-terra/70' : ''"
          >
            {{ $t(`nav.${item}`) }}
          </NuxtLink>
        </li>
      </ul>
      <div class="hidden lg:flex items-center gap-2">
        <div class="flex items-center gap-1">
          <button
            @click="isSearchOpen = true"
            class="flex items-center justify-center w-8 h-8 hover:bg-ink/5 rounded-full transition-colors"
            aria-label="Buka Pencarian Global"
          >
            <Search
              class="w-4 h-4 text-ink hover:text-terra transition-colors"
            />
          </button>
          <ThemeToggle />
        </div>
        <span
          class="font-josefin text-[10px] font-light tracking-[0.15em] uppercase text-muted border-l border-r border-line px-4 mx-2 flex items-center h-4"
        >
          Vol. I // Yogyakarta
        </span>
        <button
          @click="toggleLanguage"
          class="flex items-center justify-center gap-1.5 h-8 px-3 rounded-full hover:bg-ink/5 transition-colors font-josefin text-[12px] font-bold tracking-[0.1em] uppercase text-terra"
        >
          <Globe class="w-4 h-4 shrink-0" />
          <span class="mt-[2px]">{{ locale === "id" ? "ID" : "EN" }}</span>
        </button>
      </div>

      <div class="flex lg:hidden items-center gap-1">
        <button
          @click="isSearchOpen = true"
          class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-ink/5 transition-colors"
          aria-label="Buka Pencarian Global"
        >
          <Search class="w-4 h-4 text-ink" />
        </button>
        <ThemeToggle />
        <button
          @click="toggleLanguage"
          class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-ink/5 transition-colors font-josefin text-[12px] font-bold tracking-[0.1em] uppercase text-terra"
        >
          <span class="mt-[2px]">{{ locale === "id" ? "ID" : "EN" }}</span>
        </button>
        <button
          class="flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer ml-1"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Toggle Menu"
        >
          <span
            class="block w-5 h-[1px] bg-ink transition-transform duration-300 origin-center"
            :class="{ 'rotate-45 translate-y-[6px]': isMenuOpen }"
          ></span>
          <span
            class="block w-5 h-[1px] bg-ink transition-opacity duration-300"
            :class="{ 'opacity-0': isMenuOpen }"
          ></span>
          <span
            class="block w-5 h-[1px] bg-ink transition-transform duration-300 origin-center"
            :class="{ '-rotate-45 -translate-y-[6px]': isMenuOpen }"
          ></span>
        </button>
      </div>
    </div>

    <div
      class="lg:hidden absolute top-[60px] left-0 right-0 bg-parchment overflow-hidden transition-all duration-300 ease-in-out border-b border-line"
      :class="
        isMenuOpen
          ? 'max-h-[500px] opacity-100'
          : 'max-h-0 opacity-0 border-transparent'
      "
    >
      <div class="px-5 py-8 flex flex-col gap-6">
        <ul class="flex flex-col gap-6">
          <li v-for="item in routes" :key="item">
            <NuxtLink
              :to="`/${item}`"
              active-class="text-terra"
              class="font-josefin text-[14px] font-semibold tracking-[0.2em] uppercase text-muted transition-colors duration-200 hover:text-terra block"
              :class="item === 'filosofi' ? 'text-terra/70' : ''"
              @click="isMenuOpen = false"
            >
              {{ $t(`nav.${item}`) }}
            </NuxtLink>
          </li>
        </ul>
        <div
          class="pt-6 border-t border-line flex justify-between items-center"
        >
          <span
            class="font-josefin text-[10px] font-light tracking-[0.15em] uppercase text-muted"
          >
            Vol. I // Yogyakarta
          </span>
        </div>
      </div>
    </div>
    <GlobalSearch :isOpen="isSearchOpen" @close="isSearchOpen = false" />
  </nav>
</template>
