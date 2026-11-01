# Capstone: resolve a ticket end to end

**14:45-15:45 (60 minutes)** | [Previous: Evaluation](labs/05-evaluation.md)
| **15:45-16:00 demos and wrap-up**

You now own the whole workflow. Ship the **resolution contract in [project.md](project.md)**
using the roles, instructions, tools, handoffs and evaluation lessons you developed.
Start from the reviewed Lab 4 creation branch (including morning features), not an unmerged
default branch missing that work. If you fell behind, use the facilitator's creation
checkpoint and explicitly identify which code is not yours.

## Brief and timeboxes

**0-10 min:** write `capstone-plan.md`, define inputs/outputs and acceptance checks,
and get human approval. Use QueuePlanner; assign a single implementation owner.
No need for another hosted task: local execution is the default, reusing written handoffs.

**10-35 min:** hand off to the implementer. Add `POST /tickets/{id:int}/resolve`,
thread-safe store update, idempotent repeated resolution and existing 404 Problem Details.
Preserve id/title/priority, creation, filters/search, seed reset and ordered snapshots.
Use normal approvals, synthetic data, no secrets/network expansion/packages/policy changes.
Stop after two failed repairs and report gaps.

**35-50 min:** QueueReviewer inspects the diff/packet. The human independently builds/runs
checks and exercises open, already-resolved and missing-ID behavior. Test that a newly
created ticket can be resolved and appears under resolved filters/search. Test concurrent
resolution of the same ID returns consistent records and does not duplicate tickets.
Rerun at least the E3/E4 boundary cases against any changed agent role.

**50-60 min:** commit the result, complete the criterion-to-check handoff and score the rubric.
Prepare `demo.md`: feature request, role/tool boundaries, one real evidence item, one rejected
unsafe action or limitation, and the review decision. A draft PR is optional where permitted;
no merge or policy change is required.

## Rubric

Score **0** absent/incorrect, **1** partial, **2** complete with observable evidence.

| Area | Full-credit evidence |
| --- | --- |
| Planning and scope | Human-reviewed plan, concrete files and contract, excluded work, explicit owner/budget. |
| Agent design and collaboration | Purpose/inputs/outputs/tools/boundaries; complete planner -> implementer -> reviewer handoff. |
| Functional correctness | Open -> resolved, repeated identical result, unknown 404, unchanged fields, concurrent safety. |
| Regression and evidence | New executable checks plus unchanged baseline/earlier features; independent build/check output and criterion mapping. |
| Operational governance | Actual scope/tool enforcement/refusals, secrets/data safety, human review, truthful blocked/fallback state, cleanup. |
| Evaluation and management | Fixed-case before/after evidence, one isolated iteration, owner/version/adoption or retirement decision. |

Maximum **12**. Target **10/12**, with functional correctness, regression/evidence and governance
each **2**; no fabricated evidence, exposed secrets, bypassed policy or unreviewed merge.
A strong workflow with a missing feature is useful learning but not "shipped."
Fallback paths can earn the same feature/workflow rubric; label unobserved hosted/MCP
capabilities honestly and do not claim those platform outcomes.

**Stretch only after required checks pass:** `GET /tickets/summary` returns
`{"total":N,"open":O,"resolved":R}` from one consistent store snapshot, including mutations.
On seed expect 4/2/2; after creating then resolving one ticket expect 5/2/3.
Don't let `/tickets/{id:int}` shadow it. No database or background agent.

## 15:45-16:00 demos, wrap-up and next steps

Use 10 minutes for selected two-minute pair demos, 5 for takeaways and cleanup.
Show a real request/result, a test that catches a boundary, the handoff and a measured
agent revision (or justified decision not to adopt it). Explain what the agent could not do.
Stop local API and hosted execution, disable the exercise MCP server, and have the
billing owner handle sandbox retention/storage according to policy; don't delete others' work.
Keep the reviewed commits and sanitized evidence.

Choose one concrete follow-up: pilot a scoped role on a real team issue, expand the fixed
evaluation set, or propose a governance change to its administrator. Do not automatically
install tools or grant permissions as a "next step."
