# FirstHome.tools

Maintenance scheduling and reminder app for first-time homeowners. The
product's own delivery mechanism is a subscribed ICS feed into the user's
existing calendar app — there is no in-house notification system.

## Language

**Home**:
The anonymous, tokened entity representing one dwelling. Aggregate root for tasks, completions, and feed activity. No account or signup attaches to it in v1.
_Avoid_: Account, household, property

**Household**:
The people who share responsibility for one home's maintenance. Not a database entity in v1 — defined informally by whoever holds the home's feed or action link.
_Avoid_: Home (the entity), account

**Anonymous**:
Product-facing term meaning "no account or signup required," not a legal or data-privacy claim. Hashed IP, recovery email, and feed-fetch timestamps are still linkable personal data; "anonymous" never implies unlinkable or anonymized in the GDPR/CCPA sense.
_Avoid_: Anonymized, unlinkable (as synonyms)

**Plan**:
The domain noun for one home's full set of tasks and due dates — what the wizard produces and the result page shows.
_Avoid_: Schedule (reserved for the code module), Almanac (reserved for the branded export), Calendar (reserved for the user's own app)

**Almanac**:
DESIGN.md's branded name for the plan's exported/delivered forms — the ICS `X-WR-CALNAME` and the PDF export title ("The Almanac of {home name}"). A marketing layer over "plan," not a separate domain concept.
_Avoid_: Using "Almanac" for the underlying data model — that's "plan"

**Schedule**:
The date-math module (`schedule.ts`) and its concept: occurrence expansion, next-due advancement, snooze, due-classification. A code/engineering term, never user-facing copy.
_Avoid_: Plan, Almanac in this sense

**Calendar**:
Reserved exclusively for the user's own third-party calendar app (Apple, Google, Outlook) that the ICS feed is subscribed into. Never used for the in-app plan view.
_Avoid_: Using "calendar" for the in-app view — that's "plan"

**Rule**:
A versioned, sourced template in `services/rules` describing one maintenance requirement (applicability conditions, interval, anchor, source). Never home-specific.
_Avoid_: Task (the home-specific materialized instance)

**Task**:
A home-specific instance of a rule, pinned to the dataset version it was created from. Status: `active | unresolved | not_applicable`. Never deleted — deactivated tasks preserve their completion history.
_Avoid_: Rule, Occurrence

**Occurrence**:
One calendar instance of a task, identified by `(task_id, seq)`. The canonical term for a single scheduled instance of a task's recurrence.
_Avoid_: "Event" — reserve that word for the ICS `VEVENT` or an `analytics_events` table row specifically ("ICS event" / "analytics event"), never bare for this concept.

**Completion**:
A record that a task's occurrence was done — one row per real completion, keyed on `(task_id, seq)`.
_Avoid_: Mark-done (that's the UI action that creates a completion)

**Commonly missed**:
An editorial flag on a rule, set by whoever authors the ruleset, meaning "homeowners often don't know this is required." Drives the "surprise" UI beat and its headline copy.
_Avoid_: Surprise, discovery (related but distinct — see below)

**Surprise**:
The UI beat and running count built from tasks flagged `commonly_missed` during the wizard. An engagement/pacing concept, not proof that any specific user didn't already know the task.
_Avoid_: Discovery, commonly missed (as synonyms)

**Discovery**:
The product claim (premise 1) that the plan surfaces tasks the user genuinely didn't already know about. Measured by the C4 "which were you already doing?" checklist and pre-exposure interviews (R2) — never by the `commonly_missed` flag or the surprise count alone.
_Avoid_: Surprise, commonly missed (as synonyms)
