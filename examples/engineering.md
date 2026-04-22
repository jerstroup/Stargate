# Nimbus · CLAUDE.md

> Example artifact for the **Engineering** playbook. Every coding agent (planner, coder, reviewer, test-author, release, oncall) reads this first. When this file contradicts the code, fix this file — don't work around it.

**Owner:** engineering
**Last updated:** 2026-04-19

## What we're building
Nimbus: a meeting agent for professional services firms. Captures meetings, writes notes, and takes downstream action in CRM/PSA tools (Clio, Kantata, Salesforce) through MCP.

## Stack
- **Web:** Next.js 15 (App Router, RSC by default), TypeScript strict
- **API:** FastAPI, Pydantic v2, SQLAlchemy 2.0
- **Workers:** Temporal — every long-running agent workflow lives here, never in the API
- **DB:** Postgres 16 + pgvector on Neon
- **Agents:** Claude Agent SDK (Python + TS), Opus 4.7 for planning, Sonnet 4.6 for most loops, Haiku 4.5 for classify/extract
- **Infra:** Pulumi → Render + Neon + Temporal Cloud

## Repo layout
- [apps/web](../apps/web) — Next.js frontend
- [apps/api](../apps/api) — FastAPI, REST + webhooks
- [apps/worker](../apps/worker) — Temporal workers
- [packages/ui](../packages/ui) — component library, source of truth for design tokens
- [packages/agents](../packages/agents) — agent definitions + shared tool wrappers
- [packages/mcp-servers](../packages/mcp-servers) — MCP servers for Clio, Kantata, Salesforce, internal tools
- [infra](../infra) — Pulumi
- [evals](../evals) — regression sets per agent, CI runs these

## Invariants (do not break)
1. **Agents never talk to the database directly.** They go through MCP → API → DB, so row-level security and workspace scoping are enforced.
2. **Every external write is behind a human approval gate** unless the workspace has `auto_write: true` on that specific action type. Off by default.
3. **No prod credentials in agent memory.** Scoped tokens minted per-run from our secrets service, max TTL 60 min.
4. **Every tool call is logged to Langfuse** with `workspace_id` and `run_id`. This is our audit trail and our eval source.
5. **No model version is pinned implicitly.** Every agent declares its model in its `SKILL.md`. Upgrades are PRs, not config drift.

## Commands
```bash
pnpm dev            # web + api + worker with hot reload
pnpm test           # vitest + playwright + pytest
pnpm eval           # runs /evals against latest agents; exits nonzero on regression
pnpm db:migrate     # alembic migrations against local Postgres
pnpm mcp:dev        # boot all MCP servers locally
```

## Definition of Done
- [ ] Feature flagged in LaunchDarkly (unless pure bugfix)
- [ ] Unit + integration tests, both green in CI
- [ ] `pnpm eval` green (agent changes only)
- [ ] axe-core clean on any UI change
- [ ] CHANGELOG entry in PR description
- [ ] Screen recording for UI-facing changes

## Agents in production
See [packages/agents/*/SKILL.md](../packages/agents). Roster:
- `planner` — spec.md → DAG of subtasks with acceptance criteria
- `coder` — single DAG node → feature branch + tests
- `reviewer` — PR gate, blocks on the DoD checklist
- `test-author` — generates + maintains test suites
- `release` — migrations, canaries, rollback watch
- `oncall` — PagerDuty triage, drafts the Slack incident post

## Things that have bitten us (read before editing the relevant code)
- **Temporal workflow versioning:** always use `workflow.patched()`. We broke a long-running capture workflow in Jan by changing a signature without a patch.
- **MCP timeouts:** default 30s is too short for Clio's contacts endpoint; override to 90s for the Clio server only (`packages/mcp-servers/clio/config.ts`).
- **pgvector on Neon:** cold-start latency on the free tier is ~800ms; production is on the paid tier. Don't "optimize" infra cost here.
- **Next.js RSC + Langfuse:** fetch wrappers don't auto-trace across the server boundary. Use `withTrace()` explicitly.
