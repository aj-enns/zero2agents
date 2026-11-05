# Lab 1: Plan and build with an agent

**Allow 75 minutes.** [Setup](../setup.md) | [Next: Lab 2](02-agent-design.md)

## Goal

Use Copilot to plan and build status filtering.
You review the plan, approve the change, and check the result yourself.
You do not need to save a plan document or keep a log.

## Prerequisites

Complete [setup](../setup.md). Use VS Code and your workshop working branch.
The starter build and checks must pass. If they do not, use the
[fresh-start steps](../setup.md#start-fresh-without-losing-work).
No other lab is required.

Paths below start at the repository root. Paste only code-block contents,
not the backticks. Use **Ctrl+S** to save edited files.

## Steps

### 1.1: See the missing behavior

**1.1.1** Start the app using [setup Step 3](../setup.md#3-see-the-app).

**1.1.2** In a browser, open **http://127.0.0.1:5080/tickets?status=open**.
The unchanged starter returns all four tickets. We want only tickets **1 and 2**.
`status=open` is a query parameter: an option sent to the server after `?`.

**1.1.3** Open **http://127.0.0.1:5080/tickets**.
Without a filter, all four tickets must still be returned in ID order.
The full rules are in [the status contract](../project.md#feature-contracts).

**1.1.4** Stop the app with **Ctrl+C** in its terminal.
In Explorer, open `src/QueueDesk.Api/TicketEndpoints.cs`.
Find the route that lists tickets. You will let the agent change this behavior.

**Expected result:** you can see the problem and the behavior that must stay unchanged.

### 1.2: Ask for a plan

**1.2.1** Open a new Copilot chat. Choose **Local**, then **Plan**.
If Plan is unavailable, choose a read-only chat with only read/search tools.
Saying "plan only" does not disable write tools.

**1.2.2** Paste into chat. **Problem Details** means a structured JSON error response:

```text
Plan status filtering for GET /tickets. Do not implement yet.
Read workshop/project.md, TicketEndpoints.cs, ITicketStore.cs,
InMemoryTicketStore.cs and tests/QueueDesk.Checks/Program.cs.

Accept one exact status value: open or resolved.
Without status, return all tickets in ascending ID order.
Reject empty, whitespace, unknown, mixed-case and repeated status values
with 400 Problem Details.
Use the injected ITicketStore. Keep HTTP behavior in TicketEndpoints.
Preserve the seed tickets and existing checks.

Give a short plan: files to change, checks to add and any open question.
Do not add search, creation, resolution, packages or external services.
Do not edit files or run commands. Mark proposed checks as not run.
```

**1.2.3** Read the plan in chat. Check that it rejects invalid values instead of
silently returning an empty list. It must keep all four tickets when status is omitted.

**1.2.4** If it proposes extra features, paste:

```text
Revise the plan to cover only status filtering and its checks.
Keep the existing seed, API response shape and all baseline checks.
Do not implement yet.
```

**Expected result:** a small plan you understand. You decide whether to approve it.
Keep it in chat; do not copy it into a file.

### 1.3: Let the agent implement it

**1.3.1** After accepting the plan, choose the built-in **Agent** in the same chat.
Review the tool selection; allow local file edits and build/check commands,
not network tools or unrestricted execution.
Do not use **Start Implementation** before you accept the plan; it may send immediately.

**1.3.2** Paste:

```text
I approve the status-filter plan above.
Implement only that plan and add executable acceptance checks.
Follow the repository instructions. Keep all existing checks.
Leave wwwroot/workshop.json unchanged for now.
Build with dotnet build Zero2Agents.slnx.
Only after a successful build, run
dotnet run --project tests/QueueDesk.Checks --no-build.
Tell me what changed and whether those commands actually passed.
No packages, external services, commits, pushes or later features.
Stop after two unsuccessful repairs and explain the remaining problem.
```

**1.3.3** Read each tool request before approving it.
Reject unexplained installs, network access and unrelated edits.
If it fails twice, stop. Keep the work and use the recovery path below.

**Expected result:** only status filtering and its checks are changed.
An agent's claim of success is not enough; check it next.

### 1.4: Check the result

**1.4.1** Open **Source Control**. Select every changed and new source/check file.
Look for changes outside the plan. Do not accept deleted baseline checks.

**1.4.2** With the app stopped, run in your own terminal:

```powershell
dotnet build .\Zero2Agents.slnx
```

If the build passes, run:

```powershell
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

Expect all baseline and new checks to pass. If not, give Agent the specific failure
within the two-repair limit. Do not run checks on a failed build.

**1.4.3** Open a fresh chat with only read/search tools. Paste:

```text
Review my current status-filter change against workshop/project.md.
Read the changed source and checks. Do not edit files or run commands.
Look for invalid or repeated query values, changed seed data,
ordering changes and missing acceptance cases.
Give concrete findings with file locations, or explain what you could not verify.
Do not claim that you ran checks.
```

**1.4.4** Check at least one reviewer conclusion yourself in the named file.
If a defect is real, return it to Agent and rerun the build/checks after repair.
You, not the reviewer, decide when the feature is ready.

**1.4.5** Only after the checks pass and you accept the code, open
`src/QueueDesk.Api/wwwroot/workshop.json`. Change only `"statusFilter": false`
to `"statusFilter": true`. Save, build again, then start the app as in setup.

**1.4.6** Reload **http://127.0.0.1:5080/**. Choose **Open**, then **Resolved**.
Expect IDs **1,2** and **3,4**. Open `/tickets` directly and expect **1,2,3,4**.
Open `/tickets?status=closed` and expect a 400 error, not a successful empty list.

**1.4.7** Follow [Check website features](../work/README.md#check-website-features)
to confirm the flags match your accepted endpoints. Leave missing features disabled.
Stop the app. Follow the
[check-in steps](../work/README.md#check-in-after-each-lab).
Use `Add reviewed status filtering` as the commit message. No push is needed.

### If you get stuck

Keep the unfinished files. [Take a fresh start](../setup.md#start-fresh-without-losing-work)
if needed, or go straight to Lab 2: it uses a supplied plan, not this feature.
Do not enable the filter or call the feature complete if checks still fail.
Missing Copilot access means you can practice the plan and code review manually,
but have not demonstrated agent execution.

## Completion checks

- You can explain the plan and point to the changed route and new checks.
- Open returns IDs 1,2; resolved returns 3,4; no status returns 1,2,3,4.
- Checks reject empty, whitespace, mixed-case, unknown and repeated status values
  with 400 Problem Details: `application/problem+json`, status 400 and a nonempty title.
- All checks pass, and the enabled frontend calls the real filter.
- Your reviewed files are in a local commit. No log or copied output is needed.

## Next lab

[Lab 2: Give agents instructions and roles](02-agent-design.md).
It does not depend on completing this feature.
