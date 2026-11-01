# Facilitator guide (not the student entry path)

Start students at [the root README](../../README.md) and [setup](../../workshop/setup.md).
Keep this directory out of their navigation and agent context. It contains facilitation
and [solution guidance](solutions.md), not precompleted features in the starter.

Audience: moderate Copilot users, familiar with commits, PRs and basic C#.
Teach development-agent design/management; do not turn this into prompting basics,
Azure deployment or an AI inference course. Recommended pairs, driver/reviewer swaps,
one facilitator per roughly 8-12 participants. Larger groups need a helper for access issues.

## Before the cohort

Use [cohort/access preparation](cohort-setup.md). Recheck
[official references](../../workshop/references.md), actual editor version/harness,
organization policy and feature rollout. Rehearse the **fallbacks**, not only the happy path.
Run a clean baseline build and all twelve checks using the SDK in `global.json`.
Refresh the SDK/action pins for security patches before a future delivery, not mid-lab.

Prepare separate private pair repositories or approved shared branches; ensure this
workshop release is on each pair repo's default branch. The source release being pushed
on a feature branch does **not** magically make templates/setup available on source main.
Do not merge/change source defaults merely to host a cohort.

Prepare checkpoint branches **in your facilitator/pair repository**, using solution
guidance: status-only, status+search, then creation. Do not distribute a solved capstone at
kickoff. Reference algorithms are below; checkpoints need actual build/check validation.
If a pair uses a checkpoint, have them mark inherited work in evidence.

## Run of show

| Time | Facilitation/checkpoint |
| --- | --- |
| 08:00-08:30 | Outcomes, roles, preflight. At 08:25 identify MCP/cloud fallbacks; don't wait until afternoon. |
| 08:30-09:30 | Lab 1. At 08:55 require human plan review; at 09:20 ask for executed invalid-input evidence. |
| 09:30-09:45 | Break. Help blocked pairs reach status checkpoint without solving later work. |
| 09:45-10:45 | Lab 2. At 10:15 verify actual role/tool discovery, not only YAML; at 10:40 check reviewer cannot claim execution. |
| 10:45-11:30 | Lab 3. At 10:55 route blocked MCP to fallback; at 11:20 challenge untrusted notes. |
| 11:30-12:00 | Applied governance. Require named control owners and a go/no-go before lunch. |
| 12:00-12:45 | Lunch. Confirm pair repos/checkpoints and independent reviewers ready. |
| 12:45-14:00 | Lab 4. At 13:05 start one task; at 13:30 stop stalled work; at 13:50 require independent checks. |
| 14:00-14:15 | Break. Supply validated creation checkpoint only to pairs that need it. |
| 14:15-14:45 | Evaluation. Keep four fixed inputs, one variable change, truthful missing-run scores. |
| 14:45-15:45 | Capstone. Plan approved by 14:55; implementation stops at 15:20; review by 15:35. |
| 15:45-16:00 | Two-minute selected demos, one measured improvement/limitation, cleanup and next-owner commitments. |

All times match the participant agenda. Don't compress human review to recover time;
drop stretch work first, then use a checkpoint or fallback.

## Facilitation prompts

Ask "Which executable check proves this criterion?" and "Which tool could still do harm
despite this instruction?" rather than grading prompt length.
Show the difference between **instruction**, **tool availability**, **approval** and
**sandbox/policy**. A shell-enabled reviewer isn't read-only just because edit is disabled.
Handoff buttons are suggestions; require written packets and actual owner transitions.

For E3, the injection text is synthetic local exercise data, not an accusation against
the Learn server. Observe response/tools; do not invite real exfiltration.
For E4, a correct refusal is a pass, not a lack of capability to "fix" with broad tools.

## Delivery and acceptance

Baseline acceptance: twelve checks and manual loopback homepage/health/list verified.
The original nine API/store checks remain; three checks cover frontend hosting.
Keep `wwwroot/workshop.json` flags false in the starter. After each completed stage,
have pairs enable only its flag and demonstrate the real endpoint through the frontend.
Feature acceptance: the exact [project contract](../../workshop/project.md), with independent
checks and no deleted baseline checks. Workflow acceptance: committed plan/contracts/handoff,
actual tools/refusals, measured evaluation and human verdict.
Use the [capstone rubric](../../workshop/capstone.md); no claims of production/security certification.
Hosted PR workflows are included for approved use but not automatically run on source push.
Do not enable Agent Merge, grant bypass rights or enforce new branch rules on participants.
