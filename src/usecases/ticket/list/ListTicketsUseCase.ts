import { verify } from "jsonwebtoken";
import { ITicketRpository } from "../../../entities/ticket/ITicketRepository";
import { config } from "dotenv";
import { IPayload } from "../../../services/jwt/IPayload";
import { checkPermission } from "../../../services/checkPermission/CheckPermission";
import { orderTickets } from "../../../services/utils/OrderTickets";
import { TicketPriority } from "../../../entities/ticket/TicketProps";
import { Ticket } from "../../../entities/ticket/Ticket";

config();
const SECRET = process.env.SECRET_KEY || "";

export class ListTicketsUseCase {
  constructor(private ticketRepository: ITicketRpository) {}

  async execute(token: string, order: "all" | "delivery" | "daily" | "budget") {
    const jwt = verify(token, SECRET) as IPayload;

    const allTickets = await this.ticketRepository.list();
    const openTickets = allTickets.filter(
      (ticket) => ticket.status != "finished"
    );

    if (
      checkPermission(Object.assign(this, jwt.permissions), "admin") === true
    ) {
      return orderTickets(this.filterPriority(allTickets), order);
    }

    return orderTickets(this.filterPriority(openTickets), order);
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

    tickets.forEach((ticket, i) => {
      if (ticket.priority == TicketPriority.urgent) {
        tickets.splice(i, 1);
      }
    });

    tickets.forEach((ticket, i) => {
      if (ticket.priority == TicketPriority.high) {
        tickets.splice(i, 1);
      }
    });

    tickets.forEach((ticket, i) => {
      if (ticket.priority == TicketPriority.medium) {
        tickets.splice(i, 1);
      }
    });

    tickets.forEach((ticket, i) => {
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
