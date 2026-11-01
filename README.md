# zero2agents

A one-day, **08:00-16:00** workshop for teams already using GitHub Copilot.
Design, build, evaluate, and manage **development agents** against a small C# service-desk API.
No Azure subscription, database, API keys, or paid infrastructure is required for the local path.
Copilot usage and optional GitHub-hosted execution remain subject to your account's allowances.

**Start:** [Setup and preflight](workshop/setup.md) -> [Lab 1](workshop/labs/01-plan-to-agent.md)
-> [Lab 2](workshop/labs/02-agent-design.md) -> [Lab 3](workshop/labs/03-mcp.md)
-> [Governance checkpoint](workshop/governance.md) -> [Lab 4](workshop/labs/04-handoff-review.md)
-> [Evaluation](workshop/labs/05-evaluation.md) -> [Capstone](workshop/capstone.md).

By the end, you will have a tested feature, scoped repository instructions, two custom-agent roles,
a reviewed handoff, and a repeatable evaluation with evidence rather than confidence alone.
Work in pairs: driver and reviewer, swapping after each lab.

## Agenda

Times are local workshop time. Breaks and lunch are included in the eight-hour day.

| Time | Session |
| --- | --- |
| 08:00-08:30 | Kickoff, outcomes and preflight |
| 08:30-09:30 | Lab 1: Plan-to-Agent workflow |
| 09:30-09:45 | Break |
| 09:45-10:45 | Lab 2: Repository instructions and custom-agent design |
| 10:45-11:30 | Lab 3: Bounded MCP integration |
| 11:30-12:00 | Governance applied to the morning work |
| 12:00-12:45 | Lunch |
| 12:45-14:00 | Lab 4: GitHub cloud/coding-agent handoff and evidence-based PR review |
| 14:00-14:15 | Break |
| 14:15-14:45 | Agent evaluation, iteration and management |
| 14:45-15:45 | End-to-end capstone |
| 15:45-16:00 | Demos, wrap-up and next steps |

## Starter

**QueueDesk** lists four deterministic tickets, retrieves a ticket, and reports health.
Filtering, search, creation, and resolution are intentionally unfinished participant work.
See the [API contract and sample requests](workshop/project.md).

From the repository root, with the SDK specified in `global.json`:

```text
dotnet build Zero2Agents.slnx
dotnet run --project tests/QueueDesk.Checks --no-build
dotnet run --project src/QueueDesk.Api --no-build -- --urls http://127.0.0.1:5080
```

The dependency-free checks start their own API on an ephemeral loopback port, print PASS/FAIL,
and exit nonzero on failure. **`dotnet test` is not the test runner for this starter.**
Keep evidence in [your workshop work folder](workshop/work/README.md).
The primary editor path is **VS Code, Local harness, GitHub Copilot**; alternatives and access
fallbacks are in setup. [Official references](workshop/references.md) were checked **2026-11-01**.
