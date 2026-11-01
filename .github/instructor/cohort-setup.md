# Cohort repositories, permissions and fallbacks

[Facilitator guide](README.md) | [Solutions](solutions.md)

## Private release distribution

The source `aj-enns/zero2agents` is private. Publication of the initial workshop is on the
reported release branch/commit, not a requested merge or PR. Give authorized facilitators
access and select that commit explicitly when preparing copies.

Prefer one **private repo per pair**, owned by the approved organization/account with a
known billing owner. Copy the release into each default branch before the day.
Do not copy secrets, external code or personal settings; this starter has none.
If the owner elects to mark it as a template, that is an administrator action outside
this initial build. Verify **Use this template** is offered to the actual students.
Private forking depends on enterprise/org/repo policy; don't promise personal private forks.
An approved archive or local copy can support local-only paths if forking is unavailable.

For a shared cohort repository, assign distinct `workshop/<pair>` branches and explicit
base branches in every remote task; never let two agents write the same branch concurrently.
Preserve source visibility and existing policies. No automated collaborator grants, ruleset
changes, template setting or default-branch changes are performed by this repository.

## Access checklist (test with representative participant accounts)

Repository read/write access, SSO authorization, Copilot seat/plan and model policy,
cloud-agent/Copilot-in-the-cloud enablement, agent-compatible branch/ruleset constraints,
Actions permission, permitted setup SDK downloads, independent reviewer, and usage owner.
Confirm actual issue **Assignees -> Copilot** availability before scheduling hosted work.
Default branch needs the initial release and Actions `copilot-setup-steps.yml`.

The setup job installs the pinned SDK, builds and runs baseline checks with read-only
repository permissions. It requests no secrets, cache, deployments or broad network rules.
It applies only to **GitHub Actions-based** sessions. A cloud sandbox has a different setup
contract; don't assume this workflow installs its SDK.
Actions can be charged for private repo usage; get approval before manually running jobs
or triggering participant PR checks. No source-push CI trigger is configured.
Review the pinned official actions and logs in a representative runner before delivery.
The local validation of the initial workshop does not prove your organization's hosted access.

Recommend default-branch protections and required independent human approval/checks through
the administrator, without forcibly applying them. The initiating human's Copilot PR approval
may not count; unattributed Copilot PRs can have additional review requirements.
If rules block the exercise, use a different approved cohort repo or the local diff fallback,
not a bypass or relaxed protection.

## Fallback ladder

| Blocker | Keep learning moving |
| --- | --- |
| Source private access/fork/template | Supply an approved private repo/copy at the release commit; do not expose source publicly. |
| SDK download/install blocked | Preinstall approved matching SDK before cohort; managed machine/pairing if prohibited. Don't silently retarget to unsupported SDKs. |
| Copilot seat/model unavailable | Pair driver uses their own entitled account; no token/account sharing. Otherwise manual plan/implementation with missing agent outcome disclosed. |
| Local custom-agent/handoff UI unavailable | Written role contract and explicit tool selection; manual packet transition; record configuration capability not demonstrated. |
| MCP blocked | Public browser excerpts with provenance, or pre-reviewed cached official excerpts. Complete injection/provenance task; mark no tool execution. |
| Issue assignment/hosted access blocked | Fresh local Agent chat gets only saved issue/repo context; human-authored draft PR if permitted, otherwise committed local diff review. |
| Hosted setup/firewall/usage limit | Stop task, record error/log and switch local. Never disable firewall, create tokens or buy resources. |
| Slow/unfinished earlier feature | Validated facilitator checkpoint at that stage; pair identifies inherited code and still owns review/evaluation. |

## Checkpoints and cleanup

Prepare and validate status/search/creation checkpoints in your own approved cohort repo.
Use [solutions.md](solutions.md) only during prep or an explicit unblock; do not inject
all solution guidance into participants' agent context.
Keep stages independently reviewable and preserve all twelve baseline checks.
Include the stage's `wwwroot/workshop.json` flag only after its API contract passes;
do not ship future-stage flags enabled in an earlier checkpoint.
At 16:00 stop hosted execution; retained sandbox snapshots can still meter storage.
Have the owner apply retention/cleanup policy deliberately, not mass-delete participant work.
