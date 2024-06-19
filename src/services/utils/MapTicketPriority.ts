import { TicketPriority } from "../../entities/ticket/TicketProps";

export function MapTicketPriority(priority: string): TicketPriority {
  switch (priority) {
    case "urgent":
      return TicketPriority.urgent;
    case "high":
      return TicketPriority.high;
    case "medium":
      return TicketPriority.medium;
    case "low":
      return TicketPriority.low;

    default:
      throw new Error("priority unknow");
  }
}
