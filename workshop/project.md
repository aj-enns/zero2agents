# QueueDesk: the shared project

[Setup](setup.md) | [Four guided labs](../README.md) | [Lab 4](labs/04-handoff-review.md)

QueueDesk is an intentionally small, unauthenticated, **loopback-only training API**.
It is not a production service. No model runs inside it: Copilot is the development agent.
Each process starts from the same in-memory seed. Restarting loses mutations.

## Existing behavior

| Request | Result |
| --- | --- |
| `GET /` | QueueDesk frontend; live ticket list, presentation sorting, expandable details and light/dark themes |
| `GET /health` | 200, `{"status":"ok"}` |
| `GET /tickets` | 200, JSON array ordered by ascending `id` |
| `GET /tickets/1` | 200, ticket object |
| `GET /tickets/99` | 404, `application/problem+json`, status 404, title `Ticket not found` |

```json
[
  {"id":1,"title":"VPN connection fails","status":"open","priority":"high"},
  {"id":2,"title":"Update onboarding docs","status":"open","priority":"normal"},
  {"id":3,"title":"Replace meeting room cable","status":"resolved","priority":"low"},
  {"id":4,"title":"VPN setup guide","status":"resolved","priority":"normal"}
]
```

`GET /tickets?status=open` and `GET /tickets?q=VPN` currently return all four tickets:
query handling is unfinished, **not** accepted feature behavior. Create and resolve routes
are absent. Do not add passing tests that lock in these missing behaviors.

## Feature contracts

These are workshop acceptance contracts, not completed starter solutions.
Use case-sensitive canonical status/priority values unless explicitly stated otherwise.
For application validation errors, return 400 Problem Details (`application/problem+json`,
`status: 400`, meaningful nonempty `title`); do not return an empty successful list.
Malformed request JSON should be rejected with 400 by ASP.NET Core; it must not mutate data.

| Stage | Contract |
| --- | --- |
| Lab 1: status | Optional single `status=open` or `status=resolved` filters the list. Omitted status preserves all tickets. Empty, whitespace-only, unknown, mixed-case or repeated status values return 400. Keep ascending ID order and array response. |
| Title search: review practice in Lab 2; optional implementation later | Optional single `q` is trimmed, 1-40 characters, ordinal case-insensitive title substring search. Omitted q preserves behavior. Empty/whitespace, >40 characters or repeated q return 400. If status filtering exists, combine using AND. Valid no-match query returns 200 with `[]`. |
| Lab 3: tools | Use official docs to explain validation and creation responses. Check a source and distinguish framework behavior from our contract. No production code change or research report. |
| Lab 4: creation | `POST /tickets` JSON `{"title":" Fix printer ","priority":"normal"}` creates `{"id":5,"title":"Fix printer","status":"open","priority":"normal"}` on a fresh process. 201 plus `Location: /tickets/5`; subsequent GET finds it. Trim title, length 1-80; null/missing/empty/whitespace/>80 title is 400. Priority required, exactly low/normal/high; otherwise 400. IDs server-assigned, unique, monotonic; reject invalid requests without consuming an ID or changing the list. Ignore extra JSON properties; clients cannot set id/status. Thread-safe mutations and snapshot reads. |
| Resolution: optional future work | `POST /tickets/{id:int}/resolve`, no request body required. Open ticket becomes resolved, returns 200 with the ticket; repeating returns the identical resolved ticket (idempotent). Unknown integer ID returns existing 404 Problem Details. Preserve id/title/priority, list filters and creation if present. Thread-safe lookup/update. |

Out of scope: persistence, auth, email, deployment, packages, broad network access,
bulk actions, background agent runtime, and implementing future labs early.
Search and resolution are not required implementations in the four primary labs.
Lab 4 creation works on the original starter; it must preserve existing filters/search
if present, but must not add missing ones.
There is no required summary endpoint or separate capstone.

## Architecture and checking

`ApiHost.Create` wires the injected `ITicketStore` and maps endpoints.
`InMemoryTicketStore` owns seed data; `Ticket` is immutable.
`TicketEndpoints` is the HTTP seam. Extend the interface only when the assigned feature
needs it; do not introduce a service framework, database or global mutable state.

Checks are plain C# functions in `tests/QueueDesk.Checks/Program.cs`.
Add `(name, async () => { ... })` cases to the `cases` list before the runner loop.
Use `ApiFixture.StartAsync()` in each HTTP case and `await using` to dispose it.
Use `Check.Equal` and `Check.True`; failures throw, are printed, and cause exit code 1.
Use `HttpClient.GetAsync` when asserting errors, so a convenience helper doesn't hide status.
After each edit **build then run checks**; `--no-build` alone can test stale binaries.

## Frontend and feature switches

The same .NET app serves `src/QueueDesk.Api/wwwroot/`: plain HTML, CSS and JavaScript,
with no framework, external assets, npm step or additional server. The dashboard calls
the real API; it does not implement server filters locally or invent successful mutations.

All four flags in `src/QueueDesk.Api/wwwroot/workshop.json` start as `false`.
After implementing the assigned endpoint, passing its acceptance checks and human review,
set **only that stage's flag** to `true`, build, restart the app and reload the browser:

| Stage | Flag | Frontend verification |
| --- | --- | --- |
| Lab 1 | `statusFilter` | Open/resolved queues request the API with `status`; counts still describe the full workspace. |
| Optional search implementation | `search` | Submit a title query; combine it with a queue if implemented and try a no-match query. |
| Lab 4 | `create` | New ticket sends POST; verify its returned ID, persisted GET and updated queue. |
| Optional resolution implementation | `resolve` | Expand an open ticket and resolve it; verify the API response and queue movement. |

Enabling a flag is not implementing a feature. If an endpoint is missing or violates
the contract, the UI displays an error; do not hide that error with browser-only behavior.
Keep all twelve baseline checks; the configuration check accepts either boolean so later
lab flags do not break the baseline. Add server acceptance checks for each implemented feature.
Assets are copied into build/publish output; a running `--no-build` app serves that snapshot,
not subsequent source edits. Stop it before rebuilding to avoid Windows output-file locks.

Sample manual requests (VS Code REST Client is optional, not required):

```http
GET http://127.0.0.1:5080/health

GET http://127.0.0.1:5080/tickets

GET http://127.0.0.1:5080/tickets/99

GET http://127.0.0.1:5080/tickets?status=open

GET http://127.0.0.1:5080/tickets?q=vPn&status=resolved

POST http://127.0.0.1:5080/tickets
Content-Type: application/json

{"title":" Fix printer ","priority":"normal"}

POST http://127.0.0.1:5080/tickets/1/resolve
```

The last four requests acquire their intended behavior only after their assigned lab.
For cross-shell terminal calls, use your shell's native HTTP client; browser GETs and
the executable checks are sufficient for preflight.
