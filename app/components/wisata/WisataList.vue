<script setup lang="ts">
import { Clock, Ticket, Bus, Map, MapPin, Share2 } from "lucide-vue-next";
import { useI18n } from "#imports";

defineProps<{
  destinations: any[];
  activeDestination: string;
}>();

const emit = defineEmits(["update:activeDestination"]);

const { t } = useI18n();
const toast = useToast();

const getGoogleMapsUrl = (item: any) =>
  `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;

const shareDestination = async (item: any) => {
  const shareData = {
    title: `${item.title} - Jiwa Nusantara`,
    text: item.displayDesc,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {}
    return;
  }

  try {
    await navigator.clipboard.writeText(
      `${shareData.title}\n${shareData.text}\n\n${shareData.url}`,
    );
    toast.show(t("wisata.share_success"), "success");
  } catch {
    toast.show(t("wisata.share_failed"), "error");
  }
};
</script>

<template>
  <div v-observe class="flex flex-col reveal-up print:w-full">
    <h1
      class="hidden print:block font-libre text-[32px] font-bold text-ink mb-10 border-b-2 border-ink pb-4"
    >
      Yogyakarta Tourist Guide
    </h1>
    <button
      v-for="(item, index) in destinations"
      :key="item.id"
      @click="emit('update:activeDestination', item.id)"
      :aria-label="`Tampilkan info destinasi ${item.title}`"
      class="text-left p-6 lg:p-8 border-b border-line last:border-b-0 transition-all duration-300 group relative overflow-hidden flex flex-col print:border-b-2 print:border-ink print:mb-8 print:p-0 print:break-inside-avoid"
      :class="activeDestination === item.id ? 'bg-ink' : 'hover:bg-ink/5'"
    >
      <div
        class="absolute left-0 top-0 bottom-0 w-1 bg-terra transition-transform duration-300 origin-top print:hidden"
        :class="
          activeDestination === item.id
            ? 'scale-y-100'
            : 'scale-y-0 group-hover:scale-y-100'
        "
      ></div>
      <div class="flex justify-between items-start w-full gap-4">
        <!-- stop number -->
        <div
          class="w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 flex items-center justify-center font-josefin text-xs lg:text-sm font-bold flex-shrink-0 transition-colors duration-300 print:border-black print:text-black"
          :class="
            activeDestination === item.id
              ? 'bg-terra text-warm-white border-terra'
              : 'border-terra/30 text-terra/60'
          "
        >
          {{ String(index + 1).padStart(2, '0') }}
        </div>
        <div class="flex-1 min-w-0">
          <div
            class="font-josefin text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 transition-colors duration-300 flex items-center gap-2 print:text-black"
            :class="
              activeDestination === item.id ? 'text-terra' : 'text-terra/70'
            "
          >
            <MapPin class="w-3 h-3" /> {{ item.area }}
          </div>
          <h2
            class="font-libre text-[24px] lg:text-[28px] font-bold mb-4 transition-colors duration-300 print:text-black"
            :class="
              activeDestination === item.id
                ? 'text-parchment'
                : 'text-ink group-hover:text-ink/80'
            "
          >
            {{ item.title }}
          </h2>
        </div>
        <div class="flex flex-col gap-2 print:hidden">
          <div
            @click.stop="shareDestination(item)"
            class="p-2 border rounded-full hover:bg-terra hover:text-warm-white hover:border-terra transition-all cursor-pointer"
            :class="
              activeDestination === item.id
                ? 'border-parchment text-parchment'
                : 'border-line text-muted'
            "
            :title="$t('wisata.share_title')"
          >
            <Share2 class="w-4 h-4" />
          </div>
          <a
            :href="getGoogleMapsUrl(item)"
            target="_blank"
            rel="noopener noreferrer"
            @click.stop
            class="p-2 border rounded-full hover:bg-terra hover:text-warm-white hover:border-terra transition-all cursor-pointer"
            :class="
              activeDestination === item.id
                ? 'border-parchment text-parchment'
                : 'border-line text-muted'
            "
            :title="$t('wisata.open_google_maps')"
            :aria-label="$t('wisata.open_google_maps')"
          >
            <Map class="w-4 h-4" />
          </a>
        </div>
      </div>
      <p
        class="text-[14px] font-light leading-[1.8] transition-colors duration-300 mb-5 max-w-[800px] print:text-black"
        :class="
          activeDestination === item.id ? 'text-parchment/80' : 'text-brown'
        "
      >
        {{ item.displayDesc }}
      </p>
      <div
        class="flex flex-col gap-3 pt-4 border-t font-josefin text-[9px] tracking-[0.15em] transition-colors duration-300 w-full print:text-black print:border-black"
        :class="
          activeDestination === item.id
            ? 'text-parchment/80 border-parchment/20'
            : 'text-muted border-line/30'
        "
      >
        <div class="flex items-center gap-3">
          <Clock class="w-3 h-3 text-terra print:text-black" />
          {{ item.hours }}
        </div>
        <div class="flex items-center gap-3">
          <Ticket class="w-3 h-3 text-terra print:text-black" />
          {{ item.price }}
        </div>
        <div class="flex items-center gap-3">
          <Bus class="w-3 h-3 text-terra print:text-black" />
          {{ item.transport }}
        </div>
      </div>
    </button>
  </div>
</template>
