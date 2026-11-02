namespace QueueDesk.Api;

public static class TicketEndpoints
{
    public static void MapTicketEndpoints(this WebApplication app)
    {
        app.MapGet("/tickets", (HttpRequest request, ITicketStore store) =>
        {
            string? status = null;
            if (request.Query.TryGetValue("status", out var values))
            {
                if (values.Count != 1 || values[0] is not ("open" or "resolved"))
                {
                    return Results.Problem(statusCode: 400, title: "Invalid status",
                        detail: "Provide exactly one status value: open or resolved.");
                }

                status = values[0];
            }

            string? query = null;
            if (request.Query.TryGetValue("q", out var queryValues))
            {
                if (queryValues.Count != 1 ||
                    queryValues[0]?.Trim() is not { Length: >= 1 and <= 40 } trimmedQuery)
                {
                    return Results.Problem(statusCode: 400, title: "Invalid query",
                        detail: "Provide exactly one q value with 1-40 characters after trimming.");
                }

                query = trimmedQuery;
            }

            return Results.Ok(store.List()
                .Where(ticket => (status is null || ticket.Status == status) &&
                    (query is null || ticket.Title.Contains(query, StringComparison.OrdinalIgnoreCase)))
                .ToArray());
        });
        app.MapGet("/tickets/{id:int}", (int id, ITicketStore store) =>
            store.Find(id) is { } ticket
                ? Results.Ok(ticket)
                : Results.Problem(statusCode: 404, title: "Ticket not found"));
    }
}
