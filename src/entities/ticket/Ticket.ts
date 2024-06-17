import { v4 as uuid } from "uuid";
import { TicketProps } from "./TicketProps";

export class Ticket {
  id: string;
  reccurrent: boolean;
  description: string;
  status: "open" | "progress" | "finished";
  priority: "urgent" | "high" | "medium" | "low";
  clientId: string;
  techId?: string;

  constructor(
    props: TicketProps,
    id?: string,
    status?: "open" | "progress" | "finished",
    reccurent?: boolean,
    techId?: string
  ) {
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
    if (!status) {
      this.status = "open";
    } else {
      this.status = status;
    }
    if (!reccurent) {
      this.reccurrent = false;
    } else {
      this.reccurrent = reccurent;
    }

    this.techId = undefined;

    if (techId) {
      this.techId = techId;
    }

    this.description = props.description;
    this.priority = props.priority;
    this.clientId = props.clientId;
  }
}
