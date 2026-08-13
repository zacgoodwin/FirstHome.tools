# Self-hosted infrastructure, chosen as a preference, not a cost or control argument

P1 (2026-08-01) pivoted from Vercel + Supabase + managed KV to self-hosted
Docker Compose (SvelteKit `adapter-node` + Postgres 17 + Caddy) and justified
Postgres over SQLite on merit (the `pg_dump` backup story, roadmap phases
3-6). It never stated why self-hosting was chosen over managed hosting at
all, despite costing ~21-28 of the plan's ~78 hardening hours before any
tester exists — flagged as Conflict 1 in the 2026-08-01 PRD review
(`docs/ai/plans/zacgo-main-design-20260727-085637-review-synthesis.md`).

**Decision:** self-hosting is a deliberate preference — the founder wants to
contribute to the self-hosting/OSS community — not a cost or control
argument. Consequence: the ops checklist (P6a/T-E7) ships trimmed to the
external feed-availability probe before the premise-2 validation bar is met
(a stale feed is the one failure with no observer); the rest of the
checklist (disk/cert/DNS alarms, reboot-recovery test) ships after the bar
is read, once there is more than 10 users' worth of blast radius to justify
it.
