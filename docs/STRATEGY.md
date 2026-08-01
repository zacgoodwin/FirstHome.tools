# Strategy

Rewritten by /plan-ceo-review on 2026-08-01. The original was filled by the
day-one bootstrap interview (docs/ai/BOOTSTRAP.md) before the product was
understood, and it had been outranking every considered doc written since,
because this file is the first thing CLAUDE.md routes strategy questions to.
Read it before any strategy, scope, or prioritization decision. Where it
disagrees with the approved plan
(`docs/ai/plans/zacgo-main-design-20260727-085637.md`), the plan wins and this
file is stale — say so rather than following it.

## Vision

FirstHome.tools turns the invisible upkeep calendar (filters, gutters, water
heater flushes, seasonal checks) into a schedule the owner actually sees. A
short wizard surfaces the maintenance a first-time owner does not know exists,
then installs it into the calendar they already check, as a subscribed ICS
feed. Owners stop discovering problems after they become expensive.

## Users

**First-time homeowners with no maintenance experience.** This is a wedge, not
a marketing angle: the wizard, the copy, the rule selection, and the "commonly
missed" flagging are all calibrated to someone who does not know what a dryer
vent is. Experienced owners are welcome and will get value; they are not who
any decision is made for.

v1 is anonymous. There are no accounts and no signup — the plan's central bet
is minutes-to-value, and an account is a wall in front of the thing that
recruits. Accounts arrive in roadmap phase 2 as an offer after value, never a
gate.

## Posture: deliberate optionality

This is neither "a personal tool" nor "a startup", and holding one of those
labels would make the wrong decisions in phase 2 onward. The real posture is
the one premise 7 already states and the engineering spec already honors:

- v1 is free.
- Future features may be paid.
- No architectural choice may make accounts, feature gating, or payments
  impossible to add later.

That is purchased optionality, and it is a decision, not a dodge — but only
because it has a trigger and a question attached. Without those, "decide
later" is how a project avoids ever asking who pays.

**Trigger:** the premise-2 validation bar (below). That is the moment the call
gets made, in either direction.

**Question to have answered by then:** would some of the ten pay for the
binder, and at what number. This costs nothing to find out — the 30-day
follow-up to testers already exists, so it carries one extra question. No
payments code, no pricing page, no revenue model invented on n=1 evidence.

## Measurable outcomes (90-day)

- **100 active homes.** An active home is an anonymous home with at least one
  completion or at least one feed poll in the window (per eng review C9). v1
  has no signups, so any metric counting "signed-up homeowners" is measuring
  something that cannot exist. Tracked in `docs/ai/HEALTH-METRICS.md`.

## The validation bar (premise 2)

10 unrelated first-time homeowners complete the wizard and subscribe; 5 or
more complete a task within 45 days unprompted. "Unrelated" means not
personally known to the founder. "Unprompted" means no founder contact after
subscription — the calendar reminder itself is the product working, not a
prompt. Uniqueness is confirmed by hand; the `?tester=NN` parameter attributes
a home to a link, not to a person.

## Kill criteria

The plan's Success Criteria section carries the full branch table. Summarized:

- **Bar met** — phase 2 opens.
- **Subscribed but few completions** — the loop works and delivery does not.
  Fix delivery. Do not build accounts.
- **Few subscribed** — re-test distribution before touching the product. This
  signal is ambiguous by choice: the distribution pre-flight was proposed and
  cut with the risk accepted, so a low number reads as "unknown", not as
  "the product failed".
- **Miss on both** — keep it as the founder's own tool, stop the recruiting
  spend, and say so out loud.

The last row is the honest one, and writing it here is what stops it becoming
a quiet drift into phase 2. The previous version of this file said "kill
criteria: none", which made the bar unfailable and therefore meaningless.

## Out of scope

- Home value / finance features: no mortgage, equity, insurance, or valuation.
- Smart-home integration: no IoT sensors, no device APIs.
- Tutorials as a content business, contractor marketplace fulfillment, and
  household inventory beyond maintenance-relevant assets. See the ROADMAP's
  out-of-scope section for the full list and the phase gates that could
  reopen any of them.
