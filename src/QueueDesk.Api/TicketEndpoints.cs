namespace QueueDesk.Api;

public static class TicketEndpoints
{
    public static void MapTicketEndpoints(this WebApplication app)
    {
        app.MapGet("/tickets", (ITicketStore store) => Results.Ok(store.List()));
        app.MapGet("/tickets/{id:int}", (int id, ITicketStore store) =>
            store.Find(id) is { } ticket
                ? Results.Ok(ticket)
                : Results.Problem(statusCode: 404, title: "Ticket not found"));
    }
}
