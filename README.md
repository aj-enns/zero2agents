# zero2agents

A one-day workshop for developers who already use GitHub Copilot.
Learn to plan, guide, connect and review **development agents** with QueueDesk,
a small C# ticket app. No Azure subscription, database, API keys or extra packages
are needed.

**Start here:** [Setup and preflight](workshop/setup.md).
Then follow four guided labs:

| Lab | What you will do |
| --- | --- |
| [1. Plan and build](workshop/labs/01-plan-to-agent.md) | Review a plan, let an agent add a small feature, and check its work. |
| [2. Give agents instructions and roles](workshop/labs/02-agent-design.md) | Add clear project rules and create agents that plan and review. |
| [3. Connect an agent to tools safely](workshop/labs/03-mcp.md) | Look up official docs, check the source, and handle unsafe text. |
| [4. Delegate, review and improve](workshop/labs/04-handoff-review.md) | Give a fresh agent a complete task, manage its session, review its code, and improve one instruction. |

Each lab has copy-and-paste prompts, numbered steps and visible completion checks.
**No work log, copied output, scoring sheet or separate handoff document is required.**
Read answers in chat, inspect changes in Source Control, and run checks in the terminal.
Save reviewed files with a [local Git commit](workshop/work/README.md#check-in-after-each-lab).
You do not need to push for the main workshop.

## One project, independent exercises

Lab 1 adds status filtering. Lab 2 uses a supplied practice plan, not Lab 1's code.
Lab 3 uses public documentation, not earlier work. Lab 4 adds ticket creation;
it does not require status filtering, search, custom agents or MCP.

If a code change gets stuck, keep it and use the
[fresh-start steps](workshop/setup.md#start-fresh-without-losing-work).
Do not spend the day repairing an earlier exercise.
Blocked tools are not a pass, but they do not have to block the next topic.

## Before the day

Allow 20-30 minutes for [setup](workshop/setup.md). You need Git, VS Code,
the Microsoft-published C# and GitHub Copilot extensions, an approved Copilot account,
and the .NET 10 SDK selected by `global.json`.
Use an approved private workshop repository. No Node.js or npm is needed.

The main path is **VS Code with the Local harness**. A harness is the environment
that runs an agent. Keep normal tool approvals on. MCP has a browser-only alternative;
GitHub-hosted execution is optional.

## Agenda

| Time | Activity |
| --- | --- |
| 08:00-08:30 | Welcome and setup checks |
| 08:30-09:45 | Lab 1: Plan and build |
| 09:45-10:00 | Break |
| 10:00-11:30 | Lab 2: Instructions and roles |
| 11:30-12:00 | Discuss what worked; catch up or take a fresh start |
| 12:00-12:45 | Lunch |
| 12:45-13:45 | Lab 3: Tools and safety |
| 13:45-14:00 | Break |
| 14:00-15:45 | Lab 4: Delegate, review and improve |
| 15:45-16:00 | Show a result and wrap up |

## Run QueueDesk

From the repository root, build and then run the checks:

```powershell
dotnet build .\Zero2Agents.slnx
```

Only if the build succeeds:

```powershell
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

Start the app:

```powershell
dotnet run --project .\src\QueueDesk.Api --no-build -- --urls http://127.0.0.1:5080
```

Open **http://127.0.0.1:5080/**. The starter shows four tickets.
Filtering, search, creation and resolution start disabled.
Enable only an assigned feature after its API passes checks and human review.
See the [API contract](workshop/project.md).
Stop the app with **Ctrl+C** before rebuilding.

`dotnet test` does not run this project's checks.
The check runner starts its own API; you do not need a separate running app for it.

## Optional practice and help

- [Create a ticket-triage agent in Copilot CLI](workshop/labs/06-cli-agent.md).
- [Manage two read-only agent sessions](workshop/labs/07-manage-agent-sessions.md).
- [Short worked examples](workshop/examples/README.md).
- [Safety reminders](workshop/governance.md).
- [Editor differences and official sources](workshop/references.md).

Optional exercises are outside the four-lab day. Copilot and optional hosted work
remain subject to your account's permissions and usage limits.
