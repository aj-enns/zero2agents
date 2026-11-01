using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.Extensions.DependencyInjection;
using QueueDesk.Api;

namespace QueueDesk.Checks;

public sealed class ApiFixture : IAsyncDisposable
{
    private readonly WebApplication app;
    public HttpClient Client { get; }

    private ApiFixture(WebApplication app, HttpClient client)
    {
        this.app = app;
        Client = client;
    }

    public static async Task<ApiFixture> StartAsync()
    {
        var app = ApiHost.Create(
        [
            "--urls", "http://127.0.0.1:0",
            "--Logging:LogLevel:Default", "Warning"
        ]);
        try
        {
            await app.StartAsync();
            var server = app.Services.GetRequiredService<IServer>();
            var address = server.Features.Get<IServerAddressesFeature>()!.Addresses.Single();
            return new ApiFixture(app, new HttpClient
            {
                BaseAddress = new Uri(address),
                Timeout = TimeSpan.FromSeconds(10)
            });
        }
        catch
        {
            await app.DisposeAsync();
            throw;
        }
    }

    public async ValueTask DisposeAsync()
    {
        Client.Dispose();
        await app.StopAsync();
        await app.DisposeAsync();
    }
}
