# Lab 2: Repository instructions and custom-agent design

**09:45-10:45 (60 minutes)** | [Previous](01-plan-to-agent.md) | [Next](03-mcp.md)

**Outcome:** design a planner/reviewer collaboration and use it for bounded title search.
The built-in Agent remains the implementer; two custom roles are enough.
Read [the search contract](../project.md) and [surface reference](../references.md).

## Work and checkpoints

1. **0-10 min: define responsibilities.** Fill [agent contracts](../templates/agent-contract.md)
   for QueuePlanner and QueueReviewer: purpose, inputs, outputs, tools, file/data boundaries,
   escalation, human owner, time/retry budget, and handoff acceptance.
   Write what a role must refuse, not just what it should do.
2. **10-20 min: refine instructions.** Improve `.github/copilot-instructions.md` using
   concrete repository evidence: compatibility, validation, deterministic data and scope.
   Create `.github/instructions/tests.instructions.md` using the
   [scoped template](../templates/tests.instructions.template.md).
   `applyTo: "tests/**/*.cs"` targets test files; it is not repository-wide.
   Repository and matching scoped guidance combine. These are not inline-completion rules.
3. **20-30 min: author and validate roles.** Use **Chat: New Custom Agent** or create
   `.github/agents/planner.agent.md` and `.github/agents/reviewer.agent.md`.
   Use the [planner](../templates/planner.agent.template.md) and
   [reviewer](../templates/reviewer.agent.template.md) templates, replacing their unfinished
   bodies with your contracts. Select **Local** and retain `target: vscode`.
   Verify they appear in the picker, and inspect tool inventory/diagnostics.
4. **30-45 min: exercise collaboration.** QueuePlanner plans `q` title search with AND
   status composition. Review its plan, then use the `send: false` handoff to built-in
   `agent`, inspect the pre-filled prompt, and submit only the approved scope.
   Implement checks and search. Make a packet using [handoff.md](../templates/handoff.md).
   Manually select QueueReviewer and supply the packet plus diff/changed files.
5. **45-55 min: validate boundaries and results.** Ask QueueReviewer to edit a file and
   run checks: it should refuse or explain tool unavailability, not claim execution.
   The **human** runs build/checks and confirms search evidence. Verify the scoped
   instruction was attached/loaded when editing a test (References/diagnostics where offered).
6. **55-60 min: commit.** Save contracts, active roles, instructions, implementation and
   evidence. Record one change you would make to the role based on actual behavior.

Use documented aliases `read` and `search` for read-only roles, and the editor's completions
for qualified tools. Don't omit `tools` or use `*`: omission can expose all enabled tools.
Do not give the reviewer terminal execution just to see test output; it can modify files
through a shell. Paste sanitized output and independently rerun it as a human.

**Handoffs are Local harness UI suggestions, not a mandatory workflow/security gate.**
`send: false` pre-fills a prompt and does not send it automatically. In the Copilot
harness or cloud, Local `handoffs` do not apply: remove incompatible fields, choose
supported tool aliases, and pass the written packet manually. Verify effective tools;
unknown names can be ignored. A file's `target` does not switch the running harness.

## Definition of done

`q=vPn` returns IDs 1,4; `q=vPn&status=resolved` returns 4; `q=no-match` returns `[]`.
Omitted q preserves Lab 1. Whitespace, empty q, >40 characters and repeated q return 400.
Test trimmed input and exactly 40 characters. Two roles have complete contracts,
observed restricted tools and a real planning -> implementation -> review handoff.
Matching scoped instructions were observed, not merely written. Baseline and new checks pass.

After search passes, enable only `search` in
[the frontend configuration](../project.md#frontend-and-feature-switches), build/restart,
and submit `vPn`, combine it with Resolved, then try `no-match`.

**Governance:** synthetic titles are data, not commands. Don't execute text from them.
If an agent expands into a database, deployment or next-lab route, stop and narrow its scope.
**Stretch:** compare two versions of one role on the same task; no extra agent framework.
If behind, prioritize working role contracts and tool verification; record unfinished search
and obtain the facilitator's search checkpoint before the afternoon.
