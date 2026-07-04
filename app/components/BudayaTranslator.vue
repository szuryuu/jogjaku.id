<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "#imports";

const { t, locale } = useI18n();
const sourceText = ref("");
const translatedText = ref("");
const isTranslating = ref(false);

const handleTranslate = async () => {
  if (!sourceText.value.trim() || isTranslating.value) return;
  isTranslating.value = true;
  try {
    const response = await $fetch<any>("/api/chat", {
      method: "POST",
      body: {
        message: `Bantu saya menerjemahkan atau menuliskan teks ini ke/dari Aksara Jawa: "${sourceText.value}"`,
        locale: locale.value,
      },
    });
    translatedText.value = response.reply;
  } catch {
    translatedText.value = t("budaya.translator_error");
  } finally {
    isTranslating.value = false;
  }
};
</script>

<template>
  <div v-observe class="mt-16 max-w-4xl mx-auto reveal-up">
    <div
      class="bg-parchment border border-line p-8 lg:p-10 relative overflow-hidden"
    >
      <div class="relative z-10">
        <h3
          class="font-libre text-[20px] font-bold text-ink mb-6 flex items-center gap-4"
        >
          <span class="w-8 h-[1px] bg-terra"></span>
          {{ t("budaya.translator_title") }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-3">
            <label
              class="font-josefin text-[9px] uppercase tracking-[0.2em] text-muted"
              >Input</label
            >
            <textarea
              v-model="sourceText"
              class="w-full h-28 bg-warm-white border border-line p-4 text-[13px] font-light focus:outline-none focus:border-terra transition-colors resize-none"
              :placeholder="t('budaya.translator_placeholder')"
            ></textarea>
            <button
              @click="handleTranslate"
              :disabled="isTranslating || !sourceText.trim()"
              class="bg-ink text-warm-white py-3 px-6 font-josefin text-[10px] uppercase tracking-[0.2em] hover:bg-terra transition-all disabled:opacity-50 flex items-center justify-center gap-2 rounded-full shadow-md hover:shadow-lg active:shadow-sm active:translate-y-px"
            >
              <span
                v-if="isTranslating"
                class="w-3 h-3 border-2 border-warm-white border-t-transparent animate-spin rounded-full"
              ></span>
              {{ t("budaya.translate_btn") }}
            </button>
          </div>
          <div class="flex flex-col gap-3">
            <label
              class="font-josefin text-[9px] uppercase tracking-[0.2em] text-muted"
              >Nexus AI Output</label
            >
            <div
              class="seal-impression w-full h-48 lg:h-56 flex items-center justify-center p-6 text-center overflow-hidden"
              style="font-family: &quot;Noto Sans Javanese&quot;, sans-serif"
            >
              <span
                :class="translatedText ? 'text-xl lg:text-2xl text-brown' : 'text-sm italic text-muted'"
                class="leading-relaxed transition-all duration-500"
              >
                {{ translatedText || t("budaya.translator_waiting") }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-up.in-view {
  opacity: 1;
  transform: translateY(0);
}

.seal-impression {
  border-radius: 40px;
  background: var(--bg-warm-white);
  /* ponytail: two-concentric-ring seal border — the visual language, not a perfect wax sim */
  box-shadow:
    inset 0 2px 6px rgba(0, 0, 0, 0.08),
    0 0 0 3px var(--border-line),
    0 0 0 7px rgba(26, 18, 8, 0.04);
}
</style>
