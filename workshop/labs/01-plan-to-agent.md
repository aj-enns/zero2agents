# Lab 1: Plan before you build

**Expected completion time: 60 minutes** | [Setup](../setup.md) | [Next: Lab 2](02-agent-design.md)

Work through the checkpoints at your own pace; the estimate is a guide, not a deadline.

## Goal

Ask Copilot to plan a change, review its plan, then let it write code and tests.
The change lets you show only open or resolved tickets. You decide what is allowed
and whether the result is correct. Follow [the API requirements](../project.md);
do not add extra features.

## Before you start

Complete [setup and preflight](../setup.md). Open the repository in VS Code, confirm
the baseline build and checks pass, and create your
[work notes](../work/README.md) in `workshop/work/`.
Use `workshopbranch`, created during setup; do not create another branch for this lab.

## Steps

### Step 1: See what needs fixing

**1.1** In a terminal at the repository root, run the build and checks from
[setup](../setup.md#sdk-and-baseline). Confirm they pass.

**1.2** Start the app with the command in setup. Leave that terminal running.

**1.3** Open **http://127.0.0.1:5080/tickets?status=open** in a browser.
This sends a GET request with the query parameter `status=open`. Before the change,
you should see all four tickets, not just IDs 1 and 2. Use your app's port if different.
Alternatively, make the same request from a second PowerShell terminal:

```powershell
Invoke-RestMethod "http://127.0.0.1:5080/tickets?status=open" | Format-Table
```

**1.4** Open **http://127.0.0.1:5080/tickets** without a query. It should return all four tickets.

**1.5** In VS Code, inspect `src/QueueDesk.Api/TicketEndpoints.cs` and `InMemoryTicketStore.cs`.

**1.6** In VS Code, open `workshop/work/evidence.md`, which you created during setup.
`workshopbranch` is your Git branch, not a folder.
Save a short note about the app before you change it, so you can compare it with
the result later. Include:

- **Starting version:** run `git rev-parse HEAD` in the repository's terminal and
  copy the result. This identifies the code version you started from.
- **Filter problem:** record which ticket IDs you saw in step 1.3. The open filter
  should return only IDs 1 and 2.
- **Behavior to keep:** record which ticket IDs you saw in step 1.4.
  Without a filter, the API should still return all four tickets in order: 1, 2, 3, 4.

**1.7** Stop the app with Ctrl+C in its terminal before rebuilding.

### Step 2: Ask for a plan

**2.1** In VS Code, select the **Local** harness and **Plan** (or `/plan`).
If your editor differs, follow **2.2** before continuing.

**2.2** If using the **Copilot harness**, use `/plan` and its approval controls instead.
If Plan mode is unavailable, ask for a written plan with only read/search tools selected,
then approve implementation yourself. Record the difference. Saying "plan only" does
not disable tools.

**2.3** Send Copilot this prompt:

```text
Plan only: add GET /tickets status filtering from workshop/project.md.
Research the existing endpoints and ITicketStore. Preserve the unfiltered array,
seed data and ID ordering. Include rejected query values and repeated parameters,
exact check commands, affected files and open decisions.
No edits, packages, external tools, deployments or later-lab features.
```

**2.4** Read the plan. Check its proposed files, tests and handling of invalid or repeated
query values. Reject any plan that silently ignores an invalid status or expands the scope.

**2.5** Save the reviewed plan as `workshop/work/lab-01-plan.md`.

### Step 3: Have Copilot implement the plan

**3.1** Ask Copilot in a fresh read-only chat to review the saved plan against the
requirements. Check its findings and approve the plan yourself before implementation.

**3.2** Select **Agent** and attach the reviewed plan. Local **Start Implementation**
submits immediately, so use it only after review.

**3.3** Ask Agent to implement only the status filter and its tests.

**3.4** Inspect each proposed terminal command before approving it. Keep normal approvals on;
do not approve unrestricted tools, network access or unexplained installs.

**3.5** If two attempts to fix a problem fail, stop the agent and record what is still failing.

### Step 4: Check the result

**4.1** Inspect the changed code with `git diff`. Give the diff and requirements to
Copilot in a fresh read-only chat for review, then check its findings yourself.

**4.2** From the repository root, build the solution:

```powershell
dotnet build .\Zero2Agents.slnx
```

**4.3** Run the checks:

```powershell
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

**4.4** In `evidence.md`, record the check and actual result for each requirement.
An agent saying "it works" is not proof.

**4.5** After the API passes the checks and human review, enable only `statusFilter` in
[the frontend configuration](../project.md#frontend-and-feature-switches).

**4.6** Build again and restart the app. Stop any running app before rebuilding.

**4.7** In the frontend, select the Open and Resolved queues. Confirm they show IDs 1,2
and 3,4 respectively.

### Step 5: Save your checkpoint

**5.1** Review the changes and recorded results before committing.

**5.2** Commit the code, checks, frontend setting, plan and evidence on `workshopbranch`.

**5.3** Confirm the saved plan and evidence are ready for Lab 2.

## Completion checks

`status=open` returns IDs 1,2; `status=resolved` returns 3,4.
No status returns 1,2,3,4. Empty, whitespace, mixed-case `Open`, unknown `closed`
and `status=open&status=resolved` return 400 Problem Details.
All original checks and your new checks pass. The frontend queues show the expected IDs.
Your commit includes the reviewed plan, implementation and actual check results.
No later-lab feature has been implemented.
Problem Details is the API's structured JSON error response; use the exact fields
required in [the API requirements](../project.md).

**Keep it safe:** do not approve unrestricted tools, network access or unexplained installs.
Approving a plan does not approve every tool call. Review the changes before committing.
**Stretch:** add tests proving rejected queries never alter stored records; do not add search yet.
**If you get stuck:** save the plan and failing checks. Ask the facilitator for a
reviewed working version of the status-filter feature, not the whole day's solution.
Record which work you inherited.

---

**Stuck?** [See a worked status-filter plan](../examples/01-status-plan.md).

**Next:** [Lab 2: Give agents clear jobs and rules](02-agent-design.md)
