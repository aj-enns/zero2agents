# Lab 2: title-search plan

Starting commit supplied: `95faf02c35e0e0c804084e83abc7ea1d6296055e`

Status: proposed; pending human review. The starting commit has not been
independently verified or compared with the working tree.

## Goal and scope

Meet the Lab 2 title-search contract in [project.md](../project.md).
Preserve Lab 1 status behavior, all twelve baseline checks, the four seed
tickets, ascending ID order and JSON array responses.

Current-source inspection found title search and its acceptance checks already
present. Do not duplicate or replace them without finding a gap. Inspection
alone does not establish that the current source builds or passes checks.

Out of scope: frontend changes, packages, external services, creation,
resolution, deployment and future labs. Leave
[workshop.json](../../src/QueueDesk.Api/wwwroot/workshop.json) unchanged.

## Instructions and prerequisites

- Follow [copilot-instructions.md](../../.github/copilot-instructions.md) and
  [tests.instructions.md](../../.github/instructions/tests.instructions.md).
- Compare the working changes with the supplied starting commit before editing.
- Keep HTTP behavior in `TicketEndpoints` and use the injected `ITicketStore`.
- Preserve unrelated participant work.

## Affected files

| File | Proposed work |
| --- | --- |
| [TicketEndpoints.cs](../../src/QueueDesk.Api/TicketEndpoints.cs) | Retain existing validation and filtering; change only if a defect is found. |
| [Program.cs](../../tests/QueueDesk.Checks/Program.cs) | Retain all checks; add or repair only demonstrated coverage gaps. |

No changes are planned to
[ITicketStore.cs](../../src/QueueDesk.Api/ITicketStore.cs),
[InMemoryTicketStore.cs](../../src/QueueDesk.Api/InMemoryTicketStore.cs),
the seed tickets or frontend files.

## Ordered steps

### 1. Establish the current state

1.1 Compare the working changes with the supplied starting commit.
Identify existing Lab 1 and Lab 2 changes without reverting participant work.

1.2 Match the current endpoint and checks to the acceptance table below.
Record any gap before deciding that a code change is needed.

### 2. Preserve or complete the endpoint

2.1 Preserve Lab 1 validation: accept only one canonical `open` or `resolved`
status; reject invalid or repeated status values.

2.2 Accept one optional `q`. If supplied, reject repeated values, trim the
single value, then require a length of 1-40 characters. Return 400 Problem
Details for empty, whitespace-only or overlong values. Include
`application/problem+json`, body status 400 and a meaningful nonempty title.

2.3 Match title substrings using `StringComparison.OrdinalIgnoreCase`.
Combine title and status predicates with AND. Omitted `q` must preserve
existing behavior.

2.4 Filter the injected store's ordered snapshot without changing tickets.
Return 200 with a JSON array, including `[]` for a valid no-match query.

### 3. Preserve or complete acceptance checks

3.1 Keep all baseline and Lab 1 checks. Retain the existing Lab 2 cases;
add or repair checks only where a requirement lacks coverage.

3.2 Start each HTTP case with a fresh `ApiFixture`. Assert exact status,
JSON shape and ordered ticket records. For validation errors, assert
Problem Details content type, status 400 and a nonempty title.

3.3 Check the unfiltered list after searches and validation errors to confirm
that requests do not change the seed data.

### 4. Validate and hand off

4.1 Build the solution, then run the checks against freshly built binaries
using the commands below.

4.2 Record the exact commands and actual output. If a command fails or is
blocked, report that explicitly. Do not infer success from code inspection
or an older pass count.

4.3 Leave frontend search unchanged. Submit the code diff and evidence for
review and human approval. Do not commit.

## Acceptance mapping

These cases were found during source inspection; this table does not claim
independent execution.

| Requirement | Existing coverage to preserve |
| --- | --- |
| Mixed-case substring returns IDs 1,4 in order | `/tickets?q=vPn` |
| Match within a title | `/tickets?q=connection` returns ID 1 |
| One-character query is valid | `/tickets?q=p` |
| Combine search and status with AND | `/tickets?q=vPn&status=open` returns ID 1; `/tickets?status=resolved&q=vPn` returns ID 4 |
| Trim surrounding whitespace | Space-padded and tab-padded `vPn`; space-padded 40-character query |
| Exactly 40 characters is valid after trimming | 40 `x` characters, with and without surrounding spaces |
| Valid no-match query returns 200 and `[]` | `/tickets?q=zzzz`, `/tickets?q=open`, and `/tickets?q=connection&status=resolved` |
| Reject empty or whitespace-only queries | Bare `q`, `q=`, spaces and tabs |
| Reject over 40 characters after trimming | 41 `x` characters, with and without surrounding spaces |
| Reject repeated `q` | Different, identical, empty/nonempty and empty/empty values |
| Invalid search remains invalid with status | Each invalid-search case with omitted, open and resolved status |
| Omitted `q` preserves Lab 1 | Unfiltered and status-only requests; every existing invalid-status case |
| Invalid status remains invalid with search | Existing invalid-status cases combined with `q=vPn` |
| Preserve baseline behavior and data | All twelve baseline checks; exact records/order and unchanged-list assertions |

Ordinal case-insensitive comparison must also be confirmed in endpoint source;
the mixed-case example alone does not distinguish it from culture-sensitive
comparison.

## Exact validation commands

Run from the repository root, in order:

```powershell
dotnet build Zero2Agents.slnx
dotnet run --project tests\QueueDesk.Checks --no-build
```

`dotnet test` does not run these checks. Stop a running app before rebuilding
if it holds Windows output files open.

## Evidence and open questions

- No commands were run while preparing this plan.
- Earlier supplied output contains individual PASS lines, but used
  `--no-build`. It does not establish that the current source was freshly built.
- The supplied starting commit has not been compared with the working tree.
- Confirm during plan review that the next agent should validate the existing
  implementation and fix only demonstrated gaps.
- Human approval is pending. This plan does not approve the implementation
  or authorize enabling frontend search.
