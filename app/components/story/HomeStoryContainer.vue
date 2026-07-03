<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ponytail: unified motion tokens — single source of truth for all chapter animations
const EASE = "power3.out";
const DURATION = 0.9;
const IMG_DURATION = 1.05;

let ctx: gsap.Context | null = null;
let observer: IntersectionObserver | null = null;

onMounted(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const railDots = Array.from(document.querySelectorAll(".progress-rail .dot"));

  if (reducedMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal-up, .reveal-img").forEach((el) => el.classList.add("in-view"));
    return;
  }

  ctx = gsap.context(() => {
    // ── Parallax (scrubbed, transform-only) ──
    gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 12 },
        {
          y: -12,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest(".chapter") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    // ── Progress rail ──
    document.querySelectorAll(".chapter").forEach((chapter) => {
      ScrollTrigger.create({
        trigger: chapter,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: ({ isActive }) => {
          if (!isActive) return;
          const idx = Number((chapter as HTMLElement).dataset.chapter);
          railDots.forEach((dot) => {
            if (Number((dot as HTMLElement).dataset.index) === idx) dot.setAttribute("data-active", "");
            else dot.removeAttribute("data-active");
          });
        },
      });
    });
  });

  // ── Reveal animations (outside context — one-shot tweens, no ScrollTrigger) ──
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        animateEntry(entry.target as HTMLElement);
        observer!.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
  );

  document.querySelectorAll(".reveal-up, .reveal-img").forEach((el) => observer!.observe(el));
});

function getDelay(el: HTMLElement): number {
  if (el.classList.contains("delay-100")) return 0.1;
  if (el.classList.contains("delay-200")) return 0.2;
  if (el.classList.contains("delay-300")) return 0.3;
  if (el.classList.contains("delay-400")) return 0.4;
  return 0;
}

// ponytail: minimal per-variant config — shared easing/duration, variant
// only swaps the initial Y offset and whether images get a gentle scale-in
function animateEntry(el: HTMLElement) {
  const chapter = el.closest(".chapter") as HTMLElement | null;
  const variant = chapter?.dataset.variant || "center";
  const delay = getDelay(el);
  const isParallax = el.classList.contains("parallax-img");
  const isImg = el.classList.contains("reveal-img");

  // ponytail: parallax elements get their Y from the scrub — reveal animates opacity + optional scale only
  if (isParallax) {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: IMG_DURATION, ease: EASE, delay },
    );
    return;
  }

  // Standalone image reveal
  if (isImg) {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.94, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: IMG_DURATION, ease: EASE, delay },
    );
    return;
  }

  // Text / typographic / generic reveal — variant controls Y offset flavor
  const yFrom = variantY(variant, el);
  gsap.fromTo(
    el,
    { opacity: 0, y: yFrom },
    { opacity: 1, y: 0, duration: DURATION, ease: EASE, delay },
  );
}

// ponytail: each variant gets a distinct, subtle motion character
function variantY(variant: string, _el: HTMLElement): number {
  switch (variant) {
    case "center":    return 56;  // cinematic — Hero, Filosofi, Closing
    case "staggered": return 40;  // side-text reveal — Sejarah, Wisata, Peta
    case "focus":     return 52;  // image-first — Budaya, Kuliner
    case "typographic": return 36; // clean, tight — Pendidikan, Teknologi
    default:          return 48;
  }
}

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
  ctx?.revert();
  ctx = null;
});
</script>

<template>
  <div :class="{ 'gsap-ready': true }">
    <slot />
  </div>
</template>
