# Nimbus · semantic-layer.md

> Example artifact for the **Data** playbook. The analyst-agent, anomaly-agent, and finance-agent all cite from this file. The SQL + grain are enforced in [metrics.yml](./metrics.yml) via dbt + MetricFlow — that is the only source of truth. This file is how humans (and agents) *think* about the metrics.

**Owner:** data
**Last updated:** 2026-04-12

## Rules
1. **No metric exists unless it's in `metrics.yml`.** If it's on a dashboard but not spec'd, it's a one-off query. Tell the requestor to spec it.
2. **Every metric has an owner.** If they leave, data picks it up within 7 days or we remove the metric.
3. **Grain is mandatory.** Daily · weekly · monthly. No "overall."
4. **Analyst-agent has a read-only role.** SELECT anything. Write nothing.
5. **Agent shows its SQL.** Every answer includes the query it ran, so a human can spot when it misread the question.

## Metric families

### Product usage
| Metric | Grain | Owner |
| --- | --- | --- |
| `daily_active_users` | daily | data |
| `weekly_active_users` | weekly (Mon–Sun) | data |
| `meeting_capture_count` | daily per workspace | data |
| `auto_action_approval_rate` | weekly per action_type | product |

**`auto_action_approval_rate`** is the north-star product metric. It's the % of agent-drafted actions the user approves (vs. edits vs. rejects). Below 70% on any action type is a signal to pause that action's rollout.

### Revenue
| Metric | Grain | Owner |
| --- | --- | --- |
| `mrr` | daily snapshot | finance |
| `arr_end_of_period` | monthly (last day) | finance |
| `new_logo_arr` / `expansion_arr` / `contraction_arr` / `churn_arr` | monthly | finance |

The four ARR-movement metrics **must** reconcile to net new ARR. If they don't, it's a bug in one of them.

### Retention
| Metric | Grain | Owner |
| --- | --- | --- |
| `logo_retention_12m` | monthly | finance |
| `nrr_12m` | monthly | finance |

### Funnel
| Metric | Grain | Owner |
| --- | --- | --- |
| `signup_to_first_capture` | median, weekly cohort | product |
| `capture_to_action_taken` | median, weekly cohort | product |

Both are activation leading indicators. If `capture_to_action_taken` regresses, the auto-action agents are losing trust.

## Anomaly detection
- 14-day moving baseline + 3σ bands on every metric above.
- Anomaly-agent writes a candidate explanation: which cohort · which workspace · what upstream changed (dbt freshness · integration error rates · feature-flag rollouts).
- Alert to a human only when confidence >0.6 **or** deviation >4σ.

## Default cohort views we always have ready
- By acquisition month (retention curves)
- By plan tier (Starter / Team / Firm)
- By segment (Law / Consulting / Agency)
- By integration depth (Clio-connected vs. not)

## What we refuse to put on the dashboard
- **Vanity counts** with no denominator ("meetings captured, all time")
- **Weighted engagement scores** that hide the underlying moves
- **NPS as a KPI.** It's a survey. Report it separately.

## Analyst-agent behavior
- Every natural-language question → sample run first (10 rows), show the SQL, ask "look right?"
- Full run only after user confirms the sample, or user says "full run" upfront
- When a metric name is ambiguous, the agent **does not guess** — it lists the candidates from `metrics.yml` and asks

## What the analyst-agent refuses to do
- Run a query that isn't scoped to `workspace_id` when the requester's role isn't global-admin.
- Invent a metric that isn't in `metrics.yml`. It will offer to draft a spec PR instead.
- Answer "how many users do we have?" without asking which metric: DAU, WAU, MAU, or total paid seats. These are all different numbers.
