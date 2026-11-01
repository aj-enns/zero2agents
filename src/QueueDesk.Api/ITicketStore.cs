namespace QueueDesk.Api;

public interface ITicketStore
{
    IReadOnlyList<Ticket> List();
    Ticket? Find(int id);
}
