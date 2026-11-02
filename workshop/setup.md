# Setup and preflight

Allow 20-30 minutes before the workshop.
Use **VS Code, GitHub Copilot and the Local harness** for the main steps.
A harness is the environment that runs an agent.
You need only this setup to start any of the four labs.

For the optional terminal exercise, follow the separate
[GitHub Copilot CLI setup](cli-setup.md). It is not required for the four primary labs.

## 1. Open your workshop repository

**1.1** Use the private workshop repository assigned to you. Do not make the
source public or share an account to work around missing access.
If you do not have an approved copy, ask the facilitator before continuing.

**1.2** In VS Code, press **Ctrl+Shift+P**, run **Git: Clone**, and paste the
assigned repository URL. Choose a local folder, then select **Open**.
If you already have the assigned checkout, use **File > Open Folder** instead.

**1.3** In Explorer, find `Zero2Agents.slnx`. This folder is the **repository root**.
All workshop terminal commands run here.

**1.4** Open **Terminal > New Terminal**. Use PowerShell on Windows.
Check the current files:

```powershell
git status --short
```

Expect no output for a fresh checkout. If files are already changed, keep them
and ask the facilitator to check the starting point. Do not discard them.

## 2. Check the tools

**2.1** Install the Microsoft-published **C#** and **GitHub Copilot** extensions
using your organization's approved process. Sign in to your approved Copilot account.
C# Dev Kit is optional.

**2.2** In the terminal, paste:

```powershell
git --version
dotnet --list-sdks
dotnet --version
```

Expect Git and **.NET SDK 10.0.300 or a newer stable 10.0 SDK**.
`global.json` selects a compatible SDK. .NET 8, 9 or 11 alone is not enough.
If missing, use the [.NET 10 SDK download](https://dotnet.microsoft.com/en-us/download/dotnet/10.0)
for your operating system and architecture. Install the **SDK**, not just the runtime.
Restart VS Code and its terminal after installation.

**2.3** Build:

```powershell
dotnet build .\Zero2Agents.slnx
```

Expect a successful build. If it fails, stop and check the error before continuing.
Do not run checks against an old build.

**2.4** Run the project's check runner:

```powershell
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

Expect **12/12 checks passed** on the unchanged starter.
`dotnet test` does not run these checks. No extra NuGet packages are needed.

**2.5** Save a named starting point, then create your working branch:

```powershell
git branch workshop-start
git switch -c workshopbranch
```

`workshop-start` points to the checked starter. Keep it unchanged.
`workshopbranch` is where you do the exercises.
If either name already exists, do not reset it; ask the facilitator which existing
branch to use. In a shared checkout, use the names assigned by the facilitator.

**Expected result:** the starter builds, all checks pass, and you have a working branch.
No setup log or copied command output is needed.

## 3. See the app

**3.1** In the terminal, start QueueDesk:

```powershell
dotnet run --project .\src\QueueDesk.Api --no-build -- --urls http://127.0.0.1:5080
```

**3.2** Open **http://127.0.0.1:5080/** in a browser. Expect four tickets.
Open a ticket's details. Try the theme and sort controls.
Filters and changes are disabled because their API features are not finished.

**3.3** Open **http://127.0.0.1:5080/health**. Expect `{"status":"ok"}`.

**3.4** Return to the app terminal and press **Ctrl+C**.
Stop the app before every rebuild, especially on Windows.
The in-memory tickets return to their starting state each time the app restarts.

**If something fails:** if port 5080 is busy, use another available loopback port
in the launch command and your browser. Never use `0.0.0.0` or a public tunnel.
For a file-lock error, stop your running app or watcher in its own terminal and
let any current build finish. Do not kill all .NET processes or disable protection.
If checks cannot start because of device policy, ask the facilitator.

## 4. Open Copilot

**4.1** Open a new Copilot chat. If a harness selector is shown, choose **Local**.
Keep normal tool approvals on; do not choose blanket approval or Autopilot.

**4.2** Use **Configure Tools** to select only file read/search tools for this first
question. Paste into chat:

```text
Read src/QueueDesk.Api/TicketEndpoints.cs.
Explain the two ticket routes in three short sentences.
Do not edit files, run commands, use network tools or start other agents.
```

**4.3** Check the answer against the file in Explorer.
If your editor has different labels, use the
[editor notes](references.md#editor-agents-and-instructions) with the facilitator.
Do not guess tool names or install another app just to continue.

**Expected result:** Copilot can answer a repository question without changing files.
If Copilot access is blocked, you can inspect the code and practice the planning
and review steps yourself. That is manual practice, not an agent run.

## Start fresh without losing work

Use this only when earlier code changes prevent a later coding exercise.
Labs 2 and 3 do not require a working changed API.

**1.1** Stop any app, build or agent using this checkout. Leave your files in place;
you do not need to finish, commit or delete them to take a fresh start.

**1.2** In a terminal at the original repository root, paste:

```powershell
git worktree add -b workshop-recovery ..\QueueDesk-recovery workshop-start
```

A **worktree** is another folder for the same repository, on a separate branch.
This creates a clean copy of the checked starter. It does not erase the old folder
or bring unfinished changes into the new one.
If the branch or folder already exists, ask the facilitator for a new name.
Do not overwrite or delete the existing one.

**1.3** In VS Code, choose **File > Open Folder** and open the new
`QueueDesk-recovery` folder beside the original checkout.
Open the lab page there. Run the build and checks from Steps **2.3-2.4**.
Expect the original 12 checks to pass.

**1.4** Continue your current lab in this folder on `workshop-recovery`.
It has no earlier feature changes or custom agents. Each primary lab supplies
what it needs. Keep your previous folder for later review.

## Ready to begin

You can open QueueDesk, run the checks and ask Copilot a read-only question.
You know where to make changes and how to keep unfinished work safe.
There is nothing to write up.

**Next:** [Lab 1: Plan and build](labs/01-plan-to-agent.md).
