# Home deletion is a hard delete, not soft-delete or anonymize-in-place

The PRD review (2026-08-01, Legal — blocker 2) found no deletion path
anywhere in the data model, despite GDPR Art. 17 and CCPA exposure the
moment the launch post goes public. The system already has a strong
never-delete precedent at the task level (Y7: answer changes deactivate
tasks but always preserve completion history), which could plausibly have
extended to homes as soft-delete or anonymize-in-place.

**Decision:** home deletion is a hard delete — rows removed across
`homes`/`tasks`/`completions`/`analytics_events`/`feed_fetches` by
`home_id` — not soft-delete or anonymize-in-place. v1 has no accounts, so a
soft-deleted home has no re-activation path that buys anything, and true
deletion is the cleaner compliance story against a strict deletion right.
Raw activity logs (`feed_fetches`, request logs) additionally carry a
90-day retention window regardless of deletion. Completions are the
product's own service-history asset and are kept indefinitely while the
home exists.

**Consequence:** this is a deliberate asymmetry with task deactivation,
which never deletes. A future session should not "fix" the home-delete path
to match task deactivation's preserve-forever pattern — they are different
entities with different retention obligations.
