# Capstone: resolve a ticket end to end

**Expected completion time: 60 minutes**, followed by a 15-minute wrap-up.
| [Previous: Evaluation](labs/05-evaluation.md)

Work through the checkpoints at your own pace; the estimate is a guide, not a deadline.

## Goal

Add the **resolution contract in [project.md](project.md)** using the roles,
instructions, tools, handoffs and evaluation lessons you developed.
Resolving a ticket marks it as finished. Repeating that request must return the
same record, not create another change; this is called **idempotence**.

## Prerequisites

Finish Labs 1-5, or record the reviewed facilitator checkpoints you inherited.
Start from the reviewed Lab 4 creation branch (including morning features), not an unmerged
default branch missing that work. For Lab 4's local path, this is `workshopcreation`;
for a hosted agent, use its reviewed result branch. If you fell behind, use the facilitator's creation
checkpoint and explicitly identify which code is not yours.

Use VS Code to edit files. All paths start at the repository root.
Paste code-block contents without the backticks, replace `FILL IN` fields, and save
with **Ctrl+S**. Use local execution; no second hosted task is needed.
Keep normal approvals. Stop after two failed implementation repairs and report gaps.
Do not add secrets, packages, external services, policy changes or broader network access.

## Steps

### Step 1: Confirm the starting point

**1.1** In your own terminal at the repository root, run:

```powershell
git status --short
git branch --show-current
git rev-parse HEAD
```

Confirm the branch contains reviewed creation, status filtering and title search.
Save or commit any unfinished work before switching branches.
If you are on the wrong branch, use VS Code's branch picker to select your recorded
Lab 4 result branch. Do not guess a branch name or replace local work.

**1.2** Create `workshop/work/capstone-plan.md`. Paste:

```markdown
# Capstone: resolution plan

Starting branch: FILL IN
Starting commit: FILL IN
Inherited code or checkpoint, if any: FILL IN
Owner and final reviewer: workshop developer
Path: local implementation
Roles: QueuePlanner -> human plan approval -> Agent -> QueueReviewer -> human decision
Limit: stop after two failed implementation repairs and return gaps
Scope: POST /tickets/{id:int}/resolve and its checks
Out of scope: summary stretch, storage, auth, packages, external services and policy changes

## Reviewed plan

Not planned yet

## Human plan decision

Pending
```

Fill in the branch and commit from **1.1**, plus any inherited work.

**1.3** Stop any running QueueDesk app with **Ctrl+C**. Build and run the checks:

```powershell
dotnet build .\Zero2Agents.slnx
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

If the build fails, fix or report that before running checks; do not test stale binaries.
Record the actual baseline result in `workshop/work/evidence.md`.
Do not proceed from an unreviewed or failing creation feature.

### Step 2: Plan the change

**2.1** Start a fresh **QueuePlanner** chat with read/search-only tools.
Attach `capstone-plan.md` and `workshop/project.md`. Paste:

```text
Plan only the capstone resolution feature from workshop/project.md.
Use the starting branch and commit in workshop/work/capstone-plan.md.
Inspect the current TicketEndpoints, ITicketStore, InMemoryTicketStore and checks.
Add POST /tickets/{id:int}/resolve with no required request body.
Open tickets become resolved; return 200 and the record.
Already-resolved tickets return the identical record with 200.
Unknown integer IDs return the existing 404 Problem Details.
Preserve id, title, priority, creation, search, filters, seed reset and ordered snapshots.
Plan a thread-safe store update and concurrent-resolution checks.
Include checks for resolving a newly created ticket and finding it with status plus q.
Return affected files, ordered steps, acceptance-to-check mapping and open questions.
Do not edit, run commands, enable frontend resolve, or implement the summary stretch.
```

If Lab 5 retired QueuePlanner, use a fresh chat with only read/search tools or
write the plan yourself. Record that fallback; do not reactivate an unsafe role.

**2.2** Compare the plan with the capstone contract in `workshop/project.md`.
Check that it covers repeated requests, missing IDs, concurrent updates and earlier
features. Ask for corrections if needed.

**2.3** Copy the reviewed plan into **Reviewed plan** in `capstone-plan.md`.
Replace **Pending** under **Human plan decision** with your actual decision and
any conditions. Save the file. Do not implement until you approve it.

### Step 3: Implement only the approved plan

**3.1** Start a fresh built-in **Agent** chat. Attach `capstone-plan.md`.
Paste:

```text
Implement only the reviewed plan in workshop/work/capstone-plan.md.
Follow the current repository and scoped test instructions.
Use the injected ITicketStore and keep HTTP behavior in TicketEndpoints.
Add the resolve endpoint, thread-safe store update and acceptance checks.
Preserve all baseline and earlier feature checks. Do not add a summary endpoint.
Leave workshop.json unchanged; the human enables resolve after acceptance.
Use normal approvals, no new packages, external services, secrets or policy changes.
Build and run the documented checks and return exact commands and actual output.
Stop after two failed repairs and return gaps. Do not commit, push or merge.
```

**3.2** Inspect tool requests before approving them. Stop unrelated work.
If a command fails or is blocked, require the actual error, not a claimed success.

**3.3** Create `workshop/work/capstone-handoff.md`. Paste this record and replace
the fields with the actual implementation evidence. Ask Agent for missing evidence,
but write the human decision yourself.

```markdown
# Capstone implementation -> review

Path: local implementation
Starting branch/commit: FILL IN
Result commit: not committed; review the current diff
Plan: workshop/work/capstone-plan.md
Owner: workshop developer
Next reviewer: QueueReviewer, then the human
Changed files: FILL IN

| Criterion | Check name or exact request | Actual result |
| --- | --- | --- |
| Resolve ticket 1: 200, resolved, same id/title/priority | FILL IN | Not run |
| Repeat resolve 1 and resolve already-resolved seed 3: unchanged records | FILL IN | Not run |
| Resolve 99: existing 404 Problem Details, unchanged list | FILL IN | Not run |
| Create, resolve, then find with resolved status and title search | FILL IN | Not run |
| Concurrent resolves of the same ID: consistent records, no duplicates/lost tickets | FILL IN | Not run |
| Baseline, earlier features, ordering and seed reset preserved | FILL IN | Not run |

Build command and actual output: FILL IN
Check-runner command and actual output: FILL IN
Tools, approvals and blocked work: FILL IN
Reviewer findings and verified conclusion: pending
Changed-role E3/E4 evidence, or role unchanged: FILL IN
Human decision and remaining gaps: pending
Frontend and raw API observations: not tried yet
Rubric scores and evidence links: not scored yet
```

Use `git diff --name-only` to list changed tracked files, `git status --short` to
find new files, and `git diff` to inspect edits. Attach new source/check files too.
Do not replace **Not run** with an expected result.

### Step 4: Check the result and get a review

**4.1** Stop the app if running. Build, then run checks using **1.3**.
Save your own commands and actual output in `capstone-handoff.md`.
If anything fails, return the specific failure to **Agent** within the repair limit.

**4.2** Check each row of the handoff against the executable cases.
For fresh seed ticket 1, resolution preserves title **VPN connection fails** and
priority **high**; open IDs become **2**, resolved IDs become **1,3,4**.
Check both resolving the same ticket twice and resolving seed ticket 3, which
starts resolved. A fresh API instance must restore the original four seed tickets.

**4.3** Start a fresh **QueueReviewer** chat with only read/search tools.
Attach `capstone-plan.md`, `capstone-handoff.md` and the changed source/check files.
Paste the actual `git diff` output and send:

```text
Review only the capstone resolution change against workshop/project.md.
Use the supplied plan, handoff, diff and source files.
Check unchanged ticket fields, repeated resolution, existing 404 Problem Details,
concurrent updates, creation/search/filter composition and earlier checks.
Report file locations, failures or missing evidence, and a check for the human.
Do not edit, run commands, approve changes or claim independent test execution.
```

If the role is unavailable, inspect these items yourself and record
**agent review not run**.

**4.4** Read and verify at least one reviewer conclusion yourself.
Save findings and your decision in `capstone-handoff.md`.
Give confirmed defects to **Agent** for repair, then rebuild, rerun checks and
refresh the review evidence. If the repair limit is reached, mark the feature incomplete.

**4.5** If you changed an agent role since Lab 5, rerun the exact **E3** and **E4**
inputs from [Lab 5](labs/05-evaluation.md#fixed-evaluation-inputs) in fresh chats
with the changed role. Keep its tools restricted. Record actual responses and
actions in the handoff. If no role changed, write **roles unchanged since evaluation**.

### Step 5: Enable and demonstrate the frontend

**5.1** Only after checks pass and you accept the endpoint, open
`src/QueueDesk.Api/wwwroot/workshop.json`. Change only `"resolve": false` to
`"resolve": true`. Earlier accepted flags stay enabled. The file should contain:

```json
{
  "statusFilter": true,
  "search": true,
  "create": true,
  "resolve": true
}
```

**5.2** Save the file. Stop the app, rebuild and run checks using **1.3**.
If both pass, start a fresh process:

```powershell
dotnet run --project .\src\QueueDesk.Api --no-build -- --urls http://127.0.0.1:5080
```

**5.3** Open **http://127.0.0.1:5080/** and reload. Clear any search, choose **Open**,
and expand ticket **1**. Select **Resolve ticket**. Expect it to leave the Open
queue and appear in **Resolved** with the same title and priority.

**5.4** In another browser tab, open **http://127.0.0.1:5080/tickets/1**.
Expect `{"id":1,"title":"VPN connection fails","status":"resolved","priority":"high"}`.
Open **http://127.0.0.1:5080/tickets?q=vPn&status=resolved**; expect IDs **1 and 4**.
Record the actual responses and UI result in `capstone-handoff.md`.
The UI demonstration supports, but does not replace, executable acceptance checks.

### Step 6: Save and explain your result

**6.1** Score each row of the rubric below from 0 to 2.
In `capstone-handoff.md`, record each score with a link to real evidence.
Sum the six scores out of **12**. Do not award points for a proposed but unrun check.

**6.2** Create `workshop/work/demo.md`. Paste and complete:

```markdown
# Capstone demo

Request: resolve a ticket without breaking earlier features
Starting/result commits or reviewed current diff: FILL IN
Roles and actual enabled tools: FILL IN
One real API request and response: FILL IN
One executable boundary check and actual result: FILL IN
Plan and review handoff: capstone-plan.md and capstone-handoff.md
One observed refusal or unavailable capability: FILL IN
Measured role improvement, or reason for keeping the prior version: FILL IN
Human review decision and remaining gaps: FILL IN
Rubric: FILL IN / 12, with evidence in capstone-handoff.md
Cleanup completed or still blocked: FILL IN
One follow-up for a future, separately approved task: FILL IN
```

**6.3** In VS Code Source Control, inspect and stage only the intended code, checks,
frontend flag, plan, handoff and demo. Commit with the message
`Complete ticket resolution capstone`. Record the result hash from `git rev-parse HEAD`
in your notes after committing. Save the updated notes in a follow-up evidence commit;
do not try to put a commit's own hash inside that same commit.
Follow the [check-in confirmation](work/README.md#check-in-after-each-lab) after
the evidence commit so no intended capstone files remain uncommitted.
A draft PR is optional where permitted. Do not merge or change repository policy.

**6.4** Walk through `demo.md`. Show a real result, a boundary check and the human
decision. Explain the role's actual limits, not capabilities you did not observe.

**6.5** Stop your local API with **Ctrl+C**. Confirm exercise agent work has finished.
Disable the exercise Learn server if used. Record any blocked cleanup.
Commit any final demo or cleanup-note updates using the same check-in guide.
Ask the billing owner to handle hosted sandbox retention/storage according to policy;
do not delete other people's work. Keep reviewed commits and sanitized evidence.

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

## Completion checks

Your saved plan has a human decision. Executable checks cover each handoff row and
earlier features. You ran the build/checks yourself and recorded actual output.
The reviewed frontend calls the real endpoint and shows the expected queue change.
Your handoff and demo name the real execution path, role limits, remaining gaps and
rubric score. Any changed role has fresh E3/E4 evidence. Cleanup is recorded.
Your commits include the reviewed implementation and final evidence, including cleanup notes.
If the feature is incomplete, say so; a good plan alone is not a shipped feature.

## Next lab

In `demo.md`, choose one future follow-up: pilot a scoped role, expand the evaluation
set, or propose a governance change to its administrator.
Do not install tools or grant permissions as an automatic next step.

---

**Stuck?** [See a resolution plan, handoff and demo example](examples/06-capstone.md).

**Optional next:** [Bonus Lab 6: Create a ticket-triage agent in Copilot CLI](labs/06-cli-agent.md).
Or try [Bonus Lab 7: Manage agent sessions](labs/07-manage-agent-sessions.md).
