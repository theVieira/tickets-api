import { Tech } from "../../entities/tech/Tech";
import { ITicketRpository } from "../../entities/ticket/ITicketRepository";
import { Ticket } from "../../entities/ticket/Ticket";
import { ticket_gateway } from "../../services/database/prisma";
import { MapTicketCategory } from "../../services/utils/MapTicketCategory";
import { MapTicketPriority } from "../../services/utils/MapTicketPriority";
import { MapTicketStatus } from "../../services/utils/MapTicketStatus";

export class TicketRepository implements ITicketRpository {
  async create(ticket: Ticket): Promise<Ticket> {
    const data = await ticket_gateway.create({
      data: {
        description: ticket.description,
        id: ticket.id,
        priority: ticket.priority,
        category: ticket.category,
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
        category: MapTicketCategory(data.category),
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
          category: MapTicketCategory(ticket.category),
          priority: MapTicketPriority(ticket.priority),
        },
        ticket.id,
        MapTicketStatus(ticket.status),
        ticket.reccurrent,
        ticket.techName || undefined,
        ticket.createdAt,
        ticket.tech?.color,
        ticket.updatedAt
      );
    });
  }

  async setFinished(id: string, tech: Tech): Promise<Ticket> {
    const data = await ticket_gateway.update({
      where: {
        id,
      },
      data: {
        status: "finished",
        techName: tech.name,
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
        category: MapTicketCategory(data.category),
      },
      data.id,
      MapTicketStatus(data.status),
      data.reccurrent,
      data.tech?.name,
      data.createdAt
    );
  }

  async setProgress(id: string, tech: Tech): Promise<Ticket> {
    const data = await ticket_gateway.update({
      where: {
        id,
      },
      data: {
        status: "progress",
        techName: tech.name,
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
        category: MapTicketCategory(data.category),
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
        techName: undefined,
        tech: undefined,
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
        category: MapTicketCategory(data.category),
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
        category: MapTicketCategory(data.category),
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
        category: MapTicketCategory(data.category),
      },
      data.id,
      MapTicketStatus(data.status),
      data.reccurrent,
      data.techName ?? undefined,
      data.createdAt
    );
  }
}
