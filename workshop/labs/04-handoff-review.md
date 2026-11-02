# Lab 4: Delegate work and review what comes back

**Expected completion time: 75 minutes** | [Governance](../governance.md)
| [Next: Evaluation](05-evaluation.md)

Work through the checkpoints at your own pace; the estimate is a guide, not a deadline.

## Goal

Write a clear GitHub issue asking an agent to add ticket creation. Give it everything
it needs without relying on your earlier chat. Then inspect its code, run its tests and
decide whether the result meets the requirements. Use **GitHub's coding agent with
GitHub Actions** when permitted. If unavailable, use a hosted or local alternative below
and record which one. Local work teaches handoff and review, but is not cloud execution.

## Before you start

Finish Labs 1-3 and the [governance checkpoint](../governance.md). Check your pair
repository and GitHub agent access in [setup](../setup.md); use the local path if
hosted access is unavailable. Keep your morning work on your branch and use your pair's
[work folder](../work/README.md).

**Agent limit:** allow one implementation attempt, limited to 25 minutes or two
unsuccessful repairs, then request a handoff with gaps. This controls agent work and
cost, not your pace. The platform's 59-minute Actions-session maximum is not permission
to extend this limit.

## Steps

### Step 1: Write a task the agent can work on

**1.1** Create `workshop/work/<pair-name>/creation-issue.md` in your pair's folder.

**1.2** Copy the headings and body from the
[agent-ready issue template](../../.github/ISSUE_TEMPLATE/agent-ready.md) into that file.
The YAML header is GitHub template configuration, not part of the issue body.

**1.3** Fill in [the ticket-creation requirements](../project.md), including the
expected inputs, results, errors and checks.

**1.4** Add the relevant files, out-of-scope work, build/check commands, allowed tools,
human reviewer and agent limit. Identify any unfinished morning features as out of scope.

**1.5** Add your Lab 3 recommendation. It does not grant permission to use extra tools.

**1.6** Ask your partner to review the issue without relying on your earlier chat.
Add any context they need to start the task.

**1.7** Commit the morning work on your branch.

**1.8** If using a hosted agent, push that branch to the **approved pair/cohort repository**.
The remote agent cannot see unsaved local files or your private chat. A local fallback
does not require a push.

**1.9** Record the starting commit (`git rev-parse HEAD`) and branch name
(`git branch --show-current`) in your issue notes.

**1.10** Create the issue in the assigned repository using the saved body.
If issue creation is unavailable, use the body for an approved hosted or local task.
The source repository does not need participant issues.

### Step 2: Let one agent implement the task

**2.1** Choose one path below. Use the Actions path if approved; otherwise use the
hosted alternative or local fallback. Record the path you actually use.

**Primary path: GitHub Actions (2.2-2.8)**

**2.2** Confirm [setup](../setup.md) and the safety checkpoint: write access, permitted
agent and workflow, approved usage, and `copilot-setup-steps.yml` on the default branch.
If these are unavailable, choose an approved alternative below.

**2.3** Open the issue's **Assignees** menu and select **Copilot**.

**2.4** In the assignment dialog, select the approved repository and morning checkpoint
branch. Use built-in Copilot; the Local planner and reviewer are not cloud implementations.

**2.5** Include this instruction with the assignment:

```text
Implement only this issue; show which checks cover each requirement and their results;
open a draft PR. Do not merge, change policies/workflows, install packages,
or use additional MCP servers.
```

**2.6** Confirm the session uses the expected execution environment and inspect its
setup/build output. The setup file must be on the default branch for Actions; cloud
sandboxes ignore it.

**2.7** Before approving any PR workflow, inspect its changes. Do not weaken protections
or add a bypass; use an independent reviewer where required.

**2.8** Watch progress and logs within the agent limit. If the task cannot finish,
request a handoff with completed work and gaps. Record the path and continue to Step 3.

**Hosted alternative: issue assignment unavailable (2.9-2.12)**

**2.9** If hosted execution is approved, start a task from the repository's **Agents**
tab with the exact issue text and explicit repository and base branch.

**2.10** Select **Actions** where available and request a draft PR; not every entry
point opens one automatically.

**2.11** If only **Cloud** sandbox is available, label the path **CLOUD SANDBOX
ALTERNATIVE**. Verify or install the pinned SDK through the approved environment.
Do not claim the Actions setup workflow ran. Do not add connectors, dotfile secrets,
cross-repository access or broad network permissions.

**2.12** Monitor the task within the same agent limit and record its path and result.
If a requirement remains blocked, use the local fallback instead. Continue to Step 3.

For either hosted path, the task receives issue context at assignment time. Later issue
comments are not automatically read. Send changes in the actual session or as a documented
PR request, such as an explicit `@copilot` repair request. Inspect workflow changes
before approving any PR workflow, including on the hosted alternative.

**Local fallback: hosted execution unavailable (2.13-2.20)**

**2.13** Label the artifacts **LOCAL FALLBACK - NOT CLOUD EXECUTION** and record the
morning base commit.

**2.14** From the morning branch, create the implementation branch. Replace
`<pair-name>` with your alias before running:

```text
git switch -c workshop/<pair-name>-creation
```

**2.15** Ask your partner to review the task as a new implementer.

**2.16** If Copilot is available, start a **fresh local Agent chat** and ask it to
implement the saved issue. Supply only the issue, repository files and instructions;
do not bring the earlier planning conversation. Use the same scope, agent limit and
implementation/check requirements.

**2.17** If Copilot is unavailable, have a human implement from the packet and record
that agent execution was not demonstrated.

**2.18** Commit the implementation result on the new branch.

**2.19** If a PR is permitted, push the implementation branch to the approved pair
repository.

**2.20** Open a **human-authored draft PR**, or, if that is unavailable, review
`git diff <base-commit>..HEAD` and the evidence locally. This path does not demonstrate
remote execution, hosted credentials/firewall or hosted logs.

### Step 3: Check the code and results yourself

**3.1** Ask the implementer to update `workshop/work/<pair-name>/handoff.md` using the
[handoff template](../templates/handoff.md). Include base/result commits, changed files,
actual check output and remaining gaps.

**3.2** Give QueueReviewer the handoff and actual diff. If no reviewer agent is
available, have a human review them and record that agent review was not run.

**3.3** Have a human check out the result branch. For a GitHub PR, use its checkout
instructions or `gh pr checkout <PR-number>` in the assigned repository. Save or
commit local work before switching. For the local path, stay on the implementation
branch and record its result commit.

**3.4** From the repository root, build the solution:

```powershell
dotnet build .\Zero2Agents.slnx
```

**3.5** Run the checks yourself:

```powershell
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

**3.6** Check every requirement against the actual code and results, including:

| Scenario | Required evidence |
| --- | --- |
| Fresh create | Trimmed title, id 5, status open, correct priority, 201 and `/tickets/5` Location; GET matches. |
| Boundary values | Title lengths 1 and 80 accepted; 81, blank, missing or null rejected. Required priority rejects missing/null/invalid/mixed-case. |
| Rejection semantics | 400 Problem Details for application validation, meaningful title; no list mutation or consumed ID. Malformed JSON rejected with 400. |
| Trust and binding | Extra `id`/`status` JSON properties cannot override server values; a title with instruction-like text remains data. |
| Concurrency | Concurrent valid creates get unique IDs and do not lose tickets; subsequent list is ordered, snapshots are safe. |
| Regression | Seed, health, missing-ID details, status filter and title search still pass. Restart restores seed. |

**3.7** Ask the reviewer for file locations, failures or missing evidence, and checks
to run. General praise is not a review; read-only tools cannot run checks.

**3.8** Verify at least one reviewer conclusion yourself. If there is no bug, document
a concrete boundary check instead of inventing one.

**3.9** After creation passes human review, enable `create` in
[the frontend configuration](../project.md#frontend-and-feature-switches).
Include that setting in the reviewed branch, not before endpoint acceptance.

**3.10** If creation passed review, build and restart the app. Stop any running app
before rebuilding.

**3.11** If creation passed review, use **New ticket** in the frontend. Verify the
returned ID through the raw API as well as the dashboard.

**3.12** Obtain the required independent human review. The initiating human's approval
may not count under GitHub's Copilot PR rules. Copilot review is supplementary evidence,
not a substitute for human approval.

### Step 4: Save the result and your review decision

**4.1** If a repair is needed, send one specific request and rerun affected checks.

**4.2** Record the actual results, human decision and remaining gaps in the handoff.
Mark unfinished work as incomplete.

**4.3** Commit the handoff and any accepted frontend setting on the reviewed branch.
If you have a PR, push the update where permitted; if you cannot update it, record
the limitation and ask the facilitator how to continue. A local review needs no push.

**4.4** Leave the PR unmerged unless the facilitator explicitly authorizes a human
merge in the pair repository. Do not enable Agent Merge, auto-merge or automatic approvals.

**4.5** Continue the capstone from the **reviewed creation branch** or the facilitator's
creation checkpoint. No default-branch policy change is needed.

## Completion checks

The issue makes sense without your chat, and your handoff record identifies the execution
path and starting/result commits. Only the requested feature was added.
Tests cover ticket creation, invalid input, concurrency and the earlier features.
You ran the build/checks yourself and recorded actual results and the human review decision.
The handoff record contains enough context for the next person to continue.
If the feature is unfinished, mark it incomplete and record which reviewed working
version or fallback you will use for the capstone; do not report unfinished work as passed.
**Stretch:** compare hosted and local handoff context gaps; do not launch a second hosted task.

---

**Stuck?** [See an agent-ready issue and honest review handoff](../examples/04-creation-handoff.md).

**Next:** [Lab 5: Test and improve an agent](05-evaluation.md)
