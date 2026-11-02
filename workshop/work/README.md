# Save your work, not a log

The four labs do not require files in this folder.
Keep plans and answers in the chat where you use them. Read command output in the
terminal. Inspect code and instructions in Source Control.
You do not need to copy these into notes or fill out a form.

Save useful project files: code, checks, instructions and agent profiles.
Optional personal notes are fine, but are not completion requirements.
Never commit secrets, personal settings or sensitive chat history.

## Check in after each lab

A **Git commit** saves a local checkpoint. **Push** sends commits to GitHub.
The main workshop needs commits, not pushes.
Saving an editor file with **Ctrl+S** is not a commit.

**1.1** Save your files. In VS Code, open **Source Control**.
Select each changed or new file and inspect it.
For code changes, build and run the project's checks before accepting the feature.
An unfinished exercise may be saved, but it is not a passing feature.

**1.2** Stage only the exercise files you reviewed with the **+** beside each file.
Do not stage unrelated work, personal settings, local MCP configuration or secrets.
Review **Staged Changes** before committing.

**1.3** Enter the lab's suggested message and select **Commit**.
If you are saving incomplete work, use a message such as `Save unfinished Lab 1`.
Do not select **Sync Changes**.
If there are no file changes, keep the existing checkpoint; do not create an empty
commit or a note file just to have something to save.

**1.4** In the terminal, paste:

```powershell
git log -1 --oneline
git status --short
```

Expect your commit message and no remaining intended exercise files.
Unrelated changes may remain; do not discard them.
If a commit fails, ask the facilitator about the error.

That is the checkpoint. There is no separate evidence commit.

**Continue:** [Workshop overview](../../README.md).
