import { v4 as uuid } from "uuid";
import { TechProps, TechStatus } from "./TechProps";
import { Ticket } from "../ticket/Ticket";

export class Tech {
  id: string;
  name: string;
  password: string;
  phone: string;
  admin: boolean;
  create_ticket: boolean;
  delete_ticket: boolean;
  color: string;
  status: TechStatus;
  tickets?: Ticket[];
  token?: string;

  constructor(
    props: TechProps,
    id?: string,
    status?: TechStatus,
    tickets?: Ticket[]
  ) {
    /* Optionals */
    this.id = uuid();
    this.status = TechStatus.active;
    if (id) {
      this.id = id;
    }
    if (status) {
      this.status = status;
    }
    if (tickets) {
      this.tickets = tickets;
    }

    if (props.name.length > 30) throw Error("name char limit over!");
    if (props.color.length > 15) throw Error("color char limit over!");

    this.name = props.name.toLowerCase();
    this.password = props.password;
    this.admin = props.admin;
    this.phone = props.phone;
    this.create_ticket = props.create_ticket;
    this.delete_ticket = props.delete_ticket;
    this.color = props.color.toUpperCase();
  }
}
