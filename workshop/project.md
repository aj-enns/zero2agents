# QueueDesk: the shared project

[Setup](setup.md) | [Lab 1](labs/01-plan-to-agent.md) | [Capstone](capstone.md)

QueueDesk is an intentionally small, unauthenticated, **loopback-only training API**.
It is not a production service. No model runs inside it: Copilot is the development agent.
Each process starts from the same in-memory seed. Restarting loses mutations.

## Existing behavior

| Request | Result |
| --- | --- |
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

## Features owned by participants

These are workshop acceptance contracts, not completed starter solutions.
Use case-sensitive canonical status/priority values unless explicitly stated otherwise.
For application validation errors, return 400 Problem Details (`application/problem+json`,
`status: 400`, meaningful nonempty `title`); do not return an empty successful list.
Malformed request JSON should be rejected with 400 by ASP.NET Core; it must not mutate data.

| Stage | Contract |
| --- | --- |
| Lab 1: status | Optional single `status=open` or `status=resolved` filters the list. Omitted status preserves all tickets. Empty, whitespace-only, unknown, mixed-case or repeated status values return 400. Keep ascending ID order and array response. |
| Lab 2: title search | Optional single `q` is trimmed, 1-40 characters, ordinal case-insensitive title substring search. Omitted q preserves behavior. Empty/whitespace, >40 characters or repeated q return 400. Combine with status using AND. Valid no-match query returns 200 with `[]`. |
| Lab 3: research | Recommend validation and Problem Details approach for creation; no production code changes. Cite official docs, separate framework behavior from our contract. |
| Lab 4: creation | `POST /tickets` JSON `{"title":" Fix printer ","priority":"normal"}` creates `{"id":5,"title":"Fix printer","status":"open","priority":"normal"}` on a fresh process. 201 plus `Location: /tickets/5`; subsequent GET finds it. Trim title, length 1-80; null/missing/empty/whitespace/>80 title is 400. Priority required, exactly low/normal/high; otherwise 400. IDs server-assigned, unique, monotonic; reject invalid requests without consuming an ID or changing the list. Ignore extra JSON properties; clients cannot set id/status. Thread-safe mutations and snapshot reads. |
| Capstone: resolution | `POST /tickets/{id:int}/resolve`, no request body required. Open ticket becomes resolved, returns 200 with the ticket; repeating returns the identical resolved ticket (idempotent). Unknown integer ID returns existing 404 Problem Details. Preserve id/title/priority, list filters and creation. Thread-safe lookup/update. |

Out of scope: persistence, auth, email, deployment, packages, broad network access,
bulk actions, background agent runtime, and implementing future labs early.
Capstone stretch: summary endpoint, described in the capstone; only after required work.

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
