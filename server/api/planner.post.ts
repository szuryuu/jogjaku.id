import Groq from "groq-sdk";
import pendidikanData from "../data/pendidikan.json";

const formatLocalized = (value: any, locale: "id" | "en") => {
  if (value && typeof value === "object" && ("id" in value || "en" in value)) {
    return value[locale] ?? value.id ?? value.en ?? "";
  }

  return value ?? "";
};

const buildEducationInventory = (locale: "id" | "en") => {
  const universities = pendidikanData.universities
    .map((item) => `${item.name} (${formatLocalized(item.atmosphere, locale)})`)
    .join(", ");

  const studySpots = pendidikanData.studySpots
    .map(
      (item) =>
        `${item.name} (${formatLocalized(item.atmosphere, locale)}, WiFi: ${formatLocalized(item.wifi, locale)}, Charging: ${formatLocalized(item.plugs, locale)}, ${formatLocalized(item.hours, locale)})`,
    )
    .join(", ");

  return locale === "en"
    ? `\n- Education/Student life: Universities: ${universities}. Study spots: ${studySpots}.`
    : `\n- Pendidikan/Kehidupan mahasiswa: Universitas: ${universities}. Tempat belajar: ${studySpots}.`;
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const { days, interest, locale = "id" } = body;

  if (!days || !interest) {
    throw createError({
      statusCode: 400,
      statusMessage:
        locale === "en"
          ? "Days and interest parameters are required."
          : "Parameter days dan interest wajib diisi.",
    });
  }

  if (!config.groqApiKey) {
    console.error("GROQ_API_KEY is not set.");
    throw createError({
      statusCode: 500,
      statusMessage:
        locale === "en"
          ? "Incomplete server configuration."
          : "Konfigurasi server tidak lengkap.",
    });
  }

  const INVENTORY = `
DAFTAR DESTINASI & KULINER RESMI (WAJIB DIGUNAKAN, DILARANG MEREKOMENDASIKAN TEMPAT SELAIN INI):
- Wisata/Alam: Candi Prambanan, Keraton Ngayogyakarta, Jalan Malioboro, Taman Sari, Kawasan Kaliurang, Candi Sambisari, Gunung Merapi, Pantai Parangtritis.
- Kuliner: Gudeg Kraton (Wijilan), Oseng Mercon Bu Narti, Sate Klathak Pak Pong, Bakpia Pathok 75, Kopi Joss Lek Man, Wedang Uwuh, Sego Kucing Angkringan, Tiwul Gunungkidul, Jadah Tempe Mbah Carik.
- Budaya/Sejarah: Kawasan Kotagede, Pertunjukan Wayang Kulit, Kerajinan Batik Kraton, Gamelan.
- Teknologi: Kawasan Silicon Wali, Jogja Smart Province.${buildEducationInventory(locale === "en" ? "en" : "id")}`;

  try {
    const groq = new Groq({ apiKey: config.groqApiKey });

    const promptId = `Buatkan itinerary liburan di Yogyakarta selama ${days} hari dengan fokus pada ${interest}.
ATURAN MUTLAK:
1. Gunakan BAHASA INDONESIA.
2. Keluarkan HASIL MURNI DALAM FORMAT JSON array of objects TANPA teks pembuka, penutup, atau markdown (jangan gunakan \`\`\`json).
3. Struktur JSON wajib persis seperti ini: [{ "hari": 1, "kegiatan": ["Pagi: ...", "Siang: ...", "Malam: ..."] }]
4. HANYA gunakan destinasi dan kuliner dari DAFTAR RESMI di bawah ini. Jangan pernah mengarang tempat di luar daftar ini.
${INVENTORY}`;

    const promptEn = `Create a Yogyakarta holiday itinerary for ${days} days focusing on ${interest}.
ABSOLUTE RULES:
1. Use ENGLISH strictly.
2. Output PURE JSON array of objects ONLY, NO introductory text, NO markdown code blocks (do not use \`\`\`json).
3. The JSON structure MUST be exactly like this: [{ "day": 1, "kegiatan": ["Morning: ...", "Afternoon: ...", "Evening: ..."] }]
4. ONLY use destinations and culinary from the OFFICIAL LIST below. Do not invent or recommend places outside this list.
${INVENTORY}`;

    const prompt = locale === "en" ? promptEn : promptId;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
    });

    let reply = chatCompletion.choices[0]?.message?.content || "[]";

    reply = reply
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedPlan = [];
    try {
      const rawParsed = JSON.parse(reply);

      if (Array.isArray(rawParsed)) {
        parsedPlan = rawParsed.map((d: any) => ({
          hari: d.hari || d.day || 1,
          kegiatan:
            d.kegiatan ||
            d.activity ||
            d.activities ||
            d.aktivitas ||
            d.itinerary ||
            [],
        }));
      } else {
        throw new Error("Output is not an array");
      }
    } catch (e) {
      console.error("JSON Parse failed on payload:", reply);
      parsedPlan = [
        {
          hari: "Error",
          kegiatan: [
            locale === "en"
              ? "Failed to parse AI data structure."
              : "Gagal memproses struktur data dari AI.",
          ],
        },
      ];
    }

    return { success: true, plan: parsedPlan };
  } catch (error: any) {
    const errorMessage = error?.message || "Unknown error";
    console.error("Groq API Error Details:", errorMessage);

    throw createError({
      statusCode: 500,
      statusMessage:
        locale === "en"
          ? "Failed to design itinerary."
          : "Gagal merancang itinerary.",
    });
  }
});
