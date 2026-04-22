# Nimbus · metrics.md

> Example artifact for the **Finance** playbook. The enforceable version lives in [metrics.yml](./metrics.yml) (SQL + grain, consumed by finance-agent + dbt). This file is the prose companion — read it before any board update, investor email, or dashboard argument.

**Owner:** finance
**Last updated:** 2026-04-01

## Rules
1. If a metric isn't in `metrics.yml`, it doesn't exist. Dashboards showing it are one-off queries, not metrics.
2. Every metric has an owner and a grain. "Overall" is not a grain.
3. Disagreements get settled by the SQL, not by memory.

## Revenue

### ARR (end of period)
Annualized run-rate of contracted, paying customers on the last day of the period. **Include:** multi-year contracts at their average annual value. **Exclude:** trials, free tiers, one-time services revenue.
Grain: monthly snapshot.

### Net New ARR
`ARR(end) − ARR(start)`. Reconciles to `new_logo + expansion − contraction − churn`. If the four don't tie, the finance-agent raises an anomaly.

### NRR (Net Revenue Retention, 12-month)
Cohort-based. Take the customers we had 12 months ago; sum their ARR today ÷ their ARR then. Excludes anyone acquired since.
**Target for our stage:** ≥115%. Below 100% is an existential problem.

## Efficiency

### Net Burn
`Operating cash out − operating cash in`, monthly. Excludes one-time items like the seed raise itself. finance-agent pulls this from Mercury + Brex + Stripe + Gusto every Monday.

### Runway
`Cash on hand ÷ trailing 3-month average net burn`. Board always gets two numbers:
- **Current** (today's cash ÷ today's burn)
- **Forecast** (post planned hires + spend)

### Burn Multiple
`Net burn ÷ Net new ARR` (same period). Investors at seed want <2.0.

### Magic Number
`(Net new ARR in quarter × 4) ÷ S&M spend in previous quarter`. Target: ≥0.7 at seed, ≥1.0 by Series A.

### Rule of 40
`Revenue growth % + FCF margin %`. Negative today (pre-FCF-positive); that's fine. Track it; Series A investors will ask.

## Customer

### CAC (fully loaded)
`S&M spend in period ÷ new logos closed in period`.
**Include:** AE salary + commission, marketing tools, ad spend, content agency.
**Exclude:** founder time. (They will argue. Don't.)

### CAC Payback
`CAC ÷ (new-logo ARR × gross margin)` — months to recoup CAC. Target ≤18 months.

### Gross Margin
`(Revenue − COGS) ÷ Revenue`. COGS = hosting + inference + support labor directly attributable to the product.
**Today:** 62% (inference heavy). **Series A target:** 70%+.

## What our investors actually care about (in order, for seed SaaS to SMB)
1. ARR growth rate MoM — they want 15%+ sustained
2. NRR — they want >115%
3. Logo retention — 100% or a very good story
4. Burn multiple — <2.0
5. Runway — >18 months post-their-check

Everything else is color.

## Monthly close (what the finance-agent drafts, what a human signs off)
1. Pull actuals from Stripe + Mercury + Brex + Gusto (agent).
2. Refresh forecast in Causal with actuals (agent).
3. Write first draft of the investor update — metrics + one-paragraph narrative (agent).
4. Founder edits the narrative. Nothing gets sent until they do.

## Things the finance-agent never does
- Send an investor update. Draft only.
- Classify an expense as COGS vs. S&M without the rule table. If it's ambiguous, it files an escalation.
- Change `metrics.yml`. Spec edits are human PRs, period.
