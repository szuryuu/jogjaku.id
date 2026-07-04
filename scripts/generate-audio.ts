import { mkdir, writeFile } from "node:fs/promises";

const API_KEY = process.env.TYPECAST_API_KEY;

// ponytail: mirrored from server/data/sejarah.json — single source of truth for content
const timeline = [
  {
    year: "732",
    textId:
      "Di atas batu andesit yang kini tersimpan di Museum Nasional Jakarta, Raja Sanjaya memahat aksara Pallawa dalam bahasa Sansekerta: deklarasi diri sebuah peradaban kepada kekekalan. Dokumen tertua keberadaan peradaban Hindu di dataran Kedu ini bukan sekadar prasasti keagamaan. Ia adalah titik di mana sebuah masyarakat memutuskan bahwa keberadaannya cukup penting untuk diukir dalam batu — dan fakta bahwa kita masih membacanya 1.300 tahun kemudian membuktikan bahwa keputusan itu tepat.",
    textEn:
      "Carved in Pallava script and Sanskrit on andesite now held at the National Museum in Jakarta, King Sanjaya's inscription is not merely a religious artifact — it is a civilization's declaration of itself to eternity. This oldest document of Hindu civilization in the Kedu Plain is the moment a society decided its existence was important enough to carve in stone. The fact that we still read it 1,300 years later proves the decision was right.",
  },
  {
    year: "856",
    textId:
      "Tiga menara setinggi 47 meter berdiri berdampingan tanpa satu tetes semen — hanya batu andesit, perhitungan gravitasi yang presisi, dan keyakinan bahwa keindahan adalah bentuk ibadah tertinggi. Ketika Prambanan selesai dibangun, ia adalah kompleks candi Hindu terbesar di Asia Tenggara. Lebih dari satu milenium kemudian, ia masih berdiri. Bukan karena kebetulan, tapi karena para pembangunnya memahami prinsip yang kemudian menjadi DNA arsitektur Jawa: yang dibuat dengan benar tidak perlu diperbaiki.",
    textEn:
      "Three towers standing 47 meters high, side by side, built without a single drop of cement — only andesite, precise gravitational calculations, and the conviction that beauty is the highest form of worship. When Prambanan was completed, it was Southeast Asia's largest Hindu temple complex. More than a millennium later, it still stands — not by accident, but because its builders understood a principle that became the DNA of Javanese architecture: what is built correctly does not need repair.",
  },
  {
    year: "1587",
    textId:
      "Panembahan Senopati memilih Kotagede — bukan pelabuhan ramai, bukan kota dagang — sebagai pusat kerajaannya yang baru. Sebuah keputusan yang menggeser gravitasi kekuasaan Jawa dari pesisir utara kembali ke pedalaman. Di balik keputusan itu tersembunyi filosofi yang kelak menjadi DNA Yogyakarta: bahwa kekuatan sejati tidak lahir dari jalur perdagangan, tapi dari kedalaman tanah dan kedalaman budaya. Kotagede hari ini masih menyimpan denyut sejarah itu — dalam gang sempit, masjid tua, dan tangan pengrajin perak yang mewarisi tradisi enam abad.",
    textEn:
      "Panembahan Senopati chose Kotagede — not a busy port, not a trading city — as the center of his new kingdom. A decision that shifted Java's gravitational center of power from the northern coast back to the interior. Behind it lay a philosophy that would become Yogyakarta's DNA: that true power is not born from trade routes, but from the depth of land and the depth of culture. Kotagede today still holds that heartbeat — in narrow alleys, an ancient mosque, and the hands of silver craftsmen inheriting a six-century tradition.",
  },
  {
    year: "1755",
    textId:
      "VOC membelah Mataram menjadi dua. Bagi sebagian orang, itu adalah hari kekalahan. Bagi Pangeran Mangkubumi — yang kemudian menjadi Sultan Hamengku Buwono I — itu adalah momen kebebasan untuk merancang kota dari nol berdasarkan mandala kosmologis. Dalam tiga tahun, Sultan HB I membangun Yogyakarta di atas poros yang merentang dari puncak Merapi hingga Samudera Hindia. Kolonialisme memberinya wilayah yang lebih kecil, tapi gagasan yang jauh lebih besar.",
    textEn:
      "The VOC split Mataram in two. For some, it was a day of defeat. For Prince Mangkubumi — who became Sultan Hamengku Buwono I — it was the moment of freedom to design a city from scratch on a cosmological mandala. Within three years, Sultan HB I built Yogyakarta on an axis stretching from Merapi's peak to the Indian Ocean. Colonialism gave him a smaller territory, but a far larger idea.",
  },
  {
    year: "1825",
    textId:
      "Dari Goa Selarong, Pangeran Diponegoro memimpin perang gerilya yang menguras kas Hindia Belanda hingga 20 juta Gulden — setara anggaran koloni selama dua tahun penuh. Lima tahun melawan angkatan perang terbesar di Asia Tenggara, dengan pasukan yang menjadikan pengetahuan medan sebagai senjata utama. Yang membedakan Diponegoro bukan hanya taktik militer, tapi perang ideologis: ia bertarung atas nama martabat sebuah peradaban yang menolak untuk tunduk.",
    textEn:
      "From Selarong Cave, Prince Diponegoro led a guerrilla war that drained the Dutch East Indies treasury of 20 million guilders — equivalent to two full years of colonial budget. Five years against Southeast Asia's largest military force, with troops who used terrain knowledge as their primary weapon. What set Diponegoro apart was not only military tactics, but an ideological war: he fought for the dignity of a civilization that refused to submit.",
  },
  {
    year: "1908",
    textId:
      "Pada 3–5 Oktober 1908, kongres pertama Boedi Oetomo — organisasi modern pertama Indonesia — digelar di Yogyakarta. Di kota yang sama yang pernah melahirkan Diponegoro, para intelektual muda berkumpul memulai percakapan yang tidak bisa dibendung: tentang pendidikan, kebudayaan, dan masa depan sebuah bangsa yang belum ada namanya. Yogyakarta bukan hanya kota yang mempertahankan masa lalu — ia adalah kota yang berani membayangkan masa depan.",
    textEn:
      "On October 3–5, 1908, the first congress of Boedi Oetomo — Indonesia's first modern organization — was held in Yogyakarta. In the same city that once produced Diponegoro, young intellectuals gathered and began a conversation that could not be stopped: about education, culture, and the future of a nation that had no name yet. Yogyakarta is not only a city that preserves the past — it is a city brave enough to imagine the future.",
  },
  {
    year: "1946",
    textId:
      "Ketika tentara NICA menduduki Jakarta, Yogyakarta menjadi jantung Republik yang berdenyut. Sultan Hamengku Buwono IX melakukan sesuatu yang langka dalam sejarah monarki: ia menyerahkan kedaulatannya — secara sukarela — kepada republik yang baru berusia beberapa bulan. 'Kraton Yogyakarta adalah bagian dari Negara Kesatuan Republik Indonesia,' ia menyatakan. Kalimat itu mengubah takdir sebuah bangsa dan menjadi model kepemimpinan yang belum pernah terulang lagi.",
    textEn:
      "When NICA troops occupied Jakarta, Yogyakarta became the beating heart of the Republic. Sultan Hamengku Buwono IX did something rare in monarchical history: he surrendered his sovereignty — voluntarily — to a republic just months old. 'The Yogyakarta Keraton is part of the Republic of Indonesia,' he declared. That sentence changed a nation's fate and set a model of leadership that has never been repeated.",
  },
  {
    year: "1 Mar 1949",
    textId:
      "Subuh, 1 Maret 1949. Letkol Soeharto memimpin serangan terkoordinasi yang merebut Yogyakarta dari tangan Belanda selama tepat enam jam. Secara militer, ini adalah simbol. Tapi dampaknya melampaui taktik: radio Yogyakarta menyiarkan kabar ini ke seluruh dunia, membuktikan kepada Dewan Keamanan PBB bahwa Republik Indonesia belum mati. Enam jam yang mengubah perimbangan diplomasi internasional.",
    textEn:
      "Dawn, March 1st, 1949. Lt. Col. Soeharto led a coordinated attack that seized Yogyakarta from Dutch hands for exactly six hours. Militarily, it was symbolic. But the impact exceeded tactics: Yogyakarta's radio broadcast the news worldwide, proving to the UN Security Council that the Republic of Indonesia was not dead. Six hours that changed the balance of international diplomacy.",
  },
  {
    year: "Des. 1949",
    textId:
      "19 Desember 1949. Sementara tentara masih berpatroli di jalanan Yogyakarta, pemerintah Republik Indonesia menandatangani dekrit pendirian Universitas Gadjah Mada — universitas negeri pertama Indonesia yang merdeka. UGM tidak hanya lahir dari revolusi; ia adalah revolusi itu sendiri dalam bentuk lain. Keyakinan bahwa bangsa yang berdaulat harus memiliki lembaga pengetahuannya sendiri, tertulis di atas kertas resmi, di kota yang menjadi saksi seluruh perjuangan itu.",
    textEn:
      "December 19th, 1949. While troops still patrolled Yogyakarta's streets, Indonesia's Republican government signed the founding decree of Universitas Gadjah Mada — the first national university of an independent Indonesia. UGM was not only born from the revolution; it was the revolution itself in another form. The conviction that a sovereign nation must have its own institution of knowledge, written on official paper, in the city that witnessed the entire struggle.",
  },
  {
    year: "2012",
    textId:
      "UU Nomor 13 Tahun 2012 mengukuhkan sesuatu yang tidak ada duanya di dunia: Sultan Hamengku Buwono dan Paku Alam sebagai Gubernur dan Wakil Gubernur seumur hidup, diakui resmi oleh negara demokratis modern. Ini bukan anomali hukum — ini adalah buah dari perjanjian 1946. Ketika Sultan HB IX menyerahkan kedaulatan, Republik menjanjikan bahwa keistimewaan Yogyakarta akan dijaga. Enam puluh enam tahun kemudian, janji itu menjadi undang-undang.",
    textEn:
      "Law Number 13 of 2012 confirms something unique in the world: the Sultan and Paku Alam as lifetime Governor and Vice Governor, officially recognized by a modern democratic state. This is not a legal anomaly — it is the fruit of the 1946 covenant. When Sultan HB IX surrendered sovereignty, the Republic promised Yogyakarta's special status would be honored. Sixty-six years later, that promise became law.",
  },
];

async function generate() {
  if (!API_KEY) {
    console.error("TYPECAST_API_KEY is missing from environment variables.");
    process.exit(1);
  }

  await mkdir("public/audio/sejarah", { recursive: true });

  for (const item of timeline) {
    for (const lang of ["id", "en"]) {
      const text = lang === "id" ? item.textId : item.textEn;
      const language = lang === "id" ? "ind" : "eng";

      console.log(`Memproses audio untuk tahun ${item.year} (${lang})...`);

      try {
        const reqRes = await fetch(
          "https://api.typecast.ai/v1/text-to-speech",
          {
            method: "POST",
            headers: {
              "X-API-KEY": API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              model: "ssfm-v30",
              voice_id: "tc_60e5426de8b95f1d3000d7b5",
              language,
              output: { audio_format: "mp3" },
            }),
          },
        );

        if (!reqRes.ok) {
          const errorText = await reqRes.text();
          throw new Error(
            `API Request Failed: ${reqRes.status} - ${errorText}`,
          );
        }

        const buffer = await reqRes.arrayBuffer();
        const filePath = `public/audio/sejarah/${item.year}-${lang}.mp3`;
        await writeFile(filePath, new Uint8Array(buffer));

        console.log(`Berhasil menyimpan: ${filePath}`);
      } catch (error) {
        console.error(`Gagal memproses ${item.year} (${lang}):`, error);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

generate();
