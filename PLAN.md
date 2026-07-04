# Pendidikan Page Rebuild — Full Prompt Package (all phases, not drip-fed)

Scope: ONLY app/pages/pendidikan.vue and its new subcomponents. Do not touch any
other page. Reference: pendidikan-prototype.html (attached) — "Kota Pelajar" warm,
photographic, city-guide layout. This is deliberately NOT the homepage's chapter-
stack pattern. It keeps the site's normal navbar/footer (this is not a story-layout
page) plus its own sticky in-page sub-nav for jumping between sections.

## Non-negotiable rules (same as established for the homepage rebuild)

1. Every worker, after finishing, runs `git add <only its own files>` and
   `git commit -m "<type>: <description>"`. A worker that commits files outside
   its assigned scope has failed the task regardless of whether the code works.
2. "Worker" as an agent label does not prevent hallucination by itself. Every
   prompt below requires reading the actual current pendidikan.vue and the
   attached prototype before writing anything — not inventing structure from
   memory of "similar pages."
3. Do not report a phase as done without browser verification. A green
   build/typecheck is not sufficient evidence — this has already produced a
   false "done" once in this project on a different page.
4. Known regression risk to re-check: a prior rebuild of a different page in
   this codebase hit `TypeError: Failed to fetch dynamically imported module`
   during Nuxt client hydration, with no compile error (direct fetch of the
   module returned valid 200 JS). Root cause was never fully confirmed. Any
   phase touching app/pages/pendidikan.vue directly must check for this exact
   error in a real browser console before declaring done.
5. Do not modify the data-fetching layer (`useAsyncData("pendidikan", ...)`,
   `/api/data/pendidikan`, the `universities`/`studySpots`/`lifeStats`/
   `creativeCulture`/`historyBlocks` computed properties, or the `copy`/
   `pageCopy`/`localize` i18n object) unless a phase explicitly says to. The
   task is to decompose the TEMPLATE layer into components and restyle it —
   not to change what data exists or how it's fetched.

---

## Phase 0 — `worker` (foundation, sequential, run first alone)

```
Read the CURRENT app/pages/pendidikan.vue in full (it is ~750 lines) before
doing anything. Read pendidikan-prototype.html (attached) — it defines the
target visual/structural direction: sticky sub-nav, hero with photo overlay,
horizontal timeline strip for history, horizontal snap-scroll card carousel for
universities (each card opens a detail modal), a study-spot card grid, a dark
"student life" stat strip, a creative-culture icon grid, and a closing CTA band.

Your job in this phase is ONLY the sub-navigation and modal shell — the
reusable pieces other components will plug into. Do not touch the main
template body sections yet (Phase 1 workers own those).

1. Create app/components/pendidikan/PendidikanSubNav.vue: sticky top nav bar
   with "Vol. I · Pendidikan" label + jump links to each section anchor
   (#sejarah, #universitas, #belajar, #kehidupan, #budaya-kreatif). Match the
   prototype's sticky/backdrop-blur styling using this project's existing
   Tailwind tokens (bg-parchment, text-ink, text-terra, font-libre,
   font-josefin, font-lato) — do not invent new colors/fonts.

2. Create app/components/pendidikan/PendidikanUniversityModal.vue: the detail
   modal shown when a university card is clicked. Props: university (object
   matching the shape already computed in pendidikan.vue —
   displayDescription/displayStrength/displayAtmosphere/displayDetail, name,
   etc.), open (boolean). Emits: close. Must include focus trap (Tab/Shift+Tab
   cycle within the modal while open), close on Escape key, close on
   backdrop click, and return focus to the triggering card on close. Match the
   prototype's modal-panel styling.

3. Do NOT wire these into pendidikan.vue's main template yet — that's Phase 2.
   Do NOT create any other component file in this phase.

4. Run typecheck/lint. Fix errors from files you created.

5. git add app/components/pendidikan/PendidikanSubNav.vue app/components/pendidikan/PendidikanUniversityModal.vue
   git commit -m "feat(pendidikan): add sticky sub-nav and university detail modal shell"
```

---

## Phase 1 — Section workers (7x `worker`, parallel, one file each)

Shared instructions to prepend to every prompt below:

```
Create exactly ONE new file in app/components/pendidikan/. Do not edit
app/pages/pendidikan.vue, PendidikanSubNav.vue, or PendidikanUniversityModal.vue
— those belong to other workers. Read the CURRENT app/pages/pendidikan.vue
first to see the exact existing markup, classes, and data shape for the
section you're extracting — port and restyle it according to
pendidikan-prototype.html, do not invent new data fields. The component must
accept whatever data it needs as props (e.g. history blocks, universities,
study spots) — it must NOT call useAsyncData or fetch data itself; all data
fetching stays in the parent page. Use i18n via useI18n()/$t() for any label
that already has a key in i18n/locales/id.json and en.json (the `copy` object
inside pendidikan.vue's <script setup> already contains most of the real
strings for this page — reuse that object's structure via props, do not
hardcode English/Indonesian text or invent new translation keys unless a
value genuinely doesn't exist yet, and flag any you had to add). Images:
prototype uses placeholder boxes with labels — use the same <picture>/srcset
lazy-loading pattern already used elsewhere in this codebase, and confirm any
asset path you use actually exists in public/images first.

After finishing, run:
git add app/components/pendidikan/<ComponentName>.vue
git commit -m "feat(pendidikan): add <ComponentName> section"
```

- **worker-hero** → `PendidikanHero.vue` — full-bleed hero with darkened photo overlay, "Vol. I · Pendidikan" eyebrow, heroTitle/heroSubtitle, two CTA buttons (exploreUniversities/bestStudySpots) linking to in-page anchors.
- **worker-history** → `PendidikanHistory.vue` — horizontal snap-scroll timeline strip using the existing `historyBlocks` data (period/title/text), matching the prototype's `.timeline-strip` pattern.
- **worker-universities** → `PendidikanUniversities.vue` — horizontal snap-scroll card carousel using the existing `universities` data. Each card triggers the modal from Phase 0 (emit an event up to the parent with the selected university, since `selectedUniversity` state stays in pendidikan.vue per existing pattern — do not duplicate that state locally).
- **worker-studyspots** → `PendidikanStudySpots.vue` — responsive card grid using the existing `studySpots` data (atmosphere/wifi/plugs/price/hours), with amenity pills matching the prototype's `.amenity-pill` style.
- **worker-studentlife** → `PendidikanStudentLife.vue` — dark full-bleed section using the existing `lifeStats` data (icon + label), matching the prototype's `.life-section`/`.stats-row` styling. Reuse the actual lucide icons already imported in pendidikan.vue's iconMap — do not replace them with emoji (the prototype uses emoji only as a placeholder stand-in, port using real icons instead).
- **worker-culture** → `PendidikanCreativeCulture.vue` — icon grid using the existing `creativeCulture` data (title/desc/icon), same icon-reuse note as above.
- **worker-cta** → `PendidikanCta.vue` — closing CTA band (ctaCategory/ctaTitle/ctaSubtitle, exploreCity/studentGuide buttons), matching the prototype's `.cta-section` styling.

---

## Phase 2 — Wiring `worker` (sequential, run after Phase 0 + all Phase 1 workers finish)

```
All Pendidikan* components now exist in app/components/pendidikan/. Your job:

1. Rewrite app/pages/pendidikan.vue's <template> to compose: PendidikanSubNav,
   PendidikanHero, PendidikanHistory, PendidikanUniversities,
   PendidikanStudySpots, PendidikanStudentLife, PendidikanCreativeCulture,
   PendidikanCta, and PendidikanUniversityModal — in that order, passing the
   already-existing computed data (historyBlocks, universities, studySpots,
   lifeStats, creativeCulture, pageCopy) as props. Keep the existing
   <script setup> logic (data fetching, selectedUniversity ref,
   openUniversityDetail/closeUniversityDetail, setPageSeo) — wire
   PendidikanUniversities' emitted selection event to
   openUniversityDetail, and pass selectedUniversity + an `open` boolean to
   PendidikanUniversityModal, wired to closeUniversityDetail on its close
   event.

2. Confirm no other file still references the old inline template structure
   (there shouldn't be any, since this is the only page using these sections).

3. Run build and typecheck. Fix any errors from your own changes.

4. VERIFY in a real browser, not just build passing:
   - The page renders all 7 sections in order with real data (not empty
     states) — confirm the API data is actually flowing through props
     correctly.
   - Sticky sub-nav jump links scroll to the correct anchors.
   - Clicking a university card opens the modal with correct data, Escape and
     backdrop-click close it, focus returns to the triggering card.
   - Hard-refresh with DevTools console open — specifically check for
     "Failed to fetch dynamically imported module" or any hydration mismatch
     warning (documented known risk above). Report explicitly whether you
     checked and what you found.
   - Confirm the page still works in both `id` and `en` locale (language
     switch), since this page has full bilingual copy.
   - Resize to mobile width and confirm the layout (timeline strip, card
     carousels, stat grid) remains usable.

5. git add app/pages/pendidikan.vue
   git commit -m "feat(pendidikan): wire decomposed sections into page, remove monolithic template"
```

---

## Phase 3 — `reviewer`

```
Review the rebuilt Pendidikan page:
- Confirm app/pages/pendidikan.vue's <script setup> data-fetching logic and
  computed properties are byte-for-byte unchanged from before this rebuild
  (diff against git history) — this task was scoped as template decomposition
  only, not a data-layer change. Flag any unintended modification.
- Confirm no component in app/components/pendidikan/ calls useAsyncData or
  fetches data independently — all data must flow from the parent page via
  props.
- Accessibility: modal focus trap and Escape/backdrop-close work, sub-nav
  links are keyboard-reachable, images have appropriate alt text.
- No console errors, specifically re-checking for the dynamic-import
  hydration error documented in this plan.
- Confirm every worker's commits are scoped to only their assigned files —
  flag any commit that touched files outside its stated scope.
- Confirm bilingual content (id/en) still renders correctly for every new
  section.
Report findings with file+line references, not general impressions.
```

---

## Running this in Pi

```
Run worker on the Phase 0 task (sub-nav + modal shell). Once that commits, run
these 7 as parallel workers: [hero, history, universities, studyspots,
studentlife, culture, cta section tasks]. Once all 7 commit, run worker on the
Phase 2 wiring task. Once that commits, run reviewer on the Phase 3 review task.
```

---

Reminder yang sudah pernah saya bilang tapi penting diulang di sini: pastikan branch/commit baseline ini sudah ada sebelum worker pertama jalan (`git add -A && git commit -m "baseline: pre-pendidikan-rebuild"`), supaya kalau arah ini ternyata perlu direvisi, kamu revert satu halaman ini — bukan nuklir ulang seluruh proyek kayak kemarin.
