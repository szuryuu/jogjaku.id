<template>
  <section
    class="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 lg:gap-6"
  >
    <div
      v-observe
      class="lg:col-span-2 bg-ink p-10 lg:p-14 flex flex-col justify-between group reveal-up transition-colors duration-300 border border-dashed border-terra/20"
    >
      <div
        class="font-josefin text-[10px] tracking-[0.25em] uppercase text-terra mb-12"
      >
        {{ $t("teknologi.talent_pool") }}
      </div>
      <div>
        <div
          class="font-libre text-[64px] lg:text-[96px] font-bold text-parchment leading-none mb-2 group-hover:text-terra transition-colors duration-500 tabular-nums"
        >
          100K+
        </div>
        <div
          class="font-josefin text-[9px] tracking-[0.2em] uppercase text-terra/50 mb-4"
        >
          graduates/yr
        </div>
        <div
          class="font-libre text-[20px] lg:text-[24px] text-parchment/80 mb-4 transition-colors duration-300"
        >
          {{ $t("teknologi.graduates_title") }}
        </div>
        <p
          class="text-[14px] text-parchment/50 font-light leading-[1.8] max-w-[450px] mb-4 transition-colors duration-300"
        >
          {{ $t("teknologi.graduates_desc") }}
        </p>
        <div
          class="block w-full font-josefin text-[9px] text-parchment/40 dark:text-parchment/60 uppercase tracking-widest border-t border-dashed border-parchment/10 pt-4 mt-4 transition-colors duration-300"
        >
          *{{ $t("teknologi.graduates_source") }}
        </div>
      </div>
    </div>
    <div
      v-observe
      class="bg-terra p-10 lg:p-14 flex flex-col justify-between group reveal-up delay-100 transition-colors duration-300 border border-dashed border-ink/20"
    >
      <div
        class="font-josefin text-[10px] tracking-[0.25em] uppercase text-ink mb-12 transition-colors duration-300"
      >
        {{ $t("teknologi.connectivity") }}
      </div>
      <div>
        <div
          class="font-libre text-[64px] lg:text-[80px] font-bold text-warm-white leading-none mb-2 group-hover:text-ink transition-colors duration-500 tabular-nums"
        >
          91%
        </div>
        <div
          class="font-josefin text-[9px] tracking-[0.2em] uppercase text-ink/40 mb-4"
        >
          penetration
        </div>
        <div
          class="font-libre text-[18px] text-warm-white/90 leading-[1.4] mb-4 transition-colors duration-300"
        >
          {{ $t("teknologi.internet_penetration") }}
        </div>
        <div
          class="font-josefin text-[9px] text-ink/60 uppercase tracking-widest border-t border-dashed border-ink/20 pt-4 mt-4 transition-colors duration-300"
        >
          *{{ $t("teknologi.internet_source") }}
        </div>
      </div>
    </div>
    <div
      v-observe
      class="bg-line p-10 lg:p-12 flex flex-col justify-between reveal-up delay-200 lg:col-span-3 transition-colors duration-300 border border-dashed border-ink/15"
    >
      <div
        class="font-josefin text-[10px] tracking-[0.25em] uppercase text-muted mb-12 transition-colors duration-300"
      >
        {{ $t("teknologi.business_infrastructure") }}
      </div>
      <div>
        <div
          class="font-libre text-[40px] font-bold text-ink leading-none mb-2 transition-colors duration-300 tabular-nums"
        >
          300+
        </div>
        <div
          class="font-josefin text-[9px] tracking-[0.2em] uppercase text-muted/60 mb-4"
        >
          entities
        </div>
        <div
          class="font-libre text-[18px] text-ink/80 mb-3 transition-colors duration-300"
        >
          {{ $t("teknologi.active_startups") }}
        </div>
        <p
          class="text-[13px] text-brown font-light leading-[1.6] mb-4 transition-colors duration-300"
        >
          {{ $t("teknologi.business_desc") }}
        </p>
        <div
          class="font-josefin text-[9px] text-ink/50 uppercase tracking-widest border-t border-dashed border-ink/10 pt-4 mt-4 transition-colors duration-300"
        >
          *{{ $t("teknologi.business_source") }}
        </div>
      </div>
    </div>
  </section>
</template>
