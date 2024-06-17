export type TicketProps = {
  description: string;
  priority: "urgent" | "high" | "medium" | "low";
  clientId: string;
};
