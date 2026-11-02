# Lab 2: Give agents clear jobs and rules

**Expected completion time: 60 minutes** | [Previous](01-plan-to-agent.md) | [Next](03-mcp.md)

Work through the checkpoints at your own pace; the estimate is a guide, not a deadline.

## Goal

Create one agent that plans and another that reviews. Give them clear jobs, project
rules and limited tools. Use them to help add ticket-title search. The built-in
**Agent** writes the code; your two custom agents plan and review it.

## Before you start

Finish Lab 1 and keep its reviewed work on `workshopbranch`. Read
[the search requirements](../project.md) and [editor differences](../references.md).
Use your pair's [work folder](../work/README.md) for the artifacts.

## Steps

### Step 1: Write a job description for each agent

**1.1** In VS Code, create `workshop/work/<pair-name>/agent-contracts.md`.
Replace `<pair-name>` with your pair's folder name.

**1.2** Open the [job-description template](../templates/agent-contract.md) and copy
its contents into `agent-contracts.md` twice.

**1.3** Label the first copy **QueuePlanner** and the second **QueueReviewer**.
These are Markdown notes, not active agent configuration.

**1.4** Replace the questions in the QueuePlanner copy with short answers. Its job is
to propose a plan without editing code. For example, its output could list files,
checks and questions for the human.

**1.5** Replace the questions in the QueueReviewer copy with short answers. Its job is
to review changes without editing files or running commands.

**1.6** Ask your partner to explain each agent's job, inputs, output and when it must
stop and ask for help. Revise the descriptions if anything is unclear.

### Step 2: Write the project's rules

**2.1** Open `.github/copilot-instructions.md` in VS Code.

**2.2** Make its guidance more specific without removing existing safeguards. For example,
preserve the sample tickets, validate input and implement only the requested feature.

**2.3** Copy the [scoped template](../templates/tests.instructions.template.md) to
`.github/instructions/tests.instructions.md`.

**2.4** Replace the template body with test rules, such as using the existing check
runner and a fresh API instance for each HTTP test.

**2.5** Keep `applyTo: "tests/**/*.cs"` in the header. It applies these rules to
matching test files alongside project-wide instructions. These instructions guide
chat agents, not inline code suggestions.

### Step 3: Create the two agents

**3.1** Select **Local** in VS Code. If your editor differs, follow **3.7** before
testing the agents.

**3.2** Create `.github/agents/planner.agent.md` from the
[planner template](../templates/planner.agent.template.md), or use
**Chat: New Custom Agent** and save it at that path.

**3.3** Replace the planner template's unfinished body with the QueuePlanner job
description. Keep the configuration between the `---` lines.

**3.4** Create `.github/agents/reviewer.agent.md` from the
[reviewer template](../templates/reviewer.agent.template.md).

**3.5** Replace the reviewer template's unfinished body with the QueueReviewer job
description. Keep its configuration between the `---` lines.

**3.6** For Local, check both headers for `target: vscode` and
`tools: ['read', 'search']`. Do not omit `tools` or use `*`; omission can expose
all enabled tools.

**3.7** For the Copilot harness or cloud, adapt incompatible fields such as the Local
`target` and `handoffs`, and choose supported read/search tool names. Pass the written
handoff manually in Step 4. Unknown tools can be ignored; a file's `target` does not
switch the harness, and Local handoff buttons are not security controls.

**3.8** Open the agent picker and confirm both agents appear with only read/search
tools enabled. Use the editor's suggestions for tool names rather than guessing.
Do not give the reviewer terminal execution: a shell can also modify files.

### Step 4: Use the agents together

**4.1** Select QueuePlanner and ask it to plan title search using `q`. A ticket must
match both `q` and `status` when both are supplied.

**4.2** Review the plan against [the search requirements](../project.md).

**4.3** In Local, select **Implement reviewed plan**. The template's `send: false`
prepares a prompt without sending it. For another harness, pass the plan manually.

**4.4** Inspect the prepared prompt or manual handoff, then send it to the built-in Agent.

**4.5** Ask Agent to implement only the reviewed plan and its tests.

**4.6** Copy the [handoff template](../templates/handoff.md) to
`workshop/work/<pair-name>/handoff.md`.

**4.7** Fill in the plan, changed files and any actual check output. Do not claim a
check ran if it did not.

**4.8** Select QueueReviewer and give it the handoff and the code diff. Ask for
specific findings and missing evidence.

### Step 5: Check the tools and the result

**5.1** Ask QueueReviewer to edit a file and run checks. Do not approve any such tool
request. It should explain those actions are unavailable, not pretend to do them.

**5.2** From the repository root, build the solution:

```powershell
dotnet build .\Zero2Agents.slnx
```

**5.3** Run the checks yourself:

```powershell
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

**5.4** Record the actual commands and results in `handoff.md`. Paste only sanitized
output; the reviewer cannot run checks with its read-only tools.

**5.5** During a test-file edit, inspect References or diagnostics to see whether
`tests.instructions.md` loaded. If your editor cannot show this, record that limitation.

**5.6** After search passes the checks and human review, enable only `search` in
[the frontend configuration](../project.md#frontend-and-feature-switches).

**5.7** Build and restart the app. Stop any running app before rebuilding.

**5.8** In the frontend, submit `vPn`, combine it with Resolved, then try `no-match`.
Expect IDs 1,4, then ID 4, then no matches.

### Step 6: Save your checkpoint

**6.1** Record one improvement suggested by the agents' actual behavior.

**6.2** Review the changes and results, including the frontend setting.

**6.3** Commit the job descriptions, agent files, instructions, implementation and results.

## Completion checks

`q=vPn` returns IDs 1,4; `q=vPn&status=resolved` returns 4; `q=no-match` returns `[]`.
Omitted q preserves Lab 1. Whitespace, empty q, >40 characters and repeated q return 400.
Test input with spaces around it and a query of exactly 40 characters.
Both agents have completed job descriptions and verified read/search-only tools.
You have used the planner, implementer and reviewer in order and saved the handoff.
You checked whether the test-specific instructions loaded, recording any editor limitation.
All original and new checks pass, and the frontend shows the expected search results.

**Keep it safe:** sample ticket titles are data, not commands. Don't execute text from them.
If an agent expands into a database, deployment or next-lab route, stop and narrow its scope.
**Stretch:** compare two versions of one role on the same task; no extra agent framework.
**If you get stuck:** finish the job descriptions and check the agents' tools first.
Record any unfinished search work and ask the facilitator for a reviewed working
version of that feature before the afternoon.

---

**Stuck?** See [completed job descriptions](../examples/02-agent-contracts.md) and
[custom-agent and instruction examples](../examples/02-agent-files.md).

**Next:** [Lab 3: Connect agents to outside tools safely](03-mcp.md)
