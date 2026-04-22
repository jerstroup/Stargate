# Nimbus · playbook.md

> Example artifact for the **Legal & Compliance** playbook. Every inbound contract runs against this file first. The contract-review agent produces a redline + a memo; a human (fractional GC or founder) approves before anything goes back to counterparty.

**Owners:** fractional GC (Latham) + founder
**Last updated:** 2026-04-05
**Consumed by:** contract-review-agent · dpa-agent · security-questionnaire-agent

## Hard lines — walk away if we can't move these

| Topic | Our position | Why |
| --- | --- | --- |
| Uncapped liability | Cap at 12 months of fees paid, or $1M, whichever is lower | Existential risk |
| IP assignment of our platform | Never assign. License only | We can't give each customer the same platform |
| Termination for convenience | Must be mutual, 60 days' notice | Don't let one customer strand prepaid infra |
| Exclusivity in a market or segment | Never | Kills TAM |
| MFN pricing | Never | Locks us into our worst-ever deal |
| Source-code escrow | Fine if they pay (~$15k/yr, Iron Mountain) | Fair ask, priced correctly |
| Training on customer data | Never without explicit opt-in | Escalate to GC the moment this language appears |

## Soft concessions — agent can propose without escalation

- **Payment terms:** push Net-60 back to Net-30. Accept Net-45 for named logos.
- **SLA:** 99.5% uptime standard. 99.9% for ACV >$100k with service credits as sole remedy.
- **Data residency:** EU-only hosting available on Firm tier, +15% list.
- **Security questionnaire:** use our pre-filled SIG-Lite + the Drata trust portal. If they insist on their form, forward to legal@.
- **Audit rights:** once/year, 30 days' notice, at their cost, NDA'd, business hours, no source-code access.

## Standard templates (our paper, preferred)
- **MSA v4.2** — [templates/msa-v4.2.md](../templates/msa-v4.2.md). Agent fills in name, jurisdiction, initial term, fees, effective date. Nothing else.
- **DPA v3.1** — [templates/dpa-v3.1.md](../templates/dpa-v3.1.md). Subprocessors list in [templates/subprocessors.yaml](../templates/subprocessors.yaml) and referenced by the DPA.
- **SOW template** — [templates/sow.md](../templates/sow.md). Only for implementation-heavy Firm-tier deals.
- **Mutual NDA** — [templates/nda.md](../templates/nda.md). Never sign a unilateral NDA.

## Red flags the agent surfaces but does not decide
- Governing law in a non-standard jurisdiction (anything not US, UK, DE, FR)
- "Sole discretion" clauses on the counterparty side
- Non-mutual IP indemnity
- **Any language about training AI models on their data** — immediate escalation to GC
- Audit rights broader than our soft-concession bar
- Insurance requirements above our current coverage (E&O $5M / cyber $5M)
- Any reference to "agentic" or "AI-generated output" that attempts to assign liability for model output to the customer (increasingly common in 2026)

## Regulatory radar (tracked in a separate agent)
- **EU AI Act:** EU-hosted inference ships by 2026-08. Status: [compliance/ai-act.md](../compliance/ai-act.md).
- **CCPA/CPRA:** covered via DPA. Ongoing updates: [compliance/us-privacy.md](../compliance/us-privacy.md).
- **State privacy laws:** radar-agent tracks 12 states; monthly summary to legal@.

## Contract-review agent's output (every time)
1. **Redline** (track-changes on their paper) against our hard lines + soft concessions.
2. **Memo** (≤1 page): the 3-5 asks we'd push back on, each with our proposed language and the reason.
3. **Classification:** can founder sign solo · needs GC review · escalate to board (e.g., >$250k ACV multi-year with unusual terms).

## The one rule the agent cannot break
**It never sends anything externally.** It can draft redlines, memos, and recommended reply emails. A human clicks send. Every single time.
