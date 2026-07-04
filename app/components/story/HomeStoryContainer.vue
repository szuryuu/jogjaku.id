<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

let ctx: gsap.Context | null = null;
let observer: IntersectionObserver | null = null;
let splitInstances: SplitText[] = [];
let resizeTimer: ReturnType<typeof setTimeout> | null = null;

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
    { threshold: 0.01, rootMargin: "0px 0px 30% 0px" },
  );

  document.querySelectorAll(".reveal-up").forEach((el) => observer!.observe(el));

  window.addEventListener("resize", handleResize);
});

function handleResize() {
  if (resizeTimer) clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // ponytail: revert SplitText + clear lingering inline opacity so CSS can hide again
    splitInstances.forEach((s) => {
      s.revert();
      (s.elements[0] as HTMLElement).style.removeProperty("opacity");
    });
    splitInstances = [];
    observer!.disconnect();
    document.querySelectorAll(".reveal-up").forEach((el) => observer!.observe(el));
  }, 200);
}

function getDelay(el: HTMLElement): number {
  if (el.classList.contains("delay-100")) return 0.05;
  if (el.classList.contains("delay-200")) return 0.1;
  if (el.classList.contains("delay-300")) return 0.15;
  if (el.classList.contains("delay-400")) return 0.2;
  return 0;
}

// ponytail: per-chapter line-reveal via SplitText. Parallax images keep their
// existing opacity+scale animation (no SplitText).
function animateEntry(el: HTMLElement) {
  const chapter = el.closest(".chapter") as HTMLElement | null;
  const chIdx = Number(chapter?.dataset.chapter ?? -1);
  const delay = getDelay(el);
  const isParallax = el.classList.contains("parallax-img");

  // Parallax images: keep existing opacity + scale animation
  if (isParallax) {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay },
    );
    return;
  }

  // ponytail: containers with child elements (nav grids, button groups) can't
  // use SplitText — it replaces innerHTML. Fall back to block-level opacity+y.
  const hasChildren = el.children.length > 0;
  if (hasChildren) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", delay },
    );
    return;
  }

  // Text elements: line-reveal via SplitText
  const split = new SplitText(el, { type: "lines", linesClass: "split-line" });
  splitInstances.push(split);

  // Override CSS opacity so line wrappers are visible
  gsap.set(el, { opacity: 1 });

  let dur = 0.8;
  let stgr: number = 0.08;
  let ez = "power3.out";
  let fromOpacity: number | undefined;

  switch (chIdx) {
    case 0: stgr = 0.06; ez = "power4.out"; break;
    case 1: stgr = 0.1; dur = 0.6; fromOpacity = 0; break;
    case 2: ez = "back.out(1.4)"; stgr = 0.08; break;
    case 3: stgr = 0.05; ez = "power2.out"; break;
    case 4: stgr = 0.09; ez = "power3.inOut"; break;
    case 5: ez = "elastic.out(1,0.5)"; stgr = 0.1; dur = 1; break;
    case 6: stgr = 0.07; dur = 0.6; break;
    case 7: stgr = 0.04; ez = "power2.out"; break;
    case 8: stgr = 0.1; dur = 0.9; break;
    case 9: ez = "back.out(1.7)"; stgr = 0.12; dur = 0.7; break;
  }

  const setVars: Record<string, unknown> = { yPercent: 100 };
  if (fromOpacity !== undefined) setVars.opacity = fromOpacity;
  gsap.set(split.lines, setVars);

  const toVars: Record<string, unknown> = {
    yPercent: 0,
    duration: dur,
    stagger: stgr,
    ease: ez,
  };
  if (fromOpacity !== undefined) toVars.opacity = 1;
  if (delay > 0) toVars.delay = delay;

  gsap.to(split.lines, toVars);
}

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (resizeTimer) clearTimeout(resizeTimer);
  splitInstances.forEach((s) => s.revert());
  splitInstances = [];
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

<style scoped>
.split-line {
  overflow: hidden;
}
</style>
