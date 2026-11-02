# Lab 1: Plan-to-Agent workflow

**Expected completion time: 60 minutes** | [Setup](../setup.md) | [Next: Lab 2](02-agent-design.md)

Work through the checkpoints at your own pace; the estimate is a guide, not a deadline.

**Outcome:** implement status filtering without changing the list contract.
You own the decisions; the agent owns a bounded implementation attempt.
Use [QueueDesk's Lab 1 contract](../project.md), not an invented product spec.

## Work and checkpoints

1. **Inspect and reproduce.** Run the baseline. Request `/tickets?status=open`;
   it currently returns four tickets instead of IDs 1 and 2. Inspect endpoints and store.
   Record base commit, the symptom, and the no-query behavior you must preserve.
2. **Plan, do not implement.** In VS Code **Local**, select **Plan** (or `/plan`).
   Ask for status filtering, affected files, decisions, invalid/repeated query cases,
   and executable checks. State no packages, persistence, MCP, future features or policy edits.
   Read the plan and reject any proposal to silently ignore an invalid status.
   Save the reviewed plan as `workshop/work/<pair-name>/lab-01-plan.md`.
3. **Authorize implementation.** After peer review, select **Agent** and attach
   the saved plan. Local **Start Implementation** submits immediately: only use it after
   review. Normal approvals remain on; inspect terminal commands before allowing them.
   Add checks and implement only this feature. Stop after two failed repairs; report evidence.
4. **Independent review.** Build, run all checks, inspect the diff, and map
   each criterion to an executed check. Driver confidence is not reviewer evidence.
5. **Save your checkpoint.** Commit code, checks, plan and concise evidence.
   Swap roles for the next lab.

Suggested task seed (adapt to the actual repository):

```text
Plan only: add GET /tickets status filtering from workshop/project.md.
Research the existing endpoints and ITicketStore. Preserve the unfiltered array,
seed data and ID ordering. Include rejected query values and repeated parameters,
exact check commands, affected files and open decisions.
No edits, packages, external tools, deployments or later-lab features.
```

For the **Copilot harness** alternative, use `/plan` and its review/approval controls,
not Local handoff labels. If dedicated planning is unavailable, use a written plan with
explicit read-only tool selection and manually approve the transition; record that limitation.
An instruction to "plan only" is not itself a permission change.

## Definition of done

`status=open` returns IDs 1,2; `status=resolved` returns 3,4.
No status returns 1,2,3,4. Empty, whitespace, mixed-case `Open`, unknown `closed`
and `status=open&status=resolved` return 400 Problem Details.
All baseline checks remain and pass. An approved plan and criterion-to-check evidence
are committed. No next-lab feature has been implemented.

After the API passes, enable only `statusFilter` in
[the frontend configuration](../project.md#frontend-and-feature-switches), build/restart,
and verify the Open and Resolved queues against those IDs.

**Governance in practice:** reject broad tool/network grants and unexplained installs.
Plan approval and tool approval are separate. Review every diff before committing.
**Stretch:** add tests proving rejected queries never alter stored records; do not add search yet.
If behind, keep the reviewed plan and failing feature checks; ask the facilitator for the
status checkpoint, not the day's completed solution.

---

**Next:** [Lab 2: Repository instructions and custom-agent design](02-agent-design.md)
