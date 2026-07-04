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
    <div class="bg-warm-white border border-line p-8 lg:p-10">
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
            >{{ t("budaya.translator_placeholder") }}</label
          >
          <textarea
            v-model="sourceText"
            class="w-full h-32 bg-parchment border border-line p-4 text-[15px] font-light focus:outline-none focus:border-terra transition-colors resize-none placeholder:text-muted/50"
            :placeholder="locale === 'en' ? 'Type a word or name...' : 'Ketik kata atau nama...'"
          ></textarea>
          <button
            @click="handleTranslate"
            :disabled="isTranslating || !sourceText.trim()"
            class="bg-ink text-warm-white py-3 px-6 font-josefin text-[10px] uppercase tracking-[0.25em] hover:bg-terra transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
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
            >{{ t("budaya.aksara") }}</label
          >
          <div
            class="w-full h-32 bg-parchment border border-line p-4 flex items-center overflow-x-auto"
            style="font-family: &quot;Noto Sans Javanese&quot;, sans-serif"
          >
            <span
              :class="translatedText ? 'text-2xl lg:text-3xl text-ink' : 'text-sm italic text-muted'"
              class="leading-relaxed transition-all duration-500"
            >
              {{ translatedText || t("budaya.translator_waiting") }}
            </span>
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

</style>
