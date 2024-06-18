import { v4 as uuid } from "uuid";
import { TicketProps } from "./TicketProps";

export class Ticket {
  id: string;
  reccurrent: boolean;
  description: string;
  status: "open" | "progress" | "finished";
  priority: "urgent" | "high" | "medium" | "low";
  clientName: string;
  techName?: string;
  createdAt?: Date;

  constructor(
    props: TicketProps,
    id?: string,
    status?: "open" | "progress" | "finished",
    reccurent?: boolean,
    techName?: string,
    createdAt?: Date
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
    if (!techName) {
      this.techName = undefined;
    }
    if (techName) {
      this.techName = techName;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }

    this.description = props.description;
    this.priority = props.priority;
    this.clientName = props.clientName;
  }
}
