import { Request, Response } from "express";
import { ListTicketsUseCase } from "./ListTicketsUseCase";
import { getToken } from "../../../services/jwt/GetToken";
import { TicketPriority } from "../../../entities/ticket/TicketProps";
import { Ticket } from "../../../entities/ticket/Ticket";

export class ListTicketsController {
  constructor(private listTicketsUseCase: ListTicketsUseCase) {}

  async handle(req: Request, res: Response) {
    const order = req.params.order;

    try {
      const token = getToken(req);
      const tickets = await this.listTicketsUseCase.execute(
        token,
        this.getOrder(order)
      );

      const ordered = this.filterPriority(tickets);

      return res.status(200).json(ordered);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  getOrder(order: string) {
    switch (order) {
      case "all":
        return "all";

      case "daily":
        return "daily";

      case "delivery":
        return "delivery";

      case "budget":
        return "budget";

      default:
        throw new Error("category unknow");
    }
  }

  filterPriority(tickets: Ticket[]) {
    const urgents = tickets.filter(
      (ticket) => ticket.priority == TicketPriority.urgent
    );

    const highs = tickets.filter(
      (ticket) => ticket.priority == TicketPriority.high
    );

    const mediums = tickets.filter(
      (ticket) => ticket.priority == TicketPriority.medium
    );

    const lows = tickets.filter(
      (ticket) => ticket.priority == TicketPriority.low
    );

    tickets.filter((ticket, i) => {
      if (ticket.priority == TicketPriority.urgent) {
        tickets.splice(i, 1);
      }
    });

    tickets.filter((ticket, i) => {
      if (ticket.priority == TicketPriority.high) {
        tickets.splice(i, 1);
      }
    });

    tickets.filter((ticket, i) => {
      if (ticket.priority == TicketPriority.medium) {
        tickets.splice(i, 1);
      }
    });

    tickets.filter((ticket, i) => {
      if (ticket.priority == TicketPriority.low) {
        tickets.splice(i, 1);
      }
    });

    lows.forEach((ticket) => tickets.unshift(ticket));
    mediums.forEach((ticket) => tickets.unshift(ticket));
    highs.forEach((ticket) => tickets.unshift(ticket));
    urgents.forEach((ticket) => tickets.unshift(ticket));
    return tickets;
  }
}
