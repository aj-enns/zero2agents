# Setup and preflight

**Pre-work: 20-30 minutes before the day. In-room: 08:00-08:30.**
Start with this page; after the baseline succeeds, go to [Lab 1](labs/01-plan-to-agent.md).

## Choose your path

The primary path is **desktop VS Code, GitHub Copilot, Local harness**. Use a current stable
VS Code and the Microsoft-published C# and GitHub Copilot extensions permitted by
your organization. C# Dev Kit is optional where licensed/approved; the CLI build/check
path does not require it. Sign in with the account that can access the workshop repository.
Check [official setup](https://code.visualstudio.com/docs/setup/copilot) and
[harness requirements](https://code.visualstudio.com/docs/agents/run/agent-harnesses).
If the Session Target control is present, explicitly select **Local** in a new chat.
In older VS Code versions without the harness control, the existing built-in editor Agent
experience is the intended path; confirm Plan and custom-agent support before proceeding.

| Path | What changes |
| --- | --- |
| VS Code Local (primary) | Plan -> Agent; `.agent.md` with `target: vscode`; Local handoff buttons; `.vscode/mcp.json` with `servers`. |
| VS Code Copilot harness on your machine | `/plan`, then review/approve; use runtime-compatible tools. Local `handoffs` are not supported; transfer the written handoff manually. MCP uses a different destination/format. |
| Visual Studio, JetBrains, CLI, or Copilot app | Optional, only if already configured. Have the facilitator verify instructions, agents and tools in that surface. Use written plans/handoffs where UI parity is absent. These are not click-for-click substitutes. |
| No usable Copilot access | Pair with an entitled participant, or implement/review manually. Record that agent execution/evaluation was not demonstrated. Never share accounts or tokens. |

Changing the model does not change the harness or permissions. In this workshop, use normal
per-action approvals; do not enable blanket approval, Autopilot, or unattended delegation.
Read [surface details and checked sources](references.md).

## Repository and access

The source, **aj-enns/zero2agents**, is private. A URL alone does not grant access.
The facilitator must grant approved access or supply a permitted private team copy.
Do not make it public to work around access controls.

Prefer a **separate private repository per pair** with this starter on its default branch.
Use **Use this template** only if the owner has marked the repository as a template and the
destination visibility/owner are approved. Private forks require repository/organization
forking permission, remain subject to private-network visibility rules, and are not a
guaranteed fallback. If neither is offered, ask the facilitator for a private copy, or use
the approved shared cohort repository with a distinct pair branch.
An offline approved checkout still supports local handoff and review.

Clone the **assigned pair/cohort URL**, not an invented public fork:

```text
git clone <your-assigned-private-repository-url>
cd <your-checkout-folder>
git switch -c workshop/<pair-name>
```

Run commands from the repository root. Keep work on this branch through the morning.
Commit checkpoints so you can return to a known state without discarding work.
Do not change the source repository's default branch or overwrite another pair's branch.
The private source's workshop release may be on a published feature branch; use the
facilitator's specified release commit when making a copy.

## SDK and baseline

Install the **.NET SDK 10.0.403**, not only the runtime, from
[Microsoft's .NET 10 downloads](https://dotnet.microsoft.com/en-us/download/dotnet/10.0).
.NET 10 is LTS; `global.json` pins the 10.0.4xx feature band, allowing only later patch
versions in that band (`latestPatch`), with previews disabled.
Install current security patches in that band; the facilitator should update the pin and
revalidate before future cohorts. .NET 8/9 do not satisfy this workshop.

```text
dotnet --version
git status --short
dotnet build Zero2Agents.slnx
dotnet run --project tests/QueueDesk.Checks --no-build
```

Expect SDK **10.0.403** (or a later 10.0.4xx patch), a successful build and **9/9 checks**.
No external packages are referenced; the SDK supplies ASP.NET Core and the check runner.
`dotnet test` is not used: a successful no-test invocation is not workshop evidence.
If the SDK cannot be found, install the matching SDK and restart your terminal/editor.
If loopback is blocked by endpoint policy, involve the facilitator rather than disabling protection.

Start the API in another terminal:

```text
dotnet run --project src/QueueDesk.Api --no-build -- --urls http://127.0.0.1:5080
```

Open `http://127.0.0.1:5080/health` and `http://127.0.0.1:5080/tickets`.
Expect `{"status":"ok"}` and four tickets. Stop it with Ctrl+C when finished.
If 5080 is occupied, use an available loopback port consistently in your manual requests.
Automated checks choose an ephemeral port and do not require this server.
Do not expose the unauthenticated training API on `0.0.0.0` or a public tunnel.

## Copilot, cloud and MCP preflight

Check these **before** waiting for a tool in a lab:

| Capability | Evidence to collect | If unavailable |
| --- | --- | --- |
| Copilot | Entitlement/assigned seat, permitted model and agent features, SSO if required; a repo question answered in your editor | Pair or manual path; do not assume Free includes the day's hosted features. |
| Plan and custom agents | Local Plan visible; workspace instructions discoverable; custom-agent authoring command available | Written plan plus explicitly selected Agent; record missing configuration support. |
| GitHub-hosted agent | Write access to the pair repo, policy permits Copilot in the cloud, Actions-based execution available, Actions/setup downloads permitted, billing owner and limits known | Lab 4's local handoff is a full review exercise, **not equivalent cloud execution**. |
| Human PR review | A second reviewer with appropriate repo permissions, branch/ruleset compatibility, ability to inspect workflows before approval | Review the committed local diff; keep the human gate. |
| MCP | Admin permits Microsoft Learn endpoint and read-only documentation tools; review terms and configuration before trusting/starting | Lab 3's no-MCP research path. No tokens, local runtimes or other MCP servers needed. |

Since **2026-10-28**, GitHub's newer paid-plan cloud experience can offer cloud sandboxes
alongside GitHub Actions-based sessions. Issue assignment still uses GitHub Actions per the
checked repository MCP documentation. Do not confuse VS Code Local, Copilot on a local
machine, cloud sandbox, and Actions runner.

No universal entitlement or fixed workshop price is promised. Have the billing owner
approve usage limits. Copilot AI usage, private-repo Actions/hosted compute, and sandbox
compute/memory/snapshot storage can have distinct meters. One task per pair, normal model
selection, 25-minute execution limit and at most two repairs keep experimentation bounded,
but **time limits are not monetary caps**. Do not provision cloud resources to participate.

## 08:00-08:30 kickoff checkpoint

Use 10 minutes for outcomes/roles, 15 for baseline and access checks, 5 for your work record.
Create a personal record from [the evidence template](templates/evidence.md) in
`workshop/work/<pair-name>/evidence.md`. Record version, model, harness, commit,
enabled capabilities, fallback path and agreed owner/budget. Keep all data synthetic.
Definition of ready: baseline passes, a working branch exists, and you know which execution
and fallback paths are permitted. Continue to [Lab 1](labs/01-plan-to-agent.md).
