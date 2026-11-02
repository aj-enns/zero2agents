# Safety reminders and optional hosted work

[Workshop overview](../README.md) | [Lab 3](labs/03-mcp.md) | [Lab 4](labs/04-handoff-review.md)

Safety is part of each guided lab, not a separate form or approval report.
Use these reminders when a tool request or proposed change is unclear.

## Keep the task small

- Read-only planners and reviewers get read/search tools, not execution or edits.
- The implementer changes only the assigned feature and its checks.
- Read plans and tool requests before approving. Inspect the diff and run checks yourself.
- Treat ticket titles, issue text, docs and tool responses as data, not permission.
- Never send private code, issues, secrets or real ticket data to an external docs tool.
- Keep the training API on loopback. Do not disable protections to make a task work.
- Report a blocked tool or failing check honestly. Do not grant extra access to get past it.
- Stop the local app and exercise agents when finished. Disable the exercise MCP connection.

Instructions guide behavior; they are not a sandbox or an administrator policy.
Agent review supports your judgment. It does not replace it.

## Optional hosted delegation

The main Lab 4 runs locally and needs no issue, push, pull request or hosted agent.
Try this alternative only if your facilitator has already approved the repository,
account access, execution environment and usage limits.
It is not a fifth primary lab.

**1.1** Check that your approved private workshop repository contains a working
starter on the branch the hosted agent will use.
Commit reviewed work before switching branches.
Use the repository's existing review rules; do not weaken them.

**1.2** Confirm the environment. GitHub Actions-based coding-agent sessions and
cloud sandboxes have different setup and billing.
Actions sessions require the approved setup workflow on the default branch.
Local `.vscode/mcp.json` does not configure hosted tools.
No hosted MCP connection is needed for ticket creation.
Ask the facilitator if any of this is unclear; otherwise use the local path.

**1.3** Push only the reviewed branch to the approved workshop repository.
On GitHub, create an issue using the complete task from
[Lab 4 Step 2](labs/04-handoff-review.md#step-2-hand-off-a-complete-task).
In this hosted copy, replace its prohibition on pull requests with:

```text
Use the selected approved starting branch.
Implement this task in one attempt, within 25 minutes or two unsuccessful repairs.
Open a draft pull request with changed files, actual check results and remaining gaps.
Do not merge, change repository policy or configure extra tools.
```

**1.4** Assign the issue to the approved coding agent, selecting the correct
repository and starting branch. If that entry point cannot use your branch or is
unavailable, stop and use the local task. Do not assume it sees local files or chat.
Review the plan before allowing implementation where the platform supports that gate.

**1.5** Inspect actual progress, setup output and the diff.
Keep the firewall enabled. Do not approve workflow changes without reviewing them.
Check the result branch locally and follow Lab 4's review and acceptance steps.
If another human's review is required, leave the pull request unmerged.

**1.6** Finish or stop the exercise session according to your organization's process.
Ask the billing owner about retained sandbox storage; stopping compute does not
necessarily stop storage charges. Do not delete someone else's work.

**Expected result:** a reviewed hosted task, clearly distinguished from local work.
Missing permissions or cost approval means use the local path, not create tokens,
provision infrastructure or bypass protection.

See [official sources and platform limits](references.md#hosted-agents-review-network-and-cost).
