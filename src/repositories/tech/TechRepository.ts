import { ITechRepository } from "../../entities/tech/ITechRepository";
import { Tech } from "../../entities/tech/Tech";
import { Ticket } from "../../entities/ticket/Ticket";
import { tech_gateway } from "../../services/database/prisma";
import { MapTechStatus } from "../../services/utils/MapTechStatus";
import { MapTicketPriority } from "../../services/utils/MapTicketPriority";
import { MapTicketStatus } from "../../services/utils/MapTicketStatus";

export class TechRepository implements ITechRepository {
  async create(tech: Tech): Promise<Tech> {
    const data = await tech_gateway.create({
      data: {
        admin: tech.admin,
        color: tech.color,
        create_ticket: tech.create_ticket,
        delete_ticket: tech.delete_ticket,
        id: tech.id,
        name: tech.name,
        password: tech.password,
        status: tech.status,
      },
      include: {
        tickets: true,
      },
    });

    return new Tech(
      {
        admin: data.admin,
        color: data.color,
        create_ticket: data.create_ticket,
        delete_ticket: data.delete_ticket,
        name: data.name,
        password: data.password,
      },
      data.id,
      MapTechStatus(data.status),
      data.tickets.map((ticket) => {
        return new Ticket(
          {
            clientName: ticket.clientName,
            description: ticket.description,
            priority: MapTicketPriority(ticket.priority),
          },
          ticket.id,
          MapTicketStatus(ticket.status),
          ticket.reccurrent,
          ticket.techName || undefined
        );
      })
    );
  }

  async list(): Promise<Tech[]> {
    const data = await tech_gateway.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        tickets: true,
      },
    });

    return data.map((tech) => {
      return new Tech(
        {
          admin: tech.admin,
          color: tech.color,
          create_ticket: tech.create_ticket,
          delete_ticket: tech.delete_ticket,
          name: tech.name,
          password: tech.password,
        },
        tech.id,
        MapTechStatus(tech.status),
        tech.tickets.map((ticket) => {
          return new Ticket(
            {
              clientName: ticket.clientName,
              description: ticket.description,
              priority: MapTicketPriority(ticket.priority),
            },
            ticket.id,
            MapTicketStatus(ticket.status),
            ticket.reccurrent,
            ticket.techName || undefined
          );
        })
      );
    });
  }

  async swapStatus(name: string, status: "active" | "inactive"): Promise<Tech> {
    const data = await tech_gateway.update({
      where: {
        name,
      },
      data: {
        status,
      },
      include: {
        tickets: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return new Tech(
      {
        admin: data.admin,
        color: data.color,
        create_ticket: data.create_ticket,
        delete_ticket: data.delete_ticket,
        name: data.name,
        password: data.password,
      },
      data.id,
      MapTechStatus(data.status),
      data.tickets.map((ticket) => {
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
      })
    );
  }

  async auth(name: string): Promise<Tech> {
    const data = await tech_gateway.findFirst({
      where: {
        name,
      },
      include: {
        tickets: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!data) throw new Error("tech not found");
    return new Tech(
      {
        admin: data.admin,
        color: data.color,
        create_ticket: data.create_ticket,
        delete_ticket: data.delete_ticket,
        name: data.name,
        password: data.password,
      },
      data.id,
      MapTechStatus(data.status),
      data.tickets.map((ticket) => {
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
      })
    );
  }

  async findByName(name: string): Promise<Tech> {
    const data = await tech_gateway.findFirst({
      where: {
        name,
      },
      include: {
        tickets: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!data) throw new Error("tech not found");
    return new Tech(
      {
        admin: data.admin,
        color: data.color,
        create_ticket: data.create_ticket,
        delete_ticket: data.delete_ticket,
        name: data.name,
        password: data.password,
      },
      data.id,
      MapTechStatus(data.status),
      data.tickets.map((ticket) => {
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
      })
    );
  }

  async replacePassword(name: string, newPassword: string): Promise<Tech> {
    const data = await tech_gateway.update({
      where: {
        name,
      },
      data: {
        password: newPassword,
      },
      include: {
        tickets: {
          include: {
            tech: true,
          },
        },
      },
    });

    return new Tech(
      Object.assign(this, data),
      data.id,
      MapTechStatus(data.status),
      data.tickets.map((ticket) => {
        return new Ticket(
          {
            clientName: ticket.clientName,
            description: ticket.description,
            priority: MapTicketPriority(ticket.priority),
          },
          ticket.id,
          MapTicketStatus(ticket.status),
          ticket.reccurrent,
          ticket.tech?.name,
          ticket.createdAt,
          ticket.tech?.color
        );
      })
    );
  }
}
