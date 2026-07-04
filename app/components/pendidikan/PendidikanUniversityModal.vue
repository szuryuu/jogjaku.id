<script setup lang="ts">
import { watch, ref, nextTick, onBeforeUnmount } from "vue";
import { X, MapPin } from "lucide-vue-next";

interface University {
  name: string;
  image: string;
  displayDescription?: string;
  displayStrength?: string;
  displayAtmosphere?: string;
  displayDetail?: string;
  mapsUrl?: string;
}

const props = defineProps<{
  university: University | null;
  open: boolean;
  closeLabel?: string;
  openMapsLabel?: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const modalRef = ref<HTMLElement | null>(null);
const closeBtnRef = ref<HTMLButtonElement | null>(null);
const previousFocus = ref<HTMLElement | null>(null);

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const getFocusableElements = (): HTMLElement[] => {
  if (!modalRef.value) return [];
  return Array.from(
    modalRef.value.querySelectorAll<HTMLElement>(focusableSelector),
  );
};

const trapFocus = (e: KeyboardEvent) => {
  if (e.key !== "Tab") return;

  const focusable = getFocusableElements();
  if (focusable.length === 0) {
    e.preventDefault();
    return;
  }

  const first = focusable[0]!;
  const last = focusable[focusable.length - 1]!;

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    emit("close");
    return;
  }
  trapFocus(e);
};

const close = () => {
  emit("close");
};

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      previousFocus.value = document.activeElement as HTMLElement;
      await nextTick();
      closeBtnRef.value?.focus();
    } else {
      previousFocus.value?.focus();
      previousFocus.value = null;
    }
  },
);

onBeforeUnmount(() => {
  if (props.open) {
    previousFocus.value?.focus();
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open && university"
      ref="modalRef"
      class="fixed inset-0 z-[200] flex items-center justify-center bg-[#1a1208]/60 backdrop-blur-sm px-[5vw] py-[5vw]"
      role="dialog"
      aria-modal="true"
      :aria-label="university.name"
      @keydown="handleKeydown"
      @click.self="close"
    >
      <div
        class="bg-warm-white max-w-lg w-full rounded-lg p-10 relative max-h-[85vh] overflow-y-auto border border-line shadow-2xl"
      >
        <button
          ref="closeBtnRef"
          type="button"
          class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-warm-white/90 border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-warm-white transition-colors"
          :aria-label="closeLabel || 'Close'"
          @click="close"
        >
          <X class="w-4 h-4" />
        </button>

        <div class="h-48 mb-6 bg-[#1a1208] rounded overflow-hidden relative">
          <AppImage
            :src="university.image"
            :alt="university.name"
            class="w-full h-full object-cover opacity-90"
            loading="lazy"
          />
        </div>

        <h3 class="font-libre text-2xl font-bold text-ink mb-2 pr-8">
          {{ university.name }}
        </h3>
        <p class="text-sm text-terra mb-4">
          {{ university.displayAtmosphere }}
        </p>
        <p class="text-sm leading-relaxed text-brown/80 mb-4">
          {{ university.displayStrength }}
        </p>
        <p class="text-xs leading-relaxed text-muted mb-6">
          {{ university.displayDetail || university.displayDescription }}
        </p>

        <a
          v-if="university.mapsUrl"
          :href="university.mapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex w-full items-center justify-center gap-2 bg-terra text-[#faf7f2] px-6 py-4 font-josefin text-[10px] font-semibold tracking-[0.18em] uppercase hover:bg-ink transition-colors duration-300"
        >
          <MapPin class="w-4 h-4" />
          {{ openMapsLabel || 'Open Maps' }}
        </a>
      </div>
    </div>
  </Teleport>
</template>
