using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using QueueDesk.Api;
using QueueDesk.Checks;

Ticket[] seed =
[
    new(1, "VPN connection fails", "open", "high"),
    new(2, "Update onboarding docs", "open", "normal"),
    new(3, "Replace meeting room cable", "resolved", "low"),
    new(4, "VPN setup guide", "resolved", "normal")
];

var cases = new List<(string Name, Func<Task> Run)>
{
    ("Store returns four deterministic tickets in ID order", () =>
    {
        var store = new InMemoryTicketStore();
        Check.True(store.List().Select(ticket => ticket.Id).SequenceEqual([1, 2, 3, 4]),
            "Seed order or IDs changed.");
        return Task.CompletedTask;
    }),
    ("Store snapshots cannot replace stored tickets", () =>
    {
        var store = new InMemoryTicketStore();
        var snapshot = store.List().ToArray();
        snapshot[0] = new Ticket(99, "Changed", "open", "low");
        Check.Equal("VPN connection fails", store.Find(1)!.Title);
        return Task.CompletedTask;
    }),
    ("Store has two open and two resolved tickets", () =>
    {
        var store = new InMemoryTicketStore();
        Check.Equal(2, store.List().Count(ticket => ticket.Status == "open"));
        Check.Equal(2, store.List().Count(ticket => ticket.Status == "resolved"));
        return Task.CompletedTask;
    }),
    ("Unknown store ID returns null", () =>
    {
        Check.Equal<Ticket?>(null, new InMemoryTicketStore().Find(99));
        return Task.CompletedTask;
    }),
    ("Health returns 200 and ok", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        using var response = await api.Client.GetAsync("/health");
        Check.Equal(HttpStatusCode.OK, response.StatusCode);
        var body = await response.Content.ReadFromJsonAsync<JsonElement>();
        Check.Equal("ok", body.GetProperty("status").GetString());
    }),
    ("List returns ordered seed tickets as JSON", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        using var response = await api.Client.GetAsync("/tickets");
        Check.Equal(HttpStatusCode.OK, response.StatusCode);
        Check.Equal("application/json", response.Content.Headers.ContentType!.MediaType);
        var tickets = await response.Content.ReadFromJsonAsync<Ticket[]>();
        Check.True(tickets!.Select(ticket => ticket.Id).SequenceEqual([1, 2, 3, 4]),
            "HTTP list order or IDs changed.");
    }),
    ("Known ticket returns all contract fields", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        var ticket = await api.Client.GetFromJsonAsync<Ticket>("/tickets/1");
        Check.Equal(new Ticket(1, "VPN connection fails", "open", "high"), ticket);
    }),
    ("Missing ticket returns problem details", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        using var response = await api.Client.GetAsync("/tickets/99");
        Check.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Check.Equal("application/problem+json", response.Content.Headers.ContentType!.MediaType);
        var body = await response.Content.ReadFromJsonAsync<JsonElement>();
        Check.Equal(404, body.GetProperty("status").GetInt32());
        Check.Equal("Ticket not found", body.GetProperty("title").GetString());
    }),
    ("Each API instance starts with the same seed", async () =>
    {
        await using var first = await ApiFixture.StartAsync();
        await using var second = await ApiFixture.StartAsync();
        var left = await first.Client.GetFromJsonAsync<Ticket[]>("/tickets");
        var right = await second.Client.GetFromJsonAsync<Ticket[]>("/tickets");
        Check.True(left!.SequenceEqual(right!), "API instances differ.");
    }),
    ("Homepage serves the QueueDesk dashboard", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        using var response = await api.Client.GetAsync("/");
        Check.Equal(HttpStatusCode.OK, response.StatusCode);
        Check.Equal("text/html", response.Content.Headers.ContentType!.MediaType);
        var html = await response.Content.ReadAsStringAsync();
        Check.True(html.Contains("QueueDesk") && html.Contains("src=\"/app.js\""),
            "Homepage or dashboard script is missing.");
    }),
    ("Frontend assets and workshop feature configuration are served", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        foreach (var (path, contentType) in new[]
        {
            ("/app.css", "text/css"), ("/app.js", "text/javascript"),
            ("/favicon.svg", "image/svg+xml"), ("/workshop.json", "application/json")
        })
        {
            using var response = await api.Client.GetAsync(path);
            Check.Equal(HttpStatusCode.OK, response.StatusCode);
            Check.Equal(contentType, response.Content.Headers.ContentType!.MediaType);
        }
        var features = await api.Client.GetFromJsonAsync<JsonElement>("/workshop.json");
        foreach (var name in new[] { "statusFilter", "search", "create", "resolve" })
        {
            Check.True(features.GetProperty(name).ValueKind is JsonValueKind.True or JsonValueKind.False,
                $"Workshop feature {name} must be a boolean.");
        }
    }),
    ("Unknown frontend paths remain 404 rather than hiding API mistakes", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        using var response = await api.Client.GetAsync("/not-a-route");
        Check.Equal(HttpStatusCode.NotFound, response.StatusCode);
    })
};

foreach (var (path, expected) in new (string, Ticket[])[]
{
    ("/tickets", seed),
    ("/tickets?status=open", [seed[0], seed[1]]),
    ("/tickets?status=resolved", [seed[2], seed[3]])
})
{
    cases.Add(($"List preserves exact records and order for {path}", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        await CheckTicketsAsync(api, path, expected);
        await CheckTicketsAsync(api, "/tickets", seed);
    }));
}

foreach (var query in new[]
{
    "status=", "status", "status=%20%20", "status=%09",
    "status=closed", "status=Open", "status=RESOLVED",
    "status=%20open%20", "status=open,resolved",
    "status=open&status=resolved", "status=open&status=open",
    "status=resolved&status=resolved", "status=&status=open",
    "status=open&status=", "status=&status="
})
{
    cases.Add(($"Invalid query {query} returns Problem Details without changing tickets", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        using var response = await api.Client.GetAsync($"/tickets?{query}");
        Check.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Check.Equal("application/problem+json", response.Content.Headers.ContentType!.MediaType);
        var body = await response.Content.ReadFromJsonAsync<JsonElement>();
        Check.Equal(400, body.GetProperty("status").GetInt32());
        Check.Equal("Invalid status", body.GetProperty("title").GetString());
        await CheckTicketsAsync(api, "/tickets", seed);
    }));

    cases.Add(($"Invalid status with title search {query} returns Problem Details", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        using var response = await api.Client.GetAsync($"/tickets?{query}&q=vPn");
        Check.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Check.Equal("application/problem+json", response.Content.Headers.ContentType!.MediaType);
        var body = await response.Content.ReadFromJsonAsync<JsonElement>();
        Check.Equal(400, body.GetProperty("status").GetInt32());
        Check.Equal("Invalid status", body.GetProperty("title").GetString());
        await CheckTicketsAsync(api, "/tickets", seed);
    }));
}

foreach (var (path, expected) in new (string, Ticket[])[]
{
    ("/tickets?q=vPn", [seed[0], seed[3]]),
    ("/tickets?q=connection", [seed[0]]),
    ("/tickets?q=p", seed),
    ("/tickets?q=%20%20vPn%20%20", [seed[0], seed[3]]),
    ("/tickets?q=%09vPn%09", [seed[0], seed[3]]),
    ($"/tickets?q={new string('x', 40)}", []),
    ($"/tickets?q=%20{new string('x', 40)}%20", []),
    ("/tickets?q=zzzz", []),
    ("/tickets?q=open", []),
    ("/tickets?q=vPn&status=open", [seed[0]]),
    ("/tickets?status=resolved&q=vPn", [seed[3]]),
    ("/tickets?q=connection&status=resolved", [])
})
{
    cases.Add(($"Title search preserves exact records and order for {path}", async () =>
    {
        await using var api = await ApiFixture.StartAsync();
        await CheckTicketsAsync(api, path, expected);
        await CheckTicketsAsync(api, "/tickets", seed);
    }));
}

foreach (var query in new[]
{
    "q", "q=", "q=%20%20", "q=%09",
    $"q={new string('x', 41)}", $"q=%20{new string('x', 41)}%20",
    "q=VPN&q=guide", "q=VPN&q=VPN", "q=&q=VPN", "q=VPN&q=", "q=&q="
})
{
    foreach (var status in new[] { "", "&status=open", "&status=resolved" })
    {
        cases.Add(($"Invalid title query {query}{status} returns Problem Details", async () =>
        {
            await using var api = await ApiFixture.StartAsync();
            using var response = await api.Client.GetAsync($"/tickets?{query}{status}");
            Check.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            Check.Equal("application/problem+json", response.Content.Headers.ContentType!.MediaType);
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            Check.Equal(400, body.GetProperty("status").GetInt32());
            Check.True(!string.IsNullOrWhiteSpace(body.GetProperty("title").GetString()),
                "Query errors must have a meaningful title.");
            await CheckTicketsAsync(api, "/tickets", seed);
        }));
    }
}

// Add participant cases to this list; each mutation case should start a fresh ApiFixture.
var failures = 0;
foreach (var (name, run) in cases)
{
    try
    {
        await run();
        Console.WriteLine($"PASS {name}");
    }
    catch (Exception error)
    {
        failures++;
        Console.Error.WriteLine($"FAIL {name}{Environment.NewLine}{error}");
    }
}

Console.WriteLine($"{cases.Count - failures}/{cases.Count} checks passed.");
return failures == 0 ? 0 : 1;

static async Task CheckTicketsAsync(ApiFixture api, string path, Ticket[] expected)
{
    using var response = await api.Client.GetAsync(path);
    Check.Equal(HttpStatusCode.OK, response.StatusCode);
    Check.Equal("application/json", response.Content.Headers.ContentType!.MediaType);
    var body = await response.Content.ReadFromJsonAsync<JsonElement>();
    Check.Equal(JsonValueKind.Array, body.ValueKind);
    var tickets = body.Deserialize<Ticket[]>(new JsonSerializerOptions(JsonSerializerDefaults.Web));
    Check.True(tickets is not null && tickets.SequenceEqual(expected),
        $"Ticket records or ID order changed for {path}.");
}
