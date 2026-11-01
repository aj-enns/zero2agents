namespace QueueDesk.Api;

public sealed record Ticket(int Id, string Title, string Status, string Priority);
