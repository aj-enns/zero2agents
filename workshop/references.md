# Official documentation and compatibility notes

**Checked: 2026-11-01.** These links were read while preparing this version.
Recheck before each cohort: VS Code and GitHub changed terminology/workflows in late October
2026. Screenshots/menu labels can vary by release, preview enrollment, account and policy.
This page documents source-backed behavior, not universal entitlement or a pricing quote.

## Editor agents and instructions

| Official source | What this workshop relies on |
| --- | --- |
| [VS Code harnesses](https://code.visualstudio.com/docs/agents/run/agent-harnesses) | Local is the built-in editor harness; Copilot uses its runtime; Cloud is an execution target. Choosing a model does not choose a harness. |
| [Planning](https://code.visualstudio.com/docs/agents/run/planning) | Plan or `/plan`; human plan review precedes implementation. Local Start Implementation submits immediately; Copilot plan controls differ. |
| [Custom agents](https://code.visualstudio.com/docs/agent-customization/custom-agents) | Workspace `.github/agents/*.agent.md`; YAML header plus Markdown body; read/search planner example; handoffs are Local-only. |
| [Agent file reference](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference) | `name`, `description`, `tools`, `target: vscode`, `handoffs` with label/agent/prompt/send. `send: false` waits for user submission. Target controls interpretation, not running harness. Tool inventory must be verified. |
| [Tool use](https://code.visualstudio.com/docs/agents/run/tools) | Local Configure Tools vs Copilot Customizations -> Tools. Availability and approvals are separate. Use completions for qualified identifiers. |
| [Custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions) | `.github/copilot-instructions.md` project guidance; `.github/instructions/**/*.instructions.md` uses `applyTo` relative glob. Discovery depends on harness/settings; not used for inline suggestions. |
| [GitHub repository instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions) | Repository-wide plus matching path instructions combine. Support varies by feature; don't assume every GitHub chat surface uses path-specific rules. |
| [GitHub custom-agent reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration) | Cloud/CLI tool aliases and namespace references; VS Code handoffs are ignored on GitHub. Omitted tools means broad defaults; unknown tools can be ignored. Do not blindly reuse a Local profile. |

We ship complete **inactive starter role templates**, not a finished API solution.
Participants author/activate roles in Lab 2 and verify discovery/tools.
Lab 4 can use the reviewer template without completing Lab 2.
Repository guidance is a bootstrap they refine.
We intentionally avoid multiple competing `AGENTS.md`/`CLAUDE.md` instruction hierarchies.

## Copilot CLI bonus lab

**Checked separately: 2026-11-02.** This does not re-date the other sources on this page.

| Official source | What optional CLI practice relies on |
| --- | --- |
| [Create CLI custom agents](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli) | Interactive `/agent`, then **N**; Project vs User location; generated profile review; explicit tool selection; restart to load. Personal profiles with the same ID override project profiles. `strict-tools-list: true` prevents default tools being added to the listed groups. Direct selection follows repository instructions; delegated subagents need `include-custom-instructions: true` to opt in. |
| [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) | Consult the installed version's available commands and custom-agent settings rather than assuming editor commands apply to CLI. |
| [CLI setup](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-getting-started) | Approved installation and sign-in prerequisites; availability is account/policy dependent. |

The requested `/create-agent` spelling was not established by the creation guide.
The lab uses it only if the participant's installed CLI lists it, otherwise the
documented `/agent` creation flow applies. The authoring machine's CLI launcher could
not start, so interactive creation and tool enforcement were **not locally verified**.
Participants inspect their own version, available command, loaded tools and responses;
they do not need to copy them into a log.
The worked example is inactive and illustrative, not execution evidence.

## Optional session-management lab

**Checked: 2026-11-02.** These sources support the
[optional session practice](labs/07-manage-agent-sessions.md). The two apps have different controls;
the lab does not require session transfer between them.

| Official source | What this lab relies on |
| --- | --- |
| [VS Code Agents window](https://code.visualstudio.com/docs/agents/run/agents-window) | Command Palette entry, new sessions, folder selection, session list, and changes view. Worktree sessions use Allow all; the lab instead uses read-only tasks in a shared folder with approvals. |
| [Manage VS Code sessions](https://code.visualstudio.com/docs/agents/run/sessions/manage-sessions) | Resume and monitor sessions; Mark as Done, Done filter, and Restore. Separate conversations do not isolate file changes. Local harness sessions are editor-only. |
| [GitHub Copilot app sessions](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions) | Sessions +, This computer, Current checkout, Interactive, Ask every time, and Settings > Sessions > Manage sessions. Session mode and tool permissions are separate. |
| [GitHub Copilot app overview](https://docs.github.com/en/copilot/concepts/copilot-surfaces/github-copilot-app) | Repository-based session lists and parallel workspaces. Availability depends on account and organization policy. |
| [VS Code agent controls](https://code.visualstudio.com/docs/agents/overview#stay-in-control) | Steer or stop requests; stopping does not undo completed actions. Worktrees are not security boundaries. |

The guided exercise uses actual session states. Learners do not need screenshots
or a written session record. If controls differ, use the approved app's current help.

## MCP and trust

| Official source | Relevant behavior |
| --- | --- |
| [Add MCP servers in VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers) | Guided installation, HTTP vs stdio, distinct destinations: portable `mcpServers` vs VS Code `servers`. VS Code-format destinations remain supported but are labeled deprecated in the guided flow. |
| [Manage/trust servers](https://code.visualstudio.com/docs/agents/run/manage-mcp-servers) | Workspace MCP inherits Workspace Trust and can start without a separate server prompt. Disable differs from stop. Per-server stdio sandboxing described here is macOS/Linux, not Windows. |
| [Microsoft Learn MCP overview](https://learn.microsoft.com/en-us/training/support/mcp) | Public Streamable HTTP `https://learn.microsoft.com/api/mcp`; no authentication or server charge; public docs only. Endpoint isn't a normal browser page. |
| [Learn tool reference](https://learn.microsoft.com/en-us/training/support/mcp-developer-reference) | `microsoft_docs_search`, `microsoft_docs_fetch`, `microsoft_code_sample_search`; discover current tools, don't assume stable request schemas. Only the first two are in scope. |
| [Repository MCP configuration](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers) | Admin-entered Settings -> Copilot -> MCP servers JSON with `mcpServers`, required `type` and `tools`; remote URL. Shared with code review; autonomous calls without per-call approval. Repository remote OAuth is unsupported as checked. |
| [Enterprise MCP allowlists](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) | Policies and managed allow/deny lists can restrict access. Documented custom-agent-profile coverage exceptions mean no claim of universal protection. |

This workshop installs **no MCP server automatically** and adds no GitHub repository MCP
settings. Examples are inert. Public read-only output is still untrusted; generic queries
still transmit text. The browser path teaches source checking, not MCP execution.
Neither path requires a research log.

## Hosted agents, review, network and cost

| Official source | Relevant behavior |
| --- | --- |
| [Copilot on GitHub](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) | New cloud experience from October 28 for paid plans subject to policy. Cloud sandboxes and Actions-based environments differ. Actions sessions have a 59-minute maximum; don't apply it to all environments. Write access is required for changes. |
| [Start on GitHub, including issue assignment](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github) | Assignees -> Copilot, target repo and starting branch. Existing issue context is supplied at assignment; later issue comments aren't automatically picked up. Some entry points need an explicit PR request. |
| [Configure Actions agent environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment) | `.github/workflows/copilot-setup-steps.yml`, single `copilot-setup-steps` job, default branch required. Applies to Actions sessions, not cloud sandboxes. |
| [Review Copilot output](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output) | Thorough human review; initiating human's approval may not count. Default workflows await approval; inspect workflow diffs first. |
| [Risks and mitigations](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) | Restricted working branch, human review protections, traceability and prompt-injection risks. Built-in security checks do not eliminate code defects. |
| [Firewall settings](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) | Copilot -> Internet access; organization/repo feature-specific controls. Enabled by default with recommended dependency allowlist. Not directly applied to MCP processes/setup steps, only within execution environment; not comprehensive protection. |
| [Billing and usage](https://docs.github.com/en/copilot/concepts/billing-and-usage) | Plan/organization allowances and usage policies vary. Consult the actual billing owner, not a fixed per-participant estimate. |
| [Sandbox billing](https://docs.github.com/en/billing/concepts/product-billing/cloud-and-local-sandboxes) | Cloud compute/memory and stopped snapshot storage meters; included compute can be shared with private Actions. AI credit budgets do not cap sandbox compute; stopping retains metered snapshot storage. |

GitHub's risk/mitigation page describes cloud-agent PR protections, while the newer cloud
surface offers additional modes and workflows. This workshop **requires its own human
review/no-auto-merge gate regardless of available product capabilities**; it does not
claim every Copilot surface is technically incapable of merge or broader actions.

## .NET and project contracts

| Official source | Use |
| --- | --- |
| [.NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core) | .NET 10 LTS; stay on security patches. SDK pin should be revalidated for each future cohort. |
| [.NET 10 SDK downloads](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) | SDK 10.0.300 minimum; use current stable .NET 10 SDK updates. |
| [SDK selection in global.json](https://learn.microsoft.com/en-us/dotnet/core/tools/global-json) | `latestFeature` selects the highest installed 10.0 feature band/patch at or above 10.0.300. Preview SDKs are disabled; other major versions are not selected. |
| [Minimal API responses](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/responses?view=aspnetcore-10.0) | JSON results, status codes, `Results`/`TypedResults`, Created/Problem response semantics. |
| [Minimal API parameter binding](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/parameter-binding?view=aspnetcore-10.0) | Query/body/service binding; framework binding is distinct from application validation. Test rejection behavior. |

Title lengths, status/priority casing, duplicate-query rejection, seed counts, ID allocation,
and idempotency are **workshop design decisions** in [project.md](project.md),
not claims that the framework enforces them automatically.

## Private cohort distribution

[Create from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
requires access to the template and offers default-branch or all-branch contents. Template
branches have unrelated histories; do not copy all branches and expect to merge workshop
checkpoints across them. Prefer the selected release on each developer's repository default branch.
Setup saves a local `workshop-start` reference after checking this starter.
The fresh-start path uses that reference in a separate worktree, preserving unfinished files.
[Fork permissions and visibility](https://docs.github.com/en/pull-requests/reference/forks)
depend on upstream visibility and private-fork policies. Private forks remain private and
cannot be created in a GitHub Free organization. They are not independent visibility copies.
