# Save your work, not a log

The four labs do not require files in this folder.
Keep plans and answers in the chat where you use them. Read command output in the
terminal. Inspect code and instructions in Source Control.
You do not need to copy these into notes or fill out a form.

Save useful project files: code, checks, instructions and agent profiles.
Optional personal notes are fine, but are not completion requirements.
Never commit secrets, personal settings or sensitive chat history.

## Check website features

Open `src/QueueDesk.Api/wwwroot/workshop.json`.
Use the [feature table](../project.md#frontend-and-feature-switches) to match each
flag to its endpoint and browser check.
Enable a flag only when that endpoint exists, its acceptance checks pass and you
have reviewed and accepted the code. A passing baseline alone is not enough.
Keep accepted features enabled; leave missing, failing or unverified features disabled.
Do not implement extra endpoints just to enable controls.

Labs 2 and 3 add no API endpoints, so normally no flags change.
After the four primary labs, filtering and creation can be enabled.
Search and resolution need their optional implementations first.
A fresh-start checkout may have fewer completed features.

If you change a flag, stop the app and save the file. From the repository root, run:

```powershell
dotnet build .\Zero2Agents.slnx
```

Only if the build succeeds, run:

```powershell
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

Only if all checks pass, start the app:

```powershell
dotnet run --project .\src\QueueDesk.Api --no-build -- --urls http://127.0.0.1:5080
```

Reload **http://127.0.0.1:5080/** and try each newly enabled feature using the
feature table. Expect real API results, not just an enabled button.
If a feature fails, disable its flag and report the failure.
Stop the app before the lab's Git checkpoint. Include any reviewed flag changes.
If no flags need changing, keep the existing configuration.

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
