# Nimbus · design-system.md

> Example artifact for the **Design** playbook. The design-agent serves this over MCP so the engineering planner can call `get_token()`, `get_component()`, and `review_ui()` before writing JSX. Code is the contract (`tokens.json`, `/packages/ui`); this file is the prose companion.

**Owner:** design
**Source of truth:** [packages/ui/tokens.json](../packages/ui/tokens.json) + [packages/ui](../packages/ui)
**Consumed by:** design-agent (MCP), engineering planner, figma-bridge

## Tokens — semantic, never raw

Raw hex values fail review. Always use the semantic name.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `color.surface` | `#FDFCFA` | `#0F1113` | Page background |
| `color.surface.raised` | `#FFFFFF` | `#191B1F` | Cards, modals, popovers |
| `color.ink` | `#141518` | `#F3F3F1` | Body text |
| `color.ink.muted` | `#5C6068` | `#9AA0A8` | Captions, metadata |
| `color.accent` | `#2D5BFF` | `#6B8BFF` | Primary CTA only |
| `color.danger` | `#C03030` | `#FF6060` | Destructive actions |
| `color.success` | `#117A3D` | `#3FCB75` | Confirmation state only |

**Spacing (8pt scale):** `space.1`=4, `space.2`=8, `space.3`=12, `space.4`=16, `space.6`=24, `space.8`=32.
**Radii:** `radius.sm`=4, `radius.md`=8 (default), `radius.lg`=16 (sheets only).
**Type:** `text.body`, `text.caption`, `text.h1–h4`. Line heights in `tokens.json`, don't eyeball.

## Components — the only ones in production

25 primitives. No 26th without a design review.

Button · IconButton · Input · Textarea · Select · Combobox · Checkbox · Radio · Switch · Slider · Tabs · Tooltip · Popover · Dialog · Sheet · Toast · Badge · Avatar · Card · Table · Pagination · Skeleton · EmptyState · Banner · Breadcrumbs

When the planner asks for "a thing that does X," the design-agent's first move is to check this list and respond with the right primitive + props. Not invent.

## Accessibility bar (non-negotiable)
- WCAG AA contrast for all text and icons. AAA for marketing-site body text.
- Every interactive element reachable by keyboard; visible focus ring.
- axe-core runs on every Storybook story in CI. Builds fail on new violations.
- PRs with UI must include light + dark screenshots.

## Microcopy rules
- Sentence case everywhere except proper nouns.
- Buttons are verbs: "Save draft," not "Save."
- Errors are specific and actionable: "Couldn't reach Clio — reconnect in Settings," not "Something went wrong."
- Empty states name the next action, not the absence.

## How the design-agent gets invoked
The engineering planner calls `design-agent.review_ui(figma_frame_id, proposed_jsx)` before opening a PR. The agent returns:
- token mismatches (errors)
- component-swap suggestions (warnings)
- axe-core violations (errors)
- microcopy edits (suggestions)

`severity: error` issues must be resolved before the reviewer-agent will approve the PR.

## What the design-agent will refuse to do
- Generate a new component variant without a design review.
- Approve a custom hex color, even if "it's just this one screen."
- Suggest copy that breaks voice rules in [../marketing/voice.md](./marketing.md).
