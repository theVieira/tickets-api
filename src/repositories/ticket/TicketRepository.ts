import { ITicketRpository } from "../../entities/ticket/ITicketRepository";
import { Ticket } from "../../entities/ticket/Ticket";
import { ticket_gateway } from "../../services/database/prisma";
import { MapTicketPriority } from "../../services/utils/MapTicketPriority";
import { MapTicketStatus } from "../../services/utils/MapTicketStatus";

export class TicketRepository implements ITicketRpository {
  async create(ticket: Ticket): Promise<Ticket> {
    const data = await ticket_gateway.create({
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
        clientName: data.clientName,
        description: data.description,
        priority: MapTicketPriority(data.priority),
      },
      data.id,
      MapTicketStatus(data.status),
      data.reccurrent,
      data.techName || undefined,
      data.createdAt
    );
  }

  async list(): Promise<Ticket[]> {
    const data = await ticket_gateway.findMany({
      include: {
        client: true,
        tech: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return data.map((ticket) => {
      return new Ticket(
        {
          clientName: ticket.clientName,
          description: ticket.description,
          priority: MapTicketPriority(ticket.priority),
        },
        ticket.id,
        MapTicketStatus(ticket.status),
        ticket.reccurrent,
        ticket.techName || undefined,
        ticket.createdAt
      );
    });
  }

  async setFinished(id: string, techName: string): Promise<Ticket> {
    const data = await ticket_gateway.update({
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
        clientName: data.clientName,
        description: data.description,
        priority: MapTicketPriority(data.priority),
      },
      data.id,
      MapTicketStatus(data.status),
      data.reccurrent,
      data.techName || undefined,
      data.createdAt
    );
  }

  async setProgress(id: string): Promise<Ticket> {
    const data = await ticket_gateway.update({
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
        clientName: data.clientName,
        description: data.description,
        priority: MapTicketPriority(data.priority),
      },
      data.id,
      MapTicketStatus(data.status),
      data.reccurrent,
      data.techName || undefined,
      data.createdAt
    );
  }

  async reopen(id: string): Promise<Ticket> {
    const data = await ticket_gateway.update({
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
        clientName: data.clientName,
        description: data.description,
        priority: MapTicketPriority(data.priority),
      },
      data.id,
      MapTicketStatus(data.status),
      data.reccurrent,
      data.techName || undefined,
      data.createdAt
    );
  }

  async findById(id: string): Promise<Ticket> {
    const data = await ticket_gateway.findFirst({
      where: {
        id,
      },
      include: {
        client: true,
        tech: true,
      },
    });

    if (!data) throw new Error("ticket not found");
    return new Ticket(
      {
        clientName: data.clientName,
        description: data.description,
        priority: MapTicketPriority(data.priority),
      },
      data.id,
      MapTicketStatus(data.status),
      data.reccurrent,
      data.techName || undefined,
      data.createdAt
    );
  }

  async delete(id: string): Promise<Ticket> {
    const data = await ticket_gateway.delete({
      where: {
        id,
      },
    });

    return new Ticket(
      {
        clientName: data.clientName,
        description: data.description,
        priority: MapTicketPriority(data.priority),
      },
      data.id,
      MapTicketStatus(data.status),
      data.reccurrent,
      data.techName ?? undefined,
      data.createdAt
    );
  }
}
