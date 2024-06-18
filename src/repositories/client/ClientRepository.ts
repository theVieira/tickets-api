import { Client } from "../../entities/client/Client";
import { IClientRepository } from "../../entities/client/IClientRepository";
import { Ticket } from "../../entities/ticket/Ticket";
import { client_gateway } from "../../services/database/prisma";

export class ClientRepository implements IClientRepository {
  async create(client: Client): Promise<Client> {
    const aClient = await client_gateway.create({
      data: {
        id: client.id,
        name: client.name,
      },
    });

    return aClient;
  }

  async list(): Promise<Client[]> {
    const data = await client_gateway.findMany({
      include: {
        tickets: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const clients = data.map((client) => {
      const tickets = client.tickets.map((ticket) => {
        return new Ticket(
          {
            clientName: ticket.clientName,
            description: ticket.description,
            priority: ticket.priority,
          },
          ticket.id,
          ticket.status,
          ticket.reccurrent,
          ticket.techName || ""
        );
      });

      return new Client({ name: client.name }, client.id, tickets);
    });

    return clients;
  }
}
