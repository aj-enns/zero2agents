---
name: Agent-ready feature
about: A bounded implementation handoff with verifiable acceptance criteria
title: "[QueueDesk] "
---

## Outcome and context

Who needs this and why? Link the lab, approved plan and relevant API contract.
Name the repository and starting branch/commit. Do not rely on previous chat context.

## In scope

## Out of scope

## Acceptance criteria

- [ ] Include concrete inputs, status codes, response fields and expected effects.
- [ ] Include invalid/boundary inputs and unchanged baseline behavior.

## Build and test

```text
dotnet build Zero2Agents.slnx
dotnet run --project tests/QueueDesk.Checks --no-build
```

## Tools, permissions and escalation

Local repository read/edit and build/check execution only. No new dependencies,
external services, secrets, policy changes or merge. Report blocked setup explicitly.
One implementation attempt; stop after 25 minutes or two failed repair attempts.
Name a human owner for unresolved decisions.

## Required handoff evidence

Changed files and commit, acceptance-criterion-to-check mapping, exact commands
and outputs, assumptions, known gaps, and a draft PR (or clearly labeled local diff).
Do not claim checks passed without executing them.
