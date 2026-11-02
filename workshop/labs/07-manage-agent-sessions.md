# Bonus Lab 7: Manage agent sessions

**Expected completion time: 20-30 minutes** | [Previous: Bonus Lab 6](06-cli-agent.md)

This lab is optional work after the core workshop. You can take it without completing
Bonus Lab 6; the 08:00-16:00 agenda is unchanged.

## Goal

Run two small agent tasks, track their progress, guide their work, and review the results.
Choose **VS Code's Agents window** or the **GitHub Copilot app**. You do not need both.
A session is a task's workspace and conversation; it is not the same as a custom agent role.

## Prerequisites

- Complete [setup and preflight](../setup.md) and [Lab 2](02-agent-design.md).
- Use an already configured, approved app and your workshop checkout.
- Finish any running edits or builds. Save your work and note `git status --short`.
- Keep normal tool approvals. Do not enable Autopilot, blanket approval, cloud execution,
  automations, or Agent merge for this exercise.

Labels vary by version and account. If neither interface is available, skip this lab
and record that session management was not demonstrated. Do not install software or
change policy to continue.
See the [session-management references](../references.md#optional-session-management-lab).

## Steps

### Step 1: Open your session list

**1.1** Choose VS Code's Agents window or the GitHub Copilot app. Follow only your
chosen app's instructions below.

**1.2** Open the session list:

| App | Action |
| --- | --- |
| VS Code | Open the workshop folder. In the Command Palette, run **Chat: Open Agents window**. |
| Copilot app | Open the app and find the workshop repository in the sidebar. If needed, use **Sessions +**, then **Open local folder** to select your checkout. |

**1.3** Find the workshop repository and its sessions in the left sidebar.
Check the folder path; another session may use a different checkout.

**Expected result:** you know which repository and checkout your tasks will use.

> **Image placeholder 1:** session list in your chosen app.
<!-- Capture one image per supported path: VS Code Agents window and Copilot app.
Show the workshop repository, session list, and new-session control. Add arrows naming
these three areas. Use a neutral workshop label; crop account details and unrelated repositories. -->

### Step 2: Start a bounded task

**2.1** Start a session in your workshop checkout:

| App | Action |
| --- | --- |
| VS Code | Select **New**, then **Folder**, and choose the checkout. Select the **Copilot** harness, not the editor-only **Local** harness. Leave **New Worktree** off and do not switch branches. |
| Copilot app | Select **Sessions +** and the workshop repository. Choose **This computer** and **Current checkout**. |

**2.2** Select **Interactive** mode and an approved model.

**2.3** Set tool permissions. In VS Code, choose a permission level that asks before
tool actions. In the Copilot app's mode menu, open **Tool permissions** and select
**Ask every time**. Interactive mode alone does not enforce read-only access.

**2.4** Paste this prompt into the session input and send it:

```text
Read workshop/project.md. Summarize the existing ticket fields and response codes
in at most six bullets, with file references. Do not change files, run commands,
use network tools, or start other agents. Report anything you cannot verify.
```

**2.5** Use the session's rename action to name it **Ticket contract**.

**2.6** Review any tool requests. Approve only reads needed for this task.

**Expected result:** one named session works on a short, source-backed summary without edits.

> **Image placeholder 2:** new-session settings before sending the prompt.
<!-- Capture VS Code with Folder, Copilot harness, Interactive, approval level, and
New Worktree off. Capture the app with This computer, Current checkout, Interactive,
and Ask every time. Show the bounded prompt. Use two crops if the permission menu
hides the other settings. Do not show credentials or billing details. -->

### Step 3: Add an independent task

**3.1** In the same app, repeat **2.1-2.3** to start a second session.
Use the same checkout, mode, model, and approval settings.

**3.2** Paste this prompt into the new session and send it:

```text
Read tests/QueueDesk.Checks/Program.cs. List three baseline checks and explain
what each proves, with file references. Do not edit files, run checks or other
commands, use network tools, or start other agents. Keep the answer under 150 words.
```

**3.3** Name the second session **Check map**. Approve only reads needed for its task.

**3.4** Select **Ticket contract** in the sidebar, then select **Check map**.
Confirm that each opens its own conversation. If the first is still running,
leave it running while you inspect the second.

**Expected result:** two separate conversations cover different tasks. Separate chats
do not isolate files: these sessions share a checkout. Only read-only work may overlap
here. For future parallel edits, use separate worktrees and review their permission
settings first. A worktree is a separate working copy, not a security boundary.
VS Code's documented worktree mode uses **Allow all**, so it is outside this lab.

### Step 4: Check progress and guide a session

**4.1** Select each session. Read its latest messages and any tool or approval requests.

**4.2** Note whether each session is working, waiting for your input, or finished.
Use what the app actually shows. If it finishes too quickly to observe a running state,
record that; do not invent one.

**4.3** Select **Ticket contract**. If it is still running, use **Stop** before
continuing. If it has finished, keep the same session open.

**4.4** Send this follow-up in **Ticket contract**:

```text
Narrow the summary to GET /tickets and GET /tickets/{id}. Keep the same
read-only limits. Separate behavior you found in code from proposed lab features.
```

**4.5** Read the revised answer. Check that it covers only the two requested endpoints
and separates existing behavior from proposed features. Do not grant extra permissions
to get past a blocked tool.

**Expected result:** the revised answer stays within scope and retains the session history.
Stopping a request does not undo actions already taken. If Stop was not needed, record
that it was not demonstrated.

> **Image placeholder 3:** two named sessions and one follow-up.
<!-- Capture each app's sidebar with Ticket contract and Check map. Show a real
status or input request and the scoped follow-up in the active conversation.
If possible, capture Stop during a running response in a second crop. Do not
stage a blocked state or label a finished response as running. -->

### Step 5: Review and save the handoff

**5.1** Open each session's changes view and confirm there are no edits.
If an agent edited files, stop and inspect the diff yourself. Ask Copilot for a
read-only review and check its findings; do not discard unrelated work.

**5.2** In your own terminal at the repository root, run:

```text
git status --short
```

Compare the output with your starting state. Expect no new changes yet.

**5.3** Open the cited files in your editor. Check one claim from each answer against
the source. A summary is not proof that checks ran.

> **Image placeholder 4:** review evidence before putting sessions away.
<!-- Capture the selected session's empty changes view and a short source-backed
answer in each app. Keep source references legible. Capture before creating the
evidence file so that the empty view is accurate. Exclude unrelated chat history. -->

**5.4** Create `session-management.md` in
[your workshop work folder](../work/README.md). Record the app/version, two session
names, observed states, your correction, one verified claim per session, and any
missing controls.

**5.5** Add a short handoff: result, limits, and next owner. Note whether you used
Stop or did not demonstrate it. Save the file; it should be your only new file
from this exercise.

**Expected result:** a fresh agent session can tell what each agent did, what you checked,
and what remains unverified.

### Step 6: Put finished sessions away

**6.1** Confirm both sessions have finished and your evidence file is saved.
Preserve any useful files before archiving; archiving can remove session worktrees.

**6.2** Put only the two exercise sessions away:

| App | Action |
| --- | --- |
| VS Code | Use **Mark as Done** for **Ticket contract** and **Check map**. |
| Copilot app | Open **Settings > Sessions > Manage sessions**. Find **Ticket contract** and **Check map**, then choose **Archive**, not Delete. |

**6.3** Find the sessions again. In VS Code, select the **Done** filter; use
**Restore** if you need to continue. In the Copilot app, use the filters in
**Manage sessions** to find the archived sessions.

**Expected result:** the sessions leave the active list, but their history remains available.
Do not delete sessions, clean up other people's work, or change automatic cleanup settings.

## Completion checks

- You can find two named sessions and explain each task's scope.
- You checked actual progress and handled a follow-up or input request.
- You verified one claim per result and confirmed no agent edits.
- Your saved handoff names the app, limits, and anything not demonstrated.
- You can find the completed or archived sessions without deleting them.

## Next lab

Return to the [workshop overview](../../README.md#optional-bonus-labs), or try
[Bonus Lab 6: Create a ticket-triage agent in Copilot CLI](06-cli-agent.md).
This exercise does not authorize parallel edits.
