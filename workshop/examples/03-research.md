# Example: check a source without MCP

[Lab 3](../labs/03-mcp.md) | [All examples](README.md)

This is a browser-only example, not a record of MCP execution.
No report is required.

**1.1** Open Microsoft's
[Minimal API responses](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/responses?view=aspnetcore-10.0).
Find the sections for `Created` and `Problem`.

**1.2** Check whether the documented response helper can return a 201 response
and a Location header. Find the text that supports your answer.

**1.3** Read the creation contract in `workshop/project.md`.
Its title length and exact priority values are application rules,
not automatic behavior of a response helper.

**1.4** Name a check the application still needs: for example, reject an 81-character
title without consuming an ID. A proposed check is not a test result.

Return to [section 3.3](../labs/03-mcp.md#33-check-the-answer).
