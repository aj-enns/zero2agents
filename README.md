# zero2agents

A one-day, **08:00-16:00** workshop for teams already using GitHub Copilot.
Design, build, evaluate, and manage **development agents** against a small C# service-desk API.
No Azure subscription, database, API keys, or paid infrastructure is required for the local path.
Copilot usage and optional GitHub-hosted execution remain subject to your account's allowances.

**Start:** [Setup and preflight](workshop/setup.md) -> [Lab 1](workshop/labs/01-plan-to-agent.md)
-> [Lab 2](workshop/labs/02-agent-design.md) -> [Lab 3](workshop/labs/03-mcp.md)
-> [Governance checkpoint](workshop/governance.md) -> [Lab 4](workshop/labs/04-handoff-review.md)
-> [Evaluation](workshop/labs/05-evaluation.md) -> [Capstone](workshop/capstone.md).

## What you will learn

1. **[Plan before you build](workshop/labs/01-plan-to-agent.md).** Ask Copilot for a plan,
   review it, then let it write code and check the results.
2. **[Give agents clear jobs and rules](workshop/labs/02-agent-design.md).** Create planning
   and reviewing agents, and teach them your project's standards and limits.
3. **[Connect agents to outside tools safely](workshop/labs/03-mcp.md).** Use MCP to let
   an agent read official documentation while controlling what it can access and share.
4. **[Delegate work and review what comes back](workshop/labs/04-handoff-review.md).**
   Give an agent a clear GitHub issue, then review its code, tests and pull request.

You will also compare agent results, improve their instructions and put the whole workflow
into practice in a final challenge. By the end, you will have a tested feature, project
instructions, two custom-agent roles and a reviewed handoff.
Work in pairs: driver and reviewer, swapping after each lab.

## Optional bonus labs

**[Bonus Lab 6: Create a ticket-triage agent in Copilot CLI](workshop/labs/06-cli-agent.md)**
uses the CLI's agent-creation flow to build an agent that recommends ticket priorities
and next steps without changing tickets. Check whether your CLI offers `/create-agent`;
the documented alternative is `/agent`, then **N**. Allow about 30 minutes after the
core workshop. Lab 5 remains evaluation; the 08:00-16:00 agenda below is unchanged.

**[Bonus Lab 7: Manage agent sessions](workshop/labs/07-manage-agent-sessions.md)**
uses VS Code's Agents window or the GitHub Copilot app to track two read-only tasks,
guide their work, and review the results. Allow 20-30 minutes after the core workshop.
You can take either bonus lab on its own.

## Prerequisites

Complete these before the workshop; allow **20-30 minutes** for setup.

| Requirement | What to install or check |
| --- | --- |
| Git | [Install Git](https://git-scm.com/downloads), then confirm `git --version` works. |
| VS Code | [Install VS Code](https://code.visualstudio.com/download). Add the Microsoft-published **C#** and **GitHub Copilot** extensions; sign in to Copilot. C# Dev Kit is optional where approved/licensed. |
| .NET SDK | Use **10.0.300 or a newer stable 10.0 SDK**. If missing, [download the .NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0), choose your OS/architecture, and install the **SDK**, not just the runtime. |
| GitHub access | Use your own Copilot-enabled account with approved access to the private workshop/pair repository. Confirm organization policies allow the editor agent features. |
| Working knowledge | Be comfortable with basic C#, Git branches/commits, and reviewing a pull request. No agent-design experience is required. |

Restart VS Code and your terminal after installation. From your checkout, verify:

```text
git --version
dotnet --list-sdks
dotnet --version
```

`dotnet --version` should show **10.0.300 or a newer stable 10.0 SDK**.
An existing 10.0.300 installation is sufficient; .NET 8/9 alone is not.
Then follow [setup and preflight](workshop/setup.md) to create `workshopbranch`
and run the baseline checks. MCP and GitHub-hosted agent access are optional paths
with documented fallbacks; no Azure subscription, Node.js, database or credentials are needed.

## Agenda

Times are local workshop time. Breaks and lunch are included in the eight-hour day.

| Time | Session |
| --- | --- |
| 08:00-08:30 | Welcome, goals and setup checks |
| 08:30-09:30 | Lab 1: Plan before you build |
| 09:30-09:45 | Break |
| 09:45-10:45 | Lab 2: Give agents clear jobs and rules |
| 10:45-11:30 | Lab 3: Connect agents to outside tools safely |
| 11:30-12:00 | Check permissions, safety rules and usage limits |
| 12:00-12:45 | Lunch |
| 12:45-14:00 | Lab 4: Delegate work and review what comes back |
| 14:00-14:15 | Break |
| 14:15-14:45 | Compare agent results and improve their instructions |
| 14:45-15:45 | Final challenge: use the whole workflow |
| 15:45-16:00 | Demos, wrap-up and next steps |

## Starter

**QueueDesk** includes a responsive ticket workspace with light/dark themes, priority sorting,
and expandable details from the live API. It lists four deterministic tickets and reports health.
Filtering, search, creation, and resolution are intentionally unfinished participant work.
See the [API contract and sample requests](workshop/project.md).

From the repository root, with **.NET SDK 10.0.300 or a newer stable 10.0 SDK**
(`global.json` selects the highest compatible installed feature band):

```text
dotnet build Zero2Agents.slnx
dotnet run --project tests/QueueDesk.Checks --no-build
dotnet run --project src/QueueDesk.Api --no-build -- --urls http://127.0.0.1:5080
```

Open **http://127.0.0.1:5080/** for the frontend. Raw JSON remains at `/health` and `/tickets`.
Starter filters, search and mutations are visibly disabled; enable the corresponding
[workshop feature switch](workshop/project.md#frontend-and-feature-switches) only after
implementing and checking its API. No Node.js, npm or separate frontend server is needed.

The dependency-free checks start their own API on an ephemeral loopback port, print PASS/FAIL,
and exit nonzero on failure. **`dotnet test` is not the test runner for this starter.**
Keep evidence in [your workshop work folder](workshop/work/README.md).
The primary editor path is **VS Code, Local harness, GitHub Copilot**; alternatives and access
fallbacks are in setup. [Official references](workshop/references.md) were checked **2026-11-01**;
CLI bonus-lab guidance was checked separately **2026-11-02**.
