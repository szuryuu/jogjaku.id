<script setup lang="ts">
import { computed } from "vue";
import { useI18n, useAsyncData } from "#imports";

const { t, locale } = useI18n();

const { data: budayaData } = await useAsyncData("budaya", () =>
  $fetch<any>("/api/data/budaya"),
);

const culturalHeritage = computed(() => {
  if (!budayaData.value?.heritage) return [];
  const l = locale.value as "id" | "en";
  return budayaData.value.heritage.map((item: any) => ({
    ...item,
    displayTitle: item.title[l],
    displaySubtitle: item.subtitle[l],
    displayDescription: item.description[l],
    displayHighlights: item.highlights[l],
  }));
});

const festivals = computed(() => {
  if (!budayaData.value?.festivals) return [];
  const l = locale.value as "id" | "en";
  return budayaData.value.festivals.map((fest: any) => ({
    ...fest,
    displayName: fest.name[l],
    displayMonth: fest.month[l],
    displayDesc: fest.desc[l],
  }));
});

const hanacaraka = computed(() => budayaData.value?.hanacaraka ?? []);

setPageSeo({
  title: t("budaya.page_title"),
  description: t("budaya.header_desc"),
  path: "/budaya",
  image: "/images/budaya/kraton.jpg",
});
</script>

<template>
  <main
    class="min-h-screen pt-[120px] lg:pt-[180px] px-5 md:px-6 lg:px-[60px] pb-20 relative z-10"
  >
    <CategoryHeader
      v-observe
      class="reveal-up"
      :category="$t('budaya.category')"
      :title="$t('budaya.header_title')"
      :description="$t('budaya.header_desc')"
    />

    <BudayaHeritage :items="culturalHeritage" />

    <BudayaFestivals :items="festivals" />

    <BudayaHanacaraka :items="hanacaraka" />

    <BudayaTranslator />
  </main>
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
