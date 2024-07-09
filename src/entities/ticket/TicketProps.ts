export type TicketProps = {
  description: string;
  priority: TicketPriority;
  category: TicketCategory;
  clientName: string;
};

export enum TicketStatus {
  open = "open",
  progress = "progress",
  finished = "finished",
}

export enum TicketPriority {
  urgent = "urgent",
  high = "high",
  medium = "medium",
  low = "low",
}

export enum TicketCategory {
  daily = "daily",
  delivery = "delivery",
  budget = "budget",
}
