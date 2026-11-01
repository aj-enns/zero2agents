namespace QueueDesk.Api;

public static class ApiHost
{
    public static WebApplication Create(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddSingleton<ITicketStore, InMemoryTicketStore>();

        var app = builder.Build();
        app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
        app.MapTicketEndpoints();
        return app;
    }
}
