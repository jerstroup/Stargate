# Nimbus · spec.md — Auto-log billable time from meeting transcript

> Example artifact for the **Product** playbook. This is what the spec-writing agent produces and the engineering planner consumes. Every spec follows this template; no free-form specs.

**Ticket:** NIM-412
**Owners:** Priya (eng) · Rae (design) · Jeremiah (PM)
**Target:** 2026-05-09 behind flag, 2026-05-23 GA
**Last updated:** 2026-04-21

## Problem
Paying users at law firms still manually enter time into Clio/Kantata after every meeting. The VoC cluster "time-entry tax" was our #2 theme in Q1 2026 (31 interviews, 19 mentions). Today's workaround: we hand them a summary; they copy-paste hours into the PSA.

## Who it's for
**Primary:** associates at 20-200 person law firms, already using Nimbus for meeting capture, billing >60% of their time.
**Secondary:** consultants at boutique firms on Kantata.

**Not for:**
- Partners (they review, don't enter)
- In-house counsel (not billable)
- Users not on the meeting-capture plan

## Desired outcome
A meeting ends. Within 90 seconds, a draft time entry sits in the user's Clio inbox: tagged to the right matter, with duration, narrative, and a confidence score. The user approves in one click or edits the narrative.

## Acceptance criteria
1. When the transcript mentions a client/matter name that exists in Clio, the draft posts to the correct matter **>95%** of the time.
2. When no matter resolves with confidence >0.7, we show "Couldn't detect matter" instead of guessing.
3. Narrative is **<280 characters** and reads like an associate wrote it (20 golden examples in [../evals/time-entry-narrative](../evals/time-entry-narrative)).
4. p95 round-trip latency (meeting ends → draft in inbox) **<2 minutes**.
5. Every draft is marked "auto-drafted," editable, and requires explicit user approval.

## Non-goals
- Auto-approving time entries. Human in the loop, always.
- Competing with Clio's native timer. We complement it.
- Creating new matters. If the matter doesn't exist, we punt.

## Open questions
- [ ] Default hourly rounding (6-min, 15-min)? *Rae checking with 3 design partners by Thu 2026-04-24.*
- [ ] Internal (non-billable) meetings — skip entirely, or draft for admin-time coding? *Proposal: skip in v1, revisit.*
- [ ] Kantata v2 API returns a different matter schema. Ship Clio-only in v1? *Leaning yes.*

## Success metric
**Primary:** % of meetings at participating firms that result in an approved time entry within 24h.
- Month 1 target: 55%
- Month 3 target: 75%
- Baseline: 0% (manual today)

**Guardrail:** hallucinated matter assignment rate <2%, measured via sampled audit (n=100/week for 6 weeks).

## Links
- VoC cluster: [../voc/2026-q1-time-entry-tax.md](../voc/2026-q1-time-entry-tax.md)
- Figma: in ticket
- Eval set: [../evals/time-entry-narrative](../evals/time-entry-narrative)
- Related spec: [NIM-418 — matter resolution confidence model](./nim-418.md)

## For the engineering planner
This spec is ready to decompose. The matter-resolution model in NIM-418 is a prerequisite; planner should DAG it ahead of the narrative-generation work. Narrative golden-eval set is populated — don't ship without green evals.
