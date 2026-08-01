# Rules sourcing method

Written by /plan-ceo-review on 2026-08-01 (finding F5). The rules dataset is
the plan's critical path and its liability surface. C7 splits the work
deliberately: the zod contract and gate tests enforce **form**, a human
enforces **truth**. This file is the truth half. Without it, the one task AI
cannot compress is also the one task with no written standard.

Applies to every rule in `services/rules`, at first authoring and at every
revision.

## Source hierarchy

When more than one source addresses a task, cite the highest tier that covers
the exact claim. Do not cite a lower tier for convenience when a higher one
exists.

1. **Code, standard, or regulator.** NFPA, IRC/IBC, CPSC, EPA, DOE, state or
   local code where it governs. Strongest, and the right citation for anything
   safety-bearing (alarms, combustion, gas, electrical).
2. **Manufacturer guidance for the specific equipment class.** Owner's manuals
   and OEM service literature. The authority on intervals for a machine, and
   the correct tier for filters, flushes, and anode rods.
3. **Trade or industry association.** ACCA, ASHRAE, PHCC, NADCA, InterNACHI,
   ASHI. Use when no code or manufacturer statement covers the task.
4. **Government extension or utility publication.** University extension
   services, state energy offices. Acceptable, and often the clearest writing.

Never a source: blogs, content-marketing pages from home-service companies,
listicles, AI-generated summaries, and competitor apps. If the only thing
saying "every six months" is a plumber's SEO page, that interval is not
sourced.

## When two authorities disagree on an interval

This happens constantly — NFPA and a manufacturer will not agree, and two
manufacturers will not agree with each other.

1. **Safety-bearing task: the code or standards body wins.** Cite tier 1.
2. **Equipment-longevity task: the manufacturer wins for that equipment.**
   Cite tier 2. Warranty terms usually follow the manual, so the manual is
   also the interval the owner is held to.
3. **Genuine tie, or the disagreement is wide:** take the more frequent
   interval, cite the source you followed, and say in the rule's `why` that
   guidance varies. Erring toward more frequent is the defensible direction
   for maintenance advice; it wastes a little of the owner's time, and the
   other direction breaks their equipment.
4. **Never average two intervals.** An averaged number has no source, which
   defeats the entire point of the citation.

## Per-rule acceptance checklist

A rule is done when every line is true. The gate tests cover the mechanical
ones (marked GATE); the rest are human judgment and cannot be automated.

- GATE `source_url` is https and resolves.
- GATE `reviewed_date` is set and is not in the future.
- GATE applicability conditions reference only fields the wizard can produce
  (the wizard-rules cross-check, E7).
- GATE the rule parses against the zod contract, and `version` is set.
- The cited page supports **the exact claim**, not an adjacent one. "Inspect
  annually" does not source "flush annually".
- The cited page supports **the exact interval**. If the page says "as
  recommended by the manufacturer" it is not a source for a number.
- The `why` text states the consequence of neglect in plain language and does
  not overstate it. No fearmongering (DESIGN.md voice rules).
- The URL is a stable, canonical page, not a search result, a PDF viewer
  wrapper, or a session-scoped link. Prefer a durable path over a deep link
  into a document viewer.
- `commonly_missed` is honest. It flags what a first-time owner genuinely
  would not know, not everything, or the discovery count becomes noise and
  C4's already-doing measurement stops meaning anything.
- The applicability conditions are narrow enough that the rule never fires for
  a home that does not have the equipment. A condo owner asked about a sump
  pump is the failure this prevents.

## When no authority exists

Some real maintenance has no citable interval. Do not invent one and do not
quietly cite a weak source as if it were strong.

- Say so in the rule's `why`: guidance varies and no standard sets an
  interval.
- Pick the conservative (more frequent) interval.
- Cite the best available tier and record what tier it was.
- Prefer cutting the rule to shipping an unsourced one. Premise 6: credibility
  per rule beats coverage. Fifteen defensible rules beat twenty with three
  guesses in them.

## Revision rule

Per C7, every published dataset version stays importable and tasks render from
their pinned `rule_version` forever (X2 makes that a version-keyed registry
rather than a flat import). So a revision never rewrites history — it
publishes a new version.

Every addition or change requires a human pass confirming the cited source
supports the exact claim and the exact interval. The gate cannot check this
and never will.

## Estimate

15-20 rules over six launch categories (HVAC filter, water heater, smoke and
CO alarms, dryer vent, gutters, sump pump).

- Roughly 20-30 minutes per rule: find the authority, verify it says what you
  are about to claim, capture the URL and review date, write the `why`, write
  the applicability conditions.
- Total: **human ~7-10 hours**, realistically two or three sittings.
- This does **not** compress with CC. A model can draft the `why` text and the
  JSON shape in minutes; the irreducible part is a human reading the cited
  page and confirming it says what the rule claims. Budget the hours.
