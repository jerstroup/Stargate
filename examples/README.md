# Stargate · Example Context-Pack Files

One example markdown artifact per role, using a single fictional startup — **Nimbus**, an AI meeting agent for professional services firms — so the files feel like a coherent context pack a real team would keep in a shared repo or Notion space.

Each file is the kind of artifact the corresponding Stargate playbook tells you to build. Agents in the playbook prepend these files to their prompts (or read them over MCP) so they stop hallucinating about your company.

| Role | Example | What it represents |
| --- | --- | --- |
| Founders | [founder.md](./founder.md) | The one-pager at the heart of the Founder Context Pack |
| Marketing | [marketing.md](./marketing.md) | `voice.md` — the brand-voice spec content agents obey |
| Engineering | [engineering.md](./engineering.md) | `CLAUDE.md` — repo-level invariants and agent roster |
| Design | [design.md](./design.md) | The design-system spec the design-agent serves over MCP |
| Product | [product.md](./product.md) | A template-enforced `spec.md` the planner can execute |
| Finance | [finance.md](./finance.md) | The prose metrics dictionary pairing with `metrics.yml` |
| Support | [support.md](./support.md) | A KB article with the frontmatter triage + draft agents read |
| Operations | [operations.md](./operations.md) | The onboarding runbook the onboarding-agent executes |
| Sales | [sales.md](./sales.md) | `icp.md` — ICP definition + disqualifiers + deal math |
| Data | [data.md](./data.md) | The semantic-layer doc the analyst-agent cites from |
| Legal | [legal.md](./legal.md) | The contract playbook the review-agent redlines against |

## How to use these
- Copy one, replace the Nimbus content with yours, commit it to your repo or a Notion page.
- Point your agents at the file (as system-prompt preamble, or via an MCP docs server).
- Update weekly. Treat prompts and context as code — version them, diff them, review them.
