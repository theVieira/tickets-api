import { v4 as uuid } from "uuid";
import { ClientProps } from "./ClientProps";
import { Ticket } from "../ticket/Ticket";

export class Client {
  id: string;
  name: string;
  tickets?: Ticket[];

  constructor(props: ClientProps, id?: string, tickets?: Ticket[]) {
    if (props.name.length > 50) throw Error("name char limit over!");
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }
    if (!tickets) {
      this.tickets = undefined;
    } else {
      this.tickets = tickets;
    }

    this.name = props.name.toLowerCase();
  }
}
