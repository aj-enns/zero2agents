# Example: a small status-filter plan

[Lab 1](../labs/01-plan-to-agent.md) | [All examples](README.md)

This is a proposed plan, not an implementation or passing result.
You do not need to save a copy.

1. Read the status contract and the existing list route.
2. Keep HTTP query validation in `TicketEndpoints`.
   Distinguish an omitted `status` from an empty or repeated value.
3. Accept exactly `open` or `resolved`. Return 400 Problem Details for other inputs.
4. Filter the injected store's snapshot without changing records or ID order.
5. Add checks for open, resolved, omitted, empty, whitespace, mixed-case, unknown
   and repeated values. Keep all baseline cases.
6. Build, then run the check runner after a successful build. These commands
   are **not run by this example**.
7. Let the human inspect the diff and actual results before enabling `statusFilter`.

No search, creation, resolution, package, deployment or new storage is needed.
Return to [section 1.2](../labs/01-plan-to-agent.md#12-ask-for-a-plan).
