# Optional practice: Manage two read-only sessions

**Allow 20-30 minutes after the four primary labs.**
[Workshop overview](../../README.md)

## Goal

Find two agent tasks, check their progress, guide one task, and inspect both answers.
A **session** is a workspace and conversation, not a custom agent role.

## Prerequisites

Complete [setup](../setup.md). No earlier lab is required.
Use either VS Code's Agents window or an already approved GitHub Copilot app.
You do not need both. If neither is available, skip this optional exercise.
Do not install software or change policy to continue.

Finish any active edits/builds. Keep normal approvals.
Both tasks use one checkout for **read-only work**; do not run parallel editing
agents here. Separate chats do not isolate file changes.
No session log or handoff file is required.

## Steps

### 7.1: Find the session list

**7.1.1** Open your chosen app:

| App | Where to go |
| --- | --- |
| VS Code | Command Palette > **Chat: Open Agents window**. |
| Copilot app | Open the workshop repository in the sidebar. If needed, use **Sessions + > Open local folder**. |

**7.1.2** Check the checkout path and session list. In your own terminal,
run `git status --short` and leave the output visible.
It is the comparison point for later; do not copy it into a file.

**Expected result:** you know which folder the tasks will read.

### 7.2: Start two small tasks

**7.2.1** Create the first session:

| App | Settings |
| --- | --- |
| VS Code | **New > Folder**, choose the checkout, select **Copilot** harness, leave **New Worktree** off, and choose **Interactive** with approvals for tool actions. |
| Copilot app | **Sessions +**, select the repo, **This computer > Current checkout**, then **Interactive** and **Tool permissions > Ask every time**. |

Do not switch branches or use blanket approval.
Interactive mode alone does not enforce read-only tools.

**7.2.2** Paste:

```text
Read workshop/project.md. Summarize the existing ticket fields and response codes
in at most six bullets, with file references.
Do not edit files, run commands, use network tools or start other agents.
Separate existing behavior from optional feature contracts.
```

**7.2.3** Name it **Ticket contract** using its session menu if available.
If renaming is unavailable, keep the displayed name.
Approve only reads needed for the task.

**7.2.4** Create a second session with the same checkout and approval settings.
Paste:

```text
Read tests/QueueDesk.Checks/Program.cs.
Explain three baseline checks and what each proves, with file references.
Keep the answer under 150 words.
Do not edit, run commands, use network tools or start other agents.
```

Name it **Check map** if the rename control is available.

**Expected result:** two separate conversations cover different read-only tasks.
Worktrees can isolate future edits, but are not security boundaries.
This optional exercise does not authorize parallel writes.

### 7.3: Check progress and guide one task

**7.3.1** Select each session. Look at its actual messages and approval requests.
Is it working, waiting for input, or finished?
If both finished quickly, that is fine; do not invent a running or blocked state.

**7.3.2** Open **Ticket contract**. If it is still running, use **Stop**.
Send this follow-up in the same session:

```text
Narrow the answer to GET /tickets and GET /tickets/{id}.
Keep the read-only limits. Separate current code behavior from proposed features.
```

**7.3.3** Check the revised answer. It should cover only those routes and keep the
earlier context. Stopping a response does not undo actions already taken.
Do not broaden permissions to get past a blocked tool.

**Expected result:** you can find a task and steer it without starting over.

### 7.4: Verify and finish

**7.4.1** Open each session's changes view. Expect no exercise edits.
In your terminal, run `git status --short` again and compare with the earlier output.
If an agent changed files, stop and inspect the diff. Do not discard unrelated work.

**7.4.2** Open the cited files and verify one claim from each answer.
A summary of checks does not mean the agent ran them.

**7.4.3** After both tasks finish, put only these exercise sessions away:

| App | Finish and find again |
| --- | --- |
| VS Code | **Mark as Done**, then find them with the **Done** filter. Use **Restore** to continue if needed. |
| Copilot app | **Settings > Sessions > Manage sessions**, then **Archive**, not Delete. Use its filters to find archived sessions. |

Preserve any unexpected useful work before archiving.
Do not delete sessions or change someone else's work.
If a control is unavailable, leave the session and ask the facilitator.

**7.4.4** Follow the [checkpoint guide](../work/README.md#check-in-after-each-lab).
This read-only exercise normally has no file changes: keep the existing commit.
Do not create notes or an empty commit to prove you finished.

## Completion checks

- You can find both tasks, inspect their status and send a focused follow-up.
- One claim from each answer matches the source.
- No unexpected file changes remain unexplained.
- Finished sessions can be found again. No output log is required.

## Next lab

Return to the [workshop overview](../../README.md), or try the
[optional CLI exercise](06-cli-agent.md).
