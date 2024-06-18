import { ITechRepository } from "../../entities/tech/ITechRepository";
import { Tech } from "../../entities/tech/Tech";
import { Ticket } from "../../entities/ticket/Ticket";
import { tech_gateway } from "../../services/database/prisma";

export class TechRepository implements ITechRepository {
  async create(tech: Tech): Promise<Tech> {
    const aTech = await tech_gateway.create({
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
    });

    return aTech;
  }

  async list(): Promise<Tech[]> {
    const data = await tech_gateway.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        admin: true,
        color: true,
        create_ticket: true,
        createdAt: true,
        delete_ticket: true,
        id: true,
        name: true,
        status: true,
        tickets: true,
        updatedAt: true,
        password: false,
      },
    });

    const techs = data.map((tech) => {
      return new Tech(
        {
          admin: tech.admin,
          color: tech.color,
          create_ticket: tech.create_ticket,
          delete_ticket: tech.delete_ticket,
          name: tech.name,
          password: "",
        },
        tech.id,
        tech.status,
        tech.tickets.map((ticket) => {
          return new Ticket(
            {
              clientName: ticket.clientName,
              description: ticket.description,
              priority: ticket.priority,
            },
            ticket.id,
            ticket.status,
            ticket.reccurrent
          );
        })
      );
    });

    return techs;
  }

  async swapStatus(name: string, status: "active" | "inactive"): Promise<Tech> {
    const tech = tech_gateway.update({
      where: {
        name,
      },
      data: {
        status,
      },
    });
    return tech;
  }

  async auth(name: string): Promise<Tech> {
    const tech = await tech_gateway.findFirst({
      where: {
        name,
      },
      select: {
        tickets: true,
        admin: true,
        password: true,
        color: true,
        create_ticket: true,
        delete_ticket: true,
        id: true,
        status: true,
        name: true,
      },
    });

    if (!tech) {
      throw new Error("tech not found");
    } else {
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
        tech.status,
        tech.tickets.map((ticket) => {
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
        })
      );
    }
  }
}
