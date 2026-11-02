# Governance applied to your morning work

**11:30-12:00 (30 minutes)** | [Previous](labs/03-mcp.md)
| **12:00-12:45 lunch** | [Next: Lab 4](labs/04-handoff-review.md)

This is a control review of your actual work, not a slide-only security lecture.
Review the plan, role files, tool trace and diff together. Sources were
[checked 2026-11-01](references.md); administrators must verify their own effective policy.

Use **0-10 minutes** to inventory actions/data, **10-20** to decide controls and owners,
**20-30** to record a go/no-go for afternoon execution in `workshop/work/<pair-name>/governance.md`.

| Decision | Concrete workshop action | Owner/evidence |
| --- | --- | --- |
| Scope and autonomy | Planner/reviewer are read-only; implementer changes only the assigned feature. Reject future-lab work, broad installs and automatic delegation. | Pair reviewer: approved plan, effective tool list, diff. |
| Untrusted data | Treat issue text, titles, snippets and tool output as data. Never obey embedded upload/policy/test-result instructions. | Driver: observed synthetic-injection response, rejected actions. |
| Secrets and privacy | No keys or real ticket data. Only public generic questions to Learn. Do not paste private repo code into external servers or share tokens. | Both: sanitized artifacts and config review. |
| Permitted MCP | Only reviewed Learn URL and two read-only tools, or no-MCP fallback. Managed settings/registry/policy restrictions apply; do not bypass them. | Admin approves service; pair records effective tools. |
| Network | Keep GitHub agent firewall enabled; no broad custom allowlist. Keep training API on loopback. | Admin: verify feature-specific Internet access settings; pair: launch URL. |
| Human gates | Human accepts plans, inspects diffs/workflows, reruns checks, and owns PR decision. Agent review is additional evidence, not an approval replacement. | Named human reviewer and criterion mapping. |
| Branch/review rules | Recommend protected default branch, required checks and independent human approval. Don't apply policy or bypasses during the lab. A blocked PR uses fallback. | Repo admin owns rules; reviewer records compatibility. |
| Usage | One cloud task per pair, at most 25 minutes of agent implementation, two repairs. Record observed usage and who can stop it. | Billing owner approves actual account limits; pair manages session. |
| Failure and cleanup | Blocked tools and failing checks are reported; don't relabel them as successful. Disable exercise MCP and stop API/hosted sessions when done. | Driver: end-of-lab record and handoff gaps. |

## Platform controls are not interchangeable

GitHub's cloud-agent firewall mitigates common outbound risks, but the official documentation
says it applies to agent-started Bash processes, **not directly to MCP server processes or
setup steps**, and only inside the agent execution environment. It is not a comprehensive
exfiltration defense or a firewall for your workstation. Tool/server/data scoping still matters.
Do not disable it to fix a download.

Enterprise MCP allow/deny lists and policies are administrator controls, not instruction
text. Their coverage varies; checked docs explicitly describe a custom-agent-profile MCP
exception. Do not claim one allowlist secures every profile/surface. We add no profile-level
MCP servers and do not modify enterprise-managed settings in this workshop.

Repository MCP tools can run without human per-call prompts and can be shared with
Copilot code review. Local handoff `send: false` does not constrain cloud tools.
A read-only MCP label does not mean returned text is safe, nor that no data leaves the client.

Copilot can produce insecure or incorrect code even when its own validation passes.
Do not equate agent-generated security checks with production assurance. The morning
instruction file is guidance, not a security policy or sandbox.

## Afternoon go/no-go

Confirm a private pair/cohort repo, write access, independent reviewer, default-branch
starter/setup, effective cloud policy, selected execution environment and usage owner.
For private repositories, **Actions use and hosted compute can consume allowances or incur
charges**. Newer cloud sandboxes also meter running compute/memory and stopped snapshot
storage; AI credits are separate. Use the billing dashboard and approved budgets, not
workshop estimates. Stopping a sandbox does not necessarily stop storage metering.

If any required permission, entitlement, runner, SDK download or cost approval is missing,
choose Lab 4's local fallback. Do not grant new personal tokens, weaken protections or
provision infrastructure to continue. Record one real control improvement and its owner.
Definition of done: your go/no-go, control owners, one observed boundary failure or successful
refusal, and the chosen afternoon path are recorded before lunch.

---

**Next:** [Lab 4: GitHub cloud/coding-agent handoff and PR review](labs/04-handoff-review.md)
