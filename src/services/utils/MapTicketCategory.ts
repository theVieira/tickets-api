import { TicketCategory } from "../../entities/ticket/TicketProps";

export function MapTicketCategory(category: string): TicketCategory {
  switch (category) {
    case "delivery":
      return TicketCategory.delivery;
    case "budget":
      return TicketCategory.budget;
    case "daily":
      return TicketCategory.daily;
    default:
      throw new Error("category unknow");
  }
}