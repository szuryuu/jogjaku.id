<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const railDots = ref<HTMLElement[]>([]);
let revealObserver: IntersectionObserver | null = null;
let chapterObserver: IntersectionObserver | null = null;
let ticking = false;
let parallaxEls: HTMLElement[] = [];
let reducedMotion = true;

const setRailDots = (els: HTMLElement[]) => {
  railDots.value = els;
};

const updateParallax = () => {
  const vh = window.innerHeight;
  for (const el of parallaxEls) {
    const rect = el.getBoundingClientRect();
    const progress = (rect.top - vh / 2) / vh;
    el.style.transform = `translateY(${progress * 24}px)`;
  }
  ticking = false;
};

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reducedMotion && "IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    document.querySelectorAll(".reveal-up").forEach((el) => revealObserver!.observe(el));

    chapterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.chapter);
            for (const dot of railDots.value) {
              dot.dataset.active =
                Number(dot.dataset.index) === idx ? "" : undefined;
            }
          }
        }
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll(".chapter").forEach((c) => chapterObserver!.observe(c));

    parallaxEls = Array.from(document.querySelectorAll(".parallax-img"));
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();
  } else {
    document.querySelectorAll(".reveal-up").forEach((el) => el.classList.add("in-view"));
  }
});

onUnmounted(() => {
  revealObserver?.disconnect();
  revealObserver = null;
  chapterObserver?.disconnect();
  chapterObserver = null;
});
</script>

<template>
  <div>
    <slot />
  </div>
</template>
