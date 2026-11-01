# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Teams of moderate GitHub Copilot users working in pairs during the zero2agents one-day lab.
They need a realistic interface to inspect the shared QueueDesk starter and observe the
features they implement, without hiding incomplete API behavior.

## Product Purpose

QueueDesk is a small service-desk application used to learn development-agent planning,
design, implementation, handoff, review and evaluation. Its frontend makes the ticket
workflow tangible while the workshop remains the primary product.

## Operating Context

ASP.NET Core on a local loopback address, a supported .NET 10 SDK, deterministic seed
tickets, executable local checks, and an 08:00-16:00 workshop. No paid infrastructure,
database, authentication, external assets or additional frontend runtime is required.

## Capabilities and Constraints

The starter lists four tickets and retrieves details. Status filtering, search, creation
and resolution remain participant API work. The user explicitly confirmed that the
frontend must preserve these unfinished features rather than completing them now.
The browser must not simulate successful backend operations or silently implement
server-owned filters locally. Feature availability must be explicit.
Serve the frontend from the existing .NET app without adding a JavaScript framework.

## Brand Commitments

QueueDesk and zero2agents names are established. The requested frontend is modern,
clean, realistic and polished. The supplied Clawpilot theme is the visual token authority.

## Evidence on Hand

Four synthetic tickets in `src/QueueDesk.Api/InMemoryTicketStore.cs`; API contracts in
`workshop/project.md`; participant labs and instructor guidance. There are no real
customers, users, SLA measurements, assignments or activity histories to fabricate.

## Product Principles

- Real API results, never invented operational metrics or success.
- Clearly distinguish starter capability from participant work.
- Keep the build dependency-free and the local workflow easy to run.
- Human-readable errors, keyboard access and responsive layouts.
