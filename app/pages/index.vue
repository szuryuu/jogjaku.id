<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";

definePageMeta({ layout: "story" });

setPageSeo({
  title: "JogjaKu — Panduan Wisata, Budaya, Kuliner, dan Sejarah Yogyakarta",
  description:
    "Eksplorasi Yogyakarta lewat panduan wisata, sejarah, budaya, kuliner, pendidikan, teknologi, peta interaktif, dan Sumbu Filosofi.",
  path: "/",
});

useJsonLd({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JogjaKu",
  url: "https://jogjaku.id",
  description:
    "Panduan lengkap Yogyakarta untuk wisata, sejarah, budaya, kuliner, pendidikan, teknologi, peta interaktif, dan Sumbu Filosofi.",
  inLanguage: "id-ID",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://jogjaku.id/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});

useJsonLd({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JogjaKu",
  url: "https://jogjaku.id/",
  logo: "https://jogjaku.id/icon-512.png",
  sameAs: ["https://jogjaku.id/"],
});

const cursorRef = ref<HTMLElement | null>(null);
const isMounted = ref(false);
const hasFinePointer = ref(false);
const isDarkBg = ref(false);

let xTo: ReturnType<typeof gsap.quickTo>;
let yTo: ReturnType<typeof gsap.quickTo>;

const onMove = (e: MouseEvent) => {
  if (xTo && yTo) {
    xTo(e.clientX);
    yTo(e.clientY);

    const target = document.elementFromPoint(
      e.clientX,
      e.clientY,
    ) as HTMLElement | null;
    if (target) {
      isDarkBg.value = !!target.closest(
        ".bg-\\[\\#1a1208\\], .bg-ink, .bg-terra",
      );
    }
  }
};

onMounted(async () => {
  isMounted.value = true;
  hasFinePointer.value = window.matchMedia("(pointer: fine)").matches;

  await nextTick();

  if (hasFinePointer.value) {
    document.body.classList.add("hide-default-cursor");

    if (cursorRef.value) {
      gsap.set(cursorRef.value, { xPercent: -50, yPercent: -50 });

      xTo = gsap.quickTo(cursorRef.value, "x", {
        duration: 0.15,
        ease: "power3.out",
      });
      yTo = gsap.quickTo(cursorRef.value, "y", {
        duration: 0.15,
        ease: "power3.out",
      });

      window.addEventListener("mousemove", onMove);
    }
  }
});

onUnmounted(() => {
  document.body.classList.remove("hide-default-cursor");
  window.removeEventListener("mousemove", onMove);
});
</script>

<template>
  <div class="min-h-screen bg-parchment relative w-full overflow-hidden flex flex-col">
    <StoryHomeStoryContainer>
      <StoryChapterHero />
      <StoryChapterSejarah />
      <StoryChapterBudaya />
      <StoryChapterFilosofi />
      <StoryChapterWisata />
      <StoryChapterKuliner />
      <StoryChapterPendidikan />
      <StoryChapterTeknologi />
      <StoryChapterPeta />
      <StoryChapterClosing />
    </StoryHomeStoryContainer>
  </div>

    <Teleport to="body" v-if="isMounted && hasFinePointer">
      <div
        ref="cursorRef"
        class="fixed top-0 left-0 w-10 h-10 flex items-center justify-center rounded-full pointer-events-none z-[10000] transform-gpu font-josefin text-[18px] font-bold italic uppercase transition-colors duration-300 shadow-xl"
        :class="isDarkBg ? 'bg-parchment text-ink' : 'bg-ink text-parchment'"
      >
        <span class="mt-[2px]">J</span>
      </div>
    </Teleport>
</template>

<style>
.hide-default-cursor,
.hide-default-cursor * {
  cursor: none !important;
}
</style>
