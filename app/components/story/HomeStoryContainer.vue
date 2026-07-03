<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



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
  // ponytail: expand bottom margin so animations fire ~15vh before the
  // element enters the viewport — the 0.9s tweens finish before the user
  // scrolls there. Add a tiny threshold to avoid firing on layout paint.
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
});

function getDelay(el: HTMLElement): number {
  if (el.classList.contains("delay-100")) return 0.05;
  if (el.classList.contains("delay-200")) return 0.1;
  if (el.classList.contains("delay-300")) return 0.15;
  if (el.classList.contains("delay-400")) return 0.2;
  return 0;
}

// ponytail: minimal per-variant config — shared easing/duration, variant
// only swaps the initial Y offset and whether images get a gentle scale-in
// ponytail: each chapter gets its own motion signature — no more uniform fade-up
function animateEntry(el: HTMLElement) {
  const chapter = el.closest(".chapter") as HTMLElement | null;
  const chIdx = Number(chapter?.dataset.chapter ?? -1);
  const delay = getDelay(el);
  const isParallax = el.classList.contains("parallax-img");

  // Parallax images: Y is scrubbed, only animate opacity + gentle scale
  if (isParallax) {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay },
    );
    return;
  }

  switch (chIdx) {
    case 0: // Hero — cinematic zoom-in
      gsap.fromTo(el, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", delay });
      break;
    case 1: // Sejarah — text slides from left
      gsap.fromTo(el, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", delay });
      break;
    case 2: // Budaya — drop in from above with slight bounce
      gsap.fromTo(el, { opacity: 0, y: -40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)", delay });
      break;
    case 3: // Filosofi — gentle rotate + scale
      gsap.fromTo(el, { opacity: 0, rotate: -1.5, scale: 0.95 }, { opacity: 1, rotate: 0, scale: 1, duration: 0.55, ease: "power2.out", delay });
      break;
    case 4: // Wisata — text slides from right (reverse layout)
      gsap.fromTo(el, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", delay });
      break;
    case 5: // Kuliner — pop-in with elastic bounce
      gsap.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", delay });
      break;
    case 6: // Pendidikan — subtle upward lift
      gsap.fromTo(el, { opacity: 0, y: -18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out", delay });
      break;
    case 7: // Teknologi — slight horizontal nudge
      gsap.fromTo(el, { opacity: 0, x: 12, skewX: 1.5 }, { opacity: 1, x: 0, skewX: 0, duration: 0.45, ease: "power2.out", delay });
      break;
    case 8: // Peta — slide in from right
      gsap.fromTo(el, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", delay });
      break;
    case 9: // Closing — staggered scale with gentle bounce
      gsap.fromTo(el, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)", delay });
      break;
    default:
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay });
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
