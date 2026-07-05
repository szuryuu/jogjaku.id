# Footer Redesign Analysis — JogjaKu ↔ Reference Mapping

**Date:** 2026-07-05
**Source files:** `footer-example.html` (reference), `app/components/AppFooter.vue` (current), `i18n/locales/en.json` + `id.json`

---

## 1. Reference Footer Structure (footer-example.html)

### 1.1 Top Grid (`.foot-grid`)
```
grid-template-columns: 2fr 1fr 1fr 1fr 1fr  (5 columns, gap 40px)
margin-bottom: 60px
```
| Column | Width | Content |
|--------|-------|---------|
| 1 | 2fr | **Brand block** — logo mark (Ø in circle), brand name, description paragraph (with inline links), CTA link ("Download desktop" + meta) |
| 2 | 1fr | **"Studio"** — 4 links: Capabilities, Labs, Method, Manifesto |
| 3 | 1fr | **"Library"** — 4 links: 31 Skills, 72 Systems, 5 Directions, 5 Frames |
| 4 | 1fr | **"Connect"** — 4 links: GitHub, Issues, Contributors, Releases |
| 5 | 1fr | **"Docs"** — 4 links: Quickstart, Architecture, Skill Protocol, Roadmap |

### 1.2 Bottom Bar (`.foot-bottom`)
```
border-top: 1px solid var(--line)
padding-top: 22px
flex justify-between
```
- **Left:** `<span class="pulse"></span>● <b>Open Design</b> · Apache-2.0 · 2026 / Vol. 01 / Issue Nº 26`
- **Right:** `Berlin / Open / Earth` | `52.5200° N · 13.4050° E` | `♥ MMXXVI`

The pulse dot uses CSS `@keyframes pulse` (opacity 1 ↔ 0.35, 2.4s infinite).

### 1.3 Mega Wordmark (`.foot-mega`)
```
border-top, overflow-x hidden, margin-top 60px
font: var(--sans), weight 900
font-size: clamp(70px, 13vw, 200px)
letter-spacing: -0.04em, line-height: 1.05
```
Content: `Open <em>Design</em>.` — `<em>` uses serif italic + coral color.

### 1.4 Scroll-Reveal Animation
- **CSS:** `[data-reveal]` → `opacity:0; translate:0 28px;`. `[data-reveal="rise-lg"]` → `translate:0 64px; scale:0.985`. Transition: `opacity 900ms, translate 900ms, scale 900ms` with `cubic-bezier(0.22, 1, 0.36, 1)` and `var(--reveal-delay)`.
- **JS:** IntersectionObserver at `threshold:0.12, rootMargin:"0px 0px -8% 0px"`. Sets `data-revealed="true"` when intersecting, unobserve after. Respects `prefers-reduced-motion`.

### 1.5 Responsive Breakpoints
| Width | Behavior |
|-------|----------|
| ≤1080px | Grid collapses to `2fr 1fr 1fr`; cols 4 & 5 hidden (`display:none`) |
| ≤880px | Padding reduces to 24px |
| ≤560px | Padding reduces to 16px |

---

## 2. Current JogjaKu Footer (AppFooter.vue)

### 2.1 Structure
```
Grid: 12-col (md:col-span-5 brand / md:col-span-7 nav)
3 nav sub-columns: "Eksplorasi" (3), "Sistem" (5), "Impactora" (MMXXVI)
Bottom bar: flex justify-between
  Left: © 2026 JogjaKu.
  Right: VOL. I YOGYAKARTA
No mega wordmark. No scroll-reveal.
```

### 2.2 Existing i18n Keys Used
| Key | EN | ID |
|-----|----|----|
| `footer.portal_tagline` | "Yogyakarta Digital Portal" | "Portal Digital Yogyakarta" |
| `footer.description` | "Exploration of Yogyakarta city dimensions through the 2026 interactive digital portal." | "Eksplorasi dimensi kota Yogyakarta melalui portal digital interaktif 2026." |
| `nav.sejarah` | "History" | "Sejarah" |
| `nav.budaya` | "Culture" | "Budaya" |
| `nav.kuliner` | "Culinary" | "Kuliner" |
| `nav.wisata` | "Tourism" | "Wisata" |
| `nav.pendidikan` | "Education" | "Pendidikan" |
| `nav.teknologi` | "Technology" | "Teknologi" |
| `nav.peta` | "Map" | "Peta" |
| `nav.filosofi` | "Philosophical Axis" | "Sumbu Filosofi" |
| `error.footer_stamp` | "Yogyakarta · Digital · 2026" | same |

### 2.3 Dark Theme Tokens (DO NOT CHANGE)
```
bg:            #1a1208
text primary:  #faf7f2
text muted:    stone-300 / stone-400
accent:        #b8491f (terra)
border:        #faf7f2/10, #b8491f (top)
fonts:         font-libre (brand), font-josefin (nav/meta)
```

### 2.4 Existing Animation Infrastructure
- **`app/plugins/observe.ts`**: `v-observe` directive. IntersectionObserver at threshold 0.1. Adds class `in-view` on intersection.
- **`app/assets/css/main.css`**: `.reveal-up` utility — `opacity:0; transform:translateY(40px)` → `.reveal-up.in-view` → `opacity:1; transform:translateY(0)` with 0.8s cubic-bezier.
- **`app/components/story/HomeStoryContainer.vue`**: GSAP-based reveal (not needed for footer — too heavy for a simple scroll-in).

---

## 3. Mapping: Reference → JogjaKu

### 3.1 Grid Column Allocation

JogjaKu has **8 routes** → 4 columns × **2 links each** (reference has 4 columns × 4 links each — scaling down naturally).

| Column | Width | Heading (EN) | Heading (ID) | Links | i18n Key |
|--------|-------|-------------|-------------|-------|----------|
| 1 (brand) | 2fr | — | — | Brand block (see §3.2) | — |
| 2 | 1fr | Heritage | Warisan | sejarah, budaya | `footer.col_heritage` |
| 3 | 1fr | Discover | Jelajah | wisata, kuliner | `footer.col_discover` |
| 4 | 1fr | Future | Masa Depan | pendidikan, teknologi | `footer.col_future` |
| 5 | 1fr | Axis | Sumbu | peta, filosofi | `footer.col_axis` |

**Rationale for groupings:**
- **Heritage/Warisan** — history + culture: the past, traditions, palace legacy
- **Discover/Jelajah** — tourism + culinary: what visitors experience
- **Future/Masa Depan** — education + technology: innovation, student city, digital leap
- **Axis/Sumbu** — map + philosophy: spatial and cosmological dimension

### 3.2 Brand Block (Column 1)

```
┌──────────────────────────────────────────┐
│ <em>Jogja</em>Ku — portal_tagline        │  ← font-libre, 24px
│                                          │
│ footer.description (max 38ch)            │  ← font-josefin, 13.5px
│                                          │
│ [no CTA — skip reference's download btn] │  ← ponytail: YAGNI
└──────────────────────────────────────────┘
```

**What stays same:** the existing brand markup from AppFooter.vue (NuxtLink to `/`, `<em>Jogja</em>Ku —`, portal tagline, description paragraph). Just rearranged into the 5-col grid column 1.

**What differs from reference:** no CTA button (reference has "Download desktop"). JogjaKu has no download. Skip it.

### 3.3 Mega Wordmark

Reference: `Open <em>Design</em>.`
JogjaKu: `<em>Jogja</em>Ku.`

```
font-libre for "Jogja" (italic, terra accent)
font-libre for "Ku." (regular weight)
font-size: clamp(70px, 13vw, 200px)
letter-spacing: -0.04em
```

This mirrors how the brand already renders: `<em class="italic text-[#b8491f]">Jogja</em>Ku`. The mega version scales it to an oversized footer statement.

### 3.4 Bottom Bar

| Position | Reference Pattern | JogjaKu Content |
|----------|------------------|-----------------|
| Left | `pulse-dot ● <b>Open Design</b> · Apache-2.0 · 2026 / Vol. 01 / Issue Nº 26` | `pulse-dot ● <b>JogjaKu</b> · 2026 / Vol. I / Issue Nº 1` |
| Right | `Berlin / Open / Earth` \| `52.5200° N · 13.4050° E` \| `♥ MMXXVI` | `Yogyakarta / Indonesia / Earth` \| `7.7956° S · 110.3695° E` \| `♥ MMXXVI` |

**Note on coordinates:** 7.7956° S, 110.3695° E is the approximate center of Yogyakarta (Kraton area). These are reasonable values. If more precision is desired, 7.8014° S, 110.3644° E (Malioboro area).

### 3.5 Animation for Mega Wordmark

**Reuse existing infrastructure; add one CSS class.**

Current: `v-observe` adds `in-view` on intersection (threshold 0.1).
Add to `main.css`:

```css
.reveal-mega {
  opacity: 0;
  translate: 0 64px;
  scale: 0.985;
  transition:
    opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
    translate 900ms cubic-bezier(0.22, 1, 0.36, 1),
    scale 900ms cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-mega.in-view {
  opacity: 1;
  translate: 0 0;
  scale: 1;
}

@media (prefers-reduced-motion: reduce) {
  .reveal-mega {
    opacity: 1 !important;
    translate: 0 0 !important;
    scale: 1 !important;
    transition: none !important;
  }
}
```

Usage: `<div v-observe class="reveal-mega">...mega wordmark...</div>`

**Ponytail note:** Do NOT add a second IntersectionObserver in the footer component. Reuse the existing `v-observe` directive (already in the project). One class addition in `main.css` is the minimal change.

### 3.6 Responsive Strategy

Match reference breakpoints but adapt for fewer link columns:

| Width | Behavior |
|-------|----------|
| >1080px | Full 5-col grid |
| ≤1080px | 3-col: `2fr 1fr 1fr`; hide cols 4 & 5 (Future + Axis) |
| ≤880px | Reduce horizontal padding |
| ≤560px | Reduce horizontal padding further |

**Risk:** hiding 2 columns removes 4 links (pendidikan, teknologi, peta, filosofi). Acceptable trade-off — these are less tourist-facing. If objection, collapse to 2×2 link grid instead of hiding entirely.

---

## 4. i18n Changes

### 4.1 New Keys to Add

Add to `en.json` and `id.json` under `footer`:

```json
{
  "footer": {
    "portal_tagline": "...",
    "description": "...",
    "col_heritage": "Heritage",
    "col_discover": "Discover",
    "col_future": "Future",
    "col_axis": "Axis"
  }
}
```

```json
{
  "footer": {
    "portal_tagline": "...",
    "description": "...",
    "col_heritage": "Warisan",
    "col_discover": "Jelajah",
    "col_future": "Masa Depan",
    "col_axis": "Sumbu"
  }
}
```

### 4.2 Existing Keys Reused (no changes needed)

| Key | Used where |
|-----|-----------|
| `footer.portal_tagline` | Brand block, next to JogjaKu |
| `footer.description` | Brand block, description paragraph |
| `nav.sejarah` through `nav.filosofi` | Link column link text |
| `error.footer_stamp` | NOT used in footer currently — this is for the error page |

### 4.3 Keys NOT Used (current footer columns that get removed)

The hardcoded column headings "Eksplorasi", "Sistem", "Impactora" have no i18n keys and are being replaced anyway.

---

## 5. Implementation Notes

### 5.1 Files to Modify
1. **`app/components/AppFooter.vue`** — Full restructure to match new layout
2. **`i18n/locales/en.json`** — Add 4 new footer keys
3. **`i18n/locales/id.json`** — Add 4 new footer keys
4. **`app/assets/css/main.css`** — Add `.reveal-mega` + `.reveal-mega.in-view` (6 lines of CSS)

### 5.2 Files NOT to Touch
- `app/plugins/observe.ts` — reuse as-is
- `error.vue` — unrelated
- `tailwind` config — no changes needed
- ALL existing route pages — footer links to same routes

### 5.3 Theme Lock
**Do NOT import reference colors.** The reference is light-themed (paper/ink). JogjaKu stays dark:
- `bg-[#1a1208]` (dark brown)
- Text: `text-[#faf7f2]` and `text-stone-*`
- Accent: `text-[#b8491f]` / `text-terra` / `bg-terra`
- Fonts: `font-libre` (brand, serif), `font-josefin` (nav, sans-serif)

### 5.4 Omissions vs Reference (ponytail decisions)

| Reference Feature | JogjaKu Decision | Reason |
|-------------------|-----------------|--------|
| Brand mark (circle icon) | Skip | JogjaKu has no logo mark, `<em>Jogja</em>Ku` text is sufficient |
| CTA button ("Download desktop") | Skip | YAGNI — no desktop app |
| Paper texture overlay (`body::before`) | Skip | Dark theme, no paper aesthetic |
| `--reveal-delay` CSS variable | Skip simplistically | No staggered reveals in footer |
| `var(--line)` as border token | Use `border-[#faf7f2]/10` | Already in dark palette |
| 4 links per column | 2 links per column | Only 8 routes total |

---

## 6. Validation Checklist

- [ ] All 8 route links navigate correctly
- [ ] Column headings render in both EN and ID locales
- [ ] Mega wordmark scroll-reveals once (IntersectionObserver)
- [ ] Pulse dot animates (CSS keyframes)
- [ ] Responsive: ≤1080px hides last 2 columns
- [ ] Dark theme preserved (bg #1a1208, terra accent)
- [ ] `prefers-reduced-motion` disables reveal animation
- [ ] No TSX/TypeScript errors on build
- [ ] Bottom bar text and coordinates correct
