import { GoogleGenerativeAI } from "@google/generative-ai";
import pendidikanData from "../data/pendidikan.json";

const GEMINI_MODEL = "gemini-2.5-flash";
const MAX_INPUT_LENGTH = 2000;

const formatLocalized = (value: any, locale: "id" | "en") => {
  if (value && typeof value === "object" && ("id" in value || "en" in value)) {
    return value[locale] ?? value.id ?? value.en ?? "";
  }

  return value ?? "";
};

const buildEducationInventory = (locale: "id" | "en") => {
  const universities = pendidikanData.universities
    .map(
      (item) =>
        `${item.name}: ${formatLocalized(item.description, locale)} Keunggulan/Strengths: ${formatLocalized(item.strength, locale)}. Suasana/Atmosphere: ${formatLocalized(item.atmosphere, locale)}. Maps: ${item.mapsUrl}`,
    )
    .join("\n");

  const studySpots = pendidikanData.studySpots
    .map(
      (item) =>
        `${item.name}: ${formatLocalized(item.atmosphere, locale)} WiFi: ${formatLocalized(item.wifi, locale)}. Charging: ${formatLocalized(item.plugs, locale)}. Harga/Price: ${formatLocalized(item.price, locale)}. Jam/Hours: ${formatLocalized(item.hours, locale)}. Maps: ${item.mapsUrl}`,
    )
    .join("\n");

  return locale === "en"
    ? `Education/Kota Pelajar:\nUniversities:\n${universities}\nStudy spots:\n${studySpots}`
    : `Pendidikan/Kota Pelajar:\nUniversitas:\n${universities}\nTempat belajar:\n${studySpots}`;
};

const buildInventory = (locale: "id" | "en") => `
DAFTAR RESMI:
- Wisata/Alam: Candi Prambanan, Keraton Ngayogyakarta, Jalan Malioboro, Taman Sari, Kawasan Kaliurang, Candi Sambisari, Gunung Merapi, Pantai Parangtritis.
- Kuliner: Gudeg Kraton (Wijilan), Oseng Mercon Bu Narti, Sate Klathak Pak Pong, Bakpia Pathok 75, Kopi Joss Lek Man, Wedang Uwuh, Sego Kucing Angkringan, Tiwul Gunungkidul, Jadah Tempe Mbah Carik.
- Budaya/Sejarah: Kawasan Kotagede, Pertunjukan Wayang Kulit, Kerajinan Batik Kraton, Gamelan.
- Teknologi: Kawasan Silicon Wali, Jogja Smart Province.
${buildEducationInventory(locale)}`;

const SYSTEM_INSTRUCTIONS = {
  id: `Kamu adalah 'Pemandu Jiwa Nusantara', asisten AI resmi untuk portal pariwisata Yogyakarta.
Tugas utama: Menjawab pertanyaan seputar wisata, kuliner, budaya, pendidikan, kampus, tempat belajar, kehidupan mahasiswa, dan transportasi di Yogyakarta.

ATURAN MUTLAK:
1. Kamu HARUS SELALU merespons dalam BAHASA INDONESIA, terlepas dari bahasa apa yang digunakan pengguna.
2. Jawablah dengan ringkas, ramah, dan sangat praktis.
3. Arahkan jawabanmu HANYA pada entitas yang ada di DAFTAR RESMI berikut. Jangan merekomendasikan tempat di luar daftar ini.
4. Jangan pernah menggunakan kata pengantar atau basa-basi. Berikan jawaban secara langsung ke intinya.
PENGECUALIAN: Jika pengguna meminta bantuan penerjemahan, penulisan, atau konversi Aksara Jawa maupun Bahasa Jawa, kamu WAJIB memproses permintaan tersebut secara akurat, mengabaikan aturan daftar resmi, dan HANYA memberikan hasil terjemahan atau aksaranya saja tanpa tambahan teks apa pun.
${buildInventory("id")}`,

  en: `You are the 'Jiwa Nusantara Guide', the official AI assistant for the Yogyakarta tourism portal.
Main task: Answer questions about tourism, culinary arts, culture, education, campuses, study spots, student life, and transportation in Yogyakarta.

ABSOLUTE RULES:
1. You MUST ALWAYS respond STRICTLY in ENGLISH, regardless of what language the user types in.
2. Answer concisely, friendly, and highly practically.
3. Direct your answers ONLY to the entities in the OFFICIAL LIST below. Do not recommend places outside this list.
4. Never use introductory phrases or filler words. Provide the answer directly to the point.
EXCEPTION: If the user requests translation, writing, or conversion of Javanese Script (Hanacaraka) or the Javanese language, you MUST process the request accurately, bypass the official list rule, and ONLY provide the translated text or script without any additional text.
${buildInventory("en")}`,
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const locale = body.locale === "en" ? "en" : "id";

  if (
    !body.message ||
    typeof body.message !== "string" ||
    !body.message.trim()
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        locale === "en"
          ? "Message cannot be empty."
          : "Pesan tidak boleh kosong.",
    });
  }

  if (body.message.length > MAX_INPUT_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage:
        locale === "en"
          ? `Message too long. Max ${MAX_INPUT_LENGTH} characters.`
          : `Pesan terlalu panjang. Maksimal ${MAX_INPUT_LENGTH} karakter.`,
    });
  }

  if (!config.geminiApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage:
        locale === "en"
          ? "Incomplete server configuration."
          : "Konfigurasi server tidak lengkap.",
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(config.geminiApiKey);

    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: SYSTEM_INSTRUCTIONS[locale],
    });

    const result = await model.generateContent(body.message.trim());
    const text = result.response.text();

    return { success: true, reply: text };
  } catch (error: any) {
    const status = error?.status ?? error?.httpStatus ?? 500;

    if (status === 429) {
      throw createError({
        statusCode: 429,
        statusMessage:
          locale === "en"
            ? "Guide is very busy. Try again shortly."
            : "Pemandu sedang sangat sibuk. Coba lagi sebentar.",
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage:
        locale === "en"
          ? "Guide system is experiencing issues. Please try again."
          : "Sistem pemandu sedang bermasalah. Silakan coba lagi.",
    });
  }
});
