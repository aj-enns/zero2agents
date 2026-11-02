# Lab 4: GitHub cloud/coding-agent handoff and PR review

**Expected completion time: 75 minutes** | [Governance](../governance.md)
| [Next: Evaluation](05-evaluation.md)

Work through the checkpoints at your own pace; the estimate is a guide, not a deadline.

**Outcome:** hand off a creation feature without hidden chat context, then accept or reject
it using independently verified evidence. Prefer the **GitHub issue-assignment,
GitHub Actions-based agent path** when permitted. A cloud sandbox is a separately labeled
alternative; a local fallback exercises the same handoff/review, not the same execution.

**Agent execution boundary:** allow one implementation attempt, bounded to 25 minutes or
two unsuccessful repairs, then request a handoff with gaps. This controls autonomous
execution and cost, not participant pace. The platform's Actions-session maximum is
59 minutes, not permission to extend the approved agent budget.

## Prepare an agent-ready issue

Use the [agent-ready issue template](../../.github/ISSUE_TEMPLATE/agent-ready.md).
Fill the [creation contract](../project.md), non-goals, paths, build/check commands, allowed
tools, human owner and the agent execution boundary above.
Include the public Lab 3 research recommendation, not an unrestricted tool grant.
Save the issue body as `workshop/work/<pair-name>/creation-issue.md`.

Push the morning checkpoint to the **approved pair/cohort repository** before delegating.
Record its commit; select that starting branch in the assignment dialog.
The remote agent does not see your unsaved local files or a private local chat.
Make the issue self-contained, including any unfinished morning work you explicitly exclude.
Human reviewer: reject an issue that says only "implement ticket creation."

Create the issue in the assigned repo. The source repository does not need workshop
participant issues. If GitHub issue creation is unavailable, the saved Markdown body is
the fallback task packet.

## Run exactly one bounded implementation

**Primary GitHub Actions-based path:**

1. Confirm [setup](../setup.md) and governance go/no-go: write permission, effective policy,
   compatible rules, approved usage, default-branch `copilot-setup-steps.yml`.
2. Open the issue's **Assignees**, select **Copilot**, and review the assignment dialog.
   Select the approved repository and morning checkpoint branch. Keep built-in Copilot
   as implementer; the Local-only reviewer/planner profiles are not cloud implementations.
   Include: "Implement only this issue; provide criterion-to-check evidence; open a draft PR.
   Do not merge, change policies/workflows, install packages, or use additional MCP servers."
3. Confirm the actual execution environment in the session. The checked docs describe
   issue-assignment sessions as GitHub Actions-based. Inspect setup/build output.
   The setup file is ignored by cloud sandboxes and must be on the default branch for Actions.
4. Inspect progress/session logs. Enforce the agent execution boundary above; ask for a
   handoff with gaps instead of repeatedly launching tasks.

**If issue assignment is absent but hosted execution is approved:** from the repository's
Agents tab start a task with the exact issue text and explicit repository/base branch.
Select **Actions** where available to keep this path, and request a draft PR because not
every entry point opens one automatically. If only **Cloud** (sandbox) is available,
label it **CLOUD SANDBOX ALTERNATIVE**, verify/install the pinned SDK through the approved
environment, and do not claim the Actions setup workflow ran.
Do not add connectors, dotfiles secrets, cross-repository access or broad network permissions.
If any requirement remains blocked, switch to local now.

Issue assignment includes existing issue context at assignment time. Later issue comments
are not automatically read by that task; send requirement changes on the resulting PR
as documented, for example an explicit `@copilot` repair request, or in the actual session.
Do not assume an unrelated issue comment steers ongoing execution.

## Local fallback: no cloud-agent access

Label all artifacts **LOCAL FALLBACK - NOT CLOUD EXECUTION**.
Save the base commit and create `workshop/<pair-name>-creation` from the morning branch.
Start a **fresh local Agent chat**, supplying only the saved issue, repository files and
instructions; do not bring the planning conversation along. Your partner reviews that
packet as though they were a new implementer.
Use the same scope, agent execution boundary and implementation/check requirements.
Commit the result. If permitted, open a **human-authored draft PR** in the pair repo;
otherwise review `git diff <base-commit>..HEAD` and supplied evidence locally.
This preserves context transfer, bounded implementation and review outcomes; it does not
demonstrate remote execution, hosted credentials/firewall or hosted session logs.
With no Copilot access, a human implements from the packet; record that additional limitation.

## Independent evidence-based review

Supply [the handoff template](../templates/handoff.md) and actual diff to QueueReviewer,
then **a human** reviews and reruns build/checks on the result branch.
Check every criterion, including:

| Scenario | Required evidence |
| --- | --- |
| Fresh create | Trimmed title, id 5, status open, correct priority, 201 and `/tickets/5` Location; GET matches. |
| Boundary values | Title lengths 1 and 80 accepted; 81, blank, missing or null rejected. Required priority rejects missing/null/invalid/mixed-case. |
| Rejection semantics | 400 Problem Details for application validation, meaningful title; no list mutation or consumed ID. Malformed JSON rejected with 400. |
| Trust and binding | Extra `id`/`status` JSON properties cannot override server values; a title with instruction-like text remains data. |
| Concurrency | Concurrent valid creates get unique IDs and do not lose tickets; subsequent list is ordered, snapshots are safe. |
| Regression | Seed, health, missing-ID details, status filter and title search still pass. Restart restores seed. |

Ask the agent reviewer for findings with file/location, observable failure or missing
evidence, and proposed verification, not generic praise. It cannot run checks with its
read-only tools. Confirm at least one substantive acceptance decision independently.
If everything is correct, document a concrete boundary check rather than inventing a bug.

After creation passes human review, enable `create` in
[the frontend configuration](../project.md#frontend-and-feature-switches), build/restart,
and use New ticket. Verify its ID through the raw API as well as the dashboard.
Include that flag in the reviewed branch, not before endpoint acceptance.

Inspect any workflow changes **before** clicking **Approve and run workflows**.
Default Copilot PR workflows may await human approval; check actual configuration.
Required approval from the initiating human may not count under GitHub's Copilot PR rules;
use an independent reviewer, and do not weaken protections or add a bypass.
Copilot code review is optional supplementary evidence, not a substitute for human approval.

## Save your checkpoint and close the handoff

Send one specific repair request if needed, rerun affected checks and record residual gaps.
Do not enable Agent Merge, auto-merge or automatic workflow approval.
Leave the PR unmerged unless the facilitator explicitly authorizes a human merge in the
pair repo. Continue the capstone from the **reviewed creation branch**, or the facilitator's
creation checkpoint, so no default-branch policy change is needed.

**Definition of done:** self-contained issue, explicit execution path/base/result commit,
scoped implementation, all creation and regression criteria covered, independently executed
checks, reviewer verdict, and a completed handoff packet. Incomplete implementation must be
marked incomplete, with a documented checkpoint/fallback for the capstone.
**Stretch:** compare hosted and local handoff context gaps; do not launch a second hosted task.

---

**Next:** [Lab 5: Agent evaluation, iteration and management](05-evaluation.md)
