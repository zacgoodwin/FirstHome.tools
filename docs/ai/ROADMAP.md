# FirstHome.tools — Proposed Feature Roadmap

Drafted 2026-07-31 during /design-consultation, from: the original spec
(`docs/ai/plans/initial spec.md` — voice-memo discovery notes, 2026-07-26),
the approved Live Loop plan, two design-board feedback rounds, and 16-site
competitive research.

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
| 4 | The Mail Slot + document intelligence | email-in filing, inspection import, nameplate/manual extraction | binder retention proven |
| 5 | The Living Almanac | seasonality/region, recalls, warranty expiry, failure foresight, home-aware assistant | platform DAU/MAU worth intelligence spend |
| 6 | Beyond the binder | projects & providers, records/insurance/resale, multi-property | each bucket gated separately; see phase 6 |

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
  task detail pages, month strip with busy-month markers, one-off
  (non-recurring) maintenance events (spec §5).
- **Service log**: chronological ledger, me/pro attribution, notes on
  anything observed, per-asset history; completion writes are auditable,
  never just dismissed reminders (spec decision 6).
- **Systems**: home profile v2 — the wizard's answers become editable
  asset records: category/type, custom display name, make/model/serial,
  install date, expected service life, installer + preferred provider,
  warranty info, notes, attachments (spec §6). Data model supports
  multiple assets of one type (three AC units). Full lifecycle: add after
  onboarding, edit incomplete details later, one-off service entries,
  replace-preserving-history, archive with show-archived, delete after
  confirmation. Plan regenerates when an asset is added or replaced.
- **Documents**: upload receipts, manuals, warranties, inspection reports;
  attach to assets and log entries; home-level documents; browse-all view
  showing what each is attached to (spec §7).
- **Household sharing**: invite household members with real permissions —
  view / add / edit / complete (spec §1); builds on the deliberately-shared
  completion token. Roles model is a spec open question; decide at phase
  entry.
- **Export**: everything, always — JSON + PDF + ICS (premise 5, table
  stakes).
- Competitive note: this is HomeZada/Homer territory. Differentiation
  stays the design system (evidence + hearth) and the calendar-native loop;
  do not chase their feature count (premise 3).

## Phase 4 — The Mail Slot + document intelligence

Board: Mail Slot "loved as a future feature." Spec: document extraction to
reduce questionnaire data entry.

- **Mail Slot**: each home gets an email address; forwarded receipts,
  manuals, and invoices file themselves into Documents (HouseFacts owns
  this pattern today — "your home gets its own inbox"; ours files into an
  almanac, not a feed).
- **Inspection-report import**: upload the inspection PDF from closing;
  extract systems, ages, and inspector-recommended tasks into the binder
  (ref-urls sample inspections are the test corpus). This is the highest-
  value cold-start accelerant in the category: HouseFacts gestures at it;
  nobody nails it.
- **Nameplate + manual extraction** (spec, future opportunities): photo of
  the data plate or an uploaded manual prefills make/model/serial and
  fills asset records — the wizard sheds typing. This was Centriq's
  signature ("snap the nameplate") and Homer's today; category-proven
  demand, dead incumbent, no cozy owner.
- LLM parsing routes through local Claude Code per rules/CODING.md; if a
  hosted call is ever needed, that's an explicit Zac decision first.

## Phase 5 — The Living Almanac

- Climate/region interval adjustments (already deferred in the plan).
- Appliance recall alerts by make/model/serial (spec; HomeBinder/Homer
  table stakes by then).
- **Warranty expiration tracking** (spec) — distinct from storing warranty
  docs: the almanac warns before coverage lapses, and suggests the
  pre-expiry service that keeps warranties valid.
- **Failure foresight** (spec): expected-service-life guidance per asset →
  "your water heater is in year 11 of 12" replacement planning. Ships as
  quiet ledger lines, never fearmongering (voice rules).
- **Home-aware assistant** (spec): answers questions from the home's own
  asset data ("what filter does my furnace take?"). Local Claude Code only
  (rules/CODING.md); needs its own eval suite before any user sees it.
- Seasonal almanac editions: the quarterly "what your home needs this
  season" summary — email or PDF, the seasonal design system made content.
  Also answers the spec's open question on reminder channels beyond
  calendar.
- Pro handoff: printable/sendable task spec for hiring out a job, plus the
  home's own preferred-provider records ("my plumber") — records, not a
  marketplace.
- Trusted tutorial links per task (spec: link out, never a content
  business).

## Phase 6 — Beyond the binder (spec horizons, each separately gated)

Three buckets from the spec's future opportunities. None starts without its
own premise-style gate; listed so nothing leaks into earlier phases.

- **Projects & providers**: honey-do/project lists, repair project plans,
  DIY-versus-pro guidance, recommended tools from the home profile,
  estimates and approvals. Adjacent-possible after the binder; the gate is
  users asking for it in support/feedback.
- **Records, insurance, resale**: household inventory for claims,
  photo-based item ID and value estimates, disaster response checklists,
  tax package from eligible property expenses, and the **transferable home
  history** — the binder handed to the next owner with owner-specific data
  scrubbed. The transfer artifact is the deepest moat in the bucket
  (Tended's "CARFAX for your stuff" gestures at it; nobody owns it), and it
  compounds premise 5: the almanac outlives even your ownership.
  Insurance-policy analysis and claim scripts need legal review first
  (spec risk); never imply guaranteed coverage.
- **Multi-property**: multiple homes per account, landlord/property-manager
  workflows, tenant portals, owner dashboards. A different business; only
  enter with distinct demand evidence.

## Explicitly out of scope (from the plan's constraints)

Home value/finance and moving tools (spec lists them; plan excludes them —
photo-based improvement recommendations, value-ranked projects, home
comparison, moving plans stay out until premises change) · smart home ·
tutorials as a content business · contractor marketplace fulfillment ·
household inventory beyond maintenance-relevant assets (until the phase-6
insurance bucket opens on its own gate).

## Spec open questions carried forward

Resolved since the spec: ICS is a subscribed feed, not a static snapshot
(plan); onboarding is the TurboTax-style branching wizard (board round 2);
launch categories + sources are the plan's rules-dataset critical path.

Still open, parked at their phase gates:

- Should users approve each generated task before it enters the calendar?
  (v1 answer: per-task "doesn't apply to my home" escape; revisit at phase 3.)
- Roles/permissions model for household sharing (phase 3 entry).
- Asset replace/archive/delete semantics for future tasks and history
  (phase 3 entry; spec requires history preserved).
- Document types, file sizes, storage limits (phase 3 Documents entry).
- Reminder channels beyond calendar (phase 5; seasonal editions are the
  first candidate).
- Research: is Consumer Reports' discontinued product a licensable rules
  source? Which inspection platform is "Spectora," and does it export?
  (feeds phases 0 and 4 respectively).

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
