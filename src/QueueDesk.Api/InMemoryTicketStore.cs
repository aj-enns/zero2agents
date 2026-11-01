namespace QueueDesk.Api;

public sealed class InMemoryTicketStore : ITicketStore
{
    private readonly Ticket[] tickets =
    [
        new(1, "VPN connection fails", "open", "high"),
        new(2, "Update onboarding docs", "open", "normal"),
        new(3, "Replace meeting room cable", "resolved", "low"),
        new(4, "VPN setup guide", "resolved", "normal")
    ];

    public IReadOnlyList<Ticket> List() => tickets.OrderBy(ticket => ticket.Id).ToArray();

    public Ticket? Find(int id) => tickets.SingleOrDefault(ticket => ticket.Id == id);
}
