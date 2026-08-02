---
prd: docs/ai/plans/zacgo-main-design-20260727-085637.md
review_date: 2026-08-01
stage: post-review, pre-implementation (build readiness)
agents: [engineer, designer, executive, legal, uxr, skeptic, customer]
---

# PRD Review Synthesis: FirstHome.tools Live Loop

**Reviewed:** 2026-08-01
**Current stage:** Post-review, pre-implementation. Plan carries VERDICT "CEO + ENG + DESIGN + DX CLEARED — ready to implement".
**Reviewers:** Engineering, Design, Executive, Legal, UXR, Skeptic, Customer Voice
**Note:** `skeptic` and `uxr-analyst` are not in this session's agent registry (added in commit d633943; needs a session restart). Both ran via `general-purpose` reading their persona file from disk. Framework is unchanged; model tier may differ.

---

## TL;DR

**Overall assessment:** Needs significant work before the first build ticket. Not a scope problem — a completeness problem in the task list, plus three legal items that must exist before a stranger touches the product.

**Critical blockers:** 4
**Important gaps:** 9
**Conflicting perspectives:** 4

**The finding four independent reviewers reached separately:** the Implementation Tasks list (31 tickets, ~78-79 human hours) is entirely review remediation and infrastructure. **Not one ticket builds the wizard, the plan builder, `schedule.ts`, the ICS generator, the result page, the task page, or any of the ten approved surfaces.** Engineering, Executive, UXR and Skeptic each found this alone. The plan headline still says "Effort S (human ~2 weeks)", set before ~78 hours of remediation stacked on top of it in the same document.

**Recommended next step:** Do not cut a build ticket yet. Three things, in order: (1) run T-C1 this week and widen it per T-D7/R3/Android; (2) post The Assignment's question with no link, this week, ~1 hour; (3) ticket the actual product and re-total the plan.

---

## Critical Blockers

### 1. The plan has no tickets for the product

**Flagged by:** Engineering (❌ sole blocker), Executive (top concern), Skeptic (Q1), UXR (assumption #1)
**Issue:** T-C1..T-C12, T-E0..T-E9, T-D1..T-D9 all derive from review findings. T-E2 makes a clock injectable in a module no ticket assigns. T-C4 adds a fallback cache to a generator that has no ticket. The ten surfaces, the plan builder (answers → tasks), the ICS generator and the Playwright lane are unticketed.
**Impact:** "Ready to implement" describes half a project. Time-to-first-tester is invisible; the founder cannot see the real number.
**Recommendation:** Ticket the core build, then publish one combined total (core + every T-task). Revise or retire the "Effort S / ~2 weeks" line at Approach A (line 187), which five rounds left untouched.
**Owner:** @Zac, before the first build ticket.

### 2. No deletion path, no privacy policy, no terms

**Flagged by:** Legal (sole finder — a genuine blind spot; six prior rounds never ran a legal pass)
**Issue:** No "delete my home" anywhere in the data model, Implementation Tasks or the ten-surface inventory. No privacy page, no ToS, and no surface to link them from. A public Reddit post cannot exclude EU/CA residents; GDPR Art. 17 and CCPA both require some deletion path. `recovery_email` is PII; hashed IP + user-agent + `feed_fetches` timestamps are personal data even pseudonymized, and P6a already flags those tables as growing unattended with no retention policy.
**Impact:** Exposure begins the moment the launch post publishes.
**Recommendation:** Cheapest-first: one combined privacy + terms page from a standard template, linked from surfaces 1 and 6; a "delete this home" action on the edit-token surface; a retention purge job folded into T-E6/T-E7 (fixes P6a's disk growth at the same time).
**Owner:** @Zac.

### 3. No safety disclaimer on life-safety guidance

**Flagged by:** Legal (❌), reinforced by Customer Voice's read of the trust moment
**Issue:** RULES-SOURCING.md, dataset pinning and DXT2's publish gate are engineering defensibility. None of it is user-facing language. The product tells people when to service smoke/CO alarms, dryer vents and water heaters, and says nothing about being general guidance rather than a substitute for manufacturer instructions or inspection — and nothing about the plan's own admission (Y1) that it cannot guarantee the calendar will notify them.
**Impact:** The sharpest liability gap in the document, and it costs one sentence.
**Recommendation:** One disclaimer sentence on the result-page trust line (D10/T-E9) and restated on the task page for safety-category rules. Separately, confirm sole proprietor vs LLC before the post goes out — five-minute check, large tail risk.
**Owner:** @Zac.

### 4. The discovery claim (premise 1) cannot be measured by the instrument assigned to it

**Flagged by:** UXR (❌), Skeptic (independently, from the other end)
**Issue:** Y9 concedes "the discovery claim in premise 1 is carried by the C4 checklist alone." C4 asks "which of these were you already doing?" **after** showing an authoritative list — hindsight bias plus social desirability, and it is skippable, so missingness is non-random. From the other direction: Y3 widened the window to 45 days because only monthly-anchored tasks land in it, and the monthly tasks are HVAC filter and alarm test — the items already on the founder's own "few obvious tasks" list. The completion bar is therefore carried by tasks that are *not* the discovery claim.
**Impact:** The bar can pass or fail without saying anything about the premise the product exists to test.
**Recommendation:** Move premise 1's measurement upstream of exposure (see R2 below). Demote C4 to a headline input. If C4 stays load-bearing, log skips separately and never report a rate over completers only.
**Owner:** @Zac.

---

## Important Gaps

### Contract and implementation omissions (Engineering)

- **`seq` derivation formula is never written down.** C6 says "deterministic occurrence index from the anchor"; E8.3 re-anchors on completion. No section states the algorithm or how it avoids colliding with `unique (task_id, seq)` under repeated re-anchoring. Every sibling ambiguity (anchor field, `getRule` miss path) got closed by DX6; this one did not.
- **Wizard-session bootstrapping is unspecified.** Y4/T-C7 imply a home + edit token exists after answer 1, but nothing states how the client carries that token through the rest of the wizard before it is ever shown. TEST-PLAN's own back-button and stale-submit cases are unbuildable without it.
- **"Hashed IP" names no algorithm or salt.** A bare hash over IPv4's ~4B space is brute-forceable. Needs HMAC with a server secret for X3's "no PII" posture to hold.
- **Nothing enforces the single-process assumption.** P2's LRU and P3's limiter are correct only for one container. Nothing in compose.yaml or the code stops a later session reintroducing the exact serverless-shaped bug three rounds spent effort removing.
- **T-D3 renames `rule_version` → `dataset_version` in the same commit as the code reading it** — literally what P8a forbids. Harmless pre-launch, but P8a is never scoped as "binds from the first deploy."
- **T-D6 requires a retention policy as an acceptance criterion and defines no interval or mechanism.**
- **No physical Android device in the one test allowed to change the product.** T-C1 tests "a real iPhone and a real Google account." Subscribing to an external ICS feed from Google Calendar on Android is a known rough edge (UXR: Android/Chrome has no `webcal:` handler and the mobile app has no add-by-URL) — and premise 3's pitch is the calendar already on the user's phone.

### Design gaps (Design)

- **Three of ten surfaces have zero rows in the interaction-states table:** surface 3 ("Not sure" assist), surface 4 (surprise moment), surface 5 ("already doing?" checklist). The table's own preamble calls an unwritten state "a state invented under deadline pressure." Surface 10 has no row either, only an error-cell cross-reference.
- **Surface 3 has no focus-management rule**, while D17 specifies focus movement for surface 4 in detail. D7 calls surface 3 the highest drop-off risk in the flow; a keyboard user can lose their place in the flow's most fragile moment. Design rates this a blocker.
- **Surface 5's failure path is undefined.** The wizard row's inline-retry-with-preserved-answer is never extended to the final checklist submit; a failed request silently loses the last step.
- **The storyboard's literal copy violates DESIGN.md.** Step 2 reads "no signup, free, 3 minutes"; DESIGN.md mandates "Signup not required" and says do not lead with "Free." Plan predates DESIGN.md by four days; three rounds since have not caught it. A builder copying it verbatim ships wrong on day one.
- **DESIGN.md's binder rail and D3's persistent header are two unreconciled nav patterns** with nothing stating that the rail is phase-2/platform-only.
- **No a11y spec for the by-area accordion or the D2 disclosure** (`aria-expanded`, focus order, native `<details>` or not), despite D17 being otherwise thorough.
- **Surface 5's checkboxes are not covered by D17's native-control requirement**, which names only the wizard radios.

### Measurement gaps (UXR, Skeptic)

- **`subscribed` is nearly free under C3.** Apple polls ~hourly, so "≥2 fetches ≥6h apart" fires automatically ~6h after a single tap and never expires. Against the plan's own ~70%-deleted-after-one-use figure, 10/10 subscribed may mean 10 people tapped a button.
- **No churn metric.** Feed fetches going quiet is free unsubscribe telemetry, defined nowhere. Subscribe-then-silence is the likely outcome and the plan cannot see it. (UXR R5: "polling ceased" = last `feed_fetch` > 7 days for a subscribed home; one query, add to T-D9's runbook.)
- **"Unprompted" = no founder contact protects the metric and destroys the diagnosis.** Non-completers return zero information; nine of ten failing tells you nothing about why.
- **`?tester=NN` and the 60% completion bar at n=10** carry roughly a ±30-point confidence interval — detects catastrophe or triumph, nothing between. Y8 already concedes the instrument is names, not telemetry.
- **The ~70%-deleted-after-one-use stat has no traceable source.** Nearest real figures UXR found: 25% one-and-done, 71% day-90 churn, ~5-7% day-30 retention.
- **Approach C's hook contradicts v1's inventory.** "Your home has 27 tasks you didn't know about" is not producible from 15-20 rules over six categories, minus already-doing.

### Product-surface gaps (Customer Voice)

- **The subscribe moment never resolves its own leap of faith.** "Add to my calendar" has no client callback; the state table's answer is "added? here is how to check." The user is left manually verifying in another app that the button did anything.
- **D9's calendar lag will bruise the first completion regardless of the success-screen sentence.** The user marks done, opens the calendar to admire it, and the task still shows due. One line on a screen they have already left does not cover the moment they go check.
- **The shared action token is a surprise, not a feature, from the user's seat.** Sharing a household calendar so a partner can see a dentist appointment silently grants them the ability to mark, snooze or remove maintenance tasks. Nobody is told at share time. Legal independently flagged the safety-task version of this: a smoke-alarm task can be marked done or not-applicable by someone who did nothing.
- **The recovery-email ask sitting beside "no signup" reads as a soft signup with extra steps.**

---

## Enhancements to Consider

**Engineering:** write the `seq` formula into `schedule.ts`'s contract now (same treatment DX6 gave `anchor`); add a single-replica guard (`deploy.replicas: 1` or a boot assertion) at T-E1; fold Android into T-C1's device list; name the wizard-session token mechanism (a cookie is the obvious default) before T-C7.

**Design:** add state rows for surfaces 3, 4, 5 and 10; extend D17's focus language to surface 3 and the disclosure/accordion widgets; fix the storyboard copy line; state in one place that the binder rail is phase-2 only.

**Executive:** split the task list into "before spike/scaffold" and "before launch post," and run P2-tier hardening (T-E4, T-E5, T-C8, T-C9, T-D5..T-D9) parallel to the core build rather than before it — nothing in the P2 tier blocks T-C1 or the first tester.

**Legal:** a confirm step on not-applicable for safety-category tasks specifically, rather than the same one-tap flow as gutters; a security-contact / disclosure path for a public token-bearing URL scheme.

**UXR:** R1 — post The Assignment's question this week with no link and no product (~1h). Two returns: status-quo evidence in users' words, and a read on whether those subs carry you at all. The plan calls the low-subscribe branch "ambiguous by choice"; this de-ambiguates it for free, weeks before launch day. R2 — one evening, 5 × 30min from R1's repliers: ask what they think their home needs *before* showing anything, then reveal the six categories and count how many were news. That is premise 1 measured clean. R6 — day 46, debrief all ten by name regardless of outcome ("unprompted" only has to hold *during* the window).

**Skeptic:** gate phase 2 on homes still polling at day 90, not on the pass row alone — `feed_fetches` already records it.

**Customer:** a "tap here once you've added it" confirmation after subscribe; the calendar-lag sentence in plain words on the success screen; a warning before sharing that others can change tasks; a louder nudge to grab the export than a buried disclosure.

---

## Conflicting Perspectives

### Conflict 1: is the self-hosting ops surface worth ~21-28 hours pre-validation?

**Executive:** ~28 of the ~78 hardening hours (T-E1 8h, T-E6 2h, T-E7 8h, T-E8 3h, plus P2/P3/P5 work in T-C4/T-E4/T-E5) exist only because of a mid-review pivot with no stated tie to a metric — not cost, not control, not a STRATEGY.md line. Wants the reason written down, and T-E7's monitoring cut to one load-bearing item (the external feed probe) until the bar resolves.
**Skeptic:** harder — calls the plan's "it is a simplification, not a lateral move" false at the hour level: the pivot deleted 4 findings and added 9, a 7-item ops checklist, and 21 hours (27% of the task budget) of permanent ops load on the scarcest resource.
**Against:** P1 records the database rationale on merit (pg_dump backup story, roadmap phases 3-6) and the founder made the hosting call deliberately, mid-review. P7's permanent hostname genuinely raises the cost of a bad deploy.
**Decision needed:** write the one-line reason for self-hosting (cost, control, or a preference named as a preference), and decide whether T-E7's full checklist ships now or is trimmed to the external probe. Either answer is fine; the unstated premise is not.

### Conflict 2: is the approved scope still the right experiment?

**Skeptic:** proposes two smaller instruments — a static `.ics` download (no Postgres, no Caddy, no tokens, no permanent hostname, no backups, no uptime probe, ~5% of cost) and a concierge n=10 (hand-build ten calendars in ~10 hours, and the follow-up call *is* the user research this plan has none of). Notes that of three approaches considered, none was smaller than the one chosen.
**Against:** C8 already rejected a scope cut and the plan records it as "not to be re-argued." Premise 1 requires the wizard's live discovery moment, which neither alternative delivers. A static file cannot test the living-schedule half of the loop.
**Decision needed:** C8 stands on the surfaces. The concierge idea is not a scope cut though — it is a research instrument, and it overlaps R2. Worth taking as research, not as an architecture.

### Conflict 3: T-C1's sequencing — strength or symptom?

**Design:** names T-C1-gates-the-scaffold one of the five strongest decisions in the plan.
**Skeptic:** it is a 3-hour test that "can change what the product is," and it was not run before writing a design system, ten surfaces and 31 tickets.
**Resolution:** not a real conflict. Both say run it now. The disagreement is only about what the delay says about the process. Widen it while you are there: Android device, subscribe-step completion (UXR R3), and T-D7's removal semantics.

### Conflict 4: disclaimer copy vs D2's single primary action

**Legal:** wants a safety disclaimer on the result-page trust line and the task page.
**Design (D2/P9):** the result page has exactly one full-weight button and the trust line is already carrying the P9 snapshot promise.
**Decision needed:** PM call. Both fit — the disclaimer is a sentence, not a CTA — but the trust line is now doing three jobs (export promise, snapshot link, disclaimer). Worth a deliberate layout decision rather than accretion.

---

## Detailed Feedback by Perspective

### Engineering Review

**✅ Strengths:** token derivation (E3/C1); honest stack sizing (P1, Postgres chosen on backup/roadmap grounds, not fabricated performance); the P2/P2a split between recoverable failure (serve stale, 200) and unrecoverable (DB down, 503); injectable clock + golden file (P4/E11); `tools/gate.mjs` reuse rather than rebuild.
**⚠️ Concerns:** `seq` formula unwritten; wizard-session bootstrapping unspecified; "hashed IP" unnamed; single-process assumption unenforced; contract wiring order between T-E0 and T-D2; T-D3 vs P8a; retention policy named but undefined; no Android device in T-C1.
**❌ Blockers:** Implementation Tasks is a punch list, not a project plan (blocker 1 above).
**Estimated complexity:** **L**, not the "S / human ~2 weeks / CC 2-3 days" the document still headlines.
**Riskiest technical assumption:** the unenforced single-process posture underpinning P2's cache and P3's limiter.

### Design Review

**✅ Strengths:** D9's calendar-lag line; D5/surface 7's low-surprise reframe; D7's non-dead-end "not sure"; T-C1 gating the scaffold; D10/P9's trust-line promotion.
**⚠️ Concerns:** three surfaces with no state rows; surface 10 with no row; accordion and disclosure a11y unspecified; surface 5 checkboxes outside D17; binder rail vs D3 header unreconciled; storyboard copy violates DESIGN.md.
**❌ Blockers:** surface 3 has no focus-management rule; surface 5's submit failure path is undefined.
**Usability risk:** **Medium.** Unusually well specified for a pre-scaffold plan, but three of ten surfaces carry zero defined states and the only literal copy in the document contradicts the design system.

### Executive Review

**✅ Strengths:** every task traces to a HEALTH-METRICS row or a STRATEGY kill criterion; scope discipline held under six rounds (the DX round rejected a `feed:doctor` CLI, agent-loop instrumentation, a published contract); the competitive read is current and self-correcting; P9 is the sharpest finding in the document and is load-bearing in the copy, not just noted; the kill-criteria table makes "keep it as my own tool" a real branch.
**⚠️ Concerns:** ~78 human-hours of tasks, ~57 of them P1, none producing a pixel a tester sees; self-hosting unattached to any metric; T-E7 is production-SRE-grade for 10 manually-tracked users; the DX round added ~17 hours making the *next* session faster before the *first* has shipped.
**❌ Misalignment:** nothing is out of scope or serving the wrong segment. The failure is sequencing — rigor relocated from "more categories" to "more hardening," and no round asked whether the sum was proportional to 10 testers on a free product.
**Business impact:** Low-to-Medium. **Strategic fit:** Moderate.
**Verdict:** approve with conditions — fund T-C1 and T-E0 now; hold P1-tier ops hardening to a trimmed scope pending the self-hosting justification; run P2-tier parallel to the wizard build.
**The decision to force:** does the founder want self-hosting badly enough to spend ~28 of ~78 hardening hours on it before the first tester exists?

### Legal Review

*Not legal advice; risk flagging only.*
**✅ Addressed:** no accounts or cross-session cookies; no third-party ad/analytics SDKs; "no PII in meta"; hashed IP rather than raw; a real token design (C1/C5/E3); WCAG AA criteria in D17; no payments, so no PCI.
**⚠️ Concerns:** "anonymous" is a UX claim not a legal one; no retention policy for `feed_fetches`, request logs or `pg_dump` output; no consent copy near the recovery-email field; Y1 and X1/P2's known failure modes are never surfaced to the user as limitations; the shared action token on safety tasks; no security-contact path.
**❌ Blockers:** no deletion mechanism at all; no privacy policy or ToS and no surface linking them; no safety disclaimer; business entity unstated (sole proprietorship reaches personal assets on a fire/injury claim tied to a wrong interval).
**Legal risk:** **Medium.** Needs a real lawyer before launch: **No** for a template privacy/ToS. **Yes, cheap and optional** for a one-time ~30-minute consult on (a) personal liability from safety guidance under a sole proprietorship vs LLC, and (b) whether the disclaimer language actually does the limiting work it is meant to.

### UX Research Review

**✅ Strengths:** premise 3 has real desk research; C3's subscribed definition kills the vanity metric before it exists; Y4 is externally supported (a Notre Dame study found 73% of Reddit voters never click through); Y3's 45 days is confirmed by Google's undisclosed ~12-24h refresh and Apple's deferral under Low Power Mode; kill criteria written before the data exists; Y8's confirm-by-name.
**⚠️ Unvalidated, ranked:** (1) premise 4, "the MVP is the recruiting instrument" — Codex scoped a 48-hour prototype; five rounds turned it into a self-hosted production system while the evidence stayed at n=1; (2) premise 1's discovery *magnitude* — alarms, filters and gutters appear on every closing packet, so the genuine surprise inventory is realistically dryer vent, water-heater flush and sump pump, making D5's ≤2 reframe the modal outcome rather than an edge case; (3) the subscribe step is shaky mechanically, not motivationally; (4) premise 5 generalized from one shutdown; (5) segmentation — recruiting is untargeted, so dwelling mix may decide the bar rather than demand.
**Public evidence found:** 28% of recent buyers regret that the home "requires too much maintenance"; 39% blindsided by cost; 53% did not research maintenance before buying (Clever, Hippo — vendor surveys). Nothing isolates first-time owners on "I didn't know this existed."
**❌ Contradicts known behavior:** C4 as sole instrument for premise 1; "unprompted" destroying the diagnosis; Approach C's 27-task hook; no churn metric; **the source spec's own step 7 — "test the concept with five recent first-time homeowners" — and step 4 (watch someone finish a prototype) were dropped without argument.**
**Research validation:** **Weak.**
**The question that most needs an answer before launch day:** before you show them anything, what do first-time owners already believe their home needs, and how many of your six categories are actually news? If the answer is two, the discovery half of premise 1 does not carry.

### Skeptic Review

**🤔 Questions:** where are the product tickets; have you spoken to one first-time homeowner who is not you (zero interviews in 1708 lines); why does a 3-hour spike that "can change what the product is" run after the design system and 31 tickets; will the Reddit post survive r/firsttimehomebuyer's self-promo rules (one channel, no pre-flight, and the plan pre-admits a miss is uninterpretable); what guards the *pass* branch, given that hitting the bar auto-opens months of accounts work on 5 clicks of novelty traffic.
**⚠️ Riskiest assumptions:** (1) ignorance is the binding constraint — never tested; competing causes are cost ($200 gutter clean), dread (ladders, roofs), time, or rational deferral, and if it is cost or dread then a schedule of things you will not do is a guilt generator; (2) Y1 — **a failed T-C1 has no good branch inside the plan's own constraints**, since every named fallback is weaker than the push/email incumbents already send and push/email is explicitly out of scope; (3) the founder finishes ~78 hours of amendment work before any product code; (4) minutes-to-value beats Dwellin's address-only instant schedule, which is *fewer* inputs than a six-question wizard — asserted, never timed; (5) that a live-updating feed is what anyone wants in month 3.
**❌ Demonstrated:** the pivot's "simplification, not a lateral move" is false at the hour level; the validation bar cannot test premise 1 (monthly-anchored tasks are the already-known ones); "task completed" measures a webpage tap, satisfiable with zero maintenance performed; "subscribed" fires automatically ~6h after one tap; P9 documents the likely ending and declines to fix it; three approaches considered, none smaller than the one chosen.
**💡 Alternatives:** post The Assignment today (tests channel, moderation and problem existence in 48 hours for $0 — premise 4 conflates *recruiting users* with *testing whether the channel and the problem exist*); static `.ics`; concierge n=10.
**Process verdict:** avoidance, not discipline. "Discipline converges; this loop feeds on itself." Codex r3 caught defects the eng review wrote an hour earlier; r4 did the same to the DX review within minutes. T-E3 is a ticket to annotate the plan.
**Bet:** **No** on reaching 10 subscribers — not because 10 taps is hard, but because ~78 hours of amendment work plus an unticketed product must be crossed on nights and weekends before any stranger sees anything.

### Customer Voice Review

**✅ User value:** three minutes, no new app to remember to open, reminders in the calendar already checked — "my note fails because I have to remember it exists; a calendar event doesn't ask me to remember anything." The cited-source surprise moment reads credible rather than content-farm. Export means not being fully hostage to one guy's server. The event deep-linking to a task page means six weeks later you tap the event, not recall the site's name.
**⚠️ Friction:** the subscribe moment's unresolved leap of faith; D9's lag felt as breakage on the first completion; the shared-token surprise ("nobody asked my permission when I shared the calendar so they could see my dentist appointment"); losing the bookmark means recovery breaks the subscription you already set up; the recovery-email ask beside "no signup."
**❌ Would reject:** if nothing ever notifies (Y1) this is the ignored phone note relocated; if the founder walks away and the calendar silently goes stale (P9) — "the exact kind of quiet betrayal that makes me distrust the next stranger's tool too."
**💡 Would love:** a post-subscribe confirmation; the lag sentence in plain words on the success screen; being told before sharing that others can change tasks; a louder nudge to grab the export.
**User sentiment:** **Might use it.** "If the calendar event actually pops up and nags me the way a real reminder should, I'd keep it; if it sits silent and I only find the task by opening the calendar app on my own initiative, it's my ignored phone note with extra steps, and I'm gone within a month."

---

## Action Items

**This week, before any further planning:**
- [ ] Run T-C1, widened: Android device, subscribe-step completion on iPhone Safari / Android Chrome / Google Calendar mobile, and T-D7's event-removal semantics — @Zac
- [ ] Post The Assignment's question with no link and no product, to the three target subs (~1h) — @Zac
- [ ] Confirm sole proprietor vs LLC (5 min) — @Zac

**Before the first build ticket:**
- [ ] Ticket the core product build and publish one combined hour total; revise the "Effort S / ~2 weeks" line — @Zac
- [ ] Write the one-line reason for self-hosting, and decide T-E7's scope — @Zac
- [ ] Add a deletion path to the data model and the ten-surface inventory — @Zac
- [ ] Write the `seq` formula and the wizard-session token mechanism into the contract — @Zac
- [ ] Add state rows for surfaces 3, 4, 5, 10; add surface 3's focus rule and surface 5's submit-failure path — @Zac
- [ ] Fix the storyboard's "no signup, free, 3 minutes" copy against DESIGN.md — @Zac

**Before the launch post:**
- [ ] Privacy + terms page, linked from surfaces 1 and 6 — @Zac
- [ ] Safety disclaimer on the trust line and safety-category task pages — @Zac
- [ ] Retention purge for `feed_fetches`, request logs and backups (fold into T-E6/T-E7) — @Zac
- [ ] Churn query ("polling ceased") in T-D9's runbook — @Zac
- [ ] Post-subscribe confirmation affordance; plain-words lag sentence; share-warning before the calendar is shared — @Zac

**Decisions needed:**
- [ ] Self-hosting justification + T-E7 scope (Conflict 1) — PM
- [ ] Take the concierge idea as a research instrument or not (Conflict 2) — PM
- [ ] Trust line layout with the disclaimer added (Conflict 4) — PM

---

## Next Steps

1. **Immediate:** T-C1 widened, and The Assignment's question posted. Both are cheap, both can invalidate large parts of the plan, and neither requires a line of application code.
2. **This week:** UXR's R2 — five 30-minute calls recruited from R1's repliers, asking what they think their home needs *before* being shown anything. It is the only clean measurement of premise 1 available, and it closes the "zero interviews in 1708 lines" gap that UXR and Skeptic found independently.
3. **Before the first build ticket:** re-total the plan with product tickets in it, and settle the four conflicts.

**Recommended:** `/decision-doc` on Conflict 1 (self-hosting hours) — it is the largest unattached-to-a-metric decision in the document and two reviewers reached it separately.

---

*Generated: 2026-08-01*
*Agents used: 7 (Engineering, Design, Executive, Legal, UXR, Skeptic, Customer Voice)*
*Next: address blockers 1-4, then re-review or proceed to build*
