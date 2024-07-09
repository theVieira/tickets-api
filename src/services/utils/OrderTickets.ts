import { Ticket } from "../../entities/ticket/Ticket";
import { TicketCategory } from "../../entities/ticket/TicketProps";

export async function orderTickets(
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
  return tickets.filter((ticket) => ticket.category == TicketCategory.daily);
}

function getDelivery(tickets: Ticket[]) {
  return tickets.filter((ticket) => ticket.category == TicketCategory.delivery);
}

function getBudget(tickets: Ticket[]) {
  return tickets.filter((ticket) => ticket.category == TicketCategory.budget);
}
