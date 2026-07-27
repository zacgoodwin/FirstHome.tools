# FirstHome.tools

Maintenance scheduling and reminder app that keeps homeowners from messing up
their home. Aimed at first-time buyers (assume zero maintenance experience),
useful to any owner: pick your home's systems, get a schedule of filter
changes, gutter cleanings, water-heater flushes, and seasonal checks.

Reminders are delivered as a subscribed ICS calendar feed: add the feed URL to
Google/Apple/Outlook calendar once, and your calendar app does the reminding.
No push notifications, no email infrastructure.

## Stack

TypeScript 5 / Node 22 / npm, SvelteKit 2 (Svelte 5), Supabase (Postgres +
auth). Web only. See CLAUDE.md for commands and scope.

Out of scope: home value / finance features, smart-home integration.

## AI-assisted development

This repo is built with Claude Code on the AIBootstrap template. Machine
setup: [docs/ai/SETUP.md](docs/ai/SETUP.md). The always-loaded brain is
[CLAUDE.md](CLAUDE.md); strategy lives in
[docs/STRATEGY.md](docs/STRATEGY.md). Gate tests: `node tools/gate.mjs`.
