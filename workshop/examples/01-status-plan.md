# Lab 1 example: reviewed status-filter plan

[All examples](README.md) | [Lab 1](../labs/01-plan-to-agent.md)

**Reference plan, not an implemented solution or approval record.**
Use this as the shape of `lab-01-plan.md`; record your own starting commit with
`git rev-parse HEAD`, review the plan with Copilot, and approve it yourself before implementation.

## Problem and scope

The starter's `/tickets?status=open` returns all four tickets. Add optional status
filtering while preserving the unfiltered JSON array, ascending IDs and deterministic seed.
Only `open` and `resolved` are valid, case-sensitive values.

No search, creation, resolution, dependencies, persistence, network tools or workflow changes.
The human approves the plan and terminal actions; the implementer stops after two failed repairs.

## Proposed changes

1. Inspect `TicketEndpoints.cs`, `ITicketStore.cs`, `InMemoryTicketStore.cs` and the existing checks.
2. Read the raw query values in the list endpoint so omission differs from empty input
   and repeated values can be rejected. Do not silently use the first duplicate.
3. Validate before filtering. Invalid input returns 400 Problem Details with a meaningful title.
4. Filter the store snapshot and return the same ordered array shape. Keep validation at
   the HTTP boundary; do not introduce a new service layer just for one query parameter.
5. Add executable HTTP cases to `tests/QueueDesk.Checks/Program.cs`, using a fresh
   `ApiFixture` per case. Keep every baseline case.

## Acceptance-to-check plan

| Request | Expected assertion |
| --- | --- |
| `/tickets` | 200 JSON array; IDs 1,2,3,4 in order |
| `/tickets?status=open` | 200; IDs 1,2 |
| `/tickets?status=resolved` | 200; IDs 3,4 |
| `?status=`, `?status=%20`, `?status=Open`, `?status=closed` | 400 Problem Details; status 400 and nonempty title |
| `?status=open&status=resolved` and `?status=open&status=open` | 400 Problem Details, not a valid single value |
| Valid request after a rejected request | Seed and list ordering unchanged |

## Verification and handoff

Run from the root after editing:

```powershell
dotnet build .\Zero2Agents.slnx
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

Planned commands are **not executed evidence**. Capture actual output and map checks to
the table. After human review and passing API checks, enable only `statusFilter` in
`wwwroot/workshop.json`, build/restart, and compare the two queues with the raw API.
Commit the implementation, checks, plan and evidence; hand that commit to the next lab.

## Human decision

No new product decision is needed if the existing contract is accepted. If the agent
proposes accepting mixed-case values, ignoring duplicates or implementing search now,
send the plan back: those changes contradict the approved scope.
