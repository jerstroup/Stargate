# Nimbus · icp.md

> Example artifact for the **Sales** playbook. The prospect-research, outbound-draft, and meeting-prep agents all gate on this file. The enforceable scoring rubric is [icp.yaml](./icp.yaml); this file explains the *why*.

**Owners:** sales + founder
**Last updated:** 2026-04-01 (reviewed quarterly)

## Who we sell to

**Professional services firms, 20-200 FTE, billing ≥60% of labor hours to clients.**

Priority sub-segments:
1. **Mid-size law firms** (30-150 attorneys). Highest pain, best budget, Clio is the PSA of record.
2. **Boutique consultancies** (20-80 consultants). Kantata + Salesforce. Land-and-expand.
3. **Digital + creative agencies** (30-200 FTE). Monday / Rocketlane. Lower ACV, faster close.

**Deprioritize:** accounting firms (QB-native, different buyer) · top-tier management consulting (security-review bottleneck) · architecture firms (margin too thin).

## Hard filters
- HQ in US, Canada, or UK
- 20-200 FTE (LinkedIn, Crunchbase)
- Public signal of billable-hours tracking (Clio/Kantata/Harvest in job posts or stack)
- Website mentions client work, case studies, or industries served
- ≥2 years in operation

## Weighted signals (see `icp.yaml` for the exact weights)
- Clio / Kantata / Harvest in stack: **+15**
- Recent hire: "RevOps," "Operations Manager," "Practice Manager" in last 90 days: **+10**
- Fireflies / Otter / Granola detected: **+8** (they've bought into meeting intelligence)
- Salesforce: **+5** · Monday: **+5**
- Microsoft-shop, no Google Workspace: **−5** (our calendar integration is deeper on Google today)

## Trigger events — outbound converts 3x within 30 days
- New Head of Operations / COO hired
- Opened a new practice area or office
- Raised growth equity or recapitalized
- Founder/partner blog or podcast about time-tracking or utilization
- Job req for Practice Manager or RevOps

## Disqualifiers (hard stop)
- <20 FTE: not enough pain
- Pure agency with <40% billable: different motion, route to self-serve
- Homegrown PSA with no API: integration cost > LTV
- Procurement-led buy: our cycle assumes a champion with budget. We lose on unit economics when procurement runs the deal.

## Economic buyer
COO, Head of Operations, or Managing Partner (at firms <50 attorneys). For firms >100 FTE, COO is real. Below that, it's a Managing Partner functioning as one.

## The deal math (memorize this)
- Average billable employee at target firm: **$250k fully loaded**
- Time saved per employee per week with Nimbus: **4-7 hours** (self-reported, 3-month mark)
- At **$200/seat/month**, payback on 40 seats is **under 6 weeks** if they actually use it

That slide closes deals. Lead with it.

## What the prospect-research agent produces
A one-pager per named account:
- Firmographics + tech stack (public data)
- ICP score + the 3 signals that moved it
- Trigger events in last 90 days
- Named people to contact (with roles, tenure, mutual connections)
- Internal data: prior touches, existing users, support tickets
- "Why now" paragraph — one hypothesis, ≤3 sentences

Agent drafts outbound based on this one-pager. **Never auto-sends.** Rep reviews, personalizes the opener, sends.

## What the agent refuses to do
- Score a company outside the ICP as "worth a shot." Off-ICP = self-serve or decline.
- Enrich a personal email or phone number via grey-market scrapers. LinkedIn + public web only.
- Auto-send anything. Ever.
