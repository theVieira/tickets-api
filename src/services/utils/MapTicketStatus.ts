import { TicketStatus } from "../../entities/ticket/TicketProps";

export function MapTicketStatus(status: string): TicketStatus {
  switch (status) {
    case "open":
      return TicketStatus.open;
    case "progress":
      return TicketStatus.progress;
    case "finished":
      return TicketStatus.finished;

    default:
      throw new Error("status unknow");
  }
}
