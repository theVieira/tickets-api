import { Ticket } from "../../entities/ticket/Ticket";
import {
  TicketCategory,
  TicketPriority,
} from "../../entities/ticket/TicketProps";

export function orderTickets(
  tickets: Ticket[],
  order: "daily" | "delivery" | "budget" | "all"
) {
  switch (order) {
    case "all":
      return tickets;

    case "daily":
      return getDaily(tickets);

    case "delivery":
      return getDelivery(tickets);

    case "budget":
      return getBudget(tickets);
  }
}

function getDaily(tickets: Ticket[]) {
  const newArray = tickets.filter(
    (ticket) => ticket.category == TicketCategory.daily
  );

  const orderedTickets = filterPriority(newArray);

  return orderedTickets;
}

function getDelivery(tickets: Ticket[]) {
  const newArray = tickets.filter(
    (ticket) => ticket.category == TicketCategory.delivery
  );

  const orderedTicket = filterPriority(newArray);

  return orderedTicket;
}

function getBudget(tickets: Ticket[]) {
  const newArray = tickets.filter(
    (ticket) => ticket.category == TicketCategory.budget
  );

  const orderedTicket = filterPriority(newArray);

  return orderedTicket;
}

function filterPriority(tickets: Ticket[]) {
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

  const orderedTickets: Ticket[] = [];

  lows.forEach((ticket) => orderedTickets.unshift(ticket));
  mediums.forEach((ticket) => orderedTickets.unshift(ticket));
  highs.forEach((ticket) => orderedTickets.unshift(ticket));
  urgents.forEach((ticket) => orderedTickets.unshift(ticket));
  return orderTickets;
}
