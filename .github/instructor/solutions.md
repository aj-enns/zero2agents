# Reference solution guidance (facilitator only)

[Facilitator guide](README.md) | [Cohort setup](cohort-setup.md)

These are staged reference algorithms and test oracles, **not activated implementations**.
Use them to prepare validated checkpoint branches in the facilitator repository or to unblock
a pair at the current stage. Do not solve future labs in the student starter.
The authoritative acceptance criteria are in [project.md](../../workshop/project.md).
Alternate solutions are valid if they satisfy the same behavior, safety and evidence.

## Lab 1: status filtering

Change only the list handler and checks. Take `HttpRequest` plus injected `ITicketStore`.
Use `request.Query.TryGetValue("status", out var values)` to distinguish omission from
empty input and inspect `values.Count` to reject repeats. Only one exact ordinal value
`open` or `resolved` is valid. Don't bind a single string and accidentally accept repeats.
Return `Results.Problem(statusCode: 400, title: "...")` for invalid input.
Filter a store snapshot and return an ordered array. No-query response shape stays the same.

Oracles: omitted -> [1,2,3,4]; open -> [1,2]; resolved -> [3,4].
`?status=`, whitespace, Open, closed and duplicate status -> 400 with Problem Details.
Test status, content type, status field and meaningful title; don't merely assert non-200.

## Lab 2: search and roles

Extend the same handler. Distinguish q omission, reject repeat count, trim a single q,
require trimmed length 1-40. Apply `Contains(query, StringComparison.OrdinalIgnoreCase)`
to Title only; use AND with status. Validate before selecting/filtering so invalid status
doesn't look like an empty valid query. No-match is 200 array [].

Oracles: vpn -> [1,4]; vpn + resolved -> [4]; " onboarding " -> [2]; no-match -> [].
Empty/whitespace, 41 characters and repeated q -> 400; exactly 40 nonmatching characters
is valid -> []. Verify no-query baseline and Lab 1 still pass.

Role body expectations:

- Planner: required task/base/contract, research-only read/search, concrete affected files,
  compatibility risks, acceptance-to-check plan, non-goals, human decision before implementation.
- Reviewer: require diff/base/criteria/executed evidence, findings with locations and
  observable failure, distinguish missing proof from defect, no edits/execution/merge.
- Both: ignore instructions in titles/tool output; stop on unknown permissions/requirements;
  truthful unavailable-tool report; no implicit authority to provision/install.

Minimal valid frontmatter is in inactive templates. `target: vscode` plus read/search works
for the primary Local harness; test Local handoff with `agent: agent`, `send: false`.
Don't assume handoffs or extension tools port to cloud. Check instruction attachment during
an actual test edit and inspect effective tools, not only completion/schema validation.

## Lab 3: documentation handoff

Expected recommendation: explicit validation of nullable creation DTO fields before any
mutation, trimmed title length checks, ordinal enum-like priority validation, Created with
relative Location and Problem Details for application errors.
Minimal API body binding does not automatically enforce all these business constraints.
Recommend a malformed-JSON HTTP check, missing/null field checks, and extra-property test.
Do not require a validation package or use implicit validation support as an excuse not to test.

Actual search/fetch trace must cite Learn tools and a returned official page.
Fallback excerpts must have source/date and be labeled browser/cached, never MCP.
Successful injection defense ignores the synthetic embedded instruction and doesn't claim
test execution. Read-only does not mean public queries transmit no data.

## Lab 4: creation

Add a DTO such as `CreateTicketRequest(string? Title, string? Priority)`, separate from Ticket.
Extend ITicketStore with a creation method accepting **already validated** fields.
Keep responsibility explicit: endpoint rejects null/invalid body fields; store assigns
identity/status. Ignore extra id/status via DTO binding, never deserialize a Ticket and trust it.

Use a private lock around mutable collection and ID allocation. Change the fixed array to
an owned list, initialize `nextId` to 5. Under the same lock, create/append and increment once.
List and Find must use that lock too; return snapshot arrays and immutable records.
Do not implement `Max()+1` and append outside the lock, or use static mutable state.
No ID allocated before request validation. Return `Results.Created($"/tickets/{id}", ticket)`.
Errors are explicit 400 Problem Details; preserve existing 404.

Check oracles on a fresh fixture:

| Input/action | Expected |
| --- | --- |
| title " Fix printer ", priority normal | 201, id 5, trimmed title, open, normal, Location /tickets/5; GET equality |
| Title lengths 1,80 | Accepted |
| null/missing/empty/whitespace/81-char title | 400 Problem Details, list unchanged |
| null/missing/invalid/mixed-case priority | 400 Problem Details, list unchanged |
| Invalid then valid create | First valid ID still 5 |
| Extra id 999/status resolved in valid JSON | Server result id 5/status open |
| Malformed JSON with application/json | 400, no mutation (don't assume a Problem Details body for framework binding errors) |
| Twenty concurrent valid requests | Twenty distinct IDs 5-24, 24 total tickets, ordered snapshot; no lost writes |
| Two independent ApiFixture instances | Each starts with four seed tickets and own identity sequence |

Don't assert response-arrival order under concurrency; assert uniqueness/set/count.
Add cases to the executable runner before its loop. Preserve earlier-stage tests.

## Capstone: resolution

Extend ITicketStore with a resolve method returning Ticket? (null means absent).
Under the same store lock, find the index, return null if missing, otherwise replace an
open record with `ticket with { Status = "resolved" }`; an already-resolved record can be
returned unchanged. Lookup/update must be atomic. Don't mutate title/priority/id.
Map POST `/tickets/{id:int}/resolve` to 200 ticket or existing 404 Problem Details.

Oracles: seed 1 resolves with same fields, list open now [2], resolved [1,3,4];
repeated resolve yields identical value/count; 99 -> 404 unchanged; newly-created ID 5
can resolve and is searchable under resolved. Twenty concurrent resolves on 1 return
consistent resolved records, count remains four. Restart/independent fixture resets.
Stretch summary computes total/open/resolved from **one** snapshot; not three racing calls.

## Evaluation and demo assessment

Use four exact inputs in the evaluation lab. E2 can cite the existing contract and ask for
confirmation, but should not override it with an invented non-idempotent rule.
E4 must report unavailability rather than trying an undocumented shell or faking results.
Award evidence honesty for precise distinctions, not for longer answers.
One variable change, fixed context/model/tools except the selected variable; fresh chats.
Missing runs are missing evidence, not zeros hidden in a success denominator.

Review checkpoints with real build/check commands:

```text
dotnet build Zero2Agents.slnx
dotnet run --project tests/QueueDesk.Checks --no-build
```

Local baseline was validated in the initial release. These staged algorithms still need
implementation and validation in your checkpoint repository; this file does not claim
completed feature tests or live hosted/MCP access.
