# Design System — FirstHome.tools

Read this file before any visual or UI decision. Do not deviate without
explicit approval. In QA mode, flag any code that doesn't match this file.

Created by /design-consultation on 2026-07-31 (2 board rounds, 16-site
competitive research, Codex + Claude outside voices). Approved variants
live in-repo: `docs/ai/plans/assets/design-system-20260731/` (A2 landing,
A3 result, C2 platform — HTML + PNG are the visual reference; working
copies also in `~/.gstack/projects/zacgoodwin-FirstHome.tools/designs/`).

## Product Context

- **What this is:** A comprehensive home binder for first-time homeowners —
  maintenance schedule, service history, documents, inspection records. The
  v1 spike is a signup-optional wizard that surfaces maintenance tasks the
  owner didn't know existed and delivers them as a subscribed calendar feed.
- **Who it's for:** First-time homeowners with no maintenance experience,
  arriving cold from Reddit. Skews anxious, scanning, on any device.
- **Space:** Home maintenance / home management (HomeZada, Homer, Dwellin,
  HomeQueue, HouseFacts...). Quality end of the category is cream/sage
  lifestyle SaaS; nobody is cozy, nobody shows evidence.
- **Project type:** Web/PWA, SvelteKit. Hybrid: poster-style public pages,
  record-sheet app surfaces.
- **The memorable thing:** "It knew my home better than me."

## Aesthetic Direction

- **Direction:** **The Hearth Almanac.** A beloved reference book read by the
  fire — that happens to be alive. Farmer's-almanac authority (citations,
  ledger lines, record numbers) wrapped in cottage-hearth warmth (candlelit
  paper, ember accents, linocut art, seasonal rhythm). Not a SaaS dashboard,
  not a field manual: a book your home keeps.
- **Decoration level:** Intentional. Hairline ledger rules, small-caps
  citation footnotes, one 3-4px offset paper shadow on sheets, linocut spot
  illustrations. Nothing else.
- **Mood:** Curled up by the fireplace with cocoa while the almanac quietly
  knows when the frost comes. Calm, warm, competent.
- **Why it wins:** the category answers the post-Centriq trust crisis with
  words and lifestyle photos. We answer it with artifacts: visible sources,
  printable pages, export everywhere. Paper doesn't delete your data.
- **Reference:** the approved variant HTML/PNGs (path above); competitor
  screenshots in the consultation scratchpad established what NOT to look
  like (mint-cream lifestyle SaaS, purple AI-dark, corporate blue).

## Typography

- **Display/Hero:** **Fraunces** (variable) — wonky almanac serif with a
  literal coziness knob. Settings: `"opsz" 144, "SOFT" 75-100, "WONK" 1` at
  masthead sizes; `"opsz" 40, "SOFT" 80-95` for section heads (WONK 0 or 1
  per surface; the approved variants use WONK 1 for mastheads/wordmark).
- **Body/UI:** **Atkinson Hyperlegible Next** (fallback: Atkinson
  Hyperlegible) — Braille Institute-designed, hyperlegible, warm. 16px
  minimum body.
- **Data/citations/record numbers:** **IBM Plex Mono**, 400-500, ≤14px,
  letter-spaced small-caps labels. This is the evidence voice: dates,
  intervals, SOURCE lines, REC numbers, seasonal header line.
  (Design-review constraint D12 amended by approval: two typefaces + one
  mono confined to data/citation sizes.)
- **Code:** IBM Plex Mono.
- **Loading:** Google Fonts (`Fraunces:opsz,wght,SOFT,WONK`,
  `Atkinson Hyperlegible Next`, `IBM Plex Mono`); self-host at build if the
  scaffold prefers.
- **Scale:** mono-label 10-12px · body-small 13-14px · body 16px ·
  lead 17-19px · section head 18-22px · page title 44px · masthead
  52-64px (clamp on mobile). Headline leading ~1.04; body 1.55.

## Color

- **Approach:** Restrained. Warm paper neutrals; ember is scarce and means
  "act" or "overdue" — never decoration.

```css
:root {
  --paper:      #F6EEDF;  /* candlelit paper — page background */
  --page:       #FDF8ED;  /* fresh page — sheets, cards-that-earn-it */
  --ink:        #2A211B;  /* dark-roast ink — primary text */
  --ink-faded:  #77685A;  /* faded ink — muted text */
  --ember:      #BC4B23;  /* THE accent: primary action, overdue, commonly-missed */
  --cocoa:      #6B4A32;  /* secondary: illustration ink, borders, quiet links */
  --pine:       #3D5C46;  /* success / verified / done */
  --amber:      #9A6A15;  /* warning */
  --brick:      #A93B2E;  /* danger */
  --winter:     #4A6B8A;  /* info + winter seasonal tint */
  --hairline:   #E2D5BE;  /* ledger rules, borders */
}
```

- **Contrast:** body text pairs ≥4.5:1 (ink on paper/page passes; faded ink
  is for ≥14px secondary text only; never faded-on-paper below 14px).
- **Dark mode:** none in v1 (per design review). Future: "lamplight" mode —
  do not improvise it.

### Seasonal system (approved risk)

The UI knows the season. Four tints and mastheads, driven by the calendar:

| Season | Tint | Masthead vignette (linocut) |
|---|---|---|
| Autumn | ember `#BC4B23` | falling leaves |
| Winter | winter `#4A6B8A` | snowfall / hearth |
| Spring | spring green `#5B7A46` | seedlings |
| Summer | sun amber `#C99A2E` | sun / open window |

Scope: the mono seasonal header line ("Winter · January · Deep frost"), the
masthead vignette, and small accent glyphs ONLY. Core palette, ember CTA,
and semantic colors never shift.

## Spacing

- **Base unit:** 8px. Scale: 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96.
- **Density:** comfortable on public pages; denser (13-16px paddings) on
  record sheets. Reading measure 68ch max. Content max-width 1160-1440px.

## Layout

- **Approach:** Hybrid. **Poster grammar** for public pages (landing,
  result): 12-col grid, headline upper-left (never centered), record sheet
  right, page number bottom-right, colophon rule. **Record-sheet grammar**
  for the app: binder rail left (mono tab numbers + tab names), sheet
  content, evidence in the margin.
- **Binder rail (platform nav):** This month · Schedule · Systems ·
  Service log · Documents · Export. ("The Hearth" is the aesthetic's name,
  not UI copy.)
- **Views:** By month (default) and By area (Safety / Systems / Exterior /
  Interior) as a labeled toggle — on the app schedule and as the result
  page's accordion grouping.
- **Cards:** only where the card IS the interaction (a tappable task row, a
  sheet). Task lists are typographic ledgers with hairlines — never 19
  bordered boxes. (Design review D13.)
- **Border radius:** 2px controls · 6px sheets · round only status dots.
- **Shadows:** one offset paper shadow (`3px 3px 0` to `4px 4px 0` ink) on
  primary sheets/CTA. No blur shadows, no glass, no gradients.

## Illustration

- **Linocut/woodcut line art only**, drawn in cocoa `#6B4A32`, 2-2.5px
  strokes. Spot subjects: cottage with chimney smoke, kettle, gutters with
  leaves, snowdrift, seedling, sun. No photography of people, ever. No
  emoji as design elements. Build as inline SVG.

## Motion

- **Approach:** Documentary-minimal. Motion behaves like a document, not an
  app: facts type into the ledger (~180ms), result rows reveal sequentially
  (≤500ms total), page transitions shift slightly horizontal like indexed
  sheets. The live task-count animates old → new.
- **Easing:** enter ease-out · exit ease-in · move ease-in-out.
- **Duration:** micro 50-100ms · short 150-250ms · medium 250-400ms.
- **Never:** confetti, bounces, scroll choreography, count-up theatrics.
- **`prefers-reduced-motion`:** strips every transform; numbers update
  without tweening. (Design review D17.)

## Voice & copy rules

- **"Home", never "House"** — condos and townhomes are homes.
- **"Signup not required"** — not "No signup", and don't lead with "Free".
- **"Commonly missed"** — the badge/flag language for unknown tasks. It's a
  property of the rule (sourced), never a claim about the user ("you didn't
  know"). The personalized didn't-know count is earned via an optional
  end-of-wizard "which of these were you already doing?" step.
- No protocol/file jargon in UI strings: "Add to my calendar" (not webcal),
  "Copy your calendar link" (not feed URL), "Download the PDF" (not .ics
  snapshot). (Design review D11.)
- Warm-plain register: "Quiet month, warm home." "Answering starts your
  almanac — nothing to sign up for." Utility language on app surfaces;
  never mood copy on controls.
- Citations render as small-caps mono footnotes: `SOURCE: NFPA 211 ·
  REVIEWED 2026-06`.

## Signature patterns

- **The wizard is a TurboTax-style sectioned interview** — branching, more
  questions as answers uncover them; progress by section, never a fixed
  question-count promise. One question dominates; the live plan is a pinned
  count bar (mobile) or always-visible ledger column (desktop ≥768px).
- **The result page is the end-of-wizard destination** (approved as "perfect")
  and is directly linkable — the edit URL is its permalink. By-area
  accordion, one ember CTA (calendar), "Keep this almanac" account block,
  PDF as quiet link.
- **Task page** — separate, calendar-event-linked, per home: why + source +
  check-off + service history write. (Wireframe v2 screens 3/3b.)
- **The Almanac PDF** — the export is a typeset booklet ("The Almanac of
  The Home on Birch Lane · First Edition · MMXXVI"), and screens print
  clean; print is a first-class surface.
- **The Mail Slot** (FUTURE, loved, not v1) — email documents to the home's
  own address; they file into the binder.
- **Seasonal header line** everywhere the user is signed in or mid-wizard:
  `WINTER · JANUARY · DEEP FROST`.

## Accessibility (binding, from design review D17)

Native radios/fieldsets in the wizard · 44px touch targets · visible focus
everywhere (never `outline:none`) · selected state signaled beyond
border/fill · ARIA live region on the task count · focus moves to the
surprise beat and returns on dismiss · 4.5:1 body contrast · reduced-motion
path.

## Anti-slop (binding, from design review D12 — amended)

No system-ui/-apple-system as production faces · no purple/indigo gradients
· no 3-column icon-circle feature grids · no decorative blobs/wavy dividers
· no emoji-as-design · no uniform bubble radius · no centered-everything ·
no stock photography · typefaces: Fraunces + Atkinson Hyperlegible Next +
IBM Plex Mono (mono ≤14px data/citations only).

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-31 | Hearth Almanac direction | 3-voice convergence (Claude, Codex, subagent) on almanac/evidence; user steered field-manual → cozy hearth; 16-site research shows the territory empty |
| 2026-07-31 | Fraunces + Atkinson Hyperlegible Next + IBM Plex Mono | Almanac warmth + hyperlegibility (D17) + evidence voice; D12 two-face rule amended to allow the mono at data sizes |
| 2026-07-31 | Palette (candlelit paper / dark-roast ink / ember) | Cozy warmth + archival authority; ember scarce so action reads instantly |
| 2026-07-31 | Seasonal design system | Maintenance is seasonal; no competitor does it; scope-limited to header line, vignette, accent glyphs |
| 2026-07-31 | Linocut-only illustration, no people photography | Evidence-over-reassurance risk (R1); ownable, cottage-cozy, almanac-authentic |
| 2026-07-31 | Print as first-class surface, Almanac PDF booklet | Premise 5 (trust/export) made visceral (R2/R3) |
| 2026-07-31 | "Commonly missed" not "you didn't know" | Board round 1: can't verify what the user knew; rule-property framing is defensible; optional wizard step earns the personal count |
| 2026-07-31 | Nav: "This month" front tab; The Hearth is not UI copy | Board round 1: name unclear; month view is the loved core |
| 2026-07-31 | By month + By area views; result accordion by area | Board round 1: flat list won't scale |
| 2026-07-31 | "Home" never "House"; "Signup not required"; drop "Free" | Board rounds 1-2 |
| 2026-07-31 | TurboTax-style sectioned wizard, no fixed question count | Board round 2 |
| 2026-07-31 | Result page linkable (edit URL = permalink); separate task page per calendar event | Board round 2; aligns wireframe v2 screens 3/3b |
| 2026-07-31 | Mail Slot recorded as future pattern | Board round 1: loved, not v1 |
