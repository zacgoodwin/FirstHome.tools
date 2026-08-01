# Health metrics

Owned by the data agent (.claude/agents/data.md). Every metric has a
deterministic source (script, query, eval score) and a threshold with an
action. A metric without a decision attached is decoration.

## Engineering (standing)

| Metric | Source | Threshold | Action on breach |
|---|---|---|---|
| Gate pass rate on main | CI history | 100% | fix before any new work |
| Eval scores | eval suite runs | per-suite threshold | ship blocked |
| Estimate vs Actual (board) | /z-status cost totals | Actual <= 1.5x Estimate | re-estimate model routing |
| Post-deploy canary | /canary reports | green | rollback per launch checklist |

## Product outcomes

| Metric | Source | Threshold | Action on breach |
|---|---|---|---|
| Active homes (anonymous home with >=1 completion or >=1 feed poll in window; v1 has no signups — amended per eng review C9, 2026-07-31) | app DB query (TODO: script once schema exists) | 100 by day 90 | review acquisition; no kill criteria (personal tool) |
| Subscribed homes (feed fetched >=2 times >=6h apart; homes.subscribed_at — eng review C3) | app DB query | premise-2 bar: 10 unrelated testers | see plan Success Criteria |
