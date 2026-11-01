namespace QueueDesk.Api;

public static class ApiHost
{
    public static WebApplication Create(string[] args)
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions
        {
            Args = args,
            WebRootPath = Path.Combine(AppContext.BaseDirectory, "wwwroot")
        });
        builder.Services.AddSingleton<ITicketStore, InMemoryTicketStore>();

        var app = builder.Build();
        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
        app.MapTicketEndpoints();
        return app;
    }
}
