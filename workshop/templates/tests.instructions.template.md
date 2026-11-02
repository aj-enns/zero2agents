---
applyTo: "tests/**/*.cs"
---

Use the existing runner in tests/QueueDesk.Checks/Program.cs.
Keep all baseline cases. Do not add packages.
Start each HTTP case with its own:
await using var api = await ApiFixture.StartAsync();
Assert exact HTTP status, returned IDs and response fields.
For application validation errors, check application/problem+json,
status 400 and a nonempty title.
Build with dotnet build Zero2Agents.slnx, then run
dotnet run --project tests/QueueDesk.Checks --no-build.
dotnet test does not run these checks.
