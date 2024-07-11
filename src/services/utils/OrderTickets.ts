import { Ticket } from "../../entities/ticket/Ticket";
import {
  TicketCategory,
  TicketPriority,
} from "../../entities/ticket/TicketProps";

export function orderTickets(
  tickets: Ticket[],
  order: "daily" | "delivery" | "budget" | "all"
): Ticket[] {
  switch (order) {
    case "all":
      return orderByPriority(tickets);

    case "daily":
      const dailys: Ticket[] = getDaily(tickets);
      return orderByPriority(dailys);

    case "delivery":
      const deliverys: Ticket[] = getDelivery(tickets);
      return orderByPriority(deliverys);

    case "budget":
      const budgets: Ticket[] = getBudget(tickets);
      return orderByPriority(budgets);
  }
}

function getDaily(tickets: Ticket[]): Ticket[] {
  return tickets.filter((ticket) => ticket.category == TicketCategory.daily);
}

function getDelivery(tickets: Ticket[]) {
  return tickets.filter((ticket) => ticket.category == TicketCategory.delivery);
}

function getBudget(tickets: Ticket[]) {
  return tickets.filter((ticket) => ticket.category == TicketCategory.budget);
}

function orderByPriority(tickets: Ticket[]): Ticket[] {
  const urgent = tickets.filter(
    (ticket) => ticket.priority == TicketPriority.urgent
  );

  const high = tickets.filter(
    (ticket) => ticket.priority == TicketPriority.high
  );

  const medium = tickets.filter(
    (ticket) => ticket.priority == TicketPriority.medium
  );

  const low = tickets.filter((ticket) => ticket.priority == TicketPriority.low);

  const orderedTickets: Ticket[] = [];

  low.forEach((ticket) => orderedTickets.unshift(ticket));
  medium.forEach((ticket) => orderedTickets.unshift(ticket));
  high.forEach((ticket) => orderedTickets.unshift(ticket));
  urgent.forEach((ticket) => orderedTickets.unshift(ticket));

  return orderedTickets;
}
