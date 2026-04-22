---
title: My meeting didn't get captured — troubleshooting
id: KB-047
owner: support
last_verified: 2026-04-18
scope: customer-facing
tags: [troubleshooting, capture, zoom, google-meet]
---

# My meeting didn't get captured

> Example artifact for the **Support** playbook. This is a knowledge-base entry with the frontmatter that triage-agent, draft-response-agent, and deflection-chat all read. Articles without a `last_verified` in the last 90 days fall out of the cited-sources set automatically.

**Used by:** triage-agent (labels ticket as `how-to: capture`), draft-response-agent (cites as `KB-047`), deflection-chat (offers this article when intent matches).

## Most common causes (in order of frequency)

### 1. The Nimbus bot wasn't invited, or was removed mid-meeting
Check the calendar event. Our bot joins as `notes@nimbus.so`. If the host has "only invited participants can join" turned on, add the bot to the invite — or disable the setting. Workspace admins can enable auto-invite at **Settings → Calendar**.

### 2. Host used an ad-hoc meeting room
We capture from rooms tied to a connected calendar. An ad-hoc Zoom link won't get captured. Fix: schedule via calendar. For hosts who do this often, enable **"auto-add notes@nimbus.so"** in their Zoom workspace settings.

### 3. Meeting was under 3 minutes
We skip meetings under 3 minutes to avoid billing noise. Configurable per workspace at **Settings → Capture → Minimum duration**.

### 4. Calendar integration silently disconnected
Usually triggered by an IT-policy rollout that revokes our OAuth. **Settings → Integrations** — a red dot means reconnect. 30 seconds to fix.

## How to confirm which one it was
1. In the Nimbus app, open **Meetings → Missing**.
2. Click the missing meeting. We show the exact reason + the timestamp.
3. If none of the four match, hit **Report** — the support-to-eng agent files a ticket with workspace ID, calendar event ID, the last 100 lines of capture-service logs, and Sentry event IDs from the same 5-minute window. Engineering oncall triages within 4 business hours.

## What we never promise
"It'll never happen again." It will — calendars and OAuth tokens break in creative ways. What we do promise: you can always tell *why* a meeting wasn't captured, and you can replay from the host's local recording.

## Escalation rule (for the triage-agent)
If the same customer has **>3 missing meetings in 7 days**, label the ticket `churn-risk` and escalate to a human support lead the same day. This is in the churn-risk rubric at [rubrics/churn-risk.md](../rubrics/churn-risk.md).

## Voice reminder for the draft-response-agent
Warmer than marketing voice. Name the user, name the problem specifically, give the one-step fix. No "I understand your frustration" openers. Sign as the human who sends it, not "The Nimbus Team."
