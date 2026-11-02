# Your workshop evidence

Save your workshop notes in `workshop/work/` on your working branch.
No extra folder is needed. Commit useful notes and results with your checkpoints,
but leave out personal or sensitive information.

## Check in after each lab

Before moving on, save and review the lab's files, then make a **Git commit**
on the branch named in that lab. A commit saves a local checkpoint.
Saving with **Ctrl+S** does not check files in; **push** sends commits to GitHub
and is needed only when the lab says so.

**1.1** Save all intended files in VS Code. Complete the lab's checks and record
actual results. If work is blocked or incomplete, say so in your notes; a commit
does not make it a passing result.

**1.2** Open **Source Control**. Inspect each changed and new file, including
code, checks, instructions, agent profiles, frontend settings and work notes.
Stage only the files for this lab. Leave unrelated work, secrets, personal settings
and ignored local configuration unstaged. Do not use **Stage All** without reviewing
every file.

**1.3** Review **Staged Changes**. Enter the lab's suggested message, or
`Save Lab N checkpoint` with the lab number, then select **Commit**.
Do not select **Sync Changes** or push unless the lab asks for it.

**1.4** In your terminal at the repository root, run:

```text
git log -1 --oneline
git status --short
```

Expect your new commit message and no remaining intended lab files in Source Control.
Unrelated pre-existing changes may remain; do not discard them.
If the commit fails, report the error and fix it before moving on.

## Files to keep

| Artifact | Created in |
| --- | --- |
| `evidence.md` from the evidence template | Setup, updated throughout |
| `lab-01-plan.md` | Lab 1 |
| `agent-contracts.md` from the agent contract template | Lab 2 |
| `lab-02-plan.md` and `handoff.md` | Lab 2; update the handoff in Lab 4 |
| `mcp-research.md` with path, citations and tool evidence; `mcp-untrusted-input.md` | Lab 3 |
| `governance.md` with control owners and decisions | Governance checkpoint |
| `creation-issue.md` | Lab 4 |
| `evaluation.md`, `planner-before.md` and `planner-after.md` | Lab 5 evaluation |
| `session-management.md` with session names, observed states, and handoff | Optional Bonus Lab 7 |
| `capstone-plan.md`, `capstone-handoff.md` and `demo.md` | Capstone and wrap-up |
| `cli-agent.md` and `triage-input.md` | Optional Bonus Lab 6 |

Templates are in [../templates](../templates/evidence.md).
For optional completed reference artifacts, see [worked examples](../examples/README.md).
Examples are separate from your evidence; never copy illustrative observations as actual results.
Never commit credentials, raw sensitive chat logs, billing details, or data from external
repositories. Prefer short excerpts and exact local command results over full transcripts.
Agent role files belong in `.github/agents` only when you intentionally activate them.
These templates are **not active agents, instructions or MCP configuration**.
Keep evaluation profile snapshots in this work folder, not `.github/agents`,
so they do not activate extra agents. The Lab 3 unsafe-input file contains synthetic
exercise data, not instructions to follow.
