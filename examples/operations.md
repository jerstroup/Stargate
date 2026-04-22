# Nimbus · onboarding.md

> Example artifact for the **Operations** playbook. The onboarding-agent runs this checklist from offer-signed through Day 30. `[agent]` = no human touch. `[manager]` = human required, agent tracks and nudges. `[hire]` = the new person does it.

**Owner:** ops
**Last updated:** 2026-04-10
**Consumed by:** onboarding-agent, IT-agent, hiring-manager (via Slack DMs)

## T-7 days — offer signed

- `[agent]` Welcome email: Day 1 logistics, what to read before starting, no dress code
- `[agent]` Provision Google Workspace, Slack, GitHub org, 1Password vault — all with SCIM
- `[agent]` Order laptop via Rippling, ship to home address, MDM-enrolled before it lands
- `[agent]` Add to Gusto payroll with start date + offer-letter comp
- `[manager]` Write a personalized "what I'm hoping you ship in your first 90 days" note, send Day -3

## Day 1

- `[manager]` 30-min kickoff, 9:30am in their timezone
- `[agent]` Post welcome in `#general` at 9:45am — photo + one-liner from their intake form
- `[agent]` Join mandatory channels: `#general`, `#announcements`, team channel, `#wins`
- `[agent]` DM Day 1 checklist: set up laptop, read [../engineering/CLAUDE.md](./engineering.md), lunch with buddy, complete I-9
- `[manager]` Assign an onboarding buddy — not manager, not direct teammate

## Days 2-7

- `[agent]` Schedule 1:1s: manager (weekly), skip-level (week 2), buddy (daily, first week)
- `[agent]` Schedule six meet-and-greets across functions — rotate so we don't always pick the same extroverts
- `[agent]` Send the role-specific reading list from [../library/roles/<role>.md](../library/roles)
- `[hire]` Merge one trivial PR **or** ship one tiny artifact by EOW. Breaks the "scared to commit" ice.

## Day 14

- `[agent]` Ping manager for the Week 2 check-in (template: wins · blockers · surprises · one thing to change)
- `[agent]` Access audit: does the hire have every system they need? Anything they *shouldn't*?
- `[agent]` Compliance: confirm SOC2 onboarding training complete (Drata integration)

## Day 30

- `[agent]` Generate the 30-day review packet for the manager: PRs shipped, docs written, Slack participation, 1:1 notes synthesis (with hire's consent)
- `[manager]` 30-day review: still a good fit · getting what they need · Day 60 expectations
- `[agent]` Anonymous 3-question onboarding survey to the hire

## Offboarding (when it comes)

See [offboarding.md](./offboarding.md). **The agent never auto-revokes access on resignation** — always human-gated. We've been burned by accidental double-processing twice. It does prepare the access-revocation PR and wait for the ops lead to merge.

## What this replaces
Before the agent: ~6 hours of clerical setup per hire. Now: ~45 minutes, almost all of it the manager writing the personal note. Everything clerical runs while ops sleeps.

## Agent refuses to do
- Send any termination-related comms
- Issue 1Password access to anyone not in Gusto as an employee
- Close out I-9 verification (human-only by law)
