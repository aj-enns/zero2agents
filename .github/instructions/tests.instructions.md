---
applyTo: "tests/**/*.cs"
---

Add executable cases to the cases list in tests/QueueDesk.Checks/Program.cs.
Keep all baseline checks and checks from earlier labs. Do not add packages.
Build with dotnet build Zero2Agents.slnx, then run
dotnet run --project tests/QueueDesk.Checks --no-build.
dotnet test does not run these checks.

Start each HTTP case with:
await using var api = await ApiFixture.StartAsync();
Do not share mutable test state between cases.

Assert exact HTTP status, returned ticket IDs and JSON shape.
For validation errors, check application/problem+json, status 400 and a nonempty title.
Cover valid values, invalid values, length boundaries and repeated query parameters.