# Optional setup: GitHub Copilot CLI

## Goal

Install GitHub Copilot CLI, sign in, and check that it can read the workshop project.
This is only for the [optional CLI lab](labs/05-cli-agent.md).
The four primary labs use VS Code and do not need the CLI.

## Prerequisites

Complete the shared [setup and preflight](setup.md).
Use your organization's approved installation process and Copilot account.
CLI access depends on your account and organization policy.
If installation or access is blocked, ask the facilitator. Do not bypass restrictions.
You can use the lab's [design example](examples/bonus-05-cli-agent.md) instead;
that is design review, not CLI execution.

## 1. Install the CLI

**1.1** Open a terminal. If you already have the CLI, run `copilot --version`.
If it prints a version, skip to Section 2.
Otherwise, use **one** approved method below for your operating system.
This installs the standalone `copilot` command, not a VS Code extension or `gh copilot`.

### Windows: WinGet

In PowerShell, run:

```powershell
winget install GitHub.Copilot
```

### macOS or Linux: Homebrew

If Homebrew is already installed and approved, run:

```sh
brew install --cask copilot-cli
```

### Alternative: npm

Use this only if Node.js **22 or later** and npm are already installed and approved:
Use the [Microsoft npm feed](https://packagefeedproxy.microsoft.io/npm/) for this install.

```sh
node --version
npm install -g @github/copilot --registry=https://packagefeedproxy.microsoft.io/npm/
```

The registry flag applies only to this command; it does not change your npm settings.
If the feed blocks the package or is unavailable, stop and ask the facilitator.
Do not switch to the public npm registry.

Node.js and npm are not required for QueueDesk or the other installation methods.
For other options, use the [official CLI setup guide](https://docs.github.com/en/copilot/get-started/cli-quickstart).

**1.2** After installation, reopen your terminal. If you use VS Code's terminal,
restart VS Code too. Run:

```powershell
copilot --version
```

Expect a version number. If the command is still missing or installation fails,
stop and ask the facilitator; do not disable device protection or change permissions.

## 2. Sign in

**2.1** Open a terminal at the workshop repository root, where `Zero2Agents.slnx`
is located. Start the CLI:

```powershell
copilot
```

Expect an interactive Copilot session.

**2.2** Inside the CLI, enter `/login` and follow the sign-in prompts in your browser.
Use your approved GitHub account. Do not paste passwords or tokens into chat or files.
If already signed in with the correct account, keep that session.

**2.3** If asked to trust the folder, check that it is your assigned workshop checkout
before accepting. Keep normal tool approvals on. Do not enable blanket approvals,
Autopilot or MCP for this exercise.

## 3. Check access

**3.1** Inside the CLI, enter `/help`. Expect the installed CLI's available commands.
Then paste:

```text
Read src/QueueDesk.Api/TicketEndpoints.cs.
Explain the two ticket routes in three short sentences.
Do not edit files, run commands, use network tools or start other agents.
```

Approve only the file read if prompted. Check the answer against the file in VS Code.
If access is denied, stop and ask the facilitator.

## Completion checks

- `copilot --version` prints a version.
- The CLI is signed in with your approved account and shows help.
- Copilot answers the repository question without changing files.

No files need to change, and no new Git commit is needed. Keep your existing checkpoint.

**Next:** [Create a ticket-triage agent in Copilot CLI](labs/05-cli-agent.md).
