import { Client } from "../../entities/client/Client";
import { IClientRepository } from "../../entities/client/IClientRepository";
import { Ticket } from "../../entities/ticket/Ticket";
import { client_gateway } from "../../services/database/prisma";
import { MapTicketCategory } from "../../services/utils/MapTicketCategory";
import { MapTicketPriority } from "../../services/utils/MapTicketPriority";
import { MapTicketStatus } from "../../services/utils/MapTicketStatus";

export class ClientRepository implements IClientRepository {
  async create(client: Client): Promise<Client> {
    const data = await client_gateway.create({
      data: {
        id: client.id,
        name: client.name,
      },
      include: {
        tickets: true,
      },
    });

    const tickets = data.tickets.map((ticket) => {
      const priority = MapTicketPriority(ticket.priority);
      const status = MapTicketStatus(ticket.status);
      const category = MapTicketCategory(ticket.category);

      return new Ticket(
        {
          clientName: ticket.clientName,
          description: ticket.description,
          priority,
          category,
        },
        ticket.id,
        status,
        ticket.reccurrent,
        ticket.techName || undefined,
        ticket.createdAt
      );
    });

    return new Client({ name: data.name }, data.id, tickets);
  }

  async list(): Promise<Client[]> {
    const data = await client_gateway.findMany({
      include: {
        tickets: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const clients = data.map((client) => {
      const tickets = client.tickets.map((ticket) => {
        return new Ticket(
          {
            clientName: ticket.clientName,
            description: ticket.description,
            priority: MapTicketPriority(ticket.priority),
            category: MapTicketCategory(ticket.category),
          },
          ticket.id,
          MapTicketStatus(ticket.status),
          ticket.reccurrent,
          ticket.techName || undefined,
          ticket.createdAt
        );
      });

      return new Client({ name: client.name }, client.id, tickets);
    });

    return clients;
  }

  async findByName(name: string): Promise<Client> {
    const data = await client_gateway.findUnique({
      where: {
        name,
      },
      include: {
        tickets: true,
      },
    });

    if (!data) throw new Error("client not found");

    return new Client(
      { name: data.name },
      data.id,
      data.tickets.map((ticket) => {
        return new Ticket(
          {
            clientName: ticket.clientName,
            description: ticket.description,
            priority: MapTicketPriority(ticket.priority),
            category: MapTicketCategory(ticket.category),
          },
          ticket.id,
          MapTicketStatus(ticket.status),
          ticket.reccurrent,
          ticket.techName || undefined,
          ticket.createdAt
        );
      })
    );
  }
}
