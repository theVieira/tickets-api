import { ITicketRpository } from "../../entities/ticket/ITicketRepository";
import { Ticket } from "../../entities/ticket/Ticket";
import { ticket_gateway } from "../../services/database/prisma";

export class TicketRepository implements ITicketRpository {
  async create(ticket: Ticket): Promise<Ticket> {
    const aTicket = await ticket_gateway.create({
      data: {
        description: ticket.description,
        id: ticket.id,
        priority: ticket.priority,
        reccurrent: ticket.reccurrent,
        status: ticket.status,
        clientName: ticket.clientName,
      },
      include: {
        client: true,
      },
    });

    return new Ticket(
      {
        clientName: aTicket.clientName,
        description: aTicket.description,
        priority: aTicket.priority,
      },
      aTicket.id,
      aTicket.status,
      aTicket.reccurrent
    );
  }

  async list(): Promise<Ticket[]> {
    const data = await ticket_gateway.findMany({
      select: {
        client: true,
        tech: true,
        clientName: true,
        createdAt: true,
        description: true,
        id: true,
        priority: true,
        reccurrent: true,
        status: true,
        techName: true,
        updatedAt: true,
      },
    });

    const tickets = data.map((ticket) => {
      return new Ticket(
        {
          clientName: ticket.clientName,
          description: ticket.description,
          priority: ticket.priority,
        },
        ticket.id,
        ticket.status,
        ticket.reccurrent,
        ticket.tech?.name,
        ticket.createdAt
      );
    });

    return tickets;
  }

  async setFinished(id: string, techName: string): Promise<Ticket> {
    const ticket = await ticket_gateway.update({
      where: {
        id,
      },
      data: {
        status: "finished",
        techName,
      },
      include: {
        client: true,
        tech: true,
      },
    });

    return new Ticket(
      {
        clientName: ticket.clientName,
        description: ticket.description,
        priority: ticket.priority,
      },
      ticket.id,
      ticket.status,
      ticket.reccurrent,
      ticket.tech?.name
    );
  }

  async setProgress(id: string): Promise<Ticket> {
    const ticket = await ticket_gateway.update({
      where: {
        id,
      },
      data: {
        status: "progress",
        techName: "",
      },
      include: {
        client: true,
        tech: true,
      },
    });

    return new Ticket(
      {
        clientName: ticket.clientName,
        description: ticket.description,
        priority: ticket.priority,
      },
      ticket.id,
      ticket.status,
      ticket.reccurrent,
      ticket.tech?.name
    );
  }

  async reopen(id: string): Promise<Ticket> {
    const ticket = await ticket_gateway.update({
      where: {
        id,
      },
      data: {
        status: "open",
        reccurrent: true,
        techName: "",
      },
      include: {
        client: true,
        tech: true,
      },
    });

    return new Ticket(
      {
        clientName: ticket.clientName,
        description: ticket.description,
        priority: ticket.priority,
      },
      ticket.id,
      ticket.status,
      ticket.reccurrent,
      ticket.tech?.name
    );
  }
}
