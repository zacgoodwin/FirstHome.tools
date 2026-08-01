# FirstHome.tools — Proposed Feature Roadmap

Drafted 2026-07-31 during /design-consultation, from: the approved Live Loop
plan (whose Approach B carries the original spec's full scope: 11-category
wizard, asset records, documents, household sharing, month calendar + agenda,
service history), two design-board feedback rounds, and 16-site competitive
research. Source-spec note: `docs/ai/plans/archive/initial spec.md` was not
directly readable this session (directory is permission-denied); if it names
features beyond Approach B, fold them in on the next pass.

Status: PROPOSAL. Nothing below overrides the premise-2 gate: 10 unrelated
first-time homeowners complete wizard + subscribe, 5+ complete a task in 30
days unprompted.

## The arc

Spike proves the loop → the loop recruits → accounts keep people → the
binder becomes the moat. Each phase has a gate; no phase starts on vibes.

| Phase | Name | Ships | Gate to enter |
|---|---|---|---|
| 0 | The Live Loop (spike) | wizard → almanac → calendar feed → mark-done | already approved |
| 1 | Loop hardening + Report Card | share artifact, outreach | loop survives Apple + Google (technical gate, already committed) |
| 2 | Keep This Almanac (accounts) | optional accounts, saved homes | premise-2 bar met, or clear signal strangers want to return |
| 3 | The Binder | service log, documents, systems/assets, month+area views | ≥N active accounts returning monthly (pick N at phase 2 exit) |
| 4 | The Mail Slot + inspection ingest | email-in filing, inspection-report import | binder retention proven |
| 5 | The Living Almanac | seasonality/region, recalls, pro handoff | platform DAU/MAU worth intelligence spend |

## Phase 0 — The Live Loop (approved, building now)

Per the approved plan. Nothing added here; the roadmap exists so nothing
below leaks into it.

## Phase 1 — Loop hardening + Report Card front door

- Report card share artifact ("Your home has 19 tasks — 7 most owners
  miss"), wizard as public landing. Already committed as the plan's phase 2.
- The Almanac PDF booklet (design system R3) doubles as the share artifact.
- Per-client subscribe QA across Apple/Google/Outlook.
- Competitive note: Dib/Toolbox/HomeBeacon all built landing pages on
  Centriq's shutdown; the report card is our equivalent recruiting artifact,
  but positive-sum.

## Phase 2 — Keep This Almanac (accounts, opt-in)

Board feedback: result page carries "Create a free account" for conversion.
Premise 7 says nothing may make accounts impossible; this phase makes them
real.

- Email+magic-link account (no passwords to start); claims the anonymous
  home row. Anonymous flow stays fully functional (signup not required).
- Saved homes list; edit-URL recovery via account.
- Check-off history persists to the account (service log seed).
- Optional end-of-wizard "which of these were you already doing?" step —
  earns the personal didn't-know count (design system) AND premise-2
  evidence.
- Guardrail: the account is an offer after value, never a wall (design
  review D18).

## Phase 3 — The Binder (the spec's full scope, sequenced)

The C2 platform screen is the visual contract: binder rail = This month ·
Schedule · Systems · Service log · Documents · Export.

- **This month**: month view default + by-area toggle (board-approved),
  task detail pages, month strip with busy-month markers.
- **Service log**: chronological ledger, me/pro attribution, per-task
  history (spec: service history).
- **Systems**: home profile v2 — the wizard's answers become editable
  system records (heat type, water heater age...), each linked to its rules
  (spec: asset records, TurboTax-style deepening).
- **Documents**: upload receipts, manuals, warranties; attach to systems
  and log entries (spec: documents).
- **Household sharing**: invite a partner to the home (spec: sharing);
  builds on the deliberately-shared completion token.
- **Export**: everything, always — JSON + PDF + ICS (premise 5, table
  stakes).
- Competitive note: this is HomeZada/Homer territory. Differentiation
  stays the design system (evidence + hearth) and the calendar-native loop;
  do not chase their feature count (premise 3).

## Phase 4 — The Mail Slot + inspection ingest

Board: Mail Slot "loved as a future feature."

- **Mail Slot**: each home gets an email address; forwarded receipts,
  manuals, and invoices file themselves into Documents (HouseFacts owns
  this pattern today — "your home gets its own inbox"; ours files into an
  almanac, not a feed).
- **Inspection-report import**: upload the inspection PDF from closing;
  extract systems, ages, and inspector-recommended tasks into the binder
  (ref-urls sample inspections are the test corpus). This is the highest-
  value cold-start accelerant in the category: HouseFacts gestures at it;
  nobody nails it.
- LLM parsing routes through local Claude Code per rules/CODING.md; if a
  hosted call is ever needed, that's an explicit Zac decision first.

## Phase 5 — The Living Almanac

- Climate/region interval adjustments (already deferred in the plan).
- Appliance recall alerts (HomeBinder/Homer table stakes by then).
- Seasonal almanac editions: the quarterly "what your home needs this
  season" summary — email or PDF, the seasonal design system made content.
- Pro handoff: printable/sendable task spec for hiring out a job (not a
  contractor marketplace — explicitly out of scope per constraints).

## Explicitly out of scope (from the plan's constraints)

Home value/finance · smart home · tutorials/content business · contractor
marketplace · household inventory beyond maintenance-relevant systems.

## Competitive positioning summary (research, 2026-07-31)

- Quality incumbents (Homer, HomeQueue): polished lifestyle SaaS, app-store
  funnels, feature breadth. We win on minutes-to-value, calendar-native
  delivery, evidence, and the empty cozy-almanac territory.
- Trust void: Centriq's corpse still drives category search traffic; three
  competitors farm it. Our answer is structural (export, print, sources).
- Dead/dying: Kousso (dead), Oply (domain for sale — plan doc still lists
  it as a live incumbent; update on next plan revision).
- Nobody owns: seasonal design, printable almanac artifact, inspection-PDF
  cold start done well, cozy.
