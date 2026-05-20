<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useI18n } from "#imports";
import {
  X,
  Send,
  Sparkles,
  User,
  ArrowLeft,
  Map,
  Bot,
  AlertTriangle,
  Printer,
} from "lucide-vue-next";

const { t, locale } = useI18n();
const isOpen = ref(false);
const activeView = ref<"menu" | "chat" | "planner">("menu");

const inputMessage = ref("");
const isLoadingChat = ref(false);
const chatContainer = ref<HTMLElement | null>(null);

const chatHistory = ref<{ role: string; text: string }[]>([]);

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoadingChat.value) return;

  const userText = inputMessage.value;
  chatHistory.value.push({ role: "user", text: userText });
  inputMessage.value = "";
  isLoadingChat.value = true;
  await scrollToBottom();

  try {
    const response = await $fetch("/api/chat", {
      method: "POST",
      body: { message: userText, locale: locale.value },
    });

    if (response && response.reply) {
      chatHistory.value.push({ role: "ai", text: response.reply });
    } else {
      throw new Error("Invalid API Response");
    }
  } catch (error: any) {
    chatHistory.value.push({
      role: "ai",
      text: t("ai_guide.error_connection"),
    });
  } finally {
    isLoadingChat.value = false;
    await scrollToBottom();
  }
};

const plannerForm = ref({
  days: 2,
  interest: "campuran",
});
const isGeneratingPlanner = ref(false);
const itinerary = ref<any[] | null>(null);
const plannerError = ref<string | null>(null);

const interests = computed(() => [
  { id: "sejarah", label: t("ai_guide.interests.sejarah") },
  { id: "alam", label: t("ai_guide.interests.alam") },
  { id: "kuliner", label: t("ai_guide.interests.kuliner") },
  { id: "pendidikan", label: t("ai_guide.interests.pendidikan") },
  { id: "campuran", label: t("ai_guide.interests.campuran") },
]);

const generatePlan = async () => {
  isGeneratingPlanner.value = true;
  itinerary.value = null;
  plannerError.value = null;

  try {
    const response = await $fetch("/api/planner", {
      method: "POST",
      body: { ...plannerForm.value, locale: locale.value },
    });

    if (response && response.plan && Array.isArray(response.plan)) {
      itinerary.value = response.plan.map((d: any, index: number) => {
        let rawActivities =
          d.kegiatan ||
          d.activities ||
          d.aktivitas ||
          d.agenda ||
          d.itinerary ||
          d.schedule;

        if (!rawActivities) {
          const potentialKeys = Object.keys(d).filter(
            (k) => !["hari", "day", "date"].includes(k.toLowerCase()),
          );
          if (potentialKeys.length > 0) {
            rawActivities = potentialKeys.map((k) => ({
              waktu: k,
              kegiatan: d[k],
            }));
          } else {
            rawActivities = [];
          }
        }

        if (!Array.isArray(rawActivities)) {
          if (typeof rawActivities === "object" && rawActivities !== null) {
            rawActivities = Object.entries(rawActivities).map(([k, v]) => ({
              waktu: k,
              kegiatan: v,
            }));
          } else {
            rawActivities = [String(rawActivities)];
          }
        }

        const normalizedActivities = rawActivities.map((act: any) => {
          if (typeof act === "string") {
            const parts = act.split(/:\s*(.+)/);
            const waktu = parts[0]?.trim();
            const kegiatan = parts[1]?.trim();
            if (waktu && kegiatan) {
              return {
                waktu,
                kegiatan,
                deskripsi: "",
              };
            }
            return { waktu: "-", kegiatan: act, deskripsi: "" };
          } else if (typeof act === "object" && act !== null) {
            return {
              waktu: act.waktu || act.time || act.jam || "-",
              kegiatan:
                act.kegiatan ||
                act.activity ||
                act.title ||
                act.aktivitas ||
                act.nama ||
                Object.values(act)[0] ||
                "Aktivitas",
              deskripsi: act.deskripsi || act.desc || act.description || "",
            };
          }
          return {
            waktu: "-",
            kegiatan: "Aktivitas tidak diketahui",
            deskripsi: "",
          };
        });

        return {
          day: d.hari || d.day || index + 1,
          kegiatan: normalizedActivities,
        };
      });
    } else {
      throw new Error("JSON structure mismatch");
    }
  } catch (error: any) {
    plannerError.value = t("ai_guide.planner_error");
  } finally {
    isGeneratingPlanner.value = false;
  }
};

const downloadPDF = () => {
  if (!itinerary.value) return;

  const docTitle = t("ai_guide.pdf_filename", {
    days: plannerForm.value.days,
  });
  const headerText = t("ai_guide.pdf_title", {
    days: plannerForm.value.days,
  });
  const dayText = t("ai_guide.day");

  let printContent = `
    <!DOCTYPE html>
    <html lang="${locale.value}">
    <head>
      <meta charset="UTF-8">
      <title>${docTitle}</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1208; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; }
        h1 { font-family: 'Georgia', serif; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #1a1208; padding-bottom: 15px; margin-bottom: 30px; }
        .day-block { margin-bottom: 40px; page-break-inside: avoid; }
        h2 { font-size: 16px; text-transform: uppercase; letter-spacing: 2px; color: #c84b31; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 20px; }
        .activity { margin-bottom: 20px; display: flex; flex-direction: column; gap: 6px; }
        .time { font-size: 10px; font-weight: bold; color: #c84b31; text-transform: uppercase; letter-spacing: 1px; }
        .details { border-left: 2px solid #ddd; padding-left: 14px; padding-top: 2px; padding-bottom: 2px; }
        .title { font-weight: bold; font-size: 15px; margin-bottom: 4px; color: #1a1208; }
        .desc { font-size: 13px; color: #555; }
        @media print {
          body { padding: 0; }
          @page { margin: 2cm; }
        }
      </style>
    </head>
    <body>
      <h1>${headerText}</h1>
  `;

  itinerary.value.forEach((day: any) => {
    printContent += `
      <div class="day-block">
        <h2>${dayText} ${day.day}</h2>
    `;

    if (day.kegiatan && day.kegiatan.length > 0) {
      day.kegiatan.forEach((act: any) => {
        printContent += `
          <div class="activity">
            <div class="time">${act.waktu || "-"}</div>
            <div class="details">
              <div class="title">${act.kegiatan || ""}</div>
              ${act.deskripsi ? `<div class="desc">${act.deskripsi}</div>` : ""}
            </div>
          </div>
        `;
      });
    } else {
      printContent += `<p>${t("ai_guide.no_activity")}</p>`;
    }
    printContent += `</div>`;
  });

  printContent += `</body></html>`;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
};
</script>

<template>
  <div
    class="fixed inset-x-4 bottom-4 z-50 flex flex-col items-end sm:inset-x-auto sm:right-6 sm:bottom-6"
  >
    <transition name="slide-up">
      <div
        v-if="isOpen"
        class="mb-4 w-full max-w-[min(400px,calc(100vw-2rem))] h-[min(580px,calc(100dvh-6rem))] min-h-[420px] bg-warm-white rounded-2xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right border border-line/30 transition-colors duration-300"
      >
        <div
          class="bg-ink p-4 flex items-center justify-between text-warm-white transition-colors duration-300"
        >
          <div class="flex items-center gap-3">
            <button
              v-if="activeView !== 'menu'"
              @click="activeView = 'menu'"
              class="hover:bg-warm-white/10 p-1.5 rounded-lg transition-colors"
              :aria-label="$t('ai_guide.back_to_menu')"
            >
              <ArrowLeft class="w-4 h-4" />
            </button>
            <Sparkles v-else class="w-5 h-5 text-terra" />

            <div>
              <div
                class="font-josefin text-[12px] tracking-[0.1em] text-terra uppercase font-semibold"
              >
                {{
                  activeView === "menu"
                    ? "Nexus AI"
                    : activeView === "chat"
                      ? $t("ai_guide.digital_guide")
                      : $t("ai_guide.trip_architect")
                }}
              </div>
              <div class="font-lato text-[10px] text-warm-white/50">
                JogjaKu (Beta)
              </div>
            </div>
          </div>
          <button
            @click="isOpen = false"
            class="hover:bg-warm-white/10 p-1.5 rounded-lg transition-colors"
            :aria-label="$t('ai_guide.close_panel')"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <div
          v-if="activeView === 'menu'"
          class="flex-grow p-5 flex flex-col justify-center gap-4 bg-parchment border-b border-line transition-colors duration-300"
        >
          <div class="text-center mb-6">
            <h3 class="font-libre text-[22px] font-bold text-ink mb-2">
              {{ $t("ai_guide.hello") }}
            </h3>
            <p class="text-[14px] text-brown font-light">
              {{ $t("ai_guide.help_prompt") }}
            </p>
          </div>

          <button
            @click="activeView = 'chat'"
            class="group bg-parchment border border-line p-5 rounded-xl hover:border-terra hover:shadow-md transition-all text-left flex items-start gap-4"
          >
            <div
              class="bg-ink/5 p-3 rounded-lg group-hover:bg-terra/10 transition-colors"
            >
              <Bot
                class="w-6 h-6 text-ink group-hover:text-terra transition-colors"
              />
            </div>
            <div>
              <div class="font-libre text-[16px] font-bold text-ink mb-1">
                {{ $t("ai_guide.ask_guide") }}
              </div>
              <div class="text-[12px] text-brown font-light leading-relaxed">
                {{ $t("ai_guide.ask_guide_desc") }}
              </div>
            </div>
          </button>

          <button
            @click="activeView = 'planner'"
            class="group bg-parchment border border-line p-5 rounded-xl hover:border-terra hover:shadow-md transition-all text-left flex items-start gap-4"
          >
            <div
              class="bg-ink/5 p-3 rounded-lg group-hover:bg-terra/10 transition-colors"
            >
              <Map
                class="w-6 h-6 text-ink group-hover:text-terra transition-colors"
              />
            </div>
            <div>
              <div class="font-libre text-[16px] font-bold text-ink mb-1">
                {{ $t("ai_guide.design_itinerary") }}
              </div>
              <div class="text-[12px] text-brown font-light leading-relaxed">
                {{ $t("ai_guide.design_itinerary_desc") }}
              </div>
            </div>
          </button>
        </div>

        <div
          v-if="activeView === 'chat'"
          class="flex-grow flex flex-col min-h-0 bg-parchment transition-colors duration-300"
        >
          <div
            ref="chatContainer"
            class="flex-grow overflow-y-auto p-5 flex flex-col gap-4"
          >
            <div
              class="max-w-[85%] p-3 rounded-2xl text-[14px] font-light leading-relaxed shadow-sm bg-warm-white border border-line text-ink self-start rounded-tl-sm transition-colors duration-300"
            >
              <div class="flex gap-2 items-start">
                <Sparkles class="w-3 h-3 mt-1 flex-shrink-0 text-terra" />
                <span>{{ $t("ai_guide.welcome_chat") }}</span>
              </div>
            </div>

            <div
              v-for="(msg, index) in chatHistory"
              :key="index"
              class="max-w-[85%] p-3 rounded-2xl text-[14px] font-light leading-relaxed shadow-sm transition-colors duration-300"
              :class="
                msg.role === 'ai'
                  ? 'bg-warm-white border border-line text-ink self-start rounded-tl-sm'
                  : 'bg-terra text-warm-white self-end rounded-tr-sm'
              "
            >
              <div class="flex gap-2 items-start">
                <Sparkles
                  v-if="msg.role === 'ai'"
                  class="w-3 h-3 mt-1 flex-shrink-0 text-terra"
                />
                <User
                  v-else
                  class="w-3 h-3 mt-1 flex-shrink-0 text-warm-white/70"
                />
                <span
                  class="whitespace-pre-wrap"
                  v-html="
                    msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  "
                ></span>
              </div>
            </div>

            <div
              v-if="isLoadingChat"
              class="bg-warm-white border border-line text-ink self-start p-3 rounded-2xl rounded-tl-sm max-w-[85%] flex items-center gap-2 text-[14px] transition-colors duration-300"
            >
              <Sparkles class="w-3 h-3 animate-spin text-terra" />
              <span class="text-muted italic">{{
                $t("ai_guide.drafting")
              }}</span>
            </div>
          </div>

          <form
            @submit.prevent="sendMessage"
            class="p-4 bg-parchment border-t border-line flex gap-2 flex-shrink-0 transition-colors duration-300"
          >
            <input
              v-model="inputMessage"
              type="text"
              :placeholder="$t('ai_guide.type_question')"
              class="flex-grow bg-warm-white border border-line rounded-xl px-4 py-2.5 text-[14px] font-light text-ink focus:outline-none focus:border-terra transition-colors"
              :disabled="isLoadingChat"
            />
            <button
              type="submit"
              class="bg-ink hover:bg-terra text-warm-white w-11 h-11 rounded-xl transition-colors flex items-center justify-center disabled:opacity-50"
              :disabled="isLoadingChat || !inputMessage.trim()"
            >
              <Send class="w-4 h-4" />
            </button>
          </form>
        </div>

        <div
          v-if="activeView === 'planner'"
          class="flex-grow overflow-y-auto p-5 flex flex-col bg-warm-white relative transition-colors duration-300"
        >
          <div
            v-if="plannerError"
            class="mb-6 p-4 bg-terra/10 border border-terra/20 rounded-xl flex items-start gap-3 transition-colors duration-300"
          >
            <AlertTriangle class="w-5 h-5 text-terra flex-shrink-0 mt-0.5" />
            <div class="text-[13px] text-terra leading-relaxed">
              {{ plannerError }}
            </div>
          </div>

          <div
            v-if="!itinerary && !isGeneratingPlanner"
            class="flex flex-col gap-6 animate-fade-in"
          >
            <div class="font-libre text-[18px] font-bold text-ink">
              {{ $t("ai_guide.how_long") }}
            </div>
            <div class="flex gap-2">
              <button
                v-for="d in [1, 2, 3, 4]"
                :key="d"
                @click="plannerForm.days = d"
                class="flex-1 py-3 rounded-xl border font-josefin text-[14px] transition-all"
                :class="
                  plannerForm.days === d
                    ? 'border-terra bg-terra text-warm-white shadow-md'
                    : 'border-line text-muted bg-parchment hover:border-ink'
                "
              >
                {{ d }} {{ $t("ai_guide.day_short") }}
              </button>
            </div>

            <div class="font-libre text-[18px] font-bold text-ink mt-2">
              {{ $t("ai_guide.interest_prompt") }}
            </div>
            <div class="flex flex-col gap-2">
              <button
                v-for="int in interests"
                :key="int.id"
                @click="plannerForm.interest = int.id"
                class="text-left px-4 py-3 rounded-xl border font-josefin text-[12px] tracking-[0.05em] uppercase transition-all"
                :class="
                  plannerForm.interest === int.id
                    ? 'border-terra bg-ink text-terra shadow-md'
                    : 'border-line text-muted bg-parchment hover:border-ink'
                "
              >
                {{ int.label }}
              </button>
            </div>

            <button
              @click="generatePlan"
              class="w-full bg-terra hover:bg-ink text-warm-white rounded-xl py-4 mt-4 font-josefin text-[12px] font-bold tracking-[0.2em] uppercase transition-all shadow-lg flex justify-center gap-2"
            >
              <Sparkles class="w-4 h-4" />
              {{ $t("ai_guide.design_itinerary") }}
            </button>
          </div>

          <div
            v-if="isGeneratingPlanner"
            class="flex-grow flex flex-col items-center justify-center text-center py-10"
          >
            <div
              class="w-12 h-12 border-4 border-terra border-t-transparent rounded-full animate-spin mb-4"
            ></div>
            <div
              class="font-josefin text-[12px] uppercase tracking-[0.2em] text-ink animate-pulse"
            >
              {{ $t("ai_guide.contacting_ai") }}
            </div>
            <div class="text-[12px] text-muted mt-2 px-6">
              {{
                $t("ai_guide.processing_data", {
                  days: plannerForm.days,
                })
              }}
            </div>
          </div>

          <div
            v-if="itinerary"
            class="animate-fade-in flex flex-col gap-5 pb-6"
          >
            <div
              class="flex justify-between items-center mb-2 border-b border-line pb-3"
            >
              <div class="font-libre text-[18px] font-bold text-ink">
                {{
                  $t("ai_guide.schedule_title", {
                    days: plannerForm.days,
                  })
                }}
              </div>
              <div class="flex flex-shrink-0 gap-3">
                <button
                  @click="downloadPDF"
                  class="font-josefin flex items-center gap-1.5 text-[10px] text-ink hover:text-terra uppercase tracking-widest transition-colors"
                  title="Simpan sebagai PDF"
                >
                  <Printer class="w-3.5 h-3.5" /> PDF
                </button>
                <button
                  @click="
                    itinerary = null;
                    plannerError = null;
                  "
                  class="font-josefin text-[10px] text-terra uppercase underline tracking-widest"
                >
                  {{ $t("ai_guide.change_plan") }}
                </button>
              </div>
            </div>

            <div
              v-for="day in itinerary"
              :key="day.day"
              class="bg-parchment rounded-xl border border-line p-5 shadow-sm transition-colors duration-300"
            >
              <div
                class="font-josefin text-[13px] font-bold text-terra uppercase tracking-widest mb-5"
              >
                {{ $t("ai_guide.day") }} {{ day.day }}
              </div>

              <div class="flex flex-col gap-6">
                <template v-if="day.kegiatan && day.kegiatan.length > 0">
                  <div
                    v-for="(act, idx) in day.kegiatan"
                    :key="'act-' + idx"
                    class="flex flex-col gap-1.5"
                  >
                    <div
                      class="font-josefin text-[10px] font-bold text-terra uppercase tracking-widest"
                    >
                      {{ act.waktu }}
                    </div>
                    <div class="border-l-2 border-line pl-3 py-0.5">
                      <div
                        class="font-libre text-[14px] font-medium text-ink leading-snug"
                      >
                        {{ act.kegiatan }}
                      </div>
                      <div
                        v-if="act.deskripsi"
                        class="text-[12px] font-light text-brown leading-relaxed mt-1.5"
                      >
                        {{ act.deskripsi }}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="text-[12px] text-muted italic">
                    {{ $t("ai_guide.no_activity") }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <button
      @click="isOpen = !isOpen"
      class="w-14 h-14 bg-terra text-warm-white rounded-full shadow-[0_10px_25px_-5px_rgba(200,75,49,0.5)] hover:bg-ink hover:shadow-[0_10px_25px_-5px_rgba(26,18,8,0.5)] transition-all duration-300 flex flex-shrink-0 items-center justify-center group z-50"
      :class="
        isOpen
          ? 'scale-90 opacity-0 pointer-events-none absolute'
          : 'scale-100 opacity-100 relative'
      "
      :aria-label="$t('ai_guide.open_ai')"
    >
      <Sparkles class="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
