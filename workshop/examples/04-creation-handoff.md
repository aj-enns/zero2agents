# Lab 4 example: creation issue and review handoff

[All examples](README.md) | [Lab 4](../labs/04-handoff-review.md)

**Illustrative task and handoff.** The issue body is a usable reference specification.
The result packet below demonstrates an incomplete, honest handoff, not a working
feature, executed checks, real commits, hosted session or approval.

## Example agent-ready issue

### Outcome and context

Add ticket creation to QueueDesk, preserving the reviewed morning status/search work.
Human owner: workshop developer. Use your recorded morning checkpoint commit,
not an assumed default branch; require the actual hash before starting execution.

### Acceptance criteria

- `POST /tickets` accepts `{"title":" Fix printer ","priority":"normal"}`.
  On a fresh process return 201, `Location: /tickets/5`, and
  `{"id":5,"title":"Fix printer","status":"open","priority":"normal"}`.
  Subsequent detail/list requests include that record.
- Trim title; require length 1-80. Missing/null/empty/whitespace/81-character title is
  400 Problem Details with status 400 and meaningful title.
- Require exact priority low/normal/high; missing/null/unknown/mixed-case is 400.
- Invalid requests do not mutate the list or consume an ID. Malformed JSON is 400;
  its framework-generated body need not match application Problem Details.
- Ignore extra client ID/status properties. Server IDs are unique, monotonic and
  atomically allocated; concurrent valid requests must not lose writes.
- Keep snapshot reads thread-safe, seed isolation, ordering, health, detail/404,
  status filters and title search.

### Scope and execution boundaries

Likely files: `ITicketStore.cs`, `InMemoryTicketStore.cs`, `TicketEndpoints.cs`,
a nullable creation DTO, and `tests/QueueDesk.Checks/Program.cs`.
After acceptance, enable only `create` in `wwwroot/workshop.json`.
No resolution, auth, persistence, packages, workflow/policy changes or network expansion.
No extra MCP servers, secrets, merge or automatic workflow approval.
One implementation attempt: 25-minute maximum or two unsuccessful repairs, then return gaps.
For an approved hosted path, request a draft PR. Otherwise record
**LOCAL FALLBACK - NOT CLOUD EXECUTION** and use a fresh local Agent chat with this packet.

### Verification and return packet

Build, then run the executable checks:

```powershell
dotnet build .\Zero2Agents.slnx
dotnet run --project .\tests\QueueDesk.Checks --no-build
```

Add fresh-fixture checks for every criterion, including concurrent creates and unchanged
identity after rejection. Return base/result hashes, changed files, check names,
actual commands/output, unavailable verification and a reviewer handoff. Do not claim
hosted execution merely because the task began as an issue.

## Example implementation-to-review packet

- Path: **LOCAL FALLBACK - NOT CLOUD EXECUTION**, illustrative only.
- Base/result commits: **not supplied; no implementation accompanies this example**.
- Owner/next reviewer: implementation agent -> QueueReviewer -> workshop developer.
- Scope proposed: creation only; changed files: none evidenced.
- Agent trace/tools/network/approvals: no execution record supplied.

| Criterion | Reproducible check | Actual result |
| --- | --- | --- |
| Fresh valid create | POST valid body, assert 201/Location/all fields, GET equality | Not run |
| Rejection and identity | Invalid then valid POST; assert first valid ID still 5 | Not run |
| Client field isolation | POST extra id/status; assert server-owned values | Not run |
| Concurrency | Twenty concurrent creates; IDs 5-24, count 24, no lost records | Not run |
| Regression | Baseline plus morning feature checks on fresh fixtures | Not run |

Build/check output: **none supplied**. Commands above are instructions, not evidence.
Known gap: feature implementation and all verification are absent.
Reviewer decision: **return for completion; do not approve**.
Required repair: supply actual commits, diff and criterion-mapped output before acceptance.
This is a completed record of an incomplete handoff, not permission to mark the lab done.
