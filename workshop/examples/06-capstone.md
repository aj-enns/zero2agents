# Capstone example: resolution plan, handoff and demo

[All examples](README.md) | [Capstone](../capstone.md)

**Reference plan plus illustrative handoff/demo structure. No implementation, check results
or acceptance is evidenced here.** Start your work from the actual reviewed creation
commit, including earlier features, and record its hash.

## Plan

Scope: `POST /tickets/{id:int}/resolve`, preserving creation, search, filters and seed reset.
Non-goals: persistence, auth, summary stretch work, packages, external services and policy edits.
Owner: Pair Cedar driver; human approval/review: Pair Cedar reviewer.
Use QueuePlanner for planning, built-in Agent for implementation, QueueReviewer for inspection.
Stop after two failed implementation repairs and hand back the actual gaps.

1. Inspect endpoint/store interface, current locking and existing checks.
2. Add a store operation that looks up and updates a ticket atomically under the same
   lock used for creation and reads. Return no record for an unknown ID.
3. Replace an open immutable record with its resolved form; return the existing resolved
   record unchanged on repeats. Preserve ID/title/priority.
4. Map the route to 200 with the record or existing 404 Problem Details.
5. Add fresh-fixture checks below, then build and run the complete executable runner.
6. After human acceptance, enable `resolve`, build/restart and demonstrate the real API
   through the frontend. Do not finish by simulating a browser-only state change.

## Criterion-to-check handoff

| Criterion | Required check | Evidence in this example |
| --- | --- | --- |
| Open becomes resolved | Resolve seed 1; assert all fields, open IDs [2], resolved [1,3,4] | Not run |
| Idempotence | Resolve 1 twice; identical record, count stays 4 | Not run |
| Missing ID | Resolve 99; existing 404 Problem Details; unchanged list | Not run |
| Feature composition | Create 5, resolve it, find through resolved status plus title search | Not run |
| Concurrency | Concurrent resolves of 1 return consistent fields; no duplicate/lost records | Not run |
| Regression/reset | Existing checks pass; new fixture restores four seed records | Not run |

Planned root commands:

```powershell
dotnet build .\Zero2Agents.slnx
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

Base/result hashes, changed-file diff, actual command output and agent trace:
**not supplied in this example**. QueueReviewer must report these evidence gaps.
Human verdict: **not ready for acceptance** until supplied and independently checked.
Do not award full functional or regression rubric points from this plan alone.

## Demo example

- Request: "Resolve a ticket without breaking earlier features."
- Roles: read-only planner -> bounded implementer -> read-only reviewer -> human acceptance.
- Show: create a ticket, expand it, resolve it and query the real resolved/search endpoint.
  This is a proposed demo sequence, not a report that it succeeded.
- Evidence to present: one actual passing idempotence check and one real response.
- Boundary to explain: the reviewer cannot execute checks; a human runs them.
  Do not invent an unsafe-action refusal if none occurred; a real limitation is sufficient.
- Review decision to present: the actual verdict and any unresolved gaps.
- Evaluation lesson: show one measured role change or explain why you retained the prior role.
- Cleanup: stop your own API/agent execution and disable the exercise MCP server.
