import { v4 as uuid } from "uuid";
import {
  TicketCategory,
  TicketPriority,
  TicketProps,
  TicketStatus,
} from "./TicketProps";

export class Ticket {
  id: string;
  reccurrent: boolean;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  clientName: string;
  techName?: string;
  createdAt?: Date;
  techColor?: string;

  constructor(
    props: TicketProps,
    id?: string,
    status?: TicketStatus,
    reccurent?: boolean,
    techName?: string,
    createdAt?: Date,
    techColor?: string
  ) {
    /* Optionals */
    this.id = uuid();
    this.status = TicketStatus.open;
    this.reccurrent = false;

    if (id) {
      this.id = id;
    }
    if (status) {
      this.status = status;
    }
    if (reccurent) {
      this.reccurrent = reccurent;
    }
    if (techName) {
      this.techName = techName;
    }
    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (techColor) {
      this.techColor = techColor;
    }

    this.category = props.category;
    this.description = props.description;
    this.priority = props.priority;
    this.clientName = this.formatName(props.clientName);
  }

  formatName(name: string): string {
    const names = name.toLowerCase().split(" ");

    const formatNames = names.map((name) => {
      return name.charAt(0).toUpperCase() + name.substring(1);
    });

    const formattedName = formatNames.join(" ");
    return formattedName;
  }
}
